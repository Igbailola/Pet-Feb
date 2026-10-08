"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/projects", label: "Our Projects" },
  { href: "/shop", label: "Shop" },
  { href: "/training", label: "Training" },
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo using authentic Logo.jpg */}
          <Link
            href="/"
            className="flex items-center gap-3 outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 focus-visible:outline-none select-none py-1"
            aria-label="Petfeb Solar Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/logo"
              alt="Pet-Feb Solar Logo"
              className="h-10 sm:h-11 w-auto object-contain rounded-md outline-none select-none"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-gray-950 leading-none">
                PET-FEB
              </span>
              <span className="text-[9px] tracking-wider text-[#3F6B1A] font-semibold uppercase mt-0.5">
                BUILDING YOUR VISIONS, CREATING REALITY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Exactly 6 links) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-[#3F6B1A] bg-emerald-50/70 font-semibold"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart link with badge */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label={`View shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {isHydrated && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F5B82E] text-gray-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Amber Action Button (Maximum one amber accent per viewport region) */}
            <Link
              href="/installation"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#F5B82E] text-gray-950 hover:bg-[#e6ab27] transition shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5B82E] focus:ring-offset-2"
            >
              Request Installation
            </Link>
          </div>

          {/* Mobile Menu & Cart Buttons (min 44x44px touch targets) */}
          <div className="flex md:hidden items-center gap-1.5">
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-gray-700 hover:bg-gray-100 transition"
              aria-label={`View shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {isHydrated && itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#F5B82E] text-gray-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition cursor-pointer"
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
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                    active
                      ? "text-[#3F6B1A] bg-emerald-50 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              href="/installation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold bg-[#F5B82E] text-gray-950 hover:bg-[#e6ab27] transition text-center shadow-sm"
            >
              Request Installation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
