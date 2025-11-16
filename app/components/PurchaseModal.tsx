"use client";

import React from "react";
import MotionButton from "@/components/ui/MotionButton";
import BaseModal from "./BaseModal";

type PurchaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Cowvert purchase information"
    >
      <div className="space-y-3 text-left">
        <p className="text-sm font-semibold text-zinc-900">
          Thanks for your interest!
        </p>
        <p className="text-sm text-zinc-600">
          Cowvert is a concept project built to explore VPN design, UI, and
          product storytelling.
        </p>
        <p className="text-sm text-zinc-600">
          There&apos;s no real app or payment flow behind these buttons yet —
          everything you’re seeing was designed as if it were. 🐮
        </p>
      </div>
      <div className="mt-6 flex justify-end">
        <MotionButton
          type="button"
          variant="secondary"
          onClick={onClose}
          className="rounded-full px-4 py-2 text-sm"
        >
          Close
        </MotionButton>
      </div>
    </BaseModal>
  );
};

export default PurchaseModal;
