"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MotionButton from "@/components/ui/MotionButton";
import PurchaseModal from "@/app/components/PurchaseModal";
import { fadeInUp } from "@/app/components/ui/MotionSection";

// Section 5 map visual from the "You’re connected" Figma section
const FIGMA_CONNECTED_MAP =
  "https://www.figma.com/api/mcp/asset/09fae8f5-7dc8-41a8-867d-ba16d359ddc0";

// Asterisk icon reused from Section 1, served from /public/images
const FIGMA_ASTERISK_ICON = "/images/learn-asterisk.png";

export default function SectionConnected() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasStarted]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return (
    <section
      id="learn-section-5"
      ref={sectionRef}
      className="border-t border-zinc-100 bg-white px-6 py-24 md:py-32 min-h-screen flex items-center justify-center"
    >
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {/* Window-style card showing the connected state map */}
        <motion.div
          className="w-full max-w-5xl"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            {/* Top bar with simple header (mimics app chrome) */}
            <div className="flex items-center justify-between px-5 py-4 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400 shadow-sm" />
                <span className="h-3 w-3 rounded-full bg-amber-300 shadow-sm" />
                <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm" />
              </div>
              <p className="font-medium tracking-wide">USA</p>
              <p>
                Strength:{" "}
                <span className="font-medium text-zinc-800">Good</span>
              </p>
            </div>

            {/* Map background */}
            <div className="relative border-t border-zinc-200 bg-zinc-50">
              <div className="relative mx-auto my-10 h-56 w-[80%] rounded-2xl border border-zinc-200 bg-white">
                <Image
                  src={FIGMA_CONNECTED_MAP}
                  alt="Map view of Cowvert VPN connection"
                  fill
                  className="rounded-2xl object-cover object-center"
                />
              </div>

              {/* Connected status card overlay */}
              <div className="flex items-center justify-center pb-16">
                <div className="relative flex w-[260px] flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-8 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-zinc-900">Connected</span>
                  </div>
                  <p className="text-3xl font-semibold tracking-[0.18em] text-zinc-900">
                    {displayTime}
                  </p>
                </div>
              </div>

              {/* Power button */}
              <div className="pb-10 text-center">
                <MotionButton
                  type="button"
                  variant="icon"
                  aria-label="Toggle connection"
                  className="h-16 w-16 rounded-full bg-linear-to-b from-zinc-900 to-black text-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]"
                >
                  <span>⏻</span>
                </MotionButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text + CTAs below the card */}
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          {/* Overline */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Private by default
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            You&apos;re connected. That&apos;s all there is to it.
          </h2>

          {/* Supporting copy */}
          <p className="text-base md:text-lg text-zinc-600">
            Cowvert encrypts your traffic, hides your IP, and keeps you
            anonymous — automatically. No dashboards. No ads. No nonsense.
          </p>

          {/* CTA buttons row – reuse Start Free / Lifetime Plan pattern */}
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <MotionButton
              type="button"
              onClick={() => setIsPurchaseModalOpen(true)}
              className="min-w-[140px] rounded-full px-6 py-3 text-sm"
            >
              Start Free
            </MotionButton>
            <MotionButton
              type="button"
              variant="secondary"
              onClick={() => setIsPurchaseModalOpen(true)}
              className="min-w-[140px] rounded-full px-6 py-3 text-sm"
            >
              Lifetime Plan
            </MotionButton>
          </div>

          {/* Footnote with asterisk, reusing the same icon as Section 1 */}
          <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900/5">
              <Image
                src={FIGMA_ASTERISK_ICON}
                alt=""
                width={12}
                height={12}
                className="h-3 w-3"
              />
            </span>
            <p>
              Your data stays yours. We don&apos;t store it, share it, or sell
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
