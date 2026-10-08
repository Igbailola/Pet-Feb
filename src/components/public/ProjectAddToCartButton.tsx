"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface ProjectAddToCartButtonProps {
  project: {
    id: string;
    slug: string;
    title: string;
    capacity: string;
    category: string;
    imageUrl?: string;
  };
}

const PROJECT_PRICE_ESTIMATES: Record<string, number> = {
  "light-up-umueri": 12500000,
  "building-global-capacity": 4500000,
  "commercial-hybrid-lagos": 6500000,
  "agro-coldchain-ph": 9800000,
  "smart-whole-home-abuja": 2850000,
  "compact-starter-ibadan": 480000,
};

export function ProjectAddToCartButton({ project }: ProjectAddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const price = PROJECT_PRICE_ESTIMATES[project.slug] || 2500000;

  const handleAddToCart = () => {
    addItem({
      id: `kit-${project.slug}`,
      name: `${project.capacity} (${project.title.split("—")[0].replace(/"/g, "").trim()})`,
      slug: project.slug,
      price,
      imageUrl: project.imageUrl,
      category: project.category,
      specsSummary: project.capacity,
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 3500);
  };

  return (
    <div className="space-y-3 pt-3 border-t border-gray-100">
      <button
        type="button"
        onClick={handleAddToCart}
        className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition shadow-sm cursor-pointer active:scale-98 ${
          justAdded
            ? "bg-[#3F6B1A] text-white"
            : "bg-[#7BB042] text-white hover:bg-[#6aa035]"
        }`}
      >
        {justAdded ? (
          <>
            <Check className="w-4 h-4" />
            System Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add System Kit to Cart
          </>
        )}
      </button>

      {/* Apply with Buy Small from project */}
      <Link
        href={`/buy-small?product=${encodeURIComponent(project.slug)}`}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition text-center shadow-2xs"
      >
        <CreditCard className="w-3.5 h-3.5 text-[#7BB042]" />
        Apply for Buy Small Installment Plan
      </Link>

      {justAdded && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#3F6B1A] flex items-center justify-between gap-2">
          <span>Kit ready in cart!</span>
          <Link
            href="/cart"
            className="font-bold underline hover:text-[#2d4e13] inline-flex items-center gap-1"
          >
            Go to Cart <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
