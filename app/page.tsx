"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import MotionSection, { fadeInUp } from "@/app/components/ui/MotionSection";
import Modal from "./components/Modal";

export default function Home() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {});
    }
  }, []);

  useEffect(() => {
    tryPlay();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    const handleFirstPointer = () => {
      tryPlay();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pointerdown", handleFirstPointer, { once: true });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointerdown", handleFirstPointer);
    };
  }, [tryPlay]);

  return (
    <>
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <MotionSection
        className="relative py-28 md:py-36 bg-white text-center px-6"
        animateOnLoad
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
          <motion.div
            className="w-48 h-48 md:w-60 md:h-60 mb-8 opacity-90 select-none"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              preload="auto"
              aria-hidden="true"
              onLoadedData={tryPlay}
            >
              <source src="/videos/CowvertBlinkLogo.webm" type="video/webm" />
            </video>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-zinc-900">
              Cowvert VPN
            </h1>
            <p className="mt-4 text-lg md:text-xl text-zinc-600 max-w-xl mx-auto">
              A lightweight, open‑source VPN that shields your data— <br />
              no unnecessary overhead, just privacy.
            </p>
            <MotionButton
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="mt-8 rounded-full px-7 py-3 text-base"
            >
              Download
            </MotionButton>
            <p className="mt-6 text-sm md:text-base text-zinc-400">
              Delivers clean, fast protection with transparent, open-source
              privacy.
            </p>
          </motion.div>
        </div>
      </MotionSection>
    </>
  );
}
