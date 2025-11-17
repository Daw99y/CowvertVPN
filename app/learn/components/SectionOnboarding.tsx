"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import MotionButton from "@/components/ui/MotionButton";
import PurchaseModal from "@/app/components/PurchaseModal";

const FIGMA_WORLD_MAP_IMAGE = "/images/worldmap.png";

// Asterisk icon for platform availability footnote
const FIGMA_ASTERISK_ICON = "/images/learn-asterisk.png";

// Icons for stats bar
const NODES_ICON = "/images/nodes.png";
const GLOBAL_ICON = "/images/global.png";
const BOLT_ICON = "/images/ybolt.png";

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
      <div className="mx-auto flex w-full flex-col items-center">
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
          <p>Available for macOS · Windows · Linux · iOS · Android</p>
        </div>

        {/* Visual window mockup from Figma design */}
        <div className="relative mt-16 w-full">
          <ResponsiveOnboardingContainer />
        </div>
      </div>
    </section>
  );
}

/**
 * ResponsiveOnboardingContainer – Scales the 1400x900 window proportionally
 * Maintains aspect ratio and scales down on smaller screens like an image
 */
function ResponsiveOnboardingContainer() {
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
    <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* Container that maintains aspect ratio */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-[1400px]"
      >
        {/* 
          Using aspect ratio trick: paddingBottom creates height based on width
          900 / 1400 = 0.642857 = 64.2857%
        */}
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingBottom: "64.2857%" }}
        >
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
              <OnboardingWindow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * OnboardingWindow – macOS-style mockup matching Figma design (1400x900)
 * Displays map with server markers, performance metrics panel, and onboarding card
 */
function OnboardingWindow() {
  return (
    <div className="relative mx-auto w-[1400px] h-[900px] overflow-visible rounded-2xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
      {/* macOS traffic lights */}
      <div className="flex items-center gap-2 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28ca42]" />
      </div>

      {/* Main content area with map – 583px height (from 100px to 683px in 900px total) */}
      <div className="relative h-[583px]">
        {/* World map background */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={FIGMA_WORLD_MAP_IMAGE}
            alt="World map with VPN server locations"
            fill
            sizes="1400px"
            priority
            className="object-cover opacity-80"
          />

          {/* Server markers – positioned as per Figma relative to map area (subtract 100px from Figma y coords) */}
          <div className="absolute left-[308px] top-[104px] h-3 w-3 rounded-full bg-[#00c950] opacity-[0.94] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="absolute left-[700px] top-[145px] h-3 w-3 rounded-full bg-[#00c950] opacity-[0.94] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="absolute left-[952px] top-[122px] h-3 w-3 rounded-full bg-[#00c950] opacity-[0.94] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="absolute left-[1120px] top-[262px] h-3 w-3 rounded-full bg-[#00c950] opacity-[0.94] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
          <div className="absolute left-[222px] top-[238px] h-3 w-3 rounded-full bg-[#00c950] opacity-[0.94] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
        </div>

        {/* Stats bar overlay – positioned at top of map (y: 0, height: 61px) */}
        <div className="absolute left-0 top-0 w-full h-[61px] bg-black/70 flex items-center justify-between px-12">
          {/* Left stats group */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Image
                src={NODES_ICON}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="text-sm text-white">5 Nodes Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={GLOBAL_ICON}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="text-sm text-white">Global CDN</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={BOLT_ICON}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="text-sm text-white">99.9% Uptime</span>
            </div>
          </div>

          {/* Right stat – latency */}
          <div className="text-sm text-[#05df72]">Avg Latency: 12ms</div>
        </div>

        {/* Metrics panel – right side card positioned relative to map (67px from top of map = 167-100) */}
        <div className="absolute left-[1152px] top-[67px] w-[220px] h-[273.5px] rounded-[10px] bg-white/95">
          {/* Border container */}
          <div className="absolute left-0 top-0 w-[220px] h-[273.5px] rounded-[10px] border border-gray-200" />

          {/* Performance label */}
          <div className="absolute left-[25px] top-[26px] h-[18px]">
            <p className="text-[12px] font-normal leading-[18px] tracking-[0.3px] uppercase text-[#6a7282]">
              Performance
            </p>
          </div>

          {/* Bandwidth */}
          <div className="absolute left-[25px] top-[63px] w-[170px] h-[48.5px]">
            <div className="absolute left-0 top-[0.5px] h-[16.5px]">
              <p className="text-[11px] font-normal leading-[16.5px] tracking-[0.0645px] text-[#99a1af]">
                Bandwidth
              </p>
            </div>
            <div className="absolute left-0 top-[24.5px] w-[170px] h-[24px]">
              <p className="absolute left-0 -top-px text-[16px] font-normal leading-[24px] text-black">
                10 Gbps
              </p>
              <div className="absolute left-[158px] top-[6px] w-3 h-3 rounded-full bg-[#00c950]" />
            </div>
          </div>

          {/* Load Time */}
          <div className="absolute left-[25px] top-[131.5px] w-[170px] h-[48.5px]">
            <div className="absolute left-0 top-[0.5px] h-[16.5px]">
              <p className="text-[11px] font-normal leading-[16.5px] tracking-[0.0645px] text-[#99a1af]">
                Load Time
              </p>
            </div>
            <div className="absolute left-0 top-[24.5px] w-[170px] h-[24px]">
              <p className="absolute left-0 -top-px text-[16px] font-normal leading-[24px] text-black">
                0.8s
              </p>
              <div className="absolute left-[158px] top-[6px] w-3 h-3 rounded-full bg-[#00c950]" />
            </div>
          </div>

          {/* Requests/sec */}
          <div className="absolute left-[25px] top-[200px] w-[170px] h-[48.5px]">
            <div className="absolute left-0 top-[0.5px] h-[16.5px]">
              <p className="text-[11px] font-normal leading-[16.5px] tracking-[0.0645px] text-[#99a1af]">
                Requests/sec
              </p>
            </div>
            <div className="absolute left-0 top-[24.5px] w-[170px] h-[24px]">
              <p className="absolute left-0 -top-px text-[16px] font-normal leading-[24px] text-black">
                1,247
              </p>
              <div className="absolute left-[158px] top-[6px] w-3 h-3 rounded-full bg-[#f0b100]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom content card – positioned at 249.5px left, 545px top (from window), 900x275.5 */}
      <div className="absolute left-[249.5px] top-[545px] w-[900px] h-[275.5px] flex flex-col items-center justify-center rounded-[20px] border border-neutral-200 bg-white px-20 py-10">
        <div className="text-center">
          <h2 className="text-[48px] font-semibold leading-normal tracking-tight text-black mb-8">
            Low-Latency Infrastructure.
          </h2>
          <p className="text-lg text-[#a1a1a1] leading-normal mb-12">
            Edge servers deployed across 6 continents deliver sub-20ms response
            times globally.
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-10">
            <MotionButton
              variant="text"
              type="button"
              onClick={() => console.log("Skip clicked")}
              className="px-8 text-base"
            >
              Skip
            </MotionButton>
            <MotionButton
              type="button"
              onClick={() => console.log("Next clicked")}
              className="w-[160px] rounded-[10px] bg-black px-16 py-4 text-base text-white hover:bg-zinc-800"
            >
              Next
            </MotionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
