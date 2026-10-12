import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solar Training & Academy | Petfeb Solar Engineering",
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
      "Comprehensive baseline covering safety protocols, PV module wiring, battery bank interconnects, and rooftop racking mechanical stability.",
    intakeDate: "15 June 2025",
    tuition: "₦185,000",
    tuitionNote: "(demo placeholder)",
    seatsRemaining: 14,
    totalSeats: 20,
    tag: "Buy Small Installment Eligible",
    slug: "fundamentals",
  },
  {
    id: "commercial-design",
    level: "Intermediate · 6 Weeks",
    mode: "Hybrid + Field CAD Lab",
    title: "Commercial System Design & Sizing",
    description:
      "Advanced engineering calculations, load profiler telemetry, PVsyst yield simulations, and sub-distribution panel breaker coordination.",
    intakeDate: "22 June 2025",
    tuition: "₦260,000",
    tuitionNote: "(demo placeholder)",
    seatsRemaining: 6,
    totalSeats: 15,
    tag: "AutoCAD Electrical & PVsyst Lab",
    slug: "commercial-design",
  },
  {
    id: "inverter-diagnostics",
    level: "Advanced · 3 Weeks",
    mode: "Pure Hardware Diagnostic Lab",
    title: "Inverter Maintenance & Diagnostic Troubleshooting",
    description:
      "Component-level diagnostics, pure sine wave harmonic distortion analysis, MOSFET/IGBT replacement, and firmware parameter calibration.",
    intakeDate: "1 July 2025",
    tuition: "₦220,000",
    tuitionNote: "(demo placeholder)",
    seatsRemaining: 4,
    totalSeats: 12,
    tag: "Fluke Oscilloscope Diagnostics",
    slug: "inverter-diagnostics",
  },
  {
    id: "microgrid-engineering",
    level: "Professional · 8 Weeks",
    mode: "Field Substation Practicum",
    title: "Micro-Grid & Mini-Grid Engineering (NEMSA)",
    description:
      "Utility-scale synchronization, high-voltage battery storage containers, PLC automatic load shedding, and rural mini-grid revenue meters.",
    intakeDate: "15 July 2025",
    tuition: "₦420,000",
    tuitionNote: "(demo placeholder)",
    seatsRemaining: 8,
    totalSeats: 10,
    tag: "Includes On-Site Substation Trip",
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
    desc: "Submit credentials & choose specialization cohort.",
  },
  {
    number: "02",
    title: "Technical Review",
    desc: "Diagnostic assessment to match knowledge baseline.",
  },
  {
    number: "03",
    title: "Safety Induction",
    desc: "PPE equipment issuance and HV safety certification.",
  },
  {
    number: "04",
    title: "Intensive Labs",
    desc: "Hands-on roof array rigging and hardware wiring.",
  },
  {
    number: "05",
    title: "Field Internship",
    desc: "Optional 3-month deployment on Petfeb project sites.",
  },
  {
    number: "06",
    title: "Certified Badge",
    desc: "NEMSA-aligned official accreditation issuance.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Before Petfeb Academy, I had basic residential wiring knowledge but lacked understanding of lithium BMS communications. Within three weeks of finishing the diagnostic lab, I commissioned an 18kVA three-phase setup in Lekki with zero faults.",
    author: "Tunde Adeyemi",
    role: "Lead Engineer · Lagos State",
    initials: "TA",
  },
  {
    quote:
      "The practical roof mounting and earthing module prepared our team for rugged industrial conditions. We just closed our first telecommunications mast mini-grid contract in Kaduna. Petfeb's NEMSA standard curriculum gave us the exact authority we needed.",
    author: "Emeka Nwosu",
    role: "Solar Contractor · Kaduna State",
    initials: "EN",
  },
  {
    quote:
      "I transitioned from general civil engineering to solar mini-grid sizing. The PVsyst simulation sessions and oscilloscope waveform testing were unmatched. I now oversee installations for rural agro-processing cooperatives.",
    author: "Fatima Ibrahim",
    role: "Mini-Grid Specialist · Kano State",
    initials: "FI",
  },
];

