import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Zap,
  ShieldCheck,
  CreditCard,
  ShoppingCart,
  Wrench,
  Package,
} from "lucide-react";
import { getProductBySlug, formatNaira, resolveMediaUrl } from "@/lib/public-data";
import { AddToCartSection } from "@/components/public/AddToCartSection";
import { ProductMediaGallery } from "@/components/public/ProductMediaGallery";
import { AccessoryAddToCartButton } from "@/components/public/AccessoryAddToCartButton";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
      `Buy ${product.name} from Petfeb Solar. Genuine equipment, certified warranties, and installation in Nigeria.`,
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
    <div className="py-8 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── Breadcrumb Navigation ─────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/shop" className="hover:text-gray-900 flex items-center gap-1 transition">
          <ChevronLeft className="w-4 h-4" />
          Back to Catalogue
        </Link>
        <span>/</span>
        <span className="text-gray-400 capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* ── Main Product Section ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Interactive Product Media Gallery */}
        <ProductMediaGallery
          productName={product.name}
          defaultMainUrl={displayMainImg}
          images={product.product_images}
        />

        {/* Right: Specifications & Pricing */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full transition"
                title={`Filter catalogue by ${product.category}`}
              >
                {product.category}
              </Link>
              <div>
                {product.in_stock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
                {formatNaira(product.price)}
              </span>
              <span className="text-xs text-gray-500">VAT inclusive</span>
            </div>
          </div>

          {product.description && (
            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                System Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Technical Specifications Grid */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between"
                  >
                    <span className="text-gray-500 capitalize">{key}</span>
                    <span className="font-semibold text-gray-900 mt-0.5">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Purchase & Buy Small Financing Actions */}
          <div className="pt-6 border-t border-gray-200">
            <AddToCartSection
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                in_stock: product.in_stock,
                category: product.category,
                imageUrl: displayMainImg,
              }}
              accessories={product.accessories ?? []}
            />
          </div>


          {/* Guarantees Box */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7BB042] shrink-0" />
              <span>Certified manufacturer warranty included on all components.</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#7BB042] shrink-0" />
              <span>Delivery and logistics available across major Nigerian states.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Compatible Accessories Section ────────────────────── */}
      {product.accessories && product.accessories.length > 0 && (
        <section className="pt-10 border-t border-gray-200 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
              Recommended Add-ons
            </span>
            <h2 className="font-heading font-bold text-2xl text-gray-900">
              Compatible System Accessories
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Enhance performance, safety, and mounting stability with genuine accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.accessories.map((acc) => {
              const accImg = resolveMediaUrl(acc.image_url);

              return (
                <div
                  key={acc.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {accImg && (
                      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center p-2 overflow-hidden border border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={accImg}
                          alt={acc.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-base text-gray-900">
                        {acc.name}
                      </h3>
                      {acc.description && (
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {acc.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-gray-400 block uppercase">Price</span>
                        <span className="font-heading font-bold text-base text-gray-950">
                          {formatNaira(acc.price)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Compatible
                      </span>
                    </div>

                    <AccessoryAddToCartButton
                      accessory={{
                        id: acc.id,
                        name: acc.name,
                        price: acc.price,
                        imageUrl: accImg,
                        parentProductName: product.name,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
