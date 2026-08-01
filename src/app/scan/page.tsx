"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);

  const [error, setError] = useState("");

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
  if (!isCameraOpen || !videoRef.current || !streamRef.current) return;

  videoRef.current.srcObject = streamRef.current;
}, [isCameraOpen]);

useEffect(() => {
  return () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };
}, []);

const canvasRef = useRef<HTMLCanvasElement>(null);

const startCamera = async () => {
  setError("");

  try {
const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });

    streamRef.current = stream;
    setIsCameraOpen(true);

    window.setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }, 0);
  } catch {
    setError("Unable to access the camera. Please check your permissions.");
  }
};

const stopCamera = () => {
  streamRef.current?.getTracks().forEach((track) => track.stop());
  streamRef.current = null;
  setIsCameraOpen(false);
};
  
const captureSelfie = async () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
    setError("The camera is not ready yet. Please try again.");
    return;
  }

  setIsUploading(true);
  setError("");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    setError("Unable to capture the image.");
    setIsUploading(false);
    return;
  }

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const base64Image = canvas
    .toDataURL("image/jpeg", 0.9)
    .split(",")[1];

  stopCamera();

  try {
    const response = await fetch(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      },
    );

    if (!response.ok) {
      throw new Error("Image analysis failed");
    }

    const analysisData = await response.json();

    localStorage.setItem(
      "skinstricAnalysis",
      JSON.stringify(analysisData),
    );

    router.push("/results/demographics");
  } catch {
    setError("Unable to analyze the selfie. Please try again.");
    setIsUploading(false);
  }
};

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (!file) return;

  setIsUploading(true);
  setError("");

  const reader = new FileReader();

  reader.onloadend = async () => {
    if (typeof reader.result !== "string") {
      setError("Unable to read the selected image.");
      setIsUploading(false);
      return;
    }

    const base64Image = reader.result.split(",")[1] ?? reader.result;

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        },
      );

      if (!response.ok) {
        throw new Error("Image analysis failed");
      }

      const analysisData = await response.json();

      localStorage.setItem(
        "skinstricAnalysis",
        JSON.stringify(analysisData),
      );

      router.push("/results/demographics");
    } catch {
      setError("Unable to analyze the image. Please try again.");
      setIsUploading(false);
    }
  };

  reader.readAsDataURL(file);
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

      {isCameraOpen && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute left-1/2 top-1/2 z-30 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-black object-cover"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />

      {isCameraOpen && (
      <button
        type="button"
        onClick={captureSelfie}
        className="absolute bottom-12 left-1/2 z-40 -translate-x-1/2 bg-[#FCFCFC] px-6 py-3 text-sm font-semibold uppercase"
      >
        Take Picture
      </button>
    )}

      <div className="absolute left-1/4 top-1/2 z-10 size-[min(40vw,482px)] -translate-x-1/2 -translate-y-1/2">
    <Image
        src="/assets/hover-rombuses.svg"
        alt=""
        fill
        sizes="482px"
        className="pointer-events-none object-contain"
    />

    <button
      onClick={startCamera}
        type="button"
        aria-label="Allow AI to scan your face"
        className="absolute left-1/2 top-1/2 size-34 -translate-x-1/2 -translate-y-1/2"
        >
        <Image
            src="/assets/scan-camera.svg"
            alt=""
            fill
            sizes="136px"
            className="object-contain"
        />
        </button>

        <Image
        src="/assets/scan-camera-label.svg"
        alt=""
        width={239}
        height={76}
        aria-hidden="true"
        className="pointer-events-none absolute left-[58.3%] top-[26.1%] h-auto w-[49.6%]"
        />
        </div>

        <div className="absolute left-3/4 top-1/2 z-10 size-[min(40vw,482px)] -translate-x-1/2 -translate-y-1/2">
  <Image
    src="/assets/hover-rombuses.svg"
    alt=""
    fill
    sizes="482px"
    className="pointer-events-none object-contain"
  />
  <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="hidden"
/>

  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    aria-label="Allow AI to access your gallery"
    className="absolute left-1/2 top-1/2 size-34 -translate-x-1/2 -translate-y-1/2"
  >
    <Image
      src="/assets/scan-gallery.svg"
      alt=""
      fill
      sizes="136px"
      className="object-contain"
    />
  </button>

  <Image
    src="/assets/scan-gallery-label.svg"
    alt=""
    width={210}
    height={93}
    aria-hidden="true"
    className="pointer-events-none absolute left-[-1.2%] top-[58.3%] h-auto w-[43.6%]"
  />
    </div>
    {(isUploading || error) && (
      <p className="absolute left-1/2 top-[68%] w-64 -translate-x-1/2 text-center text-sm">
        {isUploading ? "Analyzing image..." : error}
      </p>
    )}

      <Link
        href="/analysis"
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
    </main>
  );
}