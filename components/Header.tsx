"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MotionButton from "@/components/ui/MotionButton";
import Modal from "@/app/components/Modal";

export default function Header() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white will-change-transform">
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
      <div className="relative w-full px-6 h-[72px]">
        <div className="flex h-full items-center justify-between">
          {/* Left: Logo + Nav (flush left) */}
          <nav aria-label="Primary" className="flex items-center gap-6 text-lg">
            <Link
              href="/"
              aria-label="Cowvert VPN home"
              className="inline-flex items-center"
            >
              <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                Cowvert VPN
              </span>
            </Link>
            {/* Desktop Navigation - hidden on mobile */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/pricing" className="text-zinc-700 hover:text-black">
                Pricing
              </Link>
              <Link href="/learn" className="text-zinc-700 hover:text-black">
                Learn
              </Link>
              <a
                href="https://discord.gg/cEtRnVS2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-700 hover:text-black"
              >
                Discord
              </a>
              <a
                href="https://github.com/kxvvyvvxw/CowvertVPN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-700 hover:text-black"
              >
                Github
              </a>
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            {/* Desktop Download Button */}
            <MotionButton
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="hidden md:block h-10 rounded-md px-4 text-base"
            >
              Download
            </MotionButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded-md"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Full Screen */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 w-full bg-white md:hidden animate-in fade-in duration-300"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col items-center justify-center h-full px-6"
          >
            <div className="flex flex-col items-center gap-12 w-full">
              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="text-3xl text-zinc-700 hover:text-black transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/learn"
                onClick={closeMobileMenu}
                className="text-3xl text-zinc-700 hover:text-black transition-colors"
              >
                Learn
              </Link>
              <a
                href="https://discord.gg/cEtRnVS2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="text-3xl text-zinc-700 hover:text-black transition-colors"
              >
                Discord
              </a>
              <a
                href="https://github.com/kxvvyvvxw/CowvertVPN"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="text-3xl text-zinc-700 hover:text-black transition-colors"
              >
                Github
              </a>

              {/* Download Button in Mobile Menu */}
              <div className="mt-8">
                <MotionButton
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    setIsDownloadModalOpen(true);
                  }}
                  className="h-12 rounded-md px-8 text-lg"
                >
                  Download
                </MotionButton>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
