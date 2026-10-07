"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginFormInner() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#7BB042] mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Petfeb Staff
            </h1>
            <p className="text-[#5C5C5C] mt-1 text-sm">
              Sign in to the admin dashboard
            </p>
          </div>

          <form action={action} className="space-y-5">
            <input type="hidden" name="next" value={next} />

            {state.error && (
              <div className="bg-[#FCE8E6] text-[#B3261E] text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
                placeholder="you@petfeb.com"
              />
              {state.fieldErrors?.email && (
                <p className="text-[#B3261E] text-xs mt-1">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#333] mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-[#8A8A8A] px-4 py-2.5 text-sm text-[#333] placeholder-[#767676] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent transition"
                placeholder="••••••••"
              />
              {state.fieldErrors?.password && (
                <p className="text-[#B3261E] text-xs mt-1">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#7BB042] text-black font-semibold rounded-lg py-2.5 text-sm hover:bg-[#6A9E36] active:bg-[#4F8221] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#767676] mt-6">
          This area is for Petfeb staff only.
        </p>
      </div>
    </div>
  );
}

export default function StaffLoginPage() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
