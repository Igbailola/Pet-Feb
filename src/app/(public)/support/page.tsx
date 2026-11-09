import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Cpu,
  ShieldCheck,
  Truck,
  RotateCcw,
  Wrench,
  CreditCard,
  Search,
  ArrowRight,
  PhoneCall,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { SupportFaqAccordion, type FaqItem } from "@/components/public/SupportFaqAccordion";
import {
  ScrollReveal,
  ScrollScale,
  ParallaxLayer,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Support & Help Center | Pet-Feb Solar",
  description:
    "Find answers to frequently asked questions about Pet-Feb solar systems, warranties, Buy Small financing, installation, and order tracking.",
};

const SUPPORT_CATEGORIES = [
  {
    id: "faq",
    title: "Frequently Asked Questions",
    desc: "Quick answers to common questions about systems, pricing, and warranties.",
    icon: HelpCircle,
    href: "#faqs",
    isAnchor: true,
  },
  {
    id: "sizing",
    title: "Product & System Sizing",
    desc: "Calculate your energy usage and select the appropriate kVA inverter and storage bank.",
    icon: Cpu,
    href: "/shop",
    isAnchor: false,
  },
  {
    id: "warranty",
    title: "Warranty & Hardware Claims",
    desc: "Understand Pet-Feb hardware replacement protections and component coverage guidelines.",
    icon: ShieldCheck,
    href: "#faqs",
    isAnchor: true,
  },
  {
    id: "delivery-install",
    title: "Delivery & Installation",
    desc: "Request certified engineer installation or review transit timelines for Lagos, Abuja, and nationwide.",
    icon: Truck,
    href: "/installation",
    isAnchor: false,
  },
  {
    id: "returns",
    title: "Returns & Hardware Inspection",
    desc: "Our policies regarding factory hardware inspection, testing, and verified component replacements.",
    icon: RotateCcw,
    href: "#faqs",
    isAnchor: true,
  },
  {
    id: "maintenance",
    title: "Maintenance & Repairs",
    desc: "Schedule inverter servicing, battery BMS calibration, or solar array cleaning.",
    icon: Wrench,
    href: "/installation",
    isAnchor: false,
  },
  {
    id: "buy-small",
    title: "Buy Small Financing Support",
    desc: "Installment schedules, weekly/monthly plans, 30% initial deposits, and repayment FAQs.",
    icon: CreditCard,
    href: "/buy-small",
    isAnchor: false,
  },
  {
    id: "track-order",
    title: "Track Your Order",
    desc: "Monitor shipment dispatch status, driver allocation, and delivery telemetry in real-time.",
    icon: Search,
    href: "/track-order",
    isAnchor: false,
  },
];

