"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Upload,
  Calendar,
  Building2,
  Clock,
  ArrowRight,
  ArrowLeft,
  FileText,
  UserCheck,
  Check,
  AlertCircle,
  HelpCircle,
  Zap,
  PhoneCall,
  Sparkles,
  ChevronDown,
  Layers,
  ChevronRight,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";
import {
  submitBuySmallVerificationAction,
  lookupVerificationStatusAction,
} from "@/app/actions/verifications";

const SOLAR_SYSTEMS = [
  {
    slug: "petfeb-1kva-starter-kit",
    name: "1kVA Starter Solar Kit",
    capacityDesc: "Lights, TV, Fans, Laptops, Wi-Fi",
    totalPrice: 450000,
    imageUrl: "/api/websitepic/battery",
    specs: "1kVA Inverter • 1 x 100Ah Battery • 2 x 200W Panels",
  },
  {
    slug: "petfeb-3kva-home-kit",
    name: "3kVA Whole-Home Solar Kit",
    capacityDesc: "Fridge, Freezer, TV, Fans, Lighting",
    totalPrice: 1850000,
    imageUrl: "/api/websitepic/residential",
    specs: "3kVA Inverter • 2 x 200Ah Batteries • 6 x 400W Panels",
  },
  {
    slug: "5kva-whole-home",
    name: "5kVA Premium Hybrid System",
    capacityDesc: "Inverter AC, Pumping Machine, Deep Freezers",
    totalPrice: 2850000,
    imageUrl: "/api/websitepic/commercial",
    specs: "5kVA Inverter • 10kWh Lithium Bank • 10 x 400W Panels",
  },
];

const FAQS = [
  {
    q: "How does the Buy Small solar installment plan work?",
    a: "Buy Small allows you to acquire a complete turnkey solar power system with just 30% initial equity down-payment. Once your simple digital KYC and NIN verification are approved, our engineers install the system within 48 hours. You then spread the remaining balance over 6 or 12 convenient monthly installments.",
  },
  {
    q: "What documents are required to apply and verify?",
    a: "You need a valid government-issued ID (National Identity Number/NIN, Permanent Voter's Card, Driver's License, or International Passport), your verifiable residential address, and a recent utility bill or proof of residence. No collateral is required.",
  },
  {
    q: "How long does verification and credit review take?",
    a: "Our verification desk in Lagos, Abuja, and Port Harcourt reviews digital submissions within 24 to 48 business hours. You receive status updates via WhatsApp and SMS.",
  },
  {
    q: "Can I pay off my remaining balance early?",
    a: "Yes! There are zero penalty fees for early liquidation. You can clear your remaining installments at any time with complete transparency.",
  },
  {
    q: "What happens if a component needs maintenance during the repayment period?",
    a: "Your system remains under full Petfeb engineering warranty. If an inverter or battery component exhibits a manufacturer fault, our certified field engineers repair or replace it without voiding your agreement.",
  },
  {
    q: "What happens if I relocate to another property before finishing payments?",
    a: "You simply notify our customer desk. Petfeb field technicians can safely dismantle, transport, and re-commission your solar installation at your new home or office location for a modest re-installation fee.",
  },
];

interface BuySmallPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default function BuySmallPage({ searchParams }: BuySmallPageProps) {
  const resolvedParams = use(searchParams);
  const preselectedSlug = resolvedParams?.product || "";

  // Financing calculator state
  const initialSystem =
    SOLAR_SYSTEMS.find((s) => s.slug === preselectedSlug) || SOLAR_SYSTEMS[0];
  const [selectedSystemSlug, setSelectedSystemSlug] = useState(initialSystem.slug);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [tenorMonths, setTenorMonths] = useState(6);

