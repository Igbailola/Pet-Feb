import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Globe2,
  Sparkles,
  Zap,
  Building2,
  Check,
  CreditCard,
  GraduationCap,
  Wrench,
  MapPin,
  Lock,
} from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "About Us | Petfeb Solar Engineering",
  description:
    "Learn about Petfeb International Company Limited, our history, engineering leadership, quality standards, and mission to power Nigeria sustainably.",
};

const STATS = [
  {
    value: "4.8",
    unit: "MWp",
    label: "Installed Capacity",
    footnote: "(demo placeholders, pending Petfeb approval)",
  },
  {
    value: "12,400+",
    unit: "",
    label: "Homes & SMEs Powered",
    footnote: "(demo placeholders, pending Petfeb approval)",
  },
  {
    value: "6,000+",
    unit: "",
    label: "Technicians Trained",
    footnote: "(demo placeholders, pending Petfeb approval)",
  },
  {
    value: "36 States",
    unit: "",
    label: "Operational Reach",
    footnote: "(demo placeholders, pending Petfeb approval)",
  },
];

const THREE_PILLARS = [
  {
    number: "01",
    tag: "Hardware Standards",
    title: "Quality Hardware",
    description:
      "Direct OEM partnerships with tier-1 manufacturers. Every batch is bench-tested in Nigeria's ambient heat and harmonic surge conditions. We insist on IP65 outdoor DC enclosures and pure sine wave hybrid inverters.",
    footerNote: "Up to 10-Year Manufacturer Warranties (demo placeholder)",
    icon: Zap,
  },
  {
    number: "02",
    tag: "Accessible Finance",
    title: "Buy Small Scheme",
    description:
      "Making solar ownership attainable without crushing upfront capital requirements. We structure 3 to 12 month installment plans backed by automated direct debits and bank-grade Paystack escrow protection for peace of mind.",
    footerNote: "Flexible Micro-Amortization",
    icon: CreditCard,
  },
  {
    number: "03",
    tag: "Workforce Growth",
    title: "Human Capacity",
    description:
      "Training the next generation of renewable energy engineers and certified installers through the Petfeb Solar Training Academy. Our curriculum bridges NEMSA grid-code alignment with field diagnostics.",
    footerNote: "6,000+ Accreditations Awarded (demo placeholder)",
    icon: GraduationCap,
  },
];

const TIMELINE = [
  {
    year: "2020",
    tag: "Rural Focus",
    title: "Foundation & First Off-Grid",
    description:
      "Initial deployment of rural health post solar systems and telecom tower backup packs across Ogun and Oyo states.",
    isCurrent: false,
  },
  {
    year: "2021",
    tag: "Supply Chain",
    title: "Hardware Sourcing Hub",
    description:
      "Established direct OEM supply agreements and inaugurated the central Lagos warehousing depot for rapid dispatch.",
    isCurrent: false,
  },
  {
    year: "2022",
    tag: "Capacity Building",
    title: "Solar Training Academy",
    description:
      "Launched full hands-on vocational curriculum aligned with NEMSA guidelines at our technical facility.",
    isCurrent: false,
  },
  {
    year: "2023",
    tag: "Tech Exchange",
    title: "Technical OEM Exchange",
    description:
      "Bilateral engineering visits with inverter specialists to customize surge protection for Nigerian voltage flux.",
    isCurrent: false,
  },
  {
    year: "2025",
    tag: "Fintech & IoT",
    title: "Buy Small & Smart Telemetry",
    description:
      "Rollout of structured installment micro-financing alongside cloud IoT remote telemetry for client array uptime monitoring.",
    isCurrent: true,
  },
];

