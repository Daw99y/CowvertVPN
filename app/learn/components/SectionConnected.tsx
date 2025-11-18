"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import PurchaseModal from "@/app/components/PurchaseModal";
import MotionSection from "@/app/components/ui/MotionSection";

// Map image from new Figma design
const FIGMA_CONNECTED_MAP =
  "https://www.figma.com/api/mcp/asset/3ae0076e-b3b3-4afd-9661-c1299ad8c036";

// Asterisk icon reused from Section 1
const FIGMA_ASTERISK_ICON = "/images/learn-asterisk.png";

// Stats bar icons - reusing existing icons from public/images
const CONNECTED_ICON = "/images/nodes.png";
const LOCATION_ICON = "/images/global.png";
const PROTOCOL_ICON = "/images/ybolt.png";
const LOCK_ICON = "/images/server-icon.png";

export default function SectionConnected() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver to start timer when section is visible
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

  // Timer interval
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

  // Format time as MM:SS
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return (
    <section
      id="learn-section-5"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 md:py-32 lg:py-36 px-6 bg-white"
    >
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />

      <MotionSection className="mx-auto flex w-full flex-col items-center">
        {/* Visual window mockup from Figma design */}
        <div className="relative mt-16 w-full">
          <ResponsiveConnectedContainer displayTime={displayTime} />
        </div>

        {/* Text + CTAs below the card */}
        <div className="mt-12 flex max-w-3xl flex-col items-center gap-6 text-center">
          {/* Overline */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Private by default
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            You&apos;re connected. <br />
            That&apos;s all there is to it.
          </h2>

          {/* Supporting copy */}
          <p className="text-base md:text-lg text-zinc-600">
            Cowvert encrypts your traffic, hides your IP, and keeps you
            anonymous — automatically. No dashboards to configure. No ads. No
            nonsense.
          </p>

          {/* CTA buttons row */}
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

          {/* Footnote with asterisk */}
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
              Cross-platform support macOS · Windows · Linux · iOS · Android
            </p>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}

/**
 * ResponsiveConnectedContainer – Scales the 1400x900 window proportionally
 * Maintains aspect ratio and scales down on smaller screens like an image
 */
function ResponsiveConnectedContainer({
  displayTime,
}: {
  displayTime: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const scale = Math.min(1, containerWidth / 1400);
        contentRef.current.style.transform = `scale(${scale})`;
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8">
      {/* Container that maintains aspect ratio */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-[1400px]"
      >
        {/* 
          Using aspect ratio trick: paddingBottom creates height based on width
          900 / 1400 = 0.642857 = 64.2857%
        */}
        <div className="relative w-full" style={{ paddingBottom: "64.2857%" }}>
          {/* Absolutely positioned content that scales */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div
              ref={contentRef}
              style={{
                width: "1400px",
                height: "900px",
                transformOrigin: "top center",
                transition: "transform 0.2s ease-out",
              }}
            >
              <ConnectedWindow displayTime={displayTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ConnectedWindow – macOS-style mockup matching Figma design (1400x900)
 * Shows connected VPN state with map, stats, and timer
 */
function ConnectedWindow({ displayTime }: { displayTime: string }) {
  return (
    <div className="relative mx-auto w-[1400px] h-[900px] rounded-[30px] bg-white border-[2] border-black-200/80 shadow-[0_7.2px_21.6px_rgba(0,0,0,0.096)]">
      {/* Inner content wrapper with overflow-hidden to clip map and internals */}
      <div className="relative w-full h-full rounded-[30px] overflow-hidden">
        {/* macOS traffic lights */}
        <div className="absolute left-[20px] top-[20px] flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28ca42]" />
        </div>

        {/* Location selector (top-left) */}
        <div className="absolute left-[48px] top-[48px] h-[38.5px] w-[83.32px] rounded-[10px] bg-white/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center justify-between px-4">
          <p className="text-[15px] font-medium text-black">USA</p>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="opacity-60"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Signal strength (top-right) */}
        <div className="absolute left-[1216.22px] top-[48px] h-[38.5px] rounded-[10px] bg-white/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center gap-2 px-4">
          <p className="text-[15px] font-medium text-[#8e8e93]">Strength:</p>
          <p className="text-[15px] font-medium text-black">Good</p>
        </div>

        {/* Map area – height 480px starting at y:88 */}
        <div className="absolute left-0 top-[88px] w-[1400px] h-[480px]">
          {/* World map background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={FIGMA_CONNECTED_MAP}
              alt="Connected VPN map"
              fill
              sizes="1400px"
              priority
              className="object-cover opacity-80"
            />

            {/* Server marker – green dot at position from Figma */}
            <div className="absolute left-[364px] top-[182.4px] h-3 w-3 rounded-full bg-[#00c950] opacity-[0.56] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Stats bar overlay – positioned at top of map */}
          <div className="absolute left-0 top-0 w-full h-[61px] bg-white/95 flex items-center justify-between px-12">
            {/* Left stats group */}
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3">
                <Image
                  src={CONNECTED_ICON}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-sm text-zinc-900">
                  Connected to USA East
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={LOCATION_ICON}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-sm text-zinc-900">Miami, FL</span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={PROTOCOL_ICON}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-sm text-zinc-900">
                  Protocol: WireGuard
                </span>
              </div>
            </div>

            {/* Right stat – latency */}
            <div className="text-sm text-[#05df72]">Latency: 12ms</div>
          </div>
        </div>

        {/* Connected card – positioned at center */}
        <div className="absolute left-[491.5px] top-[500px] w-[417px] h-[223px] rounded-[20px] border border-neutral-200 bg-white flex flex-col items-center justify-center gap-3 py-6">
          {/* Status header with green dot */}
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <h3 className="text-[32px] font-semibold leading-[48px] tracking-[-0.7px] text-black">
              Secure Connection
            </h3>
          </div>

          {/* Timer display */}
          <p className="text-[48px] font-semibold leading-[72px] tracking-[1.6px] text-black">
            {displayTime}
          </p>

          {/* IP info */}
          <div className="flex items-center gap-2 text-sm text-[#6a7282]">
            <Image
              src={LOCK_ICON}
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            <p className="text-sm">IP: 192.168.1.42 → Encrypted Tunnel</p>
          </div>
        </div>

        {/* Disconnect button */}
        <div className="absolute left-[665px] top-[766px] w-[70px] h-[70px]">
          <button
            type="button"
            className="relative w-full h-full rounded-full bg-linear-to-b from-[#1a1a1a] to-[#000000] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] flex items-center justify-center"
            aria-label="Disconnect"
          >
            {/* Green glow ring */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_0_2px_rgba(39,201,63,0.3)]" />

            {/* Power icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10"
            >
              <path
                d="M12 2v10M15.5 5.5C17.5 7 19 9.5 19 12.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-3 1.5-5.5 3.5-7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
