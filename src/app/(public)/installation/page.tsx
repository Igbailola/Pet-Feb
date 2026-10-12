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
  Check,
  X,
  MapPin,
  Calendar,
  Lock,
  ChevronDown,
} from "lucide-react";
import { InstallationForm } from "@/components/public/InstallationForm";

export const metadata: Metadata = {
  title: "Installation Services | Petfeb Solar Engineering",
  description:
    "Installed right, built to last. Certified solar engineering ensuring optimal performance, warranty protection, and complete safety across Nigeria.",
};

const PILLARS = [
  {
    title: "Full Warranty Validation",
    desc: "Protects Tier-1 solar panel linear generation and hybrid inverter factory warranties through certified torque and voltage calibrations.",
    tag: "Tier-1 Factory Escrow",
  },
  {
    title: "Trained & Certified Techs",
    desc: "Every installer is a certified Petfeb Academy graduate and COREN/NEMSA-licensed wireman trained in high-voltage DC safety protocols.",
    tag: "NEMSA Verified Wiremen",
  },
  {
    title: "Grid & Gen Interlocking",
    desc: "Sub-millisecond ATS interlocking prevents catastrophic generator backfeeding into solar inverters or DISCO grid feedback spikes.",
    tag: "Zero-Crossfeed ATS",
  },
  {
    title: "Lifetime Support",
    desc: "Cloud telemetry health checks, automated battery degradation tracking, bi-annual thermal scans, and rapid 24-hr regional dispatch.",
    tag: "24/7 Telemetry Alerting",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Audit & Survey",
    desc: "24-hr electrical load profiling, roof pitch & structural truss checks, irradiance azimuth mapping, and earthing earth-resistance test (<5 Ohms).",
    timeline: "Day 1 · Field Survey",
  },
  {
    num: "02",
    title: "CAD Design",
    desc: "PVsyst solar simulation, MPPT string sizing, generator ATS wiring schematics, and stamped electrical engineering drawings.",
    timeline: "Day 2–3 · Engineering",
  },
  {
    num: "03",
    title: "Hardware Staging",
    desc: "Secure transport from Lagos/PH hubs in dedicated vehicles. Batteries pre-balanced and inverter firmware calibrated prior to delivery.",
    timeline: "Day 4 · Logistics Dispatch",
  },
  {
    num: "04",
    title: "Mounting & Wiring",
    desc: "Anodized aluminum roof rails, fire-retardant DC cabling in rigid trunking, Schneider DC isolation switches, and pure copper grounding mat.",
    timeline: "Day 5–6 · Site Execution",
  },
  {
    num: "05",
    title: "Testing & Handover",
    desc: "Phase-rotation confirmation, thermal imaging scan, IoT app synchronization, client emergency training, and NEMSA certificate pack.",
    timeline: "Day 7 · Commissioning",
  },
];

const SCOPE_INCLUDED = [
  {
    title: "Anodized Aluminum Mounting Rails",
    desc: "High-grade, coastal corrosion-resistant rails and stainless steel 304 hardware.",
  },
  {
    title: "Type-2 Lightning Surge Protection (SPD)",
    desc: "Dual protection arrays for DC solar string inputs and AC main utility feeds.",
  },
  {
    title: "Fire-Rated Solar DC Cabling",
    desc: "Halogen-free, double-insulated 6mm² or 10mm² copper cabling routed in rigid metal conduits.",
  },
  {
    title: "Schneider DC Isolation Breakers",
    desc: "Pre-assembled IP65 distribution enclosure with rapid DC disconnect switches.",
  },
  {
    title: "Pure Copper Earthing Rod & Bonding",
    desc: "Driven deep earth rod with bentonite treatment ensuring resistance under 5 Ohms.",
  },
  {
    title: "Client Handover & App Orientation",
    desc: "Complete schematic binder, emergency runbook, and real-time smartphone monitoring setup.",
  },
];

const SCOPE_EXCLUDED = [
  {
    title: "Major Structural Roof Repairs",
    desc: "Rectifying decayed structural timber rafters or replacing brittle asbestos tiles requires specialized civil carpentry.",
  },
  {
    title: "Civil Trenching Beyond 25 Meters",
    desc: "Deep underground cable trenching between inverter powerhouse, generator, and main DB beyond 25m is billed per linear meter.",
  },
  {
    title: "Premises Rewiring of Faulty Internal Circuits",
    desc: "Resolving legacy phase imbalances, neutral loops, or short-circuits in building wiring requires dedicated electrician prep.",
  },
  {
    title: "DISCO Bilateral Net-Metering Permits",
    desc: "Grid-tied export metering documentation and bilateral utility clearance require municipal DISCO administrative processing.",
  },
];

