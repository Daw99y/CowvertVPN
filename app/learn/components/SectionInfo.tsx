"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/app/components/ui/MotionSection";

// Small circular icon used in Section 3 stats, now served locally from /public/images
const FIGMA_SECTION3_ICON = "/images/Chalk.png";

const TARGET_GOLDEN = 1.618;
const TARGET_SERVERS = 99;

export default function SectionInfo() {
  const [goldenValue, setGoldenValue] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) {
      return;
    }

    const durationMs = 1200;
    const stepMs = 40;
    const totalSteps = Math.max(1, Math.round(durationMs / stepMs));
    let currentStep = 0;

    const intervalId = window.setInterval(() => {
      currentStep += 1;
      const progress = currentStep / totalSteps;
      const clampedProgress = progress > 1 ? 1 : progress;

      setGoldenValue(TARGET_GOLDEN * clampedProgress);
      setServerCount(Math.round(TARGET_SERVERS * clampedProgress));

      if (clampedProgress >= 1) {
        setGoldenValue(TARGET_GOLDEN);
        setServerCount(TARGET_SERVERS);
        window.clearInterval(intervalId);
      }
    }, stepMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasAnimated]);

  const goldenDisplay = `${goldenValue.toFixed(3)}x`;
  const serverDisplay = `${serverCount}+`;

  return (
    <section
      id="learn-section-3"
      ref={sectionRef}
      className="bg-white px-6 min-h-[40vh] flex items-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 py-16">
        {/* Heading + paragraph block */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Overline label */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Why Cowvert exists
          </p>

          {/* Main heading */}
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Privacy shouldn&apos;t feel like a chore.
          </h2>

          {/* Supporting paragraph */}
          <p className="mt-4 text-base md:text-lg text-zinc-600">
            Cowvert was designed to make privacy effortless. <br />
            No account is required and no logs are ever stored. <br />
            Login is available for sync or lifetime access, but never mandatory.
          </p>
        </motion.div>

        {/* Metric cards row – stacks on mobile, sits side-by-side on larger screens */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Metric card 1 */}
          <motion.div
            className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-8 py-6 text-center shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.04 }}
          >
            <div className="flex items-center justify-center gap-3">
              <p className="text-3xl font-medium tracking-tight text-zinc-900">
                {goldenDisplay}
              </p>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900">
                <Image
                  src={FIGMA_SECTION3_ICON}
                  alt=""
                  width={24}
                  height={24}
                  className="h-4 w-4"
                />
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              Faster than typical free VPN services
            </p>
          </motion.div>

          {/* Metric card 2 */}
          <motion.div
            className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-8 py-6 text-center shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          >
            <div className="flex items-center justify-center gap-3">
              <p className="text-3xl font-medium tracking-tight text-zinc-900">
                {serverDisplay}
              </p>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900">
                <Image
                  src={FIGMA_SECTION3_ICON}
                  alt=""
                  width={24}
                  height={24}
                  className="h-4 w-4"
                />
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              Global servers and always expanding
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
