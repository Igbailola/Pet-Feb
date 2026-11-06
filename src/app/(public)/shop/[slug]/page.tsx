import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Check,
  Zap,
  ShieldCheck,
  Wrench,
  Truck,
  HelpCircle,
  FileText,
  AlertTriangle,
  ArrowRight,
  Package,
} from "lucide-react";
import {
  getProductBySlug,
  getPublishedProducts,
  getPublishedBlogPosts,
  formatNaira,
  resolveMediaUrl,
} from "@/lib/public-data";
import type { Product } from "@/lib/public-types";
import { AddToCartSection } from "@/components/public/AddToCartSection";
import { ProductMediaGallery } from "@/components/public/ProductMediaGallery";
import { ProductFaqSection, type ProductFaq } from "@/components/public/ProductFaqSection";

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

function getSystemPowerMatrix(product: Product) {
  const name = product.name.toLowerCase();
  const cat = (product.category || "").toLowerCase();

  if (name.includes("1kva") || name.includes("starter")) {
    return {
      title: "What Can the 1kVA Starter System Power?",
      summary:
        "Engineered for apartments, small households, students, and home workstations needing clean continuous power for essential electronics.",
      appliances: [
        { name: "LED Lighting", spec: "Up to 8–10 bulbs (10W–15W each)", runtime: "10–14 Hours" },
        { name: "Standing / Ceiling Fans", spec: "2–3 low-wattage fans (65W)", runtime: "8–10 Hours" },
        { name: "LED Smart TV & Decoder", spec: "1 unit (up to 43-inch, ~80W)", runtime: "6–8 Hours" },
        { name: "Laptops & Mobile Phones", spec: "3–4 devices simultaneously", runtime: "Continuous" },
        { name: "Wi-Fi Router & Decoder", spec: "Core networking hardware", runtime: "Continuous" },
      ],
      caution:
        "High-surge inductive loads (refrigerators, deep freezers, air conditioners, electric kettles, pumping machines, and pressing irons) must NOT be connected to a 1kVA system.",
    };
  }

  if (name.includes("3kva") || name.includes("home kit")) {
    return {
      title: "What Can the 3kVA Home System Power?",
      summary:
        "Designed for 2–3 bedroom residential homes and professional offices requiring continuous daily productivity and refrigeration.",
      appliances: [
        { name: "Interior & Perimeter Lighting", spec: "15–20 LED points (~150W total)", runtime: "14–18 Hours" },
        { name: "Ceiling & Standing Fans", spec: "4–6 standard fans", runtime: "10–14 Hours" },
        { name: "LED Smart TVs & Sound System", spec: "2 units (up to 65-inch)", runtime: "8–12 Hours" },
        { name: "Inverter Refrigerator / Small Freezer", spec: "1 unit (energy-efficient A+ rated)", runtime: "12–16 Hours" },
        { name: "Laptops, Printers & Workstations", spec: "Multiple office devices", runtime: "Continuous" },
        { name: "0.5HP–1HP Water Pump", spec: "Intermittent daytime pumping (managed load)", runtime: "1–2 cycles/day" },
      ],
      caution:
        "Do not run high-wattage heating appliances (electric heaters, pressing irons, boiling rings) simultaneously. Pumping machine cycles should be managed while heavy appliances are paused.",
    };
  }

  if (name.includes("5kva") || name.includes("5kw")) {
    return {
      title: "What Can the 5kVA / 5kW Premium System Power?",
      summary:
        "Heavy-duty whole-home and commercial power system. Powers major refrigeration, water pumping, and controlled inverter air conditioning.",
      appliances: [
        { name: "Full Residence Lighting", spec: "25+ LED fixtures and security lights", runtime: "16–24 Hours" },
        { name: "Ceiling Fans & Ventilation", spec: "All rooms (6–8 units)", runtime: "16–20 Hours" },
        { name: "Inverter Refrigerator & Deep Freezer", spec: "2 units simultaneously (Inverter-grade)", runtime: "24 Hours" },
        { name: "Multiple Smart TVs & Sound Systems", spec: "3–4 entertainment setups", runtime: "Continuous" },
        { name: "1HP Inverter Air Conditioner", spec: "1 unit (daytime peak or managed battery)", runtime: "4–6 Hours" },
        { name: "1HP Borehole / Water Pumping Machine", spec: "Intermittent automatic filling", runtime: "Daily operation" },
        { name: "Washing Machine", spec: "1 cycle during peak daylight solar generation", runtime: "1–2 Hours/day" },
      ],
      caution:
        "Air conditioning usage should prioritize high-efficiency inverter models during daytime solar generation to preserve battery cycle life through nighttime hours.",
    };
  }

  if (name.includes("10kva") || name.includes("10kw") || cat.includes("commercial")) {
    return {
      title: "What Can the 10kVA Commercial System Power?",
      summary:
        "Engineered for diagnostic clinics, educational facilities, commercial offices, and estates requiring robust three-phase energy independence.",
      appliances: [
        { name: "Complete Facility Lighting", spec: "50+ LED points and perimeter floodlights", runtime: "24 Hours" },
        { name: "Inverter Air Conditioners", spec: "2–3 units (1.5HP Inverter ACs)", runtime: "6–10 Hours" },
        { name: "Commercial Cold Storage & Freezers", spec: "Multiple refrigeration units", runtime: "24 Hours" },
        { name: "Office Workstations, Servers & CCTV", spec: "Full enterprise IT stack", runtime: "24 Hours" },
        { name: "Submersible Borehole Pump", spec: "1.5HP–2HP pumping system", runtime: "Automatic cycles" },
      ],
      caution:
        "Enterprise load profiles should undergo an on-site technical energy audit by Pet-Feb engineers to calibrate array tilt and battery capacity to operational requirements.",
    };
  }

  // Component fallback
  return {
    title: `Operating Scope & Compatibility: ${product.name}`,
    summary:
      "Engineered as a core component within clean solar energy architectures across Nigeria. Tested for high thermal tolerance, low harmonic distortion, and grid stability.",
    appliances: [
      { name: "Certified Solar Integration", spec: "Compatible with standard hybrid inverters and battery buses", runtime: "Continuous" },
      { name: "High Operating Efficiency", spec: "Designed to minimize conversion losses and heat buildup", runtime: "Continuous" },
      { name: "Surge & Thermal Protection", spec: "Built-in protection circuitry against voltage spikes and over-discharge", runtime: "Continuous" },
    ],
    caution:
      "Ensure electrical installation is conducted by certified Pet-Feb technicians in compliance with Nigerian Electrical Management Services Agency (NEMSA) standards.",
  };
}

