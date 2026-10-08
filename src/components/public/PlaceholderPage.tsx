import Link from "next/link";
import { ArrowLeft, Clock, ShoppingBag } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  badge?: string;
  description: string;
  returnHref?: string;
  returnLabel?: string;
}

export function PlaceholderPage({
  title,
  badge = "Feature In Progress",
  description,
  returnHref = "/",
  returnLabel = "Return to Homepage",
}: PlaceholderPageProps) {
  return (
    <div className="py-20 md:py-28 px-3 sm:px-5 lg:px-6 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#3F6B1A] border border-emerald-200 mb-6">
        <Clock className="w-3.5 h-3.5 text-[#7BB042]" />
        <span>{badge}</span>
      </div>

      <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight mb-6">
        {title}
      </h1>

      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={returnHref}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {returnLabel}
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
        >
          <ShoppingBag className="w-4 h-4" />
          Explore Solar Kits
        </Link>
      </div>
    </div>
  );
}
