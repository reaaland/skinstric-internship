"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DirectionButtonProps = {
  direction: "left" | "right";
  label: string;
  className?: string;
  expanded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
};

function DirectionButton({
  direction,
  label,
  className = "",
  expanded = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: DirectionButtonProps) {
  const isLeft = direction === "left";

  const defaultIcon = (
    <span className="relative size-11 shrink-0" aria-hidden="true">
      <Image
        src={`/assets/${
          isLeft ? "discover-icon-part-1.svg" : "take-test-icon-part-1.svg"
        }`}
        alt=""
        fill
        sizes="44px"
      />

      <Image
        src={`/assets/${
          isLeft ? "discover-icon-part-2.svg" : "take-test-icon-part-2.svg"
        }`}
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
          src={`/assets/${isLeft ? "arrow-left.svg" : "arrow-right.svg"}`}
          alt=""
          fill
          sizes="10px"
          className={
            isLeft ? "object-contain" : "-scale-x-100 object-contain"
          }
        />
      </span>
    </span>
  );

  const expandedIcon = (
    <span className="relative size-19.5 shrink-0" aria-hidden="true">
      <Image
        src="/assets/take-test-expanded-part-1.svg"
        alt=""
        fill
        sizes="78px"
      />

      <Image
        src="/assets/take-test-expanded-part-2.svg"
        alt=""
        fill
        sizes="78px"
      />

      <span className="absolute inset-[11.29%]">
        <Image
          src="/assets/take-test-inner-dash.png"
          alt=""
          fill
          sizes="61px"
        />
      </span>

      <span className="absolute bottom-[44.41%] left-[46.11%] right-[44.21%] top-[44.41%]">
        <Image
          src="/assets/take-test-expanded-arrow.svg"
          alt=""
          fill
          sizes="8px"
          className="-scale-x-100 object-contain"
        />
      </span>
    </span>
  );

  return (
  <button
    type="button"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onFocus={onFocus}
    onBlur={onBlur}
    onClick={onClick}
    className={`items-center text-sm font-semibold uppercase tracking-[-0.02em] transition-all duration-700 ease-out ${
      expanded ? "gap-6 opacity-100" : "gap-4 opacity-70"
    } ${className}`}
  >
    {isLeft && defaultIcon}

    <span>{label}</span>

    {!isLeft && (expanded ? expandedIcon : defaultIcon)}
  </button>
);
}

export default function Home() {
  const router = useRouter();
  const [takeTestHovered, setTakeTestHovered] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em]">
          <span>Skinstric</span>

          <span className="flex items-center gap-1.5 opacity-60">
            <span className="h-4.25 w-1 rounded-sm border border-[#1A1B1C]" />
            <span>Intro</span>
            <span className="h-4.25 w-1 rounded-sm border border-[#1A1B1C]" />
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
        className={`pointer-events-none absolute -left-75.25 top-1/2 hidden size-150.5 -translate-y-1/2 transition-opacity duration-500 xl:block ${
          takeTestHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      <Image
        src="/assets/landing-diamond.svg"
        alt=""
        width={602}
        height={602}
        aria-hidden="true"
        className={`pointer-events-none absolute -right-75.25 top-1/2 hidden size-150.5 -translate-y-1/2 transition-opacity duration-500 xl:block ${
          takeTestHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      <Image
        src="/assets/hover-rombuses.svg"
        alt=""
        width={762}
        height={762}
        aria-hidden="true"
        className={`pointer-events-none absolute -right-95.25 top-1/2 hidden size-190.5 -translate-y-1/2 transition-opacity duration-700 xl:block ${
          takeTestHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <h1
        className={`absolute top-1/2 z-10 whitespace-nowrap text-[clamp(56px,6.67vw,128px)] font-light leading-[0.9375] tracking-[-0.07em] transition-all duration-700 ease-out ${
          takeTestHovered
            ? "left-8 -translate-y-1/2 text-left"
            : "left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        }`}
      >
        Sophisticated
        <br />
        skincare
      </h1>

      <div
        className={`absolute left-8 top-1/2 hidden -translate-y-1/2 transition-opacity duration-300 md:block ${
          takeTestHovered
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
        <DirectionButton
          direction="left"
          label="Discover A.I."
          className="flex"
        />
      </div>

      <DirectionButton
        direction="right"
        label="Take Test"
        expanded={takeTestHovered}
        onMouseEnter={() => setTakeTestHovered(true)}
        onMouseLeave={() => setTakeTestHovered(false)}
        onFocus={() => setTakeTestHovered(true)}
        onBlur={() => setTakeTestHovered(false)}
        onClick={() => router.push("/analysis")}
        className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 md:flex"
      />

      <p className="absolute bottom-6.5 left-8 hidden text-sm leading-6 uppercase md:block">
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
      </div>
    </main>
  );
}