"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Phone,
  HardHat,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/public-types";

interface BOSProduct {
  id: string;
  name: string;
  category: string;
  specs: string;
  price: number;
  imageUrl?: string;
}

const RECOMMENDED_BOS: BOSProduct[] = [
  {
    id: "bos-spd-100a",
    name: "100A DC Circuit Breaker & Surge Protection Device (SPD)",
    category: "PROTECTION COMPONENT",
    specs: "1000V DC · Type II SPD · Fast Din-Rail Mount",
    price: 45000,
    imageUrl: "/api/websitepic/battery",
  },
  {
    id: "bos-dc-cable-16mm",
    name: "16mm² Double-Insulated Pure Copper Solar DC Cable (25m Roll)",
    category: "BOS WIRING",
    specs: "TUV Certified · Flame Retardant · Dual Shield",
    price: 68000,
    imageUrl: "/api/websitepic/commercial",
  },
  {
    id: "bos-rail-aluminum",
    name: "Heavy-Duty Galvanized Aluminum Rooftop Rail Mounting Kit",
    category: "ROOFTOP RACKING",
    specs: "Corrosion-Proof · 4-Panel Set · Wind-Tested",
    price: 95000,
    imageUrl: "/api/websitepic/panels",
  },
];

const DELIVERY_OPTIONS = [
  {
    id: "lagos",
    label: "Lagos Hub (Free pickup or ₦25,000 Express Doorstep Delivery)",
    fee: 25000,
    name: "Lagos Hub Express",
  },
  {
    id: "abuja",
    label: "Abuja Hub (Free pickup or ₦35,000 Express Doorstep Delivery)",
    fee: 35000,
    name: "Abuja Hub Express",
  },
  {
    id: "ph",
    label: "Port Harcourt Central (₦45,000 Freight Dispatch)",
    fee: 45000,
    name: "Port Harcourt Freight",
  },
  {
    id: "pickup",
    label: "Central Engineering Warehouse (Free Self-Pickup)",
    fee: 0,
    name: "Warehouse Depot Pickup",
  },
];

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    addItem,
    itemCount,
    subtotal,
    vat,
    isHydrated,
  } = useCart();

  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_OPTIONS[0]);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const INSTALLATION_FEE = 120000;
  const installationTotal = includeInstallation ? INSTALLATION_FEE : 0;
  const finalPayable = subtotal + vat + selectedDelivery.fee + installationTotal;
  const weeklyInstallment = Math.round((subtotal * 0.7) / 52);

  // Sync choices to localStorage for Checkout page pickup
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "petfeb_cart_preferences",
          JSON.stringify({
            deliveryLocation: selectedDelivery.id,
            deliveryFee: selectedDelivery.fee,
            deliveryName: selectedDelivery.name,
            includeInstallation,
            installationFee: installationTotal,
          })
        );
      } catch {}
    }
  }, [selectedDelivery, includeInstallation, installationTotal]);

  const handleAddBOS = (product: BOSProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.id,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      specsSummary: product.specs,
    });
    setAddedItemNotice(product.name);
    setTimeout(() => setAddedItemNotice(null), 3000);
  };

  if (!isHydrated) {
    return (
      <div className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 text-center text-gray-500 font-sans">
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 md:py-28 px-4 sm:px-8 lg:px-10 max-w-2xl mx-auto text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center mx-auto border border-emerald-100">
          <ShoppingCart className="w-8 h-8 text-[#7BB042]" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            You haven&apos;t added any solar power kits or equipment packages yet. Explore our verified systems to configure your backup setup.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6fa338] transition shadow-xs"
          >
            Browse Solar Kits
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/track-order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition"
          >
            Track Placed Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8 font-sans">
      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Cart</span>
      </nav>

      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight">
            Your cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>
          <span className="text-xs sm:text-sm text-gray-500 font-normal">
            Standard Commercial & Residential Dispatch
          </span>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-950 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue shopping
        </Link>
      </div>

      {/* ── Stock & Warehouse Notification Banner ─────────────── */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 py-3 flex items-start sm:items-center gap-3 text-xs text-gray-800 shadow-2xs">
        <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-gray-950">
            All items in your cart are in stock
          </strong>{" "}
          at our Lagos & Abuja central warehouses and qualify for express dispatch.{" "}
          <span className="text-gray-500 italic font-normal">
            (demo placeholders, pending Petfeb approval)
          </span>
        </p>
      </div>

      {/* Toast Notice when accessory is added */}
      {addedItemNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-[#3F6B1A] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
          <span>Added &ldquo;{addedItemNotice}&rdquo; to your equipment manifest.</span>
        </div>
      )}

      {/* ── Main 2-Column Grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Items List & Buy Small Scheme Banner */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cart Item Cards */}
          <div className="space-y-4">
            {items.map((item, index) => {
              const fallbackImg =
                item.category?.toLowerCase().includes("panel") ||
                item.name.toLowerCase().includes("panel")
                  ? "/api/websitepic/panels"
                  : item.category?.toLowerCase().includes("battery") ||
                    item.name.toLowerCase().includes("battery")
                  ? "/api/websitepic/battery"
                  : "/api/websitepic/commercial";
              const displayImg = item.imageUrl || fallbackImg;

              const isLowStock = index === 1;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={displayImg}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Title & Specs */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h2 className="font-heading font-bold text-base sm:text-lg text-gray-950 truncate">
                            {item.name}
                          </h2>
                          <span className="font-heading font-extrabold text-base sm:text-lg text-gray-950 shrink-0">
                            {formatNaira(item.price)}
                          </span>
                        </div>

                        {/* Hardware Specs line */}
                        <p className="text-xs text-gray-500 font-mono">
                          {item.specsSummary || "5.0 kVA · 48V DC · 98% Efficiency · Dual MPPT"}
                        </p>

                        {/* Verification & Stock Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-[#3F6B1A] border border-emerald-200/70">
                            <ShieldCheck className="w-3 h-3 text-[#7BB042]" />
                            {item.name.toLowerCase().includes("panel")
                              ? "IEC 61215 Pass"
                              : item.name.toLowerCase().includes("battery")
                              ? "Tier-1 LiFePO4"
                              : "NEMSA Certified Tier-1"}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-[#3F6B1A] border border-emerald-200/70">
                            <CreditCard className="w-3 h-3 text-[#7BB042]" />
                            Buy Small Eligible
                          </span>

                          {isLowStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200">
                              ⚠️ Only 2 units left in Lagos Hub
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-gray-50 text-gray-600 border border-gray-200">
                              In stock (ready for dispatch)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper, Subtotal, and Remove */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-950 min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-600">
                        Subtotal:{" "}
                        <strong className="font-heading font-bold text-gray-950 text-sm">
                          {formatNaira(item.price * item.quantity)}
                        </strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-600 transition cursor-pointer px-1 py-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Buy Small Qualification Banner ────────────────────── */}
          <div className="bg-emerald-50/50 border border-emerald-200/90 rounded-2xl p-6 relative overflow-hidden space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#7BB042] text-black font-extrabold text-[12px] flex items-center justify-center">
                %
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#3F6B1A]">
                Asset Financing Scheme
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-extrabold text-xl text-gray-950">
                This cart qualifies for Buy Small: from {formatNaira(weeklyInstallment)} / week{" "}
                <span className="text-xs font-normal text-gray-500 italic">
                  (demo placeholder)
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Pay 30% initial deposit ({formatNaira(Math.round(subtotal * 0.3))}) and spread the
                balance over 12 months with zero collateral. Includes full warranty and NEMSA-certified
                installation option.
              </p>
            </div>

            {/* Segmented Power/Progress Meter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-[#3F6B1A]">30% Deposit Tier (Unlocked)</span>
                <span className="text-gray-500">70% Financed over 52 Weeks</span>
              </div>
              <div className="flex gap-1.5 h-2 w-full">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition ${
                      i < 3 ? "bg-[#7BB042]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-emerald-200/60 text-xs">
              <Link
                href="/buy-small"
                className="font-bold text-[#3F6B1A] hover:text-[#284910] inline-flex items-center gap-1 transition"
              >
                Learn more about Buy Small scheme
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-gray-500 text-[11px]">
                NIMC &amp; BVN Instant Verification
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Card (Sticky) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-7 space-y-5">
            <h2 className="font-heading font-extrabold text-xl text-gray-950">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
              <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
              <span className="font-heading font-bold text-gray-950">
                {formatNaira(subtotal)}
              </span>
            </div>

            {/* Delivery Location Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Delivery Location (Nigeria)
              </label>
              <div className="relative">
                <select
                  value={selectedDelivery.id}
                  onChange={(e) => {
                    const opt =
                      DELIVERY_OPTIONS.find((o) => o.id === e.target.value) ||
                      DELIVERY_OPTIONS[0];
                    setSelectedDelivery(opt);
                  }}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042] pr-10 font-medium cursor-pointer"
                >
                  {DELIVERY_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-0.5">
                <span>Logistics estimate:</span>
                <span className="font-semibold text-gray-800">
                  {selectedDelivery.fee === 0
                    ? "Free (Depot Pickup)"
                    : `${formatNaira(selectedDelivery.fee)} (${selectedDelivery.name})`}
                </span>
              </div>
            </div>

            {/* Certified Petfeb Turnkey Installation Checkbox Box */}
            <label
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                includeInstallation
                  ? "bg-emerald-50/70 border-emerald-300 ring-1 ring-[#7BB042]"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={includeInstallation}
                onChange={(e) => setIncludeInstallation(e.target.checked)}
                className="mt-0.5 text-[#7BB042] rounded focus:ring-[#7BB042] w-4 h-4"
              />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1 font-bold text-gray-950">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Certified Petfeb Turnkey Installation</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-tight">
                  Includes certified earthing rods, DC isolator switches, surge suppression &amp;
                  formal NEMSA safety certification signoff.
                </p>
                <span className="font-extrabold text-[#3F6B1A] text-xs block">
                  +₦120,000 <span className="font-normal text-gray-400 text-[10px]">(demo placeholder)</span>
                </span>
              </div>
            </label>

            {/* Grand Total */}
            <div className="pt-4 border-t border-gray-200 space-y-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-heading font-extrabold text-xl text-gray-950 block">
                    Total
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Includes 7.5% Nigerian VAT
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-heading font-extrabold text-2xl text-gray-950 block">
                    {formatNaira(finalPayable)}
                  </span>
                  <span className="text-[10px] text-gray-400 italic">
                    (demo placeholder)
                  </span>
                </div>
              </div>
            </div>

            {/* Engineering Note Box */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-lg p-3 text-[11px] text-gray-600 leading-snug">
              <strong className="font-semibold text-gray-900">Engineering Note:</strong> Promo or discount
              codes are not applicable for Tier-1 regulated solar hardware.
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-1">
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6fa338] transition shadow-sm text-center cursor-pointer min-h-[50px]"
              >
                <Lock className="w-4 h-4" />
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/buy-small"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold bg-white text-[#3F6B1A] border-2 border-[#7BB042] hover:bg-emerald-50 transition text-center cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#7BB042]" />
                Pay in installments with Buy Small (From {formatNaira(weeklyInstallment)}/wk)
              </Link>
            </div>

            {/* Trust Badges Rail */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>5-Year Petfeb Complete Replacement Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>NEMSA Certified Engineers Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Paystack 256-Bit SSL Encrypted Escrow</span>
              </div>
            </div>

            {/* Help Callout */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Need procurement support?</span>
              <a
                href="tel:+234800738332"
                className="font-bold text-gray-900 hover:text-[#3F6B1A] flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#7BB042]" />
                +234 800 PETFEB
              </a>
            </div>

            <p className="text-[10px] text-gray-400 italic text-center leading-tight">
              *All spec claims, installation fees, and installment amounts are demo placeholders,
              pending Petfeb approval.
            </p>
          </div>
        </aside>
      </div>

      {/* ── Recommended System Accessories & BOS Hardware ──────── */}
      <section className="pt-12 sm:pt-16 border-t border-gray-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950 tracking-tight">
              Recommended System Accessories &amp; BOS Hardware
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Essential Balance of System (BOS) components for safe NEMSA-compliant commissioning.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#3F6B1A] border border-emerald-200/80 shrink-0">
            <Zap className="w-3.5 h-3.5 text-[#7BB042]" />
            Zero Dispatch Delay
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECOMMENDED_BOS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4 hover:shadow-sm transition"
            >
              <div className="space-y-3">
                {/* Image */}
                <div className="h-40 rounded-xl bg-gray-50 border border-gray-100 p-3 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3F6B1A]">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-gray-950 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {product.specs}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Standard Price</span>
                  <span className="font-heading font-extrabold text-base text-gray-950 block">
                    {formatNaira(product.price)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddBOS(product)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6fa338] transition shadow-2xs cursor-pointer active:scale-98"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
