"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import EmailSignup from "./components/EmailSignup";

export default function Home() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);

  const imageList = useMemo(
    () => [
      "/03.png",
      "/01.png",
      "/Music.png",
      "/Enistine.png",
      "/Elon.png",
      "/05.png",
      "/04.png",
    ],
    []
  );

  function shuffleArray(array: string[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const [shuffledImages, setShuffledImages] = useState<string[]>(() =>
    shuffleArray(imageList)
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setShuffledImages(shuffleArray(imageList));
    setCurrentImageIndex(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex + 1 >= shuffledImages.length) {
          setShuffledImages(shuffleArray(imageList));
          return 0;
        }
        return prevIndex + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [shuffledImages, currentImageIndex, imageList]);

  const handleEmailSubmit = (email: string): void => {
    console.log("Email submitted:", email);
    setIsEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-hidden overflow-x-hidden flex flex-col relative bg-[#0A0A0A]">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 grain-overlay"
        aria-hidden="true"
      />

      {/* Top left logo */}
      <div className="absolute top-4 left-4 z-20 bg-[#0A0A0A]">
        <div className="rounded-full p-2 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="#fff" fillOpacity="0.9" />
            <path
              d="M7 17L17 7M7 7h10v10"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 min-h-screen bg-[#0A0A0A]">
        {/* Left: Text and buttons */}
        <div className="w-full md:w-[35%] bg-[#0A0A0A] flex flex-col justify-center px-8 py-16 md:py-0 z-10">
          <div className="bottom-0 fixed left-5 max-w-[30%] mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              hi. this is
              <br />
              nerdspace.
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              we built a space on the internet for people who love creating and
              building — to create, build and share it with others
            </p>
            <div className="mb-8">
              <EmailSignup
                onSubmit={handleEmailSubmit}
                isSubmitted={isEmailSubmitted}
              />
            </div>
          </div>
        </div>
        {/* Right: Blurred image */}
        <div className="hidden md:block w-[65%] relative overflow-hidden md:sticky md:top-0 md:h-screen">
          <Image
            src={shuffledImages[currentImageIndex]}
            alt="Background person"
            width={1000}
            height={1000}
            className="object-cover w-full h-full filter scale-105"
            priority
          />
          <div className="absolute insset-0 bg-black/40" />
          {/* Built by text at bottom right of image side */}
          <div className="absolute font-bold bottom-4 right-4 z-30 text-gray-400 text-sm">
            Built by{' '}
            <a
              href="https://x.com/technerd355" // TODO: Replace with your actual account URL
              target="_blank"
              rel="noopener noreferrer"
              className="underline  hover:text-white transition-colors"
            >
              TechNerd
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
