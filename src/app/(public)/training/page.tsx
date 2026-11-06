import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Zap,
  MapPin,
  Cpu,
  Layers,
  ChevronDown,
  ExternalLink,
  Users,
  Award,
  Sparkles,
  Check,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solar Training & Academy | Pet-Feb Solar Engineering",
  description:
    "Hands-on, NEMSA-aligned training in solar installation, inverter synchronization, and commercial system design across Nigeria.",
};

const PROGRAMS = [
  {
    id: "fundamentals",
    level: "Entry Level · 4 Weeks",
    mode: "In-Person Practical Lab",
    title: "Solar Installation Fundamentals",
    description:
      "Comprehensive baseline covering electrical safety protocols, PV module series/parallel wiring, battery bank interconnects, and rooftop racking mechanical stability.",
    intakeStatus: "Rolling Cohort Enrolment",
    tuition: "Available on Enquiry",
    tuitionNote: "Course fee, schedule and syllabus provided upon registration.",
    seatsNote: "Limited Cohort Capacity",
    tag: "Hands-on Practical Lab",
    slug: "fundamentals",
  },
  {
    id: "commercial-design",
    level: "Intermediate · 6 Weeks",
    mode: "Hybrid + Field CAD Lab",
    title: "Commercial System Design & Sizing",
    description:
      "Engineering calculations, load profiler telemetry, PV array yield simulations, and sub-distribution panel breaker coordination for commercial facilities.",
    intakeStatus: "Quarterly Intake",
    tuition: "Available on Enquiry",
    tuitionNote: "Includes software lab materials and CAD simulation exercises.",
    seatsNote: "Selective Enrolment",
    tag: "Design & Sizing Lab",
    slug: "commercial-design",
  },
  {
    id: "inverter-diagnostics",
    level: "Advanced · 3 Weeks",
    mode: "Hardware Diagnostic Lab",
    title: "Inverter Maintenance & Diagnostic Troubleshooting",
    description:
      "Component-level diagnostics, pure sine wave harmonic analysis, MOSFET/IGBT inspection, transfer switch calibration, and firmware updates.",
    intakeStatus: "Quarterly Intake",
    tuition: "Available on Enquiry",
    tuitionNote: "Practical bench testing on hybrid and off-grid inverters.",
    seatsNote: "Technician Prerequisite",
    tag: "Oscilloscope & Diagnostic Lab",
    slug: "inverter-diagnostics",
  },
  {
    id: "microgrid-engineering",
    level: "Professional · 8 Weeks",
    mode: "Field Practicum",
    title: "Mini-Grid & Commercial Solar Engineering",
    description:
      "Three-phase synchronization, high-voltage battery storage containers, automatic load shedding controllers, and rural mini-grid distribution safety.",
    intakeStatus: "Scheduled Cohorts",
    tuition: "Available on Enquiry",
    tuitionNote: "Includes field site survey and mini-grid practicum.",
    seatsNote: "Engineering Degree / Diploma",
    tag: "Mini-Grid Field Practicum",
    slug: "microgrid-engineering",
  },
];

