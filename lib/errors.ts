/** Thrown when a signed-in user asks for a record they do not own. */
export class NotAuthorizedError extends Error {
  constructor(message = "You are not authorized to access this note.") {
    super(message);
    this.name = "NotAuthorizedError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "That note no longer exists.") {
    super(message);
    this.name = "NotFoundError";
  }
}

export const GENERIC_ERROR = "Something went wrong. Please try again.";

// Fixed copy for the auth flows — see tickets/02-authentication/AUTH-007-auth-error-messages.md.
export const INVALID_CREDENTIALS = "Invalid email or password.";
export const DUPLICATE_EMAIL = "An account already exists with this email.";

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
