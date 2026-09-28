"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createNoteAction, updateNoteAction } from "@/lib/actions/note-actions";
import { noteSchema, textFieldProps } from "@/lib/validations";
import { FieldError } from "@/components/FieldError";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ActionState } from "@/lib/errors";

const initial: ActionState = { ok: false };
const titleProps = textFieldProps(noteSchema, "title");
const contentProps = textFieldProps(noteSchema, "content");

type Props = {
  mode: "create" | "edit";
  noteId?: string;
  defaultTitle?: string;
  defaultContent?: string;
};

export function NoteForm({ mode, noteId, defaultTitle = "", defaultContent = "" }: Props) {
  const action =
    mode === "edit" && noteId ? updateNoteAction.bind(null, noteId) : createNoteAction;
  const [state, formAction] = useActionState(action, initial);
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  return (
    <form action={formAction} className="mt-6 max-w-2xl space-y-5">
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <span className="text-xs text-[var(--color-muted)]">
            {title.length}/{titleProps.maxLength}
          </span>
        </div>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          {...titleProps}
          aria-invalid={Boolean(state.fieldErrors?.title)}
          aria-describedby={state.fieldErrors?.title ? "note-title-error" : undefined}
          className="mt-1 w-full min-h-11 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2"
        />
        <FieldError id="note-title-error" messages={state.fieldErrors?.title} />
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          {...contentProps}
          aria-invalid={Boolean(state.fieldErrors?.content)}
          aria-describedby={state.fieldErrors?.content ? "note-content-error" : undefined}
          className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 leading-relaxed"
        />
        <FieldError id="note-content-error" messages={state.fieldErrors?.content} />
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-[var(--color-alert)]">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel="Saving…">Save note</SubmitButton>
        <Link
          href={mode === "edit" && noteId ? `/notes/${noteId}` : "/dashboard"}
          className="inline-flex min-h-11 items-center text-sm text-[var(--color-muted)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