const COMPETENCIES = [
  {
    title: "DC String Sizing & MPPT Voltage Matching",
    description:
      "Calculate temperature-adjusted Open Circuit Voltage (Voc), avoid inverter clipping, and balance dual-tracker MPPT inputs under Nigerian thermal variations.",
    icon: Zap,
  },
  {
    title: "LiFePO4 BMS Protocol Integration",
    description:
      "CAN bus and RS485 communication protocols between lithium battery management systems and hybrid inverters (Deye, Victron, Growatt architectures).",
    icon: Cpu,
  },
  {
    title: "Earthing & Surge Suppression (NEMSA)",
    description:
      "Copper earth mat installations, soil resistivity chemical treatment, Type 2 DC/AC Surge Protective Devices (SPD), and lightning rod air-terminals.",
    icon: ShieldCheck,
  },
  {
    title: "3-Phase Generator ATS Synchronization",
    description:
      "Dry contact automatic generator starting (2-wire remote start), phase-angle interlocking, zero back-feed diodes, and grid priority logic programming.",
    icon: Layers,
  },
  {
    title: "Commercial Roof Mounting & Tilt Safety",
    description:
      "Structural truss load integrity calculations, trapezoidal metal sheet clamps, tile roof brackets, and dual-lanyard fall protection anchor lines.",
    icon: Wrench,
  },
  {
    title: "Remote IoT Telemetry & Handover",
    description:
      "4G/WiFi cloud monitoring bridge setup, CT clamp calibration, client handover training, and warranty documentation sign-off protocols.",
    icon: ExternalLink,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Apply Online",
    desc: "Submit your details & select your preferred training cohort.",
  },
  {
    number: "02",
    title: "Consultation",
    desc: "Speak with our academy team to confirm prerequisites & schedule.",
  },
  {
    number: "03",
    title: "Hands-on Lab",
    desc: "Engage in intensive practical wiring, testing, and system sizing.",
  },
  {
    number: "04",
    title: "Field Deployment",
    desc: "Shadow certified engineers on live residential and commercial sites.",
  },
  {
    number: "05",
    title: "Assessment",
    desc: "Demonstrate technical competency on diagnostic checklists.",
  },
  {
    number: "06",
    title: "Certification",
    desc: "Graduate with Pet-Feb Solar Academy Certificate of Completion.",
  },
];

const WORKSHOP_PHOTOS = [
  {
    title: "Practical Wiring & Inverter Lab",
    img: "/api/websitepic/training",
  },
  {
    title: "Commercial Solar Array Installation",
    img: "/api/websitepic/commercial",
  },
  {
    title: "Battery Storage & BMS Integration",
    img: "/api/websitepic/battery",
  },
  {
    title: "Community Street Lighting Practicum",
    img: "/api/websitepic/community",
  },
];

const FAQS = [
  {
    q: "Who can apply for the Pet-Feb training programmes?",
    a: "We welcome aspiring solar technicians, electrical engineers, technicians, and career switchers who want to build verifiable skills in clean energy. While the Entry Level Fundamentals course requires no prior electrical background, intermediate and advanced courses require foundational knowledge of electrical safety principles.",
  },
  {
    q: "How are tuition and course materials arranged?",
    a: "Tuition details, syllabus overviews, and payment options are provided when you submit an enquiry for your preferred cohort. We keep fees accessible and provide full lab safety gear and workshop handbooks for all registered participants.",
  },
  {
    q: "What certificate is awarded upon completion?",
    a: "Participants who complete all required lecture modules, practical lab checklists, and safety assessments are awarded the Pet-Feb Solar Academy Certificate of Completion, validating their hands-on competence in solar hardware installation and troubleshooting.",
  },
  {
    q: "Does Pet-Feb offer post-training field opportunities?",
    a: "Yes. Qualified graduates are invited to join Pet-Feb's technician registry for field installation opportunities and sub-contracting work on residential, commercial, and community projects across Nigeria.",
  },
];

