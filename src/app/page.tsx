export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em]">
          <span>Skinstric</span>

          <span className="flex items-center gap-1.5 opacity-60">
            <span className="h-[17px] w-1 rounded-sm border border-[#1A1B1C]" />
            Intro
            <span className="h-[17px] w-1 rounded-sm border border-[#1A1B1C]" />
          </span>
        </div>

        <button
          type="button"
          className="bg-[#1A1B1C] px-4 py-2 text-[10px] font-semibold uppercase text-[#FCFCFC] sm:text-sm"
        >
          Enter Code
        </button>
      </header>

      <section className="flex min-h-screen items-center justify-center px-6">
        <h1 className="text-center text-[56px] leading-[0.9] tracking-[-0.07em] sm:text-[86px] lg:text-[120px]">
          Sophisticated
          <br />
          skincare
        </h1>
      </section>

      <p className="absolute bottom-8 left-8 hidden max-w-[330px] text-sm leading-5 uppercase text-[#1A1B1C]/70 md:block">
        Skinstric developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </p>

      <button
        type="button"
        className="absolute bottom-8 right-8 flex items-center gap-4 text-sm font-semibold uppercase"
      >
        Enter Experience

        <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-[#1A1B1C]">
          <span className="-rotate-45 text-xl">→</span>
        </span>
      </button>
    </main>
  );
}