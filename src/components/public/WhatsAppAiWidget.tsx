"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Official WhatsApp brand mark SVG
 */
function WhatsAppIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.031 2C6.508 2 2.023 6.484 2.02 12.006c0 1.764.46 3.487 1.335 5.006L2 22l5.122-1.343a9.97 9.97 0 0 0 4.905 1.287h.004c5.522 0 10.007-4.484 10.01-10.006.001-2.674-1.039-5.188-2.929-7.079C17.222 3.042 14.706 2 12.031 2Zm0 18.258h-.003a8.29 8.29 0 0 1-4.228-1.158l-.303-.18-3.144.824.839-3.064-.198-.314a8.268 8.268 0 0 1-1.278-4.42c.002-4.581 3.73-8.309 8.318-8.309 2.221 0 4.309.866 5.879 2.437a8.264 8.264 0 0 1 2.434 5.88c-.003 4.582-3.731 8.304-8.316 8.304Zm4.561-6.215c-.25-.125-1.479-.73-1.708-.813-.229-.084-.396-.125-.562.125-.167.25-.646.813-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.389-2.01-1.24-.743-.663-1.245-1.482-1.391-1.732-.146-.25-.015-.385.11-.51.112-.112.25-.291.375-.437.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.062-.125-.562-1.354-.771-1.854-.203-.487-.409-.421-.562-.429a11.09 11.09 0 0 0-.479-.008c-.167 0-.438.062-.667.312-.229.25-.875.855-.875 2.084s.896 2.417 1.021 2.583c.125.167 1.763 2.692 4.271 3.775.597.258 1.063.412 1.426.527.599.19 1.144.163 1.575.099.481-.072 1.479-.604 1.688-1.188.208-.583.208-1.083.146-1.187-.063-.104-.229-.167-.479-.292Z" />
    </svg>
  );
}

/**
 * Modular body for the Coming Soon preview.
 * Designed so it can later be replaced with a live WhatsApp AI conversation view
 * without modifying the floating widget shell or positioning logic.
 */
function WhatsAppComingSoonBody() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6 bg-[#EFEAE2]/65">
      {/* Subtle date/intro pill */}
      <div className="flex justify-center mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#495057] font-sans text-[11px] font-medium tracking-wide shadow-2xs border border-black/[0.04]">
          PetFeb AI Assistant Preview
        </span>
      </div>

      {/* Incoming WhatsApp-style message bubble */}
      <div className="relative bg-white rounded-2xl rounded-tl-xs p-4 sm:p-[18px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-black/[0.04] text-[#333333] font-sans leading-[1.6] space-y-3">
        <p className="font-medium text-[#111827] text-[15px]">Hello! 👋</p>

        <p className="font-medium text-[#1F3A0B] text-[14px] sm:text-[14.5px]">
          Welcome to PetFeb.
        </p>

        <p className="text-[#333333] text-[14px] sm:text-[14.5px]">
          Our WhatsApp AI assistant is coming soon! We’re working on making it
          easier for you to get answers, explore our solar solutions, and
          connect with our team.
        </p>

        <p className="text-[#333333] text-[14px] sm:text-[14.5px]">
          Stay tuned. We’ll be ready to assist you shortly!
        </p>
      </div>
    </div>
  );
}

