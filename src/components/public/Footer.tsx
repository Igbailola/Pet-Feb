import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/public-data";

export async function Footer() {
  const contactEmail = await getSiteContent("footer.contact_email", "info@petfeb.com");

  return (
    <footer className="bg-[#1F3A0B] text-white pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Top Brand Banner with Official Slogan */}
        <div className="pb-10 mb-10 border-b border-emerald-800/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/logo"
              alt="Pet-Feb Logo"
              className="h-12 w-auto object-contain rounded-md bg-white/10 p-1"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white leading-none">
                PET-FEB
              </span>
              <span className="text-[11px] tracking-widest text-[#7BB042] font-bold uppercase mt-1">
                SOLAR SYSTEMS
              </span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs uppercase tracking-widest text-[#7BB042] font-semibold block">
              Corporate Motto
            </span>
            <p className="font-heading font-bold text-lg text-white tracking-wide mt-0.5">
              BUILDING YOUR VISIONS, CREATING REALITY
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-emerald-800/60">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#7BB042]">
              About Pet-Feb
            </h2>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              Pet-Feb International Company Limited is a trusted solar energy engineering firm in Nigeria, dedicated to delivering dependable and sustainable power solutions for residential, commercial, and community installations.
            </p>
          </div>

          {/* Core Operations & Services */}
          <div>
            <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#7BB042] mb-4">
              Services & Plans
            </h2>
            <ul className="space-y-2.5 text-sm text-emerald-100/90">
              <li>
                <Link
                  href="/buy-small"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Buy Small Financing
                </Link>
              </li>
              <li>
                <Link
                  href="/installation"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Installation Services
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Insights & Legal */}
          <div>
            <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#7BB042] mb-4">
              Journal & Policies
            </h2>
            <ul className="space-y-2.5 text-sm text-emerald-100/90">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Journal & Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#7BB042] group-hover:translate-x-0.5 transition-transform" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details from Design Inspiration */}
          <div>
            <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#7BB042] mb-4">
              Information & Offices
            </h2>
            <ul className="space-y-3 text-sm text-emerald-100/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                <span>
                  Plot 23 Birabi Street, GRA 1, Port Harcourt, Rivers State, 840100, NG
                  <span className="block text-xs text-emerald-300/80 mt-0.5">
                    Operational hubs: Lagos & Abuja
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7BB042] shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7BB042] shrink-0" />
                <a href="tel:+2348135854054" className="hover:text-white transition">
                  +234 813-585-4054
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <p>© 2026 Pet-Feb International Company Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-100 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-emerald-100 transition">
              Terms
            </Link>
            <Link href="/staff/login" className="hover:text-emerald-100 transition text-emerald-300/80">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
