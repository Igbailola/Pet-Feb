"use client";

import { useState } from "react";
import Link from "next/link";
import { formatNaira } from "@/lib/public-types";

interface PackageOption {
  name: string;
  totalPrice: number;
  tenureMonths: number;
}

const PACKAGES: Record<string, PackageOption> = {
  residential: {
    name: "Residential 3.5kVA",
    totalPrice: 2280000,
    tenureMonths: 12,
  },
  commercial: {
    name: "Commercial 10kVA",
    totalPrice: 5800000,
    tenureMonths: 12,
  },
};

export function HomeBuySmallBanner() {
  const [selectedPackage, setSelectedPackage] = useState<"residential" | "commercial">("residential");
  const [depositPct, setDepositPct] = useState<number>(30);

  const pkg = PACKAGES[selectedPackage];
  const depositAmount = (pkg.totalPrice * depositPct) / 100;
  const remaining = pkg.totalPrice - depositAmount;
  // 12 months = ~52 weeks
  const weeklyPayment = Math.round(remaining / 52);

  return (
    <div className="bg-[#F5B82E] border border-[#D9D9D9] rounded-[24px] p-[49px] relative overflow-hidden">
      {/* Cropped Sun-Arc Graphic in top corner */}
      <div className="absolute right-0 top-0 w-[140px] h-[140px] opacity-80" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
        {/* Left Column: Scheme Intro — Yellow background with dark text */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-[#3F6B1A] font-heading leading-4">
              Petfeb Buy Small Scheme
            </span>
          </div>

          <div className="max-w-[512px]">
            <h2 className="font-heading font-bold text-[32px] text-black tracking-[-0.64px] leading-[40px]">
              Start with 30 percent. Pay the rest weekly, biweekly or monthly.
            </h2>
          </div>

          <div className="max-w-[576px]">
            <p className="text-base text-[#333] leading-6 font-normal">
              Clean energy shouldn&apos;t demand exhausting your business capital. Our Buy Small
              facility enables immediate deployment of tier-1 hardware with transparent
              amortization terms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/buy-small"
              className="px-4 py-4 rounded-[12px] text-lg font-bold font-heading bg-black border-2 border-[#7BB042] text-[#7BB042] hover:bg-black/90 transition inline-flex items-center gap-2"
            >
              See how Buy Small works
            </Link>

            <Link
              href="/buy-small"
              className="text-black font-bold font-heading text-[14px] tracking-[0.28px] inline-flex items-center gap-1.5 hover:underline"
            >
              <span>Apply now</span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Column: Financing Estimator — Black card */}
        <div className="lg:col-span-5 bg-black border border-[#D9D9D9]/30 rounded-[16px] p-[25px] shadow-[0px_4px_16px_-2px_rgba(31,58,11,0.06),0px_2px_4px_-1px_rgba(31,58,11,0.04)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D9]/30">
            <span className="text-sm font-bold text-[#F2F7EC] font-heading">
              Financing Estimator
            </span>
            <span className="text-[11px] font-semibold text-[#3F6B1A] font-heading">
              Tier-1 Equipment
            </span>
          </div>

          {/* Package Selection (Capacity Toggle) */}
          <div className="bg-[#D6E7C4] rounded-[10px] p-1 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedPackage("residential")}
              className={`py-[6px] px-3 rounded-[8px] text-xs font-bold transition text-center font-heading ${
                selectedPackage === "residential"
                  ? "bg-[#7BB042] text-white shadow-xs"
                  : "text-[#5C5C5C] hover:text-black font-medium"
              }`}
            >
              Residential 3.5kVA
            </button>
            <button
              type="button"
              onClick={() => setSelectedPackage("commercial")}
              className={`py-[6px] px-3 rounded-[8px] text-xs font-bold transition text-center font-heading ${
                selectedPackage === "commercial"
                  ? "bg-[#7BB042] text-white shadow-xs"
                  : "text-[#5C5C5C] hover:text-black font-medium"
              }`}
            >
              Commercial 10kVA
            </button>
          </div>

          {/* Down Payment Ratio */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#5C5C5C] font-heading block">
              Down Payment Ratio
            </span>
            <div className="flex gap-2">
              {[30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDepositPct(pct)}
                  className={`py-2 px-4 rounded-full text-xs transition font-heading ${
                    depositPct === pct
                      ? "bg-white border-2 border-black text-black font-bold shadow-xs"
                      : "bg-[#F0EDED] border border-[#D9D9D9] text-[#333] font-medium hover:bg-white"
                  }`}
                >
                  {pct}% {depositPct === pct ? "Selected" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Breakdown Table */}
          <div className="space-y-3 pt-4 border-t border-[#D9D9D9]/30 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#F2F7EC] text-sm">Initial Deposit ({depositPct}%):</span>
              <span className="font-bold text-[#F2F7EC] text-base font-heading">
                {formatNaira(depositAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#F2F7EC] text-sm">Repayment Schedule:</span>
              <span className="bg-[#E8F3DA] text-[#3F6B1A] text-xs font-bold font-heading px-2 py-0.5 rounded-full">
                {formatNaira(weeklyPayment)} / week
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#F2F7EC] text-sm">Structured Tenure:</span>
              <span className="font-semibold text-[#D6E7C4] text-xs font-heading">
                12 Months Amortized
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
