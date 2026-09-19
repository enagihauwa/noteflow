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

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};
