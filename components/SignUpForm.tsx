"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/lib/actions/auth-actions";
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

function fieldClass(hasError: boolean, extra = "") {
  return `${BASE_FIELD} ${extra} ${hasError ? FIELD_ERROR : FIELD_NO_ERROR}`;
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 2.9" />
      <path d="M6.6 6.6A17.6 17.6 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function PasswordToggle({
  show,
  onToggle,
  label,
}: {
  show: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[var(--color-muted)] transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
    >
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}

const REQUIREMENTS = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "A lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "An uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "A number", test: (value: string) => /[0-9]/.test(value) },
];

export function SignUpForm() {
  const [state, action] = useActionState(registerAction, initial);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form action={action} className="mt-6 space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "signup-name-error" : undefined}
          className={fieldClass(Boolean(state.fieldErrors?.name))}
        />
        <FieldError id="signup-name-error" messages={state.fieldErrors?.name} />
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
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "signup-email-error" : undefined}
          className={fieldClass(Boolean(state.fieldErrors?.email))}
        />
        <FieldError id="signup-email-error" messages={state.fieldErrors?.email} />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(state.fieldErrors?.password)}
            aria-describedby={state.fieldErrors?.password ? "signup-password-error" : undefined}
            className={fieldClass(Boolean(state.fieldErrors?.password), "pr-12")}
          />
          <PasswordToggle
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            label={showPassword ? "Hide password" : "Show password"}
          />
        </div>
        <ul className="mt-2 space-y-1">
          {REQUIREMENTS.map((requirement) => {
            const met = password.length > 0 && requirement.test(password);
            return (
              <li key={requirement.label} className="flex items-center gap-1.5 text-xs">
                <span className={met ? "font-medium text-[#2563eb]" : "text-[var(--color-muted)]"}>
                  {met ? "✓" : "○"}
                </span>
                <span className={met ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}>
                  {requirement.label}
                </span>
              </li>
            );
          })}
        </ul>
        <FieldError id="signup-password-error" messages={state.fieldErrors?.password} />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
            aria-describedby={state.fieldErrors?.confirmPassword ? "signup-confirm-error" : undefined}
            className={fieldClass(Boolean(state.fieldErrors?.confirmPassword), "pr-12")}
          />
          <PasswordToggle
            show={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((v) => !v)}
            label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          />
        </div>
        <FieldError id="signup-confirm-error" messages={state.fieldErrors?.confirmPassword} />
      </div>

      {state.message && (
        <p role="alert" className="rounded-md border border-[var(--color-alert)] bg-[var(--color-alert)]/5 px-3 py-2 text-sm text-[var(--color-alert)]">
          {state.message}
        </p>
      )}

      <SubmitButton pendingLabel="Creating account…" className="w-full">
        Create account
      </SubmitButton>
    </form>
  );
}