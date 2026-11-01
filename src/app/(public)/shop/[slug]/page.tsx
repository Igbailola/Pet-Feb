import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import {
  getProductBySlug,
  getPublishedProducts,
  formatNaira,
  resolveMediaUrl,
} from "@/lib/public-data";
import type { Product } from "@/lib/public-types";
import { AddToCartSection } from "@/components/public/AddToCartSection";
import { ProductMediaGallery } from "@/components/public/ProductMediaGallery";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const FALLBACK_RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: "sample-micro-inverter",
    name: "Micro Inverter",
    slug: "micro-inverter",
    category: "Inverters",
    description: "Tier-1 micro inverter for rooftop solar configurations.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [
      {
        id: "1",
        url: "/api/websitepic/commercial",
        is_main: true,
        product_id: "sample-1",
        sort_order: 1,
        alt_text: "Micro Inverter",
      },
    ],
  },
  {
    id: "sample-lithium-battery",
    name: "Lithium Battery",
    slug: "lithium-battery",
    category: "Batteries",
    description: "High-density LiFePO4 rack battery with smart BMS.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [
      {
        id: "2",
        url: "/api/websitepic/battery",
        is_main: true,
        product_id: "sample-2",
        sort_order: 1,
        alt_text: "Lithium Battery",
      },
    ],
  },
  {
    id: "sample-g12v-battery",
    name: "G12V 200AH Battery",
    slug: "g12v-200ah-battery",
    category: "Batteries",
    description: "Long-cycle deep discharge gel battery storage.",
    price: 567900,
    status: "published",
    in_stock: true,
    specs: { "Min, Order": "1unit" },
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    product_images: [
      {
        id: "3",
        url: "/api/websitepic/panels",
        is_main: true,
        product_id: "sample-3",
        sort_order: 1,
        alt_text: "G12V 200AH Battery",
      },
    ],
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Petfeb Solar",
    };
  }

  const mainImg =
    product.product_images?.find((img) => img.is_main) || product.product_images?.[0];
  const ogImage = resolveMediaUrl(mainImg?.url);

  return {
    title: `${product.name} | Petfeb Solar`,
    description:
      product.description ||
      `Buy ${product.name} from Petfeb Solar. Genuine equipment, certified warranties, and installation across Nigeria.`,
    openGraph: ogImage
      ? {
          title: product.name,
          description: product.description || undefined,
          images: [{ url: ogImage }],
        }
      : undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getPublishedProducts();
  const dbRelated = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  const relatedProducts =
    dbRelated.length >= 3
      ? dbRelated
      : [
          ...dbRelated,
          ...FALLBACK_RECOMMENDED_PRODUCTS.filter(
            (fb) => fb.slug !== product.slug && !dbRelated.some((r) => r.slug === fb.slug)
          ),
        ].slice(0, 3);

  const mainImg =
    product.product_images?.find((img) => img.is_main) || product.product_images?.[0];
  const mainImgUrl = resolveMediaUrl(mainImg?.url);
  const fallbackImg =
    product.category.toLowerCase().includes("panel") ||
    product.name.toLowerCase().includes("panel")
      ? "/api/websitepic/panels"
      : "/api/websitepic/battery";
  const displayMainImg = mainImgUrl || fallbackImg;

  return (
    <div className="bg-white pb-20 overflow-x-clip font-sans">
      {/* ── Page Header Band matching Figma Frame 6147:6743 ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-8 sm:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 sm:pb-8">
          {/* Left: Yellow dot + Heading with green period matching node 6147:6747 */}
          <div className="flex items-center gap-4">
            <span
              className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0"
              aria-hidden="true"
            />
            <h1
              className="font-heading font-bold text-[28px] sm:text-[38px] lg:text-[48px] text-[#333333] tracking-[1.44px] uppercase leading-tight"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              Welcome to petfeb solar shop
              <span className="text-[#7BB042]">.</span>
            </h1>
          </div>

          {/* Right: Stylized Shopping Cart Icon Graphic matching Figma node 6147:6750 */}
          <div className="hidden md:flex items-center pl-6 shrink-0" aria-hidden="true">
            <div className="relative w-[150px] h-[105px]">
              {/* Cart wireframe basket */}
              <svg
                viewBox="0 0 151 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-auto text-black"
              >
                <path
                  d="M1 1h22l20 54h88l16-44H38"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Petfeb Logo nested in the cart */}
              <div className="absolute left-[65px] top-[27px] w-[32px] h-[32px] rounded-[6px] border-[0.5px] border-[#D6E7C4] bg-white p-1 shadow-xs flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/logo"
                  alt="Petfeb Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {/* Cart wheels */}
              <div className="absolute left-[33px] bottom-[2px] w-[14px] h-[14px] rounded-full bg-black border-2 border-white" />
              <div className="absolute left-[109px] bottom-[2px] w-[14px] h-[14px] rounded-full bg-black border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line matching node 6147:6759 */}
        <div className="w-full border-t border-[#D9D9D9] mb-8" />
      </section>

      {/* ── Main Product Presentation Section (Black Card) matching Figma node 6147:6784 ─ */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] mb-14 sm:mb-16">
        <div className="bg-black text-white rounded-[32px] pt-[45px] px-4 sm:px-[35px] lg:px-[45px] pb-[60px] sm:pb-[80px]">
          {/* Header Row inside black card: "Back to Shop" + Description matching node 6147:6785 */}
          <div className="flex flex-col gap-[12px] max-w-[742px] mb-8 sm:mb-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-heading font-medium text-[18px] sm:text-[20px] text-[#F5B82E] hover:underline transition w-fit"
            >
              <ChevronLeft className="w-6 h-6 text-[#F5B82E]" />
              <span>Back to Shop</span>
            </Link>

            <p className="font-sans font-normal text-[16px] sm:text-[20px] text-[#EBEBEB] leading-[1.6]">
              Discover a wide range of high-quality solar panels, inverters, and batteries
              designed to power homes, businesses, and communities across Nigeria. Every
              product is tested for performance, durability, and efficiency giving you
              reliable clean energy you can trust.
            </p>
          </div>

          {/* White Inner Product Card matching Figma node 6147:7134 */}
          <div className="bg-white text-black rounded-[32px] pt-[35px] sm:pt-[60px] lg:pt-[80px] px-4 sm:px-[28px] lg:px-[38px] pb-[35px] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[38px] items-start">
              {/* Left Column: Product Gallery matching Figma node 6147:8156 */}
              <div className="lg:col-span-6 w-full max-w-[572px] mx-auto">
                <ProductMediaGallery
                  productName={product.name}
                  defaultMainUrl={displayMainImg}
                  images={product.product_images}
                />
              </div>

              {/* Right Column: Details, Specifications, Add to Cart & Buy Small matching Figma node 6147:8174 */}
              <div className="lg:col-span-6 w-full max-w-[613px] mx-auto">
                <AddToCartSection
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    in_stock: product.in_stock,
                    category: product.category,
                    imageUrl: displayMainImg,
                    specs: product.specs,
                  }}
                  accessories={product.accessories ?? []}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recommended Products Section (Yellow Card) matching Figma node 6147:6902 ─── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px]">
        <div className="bg-[#F5B82E] border border-[#D9D9D9] rounded-[24px] p-6 sm:p-10 lg:p-[49px] relative overflow-hidden">
          {/* Cropped Sun-Arc Graphic in top corner matching node 6147:6903 */}
          <div className="absolute right-0 top-0 w-[140px] h-[140px] opacity-80 pointer-events-none" />

          {/* Header Row with Checkmark Icon matching node 6147:8419 */}
          <div className="flex flex-col gap-[12px] max-w-[742px] mb-8 sm:mb-10 relative">
            <div className="flex items-center gap-[12px]">
              <div className="w-[20px] h-[20px] rounded-full bg-black flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#F5B82E] stroke-[3]" />
              </div>
              <h2 className="font-heading font-medium text-[26px] sm:text-[32px] text-black">
                Recommended Products
              </h2>
            </div>
            <p className="font-sans font-normal text-[15px] sm:text-[20px] text-[#242424] leading-[1.6]">
              Discover a wide range of high-quality solar panels, inverters, and batteries
              designed to power homes, businesses, and communities across Nigeria. Every
              product is tested for performance, durability, and efficiency giving you
              reliable clean energy you can trust.
            </p>
          </div>

          {/* 3 Product Cards matching Figma node 6147:8376 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[10px] items-stretch relative">
            {relatedProducts.map((rel) => {
              const relImg =
                rel.product_images?.[0]?.url ||
                (rel.category.toLowerCase().includes("battery")
                  ? "/api/websitepic/battery"
                  : "/api/websitepic/commercial");

              const specSummary =
                rel.specs?.["Min, Order"] ||
                rel.specs?.["Min Order"] ||
                "Min, Order : 1unit";

              return (
                <div
                  key={rel.id}
                  className="bg-white rounded-[24px] p-[16px] pb-[24px] shadow-[0px_2px_22px_0px_rgba(45,45,45,0.1)] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-[24px] sm:gap-[32px] w-full">
                    {/* Image Area matching node 6147:8379 */}
                    <div className="h-[280px] sm:h-[400px] rounded-[24px] bg-[#EBEBEB] overflow-hidden flex items-center justify-center p-6 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveMediaUrl(relImg) || relImg}
                        alt={rel.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Name matching node 6147:8381 */}
                    <h3 className="font-heading font-medium text-[22px] sm:text-[24px] text-black line-clamp-1">
                      <Link
                        href={`/shop/${rel.slug}`}
                        className="hover:text-[#3F6B1A] transition"
                      >
                        {rel.name}
                      </Link>
                    </h3>

                    {/* Pricing & Min Order matching node 6147:8383 */}
                    <div className="flex flex-col leading-[1.6]">
                      <span className="font-sans font-bold text-[20px] text-[#333333]">
                        {formatNaira(rel.price)}
                      </span>
                      <span className="font-sans font-medium text-[18px] text-[#5C5C5C]">
                        {specSummary}
                      </span>
                    </div>
                  </div>

                  {/* Buy Button matching node 6147:8388 */}
                  <div className="pt-6 w-full">
                    <Link
                      href={`/shop/${rel.slug}`}
                      className="bg-black text-[#F2F7EC] font-heading font-bold text-[16px] rounded-[12px] p-[16px] flex items-center justify-center hover:bg-gray-900 transition text-center w-full"
                    >
                      Buy For {formatNaira(rel.price)}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
