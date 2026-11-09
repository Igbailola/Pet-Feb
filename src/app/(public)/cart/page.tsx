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
  HardHat,
  CreditCard,
  ChevronDown,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/public-types";
import { trackEvent } from "@/lib/analytics";

interface BOSProduct {
  id: string;
  name: string;
  category: string;
  specs: string;
  price: number;
  imageUrl: string;
}

const RECOMMENDED_BOS: BOSProduct[] = [
  {
    id: "bos-micro-inverter",
    name: "Micro Inverter",
    category: "INVERTERS",
    specs: "Min, Order : 1unit",
    price: 567900,
    imageUrl: "https://framerusercontent.com/images/ocdKtoAy5td6vuIpwSctRNAePKU.jpg?width=765&height=1020",
  },
  {
    id: "bos-lithium-battery",
    name: "Lithium Battery",
    category: "BATTERIES",
    specs: "Min, Order : 1unit",
    price: 567900,
    imageUrl: "https://framerusercontent.com/images/9U0RV4PI8oglCnV4u5NLQd7ybU.png?width=4096&height=2304",
  },
  {
    id: "bos-g12v-battery",
    name: "G12V 200AH Battery",
    category: "BATTERIES",
    specs: "Min, Order : 1unit",
    price: 567900,
    imageUrl: "https://framerusercontent.com/images/sP2hoh0nwA36XvBioDrY5MDpFI.png?width=4032&height=2268",
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
      } catch {
        // Ignore storage quotas or restrictions
      }
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
      <div className="min-h-[50vh] flex items-center justify-center py-24 max-w-[1440px] mx-auto px-4 sm:px-8 text-center text-gray-500 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#7BB042] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading your equipment cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FBF9F8] min-h-[70vh] py-16 sm:py-24 px-4 sm:px-8 font-sans">
        <div className="max-w-[1440px] mx-auto space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-[8px] text-[14px] text-[#5C5C5C]">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition">
              Shop
            </Link>
            <span>/</span>
            <span className="font-semibold text-black">Cart</span>
          </nav>

          <div className="bg-white border border-[#D9D9D9] rounded-[24px] p-8 sm:p-14 max-w-2xl mx-auto text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#F2F7EC] text-[#3F6B1A] flex items-center justify-center mx-auto border border-[#D6E7C4]">
              <ShoppingCart className="w-8 h-8 text-[#7BB042]" />
            </div>

            <div className="space-y-2">
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B1C1C]">
                Your Shopping Cart is Empty
              </h1>
              <p className="text-sm text-[#5C5C5C] max-w-md mx-auto leading-relaxed">
                You haven&apos;t added any solar power kits, inverters, or battery packages yet. Explore our verified systems to configure your setup.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-[10px] text-sm font-heading font-bold bg-[#7BB042] text-white hover:bg-[#70A03C] transition shadow-xs"
              >
                Browse Solar Kits
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/track-order"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-[10px] text-sm font-heading font-semibold bg-white text-[#1B1C1C] border border-[#8A8A8A] hover:bg-gray-50 transition"
              >
                Track Placed Order
              </Link>
            </div>
          </div>

          {/* BOS Section even when empty so user can easily add */}
          <section className="bg-[#F5B82E] border border-[#D9D9D9] rounded-[24px] p-6 sm:p-10 lg:p-[49px] relative overflow-hidden text-[#1B1C1C]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-[26px] gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-[12px]">
                  <div className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <h2 className="font-heading font-medium text-[24px] sm:text-[32px] text-black tracking-[-0.24px]">
                    Recommended System Accessories &amp; BOS Hardware
                  </h2>
                </div>
                <p className="font-sans text-[16px] sm:text-[20px] text-[#333333] leading-[1.6]">
                  Essential Balance of System (BOS) components for safe NEMSA-compliant commissioning.
                </p>
              </div>

              <div className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.2)] rounded-full px-[13px] py-[5px] flex items-center gap-[4px] self-start sm:self-auto shrink-0">
                <Zap className="w-3 h-3 text-[#3F6B1A]" />
                <span className="font-heading font-semibold text-[12px] text-[#3F6B1A]">
                  Zero Dispatch Delay
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] sm:gap-[20px]">
              {RECOMMENDED_BOS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[24px] p-[16px] pb-[24px] shadow-[0px_2px_22px_0px_rgba(45,45,45,0.1)] flex flex-col justify-between gap-[32px]"
                >
                  <div className="space-y-[32px]">
                    <div className="h-[280px] sm:h-[340px] lg:h-[400px] rounded-[24px] overflow-hidden bg-[#EBEBEB] relative flex items-center justify-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-medium text-[24px] text-black line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="mt-2 space-y-0.5">
                        <p className="font-sans font-bold text-[20px] text-[#333333]">
                          {formatNaira(product.price)}
                        </p>
                        <p className="font-sans font-medium text-[18px] text-[#5C5C5C]">
                          {product.specs}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddBOS(product)}
                    className="w-full bg-black text-[#F2F7EC] rounded-[12px] p-[16px] text-center font-heading font-bold text-[16px] hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Buy For {formatNaira(product.price)}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F8] pb-24 overflow-x-clip font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[32px] pt-6 sm:pt-8 space-y-[24px]">
        {/* ── Toast Notification for Added Accessories ───────────── */}
        {addedItemNotice && (
          <div className="bg-[#E8F3DA] border border-[#7BB042] text-[#3F6B1A] px-5 py-3 rounded-[12px] text-sm font-semibold flex items-center gap-2.5 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#7BB042] shrink-0" />
            <span>Added &ldquo;{addedItemNotice}&rdquo; to your equipment manifest.</span>
          </div>
        )}

        {/* ── Breadcrumb Navigation matching Figma node 6164:1825 ──── */}
        <div className="space-y-[26px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-[8px] text-[14px] text-[#5C5C5C]">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition">
              Shop
            </Link>
            <span>/</span>
            <span className="font-semibold text-black">Cart</span>
          </nav>

          {/* ── Page Header & Continue Shopping matching Figma node 6164:1814 ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-[16px]">
              <div className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0" />
              <h1 className="font-heading font-bold text-[28px] sm:text-[38px] lg:text-[48px] uppercase tracking-[3px] text-black drop-shadow-xs">
                Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h1>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-[6px] text-[#3F6B1A] font-sans font-medium text-[16px] tracking-[0.28px] hover:underline shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#3F6B1A]" />
              <span>Continue shopping</span>
            </Link>
          </div>
        </div>

        {/* ── Hero Banner Image matching Figma node 6164:743 ──────── */}
        <div className="relative rounded-[32px] overflow-hidden h-[300px] sm:h-[460px] lg:h-[680px] w-full shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bannerimages/cart-page-banner.jpg"
            alt="Pet-Feb Solar Installation Cart Banner"
            className="w-full h-full object-cover rounded-[32px]"
          />
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(0.18deg, rgba(0, 0, 0, 0.2) 5.38%, rgba(217, 217, 217, 0) 99.68%)",
            }}
          />
        </div>

        {/* ── TWO-COLUMN CART WORKSPACE (7 cols / 5 cols) matching Figma node 6164:1351 ── */}
        <div className="bg-black rounded-[32px] p-6 sm:p-10 lg:p-[40px] lg:py-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-start">
            {/* ── LEFT COLUMN (7 COLS): LINE ITEMS & FINANCING QUALIFICATION ── */}
            <div className="lg:col-span-7 flex flex-col gap-[24px]">
              {/* Line Items Card Container (Figma node 6164:1353) */}
              <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
                {items.map((item, index) => {
                  const fallbackImg =
                    item.category?.toLowerCase().includes("panel") ||
                    item.name.toLowerCase().includes("panel")
                      ? "https://framerusercontent.com/images/cZDf2guX31QP3GfZxLvShnzGxwk.jpg?width=3580&height=2014"
                      : item.category?.toLowerCase().includes("battery") ||
                        item.name.toLowerCase().includes("battery")
                      ? "https://framerusercontent.com/images/9U0RV4PI8oglCnV4u5NLQd7ybU.png?width=4096&height=2304"
                      : "https://framerusercontent.com/images/ocdKtoAy5td6vuIpwSctRNAePKU.jpg?width=765&height=1020";
                  const displayImg = item.imageUrl || fallbackImg;
                  const isLowStock = index === 1;

                  return (
                    <article
                      key={item.id}
                      className={`${
                        index > 0 ? "border-t border-[#D9D9D9] pt-[25px] mt-[25px]" : "pb-[4px]"
                      } flex flex-col sm:flex-row gap-[20px] items-start`}
                    >
                      {/* Product Thumbnail */}
                      <div className="bg-[#F0EDED] border border-[#D9D9D9] rounded-[10px] p-[9px] size-[110px] sm:size-[128px] shrink-0 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={displayImg}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
                        <div className="space-y-[4px]">
                          {/* Title and Price */}
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h2 className="font-heading font-semibold text-[18px] sm:text-[20px] text-[#1B1C1C] leading-[28px] line-clamp-2">
                              {item.name}
                            </h2>
                            <p className="font-heading font-bold text-[18px] sm:text-[20px] text-[#1B1C1C] leading-[28px] shrink-0">
                              {formatNaira(item.price)}
                            </p>
                          </div>

                          {/* Technical Hardware Specs */}
                          <p className="font-mono text-[13px] sm:text-[14px] text-[#5C5C5C] tracking-[-0.35px] leading-[20px]">
                            {item.specsSummary || "5.0 kVA · 48V DC · 98% Efficiency · Dual MPPT"}
                          </p>

                          {/* Status Badges */}
                          <div className="flex flex-wrap items-center gap-[8px] pt-[6px]">
                            <span className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.3)] text-[#3F6B1A] px-[11px] py-[3px] rounded-full text-[12px] font-heading font-semibold flex items-center gap-[4px]">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
                              NEMSA Certified Tier-1
                            </span>

                            <span className="bg-[#F0EDED] border border-[#D9D9D9] text-[#3F6B1A] px-[11px] py-[3px] rounded-full text-[12px] font-heading font-semibold flex items-center gap-[4px]">
                              <CreditCard className="w-3.5 h-3.5 text-[#7BB042]" />
                              Buy Small Eligible
                            </span>

                            {isLowStock ? (
                              <span className="bg-[#FDF0CC] border border-[rgba(245,184,46,0.4)] text-[#8A5A00] px-[11px] py-[3px] rounded-full text-[12px] font-heading font-semibold flex items-center gap-[4px]">
                                <span>⚠️ Only 2 units left in Lagos Hub</span>
                              </span>
                            ) : (
                              <span className="text-[#3F6B1A] text-[12px] font-sans font-medium pl-[4px]">
                                In stock (ready for dispatch)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Controls: Stepper, Subtotal, and Remove */}
                        <div className="border-t border-dashed border-[#D9D9D9] pt-[17px] mt-[14px] flex flex-wrap items-center justify-between gap-3">
                          {/* Stepper with Figma Box Styling */}
                          <div className="inline-flex items-center gap-[6px]">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              disabled={item.quantity <= 1}
                              className={`w-[36px] h-[32px] bg-white rounded-[7px] shadow-[0px_0.58px_6.4px_0px_rgba(45,45,45,0.1)] flex items-center justify-center p-[4px] border border-gray-100 transition ${
                                item.quantity <= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-gray-50 cursor-pointer"
                              }`}
                              aria-label="Decrease quantity"
                            >
                              <div className="w-full h-full bg-[#EBEBEB] rounded-[5px] flex items-center justify-center">
                                <Minus className="w-3.5 h-3.5 text-[#333333]" />
                              </div>
                            </button>

                            <span className="font-sans font-bold text-[14px] text-[#333333] min-w-[28px] text-center">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-[36px] h-[32px] bg-white rounded-[7px] shadow-[0px_0.58px_6.4px_0px_rgba(45,45,45,0.1)] flex items-center justify-center p-[4px] border border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <div className="w-full h-full bg-[#EBEBEB] rounded-[5px] flex items-center justify-center">
                                <Plus className="w-3.5 h-3.5 text-[#333333]" />
                              </div>
                            </button>
                          </div>

                          {/* Subtotal & Remove Button */}
                          <div className="flex items-center gap-[16px]">
                            <p className="text-[12px] text-[#5C5C5C] font-sans">
                              Subtotal:{" "}
                              <strong className="font-sans font-bold text-[#1B1C1C] text-[14px]">
                                {formatNaira(item.price * item.quantity)}
                              </strong>
                            </p>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="inline-flex items-center gap-[4px] px-2.5 py-1 rounded-md text-[14px] text-[#5C5C5C] hover:text-red-600 transition cursor-pointer font-sans"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* ── BUY SMALL QUALIFICATION BANNER (Figma node 6164:1479) ── */}
              <section className="bg-[#F4F9EC] border border-[rgba(123,176,66,0.4)] rounded-[16px] p-5 sm:p-[25px] overflow-hidden relative shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
                {/* Quarter-circle Sun-Arc Motif top right */}
                <div
                  aria-hidden
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[18px] border-[rgba(123,176,66,0.18)] pointer-events-none opacity-40"
                />

                <div className="space-y-[8px] relative z-10">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
                      <span className="font-sans font-bold text-[12px] text-white">%</span>
                    </div>
                    <span className="font-heading font-bold text-[14px] text-[#3F6B1A] tracking-[0.7px] uppercase">
                      ASSET FINANCING SCHEME
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-heading font-bold text-[18px] sm:text-[20px] text-[#1B1C1C] leading-[28px]">
                      This cart qualifies for Buy Small: from {formatNaira(weeklyInstallment)} / week
                    </h3>
                    <span className="font-heading font-medium text-[12px] text-[#5C5C5C]">
                      (Estimated commitment)
                    </span>
                  </div>

                  <p className="font-sans text-[14px] text-[#42493A] leading-[20px] max-w-[576px]">
                    Pay 30% initial deposit ({formatNaira(Math.round(subtotal * 0.3))}) and spread the balance over 12 months with zero collateral. Includes full warranty and NEMSA-certified installation option.
                  </p>

                  {/* 10-Segmented Power Meter Motif */}
                  <div className="space-y-[6px] py-[8px]">
                    <div className="flex items-center justify-between text-[12px] font-heading font-semibold text-[#3F6B1A]">
                      <span>30% Deposit Tier (Unlocked)</span>
                      <span>70% Financed over 52 Weeks</span>
                    </div>

                    <div className="h-[12px] bg-[#E4E2E1] border border-[#D9D9D9] rounded-[6px] p-[3px] flex gap-[4px] items-center">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-full rounded-[2px] transition-colors ${
                            i < 3 ? "bg-[#7BB042]" : "bg-[#D9D9D9]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Link & Verification Badge */}
                  <div className="border-t border-[rgba(123,176,66,0.2)] pt-[13px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Link
                      href="/buy-small"
                      className="inline-flex items-center gap-[6px] font-heading font-bold text-[14px] text-[#3F6B1A] tracking-[0.28px] hover:underline"
                    >
                      <span>Learn more about Buy Small scheme</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#3F6B1A]" />
                    </Link>

                    <span className="font-mono text-[12px] text-[#5C5C5C]">
                      NIMC &amp; BVN Instant Verification
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN (5 COLS): ORDER SUMMARY & CHECKOUT ACTIONS ── */}
            <aside className="lg:col-span-5">
              <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[24px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)] space-y-[16px]">
                {/* Heading */}
                <div className="border-b border-[#D9D9D9] pb-[17px]">
                  <h2 className="font-heading font-bold text-[20px] text-[#1B1C1C] leading-[28px]">
                    Order Summary
                  </h2>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[14px] text-[#5C5C5C]">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-heading font-semibold text-[14px] text-[#1B1C1C] tracking-[0.48px]">
                    {formatNaira(subtotal)}
                  </span>
                </div>

                {/* Delivery Location Selector */}
                <div className="space-y-[8px]">
                  <label className="font-heading font-semibold text-[12px] text-[#1B1C1C] block">
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
                      className="w-full appearance-none h-[46px] px-[13px] pr-[38px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
                    >
                      {DELIVERY_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-[#8A8A8A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-sans text-[#3F6B1A]">Logistics estimate:</span>
                    <span className="font-sans font-bold text-[#3F6B1A]">
                      {selectedDelivery.fee === 0
                        ? "Free (Depot Pickup)"
                        : `${formatNaira(selectedDelivery.fee)} (${selectedDelivery.name})`}
                    </span>
                  </div>
                </div>

                {/* Certified Pet-Feb Turnkey Installation Toggle Box */}
                <div className="bg-[#F2F7EC] border border-[#D9D9D9] rounded-[10px] p-[15px]">
                  <label className="flex items-start gap-[12px] cursor-pointer select-none">
                    <div className="pt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={includeInstallation}
                        onChange={(e) => setIncludeInstallation(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center transition ${
                          includeInstallation
                            ? "bg-[#3D6A00] text-white"
                            : "bg-white border border-[#8A8A8A]"
                        }`}
                      >
                        {includeInstallation && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="space-y-[3px] text-left">
                      <p className="font-heading font-bold text-[14px] text-[#1B1C1C] tracking-[0.28px]">
                        Certified Pet-Feb Turnkey Installation
                      </p>
                      <p className="font-sans text-[12px] text-[#5C5C5C] leading-[19.5px]">
                        Includes certified earthing rods, DC isolator switches, surge suppression &amp; formal NEMSA safety certification signoff.
                      </p>
                      <p className="font-mono font-bold text-[12px] text-[#3F6B1A]">
                        +₦120,000 (standard residential estimate)
                      </p>
                    </div>
                  </label>
                </div>

                {/* Grand Total */}
                <div className="border-t border-[#D9D9D9] pt-[17px] flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-[20px] text-[#1B1C1C] leading-[28px]">
                      Total
                    </h3>
                    <p className="font-sans text-[12px] text-[#5C5C5C] leading-[16px]">
                      Includes 7.5% Nigerian VAT
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-bold text-[26px] sm:text-[30px] text-black tracking-[-0.75px] leading-[36px] block">
                      {formatNaira(finalPayable)}
                    </span>
                  </div>
                </div>

                {/* Engineering Note on promo codes (Figma node 6164:1570) */}
                <div className="bg-[#EBEBEB] border border-[#D9D9D9] rounded-[10px] p-[13px] text-[12px] text-[#1B1C1C] leading-[16px]">
                  <span className="font-semibold">Engineering Note:</span>{" "}
                  <span className="text-[#5C5C5C]">
                    Promo or discount codes are not applicable for Tier-1 regulated solar hardware.
                  </span>
                </div>

                {/* Action CTAs (Figma node 6164:1572) */}
                <div className="space-y-[12px] pt-[4px]">
                  <Link
                    href="/checkout"
                    onClick={() =>
                      trackEvent({
                        event: "begin_checkout",
                        value: finalPayable,
                        currency: "NGN",
                        items_count: itemCount,
                      })
                    }
                    className="bg-[#7BB042] hover:bg-[#70A03C] text-white rounded-[10px] h-[48px] px-4 flex items-center justify-center gap-[8px] font-heading font-bold text-[14px] tracking-[0.28px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition w-full"
                  >
                    <Lock className="w-4 h-4 text-white" />
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>

                  <Link
                    href="/buy-small"
                    className="border-2 border-[#7BB042] bg-transparent hover:bg-[#F2F7EC] text-[#3F6B1A] rounded-[10px] h-[44px] px-3 flex items-center justify-center gap-[8px] font-heading font-bold text-[13px] sm:text-[14px] tracking-[0.28px] transition w-full text-center"
                  >
                    <CreditCard className="w-4 h-4 text-[#7BB042] shrink-0" />
                    <span className="truncate">Pay in installments with Buy Small (From {formatNaira(weeklyInstallment)}/wk)</span>
                  </Link>
                </div>

                {/* Trust Badges Under Summary (Figma node 6164:1585) */}
                <div className="border-t border-[#D9D9D9] pt-[21px] flex flex-col gap-[14px] text-[12px] text-[#42493A] font-sans">
                  <div className="flex items-center gap-[8px]">
                    <ShieldCheck className="w-4 h-4 text-[#7BB042] shrink-0" />
                    <span>5-Year Pet-Feb Complete Replacement Warranty</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <HardHat className="w-4 h-4 text-[#7BB042] shrink-0" />
                    <span>NEMSA Certified Engineers Deployment</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Lock className="w-4 h-4 text-[#7BB042] shrink-0" />
                    <span>Paystack 256-Bit SSL Encrypted Escrow</span>
                  </div>
                </div>

                {/* Procurement Support Hotline Callout (Figma node 6164:1601) */}
                <div className="bg-[#F2F7EC] rounded-[10px] p-[12px] flex items-center justify-between">
                  <span className="font-sans text-[12px] text-[#5C5C5C]">
                    Need procurement support?
                  </span>
                  <a
                    href="tel:+2348135854054"
                    className="font-sans font-bold text-[16px] text-[#70A03C] hover:underline"
                  >
                    + 234 813-585-4054
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Section 8: Recommended System Accessories & BOS Hardware (Figma node 6157:2955) ── */}
        <section className="bg-[#F5B82E] border border-[#D9D9D9] rounded-[24px] p-6 sm:p-10 lg:p-[49px] relative overflow-hidden text-[#1B1C1C]">
          {/* Subtle Sun-Arc Pattern in top right corner */}
          <div
            aria-hidden
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-[28px] border-black/10 pointer-events-none opacity-80"
          />

          <div className="relative z-10 space-y-[26px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-[14px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <h2 className="font-heading font-medium text-[24px] sm:text-[32px] text-black tracking-[-0.24px]">
                    Recommended System Accessories &amp; BOS Hardware
                  </h2>
                </div>
                <p className="font-sans text-[16px] sm:text-[20px] text-[#333333] leading-[1.6]">
                  Essential Balance of System (BOS) components for safe NEMSA-compliant commissioning.
                </p>
              </div>

              <div className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.2)] rounded-full px-[13px] py-[5px] flex items-center gap-[4px] self-start sm:self-auto shrink-0">
                <Zap className="w-3 h-3 text-[#3F6B1A]" />
                <span className="font-heading font-semibold text-[12px] text-[#3F6B1A]">
                  Zero Dispatch Delay
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] sm:gap-[20px]">
              {RECOMMENDED_BOS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[24px] p-[16px] pb-[24px] shadow-[0px_2px_22px_0px_rgba(45,45,45,0.1)] flex flex-col justify-between gap-[32px]"
                >
                  <div className="space-y-[32px]">
                    <div className="h-[280px] sm:h-[340px] lg:h-[400px] rounded-[24px] overflow-hidden bg-[#EBEBEB] relative flex items-center justify-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-medium text-[24px] text-black line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="mt-2 space-y-0.5">
                        <p className="font-sans font-bold text-[20px] text-[#333333]">
                          {formatNaira(product.price)}
                        </p>
                        <p className="font-sans font-medium text-[18px] text-[#5C5C5C]">
                          {product.specs}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddBOS(product)}
                    className="w-full bg-black text-[#F2F7EC] rounded-[12px] p-[16px] text-center font-heading font-bold text-[16px] hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Buy For {formatNaira(product.price)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
