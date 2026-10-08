"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export function RouteBackButton() {
  const pathname = usePathname();
  const router = useRouter();

  // Do not show back button on homepage
  if (pathname === "/") {
    return null;
  }

  const handleBack = () => {
    // If there is history in current session, go back; otherwise navigate to home
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // Humanize path for breadcrumb display
  const segments = pathname.split("/").filter(Boolean);
  const currentSegment = segments[segments.length - 1]?.replace(/-/g, " ") || "";

  return (
    <div className="w-full bg-white/70 backdrop-blur-xs border-b border-gray-200/80 sticky top-20 z-30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-[#3F6B1A] px-3.5 py-2 min-h-[36px] rounded-lg transition cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7BB042]"
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="w-4 h-4 text-[#7BB042]" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] text-gray-500 truncate max-w-[240px] sm:max-w-none">
          <Link href="/" className="hover:text-gray-900 transition flex items-center gap-1">
            <Home className="w-3 h-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-800 capitalize truncate">
            {currentSegment}
          </span>
        </div>
      </div>
    </div>
  );
}
