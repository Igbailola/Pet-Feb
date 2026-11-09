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
  Check,
} from "lucide-react";
import {
  ScrollReveal,
  ScrollScale,
  ParallaxLayer,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Solar Training & Academy | Pet-Feb Solar",
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
    title: "DC String Sizing & MPPT Matching",
    description:
      "Calculate temperature-adjusted Open Circuit Voltage (Voc), avoid inverter clipping, and balance dual-tracker MPPT inputs under Nigerian thermal conditions.",
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
      "Copper earth mat installations, soil resistivity chemical treatment, Type 2 DC/AC Surge Protective Devices (SPD), and lightning air-terminals.",
    icon: ShieldCheck,
  },
  {
    title: "3-Phase Generator ATS Synchronization",
    description:
      "Dry contact automatic generator starting (2-wire remote start), phase-angle interlocking, zero back-feed diodes, and grid priority logic.",
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
    img: "https://framerusercontent.com/images/h86onno5G4w20Bz4ZvuI3lx6wc.png?width=2444&height=2208",
  },
  {
    title: "Commercial Solar Array Installation",
    img: "https://framerusercontent.com/images/Sp6K5CQBjMLpUy8FDCjH6bqF4k.png?width=3906&height=1656",
  },
  {
    title: "Battery Storage & BMS Integration",
    img: "https://framerusercontent.com/images/9U0RV4PI8oglCnV4u5NLQd7ybU.png?width=4096&height=2304",
  },
  {
    title: "Community Street Lighting Practicum",
    img: "https://framerusercontent.com/images/Pe6chdzlkxNa92G279oCEMkkpc.png?width=3906&height=1656",
  },
];

