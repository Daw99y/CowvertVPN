"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import Modal from "@/app/components/Modal";

// Simple button without Framer Motion to prevent re-render cascades
const SimpleButton = memo(function SimpleButton({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex select-none items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
});

function Header() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

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

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const openDownloadModal = useCallback(() => setIsDownloadModalOpen(true), []);
  const closeDownloadModal = useCallback(
    () => setIsDownloadModalOpen(false),
    []
  );

  return (
    <>
      <Modal isOpen={isDownloadModalOpen} onClose={closeDownloadModal} />
      <header
        className="fixed top-0 left-0 z-50 w-full bg-white border-b border-zinc-100"
        style={{ contain: "layout style paint" }}
      >
        <div className="w-full px-6 h-[72px]">
          <div className="flex h-full items-center justify-between">
            {/* Left: Logo + Nav */}
            <nav
              aria-label="Primary"
              className="flex items-center gap-6 text-lg"
            >
              <Link
                href="/"
                aria-label="Cowvert VPN home"
                className="inline-flex items-center"
              >
                <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Cowvert VPN
                </span>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#pricing"
                  onClick={(e) => handleAnchorClick(e, "pricing")}
                  className="text-zinc-700 hover:text-black cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  href="#learn"
                  onClick={(e) => handleAnchorClick(e, "learn")}
                  className="text-zinc-700 hover:text-black cursor-pointer"
                >
                  Learn
                </a>
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
              <SimpleButton
                onClick={openDownloadModal}
                className="hidden md:block h-10 rounded-full px-4 text-base"
              >
                Download
              </SimpleButton>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded-full"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span
                  className={`w-6 h-0.5 bg-zinc-900 transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-zinc-900 transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-zinc-900 transition-transform duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] w-full h-full bg-white md:hidden">
          <button
            type="button"
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded-full"
            aria-label="Close mobile menu"
          >
            <span className="w-6 h-0.5 bg-zinc-900 rotate-45 translate-y-[1px]" />
            <span className="w-6 h-0.5 bg-zinc-900 -rotate-45 -translate-y-[1px]" />
          </button>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col items-center justify-center h-full px-6"
          >
            <div className="flex flex-col items-center gap-6 w-full">
              <a
                href="#pricing"
                onClick={(e) => {
                  handleAnchorClick(e, "pricing");
                  closeMobileMenu();
                }}
                className="text-3xl text-zinc-700 hover:text-black transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <a
                href="#learn"
                onClick={(e) => {
                  handleAnchorClick(e, "learn");
                  closeMobileMenu();
                }}
                className="text-3xl text-zinc-700 hover:text-black transition-colors cursor-pointer"
              >
                Learn
              </a>
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

              <div className="mt-8">
                <SimpleButton
                  onClick={() => {
                    closeMobileMenu();
                    openDownloadModal();
                  }}
                  className="h-12 rounded-full px-8 text-lg"
                >
                  Download
                </SimpleButton>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default memo(Header);