const SUGGESTED_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Sizing",
    question: "How do I choose the right solar system size?",
    answer:
      "System sizing depends on your total daily power consumption, peak wattage (such as pumps, refrigerators, and air conditioning), and required backup duration. We recommend requesting a complimentary load assessment from our engineering team or starting with our starter 1kVA (basic essentials), 3kVA (standard home), or 5kVA+ (high-capacity) packages.",
    isConfirmed: true,
  },
  {
    id: "faq-2",
    category: "Products",
    question: "What products are available on the Pet-Feb shop?",
    answer:
      "Our catalogue includes complete solar kits (1kVA to 10kVA+), hybrid pure sine wave inverters, high-cycle LiFePO4 lithium battery racks, tier-1 monocrystalline solar panels, MPPT smart charge controllers, and commercial solar floodlighting.",
    isConfirmed: true,
  },
  {
    id: "faq-3",
    category: "Warranty",
    question: "What warranty coverage do Pet-Feb systems carry?",
    answer:
      "Pet-Feb products carry manufacturer-backed replacement and performance warranties: solar panels carry up to 10–25 years linear power warranty, lithium batteries up to 5 years performance warranty, and inverters up to 2–3 years manufacturer warranty.",
    isConfirmed: true,
  },
  {
    id: "faq-4",
    category: "Financing",
    question: "How does the Buy Small financing plan work?",
    answer:
      "Pet-Feb Buy Small allows verified Nigerian households and businesses to acquire complete solar systems with an initial commitment (starting around 30%) and spread the remaining balance over convenient weekly or monthly installments.",
    isConfirmed: true,
  },
  {
    id: "faq-5",
    category: "Payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept verified direct bank transfers to official Pet-Feb corporate accounts, verified card payments via secure gateways, and installment debits for approved Buy Small customers.",
    isConfirmed: true,
  },
  {
    id: "faq-6",
    category: "Delivery",
    question: "How long does delivery take across Nigeria?",
    answer:
      "Deliveries within Port Harcourt, Lagos, and Abuja metropolitan hubs typically take 1 to 3 business days. Regional and nationwide dispatch to other states takes 3 to 7 business days via insured logistics carriers.",
    isConfirmed: true,
  },
  {
    id: "faq-7",
    category: "Location",
    question: "Where are Pet-Feb physical offices located?",
    answer:
      "Pet-Feb operates from our Port Harcourt Head Office (Plot 23 Binabi Street, GRA Phase 1, Rivers State), alongside regional operations in Lagos and Abuja, deploying certified solar installation engineers nationwide.",
    isConfirmed: true,
  },
  {
    id: "faq-8",
    category: "Installation",
    question: "Do your solar products come with installation?",
    answer:
      "Products purchased on the Pet-Feb shop can be ordered with optional Certified Turnkey Installation at checkout. Our nationwide technical engineers conduct site audits, handle mounting, safety breakers, earthing, and handover commissioning.",
    isConfirmed: true,
  },
  {
    id: "faq-9",
    category: "Maintenance",
    question: "How do I request product maintenance or repair?",
    answer:
      "You can request preventive maintenance, inverter diagnostics, or battery expansion by contacting our technical support desk or submitting a request via our Contact or Request Installer pages.",
    isConfirmed: true,
  },
  {
    id: "faq-10",
    category: "Logistics",
    question: "How can I track my order?",
    answer:
      "Once your order has been dispatched, you receive a dispatch tracking code. You can enter this code on our dedicated Track Order page (/track-order) to monitor delivery transit milestones and driver contact.",
    isConfirmed: true,
  },
  {
    id: "faq-11",
    category: "Assessment",
    question: "Can I request an on-site solar engineering assessment?",
    answer:
      "Yes. You can submit your location and load specifications through our Contact page (/contact) or Request Installer page (/installation) to schedule a zero-obligation engineering site survey.",
    isConfirmed: true,
  },
  {
    id: "faq-12",
    category: "Support",
    question: "How do I contact the customer care team?",
    answer:
      "Our support team is available via phone at +234 813 585 4054, WhatsApp (+234 813 585 4054), or by email at Info@petfeb.com (Monday through Friday 8:00 AM – 5:30 PM, Saturday 9:00 AM – 2:00 PM).",
    isConfirmed: true,
  },
];

