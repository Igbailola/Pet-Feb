import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-[#FCE8E6] flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B3261E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        403 — Access denied
      </h1>
      <p className="text-[#5C5C5C] text-sm max-w-sm mb-6">
        You don&apos;t have permission to view this section.
        Contact your administrator if you believe this is a mistake.
      </p>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#3F6B1A] hover:underline"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
