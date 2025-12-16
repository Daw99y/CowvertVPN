"use client";

import { useEffect, useState } from "react";

interface ShockCollarProps {
  apiKey: string;
  dashboardUrl: string;
  message?: string;
  subtitle?: string;
}

export function ShockCollar({
  apiKey,
  dashboardUrl,
  message = "ACCESS RESTRICTED",
  subtitle = "Please contact the site administrator.",
}: ShockCollarProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!apiKey || !dashboardUrl) {
      setIsLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${dashboardUrl}/api/check-status?key=${encodeURIComponent(apiKey)}`
        );
        const data = await response.json();
        setIsLocked(data.locked === true);
      } catch (error) {
        console.error("[ShockCollar] Failed to check status:", error);
        setIsLocked(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [apiKey, dashboardUrl]);

  if (isLoading || !isLocked) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: "#1d1d1f",
        animation: "shockCollarFadeIn 2s ease-out forwards",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 8vw, 4rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          margin: 0,
          textAlign: "center",
        }}
      >
        {message}
      </h1>
      <p
        style={{
          fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
          color: "rgba(29, 29, 31, 0.6)",
          marginTop: 16,
          textAlign: "center",
        }}
      >
        {subtitle}
      </p>
      <style>{`
        @keyframes shockCollarFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(30px) saturate(180%); -webkit-backdrop-filter: blur(30px) saturate(180%); }
        }
      `}</style>
    </div>
  );
}
