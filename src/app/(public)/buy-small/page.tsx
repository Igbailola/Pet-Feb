"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Lock,
  Building2,
  X,
  CreditCard,
  Calendar,
  FileCheck2,
  Home,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";
import { submitBuySmallVerificationAction } from "@/app/actions/verifications";

const PACKAGES = [
  {
    id: "5kw-hybrid",
    name: "Petfeb 5kW Hybrid Inverter + 5.12kWh LiFePO4 System",
    price: 3950000,
    specs: "Tier-1 A-Grade Cells & Pure Sine Wave Inverter",
    description: "Ideal for 3-4 bedroom homes and medical diagnostic clinics.",
  },
  {
    id: "3kva-residential",
    name: "Petfeb 3kVA Whole-Home Solar Kit",
    price: 1850000,
    specs: "3kVA Inverter • 2 x 200Ah Batteries • 6 x 400W Arrays",
    description: "Powers essential lighting, TVs, refrigeration, and computers.",
  },
  {
    id: "10kw-commercial",
    name: "Petfeb 10kW Three-Phase Commercial Solar Hub",
    price: 7850000,
    specs: "10kW Inverter • 15kWh High-Voltage Battery • 24 x 550W Arrays",
    description: "Designed for commercial facilities, schools, and cold chain storage.",
  },
  {
    id: "1kva-starter",
    name: "Petfeb 1kVA Starter Solar Kit",
    price: 450000,
    specs: "1kVA Inverter • 1 x 100Ah Battery • 2 x 200W Panels",
    description: "Perfect for apartments, students, and home offices.",
  },
];

const FAQS = [
  {
    q: "What happens if the national grid drops or solar radiation is low during my repayment term?",
    a: "Your hybrid system is engineered with an intelligent multi-source automatic transfer switch. It draws from solar arrays during daylight hours, stores power in high-efficiency LiFePO4 batteries, and seamlessly coordinates with grid or backup generator supplies when needed. The physical system continues generating clean power regardless of national grid stability.",
  },
  {
    q: "Can I pay off my remaining balance early without penalty?",
    a: "Yes. Buy Small allows complete early liquidation at any point during your tenure with 0% penalty fees. You only pay the outstanding principal balance without future unaccrued fees.",
  },
  {
    q: "Who holds ownership of the hardware during the repayment period?",
    a: "Hardware is placed in custody at your verified premises upon initial 30% deposit and installation signoff. Full legal ownership and warranty certificate title transfer to you immediately upon completion of the final scheduled installment.",
  },
  {
    q: "What if I relocate my business or residence to a new site?",
    a: "Simply inform our technical support desk at least 7 business days prior to your move. Certified Petfeb engineers will safely decommission, transport, and re-mount your system at your new location for a standardized re-installation fee without affecting your financing contract.",
  },
];

interface BuySmallPageProps {
  searchParams: Promise<{ product?: string; deposit?: string }>;
}

