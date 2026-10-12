import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Zap,
  ShieldCheck,
  CreditCard,
  ShoppingCart,
  Wrench,
  Package,
  Phone,
  Tv,
  Check,
  ArrowRight,
} from "lucide-react";
import {
  getProductBySlug,
  getPublishedProducts,
  formatNaira,
  resolveMediaUrl,
} from "@/lib/public-data";
import { AddToCartSection } from "@/components/public/AddToCartSection";
import { ProductMediaGallery } from "@/components/public/ProductMediaGallery";
import { AccessoryAddToCartButton } from "@/components/public/AccessoryAddToCartButton";
import { ProductDetailsTabs } from "@/components/public/ProductDetailsTabs";

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
    title: `${product.name} | Petfeb Solar Engineering`,
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

const APPLIANCES = [
  {
    name: "1.5HP Inverter AC",
    duration: "6–8 Hours Daytime",
    desc: "Direct solar daylight offset running with zero generator noise.",
  },
  {
    name: "Double-Door Refrigerator",
    duration: "24 Hours Continuous",
    desc: "Uninterrupted food and perishables preservation day and night.",
  },
  {
    name: "65\" Smart TV + Decoders",
    duration: "10–12 Hours Daily",
    desc: "Home entertainment and audio consoles with pure sine-wave stability.",
  },
  {
    name: "Standing Inverter Fans (4x)",
    duration: "18 Hours Continuous",
    desc: "Multi-room natural ventilation with silent pure wave motor drive.",
  },
  {
    name: "Laptops & Workstations",
    duration: "16 Hours Sustained",
    desc: "Zero-interruption remote work with routers and peripheral monitors.",
  },
  {
    name: "Full LED Lighting (15 Pts)",
    duration: "24 Hours Full Coverage",
    desc: "Complete perimeter security floodlights and interior compound illumination.",
  },
];

const FAQS = [
  {
    q: "Can this run my 1.5HP inverter AC?",
    a: "Yes. With an appropriately sized battery bank (recommended 10kWh LiFePO4 storage) and daytime solar array, it effortlessly sustains a 1.5HP inverter air conditioner alongside standard refrigeration and lighting loads.",
  },
  {
    q: "How does the Buy Small financing approval work?",
    a: "After selecting your deposit tier (30%–50%), you submit basic identification. Our automated risk underwriting engine verifies your bank statement in under 24 hours without requiring collateral.",
  },
  {
    q: "Do I receive a NEMSA signoff certificate?",
    a: "Yes. Every installation conducted by Petfeb Certified Engineers concludes with an official commissioning test and NEMSA compliance documentation for insurance and building compliance records.",
  },
];

const SPECS = [
  { label: "AC Input Voltage Range", value: "170V – 280V (Harmonized with DisCos & Gensets)" },
  { label: "Solar PV Max Input", value: "6,000W (Dual Independent MPPTs, 120V–450V DC)" },
  { label: "Battery Compatibility", value: "48V LiFePO4 Lithium, Sealed Gel, Tubular deep cycle" },
  { label: "Transfer Switching Time", value: "< 10ms (Zero-Flicker UPS bypass for medical/IT loads)" },
  { label: "Operating Thermal Ceiling", value: "Up to 55°C Ambient Tropical Rated (Active heatsink airflow)" },
  { label: "Remote Telemetry", value: "Standard Wi-Fi + Optional GPRS Cloud Hub" },
];

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

  return (
    <div className="py-8 sm:py-14 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-14">
      {/* ── Top Two-Column Section (Gallery Left, Purchase Card Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Gallery with NEMSA Badge & Trust Specs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/30 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
            <span>NEMSA CERTIFIED TIER-1 (demo placeholder)</span>
          </div>

          <ProductMediaGallery
            productName={product.name}
            defaultMainUrl={displayMainImg}
            images={product.product_images}
          />

          {/* Under-Gallery Trust Strips */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#D9D9D9] text-xs text-gray-600 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>NEMSA Verified Testing</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Class II Surge Protection</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>IP65 Weather Enclosure</span>
            </div>
          </div>
        </div>

        {/* Right: Purchase Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                HYBRID SYSTEM CORE · TIER-1 OEM
              </span>

              {product.in_stock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042]" />
                  In stock (12 units)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-500" />
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-gray-950 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.description ||
                "Engineered specifically for Nigerian grid instability, voltage fluctuations, and rapid generator sync. Features high-temperature heat sinks and dual-MPPT trackers."}
            </p>
          </div>

          {/* Energy Spec Strip Box (4 Columns per stitch frame) */}
          <div className="bg-[#F8F9FA] rounded-2xl border border-[#D9D9D9] p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">
                Rated Output
              </span>
              <span className="font-heading font-bold text-base text-gray-900">
                5.0 kVA
              </span>
            </div>
            <div className="space-y-0.5 border-l border-gray-200">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">
                Nominal Bus
              </span>
              <span className="font-heading font-bold text-base text-gray-900">
                48V DC
              </span>
            </div>
            <div className="space-y-0.5 border-l border-gray-200">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">
                Efficiency
              </span>
              <span className="font-heading font-bold text-base text-[#3F6B1A]">
                98%
              </span>
            </div>
            <div className="space-y-0.5 border-l border-gray-200">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">
                Warranty
              </span>
              <span className="font-heading font-bold text-base text-gray-900">
                5-Year*
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 -mt-3">
            *All specs and warranties are demo placeholders, pending Petfeb approval.
          </p>

          {/* Price Row */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-950">
              {formatNaira(product.price)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatNaira(Math.round(product.price * 1.14))}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E8F3DA] text-[#3F6B1A]">
              -12%
            </span>
          </div>

          {/* Interactive Commerce Actions (Add to Cart + Buy Small Mini Panel) */}
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

      {/* ── Interactive Specifications & Warranty Policy Tabs ────────── */}
      <ProductDetailsTabs
        specs={SPECS}
        faqs={FAQS}
        productName={product.name}
        category={product.category}
      />

      {/* ── 4. "What can a 5 kVA system power?" (Green-50 Band) ───────── */}
      <section className="bg-[#F4F9EC] rounded-3xl border border-[#D9D9D9] p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
            OPERATIONAL ESTIMATION MATRIX
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">
            What can a 5 kVA system power?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Typical daily load profile on a 5kW Inverter + 10kWh Storage (demo placeholders, pending Petfeb approval).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {APPLIANCES.map((app, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#D9D9D9] p-5 space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-sm text-gray-900">
                  {app.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E8F3DA] text-[#3F6B1A]">
                  {app.duration}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {app.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Frequently Bundled Components (Compatible Hardware Stack) ── */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                COMPATIBLE HARDWARE STACK
              </span>
              <h2 className="font-heading font-bold text-2xl text-gray-900">
                Frequently Bundled Components
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              <span>View all hardware</span>
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
                    <Link
                      href={`/shop/${rel.slug}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-2xs"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 6. Bottom Help Band (Dark Green #1F3A0B per stitch frame) ─── */}
      <section className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
            ENGINEERING CONSULTANCY DESK
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Need help sizing your inverter capacity?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
            Talk to a Petfeb certified systems engineer to calculate your real-world surge requirements and generator synchronization parameters.
          </p>
        </div>

        <a
          href="tel:+234800738332"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm shrink-0 min-h-[48px]"
        >
          <Phone className="w-4 h-4" />
          <span>+234 800 PETFEB SOLAR</span>
        </a>
      </section>
    </div>
  );
}
