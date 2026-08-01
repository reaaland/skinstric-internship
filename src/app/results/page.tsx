import Image from "next/image";
import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
     <Image
        src="/assets/results-rombuses.svg"
        alt=""
        width={762}
        height={762}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(79.4vh,90vw,762px)] -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      <div className="absolute left-1/2 top-1/2 z-10 size-[min(46.2vh,52vw,444px)] -translate-x-1/2 -translate-y-1/2">
      <div className="absolute left-1/2 top-0 size-[49%] -translate-x-1/2">
        <div className="absolute inset-[14.65%] rotate-45 bg-[#E1E1E2]" />

        <p className="absolute inset-0 flex items-center justify-center text-center text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
          Demographics
        </p>
      </div>
      <div className="absolute left-0 top-[25.5%] size-[49%]">
      <div className="absolute inset-[14.65%] rotate-45 bg-[#F3F3F4]" />

      <p className="absolute inset-0 flex items-center justify-center text-center text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
        Skin Type
        <br />
        Details
      </p>
    </div>
    <div className="absolute left-[50.7%] top-[25.5%] size-[49%]">
    <div className="absolute inset-[14.65%] rotate-45 bg-[#F3F3F4]" />

    <p className="absolute inset-0 flex items-center justify-center text-center text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
      Cosmetic
      <br />
      Concerns
    </p>
  </div>
    <div className="absolute left-1/2 top-[51%] size-[49%] -translate-x-1/2">
    <div className="absolute inset-[14.65%] rotate-45 bg-[#F3F3F4]" />

    <p className="absolute inset-0 flex items-center justify-center text-center text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
      Weather
    </p>
  </div>
    </div>
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center px-5 sm:px-8">
        <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em]">
          <span>Skinstric</span>

          <span className="flex items-center gap-1.5 opacity-60">
            <span className="h-4.25 w-1 rounded-sm border border-[#1A1B1C]" />
            <span>Analysis</span>
            <span className="h-4.25 w-1 rounded-sm border border-[#1A1B1C]" />
          </span>
        </div>
      </header>

      <section className="absolute left-5 top-21.5 z-20 uppercase sm:left-8">
        <h1 className="text-base font-semibold leading-6 tracking-[-0.02em]">
          A. I. Analysis
        </h1>

        <p className="mt-2 text-sm leading-6">
          A. I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </section>
      <Link
        href="/scan"
        className="absolute bottom-9 left-5 z-20 flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] sm:left-8"
      >
        <span className="relative size-11 shrink-0" aria-hidden="true">
          <Image
            src="/assets/discover-icon-part-1.svg"
            alt=""
            fill
            sizes="44px"
          />

          <Image
            src="/assets/discover-icon-part-2.svg"
            alt=""
            fill
            sizes="44px"
          />

          <span className="absolute left-[35.71%] top-[37.63%] h-[24.74%] w-[21.43%]">
            <Image
              src="/assets/arrow-left.svg"
              alt=""
              fill
              sizes="10px"
              className="object-contain"
            />
          </span>
        </span>

        <span>Back</span>
      </Link>
      <button
        type="button"
        className="absolute bottom-9 right-5 z-20 flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] sm:right-8"
      >
        <span>Get Summary</span>

        <span className="relative size-11 shrink-0" aria-hidden="true">
          <Image
            src="/assets/discover-icon-part-1.svg"
            alt=""
            fill
            sizes="44px"
          />

          <Image
            src="/assets/discover-icon-part-2.svg"
            alt=""
            fill
            sizes="44px"
          />

          <span className="absolute left-[42.53%] top-[37.63%] h-[24.74%] w-[21.43%]">
            <Image
              src="/assets/arrow-right.svg"
              alt=""
              fill
              sizes="10px"
              className="object-contain"
            />
          </span>
        </span>
      </button>
    </main>
  );
}