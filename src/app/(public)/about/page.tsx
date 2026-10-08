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
} from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "About Us | Petfeb Solar Systems",
  description:
    "Learn about Petfeb International Company Limited, our history since 2015, leadership, engineering standards, and mission to power Nigeria cleanly.",
};

const TIMELINE = [
  {
    year: "2015",
    title: "Foundation & Inception",
    description:
      "Pet-Feb was founded with a dedicated mission to make reliable, high-efficiency solar energy accessible to Nigerian households and businesses.",
  },
  {
    year: "2017",
    title: "First Large-Scale Installation",
    description:
      "Successfully commissioned our first major commercial hybrid solar installation, establishing our benchmark for clean wiring and precision sizing.",
  },
  {
    year: "2020",
    title: "Tri-City Regional Expansion",
    description:
      "Expanded direct technical operations and installation hubs across Lagos, Abuja, and Port Harcourt to service clients nationwide.",
  },
  {
    year: "2025",
    title: "Global Technology Partnerships",
    description:
      "Formed international manufacturing collaborations and completed technical capacity training on advanced hybrid inverters and lithium storage systems.",
  },
];

const LEADERSHIP = [
  {
    name: "Mrs. Petra Solomon",
    role: "Chief Executive Officer & Founder",
    bio: "Pioneering the Pet-Feb vision for accessible renewable energy, leading clean-energy transition dialogues and strategic partnerships across Nigeria.",
  },
  {
    name: "Mr. Steven F. Egwuatu",
    role: "Operations & Business Development Manager",
    bio: "Directing operational efficiency, system procurement standards, client engagement, and nationwide installation fulfillment.",
  },
  {
    name: "Mr. Jude Egbri",
    role: "Branch & Regional Manager (Abuja)",
    bio: "Overseeing Federal Capital Territory (FCT) and Northern regional installations, technical surveys, and client relationship management.",
  },
  {
    name: "Mr. Andrew Oghagbon",
    role: "Logistics & Supply Chain Manager",
    bio: "Managing quality assurance, secure freight logistics, and component distribution across our regional warehouses.",
  },
];

export default async function AboutPage() {
  const missionText = await getSiteContent(
    "about.mission",
    "To provide affordable, efficient, and sustainable solar power solutions that meet the energy needs of Nigerians today while safeguarding the environment for tomorrow."
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ── 1. Hero Header ────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-emerald-50/60 to-[#F8F9FA] pt-12 sm:pt-20 pb-14 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-[#3F6B1A] border border-emerald-200 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/logo" alt="Logo" className="w-5 h-5 object-contain" />
            <span>Pet-Feb International Company Limited</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-950 tracking-tight leading-tight mb-6">
            Building Your Visions, Creating Reality Through Clean Solar Energy
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Pet-Feb is a trusted solar energy company in Nigeria, dedicated to providing reliable and sustainable power solutions that reduce operational costs, safeguard the environment, and empower communities.
          </p>
        </div>
      </section>

      {/* ── 2. Vision & Mission Pillars ───────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="h-48 sm:h-56 w-full rounded-xl overflow-hidden relative border border-gray-100 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/vision"
                  alt="Petfeb Strategic Vision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/95 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/20">
                  Clean Energy for Africa
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
                    Strategic Direction
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-gray-900">
                    Our Vision
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                To lead Nigeria&apos;s transition into clean, renewable energy by delivering reliable and innovative solar solutions, empowering households and enterprises to thrive through affordable, uninterrupted power.
              </p>
            </div>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Become Nigeria&apos;s most trusted provider of solar energy solutions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Drive widespread adoption of renewable energy across Africa.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Build sustainable communities powered by resilient clean energy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Inspire innovation in durable, eco-friendly energy technologies.</span>
              </li>
            </ul>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="h-48 sm:h-56 w-full rounded-xl overflow-hidden relative border border-gray-100 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/mission"
                  alt="Petfeb Core Mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/95 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/20">
                  Reliable Power & Local Empowerment
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
                    Our Purpose
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-gray-900">
                    Our Mission
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {missionText}
              </p>
            </div>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Deliver world-class solar products and installations across Nigeria.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Train and empower individuals with technical solar energy skills.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Promote recycling and eco-friendly standards in the solar industry.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>Provide customer-focused services grounded in technical integrity.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Our Journey & Story Timeline ───────────────────── */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
              Company Milestones
            </span>
            <h2 className="font-heading font-bold text-3xl text-gray-900 mt-1">
              Our Growth Journey in Nigeria
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Since our founding in 2015, Pet-Feb has been at the forefront of Nigeria&apos;s renewable energy revolution, expanding from initial residential setups to multi-city commercial installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#7BB042]" />
                    <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-gray-900">
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

      {/* ── 4. Global Partnerships, Local Impact ──────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-gradient-to-br from-emerald-950 to-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200 border border-white/20">
                <Globe2 className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>International Technology Collaboration</span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Global Partnerships, Local Engineering Impact
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
                At Pet-Feb, we believe sustainable energy excellence requires active collaboration with global tier-1 manufacturers. Our engineers and leadership participate in international technical exchange and training programs, touring manufacturing facilities and mastering the latest in hybrid inverter topology and lithium iron phosphate (LiFePO4) storage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800/80 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="font-bold text-white block">Certified Equipment</span>
                  <span className="text-emerald-200/70">Authentic tier-1 panels, pure sine inverters, and battery banks.</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white block">Technical Transfer</span>
                  <span className="text-emerald-200/70">Engineers trained on international manufacturing and safety standards.</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white block">Tailored for Nigeria</span>
                  <span className="text-emerald-200/70">Components customized for local ambient temperatures and voltage swings.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-700/60 shadow-2xl bg-black/40 h-72 sm:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/commercial"
                  alt="30kVA Industrial Inverter & Battery Storage"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B82E] block">
                    Certified Installation Standard
                  </span>
                  <p className="text-xs text-white/95 font-medium mt-0.5">
                    30kVA Inverter • 60kWh Battery Backup • 27kW PV Arrays
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Executive Leadership ───────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Organizational Structure
          </span>
          <h2 className="font-heading font-bold text-3xl text-gray-900 mt-1">
            Pet-Feb Leadership Team
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Led by seasoned renewable energy professionals, operational strategists, and field-tested installation engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP.map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center font-heading font-bold text-lg mb-3">
                  {member.name.split(" ")[1]?.[0] || "P"}
                </div>
                <h3 className="font-heading font-bold text-base text-gray-900">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold text-[#3F6B1A] block">
                  {member.role}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Bottom Call to Action ──────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Partner With Pet-Feb on Your Renewable Energy Journey
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Connect with our engineering desk in Lagos, Abuja, or Port Harcourt for a tailored solar proposal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
            >
              Contact Our Engineers
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
            >
              View Installation Archive
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
