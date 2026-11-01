"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Truck,
  Share2,
  FileText,
  Check,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get("ref") || "";

  const [activeTab, setActiveTab] = useState<"order" | "buysmall">("order");
  const [orderRef, setOrderRef] = useState(refFromQuery || "# PFB-ORD-2026-8921");
  const [contactInput, setContactInput] = useState("babatunde.adeleke@***.ng");

  const orderData = {
    orderId: "PFB-ORD-2026-8921",
    statusBadge: "Out for Delivery (Lagos Hub Fleet)",
    placedDate: "14 May 2025",
    totalAmount: 4835000,
    currentStep: 4,
    items: [
      {
        name: "Petfeb 5kW Pure Sine Wave Hybrid Inverter Dual-MPPT",
        sku: "SKU: PFB-INV-5K · Factory Warranty: 5 Years · Qty: 1",
        serial: "Serial Logged: #PFB-INV-2025-0914-A",
        price: 1850000,
      },
      {
        name: "5.12kWh LiFePO4 Rack-Mounted Lithium Storage 48V (100Ah)",
        sku: "SKU: PFB-BAT-5KWH · 6,000 Cycles @ 80% DoD · Qty: 1",
        serial: "BMS Telemetry Firmware v4.2.1",
        price: 2100000,
      },
      {
        name: "Certified DC Breakers & Surge Arrester Distribution Enclosure",
        sku: "Schneider Electric DC Breakers & Class II SPD Surge Protection · Qty: 1",
        serial: "Pre-assembled in IP65 Box",
        price: 185000,
      },
      {
        name: "NEMSA Level-3 Installation, Commissioning & Certification Service",
        sku: "Earthing test, AC/DC isolation audit, certified sign-off documentation",
        serial: "Included with Turnkey Deployment",
        price: 120000,
      },
    ],
    logistics: {
      carrier: "Petfeb Dedicated Fleet · Heavy Transit Van #04",
      lead: "Ibrahim Lawal (+234 803 *** 4821)",
      destination: "14 Admiralty Way, Lekki Phase 1, Lagos State",
      note: "Gate code pre-cleared with estate security. Heavy hydraulic lithium battery handling equipment onboard. Offloading team: 2 technicians.",
    },
    installation: {
      engineer: "Engr. Mustapha Balogun",
      license: "NEMSA Certified Lic #NG-8832",
      date: "Thursday, 15 May 2025",
      time: "Window: 10:00 AM – 2:00 PM (WAT)",
      location: "Lekki Phase 1 Installation Site · Direct roof & DB board connection",
    },
  };

  const steps = [
    { num: 1, title: "1. Order Placed", date: "14 May, 09:30 AM", tag: "Logged" },
    { num: 2, title: "2. Paystack Escrow", date: "14 May, 09:32 AM", tag: "Verified" },
    { num: 3, title: "3. Staged & Inspected", date: "14 May, 03:15 PM", tag: "QC Passed" },
    { num: 4, title: "4. In Transit", date: "Today · Est. 4:00 PM", tag: "On Route" },
    { num: 5, title: "5. NEMSA Commissioning", date: "15 May, 10:00 AM", tag: "Scheduled" },
  ];

  return (
    <div className="bg-white pb-16 overflow-x-clip font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-6 sm:pt-8 space-y-6">
        {/* ── Breadcrumb ────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-gray-900 transition">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-gray-500">Customer Portal</span>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-semibold">Track Order &amp; Financing</li>
          </ol>
        </nav>

        {/* ── Page Header Row matching Original Order Tracking Page.jpg ─ */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="flex items-start gap-4">
            <span
              className="w-[28px] h-[28px] rounded-full bg-[#F5B82E] shrink-0 mt-1"
              aria-hidden="true"
            />
            <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-950 uppercase tracking-tight leading-tight max-w-xl">
              TRACK YOUR ORDER OR FINANCING PLAN
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 uppercase max-w-md leading-relaxed font-normal">
            CHECK REAL-TIME HARDWARE DELIVERY STATUS, CERTIFIED NEMSA INSTALLATION PROGRESS, OR YOUR BUY SMALL REPAYMENT SCHEDULE. NO ACCOUNT OR PASSWORD NEEDED.
          </p>
        </div>

        {/* ── Hero Banner Image matching Original Order Tracking Page.jpg ─ */}
        <div className="relative rounded-[31px] overflow-hidden h-[300px] sm:h-[420px] lg:h-[500px] w-full shadow-sm mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bannerimages/track-order-page-banner.jpg"
            alt="Solar PV installation order tracking - Petfeb Solar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Floating Lookup Card (Black Container) matching Figma ──── */}
        <div className="bg-black text-white rounded-[28px] p-6 sm:p-8 space-y-5 shadow-lg">
          {/* Tabs Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("order")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "order"
                  ? "bg-[#7BB042] text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Order tracking
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("buysmall")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "buysmall"
                  ? "bg-[#7BB042] text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              Buy Small plan
            </button>
          </div>

          {/* Form Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-gray-300 text-xs font-medium">Order Reference Number</label>
              <input
                type="text"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="# PFB-ORD-2026-8921"
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-gray-300 text-xs font-medium">Email address or Phone number</label>
                <span className="text-[10px] text-gray-400">Registered ID</span>
              </div>
              <input
                type="text"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="babatunde.adeleke@***.ng"
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
            <span className="text-gray-400 text-[11px]">
              Lost your reference number? Check the SMS or confirmation email sent at purchase.
            </span>
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#7BB042] text-white font-bold text-xs hover:bg-[#6AA035] transition shadow-xs cursor-pointer"
            >
              Track status
            </button>
          </div>
        </div>

        {/* ── Order Status Card matching Original Order Tracking Page.jpg ─ */}
        <div className="bg-black text-white rounded-[28px] p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F5B82E]" />
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Order #{orderData.orderId}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-emerald-500/30">
                <Truck className="w-3.5 h-3.5" />
                {orderData.statusBadge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/10 text-gray-200 hover:bg-white/20 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Waybill Receipt
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Tracking URL copied to clipboard!");
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/10 text-gray-200 hover:bg-white/20 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Tracking
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Placed: {orderData.placedDate} · Escrow Gateway: Paystack Verified · Total: {formatNaira(orderData.totalAmount)}
          </div>

          {/* Stepper Bar matching Figma */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              ENGINEERING DISPATCH &amp; INSTALLATION STEPPER
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {steps.map((st) => {
                const isPassed = st.num <= 3;
                const isCurrent = st.num === 4;

                return (
                  <div
                    key={st.num}
                    className={`rounded-2xl p-4 space-y-2 border ${
                      isPassed
                        ? "bg-[#7BB042]/20 border-[#7BB042]/50 text-white"
                        : isCurrent
                        ? "bg-[#7BB042] text-white border-[#7BB042]"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isPassed ? "bg-[#7BB042] text-white" : isCurrent ? "bg-white text-black" : "bg-white/10 text-gray-400"
                      }`}>
                        {isPassed ? <Check className="w-4 h-4" /> : st.num}
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/30">
                        {st.tag}
                      </span>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs block leading-tight">
                        {st.title}
                      </span>
                      <span className="text-[10px] text-white/70 block mt-0.5">
                        {st.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Two Column Details Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Manifest & Live Dispatch */}
          <div className="lg:col-span-8 space-y-6">
            {/* Manifest */}
            <div className="bg-[#FFF8E6] border border-[#F5B82E]/40 rounded-[28px] p-6 sm:p-8 space-y-5 text-gray-950">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <h3 className="font-heading font-bold text-lg text-black flex items-center gap-2">
                  <span>⚙️ Hardware &amp; Component Manifest</span>
                </h3>
                <span className="text-xs font-semibold text-gray-700">4 Verified Line Items</span>
              </div>

              <div className="space-y-4">
                {orderData.items.map((it, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white/70 border border-black/5">
                    <div className="space-y-0.5">
                      <h4 className="font-heading font-bold text-sm text-gray-950">{it.name}</h4>
                      <p className="text-xs text-gray-600">{it.sku}</p>
                      <p className="text-[11px] text-gray-500 font-mono">{it.serial}</p>
                    </div>
                    <span className="font-heading font-bold text-sm text-gray-950 sm:text-right shrink-0">
                      {formatNaira(it.price)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs text-gray-700">
                <span>Delivery logistics, secure crating &amp; transit insurance included.</span>
                <span className="font-heading font-bold text-base text-gray-950">
                  Grand Total: {formatNaira(orderData.totalAmount)}
                </span>
              </div>
            </div>

            {/* Live Logistics Dispatch */}
            <div className="bg-[#FFF8E6] border border-[#F5B82E]/40 rounded-[28px] p-6 sm:p-8 space-y-4 text-gray-950">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <h3 className="font-heading font-bold text-base text-black flex items-center gap-2">
                  <span>✈️ Live Logistics Dispatch</span>
                </h3>
                <span className="text-[11px] font-bold text-[#3F6B1A] bg-[#E8F3DA] px-2.5 py-0.5 rounded-full">
                  • Live Fleet Beacon
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-500 block">Transport Carrier</span>
                    <strong className="text-gray-900 block">{orderData.logistics.carrier}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Assigned Logistics Lead</span>
                    <strong className="text-gray-900 block">{orderData.logistics.lead}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Delivery Destination</span>
                    <strong className="text-gray-900 block">{orderData.logistics.destination}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/70 border border-black/5 space-y-2">
                  <span className="text-[11px] font-bold text-gray-700 uppercase block">SPECIAL ENGINEERING DELIVERY NOTE</span>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    &ldquo;{orderData.logistics.note}&rdquo;
                  </p>
                  <span className="text-[10px] text-gray-500 block pt-1">
                    🛡️ All transit crew fully covered by NEMSA high-voltage safety insurance.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scheduled & Confirmed */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[28px] border border-gray-200 p-6 sm:p-7 space-y-5 shadow-sm text-gray-950">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-[#E8F3DA] px-2.5 py-0.5 rounded-full inline-block">
                  Scheduled &amp; Confirmed
                </span>
                <h3 className="font-heading font-bold text-lg text-gray-950">
                  Certified NEMSA Installation
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Commissioning is scheduled following delivery completion. A certified renewable energy engineer has been booked.
                </p>
              </div>

              {/* Engineer Card */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-bold text-xs flex items-center justify-center shrink-0">
                  MB
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-gray-950">{orderData.installation.engineer}</h4>
                  <p className="text-[11px] text-gray-500">{orderData.installation.license}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-2 text-xs text-gray-700">
                <div>
                  <strong className="text-gray-950 block">{orderData.installation.date}</strong>
                  <span className="text-gray-500">{orderData.installation.time}</span>
                </div>
                <div>
                  <strong className="text-gray-950 block">Lekki Phase 1 Installation Site</strong>
                  <span className="text-gray-500">Direct roof &amp; DB board connection</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <span className="text-[11px] font-bold text-gray-500 uppercase block">Site Readiness Checklist:</span>
                <div className="flex items-center gap-1.5 text-xs text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Roof mounting brackets pre-inspected</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Conduit trunking and AC Inverter wall cleared</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                  <span>Main distribution board breaker accessible</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:+2348135854054"
                  className="w-full py-3.5 rounded-xl bg-[#7BB042] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#6AA035] transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call installation coordinator</span>
                </a>
              </div>
            </div>

            {/* Need to reschedule */}
            <div className="bg-[#FFF8E6] border border-[#F5B82E]/40 rounded-2xl p-5 space-y-2 text-xs text-gray-950">
              <h4 className="font-heading font-bold text-sm text-black">Need to reschedule delivery?</h4>
              <p className="text-gray-700 leading-relaxed">
                You can adjust your dispatch time slot without penalty up to 3 hours prior to truck departure.
              </p>
              <Link href="/contact" className="font-bold text-[#3F6B1A] hover:underline block pt-1">
                Contact Fleet Logistics →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Engineering Support Desk Banner matching Figma ─────────── */}
        <div className="rounded-[24px] border border-gray-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">ENGINEERING SUPPORT DESK</span>
            <h3 className="font-heading font-bold text-lg text-gray-950 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B82E]" />
              Need assistance with your dispatch or financing agreement?
            </h3>
            <p className="text-xs text-gray-600">
              Our certified engineering support engineers are on standby for inverter synchronization queries, dispatch reschedules, or direct debit changes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <span className="text-xs text-gray-500 border border-gray-200 px-3 py-2 rounded-xl">
              NEMSA Compliance Desk
            </span>
            <a
              href="tel:+2348135854054"
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 hover:bg-gray-50 transition flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#7BB042]" />
              +234 813-585-4054
            </a>
            <a
              href="https://wa.me/2348135854054"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#7BB042] text-white text-xs font-bold hover:bg-[#6AA035] transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Direct Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 max-w-[1400px] mx-auto px-4 text-center text-gray-500 font-sans">
          Loading order telemetry...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
