"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth-actions";
import { FieldError } from "@/components/FieldError";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ActionState } from "@/lib/errors";

const initial: ActionState = { ok: false };

export function SignUpForm() {
  const [state, action] = useActionState(registerAction, initial);

  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm"
        />
        <FieldError messages={state.fieldErrors?.name} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm"
        />
        <FieldError messages={state.fieldErrors?.email} />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="mt-1 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          At least 8 characters, with a number and an uppercase letter.
        </p>
        <FieldError messages={state.fieldErrors?.password} />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className="mt-1 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm"
        />
        <FieldError messages={state.fieldErrors?.confirmPassword} />
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-[var(--color-alert)]">
          {state.message}
        </p>
      )}

      <SubmitButton pendingLabel="Creating account…">Create account</SubmitButton>
    </form>
  );
}
