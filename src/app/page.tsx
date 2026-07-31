import Image from "next/image";

type DirectionButtonProps = {
  direction: "left" | "right";
  label: string;
  className?: string;
};

function DirectionButton({
  direction,
  label,
  className = "",
}: DirectionButtonProps) {
  const isLeft = direction === "left";

  const iconPrefix = isLeft ? "discover" : "take-test";
  const arrowFile = isLeft ? "arrow-left.svg" : "arrow-right.svg";

  const icon = (
    <span className="relative size-11 shrink-0" aria-hidden="true">
      <Image
        src={`/assets/${iconPrefix}-icon-part-1.svg`}
        alt=""
        fill
        sizes="44px"
      />

      <Image
        src={`/assets/${iconPrefix}-icon-part-2.svg`}
        alt=""
        fill
        sizes="44px"
      />

      <span
        className={
          isLeft
            ? "absolute left-[35.71%] top-[37.63%] h-[24.74%] w-[21.43%]"
            : "absolute left-[42.53%] top-[37.63%] h-[24.74%] w-[21.43%]"
        }
      >
        <Image
          src={`/assets/${arrowFile}`}
          alt=""
          fill
          sizes="10px"
          className={isLeft ? "object-contain" : "-scale-x-100 object-contain"}
        />
      </span>
    </span>
  );

  return (
    <button
      type="button"
      className={`items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] opacity-70 ${className}`}
    >
      {isLeft && icon}
      <span>{label}</span>
      {!isLeft && icon}
    </button>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em]">
          <span>Skinstric</span>

          <span className="flex items-center gap-1.5 opacity-60">
            <span className="h-[17px] w-1 rounded-sm border border-[#1A1B1C]" />
            <span>Intro</span>
            <span className="h-[17px] w-1 rounded-sm border border-[#1A1B1C]" />
          </span>
        </div>

        <button
          type="button"
          className="bg-[#1A1B1C] px-4 py-2 text-[10px] font-semibold uppercase tracking-[-0.02em] text-[#FCFCFC]"
        >
          Enter Code
        </button>
      </header>

      <Image
        src="/assets/landing-diamond.svg"
        alt=""
        width={602}
        height={602}
        aria-hidden="true"
        className="pointer-events-none absolute left-[-301px] top-1/2 hidden -translate-y-1/2 xl:block"
      />

      <Image
        src="/assets/landing-diamond.svg"
        alt=""
        width={602}
        height={602}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-301px] top-1/2 hidden -translate-y-1/2 xl:block"
      />

      <section className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="text-center text-[clamp(56px,6.67vw,128px)] font-light leading-[0.9375] tracking-[-0.07em]">
          Sophisticated
          <br />
          skincare
        </h1>
      </section>

      <DirectionButton
        direction="left"
        label="Discover A.I."
        className="absolute left-8 top-1/2 hidden -translate-y-1/2 md:flex"
      />

      <DirectionButton
        direction="right"
        label="Take Test"
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:flex"
      />

      <p className="absolute bottom-[26px] left-8 hidden text-sm leading-6 uppercase md:block">
        Skinstric developed an A.I. that creates
        <br />
        a highly-personalised routine tailored to
        <br />
        what your skin needs.
      </p>

      <div className="absolute inset-x-5 bottom-6 flex items-center justify-between md:hidden">
        <DirectionButton
          direction="left"
          label="Discover A.I."
          className="flex"
        />

        <DirectionButton direction="right" label="Take Test" className="flex" />
      </div>
    </main>
  );
}