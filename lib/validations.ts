import { z } from "zod";

// Shared between client forms and server actions — see tickets/07-ux-quality/UX-003-form-validation.md

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name."),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[a-z]/, "Include a lowercase letter.")
      .regex(/[A-Z]/, "Include an uppercase letter.")
      .regex(/[0-9]/, "Include a number."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const noteSchema = z.object({
  title: z.string().trim().min(1, "Please enter a note title.").max(120, "Keep the title under 120 characters."),
  content: z.string().trim().min(1, "Please enter some content.").max(20000, "This note is too long."),
});

export const searchSchema = z.object({
  q: z.string().trim().max(120).optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type NoteInput = z.infer<typeof noteSchema>;

// Let the form markup mirror the schema instead of restating it — the schema is
// the single source of truth for both client attributes and server checks.
export function textFieldProps(
  schema: z.ZodTypeAny,
  name: string,
): { required: boolean; minLength?: number; maxLength?: number } {
  const object =
    schema instanceof z.ZodEffects
      ? (schema.innerType() as z.ZodObject<z.ZodRawShape>)
      : (schema as z.ZodObject<z.ZodRawShape>);
  const field = object.shape[name] as z.ZodString | undefined;
  return {
    required: !(field?.isOptional() ?? false),
    minLength: field?.minLength ?? undefined,
    maxLength: field?.maxLength ?? undefined,
  };
}
