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

  const [showCameraPrompt, setShowCameraPrompt] = useState(false);

  const [isCameraSettingUp, setIsCameraSettingUp] = useState(false);

  const [capturedImage, setCapturedImage] = useState("");

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
  setIsCameraSettingUp(true);
  
  

  try {
const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        aspectRatio: { ideal: 16 / 9 },
      },
      audio: false,
    });

    streamRef.current = stream;
    setIsCameraSettingUp(false);
    setIsCameraOpen(true);

    window.setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }, 0);
  } catch {
    setIsCameraSettingUp(false);
    setError("Unable to access the camera. Please check your permissions.");
}
};

const stopCamera = () => {
  streamRef.current?.getTracks().forEach((track) => track.stop());
  streamRef.current = null;
  setIsCameraOpen(false);
};
  
const captureSelfie = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
    setError("The camera is not ready yet. Please try again.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    setError("Unable to capture the image.");
    return;
  }

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);

  setCapturedImage(imageDataUrl);
  stopCamera();
};

const analyzeCapturedImage = async () => {
  if (!capturedImage) return;

  setIsUploading(true);
  setError("");

  const base64Image = capturedImage.split(",")[1] ?? capturedImage;

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
    <main
  className={`relative min-h-screen overflow-hidden bg-[#FCFCFC] ${
    isCameraOpen || capturedImage ? "text-white" : "text-[#1A1B1C]"
  }`}
>
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center px-5 sm:px-8">
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[-0.02em]">
          <span>Skinstric</span>

         <span className="flex items-center gap-3 opacity-70">
        <span>[</span>
        {capturedImage ? (
        <span>Analysis</span>
      ) : !isCameraOpen ? (
        <span>Intro</span>
      ) : null}
        <span>]</span>
      </span>
        </div>
      </header>

      {!isCameraOpen && !isCameraSettingUp && !capturedImage && (
      <p className="absolute left-5 top-21.5 z-20 text-base font-semibold uppercase leading-6 tracking-[-0.02em] sm:left-8">
        To start analysis
      </p>
    )}

      {showCameraPrompt && !isCameraOpen && (
      <div className="absolute left-1/2 top-[39%] z-30 w-[calc(100%-2rem)] max-w-80 -translate-x-1/2 -translate-y-1/2 bg-[#1A1B1C] text-[#FCFCFC] md:left-[42%] md:top-1/2 md:w-80 md:translate-x-0">
        <p className="px-5 py-6 text-sm font-semibold uppercase">
          Allow A.I. to access your camera
        </p>
        

        <div className="flex border-t border-[#FCFCFC]/40 text-xs font-semibold uppercase">
          <button
            type="button"
            onClick={() => setShowCameraPrompt(false)}
            className="w-1/2 py-3"
          >
            Deny
          </button>

          <button
            type="button"
            onClick={() => {
              setShowCameraPrompt(false);
              startCamera();
            }}
            className="w-1/2 py-3"
          >
            Allow
          </button>
        </div>
      </div>
    )}

    {isCameraSettingUp && (
  <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#FCFCFC] text-[#1A1B1C]">
    <div className="relative size-105">
      <Image
        src="/assets/preparing-rombuses.svg"
        alt=""
        fill
        sizes="420px"
        className="object-contain"
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="relative size-24">
          <Image
            src="/assets/scan-camera.svg"
            alt=""
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>

        <p className="mt-4 whitespace-nowrap text-xs font-semibold uppercase">
          Setting up camera...
        </p>
      </div>
    </div>
  </div>
)}

    {capturedImage && (
  <Image
    src={capturedImage}
    alt="Captured selfie"
    fill
    unoptimized
    className="z-10 object-cover object-center"
  />
)}
  {capturedImage && (
  <p className="absolute left-1/2 top-[23%] z-40 -translate-x-1/2 text-xs font-medium uppercase text-white">
    Great Shot!
  </p>
)}

      {isCameraOpen && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="fixed inset-0 z-10 h-screen w-screen max-w-none bg-black object-contain object-center md:object-cover"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />

      {isCameraOpen && (
      <div className="absolute bottom-24 left-1/2 z-40 w-full -translate-x-1/2 px-3 text-center text-[9px] font-medium uppercase md:bottom-8 md:w-auto md:px-0 md:text-xs">
        <p className="mb-2">To get better results make sure to have</p>

        <p className="whitespace-nowrap">
          ◇ Neutral expression &nbsp;&nbsp; ◇ Frontal pose &nbsp;&nbsp; ◇ Adequate lighting
        </p>
      </div>
    )}

      {isCameraOpen && (
  <button
    type="button"
    onClick={captureSelfie}
    aria-label="Take picture"
    className="absolute right-8 top-1/2 z-40 h-15.5 w-42.25 -translate-y-1/2"
  >
    <Image
      src="/assets/take-pic.svg"
      alt=""
      fill
      sizes="169px"
      className="object-contain"
    />
  </button>
)}

      <div className={`${isCameraOpen || isCameraSettingUp || capturedImage ? "hidden" : ""} absolute left-1/2 top-[39%] size-[min(72vw,300px)] md:left-1/4 md:top-1/2 md:size-[min(40vw,482px)] -translate-x-1/2 -translate-y-1/2`}>
    <Image
        src="/assets/hover-rombuses.svg"
        alt=""
        fill
        sizes="482px"
        className="pointer-events-none object-contain"
    />

    <button
      onClick={() => setShowCameraPrompt(true)}
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

        <div className={`${isCameraOpen || isCameraSettingUp || capturedImage ? "hidden" : ""} absolute left-1/2 top-[68%] size-[min(72vw,300px)] md:left-3/4 md:top-1/2 md:size-[min(40vw,482px)] -translate-x-1/2 -translate-y-1/2`}>
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

    {capturedImage && (
      <button
        type="button"
        onClick={analyzeCapturedImage}
        disabled={isUploading}
        className="absolute bottom-9 right-5 z-40 flex items-center gap-4 text-xs font-medium uppercase text-white disabled:opacity-60 sm:right-8"
      >
        <span>{isUploading ? "Analyzing..." : "Proceed"}</span>

        <span className="relative h-11 w-11 overflow-hidden" aria-hidden="true">
          <Image
            src="/assets/button-icon-text-shrunk.svg"
            alt=""
            width={113}
            height={44}
            className="absolute right-0 top-0 h-11 w-28.25 rotate-180"
          />
        </span>
      </button>
    )}

      <Link
        href="/analysis"
        className="absolute bottom-9 left-5 z-20 flex items-center gap-4 text-sm font-semibold uppercase tracking-[-0.02em] opacity-70 sm:left-8"
      >
       {isCameraOpen || capturedImage ? (
  <Image
    src="/assets/button-icon-text-shrunk.svg"
    alt=""
    width={113}
    height={44}
    aria-hidden="true"
  />
) : (
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
)}

        {!isCameraOpen && !capturedImage && <span>Back</span>}
      </Link>
    </main>
  );
}