  // Application Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("Lagos");
  const [employmentStatus, setEmploymentStatus] = useState("Salaried Employee");
  const [monthlyIncome, setMonthlyIncome] = useState("₦200,000 - ₦500,000");
  const [idType, setIdType] = useState("National Identification Number (NIN)");
  const [idNumber, setIdNumber] = useState("");
  const [idFileUploaded, setIdFileUploaded] = useState(false);
  const [utilityFileUploaded, setUtilityFileUploaded] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<null | {
    refCode: string;
    submittedAt: string;
    systemName: string;
    downPayment: number;
    monthlyRepayment: number;
    fullName: string;
    email: string;
  }>(null);

  // Status Check lookup tab
  const [activeTab, setActiveTab] = useState<"apply" | "track">("apply");
  const [lookupCode, setLookupCode] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState<null | {
    ref: string;
    status: string;
    message: string;
  }>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeSystem =
    SOLAR_SYSTEMS.find((s) => s.slug === selectedSystemSlug) || SOLAR_SYSTEMS[0];

  const downPaymentAmount = Math.round(
    activeSystem.totalPrice * (downPaymentPercent / 100)
  );
  const balanceAmount = activeSystem.totalPrice - downPaymentAmount;
  const monthlyRepayment = Math.round(balanceAmount / tenorMonths);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Buy Small financing and verification terms.");
      return;
    }
    if (!idNumber) {
      alert("Please provide your ID / NIN number for verification.");
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
        systemName: activeSystem.name,
        downPayment: downPaymentAmount,
        monthlyRepayment,
      });

      if (res.error) {
        alert(res.error);
        setIsSubmitting(false);
        return;
      }

      setSubmittedApplication({
        refCode: res.refCode || `PET-BSV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        systemName: activeSystem.name,
        downPayment: downPaymentAmount,
        monthlyRepayment,
        fullName,
        email,
      });
    } catch (err: unknown) {
      console.error(err);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;

    setIsLookingUp(true);
    try {
      const res = await lookupVerificationStatusAction(lookupCode);
      if (res.found) {
        setLookupResult({
          ref: lookupCode.trim().toUpperCase(),
          status: res.status || "pending",
          message:
            res.message ||
            "Verification record retrieved. Your profile status is updated in real-time.",
        });
      } else {
        setLookupResult({
          ref: lookupCode.trim().toUpperCase(),
          status: "not_found",
          message:
            res.message ||
            "No application record was found for this code or email. Please check your spelling or apply above.",
        });
      }
    } catch {
      setLookupResult({
        ref: lookupCode.trim().toUpperCase(),
        status: "action_needed",
        message:
          "Unable to query verification status at this time. Please retry in a few moments.",
      });
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ── 1. Split Hero Section (Rich Landing Style) ──────────── */}
      <section className="bg-gradient-to-b from-emerald-50/60 to-[#F8F9FA] pt-10 sm:pt-16 pb-16 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading, Proposition, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/90 text-[#3F6B1A] border border-emerald-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/api/logo" alt="Logo" className="w-5 h-5 object-contain" />
                <span>Petfeb Buy Small Financing Initiative</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
                Power Your Home Today, Pay Small-Small With Zero Stress
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Say goodbye to fuel queues, generator smoke, and volatile electricity tariffs. Acquire a certified, tier-1 solar system with just a <span className="font-bold text-gray-900">30% initial down-payment</span> and spread the remaining balance across 6 to 12 comfortable monthly payments.
              </p>

              {/* Trust Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
                  <span>Instant Digital NIN Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
                  <span>On-Site Installation within 48 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
                  <span>0% Hidden Fees or Surcharges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
                  <span>Full Hardware & Battery Warranty</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
                <a
                  href="#portal-section"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm text-center cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  Calculate & Apply Now
                </a>
                <a
                  href="https://wa.me/2348135854054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition text-center shadow-2xs"
                >
                  <PhoneCall className="w-4 h-4 text-[#3F6B1A]" />
                  Chat With Financing Desk
                </a>
              </div>
            </div>

            {/* Right Column: Visual Showcase Frame with Floating Badges */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-900 h-80 sm:h-[420px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/hero"
                  alt="Petfeb Solar Installation & Buy Small Financing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#3F6B1A] border border-white/40 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
                  <span>30% Initial Down-Payment</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B82E] block">
                    Rapid Fulfillment Guaranteed
                  </span>
                  <p className="text-xs sm:text-sm font-medium">
                    Verified On-Site Installation Within 48 Hours Across Lagos, Abuja & Port Harcourt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Real Scale & Trust Numbers ───────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-gray-200/90 shadow-2xs text-center">
          <div className="space-y-1">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A]">
              30%
            </span>
            <span className="text-xs text-gray-600 block font-medium">
              Low Initial Down-Payment
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A]">
              48h
            </span>
            <span className="text-xs text-gray-600 block font-medium">
              Average Approval & Dispatch
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A]">
              6 - 12m
            </span>
            <span className="text-xs text-gray-600 block font-medium">
              Flexible Monthly Tenors
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#3F6B1A]">
              10+ Yrs
            </span>
            <span className="text-xs text-gray-600 block font-medium">
              Solar Engineering Excellence
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. How the Buy Small Plan Works (4-Step Flow) ──────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Streamlined Financing Journey
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
            How Buy Small Works in 4 Simple Steps
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            We removed the complicated paperwork. Here is how your property gets powered up quickly and transparently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <span className="font-heading font-extrabold text-2xl text-[#7BB042]">01</span>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Select System & Calculate
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Use our live calculator to choose your solar capacity, adjust your initial down-payment, and select a 6 or 12-month repayment period.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <span className="font-heading font-extrabold text-2xl text-[#7BB042]">02</span>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Instant KYC & NIN Upload
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Submit your National Identification Number (NIN) along with a quick photo of your ID and proof of residence directly on our secure portal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <span className="font-heading font-extrabold text-2xl text-[#7BB042]">03</span>
            <h3 className="font-heading font-bold text-base text-gray-900">
              48-Hour Desk Approval
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our regional underwriting desk reviews your application within 24 to 48 business hours and issues your official financing agreement.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <span className="font-heading font-extrabold text-2xl text-[#7BB042]">04</span>
            <h3 className="font-heading font-bold text-base text-gray-900">
              Installation & Handover
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Upon paying your 30% initial down-payment, Petfeb certified field technicians arrive at your site to install, ground, and commission your system.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Who Qualifies for Buy Small? ────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Eligibility Framework
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
            Who Qualifies for Buy Small Financing?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-[#7BB042]" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900 pt-1">
              Salaried Employees
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Corporate professionals, federal/state civil servants, and healthcare workers with steady monthly payroll income.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-[#7BB042]" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900 pt-1">
              Registered Business Owners
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Retail stores, medical clinics, legal offices, and CAC-registered SMEs seeking to eliminate daily diesel costs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#7BB042]" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900 pt-1">
              Property Landlords
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Owners of residential duplexes, apartment blocks, and commercial office suites seeking to add solar value.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#7BB042]" />
            </div>
            <h3 className="font-heading font-bold text-base text-gray-900 pt-1">
              Remote Professionals
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Software engineers, creative consultants, and remote contractors requiring 24/7 power for uninterrupted work.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Main Application & Verification Portal ─────────── */}
      <section id="portal-section" className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8 scroll-mt-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Digital Onboarding Desk
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 mt-1">
            Apply or Track Your Verification
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Fill out your details to start a new application, or look up your pending verification code.
          </p>
        </div>

        {/* ── PROPERLY RESIZED TAB BUTTONS (Prominent, High-Contrast & Responsive) ── */}
        <div className="bg-gray-100/90 p-2 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-2xl border border-gray-200 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("apply")}
            className={`flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer min-h-[52px] ${
              activeTab === "apply"
                ? "bg-[#7BB042] text-white shadow-md ring-2 ring-[#7BB042]"
                : "text-gray-700 hover:text-gray-950 hover:bg-white/80"
            }`}
          >
            <CreditCard className="w-5 h-5 shrink-0" />
            <span>New Financing Application</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("track")}
            className={`flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer min-h-[52px] ${
              activeTab === "track"
                ? "bg-[#7BB042] text-white shadow-md ring-2 ring-[#7BB042]"
                : "text-gray-700 hover:text-gray-950 hover:bg-white/80"
            }`}
          >
            <Clock className="w-5 h-5 shrink-0" />
            <span>Track Verification Status</span>
          </button>
        </div>

        {activeTab === "track" ? (
          /* ── Track Verification Status Screen ──────────────────── */
          <div className="max-w-2xl bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-2xs space-y-6">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-gray-900">
                Check Buy Small Verification Status
              </h3>
              <p className="text-xs text-gray-600">
                Enter your Application & Verification Reference Code (e.g. PET-BSV-2026-1049).
              </p>
            </div>

            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="PET-BSV-2026-XXXX"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
              />
              <button
                type="submit"
                disabled={isLookingUp}
                className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isLookingUp ? "Checking..." : "Verify Status"}
              </button>
            </form>

            {lookupResult && (
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2 animate-in fade-in-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">{lookupResult.ref}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                      lookupResult.status === "verified"
                        ? "bg-emerald-100 text-[#3F6B1A] border-emerald-300"
                        : lookupResult.status === "rejected"
                        ? "bg-rose-100 text-rose-800 border-rose-300"
                        : "bg-amber-100 text-amber-800 border-amber-200"
                    }`}
                  >
                    {lookupResult.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{lookupResult.message}</p>
              </div>
            )}
          </div>
        ) : submittedApplication ? (
          /* ── Submission Confirmation Receipt ──────────────────── */
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#3F6B1A] flex items-center justify-center mx-auto sm:mx-0">
              <UserCheck className="w-8 h-8 text-[#7BB042]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                Application Logged & Submitted
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                Verification Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you, {submittedApplication.fullName}. Your Buy Small application and identity documents have been routed to our verification team.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Verification Reference</span>
                <span className="font-mono font-bold text-sm text-[#3F6B1A]">
                  {submittedApplication.refCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Selected System</span>
                <span className="font-semibold text-gray-900">{submittedApplication.systemName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Initial Down Payment (30%)</span>
                <span className="font-bold text-gray-950">
                  {formatNaira(submittedApplication.downPayment)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Monthly Repayment</span>
                <span className="font-bold text-[#3F6B1A]">
                  {formatNaira(submittedApplication.monthlyRepayment)} / mo
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                <span className="text-gray-500">Status</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold uppercase text-[11px]">
                  Pending Verification
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 text-xs text-gray-700 text-left space-y-1">
              <p className="font-bold text-[#3F6B1A]">What Happens Next?</p>
              <p>
                1. Our regional verification desk validates your NIN and uploaded utility documentation within 24-48 business hours.
              </p>
              <p>
                2. You receive an official SMS and WhatsApp notice with your approved repayment schedule.
              </p>
              <p>
                3. Upon initial down-payment settlement, a certified Petfeb engineering team is dispatched to install your system.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs"
              >
                Back to Solar Kits
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSubmittedApplication(null)}
                className="text-xs font-semibold text-gray-600 hover:underline cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* ── Main Application Portal: Calculator & Verification Form ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Interactive Calculator & Plan Selection */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
                    Step 1 of 2
                  </span>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mt-0.5">
                    Live Repayment Calculator
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Adjust down payment and repayment tenor to fit your cashflow.
                  </p>
                </div>

                {/* Select System Kit */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">
                    Select Solar Package:
                  </label>
                  <select
                    value={selectedSystemSlug}
                    onChange={(e) => setSelectedSystemSlug(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white"
                  >
                    {SOLAR_SYSTEMS.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name} ({formatNaira(s.totalPrice)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Down Payment Percentage Buttons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-700">Initial Down Payment:</span>
                    <span className="font-extrabold text-[#3F6B1A]">{downPaymentPercent}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[30, 40, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDownPaymentPercent(pct)}
                        className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer border ${
                          downPaymentPercent === pct
                            ? "bg-emerald-50 text-[#3F6B1A] border-emerald-300 ring-1 ring-emerald-300"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tenor Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-700">Repayment Period:</span>
                    <span className="font-extrabold text-[#3F6B1A]">{tenorMonths} Months</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenorMonths(m)}
                        className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer border ${
                          tenorMonths === m
                            ? "bg-emerald-50 text-[#3F6B1A] border-emerald-300 ring-1 ring-emerald-300"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {m} Months Plan
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Results Summary Box */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Retail System Value</span>
                    <span className="font-semibold text-gray-900">
                      {formatNaira(activeSystem.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Initial Down Payment ({downPaymentPercent}%)</span>
                    <span className="font-bold text-gray-950">
                      {formatNaira(downPaymentAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 items-baseline">
                    <div>
                      <span className="font-bold text-gray-900 block">Monthly Repayment</span>
                      <span className="text-[11px] text-gray-400">For {tenorMonths} consecutive months</span>
                    </div>
                    <span className="font-heading font-extrabold text-xl text-[#3F6B1A]">
                      {formatNaira(monthlyRepayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sign Up & Verification Application Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleApply} className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
                    Step 2 of 2
                  </span>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mt-0.5">
                    Applicant Profile & Identity Verification
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Required for underwriting and scheduling on-site installation.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-semibold text-gray-700 block">
                      Full Legal Name (as on official ID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Olawale Davies"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-700 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="samuel@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-700 block">
                      Phone Number (WhatsApp Active) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 813 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-semibold text-gray-700 block">
                      Installation Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Property address where solar system will be installed"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-700 block">
                      Employment / Income Source *
                    </label>
                    <select
                      value={employmentStatus}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white text-xs"
                    >
                      <option value="Salaried Employee">Salaried Employee (Private / Public)</option>
                      <option value="Registered Business Owner">Registered Business Owner (CAC)</option>
                      <option value="Sole Trader / Merchant">Sole Trader / Merchant</option>
                      <option value="Independent Contractor">Independent Contractor</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-700 block">
                      Estimated Monthly Income *
                    </label>
                    <select
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white text-xs"
                    >
                      <option value="₦100,000 - ₦250,000">₦100,000 - ₦250,000</option>
                      <option value="₦250,000 - ₦500,000">₦250,000 - ₦500,000</option>
                      <option value="₦500,000 - ₦1,000,000">₦500,000 - ₦1,000,000</option>
                      <option value="Above ₦1,000,000">Above ₦1,000,000</option>
                    </select>
                  </div>
                </div>

                {/* ID Document & KYC Upload Section */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
                    <h4 className="font-heading font-bold text-sm text-gray-900">
                      National ID Verification & KYC Document
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-700 block">
                        ID Document Type *
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white text-xs"
                      >
                        <option value="National Identification Number (NIN)">NIN (National ID Slip/Card)</option>
                        <option value="Voter's Card (VIN)">Permanent Voter&apos;s Card (PVC)</option>
                        <option value="Driver's License">FRSC Driver&apos;s License</option>
                        <option value="International Passport">International Passport</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-700 block">
                        ID / NIN Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 11-digit NIN or Card Number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                      />
                    </div>
                  </div>

                  {/* Upload Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-[#7BB042] bg-gray-50 text-center space-y-2 cursor-pointer transition">
                      <Upload className="w-5 h-5 mx-auto text-gray-400" />
                      <div>
                        <span className="font-semibold text-xs text-gray-900 block">
                          Upload ID Card Photo
                        </span>
                        <span className="text-[11px] text-gray-500">JPEG, PNG or PDF (Max 5MB)</span>
                      </div>
                      <label className="inline-flex px-3 py-1 rounded bg-white border border-gray-200 text-[11px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer">
                        {idFileUploaded ? "File Attached ✓" : "Choose File"}
                        <input
                          type="file"
                          className="hidden"
                          onChange={() => setIdFileUploaded(true)}
                        />
                      </label>
                    </div>

                    <div className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-[#7BB042] bg-gray-50 text-center space-y-2 cursor-pointer transition">
                      <FileText className="w-5 h-5 mx-auto text-gray-400" />
                      <div>
                        <span className="font-semibold text-xs text-gray-900 block">
                          Proof of Address / Electricity Bill
                        </span>
                        <span className="text-[11px] text-gray-500">Recent utility bill (Max 5MB)</span>
                      </div>
                      <label className="inline-flex px-3 py-1 rounded bg-white border border-gray-200 text-[11px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer">
                        {utilityFileUploaded ? "File Attached ✓" : "Choose File"}
                        <input
                          type="file"
                          className="hidden"
                          onChange={() => setUtilityFileUploaded(true)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 text-[#7BB042] focus:ring-[#7BB042] rounded"
                    />
                    <span>
                      I confirm that the provided information and identity documents are authentic. I agree to Petfeb International Company Limited&apos;s installment financing terms and credit verification checks.
                    </span>
                  </label>
                </div>

                {/* Submit Application */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm cursor-pointer disabled:opacity-70 active:scale-98"
                >
                  <UserCheck className="w-4 h-4" />
                  {isSubmitting
                    ? "Submitting Application & Verification..."
                    : "Submit Application & Start Verification"}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* ── 6. Eligible Solar Packages Showcase ───────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Financing Portfolio
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
            Pre-Engineered Packages Eligible for Buy Small
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Choose a verified capacity package. Every package includes tier-1 pure sine inverters, matched batteries, solar panels, and professional certified installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOLAR_SYSTEMS.map((system) => {
            const down = Math.round(system.totalPrice * 0.3);
            const monthly = Math.round((system.totalPrice - down) / 6);
            const isSelected = selectedSystemSlug === system.slug;

            return (
              <div
                key={system.slug}
                className={`rounded-3xl bg-white border overflow-hidden flex flex-col justify-between transition-all ${
                  isSelected
                    ? "border-[#7BB042] ring-2 ring-[#7BB042]/20 shadow-md"
                    : "border-gray-200/90 shadow-2xs hover:border-gray-300"
                }`}
              >
                <div>
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={system.imageUrl}
                      alt={system.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                      {system.capacityDesc}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-heading font-bold text-lg text-gray-900">
                      {system.name}
                    </h3>
                    <p className="text-xs text-gray-500">{system.specs}</p>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Retail Price:</span>
                        <span className="font-bold text-gray-900">{formatNaira(system.totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">30% Down Payment:</span>
                        <span className="font-extrabold text-[#3F6B1A]">{formatNaira(down)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-1.5">
                        <span className="text-gray-500">Monthly (6 mos):</span>
                        <span className="font-extrabold text-gray-950">{formatNaira(monthly)} / mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSystemSlug(system.slug);
                      const el = document.getElementById("portal-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition text-center cursor-pointer ${
                      isSelected
                        ? "bg-[#3F6B1A] text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {isSelected ? "Currently Selected ✓" : "Select & Calculate Plan"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions (FAQ Accordion) ──────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Transparent Terms
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about Petfeb Buy Small financing, credit eligibility, and long-term warranties.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 8. Financing Desk Callout ───────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Have Questions About Custom Sizing or Corporate Financing?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Our financing desks in Lagos, Abuja, and Port Harcourt are ready to assist with custom corporate proposals, multi-property installments, and employer tie-in arrangements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="https://wa.me/2348135854054"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
            >
              WhatsApp Support (+234 813-585-4054)
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
            >
              Send Site Survey Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
