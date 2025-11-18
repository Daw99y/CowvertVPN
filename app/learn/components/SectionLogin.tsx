"use client";

import { useEffect, useRef } from "react";
import MotionSection from "@/app/components/ui/MotionSection";

export default function SectionLogin() {
  return (
    <section
      id="learn-section-2"
      className="bg-white px-6 py-24 md:py-32 min-h-[90vh] flex items-center"
    >
      {/* Use a responsive grid: text on the left, device visual on the right */}
      <MotionSection className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left column – copy from the Figma design */}
        <div className="flex flex-col gap-6">
          {/* Overline label */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Private by default. Accounts optional.
          </p>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Login —<br /> only if you want to.
          </h2>

          {/* Supporting paragraph */}
          <p className="max-w-xl text-base md:text-lg text-zinc-600">
            Cowvert works without sign-ups, accounts, or emails. <br />
            If you want sync or lifetime access across devices, simply sign in.{" "}
            <br />
            No strings attached.
          </p>
        </div>

        {/* Right column – iOS device mockup */}
        <div className="flex justify-center md:justify-end">
          <ResponsiveLoginContainer />
        </div>
      </MotionSection>
    </section>
  );
}

/**
 * ResponsiveLoginContainer – Scales the 430x900 device proportionally
 * Maintains aspect ratio and scales down on smaller screens
 */
function ResponsiveLoginContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Base width is 430px for the device
        const scale = Math.min(1, containerWidth / 430);
        contentRef.current.style.transform = `scale(${scale})`;
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-full">
      {/* Container that maintains aspect ratio */}
      <div ref={containerRef} className="relative mx-auto w-full max-w-[430px]">
        {/* 
          Using aspect ratio trick: paddingBottom creates height based on width
          900 / 430 = 2.093023 = 209.3023%
        */}
        <div className="relative w-full" style={{ paddingBottom: "209.3023%" }}>
          {/* Absolutely positioned content that scales */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div
              ref={contentRef}
              style={{
                width: "430px",
                height: "900px",
                transformOrigin: "top center",
                transition: "transform 0.2s ease-out",
              }}
            >
              <LoginDeviceMockup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * LoginDeviceMockup – iOS device (430x900) with login screen
 * Matches Figma design with device frame, buttons, and login UI
 */
function LoginDeviceMockup() {
  return (
    <div className="relative w-[430px] h-[900px]">
      {/* Outer device frame with stronger shadow */}
      <div className="absolute inset-0 rounded-[60px] shadow-[0_7.2px_21.6px_rgba(0,0,0,0.096)]">
        {/* Device bezel - F5F5F5 color */}
        <div className="absolute inset-0 rounded-[60px] bg-[#f5f5f5] border border-zinc-200/50">
          {/* Inner screen area with white background */}
          <div className="absolute left-[12px] top-[12px] w-[406px] h-[876px] rounded-[48px] bg-black">
            <div className="absolute left-[2px] top-[2px] w-[402px] h-[872px] rounded-[46px] bg-white overflow-hidden">
              {/* Login screen content */}
              <div className="relative w-full h-full bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center">
                {/* Header: "Login." */}
                <div className="absolute left-[33.5px] top-[50px]">
                  <p className="text-[24px] font-semibold text-black">Login.</p>
                </div>

                {/* Email input */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[128px] w-[335px]">
                  <p className="text-[12px] font-medium text-black mb-1">
                    Email
                  </p>
                  <div className="w-full h-[40px] rounded-[10px] bg-[#f2f2f2] flex items-center px-5">
                    <p className="text-[12px] font-medium text-[#a1a1a1]">
                      user@email.com
                    </p>
                  </div>
                </div>

                {/* Password input */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[222px] w-[335px]">
                  <p className="text-[12px] font-medium text-black mb-1">
                    Password
                  </p>
                  <div className="relative w-full h-[40px] rounded-[10px] bg-[#f2f2f2] flex items-center px-5">
                    <p className="text-[12px] font-medium text-[#a1a1a1]">
                      password
                    </p>
                    {/* Eye icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="absolute right-5 opacity-60"
                    >
                      <path
                        d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <circle
                        cx="7"
                        cy="7"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                {/* Security badge */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[320px] w-[335px] h-[42.5px] rounded-[10px] bg-[rgba(5,223,114,0.1)] border border-[rgba(5,223,114,0.3)] flex items-center px-[17px]">
                  <div className="h-2 w-2 rounded-full bg-[#05df72] opacity-60 mr-2" />
                  <p className="text-[11px] font-normal text-[#05df72]">
                    AES-256 Encryption Active
                  </p>
                </div>

                {/* Server status card */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[372px] w-[335px] h-[136px] rounded-[12px] bg-white border border-neutral-200 p-[17px]">
                  <p className="text-[10px] font-normal uppercase tracking-[0.3px] text-[#6a7282] mb-3">
                    Authentication Server
                  </p>

                  {/* us-east-1 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#00c950]" />
                      <p className="text-[12px] font-normal text-black">
                        us-east-1
                      </p>
                    </div>
                    <p className="text-[12px] font-normal text-[#05df72]">
                      8ms
                    </p>
                  </div>

                  {/* OAuth 2.0 */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] font-normal text-[#99a1af]">
                      OAuth 2.0
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00c950]" />
                      <p className="text-[11px] font-normal text-[#99a1af]">
                        Ready
                      </p>
                    </div>
                  </div>

                  {/* TLS 1.3 */}
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-normal text-[#99a1af]">
                      TLS 1.3
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00c950]" />
                      <p className="text-[11px] font-normal text-[#99a1af]">
                        Secure
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue Without Account button */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[614px] w-[335px] h-[40px] rounded-[10px] border-2 border-black flex items-center justify-center">
                  <p className="text-[12px] font-medium text-black">
                    Continue Without Account
                  </p>
                </div>

                {/* Login button */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[664px] w-[335px] h-[40px] rounded-[10px] bg-black flex items-center justify-center">
                  <p className="text-[12px] font-medium text-white">Login</p>
                </div>

                {/* Get lifetime plan link */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[736px] flex items-center gap-1">
                  <p className="text-[12px] font-medium text-black">
                    Get lifetime plan
                  </p>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M5.25 3.5L8.75 7L5.25 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Dynamic Island / Notch */}
              <div className="absolute left-[140px] top-[12px] w-[126px] h-[37px] rounded-[40px] bg-black shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]" />
            </div>
          </div>

          {/* Volume buttons (left side) */}
          <div className="absolute left-[-4px] top-[180px] w-[4px] h-[50px] rounded-l-[10px] bg-neutral-100 shadow-[inset_1px_0_2px_0_rgba(0,0,0,0.2)]" />
          <div className="absolute left-[-4px] top-[250px] w-[4px] h-[50px] rounded-l-[10px] bg-neutral-100 shadow-[inset_1px_0_2px_0_rgba(0,0,0,0.2)]" />
          <div className="absolute left-[-4px] top-[320px] w-[4px] h-[50px] rounded-l-[10px] bg-neutral-100 shadow-[inset_1px_0_2px_0_rgba(0,0,0,0.2)]" />

          {/* Power button (right side) */}
          <div className="absolute right-[-4px] top-[200px] w-[4px] h-[80px] rounded-r-[10px] bg-neutral-100 shadow-[inset_-1px_0_2px_0_rgba(0,0,0,0.2)]" />

          {/* Device inner glow */}
          <div className="absolute inset-0 rounded-[60px] shadow-[inset_0_-2px_6px_0_rgba(255,255,255,0.8)] pointer-events-none" />
        </div>
      </div>

      {/* Bottom shadow for depth */}
      <div className="absolute left-[43px] top-[880px] w-[344px] h-[40px] rounded-full bg-[rgba(212,212,212,0.3)] blur-2xl" />
    </div>
  );
}