const LEADERSHIP = [
  {
    name: "Engr. Babatunde Adeleke",
    role: "Managing Director & Founder",
    bio: "Ex-PHCN electrical distribution systems lead with 18+ years supervising commercial-scale grid stabilization and industrial solar design.",
    tag: "FNSE · COREN Reg.",
  },
  {
    name: "Dr. Amina Bello",
    role: "Chief Technical Officer",
    bio: "PhD in High-Voltage Electrical Systems. Specialized in LiFePO4 battery management firmware, load analysis, and mini-grid synchronism.",
    tag: "IEEE Senior Member",
  },
  {
    name: "Engr. Chukwuma Obi",
    role: "Lead Solar Installation Engineer",
    bio: "NEMSA Master Certifier having managed over 100+ turnkey commercial rooftop installations, racking safety, and lightning protection.",
    tag: "NEMSA Inspector #410",
  },
  {
    name: "Folashade Alabi",
    role: "Head of Solar Training Academy",
    bio: "Renewable workforce educator who spearheaded curriculum delivery for over 6,000 certified technicians across southwest Nigeria.",
    tag: "TVET Consultant",
  },
];

const PARTNER_CARDS = [
  {
    name: "NEMSA Standards",
    desc: "Nigerian Electricity Reg.",
    icon: ShieldCheck,
  },
  {
    name: "Tier-1 OEM Silicon",
    desc: "Bloomberg Listed Cells",
    icon: Zap,
  },
  {
    name: "BOI Clean Energy",
    desc: "Infrastructure Support",
    icon: Building2,
  },
  {
    name: "Paystack Escrow",
    desc: "256-Bit SSL Amortization",
    icon: Lock,
  },
  {
    name: "SONCAP Certified",
    desc: "Standards Org. Nigeria",
    icon: Award,
  },
];

