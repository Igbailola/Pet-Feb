"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface ProductFaq {
  question: string;
  answer: string;
}

interface ProductFaqSectionProps {
  productName: string;
  faqs: ProductFaq[];
}

export function ProductFaqSection({ productName, faqs }: ProductFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-[16px] border border-gray-200 bg-white overflow-hidden shadow-2xs transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer hover:bg-gray-50/70 transition"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span className="font-heading font-semibold text-[15px] sm:text-[16px] text-gray-900">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#7BB042]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

