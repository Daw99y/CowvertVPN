"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import MotionSection, { fadeInUp } from "@/app/components/ui/MotionSection";
import Modal from "./components/Modal";
import { useRouter } from "next/navigation";
import {
  LightningBoltIcon,
  GlobeIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  const router = useRouter();
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
              Privacy that minds its business.
            </p>
            <p className="mt-3 text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
              Open-source, lightweight, and built to keep your data yours —
              automatically.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MotionButton
                type="button"
                onClick={() => setIsDownloadModalOpen(true)}
                className="rounded-full px-7 py-3 text-base"
              >
                Download
              </MotionButton>
              <MotionButton
                type="button"
                variant="secondary"
                onClick={() => router.push("/pricing")}
                className="rounded-full px-7 py-3 text-base"
              >
                Lifetime Plan
              </MotionButton>
            </div>
            <p className="mt-4 text-xs md:text-sm text-zinc-400 flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center gap-2">
                <LightningBoltIcon
                  className="h-4 w-4 text-zinc-400"
                  aria-hidden
                />
                AES-256 + WireGuard
              </span>
              <span className="inline-flex items-center gap-2">
                <GlobeIcon className="h-4 w-4 text-zinc-400" aria-hidden />
                99+ global regions
              </span>
              <span className="inline-flex items-center gap-2">
                <LockClosedIcon className="h-4 w-4 text-zinc-400" aria-hidden />
                No logins required
              </span>
            </p>
          </motion.div>
        </div>
      </MotionSection>
    </>
  );
}
