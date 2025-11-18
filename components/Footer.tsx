"use client";

import { useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import Modal from "@/app/components/Modal";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <footer className="relative z-50 ">
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
      <div className="w-full px-6 py-3">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between gap-3">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
            © {year} Cowvert VPN
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          >
            <MotionButton
              type="button"
              variant="secondary"
              onClick={() => setIsDownloadModalOpen(true)}
              className="rounded-full px-3 py-1 text-xs font-semibold"
            >
              Download
            </MotionButton>
            <a
              href="/docs"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              Pricing
            </a>
            <a
              href="https://discord.gg/cEtRnVS2"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
            <a
              href="https://github.com/kxvvyvvxw/CowvertVPN"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
