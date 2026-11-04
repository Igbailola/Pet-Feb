"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  Wrench,
  Truck,
  ShieldCheck,
  Lock,
  PackagePlus,
  AlertCircle,
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
    specs?: Record<string, string>;
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
  const [specOpen, setSpecOpen] = useState(true);

  // Buy Small interactive states
  const [depositPct, setDepositPct] = useState<30 | 40 | 50>(30);
  const [frequency, setFrequency] = useState<"Weekly" | "Bi-weekly" | "Monthly">("Weekly");

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

  // Buy Small dynamic calculations
  const depositAmount = Math.round((product.price * depositPct) / 100);
  const remaining = product.price - depositAmount;
  // 52 weeks in a year
  const weeklyRate = Math.round(remaining / 52);
  const biweeklyRate = weeklyRate * 2;
  const monthlyRate = Math.round(remaining / 12);

  const displayInstallmentRate =
    frequency === "Weekly"
      ? `${formatNaira(weeklyRate)} / week`
      : frequency === "Bi-weekly"
      ? `${formatNaira(biweeklyRate)} / bi-week`
      : `${formatNaira(monthlyRate)} / month`;

  // Specification default fallbacks matching Figma
  const ratedOutput =
    product.specs?.["Rated Output"] ||
    product.specs?.["Capacity"] ||
    product.specs?.["Output"] ||
    "5.0 kVA";

  const nominalBus =
    product.specs?.["Nominal Bus"] ||
    product.specs?.["Voltage"] ||
    product.specs?.["Battery Voltage"] ||
    "48V DC";

  const efficiency =
    product.specs?.["Efficiency"] ||
    product.specs?.["Max Efficiency"] ||
    "98%";

  const warranty =
    product.specs?.["Warranty"] ||
    product.specs?.["Warranty Period"] ||
    "5-Year*";

  const originalPrice = Math.round(product.price * 1.135);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 items-start w-full">
      {/* ── Product Name matching Figma node 6147:8177 ─────────────────────────────────── */}
      <div className="w-full">
        <h1 className="font-heading font-bold text-[24px] sm:text-[28px] lg:text-[32px] text-[#111827] leading-[1.25] tracking-tight">
          {product.name}
        </h1>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full border-t border-[#D9D9D9]" />

      {/* ── Product Specification Accordion matching Figma node 6147:8180 ────────────────── */}
      <div className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-[0px_2px_22px_0px_rgba(45,45,45,0.08)] w-full border border-[#EBEBEB]/90">
        <div className="flex flex-col w-full">
          {/* Accordion Toggle Header */}
          <button
            type="button"
            onClick={() => setSpecOpen((prev) => !prev)}
            aria-expanded={specOpen}
            className="no-btn-slide flex items-center justify-between w-full min-h-[40px] py-1 cursor-pointer text-left focus:outline-hidden"
          >
            <span className="font-heading font-semibold text-[15px] sm:text-[16px] text-[#333333]">
              Product specification
            </span>
            <div className="w-8 h-8 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#495057] shrink-0">
              {specOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Accordion Expandable Spec Strip */}
          {specOpen && (
            <div className="bg-[#EBEBEB] rounded-[18px] sm:rounded-[24px] p-3 sm:px-[22px] sm:py-[24px] mt-3.5 w-full animate-in fade-in-50 duration-200">
              <div className="bg-[#FBF9F8] border border-[#D9D9D9] rounded-[12px] p-2.5 sm:p-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 sm:divide-x divide-[#D9D9D9] w-full">
                {/* 1. Rated Output */}
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-2 text-center bg-white sm:bg-transparent rounded-[8px] sm:rounded-none border border-[#E5E7EB] sm:border-0">
                  <span className="font-heading font-semibold text-[11px] text-[#5C5C5C] uppercase tracking-wider">
                    RATED OUTPUT
                  </span>
                  <span className="font-heading font-bold text-[17px] sm:text-[20px] text-[#1B1C1C] mt-1 leading-tight">
                    {ratedOutput}
                  </span>
                </div>

                {/* 2. Nominal Bus */}
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-2 text-center bg-white sm:bg-transparent rounded-[8px] sm:rounded-none border border-[#E5E7EB] sm:border-0">
                  <span className="font-heading font-semibold text-[11px] text-[#5C5C5C] uppercase tracking-wider">
                    NOMINAL BUS
                  </span>
                  <span className="font-heading font-bold text-[17px] sm:text-[20px] text-[#1B1C1C] mt-1 leading-tight">
                    {nominalBus}
                  </span>
                </div>

                {/* 3. Efficiency */}
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-2 text-center bg-white sm:bg-transparent rounded-[8px] sm:rounded-none border border-[#E5E7EB] sm:border-0">
                  <span className="font-heading font-semibold text-[11px] text-[#5C5C5C] uppercase tracking-wider">
                    EFFICIENCY
                  </span>
                  <span className="font-heading font-bold text-[17px] sm:text-[20px] text-[#3F6B1A] mt-1 leading-tight">
                    {efficiency}
                  </span>
                </div>

                {/* 4. Warranty */}
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-2 text-center bg-white sm:bg-transparent rounded-[8px] sm:rounded-none border border-[#E5E7EB] sm:border-0">
                  <span className="font-heading font-semibold text-[11px] text-[#5C5C5C] uppercase tracking-wider">
                    WARRANTY
                  </span>
                  <span className="font-heading font-bold text-[17px] sm:text-[20px] text-[#1B1C1C] mt-1 leading-tight">
                    {warranty}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className="w-full border-t border-[#D9D9D9]" />

      {/* ── Price & Stock Row matching Figma node 6147:8209 ─────────────────────────────── */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="font-heading font-bold text-[28px] sm:text-[32px] text-[#1B1C1C] tracking-[-0.8px] leading-none">
              {formatNaira(product.price)}
            </span>
            <span className="font-sans font-normal text-[14px] sm:text-[15px] text-[#6C757D] line-through">
              {formatNaira(originalPrice)}
            </span>
            <div className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.35)] px-2.5 py-0.5 rounded-full self-center">
              <span className="font-heading font-bold text-[12px] text-[#3F6B1A] leading-[16px]">
                -12%
              </span>
            </div>
          </div>

          {/* In Stock Badge */}
          <div className="bg-[#E8F3DA] border border-[rgba(123,176,66,0.35)] flex items-center gap-1.5 px-3 py-1.5 rounded-full shrink-0">
            <Check className="w-3.5 h-3.5 text-[#3F6B1A] stroke-[2.5]" />
            <span className="font-sans font-semibold text-[12px] sm:text-[13px] text-[#3F6B1A] leading-none">
              {product.in_stock ? "In stock (12 units)" : "Out of stock"}
            </span>
          </div>
        </div>

        {/* Optional Compatible Accessories Bundle Selection */}
        {accessories.length > 0 && (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2.5 w-full my-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-gray-900 flex items-center gap-1.5 font-heading">
                <PackagePlus className="w-4 h-4 text-[#7BB042]" />
                Bundle Compatible Accessories
              </span>
              <span className="text-[12px] text-gray-500">
                {selectedAccessories.length > 0
                  ? `${selectedAccessories.length} selected`
                  : "Optional add-ons"}
              </span>
            </div>

            <div className="space-y-2">
              {accessories.map((acc) => {
                const isChecked = selectedAccessories.includes(acc.id);
                return (
                  <label
                    key={acc.id}
                    className={`flex items-center justify-between gap-3 p-3 min-h-[46px] rounded-xl border text-[13px] sm:text-[14px] cursor-pointer transition ${
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
                        className="w-4 h-4 rounded text-[#7BB042] focus:ring-black shrink-0"
                      />
                      <span className="font-semibold truncate">{acc.name}</span>
                    </div>
                    <span className="font-bold text-[#3F6B1A] shrink-0 font-heading">
                      +{formatNaira(acc.price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Quantity Stepper & Add to Cart Button matching Figma node 6147:8222 ──────────── */}
        {product.in_stock ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center w-full pt-1">
            {/* Stepper matching Figma node 6147:8223 */}
            <div className="flex items-center justify-between w-full sm:w-[144px] h-[52px] min-h-[52px] shrink-0 bg-[#F8F9FA] border border-[#D9D9D9] rounded-[12px] px-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="no-btn-slide bg-white flex items-center justify-center rounded-[9px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)] w-[40px] h-[40px] cursor-pointer hover:bg-gray-100 active:scale-95 transition text-[#111827] shrink-0"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 stroke-[2.2]" />
              </button>

              <span className="font-heading font-bold text-[16px] text-[#111827] px-3 text-center min-w-[32px] select-none">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="no-btn-slide bg-white flex items-center justify-center rounded-[9px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)] w-[40px] h-[40px] cursor-pointer hover:bg-gray-100 active:scale-95 transition text-[#111827] shrink-0"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            {/* Primary CTA Button matching Figma node 6147:8236 */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full sm:flex-1 h-[52px] min-h-[52px] shrink-0 px-6 rounded-[12px] flex items-center justify-center gap-2.5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition font-heading font-bold text-[15px] sm:text-[16px] tracking-[0.2px] cursor-pointer active:scale-98 ${
                justAdded
                  ? "bg-[#3F6B1A] text-white"
                  : "bg-[#F5B82E] hover:bg-[#E5AA26] text-[#111827]"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5 text-white shrink-0" />
                  <span>Added to Cart ({quantity + selectedAccessories.length})</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 text-[#111827] shrink-0" />
                  <span>Add to cart</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-[13px] sm:text-[14px] text-amber-900 space-y-1 w-full">
            <p className="font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              This system is currently out of stock.
            </p>
            <p>
              Inquire with our engineers directly for restock dates.
            </p>
          </div>
        )}

        {/* Post-add Banner Toast */}
        {justAdded && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#E8F3DA] border border-[#7BB042] text-[13px] sm:text-[14px] text-[#3F6B1A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-in fade-in-50 w-full mt-1">
            <span className="font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-[#7BB042] shrink-0" />
              Item added to your shopping cart!
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Link
                href="/cart"
                className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-lg bg-white border border-[#D9D9D9] font-heading font-semibold text-[13px] sm:text-[14px] text-gray-900 hover:bg-gray-50 transition inline-flex items-center justify-center"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-lg bg-[#7BB042] font-heading font-bold text-[13px] sm:text-[14px] text-white hover:bg-[#6aa035] transition inline-flex items-center justify-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Installation & Delivery Informational Rows matching Figma node 6147:8244 ─────── */}
      <div className="border-t border-[#D9D9D9] pt-4 flex flex-col gap-3.5 w-full">
        {/* Row 1: Installation Available */}
        <div className="flex items-start gap-3 w-full">
          <div className="bg-[#E8F3DA] p-2 rounded-[9px] shrink-0 mt-0.5">
            <Wrench className="w-4 h-4 text-[#3F6B1A]" />
          </div>
          <div className="font-sans text-[13px] sm:text-[14px] leading-[1.55]">
            <span className="font-semibold text-[#1B1C1C]">Installation available:</span>{" "}
            <span className="font-normal text-[#4B5563]">
              Choose certified deployment at checkout. Certified Petfeb engineers available nationwide.
            </span>
          </div>
        </div>

        {/* Row 2: Express Distribution */}
        <div className="flex items-start gap-3 w-full">
          <div className="bg-[#E8F3DA] p-2 rounded-[9px] shrink-0 mt-0.5">
            <Truck className="w-4 h-4 text-[#3F6B1A]" />
          </div>
          <div className="font-sans text-[13px] sm:text-[14px] leading-[1.55]">
            <span className="font-semibold text-[#1B1C1C]">Express Distribution:</span>{" "}
            <span className="font-normal text-[#4B5563]">
              24–48 hours transit to Lagos &amp; Abuja hub regions; 3–5 days to all other states.
            </span>
          </div>
        </div>
      </div>

      {/* ── Trust Rail matching Figma node 6147:8264 ─────────────────────────────────────── */}
      <div className="border-t border-[#D9D9D9] pt-3.5 pb-1 flex items-center justify-center gap-10 sm:gap-16 w-full text-center">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-5 h-5 text-[#3F6B1A]" />
          <span className="font-heading font-semibold text-[12px] sm:text-[13px] text-[#1B1C1C]">
            5-Year Warranty
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Lock className="w-5 h-5 text-[#3F6B1A]" />
          <span className="font-heading font-semibold text-[12px] sm:text-[13px] text-[#1B1C1C]">
            Paystack Secured
          </span>
        </div>
      </div>

      {/* ── Buy Small Financing Panel matching Figma node 6147:8280 ──────────────────────── */}
      <div className="bg-[#F5B82E] border border-[rgba(123,176,66,0.3)] rounded-[18px] p-4 sm:p-[22px] flex flex-col gap-5 w-full shadow-xs">
        {/* Top title and Zero Collateral Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 w-full">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="bg-black rounded-[8px] size-[32px] flex items-center justify-center shrink-0">
              <span className="font-bold text-white text-[12px]">BS</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-[15px] sm:text-[16px] text-[#1B1C1C] leading-snug">
                Pay from {displayInstallmentRate}
              </span>
              <span className="font-medium text-[12px] sm:text-[13px] text-[#242424] leading-snug">
                Buy Small Flexible Scheme
              </span>
            </div>
          </div>

          <div className="bg-black border border-[#D9D9D9] rounded-full px-3 py-1 shrink-0">
            <span className="font-heading font-bold text-[10px] sm:text-[11px] text-white tracking-[0.5px] uppercase">
              ZERO COLLATERAL
            </span>
          </div>
        </div>

        {/* Deposit Selector Chips */}
        <div className="flex flex-col gap-2 w-full">
          <span className="font-heading font-semibold text-[12px] sm:text-[13px] text-[#242424]">
            Select Downpayment Deposit:
          </span>
          <div className="grid grid-cols-3 gap-2 w-full">
            {([30, 40, 50] as const).map((pct) => {
              const chipDeposit = Math.round((product.price * pct) / 100);
              const compactDeposit =
                chipDeposit >= 1_000_000
                  ? `₦${(chipDeposit / 1_000_000).toFixed(1)}M`
                  : `₦${Math.round(chipDeposit / 1000).toLocaleString("en-NG")}k`;
              const isSelected = depositPct === pct;
              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDepositPct(pct)}
                  className={`min-h-[42px] py-2 px-2 rounded-[10px] text-[12px] sm:text-[13px] transition text-center cursor-pointer font-heading flex items-center justify-center ${
                    isSelected
                      ? "bg-black text-[#F2F7EC] font-bold shadow-xs"
                      : "bg-white border border-[#D9D9D9] text-[#1B1C1C] font-semibold hover:bg-gray-50"
                  }`}
                >
                  {pct}% ({compactDeposit})
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Frequency Chips */}
        <div className="flex flex-wrap items-center gap-2 w-full">
          <span className="font-heading font-semibold text-[12px] sm:text-[13px] text-[#242424] shrink-0 mr-1">
            Frequency:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {(["Weekly", "Bi-weekly", "Monthly"] as const).map((freq) => {
              const isSelected = frequency === freq;
              return (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`min-h-[36px] text-[12px] sm:text-[13px] transition rounded-full cursor-pointer font-heading inline-flex items-center justify-center ${
                    isSelected
                      ? "bg-black text-white font-semibold px-3.5 py-1.5"
                      : "bg-white border border-[#D9D9D9] text-[#333333] font-medium px-3.5 py-1.5 hover:bg-gray-50"
                  }`}
                >
                  {freq}
                </button>
              );
            })}
          </div>
        </div>

        {/* Segmented 10-Step Power Meter Visual matching Figma node 6147:8309 */}
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between text-[12px] w-full">
            <span className="font-heading font-semibold text-[#242424]">
              Deposit Ratio Meter
            </span>
            <span className="font-heading font-bold text-[#1F3A0B]">
              {depositPct}% Locked ({depositPct / 10}/10 blocks)
            </span>
          </div>

          <div className="flex gap-1 items-center w-full">
            {Array.from({ length: 10 }).map((_, i) => {
              const isFilled = i < depositPct / 10;
              return (
                <div
                  key={i}
                  className={`flex-1 h-[8px] rounded-xs transition-colors duration-200 ${
                    isFilled ? "bg-[#1B1C1C]" : "bg-white/75"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* CTA Button matching Figma node 6147:8326 */}
        <Link
          href={`/buy-small?product=${encodeURIComponent(product.slug)}`}
          className="bg-black border-2 border-[#7BB042] text-[#F2F7EC] font-heading font-bold text-[16px] sm:text-[18px] rounded-[12px] min-h-[54px] sm:h-[60px] px-6 py-3.5 flex items-center justify-center hover:bg-gray-900 transition text-center w-full shadow-sm"
        >
          See how Buy Small works
        </Link>
      </div>
    </div>
  );
}
