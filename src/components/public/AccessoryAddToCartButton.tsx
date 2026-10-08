"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check, ArrowRight, Zap } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

interface AccessoryAddToCartButtonProps {
  accessory: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
    parentProductName?: string;
  };
}

export function AccessoryAddToCartButton({ accessory }: AccessoryAddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    addItem(
      {
        id: `acc-${accessory.id}`,
        name: accessory.name,
        slug: `accessory-${accessory.id}`,
        price: accessory.price,
        imageUrl: accessory.imageUrl,
        category: "Accessory",
        specsSummary: accessory.parentProductName
          ? `Compatible add-on for ${accessory.parentProductName}`
          : "Certified System Accessory",
      },
      1
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3500);
  };

  const handleBuyNow = () => {
    addItem(
      {
        id: `acc-${accessory.id}`,
        name: accessory.name,
        slug: `accessory-${accessory.id}`,
        price: accessory.price,
        imageUrl: accessory.imageUrl,
        category: "Accessory",
        specsSummary: accessory.parentProductName
          ? `Compatible add-on for ${accessory.parentProductName}`
          : "Certified System Accessory",
      },
      1
    );
    router.push("/checkout");
  };

  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer active:scale-98 ${
            justAdded
              ? "bg-[#3F6B1A] text-white"
              : "bg-[#7BB042] text-white hover:bg-[#6aa035]"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition shadow-2xs cursor-pointer whitespace-nowrap"
          title="Buy accessory immediately"
        >
          Buy Now
        </button>
      </div>

      {justAdded && (
        <div className="flex items-center justify-between text-[11px] text-[#3F6B1A] bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 animate-in fade-in-50">
          <span className="font-medium">Item in cart</span>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="font-semibold underline hover:text-[#284910]">
              Cart
            </Link>
            <span>•</span>
            <Link
              href="/checkout"
              className="font-bold underline hover:text-[#284910] inline-flex items-center gap-0.5"
            >
              Checkout <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
