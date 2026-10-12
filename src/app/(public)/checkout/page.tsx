"use client";

import { useState, useEffect } from "react";
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
  HardHat,
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

type PropertyType = "Home / Residential" | "Commercial / Office" | "Industrial / Factory" | "Farm / Agricultural";

export default function CheckoutPage() {
  const { items, subtotal, vat, clearCart, isHydrated } = useCart();

  // Contact State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Delivery & Site State
  const [state, setState] = useState("Lagos State");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Installer Choice State (Default True per stitch design frame)
  const [wantsInstaller, setWantsInstaller] = useState(true);
  const [propertyType, setPropertyType] = useState<PropertyType>("Home / Residential");
  const [installWindow, setInstallWindow] = useState("Within 48 hours of hardware delivery");

  // Agreement & Submission State
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Delivery logistics fee calculation
  const deliveryFee = state.includes("Lagos")
    ? 25000
    : state.includes("Abuja")
    ? 35000
    : state.includes("Rivers")
    ? 45000
    : 40000;

  const installationFee = wantsInstaller ? 120000 : 0;
  const grandTotal = subtotal + vat + deliveryFee + installationFee;
  const weeklyInstallment = Math.round((subtotal * 0.7) / 52);

  // Check if user set preferences in cart
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedPrefs = localStorage.getItem("petfeb_cart_preferences");
        if (storedPrefs) {
          const parsed = JSON.parse(storedPrefs);
          if (typeof parsed.includeInstallation === "boolean") {
            setWantsInstaller(parsed.includeInstallation);
          }
        }
      } catch {}
    }
  }, []);

  const [orderConfirmed, setOrderConfirmed] = useState<null | {
    orderId: string;
    date: string;
    items: typeof items;
    total: number;
    fullName: string;
    phone: string;
    address: string;
    state: string;
    wantsInstaller: boolean;
  }>(null);

  if (!isHydrated) {
    return (
      <div className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 text-center text-gray-500 font-sans">
        Loading checkout...
      </div>
    );
  }

  // Handle Order Confirmation Screen
  if (orderConfirmed) {
    return (
      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 space-y-8 font-sans">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#3F6B1A] flex items-center justify-center shrink-0 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-[#7BB042]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                Order Registration Confirmed
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                Engineering Dispatch Scheduled
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Your solar hardware order has been registered in Petfeb Central Dispatch.
              </p>
            </div>
          </div>

          {/* Reference & Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Order Reference</span>
              <span className="font-heading font-extrabold text-base text-[#3F6B1A] mt-0.5 block">
                {orderConfirmed.orderId}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Date Placed</span>
              <span className="font-semibold text-gray-900 mt-0.5 block">
                {orderConfirmed.date}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Total Settlement</span>
              <span className="font-heading font-extrabold text-base text-gray-950 mt-0.5 block">
                {formatNaira(orderConfirmed.total)}
              </span>
            </div>
          </div>

          {/* Bank Wire Details */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] flex items-center gap-1.5">
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
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3F6B1A] hover:underline cursor-pointer"
              >
                {copiedBank ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedBank ? "Copied!" : "Copy Account"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block">Bank Name</span>
                <span className="font-bold text-gray-900">Zenith Bank Plc</span>
              </div>
              <div>
                <span className="text-gray-500 block">Account Name</span>
                <span className="font-bold text-gray-900">Petfeb International Company Limited</span>
              </div>
              <div>
                <span className="text-gray-500 block">Account Number</span>
                <span className="font-bold font-mono text-base text-gray-950">1014829104</span>
              </div>
              <div>
                <span className="text-gray-500 block">Payment Narration</span>
                <span className="font-bold text-[#3F6B1A]">{orderConfirmed.orderId}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 pt-1">
              * Please include your Order Reference as payment narration for immediate electronic reconciliation.
            </p>
          </div>

          {/* Installed & Dispatched Summary */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1.5">
            <span className="font-bold text-gray-900 block">Site Dispatch & Engineering Location:</span>
            <p className="text-gray-700">
              {orderConfirmed.fullName} • {orderConfirmed.phone}
            </p>
            <p className="text-gray-700">
              {orderConfirmed.address}, {orderConfirmed.state}
            </p>
            <p className="text-emerald-800 font-medium pt-1">
              {orderConfirmed.wantsInstaller
                ? "✓ Certified Petfeb Turnkey Installation included with NEMSA sign-off."
                : "Self-installation selected. Hardware delivered for local engineering team."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 transition min-h-[46px]"
            >
              <Printer className="w-4 h-4" />
              Print / Save Receipt
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/track-order?ref=${orderConfirmed.orderId}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#1F3A0B] text-white hover:bg-black transition shadow-xs text-center min-h-[46px]"
              >
                <Truck className="w-4 h-4" />
                Track Order Status
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition shadow-xs text-center min-h-[46px]"
              >
                Return to Shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cart empty state
  if (items.length === 0) {
    return (
      <div className="py-24 px-4 sm:px-8 lg:px-10 max-w-xl mx-auto text-center space-y-6 font-sans">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h1 className="font-heading font-extrabold text-2xl text-gray-900">
          No Items in Cart to Checkout
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Please add a solar kit or equipment package to your shopping cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition shadow-xs"
        >
          Explore Solar Kits
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert("Please provide your full legal name, contact phone number, and installation street address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `PET-ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const confirmed = {
        orderId: generatedId,
        date: new Date().toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        items: [...items],
        total: grandTotal,
        fullName,
        phone,
        address,
        state,
        wantsInstaller,
      };

      setOrderConfirmed(confirmed);
      try {
        const stored = JSON.parse(localStorage.getItem("petfeb_orders") || "[]");
        const updated = [
          {
            ...confirmed,
            status: "Order Received",
            placedAt: new Date().toISOString(),
          },
          ...stored,
        ];
        localStorage.setItem("petfeb_orders", JSON.stringify(updated));
      } catch {}

      clearCart();
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="py-6 sm:py-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6 font-sans">
      {/* ── Top Header Bar (Matching delivery and checkout.jpg) ─ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-950 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to cart
          </Link>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-lg text-gray-950">
              Petfeb Solar
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ENGINEERED SYSTEMS
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-200/80 font-semibold text-[11px]">
            <Lock className="w-3 h-3 text-amber-700" />
            256-Bit SSL Encrypted Escrow • Paystack Verified
          </span>

          <div className="hidden md:flex items-center gap-1.5 text-gray-600">
            <Phone className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Procurement Support:</span>
            <a
              href="tel:+234800738332"
              className="font-bold text-gray-900 hover:text-[#3F6B1A]"
            >
              +234 800 PETFEB SOLAR
            </a>
          </div>
        </div>
      </div>

      {/* ── Checkout Telemetry & Stepper Bar ──────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 text-xs">
        <div className="flex items-center gap-3 sm:gap-6 text-gray-700 font-medium">
          <div className="flex items-center gap-1.5 text-[#3F6B1A] font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
            <span>1. Your Details</span>
          </div>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1.5 text-gray-950 font-bold">
            <span className="w-4 h-4 rounded-full bg-[#7BB042] text-white flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            <span>2. Delivery &amp; Installation</span>
          </div>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">
              3
            </span>
            <span>3. Review &amp; Pay</span>
          </div>
        </div>

        {/* Telemetry Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500 font-medium">
            Checkout Telemetry: 60%
          </span>
          <div className="flex gap-1 h-1.5 w-24">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i < 6 ? "bg-[#7BB042]" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Form Grid ────────────────────────────────────── */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
        {/* Left Column: Form Sections 1, 2, 3 */}
        <div className="lg:col-span-8 space-y-6">
          {/* ── Section 1: Your Details ─────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#3F6B1A] text-xs font-extrabold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-heading font-extrabold text-lg text-gray-950">
                  Your Details
                </h2>
              </div>
              <span className="text-[11px] text-gray-500 font-medium">
                No account needed — quick guest checkout
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-800 block">
                  Full Name (Contact / Project Lead) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Engr. Babatunde Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-800 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="babatunde@lagosbiz.ng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] text-sm text-gray-900"
                  />
                  <span className="text-[11px] text-gray-500 block">
                    We&apos;ll send your order number, invoice, and dispatch updates to this email.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-800 block">
                    Phone Number (Dispatch Contact) *
                  </label>
                  <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#7BB042]">
                    <span className="px-3.5 py-3 bg-gray-50 border-r border-gray-300 text-xs font-semibold text-gray-600 flex items-center">
                      +234
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="0803 456 7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-3 focus:outline-none text-sm text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 2: Delivery & Site Location ─────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#3F6B1A] text-xs font-extrabold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-heading font-extrabold text-lg text-gray-950">
                  Delivery &amp; Site Location
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#3F6B1A] flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Nationwide Logistics
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-800 block">
                  Street Address / Facility Gate *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Plot 14, Commercial Avenue, Victoria Island"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-800 block">
                    State *
                  </label>
                  <div className="relative">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full appearance-none px-3.5 py-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] text-sm text-gray-900 bg-white cursor-pointer"
                    >
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-800 block">
                    City / Local Govt. Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Victoria Island / Eti-Osa"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-800 block">
                  Delivery &amp; Unloading Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Commercial building with loading dock, delivery between 9am - 4pm"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] text-sm text-gray-900"
                />
              </div>

              {/* Logistics Dispatch Fee Pill */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#7BB042]" />
                  <span>Dispatched from {state.includes("Abuja") ? "Abuja" : "Lagos Central"} Hub via heavy-goods logistics</span>
                </div>
                <span className="font-heading font-extrabold text-gray-950 text-sm">
                  {formatNaira(deliveryFee)}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 italic">
                (demo placeholder, pending Petfeb approval)
              </p>
            </div>

            {/* ── Critical Question: Do you want an installer? ── */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-950">
                  Do you want an installer?
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  NEMSA VERIFIED
                </span>
              </div>
              <p className="text-xs text-gray-600">
                All installations are performed by certified NEMSA-registered engineers with earthing and surge protection verification.
              </p>

              {/* Two Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Yes, I want an installer */}
                <div
                  onClick={() => setWantsInstaller(true)}
                  className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-3 relative ${
                    wantsInstaller
                      ? "border-[#7BB042] bg-emerald-50/40"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#3F6B1A] flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-[#7BB042]" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        wantsInstaller
                          ? "bg-[#7BB042] border-[#7BB042] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {wantsInstaller && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-sm text-gray-950">
                      Yes, I want an installer
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      A certified Petfeb installation engineer will contact you within 24 hours to schedule a pre-install site assessment and turnkey commissioning.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Turnkey Service</span>
                    <span className="font-heading font-extrabold text-[#3F6B1A]">
                      +₦120,000
                    </span>
                  </div>
                </div>

                {/* Option 2: No, I'll arrange my own */}
                <div
                  onClick={() => setWantsInstaller(false)}
                  className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-3 relative ${
                    !wantsInstaller
                      ? "border-[#7BB042] bg-emerald-50/40"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        !wantsInstaller
                          ? "bg-[#7BB042] border-[#7BB042] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {!wantsInstaller && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-sm text-gray-950">
                      No, I&apos;ll arrange my own
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Hardware delivered to your door. Installation handled by your own qualified electrical engineer. Petfeb warranty guidelines apply.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Self-Installation</span>
                    <span className="font-heading font-extrabold text-gray-900">₦0</span>
                  </div>
                </div>
              </div>

              {/* Conditional Installer Details */}
              {wantsInstaller && (
                <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-4 animate-in fade-in duration-200">
                  {/* Select Site Property Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-800 block">
                      Select Site Property Type:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "Home / Residential",
                          "Commercial / Office",
                          "Industrial / Factory",
                          "Farm / Agricultural",
                        ] as PropertyType[]
                      ).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            propertyType === type
                              ? "bg-emerald-50 text-[#3F6B1A] border-2 border-[#7BB042]"
                              : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Installation Window */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-800 block">
                      Preferred Installation Window:
                    </label>
                    <div className="relative">
                      <select
                        value={installWindow}
                        onChange={(e) => setInstallWindow(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 pr-10 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
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
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Engineering Scope Alert */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-gray-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#3F6B1A]">
                      <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
                      <span>Turnkey Installation &amp; NEMSA Safety Certification: +₦120,000</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      Includes DC cable trunking, array mounting hardware, earth rod resistance testing, and surge protection integration. (Fee to be confirmed on site audit • demo terms, pending Petfeb approval).
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Section 3: Review & Pay ─────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#3F6B1A] text-xs font-extrabold flex items-center justify-center">
                3
              </span>
              <h2 className="font-heading font-extrabold text-lg text-gray-950">
                Review &amp; Pay
              </h2>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-700">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#7BB042] focus:ring-[#7BB042] w-4 h-4"
              />
              <span className="leading-relaxed">
                I agree to Petfeb&apos;s{" "}
                <Link href="/about" className="font-bold underline hover:text-[#3F6B1A]">
                  Terms of Service
                </Link>
                ,{" "}
                <Link href="/about" className="font-bold underline hover:text-[#3F6B1A]">
                  Equipment Warranty Terms
                </Link>
                , and{" "}
                <Link href="/installation" className="font-bold underline hover:text-[#3F6B1A]">
                  Installation &amp; Refund Policy
                </Link>
                .
              </span>
            </label>

            {/* Test Mode Banner */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Test mode: no real debit charges will be applied. (demo placeholder)</span>
            </div>

            {/* Main Action Button */}
            <button
              type="submit"
              disabled={isSubmitting || !agreeTerms}
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-[#7BB042] text-white hover:bg-[#6ea138] transition shadow-md cursor-pointer disabled:opacity-50 min-h-[52px]"
            >
              <Lock className="w-5 h-5" />
              {isSubmitting ? (
                "Processing Secure Dispatch..."
              ) : (
                <>Pay {formatNaira(grandTotal)} with Paystack <CreditCard className="w-5 h-5 ml-1" /></>
              )}
            </button>

            {/* Secondary Buy Small Link */}
            <div className="text-center pt-1">
              <Link
                href="/buy-small"
                className="text-xs sm:text-sm font-bold text-[#3F6B1A] hover:text-[#284910] inline-flex items-center gap-1 transition"
              >
                Or finance this order with Buy Small (from {formatNaira(weeklyInstallment)}/week)
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar (Sticky) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-heading font-extrabold text-xl text-gray-950">
                Order Summary
              </h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {items.length} System {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Item Mini Cards */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
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
                  <div
                    key={item.id}
                    className="flex items-start gap-3 py-2 border-b border-gray-50 text-xs"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayImg}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-950 truncate">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-mono truncate">
                        {item.specsSummary || "Dual-MPPT • 48V Pure Sine"} (x{item.quantity})
                      </p>
                      <span className="font-heading font-bold text-gray-950 text-xs mt-0.5 block">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Line Items Breakdown */}
            <div className="space-y-2.5 pt-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Hardware Subtotal</span>
                <span className="font-medium text-gray-900">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Logistics ({state.includes("Abuja") ? "Abuja Hub" : "Lagos Central Hub"})</span>
                <span className="font-medium text-gray-900">{formatNaira(deliveryFee)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042]" />
                  Certified Turnkey Installation
                </span>
                <span className="font-medium text-gray-900">
                  {wantsInstaller ? formatNaira(installationFee) : "₦0 (Self-Install)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nigerian VAT (7.5%)</span>
                <span className="font-medium text-emerald-800">Included</span>
              </div>

              {/* Total Payable */}
              <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
                <div>
                  <span className="font-heading font-extrabold text-base text-gray-950 block">
                    Total Payable
                  </span>
                  <span className="text-[10px] text-gray-400 italic">
                    (demo placeholder, pending Petfeb approval)
                  </span>
                </div>
                <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">
                  {formatNaira(grandTotal)}
                </span>
              </div>
            </div>

            {/* Trust Points */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>5-Year Replacement Warranty on inverter &amp; batteries</span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Certified NEMSA Electrical Engineers on site</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Paystack Escrow Protection with 256-Bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Dedicated Procurement Desk: +234 800 PETFEB</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic text-center leading-tight">
              *All fee calculations, installation schedules, and technical claims are demo placeholders,
              pending Petfeb approval. Grid synchronization subject to local distribution company compliance.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