export function WhatsAppAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [isFabFocused, setIsFabFocused] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeModal = useCallback((returnFocusToFab = false) => {
    setIsOpen(false);
    if (returnFocusToFab) {
      requestAnimationFrame(() => {
        fabRef.current?.focus();
      });
    }
  }, []);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // Focus the close button when the modal opens via keyboard/click for accessibility
  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => {
        closeBtnRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key and outside pointer clicks
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal(true);
      }
    };

    const handlePointerDownOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const clickedInsideModal = modalRef.current?.contains(target);
      const clickedOnFab = fabRef.current?.contains(target);

      if (!clickedInsideModal && !clickedOnFab) {
        closeModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
    };
  }, [isOpen, closeModal]);

  const showTooltip = !isOpen && (isTooltipHovered || isFabFocused);

  return (
    <div
      className="fixed bottom-[18px] right-[18px] sm:bottom-6 sm:right-6 z-40 pointer-events-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Bottom-Right Anchored Chat Preview Modal (NEVER Centred) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            id="petfeb-whatsapp-ai-modal"
            role="dialog"
            aria-modal="false"
            aria-labelledby="petfeb-whatsapp-ai-title"
            aria-describedby="petfeb-whatsapp-ai-status"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.97 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-auto fixed bottom-[96px] right-3.5 left-3.5 sm:left-auto sm:right-6 sm:bottom-[108px] sm:w-[376px] max-w-[calc(100vw-28px)] sm:max-w-[calc(100vw-48px)] sm:min-h-[410px] max-h-[calc(100dvh-118px)] sm:max-h-[450px] rounded-[20px] bg-white shadow-[0_16px_48px_rgba(15,23,42,0.18)] border border-gray-200/80 flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Modal Header */}
            <div className="bg-[#075E54] text-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(37,211,102,0.45)]">
                  <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <p
                    id="petfeb-whatsapp-ai-title"
                    className="font-heading font-bold text-[15px] sm:text-[16px] text-white leading-tight truncate"
                  >
                    PetFeb WhatsApp AI
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-2 h-2 rounded-full bg-[#A8D973] shrink-0"
                      aria-hidden="true"
                    />
                    <span
                      id="petfeb-whatsapp-ai-status"
                      className="font-sans text-[12px] text-white/90 font-normal leading-none"
                    >
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => closeModal(true)}
                aria-label="Close PetFeb WhatsApp AI preview"
                className="no-btn-slide w-8 h-8 rounded-full text-white/85 hover:text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Main Content */}
            <WhatsAppComingSoonBody />

            {/* Modal Footer */}
            <div className="px-4 py-2.5 bg-white border-t border-gray-100 text-center shrink-0">
              <p className="font-sans text-[12px] text-[#6C757D] tracking-wide">
                Powered by <span className="font-medium text-[#333333]">PetFeb</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button (FAB) + Desktop Tooltip */}
      <div className="pointer-events-auto relative flex items-center justify-end">
        {/* Accessible Desktop Tooltip */}
        <div
          id="petfeb-whatsapp-ai-tooltip"
          role="tooltip"
          aria-hidden={!showTooltip}
          className={`hidden sm:flex items-center mr-3 px-3.5 py-2 rounded-xl bg-[#111827] text-white font-sans text-[13px] font-medium whitespace-nowrap shadow-lg pointer-events-none select-none transition-all duration-200 motion-reduce:transition-none ${
            showTooltip
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-1.5"
          }`}
        >
          Chat with WhatsApp AI
        </div>

        {/* Circular WhatsApp FAB with Slow Continuous Bounce */}
        <div className={isOpen ? "" : "whatsapp-fab-bounce"}>
          <button
            ref={fabRef}
            type="button"
            onClick={toggleModal}
            onMouseEnter={() => setIsTooltipHovered(true)}
            onMouseLeave={() => setIsTooltipHovered(false)}
            onFocus={() => setIsFabFocused(true)}
            onBlur={() => setIsFabFocused(false)}
            aria-label="Chat with WhatsApp AI"
            aria-describedby="petfeb-whatsapp-ai-tooltip"
            aria-expanded={isOpen}
            aria-controls="petfeb-whatsapp-ai-modal"
            aria-haspopup="dialog"
            className="no-btn-slide w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_14px_34px_rgba(37,211,102,0.58),0_6px_16px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_42px_rgba(37,211,102,0.7),0_8px_20px_rgba(0,0,0,0.26)] sm:hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:transition-none transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/45 cursor-pointer"
          >
            <WhatsAppIcon className="w-8 h-8 sm:w-[38px] sm:h-[38px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
