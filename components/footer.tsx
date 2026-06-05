import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="pb-2.5 pt-5 text-center font-serif text-[13px] italic text-ink-mute">
      Courtside — est. 2024 · Utrecht
      <span aria-hidden="true" className="mx-2 not-italic text-line">
        ·
      </span>
      <Link
        href="/trainer-worden"
        className="not-italic font-mono text-[11px] uppercase tracking-[1px] text-ink-mute underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        Voor trainers
      </Link>
    </footer>
  );
}