export default function BuySmallPage({ searchParams }: BuySmallPageProps) {
  const resolvedParams = use(searchParams);
  const preselectedDeposit = Number(resolvedParams?.deposit) || 30;

  // Selected package & configuration
  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[0].id);
  const [depositPct, setDepositPct] = useState<30 | 40 | 50>(
    preselectedDeposit === 40 || preselectedDeposit === 50 ? preselectedDeposit : 30
  );
  const [cadence, setCadence] = useState<"Weekly" | "Bi-Weekly" | "Monthly">("Weekly");
  const [tenureMonths, setTenureMonths] = useState<12 | 6>(12);
  const [includeInstallation, setIncludeInstallation] = useState(true);

  // FAQ Accordion State (first open by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Application modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("Lagos");
  const [idType, setIdType] = useState("National Identity Number (NIN)");
  const [idNumber, setIdNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];
  const installationFee = includeInstallation ? 120000 : 0;
  const totalPrice = selectedPkg.price + installationFee;
  const initialDeposit = Math.round((totalPrice * depositPct) / 100);
  const financedPrincipal = totalPrice - initialDeposit;

  // Calculations based on tenure
  const totalWeeks = tenureMonths === 12 ? 52 : 26;
  const totalBiweeks = tenureMonths === 12 ? 26 : 13;
  const totalMonths = tenureMonths;

  const weeklyInstallment = Math.round(financedPrincipal / totalWeeks);
  const biweeklyInstallment = Math.round(financedPrincipal / totalBiweeks);
  const monthlyInstallment = Math.round(financedPrincipal / totalMonths);

  const currentCommitment =
    cadence === "Weekly"
      ? weeklyInstallment
      : cadence === "Bi-Weekly"
      ? biweeklyInstallment
      : monthlyInstallment;

  const cadenceLabel =
    cadence === "Weekly" ? "week" : cadence === "Bi-Weekly" ? "2 weeks" : "month";

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the financing terms.");
      return;
    }
    if (!idNumber) {
      alert("Please enter your NIN or ID number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitBuySmallVerificationAction({
        fullName,
        email,
        phone,
        address,
        state,
        idType,
        idNumber,
        employmentStatus: "Verified Individual / SME",
        monthlyIncome: "₦250,000+",
        systemName: selectedPkg.name,
        downPayment: initialDeposit,
        monthlyRepayment: monthlyInstallment,
      });

      if (res.error) {
        alert(res.error);
        setIsSubmitting(false);
        return;
      }

      setSubmittedRef(res.refCode || "PET-BSV-2026-CONFIRMED");
    } catch {
      alert("Submission error. Please try again or chat with our desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pb-20 font-sans overflow-x-clip">
      {/* ── Outer Page Frame matching Figma max-w-[1440px] ────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[32px] space-y-[24px]">

        {/* ── 1. Hero Header Section matching Frame 1984079591 ──────────────── */}
        <section className="pt-[80px]">
          {/* Header Row: Dot + Big Space Grotesk Heading + Subtitle */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-[58px]">
            <div className="flex items-center gap-[16px] max-w-[803px]">
              <span className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0" />
              <h1 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] uppercase tracking-[3px] leading-[1.1] text-shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
                <span className="text-black block">Power your home now.</span>
                <span className="text-[#70A03C] block">Pay in small amounts.</span>
              </h1>
            </div>

            <div className="max-w-[532px]">
              <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.6] uppercase">
                Clean energy shouldn&apos;t drain your working capital. Spread the cost of Tier-1 solar inverters, lithium storage, and panels over predictable weekly or monthly installments. Zero collateral required.
              </p>
            </div>
          </div>

          {/* Hero Image Card (w=1376, h=700 in Figma) */}
          <div className="relative h-[480px] sm:h-[580px] lg:h-[700px] w-full rounded-[32px] overflow-hidden shadow-lg bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bannerimages/buysmall-page-banner.jpg"
              alt="Petfeb Buy Small family enjoying clean solar energy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            {/* Bottom Floating Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 flex flex-col gap-[36px] max-w-[1280px]">
              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-[16px]">
                <a
                  href="#calculator"
                  className="bg-[#7BB042] text-white font-heading font-bold text-[16px] sm:text-[18px] px-[24px] py-[16px] rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-[8px]"
                >
                  <span>Calculate my plan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#how-it-works"
                  className="border border-white/60 text-white font-heading font-semibold text-[16px] sm:text-[18px] px-[25px] py-[16px] rounded-[16px] hover:bg-white/10 transition backdrop-blur-sm inline-flex items-center gap-[8px]"
                >
                  <span>How it works</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* 4 Stat Items Row with Divider */}
              <div className="border-t border-white/10 pt-[32px] grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="font-heading font-bold text-[32px] sm:text-[40px] text-[#BAF47C] leading-tight tracking-[-1.2px]">
                    30%
                  </div>
                  <div className="font-heading font-semibold text-[14px] text-white tracking-[0.28px]">
                    Min Deposit
                  </div>
                  <div className="font-sans text-[12px] text-white/50">
                    demo terms pending approval
                  </div>
                </div>

                <div>
                  <div className="font-heading font-bold text-[32px] sm:text-[40px] text-white leading-tight tracking-[-1.2px]">
                    Zero
                  </div>
                  <div className="font-heading font-semibold text-[14px] text-white tracking-[0.28px]">
                    Collateral Required
                  </div>
                  <div className="font-sans text-[12px] text-white/50">
                    BVN-backed verification
                  </div>
                </div>

                <div>
                  <div className="font-heading font-bold text-[32px] sm:text-[40px] text-[#BAF47C] leading-tight tracking-[-1.2px]">
                    24h
                  </div>
                  <div className="font-heading font-semibold text-[14px] text-white tracking-[0.28px]">
                    BVN Direct Approval
                  </div>
                  <div className="font-sans text-[12px] text-white/50">
                    instant credit assessment
                  </div>
                </div>

                <div>
                  <div className="font-heading font-bold text-[32px] sm:text-[40px] text-white leading-tight tracking-[-1.2px]">
                    NEMSA
                  </div>
                  <div className="font-heading font-semibold text-[14px] text-white tracking-[0.28px]">
                    Certified Deployment
                  </div>
                  <div className="font-sans text-[12px] text-white/50">
                    tier-1 hardware warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Section 3: HOW IT WORKS (4 STEPS) matching node 6146:4635 ──── */}
        <section
          id="how-it-works"
          className="bg-[#F5B82E] rounded-[32px] border-b border-[#D9D9D9] py-[80px] px-6 sm:px-10 lg:px-[45px] scroll-mt-24 shadow-sm"
        >
          <div className="max-w-[1440px] mx-auto space-y-[32px]">
            {/* Header */}
            <div className="text-center space-y-[8px]">
              <h2 className="font-heading font-bold text-[28px] sm:text-[32px] text-[#1B1C1C] tracking-[-0.64px]">
                How Buy Small Works
              </h2>
              <p className="font-sans font-normal text-[18px] sm:text-[20px] text-[#42493A] leading-[1.6] max-w-3xl mx-auto">
                Transparent financing backed by certified hardware. No hidden fees, no opaque contracts.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] pt-[16px]">
              {/* Step 1 */}
              <div className="bg-black border border-[#EBEBEB] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[315px]">
                <div className="space-y-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FEF8EA] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-[16px] text-[#F5B82E]">
                    01
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-white">
                    Choose Hardware
                  </h3>
                  <p className="font-sans text-[14px] text-[#E8E8E8] leading-[20px]">
                    Pick eligible hybrid inverters, LiFePO4 batteries, or turnkey solar systems directly from the Petfeb catalog.
                  </p>
                </div>
                <div className="border-t border-[#333] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#D6E7C4]">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Tier-1 Certified Only</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-black border border-[#EBEBEB] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[315px]">
                <div className="space-y-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FEF8EA] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-[16px] text-[#F5B82E]">
                    02
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-white leading-snug">
                    Select Deposit (30%–50%)
                  </h3>
                  <p className="font-sans text-[14px] text-[#E8E8E8] leading-[20px]">
                    Unlock your energy equipment with flexible upfront tiers. Higher deposits lower your ongoing weekly commitments.
                  </p>
                </div>
                <div className="border-t border-[#333] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#D6E7C4]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
                  <span>Customizable Cashflow</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-black border border-[#EBEBEB] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[315px]">
                <div className="space-y-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FEF8EA] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-[16px] text-[#F5B82E]">
                    03
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-white">
                    Choose Cadence
                  </h3>
                  <p className="font-sans text-[14px] text-[#E8E8E8] leading-[20px]">
                    Select weekly, bi-weekly, or monthly intervals synchronised with your revenue cycles or salary schedule.
                  </p>
                </div>
                <div className="border-t border-[#333] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#D6E7C4]">
                  <Calendar className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Synchronised Schedules</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-black border border-[#EBEBEB] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[315px]">
                <div className="space-y-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[12px] bg-[#FEF8EA] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-[16px] text-[#F5B82E]">
                    04
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-white">
                    Deploy &amp; Power On
                  </h3>
                  <p className="font-sans text-[14px] text-[#E8E8E8] leading-[20px]">
                    Certified engineers inspect, mount, and commission your micro-grid with full replacement insurance throughout tenor.
                  </p>
                </div>
                <div className="border-t border-[#333] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#D6E7C4]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Insured &amp; Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Section 4: INTERACTIVE CALCULATOR (7/5 Desktop Grid) ──────── */}
        <section
          id="calculator"
          className="bg-black rounded-[32px] py-[80px] px-4 sm:px-8 lg:px-[45px] scroll-mt-24 shadow-md text-white"
        >
          <div className="max-w-[1440px] mx-auto space-y-[32px]">
            {/* Heading area */}
            <div className="space-y-[8px]">
              <div className="inline-flex items-center gap-[8px] text-[#A7CA80] font-heading font-semibold text-[14px] tracking-[0.28px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Assessment Tool</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[20px] h-[20px] rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <h2 className="font-heading font-bold text-[28px] sm:text-[32px] text-white tracking-[-0.64px]">
                  Buy Small Financing Calculator
                </h2>
              </div>
              <p className="font-sans font-normal text-[18px] sm:text-[20px] text-white max-w-3xl leading-[1.6]">
                Model your hardware investment, calculate exact weekly commitment, and preview full amortisation.
              </p>
            </div>

            {/* Master Calculator Card with 7 / 5 Grid */}
            <div className="bg-[#FBF9F8] rounded-[16px] border border-[#D9D9D9] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-lg text-[#1B1C1C]">
              {/* Left Column: Inputs (7 Columns) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-[28px] border-b lg:border-b-0 lg:border-r border-[#D9D9D9]">
                {/* 1. Hardware Package Selector */}
                <div className="space-y-[8px]">
                  <label className="font-heading font-semibold text-[14px] text-[#1B1C1C] tracking-[0.28px] block">
                    Select Hardware Package
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="w-full bg-[#FBF9F8] border border-[#8A8A8A] rounded-[10px] h-[48px] px-[15px] pr-10 text-[15px] font-sans text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042] appearance-none cursor-pointer"
                    >
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({formatNaira(pkg.price)})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-[#8A8A8A] absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                  <div className="flex items-center justify-between text-[12px] pt-1">
                    <span className="font-sans text-[#737968]">{selectedPkg.specs}</span>
                    <Link href="/#contact" className="font-heading text-[#3F6B1A] hover:underline">
                      Custom system spec?
                    </Link>
                  </div>
                </div>

                {/* 2. Initial Downpayment Deposit (30%, 40%, 50%) */}
                <div className="space-y-[8px]">
                  <label className="font-heading font-semibold text-[14px] text-[#1B1C1C] tracking-[0.28px] block">
                    Initial Downpayment Deposit
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
                    {/* 30% Option */}
                    <button
                      type="button"
                      onClick={() => setDepositPct(30)}
                      className={`h-[120px] rounded-[10px] p-[14px] text-left transition flex flex-col justify-between cursor-pointer ${
                        depositPct === 30
                          ? "bg-black border-2 border-[#70A03C] shadow-sm text-white"
                          : "bg-[#FBF9F8] border border-[#D9D9D9] hover:border-gray-400 text-[#1B1C1C]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-[16px] font-normal">30%</span>
                        {depositPct === 30 && (
                          <div className="w-[18px] h-[18px] rounded-full bg-[#70A03C] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className={`font-heading text-[15px] font-normal ${depositPct === 30 ? "text-[#70A03C]" : "text-black"}`}>
                        {formatNaira(Math.round((totalPrice * 30) / 100))}
                      </div>
                      <span className="bg-[#7BB042] text-white text-[11px] font-medium px-[8px] py-[3px] rounded-[4px] self-start">
                        Most popular
                      </span>
                    </button>

                    {/* 40% Option */}
                    <button
                      type="button"
                      onClick={() => setDepositPct(40)}
                      className={`h-[120px] rounded-[10px] p-[14px] text-left transition flex flex-col justify-between cursor-pointer ${
                        depositPct === 40
                          ? "bg-black border-2 border-[#70A03C] shadow-sm text-white"
                          : "bg-[#FBF9F8] border border-[#D9D9D9] hover:border-gray-400 text-[#1B1C1C]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-[16px] font-normal">40%</span>
                        {depositPct === 40 && (
                          <div className="w-[18px] h-[18px] rounded-full bg-[#70A03C] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className={`font-heading text-[15px] font-normal ${depositPct === 40 ? "text-[#70A03C]" : "text-black"}`}>
                        {formatNaira(Math.round((totalPrice * 40) / 100))}
                      </div>
                      <span className="bg-[#F0EDED] text-[#737968] text-[10px] font-medium px-[8px] py-[3px] rounded-[4px] self-start">
                        Balanced amortisation
                      </span>
                    </button>

                    {/* 50% Option */}
                    <button
                      type="button"
                      onClick={() => setDepositPct(50)}
                      className={`h-[120px] rounded-[10px] p-[14px] text-left transition flex flex-col justify-between cursor-pointer ${
                        depositPct === 50
                          ? "bg-black border-2 border-[#70A03C] shadow-sm text-white"
                          : "bg-[#FBF9F8] border border-[#D9D9D9] hover:border-gray-400 text-[#1B1C1C]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-[16px] font-normal">50%</span>
                        {depositPct === 50 && (
                          <div className="w-[18px] h-[18px] rounded-full bg-[#70A03C] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className={`font-heading text-[15px] font-normal ${depositPct === 50 ? "text-[#70A03C]" : "text-black"}`}>
                        {formatNaira(Math.round((totalPrice * 50) / 100))}
                      </div>
                      <span className="bg-[#F4F9EC] text-[#3F6B1A] text-[10px] font-medium px-[8px] py-[3px] rounded-[4px] self-start">
                        Lowest installment
                      </span>
                    </button>
                  </div>
                </div>

                {/* 3. Repayment Cadence Segmented Tabs */}
                <div className="space-y-[8px]">
                  <label className="font-heading font-semibold text-[14px] text-[#1B1C1C] tracking-[0.28px] block">
                    Repayment Cadence
                  </label>
                  <div className="bg-[#F2F7EC] border-4 border-[#D6E7C4] rounded-[10px] p-[4px] grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setCadence("Weekly")}
                      className={`py-[8px] px-2 rounded-[8px] text-[13px] sm:text-[14px] font-heading font-semibold transition cursor-pointer text-center ${
                        cadence === "Weekly"
                          ? "bg-[#7BB042] text-white shadow-xs"
                          : "text-[#1B1C1C] hover:bg-white/60"
                      }`}
                    >
                      Weekly ({totalWeeks} wks)
                    </button>

                    <button
                      type="button"
                      onClick={() => setCadence("Bi-Weekly")}
                      className={`py-[8px] px-2 rounded-[8px] text-[13px] sm:text-[14px] font-heading font-semibold transition cursor-pointer text-center ${
                        cadence === "Bi-Weekly"
                          ? "bg-[#7BB042] text-white shadow-xs"
                          : "text-[#1B1C1C] hover:bg-white/60"
                      }`}
                    >
                      Bi-Weekly ({totalBiweeks} pmts)
                    </button>

                    <button
                      type="button"
                      onClick={() => setCadence("Monthly")}
                      className={`py-[8px] px-2 rounded-[8px] text-[13px] sm:text-[14px] font-heading font-semibold transition cursor-pointer text-center ${
                        cadence === "Monthly"
                          ? "bg-[#7BB042] text-white shadow-xs"
                          : "text-[#1B1C1C] hover:bg-white/60"
                      }`}
                    >
                      Monthly ({totalMonths} mos)
                    </button>
                  </div>
                </div>

                {/* 4. Tenure Duration */}
                <div className="space-y-[8px]">
                  <label className="font-heading font-semibold text-[14px] text-[#1B1C1C] tracking-[0.28px] block">
                    Tenure Duration
                  </label>
                  <div className="relative">
                    <select
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(Number(e.target.value) as 12 | 6)}
                      className="w-full bg-[#FBF9F8] border border-[#8A8A8A] rounded-[10px] h-[48px] px-[15px] pr-10 text-[14px] font-sans text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042] appearance-none cursor-pointer"
                    >
                      <option value={12}>12 Months (52 weeks standard Petfeb plan)</option>
                      <option value={6}>6 Months (Accelerated 26 weeks payoff plan)</option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-[#8A8A8A] absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 5. Optional Installation Add-On Toggle */}
                <div className="bg-white border border-[#D9D9D9] rounded-[12px] p-[16px] flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-heading font-semibold text-[14px] text-[#1B1C1C]">
                        NEMSA-Certified Installation &amp; Commissioning (+₦120,000)
                      </div>
                      <div className="font-sans text-[12px] text-[#737968]">
                        Includes DC surge arrestors, certified mounting brackets, and 12-month workmanship warranty.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeInstallation(!includeInstallation)}
                    aria-label="Toggle installation add-on"
                    className={`w-[44px] h-[24px] rounded-full p-0.5 transition cursor-pointer shrink-0 ${
                      includeInstallation ? "bg-[#7BB042]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full bg-white transition-transform ${
                        includeInstallation ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Right Column: Calculated Financing Breakdown Card (5 Columns) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-[24px] bg-[#FAF8F5]">
                <div className="space-y-[20px]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-[12px]">
                    <span className="font-heading font-bold text-[13px] uppercase tracking-wider text-black">
                      FINANCING BREAKDOWN
                    </span>
                    <span className="bg-[#E8F3DA] border border-[#7BB042]/30 text-[#3F6B1A] font-heading font-medium text-[11px] px-[10px] py-[3px] rounded-full">
                      BVN Instant Escrow
                    </span>
                  </div>

                  {/* Big Metric Display */}
                  <div className="space-y-[6px]">
                    <span className="font-heading font-bold text-[12px] uppercase text-[#737968] tracking-wider block">
                      ONGOING COMMITMENT
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-bold text-[36px] sm:text-[44px] text-black tracking-tight leading-none">
                        {formatNaira(currentCommitment)}
                      </span>
                      <span className="font-heading font-semibold text-[18px] text-[#737968]">
                        / {cadenceLabel}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 block">
                      (demo placeholder, pending Petfeb approval)
                    </span>
                  </div>

                  {/* Segmented 10-Step Power Meter */}
                  <div className="bg-white border border-[#EBEBEB] rounded-[10px] p-[14px] space-y-[8px]">
                    <div className="flex items-center justify-between text-[11px] font-heading font-medium text-[#737968]">
                      <span>Solar Equity Score</span>
                      <span className="text-[#3F6B1A] font-bold">Grade A Tier-1 Verified</span>
                    </div>
                    {/* 10 Block Segments */}
                    <div className="grid grid-cols-10 gap-1 h-[8px]">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-[2px] transition-colors ${
                            i < 8 ? "bg-[#7BB042]" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#737968]">
                      <span>Zero Asset Collateral</span>
                      <span>Paystack Tokenised</span>
                    </div>
                  </div>

                  {/* Financial Line Items */}
                  <div className="space-y-[10px] text-[13px] pt-1 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[#737968]">Equipment Retail Value</span>
                      <span className="font-medium text-black">{formatNaira(selectedPkg.price)}</span>
                    </div>
                    {includeInstallation && (
                      <div className="flex items-center justify-between">
                        <span className="text-[#737968]">NEMSA Installation &amp; Wiring</span>
                        <span className="font-medium text-black">{formatNaira(installationFee)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between font-semibold text-[#70A03C]">
                      <span>Initial Downpayment ({depositPct}%)</span>
                      <span>{formatNaira(initialDeposit)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#737968]">Financed Principal Balance</span>
                      <span className="font-medium text-black">{formatNaira(financedPrincipal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#737968]">Admin &amp; Verification Fee</span>
                      <span className="font-medium text-[#3F6B1A]">₦0 (Zero Markup)</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-300 font-heading font-bold text-[15px] text-black">
                      <span>Total Amount Repayable</span>
                      <span>{formatNaira(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Early Schedule Preview Table */}
                  <div className="space-y-[8px] pt-2">
                    <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#737968] block">
                      EARLY SCHEDULE PREVIEW
                    </span>
                    <div className="border border-[#D9D9D9] rounded-[8px] overflow-hidden text-[12px] bg-white">
                      <div className="grid grid-cols-3 bg-[#F2F7EC] p-2 font-heading font-bold text-[#344A1C] border-b border-[#D9D9D9]">
                        <span>Installment</span>
                        <span>Expected Due</span>
                        <span className="text-right">Amount</span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        <div className="grid grid-cols-3 p-2 text-gray-700">
                          <span className="font-medium">Inst. #1</span>
                          <span>7 days post-commission</span>
                          <span className="text-right font-semibold text-black">{formatNaira(currentCommitment)}</span>
                        </div>
                        <div className="grid grid-cols-3 p-2 text-gray-700">
                          <span className="font-medium">Inst. #2</span>
                          <span>14 days post-commission</span>
                          <span className="text-right font-semibold text-black">{formatNaira(currentCommitment)}</span>
                        </div>
                        <div className="grid grid-cols-3 p-2 text-gray-700">
                          <span className="font-medium">Inst. #3</span>
                          <span>21 days post-commission</span>
                          <span className="text-right font-semibold text-black">{formatNaira(currentCommitment)}</span>
                        </div>
                        <div className="grid grid-cols-3 p-2 text-gray-700">
                          <span className="font-medium">Inst. #4</span>
                          <span>28 days post-commission</span>
                          <span className="text-right font-semibold text-black">{formatNaira(currentCommitment)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary CTA + Security Badges */}
                <div className="space-y-[12px] pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(true)}
                    className="w-full bg-[#7BB042] text-white font-heading font-bold text-[16px] py-[16px] px-6 rounded-[12px] hover:bg-[#6aa035] transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply with this Plan</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[#737968]">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#7BB042]" />
                      BVN Instant Escrow
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#7BB042]" />
                      Encrypted
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#7BB042]" />
                      NEMSA Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Section 5: WORKED EXAMPLE STRIP matching node 6146:4319 ─────── */}
        <section className="bg-[#F5B82E] rounded-[24px] border border-white/10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm">
          <div className="space-y-[12px] max-w-4xl">
            {/* Tag */}
            <div className="flex items-center gap-2 text-xs font-heading font-medium tracking-[0.6px] uppercase text-[#344A1C]">
              <span>VERIFIED CASE SCENARIO</span>
              <span>·</span>
              <span>IKEJA, LAGOS STATE</span>
            </div>

            {/* Title with check icon */}
            <div className="flex items-center gap-[12px]">
              <div className="w-[20px] h-[20px] rounded-full bg-black flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#7BB042]" strokeWidth={3} />
              </div>
              <h3 className="font-heading font-bold text-[20px] sm:text-[24px] text-black">
                Engr. Babatunde&apos;s Healthcare Diagnostic Clinic
              </h3>
            </div>

            {/* Narrative */}
            <p className="font-sans text-[16px] sm:text-[18px] text-[#333] leading-[1.6]">
              De-escalated volatile generator operating expenses with a ₦3.95M commercial hybrid setup deployed for ₦1.18M upfront. The clinic reported saving over ₦140,000 monthly against previous diesel bills, paying the remaining balance comfortably from operational surplus.
            </p>

            <p className="text-[12px] text-black/80 italic font-sans pt-1">
              * Demonstration customer narrative; individual site savings depend on grid availability and generation irradiance.
            </p>
          </div>

          {/* Metric Badge */}
          <div className="shrink-0 text-left lg:text-right bg-black/10 lg:bg-transparent p-4 lg:p-0 rounded-2xl w-full lg:w-auto">
            <span className="font-sans text-[14px] text-black lg:text-white block">
              Net Monthly Diesel Savings
            </span>
            <span className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] text-[#577D2F] tracking-[-0.64px] block leading-tight">
              ~₦140,000
            </span>
          </div>
        </section>

        {/* ── 5. Section 6: ELIGIBILITY & KYC REQUIREMENTS CHECKLIST ────────── */}
        <section className="bg-black rounded-[32px] py-[80px] px-6 sm:px-10 lg:px-[45px] text-white shadow-md">
          <div className="max-w-[1440px] mx-auto space-y-[32px]">
            {/* Header */}
            <div className="space-y-[8px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[20px] h-[20px] rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <h2 className="font-heading font-bold text-[28px] sm:text-[32px] text-white tracking-[-0.64px]">
                  Three-Point Verification. Zero Asset Collateral.
                </h2>
              </div>
              <p className="font-sans text-[18px] sm:text-[20px] text-[#E8E8E8] max-w-4xl leading-[1.6]">
                Traditional banks demand landed property and months of physical statements. Petfeb Buy Small uses modern automated telemetry and biometric verification.
              </p>
            </div>

            {/* 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] pt-[16px]">
              {/* Requirement 1: Green Card (Highlighted) */}
              <div className="bg-[#7BB042] border border-[#D9D9D9] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[259px] shadow-sm text-white">
                <div className="space-y-[12px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-black border border-[#FEF8EA] flex items-center justify-center text-[#FEF8EA]">
                    <FileCheck2 className="w-5 h-5 text-[#FEF8EA]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-white">
                    1. Valid Nigerian Identification
                  </h3>
                  <p className="font-sans text-[14px] text-white/95 leading-[20px]">
                    National Identity Number (NIN slip or card), Valid Nigerian International Passport, Driver&apos;s License, or Permanent Voter&apos;s Card (PVC).
                  </p>
                </div>
                <div className="border-t border-[#F0EDED] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#F2F7EC]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Instant NIMC cross-check</span>
                </div>
              </div>

              {/* Requirement 2: White Card */}
              <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[259px] shadow-sm text-[#1B1C1C]">
                <div className="space-y-[12px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-[#F2F7EC] flex items-center justify-center text-[#3F6B1A]">
                    <Home className="w-5 h-5 text-[#3F6B1A]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-[#1B1C1C]">
                    2. Proof of Address &amp; Utility Bill
                  </h3>
                  <p className="font-sans text-[14px] text-[#42493A] leading-[20px]">
                    Recent electricity utility distribution bill (EKEDC, IKEDC, AEDC) or verified tenancy agreement dated within the last 3 months.
                  </p>
                </div>
                <div className="border-t border-[#F2F7EC] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#3F6B1A]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Site feasibility assessment</span>
                </div>
              </div>

              {/* Requirement 3: White Card */}
              <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-[25px] flex flex-col justify-between min-h-[259px] shadow-sm text-[#1B1C1C]">
                <div className="space-y-[12px]">
                  <div className="w-[40px] h-[40px] rounded-[8px] bg-[#F2F7EC] flex items-center justify-center text-[#3F6B1A]">
                    <CreditCard className="w-5 h-5 text-[#3F6B1A]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[20px] text-[#1B1C1C]">
                    3. BVN &amp; Automated Direct-Debit
                  </h3>
                  <p className="font-sans text-[14px] text-[#42493A] leading-[20px]">
                    Bank Verification Number (BVN) for identity validation and tokenised debit mandate via Paystack Escrow.
                  </p>
                </div>
                <div className="border-t border-[#F2F7EC] pt-[17px] flex items-center gap-[8px] text-[12px] font-heading text-[#3F6B1A]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Escrow-secured tokenisation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Section 8: TECHNICAL FREQUENTLY ASKED QUESTIONS ────────────── */}
        <section className="bg-[#F5B82E] rounded-[32px] py-[80px] px-6 sm:px-12 lg:px-[192px] shadow-sm">
          <div className="space-y-[32px]">
            {/* Header */}
            <div className="text-center space-y-[12px]">
              <div className="inline-flex items-center gap-[12px]">
                <div className="w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#7BB042]" strokeWidth={3} />
                </div>
                <h2 className="font-heading font-bold text-[28px] sm:text-[32px] text-black tracking-[-0.16px]">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="font-sans text-[18px] sm:text-[20px] text-[#1C1C1C] max-w-2xl mx-auto leading-[1.6]">
                Clear answers regarding operational custody, grid fluctuations, and buyout rules.
              </p>
            </div>

            {/* Accordion FAQ Items */}
            <div className="space-y-[16px] pt-[16px]">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className={`rounded-[12px] transition-all cursor-pointer overflow-hidden p-[22px] ${
                      isOpen
                        ? "bg-black border-2 border-[#7BB042] text-white shadow-md"
                        : "bg-[#FBF9F8] border border-[#D9D9D9] text-[#1B1C1C] hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-semibold text-[16px] sm:text-[18px] leading-snug">
                        {faq.q}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#7BB042]" : "text-gray-500"
                        }`}
                      />
                    </div>
                    {isOpen && (
                      <div className="mt-4 pt-3 border-t border-white/20 font-sans text-[14px] sm:text-[15px] text-[#E8E8E8] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. Section 9: FINAL CTA SECTION matching node 6146:4437 ───────── */}
        <section className="bg-black rounded-[32px] py-[80px] px-6 sm:px-12 lg:px-[192px] text-center text-white shadow-md">
          <div className="max-w-[896px] mx-auto space-y-[32px]">
            <div className="space-y-[12px]">
              <h2 className="font-heading font-bold text-[28px] sm:text-[32px] text-white tracking-[-0.64px]">
                Ready to power your facility on your own terms?
              </h2>
              <p className="font-sans text-[16px] sm:text-[18px] text-[#E8E8E8] max-w-xl mx-auto leading-relaxed">
                Start your Buy Small application now with zero collateral and lock in predictable weekly or monthly repayments.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-[16px] pt-[8px]">
              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="bg-[#7BB042] text-white font-heading font-bold text-[14px] sm:text-[15px] px-[32px] py-[16px] rounded-[10px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-[8px] cursor-pointer"
              >
                <span>Start Buy Small Application</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <Link
                href="/#contact"
                className="bg-[#FBF9F8] border border-[#8A8A8A] text-[#1B1C1C] font-heading font-semibold text-[14px] sm:text-[15px] px-[25px] py-[16px] rounded-[10px] hover:bg-gray-100 transition inline-flex items-center gap-[8px]"
              >
                <Building2 className="w-4 h-4 text-[#1B1C1C]" />
                <span>Speak with an Engineer</span>
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ── Application Modal Form ────────────────────────────────────────── */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#D9D9D9] my-8 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setShowApplyModal(false);
                setSubmittedRef(null);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedRef ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F3DA] text-[#7BB042] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-gray-950">
                  Application Initiated!
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Your Buy Small verification reference is{" "}
                  <strong className="text-black block text-base font-mono mt-1">
                    {submittedRef}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  Our credit assessment desk and certified installer team will review your identity verification and contact you within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      setSubmittedRef(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-black text-white text-sm font-bold font-heading hover:bg-gray-800 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
                    <h3 className="font-heading font-bold text-xl text-gray-950">
                      Apply for Petfeb Buy Small
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: <strong>{selectedPkg.name}</strong> • Downpayment: <strong>{formatNaira(initialDeposit)} ({depositPct}%)</strong> • {cadence}: <strong>{formatNaira(currentCommitment)}</strong>
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Legal Name (as on NIN/Passport)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number (WhatsApp preferred)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Installation State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white"
                      >
                        <option value="Lagos">Lagos State</option>
                        <option value="Abuja">Abuja (FCT)</option>
                        <option value="Rivers">Rivers State (Port Harcourt)</option>
                        <option value="Ogun">Ogun State</option>
                        <option value="Oyo">Oyo State</option>
                        <option value="Delta">Delta State</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Identity Document Type
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white"
                      >
                        <option value="National Identity Number (NIN)">National ID (NIN)</option>
                        <option value="International Passport">International Passport</option>
                        <option value="Drivers License">Driver&apos;s License</option>
                        <option value="Voters Card">Voter&apos;s Card (PVC)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Identity Number (11-digit NIN or Passport No)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12345678901"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Installation Site Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street address, building number, area"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 rounded text-[#7BB042] focus:ring-[#7BB042]"
                      />
                      <span className="text-[11px] text-gray-600 leading-snug">
                        I agree to the Petfeb Buy Small asset financing terms, BVN credit cross-check, and automated Paystack tokenisation mandate upon system signoff.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#7BB042] text-white text-xs font-bold font-heading hover:bg-[#6aa035] transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Verification Application"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
