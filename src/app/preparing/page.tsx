import Image from "next/image";

export default function PreparingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
      <Image
        src="/assets/preparing-rombuses.svg"
        alt=""
        width={740}
        height={740}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(72.3vh,90vw,740px)] -translate-x-1/2 -translate-y-1/2 object-contain"
        />

      <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
        Preparing your analysis ...
      </p>
    </main>
  );
}