const WORKSHOP_PHOTOS = [
  {
    title: "Ikeja Practical Lab, Lagos · 2024",
    img: "/api/websitepic/commercial",
  },
  {
    title: "Mini-grid Substation Installation, Ogun · 2024",
    img: "/api/websitepic/community",
  },
  {
    title: "Rooftop Inverter Mounting, Abuja · 2024",
    img: "/api/websitepic/residential",
  },
  {
    title: "Oscilloscope Waveform Diagnostic Lab, Port Harcourt · 2024",
    img: "/api/websitepic/blog",
  },
];

const FAQS = [
  {
    q: "Who can apply for the training programs?",
    a: "We welcome electrical engineers, existing generator mechanics, vocational diploma holders, and career switchers with a passion for clean technology. While the Entry Level Fundamentals course requires no prior electrical background, intermediate and advanced courses require foundational electrical safety knowledge or an initial technical placement test (demo placeholder, pending Petfeb approval).",
  },
  {
    q: "What is the tuition cost and can I pay with Buy Small?",
    a: "Tuition varies by course duration and lab intensity, starting from ₦185,000 for the 4-week fundamentals program. Eligible Nigerian students and small electrical contracting businesses can utilize Petfeb's Buy Small training installment plan to spread tuition payments over 3 monthly installments (demo placeholder, pending Petfeb approval).",
  },
  {
    q: "What certificate do I receive upon graduation?",
    a: "Graduates who successfully complete all theory assessments, practical lab checklists, and safety exams receive the Petfeb Solar Technical Academy Certificate of Competence, aligned with NEMSA and TVET renewable vocational benchmarks (demo placeholder, pending Petfeb approval).",
  },
  {
    q: "Is there job placement assistance after completion?",
    a: "Top-performing graduates in each cohort are offered direct placement into Petfeb's 3-month paid field internship program. We also connect alumni with our nationwide network of approved solar dealers, commercial engineering partners, and telecommunication infrastructure clients across all 36 states (demo placeholder, pending Petfeb approval).",
  },
];

