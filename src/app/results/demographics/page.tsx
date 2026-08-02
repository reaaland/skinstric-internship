"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AnalysisScores = Record<string, number>;

type AnalysisData = {
  race: AnalysisScores;
  age: AnalysisScores;
  gender: AnalysisScores;
};

type Category = "race" | "age" | "gender";

export default function DemographicsPage() {
  const router = useRouter();

  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("skinstricAnalysis");

    if (!storedAnalysis) return;

    const timeoutId = window.setTimeout(() => {
      try {
        setAnalysisData(JSON.parse(storedAnalysis).data);
      } catch {
        setAnalysisData(null);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const getTopResult = (scores: AnalysisScores | undefined) =>
    Object.entries(scores ?? {}).sort(
      ([, firstScore], [, secondScore]) => secondScore - firstScore,
    )[0];

  const [activeCategory, setActiveCategory] = useState<Category>("race");

  const [selectedResults, setSelectedResults] = useState<
    Record<Category, string | null>
  >({
    race: null,
    age: null,
    gender: null,
  });

  useEffect(() => {
    const storedConfirmedResults = localStorage.getItem(
      "skinstricConfirmedResults",
    );

    if (!storedConfirmedResults) return;

    const timeoutId = window.setTimeout(() => {
      try {
        setSelectedResults(JSON.parse(storedConfirmedResults));
      } catch {
        localStorage.removeItem("skinstricConfirmedResults");
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const activeScores = analysisData?.[activeCategory] ?? {};

  const activeOptions = Object.entries(activeScores)
    .sort(([, firstScore], [, secondScore]) => secondScore - firstScore)
    .map(([name, confidence], index) => ({
      name,
      confidence: confidence * 100,
      selected:
        selectedResults[activeCategory] !== null
          ? name === selectedResults[activeCategory]
          : index === 0,
    }));

  const selectedOption =
    activeOptions.find((option) => option.selected) ?? activeOptions[0];
  const topRace = getTopResult(analysisData?.race);
  const topAge = getTopResult(analysisData?.age);
  const topGender = getTopResult(analysisData?.gender);

  const handleConfirm = () => {
    const confirmedResults = {
      race: selectedResults.race ?? topRace?.[0] ?? null,
      age: selectedResults.age ?? topAge?.[0] ?? null,
      gender: selectedResults.gender ?? topGender?.[0] ?? null,
    };

    localStorage.setItem(
      "skinstricConfirmedResults",
      JSON.stringify(confirmedResults),
    );

    router.push("/results");
  };

  const handleReset = () => {
    setSelectedResults({
      race: null,
      age: null,
      gender: null,
    });
  };

  const formatLabel = (value: string | undefined) =>
    value ? value.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "—";

  return (
    <main className="relative min-h-300 overflow-x-hidden bg-[#FCFCFC] pb-20 text-[#1A1B1C] lg:min-h-screen lg:overflow-hidden lg:pb-0">
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

        <h1 className="mt-1 text-[38px] font-normal leading-10 tracking-[-0.06em] sm:text-[56px] sm:leading-14 lg:text-[72px] lg:leading-16">
          Demographics
        </h1>
        <div className="absolute left-147.5 top-6 flex gap-2">
          <button
            type="button"
            className="relative size-8"
            aria-label="Previous"
          >
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
      <div className="relative mx-4 mt-52.5 flex flex-col gap-2 sm:mx-8 lg:absolute lg:left-8 lg:top-[31.67vh] lg:mx-0 lg:mt-0 lg:w-52">
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
            {formatLabel(selectedResults.race ?? topRace?.[0])}
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
            {formatLabel(selectedResults.age ?? topAge?.[0])}
          </p>

          <p className="mt-8 text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            Age
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("gender")}
          className={`h-26 border-t border-[#1A1B1C] px-4 py-3 text-left ${
            activeCategory === "gender"
              ? "bg-[#1A1B1C] text-[#FCFCFC]"
              : "bg-[#F3F3F4] text-[#1A1B1C]"
          }`}
        >
          <p className="text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            {formatLabel(selectedResults.gender ?? topGender?.[0])}
          </p>

          <p className="mt-8 text-base font-semibold uppercase leading-6 tracking-[-0.02em]">
            Sex
          </p>
        </button>
      </div>
      <section className="hidden lg:block absolute left-64 top-[31.67vh] h-[56.67vh] w-[calc(75vw-272px)] border-t border-[#1A1B1C] bg-[#F3F3F4]">
        <h2 className="px-4 pt-3 text-[40px] font-normal leading-10 tracking-tighter">
          {selectedOption
            ? `${formatLabel(selectedOption.name)}${
                activeCategory === "age" ? " y.o." : ""
              }`
            : "—"}
        </h2>

        <div className="absolute right-4 top-[14.17vh] flex size-[40vh] items-center justify-center rounded-full border-2 border-[#1A1B1C]">
          <span className="text-[40px] font-normal leading-10 tracking-tighter">
            {selectedOption ? selectedOption.confidence.toFixed(2) : "0.00"}
          </span>

          <span className="mb-5 text-2xl font-normal leading-10 tracking-tighter">
            %
          </span>
        </div>
      </section>

      <section className="relative mx-4 mt-2 border-t border-[#1A1B1C] bg-[#F3F3F4] p-4 sm:mx-8 lg:hidden">
        <h2 className="text-3xl font-normal tracking-[-0.04em]">
          {selectedOption
            ? `${formatLabel(selectedOption.name)}${
                activeCategory === "age" ? " y.o." : ""
              }`
            : "—"}
        </h2>

        <div className="mx-auto mt-6 flex size-52 items-center justify-center rounded-full border-2 border-[#1A1B1C]">
          <span className="text-4xl">
            {selectedOption ? selectedOption.confidence.toFixed(2) : "0.00"}
          </span>
          <span className="mb-4 text-xl">%</span>
        </div>
      </section>

      <section className="relative mx-4 mt-2 bg-[#F3F3F4] sm:mx-8 lg:hidden">
        <div className="flex h-12 items-center justify-between px-4 text-sm uppercase">
          <span>
            {activeCategory === "gender"
              ? "Gender"
              : activeCategory === "race"
                ? "Race"
                : "Age"}
          </span>

          <span>A. I. Confidence</span>
        </div>

        {activeOptions.map((option) => (
          <button
            type="button"
            key={option.name}
            onClick={() =>
              setSelectedResults((current) => ({
                ...current,
                [activeCategory]: option.name,
              }))
            }
            className={`flex min-h-12 w-full items-center justify-between px-4 text-left text-sm ${
              option.selected ? "bg-[#1A1B1C] text-[#FCFCFC]" : "text-[#1A1B1C]"
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

            <span>{option.confidence.toFixed(2)} %</span>
          </button>
        ))}
      </section>

      <section className="hidden lg:block absolute left-[75%] top-[31.67vh] h-[56.67vh] w-[23.33%] border-t border-[#1A1B1C] bg-[#F3F3F4]">
        <div className="flex h-12 items-center justify-between px-4 text-base uppercase leading-6 tracking-[-0.02em]">
          <span>
            {activeCategory === "gender"
              ? "Gender"
              : activeCategory === "race"
                ? "Race"
                : "Age"}
          </span>
          <span>A. I. Confidence</span>
        </div>
        {activeOptions.map((option) => (
          <button
            type="button"
            onClick={() =>
              setSelectedResults((current) => ({
                ...current,
                [activeCategory]: option.name,
              }))
            }
            key={option.name}
            className={`flex h-[5vh] w-full items-center justify-between px-4 text-left text-base ${
              option.selected ? "bg-[#1A1B1C] text-[#FCFCFC]" : "text-[#1A1B1C]"
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

            <span>{option.confidence.toFixed(2)} %</span>
          </button>
        ))}
      </section>
      <p className="relative mx-4 mt-4 text-center text-sm tracking-[-0.02em] text-[#A0A4AB] sm:mx-8 lg:absolute lg:bottom-9 lg:left-1/2 lg:mx-0 lg:mt-0 lg:-translate-x-1/2 lg:whitespace-nowrap lg:text-base">
        If A.I. estimate is wrong, select the correct one.
      </p>
      <Link
        href="/results"
        className="absolute bottom-0 left-4 z-20 flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] sm:left-8 lg:bottom-9"
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
        onClick={handleReset}
        type="button"
        className="absolute bottom-0 right-36 lg:bottom-9 border border-[#1A1B1C] px-4 py-2 text-sm font-semibold uppercase tracking-[-0.02em]"
      >
        Reset
      </button>

      <button
        onClick={handleConfirm}
        type="button"
        className="absolute bottom-0 right-8 lg:bottom-9 bg-[#1A1B1C] px-4 py-2 text-sm font-semibold uppercase tracking-[-0.02em] text-[#FCFCFC] sm:right-8"
      >
        Confirm
      </button>
    </main>
  );
}
