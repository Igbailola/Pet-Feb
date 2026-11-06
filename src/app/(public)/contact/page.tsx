import type { Metadata } from "next";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";

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
    isConfirmed: false, // Flagged for management confirmation per Phase 4
  },
  {
    city: "Lagos",
    badge: "Commercial Desk",
    name: "Pet-Feb Solar — Lagos Operations Desk",
    address: "Victoria Island / Ikeja Dispatch Network, Lagos State, Nigeria",
    phone: "+234 813 585 4054",
    whatsapp: "+234 813 585 4054",
    hours: "Monday – Friday: 8:30 AM – 5:00 PM",
    isConfirmed: false, // Flagged for management confirmation per Phase 4
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#F8F9FA] pb-20 font-sans">
      {/* ── Section 1: Hero Band ── */}
      <section className="bg-white border-b border-gray-100 pt-10 sm:pt-16 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-semibold text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
              Official Customer &amp; Engineering Support
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-tight">
              Let&apos;s Talk About Your Solar Needs
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Whether you&apos;re looking for a solar solution for your home or business, need installation support, or have questions about our services, we&apos;d love to hear from you.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#enquiry-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7BB042] text-white font-heading font-bold text-sm hover:bg-[#6EA138] transition shadow-xs"
              >
                <span>Send an Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/2348135854054?text=Hello%20Pet-Feb%20Solar,%20I%20would%20like%20to%20make%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-heading font-semibold text-sm hover:bg-gray-50 transition shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Contact Information & Office Locations ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042]">
              Our Locations
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 mt-1">
              Pet-Feb Office Network Across Nigeria
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANCHES.map((b, idx) => (
              <div
                key={b.city}
                className="bg-white rounded-[24px] p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E8F3DA] text-[#3F6B1A]">
                      {idx + 1}. {b.city}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{b.badge}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-gray-900 leading-snug">
                    {b.name}
                  </h3>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#7BB042] shrink-0 mt-1" />
                      <div>
                        <p>{b.address}</p>
                        {!b.isConfirmed && (
                          <span className="inline-block mt-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                            Physical office address pending executive confirmation
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-[#7BB042] shrink-0" />
                      <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-gray-950 transition">
                        {b.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#7BB042] shrink-0" />
                      <span>{b.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                  <a
                    href={`https://wa.me/2348135854054?text=Hello%20Pet-Feb%20${encodeURIComponent(b.city)}%20Desk`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3F6B1A] hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Desk</span>
                  </a>

                  {b.directionsUrl ? (
                    <a
                      href={b.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-950 flex items-center gap-1"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400 font-normal">Nationwide dispatch</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Contact Form Anchor ── */}
      <section id="enquiry-form" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042]">
              Enquiry Desk
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 leading-tight">
              Tell Us About Your Energy Goals
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Fill out this form to connect with our certified solar engineers. We review residential load profiles, corporate mini-grid briefs, and Buy Small financing requests daily.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold text-gray-900 block">Zero obligation assessment</span>
                  <span className="text-gray-500">Free solar load audits and custom equipment specifications.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold text-gray-900 block">Fast technical turnaround</span>
                  <span className="text-gray-500">Detailed proposals delivered within 24 to 48 hours.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7BB042] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold text-gray-900 block">Dedicated support lines</span>
                  <span className="text-gray-500">Reach certified engineers directly via phone or WhatsApp.</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="pt-4 space-y-2.5">
              <a
                href="tel:+2348135854054"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-100 hover:border-[#7BB042] transition shadow-2xs group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Call Engineering Desk</span>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#7BB042] transition">
                    +234 813 585 4054
                  </span>
                </div>
              </a>

              <a
                href="mailto:Info@petfeb.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gray-100 hover:border-[#7BB042] transition shadow-2xs group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Email General Inquiries</span>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#7BB042] transition">
                    Info@petfeb.com
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
