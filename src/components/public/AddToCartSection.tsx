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
  ShieldCheck,
  Truck,
  Lock,
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

export function AddToCartSection({
  product,
  accessories = [],
}: AddToCartSectionProps) {
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

  // Calculate approximate installments for Buy Small preview (30% deposit baseline)
  const depositPct = 30;
  const depositAmount = (product.price * depositPct) / 100;
  const remaining = product.price - depositAmount;
  const weeklyRate = Math.round(remaining / 40); // ~10 months weekly

  return (
    <div className="space-y-6">
      {/* ── 1. Quantity & Add to Cart Action ──────────────────────── */}
      <div className="space-y-4">
        {/* Optional Compatible Accessories Bundle Selection */}
        {accessories.length > 0 && (
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2.5">
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
                        ? "bg-[#E8F3DA] border-[#7BB042] text-gray-950"
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
                        className="rounded text-[#7BB042] focus:ring-black"
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

        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="inline-flex items-center rounded-lg border border-[#D9D9D9] bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold text-gray-900 min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button with Black text on #7BB042 */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-xl text-sm font-bold transition shadow-sm cursor-pointer active:scale-98 ${
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
        </div>

        {/* Inline Post-Add Banner */}
        {justAdded && (
          <div className="p-3.5 rounded-xl bg-[#E8F3DA] border border-[#7BB042] text-xs text-[#3F6B1A] flex flex-col sm:flex-row items-center justify-between gap-2.5 animate-in fade-in-50">
            <span className="font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#7BB042]" />
              Items successfully added to your shopping cart!
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="px-3 py-1.5 rounded-md bg-white border border-[#D9D9D9] font-semibold text-gray-900 hover:bg-gray-50 transition"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="px-3.5 py-1.5 rounded-lg bg-[#7BB042] font-bold text-white hover:bg-[#6aa035] transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Buy Small Financing Callout ────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9EC] border border-[#D2E8B5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#3F6B1A] text-white">
              Buy Small
            </span>
            <span className="font-heading font-bold text-sm text-gray-950">
              Pay from {formatNaira(weeklyRate)} / week
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Spread payments in weekly or monthly installments with 30% initial deposit.
          </p>
        </div>

        <Link
          href={`/buy-small?product=${encodeURIComponent(product.slug)}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition whitespace-nowrap shadow-2xs self-start sm:self-auto shrink-0"
        >
          <span>Apply with Buy Small</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ── Installation & Delivery Summary ────────────────────────── */}
      <div className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
        <div className="flex items-start gap-2.5">
          <Wrench className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
          <span>
            <strong className="text-gray-900">Installation:</strong> Professional installation by certified Petfeb engineers available nationwide.
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <Truck className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
          <span>
            <strong className="text-gray-900">Delivery:</strong> 24–48 hours transit in Lagos & Abuja; 3–5 days to all other states.
          </span>
        </div>
      </div>

      {/* ── Trust Strip ────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-[11px] text-center text-gray-500">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
          <span>OEM Warranty</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-[#7BB042]" />
          <span>Certified Quality</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#7BB042]" />
          <span>Paystack Secured</span>
        </div>
      </div>
    </div>
  );
}
