/** The arrow used on links and buttons. It points along the reading direction (flipped in RTL by CSS). */
export function Arrow({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 12" width="16" height="12" aria-hidden="true">
      <path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
