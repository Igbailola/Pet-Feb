import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export async function Footer() {
  const [contactEmail, contactPhone] = await Promise.all([
    getSiteContent("footer.contact_email", "Info@petfeb.com"),
    getSiteContent("footer.contact_phone", "+ 234 813-585-4054"),
  ]);

  return (
    <footer className="bg-[#282828] text-white pt-16 pb-8 relative overflow-hidden border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* Main 3-Column Footer Grid matching Figma frame 4144:1924 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12">
          {/* Column 1: Brand & Newsletter (Figma Frame 40) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center shrink-0 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/logo"
                  alt="Pet-Feb Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white block leading-none">
                  Pet-Feb
                </span>
                <span className="text-xs text-gray-300 font-medium block">
                  Building your visions, Creating reality
                </span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2 space-y-3 max-w-md">
              <h3 className="font-heading font-bold text-sm text-white">
                Subscribe to Stay Updated!
              </h3>
              <form onSubmit={undefined} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email Address:"
                  className="w-full bg-white text-gray-900 placeholder-gray-400 text-xs sm:text-sm px-4 py-3.5 pr-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#7BB042] text-white rounded-lg hover:bg-[#6EA138] transition flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Navigation Links (Figma Frame 37) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white">
              Social links
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#7BB042] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#7BB042] transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#7BB042] transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7BB042] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#7BB042] transition">
                  Product Listing Page
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#7BB042] transition">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/buy-small" className="hover:text-[#7BB042] transition">
                  Buy Small Financing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information & Contact Details (Figma Frame 41) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white">
              Information
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>
                  Plot 23 Binabi Street GRA 1, Port Harcourt Rivers State, 840100 , NG
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#7BB042] shrink-0" />
                <a href="tel:+2348135854054" className="hover:text-white transition">
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#7BB042] shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span className="hover:text-white transition">
                  petfeb.com
                </span>
              </li>
            </ul>

            {/* Social Media Icons row matching Figma Frame 48 */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs text-gray-400 font-medium">Social links:</span>
              <div className="flex items-center gap-3">
                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Twitter"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white text-xs font-bold"
                >
                  𝕏
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white text-xs"
                >
                  <span className="font-semibold text-[10px]">IG</span>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#7BB042] flex items-center justify-center transition text-white text-xs font-bold"
                >
                  f
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Decorative Watermark Motto matching Figma node 4144:1923 */}
        <div className="pt-8 pb-4 border-t border-gray-800/80 text-center select-none pointer-events-none">
          <p className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-widest text-[#383838] uppercase">
            BUILDING YOUR VISIONS, CREATING REALITY
          </p>
        </div>

        {/* Copyright strip matching Figma Frame 45 */}
        <div className="pt-6 border-t border-gray-800 text-center text-xs text-gray-400">
          <p>Pet-Feb solar solution © 2025 pet-feb - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
