"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Building2,
  Clock,
  ArrowRight,
  ChevronDown,
  Check,
  AlertCircle,
  Zap,
  PhoneCall,
  Sparkles,
  Lock,
  MapPin,
  IdCard,
  FileText,
  UserCheck,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";
import {
  submitBuySmallVerificationAction,
  lookupVerificationStatusAction,
} from "@/app/actions/verifications";

const PACKAGES = [
  {
    id: "5kva-commercial",
    name: "Petfeb 5kW Hybrid Inverter + 5.12kWh LiFePO4 System",
    price: 3950000,
    specs: "Tier-1 A-Grade Cells & Pure Sine Wave Inverter",
    weeklyEstimated: 54788,
  },
  {
    id: "3kva-residential",
    name: "Petfeb 3kVA Whole-Home Solar Kit",
    price: 1850000,
    specs: "3kVA Inverter • 2 x 200Ah Batteries • 6 x 400W Panels",
    weeklyEstimated: 25650,
  },
  {
    id: "1kva-starter",
    name: "Petfeb 1kVA Starter Solar Kit",
    price: 450000,
    specs: "1kVA Inverter • 1 x 100Ah Battery • 2 x 200W Panels",
    weeklyEstimated: 6250,
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

  // Selected package
  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[0].id);
  const [depositPct, setDepositPct] = useState<30 | 40 | 50>(
    preselectedDeposit === 40 || preselectedDeposit === 50 ? preselectedDeposit : 30
  );
  const [cadence, setCadence] = useState<"Weekly" | "Bi-Weekly" | "Monthly">("Weekly");
  const [includeInstallation, setIncludeInstallation] = useState(true);

  // Application / Lookup modal/form toggle
  const [showApplyForm, setShowApplyForm] = useState(false);
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

  // Weekly, biweekly, monthly installments over 52 weeks (12 months)
  const weeklyInstallment = Math.round(financedPrincipal / 52);
  const biweeklyInstallment = Math.round(financedPrincipal / 26);
  const monthlyInstallment = Math.round(financedPrincipal / 12);

  const currentCommitment =
    cadence === "Weekly"
      ? weeklyInstallment
      : cadence === "Bi-Weekly"
      ? biweeklyInstallment
      : monthlyInstallment;

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
        monthlyIncome: "₦200,000+",
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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ── 1. Hero Header Band (Deep Dark Green #1F3A0B per stitch frame) ── */}
      <section className="bg-[#1F3A0B] text-white pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-emerald-950 relative overflow-hidden">
        {/* Subtle sun-arc motif in top-right */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full pointer-events-none opacity-10 border-[32px] border-[#7BB042]"
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10 space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-emerald-200/70">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold">Buy Small</li>
            </ol>
          </nav>

          <div className="space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
              <span>Petfeb Buy Small Scheme · Flexible Asset Financing</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Power your home now. <br />
              Pay in small amounts.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
              Clean energy shouldn&apos;t drain your working capital. Spread the cost of Tier-1 solar inverters, lithium storage, and panels over predictable weekly or monthly installments. Zero collateral required.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
              >
                <span>Calculate My Plan</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4 Trust Stats Strip at bottom of hero per stitch frame */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-emerald-900/80">
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                30%
              </div>
              <p className="text-xs font-semibold text-[#7BB042]">Min Deposit</p>
              <p className="text-[11px] text-emerald-200/60">demo terms pending approval</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                Zero
              </div>
              <p className="text-xs font-semibold text-[#7BB042]">Collateral Required</p>
              <p className="text-[11px] text-emerald-200/60">BVN-backed verification</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                24h
              </div>
              <p className="text-xs font-semibold text-[#7BB042]">BVN Direct Approval</p>
              <p className="text-[11px] text-emerald-200/60">instant credit assessment</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                NEMSA
              </div>
              <p className="text-xs font-semibold text-[#7BB042]">Certified Deployment</p>
              <p className="text-[11px] text-emerald-200/60">tier-1 hardware warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. How Buy Small Works (4 Cards in a Row) ────────────────── */}
      <section id="how-it-works" className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            ENGINEERING-LED FINANCING
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            How Buy Small Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Transparent financing backed by certified hardware. No hidden fees, no opaque contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Choose Hardware
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pick eligible hybrid inverters, LiFePO4 batteries, or turnkey solar systems directly from the Petfeb catalog.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#3F6B1A] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Tier-1 Certified Only</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-xs flex items-center justify-center">
                02
              </span>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Select Deposit (30%–50%)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Unlock your energy equipment with flexible upfront tiers. Higher deposits lower your ongoing weekly commitments.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#3F6B1A] font-medium">
              <Zap className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Customizable Cashflow</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-xs flex items-center justify-center">
                03
              </span>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Choose Cadence
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Select weekly, bi-weekly, or monthly intervals synchronised with your revenue cycles or salary schedule.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#3F6B1A] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Auto Debit via Paystack</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-xs flex items-center justify-center">
                04
              </span>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Deploy &amp; Power On
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Certified engineers inspect, mount, and commission your micro-grid with full replacement insurance throughout tenor.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#3F6B1A] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Full NEMSA Compliance</span>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          * Illustration only. All step terms, eligibility thresholds, and interest models are demo placeholders, pending Petfeb approval.
        </p>
      </section>

      {/* ── 3. Interactive Buy Small Financing Calculator (Stitch Frame) ── */}
      <section id="calculator" className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              INTERACTIVE ASSESSMENT TOOL
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
              Buy Small Financing Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Model your hardware investment, calculate exact weekly commitment, and preview full amortization.
            </p>
          </div>

          <span className="inline-block px-3 py-1.5 rounded-md bg-[#F4F9EC] border border-[#7BB042]/30 text-xs font-semibold text-[#3F6B1A]">
            Demo placeholders, pending Petfeb approval
          </span>
        </div>

        {/* Dual Column Calculator Card */}
        <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Package Selector */}
            <div className="space-y-2">
              <label htmlFor="package-select" className="text-xs font-bold uppercase text-gray-700 block">
                Select Hardware Package
              </label>
              <div className="relative">
                <select
                  id="package-select"
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#D9D9D9] rounded-xl pl-4 pr-12 py-3.5 text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({formatNaira(pkg.price)})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500">{selectedPkg.specs}</p>
            </div>

            {/* Downpayment Deposit: 3 Cards (30%, 40%, 50%) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase text-gray-700">Initial Downpayment Deposit</span>
                <span className="text-gray-400">(demo placeholders, pending approval)</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDepositPct(30)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-1 transition cursor-pointer ${
                    depositPct === 30
                      ? "bg-[#E8F3DA] border-[#7BB042] text-gray-950 ring-1 ring-[#7BB042]"
                      : "bg-[#F8F9FA] border-[#D9D9D9] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-base sm:text-lg">30%</span>
                    {depositPct === 30 && <CheckCircle2 className="w-4 h-4 text-[#3F6B1A]" />}
                  </div>
                  <span className="font-heading font-bold text-xs text-[#3F6B1A]">
                    {formatNaira((totalPrice * 0.3))}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black text-white self-start">
                    Most popular
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDepositPct(40)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-1 transition cursor-pointer ${
                    depositPct === 40
                      ? "bg-[#E8F3DA] border-[#7BB042] text-gray-950 ring-1 ring-[#7BB042]"
                      : "bg-[#F8F9FA] border-[#D9D9D9] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-base sm:text-lg">40%</span>
                    {depositPct === 40 && <CheckCircle2 className="w-4 h-4 text-[#3F6B1A]" />}
                  </div>
                  <span className="font-heading font-bold text-xs text-[#3F6B1A]">
                    {formatNaira((totalPrice * 0.4))}
                  </span>
                  <span className="text-[10px] text-gray-500 self-start">
                    Balanced amortisation
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDepositPct(50)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-1 transition cursor-pointer ${
                    depositPct === 50
                      ? "bg-[#E8F3DA] border-[#7BB042] text-gray-950 ring-1 ring-[#7BB042]"
                      : "bg-[#F8F9FA] border-[#D9D9D9] hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-base sm:text-lg">50%</span>
                    {depositPct === 50 && <CheckCircle2 className="w-4 h-4 text-[#3F6B1A]" />}
                  </div>
                  <span className="font-heading font-bold text-xs text-[#3F6B1A]">
                    {formatNaira((totalPrice * 0.5))}
                  </span>
                  <span className="text-[10px] text-gray-500 self-start">
                    Lowest installment
                  </span>
                </button>
              </div>
            </div>

            {/* Repayment Cadence */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-700 block">
                Repayment Cadence
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["Weekly", "Bi-Weekly", "Monthly"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCadence(c)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition border cursor-pointer ${
                      cadence === c
                        ? "bg-[#7BB042] text-white border-[#7BB042]"
                        : "bg-white text-gray-700 border-[#D9D9D9] hover:bg-gray-50"
                    }`}
                  >
                    {c} {c === "Weekly" ? "(52 wks)" : c === "Bi-Weekly" ? "(26 pmts)" : "(12 mos)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenure Duration */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-gray-700 block">
                Tenure Duration
              </span>
              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9] text-xs font-semibold text-gray-800">
                12 Months (52 weeks standard Petfeb plan)
              </div>
            </div>

            {/* Installation Toggle */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9D9D9] bg-[#F8F9FA] cursor-pointer">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
                <div>
                  <span className="font-semibold text-xs text-gray-900 block">
                    Include Certified Turnkey Installation
                  </span>
                  <span className="text-[11px] text-gray-500">
                    +₦120,000 professional mounting &amp; NEMSA commissioning spread into installments
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeInstallation}
                onChange={(e) => setIncludeInstallation(e.target.checked)}
                className="w-4 h-4 text-[#7BB042] rounded focus:ring-black"
              />
            </label>
          </div>

          {/* Right Column: Estimated Plan Breakdown Card */}
          <div className="lg:col-span-5 bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-500 uppercase tracking-wider">
                  ESTIMATED PLAN BREAKDOWN
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F3DA] text-[#3F6B1A]">
                  BVN Instant Escrow
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-500 block uppercase">ONGOING COMMITMENT</span>
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
                  {formatNaira(currentCommitment)}{" "}
                  <span className="text-sm sm:text-base font-normal text-gray-500">
                    / {cadence === "Weekly" ? "week" : cadence === "Bi-Weekly" ? "bi-week" : "month"}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 block">
                  (demo placeholder, pending Petfeb approval)
                </span>
              </div>

              {/* Segmented Power Meter (Deposit vs Financed Balance) */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span className="font-semibold text-[#3F6B1A]">Deposit Allocation ({depositPct}%)</span>
                  <span>Financed Balance ({100 - depositPct}%)</span>
                </div>
                <div className="grid grid-cols-10 gap-1 h-2.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i < depositPct / 10 ? "bg-[#7BB042]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Downpayment paid upfront</span>
                  <span>Amortised over 52 weeks</span>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="divide-y divide-gray-200 text-xs pt-2">
                <div className="py-2 flex justify-between">
                  <span className="text-gray-500">System Hardware Price:</span>
                  <span className="font-semibold text-gray-900">{formatNaira(selectedPkg.price)}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gray-500">Turnkey Installation:</span>
                  <span className="font-semibold text-gray-900">{formatNaira(installationFee)}</span>
                </div>
                <div className="py-2 flex justify-between bg-emerald-50/50 -mx-2 px-2 rounded">
                  <span className="font-bold text-[#3F6B1A]">Initial Downpayment ({depositPct}%):</span>
                  <span className="font-heading font-extrabold text-[#3F6B1A]">{formatNaira(initialDeposit)}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gray-500">Financed Principal:</span>
                  <span className="font-semibold text-gray-900">{formatNaira(financedPrincipal)}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gray-500">Admin &amp; Escrow Fee:</span>
                  <span className="font-semibold text-[#3F6B1A]">0% Promo (NEMSA Verified)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowApplyForm(true)}
                className="w-full py-4 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Apply for Buy Small</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 text-center">
                <span>✓ Instant pre-qual</span>
                <span>✓ No collateral</span>
                <span>✓ 256-Bit Escrow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Apply Modal / Sliding Form if Clicked ──────────────────── */}
      {showApplyForm && (
        <section className="max-w-[800px] mx-auto px-4 sm:px-8 animate-in fade-in-50">
          <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-10 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">
                  Buy Small Digital Application
                </h3>
                <p className="text-xs text-gray-500">
                  Pre-selected: {selectedPkg.name} ({depositPct}% Deposit)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowApplyForm(false)}
                className="text-xs text-gray-400 hover:text-gray-700"
              >
                Close ✕
              </button>
            </div>

            {submittedRef ? (
              <div className="p-6 rounded-2xl bg-[#E8F3DA] border border-[#7BB042] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#3F6B1A] mx-auto" />
                <h4 className="font-heading font-bold text-xl text-gray-900">
                  Application Submitted Successfully
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 max-w-md mx-auto">
                  Your verification reference is <strong className="font-mono text-gray-950">{submittedRef}</strong>. Our Lagos/Abuja underwriting desk will review your details within 24 hours.
                </p>
                <div className="pt-2">
                  <Link
                    href="/track-order"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition"
                  >
                    <span>Track Status on Lookup Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Babatunde Adeleke"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="babatunde@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Phone Number (+234)</label>
                    <input
                      required
                      type="tel"
                      placeholder="0803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">State of Residence</label>
                    <div className="relative">
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-10 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white cursor-pointer text-sm"
                      >
                        <option>Lagos</option>
                        <option>Abuja (FCT)</option>
                        <option>Rivers State</option>
                        <option>Oyo State</option>
                        <option>Anambra</option>
                        <option>Other State</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Installation Address</label>
                  <input
                    required
                    type="text"
                    placeholder="Street, estate, or community name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Identity Document Type</label>
                    <div className="relative">
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-10 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white cursor-pointer text-sm"
                      >
                        <option>National Identity Number (NIN)</option>
                        <option>Bank Verification Number (BVN)</option>
                        <option>Driver&apos;s License</option>
                        <option>International Passport</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">ID / NIN Number</label>
                    <input
                      required
                      type="text"
                      placeholder="11-digit NIN or BVN"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#7BB042] focus:ring-black"
                  />
                  <span className="text-[11px] text-gray-600">
                    I agree to Petfeb Buy Small financing terms, automated Paystack direct debit authorization, and identity verification consent.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm cursor-pointer disabled:opacity-50 min-h-[48px]"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Verification Application"}
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* ── 5. Verified Case Scenario Banner (Stitch Frame) ──────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-emerald-300">
              VERIFIED CASE SCENARIO · IKEJA, LAGOS STATE
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Engr. Babatunde&apos;s Healthcare Diagnostic Clinic
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              De-escalated volatile generator operating expenses with a ₦3.95M commercial hybrid setup deployed for ₦1.18M upfront. The clinic reported saving over ₦140,000 monthly against previous diesel bills, paying the remaining balance comfortably from operational surplus.
            </p>
            <p className="text-[10px] text-emerald-300/60">
              * Demonstration customer narrative; individual site savings depend on grid availability and generation irradiance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center shrink-0">
            <span className="text-xs text-emerald-200 block uppercase">Net Monthly Diesel Savings</span>
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#7BB042]">
              ~₦140,000
            </span>
          </div>
        </div>
      </section>

      {/* ── 6. Three-Point Verification. Zero Asset Collateral ───────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            FRICTIONLESS QUALIFICATION
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Three-Point Verification. Zero Asset Collateral.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Traditional banks demand landed property and months of physical statements. Petfeb Buy Small uses modern automated telemetry and biometric verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
              <IdCard className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              1. Valid Nigerian Identification
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              National Identity Number (NIN slip or card), Valid Nigerian International Passport, Driver&apos;s License, or Permanent Voter&apos;s Card (PVC).
            </p>
            <div className="pt-2 text-[11px] text-[#3F6B1A] font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Instant NIMC cross-check</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              2. Proof of Address &amp; Utility Bill
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Recent electricity utility distribution bill (EKEDC, IKEDC, AEDC) or verified tenancy agreement dated within the last 3 months.
            </p>
            <div className="pt-2 text-[11px] text-[#3F6B1A] font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Site feasibility assessment</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-3 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900">
              3. BVN &amp; Automated Direct-Debit
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Bank Verification Number (BVN) for identity validation and tokenised debit mandate via Paystack Escrow.
            </p>
            <div className="pt-2 text-[11px] text-[#3F6B1A] font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>NDPR &amp; CBN compliant</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F9EC] border border-[#7BB042]/30 text-center max-w-4xl mx-auto">
          <p className="text-xs text-[#3F6B1A] font-medium">
            🛡️ Consumer Protection &amp; Privacy: Your financial data is encrypted under 256-bit SSL protocols. We do NOT hold real estate liens or demand guarantor signoffs. All agreements operate under Nigerian consumer credit safeguards (demo placeholders, pending Petfeb approval).
          </p>
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions ────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            ENGINEERING &amp; FINANCIAL CLARITY
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Clear answers regarding operational custody, grid fluctuations, and buyout rules.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-xl border border-[#D9D9D9] p-5 [&_summary::-webkit-details-marker]:none cursor-pointer"
            >
              <summary className="flex items-center justify-between font-heading font-bold text-sm sm:text-base text-gray-900">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180 shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-3 border-t border-gray-100 mt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 8. Bottom CTA Band ───────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#F8F9FA] rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#D9D9D9]">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              ENERGY AUTONOMY
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              Ready to power your facility on your own terms?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Start your Buy Small application now with zero collateral and lock in predictable weekly or monthly repayments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => setShowApplyForm(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm cursor-pointer min-h-[48px]"
            >
              Start Buy Small Application
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-semibold bg-white text-gray-900 hover:bg-gray-50 transition border border-[#D9D9D9]"
            >
              Speak with an Engineer
            </Link>
          </div>

          <p className="text-[11px] text-gray-400">
            National Procurement Desk: +234 800 PETFEB SOLAR · Certified by NEMSA &amp; SON (demo placeholders)
          </p>
        </div>
      </section>
    </div>
  );
}
