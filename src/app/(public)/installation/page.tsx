import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  Check,
  X,
  MapPin,
  ChevronDown,
  Cpu,
  Award,
} from "lucide-react";
import { InstallationForm } from "@/components/public/InstallationForm";
import {
  ParallaxLayer,
  ScrollReveal,
  ScrollScale,
  StaggerChildren,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Request an Installer | Petfeb Solar Engineering",
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
    <div className="bg-[#FBF9F8] pb-20 overflow-x-clip font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-6 sm:pt-10 space-y-12 sm:space-y-16">
        {/* ── 1. HERO SECTION (Matching Petfeb Page Header Rhythm) ────────── */}
        <section className="space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-[#5C5C5C]">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-black transition">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="text-[#5C5C5C]">Services</span>
              </li>
              <li>/</li>
              <li className="text-black font-semibold">Request Installer</li>
            </ol>
          </nav>

          {/* Header Row: 30px Yellow Dot + Bold Space Grotesk Title + Right Copy */}
          <ScrollReveal direction="up" duration={0.7}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4 sm:pb-8">
              <div className="flex items-center gap-[16px] max-w-[780px]">
                <span
                  className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0"
                  aria-hidden="true"
                />
                <h1 className="font-heading font-bold text-[34px] sm:text-[44px] lg:text-[48px] uppercase tracking-[2px] leading-[1.1]">
                  <span className="text-black block">Installed right.</span>
                  <span className="text-[#70A03C] block">Built to last.</span>
                </h1>
              </div>

              <div className="max-w-[540px]">
                <p className="font-sans font-normal text-[15px] sm:text-[17px] text-[#333] leading-[1.6] uppercase">
                  Certified solar engineers ensuring optimal performance, warranty protection, and complete safety for your home or business across all 36 states in Nigeria.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Showcase Banner (rounded-[32px]) */}
          <ScrollScale from={0.95} rise={28}>
            <div className="relative h-[480px] sm:h-[560px] lg:h-[660px] w-full rounded-[32px] overflow-hidden shadow-lg bg-black">
              <ParallaxLayer
                travel={18}
                scaleFrom={1.05}
                className="absolute -inset-x-0 -top-5 -bottom-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/installer"
                  alt="Petfeb Certified Level-3 Solar Installation Engineer"
                  className="w-full h-full object-cover"
                />
              </ParallaxLayer>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />

              {/* Top Floating Badge Row */}
              <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-bold bg-[#7BB042] text-white shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>NEMSA Certified Level-3 Engineers</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/65 text-white backdrop-blur-md border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B82E]" />
                  <span>Lekki Phase 1 Commercial Installation · 60kVA Turnkey</span>
                </span>
              </div>

              {/* Bottom Floating Content Container */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 flex flex-col gap-8 max-w-[1280px]">
                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#inspection-form"
                    className="bg-[#7BB042] text-white font-heading font-bold text-[15px] sm:text-[17px] px-6 sm:px-7 py-4 rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-2.5"
                  >
                    <span>Book Site Inspection</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>

                  <a
                    href="#deployment-process"
                    className="border border-white/60 text-white font-heading font-semibold text-[15px] sm:text-[17px] px-6 py-4 rounded-[16px] hover:bg-white/10 transition backdrop-blur-sm inline-flex items-center gap-2"
                  >
                    <span>View 5-Step Process</span>
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </div>

                {/* 4 Stat Items Row with Divider */}
                <div className="border-t border-white/15 pt-6 sm:pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="font-heading font-bold text-[28px] sm:text-[36px] text-[#BAF47C] leading-tight tracking-[-1px]">
                      100%
                    </div>
                    <div className="font-heading font-semibold text-[13px] sm:text-[14px] text-white">
                      NEMSA Code Compliant
                    </div>
                    <div className="font-sans text-[12px] text-white/60">
                      IEC &amp; Nigerian safety standards
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-bold text-[28px] sm:text-[36px] text-white leading-tight tracking-[-1px]">
                      24h
                    </div>
                    <div className="font-heading font-semibold text-[13px] sm:text-[14px] text-white">
                      Site Survey Dispatch
                    </div>
                    <div className="font-sans text-[12px] text-white/60">
                      Lagos, Abuja &amp; PH engineering hubs
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-bold text-[28px] sm:text-[36px] text-[#BAF47C] leading-tight tracking-[-1px]">
                      &lt;5Ω
                    </div>
                    <div className="font-heading font-semibold text-[13px] sm:text-[14px] text-white">
                      Deep Copper Grounding
                    </div>
                    <div className="font-sans text-[12px] text-white/60">
                      Zero fire &amp; lightning surge protection
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-bold text-[28px] sm:text-[36px] text-white leading-tight tracking-[-1px]">
                      36 States
                    </div>
                    <div className="font-heading font-semibold text-[13px] sm:text-[14px] text-white">
                      Nationwide Coverage
                    </div>
                    <div className="font-sans text-[12px] text-white/60">
                      Mobile field deployment units
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 2. WHY CERTIFIED ENGINEERING MATTERS (Black Container) ──────── */}
        <ScrollScale from={0.95} rise={32}>
          <section className="bg-black text-white rounded-[32px] py-12 sm:py-16 px-6 sm:px-10 lg:px-[45px] shadow-md space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#7BB042] block">
                  ENGINEERING STANDARD
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                    Why Certified Engineering Matters
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  In Nigeria&apos;s high-temperature, surge-prone environment, amateur solar wiring causes inverter blowouts, battery degradation, and fire hazards. Petfeb installations protect your capital.
                </p>
              </div>

              <a
                href="#inspection-form"
                className="self-start lg:self-auto px-5 py-3 rounded-[12px] bg-[#7BB042] text-white hover:bg-[#6aa035] font-heading font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition shrink-0"
              >
                <span>Schedule Load Audit</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILLARS.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white text-gray-900 rounded-[20px] border border-[#D9D9D9] p-6 space-y-4 shadow-sm flex flex-col justify-between min-h-[260px] hover:border-[#7BB042] transition-all duration-300 hover-lift"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[12px] bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#7BB042]" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-950">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#3F6B1A] font-heading font-bold">
                    <span>{p.tag}</span>
                    <Check className="w-4 h-4 text-[#7BB042]" />
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </section>
        </ScrollScale>

        {/* ── 3. 5-STEP ENGINEERING DEPLOYMENT PROCESS (Yellow Container) ─── */}
        <ScrollScale from={0.95} rise={32}>
          <section
            id="deployment-process"
            className="bg-[#F5B82E] text-black rounded-[32px] py-12 sm:py-16 px-6 sm:px-10 lg:px-[45px] shadow-sm scroll-mt-24 space-y-10"
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#344A1C] block">
                ENGINEERING DISCIPLINE
              </span>
              <div className="inline-flex items-center justify-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full bg-black shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight">
                  5-Step Engineering Deployment Process
                </h2>
              </div>
              <p className="text-sm sm:text-base text-black/85 leading-relaxed">
                Every Petfeb deployment follows strict international IEC standards from initial roof survey to cloud telemetry commissioning.
              </p>
            </div>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {STEPS.map((s) => (
                <div
                  key={s.num}
                  className="bg-black text-white rounded-[20px] border border-black/10 p-6 flex flex-col justify-between min-h-[295px] shadow-sm hover-lift"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-[44px] h-[44px] rounded-[12px] bg-[#FEF8EA] border border-[#EBEBEB] flex items-center justify-center font-heading font-bold text-[15px] text-[#F5B82E]">
                        {s.num}
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white pt-1">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E8E8E8] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-white/15 flex items-center gap-2 text-xs font-heading font-semibold text-[#D6E7C4]">
                    <Cpu className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>{s.timeline}</span>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </section>
        </ScrollScale>

        {/* ── 4. STANDARD PACKAGE SCOPE (Soft Green Container) ───────────── */}
        <ScrollScale from={0.95} rise={32}>
          <section className="bg-[#D6E7C4] text-gray-950 rounded-[32px] py-12 sm:py-16 px-6 sm:px-10 lg:px-[45px] shadow-sm space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3F6B1A] block">
                TRANSPARENT BILL OF MATERIALS
              </span>
              <div className="inline-flex items-center justify-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full bg-black shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight">
                  Standard Package Scope
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                No surprise electrical surcharges or hidden add-ons. Full transparency before our engineering truck rolls to your site.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Included Box (White Card) */}
              <div className="bg-white rounded-[24px] border border-[#D9D9D9] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#7BB042] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950">
                      Included in Turnkey Package
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold bg-[#E8F3DA] text-[#3F6B1A]">
                    Standard
                  </span>
                </div>

                <div className="space-y-4">
                  {SCOPE_INCLUDED.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-1" />
                      <div>
                        <strong className="text-gray-950 block font-heading font-bold">
                          {item.title}
                        </strong>
                        <span className="text-gray-600 leading-relaxed">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not Included Box (Black Card) */}
              <div className="bg-black text-white rounded-[24px] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/10 text-[#F5B82E] flex items-center justify-center shrink-0">
                        <X className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                        Not Included / Custom Scope
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold bg-white/10 text-[#F5B82E]">
                      Quoted Separately
                    </span>
                  </div>

                  <div className="space-y-4">
                    {SCOPE_EXCLUDED.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                        <X className="w-4 h-4 text-[#F5B82E] shrink-0 mt-1" />
                        <div>
                          <strong className="text-white block font-heading font-bold">
                            {item.title}
                          </strong>
                          <span className="text-gray-300 leading-relaxed">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-[16px] bg-[#F5B82E] text-black text-xs sm:text-sm font-medium leading-relaxed">
                  <strong className="font-heading font-bold block mb-0.5">
                    Need Civil or Structural Carpentry Support?
                  </strong>
                  Our engineers inspect your roof rafters during the initial site survey and quote any custom civil works upfront before deployment.
                </div>
              </div>
            </div>
          </section>
        </ScrollScale>

        {/* ── 5. SITE SURVEY REQUEST FORM + GUARANTEE SIDEBAR (Black Container) ── */}
        <ScrollScale from={0.95} rise={32}>
          <section
            id="inspection-form"
            className="bg-black text-white rounded-[32px] py-12 sm:py-16 px-6 sm:px-10 lg:px-[45px] shadow-md scroll-mt-24 space-y-10"
          >
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#7BB042] block">
                ON-SITE ENGINEERING ASSESSMENT
              </span>
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  Book Your Certified Site Survey
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Complete the dispatch request below. A COREN/NEMSA-verified field engineer from our nearest regional hub will contact you to schedule your load audit.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Interactive Request Form */}
              <div className="lg:col-span-7">
                <InstallationForm />
              </div>

              {/* Right 5 Columns: NEMSA Guarantee Card + Direct Dispatch Desk */}
              <div className="lg:col-span-5 space-y-6">
                {/* Yellow Guarantee Card */}
                <div className="bg-[#F5B82E] text-black rounded-[24px] p-6 sm:p-8 space-y-5 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-[12px] bg-black text-[#F5B82E] flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-black/75 block">
                        Certified Protection
                      </span>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-black">
                        NEMSA Code &amp; Workmanship Guarantee
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-black/85 leading-relaxed">
                    All Petfeb installations comply with Nigerian electrical safety standards and include full workmanship protection alongside manufacturer hardware warranties.
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-black pt-1">
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-black text-[#7BB042] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span>Zero-Crossfeed Automatic Transfer Switch (ATS)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-black text-[#7BB042] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span>Infrared Thermal Load Scan at Handover</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-black text-[#7BB042] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span>Stamped Electrical Engineering As-Built Pack</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-black text-[#7BB042] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span>Buy Small Installment Bundling Available</span>
                    </li>
                  </ul>
                </div>

                {/* Dark Direct Dispatch Desk Card */}
                <div className="bg-[#141414] border border-white/15 text-white rounded-[24px] p-6 sm:p-8 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#7BB042]">
                      Direct Engineering Dispatch
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white">
                      Need Urgent Commercial Sizing?
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Speak directly with our senior electrical engineers in Lagos, Abuja, or Port Harcourt.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <a
                      href="tel:+2348135854054"
                      className="w-full py-3.5 px-5 rounded-[12px] bg-white text-black hover:bg-gray-100 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                    >
                      <PhoneCall className="w-4 h-4 text-[#7BB042]" />
                      <span>Call +234 813-585-4054</span>
                    </a>

                    <a
                      href="https://wa.me/2348135854054"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-5 rounded-[12px] bg-[#7BB042] text-white hover:bg-[#6aa035] font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span>Chat with Engineering on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollScale>

        {/* ── 6. INSTALLATION FAQS (Yellow Container matching Buy Small FAQs) ─ */}
        <ScrollScale from={0.95} rise={32}>
          <section className="bg-[#F5B82E] text-black rounded-[32px] py-12 sm:py-16 px-6 sm:px-12 lg:px-[140px] shadow-sm space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full bg-black flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#7BB042]" strokeWidth={3} />
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight">
                  Installation FAQs
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#1C1C1C] max-w-2xl mx-auto leading-relaxed">
                Clear guidelines on turnkey installation costs, timeframes, and state coverage across Nigeria.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-[#FBF9F8] open:bg-black open:text-white text-[#1B1C1C] rounded-[16px] border border-[#D9D9D9] open:border-[#7BB042] p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all shadow-2xs"
                >
                  <summary className="flex items-center justify-between font-heading font-bold text-sm sm:text-lg list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:text-[#7BB042] transition-transform group-open:rotate-180 shrink-0 ml-4" />
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 group-open:text-[#E8E8E8] leading-relaxed pt-3 border-t border-gray-200 group-open:border-white/20 mt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </ScrollScale>
      </div>
    </div>
  );
}
