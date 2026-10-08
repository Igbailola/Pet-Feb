"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { resolveMediaUrl, type ProductImage } from "@/lib/public-types";

interface ProductMediaGalleryProps {
  productName: string;
  defaultMainUrl: string;
  images?: ProductImage[];
}

export function ProductMediaGallery({
  productName,
  defaultMainUrl,
  images = [],
}: ProductMediaGalleryProps) {
  const [activeUrl, setActiveUrl] = useState(defaultMainUrl);

  const resolvedImages = images.map((img, idx) => ({
    id: img.id || String(idx),
    resolvedUrl: resolveMediaUrl(img.url) || img.url,
    altText: img.alt_text || `${productName} photo ${idx + 1}`,
  }));

  return (
    <div className="lg:col-span-6 space-y-4">
      {/* ── Main Product Display Card ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex items-center justify-center min-h-[340px] sm:min-h-[420px] transition-all duration-200">
        <img
          src={activeUrl}
          alt={productName}
          className="max-h-[360px] max-w-full object-contain transition-transform duration-200 hover:scale-[1.02]"
        />
      </div>

      {/* ── Interactive Thumbnails ─────────────────────────────── */}
      {resolvedImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
          {resolvedImages.map((img, idx) => {
            const isSelected = activeUrl === img.resolvedUrl;
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setActiveUrl(img.resolvedUrl)}
                className={`w-20 h-20 bg-white rounded-xl border p-2 shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#7BB042] ring-2 ring-[#7BB042]/30 shadow-xs scale-105"
                    : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                }`}
                title={`View image variant ${idx + 1}`}
                aria-label={`Select variant ${idx + 1}`}
              >
                {img.resolvedUrl ? (
                  <img
                    src={img.resolvedUrl}
                    alt={img.altText}
                    className="max-h-full max-w-full object-contain pointer-events-none"
                  />
                ) : (
                  <Zap className="w-6 h-6 text-gray-300" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