const FAQS = [
  {
    q: "How much does professional solar installation cost?",
    a: "Standard residential turnkey installation ranges from ₦120,000 to ₦280,000 depending on system kVA capacity, roof pitch, DC cable run distance, and earthing soil conditions. All quotes are confirmed upfront after your free site assessment with zero hidden charges (demo placeholder, pending Petfeb approval).",
  },
  {
    q: "How long does an installation typically take?",
    a: "Most residential rooftop installations (1kVA to 5kVA) are completed and commissioned within 24 to 48 hours once components arrive on site. Commercial arrays (10kVA to 30kVA+) typically require 3 to 5 business days for rigorous structural racking and distribution switchgear synchronization.",
  },
  {
    q: "Do Petfeb engineers install in all 36 states?",
    a: "Yes. With direct regional engineering hubs in Lagos, Abuja, and Port Harcourt, our mobile installation units deploy across all 36 states and the FCT with dedicated logistics vans and certified tools.",
  },
  {
    q: "What happens if my roof has leaks or timber decay?",
    a: "During our initial audit, engineers inspect timber truss deflection and roofing sheet integrity. If structural defects are identified, we document the required carpentry repairs upfront so your roof is reinforced before solar panels are secured.",
  },
  {
    q: "Can I pay for installation using the Buy Small installment plan?",
    a: "Yes. When purchasing equipment through Buy Small, your certified installation fee can be bundled directly into your downpayment and amortized across your weekly or monthly installments.",
  },
];

export default function InstallationPage() {
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
              <li>
                <span className="text-emerald-200/70">Services</span>
              </li>
              <li>/</li>
              <li className="text-white font-semibold">Installation Services</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/20">
                <Wrench className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>Petfeb Installation Services · NEMSA Certified Level-3 Engineers</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Installed right. <br />
                Built to last.
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                Certified solar engineers ensuring optimal performance, warranty protection, and complete safety for your home or business (all claims demo placeholders, pending Petfeb approval).
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#inspection-form"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm min-h-[48px]"
                >
                  <span>Book Site Inspection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#deployment-process"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
                >
                  <span>View 5-Step Process</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-emerald-200/80 border-t border-emerald-900/80">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>100% NEMSA Code Compliant Wiring</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Zero Fire Risk Deep Copper Grounding</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>25-Yr Workmanship Escrow Guaranteed (demo)</span>
                </span>
              </div>
            </div>

            {/* Right Photo Panel */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-800/80 shadow-2xl bg-gray-900 h-72 sm:h-84">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/installer"
                  alt="Full Fall-Arrest & High-Voltage DC Rig"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#7BB042] text-black">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Certified Level-3 Wireman
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold text-white block">
                    Full Fall-Arrest &amp; High-Voltage DC Rig
                  </span>
                  <span className="text-[11px] text-emerald-300">
                    📍 Lekki Phase 1 Commercial Installation, Lagos · 2024 · 60kVA Turnkey
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Why Certified Engineering Matters (4 Cards) ───────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            ENGINEERING STANDARD
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Why Certified Engineering Matters
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            In Nigeria&apos;s high-temperature, surge-prone environment, amateur solar wiring causes inverter blowouts, battery degradation, and fire hazards. Petfeb installations protect your capital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-4 shadow-sm flex flex-col justify-between hover:border-black transition-colors"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-base text-gray-900">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#3F6B1A] font-medium">
                <span>{p.tag}</span>
                <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. 5-Step Engineering Deployment Process (Green-50 Band) ─── */}
      <section id="deployment-process" className="bg-[#F4F9EC] py-14 border-y border-[#D9D9D9] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              Engineering Discipline
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
              5-Step Engineering Deployment Process
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Every Petfeb deployment follows strict international IEC standards from initial roof survey to cloud telemetry commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-5 flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-sm text-[#3F6B1A] bg-[#E8F3DA] px-2 py-0.5 rounded">
                      {s.num}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-gray-900">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100 text-[11px] font-semibold text-gray-500">
                  {s.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Standard Package Scope (Included vs Not Included) ─────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Standard Package Scope
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            No surprise electrical surcharges or hidden add-ons. Full transparency before our engineering truck rolls to your site.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Included Box */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-[#7BB042]" />
              <h3 className="font-heading font-bold text-base text-gray-900">
                Included in Turnkey Package
              </h3>
            </div>

            <div className="space-y-4">
              {SCOPE_INCLUDED.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">{item.title}</strong>
                    <span className="text-gray-600 leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Not Included Box */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <X className="w-5 h-5 text-gray-400" />
              <h3 className="font-heading font-bold text-base text-gray-900">
                Not Included / Custom Scope
              </h3>
            </div>

            <div className="space-y-4">
              {SCOPE_EXCLUDED.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <X className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-semibold">{item.title}</strong>
                    <span className="text-gray-600 leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-500">
              💡 Need civil or structural carpentry support? Our team inspects your roof during the initial survey and quotes custom scopes upfront.
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Site Survey Request Form (Centered Card per stitch frame) ─ */}
      <section id="inspection-form" className="max-w-[800px] mx-auto px-4 sm:px-8 scroll-mt-24">
        <InstallationForm />
      </section>

      {/* ── 6. NEMSA Guarantee Strip (Deep Green #1F3A0B) ─────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#7BB042] shrink-0" />
            <div>
              <span className="font-heading font-bold text-sm sm:text-base text-white block">
                NEMSA Code &amp; Workmanship Guarantee
              </span>
              <span className="text-xs text-emerald-200/80">
                All installations comply with Nigerian electrical safety standards and include guaranteed workmanship (demo placeholder).
              </span>
            </div>
          </div>

          <a
            href="tel:+234800738332"
            className="text-xs font-semibold text-[#7BB042] hover:underline shrink-0"
          >
            Urgent questions? 📞 +234 800 PETFEB SOLAR
          </a>
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions ────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Installation FAQs
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Clear guidelines on costs, timeframes, and state coverage across Nigeria.
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
    </div>
  );
}