export default function SupportPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SUGGESTED_FAQS.filter((f) => f.answer).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen text-[#333333] pb-20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
              <span className="text-black block">HOW CAN WE</span>
              <span className="text-[#70A03C] block">HELP YOU TODAY?</span>
            </h1>
          </div>

          <div className="max-w-[532px] pl-[46px] lg:pl-0">
            <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.6] uppercase text-left">
              Find quick answers about Pet-Feb solar systems, certified installation, hardware warranties, Buy Small financing, and order tracking.
            </p>
          </div>
        </ScrollReveal>

        {/* Hero Banner Card with Real Support / Operational Photo */}
        <ScrollScale from={0.95} rise={28}>
          <div className="relative rounded-[31px] overflow-hidden h-[360px] sm:h-[480px] lg:h-[580px] w-full shadow-lg mb-12 sm:mb-16 bg-black">
            <ParallaxLayer travel={16} scaleFrom={1.04} className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/ouN3rsXAKyw7PjwEu9a9id2jDhk.png?width=1524&height=764"
                alt="Pet-Feb Solar Customer Support & Operations Desk"
                className="w-full h-full object-cover"
              />
            </ParallaxLayer>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

            {/* Top Floating Badge Row */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-bold bg-[#7BB042] text-white shadow-sm">
                <HelpCircle className="w-4 h-4 text-white" />
                <span>Pet-Feb Help Center &amp; Customer Care</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/65 text-white backdrop-blur-md border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>Dedicated Technical Desk · Port Harcourt, Abuja &amp; Lagos</span>
              </span>
            </div>

            {/* Bottom Floating Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 flex flex-col gap-6 max-w-[1280px] z-10">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#faqs"
                  className="bg-[#7BB042] text-white font-heading font-bold text-[16px] sm:text-[18px] px-7 py-4 rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-2"
                >
                  <span>Browse FAQs</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/track-order"
                  className="border border-white/60 text-white font-heading font-semibold text-[16px] sm:text-[18px] px-6 py-4 rounded-[16px] hover:bg-white/10 transition backdrop-blur-sm inline-flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-[#F5B82E]" />
                  <span>Track Your Order</span>
                </Link>

                <a
                  href="https://wa.me/2348135854054?text=Hello%20Pet-Feb%20Solar,%20I%20need%20support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white font-heading font-semibold text-[16px] sm:text-[18px] px-6 py-4 rounded-[16px] hover:bg-[#1EBE5D] transition shadow-md inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Direct Support Hours Bar */}
              <div className="border-t border-white/15 pt-4 flex flex-wrap items-center gap-6 text-xs text-white/90">
                <span>Direct Line: +234 813 585 4054</span>
                <span>•</span>
                <span>Mon–Fri: 8:00 AM – 5:30 PM • Sat: 9:00 AM – 2:00 PM</span>
                <span>•</span>
                <span>Email: Info@petfeb.com</span>
              </div>
            </div>
          </div>
        </ScrollScale>
      </section>

      {/* ── Main Content Sections Container ─────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12 sm:space-y-16">
        {/* ── 2. Support Categories Grid (Black Container matching Figma 6140:4831) ──────── */}
        <section>
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8 shadow-xl">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                    Support Categories
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  Select a category below to jump straight to relevant resources, technical guides, or service requests.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                {SUPPORT_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const cardContent = (
                    <div className="p-6 rounded-[24px] bg-white text-gray-900 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover-lift transition group h-full">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-[14px] bg-[#E8F3DA] flex items-center justify-center text-[#3F6B1A] group-hover:bg-[#7BB042] group-hover:text-white transition">
                          <Icon className="w-6 h-6 transition-transform group-hover:scale-105" />
                        </div>
                        <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950 group-hover:text-[#3F6B1A] transition leading-snug">
                          {cat.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                          {cat.desc}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-heading font-bold text-[#3F6B1A] group-hover:text-[#2E5014] transition">
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );

                  return cat.isAnchor ? (
                    <a key={cat.id} href={cat.href} className="block">
                      {cardContent}
                    </a>
                  ) : (
                    <Link key={cat.id} href={cat.href} className="block">
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 3. Frequently Asked Questions (Light Green Container #D6E7C4) ──────────────── */}
        <section id="faqs" className="scroll-mt-28">
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-[#D6E7C4] text-gray-950 rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal">
                  Answers to the most common questions regarding solar hardware, warranty terms, installation schedules, and Buy Small financing.
                </p>
              </ScrollReveal>

              <div className="pt-2">
                <SupportFaqAccordion faqs={SUGGESTED_FAQS} />
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 4. Direct Assistance & Contact Channels (Yellow Container #F5B82E) ──────────── */}
        <section>
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-[#F5B82E] text-black rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8">
              <ScrollReveal className="max-w-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Still Need Assistance?
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-black/85 leading-relaxed font-normal">
                  Our customer care and technical engineering teams are ready to support your solar transition.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Channel 1: Phone */}
                <div className="p-6 sm:p-7 rounded-[24px] bg-white text-gray-900 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-gray-950">Call Support</h3>
                    <p className="text-xs text-gray-600 mt-1">Speak directly with a customer representative.</p>
                  </div>
                  <a
                    href="tel:+2348135854054"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3F6B1A] hover:underline"
                  >
                    <span>+234 813 585 4054</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Channel 2: WhatsApp */}
                <div className="p-6 sm:p-7 rounded-[24px] bg-white text-gray-900 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#E8F3DA] text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-gray-950">WhatsApp Desk</h3>
                    <p className="text-xs text-gray-600 mt-1">Fast replies and direct photo/spec sharing.</p>
                  </div>
                  <a
                    href="https://wa.me/2348135854054?text=Hello%20Pet-Feb%20Solar,%20I%20need%20support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3F6B1A] hover:underline"
                  >
                    <span>Chat +234 813 585 4054</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Channel 3: Email */}
                <div className="p-6 sm:p-7 rounded-[24px] bg-white text-gray-900 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-gray-950">Email Support</h3>
                    <p className="text-xs text-gray-600 mt-1">For formal quote requests, tenders &amp; claims.</p>
                  </div>
                  <a
                    href="mailto:Info@petfeb.com"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3F6B1A] hover:underline"
                  >
                    <span>Info@petfeb.com</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 5. Bottom Consultation Banner (Black Container) ────────────────────────────── */}
        <section>
          <div className="bg-black text-white rounded-[32px] p-8 sm:p-12 lg:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Need an In-Depth Engineering Site Assessment?
              </h2>
              <p className="text-sm text-gray-300 font-normal">
                Schedule an on-site technical inspection with our certified engineers for turnkey residential or commercial solar installations.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#7BB042] text-white font-heading font-bold text-sm sm:text-base px-8 py-4 rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-2 shrink-0"
            >
              <span>Book Site Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
