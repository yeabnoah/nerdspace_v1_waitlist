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

  const [shuffledImages, setShuffledImages] = useState<string[]>(imageList);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setShuffledImages(shuffleArray(imageList));
    setCurrentImageIndex(0);
    // eslint-disable-next-line
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
    <div className="min-h-screen h-screen overflow-hidden overflow-x-hidden flex flex-col relative bg-[#0A0A0A]">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 grain-overlay"
        aria-hidden="true"
      />

      {/* Top left logo */}
      {/* <div className="absolute z-20 bg-[#0A0A0A] sm:top-4 sm:left-4 top-2 left-2">
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
      </div> */}
      <div className="absolute z-20 sm:top-4 sm:left-4 top-2 left-2">
        <div className="rounded-full p-2 flex items-center justify-center">
          <span className="text-white text-lg font-bold">NerdSpace.</span>
        </div>
      </div>

      <div className="flex flex-1 h-full w-full min-h-0 bg-[#0A0A0A] flex-col md:flex-row">
        {/* Left: Text and buttons */}
        <div className="w-fit flex-1 md:flex-[0_0_35%] md:max-w-[35%] flex flex-col justify-center px-4 md:py-0 z-10 order-2 md:order-1 min-h-0">
          {/* On mobile, only show the heading and description, hide the form here */}
          <div className="relative max-w-full md:bottom-0 md:fixed md:left-5 md:max-w-[30%] mx-auto  md:block mt-8 flex flex-col flex-1 min-h-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-6 leading-tight">
              hi. this is
              <br />
              nerdspace.
            </h1>
            {/* On mobile, only show the heading and description, hide the form here */}
            <p className="text-gray-300 text-base sm:text-lg mb-2 sm:mb-6 flex-shrink-0">
              we built a space on the internet for people who love creating and
              building — to create, build and share their crafts with others
            </p>
            {/* Hide form on mobile here, show only on md+ */}
            <div className="mb-8 hidden md:block">
              <EmailSignup
                onSubmit={handleEmailSubmit}
                isSubmitted={isEmailSubmitted}
              />
            </div>
          </div>
        </div>
        {/* Right: Blurred image */}
        <div className="relative overflow-hidden md:sticky md:top-0 md:h-screen order-1 md:order-2 flex-1 md:flex-[0_0_65%] md:max-w-[65%] flex flex-col min-h-0">
          <div className="flex-1 relative min-h-0">
            <Image
              src={shuffledImages[currentImageIndex]}
              alt="Background person"
              width={1000}
              height={1000}
              className="object-cover w-[100%] h-full filter scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            {/* Built by text at bottom right of image side */}
            <div className="absolute font-bold bottom-2 right-2 sm:bottom-4 sm:right-4 z-30 text-gray-400 text-xs sm:text-sm">
              Built by{" "}
              <a
                href="https://x.com/technerd556"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                TechNerd
              </a>
            </div>
          </div>
        </div>
        {/* Mobile fixed form at bottom */}
        <div className="fixed bottom-0 left-0 pt-5 w-full z-30 bg-[#0A0A0A] px-4 border-t border-neutral-800 md:hidden">
          <EmailSignup
            onSubmit={handleEmailSubmit}
            isSubmitted={isEmailSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
