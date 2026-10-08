import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertCircle, Building2 } from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Contact Us | Petfeb Solar Systems",
  description:
    "Get in touch with Petfeb International Company Limited across our offices in Port Harcourt, Lagos, and Abuja for solar consultations, surveys, and inquiries.",
};

export default async function ContactPage() {
  const contactEmail = await getSiteContent("footer.contact_email", "info@petfeb.com");
  const phone = await getSiteContent("contact.phone", "+234 813-585-4054");

  return (
    <div className="py-12 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── 1. Page Header ────────────────────────────────────── */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
          Direct Support & Nationwide Inquiries
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight mt-2 mb-4">
          Contact Pet-Feb Solar Engineering
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Whether you need a full system sizing survey, commercial hybrid solar audit, or advice on solar kit availability, reach out to our regional offices across Nigeria.
        </p>
      </div>

      {/* ── 2. Grid: Office Network & Inquiry Card ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Office Locations & Direct Communications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-6">
            <h2 className="font-heading font-bold text-xl text-gray-900">
              Corporate Headquarters
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#3F6B1A] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    Head Office & Operational Hub
                  </span>
                  <span className="text-gray-900 font-medium leading-relaxed block">
                    Plot 23 Birabi Street, GRA 1, Port Harcourt, Rivers State, 840100, NG
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#3F6B1A] shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    Regional Operational Desks
                  </span>
                  <ul className="text-xs text-gray-700 space-y-1 mt-1">
                    <li>• <strong>Lagos Hub:</strong> Servicing South-West residential and commercial accounts.</li>
                    <li>• <strong>Abuja Regional Branch:</strong> Servicing FCT and Northern installation contracts.</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#3F6B1A] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    Official Inquiries & Support
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-[#3F6B1A] hover:underline font-semibold"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#3F6B1A] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    Direct Phone Line
                  </span>
                  <a href={`tel:${phone}`} className="text-gray-900 font-medium hover:text-[#3F6B1A]">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#3F6B1A] shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    WhatsApp Desk
                  </span>
                  <span className="text-gray-900 font-medium">Available via +234 813-585-4054</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#3F6B1A] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    Working Hours
                  </span>
                  <span className="text-gray-900 font-medium">Monday – Saturday: 8:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Styled Contact Form (Rendered Disabled per PRD Scope) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-xl text-gray-900">
                Send an Engineering Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Our technical support desk reviews queries and responds within one business day.
              </p>
            </div>

            {/* Note banner explaining disabled state */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Online web submission form paused:</span>
                Web form routing will be enabled in our next release. For urgent system sizing or inquiries, please contact us directly via email ({contactEmail}) or telephone ({phone}).
              </div>
            </div>

            {/* Form Elements */}
            <form className="space-y-4" aria-label="Contact inquiry form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="full-name" className="text-xs font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="name"
                    disabled
                    placeholder="e.g. Tunde Bello"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-addr" className="text-xs font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email-addr"
                    name="email"
                    disabled
                    placeholder="e.g. tunde@example.com"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="phone-number" className="text-xs font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone-number"
                    name="phone"
                    disabled
                    placeholder="+234 813..."
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="location" className="text-xs font-semibold text-gray-700">
                    State / Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    disabled
                    placeholder="e.g. Port Harcourt, Rivers State"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inquiry-message" className="text-xs font-semibold text-gray-700">
                  Message or Connected Load Details
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  disabled
                  placeholder="Describe your appliances, inverter requirements, or intended installation..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                />
              </div>

              <button
                type="button"
                disabled
                className="w-full px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
              >
                Send Message (Temporarily Disabled)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
