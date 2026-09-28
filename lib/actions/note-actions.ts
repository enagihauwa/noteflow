"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { noteSchema } from "@/lib/validations";
import * as notes from "@/lib/notes";
import { GENERIC_ERROR, NotAuthorizedError, NotFoundError, type ActionState } from "@/lib/errors";
import { serverLogError } from "@/lib/log";

const noteIdSchema = z.string().min(1, "Invalid note id.");

function toState(context: string, error: unknown): ActionState {
  serverLogError(context, error);
  if (error instanceof NotAuthorizedError || error instanceof NotFoundError) {
    return { ok: false, message: error.message };
  }
  return { ok: false, message: GENERIC_ERROR };
}

export async function createNoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = noteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };

  let id: string;
  try {
    const note = await notes.createNote(user.id, parsed.data);
    id = note.id;
  } catch (error) {
    return toState(`note.create user=${user.id}`, error);
  }

  revalidatePath("/dashboard");
  redirect(`/notes/${id}`);
}

export async function updateNoteAction(
  noteId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  if (!noteIdSchema.safeParse(noteId).success) return toState(`note.update invalid-id user=${user.id}`, new NotFoundError());
  const parsed = noteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };

  try {
    await notes.updateNote(user.id, noteId, parsed.data);
  } catch (error) {
    return toState(`note.update user=${user.id} note=${noteId}`, error);
  }

  revalidatePath("/dashboard");
  revalidatePath(`/notes/${noteId}`);
  redirect(`/notes/${noteId}`);
}

export async function deleteNoteAction(noteId: string): Promise<ActionState> {
  const user = await requireUser();
  if (!noteIdSchema.safeParse(noteId).success) return toState(`note.delete invalid-id user=${user.id}`, new NotFoundError());
  try {
    await notes.deleteNote(user.id, noteId);
  } catch (error) {
    return toState(`note.delete user=${user.id} note=${noteId}`, error);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function togglePinAction(noteId: string): Promise<ActionState> {
  const user = await requireUser();
  if (!noteIdSchema.safeParse(noteId).success) return toState(`note.pin invalid-id user=${user.id}`, new NotFoundError());
  try {
    await notes.togglePin(user.id, noteId);
  } catch (error) {
    return toState(`note.pin user=${user.id} note=${noteId}`, error);
  }

  revalidatePath("/dashboard");
  revalidatePath(`/notes/${noteId}`);
  return { ok: true };
}
