"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/app/components/ui/MotionSection";

// New device/login visual for Section 2, pulled from the Figma design
const FIGMA_LOGIN_DEVICE =
  "https://www.figma.com/api/mcp/asset/ec8a7a87-adaa-41e8-89bc-3cbe281498d1";

export default function SectionLogin() {
  return (
    <section
      id="learn-section-2"
      className="border-t border-zinc-100 bg-white px-6 py-24 md:py-32 min-h-[80vh] flex items-center"
    >
      {/* Use a responsive grid: text on the left, device visual on the right */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left column – copy from the Figma design */}
        <div className="flex flex-col gap-6">
          {/* Overline label */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            No accounts. No friction.
          </p>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Login only if you want to.
          </h2>

          {/* Supporting paragraph */}
          <p className="max-w-xl text-base md:text-lg text-zinc-600">
            Cowvert works without sign-ups — but if you prefer to sync settings
            or unlock the lifetime plan across devices, you can use a
            lightweight login. <br /> No tracking. No data selling. Ever.
          </p>
        </div>

        {/* Right column – phone/login device visual without extra box/shadow */}
        <motion.div
          className="flex justify-center md:justify-end"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Image
            src={FIGMA_LOGIN_DEVICE}
            alt="Phone showing Cowvert login screen"
            width={452}
            height={914}
            className="h-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl object-contain transform xl:scale-110 2xl:scale-125 origin-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
