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
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/public-types";
import { Select } from "@/components/ui/select";

const NIGERIAN_STATES = [
  "Lagos",
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

export default function CheckoutPage() {
  const { items, subtotal, vat, total, clearCart, isHydrated } = useCart();

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Lagos");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "card" | "delivery">("bank_transfer");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<null | {
    orderId: string;
    date: string;
    items: typeof items;
    total: number;
    fullName: string;
    phone: string;
    address: string;
    state: string;
    paymentMethod: string;
  }>(null);

  const [copiedBank, setCopiedBank] = useState(false);

  if (!isHydrated) {
    return (
      <div className="py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 text-center text-gray-500">
        Loading checkout...
      </div>
    );
  }

  // Handle Order Confirmation Display
  if (orderConfirmed) {
    return (
      <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#3F6B1A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-[#7BB042]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                Order Confirmed
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950">
                Thank You For Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Your solar equipment order has been registered and scheduled for dispatch.
              </p>
            </div>
          </div>

          {/* Reference & Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-left">
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
              <span className="text-gray-400 block font-medium">Total Amount</span>
              <span className="font-heading font-extrabold text-base text-gray-950 mt-0.5 block">
                {formatNaira(orderConfirmed.total)}
              </span>
            </div>
          </div>

          {/* Bank Transfer Details if selected */}
          {orderConfirmed.paymentMethod === "bank_transfer" && (
            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#7BB042]" />
                  Corporate Wire Payment Details
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("1014829104");
                    setCopiedBank(true);
                    setTimeout(() => setCopiedBank(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F6B1A] hover:underline cursor-pointer"
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
                  <span className="font-bold text-emerald-800">{orderConfirmed.orderId}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 pt-1">
                * Please include your Order Reference as the transfer description for rapid reconciliation.
              </p>
            </div>
          )}

          {/* Purchased Items List */}
          <div className="space-y-3 text-left">
            <h3 className="font-heading font-bold text-base text-gray-900 border-b border-gray-100 pb-2">
              Itemized Equipment Summary
            </h3>
            <div className="space-y-2">
              {orderConfirmed.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1.5">
                  <div>
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-gray-500 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-heading font-bold text-gray-950">
                    {formatNaira(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-left text-xs space-y-1">
            <span className="font-bold text-gray-900 block">Delivery & Site Assessment Address:</span>
            <p className="text-gray-600">
              {orderConfirmed.fullName} • {orderConfirmed.phone}
            </p>
            <p className="text-gray-600">
              {orderConfirmed.address}, {orderConfirmed.state}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save Receipt
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/track-order?ref=${orderConfirmed.orderId}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2F5212] text-white hover:bg-[#233d0d] transition shadow-sm text-center"
              >
                <Truck className="w-3.5 h-3.5" />
                Track Order Status
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm text-center"
              >
                Return to Shop
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no confirmation active
  if (items.length === 0) {
    return (
      <div className="py-20 px-4 sm:px-8 lg:px-10 max-w-xl mx-auto text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h1 className="font-heading font-bold text-2xl text-gray-900">
          No Items in Cart to Checkout
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Please add a solar kit or equipment system to your shopping cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
        >
          Explore Solar Kits
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert("Please fill in your full name, phone number, and delivery address.");
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
        total,
        fullName,
        phone,
        address,
        state,
        paymentMethod,
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
    <div className="py-8 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="border-b border-gray-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Secure Order Settlement
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-gray-950 tracking-tight mt-1">
            Checkout & Site Dispatch
          </h1>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Cart
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact & Delivery Info */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
              <Truck className="w-5 h-5 text-[#7BB042]" />
              <h2 className="font-heading font-bold text-lg text-gray-900">
                1. Delivery & Installation Site Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-gray-700 block">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Adebayo Okonjo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  Phone Number (WhatsApp Active) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 813 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  State *
                </label>
                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] bg-white"
                >
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700 block">
                  City / Local Government *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ikeja / Port Harcourt Central"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-gray-700 block">
                  Street Address (Installation Location) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Plot 12, Commercial Road or Residential Street"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-gray-700 block">
                  Site Access Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2-storey duplex, metal roof structure, security gate access"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment & Settlement Choice */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
              <CreditCard className="w-5 h-5 text-[#7BB042]" />
              <h2 className="font-heading font-bold text-lg text-gray-900">
                2. Payment & Settlement Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option A: Bank Wire */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition ${
                  paymentMethod === "bank_transfer"
                    ? "border-[#7BB042] bg-emerald-50/50 ring-1 ring-[#7BB042]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                  className="mt-1 text-[#7BB042] focus:ring-[#7BB042]"
                />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-900 block">
                    Direct Corporate Bank Transfer (Recommended)
                  </span>
                  <p className="text-gray-600">
                    Pay securely into Petfeb International Company Limited&apos;s corporate account. Immediate order confirmation generated upon submission.
                  </p>
                </div>
              </label>

              {/* Option B: Card Online */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-[#7BB042] bg-emerald-50/50 ring-1 ring-[#7BB042]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mt-1 text-[#7BB042] focus:ring-[#7BB042]"
                />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-900 block">
                    Debit Card / Instant Paystack Simulation
                  </span>
                  <p className="text-gray-600">
                    Pay with Visa, Mastercard, or Verve. Fast electronic clearance.
                  </p>
                </div>
              </label>

              {/* Option C: Inspection / Delivery */}
              <label
                className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition ${
                  paymentMethod === "delivery"
                    ? "border-[#7BB042] bg-emerald-50/50 ring-1 ring-[#7BB042]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "delivery"}
                  onChange={() => setPaymentMethod("delivery")}
                  className="mt-1 text-[#7BB042] focus:ring-[#7BB042]"
                />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-900 block">
                    Settlement on Technical Delivery & Inspection
                  </span>
                  <p className="text-gray-600">
                    Available for registered business premises or verified residential addresses in Lagos, Abuja, and Port Harcourt.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Confirmation Button */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="font-heading font-bold text-xl text-gray-900 border-b border-gray-100 pb-4">
              Order Review ({items.length} {items.length === 1 ? "Item" : "Items"})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-xs py-1">
                  <div>
                    <span className="font-semibold text-gray-900 line-clamp-1">{i.name}</span>
                    <span className="text-gray-500">Qty: {i.quantity} × {formatNaira(i.price)}</span>
                  </div>
                  <span className="font-heading font-bold text-gray-950 shrink-0">
                    {formatNaira(i.price * i.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (7.5%)</span>
                <span className="font-medium text-gray-900">{formatNaira(vat)}</span>
              </div>
              <div className="flex justify-between">
                <span>Site Logistics & Technical Survey</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-heading font-bold text-base text-gray-950">Grand Total</span>
                <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">
                  {formatNaira(total)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm cursor-pointer disabled:opacity-70 active:scale-98"
            >
              <Lock className="w-4 h-4" />
              {isSubmitting ? "Registering Order..." : "Confirm & Place Order"}
            </button>

            <div className="pt-3 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>Certified equipment warranty with Petfeb engineering support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>Secure data transmission & direct engineering fulfillment</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
