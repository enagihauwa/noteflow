"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth-actions";
import { FieldError } from "@/components/FieldError";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ActionState } from "@/lib/errors";

const initial: ActionState = { ok: false };

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initial);

  return (
    <form action={action} className="mt-6 space-y-4">
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
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm"
        />
        <FieldError messages={state.fieldErrors?.password} />
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-[var(--color-alert)]">
          {state.message}
        </p>
      )}

      <SubmitButton pendingLabel="Logging in…">Log in</SubmitButton>
    </form>
  );
}
