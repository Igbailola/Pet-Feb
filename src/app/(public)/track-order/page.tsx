"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Wrench,
  ShieldCheck,
  Building2,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Share2,
  FileText,
  Check,
  PhoneCall,
  MessageSquare,
  AlertCircle,
  Zap,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get("ref") || "";

  const [activeTab, setActiveTab] = useState<"order" | "buysmall">("order");
  const [orderRef, setOrderRef] = useState(refFromQuery || "PFB-ORD-2026-8921");
  const [contactInput, setContactInput] = useState("babatunde.adeleke@gmail.com");
  const [hasQueried, setHasQueried] = useState(true);

  // Demo Order Data matching stitch frame
  const orderData = {
    orderId: "PFB-ORD-2026-8921",
    statusBadge: "Out for Delivery (Lagos Hub Fleet)",
    placedDate: "14 May 2025",
    totalAmount: 4835000,
    currentStep: 4,
    items: [
      {
        name: "Petfeb 5kW Pure Sine Wave Hybrid Inverter Dual-MPPT",
        sku: "PFB-INV-5K · Factory Warranty: 5 Years · Qty: 1",
        serial: "Serial Logged: #PFB-INV-2025-0914-A",
        price: 1850000,
      },
      {
        name: "5.12kWh LiFePO4 Rack-Mounted Lithium Storage 48V (100Ah)",
        sku: "PFB-BAT-5KWH · 6,000 Cycles @ 80% DoD · Qty: 1",
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
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* ── 1. Header Band (Green-50 with breadcrumb and title) ──────── */}
      <section className="bg-[#F4F9EC] border-b border-[#D9D9D9] pt-8 sm:pt-12 pb-10 sm:pb-14 relative overflow-hidden">
        {/* Subtle sun-arc motif in top right */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none opacity-20 border-[24px] border-[#7BB042]"
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10 space-y-6">
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

          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#D9D9D9] text-[#3F6B1A]">
              <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
              <span>Live Telemetry &amp; Repayment Hub</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
              Track your order or financing plan
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              Check real-time hardware delivery status, certified NEMSA installation progress, or your Buy Small repayment schedule. No account or password needed.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Floating Lookup Card ──────────────────────────────────── */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 shadow-md space-y-5">
          {/* Tabs Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="inline-flex items-center rounded-xl bg-gray-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("order")}
                className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                  activeTab === "order"
                    ? "bg-white text-gray-900 shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Order Tracking
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("buysmall")}
                className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                  activeTab === "buysmall"
                    ? "bg-white text-gray-900 shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Buy Small Plan
              </button>
            </div>

            <span className="text-[11px] text-gray-400 hidden sm:inline">
              Simulate: Real-Time Telemetry
            </span>
          </div>

          {/* Form Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-gray-700">
                  {activeTab === "order" ? "Order Reference Number" : "Agreement Number"}
                </label>
                <span className="text-[10px] text-gray-400">Pre-filled demo</span>
              </div>
              <input
                type="text"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value)}
                placeholder="e.g. PFB-ORD-2026-8921"
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black font-mono font-medium"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-gray-700">Email address or Phone number</label>
                <span className="text-[10px] text-gray-400">Registered ID</span>
              </div>
              <input
                type="text"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="babatunde@domain.ng"
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <p className="text-[11px] text-gray-500">
              Lost your reference number? Check the SMS or confirmation email sent at purchase.
            </p>

            <button
              type="button"
              onClick={() => setHasQueried(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs cursor-pointer shrink-0 min-h-[44px]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Status</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Order Result Dashboard (Stitch Frame) ────────────────── */}
      {hasQueried && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
          {/* Order Header Card */}
          <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-900">
                    Order #{orderData.orderId}
                  </h2>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/30">
                    {orderData.statusBadge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Placed: {orderData.placedDate} · Escrow Gateway: Paystack Verified · Total: {formatNaira(orderData.totalAmount)}{" "}
                  <span className="text-gray-400">(demo placeholders, pending Petfeb approval)</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D9D9D9] text-gray-700 hover:bg-gray-50 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-500" />
                  <span>Waybill Receipt</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D9D9D9] text-gray-700 hover:bg-gray-50 transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Share Tracking</span>
                </button>
              </div>
            </div>

            {/* Stepper per stitch frame */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                ENGINEERING DISPATCH &amp; INSTALLATION STEPPER
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {steps.map((st) => {
                  const isDone = st.num < orderData.currentStep;
                  const isCurrent = st.num === orderData.currentStep;

                  return (
                    <div
                      key={st.num}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                        isCurrent
                          ? "bg-[#E8F3DA] border-[#7BB042]"
                          : isDone
                          ? "bg-[#F8F9FA] border-[#D9D9D9]"
                          : "bg-white border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isDone || isCurrent
                              ? "bg-[#7BB042] text-black"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isDone ? "✓" : st.num}
                        </div>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white border border-gray-200">
                          {st.tag}
                        </span>
                      </div>

                      <div>
                        <span className="font-heading font-bold text-xs text-gray-900 block">
                          {st.title}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {st.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dual Column Manifest & Installation Cards (Desktop 7/5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Manifest & Logistics */}
            <div className="lg:col-span-7 space-y-6">
              {/* Hardware & Component Manifest */}
              <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#3F6B1A]" />
                    <h3 className="font-heading font-bold text-base text-gray-900">
                      Hardware &amp; Component Manifest
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400">4 Verified Line Items</span>
                </div>

                <div className="divide-y divide-gray-100 space-y-1">
                  {orderData.items.map((it, idx) => (
                    <div key={idx} className="pt-3 pb-3 flex items-start justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="font-heading font-bold text-gray-900 block text-sm">
                          {it.name}
                        </span>
                        <p className="text-gray-500">{it.sku}</p>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">
                          {it.serial}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-heading font-bold text-sm text-gray-900 block">
                          {formatNaira(it.price)}
                        </span>
                        <span className="text-[10px] text-gray-400">Unit price</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Delivery logistics, secure crating &amp; transit insurance included
                  </span>
                  <span className="font-heading font-extrabold text-base text-gray-950">
                    Grand Total: {formatNaira(orderData.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Live Logistics Dispatch */}
              <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#3F6B1A]" />
                    <h3 className="font-heading font-bold text-base text-gray-900">
                      Live Logistics Dispatch
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F3DA] text-[#3F6B1A]">
                    ● Live Fleet Beacon
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 block">Transport Carrier</span>
                      <strong className="text-gray-900">{orderData.logistics.carrier}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Assigned Logistics Lead</span>
                      <strong className="text-gray-900">{orderData.logistics.lead}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Delivery Destination</span>
                      <strong className="text-gray-900">{orderData.logistics.destination}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A] block">
                      SPECIAL ENGINEERING DELIVERY NOTE
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      &ldquo;{orderData.logistics.note}&rdquo;
                    </p>
                    <div className="pt-2 text-[10px] text-gray-400 flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#7BB042]" />
                      <span>All transit crew fully covered by NEMSA high-voltage safety insurance.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Certified Installation & Assistance */}
            <div className="lg:col-span-5 space-y-6">
              {/* Certified NEMSA Installation Card */}
              <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 space-y-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#E8F3DA] text-[#3F6B1A]">
                    Scheduled &amp; Confirmed
                  </span>
                  <span className="text-xs text-gray-400">Phase 2</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-gray-900">
                    Certified NEMSA Installation
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Commissioning is scheduled following delivery completion. A certified renewable energy engineer has been booked.
                  </p>
                </div>

                {/* Engineer Card */}
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-extrabold text-xs flex items-center justify-center">
                    MB
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-gray-900 block">
                      {orderData.installation.engineer}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {orderData.installation.license}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">{orderData.installation.date}</strong>
                      <span className="text-gray-500">{orderData.installation.time}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Installation Site</strong>
                      <span className="text-gray-500">{orderData.installation.location}</span>
                    </div>
                  </div>
                </div>

                {/* Site Readiness Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block">Site Readiness Checklist:</span>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>Roof mounting brackets pre-inspected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>Conduit trunking and AC inverter wall cleared</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>Main distribution board breaker accessible</span>
                  </div>
                </div>

                <a
                  href="tel:+234800738332"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs text-center cursor-pointer min-h-[46px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Installation Coordinator</span>
                </a>

                <p className="text-[10px] text-gray-400 text-center">
                  All dates &amp; metrics are demo placeholders, pending Petfeb approval.
                </p>
              </div>

              {/* Need to reschedule card */}
              <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 space-y-2 text-xs">
                <span className="font-bold text-gray-900 block">Need to reschedule delivery?</span>
                <p className="text-gray-500">
                  You can adjust your dispatch time slot without penalty up to 3 hours prior to truck departure.
                </p>
                <Link
                  href="/contact"
                  className="font-semibold text-[#3F6B1A] hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Contact Fleet Logistics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Engineering Support Desk Band (Stitch Frame) ──────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              ENGINEERING SUPPORT DESK
            </span>
            <h3 className="font-heading font-bold text-xl text-gray-900">
              Need assistance with your dispatch or financing agreement?
            </h3>
            <p className="text-xs text-gray-500">
              Our certified engineering support engineers are on standby for inverter synchronization queries, dispatch reschedules, or direct debit changes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+234800738332"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold border border-[#D9D9D9] text-gray-900 hover:bg-gray-50 transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>+234 (0) 800-PETFEB-NG</span>
            </a>
            <a
              href="https://wa.me/2348135854054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs min-h-[46px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct Support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-gray-500">
          Loading telemetry tracker...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
