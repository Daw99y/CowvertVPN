"use client";

import { useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import Modal from "@/app/components/Modal";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Base styles shared by all footer nav items (links + button)
  const baseItemClasses =
    "inline-flex items-center border border-zinc-200 bg-white text-xs font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 pointer-events-auto";

  // Common sizing so shapes feel like the ToyFight menu
  const sizeClasses = "px-4 md:px-5 py-2";
  const capsuleRadius = "rounded-full";
  const rectangleRadius = "rounded-square";

  // Simple config for footer links
  const footerLinks = [
    { label: "Pricing", href: "#pricing", external: false },
    {
      label: "Discord",
      href: "https://discord.gg/cEtRnVS2",
      external: true,
    },
    {
      label: "Github",
      href: "https://github.com/kxvvyvvxw/CowvertVPN",
      external: true,
    },
    {
      label: "Contact Us",
      href: "mailto:hello@example.com",
      external: false,
    },
  ];

  return (
    <footer className="relative z-50 -mt-24 pointer-events-none">
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
      <div className="w-full px-6 py-3">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between gap-1 md:gap-2">
          <div
            className={`${baseItemClasses} ${sizeClasses} ${rectangleRadius}`}
          >
            © {year} Cowvert VPN
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-1 md:gap-x-2 gap-y-1"
          >
            {/* First item: capsule-style download button */}
            <MotionButton
              type="button"
              variant="secondary"
              onClick={() => setIsDownloadModalOpen(true)}
              className={`${baseItemClasses} ${sizeClasses} ${capsuleRadius}`}
            >
              Download
            </MotionButton>

            {/* Remaining items: alternate square and capsule like ToyFight menu */}
            {footerLinks.map((link, index) => {
              const isSquare = index % 2 === 0;
              const radius = isSquare ? rectangleRadius : capsuleRadius;

              const classes = `${baseItemClasses} ${sizeClasses} ${radius}`;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={classes}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
