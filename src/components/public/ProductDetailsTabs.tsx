"use client";

import { useState } from "react";
import {
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  FileText,
  Phone,
  CheckCircle2,
  ChevronDown,
  Wrench,
  Clock,
  Zap,
} from "lucide-react";

type FAQ = {
  q: string;
  a: string;
};

type ProductDetailsTabsProps = {
  specs: { label: string; value: string; highlight?: boolean }[];
  faqs: FAQ[];
  productName: string;
  category: string;
};

export function ProductDetailsTabs({
  specs,
  faqs,
  productName,
  category,
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "warranty">("specs");

  return (
    <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-10 shadow-sm space-y-8">
      {/* Tab Navigation */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-[#D9D9D9] pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`font-heading text-sm sm:text-base pb-4 -mb-4 transition relative font-semibold ${
            activeTab === "specs"
              ? "text-gray-950 font-bold border-b-2 border-[#7BB042]"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Overview & Engineering Specs
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("warranty")}
          className={`font-heading text-sm sm:text-base pb-4 -mb-4 transition relative font-semibold flex items-center gap-2 ${
            activeTab === "warranty"
              ? "text-gray-950 font-bold border-b-2 border-[#7BB042]"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <span>Warranty & Replacement Policy</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F3DA] text-[#3F6B1A]">
            5-Year Cover
          </span>
        </button>
      </div>

      {/* ── Tab 1: Specs & FAQs ── */}
      {activeTab === "specs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-in fade-in duration-200">
          {/* Spec Table */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-gray-900">
                Verified System Specifications
              </h3>
              <span className="text-[11px] text-gray-400">
                Document Rev 2.4 (demo placeholder)
              </span>
            </div>

            <div className="border border-[#D9D9D9] rounded-2xl overflow-hidden divide-y divide-[#D9D9D9] text-xs">
              {specs.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 flex justify-between ${
                    idx % 2 === 1 ? "bg-[#F8F9FA]" : "bg-white"
                  }`}
                >
                  <span className="font-medium text-gray-500">{item.label}</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-[#F8F9FA] rounded-xl border border-[#D9D9D9] p-4 [&_summary::-webkit-details-marker]:none cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-heading font-bold text-xs sm:text-sm text-gray-900">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180 shrink-0 ml-2" />
                  </summary>
                  <p className="text-xs text-gray-600 leading-relaxed pt-2.5 mt-2 border-t border-gray-200">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Warranty & Replacement Policy ── */}
      {activeTab === "warranty" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="bg-[#F4F9EC] border border-[#7BB042]/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#7BB042] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-bold text-base text-gray-900">
                  Petfeb Genuine Warranty Protection & Guarantee
                </h3>
                <p className="text-xs text-gray-600">
                  Every product shipped is covered under our OEM direct warranty and NEMSA-certified engineering guarantee.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#3F6B1A] border border-[#7BB042]/40 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                NEMSA Certified
              </span>
            </div>
          </div>

          {/* Warranty Coverage Matrix (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Primary Warranty
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#E8F3DA] text-[#3F6B1A]">
                  5 Years
                </span>
              </div>
              <h4 className="font-heading font-bold text-sm text-gray-900">
                Hardware & Controller Protection
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Covers power electronic boards, internal transformer components, MPPT trackers, and logic display interfaces against manufacturing defects.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Hot-Swap Policy
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#E8F3DA] text-[#3F6B1A]">
                  48 Hours
                </span>
              </div>
              <h4 className="font-heading font-bold text-sm text-gray-900">
                Rapid Replacement SLA
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                If hardware fails during active warranty, our field engineering team dispatches a temporary bypass or direct swap unit in Lagos & Abuja within 48 hours.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Site Commissioning
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#E8F3DA] text-[#3F6B1A]">
                  12 Months
                </span>
              </div>
              <h4 className="font-heading font-bold text-sm text-gray-900">
                Free Field Maintenance
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Complimentary 12-month post-installation inspection, terminal torquing, and system firmware updates when installed by Petfeb Certified Engineers.
              </p>
            </div>
          </div>

          {/* 4-Step Replacement & RMA Process */}
          <div className="space-y-4 pt-2">
            <h4 className="font-heading font-bold text-base text-gray-900">
              How the Replacement / RMA Process Works
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 space-y-2 relative">
                <div className="w-7 h-7 rounded-full bg-[#1F3A0B] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h5 className="font-heading font-bold text-xs text-gray-900">
                  Remote Diagnostics
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Submit error logs or inverter status screen via WhatsApp or customer desk. Remote triage begins in under 2 hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 space-y-2 relative">
                <div className="w-7 h-7 rounded-full bg-[#1F3A0B] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h5 className="font-heading font-bold text-xs text-gray-900">
                  Field Engineer Inspection
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  If remote clearing is inconclusive, a certified technician visits your installation address with calibration equipment.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 space-y-2 relative">
                <div className="w-7 h-7 rounded-full bg-[#1F3A0B] text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h5 className="font-heading font-bold text-xs text-gray-900">
                  Direct Swap / Repair
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Confirmed hardware faults are resolved by component replacement or instant equipment swap from central warehouse stock.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 space-y-2 relative">
                <div className="w-7 h-7 rounded-full bg-[#7BB042] text-white flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <h5 className="font-heading font-bold text-xs text-gray-900">
                  Testing & Signoff
                </h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Re-commissioning load test conducted to ensure total stability, followed by updated warranty certificate signoff.
                </p>
              </div>
            </div>
          </div>

          {/* Exclusions & Policy Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#3F6B1A]">
                <CheckCircle2 className="w-4 h-4" />
                <h5 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                  What is Fully Covered
                </h5>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
                <li>Internal motherboard, IGBT transistors, and capacitor failures.</li>
                <li>MPPT solar charge controller charge regulation faults.</li>
                <li>Grid synchronization failures under rated voltage tolerance (170V–280V).</li>
                <li>Cooling fan motor seizure under standard ventilation.</li>
                <li>LCD control panel screen or Wi-Fi transmitter module breakdown.</li>
              </ul>
            </div>

            <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <h5 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                  Warranty Exclusions & Conditions
                </h5>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
                <li>Physical impact, casing crushing, or liquid immersion damage.</li>
                <li>Unauthorized modification or repair attempts by non-certified technicians.</li>
                <li>Direct lightning strike without Petfeb-approved earth rod protection.</li>
                <li>Sustained overloading exceeding rated surge thresholds repeatedly.</li>
                <li>Reverse polarity battery connection done outside Petfeb installation.</li>
              </ul>
            </div>
          </div>

          {/* Help Line & Claims Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D9D9D9] text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7BB042]" />
              <span>Claims Resolution Desk: Monday – Saturday, 8:00 AM – 6:00 PM WAT</span>
            </div>
            <a
              href="tel:+234800738332"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#3F6B1A] hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Warranty Engineering Team (+234 800 PETFEB SOLAR)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
