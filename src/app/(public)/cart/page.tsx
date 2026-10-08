"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Zap,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/public-types";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    vat,
    total,
    isHydrated,
  } = useCart();

  if (!isHydrated) {
    return (
      <div className="py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 text-center text-gray-500">
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 md:py-28 px-4 sm:px-8 lg:px-10 max-w-2xl mx-auto text-center space-y-6">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
          >
            Browse Solar Kits
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/track-order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-sm font-semibold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition"
          >
            View Completed Purchases
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
            Selected Systems
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-gray-950 tracking-tight mt-1">
            Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition min-h-[44px] px-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-red-600 hover:text-red-700 transition cursor-pointer min-h-[44px] px-2"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* ── Main Cart & Summary Grid ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const fallbackImg =
              item.category?.toLowerCase().includes("panel") ||
              item.name.toLowerCase().includes("panel")
                ? "/api/websitepic/panels"
                : "/api/websitepic/battery";
            const displayImg = item.imageUrl || fallbackImg;

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayImg}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    {item.category && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {item.category}
                      </span>
                    )}
                    <h2 className="font-heading font-bold text-base sm:text-lg text-gray-900">
                      {item.name}
                    </h2>
                    <span className="font-heading font-extrabold text-base text-gray-950 block">
                      {formatNaira(item.price)}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-900 min-w-[36px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <span className="font-heading font-bold text-base text-gray-950 block">
                      {formatNaira(item.price * item.quantity)}
                    </span>
                    <span className="text-[11px] text-gray-400">Total</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-red-600 transition cursor-pointer rounded-lg hover:bg-red-50"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Order Summary Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="font-heading font-bold text-xl text-gray-900 border-b border-gray-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>VAT (7.5%)</span>
                <span className="font-medium text-gray-900">{formatNaira(vat)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Site Survey & Assessment</span>
                <span className="text-emerald-700 font-semibold">Free Consultation</span>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-baseline justify-between">
                <div>
                  <span className="font-heading font-bold text-lg text-gray-950 block">
                    Estimated Total
                  </span>
                  <span className="text-[11px] text-gray-400">Full turnkey equipment amount</span>
                </div>
                <span className="font-heading font-extrabold text-2xl text-[#3F6B1A]">
                  {formatNaira(total)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm text-center cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/buy-small"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg text-xs font-semibold bg-emerald-50 text-[#3F6B1A] hover:bg-emerald-100 transition border border-emerald-200 text-center"
              >
                <CreditCard className="w-4 h-4" />
                Finance with Buy Small Installments
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Tier-1 manufacturer warranty on all items</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Professional engineer installation available nationwide</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
