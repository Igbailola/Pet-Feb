"use client";

import { useState } from "react";
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

  const rawImages = images.map((img, idx) => ({
    id: img.id || String(idx),
    resolvedUrl: resolveMediaUrl(img.url) || img.url,
    altText: img.alt_text || `${productName} photo ${idx + 1}`,
  }));

  // Ensure at least 3 thumbnail items for full fidelity to Figma layout
  const displayThumbnails =
    rawImages.length >= 3
      ? rawImages.slice(0, 3)
      : rawImages.length > 0
      ? [
          ...rawImages,
          ...Array.from({ length: 3 - rawImages.length }).map((_, i) => ({
            id: `fallback-${i}`,
            resolvedUrl: defaultMainUrl,
            altText: `${productName} view ${rawImages.length + i + 1}`,
          })),
        ]
      : [
          { id: "thumb-1", resolvedUrl: defaultMainUrl, altText: productName },
          { id: "thumb-2", resolvedUrl: defaultMainUrl, altText: productName },
          { id: "thumb-3", resolvedUrl: defaultMainUrl, altText: productName },
        ];

  return (
    <div className="flex flex-col gap-[26px] items-center justify-center w-full">
      {/* ── Main Product Display Card matching Figma node 6147:8157 ─────────────────────────── */}
      <div className="bg-white flex flex-col h-[380px] sm:h-[559px] items-start justify-center overflow-hidden pb-[20px] sm:pb-[30.5px] pt-[14px] sm:pt-[20.3px] px-[14px] sm:px-[20.3px] relative rounded-[20px] sm:rounded-[30.5px] shadow-[0px_2.54px_28px_0px_rgba(45,45,45,0.1)] w-full">
        <div className="h-[340px] sm:h-[508px] overflow-hidden relative rounded-[18px] sm:rounded-[30.5px] w-full bg-[#EBEBEB] flex items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeUrl}
            alt={productName}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* ── 3 Supporting Thumbnails matching Figma node 6147:8161 ────────────────────────────── */}
      <div className="grid grid-cols-3 gap-[10px] w-full">
        {displayThumbnails.map((thumb, idx) => {
          const isSelected = activeUrl === thumb.resolvedUrl;
          return (
            <button
              key={`${thumb.id}-${idx}`}
              type="button"
              onClick={() => setActiveUrl(thumb.resolvedUrl)}
              className={`bg-white flex flex-col items-start justify-center overflow-hidden pb-[8px] sm:pb-[10px] pt-[5px] sm:pt-[6.7px] px-[5px] sm:px-[6.7px] rounded-[10px] shadow-[0px_0.84px_9.2px_0px_rgba(45,45,45,0.1)] transition-all cursor-pointer border-2 ${
                isSelected
                  ? "border-[#7BB042] ring-2 ring-[#7BB042]/30 scale-[1.02]"
                  : "border-transparent hover:border-[#D9D9D9]"
              }`}
              title={`View ${thumb.altText}`}
              aria-label={`Select product image ${idx + 1}`}
            >
              <div className="h-[100px] sm:h-[167px] overflow-hidden rounded-[8px] sm:rounded-[10px] w-full bg-[#EBEBEB] flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb.resolvedUrl}
                  alt={thumb.altText}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
