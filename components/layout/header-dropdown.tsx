"use client";

import { useEffect, useRef, type ReactNode } from "react";

type HeaderDropdownProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  closeDelayMs?: number;
  className?: string;
};

export default function HeaderDropdown({
  open,
  onOpen,
  onClose,
  trigger,
  children,
  closeDelayMs = 90,
  className = "",
}: HeaderDropdownProps) {
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
      closeTimerRef.current = null;
    }, closeDelayMs);
  };

  useEffect(() => clearCloseTimer, []);

  return (
    <div
      className={className}
      onPointerEnter={() => {
        clearCloseTimer();
        if (!open) onOpen();
      }}
      onPointerLeave={() => {
        if (!open) return;
        scheduleClose();
      }}
      onFocusCapture={() => {
        clearCloseTimer();
        if (!open) onOpen();
      }}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null;
        if (next && event.currentTarget.contains(next)) return;
        if (!open) return;
        onClose();
      }}
      data-dropdown-open={open ? "true" : "false"}
    >
      {trigger}
      {children}
    </div>
  );
}
