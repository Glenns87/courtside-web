import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 backdrop-nav border-b border-line">
      <div className="flex items-center justify-between px-5 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-[9px]" aria-label="Courtside Padel home">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="11" cy="11" r="10" fill="#1E3A2F" />
            <path d="M7 11 Q 11 4, 15 11" stroke="#F4EFE3" strokeWidth="1.6" fill="none" />
            <path d="M7 11 Q 11 18, 15 11" stroke="#F4EFE3" strokeWidth="1.6" fill="none" />
          </svg>
          <span className="font-serif text-[20px] font-medium tracking-[-0.4px] text-ink">
            Courtside Padel
          </span>
        </Link>
      </div>
    </header>
  );
}
