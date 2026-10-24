import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  getProductBySlug,
  getPublishedProducts,
  formatNaira,
  resolveMediaUrl,
} from "@/lib/public-data";
import { AddToCartSection } from "@/components/public/AddToCartSection";
import { ProductMediaGallery } from "@/components/public/ProductMediaGallery";
import { ProductCardButton } from "@/components/public/ProductCardButton";

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
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const mainImg =
    product.product_images?.find((img) => img.is_main) || product.product_images?.[0];
  const mainImgUrl = resolveMediaUrl(mainImg?.url);
  const fallbackImg =
    product.category.toLowerCase().includes("panel") ||
    product.name.toLowerCase().includes("panel")
      ? "/api/websitepic/panels"
      : "/api/websitepic/battery";
  const displayMainImg = mainImgUrl || fallbackImg;

  // Extract real verified specs from product data
  const specEntries =
    product.specs && typeof product.specs === "object"
      ? Object.entries(product.specs).filter(([k, v]) => Boolean(k && v))
      : [];

  return (
    <div className="py-8 sm:py-12 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12 sm:space-y-14">
      {/* ── Breadcrumb Navigation ─────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* ── Main Product Presentation (Gallery Left, Commerce Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Media Gallery */}
        <div className="lg:col-span-6 space-y-3">
          <ProductMediaGallery
            productName={product.name}
            defaultMainUrl={displayMainImg}
            images={product.product_images}
          />

          <div className="flex items-center justify-center gap-4 pt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
              Verified Authentic
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#7BB042]" />
              Nationwide Delivery
            </span>
          </div>
        </div>

        {/* Right: Product Purchase Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                {product.category}
              </span>

              {product.in_stock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042]" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-500" />
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-950 tracking-tight leading-snug">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                Price
              </span>
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
                {formatNaira(product.price)}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Min. Order: 1 unit
            </span>
          </div>

          {/* Commerce Actions (Add to Cart, Buy Small Option, Delivery) */}
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
      </div>

      {/* ── Verified Product Specifications (Clean, Dynamic Table) ── */}
      {specEntries.length > 0 && (
        <section className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
              PRODUCT SPECIFICATIONS
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-950">
              Technical Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {specEntries.map(([key, val]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#F8F9FA] border border-gray-100 gap-1"
              >
                <span className="font-medium text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="font-semibold text-gray-900 text-left sm:text-right">
                  {String(val)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Related Hardware Components ───────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                SIMILAR EQUIPMENT
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-950">
                Related Solar Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              <span>View catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => {
              const relImg =
                rel.product_images?.[0]?.url || "/api/websitepic/battery";

              return (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-[#D9D9D9] p-4 flex flex-col justify-between space-y-4 hover:border-black transition-colors shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="h-40 rounded-xl bg-[#F8F9FA] flex items-center justify-center p-3 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveMediaUrl(relImg) || relImg}
                        alt={rel.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      {rel.category}
                    </span>

                    <h3 className="font-heading font-bold text-sm text-gray-900 line-clamp-2">
                      <Link
                        href={`/shop/${rel.slug}`}
                        className="hover:text-[#3F6B1A] transition"
                      >
                        {rel.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-heading font-bold text-base text-gray-900">
                      {formatNaira(rel.price)}
                    </span>
                    <ProductCardButton
                      href={`/shop/${rel.slug}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold shadow-2xs"
                      ariaLabel={`View details for ${rel.name}`}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </ProductCardButton>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Support & Engineering Help Desk ───────────────────────── */}
      <section className="bg-[#1F3A0B] text-white rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
            ENGINEERING ASSISTANCE
          </span>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            Need help choosing the right system?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
            Speak with a certified Petfeb solar engineer to review your load requirements, battery storage, and inverter compatibility.
          </p>
        </div>

        <a
          href="tel:+234800738332"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition shadow-xs shrink-0 min-h-[46px]"
        >
          <Phone className="w-4 h-4" />
          <span>+234 800 PETFEB SOLAR</span>
        </a>
      </section>
    </div>
  );
}