function getProductFaqs(product: Product): ProductFaq[] {
  const name = product.name;
  return [
    {
      question: `What appliances can ${name} realistically run?`,
      answer:
        "System runtimes depend on your total continuous load, battery capacity, and daytime solar irradiation. Essential electronics (LED lights, fans, TVs, laptops) run effortlessly. High-surge appliances like water pumps and inverter refrigerators can be supported on 3kVA and 5kVA+ systems with proper load management.",
    },
    {
      question: "Is professional installation included in the listed price?",
      answer:
        "The displayed price covers the certified hardware package. Professional installation by certified Pet-Feb engineers is available nationwide as an optional add-on during checkout or following an on-site assessment.",
    },
    {
      question: "What warranty coverage is included and how do I get support?",
      answer:
        "All equipment includes verified manufacturer and Pet-Feb warranty coverage against technical defects. If you ever require servicing, our dedicated engineering teams in Port Harcourt, Abuja, and Lagos provide rapid nationwide support.",
    },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Pet-Feb Solar",
    };
  }

  const mainImg =
    product.product_images?.find((img) => img.is_main) || product.product_images?.[0];
  const ogImage = resolveMediaUrl(mainImg?.url);

  return {
    title: `${product.name} | Pet-Feb Solar`,
    description:
      product.description ||
      `Buy ${product.name} from Pet-Feb Solar. Genuine equipment, certified warranties, and installation across Nigeria.`,
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

  const [allProducts, blogPosts] = await Promise.all([
    getPublishedProducts(),
    getPublishedBlogPosts(),
  ]);

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

  const relatedArticles = blogPosts.slice(0, 3);

  const mainImg =
    product.product_images?.find((img) => img.is_main) || product.product_images?.[0];
  const mainImgUrl = resolveMediaUrl(mainImg?.url);
  const fallbackImg =
    product.category.toLowerCase().includes("panel") ||
    product.name.toLowerCase().includes("panel")
      ? "/api/websitepic/panels"
      : "/api/websitepic/battery";
  const displayMainImg = mainImgUrl || fallbackImg;

  const powerMatrix = getSystemPowerMatrix(product);
  const faqs = getProductFaqs(product);

  return (
    <div className="bg-white pb-16 sm:pb-24 overflow-x-clip font-sans">
      {/* ── Page Header Band matching Figma Frame 6147:6743 ────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6">
          {/* Left: Yellow dot + Heading with green period matching node 6147:6747 */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#F5B82E] shrink-0"
              aria-hidden="true"
            />
            <h1
              className="font-heading font-bold text-[22px] sm:text-[32px] lg:text-[40px] text-[#333333] tracking-[0.5px] uppercase leading-tight"
            >
              Pet-Feb Solar Shop
              <span className="text-[#7BB042]">.</span>
            </h1>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-[#3F6B1A] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Browse Full Catalogue</span>
          </Link>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-t border-[#D9D9D9] mb-6 sm:mb-8" />
      </section>

      {/* ── Main Product Presentation Section (Black Card) matching Figma node 6147:6784 ─ */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-black text-white rounded-[24px] sm:rounded-[32px] pt-6 sm:pt-[40px] px-3.5 sm:px-[35px] lg:px-8 xl:px-10 pb-8 sm:pb-[60px]">
          {/* Header Row inside black card: "Back to Shop" + Description matching node 6147:6785 */}
          <div className="flex flex-col gap-3 max-w-[742px] mb-6 sm:mb-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 min-h-[40px] font-heading font-semibold text-[15px] sm:text-[18px] text-[#F5B82E] hover:underline transition w-fit"
            >
              <ChevronLeft className="w-5 h-5 text-[#F5B82E]" />
              <span>Back to Shop</span>
            </Link>

            <p className="font-sans font-normal text-[14px] sm:text-[16px] lg:text-[18px] text-[#EBEBEB] leading-relaxed">
              Every solar kit and component is tested for performance, durability, and efficiency across Nigerian climate conditions.
            </p>
          </div>

          {/* White Inner Product Card matching Figma node 6147:7134 */}
          <div className="bg-white text-black rounded-[20px] sm:rounded-[28px] pt-5 sm:pt-[40px] lg:pt-[50px] px-4 sm:px-[28px] lg:px-[36px] pb-6 sm:pb-[40px] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[36px] items-start">
              {/* Left Column: Product Gallery */}
              <div className="lg:col-span-6 w-full max-w-[572px] mx-auto">
                <ProductMediaGallery
                  productName={product.name}
                  defaultMainUrl={displayMainImg}
                  images={product.product_images}
                />
              </div>

              {/* Right Column: Details, Specifications, Add to Cart & Buy Now */}
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

      {/* ── PHASE 3 C: "What Can This System Power?" Section ───────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#7BB042] flex items-center justify-center shrink-0">
                <Zap className="w-3 h-3 text-white fill-white" />
              </div>
              <h2 className="font-heading font-bold text-[22px] sm:text-[28px] text-gray-950 tracking-tight">
                {powerMatrix.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              {powerMatrix.summary}
            </p>
          </div>

          {/* Appliances Table Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {powerMatrix.appliances.map((app, i) => (
              <div
                key={i}
                className="bg-white rounded-[16px] border border-gray-200/90 p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-heading font-bold text-[15px] sm:text-[16px] text-gray-950">
                    {app.name}
                  </div>
                  <span className="font-heading font-semibold text-[11px] px-2 py-0.5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] shrink-0">
                    Supported
                  </span>
                </div>
                <div className="space-y-1 text-xs sm:text-[13px]">
                  <div className="text-gray-500 font-medium">Quantity / Load:</div>
                  <div className="text-gray-900 font-semibold">{app.spec}</div>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Typical Runtime:</span>
                  <span className="font-heading font-bold text-[#3F6B1A]">{app.runtime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Load Disclaimer Banner */}
          <div className="p-4 sm:p-5 rounded-[16px] bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-heading font-bold block">
                Engineering Load Note:
              </span>
              <p className="text-amber-900/90 leading-relaxed font-sans">
                {powerMatrix.caution} Appliance runtimes are estimates based on standard battery depths of discharge and daylight solar irradiation. Actual runtime varies based on continuous concurrent usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHASE 3 D, E, F: Technical Specs, What's Included, Installation & Delivery ─── */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Structured Technical Specifications (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#7BB042]" />
              <h2 className="font-heading font-bold text-[20px] sm:text-[24px] text-gray-950">
                Technical Specifications
              </h2>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody className="divide-y divide-gray-200 font-sans">
                  <tr className="bg-gray-50/70">
                    <th scope="row" className="p-3.5 sm:p-4 font-semibold text-gray-700 w-1/3">
                      Equipment Model
                    </th>
                    <td className="p-3.5 sm:p-4 text-gray-950 font-medium">
                      {product.name}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="p-3.5 sm:p-4 font-semibold text-gray-700">
                      Product Category
                    </th>
                    <td className="p-3.5 sm:p-4 text-gray-950 font-medium">
                      {product.category}
                    </td>
                  </tr>
                  {product.specs &&
                    Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <th scope="row" className="p-3.5 sm:p-4 font-semibold text-gray-700 capitalize">
                          {key}
                        </th>
                        <td className="p-3.5 sm:p-4 text-gray-950 font-medium">
                          {val}
                        </td>
                      </tr>
                    ))}
                  <tr className="bg-gray-50/70">
                    <th scope="row" className="p-3.5 sm:p-4 font-semibold text-gray-700">
                      Standard Warranty
                    </th>
                    <td className="p-3.5 sm:p-4 text-[#3F6B1A] font-semibold">
                      Verified Equipment Warranty (Manufacturer Covered)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 font-sans">
              * Note: For custom site requirements or hybrid grid-tie configurations, schedule a technical consultation with our engineering division.
            </p>
          </div>

          {/* Right Column: "What's Included?" & Delivery Scope (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* What's Included Card */}
            <div className="bg-[#F2F7EC] rounded-[24px] border border-[#D6E7C4] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5 text-[#3F6B1A]" />
                <h3 className="font-heading font-bold text-[18px] sm:text-[20px] text-gray-950">
                  What&apos;s Included in the Box?
                </h3>
              </div>

              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-heading">Primary Hardware Unit</strong>
                    <span className="text-gray-600">Factory-certified equipment in sealed packaging.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-heading">Mounting Brackets &amp; Interconnects</strong>
                    <span className="text-gray-600">Standard wall-mounting plates, hardware lugs, and terminals.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-heading">Documentation &amp; Warranty Certificate</strong>
                    <span className="text-gray-600">OEM operating manual, wiring schematic, and warranty certificate.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D6E7C4] text-xs text-gray-600 space-y-1 font-sans">
                <p>
                  <strong>Installation Service:</strong> Optional add-on. Baseline price covers certified hardware. You may select professional installation at checkout.
                </p>
              </div>
            </div>

            {/* Delivery & Logistics Scope */}
            <div className="bg-white rounded-[24px] border border-gray-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#7BB042]" />
                <h3 className="font-heading font-bold text-[16px] sm:text-[18px] text-gray-950">
                  Logistics &amp; Delivery Terms
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 font-sans">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042] shrink-0" />
                  <span><strong>Port Harcourt, Lagos, Abuja:</strong> 24–48 hours transit.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042] shrink-0" />
                  <span><strong>All Other States:</strong> 3–5 business days via regional hubs.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BB042] shrink-0" />
                  <span>Full transit insurance and tracking number issued upon dispatch.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHASE 3 H: Product FAQs Section ─────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-[#7BB042]" />
            <h2 className="font-heading font-bold text-[20px] sm:text-[24px] text-gray-950">
              Frequently Asked Questions About This System
            </h2>
          </div>
          <ProductFaqSection productName={product.name} faqs={faqs} />
        </div>
      </section>

      {/* ── Customer Reviews Transparency Notice ────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-gray-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
              Verified Project Reviews Policy
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-sans">
              Pet-Feb values transparent customer feedback. We only publish verified reviews gathered from actual post-installation surveys.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold text-[#3F6B1A] hover:underline shrink-0"
          >
            <span>Explore Real Installed Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Recommended Products Section (Yellow Card) matching Figma node 6147:6902 ─── */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-[#F5B82E] border border-[#D9D9D9] rounded-[24px] p-5 sm:p-10 lg:p-[45px] relative overflow-hidden">
          {/* Header Row with Checkmark Icon */}
          <div className="flex flex-col gap-2 max-w-[742px] mb-7 sm:mb-8 relative">
            <div className="flex items-center gap-3">
              <div className="w-[22px] h-[22px] rounded-full bg-black flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#F5B82E] stroke-[3]" />
              </div>
              <h2 className="font-heading font-bold text-[22px] sm:text-[28px] text-black leading-tight">
                Recommended Solar Solutions
              </h2>
            </div>
            <p className="font-sans font-normal text-[14px] sm:text-[16px] text-[#242424] leading-relaxed">
              Explore complementary equipment and alternate capacity options to match your energy demand.
            </p>
          </div>

          {/* 3 Product Cards with View Details CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch relative">
            {relatedProducts.map((rel) => {
              const relImg =
                rel.product_images?.[0]?.url ||
                (rel.category.toLowerCase().includes("battery")
                  ? "/api/websitepic/battery"
                  : "/api/websitepic/commercial");

              const specSummary =
                rel.specs?.["Min, Order"] ||
                rel.specs?.["Min Order"] ||
                "Min. Order: 1 unit";

              return (
                <div
                  key={rel.id}
                  className="bg-white rounded-[20px] p-4 sm:p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="flex flex-col gap-3 w-full">
                    {/* Image Area */}
                    <Link
                      href={`/shop/${rel.slug}`}
                      className="h-[220px] sm:h-[260px] rounded-[16px] bg-[#EBEBEB] overflow-hidden relative block"
                      aria-label={`View ${rel.name}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveMediaUrl(relImg) || relImg}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Category & Title */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-gray-500">
                        {rel.category}
                      </span>
                      <h3 className="font-heading font-bold text-[17px] sm:text-[19px] text-black line-clamp-1">
                        <Link
                          href={`/shop/${rel.slug}`}
                          className="hover:text-[#3F6B1A] transition"
                        >
                          {rel.name}
                        </Link>
                      </h3>
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-heading font-bold text-[19px] sm:text-[21px] text-[#111827]">
                        {formatNaira(rel.price)}
                      </span>
                      <span className="font-sans text-[12px] text-[#5C5C5C]">
                        {specSummary}
                      </span>
                    </div>
                  </div>

                  {/* Informational View Details CTA */}
                  <div className="pt-4 w-full">
                    <Link
                      href={`/shop/${rel.slug}`}
                      className="bg-black text-[#F2F7EC] font-heading font-bold text-[14px] sm:text-[15px] rounded-[12px] min-h-[46px] px-4 py-2.5 flex items-center justify-center hover:bg-gray-900 transition text-center w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PHASE 3 J: Related Educational & Installation Articles ─────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="bg-[#F8F9FA] border border-gray-200 rounded-[24px] p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-heading font-bold text-[20px] sm:text-[24px] text-gray-950">
                  Solar Guides &amp; Installation Articles
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-sans mt-0.5">
                  Learn how to choose, size, and maintain your solar energy setup for maximum lifespan.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-semibold text-[#3F6B1A] hover:underline"
              >
                <span>Read More Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/blog/${art.slug}`}
                  className="bg-white rounded-[16px] border border-gray-200 p-4 space-y-3 hover:shadow-sm hover:border-[#7BB042]/50 transition block group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#7BB042]">
                      {art.category || "Solar Education"}
                    </span>
                    <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-gray-950 group-hover:text-[#3F6B1A] transition line-clamp-2">
                      {art.title}
                    </h3>
                  </div>
                  {art.body && (
                    <p className="text-xs text-gray-600 line-clamp-2 font-sans leading-relaxed">
                      {art.body.slice(0, 120)}...
                    </p>
                  )}
                  <div className="pt-2 flex items-center text-xs font-heading font-semibold text-[#3F6B1A] group-hover:underline">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
