"use client";

import React from "react";
import MotionButton from "@/components/ui/MotionButton";
import BaseModal from "./BaseModal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Cowvert download information"
    >
      <div className="space-y-3 text-left">
        <p className="text-sm font-semibold text-zinc-900">
          Heads up — this isn&apos;t a real download.
        </p>
        <p className="text-sm text-zinc-600">
          Cowvert is a concept project built to explore clean UI,
          security-minded UX, and product storytelling.
        </p>
        <p className="text-sm text-zinc-600">
          There&apos;s no live app behind this button (yet), but everything
          you&apos;re seeing was designed and built as if it were. 🐮
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

export default Modal;




