"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/buy-small", label: "Buy Small" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Top Trust Strip (Deep Green #1F3A0B) ──────────────── */}
      <div className="bg-[#1F3A0B] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide border-b border-emerald-950/40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <span>Free site assessment</span>
          <span className="opacity-40">•</span>
          <span>Certified installers</span>
          <span className="opacity-40">•</span>
          <span>Pay in installments with Buy Small</span>
          <span className="hidden md:inline opacity-70 text-[10px]">(demo placeholders, pending Petfeb approval)</span>
        </div>
      </div>

      {/* ── Main Sticky Header (72px) ─────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 outline-none focus:outline-none select-none py-1"
              aria-label="Petfeb Solar Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/logo"
                alt="Pet-Feb Solar Logo"
                className="h-10 sm:h-11 w-auto object-contain rounded-md"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-gray-950 leading-none">
                  PET-FEB
                </span>
                <span className="text-[9px] tracking-wider text-[#3F6B1A] font-bold uppercase mt-0.5">
                  SOLAR SYSTEMS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-[#3F6B1A] bg-emerald-50/80 font-bold"
                        : "text-gray-700 hover:text-gray-950 hover:bg-gray-100/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Search link to Shop */}
              <Link
                href="/shop"
                className="p-2.5 rounded-lg text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-colors"
                aria-label="Search solar products"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Cart link with black badge (white text per amber rule) */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-lg text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-colors"
                aria-label={`View shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isHydrated && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Amber Action Button (One amber element per viewport region) */}
              <Link
                href="/installation"
                className="inline-flex items-center justify-center px-4 py-2 rounded-[10px] text-sm font-bold bg-[#F5B82E] text-black hover:bg-[#e6ab27] transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#F5B82E] focus:ring-offset-2 min-h-[44px]"
              >
                Request installation
              </Link>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="flex sm:hidden items-center gap-1.5">
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-11 h-11 rounded-xl text-gray-700 hover:bg-gray-100 transition"
                aria-label={`View shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isHydrated && itemCount > 0 && (
                  <span className="absolute top-2 right-2 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center w-11 h-11 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                      active
                        ? "text-[#3F6B1A] bg-emerald-50 font-bold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/installation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-[10px] text-sm font-bold bg-[#F5B82E] text-black hover:bg-[#e6ab27] transition text-center shadow-xs min-h-[44px]"
              >
                Request installation
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
