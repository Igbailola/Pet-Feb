"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer?: string;
  isConfirmed: boolean;
}

export function SupportFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-3", "faq-5"]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3.5">
      {faqs.map((f, idx) => {
        const isOpen = openIds.includes(f.id);
        return (
          <div
            key={f.id}
            className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-2xs transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(f.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <span className="font-heading font-bold text-xs sm:text-sm text-[#7BB042] min-w-5">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                <span className="font-heading font-semibold text-base sm:text-lg text-gray-950">
                  {f.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#7BB042]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {f.isConfirmed && f.answer ? (
                  <p>{f.answer}</p>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
                    <p className="font-semibold">
                      Answer currently undergoing technical &amp; legal confirmation
                    </p>
                    <p className="text-amber-800 text-xs">
                      Official policy terms are scheduled to be published here upon executive review. For urgent guidance on this topic, please reach our engineering desk directly via phone or WhatsApp (+234 813 585 4054).
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

