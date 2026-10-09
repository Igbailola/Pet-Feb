"use client";

import type { CSSProperties } from "react";
import { CheckCircle2, Quote } from "lucide-react";
import { resolveMediaUrl, type Testimonial } from "@/lib/public-types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[80vw] sm:w-[420px] shrink-0 mr-6 p-6 rounded-xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <Quote className="w-6 h-6 text-[#7BB042]" />
        <p className="text-sm text-gray-700 italic leading-relaxed">
          &ldquo;{t.message}&rdquo;
        </p>
      </div>
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {t.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolveMediaUrl(t.photo_url) ?? undefined}
              alt={t.author_name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#7BB042]/30 shadow-xs shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-[#E8F3DA] text-[#2F5212] font-bold text-xs flex items-center justify-center border border-[#C3E49E] shrink-0">
              {t.author_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div>
            <h4 className="font-heading font-semibold text-sm text-gray-900">
              {t.author_name}
            </h4>
            {t.author_role && (
              <p className="text-xs text-gray-500">{t.author_role}</p>
            )}
          </div>
        </div>
        <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
      </div>
    </div>
  );
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (testimonials.length === 0) return null;

  // Each card is ~444px wide (420 + 24 margin) on desktop; the track must
  // contain at least two identical halves wide enough to fill a 1400px
  // container so the -50% loop never shows empty space.
  const copiesPerHalf = Math.max(1, Math.ceil(1600 / (testimonials.length * 444)));
  const repeats = copiesPerHalf * 2;
  const items = Array.from({ length: repeats }, () => testimonials).flat();
  const duration = Math.max(30, copiesPerHalf * testimonials.length * 7);

  return (
    <div className="testimonial-marquee group relative -mx-4 sm:mx-0 overflow-hidden">
      <div
        className="testimonial-track flex w-max"
        style={
          {
            animation: `testimonial-marquee ${duration}s linear infinite`,
          } as CSSProperties
        }
      >
        {items.map((t, idx) => (
          <TestimonialCard key={`${t.id}-${idx}`} t={t} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