export default async function AboutPage() {
  const missionText = await getSiteContent(
    "about.mission",
    "To deliver robust solar hardware, flexible financing through Buy Small, and workforce development to power our nation sustainably."
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ── 1. Hero Header Band (Green-50 with photo panel and stats) ─── */}
      <section className="bg-[#F4F9EC] border-b border-[#D9D9D9] pt-8 sm:pt-12 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle sun-arc motif in top right */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full pointer-events-none opacity-20 border-[32px] border-[#7BB042]"
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10 space-y-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-gray-900 transition">
                  Home
                </Link>
              </li>
              <li>&gt;</li>
              <li>
                <span className="text-gray-500">Company</span>
              </li>
              <li>&gt;</li>
              <li className="text-gray-900 font-semibold">About Us</li>
            </ol>
          </nav>

          {/* Hero Two Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#D9D9D9] text-[#3F6B1A]">
                <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
                <span>About Petfeb · Clean Energy Infrastructure</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
                Empowering Nigeria with sustainable, accessible solar energy.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Petfeb is dedicated to solving power challenges for homes, businesses, and communities through quality products, innovative financing, and hands-on technical training.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#D9D9D9]">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>NEMSA Certified Tier-1 Deployments</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#D9D9D9]">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>SONCAP Verified Inverters</span>
                </span>
              </div>
            </div>

            {/* Right Photo Panel */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#D9D9D9] shadow-md bg-gray-900 h-72 sm:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/commercial"
                  alt="Petfeb Technical Hub & Operations Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>Lagos Technical Hub & Operations Team · 2024</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#7BB042] text-black">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Stat Strip Box per stitch frame */}
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 shadow-sm">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900">
                  {stat.value}{" "}
                  {stat.unit && (
                    <span className="text-xl sm:text-2xl text-[#3F6B1A] font-bold">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-900">{stat.label}</p>
                <p className="text-[11px] text-gray-400">{stat.footnote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Vision & Mission Cards (Side-by-Side per stitch frame) ─── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Vision (Deep Green #1F3A0B) */}
          <div className="bg-[#1F3A0B] text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm border border-emerald-950">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#7BB042] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042]">
                  OUR VISION
                </span>
                <h2 className="font-heading font-bold text-2xl text-white mt-1 leading-snug">
                  A Nigeria where clean, reliable power is accessible to every home and enterprise.
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                We envision an interconnected economy unshackled from volatile diesel prices, erratic grid supply, and the perpetual hum of generators. By standardizing high-end engineering and decentralized storage, we build energy self-reliance across all six geopolitical zones.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-900 flex items-center justify-between text-xs text-emerald-300/80">
              <span>Decentralized Resilience</span>
              <span className="font-medium text-white">Target: 25MW by 2028 (demo placeholder)</span>
            </div>
          </div>

          {/* Right Card: Mission (White with checkmarks) */}
          <div className="bg-white text-gray-900 rounded-2xl p-8 sm:p-10 border border-[#D9D9D9] flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                  OUR MISSION
                </span>
                <h2 className="font-heading font-bold text-2xl text-gray-900 mt-1 leading-snug">
                  {missionText}
                </h2>
              </div>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Tier-1 Component Integrity:</strong> Certified hybrid inverters & Grade-A LiFePO4 batteries configured for tropical heat dissipation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Transparent Flexible Credit:</strong> De-risking adoption via structured 3–12 month installment contracts via Buy Small.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">NEMSA-Standard Field Rigor:</strong> Zero-compromise earthing, lightning arrestors, and surge suppression on every install.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Operational Rigor</span>
              <span className="font-medium text-gray-700">SONCAP Approved (demo placeholder)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. The Three Pillars of Petfeb Engineering ────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            INSTITUTIONAL ARCHITECTURE
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            The Three Pillars of Petfeb Engineering
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            An integrated framework tackling equipment fragility, capital friction, and installation failure rates in Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-sm hover:border-black transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-xs text-gray-400">
                      {pillar.number}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-gray-900">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#3F6B1A]">
                  <Icon className="w-4 h-4 text-[#7BB042]" />
                  <span>{pillar.footerNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Chronology / Our Journey: Engineering the Transition ──── */}
      <section className="bg-white py-14 border-y border-[#D9D9D9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                CHRONOLOGY
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
                Our Journey: Engineering the Transition
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              (demo placeholders, pending Petfeb approval)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 relative ${
                  item.isCurrent
                    ? "bg-[#F4F9EC] border-[#7BB042]"
                    : "bg-[#F8F9FA] border-[#D9D9D9]"
                }`}
              >
                {item.isCurrent && (
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded text-[10px] font-bold bg-[#7BB042] text-black">
                    CURRENT
                  </span>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-xl text-gray-900">
                      {item.year}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Engineering Leadership ─────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              TECHNICAL DIRECTORS & FACULTY
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mt-1">
              Engineering Leadership
            </h2>
          </div>
          <span className="text-xs text-gray-400">
            (Team profiles are demo placeholders, pending Petfeb approval)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-[#D9D9D9] p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-black transition-colors"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-heading font-extrabold text-base">
                  {member.name.split(" ")[1]?.[0] || "P"}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-gray-900">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#3F6B1A] block">
                    {member.role}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-[11px] font-mono text-gray-400 block">
                  {member.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Trusted Partners & Hardware Collaborators ─────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            COLLABORATION NETWORK
          </span>
          <h2 className="font-heading font-bold text-xl text-gray-900">
            Trusted Partners & Hardware Collaborators
          </h2>
          <p className="text-xs text-gray-500">
            Aligned with regulatory bodies, tier-1 suppliers, and escrow partners.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PARTNER_CARDS.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-[#D9D9D9] text-center space-y-2 flex flex-col items-center justify-center shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700">
                  <Icon className="w-4 h-4 text-[#7BB042]" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs text-gray-900 block">
                    {partner.name}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {partner.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Bottom CTA Band (Warm Card per stitch frame) ──────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#FDF0CC] rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#F5B82E]/40">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A5A00]">
              RELIABLE TRANSITION
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              Join our clean energy mission.
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Whether you need a reliable solar installation for your home, commercial mini-grid engineering, or technical training at the Academy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-black text-white hover:bg-gray-800 transition shadow-sm"
            >
              Explore Solar Products
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-white text-black hover:bg-gray-50 transition border border-[#D9D9D9]"
            >
              Partner With Us
            </Link>
          </div>

          <p className="text-[11px] text-gray-400">
            (demo placeholders, pending Petfeb approval)
          </p>
        </div>
      </section>
    </div>
  );
}
