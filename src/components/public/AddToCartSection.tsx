"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  CreditCard,
  Wrench,
  Check,
  Plus,
  Minus,
  ArrowRight,
  AlertCircle,
  PackagePlus,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/public-types";

interface CompatibleAccessoryItem {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
}

interface AddToCartSectionProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    in_stock: boolean;
    category: string;
    imageUrl?: string | null;
  };
  accessories?: CompatibleAccessoryItem[];
}

export function AddToCartSection({ product, accessories = [] }: AddToCartSectionProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const handleAddToCart = () => {
    if (!product.in_stock) return;

    // 1. Add main solar product
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
      },
      quantity
    );

    // 2. Add any bundled accessories
    selectedAccessories.forEach((accId) => {
      const acc = accessories.find((a) => a.id === accId);
      if (acc) {
        addItem(
          {
            id: `acc-${acc.id}`,
            name: acc.name,
            slug: `accessory-${acc.id}`,
            price: acc.price,
            imageUrl: acc.image_url,
            category: "Accessory",
            specsSummary: `Add-on for ${product.name}`,
          },
          1
        );
      }
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 4000);
  };

  if (!product.in_stock) {
    return (
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <p className="font-semibold flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          This system is currently out of stock.
        </p>
        <p>
          Purchase and Buy Small financing actions are paused for this SKU until restocked. Inquire with our engineers directly for lead times.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="font-semibold text-[#3F6B1A] hover:underline inline-flex items-center gap-1"
          >
            Inquire With Support Desk <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Optional Compatible Accessories Bundle Selection */}
      {accessories.length > 0 && (
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/90 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-900 flex items-center gap-1.5">
              <PackagePlus className="w-4 h-4 text-[#7BB042]" />
              Bundle Compatible Accessories
            </span>
            <span className="text-[11px] text-gray-500">
              {selectedAccessories.length > 0
                ? `${selectedAccessories.length} selected`
                : "Optional add-ons"}
            </span>
          </div>

          <div className="space-y-1.5">
            {accessories.map((acc) => {
              const isChecked = selectedAccessories.includes(acc.id);
              return (
                <label
                  key={acc.id}
                  className={`flex items-center justify-between gap-3 p-2 rounded-lg border text-xs cursor-pointer transition ${
                    isChecked
                      ? "bg-emerald-50/70 border-emerald-300 text-gray-950"
                      : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAccessories((prev) => [...prev, acc.id]);
                        } else {
                          setSelectedAccessories((prev) =>
                            prev.filter((id) => id !== acc.id)
                          );
                        }
                      }}
                      className="rounded text-[#7BB042] focus:ring-[#7BB042]"
                    />
                    <span className="font-semibold truncate">{acc.name}</span>
                  </div>
                  <span className="font-bold text-[#3F6B1A] shrink-0">
                    +{formatNaira(acc.price)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-700">Quantity:</span>
        <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-xs font-bold text-gray-900 min-w-[36px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Commerce Action Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg text-sm font-semibold transition shadow-sm cursor-pointer active:scale-98 ${
            justAdded
              ? "bg-[#3F6B1A] text-white"
              : "bg-[#7BB042] text-white hover:bg-[#6aa035]"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart ({quantity + selectedAccessories.length})
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>

        {/* Apply with Buy Small: explicitly leads to /buy-small with product pre-selected */}
        <Link
          href={`/buy-small?product=${encodeURIComponent(product.slug)}`}
          className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg text-sm font-semibold bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 transition text-center shadow-xs cursor-pointer"
        >
          <CreditCard className="w-4 h-4 text-[#7BB042]" />
          Apply with Buy Small
        </Link>
      </div>

      {/* Inline Post-Add Cart Actions Banner */}
      {justAdded && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#3F6B1A] flex flex-col sm:flex-row items-center justify-between gap-2.5 animate-in fade-in-50">
          <span className="font-medium flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#7BB042]" />
            Items successfully added to your shopping cart!
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="px-3 py-1.5 rounded-md bg-white border border-emerald-300 font-semibold text-[#3F6B1A] hover:bg-emerald-100 transition shadow-2xs"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              className="px-3 py-1.5 rounded-md bg-[#7BB042] font-semibold text-white hover:bg-[#6aa035] transition shadow-2xs"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}

      {/* Installation booking link */}
      <div>
        <Link
          href={`/installation?product=${encodeURIComponent(product.slug)}`}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold bg-gray-50 text-[#3F6B1A] hover:bg-emerald-50 transition border border-gray-200 text-center"
        >
          <Wrench className="w-3.5 h-3.5 text-[#7BB042]" />
          Book Professional Site Survey & Installation for this System
        </Link>
      </div>
    </div>
  );
}
