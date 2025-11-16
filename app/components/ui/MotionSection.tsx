"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const FADE_IN_UP_TRANSITION = {
  duration: 0.6,
  ease: "easeOut" as const,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: [0.98, 1],
    transition: FADE_IN_UP_TRANSITION,
  },
};

type MotionSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  animateOnLoad?: boolean;
};

export default function MotionSection({
  children,
  delay,
  className,
  id,
  animateOnLoad,
}: MotionSectionProps) {
  const transition =
    delay != null
      ? { ...FADE_IN_UP_TRANSITION, delay }
      : FADE_IN_UP_TRANSITION;

  return (
    <motion.section
      id={id}
      className={className}
      variants={fadeInUp}
      initial="hidden"
      transition={transition}
      {...(animateOnLoad
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "-100px" } })}
    >
      {children}
    </motion.section>
  );
}


