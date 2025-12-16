"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

type MotionButtonVariant = "primary" | "secondary" | "text" | "icon";

type MotionButtonProps = {
  variant?: MotionButtonVariant;
  disableHover?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "inline-flex select-none items-center justify-center font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<MotionButtonVariant, string> = {
  primary: "bg-zinc-900 text-white shadow-sm hover:bg-zinc-800",
  secondary:
    "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-zinc-300 hover:bg-zinc-50",
  text: "bg-transparent text-zinc-500 hover:text-zinc-900",
  icon: "bg-zinc-900 text-white",
};

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  (
    {
      variant = "primary",
      className = "",
      disableHover = false,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const combinedClassName = [baseClasses, variantClasses[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

MotionButton.displayName = "MotionButton";

export default MotionButton;

