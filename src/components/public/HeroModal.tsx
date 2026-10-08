"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, CheckCircle2, AlertCircle, Info, Zap, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/public-types";
import { formatNaira, resolveMediaUrl } from "@/lib/public-types";

interface HeroModalProps {
  product: Product | null;
}

export function HeroModal({ product }: HeroModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!product) return null;

  // Selected image: main image or first available
  const mainImage =
    product.product_images?.find((img) => img.is_main) || product.product_images?.[0];
  const imageUrl = resolveMediaUrl(mainImage?.url);

  return (
    <>
      {/* Trigger Button inside Hero */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
        aria-haspopup="dialog"
      >
        <Zap className="w-4 h-4 text-[#7BB042]" />
        <span>Featured Kit: {product.name}</span>
        <Info className="w-3.5 h-3.5 text-emerald-600" />
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-modal-title"
        >
          {/* Modal Card - stop propagation so clicks inside don't dismiss */}
          <div
            className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-7 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: title & close */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <Link
                  href={`/shop?category=${encodeURIComponent(product.category)}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full transition"
                  title={`View ${product.category} in shop`}
                >
                  {product.category}
                </Link>
                <h2 id="hero-modal-title" className="font-heading font-bold text-xl text-gray-900 mt-1">
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Image */}
            <div className="my-5 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center min-h-[220px]">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={mainImage?.alt_text || product.name}
                  className="w-full h-56 object-contain p-4"
                />
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Zap className="w-12 h-12 mx-auto mb-2 text-[#7BB042]/50" />
                  <p className="text-xs text-gray-500">Image available in catalogue</p>
                </div>
              )}
            </div>

            {/* Price & Availability */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide block">Pricing</span>
                <span className="font-heading font-bold text-2xl text-gray-950">
                  {formatNaira(product.price)}
                </span>
              </div>
              <div>
                {product.in_stock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Technical Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="my-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  System Specifications
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex flex-col"
                    >
                      <span className="text-gray-500 capitalize">{key}</span>
                      <span className="font-semibold text-gray-900">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-600 my-4 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/shop/${product.slug}`}
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition text-center shadow-sm"
              >
                View Full Details
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/installation"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-1/2 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition text-center"
              >
                Inquire Installation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
