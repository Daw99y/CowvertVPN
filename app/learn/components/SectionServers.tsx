"use client";

import { useEffect, useRef } from "react";

export default function SectionServers() {
  return (
    <section
      id="learn-section-4"
      className="border-t border-zinc-100 bg-white px-6 py-24 md:py-32 min-h-[90vh] flex items-center"
    >
      {/* Grid layout mirrors Section 2, but with device on the left and text on the right */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left column – servers device visual */}
        <div className="flex justify-center md:justify-start">
          <ResponsiveDeviceContainer />
        </div>

        {/* Right column – copy from the Figma design */}
        <div className="flex flex-col gap-6 text-left md:text-right md:items-end">
          {/* Overline label */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Fast. Global. Honest.
          </p>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Servers where it matters — not everywhere just to look impressive.
          </h2>

          {/* Supporting paragraph */}
          <p className="max-w-xl text-base md:text-lg text-zinc-600">
            Cowvert connects you through trusted, performance-focused regions —
            no filler locations, no shady middlemen. <br /> Just fast, secure
            routing with zero tracking.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * ResponsiveDeviceContainer – Scales the 430x900 device proportionally
 * Maintains aspect ratio and scales down on smaller screens
 */
function ResponsiveDeviceContainer() {
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
              <ServersDeviceMockup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ServersDeviceMockup – iOS device (430x900) with server selection screen
 * Shows list of available VPN servers with latency and connection info
 */
function ServersDeviceMockup() {
  const servers = [
    {
      country: "Argentina",
      flag: "🇦🇷",
      servers: "2 servers",
      latency: "145ms",
      load: "45%",
      status: "online",
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      servers: "3 servers",
      latency: "182ms",
      load: "34%",
      status: "online",
    },
    {
      country: "Brazil",
      flag: "🇧🇷",
      servers: "2 servers",
      latency: "128ms",
      load: "56%",
      status: "online",
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      servers: "4 servers",
      latency: "45ms",
      load: "28%",
      status: "online",
    },
    {
      country: "Switzerland",
      flag: "🇨🇭",
      servers: "2 servers",
      latency: "38ms",
      load: "42%",
      status: "online",
    },
    {
      country: "Chile",
      flag: "🇨🇱",
      servers: "1 server",
      latency: "156ms",
      load: "67%",
      status: "online",
    },
    {
      country: "China",
      flag: "🇨🇳",
      servers: "3 servers",
      latency: "98ms",
      load: "51%",
      status: "online",
    },
    {
      country: "Cuba",
      flag: "🇨🇺",
      servers: "1 server",
      latency: "112ms",
      load: "73%",
      status: "online",
    },
    {
      country: "Denmark",
      flag: "🇩🇰",
      servers: "2 servers",
      latency: "35ms",
      load: "31%",
      status: "online",
    },
    {
      country: "Greece",
      flag: "🇬🇷",
      servers: "2 servers",
      latency: "52ms",
      load: "48%",
      status: "online",
    },
    {
      country: "India",
      flag: "🇮🇳",
      servers: "3 servers",
      latency: "89ms",
      load: "62%",
      status: "online",
    },
  ];

  return (
    <div className="relative w-[430px] h-[900px]">
      {/* Outer device frame with stronger shadow */}
      <div className="absolute inset-0 rounded-[60px] shadow-[0_60px_120px_rgba(15,23,42,0.3)]">
        {/* Device bezel - F5F5F5 color */}
        <div className="absolute inset-0 rounded-[60px] bg-[#f5f5f5] border border-zinc-200/50">
          {/* Inner screen area with white background */}
          <div className="absolute left-[12px] top-[12px] w-[406px] h-[876px] rounded-[48px] bg-black">
            <div className="absolute left-[2px] top-[2px] w-[402px] h-[872px] rounded-[46px] bg-white overflow-hidden">
              {/* Server selection screen content */}
              <div className="relative w-full h-full bg-white">
                {/* Header */}
                <div className="absolute left-0 top-0 w-full h-[93px] bg-white border-b border-neutral-200">
                  <div className="absolute left-[24px] top-[38px] right-[24px]">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-[16px] font-semibold text-black leading-tight">
                          Select Server
                        </h1>
                        <p className="text-[11px] font-normal text-[#99a1af] mt-1">
                          Choose optimal server location
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#f2f2f2]">
                        <div className="h-2 w-2 rounded-full bg-[#00c950]" />
                        <p className="text-[11px] font-medium text-black">
                          99 servers live
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable server list */}
                <div className="absolute left-0 top-[93px] right-0 bottom-0 overflow-hidden">
                  <div className="px-[24px] py-[20px] space-y-3">
                    {servers.map((server, index) => (
                      <div
                        key={index}
                        className="w-full h-[100px] rounded-[16px] bg-white border border-neutral-200 p-[17px]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          {/* Left: Flag + Country + Server count */}
                          <div className="flex items-center gap-3">
                            <div className="text-[24px] leading-none">
                              {server.flag}
                            </div>
                            <div>
                              <p className="text-[16px] font-semibold text-black">
                                {server.country}
                              </p>
                              <p className="text-[11px] font-normal text-[#99a1af] mt-0.5">
                                {server.servers}
                              </p>
                            </div>
                          </div>

                          {/* Right: Latency */}
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#00c950]" />
                            <p className="text-[12px] font-normal text-black">
                              {server.latency}
                            </p>
                          </div>
                        </div>

                        {/* Server Load progress bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] font-normal text-[#6a7282]">
                              Server Load
                            </p>
                            <div className="w-16 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                              <div
                                className="h-full bg-[#00c950] rounded-full"
                                style={{ width: server.load }}
                              />
                            </div>
                          </div>
                          <p className="text-[11px] font-normal text-[#99a1af]">
                            {server.load}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
