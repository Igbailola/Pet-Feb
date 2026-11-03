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
  id: "projects";
  label: string;
  items: SubItem[];
}

const DROPDOWN_GROUPS: Record<string, DropdownGroup> = {
  projects: {
    id: "projects",
    label: "Our Projects",
    items: [
      { href: "/projects", label: "Our Projects" },
      { href: "/blog", label: "Blog" },
    ],
  },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"projects" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    projects: false,
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

  // Close desktop dropdown and mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }

  const toggleDropdown = (id: "projects") => {
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

  const cartAccessibleLabel = isHydrated && itemCount > 0
    ? `Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
    : "Shopping cart, empty";

  return (
    <header className="sticky top-0 z-40 bg-white rounded-bl-[24px] rounded-br-[24px] shadow-[0px_2px_22px_0px_rgba(45,45,45,0.10)] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[82px] sm:min-h-[102px] py-3 sm:py-[17px] gap-2 lg:gap-3">
          {/* ── Brand Logo ── */}
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

          {/* ── Desktop Navigation Links ── */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 px-1"
            aria-label="Main Navigation"
          >
            {/* 1. Home */}
            <Link
              href="/"
              className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
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
              className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                isLinkActive("/about")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              About Us
            </Link>

            {/* 3. Contact Us */}
            <Link
              href="/#contact"
              className="px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg text-[#A1A1A1] hover:text-gray-900 whitespace-nowrap"
            >
              Contact Us
            </Link>

            {/* 4. Our Projects Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("projects")}
                aria-expanded={openDropdown === "projects"}
                aria-haspopup="true"
                aria-label="Our Projects Menu"
                className={`inline-flex items-center gap-1 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7BB042] whitespace-nowrap ${
                  isProjectsGroupActive || openDropdown === "projects"
                    ? "text-[#70A03C] font-bold"
                    : "text-[#A1A1A1] hover:text-gray-900"
                }`}
              >
                <span>Our Projects</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-200 ${
                    openDropdown === "projects" ? "rotate-180 text-[#70A03C]" : "text-[#A1A1A1]"
                  }`}
                />
              </button>

              {openDropdown === "projects" && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-2 px-1 z-50 menu-panel-in"
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

            {/* 5. Marketplace */}
            <Link
              href="/shop"
              className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                isLinkActive("/shop")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              Marketplace
            </Link>

            {/* 6. Pet-Feb Buy Small Small */}
            <Link
              href="/buy-small"
              className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                isLinkActive("/buy-small")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              Pet-Feb Buy Small Small
            </Link>

            {/* 7. Request Installer */}
            <Link
              href="/installation"
              className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                isLinkActive("/installation")
                  ? "text-[#70A03C] font-bold"
                  : "text-[#A1A1A1] hover:text-gray-900"
              }`}
            >
              Request Installer
            </Link>
          </nav>

          {/* ── Right Action Area: Cart Control + Marketplace CTA ── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Standalone Circular Cart Control */}
            <Link
              href="/cart"
              className="relative w-12 h-12 xl:w-[50px] xl:h-[50px] rounded-full bg-[#F5B82E] hover:bg-[#e8ac25] active:scale-95 transition-all flex items-center justify-center text-black shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shrink-0 group"
              aria-label={cartAccessibleLabel}
            >
              <ShoppingCart className="w-5 h-5 text-black shrink-0 transition-transform duration-200 group-hover:scale-105" />
              {isHydrated && itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[#F5B82E] text-black text-[10px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-xs border border-white pointer-events-none z-10"
                  aria-hidden="true"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Prominent Marketplace CTA Button */}
            <Link
              href="/shop"
              className="w-[160px] xl:w-[184px] h-[48px] xl:h-[52px] inline-flex items-center justify-center rounded-[12px] bg-[#7BB042] text-[#F2F7EC] font-bold text-sm xl:text-base hover:bg-[#6EA138] transition-colors shadow-2xs shrink-0 focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:ring-offset-2"
            >
              Marketplace
            </Link>
          </div>

          {/* ── Mobile and Tablet Controls (<1024px) ── */}
          <div className="flex lg:hidden items-center gap-2.5">
            {/* Mobile Standalone Circular Cart Shortcut */}
            <Link
              href="/cart"
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5B82E] hover:bg-[#e8ac25] active:scale-95 transition-all flex items-center justify-center text-black shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shrink-0"
              aria-label={cartAccessibleLabel}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
              {isHydrated && itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[#F5B82E] text-black text-[9px] font-bold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center shadow-xs border border-white pointer-events-none z-10"
                  aria-hidden="true"
                >
                  {itemCount > 99 ? "99+" : itemCount}
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
        <div className="menu-panel-in lg:hidden border-t border-gray-100 bg-white rounded-b-[24px] shadow-xl max-h-[calc(100dvh-90px)] overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 pt-4 pb-6 space-y-5">
            {/* Primary navigation */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between min-h-[48px] px-4 rounded-[14px] text-base font-medium transition ${
                    isLinkActive(item.href)
                      ? "text-[#3F6B1A] font-bold bg-[#F2F7EC]"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.label}</span>
                  {isLinkActive(item.href) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" aria-hidden="true" />
                  )}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[48px] px-4 rounded-[14px] text-base font-medium transition text-gray-800 hover:bg-gray-50"
              >
                Contact Us
              </Link>

              {/* Accordion: Our Projects */}
              <div className="rounded-[14px] transition-colors">
                <button
                  type="button"
                  onClick={() => toggleMobileGroup("projects")}
                  className="w-full flex items-center justify-between gap-3 min-h-[48px] px-4 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-[14px] cursor-pointer"
                  aria-expanded={!!mobileExpanded["projects"]}
                >
                  <span className={isProjectsGroupActive ? "text-[#3F6B1A] font-bold" : ""}>Our Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      mobileExpanded["projects"] ? "rotate-180 text-[#70A03C]" : "text-gray-500"
                    }`}
                  />
                </button>

                {mobileExpanded["projects"] && (
                  <div className="pl-4 pr-2 pb-2 flex flex-col gap-1">
                    {DROPDOWN_GROUPS.projects.items.map((sub) => {
                      const active = isLinkActive(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center min-h-[44px] px-4 rounded-[10px] text-sm transition ${
                            active
                              ? "text-[#3F6B1A] font-bold bg-[#F2F7EC]"
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

              {/* Standalone: Marketplace */}
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between min-h-[48px] px-4 rounded-[14px] text-base font-medium transition ${
                  isLinkActive("/shop")
                    ? "text-[#3F6B1A] font-bold bg-[#F2F7EC]"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>Marketplace</span>
                {isLinkActive("/shop") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" aria-hidden="true" />
                )}
              </Link>

              {/* Standalone: Pet-Feb Buy Small Small */}
              <Link
                href="/buy-small"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between min-h-[48px] px-4 rounded-[14px] text-base font-medium transition ${
                  isLinkActive("/buy-small")
                    ? "text-[#3F6B1A] font-bold bg-[#F2F7EC]"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>Pet-Feb Buy Small Small</span>
                {isLinkActive("/buy-small") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" aria-hidden="true" />
                )}
              </Link>

              {/* Standalone: Request Installer */}
              <Link
                href="/installation"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between min-h-[48px] px-4 rounded-[14px] text-base font-medium transition ${
                  isLinkActive("/installation")
                    ? "text-[#3F6B1A] font-bold bg-[#F2F7EC]"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>Request Installer</span>
                {isLinkActive("/installation") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042]" aria-hidden="true" />
                )}
              </Link>
            </nav>

            {/* Secondary links */}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-4 pb-1">
                More Services
              </span>
              <Link
                href="/training"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[44px] px-4 rounded-[10px] text-sm text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition"
              >
                Training Program
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between min-h-[44px] px-4 rounded-[10px] text-sm text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition"
              >
                <span>Shopping Cart</span>
                {isHydrated && itemCount > 0 && (
                  <span className="bg-[#7BB042] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {itemCount} items
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile CTA: Marketplace */}
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center min-h-[52px] rounded-[12px] bg-[#7BB042] text-white font-bold text-base hover:bg-[#6EA138] transition shadow-xs text-center"
            >
              Marketplace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
