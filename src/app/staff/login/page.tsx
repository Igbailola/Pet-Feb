"use client";

import { useState, useActionState } from "react";
import { loginAction, registerAdminAction, type LoginState } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, UserPlus, LogIn, KeyRound } from "lucide-react";

function LoginFormInner() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const isLoggedOut = searchParams.get("logged_out") === "true";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [loginState, loginFormAction, loginPending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  const [regState, regFormAction, regPending] = useActionState<LoginState, FormData>(
    registerAdminAction,
    {},
  );

  const state = mode === "login" ? loginState : regState;
  const pending = mode === "login" ? loginPending : regPending;

  const fillDemoSuperstaff = () => {
    setEmailInput("superstaff@demo.petfeb.test");
    setPasswordInput("petfebusers2026");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Top return link */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Website Homepage</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
          {/* Logo area */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#7BB042] mb-4 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Petfeb Admin Portal
            </h1>
            <p className="text-[#5C5C5C] mt-1 text-xs sm:text-sm">
              {mode === "login"
                ? "Sign in with your email and password"
                : "Register a new admin account with your credentials"}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-[#F3F4F6] p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition cursor-pointer ${
                mode === "login"
                  ? "bg-white text-black shadow-xs"
                  : "text-[#767676] hover:text-black"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition cursor-pointer ${
                mode === "register"
                  ? "bg-white text-black shadow-xs"
                  : "text-[#767676] hover:text-black"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Admin</span>
            </button>
          </div>

          {/* Logged Out Notice */}
          {isLoggedOut && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0" />
                <span>Logged Out Successfully</span>
              </div>
              <p className="text-xs text-gray-600">
                You have been securely signed out of the Petfeb staff management portal.
              </p>
            </div>
          )}

          {/* Form */}
          <form action={mode === "login" ? loginFormAction : regFormAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />

            {state.error && (
              <div className="bg-[#FCE8E6] text-[#B3261E] text-xs sm:text-sm rounded-xl px-4 py-3 flex items-start gap-2 border border-rose-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m15 9-6 6"/>
                  <path d="m9 9 6 6"/>
                </svg>
                <span>{state.error}</span>
              </div>
            )}

            {mode === "register" && (
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-[#333] mb-1.5">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Operations Admin"
                  className="w-full min-h-[44px] rounded-xl border border-[#D9D9D9] px-3.5 py-2.5 text-xs sm:text-sm text-[#333] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#333] mb-1.5">
                Admin Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-[#D9D9D9] px-3.5 py-2.5 text-xs sm:text-sm text-[#333] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
                placeholder="admin@petfeb.com"
              />
              {state.fieldErrors?.email && (
                <p className="text-[#B3261E] text-xs mt-1">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-[#333] mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-[#D9D9D9] px-3.5 py-2.5 text-xs sm:text-sm text-[#333] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
                placeholder="••••••••"
              />
              {state.fieldErrors?.password && (
                <p className="text-[#B3261E] text-xs mt-1">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full min-h-[44px] inline-flex items-center justify-center bg-[#7BB042] text-black font-bold rounded-xl px-4 py-2.5 text-xs sm:text-sm hover:bg-[#6A9E36] active:bg-[#4F8221] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xs cursor-pointer"
            >
              {pending
                ? mode === "login" ? "Signing in…" : "Creating Admin…"
                : mode === "login" ? "Sign In to Admin Dashboard" : "Register Admin & Sign In"}
            </button>
          </form>

          {/* Quick Fill Demo Helper */}
          {mode === "login" && (
            <div className="pt-3 border-t border-[#F2F2F2] flex items-center justify-between text-xs text-[#767676]">
              <span>Need demo access?</span>
              <button
                type="button"
                onClick={fillDemoSuperstaff}
                className="inline-flex items-center gap-1 text-[#3F6B1A] font-semibold hover:underline cursor-pointer"
              >
                <KeyRound size={12} />
                <span>Quick-fill Demo Superstaff</span>
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-[#767676]">
            Petfeb Solar Internal Operations & Management Portal
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7BB042] hover:text-[#6A9E36] hover:underline transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Website Homepage
            </Link>
          </div>
        </div>
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
