"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createNoteAction, updateNoteAction } from "@/lib/actions/note-actions";
import { FieldError } from "@/components/FieldError";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ActionState } from "@/lib/errors";

const initial: ActionState = { ok: false };
const MAX_TITLE = 120;

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

  return (
    <form action={formAction} className="mt-6 max-w-2xl space-y-5">
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <span className="text-xs text-[var(--color-muted)]">
            {title.length}/{MAX_TITLE}
          </span>
        </div>
        <input
          id="title"
          name="title"
          value={title}
          maxLength={MAX_TITLE}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2"
        />
        <FieldError messages={state.fieldErrors?.title} />
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={14}
          defaultValue={defaultContent}
          className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 leading-relaxed"
        />
        <FieldError messages={state.fieldErrors?.content} />
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
          className="text-sm text-[var(--color-muted)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
