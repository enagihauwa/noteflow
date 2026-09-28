import { prisma } from "@/lib/prisma";
import { NotAuthorizedError, NotFoundError } from "@/lib/errors";

// Every function here takes userId first. Ownership is enforced in the query,
// not in the UI — see tickets/03-authorization.

export async function listNotes(userId: string, query?: string) {
  // Trim here too, so a stray space never filters everything out regardless of caller.
  const q = query?.trim();
  return prisma.note.findMany({
    where: {
      userId,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { content: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }],
  });
}

export async function getNote(userId: string, noteId: string) {
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note) throw new NotFoundError();
  if (note.userId !== userId) throw new NotAuthorizedError();
  return note;
}

export async function createNote(userId: string, data: { title: string; content: string }) {
  return prisma.note.create({ data: { ...data, userId } });
}

export async function updateNote(
  userId: string,
  noteId: string,
  data: { title?: string; content?: string; isPinned?: boolean },
) {
  // updateMany scopes the write to the owner, so a wrong id changes nothing.
  const result = await prisma.note.updateMany({ where: { id: noteId, userId }, data });
  if (result.count === 0) throw new NotAuthorizedError();
  return prisma.note.findUniqueOrThrow({ where: { id: noteId } });
}

export async function deleteNote(userId: string, noteId: string) {
  const result = await prisma.note.deleteMany({ where: { id: noteId, userId } });
  if (result.count === 0) throw new NotAuthorizedError();
}

export async function togglePin(userId: string, noteId: string) {
  const note = await getNote(userId, noteId);
  return updateNote(userId, noteId, { isPinned: !note.isPinned });
}
