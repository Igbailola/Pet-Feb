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

  // Filter unique valid images
  const uniqueImages = rawImages.filter(
    (img, index, self) =>
      index === self.findIndex((t) => t.resolvedUrl === img.resolvedUrl)
  );

  const hasMultipleImages = uniqueImages.length > 1;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center w-full">
      {/* ── Main Product Display Card matching Figma node 6147:8157 ─────────────────────────── */}
      <div className="bg-white flex flex-col h-[340px] sm:h-[480px] lg:h-[520px] items-start justify-center overflow-hidden pb-4 sm:pb-[26px] pt-3 sm:pt-[18px] px-3 sm:px-[18px] relative rounded-[20px] sm:rounded-[30.5px] shadow-[0px_2.54px_28px_0px_rgba(45,45,45,0.08)] w-full border border-gray-100">
        <div className="h-full w-full overflow-hidden relative rounded-[16px] sm:rounded-[24px] bg-[#EBEBEB] flex items-center justify-center p-6 sm:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeUrl}
            alt={productName}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* ── Supporting Thumbnails (Only rendered if genuine multiple images exist) ── */}
      {hasMultipleImages && (
        <div
          role="tablist"
          aria-label={`${productName} image gallery navigation`}
          className="flex items-center gap-3 w-full overflow-x-auto pb-1"
        >
          {uniqueImages.map((thumb, idx) => {
            const isSelected = activeUrl === thumb.resolvedUrl;
            return (
              <button
                key={`${thumb.id}-${idx}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => setActiveUrl(thumb.resolvedUrl)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveUrl(thumb.resolvedUrl);
                  }
                }}
                className={`bg-white shrink-0 w-[84px] sm:w-[110px] h-[84px] sm:h-[110px] p-2 rounded-[12px] shadow-sm transition-all cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
                  isSelected
                    ? "border-[#7BB042] ring-2 ring-[#7BB042]/30 scale-[1.02]"
                    : "border-transparent hover:border-[#D9D9D9]"
                }`}
                title={`View ${thumb.altText}`}
                aria-label={`Select product image ${idx + 1}`}
              >
                <div className="h-full w-full overflow-hidden rounded-[8px] bg-[#EBEBEB] flex items-center justify-center p-1.5">
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
      )}
    </div>
  );
}
