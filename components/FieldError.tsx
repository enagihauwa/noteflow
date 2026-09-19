export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p role="alert" className="mt-1 text-xs text-[var(--color-alert)]">
      {messages[0]}
    </p>
  );
}
