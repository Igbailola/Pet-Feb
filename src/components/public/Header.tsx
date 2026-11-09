"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface NavItem {
  href: string;
  label: string;
}

const PRIMARY_NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/buy-small", label: "Buy Small" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }

  // Route active helper
  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const cartAccessibleLabel = isHydrated && itemCount > 0
    ? `Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
    : "Shopping cart, empty";

  return (
    <header className="sticky top-0 z-40 bg-white rounded-bl-[24px] rounded-br-[24px] shadow-[0px_2px_22px_0px_rgba(45,45,45,0.08)] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[78px] sm:min-h-[88px] py-2.5 sm:py-3 gap-2 lg:gap-3">
          {/* ── Brand Logo ── */}
          <Link
            href="/"
            className="w-[48px] h-[48px] sm:w-[58px] sm:h-[58px] rounded-[13px] border border-[#D6E7C4] p-1.5 sm:p-2 flex items-center justify-center bg-white shrink-0 hover:border-[#7BB042] transition-colors shadow-2xs outline-none focus:ring-2 focus:ring-[#7BB042]"
            aria-label="Pet-Feb Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/logo"
              alt="Pet-Feb Logo"
              className="max-h-full max-w-full object-contain"
            />
          </Link>

          {/* ── Desktop Primary Navigation (9 Clean Links) ── */}
          <nav
            ref={navRef}
            className="hidden xl:flex items-center gap-1 2xl:gap-2 px-1"
            aria-label="Main Navigation"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-2 text-[13px] 2xl:text-[14px] font-medium transition-colors rounded-lg whitespace-nowrap ${
                    active
                      ? "text-[#3F6B1A] font-bold bg-[#E8F3DA]/60"
                      : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Nav for Large Screens (1024px – 1279px) Compact view ── */}
          <nav
            className="hidden lg:flex xl:hidden items-center gap-0.5 px-0.5 text-xs font-medium"
            aria-label="Main Navigation Tablet"
          >
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop" },
              { href: "/buy-small", label: "Buy Small" },
              { href: "/projects", label: "Projects" },
              { href: "/training", label: "Training" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/support", label: "Support" },
              { href: "/contact", label: "Contact" },
            ].map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    active
                      ? "text-[#3F6B1A] font-bold bg-[#E8F3DA]/60"
                      : "text-gray-600 hover:text-gray-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Action Area: Cart Icon + Get a Quote Primary CTA ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Standalone Accessible Circular Cart Control */}
            <Link
              href="/cart"
              className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#F5B82E] hover:bg-[#e2a220] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center text-black shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shrink-0 group cursor-pointer"
              aria-label={cartAccessibleLabel}
              title="Shopping Cart"
            >
              <span className="relative inline-flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-black shrink-0 transition-transform duration-200 group-hover:scale-110" />
                {isHydrated && itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs border border-white pointer-events-none z-10 leading-none"
                    aria-hidden="true"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </span>
            </Link>

            {/* Primary Navigation CTA: Get a Quote */}
            <Link
              href="/installation"
              className="min-w-[136px] xl:min-w-[148px] h-[46px] xl:h-[48px] px-4 inline-flex items-center justify-center rounded-[12px] bg-[#7BB042] text-white font-heading font-bold text-xs xl:text-sm hover:bg-[#6EA138] transition-colors shadow-xs shrink-0 focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:ring-offset-2"
            >
              Get a Quote
            </Link>
          </div>

          {/* ── Mobile and Tablet Controls (<1024px) ── */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Standalone Circular Cart Shortcut */}
            <Link
              href="/cart"
              className="w-10 h-10 rounded-full bg-[#F5B82E] hover:bg-[#e2a220] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center text-black shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shrink-0 cursor-pointer"
              aria-label={cartAccessibleLabel}
              title="Shopping Cart"
            >
              <span className="relative inline-flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-black shrink-0" />
                {isHydrated && itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center shadow-xs border border-white pointer-events-none z-10 leading-none"
                    aria-hidden="true"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile & Tablet Drawer ── */}
      {mobileMenuOpen && (
        <div className="menu-panel-in lg:hidden border-t border-gray-100 bg-white rounded-b-[24px] shadow-xl max-h-[calc(100dvh-84px)] overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 pt-3 pb-6 space-y-4">
            {/* Primary navigation list */}
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between min-h-[46px] px-3.5 rounded-[12px] text-sm sm:text-base font-medium transition ${
                      active
                        ? "text-[#3F6B1A] font-bold bg-[#E8F3DA]/70"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Prominent Mobile CTA: Get a Quote */}
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/installation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[50px] rounded-[12px] bg-[#7BB042] text-white font-heading font-bold text-sm sm:text-base hover:bg-[#6EA138] transition shadow-xs text-center"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
