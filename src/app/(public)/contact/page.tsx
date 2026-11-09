import type { Metadata } from "next";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import {
  ScrollReveal,
  ScrollScale,
  ParallaxLayer,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact Us | Pet-Feb Solar",
  description:
    "Get in touch with Pet-Feb Solar for residential, commercial, and industrial clean energy solutions, installation assessments, and Buy Small support across Nigeria.",
};

interface BranchLocation {
  city: string;
  badge: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  directionsUrl?: string;
  isConfirmed: boolean;
}

const BRANCHES: BranchLocation[] = [
  {
    city: "Port Harcourt",
    badge: "Head Office",
    name: "Pet-Feb Solar — Port Harcourt Head Office",
    address: "Plot 23 Binabi Street, GRA Phase 1, Port Harcourt, Rivers State, 840100, NG",
    phone: "+234 813 585 4054",
    whatsapp: "+234 813 585 4054",
    hours: "Monday – Friday: 8:00 AM – 5:30 PM • Saturday: 9:00 AM – 2:00 PM",
    directionsUrl: "https://maps.google.com/?q=Plot+23+Binabi+Street+GRA+1+Port+Harcourt",
    isConfirmed: true,
  },
  {
    city: "Abuja",
    badge: "Regional Hub",
    name: "Pet-Feb Solar — Abuja Liaison Desk",
    address: "Central Business District / Garki Hub, Abuja (FCT), Nigeria",
    phone: "+234 813 585 4054",
    whatsapp: "+234 813 585 4054",
    hours: "Monday – Friday: 8:30 AM – 5:00 PM",
    isConfirmed: false,
  },
  {
    city: "Lagos",
    badge: "Commercial Desk",
    name: "Pet-Feb Solar — Lagos Operations Desk",
    address: "Victoria Island / Ikeja Dispatch Network, Lagos State, Nigeria",
    phone: "+234 813 585 4054",
    whatsapp: "+234 813 585 4054",
    hours: "Monday – Friday: 8:30 AM – 5:00 PM",
    isConfirmed: false,
  },
];

