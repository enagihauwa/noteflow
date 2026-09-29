import type { DocumentSnapshot } from "firebase-admin/firestore";
import { adminDb, serverTimestamp } from "@/lib/firebase";
import { NotAuthorizedError, NotFoundError } from "@/lib/errors";
import type { Note } from "@/lib/types";

// Every function here takes userId first. Ownership is enforced in the query,
// not in the UI — see tickets/03-authorization.

interface NoteDoc {
  userId: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: { toDate: () => Date };
  updatedAt: { toDate: () => Date };
}

function toNote(doc: DocumentSnapshot): Note {
  const data = (doc.data() ?? {}) as Partial<NoteDoc>;
  return {
    id: doc.id,
    userId: data.userId ?? "",
    title: data.title ?? "",
    content: data.content ?? "",
    isPinned: data.isPinned ?? false,
    createdAt: data.createdAt?.toDate() ?? new Date(0),
    updatedAt: data.updatedAt?.toDate() ?? new Date(0),
  };
}

export async function listNotes(userId: string, query?: string): Promise<Note[]> {
  // Firestore has no full-text search, so fetch the user's notes and filter +
  // sort in memory. Fine at MVP scale; revisit with a search index if it grows.
  const q = query?.trim();
  const snapshot = await adminDb.collection("notes").where("userId", "==", userId).get();

  let notes = snapshot.docs.map(toNote);

  if (q) {
    const needle = q.toLowerCase();
    notes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(needle) ||
        note.content.toLowerCase().includes(needle),
    );
  }

  notes.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return notes;
}

export async function getNote(userId: string, noteId: string): Promise<Note> {
  const doc = await adminDb.collection("notes").doc(noteId).get();
  if (!doc.exists) throw new NotFoundError();
  const note = toNote(doc);
  if (note.userId !== userId) throw new NotAuthorizedError();
  return note;
}

export async function createNote(userId: string, data: { title: string; content: string }): Promise<Note> {
  const ref = await adminDb.collection("notes").add({
    userId,
    title: data.title,
    content: data.content,
    isPinned: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return toNote(await ref.get());
}

export async function updateNote(
  userId: string,
  noteId: string,
  data: { title?: string; content?: string; isPinned?: boolean },
): Promise<Note> {
  const ref = adminDb.collection("notes").doc(noteId);
  const doc = await ref.get();
  if (!doc.exists) throw new NotFoundError();
  const note = toNote(doc);
  if (note.userId !== userId) throw new NotAuthorizedError();

  await ref.update({ ...data, updatedAt: serverTimestamp() });
  return toNote(await ref.get());
}

export async function deleteNote(userId: string, noteId: string): Promise<void> {
  const ref = adminDb.collection("notes").doc(noteId);
  const doc = await ref.get();
  if (!doc.exists) throw new NotFoundError();
  const note = toNote(doc);
  if (note.userId !== userId) throw new NotAuthorizedError();

  await ref.delete();
}

export async function togglePin(userId: string, noteId: string): Promise<Note> {
  const note = await getNote(userId, noteId);
  return updateNote(userId, noteId, { isPinned: !note.isPinned });
}