export default function TrainingPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 font-sans">
      {/* ── 1. Hero Header Band (Deep Dark Green #1F3A0B) ── */}
      <section className="bg-[#1F3A0B] text-white pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-emerald-950 relative overflow-hidden">
        {/* Subtle sun-arc motif in top-right */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full pointer-events-none opacity-10 border-[32px] border-[#7BB042]"
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-emerald-200/70">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold">Training</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7BB042]/20 border border-[#7BB042]/40 text-[#7BB042] text-xs font-heading font-semibold tracking-wide uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Pet-Feb Solar Engineering Academy</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
                Equipping Nigeria&apos;s Next Generation of Clean Energy Leaders.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
                Master the practical engineering of modern hybrid solar systems, LiFePO4 battery communication protocols, and high-voltage grid safety through hands-on lab sessions and real field deployments.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact?service=training"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm min-h-[48px]"
                >
                  <span>Enquire for Next Cohort</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
                >
                  <span>Browse Programmes</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-200/90 border-t border-emerald-900/80">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>100% Practical hands-on lab</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>NEMSA-aligned electrical safety</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Field deployment shadowing</span>
                </span>
              </div>
            </div>

            {/* Right Photo Panel */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-800/80 shadow-2xl bg-gray-900 h-72 sm:h-84">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/training"
                  alt="Pet-Feb Practical Solar Training Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white/95">
                  <span className="font-heading font-bold block">Live Training Workshop</span>
                  <span className="text-emerald-200/80">Hands-on wiring, racking, and inverter synchronization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Available Programmes Section ───────────────────────────── */}
      <section id="programs" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            Curriculum &amp; Specialisations
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 tracking-tight">
            Available Solar Training Programmes
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Structured courses designed for students, tradespeople, electrical contractors, and corporate engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F3DA] text-[#3F6B1A]">
                    {prog.level}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {prog.mode}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-950 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {prog.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Intake Schedule:</span>
                    <strong className="text-gray-900">{prog.intakeStatus}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Tuition:</span>
                    <strong className="text-[#3F6B1A]">{prog.tuition}</strong>
                  </div>
                  <p className="text-[11px] text-gray-500 pt-1">
                    {prog.tuitionNote}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?service=training&program=${encodeURIComponent(prog.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-heading font-bold bg-black text-white hover:bg-gray-800 transition"
                >
                  <span>Enquire for This Programme</span>
                  <ArrowRight className="w-4 h-4 text-[#7BB042]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Core Competencies Grid ─────────────────────────────────── */}
      <section className="bg-[#F8F9FA] border-y border-gray-200 py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              Practical Skills
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 tracking-tight">
              Essential Skills Covered in Our Labs
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              We focus on field-critical capabilities that ensure system safety, warranty compliance, and optimal energy yields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETENCIES.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8F3DA] flex items-center justify-center text-[#3F6B1A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950">
                    {comp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    {comp.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Pathway from Enrolment to Certification ────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Academy Pathway to Certification
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            A structured path from enrolment to verified technical proficiency.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="p-4 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9] text-center space-y-2 flex flex-col items-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-bold text-xs flex items-center justify-center">
                {step.number}
              </div>
              <h3 className="font-heading font-bold text-xs text-gray-900">
                {step.title}
              </h3>
              <p className="text-[11px] text-gray-500 leading-tight">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Field Pillars & Verified Commitment (Deep Green Band #1F3A0B) ── */}
      <section className="bg-[#1F3A0B] text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-white">
                100% Practical
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
                Hands-on Workshop Labs
              </p>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">
                Every participant works directly with commercial inverters, battery management systems, and live solar circuits.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-white">
                NEMSA Aligned
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
                Nigerian Electrical Standards
              </p>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">
                Curriculum teaches rigorous grounding, surge suppression, and fire safety codes matching national regulations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Active Registry
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
                Technician Network
              </p>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">
                Graduates join Pet-Feb&apos;s installer network for subcontracting and technical project deployments across Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Inside Our Technical Workshops (Photos Grid) ──────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            Field Verification
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Inside Our Technical Workshops
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Real hardware test benches, battery storage configurations, and field installation environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKSHOP_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden border border-[#D9D9D9] h-52 group bg-gray-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/95">
                {photo.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Frequently Asked Questions ────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Clear guidelines on prerequisites, course arrangements, and certifications.
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
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-3 border-t border-gray-100 mt-3 font-sans">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 8. Call to Action ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5B82E] rounded-[24px] p-8 sm:p-12 text-center space-y-4">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-black">
            Ready to Accelerate Your Solar Engineering Career?
          </h2>
          <p className="text-sm sm:text-base text-black/80 max-w-xl mx-auto font-sans">
            Contact our academy admissions desk to receive the upcoming cohort calendar, syllabus details, and enrolment requirements.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?service=training"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-black text-white font-heading font-bold text-sm hover:bg-gray-800 transition"
            >
              <span>Speak with Admissions</span>
              <ArrowRight className="w-4 h-4 text-[#7BB042]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
