"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/lib/actions/auth-actions";
import { signInSchema, textFieldProps } from "@/lib/validations";
import { FieldError } from "@/components/FieldError";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { ActionState } from "@/lib/errors";

const initial: ActionState = { ok: false };

const BASE_FIELD =
  "mt-1 h-12 w-full rounded-lg border bg-[var(--color-surface)] px-4 text-sm text-[var(--color-ink)] outline-none transition-colors focus-visible:outline-none";

const FIELD_NO_ERROR =
  "border-[var(--color-line)] hover:border-[#c3cbd6] focus:border-[#93c5fd] focus:ring-2 focus:ring-[#93c5fd]";

const FIELD_ERROR =
  "border-[var(--color-alert)] hover:border-[var(--color-alert)] focus:border-[var(--color-alert)] focus:ring-2 focus:ring-[var(--color-alert)]";

function fieldClass(hasError: boolean) {
  return `${BASE_FIELD} ${hasError ? FIELD_ERROR : FIELD_NO_ERROR}`;
}

export function LoginForm({ from = "/dashboard" }: { from?: string }) {
  const [state, action] = useActionState(loginAction, initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={action} className="mt-6 space-y-5">
      <input type="hidden" name="from" value={from} />
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...textFieldProps(signInSchema, "email")}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "login-email-error" : undefined}
          className={fieldClass(Boolean(state.fieldErrors?.email))}
        />
        <FieldError id="login-email-error" messages={state.fieldErrors?.email} />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...textFieldProps(signInSchema, "password")}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={state.fieldErrors?.password ? "login-password-error" : undefined}
          className={fieldClass(Boolean(state.fieldErrors?.password))}
        />
        <FieldError id="login-password-error" messages={state.fieldErrors?.password} />
      </div>

      {state.message && (
        <p role="alert" className="rounded-md border border-[var(--color-alert)] bg-[var(--color-alert)]/5 px-3 py-2 text-sm text-[var(--color-alert)]">
          {state.message}
        </p>
      )}

      <SubmitButton pendingLabel="Logging in…" className="w-full">
        Log in
      </SubmitButton>
    </form>
  );
}
