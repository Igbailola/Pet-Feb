import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solar Training & Academy | Petfeb Solar",
  description:
    "Comprehensive solar PV technical installation and maintenance training in Nigeria. Practical hands-on curriculum for technicians, engineers, and installers.",
};

const MODULES = [
  {
    number: "01",
    title: "Solar PV Sizing & Electrical Engineering",
    duration: "Module 1",
    summary:
      "Master real-world load calculations, appliance peak wattage surges, solar insolation data in Nigeria, and optimal string voltage configurations.",
    topics: [
      "Daily kilowatt-hour (kWh) demand calculation",
      "Solar panel angle, azimuth & shading analysis",
      "Battery bank sizing (Lithium LiFePO4 vs. Deep-Cycle Gel)",
      "Charge controller & MPPT voltage matching",
    ],
  },
  {
    number: "02",
    title: "Practical Installation, Earthing & Safety",
    duration: "Module 2",
    summary:
      "Hands-on workshop focusing on clean conduit routing, high-voltage DC isolation, roof mounting mechanics, and life-safety earthing standards.",
    topics: [
      "Roof structure integrity & aluminium rail mounting",
      "DC cabling, crimping, and MC4 connector assembly",
      "Earth rod installation, bonding & lightning protection",
      "AC changeover switchgear & consumer unit integration",
    ],
  },
  {
    number: "03",
    title: "Inverter Commissioning, Testing & Maintenance",
    duration: "Module 3",
    summary:
      "Learn troubleshooting protocols, error code diagnosis, inverter parameter configuration, and routine preventive inspection procedures.",
    topics: [
      "Inverter parameter programming & battery cut-off points",
      "Insulation resistance & open-circuit voltage testing",
      "Battery state-of-health (SoH) diagnostics",
      "Preventive maintenance schedules & customer handover",
    ],
  },
  {
    number: "04",
    title: "Renewable Energy Project Management",
    duration: "Module 4",
    summary:
      "Essential commercial skills for running a sustainable solar installation practice, sourcing authentic equipment, and managing project warranties.",
    topics: [
      "Equipment procurement & verifying genuine manufacturers",
      "Bill of quantities (BOQ) preparation & costing",
      "Customer load verification & expectations management",
      "Warranty documentation and after-sales service models",
    ],
  },
];

export default function TrainingPage() {
  return (
    <div className="py-12 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-16">
      {/* ── Page Header & Workshop Visual ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-[#3F6B1A] border border-emerald-200">
            <GraduationCap className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Petfeb Solar Technical Academy</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
            Professional Solar Installation & Engineering Training
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Empowering the next generation of certified renewable energy technicians across Nigeria with rigorous hands-on field experience, safety standards, and practical electrical sizing.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md h-64 sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/websitepic/training"
              alt="Petfeb Solar Practical Workshop Lab"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B82E] block">
                Hands-On Practical Lab
              </span>
              <p className="text-xs text-white/95 font-medium mt-0.5">
                Real Inverter Wiring, DC Cabling & High-Voltage Isolation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Training Metrics ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center gap-3 text-[#3F6B1A]">
            <BookOpen className="w-5 h-5 text-[#7BB042]" />
            <span className="font-heading font-bold text-lg text-gray-900">70% Practical Workshop</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Real hardware labs with actual inverters, battery banks, racking mounts, and live testing meters.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center gap-3 text-[#3F6B1A]">
            <Wrench className="w-5 h-5 text-[#7BB042]" />
            <span className="font-heading font-bold text-lg text-gray-900">Field-Ready Competency</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Graduates gain verified competencies in residential and commercial installation workflows.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center gap-3 text-[#3F6B1A]">
            <ShieldCheck className="w-5 h-5 text-[#7BB042]" />
            <span className="font-heading font-bold text-lg text-gray-900">Safety First Protocols</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Comprehensive electrical safety training covering DC arc faults, grounding, and high-voltage protection.
          </p>
        </div>
      </div>

      {/* ── Curriculum Modules Grid ───────────────────────────── */}
      <div className="space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Comprehensive Curriculum
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
            Core Learning Modules
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          {MODULES.map((m) => (
            <div
              key={m.number}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-emerald-300 transition-colors sticky top-36 z-10 md:static md:z-auto [&:nth-child(2)]:top-40 [&:nth-child(2)]:z-20 [&:nth-child(3)]:top-44 [&:nth-child(3)]:z-30 [&:nth-child(4)]:top-48 [&:nth-child(4)]:z-40"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-2xl text-[#7BB042]">
                    {m.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {m.duration}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-gray-900 leading-snug">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {m.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide block">
                  Key Topics Covered:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {m.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042] shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Training Cohort Information ───────────────────────── */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Upcoming Cohorts
          </span>
          <h2 className="font-heading font-bold text-2xl text-gray-900 mt-1">
            Training Schedule & Registration
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            Cohorts run on scheduled cycles throughout the year at our technical training facility in Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-emerald-100">
            <Calendar className="w-5 h-5 text-[#7BB042] shrink-0" />
            <div>
              <span className="font-semibold text-gray-900 block">Next Cycle</span>
              <span className="text-gray-600">Quarterly Intake Cycles</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-emerald-100">
            <Clock className="w-5 h-5 text-[#7BB042] shrink-0" />
            <div>
              <span className="font-semibold text-gray-900 block">Class Timing</span>
              <span className="text-gray-600">Weekday & Weekend Options</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-emerald-100">
            <MapPin className="w-5 h-5 text-[#7BB042] shrink-0" />
            <div>
              <span className="font-semibold text-gray-900 block">Location</span>
              <span className="text-gray-600">Lagos & Regional Centers</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm text-center"
          >
            Inquire About Training Enrollment
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-gray-500">
            * Direct applications will be open via student portal in a future release.
          </span>
        </div>
      </div>
    </div>
  );
}
