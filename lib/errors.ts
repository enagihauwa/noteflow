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
export const INVALID_CREDENTIALS = "Invalid email or password.";
export const DUPLICATE_EMAIL = "An account already exists with this email.";

// Copy for the boundary and 404 pages — see tickets/07-ux-quality/UX-004.
// The user-facing wording lives here so every screen reads the same and nothing
// sensitive (stacks, SQL, ids) is ever interpolated into it.
export const ERROR_PAGE_TITLE = "Something went wrong.";
export const ERROR_PAGE_BODY = "The page could not load. Try again.";
export const RETRY_LABEL = "Try again";
export const NOT_FOUND_TITLE = "That page does not exist.";
export const NOT_FOUND_BODY = "The link may be wrong, or the note was deleted.";
export const BACK_TO_NOTES = "Back to your notes";

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
