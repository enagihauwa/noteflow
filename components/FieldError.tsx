export function FieldError({ messages, id }: { messages?: string[]; id?: string }) {
  if (!messages?.length) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-[var(--color-alert)]">
      {messages[0]}
    </p>
  );
}