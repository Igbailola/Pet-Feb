"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Clock,
  User,
  Phone,
  MapPin,
  Home,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  RotateCcw,
  Info,
} from "lucide-react";

const PROPERTY_TYPES = [
  "Residential Home",
  "Commercial Office",
  "Industrial / Factory",
  "Healthcare / Mini-Grid",
] as const;

const SYSTEM_SIZES = [
  "Not sure — need expert load audit",
  "3 kVA Hybrid System (Essential lights, TVs, fridge)",
  "5 kVA Hybrid System (Medium home / Inverter ACs)",
  "10 kVA Hybrid System (Duplex / Corporate office)",
  "20 kVA+ Commercial Mini-Grid",
] as const;

export function InstallationForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState<string>("Residential Home");
  const [systemSize, setSystemSize] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const handleReset = useCallback(() => {
    setFullName("");
    setPhone("");
    setLocation("");
    setPropertyType("Residential Home");
    setSystemSize("");
    setIsSubmitting(false);
    setIsSubmitted(false);
    setCountdown(10);
  }, []);

  // Listen to reduced-motion preference changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // 10-second auto-return timer when submitted, respecting reduced-motion
  useEffect(() => {
    if (!isSubmitted || reducedMotion) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleReset();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, reducedMotion, handleReset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Client-side simulation only — no database writes or external dispatches
    setTimeout(() => {
      setIsSubmitting(false);
      setCountdown(10);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="bg-white text-gray-900 rounded-[24px] border border-[#D9D9D9] p-8 sm:p-12 text-center space-y-5 shadow-md transition-all"
      >
        <div className="w-16 h-16 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#7BB042]" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3DA] text-[#3F6B1A]">
            <Info className="w-3.5 h-3.5 text-[#7BB042]" />
            Preview Demonstration
          </span>
          <h3 className="font-heading font-bold text-2xl text-gray-950">
            Installation Request Validated (Simulation)
          </h3>
        </div>

        <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-200 text-xs sm:text-sm text-gray-700 max-w-lg mx-auto text-left space-y-2.5">
          <p>
            Thank you, <strong>{fullName}</strong>. Your request for a certified technician site survey for a <strong>{propertyType}</strong> in <strong>{location}</strong> has been validated locally in this preview.
          </p>
          {systemSize && (
            <p className="text-gray-600">
              Preferred Capacity / Load: <span className="font-semibold text-gray-900">{systemSize}</span>
            </p>
          )}
          <p className="text-[11px] text-[#767676] pt-1 border-t border-gray-200">
            Notice: No live database records, SMS notifications, or backend dispatches were created during this UI preview. Production persistence will be enabled upon backend deployment.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3.5 rounded-[12px] text-xs sm:text-sm font-heading font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition shadow-xs cursor-pointer inline-flex items-center justify-center gap-2 min-h-[46px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Request Again</span>
          </button>
        </div>

        {!reducedMotion && (
          <p className="text-[11px] text-gray-400">
            Returning to a fresh form in {countdown}s... (Click &quot;Request Again&quot; to reset immediately)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F8] text-[#1B1C1C] rounded-[24px] border border-[#D9D9D9] p-6 sm:p-8 lg:p-10 shadow-md space-y-6">
      <div className="space-y-2 pb-4 border-b border-[#D9D9D9]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-heading font-bold bg-[#E8F3DA] text-[#3F6B1A]">
            <Clock className="w-3.5 h-3.5 text-[#7BB042]" />
            24-Hour Dispatch SLA
          </span>
          <span className="text-[11px] font-heading font-semibold text-[#737968]">
            NEMSA Certified Level-3 Desk
          </span>
        </div>
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-950 pt-1">
          Request an Installation or Site Survey
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Connect with Petfeb&apos;s certified regional engineering team for an on-site solar assessment within 24 business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Field 1: Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="font-heading font-semibold text-[13px] text-gray-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Full Name *</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Engr. Chukwuma Adeleke"
              className="w-full h-[48px] px-3.5 rounded-[10px] border border-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent bg-white text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Field 2: WhatsApp Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="font-heading font-semibold text-[13px] text-gray-800 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>WhatsApp Phone Number *</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +234 813 585 4054"
              className="w-full h-[48px] px-3.5 rounded-[10px] border border-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent bg-white text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Field 3: Installation Location */}
        <div className="space-y-1.5">
          <label htmlFor="location" className="font-heading font-semibold text-[13px] text-gray-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Installation Location (State / City / Area) *</span>
          </label>
          <input
            id="location"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Port Harcourt, Rivers State / Lekki Phase 1, Lagos"
            className="w-full h-[48px] px-3.5 rounded-[10px] border border-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent bg-white text-sm text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Field 4: Property Type */}
        <div className="space-y-2">
          <label className="font-heading font-semibold text-[13px] text-gray-800 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Property Type *</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROPERTY_TYPES.map((type) => {
              const active = propertyType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`py-3 px-3 rounded-[10px] text-xs font-heading font-bold border transition cursor-pointer text-center ${
                    active
                      ? "bg-[#7BB042] text-white border-[#7BB042] shadow-xs"
                      : "bg-white text-gray-700 border-[#D9D9D9] hover:border-black"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 5: Estimated Daily Load or Preferred System Size (Optional) */}
        <div className="space-y-1.5">
          <label htmlFor="systemSize" className="font-heading font-semibold text-[13px] text-gray-800 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#7BB042]" />
            <span>Estimated Daily Load or Preferred System Size (Optional)</span>
          </label>
          <select
            id="systemSize"
            value={systemSize}
            onChange={(e) => setSystemSize(e.target.value)}
            className="w-full h-[48px] px-3.5 rounded-[10px] border border-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:border-transparent bg-white text-sm text-gray-900 cursor-pointer"
          >
            <option value="">Select estimated capacity or load requirement...</option>
            {SYSTEM_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button & Preview Disclaimer */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[52px] rounded-[12px] text-sm sm:text-base font-heading font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "Validating Request..." : "Request Installers Now"}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-[#7BB042] shrink-0" />
            <span>
              Demonstration Preview: Client-side validation active. Live server persistence enabled on production rollout.
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
