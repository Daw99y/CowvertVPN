"use client";

import type { ReactNode } from "react";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
  // specific props for compatibility, can be ignored or removed from call sites later
  delay?: number;
  animateOnLoad?: boolean;
};

export default function MotionSection({
  children,
  className,
  id,
  as = "div",
}: MotionSectionProps) {
  const Component = as;

  return (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
}
