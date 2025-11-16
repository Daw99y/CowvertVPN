"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <footer className="">
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
      <div className="w-full px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-zinc-600">© {year} Cowvert VPN</div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs"
          >
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="text-zinc-400 hover:text-black cursor-pointer"
            >
              Download
            </button>
            <a href="/docs" className="text-zinc-400 hover:text-black">
              Pricing
            </a>
            <a
              href="https://discord.gg/cEtRnVS2"
              className="text-zinc-400 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
            <a
              href="https://github.com/kxvvyvvxw/CowvertVPN"
              className="text-zinc-400 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-zinc-400 hover:text-black"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
