import Link from "next/link";
import { Mail, PhoneCall, MapPin, ArrowRight, Check } from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export async function Footer() {
  const [contactEmail, contactPhone] = await Promise.all([
    getSiteContent("footer.contact_email", "Info@petfeb.com"),
    getSiteContent("footer.contact_phone", "+234 813 585 4054"),
  ]);

  return (
    <footer className="w-full bg-[#F8F9FA] pb-10 sm:pb-14 pt-4 sm:pt-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px]">
        {/* Black Rounded Container matching Figma node 6139:3222 */}
        <div className="bg-black text-white relative rounded-[32px] overflow-hidden p-8 sm:p-12 lg:p-14 shadow-2xl">
          {/* Main 5-Column Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 relative z-10">
            {/* Column 1: Brand Logo, Tagline & Newsletter (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Logo & Tagline */}
              <div className="flex items-center gap-4">
                <div className="w-[64px] h-[64px] rounded-[13px] border-[0.5px] border-[#D6E7C4] bg-white p-2.5 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/api/logo"
                    alt="Pet-Feb Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <h2 className="font-heading font-bold text-[24px] sm:text-[26px] text-white leading-tight tracking-tight">
                    Pet-Feb Solar
                  </h2>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#D1D5DB] leading-snug">
                    Building your visions, Creating reality
                  </p>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="space-y-2.5 max-w-[380px]">
                <h3 className="font-sans font-medium text-[16px] text-[#E8E8E8] leading-tight">
                  Subscribe to Stay Updated!
                </h3>
                <form onSubmit={undefined} className="bg-white rounded-[12px] h-[52px] w-full flex items-center justify-between pl-4 pr-1.5 shadow-sm">
                  <input
                    type="email"
                    placeholder="Email Address:"
                    className="w-full bg-transparent text-[#333333] placeholder-[#6B7280] text-[14px] font-sans focus:outline-none pr-3"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-[#7BB042] text-white rounded-[10px] px-3.5 py-2 hover:bg-[#6AA035] transition-all flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7BB042] shrink-0 stroke-[3]" />
                <h3 className="font-heading font-bold text-[17px] text-[#E8E8E8] whitespace-nowrap">
                  Quick Links
                </h3>
              </div>
              <ul className="space-y-2.5 font-sans text-[14px] text-[#D1D5DB]">
                <li>
                  <Link href="/" className="hover:text-[#7BB042] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#7BB042] transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-[#7BB042] transition">
                    Our Projects
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-[#7BB042] transition">
                    Training Academy
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#7BB042] transition">
                    Blog &amp; Insights
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#7BB042] transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Products & Financing (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7BB042] shrink-0 stroke-[3]" />
                <h3 className="font-heading font-bold text-[17px] text-[#E8E8E8] whitespace-nowrap">
                  Products
                </h3>
              </div>
              <ul className="space-y-2.5 font-sans text-[14px] text-[#D1D5DB]">
                <li>
                  <Link href="/shop" className="hover:text-[#7BB042] transition">
                    Shop Solar Kits
                  </Link>
                </li>
                <li>
                  <Link href="/buy-small" className="hover:text-[#7BB042] transition">
                    Buy Small Financing
                  </Link>
                </li>
                <li>
                  <Link href="/installation" className="hover:text-[#7BB042] transition">
                    Request an Installer
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=inverters" className="hover:text-[#7BB042] transition">
                    Hybrid Inverters
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=batteries" className="hover:text-[#7BB042] transition">
                    Lithium Storage
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Customer Support (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7BB042] shrink-0 stroke-[3]" />
                <h3 className="font-heading font-bold text-[17px] text-[#E8E8E8] whitespace-nowrap">
                  Customer Support
                </h3>
              </div>
              <ul className="space-y-2.5 font-sans text-[14px] text-[#D1D5DB]">
                <li>
                  <Link href="/support" className="hover:text-[#7BB042] transition">
                    Help Center &amp; Support
                  </Link>
                </li>
                <li>
                  <Link href="/support#faqs" className="hover:text-[#7BB042] transition">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-[#7BB042] transition">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/installation" className="hover:text-[#7BB042] transition">
                    Delivery &amp; Installation
                  </Link>
                </li>
                <li>
                  <Link href="/support#faqs" className="hover:text-[#7BB042] transition">
                    Warranty Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Contact & Office Locations (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7BB042] shrink-0 stroke-[3]" />
                <h3 className="font-heading font-bold text-[17px] text-[#E8E8E8] whitespace-nowrap">
                  Contact
                </h3>
              </div>
              <div className="space-y-3 font-sans text-[13px] text-[#D1D5DB]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <p className="font-semibold text-white">Port Harcourt (HQ)</p>
                    <p className="text-[#9CA3AF]">Plot 23 Binabi St, GRA 1</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <p className="font-semibold text-white">Abuja &amp; Lagos Desks</p>
                    <p className="text-[#9CA3AF]">Nationwide Operations</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <PhoneCall className="w-4 h-4 text-[#7BB042] shrink-0" />
                  <a href="tel:+2348135854054" className="hover:text-white transition">
                    {contactPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#7BB042] shrink-0" />
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition">
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social links row matching Figma node 6139:3271 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 pt-4 border-t border-white/10 relative z-10 text-xs text-[#9CA3AF]">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms and Conditions
              </Link>
              <Link href="/support#faqs" className="hover:text-white transition">
                Delivery &amp; Returns
              </Link>
              <Link href="/buy-small" className="hover:text-white transition">
                Buy Small Terms
              </Link>
            </div>

            {/* Social Icons with Verified Brand URLs */}
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#E8E8E8] mr-1">
                Follow Us:
              </span>

              {/* X / Twitter */}
              <a
                href="https://x.com/petfeb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pet-Feb on X (formerly Twitter)"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/petfeb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pet-Feb on Instagram"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/petfeb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pet-Feb on Facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/petfeb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pet-Feb on LinkedIn"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.25c-.94 0-1.7.76-1.7 1.7s.76 1.7 1.7 1.7 1.7-.76 1.7-1.7-.76-1.7-1.7-1.7Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Large Decorative Watermark Motto matching Figma node 6139:3223 */}
          <div className="py-6 sm:py-8 text-center select-none pointer-events-none relative z-10">
            <p
              className="font-heading font-bold text-[24px] sm:text-[38px] lg:text-[48px] uppercase tracking-[1.5px] text-white opacity-20 leading-tight"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              Building your visions, Creating reality
            </p>
          </div>

          {/* Copyright Bar matching Figma node 6139:3265 */}
          <div className="border-t border-[#EBEBEB]/30 pt-4 text-center text-xs text-[#D1D5DB] flex flex-wrap items-center justify-center gap-1.5 relative z-10">
            <span>Pet-Feb Solar Solution</span>
            <span className="flex items-center gap-1">
              <span>©</span>
              <span>2026 Pet-Feb - All Rights Reserved.</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
