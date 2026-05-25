import { HeroForm } from "./hero-form";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-8">
      <div className="container-site">
        {/* Editorial kicker */}
        <div className="mb-[22px] flex items-center gap-[10px]">
          <div className="h-px w-6 bg-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
            Padel · Program Nº 024
          </span>
        </div>

        {/* H1 */}
        <h1
          id="hero-heading"
          className="font-serif text-[48px] font-light leading-[0.92] tracking-[-1.8px] text-ink"
        >
          Les op
          <br />
          <em className="font-light not-italic">
            <span className="italic">jouw</span> niveau.
          </em>
          <br />
          <span className="hero-highlight">Elke week.</span>
        </h1>

        {/* Sub */}
        <p className="mt-6 max-w-hero-sub text-[15px] leading-[1.55] text-ink-dim md:max-w-hero-sub-md">
          Een boutique padel-programma dat jou koppelt aan spelers op exact jouw niveau — en
          gecertificeerde trainers die je verder brengen.
        </p>

        {/* Interactive form: niveau + planning + CTA */}
        <HeroForm />
      </div>
    </section>
  );
}
