"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const raceOptions = [
  { name: "East Asian", confidence: 96, selected: true },
  { name: "White", confidence: 6, selected: false },
  { name: "Black", confidence: 3, selected: false },
  { name: "South Asian", confidence: 2, selected: false },
  { name: "Latino Hispanic", confidence: 0, selected: false },
  { name: "South East Asain", confidence: 0, selected: false },
  { name: "Middle Eastern", confidence: 0, selected: false },
];

const ageOptions = [
  { name: "0–9", confidence: 0, selected: false },
  { name: "10–19", confidence: 4, selected: false },
  { name: "20–29", confidence: 96, selected: true },
  { name: "30–39", confidence: 2, selected: false },
  { name: "40–49", confidence: 0, selected: false },
  { name: "50–59", confidence: 0, selected: false },
  { name: "60–69", confidence: 0, selected: false },
  { name: "70+", confidence: 0, selected: false },
];

export default function DemographicsPage() {
    const [activeCategory, setActiveCategory] =
  useState<"race" | "age">("race");

    const activeOptions =
    activeCategory === "race" ? raceOptions : ageOptions;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
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

      <section className="absolute left-5 top-21.5 uppercase sm:left-8">
        <p className="text-base font-semibold leading-6 tracking-[-0.02em]">
          A. I. Analysis
        </p>

        <h1 className="mt-1 text-[72px] font-normal leading-16 tracking-[-0.06em]">
          Demographics
        </h1>
    <div className="absolute left-147.5 top-6 flex gap-2">
    <button type="button" className="relative size-8" aria-label="Previous">
        <Image
        src="/assets/discover-icon-part-1.svg"
        alt=""
        fill
        sizes="32px"
        />
        <Image
        src="/assets/arrow-left.svg"
        alt=""
        fill
        sizes="8px"
        className="scale-[0.22] object-contain"
        />
    </button>

    <button type="button" className="relative size-8" aria-label="Next">
        <Image
        src="/assets/discover-icon-part-1.svg"
        alt=""
        fill
        sizes="32px"
        />
        <Image
        src="/assets/arrow-right.svg"
        alt=""
        fill
        sizes="8px"
        className="scale-[0.22] object-contain"
        />
    </button>
    </div>
        <p className="mt-1 text-sm leading-6">Predicted race &amp; age</p>
      </section>
        <div className="absolute left-5 top-[31.67vh] flex w-52 flex-col gap-2 sm:left-8">
        <button
  type="button"
  onClick={() => setActiveCategory("race")}
  className={`h-26 px-4 py-3 text-left ${
    activeCategory === "race"
      ? "bg-[#1A1B1C] text-[#FCFCFC]"
      : "bg-[#F3F3F4] text-[#1A1B1C]"
  }`}
>
            <p className="text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            East Asian
            </p>

            <p className="mt-8 text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            Race
            </p>
        </button>

        <button
        type="button"
        onClick={() => setActiveCategory("age")}
        className={`h-26 border-t border-[#1A1B1C] px-4 py-3 text-left ${
            activeCategory === "age"
                ? "bg-[#1A1B1C] text-[#FCFCFC]"
                : "bg-[#E1E1E2] text-[#1A1B1C]"
            }`}
        >
        <p className="text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            20–29
        </p>

        <p className="mt-8 text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            Age
        </p>
        </button>

        <div className="h-26 border-t border-[#1A1B1C] bg-[#F3F3F4] px-4 py-3">
            <p className="text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            Female
            </p>

            <p className="mt-8 text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            Sex
            </p>
            </div>
            </div>
            <section className="absolute left-64 top-[31.67vh] h-[56.67vh] w-[calc(75vw-272px)] border-t border-[#1A1B1C] bg-[#F3F3F4]">
            <h2 className="px-4 pt-3 text-[40px] font-normal leading-10 tracking-tighter">
            {activeCategory === "race" ? "East Asian" : "20–29 y.o."}
            </h2>
        <div className="absolute right-4 top-[14.17vh] flex size-[40vh] items-center justify-center rounded-full border-2 border-[#1A1B1C]">
        <span className="text-[40px] font-normal leading-10 tracking-tighter">
        96
        </span>

        <span className="mb-5 text-2xl font-normal leading-10 tracking-tighter">
        %
        </span>
        </div>
     </section>
        <section className="absolute left-[75%] top-[31.67vh] h-[56.67vh] w-[23.33%] border-t border-[#1A1B1C] bg-[#F3F3F4]">
            <div className="flex h-12 items-center justify-between px-4 text-base uppercase leading-6 tracking-[-0.02em]">
                <span>{activeCategory === "race" ? "Race" : "Age"}</span>
                <span>A. I. Confidence</span>
            </div>
        {activeOptions.map((option) => (
            <div
                key={option.name}
                className={`flex h-[5vh] items-center justify-between px-4 text-base ${
                option.selected
                    ? "bg-[#1A1B1C] text-[#FCFCFC]"
                    : "text-[#1A1B1C]"
                }`}
            >
                <span className="flex items-center gap-3">
                <Image
                    src={
                    option.selected
                        ? "/assets/race-option-selected.svg"
                        : "/assets/race-option.svg"
                    }
                    alt=""
                    width={12}
                    height={12}
                    aria-hidden="true"
                />

                {option.name}
                </span>

                <span>{option.confidence} %</span>
            </div>
            ))}        
        
    </section>
        <p className="absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-base tracking-[-0.02em] text-[#A0A4AB]">
        If A.I. estimate is wrong, select the correct one.
        </p>
    <Link
        href="/results"
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
            className="absolute bottom-9 right-36 border border-[#1A1B1C] px-4 py-2 text-sm font-semibold uppercase tracking-[-0.02em]"
            >
            Reset
            </button>
            <button
            type="button"
            className="absolute bottom-9 right-5 bg-[#1A1B1C] px-4 py-2 text-sm font-semibold uppercase tracking-[-0.02em] text-[#FCFCFC] sm:right-8"
            >
            Confirm
            </button>
    </main>
  );
}