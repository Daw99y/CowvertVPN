"use client";

import Link from "next/link";
import { useState } from "react";
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
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="inline-flex h-10 items-center rounded-md bg-black px-4 text-base font-medium text-white hover:bg-zinc-900 cursor-pointer"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
