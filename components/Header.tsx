"use client";

import Link from "next/link";
import { useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import Modal from "@/app/components/Modal";

export default function Header() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60">
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
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <MotionButton
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="h-10 rounded-md px-4 text-base"
            >
              Download
            </MotionButton>
          </div>
        </div>
      </div>
    </header>
  );
}