export default function TrainingPage() {
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
              <li className="text-white font-semibold">Training</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/20">
                <GraduationCap className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>Petfeb Solar Training Academy</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Learn solar. <br />
                Build a career.
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                Hands-on, NEMSA-aligned training in solar installation, inverter synchronization, and commercial system design. Direct pathway to certified installer accreditation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact?type=training"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm min-h-[48px]"
                >
                  <span>Apply for Training</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
                >
                  <span>Browse Programs</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-emerald-200/80 border-t border-emerald-900/80">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>6,000+ technicians trained (demo placeholder)</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>100% Practical lab workshops</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Industry internship placement</span>
                </span>
              </div>
            </div>

            {/* Right Photo Panel */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-800/80 shadow-2xl bg-gray-900 h-72 sm:h-84">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/websitepic/commercial"
                  alt="Live Training Facility in Lagos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>Live Training Facility · Ikeja, Lagos · 2024</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#7BB042] text-white">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Certified Technical Programs (4 Programs in 2x2 Grid) ── */}
      <section id="programs" className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              NEMSA-Aligned Accreditation
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
              Certified Technical Programs
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Industry-standard courses designed for engineers, electricians, and career switchers seeking certified renewable energy expertise.
            </p>
          </div>

          <span className="inline-block px-3 py-1.5 rounded-md bg-[#F4F9EC] border border-[#7BB042]/30 text-xs font-semibold text-[#3F6B1A]">
            Cohort Enrollment: Q3 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROGRAMS.map((prog) => {
            const filledSegments = Math.round(
              ((prog.totalSeats - prog.seatsRemaining) / prog.totalSeats) * 10
            );

            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-black transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F3DA] text-[#3F6B1A]">
                      {prog.level}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {prog.mode}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-gray-900 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Program Intake & Tuition */}
                  <div className="pt-2 grid grid-cols-2 gap-4 border-t border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 block">Next Intake Date:</span>
                      <strong className="text-gray-900 font-medium">
                        {prog.intakeDate}
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Program Tuition:</span>
                      <strong className="text-gray-900 font-semibold">
                        {prog.tuition}{" "}
                        <span className="font-normal text-gray-400 text-[10px]">
                          {prog.tuitionNote}
                        </span>
                      </strong>
                    </div>
                  </div>

                  {/* Segmented Power Meter per stitch frame */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Cohort Availability:</span>
                      <span className="font-semibold text-gray-900">
                        {prog.seatsRemaining} of {prog.totalSeats} Seats Remaining
                      </span>
                    </div>

                    <div className="grid grid-cols-10 gap-1 h-2">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${
                            i < 10 - filledSegments
                              ? "bg-[#7BB042]"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500 truncate">
                    {prog.tag}
                  </span>

                  <Link
                    href={`/contact?type=training&program=${prog.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shrink-0"
                  >
                    <span>View Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Practical Competencies for Field Deployment ───────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            Engineering Rigor
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Practical Competencies for Field Deployment
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            No pure theory. Every module is practiced directly on live industrial equipment matching current Nigerian grid and generator environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPETENCIES.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-6 space-y-3 shadow-sm hover:border-black transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-base text-gray-900">
                  {comp.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {comp.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Academy Pathway to Certification (6 Steps) ─────────────── */}
      <section className="bg-white py-14 border-y border-[#D9D9D9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
              Academy Pathway to Certification
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              From enrollment to field-verified commercial installer in 6 defined steps.
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

          <div className="bg-[#F4F9EC] border border-[#7BB042]/30 rounded-xl p-4 text-center max-w-3xl mx-auto">
            <p className="text-xs text-[#3F6B1A] font-medium">
              REGULATORY NOTICE: Certification and internship benefits are demo placeholders, pending official Petfeb Energy Solutions executive approval.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Stats & Voices from the Field (Deep Green Band #1F3A0B) ── */}
      <section className="bg-[#1F3A0B] text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
          {/* Top 3 Big Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-emerald-900/80">
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
                92%
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
                Field Employment Rate
              </p>
              <p className="text-xs text-emerald-200/70">
                Employed or self-commissioned within 6 months (demo placeholder).
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
                ₦450k
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
                Average Contractor Billing
              </p>
              <p className="text-xs text-emerald-200/70">
                Monthly estimated earnings post-certification (demo placeholder).
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
                36 States
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
                National Deployment Reach
              </p>
              <p className="text-xs text-emerald-200/70">
                Graduates executing rural and urban installations nationwide.
              </p>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-2xl text-white">
                Voices from the Field
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Real stories from certified technicians running independent clean energy operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4"
                >
                  <p className="text-xs sm:text-sm text-emerald-100/90 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <div className="w-8 h-8 rounded-full bg-[#7BB042] text-white font-bold text-xs flex items-center justify-center">
                      {t.initials}
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs text-white block">
                        {t.author}
                      </span>
                      <span className="text-[11px] text-emerald-300">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Inside Our Technical Workshops (Photos Grid) ──────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            Field Verification
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Inside Our Technical Workshops
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            High-voltage test benches, rooftop mockups, and real substation field environments across Nigeria.
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
      <section className="max-w-[900px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Clear guidelines on prerequisites, tuition schedules, certifications, and career placement.
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

      {/* ── 8. Bottom CTA Band (Amber Band per stitch frame) ─────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#F5B82E] rounded-3xl p-8 sm:p-12 text-black flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-black/10 text-black uppercase tracking-wider">
              ADMISSIONS OPEN · Q3 COHORT
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-black">
              Next training intake starts soon
            </h2>
            <p className="text-xs sm:text-sm text-black/85 leading-relaxed">
              Limited seats per cohort to guarantee hands-on lab equipment access and one-on-one instructor mentorship.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <Link
              href="/contact?type=training"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold bg-black text-white hover:bg-gray-900 transition shadow-md"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-black/75 font-medium">
              Registration closes in 12 days (demo placeholder)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
