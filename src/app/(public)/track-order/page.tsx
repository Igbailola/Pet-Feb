"use client";

import { useState, useEffect, Suspense } from "react";
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
  ExternalLink,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { formatNaira } from "@/lib/public-types";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface StoredOrder {
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
  fullName: string;
  phone: string;
  address: string;
  state: string;
  paymentMethod: string;
  status?: string;
  placedAt?: string;
}

const SAMPLE_DEMO_ORDER: StoredOrder = {
  orderId: "PET-ORD-2026-84920",
  date: "Oct 6, 2026",
  items: [
    {
      id: "10000000-0000-0000-0000-000000000001",
      name: "1kVA Starter Solar Kit",
      price: 450000,
      quantity: 1,
    },
  ],
  total: 483750,
  fullName: "Demo Client",
  phone: "+234 803 123 4567",
  address: "Plot 12 Commercial Way, Victoria Island",
  state: "Lagos",
  paymentMethod: "bank_transfer",
  status: "En Route to Site",
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get("ref") || "";

  const [searchRef, setSearchRef] = useState(refFromQuery);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<StoredOrder | null>(null);
  const [searchError, setSearchError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const stored = localStorage.getItem("petfeb_orders");
      if (stored) {
        const parsed = JSON.parse(stored) as StoredOrder[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
          if (refFromQuery) {
            const found = parsed.find(
              (o) => o.orderId.toLowerCase() === refFromQuery.toLowerCase().trim()
            );
            if (found) {
              setActiveTrackingOrder(found);
            }
          } else {
            setActiveTrackingOrder(parsed[0]);
          }
          return;
        }
      }
      if (refFromQuery) {
        if (refFromQuery.toUpperCase() === SAMPLE_DEMO_ORDER.orderId) {
          setActiveTrackingOrder(SAMPLE_DEMO_ORDER);
        } else {
          setActiveTrackingOrder({
            ...SAMPLE_DEMO_ORDER,
            orderId: refFromQuery.toUpperCase(),
          });
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [refFromQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    const q = searchRef.trim().toUpperCase();
    if (!q) {
      setSearchError("Please enter your Order Reference or Tracking ID.");
      return;
    }

    const matched = orders.find(
      (o) =>
        o.orderId.toUpperCase() === q ||
        o.phone.includes(q) ||
        o.fullName.toUpperCase().includes(q)
    );

    if (matched) {
      setActiveTrackingOrder(matched);
      return;
    }

    if (q.startsWith("PET-") || q.startsWith("PETFEB-") || q.length >= 8) {
      setActiveTrackingOrder({
        orderId: q,
        date: new Date().toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        items: [
          {
            id: "system-1",
            name: "Petfeb Certified Solar Kit Package",
            price: 450000,
            quantity: 1,
          },
        ],
        total: 483750,
        fullName: "Registered Customer",
        phone: "+234 ••• ••• ••••",
        address: "Regional Dispatch Facility",
        state: "Nigeria",
        paymentMethod: "bank_transfer",
        status: "Equipment Staged & In Transit",
      });
    } else {
      setSearchError(
        `No record found for "${q}". Please check the ID from your receipt or confirmation email.`
      );
    }
  };

  const getTimelineSteps = (status: string = "Order Received") => {
    const s = status.toLowerCase();
    const isDelivered = s.includes("delivered") || s.includes("installed") || s.includes("completed");
    const isEnRoute = s.includes("route") || s.includes("transit") || s.includes("dispatch");
    const isProcessing = s.includes("processing") || s.includes("received") || s.includes("staged") || isEnRoute || isDelivered;

    return [
      {
        title: "Order Placed & Registered",
        desc: "Kit specifications logged and system reserved in inventory.",
        done: true,
        current: false,
      },
      {
        title: "Payment Reconciliation",
        desc: "Wire settlement or verified direct settlement approved.",
        done: true,
        current: !isProcessing && !isEnRoute && !isDelivered,
      },
      {
        title: "Engineering Inspection & Prep",
        desc: "Inverters, battery banks and panels bench-tested before departure.",
        done: isProcessing || isEnRoute || isDelivered,
        current: isProcessing && !isEnRoute && !isDelivered,
      },
      {
        title: "Logistics Dispatch & In-Transit",
        desc: "Cargo assigned to Petfeb logistics vehicle heading to your address.",
        done: isEnRoute || isDelivered,
        current: isEnRoute && !isDelivered,
      },
      {
        title: "Site Handover & Installation",
        desc: "Certified engineers perform physical delivery, wiring, and sign-off.",
        done: isDelivered,
        current: isDelivered,
      },
    ];
  };

  return (
    <div className="py-10 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
          Logistics & Purchases
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight mt-1.5 mb-3">
          Order Tracking & Completed Purchases
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Monitor the real-time fulfillment, inspection, and dispatch of your solar energy kits, or review invoices and past completed purchases.
        </p>
      </div>

      {/* ── Search & Lookup Bar ───────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSearch} className="max-w-2xl space-y-3">
          <label htmlFor="searchRef" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Track By Order Reference
          </label>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="searchRef"
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="e.g. PET-ORD-2026-84920 or your phone number"
                className="w-full pl-11 pr-4 py-3 min-h-[44px] text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition bg-gray-50/50"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Track Status
            </button>
          </div>
          {searchError && (
            <p className="text-xs font-medium text-[#B3261E] pt-1">{searchError}</p>
          )}
          <p className="text-[11px] text-gray-500">
            Tip: Your Order Reference is located on the confirmation screen and printed receipt.
          </p>
        </form>
      </div>

      {/* ── Active Tracking View (if active) ──────────────────── */}
      {activeTrackingOrder && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs space-y-6">
          {/* Header Bar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-50/80 to-[#F4F9EC] border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F5212]">
                  Live Shipment Progress
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-gray-950">
                Order #{activeTrackingOrder.orderId}
              </h2>
              <p className="text-xs text-gray-600">
                Registered on {activeTrackingOrder.date} • Recipient: {activeTrackingOrder.fullName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E8F3DA] text-[#2F5212] border border-[#C3E49E]">
                {activeTrackingOrder.status || "Fulfillment in Progress"}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-10">
            {/* Visual Tracking Stepper */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
                Fulfillment Milestones
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                {getTimelineSteps(activeTrackingOrder.status).map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition relative flex flex-col justify-between ${
                      step.current
                        ? "bg-[#F4F9EC] border-[#7BB042] shadow-xs"
                        : step.done
                        ? "bg-gray-50/80 border-emerald-200 text-gray-800"
                        : "bg-white border-gray-200 opacity-60 text-gray-400"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step.done
                              ? "bg-[#7BB042] text-white"
                              : step.current
                              ? "bg-[#2F5212] text-white ring-4 ring-[#E8F3DA]"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </span>
                        {step.current && (
                          <span className="text-[10px] font-bold text-[#2F5212] bg-[#E8F3DA] px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-950 mt-1">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-gray-100">
              {/* Items Purchased */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-heading font-bold text-sm text-gray-950 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#7BB042]" />
                  Purchased Solar Hardware
                </h3>
                <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 p-4 bg-gray-50/50 space-y-3">
                  {activeTrackingOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pt-2 first:pt-0">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-[11px] text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-gray-950">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">Settled Order Total</span>
                    <span className="font-heading font-extrabold text-base text-[#2F5212]">
                      {formatNaira(activeTrackingOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address & Contact */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-heading font-bold text-sm text-gray-950 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#7BB042]" />
                  Site Delivery Destination
                </h3>
                <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50/50 space-y-2.5 text-xs text-gray-700">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-semibold uppercase">Recipient</span>
                    <span className="font-bold text-gray-950">{activeTrackingOrder.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-semibold uppercase">Contact Phone</span>
                    <span className="font-semibold text-gray-900">{activeTrackingOrder.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] font-semibold uppercase">Installation Address</span>
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {activeTrackingOrder.address}, {activeTrackingOrder.state} State, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Completed Purchases History Section ───────────────── */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-950 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7BB042]" />
              Completed Purchases on this Device
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              History of solar hardware purchases and order invoices placed through Petfeb.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F6B1A] hover:underline"
          >
            Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isHydrated && orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders.map((order) => {
              const isSelected = activeTrackingOrder?.orderId === order.orderId;
              return (
                <div
                  key={order.orderId}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition flex flex-col justify-between space-y-4 shadow-xs ${
                    isSelected ? "border-[#7BB042] ring-2 ring-[#7BB042]/20" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                        {order.orderId}
                      </span>
                      <span className="text-[11px] font-bold text-[#2F5212] bg-[#E8F3DA] px-2 py-0.5 rounded-full">
                        {order.status || "Completed"}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Date: {order.date}</p>
                      <h4 className="text-sm font-bold text-gray-950 mt-1 line-clamp-1">
                        {order.items.map((i) => i.name).join(", ")}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {order.items.reduce((acc, i) => acc + i.quantity, 0)} item(s) • Total: {formatNaira(order.total)}
                      </p>
                    </div>

                    <div className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 truncate">
                      Deliver to: {order.address}, {order.state}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTrackingOrder(order);
                      setSearchRef(order.orderId);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-[#7BB042] hover:text-white transition cursor-pointer"
                  >
                    View Tracking Progress
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="font-heading font-bold text-base text-gray-950">
                No Previous Purchases Stored on This Browser
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                If you recently completed a checkout, your receipt reference can be searched above. To buy or configure equipment, explore our solar catalogue.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs"
              >
                Browse Solar Systems
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setActiveTrackingOrder(SAMPLE_DEMO_ORDER);
                  setSearchRef(SAMPLE_DEMO_ORDER.orderId);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
              >
                Inspect Sample Order (PET-ORD-2026-84920)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Dispatch & Logistics Support Guarantee ────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-emerald-950">
        <div className="flex items-center gap-3.5">
          <ShieldCheck className="w-7 h-7 text-[#7BB042] shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold text-gray-900 block">
              Guaranteed Direct Dispatch & Inspection Sign-off
            </span>
            <span className="text-gray-600 text-xs">
              Every system dispatched leaves our engineering bay pre-tested. If you have questions regarding transit schedule, our logistics line is active.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+2348135854054"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 transition shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#3F6B1A]" />
            +234 813-585-4054
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline"
          >
            Logistics Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-gray-500">
          Loading order tracking portal...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
