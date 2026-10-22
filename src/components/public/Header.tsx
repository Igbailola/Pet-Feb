"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface SubItem {
  href: string;
  label: string;
}

interface DropdownGroup {
  id: "projects" | "buy-small";
  label: string;
  items: SubItem[];
}

const DROPDOWN_GROUPS: Record<string, DropdownGroup> = {
  projects: {
    id: "projects",
    label: "Our Project",
    items: [
      { href: "/projects", label: "Our Project" },
      { href: "/blog", label: "Blog" },
    ],
  },
  "buy-small": {
    id: "buy-small",
    label: "Buy Small",
    items: [
      { href: "/buy-small", label: "Buy Small" },
      { href: "/installation", label: "Request Installer" },
    ],
  },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"projects" | "buy-small" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    projects: false,
    "buy-small": false,
  });

  const pathname = usePathname();
  const { itemCount, isHydrated } = useCart();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close desktop dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (id: "projects" | "buy-small") => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const toggleMobileGroup = (id: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Route active helpers
  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isProjectsGroupActive =
    pathname.startsWith("/projects") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/project-blog");

  const isBuySmallGroupActive =
    pathname.startsWith("/buy-small") ||
    pathname.startsWith("/installation");

  return (
    <header className="sticky top-0 z-40 bg-white rounded-bl-[24px] rounded-br-[24px] shadow-[0px_2px_22px_0px_rgba(45,45,45,0.10)] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px]">
        <div className="flex items-center justify-between min-h-[82px] sm:min-h-[102px] py-3 sm:py-[17px]">
          {/* ── Brand Logo: Standalone 68px × 68px square card (Figma node 4144:1456) ── */}
          <Link
            href="/"
            className="w-[52px] h-[52px] sm:w-[68px] sm:h-[68px] rounded-[13px] border border-[#D6E7C4] p-2 flex items-center justify-center bg-white shrink-0 hover:border-[#7BB042] transition-colors shadow-2xs outline-none focus:ring-2 focus:ring-[#7BB042]"
            aria-label="Pet-Feb Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/logo"
              alt="Pet-Feb Logo"
              className="max-h-full max-w-full object-contain"
            />
          </Link>

          {/* ── Desktop Navigation Links (Figma node 4144:1457 + Dropdowns) ── */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-2"
            aria-label="Main Navigation"
          >
            {/* 1. Home */}
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                isLinkActive("/")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            {/* 2. About Us */}
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                isLinkActive("/about")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              About Us
            </Link>

            {/* 3. Our Project Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("projects")}
                aria-expanded={openDropdown === "projects"}
                aria-haspopup="true"
                aria-label="Our Project Menu"
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] ${
                  isProjectsGroupActive || openDropdown === "projects"
                    ? "text-[#70A03C] font-bold"
                    : "text-[#A1A1A1] hover:text-gray-900"
                }`}
              >
                <span>Our Project</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "projects" ? "rotate-180 text-[#70A03C]" : "text-[#A1A1A1]"
                  }`}
                />
              </button>

              {openDropdown === "projects" && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-2 px-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {DROPDOWN_GROUPS.projects.items.map((sub) => {
                    const active = isLinkActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                          active
                            ? "text-[#70A03C] bg-emerald-50/80 font-bold"
                            : "text-gray-700 hover:text-[#70A03C] hover:bg-gray-50 font-medium"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Buy Small Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("buy-small")}
                aria-expanded={openDropdown === "buy-small"}
                aria-haspopup="true"
                aria-label="Buy Small Menu"
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] ${
                  isBuySmallGroupActive || openDropdown === "buy-small"
                    ? "text-[#70A03C] font-bold"
                    : "text-[#A1A1A1] hover:text-gray-900"
                }`}
              >
                <span>Buy Small</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "buy-small" ? "rotate-180 text-[#70A03C]" : "text-[#A1A1A1]"
                  }`}
                />
              </button>

              {openDropdown === "buy-small" && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-2 px-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {DROPDOWN_GROUPS["buy-small"].items.map((sub) => {
                    const active = isLinkActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                          active
                            ? "text-[#70A03C] bg-emerald-50/80 font-bold"
                            : "text-gray-700 hover:text-[#70A03C] hover:bg-gray-50 font-medium"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 5. Contact Us */}
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                isLinkActive("/contact")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              Contact Us
            </Link>

            {/* 6. Pet-Feb Product - Shop with Inline Gold Cart Icon */}
            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                isLinkActive("/shop")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              <span>Pet-Feb Product - Shop</span>
              <span className="relative inline-flex items-center ml-0.5">
                <ShoppingCart className="w-[17px] h-[16px] text-[#F5B82E] shrink-0" />
                {isHydrated && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </span>
            </Link>
          </nav>

          {/* ── Right Action CTA: Market Place (Figma node 4144:1471) ── */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/buy-small"
              className="w-[180px] xl:w-[200px] h-[52px] inline-flex items-center justify-center rounded-[12px] bg-[#7BB042] text-[#F2F7EC] font-bold text-[16px] hover:bg-[#6EA138] transition-colors shadow-2xs shrink-0 focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:ring-offset-2"
            >
              Market Place
            </Link>
          </div>

          {/* ── Mobile and Tablet Controls (<1024px) ── */}
          <div className="flex lg:hidden items-center gap-2.5">
            {/* Mobile Cart Shortcut */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              aria-label={`View shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-gray-800" />
              {isHydrated && itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
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
        <div className="lg:hidden border-t border-gray-100 bg-white px-5 pt-3 pb-6 rounded-b-[24px] shadow-xl space-y-4">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-medium transition ${
                isLinkActive("/")
                  ? "text-[#70A03C] font-bold bg-emerald-50/60"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-medium transition ${
                isLinkActive("/about")
                  ? "text-[#70A03C] font-bold bg-emerald-50/60"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              About Us
            </Link>

            {/* Our Project Mobile Dropdown Accordion */}
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileGroup("projects")}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-gray-800 bg-gray-50/50 hover:bg-gray-100/50 transition cursor-pointer"
                aria-expanded={mobileExpanded.projects}
              >
                <span className={isProjectsGroupActive ? "text-[#70A03C] font-bold" : ""}>
                  Our Project
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded.projects ? "rotate-180 text-[#70A03C]" : "text-gray-500"
                  }`}
                />
              </button>

              {mobileExpanded.projects && (
                <div className="bg-white py-1.5 px-2 space-y-1 border-t border-gray-100">
                  {DROPDOWN_GROUPS.projects.items.map((sub) => {
                    const active = isLinkActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-sm transition ${
                          active
                            ? "text-[#70A03C] font-bold bg-emerald-50"
                            : "text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Buy Small Mobile Dropdown Accordion */}
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileGroup("buy-small")}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-gray-800 bg-gray-50/50 hover:bg-gray-100/50 transition cursor-pointer"
                aria-expanded={mobileExpanded["buy-small"]}
              >
                <span className={isBuySmallGroupActive ? "text-[#70A03C] font-bold" : ""}>
                  Buy Small
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded["buy-small"] ? "rotate-180 text-[#70A03C]" : "text-gray-500"
                  }`}
                />
              </button>

              {mobileExpanded["buy-small"] && (
                <div className="bg-white py-1.5 px-2 space-y-1 border-t border-gray-100">
                  {DROPDOWN_GROUPS["buy-small"].items.map((sub) => {
                    const active = isLinkActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-sm transition ${
                          active
                            ? "text-[#70A03C] font-bold bg-emerald-50"
                            : "text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-medium"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact Us */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-medium transition ${
                isLinkActive("/contact")
                  ? "text-[#70A03C] font-bold bg-emerald-50/60"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Contact Us
            </Link>

            {/* Pet-Feb Product - Shop */}
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition ${
                isLinkActive("/shop")
                  ? "text-[#70A03C] font-bold bg-emerald-50/60"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>Pet-Feb Product - Shop</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#F5B82E]">
                <ShoppingCart className="w-4 h-4" />
                {isHydrated && itemCount > 0 && (
                  <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {itemCount}
                  </span>
                )}
              </span>
            </Link>
          </nav>

          {/* Secondary Mobile Links: Training & Cart */}
          <div className="pt-3 border-t border-gray-100 flex flex-col space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 pb-1">
              More Services
            </span>
            <Link
              href="/training"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition"
            >
              <span>Training Program</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition"
            >
              <span>Shopping Cart</span>
              {isHydrated && itemCount > 0 && (
                <span className="bg-[#7BB042] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {itemCount} items
                </span>
              )}
            </Link>
          </div>

          {/* Mobile CTA: Market Place */}
          <div className="pt-2">
            <Link
              href="/buy-small"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3.5 rounded-[12px] bg-[#7BB042] text-[#F2F7EC] font-bold text-sm hover:bg-[#6EA138] transition shadow-xs text-center"
            >
              Market Place
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
