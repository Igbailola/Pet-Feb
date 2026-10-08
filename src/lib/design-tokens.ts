/**
 * Shared Design System Tokens for Petfeb Solar
 * Centralized scale for spacing, layout margins, button variants, inputs, cards, and modals.
 */

export const tokens = {
  // Page container layout: generous left and right margins with consistent responsiveness
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  containerWide: "max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10",
  containerNarrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",

  // Button sizes with min 44px touch targets on mobile for primary interaction
  button: {
    sm: "inline-flex items-center justify-center gap-2 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 select-none",
    md: "inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 select-none",
    lg: "inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl text-sm sm:text-base font-bold transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 select-none",
    icon: "inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl transition active:scale-95 cursor-pointer focus:outline-none focus:ring-2 select-none",
    variants: {
      primary:
        "bg-[#7BB042] text-black hover:bg-[#6AA035] active:bg-[#5C8C2E] focus:ring-[#7BB042] shadow-xs font-bold",
      secondary:
        "bg-[#3F6B1A] text-white hover:bg-[#345915] active:bg-[#2A4711] focus:ring-[#3F6B1A] shadow-xs font-semibold",
      outline:
        "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300 shadow-2xs font-semibold",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200 font-medium",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus:ring-rose-500 shadow-xs font-semibold",
    },
  },

  // Input styles: consistent 44px touch height, clear focus rings and radius
  input: {
    base: "w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 min-h-[44px] text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#7BB042] focus:outline-none focus:ring-2 focus:ring-[#7BB042]/30 transition",
    label: "block text-xs font-semibold text-gray-800 mb-1.5",
    helper: "text-[11px] text-gray-500 mt-1",
    error: "text-xs text-rose-600 mt-1 font-medium",
  },

  // Cards
  card: {
    base: "bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs",
    hover: "hover:border-gray-300 hover:shadow-sm transition",
  },

  // Modals & Popovers
  modal: {
    backdrop:
      "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-in fade-in-50",
    panel:
      "bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in zoom-in-95",
    header: "flex items-center justify-between pb-3.5 border-b border-gray-100 mb-4",
    footer: "flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-5",
  },
} as const;
