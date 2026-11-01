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
  Package,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Info,
  Search,
  Hash,
  User,
  Wrench,
  Clock,
  Zap,
  BatteryCharging,
  AlertCircle,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";

interface TrackedLineItem {
  name: string;
  sku: string;
  serial: string;
  price: number;
  priceLabel?: string;
  iconType?: "inverter" | "battery" | "breaker" | "service";
}

interface TrackedOrderData {
  orderId: string;
  statusBadge: string;
  placedDate: string;
  totalAmount: number;
  currentStep: number;
  items: TrackedLineItem[];
  logistics: {
    carrier: string;
    leadName: string;
    leadPhone: string;
    destination: string;
    note: string;
  };
  installation: {
    engineer: string;
    initials: string;
    license: string;
    date: string;
    time: string;
    siteTitle: string;
    siteSub: string;
  };
}

const DEFAULT_ORDER_DATA: TrackedOrderData = {
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
      priceLabel: "Unit price",
      iconType: "inverter",
    },
    {
      name: "5.12kWh LiFePO4 Rack-Mounted Lithium Storage 48V (100Ah)",
      sku: "SKU: PFB-BAT-5KWH · 6,000 Cycles @ 80% DoD · Qty: 1",
      serial: "BMS Telemetry Firmware v4.2.1",
      price: 2100000,
      priceLabel: "Unit price",
      iconType: "battery",
    },
    {
      name: "Certified DC Breakers & Surge Arrester Distribution Enclosure",
      sku: "Schneider Electric DC Breakers & Class II SPD Surge Protection · Qty: 1",
      serial: "Pre-assembled in IP65 Box",
      price: 185000,
      priceLabel: "Unit price",
      iconType: "breaker",
    },
    {
      name: "NEMSA Level-3 Installation, Commissioning & Certification Service",
      sku: "Earthing test, AC/DC isolation audit, certified sign-off documentation",
      serial: "Included with Turnkey Deployment",
      price: 120000,
      priceLabel: "Bundled",
      iconType: "service",
    },
  ],
  logistics: {
    carrier: "Petfeb Dedicated Fleet · Heavy Transit Van #04",
    leadName: "Ibrahim Lawal",
    leadPhone: "(+234 803 *** 4821)",
    destination: "14 Admiralty Way, Lekki Phase 1, Lagos State",
    note: "Gate code pre-cleared with estate security. Heavy hydraulic lithium battery handling equipment onboard. Offloading team: 2 technicians.",
  },
  installation: {
    engineer: "Engr. Mustapha Balogun",
    initials: "MB",
    license: "NEMSA Certified Lic #NG-8832",
    date: "Thursday, 15 May 2025",
    time: "Window: 10:00 AM – 2:00 PM (WAT)",
    siteTitle: "Lekki Phase 1 Installation Site",
    siteSub: "Direct roof & DB board connection",
  },
};

