import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { HashScroller } from "@/components/public/HashScroller";
import { RevealOnScroll } from "@/components/public/RevealOnScroll";
import { WhatsAppAiWidget } from "@/components/public/WhatsAppAiWidget";
import { CartProvider } from "@/lib/cart-context";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://petfeb.com/#organization",
      name: "Pet-Feb Solar",
      alternateName: "Pet-Feb International Company Limited",
      url: "https://petfeb.com",
      logo: "https://petfeb.com/api/logo",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234 813 585 4054",
        contactType: "customer service",
        areaServed: "NG",
        availableLanguage: ["en"],
      },
      sameAs: [
        "https://www.instagram.com/petfebsolar?obrf=NG16azc0dGtwZzdl",
        "https://facebook.com/petfeb",
        "https://x.com/petfeb?s=11",
        "https://www.tiktok.com/@petfeb_solar?_r=1&_t=ZS-9BDQkzwuqEW",
        "https://linkedin.com/company/petfeb",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://petfeb.com/#localbusiness",
      name: "Pet-Feb Solar",
      image: "https://petfeb.com/api/websitepic/hero",
      telephone: "+234 813 585 4054",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot 23 Binabi Street, GRA Phase 1",
        addressLocality: "Port Harcourt",
        addressRegion: "Rivers State",
        postalCode: "840100",
        addressCountry: "NG",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
    },
  ],
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="public-site flex flex-col min-h-screen bg-[#F8F9FA] text-[#333333]">
        <Header />
        <HashScroller />
        <RevealOnScroll />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppAiWidget />
      </div>
    </CartProvider>
  );
}
