export function BrandMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="14" fill="#2563eb" />
      <g transform="rotate(-8 32 32)">
        <rect x="16" y="18" width="32" height="28" rx="4" fill="#f5f6f8" />
        <rect x="22" y="26" width="20" height="3.5" rx="1.75" fill="#dfe3e8" />
        <rect x="22" y="32" width="24" height="3.5" rx="1.75" fill="#dfe3e8" />
        <rect x="22" y="38" width="13" height="3.5" rx="1.75" fill="#f5f6f8" />
      </g>
      <path
        d="M24 54c12-6 25-6 30 0"
        stroke="#2563eb"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}