const FAQS = [
  {
    q: "Who can apply for the Pet-Feb training programmes?",
    a: "We welcome aspiring solar technicians, electrical engineers, tradespeople, and career switchers who want to build verifiable skills in clean energy. While the Entry Level Fundamentals course requires no prior electrical background, intermediate and advanced courses require foundational knowledge of electrical safety principles.",
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
    <div className="bg-white min-h-screen text-[#333333] pb-20 font-sans">
      {/* ── 1. Page Header & Hero Band matching Pet-Feb Standard Design ────────────────── */}
      <section className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 pt-10 sm:pt-16 lg:pt-[80px]">
        {/* Header Row: Yellow Dot + Space Grotesk Heading + Subtitle */}
        <ScrollReveal direction="up" duration={0.7} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 sm:pb-12">
          <div className="flex items-start gap-4">
            <span
              className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0 mt-2 sm:mt-3"
              aria-hidden="true"
            />
            <h1
              className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] uppercase tracking-[2px] sm:tracking-[3px] leading-[1.1] text-shadow-[0px_4px_20px_rgba(0,0,0,0.05)]"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <span className="text-black block">SOLAR ENGINEERING</span>
              <span className="text-[#70A03C] block">ACADEMY &amp; TRAINING</span>
            </h1>
          </div>

          <div className="max-w-[532px] pl-[46px] lg:pl-0">
            <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.6] uppercase text-left">
              Hands-on practical training in solar system design, inverter configuration, and lithium battery storage. Equip yourself with skills to lead in Nigeria&apos;s booming clean energy market.
            </p>
          </div>
        </ScrollReveal>

        {/* Hero Banner Card with Real Pet-Feb Training Photo */}
        <ScrollScale from={0.95} rise={28}>
          <div className="relative rounded-[31px] overflow-hidden h-[360px] sm:h-[500px] lg:h-[640px] w-full shadow-lg mb-12 sm:mb-16 bg-black">
            <ParallaxLayer travel={16} scaleFrom={1.04} className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/3nbXbY6KeeNsRkGhg0TmSY1jlU.png?width=3906&height=1656"
                alt="Pet-Feb Practical Solar Training Workshop"
                className="w-full h-full object-cover"
              />
            </ParallaxLayer>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Top Floating Badge Row */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-bold bg-[#7BB042] text-white shadow-sm">
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Pet-Feb Solar Engineering Academy</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/65 text-white backdrop-blur-md border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>Accredited Practical Workshops · Nationwide Cohorts</span>
              </span>
            </div>

            {/* Bottom Floating Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 flex flex-col gap-6 max-w-[1280px] z-10">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?service=training"
                  className="bg-[#7BB042] text-white font-heading font-bold text-[16px] sm:text-[18px] px-7 py-4 rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-2"
                >
                  <span>Enquire for Next Cohort</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#programs"
                  className="border border-white/60 text-white font-heading font-semibold text-[16px] sm:text-[18px] px-6 py-4 rounded-[16px] hover:bg-white/10 transition backdrop-blur-sm inline-flex items-center gap-2"
                >
                  <span>Browse Programmes</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* 3 Verification Pillars */}
              <div className="border-t border-white/15 pt-4 flex flex-wrap items-center gap-6 text-xs text-white/90">
                <span className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#7BB042]" />
                  <span>100% Practical hands-on workshop labs</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#7BB042]" />
                  <span>NEMSA-aligned electrical safety &amp; grounding</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#7BB042]" />
                  <span>Field deployment shadowing on live projects</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollScale>
      </section>

      {/* ── Main Content Sections Container ─────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12 sm:space-y-16">
        {/* ── 2. Available Programmes (Black Container matching Figma 6140:4831) ─────────── */}
        <section id="programs" className="scroll-mt-28">
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8 shadow-xl">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                    Available Solar Training Programmes
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  Structured courses designed for students, tradespeople, electrical contractors, and corporate engineering teams looking to build verifiable clean-energy expertise.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch pt-2">
                {PROGRAMS.map((prog) => (
                  <div
                    key={prog.id}
                    className="rounded-[24px] bg-white text-gray-900 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover-lift transition-all"
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

                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Intake Schedule:</span>
                          <strong className="text-gray-900">{prog.intakeStatus}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Tuition:</span>
                          <strong className="text-[#3F6B1A] font-bold">{prog.tuition}</strong>
                        </div>
                        <p className="text-[11px] text-gray-500 pt-1">
                          {prog.tuitionNote}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/contact?service=training&program=${encodeURIComponent(prog.title)}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-[14px] text-sm font-heading font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs"
                      >
                        <span>Enquire for This Programme</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 3. Practical Skills & Competencies (Light Green Container #D6E7C4) ──────────── */}
        <section>
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-[#D6E7C4] text-gray-950 rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Essential Skills Covered in Our Labs
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal">
                  We focus on field-critical capabilities that ensure system safety, warranty compliance, and optimal energy yields under Nigerian environmental conditions.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {COMPETENCIES.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-[24px] bg-white text-gray-900 shadow-sm hover:shadow-md hover-lift transition space-y-3.5"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#E8F3DA] flex items-center justify-center text-[#3F6B1A]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-gray-950 leading-snug">
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
          </ScrollScale>
        </section>

        {/* ── 4. Pathway to Certification (Clean Grid) ─────────────────────────────────── */}
        <section className="bg-white rounded-[32px] border border-gray-200/90 p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042]">
              Certification Pathway
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 tracking-tight">
              Academy Pathway to Certification
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              A structured step-by-step path from enrolment to verified technical proficiency.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="p-4 rounded-[20px] bg-[#F8F9FA] border border-[#D9D9D9] text-center space-y-2.5 flex flex-col items-center hover:border-[#7BB042] transition"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-bold text-xs flex items-center justify-center shadow-2xs">
                  {step.number}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                  {step.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-tight">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Inside Our Technical Workshops (Real Photos Grid) ───────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Field Verification
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 tracking-tight">
                Inside Our Technical Workshops
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md">
              Real hardware test benches, battery storage configurations, and practical field installation training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKSHOP_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="relative rounded-[24px] overflow-hidden border border-[#D9D9D9] h-60 group bg-gray-900 shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-white">
                  {photo.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Frequently Asked Questions (Yellow Container matching Figma 6139:3104) ───── */}
        <section>
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-[#F5B82E] text-black rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8">
              <ScrollReveal className="max-w-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Training Academy FAQs
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-black/85 leading-relaxed font-normal">
                  Clear guidelines on prerequisites, course arrangements, and certifications.
                </p>
              </ScrollReveal>

              <div className="space-y-4 pt-2">
                {FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-[20px] p-5 sm:p-6 shadow-sm [&_summary::-webkit-details-marker]:none cursor-pointer"
                  >
                    <summary className="flex items-center justify-between font-heading font-bold text-base sm:text-lg text-gray-950">
                      <span>{faq.q}</span>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 shrink-0 ml-3" />
                    </summary>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-3 border-t border-gray-100 mt-3 font-sans">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 7. Call to Action (Black Container matching Scene 9) ───────────────────────── */}
        <section>
          <div className="bg-black text-white rounded-[32px] p-8 sm:p-12 lg:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Ready to Accelerate Your Solar Engineering Career?
              </h2>
              <p className="text-sm text-gray-300 font-normal">
                Contact our academy admissions desk to receive the upcoming cohort calendar, syllabus details, and enrolment requirements.
              </p>
            </div>
            <Link
              href="/contact?service=training"
              className="bg-[#7BB042] text-white font-heading font-bold text-sm sm:text-base px-8 py-4 rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-2 shrink-0"
            >
              <span>Speak with Admissions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
