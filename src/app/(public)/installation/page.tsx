import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ClipboardList,
  Zap,
  Clock,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Request Installation | Petfeb Solar Systems",
  description:
    "Schedule on-site solar engineering assessment, load audit, and professional system installation across Lagos, Abuja, Port Harcourt, and nationwide.",
};

const STEPS = [
  {
    step: "01",
    title: "Site Survey & Load Audit",
    desc: "Our engineers inspect your roof orientation, shading, DB wiring, and log daily kilowatt-hour consumption.",
  },
  {
    step: "02",
    title: "Precision Sizing & BOQ",
    desc: "We formulate an itemized bill of quantities with tier-1 panels, hybrid inverters, and matched battery storage.",
  },
  {
    step: "03",
    title: "Certified Installation",
    desc: "Neat surface conduit routing, DC breaker protection, surge suppressors, and deep earthing rod bonding.",
  },
  {
    step: "04",
    title: "Commissioning & Support",
    desc: "Live load test verification, smartphone app monitoring setup, warranty certification, and maintenance schedule.",
  },
];

export default function InstallationPage() {
  return (
    <div className="py-12 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-16">
      {/* ── Page Header & Visual ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-[#3F6B1A] border border-emerald-200">
            <Wrench className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Nationwide Field Engineering Dispatch</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
            Professional Solar System Design & Installation
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Eliminate power interruptions with precision-engineered solar installations. Built by certified field technicians across Lagos, Abuja, Port Harcourt, and nationwide with strict adherence to electrical safety and neat wiring aesthetics.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/2348135854054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+2348135854054"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition"
            >
              <PhoneCall className="w-4 h-4 text-[#3F6B1A]" />
              Call +234 813-585-4054
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F6B1A] hover:underline"
            >
              Fill Survey Form <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-900 h-80 sm:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/websitepic/installer"
              alt="Petfeb Certified Solar & Battery Installation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B82E] block">
                Standard of Excellence
              </span>
              <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                Certified Inverter Commissioning • Strict DC Safety Protocols
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Installation Standards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center gap-3 text-[#3F6B1A]">
            <ShieldCheck className="w-5 h-5 text-[#7BB042]" />
            <span className="font-heading font-bold text-lg text-gray-900">Tier-1 Components</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Only factory-tested pure sine inverters, grade-A lithium batteries, and high-efficiency monocrystalline panels.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center gap-3 text-[#3F6B1A]">
            <Zap className="w-5 h-5 text-[#7BB042]" />
            <span className="font-heading font-bold text-lg text-gray-900">Zero-Flicker Transfer</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Seamless automatic changeover switchgear keeps servers, freezers, and TVs running without reboots.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center gap-3 text-[#3F6B1A]">
            <Clock className="w-5 h-5 text-[#7BB042]" />
            <span className="font-heading font-bold text-lg text-gray-900">Full Warranty Support</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Rapid technician dispatch and comprehensive manufacturer warranties on all hardware installations.
          </p>
        </div>
      </div>

      {/* ── How It Works Process ──────────────────────────────── */}
      <div className="space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            The Engineering Process
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
            From Site Audit to Clean Power
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">
                  {s.step}
                </span>
                <h3 className="font-heading font-bold text-base text-gray-900">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Call To Action Banner ─────────────────────────────── */}
      <div className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
          Ready to Electrify Your Property with Solar?
        </h2>
        <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
          Reach out today to schedule an engineer survey at your home, factory, hospital, or commercial facility.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] inline-flex items-center justify-center rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
          >
            Request Site Assessment
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] inline-flex items-center justify-center rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
          >
            Browse Pre-Engineered Kits
          </Link>
        </div>
      </div>
    </div>
  );
}
