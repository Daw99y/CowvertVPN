"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import PurchaseModal from "@/app/components/PurchaseModal";
import { fadeInUp } from "@/app/components/ui/MotionSection";

const FIGMA_WORLD_MAP_IMAGE =
  "https://www.figma.com/api/mcp/asset/15f8b7ca-0e19-42ed-8ec3-a099fe90fbec";

// These two icons are now served locally from /public/images
const FIGMA_ASTERISK_ICON = "/images/learn-asterisk.png";

const FIGMA_BOLT_ICON = "/images/learn-bolt.png";

export default function SectionOnboarding() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <section
      id="learn-hero"
      className="relative min-h-screen flex items-center justify-center py-24 md:py-32 lg:py-36 px-6"
      aria-labelledby="learn-hero-heading"
    >
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
      {/* Constrain content to a readable width and center it */}
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        {/* Small overline label */}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Private by design
        </p>

        {/* Main heading and supporting copy taken from the Figma design */}
        <div className="mt-4 max-w-3xl text-center">
          <h1
            id="learn-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900"
          >
            A simpler way to stay secure online.
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-600">
            Cowvert keeps you fast, private, and invisible — no logins, no
            tracking, no stress.
          </p>
        </div>

        {/* Primary actions – stack on mobile, sit side‑by‑side on larger screens */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <motion.button
            type="button"
            onClick={() => setIsPurchaseModalOpen(true)}
            className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Start Free
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setIsPurchaseModalOpen(true)}
            className="inline-flex min-w-[140px] items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-6 py-3 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-white cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Lifetime Plan
          </motion.button>
        </div>

        {/* Footnote with tiny icon + copy */}
        <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
          {/* Tiny icon from the Figma design; using a plain <img> keeps things simple and works without extra Next.js config */}
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
            We don&apos;t collect your data. We barely want to know you exist.
          </p>
        </div>

        {/* Visual card inspired by the Figma layout */}
        <motion.div
          className="relative mt-16 w-full max-w-5xl"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        >
          {/* Outer window-style frame */}
          <div className="relative overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            {/* Top bar with macOS-like traffic lights */}
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400 shadow-sm" />
              <span className="h-3 w-3 rounded-full bg-amber-300 shadow-sm" />
              <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm" />
            </div>

            {/* World map image pulled from the Figma asset */}
            <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden border-y border-zinc-200 bg-zinc-100">
              <Image
                src={FIGMA_WORLD_MAP_IMAGE}
                alt="World map visualization for Cowvert VPN"
                fill
                priority
                className="object-cover object-center opacity-95"
              />
            </div>

            {/* Floating card that mimics the onboarding UI in the design */}
            <div className="flex items-center justify-center pb-10 pt-6 sm:pb-12 sm:pt-8">
              <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white px-8 pb-6 pt-10 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                {/* Circular icon on top of the card */}
                <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-linear-to-b from-zinc-900 to-black shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    <Image
                      src={FIGMA_BOLT_ICON}
                      alt="Fast connection icon"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </div>
                </div>

                {/* Card content – heading + paragraph */}
                <div className="text-center">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    Fast.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-zinc-500">
                    With servers all over the world, you get the highest speed
                    every time.
                  </p>
                </div>

                {/* Progress dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-zinc-900" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                </div>

                {/* Card actions – simple Skip / Next buttons */}
                <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                  <button
                    type="button"
                    className="text-zinc-500 transition hover:text-zinc-700 cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-linear-to-b from-zinc-900 to-black px-5 py-3 text-sm font-medium text-white shadow-md transition hover:from-black hover:to-zinc-900 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


