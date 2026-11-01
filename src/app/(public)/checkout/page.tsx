"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Printer,
  Copy,
  Check,
  AlertCircle,
  Package,
  Wrench,
  Phone,
  Info,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/public-types";

const NIGERIAN_STATES = [
  "Lagos State",
  "Abuja (FCT)",
  "Rivers (Port Harcourt)",
  "Oyo (Ibadan)",
  "Anambra",
  "Delta",
  "Edo (Benin)",
  "Enugu",
  "Kano",
  "Kaduna",
  "Ogun",
  "Ondo",
  "Akwa Ibom",
  "Cross River",
  "Imo",
  "Abia",
];

type PropertyType =
  | "Home / Residential"
  | "Commercial / Office"
  | "Industrial / Factory"
  | "Farm / Agricultural";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, isHydrated } = useCart();

  // Contact State
  const [fullName, setFullName] = useState("Engr. Babatunde Adeleke");
  const [email, setEmail] = useState("babatunde@lagosbiz.ng");
  const [phone, setPhone] = useState("0803 456 7890");

  // Delivery & Site State (synced from Cart preferences if available)
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedPrefs = localStorage.getItem("petfeb_cart_preferences");
        if (storedPrefs) {
          const parsed = JSON.parse(storedPrefs);
          if (typeof parsed.deliveryLocation === "string") {
            const matched = NIGERIAN_STATES.find((s) =>
              s
                .toLowerCase()
                .includes(parsed.deliveryLocation.toLowerCase().split(" ")[0])
            );
            if (matched) return matched;
          }
        }
      } catch {}
    }
    return "Lagos State";
  });
  const [city, setCity] = useState("Victoria Island / Eti-Osa");
  const [address, setAddress] = useState("Plot 14, Commercial Avenue, Victoria Island");
  const [notes, setNotes] = useState(
    "Commercial building with loading dock, delivery between 9am – 4pm"
  );

  // Installer Choice State (Default True per Figma design 6166:1936, synced from Cart)
  const [wantsInstaller, setWantsInstaller] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedPrefs = localStorage.getItem("petfeb_cart_preferences");
        if (storedPrefs) {
          const parsed = JSON.parse(storedPrefs);
          if (typeof parsed.includeInstallation === "boolean") {
            return parsed.includeInstallation;
          }
        }
      } catch {}
    }
    return true;
  });
  const [propertyType, setPropertyType] = useState<PropertyType>("Home / Residential");
  const [installWindow, setInstallWindow] = useState(
    "Within 48 hours of hardware delivery"
  );

  // Agreement & Submission State
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delivery logistics fee calculation
  const deliveryFee = state.includes("Lagos")
    ? 25000
    : state.includes("Abuja")
    ? 35000
    : state.includes("Rivers")
    ? 45000
    : 40000;

  const installationFee = wantsInstaller ? 120000 : 0;
  // Per Figma 6166:1936, Nigerian VAT (7.5%) is Included in hardware prices
  const grandTotal = subtotal + deliveryFee + installationFee;
  const weeklyInstallment = Math.max(15000, Math.round((subtotal * 0.7) / 52));

  const [orderConfirmed, setOrderConfirmed] = useState<null | {
    orderId: string;
    date: string;
    items: typeof items;
    total: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    wantsInstaller: boolean;
    propertyType: PropertyType;
    installWindow: string;
  }>(null);

  if (!isHydrated) {
    return (
      <div className="py-24 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] text-center text-[#5C5C5C] font-sans">
        Loading checkout...
      </div>
    );
  }

  // Handle Order Confirmation Screen
  if (orderConfirmed) {
    return (
      <div className="bg-[#FBF9F8] py-12 sm:py-20 min-h-[70vh] font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          <div className="bg-white rounded-[24px] border border-[#D9D9D9] shadow-sm p-6 sm:p-10 space-y-8 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-[#D9D9D9] pb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 border border-[#7BB042]/40">
                <CheckCircle2 className="w-8 h-8 text-[#7BB042]" />
              </div>
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Order Registration Confirmed
                </span>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B1C1C]">
                  Engineering Dispatch Scheduled
                </h1>
                <p className="text-xs sm:text-sm text-[#42493A] mt-0.5">
                  Your solar hardware order has been registered in Petfeb Central Dispatch.
                </p>
              </div>
            </div>

            {/* Reference & Summary Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-[16px] bg-[#FBF9F8] border border-[#D9D9D9] text-xs">
              <div>
                <span className="text-[#5C5C5C] block font-medium">Order Reference</span>
                <span className="font-heading font-bold text-base text-[#3D6A00] mt-0.5 block">
                  {orderConfirmed.orderId}
                </span>
              </div>
              <div>
                <span className="text-[#5C5C5C] block font-medium">Date Placed</span>
                <span className="font-heading font-semibold text-[#1B1C1C] mt-0.5 block">
                  {orderConfirmed.date}
                </span>
              </div>
              <div>
                <span className="text-[#5C5C5C] block font-medium">Total Settlement</span>
                <span className="font-heading font-bold text-base text-[#1B1C1C] mt-0.5 block">
                  {formatNaira(orderConfirmed.total)}
                </span>
              </div>
            </div>

            {/* Bank Wire Details */}
            <div className="p-6 rounded-[16px] bg-[#F4F9EC] border border-[#7BB042]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#3F6B1A] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#7BB042]" />
                  Corporate Wire Escrow Details (Zenith Bank)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("1014829104");
                    setCopiedBank(true);
                    setTimeout(() => setCopiedBank(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-[#3F6B1A] hover:underline cursor-pointer"
                >
                  {copiedBank ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedBank ? "Copied!" : "Copy Account"}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#5C5C5C] block">Bank Name</span>
                  <span className="font-bold text-[#1B1C1C]">Zenith Bank Plc</span>
                </div>
                <div>
                  <span className="text-[#5C5C5C] block">Account Name</span>
                  <span className="font-bold text-[#1B1C1C]">
                    Petfeb International Company Limited
                  </span>
                </div>
                <div>
                  <span className="text-[#5C5C5C] block">Account Number</span>
                  <span className="font-bold font-mono text-base text-[#1B1C1C]">
                    1014829104
                  </span>
                </div>
                <div>
                  <span className="text-[#5C5C5C] block">Payment Narration</span>
                  <span className="font-bold text-[#3D6A00]">{orderConfirmed.orderId}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#42493A] pt-1">
                * Please include your Order Reference as payment narration for immediate electronic reconciliation.
              </p>
            </div>

            {/* Installed & Dispatched Summary */}
            <div className="p-4 rounded-[12px] bg-[#FBF9F8] border border-[#D9D9D9] text-xs space-y-1.5">
              <span className="font-heading font-bold text-[#1B1C1C] block">
                Site Dispatch &amp; Engineering Location:
              </span>
              <p className="text-[#42493A]">
                {orderConfirmed.fullName} • {orderConfirmed.email} • +234 {orderConfirmed.phone}
              </p>
              <p className="text-[#42493A]">
                {orderConfirmed.address}, {orderConfirmed.city}, {orderConfirmed.state}
              </p>
              <p className="text-[#3F6B1A] font-medium pt-1">
                {orderConfirmed.wantsInstaller
                  ? `✓ Certified Petfeb Turnkey Installation included (${orderConfirmed.propertyType} · ${orderConfirmed.installWindow}).`
                  : "Self-installation selected. Hardware delivered for local engineering team."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#D9D9D9]">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] text-xs font-heading font-bold bg-[#F0EDED] text-[#1B1C1C] hover:bg-[#E4E0E0] transition min-h-[46px] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print / Save Receipt
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/track-order?ref=${encodeURIComponent(orderConfirmed.orderId)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] text-xs font-heading font-bold bg-black text-white hover:bg-[#1B1C1C] transition text-center min-h-[46px]"
                >
                  <Truck className="w-4 h-4" />
                  Track Order Status
                </Link>
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] text-xs font-heading font-bold bg-[#7BB042] text-white hover:bg-[#70A03C] transition text-center min-h-[46px]"
                >
                  Return to Shop
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cart empty state
  if (items.length === 0) {
    return (
      <div className="bg-[#FBF9F8] py-24 px-4 sm:px-8 lg:px-10 min-h-[65vh] font-sans">
        <div className="max-w-xl mx-auto bg-white border border-[#D9D9D9] rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-xs">
          <AlertCircle className="w-12 h-12 text-[#F5B82E] mx-auto" />
          <h1 className="font-heading font-bold text-2xl text-[#1B1C1C]">
            No Items in Cart to Checkout
          </h1>
          <p className="text-sm text-[#42493A] leading-relaxed">
            Please add a solar kit or equipment package to your shopping cart before proceeding to checkout.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] text-sm font-heading font-bold bg-[#7BB042] text-white hover:bg-[#70A03C] transition shadow-xs"
            >
              Explore Solar Kits
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] text-sm font-heading font-semibold border border-[#D9D9D9] text-[#1B1C1C] hover:bg-[#F0EDED] transition"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();
    const trimmedCity = city.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedAddress || !trimmedCity) {
      setFormError(
        "Please complete all required contact and site delivery fields before proceeding."
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError("Please enter a valid email address for order and invoice dispatch.");
      return;
    }

    const digitsOnly = trimmedPhone.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      setFormError("Please enter a valid Nigerian dispatch phone number.");
      return;
    }

    if (!agreeTerms) {
      setFormError("Please agree to Petfeb's Terms of Service and Warranty Terms to proceed.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `PFB-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const confirmed = {
        orderId: generatedId,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        items: [...items],
        total: grandTotal,
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        address: trimmedAddress,
        city: trimmedCity,
        state,
        wantsInstaller,
        propertyType,
        installWindow,
      };

      setOrderConfirmed(confirmed);
      try {
        const stored = JSON.parse(localStorage.getItem("petfeb_orders") || "[]");
        const updated = [
          {
            ...confirmed,
            status: "Out for Delivery (Lagos Hub Fleet)",
            placedAt: new Date().toISOString(),
          },
          ...stored,
        ];
        localStorage.setItem("petfeb_orders", JSON.stringify(updated));
      } catch {}

      clearCart();
      setIsSubmitting(false);
    }, 650);
  };

  return (
    <div className="bg-[#FBF9F8] pb-20 overflow-x-clip font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] pt-6 sm:pt-10 space-y-[24px]">
        {/* ── Section 1: Stepper & Progress Meter Bar (Node 6167:2766) ── */}
        <div className="border-b border-[#D9D9D9] pb-[17px] pt-[16px] px-2 sm:px-[24px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* 3-Step Text Stepper */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-[24px]">
            {/* Step 1: Completed */}
            <div className="flex items-center gap-[8px]">
              <span className="size-[24px] rounded-full bg-[#E8F3DA] border border-[rgba(123,176,66,0.4)] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#3F6B1A] stroke-[2.5]" />
              </span>
              <span className="font-heading font-semibold text-[14px] text-[#3F6B1A] leading-[20px]">
                1. Your Details
              </span>
            </div>

            <span className="font-heading text-[14px] text-[#C2C9B5] select-none">/</span>

            {/* Step 2: Active */}
            <div className="flex items-center gap-[8px]">
              <span className="size-[24px] rounded-full bg-[#3D6A00] text-white font-heading font-bold text-[12px] flex items-center justify-center shrink-0 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                2
              </span>
              <span className="font-heading font-semibold text-[14px] text-[#1B1C1C] leading-[20px] underline decoration-[#7BB042] decoration-2 underline-offset-4">
                2. Delivery &amp; Installation
              </span>
            </div>

            <span className="font-heading text-[14px] text-[#C2C9B5] select-none">/</span>

            {/* Step 3: Upcoming */}
            <div className="flex items-center gap-[8px]">
              <span className="size-[24px] rounded-full bg-[#F0EDED] text-[#42493A] font-heading font-semibold text-[12px] flex items-center justify-center shrink-0">
                3
              </span>
              <span className="font-heading font-semibold text-[14px] text-[#42493A] leading-[20px]">
                3. Review &amp; Pay
              </span>
            </div>
          </div>

          {/* 10-Segment Power Meter (Node 6167:2789) */}
          <div className="flex items-center gap-[12px]">
            <span className="font-heading font-medium text-[12px] text-[#42493A] leading-[16px]">
              Checkout Telemetry: 60%
            </span>
            <div
              className="flex items-center gap-[2px]"
              aria-label="Checkout progress 60 percent"
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-[12px] h-[8px] rounded-[2px] ${
                    idx < 6 ? "bg-[#7BB042]" : "bg-[#D9D9D9]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 2: Page Heading Row (Node 6166:1951) ──────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-[16px]">
            <span
              className="size-[24px] sm:size-[30px] rounded-full bg-[#F5B82E] shrink-0"
              aria-hidden="true"
            />
            <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-[48px] text-black uppercase tracking-[2px] sm:tracking-[3px] leading-none">
              CHECKOUT/DELIVERY
            </h1>
          </div>

          <Link
            href="/cart"
            className="inline-flex items-center gap-[8px] font-sans font-medium text-[16px] text-[#3F6B1A] hover:text-[#2c4c11] transition self-start sm:self-auto"
          >
            <ArrowLeft className="w-[22px] h-[22px]" />
            <span>Continue shopping</span>
          </Link>
        </div>

        {/* ── Section 3: Hero Banner Image (Node 6166:1962) ─────────── */}
        <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden h-[280px] sm:h-[460px] lg:h-[680px] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma-assets/about-hero-clean.jpg"
            alt="Petfeb Solar Checkout and Delivery"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(0.18deg, rgba(0, 0, 0, 0.2) 5.39%, rgba(217, 217, 217, 0) 99.69%)",
            }}
          />
        </div>

        {formError && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-xs sm:text-sm font-medium flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* ── Section 4: 2-Column Checkout Grid (Node 6166:2428) ─────── */}
        <form
          onSubmit={handlePlaceOrder}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-[32px] items-start pt-2"
        >
          {/* ── LEFT COLUMN (7 Cols): Customer, Delivery, Installer & Payment ── */}
          <div className="lg:col-span-7 flex flex-col gap-[24px]">
            {/* ── Step 1 Card: Your Details (Node 6166:2431) ────────── */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[20px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
              <div className="border-b border-[#D9D9D9] pb-[17px] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-[12px]">
                  <span className="size-[28px] rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-bold text-[12px] flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h2 className="font-heading font-semibold text-[20px] text-[#1B1C1C] tracking-[-0.2px] leading-[28px]">
                    Your Details
                  </h2>
                </div>
                <span className="bg-[#F0EDED] border border-[#D9D9D9] rounded-full px-[11px] py-[5px] font-heading text-[11px] text-[#42493A] leading-[16.5px]">
                  No account needed — quick guest checkout
                </span>
              </div>

              <div className="space-y-[16px]">
                {/* Full Name */}
                <div className="space-y-[6px]">
                  <label
                    htmlFor="checkout-fullname"
                    className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                  >
                    Full Name (Contact / Project Lead)
                  </label>
                  <input
                    id="checkout-fullname"
                    type="text"
                    required
                    placeholder="Engr. Babatunde Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-[44px] px-[15px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div className="space-y-[6px]">
                    <label
                      htmlFor="checkout-email"
                      className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                    >
                      Email Address
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      placeholder="babatunde@lagosbiz.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[44px] px-[15px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                    <span className="font-heading text-[11px] text-[#5C5C5C] leading-[16.5px] block">
                      We&apos;ll send your order number, invoice, and dispatch updates to this email.
                    </span>
                  </div>

                  <div className="space-y-[6px]">
                    <label
                      htmlFor="checkout-phone"
                      className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                    >
                      Phone Number (Dispatch Contact)
                    </label>
                    <div className="flex items-stretch">
                      <span className="bg-[#F0EDED] border border-r-0 border-[#8A8A8A] rounded-l-[10px] px-[13px] h-[44px] flex items-center font-heading font-semibold text-[12px] text-[#42493A] select-none">
                        +234
                      </span>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        placeholder="0803 456 7890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-[44px] px-[15px] rounded-r-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Step 2 Card: Delivery & Site Location (Node 6166:2466) ── */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[24px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
              <div className="border-b border-[#D9D9D9] pb-[17px] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-[12px]">
                  <span className="size-[28px] rounded-full bg-[#3D6A00] text-white font-heading font-bold text-[12px] flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h2 className="font-heading font-semibold text-[20px] text-[#1B1C1C] tracking-[-0.2px] leading-[28px]">
                    Delivery &amp; Site Location
                  </h2>
                </div>
                <span className="font-heading font-semibold text-[12px] text-[#3D6A00] flex items-center gap-[6px]">
                  <Truck className="w-4 h-4 text-[#3D6A00]" />
                  Nationwide Logistics
                </span>
              </div>

              <div className="space-y-[16px]">
                {/* Street Address */}
                <div className="space-y-[6px]">
                  <label
                    htmlFor="checkout-address"
                    className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                  >
                    Street Address / Facility Gate
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    placeholder="Plot 14, Commercial Avenue, Victoria Island"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-[44px] px-[15px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>

                {/* State & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div className="space-y-[6px]">
                    <label
                      htmlFor="checkout-state"
                      className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                    >
                      State
                    </label>
                    <div className="relative">
                      <select
                        id="checkout-state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full appearance-none h-[44px] pl-[15px] pr-[36px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
                      >
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#5C5C5C] absolute right-[13px] top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-[6px]">
                    <label
                      htmlFor="checkout-city"
                      className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                    >
                      City / Local Govt. Area
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      placeholder="Victoria Island / Eti-Osa"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-[44px] px-[15px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                    />
                  </div>
                </div>

                {/* Delivery Notes */}
                <div className="space-y-[6px]">
                  <label
                    htmlFor="checkout-notes"
                    className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] block"
                  >
                    Delivery &amp; Unloading Notes (Optional)
                  </label>
                  <textarea
                    id="checkout-notes"
                    rows={2}
                    placeholder="Commercial building with loading dock, delivery between 9am – 4pm"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-[15px] py-[11px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>

                {/* Logistics Dispatch Bar (Node 6166:2512) */}
                <div className="bg-[#F0EDED] border border-[#D9D9D9] rounded-[10px] p-[13px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-[8px]">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6A00] shrink-0" />
                    <span className="font-heading text-[12px] text-[#42493A] leading-[16px]">
                      Dispatched from{" "}
                      <strong className="font-bold text-[#1B1C1C]">
                        {state.includes("Abuja") ? "Abuja" : "Lagos Central"} Hub
                      </strong>{" "}
                      via heavy-goods logistics
                    </span>
                  </div>
                  <span className="font-heading font-bold text-[12px] text-[#1B1C1C] shrink-0">
                    {formatNaira(deliveryFee)}
                  </span>
                </div>
                <p className="text-[11px] italic text-[#5C5C5C] leading-[16.5px]">
                  (demo placeholder, pending Petfeb approval)
                </p>
              </div>

              {/* ── Critical Feature: "Do you want an installer?" (Node 6166:2520) ── */}
              <div className="bg-[#F5B82E] border-t border-[#D9D9D9] rounded-[24px] sm:rounded-[32px] p-5 sm:p-[24px] space-y-[16px]">
                <div className="space-y-[4px]">
                  <div className="flex flex-wrap items-center gap-[12px]">
                    <span className="size-[18px] rounded-full bg-black text-[#F5B82E] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <h3 className="font-heading font-bold text-[20px] sm:text-[24px] text-black tracking-[-0.18px] leading-[28px]">
                      Do you want an installer?
                    </h3>
                    <span className="bg-[#F2F7EC] text-[#70A03C] font-heading font-bold text-[11px] uppercase tracking-[0.55px] px-[8px] py-[2px] rounded-full">
                      NEMSA VERIFIED
                    </span>
                  </div>
                  <p className="font-sans text-[14px] text-[#333333] leading-[19.5px]">
                    All installations are performed by certified NEMSA-registered engineers with earthing and surge protection verification.
                  </p>
                </div>

                {/* Two Black Selectable Radio Option Cards (Node 6166:2529) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  {/* Option 1: Yes, I want an installer */}
                  <div
                    role="radio"
                    aria-checked={wantsInstaller}
                    tabIndex={0}
                    onClick={() => setWantsInstaller(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setWantsInstaller(true);
                      }
                    }}
                    className={`bg-black rounded-[16px] p-[22px] cursor-pointer transition flex flex-col justify-between gap-[12px] ${
                      wantsInstaller
                        ? "border-2 border-[#7BB042] shadow-[0px_4px_12px_-2px_rgba(123,176,66,0.2)]"
                        : "border border-[#EBEBEB] opacity-95 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="size-[48px] rounded-full bg-white border border-[rgba(123,176,66,0.3)] flex items-center justify-center shrink-0">
                        <Wrench className="w-5 h-5 text-[#3F6B1A]" />
                      </div>
                      <div
                        className={`size-[20px] rounded-full flex items-center justify-center ${
                          wantsInstaller
                            ? "bg-[#7BB042] text-white"
                            : "bg-white border-2 border-[#C2C9B5]"
                        }`}
                      >
                        {wantsInstaller && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="space-y-[6px]">
                      <h4 className="font-heading font-bold text-[16px] text-[#7BB042] leading-[24px]">
                        Yes, I want an installer
                      </h4>
                      <p className="font-sans text-[14px] text-[#F2F7EC] leading-[19.5px]">
                        A certified Petfeb installation engineer will contact you within 24 hours to schedule a pre-install site assessment and turnkey commissioning.
                      </p>
                    </div>

                    <div className="border-t border-[rgba(123,176,66,0.3)] pt-[13px] flex items-center justify-between">
                      <span className="font-heading font-semibold text-[11px] uppercase tracking-[0.55px] text-[#95C068]">
                        Turnkey Service
                      </span>
                      <span className="font-heading font-bold text-[14px] text-[#F2F7EC]">
                        +₦120,000
                      </span>
                    </div>
                  </div>

                  {/* Option 2: No, I'll arrange my own */}
                  <div
                    role="radio"
                    aria-checked={!wantsInstaller}
                    tabIndex={0}
                    onClick={() => setWantsInstaller(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setWantsInstaller(false);
                      }
                    }}
                    className={`bg-black rounded-[16px] p-[21px] cursor-pointer transition flex flex-col justify-between gap-[12px] ${
                      !wantsInstaller
                        ? "border-2 border-[#7BB042] shadow-[0px_4px_12px_-2px_rgba(123,176,66,0.2)]"
                        : "border border-[#EBEBEB] opacity-95 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="size-[48px] rounded-full bg-[#F0EDED] border border-[#D9D9D9] flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-[#42493A]" />
                      </div>
                      <div
                        className={`size-[20px] rounded-full flex items-center justify-center ${
                          !wantsInstaller
                            ? "bg-[#7BB042] text-white"
                            : "bg-white border-2 border-[#C2C9B5]"
                        }`}
                      >
                        {!wantsInstaller && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="space-y-[6px]">
                      <h4 className="font-heading font-bold text-[16px] text-white leading-[24px]">
                        No, I&apos;ll arrange my own
                      </h4>
                      <p className="font-sans text-[14px] text-[#EBEBEB] leading-[19.5px]">
                        Hardware delivered to your door. Installation handled by your own qualified electrical engineer. Petfeb warranty guidelines apply.
                      </p>
                    </div>

                    <div className="border-t border-[#D9D9D9] pt-[13px] flex items-center justify-between">
                      <span className="font-heading font-semibold text-[11px] uppercase tracking-[0.55px] text-[#EBEBEB]">
                        Self-Installation
                      </span>
                      <span className="font-heading font-bold text-[14px] text-[#EBEBEB]">
                        ₦0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Revealed Configuration for "Yes" (Node 6166:2560) */}
                {wantsInstaller && (
                  <div className="bg-black border border-[#EBEBEB] rounded-[12px] p-4 sm:p-[21px] space-y-[16px]">
                    {/* Select Site Property Type */}
                    <div className="space-y-[8px]">
                      <label className="font-heading font-semibold text-[14px] text-white leading-[16px] block">
                        Select Site Property Type:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px]">
                        {(
                          [
                            "Home / Residential",
                            "Commercial / Office",
                            "Industrial / Factory",
                            "Farm / Agricultural",
                          ] as PropertyType[]
                        ).map((type) => {
                          const isSelected = propertyType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setPropertyType(type)}
                              className={`py-[9px] px-3 rounded-full text-[12px] font-heading text-center transition cursor-pointer ${
                                isSelected
                                  ? "bg-[#E8F3DA] border border-[#7BB042] text-[#3F6B1A] font-bold"
                                  : "bg-[#FBF9F8] border border-[#D9D9D9] text-[#42493A] font-normal hover:bg-white"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Installation Window */}
                    <div className="space-y-[6px]">
                      <label
                        htmlFor="checkout-install-window"
                        className="font-heading font-semibold text-[14px] text-white leading-[16px] block"
                      >
                        Preferred Installation Window:
                      </label>
                      <div className="relative">
                        <select
                          id="checkout-install-window"
                          value={installWindow}
                          onChange={(e) => setInstallWindow(e.target.value)}
                          className="w-full appearance-none h-[44px] pl-[15px] pr-[36px] rounded-[10px] border border-[#D9D9D9] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
                        >
                          <option value="Within 48 hours of hardware delivery">
                            Within 48 hours of hardware delivery
                          </option>
                          <option value="Within 5 business days">
                            Within 5 business days
                          </option>
                          <option value="Custom schedule (coordinated with site engineer)">
                            Custom schedule (coordinated with site engineer)
                          </option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#5C5C5C] absolute right-[13px] top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Turnkey Installation Banner Note (Node 6166:2581) */}
                    <div className="bg-[#F4F9EC] border border-[rgba(123,176,66,0.3)] rounded-[8px] p-[13px] flex items-start gap-[10px]">
                      <ShieldCheck className="w-4 h-4 text-[#3F6B1A] shrink-0 mt-0.5" />
                      <p className="font-sans text-[13px] sm:text-[14px] text-[#3F6B1A] leading-[18px]">
                        <strong className="font-bold">
                          Turnkey Installation &amp; NEMSA Safety Certification: +₦120,000
                        </strong>{" "}
                        — Includes DC cable trunking, array mounting hardware, earth rod resistance testing, and surge protection integration.{" "}
                        <em className="italic">
                          (Fee to be confirmed on site audit · demo terms, pending Petfeb approval)
                        </em>
                        .
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Step 3 Card: Review & Pay (Node 6166:2588) ─────────── */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[16px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
              <div className="border-b border-[#D9D9D9] pb-[17px] flex items-center gap-[12px]">
                <span className="size-[28px] rounded-full bg-[#F0EDED] text-[#42493A] font-heading font-bold text-[12px] flex items-center justify-center shrink-0">
                  3
                </span>
                <h2 className="font-heading font-semibold text-[20px] text-[#1B1C1C] tracking-[-0.2px] leading-[28px]">
                  Review &amp; Pay
                </h2>
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-start gap-[12px] pt-[4px] pb-[4px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 size-[20px] rounded-[4px] accent-[#7BB042] cursor-pointer shrink-0"
                />
                <span className="font-sans text-[14px] text-[#42493A] leading-[19.5px]">
                  I agree to Petfeb&apos;s{" "}
                  <Link
                    href="/about"
                    className="font-semibold text-[#3D6A00] underline hover:text-[#2a4a00]"
                  >
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link
                    href="/about"
                    className="font-semibold text-[#3D6A00] underline hover:text-[#2a4a00]"
                  >
                    Equipment Warranty Terms
                  </Link>
                  , and{" "}
                  <Link
                    href="/installation"
                    className="font-semibold text-[#3D6A00] underline hover:text-[#2a4a00]"
                  >
                    Installation &amp; Refund Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Test Mode Info Chip (Node 6166:2602) */}
              <div className="bg-[#F2F7EC] border border-[#D6E7C4] rounded-[10px] p-[13px] flex items-center gap-[8px]">
                <Info className="w-4 h-4 text-[#577D2F] shrink-0" />
                <span className="font-sans text-[14px] text-[#577D2F] leading-[16px]">
                  Test mode: no real debit charges will be applied. (demo placeholder)
                </span>
              </div>

              {/* Primary Paystack Button (Node 6166:2607) */}
              <button
                type="submit"
                disabled={isSubmitting || !agreeTerms}
                className="w-full h-[56px] rounded-[10px] bg-[#7BB042] hover:bg-[#70A03C] text-white font-heading font-semibold text-[18px] sm:text-[20px] tracking-[0.18px] flex items-center justify-center gap-[12px] shadow-[0px_4px_12px_0px_rgba(123,176,66,0.28)] transition cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-5 h-5 shrink-0" />
                <span>
                  {isSubmitting
                    ? "Processing Secure Dispatch..."
                    : `Pay ${formatNaira(grandTotal)} with Paystack`}
                </span>
                {!isSubmitting && <CreditCard className="w-[18px] h-[18px] shrink-0 opacity-90" />}
              </button>

              {/* Secondary Buy Small Link (Node 6166:2614) */}
              <div className="pt-[4px] text-center">
                <Link
                  href="/buy-small"
                  className="inline-flex items-center justify-center gap-[6px] font-heading font-semibold text-[14px] text-[#3D6A00] hover:underline"
                >
                  <span>
                    Or finance this order with Buy Small (from {formatNaira(weeklyInstallment)}/week)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (5 Cols): Sticky Order Summary & Trust Rail (Node 6166:2620) ── */}
          <aside className="lg:col-span-5 flex flex-col gap-[20px] lg:sticky lg:top-24">
            {/* Order Summary Card (Node 6166:2621) */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[16px] relative overflow-hidden shadow-[0px_4px_16px_-4px_rgba(31,58,11,0.08),0px_2px_6px_-1px_rgba(31,58,11,0.04)]">
              {/* Quarter-circle Sun-Arc Motif (Node 6166:2688) */}
              <div
                aria-hidden="true"
                className="absolute -top-[47px] -right-[47px] size-[96px] rounded-bl-full pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(244, 166, 35, 0.18) 0%, rgba(123, 176, 66, 0.12) 100%)",
                }}
              />

              {/* Header */}
              <div className="border-b border-[#D9D9D9] pb-[12px] flex items-center justify-between relative">
                <h2 className="font-heading font-bold text-[20px] text-[#1B1C1C] leading-[28px]">
                  Order Summary
                </h2>
                <span className="bg-[#F0EDED] text-[#42493A] font-heading font-semibold text-[12px] px-[8px] py-[2px] rounded-full">
                  {items.length} System {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Item List */}
              <div className="border-b border-[#D9D9D9] py-[8px] space-y-[14px] max-h-80 overflow-y-auto pr-1">
                {items.map((item) => {
                  const fallbackImg =
                    item.category?.toLowerCase().includes("panel") ||
                    item.name.toLowerCase().includes("panel")
                      ? "/api/websitepic/panels"
                      : item.category?.toLowerCase().includes("battery") ||
                        item.name.toLowerCase().includes("battery")
                      ? "/api/websitepic/battery"
                      : "/api/websitepic/commercial";
                  const displayImg = item.imageUrl || fallbackImg;

                  return (
                    <div key={item.id} className="flex items-start gap-[12px]">
                      <div className="size-[56px] rounded-[8px] bg-[#F0EDED] border border-[#D9D9D9] p-[5px] shrink-0 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={displayImg}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-[14px] text-[#1B1C1C] leading-[17.5px] truncate">
                          {item.name}
                        </h3>
                        <p className="font-sans text-[12px] text-[#5C5C5C] leading-[16px] truncate mt-0.5">
                          {item.specsSummary || "Dual-MPPT · 48V Pure Sine"} (x{item.quantity})
                        </p>
                        <span className="font-heading font-semibold text-[12px] text-[#1B1C1C] leading-[16px] mt-1 block">
                          {formatNaira(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cost Calculations (Node 6166:2666) */}
              <div className="border-b border-[#D9D9D9] py-[12px] space-y-[8px] text-[14px]">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[#42493A]">Hardware Subtotal</span>
                  <span className="font-heading font-semibold text-[#1B1C1C]">
                    {formatNaira(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[#42493A]">
                    Logistics ({state.includes("Abuja") ? "Abuja Hub" : "Lagos Central Hub"})
                  </span>
                  <span className="font-heading font-semibold text-[#1B1C1C]">
                    {formatNaira(deliveryFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-medium text-[#3F6B1A] flex items-center gap-[6px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3F6B1A] shrink-0" />
                    Certified Turnkey Installation
                  </span>
                  <span className="font-heading font-semibold text-[#3F6B1A]">
                    {wantsInstaller ? formatNaira(installationFee) : "₦0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[#42493A]">Nigerian VAT (7.5%)</span>
                  <span className="font-heading text-[12px] text-[#5C5C5C]">Included</span>
                </div>
              </div>

              {/* Total Calculation (Node 6166:2689) */}
              <div className="pt-[4px] space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-heading font-bold text-[20px] text-[#1B1C1C] leading-[24px]">
                    Total Payable
                  </span>
                  <span className="font-heading font-bold text-[28px] sm:text-[32px] text-[#3D6A00] tracking-[-0.56px] leading-[32px]">
                    {formatNaira(grandTotal)}
                  </span>
                </div>
                <span className="font-sans text-[11px] italic text-[#5C5C5C] text-right block leading-[16.5px]">
                  (demo placeholder, pending Petfeb approval)
                </span>
              </div>
            </div>

            {/* Trust Rail Stack Card (Node 6166:2696) */}
            <div className="bg-[#F8F8F8] border border-[#D9D9D9] rounded-[16px] p-[17px] space-y-[12px]">
              <div className="flex items-center gap-[10px] text-[14px] text-[#333333]">
                <ShieldCheck className="w-4 h-4 text-[#3D6A00] shrink-0" />
                <span>
                  <strong className="font-bold">5-Year Replacement Warranty</strong> on inverter &amp; batteries
                </span>
              </div>
              <div className="flex items-center gap-[10px] text-[14px] text-[#333333]">
                <CheckCircle2 className="w-4 h-4 text-[#3D6A00] shrink-0" />
                <span>
                  <strong className="font-bold">Certified NEMSA</strong> Electrical Engineers on site
                </span>
              </div>
              <div className="flex items-center gap-[10px] text-[14px] text-[#333333]">
                <Lock className="w-4 h-4 text-[#3D6A00] shrink-0" />
                <span>
                  <strong className="font-bold">Paystack Escrow Protection</strong> with 256-Bit SSL
                </span>
              </div>
              <div className="flex items-center gap-[10px] text-[14px] text-[#333333]">
                <Phone className="w-4 h-4 text-[#3D6A00] shrink-0" />
                <span>
                  Dedicated Procurement Desk:{" "}
                  <strong className="font-heading font-semibold text-[#1B1C1C]">
                    + 234 813-585-4054
                  </strong>
                </span>
              </div>
            </div>

            {/* Engineering / Compliance Note (Node 6166:2729) */}
            <p className="font-sans text-[11px] italic text-[#5C5C5C] text-center px-[8px] leading-[16.5px]">
              *All fee calculations, installation schedules, and technical claims are demo placeholders, pending Petfeb approval. Grid synchronization subject to local distribution company compliance.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
