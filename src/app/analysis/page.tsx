"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const router = useRouter();
  const [step, setStep] = useState<"name" | "location">("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const isValidText = (value: string) =>
  /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(value.trim());
  const handleNameSubmit = () => {
  if (!isValidText(name)) {
    setError("Please enter a valid name using letters only.");
    return;
  }

  setError("");
  setStep("location");
};
const handleLocationSubmit = async () => {
  if (!isValidText(location)) {
    setError("Please enter a valid location using letters only.");
    return;
  }

  setError("");

  try {
    const userInfo = {
      name: name.trim(),
      location: location.trim(),
    };

    const response = await fetch(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      },
    );

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    localStorage.setItem("skinstricUser", JSON.stringify(userInfo));
    router.push("/scan");
  } catch {
    setError("Unable to submit your information. Please try again.");
  }
};

 return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFCFC] text-[#1A1B1C]">
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center px-5 sm:px-8">
        <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em]">
          <span>Skinstric</span>

          <span className="flex items-center gap-1.5 opacity-60">
            <span className="h-4.25 w-1 rounded-sm border border-[#1A1B1C]" />
            <span>Intro</span>
            <span className="h-4.25 w-1 rounded-sm border border-[#1A1B1C]" />
          </span>
        </div>
      </header>

      <p className="absolute left-5 top-21.5 z-20 text-base font-semibold uppercase leading-6 tracking-[-0.02em] sm:left-8">
        To start analysis
      </p>

      <Image
        src="/assets/hover-rombuses.svg"
        alt=""
        width={762}
        height={762}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(79.4vh,90vw,762px)] -translate-x-1/2 -translate-y-1/2"
      />

    <div
        className={`absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${
            step === "name"
            ? "w-[min(85vw,417px)]"
            : location.trim()
                ? "w-[min(85vw,259px)]"
                : "w-[min(85vw,481px)]"
        }`}
        >
        <label
          htmlFor="name"
          className="mb-1 text-sm uppercase leading-6 opacity-40"
        >
          {step === "location" && location.trim()
            ? "Where are you from?"
            : "Click to type"}
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder={step === "name" ? "Introduce Yourself" : "Where are you from?"}
          value={step === "name" ? name : location}
          onChange={(event) =>
          step === "name"
              ? setName(event.target.value)
              : setLocation(event.target.value)
          }
          autoComplete={step === "name" ? "name" : "address-level2"}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;

            if (step === "name") {
              handleNameSubmit();
            } else {
              handleLocationSubmit();
            }
          }}
          className="w-full border-b border-[#1A1B1C] bg-transparent pb-1 text-center text-[clamp(40px,3.125vw,60px)] font-light leading-16 tracking-[-0.07em] outline-none placeholder:text-[#1A1B1C]"
        />
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <Link
        href={step === "name" ? "/" : "/analysis"}
        onClick={() => {
            if (step === "location") {
            setStep("name");
            }
        }}
        className="absolute bottom-9 left-5 z-20 flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] opacity-70 sm:left-8"
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
      {step === "location" && isValidText(location) && (
  <button
  type="button"
  onClick={handleLocationSubmit}
  className="absolute right-5 bottom-9 z-20 flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] opacity-70 sm:right-8"
>
    <span>Proceed</span>

    <span className="relative size-11 shrink-0" aria-hidden="true">
      <Image
        src="/assets/take-test-icon-part-1.svg"
        alt=""
        fill
        sizes="44px"
      />

      <Image
        src="/assets/take-test-icon-part-2.svg"
        alt=""
        fill
        sizes="44px"
      />

      <span className="absolute top-[37.63%] left-[42.53%] h-[24.74%] w-[21.43%]">
        <Image
          src="/assets/arrow-right.svg"
          alt=""
          fill
          sizes="10px"
          className="-scale-x-100 object-contain"
        />
      </span>
    </span>
  </button>
)}
    </main>
  );
}