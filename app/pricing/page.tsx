"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import PurchaseModal from "../components/PurchaseModal";
import MotionSection from "../components/ui/MotionSection";

type ActivePurchaseModal = "free" | "lifetime" | null;

export default function PricingPage() {
  const [activePurchaseModal, setActivePurchaseModal] =
    useState<ActivePurchaseModal>(null);

  const handleCloseModal = () => {
    setActivePurchaseModal(null);
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-white py-28 md:py-36">
      <PurchaseModal
        isOpen={activePurchaseModal !== null}
        onClose={handleCloseModal}
      />
      <div className="mx-auto max-w-6xl px-6">
        <MotionSection animateOnLoad className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
            Choose the plan that fits your flow. Start free, upgrade once — stay
            covered for life.
          </p>
        </MotionSection>

        <div className="relative mt-12">
          <div className="absolute inset-0 bg-gradient-radial from-white via-zinc-100/60 to-transparent pointer-events-none" />
          <MotionSection
            animateOnLoad
            className="relative grid grid-cols-1 gap-6 md:grid-cols-2"
            delay={0.1}
          >
            {/* Free Plan */}
            <div className="relative bg-white/80 backdrop-blur-md rounded-[24px] p-10 ring-1 ring-zinc-100 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all hover:ring-zinc-200 hover:-translate-y-1">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">Free</h2>
                <div className="text-5xl font-light text-zinc-900">$0</div>
              </div>
              <div className="border-t border-zinc-100 mt-6 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Access to standard VPN nodes</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>1 connected device</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>10 GB / month data limit</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>AES-256 encryption</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>No-log policy</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Basic speed (up to 50 Mbps)</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Limited region selection</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Ads in dashboard</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <MotionButton
                  type="button"
                  variant="secondary"
                  onClick={() => setActivePurchaseModal("free")}
                  className="rounded-full px-6 py-2.5 text-sm"
                >
                  Get Started
                </MotionButton>
              </div>
            </div>

            {/* Lifetime Plan */}
            <div className="relative bg-white/80 backdrop-blur-md rounded-[24px] p-10 shadow-[0_6px_18px_rgba(0,0,0,0.08)] ring-1 ring-zinc-100 transition-all hover:ring-zinc-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">
                  Lifetime Access
                </h2>
                <div className="text-5xl font-light text-zinc-900">$99 </div>
              </div>
              <div className="border-t border-zinc-100 mt-6 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Unlimited bandwidth</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>All global VPN nodes</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Up to 5 connected devices</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>AES-256 + ChaCha20 encryption</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Zero-log guarantee</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Early access to new tools</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>No ads, no limits</span>
                  </li>
                  <li className="flex items-center gap-3 text-zinc-600 text-sm">
                    <Check className="w-4 h-4 text-zinc-400" aria-hidden />
                    <span>Lifetime updates and support</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <MotionButton
                  type="button"
                  onClick={() => setActivePurchaseModal("lifetime")}
                  className="rounded-full px-6 py-2.5 text-sm"
                >
                  Upgrade Now
                </MotionButton>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