function resolveStoredOrder(rawRef: string): {
  order: TrackedOrderData;
  contact?: string;
  found: boolean;
} {
  const cleaned = rawRef.replace(/^#\s*/, "").trim();
  if (
    !cleaned ||
    cleaned.toUpperCase() === "PFB-ORD-2026-8921" ||
    cleaned.toUpperCase() === "PFB-BNPL-2026-8921"
  ) {
    return { order: DEFAULT_ORDER_DATA, found: true };
  }

  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("petfeb_orders") || "[]");
      const matched = stored.find(
        (o: { orderId?: string }) =>
          o.orderId && o.orderId.toUpperCase() === cleaned.toUpperCase()
      );
      if (matched) {
        const mappedItems: TrackedLineItem[] = Array.isArray(matched.items)
          ? matched.items.map(
              (it: {
                name: string;
                specsSummary?: string;
                quantity?: number;
                price: number;
              }) => ({
                name: it.name,
                sku: `${it.specsSummary || "Certified Solar Hardware"} · Qty: ${
                  it.quantity || 1
                }`,
                serial: "Serial Logged: Verified in Petfeb Warehouse",
                price: it.price * (it.quantity || 1),
                priceLabel: "Unit price",
                iconType: "inverter" as const,
              })
            )
          : DEFAULT_ORDER_DATA.items;

        if (matched.wantsInstaller) {
          mappedItems.push({
            name: "NEMSA Level-3 Installation, Commissioning & Certification Service",
            sku: "Earthing test, AC/DC isolation audit, certified sign-off documentation",
            serial: "Included with Turnkey Deployment",
            price: 120000,
            priceLabel: "Bundled",
            iconType: "service",
          });
        }

        return {
          order: {
            orderId: matched.orderId,
            statusBadge: matched.status || "Out for Delivery (Lagos Hub Fleet)",
            placedDate: matched.date || "Today",
            totalAmount: matched.total || DEFAULT_ORDER_DATA.totalAmount,
            currentStep: 4,
            items: mappedItems,
            logistics: {
              ...DEFAULT_ORDER_DATA.logistics,
              destination: `${matched.address || "Plot 14, Commercial Avenue"}, ${
                matched.city ? `${matched.city}, ` : ""
              }${matched.state || "Lagos State"}`,
            },
            installation: {
              ...DEFAULT_ORDER_DATA.installation,
              siteTitle: `${matched.city || matched.state || "Lagos"} Installation Site`,
            },
          },
          contact: matched.email || matched.phone,
          found: true,
        };
      }
    } catch {}
  }

  return { order: DEFAULT_ORDER_DATA, found: false };
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get("ref") || "";

  const [activeTab, setActiveTab] = useState<"order" | "buysmall">("order");
  const [orderRef, setOrderRef] = useState(refFromQuery || "PFB-ORD-2026-8921");
  const [contactInput, setContactInput] = useState(() => {
    if (refFromQuery) {
      const res = resolveStoredOrder(refFromQuery);
      if (res.contact) return res.contact;
    }
    return "babatunde.adeleke@***.ng";
  });
  const [activeOrder, setActiveOrder] = useState<TrackedOrderData>(() => {
    if (refFromQuery) {
      return resolveStoredOrder(refFromQuery).order;
    }
    return DEFAULT_ORDER_DATA;
  });
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [notFoundRef, setNotFoundRef] = useState<string | null>(() => {
    if (refFromQuery) {
      const res = resolveStoredOrder(refFromQuery);
      return res.found ? null : refFromQuery.replace(/^#\s*/, "").trim();
    }
    return null;
  });
  const [copiedShare, setCopiedShare] = useState(false);

  const lookupOrderByRef = (rawRef: string) => {
    const cleaned = rawRef.replace(/^#\s*/, "").trim();
    if (!cleaned) {
      setLookupError("Please enter a valid Order Reference Number or Buy Small Plan ID.");
      return;
    }

    setLookupError(null);
    const res = resolveStoredOrder(cleaned);
    setActiveOrder(res.order);
    if (res.contact) {
      setContactInput(res.contact);
    }
    setNotFoundRef(res.found ? null : cleaned);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupOrderByRef(orderRef);
  };

  const steps = [
    {
      num: 1,
      title: "1. Order Placed",
      date: "14 May, 09:30 AM",
      tag: "Logged",
      status: "completed" as const,
    },
    {
      num: 2,
      title: "2. Paystack Escrow",
      date: "14 May, 09:32 AM",
      tag: "Verified",
      status: "completed" as const,
    },
    {
      num: 3,
      title: "3. Staged & Inspected",
      date: "14 May, 03:15 PM",
      tag: "QC Passed",
      status: "completed" as const,
    },
    {
      num: 4,
      title: "4. In Transit",
      date: "Today · Est. 4:00 PM",
      tag: "On Route",
      status: "active" as const,
    },
    {
      num: 5,
      title: "5. NEMSA Commissioning",
      date: "15 May, 10:00 AM",
      tag: "Scheduled",
      status: "upcoming" as const,
    },
  ];

  return (
    <div className="bg-[#FBF9F8] pb-20 overflow-x-clip font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[32px] pt-6 sm:pt-10 space-y-[24px]">
        {/* ── Section 1: Breadcrumb Bar (Node 6195:2024) ────────────── */}
        <div className="border-b border-[#D9D9D9] pb-[17px] pt-[16px] px-2 sm:px-[24px]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-[8px] text-[14px]">
              <li>
                <Link
                  href="/"
                  className="font-sans text-[#737968] hover:text-[#1B1C1C] transition"
                >
                  Home
                </Link>
              </li>
              <li className="font-heading text-[12px] text-[#737968] select-none">/</li>
              <li>
                <span className="font-sans text-[#737968]">Customer Portal</span>
              </li>
              <li className="font-heading text-[12px] text-[#737968] select-none">/</li>
              <li className="font-sans font-bold text-[#3D6A00]">
                Track Order &amp; Financing
              </li>
            </ol>
          </nav>
        </div>

        {/* ── Section 2: Page Header Row (Node 6146:5171) ───────────── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
          <div className="flex items-center gap-[16px] max-w-[803px]">
            <span
              className="size-[24px] sm:size-[30px] rounded-full bg-[#F5B82E] shrink-0"
              aria-hidden="true"
            />
            <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-[48px] text-[#333333] uppercase tracking-[2px] sm:tracking-[3px] leading-tight">
              Track your order or financing plan
            </h1>
          </div>

          <p className="font-sans font-normal text-sm sm:text-[18px] text-[#333333] uppercase leading-[1.6] max-w-[532px]">
            Check real-time hardware delivery status, certified NEMSA installation progress, or your Buy Small repayment schedule. No account or password needed.
          </p>
        </div>

        {/* ── Section 3: Hero Banner Image (Node 6195:2072) ─────────── */}
        <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden h-[280px] sm:h-[460px] lg:h-[680px] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bannerimages/track-order-page-banner.jpg"
            alt="Track your solar order or Buy Small financing plan - Petfeb Solar"
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

        {/* ── Section 4: Guest Lookup Card Section (Node 6195:2862) ──── */}
        <div className="bg-black border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[33px] space-y-[24px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
          {/* Segmented Toggle Tabs (Node 6195:2864) */}
          <div className="border-b border-[#D9D9D9] pb-[17px]">
            <div className="bg-[#D6E7C4] border border-[#7BB042] rounded-[10px] p-[6px] inline-flex flex-wrap sm:flex-nowrap gap-[8px] w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("order")}
                className={`flex-1 sm:flex-initial px-6 sm:px-[43px] py-[12px] rounded-[8px] inline-flex items-center justify-center gap-[8px] font-heading text-[14px] leading-[20px] transition cursor-pointer ${
                  activeTab === "order"
                    ? "bg-[#7BB042] text-white font-semibold shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                    : "text-[#344A1C] font-medium hover:bg-white/40"
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span>Order tracking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("buysmall")}
                className={`flex-1 sm:flex-initial px-6 sm:px-[44px] py-[12px] rounded-[8px] inline-flex items-center justify-center gap-[8px] font-heading text-[14px] leading-[20px] transition cursor-pointer ${
                  activeTab === "buysmall"
                    ? "bg-[#7BB042] text-white font-semibold shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                    : "text-[#344A1C] font-medium hover:bg-white/40"
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Buy Small plan</span>
              </button>
            </div>
          </div>

          {/* Form Grid (Node 6195:2889) */}
          <form onSubmit={handleTrackSubmit} noValidate className="space-y-[16px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] sm:gap-[26px]">
              {/* Field 1: Reference Number */}
              <div className="space-y-[6px]">
                <label
                  htmlFor="track-order-ref"
                  className="font-heading font-semibold text-[12px] text-white leading-[16px] block"
                >
                  {activeTab === "order"
                    ? "Order Reference Number"
                    : "Buy Small Plan Reference"}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-[12px] flex items-center pointer-events-none text-[#737968]">
                    <Hash className="w-4 h-4" />
                  </span>
                  <input
                    id="track-order-ref"
                    type="text"
                    value={orderRef}
                    onChange={(e) => setOrderRef(e.target.value)}
                    placeholder="PFB-ORD-2026-8921"
                    className="w-full h-[44px] pl-[37px] pr-[13px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>
              </div>

              {/* Field 2: Contact Verification */}
              <div className="space-y-[6px]">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="track-contact-id"
                    className="font-heading font-semibold text-[12px] text-white leading-[16px]"
                  >
                    Email address or Phone number
                  </label>
                  <span className="font-heading text-[11px] text-[#EBEBEB] leading-[16px]">
                    Registered ID
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-[12px] flex items-center pointer-events-none text-[#737968]">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="track-contact-id"
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="babatunde.adeleke@***.ng"
                    className="w-full h-[44px] pl-[37px] pr-[13px] rounded-[10px] border border-[#8A8A8A] bg-white text-[14px] text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                  />
                </div>
              </div>
            </div>

            {lookupError && (
              <div
                role="alert"
                className="text-xs text-[#F5B82E] flex items-center gap-1.5 pt-1"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lookupError}</span>
              </div>
            )}

            {/* Helper Row & Submit Button (Node 6195:2921) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-[8px]">
              <div className="flex items-center gap-[6px] text-[#EBEBEB] text-[12px]">
                <Info className="w-[14px] h-[14px] text-[#EBEBEB] shrink-0" />
                <span>
                  Lost your reference number? Check the SMS or confirmation email sent at purchase.
                </span>
              </div>

              <button
                type="submit"
                className="bg-[#7BB042] hover:bg-[#70A03C] text-white font-heading font-bold text-[14px] tracking-[0.28px] px-[32px] py-[12px] rounded-[10px] inline-flex items-center justify-center gap-[8px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Track status</span>
              </button>
            </div>
          </form>
        </div>

        {/* ── Optional Not-Found Notice ─────────────────────────────── */}
        {notFoundRef && (
          <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F5B82E] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="font-heading font-bold text-base text-[#1B1C1C]">
                  No dispatch record found for &ldquo;{notFoundRef}&rdquo;
                </h2>
                <p className="text-xs text-[#42493A]">
                  Showing live telemetry for sample order{" "}
                  <strong className="font-semibold">#PFB-ORD-2026-8921</strong> below. Verify your reference code or contact our Engineering Support Desk.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOrderRef("PFB-ORD-2026-8921");
                setNotFoundRef(null);
                setActiveOrder(DEFAULT_ORDER_DATA);
              }}
              className="px-4 py-2 rounded-[10px] bg-[#E8F3DA] text-[#3F6B1A] font-heading font-bold text-xs hover:bg-[#d6e7c4] transition cursor-pointer shrink-0"
            >
              Reset to #PFB-ORD-2026-8921
            </button>
          </div>
        )}

        {/* ── Section 5: Result Header Bar & 5-Stage Progress Stepper (Node 6195:2494) ── */}
        <div className="bg-black border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[24px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
          {/* Top Bordered Row (Node 6195:2496) */}
          <div className="border-b border-[#D9D9D9] pb-[25px] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-[12px]">
              <div className="flex flex-wrap items-center gap-[12px]">
                <span className="size-[20px] rounded-full bg-[#F5B82E] text-black flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <h2 className="font-heading font-bold text-[20px] sm:text-[24px] text-white tracking-[-0.24px] leading-[32px]">
                  {activeTab === "buysmall"
                    ? `Buy Small Plan #${activeOrder.orderId}`
                    : `Order #${activeOrder.orderId}`}
                </h2>
                <span className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.3)] rounded-full px-[13px] py-[7px] inline-flex items-center gap-[6px]">
                  <Truck className="w-[14px] h-[14px] text-[#3F6B1A]" />
                  <span className="font-heading font-semibold text-[12px] text-[#3F6B1A] leading-[16px]">
                    {activeOrder.statusBadge}
                  </span>
                </span>
              </div>

              <p className="font-heading text-[12px] text-[#EBEBEB] leading-[16px]">
                Placed:{" "}
                <span className="text-white">{activeOrder.placedDate}</span>
                {"  ·  "}Escrow Gateway:{" "}
                <span className="text-white">Paystack Verified</span>
                {"  ·  "}Total:{" "}
                <span className="text-white">
                  {formatNaira(activeOrder.totalAmount)}
                </span>
              </p>
            </div>

            {/* Print / Share Quick Actions (Node 6195:2512) */}
            <div className="flex flex-wrap items-center gap-[8px]">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-white border border-[#D9D9D9] rounded-[10px] px-[15px] py-[9px] inline-flex items-center gap-[6px] font-heading font-semibold text-[12px] text-[#1B1C1C] hover:bg-[#F0EDED] transition cursor-pointer"
              >
                <FileText className="w-[14px] h-[14px] text-[#1B1C1C]" />
                <span>Waybill Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedShare(true);
                    setTimeout(() => setCopiedShare(false), 2000);
                  }
                }}
                className="bg-white border border-[#D9D9D9] rounded-[10px] px-[15px] py-[9px] inline-flex items-center gap-[6px] font-heading font-semibold text-[12px] text-[#1B1C1C] hover:bg-[#F0EDED] transition cursor-pointer"
              >
                <Share2 className="w-[14px] h-[14px] text-[#1B1C1C]" />
                <span>{copiedShare ? "Link Copied!" : "Share Tracking"}</span>
              </button>
            </div>
          </div>

          {/* 5-Stage Visual Progress Timeline / Stepper (Node 6195:2529) */}
          <div className="space-y-[24px]">
            <h3 className="font-heading font-semibold text-[12px] text-[#EBEBEB] uppercase tracking-[0.6px] leading-[16px]">
              ENGINEERING DISPATCH &amp; INSTALLATION STEPPER
            </h3>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[16px]">
              {/* Desktop Connecting Line Behind (Node 6195:2533) */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute bg-[#5C5C5C] h-[2px] left-[40px] right-[40px] top-[20px]"
              />

              {steps.map((st) => {
                const isCompleted = st.status === "completed";
                const isActive = st.status === "active";

                return (
                  <div
                    key={st.num}
                    className="flex flex-col items-center text-center gap-[8px] relative z-10"
                  >
                    {/* Step Circle */}
                    {isCompleted ? (
                      <div className="size-[40px] rounded-full bg-[#7BB042] text-white flex items-center justify-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    ) : isActive ? (
                      <div className="size-[40px] rounded-full bg-[#E8F3DA] border-2 border-[#7BB042] flex items-center justify-center relative shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                        <div className="absolute inset-0 rounded-full bg-[rgba(123,176,66,0.3)] pointer-events-none" />
                        <Truck className="w-5 h-5 text-[#3D6A00] relative z-10" />
                      </div>
                    ) : (
                      <div className="size-[40px] rounded-full bg-[#EAE8E7] border border-[#C2C9B5] text-[#5C5C5C] flex items-center justify-center">
                        <Wrench className="w-5 h-5" />
                      </div>
                    )}

                    {/* Step Labels */}
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-heading font-bold text-[12px] leading-[16px] ${
                          isActive
                            ? "text-[#7BB042]"
                            : isCompleted
                            ? "text-white"
                            : "text-[#EBEBEB]"
                        }`}
                      >
                        {st.title}
                      </span>
                      <span
                        className={`font-heading text-[11px] leading-[16.5px] pb-[4px] ${
                          isActive
                            ? "font-semibold text-white"
                            : isCompleted
                            ? "text-[#EBEBEB]"
                            : "text-[#C0C0C0]"
                        }`}
                      >
                        {st.date}
                      </span>

                      {/* Status Badge */}
                      {isCompleted ? (
                        <span className="bg-[#E8F3DA] text-[#3F6B1A] font-heading text-[10px] leading-[15px] px-[6px] py-[2px] rounded-[4px]">
                          {st.tag}
                        </span>
                      ) : isActive ? (
                        <span className="bg-[#7BB042] text-white font-heading font-semibold text-[10px] leading-[15px] px-[8px] py-[2px] rounded-full">
                          {st.tag}
                        </span>
                      ) : (
                        <span className="bg-[#EAE8E7] text-[#5C5C5C] font-sans text-[10px] leading-[15px] px-[6px] py-[2px] rounded-[4px]">
                          {st.tag}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Section 6: 2-Column Details Layout in Yellow Container (Node 6195:2597) ── */}
        <div className="bg-[#F5B82E] rounded-[24px] sm:rounded-[32px] p-4 sm:p-[24px] grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
          {/* ── LEFT 8 COLS: Hardware Breakdown & Live Dispatch (Node 6195:2598) ── */}
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            {/* Card 1: Hardware & Component Manifest (Node 6195:2599) */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[16px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
              <div className="border-b border-[#D9D9D9] pb-[13px] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-[8px]">
                  <Package className="w-5 h-5 text-[#3D6A00]" />
                  <h3 className="font-heading font-bold text-[18px] sm:text-[20px] text-[#1B1C1C] leading-[28px]">
                    Hardware &amp; Component Manifest
                  </h3>
                </div>
                <span className="font-heading text-[12px] text-[#737968] leading-[16px]">
                  {activeOrder.items.length} Verified Line Items
                </span>
              </div>

              <div className="divide-y divide-[#D9D9D9]">
                {activeOrder.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="py-[14px] first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-[12px]">
                      <div className="size-[48px] rounded-[10px] bg-[#F2F7EC] border border-[#C2DBA8] flex items-center justify-center shrink-0 text-[#3F6B1A]">
                        {it.iconType === "battery" ? (
                          <BatteryCharging className="w-6 h-6" />
                        ) : it.iconType === "breaker" ? (
                          <ShieldCheck className="w-6 h-6" />
                        ) : it.iconType === "service" ? (
                          <Wrench className="w-6 h-6" />
                        ) : (
                          <Zap className="w-6 h-6" />
                        )}
                      </div>

                      <div className="space-y-[2px]">
                        <h4 className="font-heading font-bold text-[14px] text-[#1B1C1C] leading-[20px]">
                          {it.name}
                        </h4>
                        <p className="font-heading text-[12px] text-[#737968] leading-[16px]">
                          {it.sku}
                        </p>
                        <div className="flex items-center gap-[4px] pt-[1.5px]">
                          <CheckCircle2 className="w-3 h-3 text-[#3F6B1A] shrink-0" />
                          <span className="font-heading font-semibold text-[11px] text-[#3F6B1A] leading-[16.5px]">
                            {it.serial}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 flex sm:flex-col items-baseline sm:items-end justify-between gap-1">
                      <span className="font-heading font-bold text-[14px] text-[#1B1C1C] leading-[20px]">
                        {formatNaira(it.price)}
                      </span>
                      <span
                        className={`font-heading text-[11px] leading-[16.5px] ${
                          it.priceLabel === "Bundled"
                            ? "font-semibold text-[#3F6B1A]"
                            : "text-[#737968]"
                        }`}
                      >
                        {it.priceLabel || "Unit price"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D9D9D9] pt-[17px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-heading text-[12px] text-[#737968] leading-[16px]">
                  Delivery logistics, secure crating &amp; transit, insurance included.
                </span>
                <span className="font-heading font-bold text-[14px] text-[#1B1C1C] leading-[20px]">
                  Grand Total: {formatNaira(activeOrder.totalAmount)}
                </span>
              </div>
            </div>

            {/* Card 2: Live Logistics Dispatch (Node 6195:2709) */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-5 sm:p-[25px] space-y-[16px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
              <div className="border-b border-[#D9D9D9] pb-[13px] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-[8px]">
                  <Truck className="w-5 h-5 text-[#3D6A00]" />
                  <h3 className="font-heading font-bold text-[18px] sm:text-[20px] text-[#1B1C1C] leading-[28px]">
                    Live Logistics Dispatch
                  </h3>
                </div>

                <span className="bg-[#E8F3DA] rounded-full px-[10px] py-[4px] inline-flex items-center gap-[6px]">
                  <span className="size-[6px] rounded-full bg-[#7BB042]" />
                  <span className="font-heading font-semibold text-[12px] text-[#3F6B1A] leading-[16px]">
                    Live Fleet Beacon
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start">
                <div className="space-y-[12px]">
                  <div className="space-y-[2px]">
                    <span className="font-heading text-[12px] text-[#737968] leading-[16px] block">
                      Transport Carrier
                    </span>
                    <strong className="font-heading font-bold text-[14px] text-[#1B1C1C] leading-[20px] block">
                      {activeOrder.logistics.carrier}
                    </strong>
                  </div>

                  <div className="space-y-[2px]">
                    <span className="font-heading text-[12px] text-[#737968] leading-[16px] block">
                      Assigned Logistics Lead
                    </span>
                    <div className="flex flex-wrap items-center gap-[8px]">
                      <strong className="font-heading font-semibold text-[14px] text-[#1B1C1C] leading-[20px]">
                        {activeOrder.logistics.leadName}
                      </strong>
                      <span className="font-heading text-[12px] text-[#3D6A00] leading-[16px]">
                        {activeOrder.logistics.leadPhone}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-[2px]">
                    <span className="font-heading text-[12px] text-[#737968] leading-[16px] block">
                      Delivery Destination
                    </span>
                    <p className="font-sans text-[14px] text-[#1B1C1C] leading-[20px]">
                      {activeOrder.logistics.destination}
                    </p>
                  </div>
                </div>

                {/* Special Engineering Delivery Note (Node 6195:2740) */}
                <div className="bg-[#F4F9EC] border border-[#D9D9D9] rounded-[12px] p-[17px] space-y-[7px]">
                  <span className="font-heading font-bold text-[12px] text-[#3F6B1A] uppercase tracking-[0.6px] leading-[16px] block">
                    SPECIAL ENGINEERING DELIVERY NOTE
                  </span>
                  <p className="font-sans text-[12px] text-[#42493A] leading-[19.5px]">
                    &ldquo;{activeOrder.logistics.note}&rdquo;
                  </p>
                  <div className="pt-[9px] flex items-center gap-[8px]">
                    <ShieldCheck className="w-[14px] h-[14px] text-[#3F6B1A] shrink-0" />
                    <span className="font-heading text-[11px] text-[#737968] leading-[16.5px]">
                      All transit crew fully covered by NEMSA high-voltage safety insurance.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT 4 COLS: Certified Installation & Quick Tips (Node 6195:2751) ── */}
          <div className="lg:col-span-4 flex flex-col gap-[24px]">
            {/* Card 1: Certified Installation Appointment Card (Node 6195:2752) */}
            <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-[24px] space-y-[16px] shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
              <div>
                <span className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.3)] rounded-full px-[13px] py-[5px] inline-flex items-center gap-[8px]">
                  <CheckCircle2 className="w-[14px] h-[14px] text-[#3F6B1A]" />
                  <span className="font-heading font-semibold text-[12px] text-[#3F6B1A] leading-[16px]">
                    Scheduled &amp; Confirmed
                  </span>
                </span>

                <h3 className="font-heading font-bold text-[20px] text-[#1B1C1C] leading-[28px] mt-[10px]">
                  Certified NEMSA Installation
                </h3>
                <p className="font-sans text-[12px] text-[#42493A] leading-[16px] mt-[6px]">
                  Commissioning is scheduled following delivery completion. A certified renewable energy engineer has been booked.
                </p>
              </div>

              {/* Engineer Profile (Node 6195:2769) */}
              <div className="bg-[#F6F3F2] border border-[#D9D9D9] rounded-[12px] p-[13px] flex items-center gap-[12px]">
                <div className="size-[40px] rounded-full bg-[#344A1C] text-[#F2F7EC] font-bold text-[14px] flex items-center justify-center shrink-0">
                  {activeOrder.installation.initials}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[12px] text-[#1B1C1C] leading-[16px]">
                    {activeOrder.installation.engineer}
                  </h4>
                  <p className="font-heading font-semibold text-[11px] text-[#3F6B1A] leading-[16.5px]">
                    {activeOrder.installation.license}
                  </p>
                </div>
              </div>

              {/* Date & Window (Node 6195:2777) */}
              <div className="space-y-[12px] pt-[4px]">
                <div className="flex items-start gap-[10px]">
                  <Calendar className="w-4 h-4 text-[#3F6B1A] shrink-0 mt-0.5" />
                  <div className="space-y-[2px]">
                    <strong className="font-heading font-bold text-[14px] text-[#1B1C1C] leading-[20px] block">
                      {activeOrder.installation.date}
                    </strong>
                    <span className="font-heading text-[12px] text-[#737968] leading-[16px] block">
                      {activeOrder.installation.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-[10px]">
                  <MapPin className="w-4 h-4 text-[#3F6B1A] shrink-0 mt-0.5" />
                  <div className="space-y-[2px]">
                    <strong className="font-heading font-bold text-[12px] text-[#1B1C1C] leading-[16px] block">
                      {activeOrder.installation.siteTitle}
                    </strong>
                    <span className="font-heading text-[12px] text-[#737968] leading-[16px] block">
                      {activeOrder.installation.siteSub}
                    </span>
                  </div>
                </div>
              </div>

              {/* Site Readiness Checklist (Node 6195:2796) */}
              <div className="border-t border-[#D9D9D9] pt-[17px] space-y-[8px]">
                <span className="font-heading font-bold text-[12px] text-[#1B1C1C] leading-[16px] block">
                  Site Readiness Checklist:
                </span>
                <ul className="space-y-[8px]">
                  {[
                    "Roof mounting brackets pre-inspected",
                    "Conduit trunking and AC inverter wall cleared",
                    "Main distribution board breaker accessible",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-[8px] font-sans text-[12px] text-[#42493A] leading-[16px]"
                    >
                      <CheckCircle2 className="w-[14px] h-[14px] text-[#7BB042] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call Coordinator Button (Node 6195:2815) */}
              <div className="pt-[4px]">
                <a
                  href="tel:+2348135854054"
                  className="w-full bg-[#7BB042] hover:bg-[#70A03C] text-white font-heading font-bold text-[12px] leading-[16px] px-[16px] py-[12px] rounded-[10px] flex items-center justify-center gap-[8px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call installation coordinator</span>
                </a>
              </div>
            </div>

            {/* Card 2: Quick Tips Card (Node 6195:2825) */}
            <div className="bg-[#F6F3F2] border border-[#D9D9D9] rounded-[16px] p-[21px] space-y-[8px]">
              <div className="flex items-center gap-[6px]">
                <Clock className="w-4 h-4 text-[#3D6A00] shrink-0" />
                <h4 className="font-heading font-bold text-[12px] text-[#1B1C1C] leading-[16px]">
                  Need to reschedule delivery?
                </h4>
              </div>
              <p className="font-sans text-[12px] text-[#737968] leading-[19.5px]">
                You can adjust your dispatch time slot without penalty up to 3 hours prior to truck departure.
              </p>
              <Link
                href="/#contact"
                className="font-heading font-semibold text-[12px] text-[#3D6A00] leading-[16px] hover:underline inline-block pt-[4px]"
              >
                Contact Fleet Logistics →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Section 7: Direct Support & Resolution Rail (Node 6195:2836) ── */}
        <div className="bg-white border border-[#D9D9D9] rounded-[16px] p-6 sm:p-[33px] flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[0px_2px_8px_-2px_rgba(31,58,11,0.06),0px_1px_3px_-1px_rgba(31,58,11,0.04)]">
          <div className="max-w-[576px] space-y-[6px]">
            <span className="font-heading font-bold text-[12px] text-[#3F6B1A] uppercase tracking-[0.6px] leading-[16px] block">
              ENGINEERING SUPPORT DESK
            </span>
            <div className="flex items-start sm:items-center gap-[12px]">
              <span className="size-[16px] rounded-full bg-black text-[#F5B82E] flex items-center justify-center shrink-0 mt-1.5 sm:mt-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <h3 className="font-heading font-bold text-[20px] text-[#1B1C1C] leading-[28px]">
                Need assistance with your dispatch or financing agreement?
              </h3>
            </div>
            <p className="font-sans text-[16px] sm:text-[18px] text-[#42493A] leading-[1.6] pt-[2px]">
              Our certified engineering support engineers are on standby for inverter synchronization queries, dispatch reschedules, or direct debit changes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-[12px] shrink-0">
            <div className="bg-[#F6F3F2] border border-[#D9D9D9] rounded-[10px] px-[17px] py-[11px] inline-flex items-center gap-[8px]">
              <ShieldCheck className="w-4 h-4 text-[#737968]" />
              <span className="font-heading font-medium text-[12px] text-[#737968] leading-[16px]">
                NEMSA Compliance Desk
              </span>
            </div>

            <a
              href="tel:+2348135854054"
              className="bg-white border border-[#D9D9D9] rounded-[10px] px-[17px] py-[11px] inline-flex items-center gap-[8px] font-sans text-[14px] text-black hover:bg-[#F6F3F2] transition shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <PhoneCall className="w-4 h-4 text-[#3F6B1A]" />
              <span>+ 234 813-585-4054</span>
            </a>

            <a
              href="https://wa.me/2348135854054"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7BB042] hover:bg-[#70A03C] rounded-[10px] px-[16px] py-[11px] inline-flex items-center gap-[8px] font-heading font-bold text-[12px] text-white transition shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Support</span>
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
        <div className="py-24 max-w-[1440px] mx-auto px-4 text-center text-[#5C5C5C] font-sans">
          Loading order telemetry...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
