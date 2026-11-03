import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { HashScroller } from "@/components/public/HashScroller";
import { RevealOnScroll } from "@/components/public/RevealOnScroll";
import { CartProvider } from "@/lib/cart-context";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="public-site flex flex-col min-h-screen bg-[#F8F9FA] text-[#333333]">
        <Header />
        <HashScroller />
        <RevealOnScroll />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
