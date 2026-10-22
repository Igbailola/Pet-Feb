import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertCircle, Building2, Send, Shield, ChevronDown } from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Contact Petfeb | Petfeb Solar Systems",
  description:
    "Have questions about solar installation, Buy Small financing, or commercial solar projects? Our certified engineering support team is here to help.",
};

export default async function ContactPage() {
  const [contactEmail, phone] = await Promise.all([
    getSiteContent("footer.contact_email", "info@petfeb.com"),
    getSiteContent("contact.phone", "+234 813-585-4054"),
  ]);

  return (
    <div className="space-y-0">
      {/* ── Page Header Band ───────────────────────────────────── */}
      <section className="bg-[#F4F9EC] border-b border-[#D2E8B5] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Contact Petfeb</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
              Contact Petfeb
            </h1>
            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed max-w-2xl">
              Have questions about solar installation, Buy Small financing, commercial solar projects, or academy training? Our certified engineering support team is here to help.
            </p>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-[#3F6B1A] border border-[#D2E8B5]">
              <Shield className="w-3 h-3" />
              Verified Technical Support
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-[#3F6B1A] border border-[#D2E8B5]">
              <Clock className="w-3 h-3" />
              Typical response within 24 business hours
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-[#3F6B1A] border border-[#D2E8B5]">
              <MessageSquare className="w-3 h-3" />
              Dedicated WhatsApp hotline
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Content: Form & Direct Contact ────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-[16px] border border-[#D9D9D9] space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3F6B1A]">
                  Engineering & Client Desks
                </span>
                <h2 className="font-heading font-bold text-xl text-gray-950">
                  Send us a message
                </h2>
                <p className="text-xs text-[#5C5C5C]">
                  Direct your inquiry to the appropriate engineering or billing desk.
                </p>
              </div>

              {/* Note banner */}
              <div className="p-3.5 rounded-[10px] bg-[#FDF0CC] border border-[#F5B82E]/30 text-xs text-[#8A5A00] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Online web submission paused:</span>
                  Web form routing will be enabled in our next release. For urgent inquiries, please contact us directly via email ({contactEmail}) or telephone ({phone}).
                </div>
              </div>

              {/* Form */}
              <form className="space-y-4" aria-label="Contact inquiry form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="full-name" className="text-xs font-bold text-gray-900">
                      Full Name <span className="text-[#B3261E]">*</span>
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      name="name"
                      disabled
                      placeholder="e.g. Babatunde Adeleke"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-[10px] border border-[#8A8A8A] bg-[#F8F8F8] text-[#767676] cursor-not-allowed text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email-addr" className="text-xs font-bold text-gray-900">
                      Work / Personal Email <span className="text-[#B3261E]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email-addr"
                      name="email"
                      disabled
                      placeholder="adeleke@domain.com.ng"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-[10px] border border-[#8A8A8A] bg-[#F8F8F8] text-[#767676] cursor-not-allowed text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="phone-number" className="text-xs font-bold text-gray-900">
                      Phone Number <span className="text-[#B3261E]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone-number"
                      name="phone"
                      disabled
                      placeholder="+234 803 123 4567"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-[10px] border border-[#8A8A8A] bg-[#F8F8F8] text-[#767676] cursor-not-allowed text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="location" className="text-xs font-bold text-gray-900">
                      State / Deployment Location <span className="text-[#B3261E]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="location"
                        name="location"
                        disabled
                        className="w-full px-3.5 py-2.5 pr-10 min-h-[44px] rounded-[10px] border border-[#8A8A8A] bg-[#F8F8F8] text-[#767676] cursor-not-allowed text-sm focus:outline-none appearance-none"
                      >
                        <option>Select installation state</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="inquiry-type" className="text-xs font-bold text-gray-900">
                    Inquiry Type / Engineering Desk <span className="text-[#B3261E]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="inquiry-type"
                      name="inquiry_type"
                      disabled
                      className="w-full px-3.5 py-2.5 pr-10 min-h-[44px] rounded-[10px] border border-[#8A8A8A] bg-[#F8F8F8] text-[#767676] cursor-not-allowed text-sm focus:outline-none appearance-none"
                    >
                      <option>Select category...</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Capacity Chips */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-900">
                    Specific System Requirement / Estimated Capacity (Optional):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Residential 3kVA–5kVA", "Commercial 10kVA–50kVA", "Lithium Storage Upgrade", "Installer Certification"].map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1.5 rounded-[10px] text-xs font-medium bg-[#F8F8F8] text-[#767676] border border-[#D9D9D9] cursor-not-allowed"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="inquiry-message" className="text-xs font-bold text-gray-900">
                    Technical Specifications or Message Details <span className="text-[#B3261E]">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={4}
                    disabled
                    placeholder="Kindly describe your current grid stability, appliances to run (e.g. ACs, freezers, pumps), or relevant solar equipment model numbers..."
                    className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#8A8A8A] bg-[#F8F8F8] text-[#767676] cursor-not-allowed text-sm focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-[10px] text-sm font-bold bg-[#D9D9D9] text-[#767676] cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send message (Temporarily Disabled)
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-[16px] border border-[#D9D9D9] space-y-6">
              <h2 className="font-heading font-bold text-xl text-gray-950">
                Get in touch directly
              </h2>

              <div className="space-y-5 text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[10px] bg-[#E8F3DA] text-[#3F6B1A] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-950 block">Engineering Hotline</span>
                    <a href={`tel:${phone}`} className="text-[#3F6B1A] font-bold hover:underline block">
                      {phone}
                    </a>
                    <span className="text-[11px] text-[#767676]">Mon–Fri 8am–5pm WAT</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[10px] bg-[#E8F3DA] text-[#3F6B1A] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-950 block">WhatsApp Direct</span>
                    <span className="text-xs text-[#5C5C5C] block">Instant chat with an energy advisor</span>
                    <a
                      href="https://wa.me/2348135854054"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-1.5 text-xs font-bold text-[#3F6B1A] border border-[#D9D9D9] rounded-[10px] px-3 py-1.5 hover:bg-[#F4F9EC] transition"
                    >
                      Open WhatsApp Chat ↗
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-[10px] bg-[#E8F3DA] text-[#3F6B1A] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-950 block">Specialized Email Desks</span>
                    <div className="text-xs text-[#5C5C5C] space-y-0.5 mt-1">
                      <p><strong>General:</strong> {contactEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="p-4 rounded-[10px] bg-[#F4F9EC] border border-[#D2E8B5] text-xs text-[#333333] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#3F6B1A]" />
                    Operating Hours (West Africa Time)
                  </div>
                  <p><strong>Monday – Friday:</strong> 8:00 AM – 5:00 PM WAT</p>
                  <p><strong>Saturday:</strong> 9:00 AM – 2:00 PM WAT (Technical dispatch & walk-in audits only)</p>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white p-6 sm:p-8 rounded-[16px] border border-[#D9D9D9] space-y-5">
              <h2 className="font-heading font-bold text-lg text-gray-950">
                Operational Hubs & Walk-In Centers
              </h2>

              <div className="space-y-4">
                {[
                  {
                    name: "Port Harcourt Engineering Center",
                    address: "Plot 23 Birabi Street, GRA 1, Port Harcourt, Rivers State",
                    tag: "Head Office & Operations Hub",
                  },
                  {
                    name: "Lagos Central Hub",
                    address: "Servicing South-West residential and commercial accounts",
                    tag: "Regional Hub",
                  },
                  {
                    name: "Abuja Regulatory Liaison",
                    address: "Servicing FCT and Northern installation contracts",
                    tag: "Regional Branch",
                  },
                ].map((office) => (
                  <div key={office.name} className="flex items-start gap-3">
                    <div className="w-1 h-10 bg-[#7BB042] rounded-full shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm text-gray-950 block">{office.name}</span>
                      <span className="text-xs text-[#5C5C5C]">{office.address}</span>
                      {office.tag && (
                        <span className="block text-[10px] font-bold text-[#3F6B1A] bg-[#E8F3DA] px-2 py-0.5 rounded w-fit mt-1">
                          {office.tag}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Response Time Band ─────────────────────────────────── */}
      <section className="border-t border-[#D9D9D9] bg-[#F4F9EC]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#333333]">
            <Clock className="w-4 h-4 text-[#3F6B1A]" />
            <span>
              <strong>Response time commitment:</strong> within 24 business hours for general inquiries, 4 business hours for verified Buy Small maintenance requests (demo placeholders, pending Petfeb approval).
            </span>
          </div>
          <Link href="/track-order" className="text-xs font-bold text-[#3F6B1A] hover:underline shrink-0">
            Need urgent order tracking? Use our Guest Order & Agreement Lookup →
          </Link>
        </div>
      </section>
    </div>
  );
}