export default function ContactPage() {
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
              <span className="text-black block">STAY IN TOUCH</span>
              <span className="text-[#70A03C] block">WITH PET-FEB SOLAR</span>
            </h1>
          </div>

          <div className="max-w-[532px] pl-[46px] lg:pl-0">
            <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.6] uppercase text-left">
              Chat with us to get free consultation service, make enquiries, schedule engineering site audits, and explore clean energy solutions nationwide.
            </p>
          </div>
        </ScrollReveal>

        {/* Hero Banner Card with Real Headquarters / Team Facility Photo */}
        <ScrollScale from={0.95} rise={28}>
          <div className="relative rounded-[31px] overflow-hidden h-[360px] sm:h-[480px] lg:h-[580px] w-full shadow-lg mb-12 sm:mb-16 bg-black">
            <ParallaxLayer travel={16} scaleFrom={1.04} className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/ouN3rsXAKyw7PjwEu9a9id2jDhk.png?width=1524&height=764"
                alt="Pet-Feb Solar Head Office Facility"
                className="w-full h-full object-cover"
              />
            </ParallaxLayer>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

            {/* Top Floating Badge Row */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-bold bg-[#7BB042] text-white shadow-sm">
                <MapPin className="w-4 h-4 text-white" />
                <span>Head Office: Plot 23 Binabi Street, GRA 1, Port Harcourt</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/65 text-white backdrop-blur-md border border-white/20">
                <Clock className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>Mon–Fri: 8:00 AM – 5:30 PM • Sat: 9:00 AM – 2:00 PM</span>
              </span>
            </div>

            {/* Bottom Floating Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 flex flex-col gap-6 max-w-[1280px] z-10">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#enquiry-form"
                  className="bg-[#7BB042] text-white font-heading font-bold text-[16px] sm:text-[18px] px-7 py-4 rounded-[16px] hover:bg-[#6aa035] transition shadow-md inline-flex items-center gap-2"
                >
                  <span>Send an Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/2348135854054?text=Hello%20Pet-Feb%20Solar,%20I%20would%20like%20to%20make%20an%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white font-heading font-semibold text-[16px] sm:text-[18px] px-6 py-4 rounded-[16px] hover:bg-[#1EBE5D] transition shadow-md inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+2348135854054"
                  className="border border-white/60 text-white font-heading font-semibold text-[16px] sm:text-[18px] px-6 py-4 rounded-[16px] hover:bg-white/10 transition backdrop-blur-sm inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#7BB042]" />
                  <span>+234 813 585 4054</span>
                </a>
              </div>

              {/* Direct Support Notice */}
              <div className="border-t border-white/15 pt-4 flex flex-wrap items-center gap-6 text-xs text-white/90">
                <span>Official Email: Info@petfeb.com</span>
                <span>•</span>
                <span>Nationwide Engineering Dispatch &amp; Logistics Coverage</span>
              </div>
            </div>
          </div>
        </ScrollScale>
      </section>

      {/* ── Main Content Sections Container ─────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12 sm:space-y-16">
        {/* ── 2. Branch Locations (Light Green Container #D6E7C4) ────────────────────────── */}
        <section>
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-[#D6E7C4] text-gray-950 rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Our Physical Offices &amp; Regional Hubs
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal">
                  Connect with our certified engineers, review live hardware setups, or schedule an on-site installation consultation.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {BRANCHES.map((b) => (
                  <div
                    key={b.city}
                    className="p-6 sm:p-7 rounded-[24px] bg-white text-gray-900 shadow-sm hover:shadow-md hover-lift transition flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#E8F3DA] text-[#3F6B1A]">
                          {b.badge}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">{b.city}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950 leading-snug">
                          {b.name}
                        </h3>
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                          <MapPin className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                          <span>{b.address}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-3.5 h-3.5 text-[#7BB042] shrink-0" />
                          <a href={`tel:${b.phone.replace(/\s+/g, "")}`} className="hover:text-black font-medium">
                            {b.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{b.hours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      {b.directionsUrl ? (
                        <a
                          href={b.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#3F6B1A] hover:underline"
                        >
                          <span>Get Directions</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Regional dispatch hub</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 3. Consultation & Enquiry Form (Black Container matching Scene 9) ──────────── */}
        <section id="enquiry-form" className="scroll-mt-28">
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8 shadow-xl">
              <ScrollReveal className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                    Send Us a Message / Solar Enquiry
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  Fill in your details, energy requirements, or questions below. Our engineering desk will review your submission and reply with a tailored recommendation.
                </p>
              </ScrollReveal>

              <div className="pt-2">
                <ContactForm />
              </div>
            </div>
          </ScrollScale>
        </section>

        {/* ── 4. Direct Support Channels (Yellow Container #F5B82E) ──────────────────────── */}
        <section>
          <ScrollScale from={0.94} rise={36}>
            <div className="bg-[#F5B82E] text-black rounded-[32px] p-6 sm:p-10 lg:p-14 space-y-8">
              <ScrollReveal className="max-w-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl text-black tracking-tight">
                    Direct Contact Channels
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-black/85 leading-relaxed font-normal">
                  Need an urgent answer or immediate technical clarification? Reach out directly to our desks.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Channel 1: Phone */}
                <div className="p-6 sm:p-7 rounded-[24px] bg-white text-gray-900 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-gray-950">Call Center</h3>
                    <p className="text-xs text-gray-600 mt-1">Direct support and voice consultations.</p>
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
                    <h3 className="font-heading font-bold text-lg text-gray-950">WhatsApp Direct</h3>
                    <p className="text-xs text-gray-600 mt-1">Instant chat, diagrams &amp; quotes.</p>
                  </div>
                  <a
                    href="https://wa.me/2348135854054?text=Hello%20Pet-Feb%20Solar,%20I%20would%20like%20to%20make%20an%20enquiry"
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
                    <h3 className="font-heading font-bold text-lg text-gray-950">Corporate Email</h3>
                    <p className="text-xs text-gray-600 mt-1">Tenders, RFPs, and corporate enquiries.</p>
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
      </div>
    </div>
  );
}
