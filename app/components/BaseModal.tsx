"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  ariaLabel,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.stopPropagation();
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleOverlayClick}
        >
          <div
            className="mx-4 w-full max-w-md rounded-[24px] bg-white p-6 shadow-lg md:p-7"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            onClick={handleContentClick}
          >
            {children}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default BaseModal;


