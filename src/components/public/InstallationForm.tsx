"use client";

import { useState } from "react";
import {
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  CheckCircle2,
  Upload,
  Lock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export function InstallationForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("Lagos");
  const [propertyType, setPropertyType] = useState<
    "Residential Home" | "Commercial Office" | "Industrial / Factory" | "Healthcare / Mini-Grid"
  >("Residential Home");
  const [equipmentStatus, setEquipmentStatus] = useState<"need_both" | "install_only">("need_both");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (9:00 AM – 1:00 PM WAT)");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl border border-[#D9D9D9] p-8 sm:p-12 text-center space-y-4 shadow-md">
        <div className="w-16 h-16 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#7BB042]" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-gray-900">
          Inspection Request Received
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{fullName}</strong>. Our regional technical desk in {state} has assigned dispatch reference <strong className="font-mono text-gray-900">INS-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. A certified solar surveyor will call you within 24 business hours to confirm your roof audit.
        </p>
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-xs cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-10 shadow-sm space-y-6">
      <div className="space-y-2 text-center sm:text-left pb-4 border-b border-gray-100">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#E8F3DA] text-[#3F6B1A]">
          <Clock className="w-3.5 h-3.5 text-[#7BB042]" />
          24-Hour Dispatch SLA
        </span>
        <h2 className="font-heading font-bold text-2xl text-gray-900">
          Request an installation or site survey
        </h2>
        <p className="text-xs text-gray-500">
          Connect with our technical dispatch team for an on-site engineering assessment within 24 business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* ── 1. Contact Information ──────────────────────────── */}
        <div className="space-y-3">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 block">
            1. CONTACT INFORMATION
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Full Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. Babatunde Adeleke"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Phone Number *</label>
              <input
                required
                type="tel"
                placeholder="+234 803 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Email Address *</label>
              <input
                required
                type="email"
                placeholder="name@domain.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* ── 2. Property & Location ──────────────────────────── */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 block">
            2. PROPERTY &amp; LOCATION
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-gray-700">Property Address *</label>
              <input
                required
                type="text"
                placeholder="e.g. Plot 14, Admiralty Way, Lekki Phase 1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">State *</label>
              <div className="relative">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-10 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                >
                  <option>Lagos</option>
                  <option>Abuja (FCT)</option>
                  <option>Rivers State</option>
                  <option>Oyo State</option>
                  <option>Anambra</option>
                  <option>Ogun State</option>
                  <option>Other State</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Property Type 4 Selectable Chips */}
          <div className="space-y-1.5 pt-1">
            <label className="font-semibold text-gray-700">Property Type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  "Residential Home",
                  "Commercial Office",
                  "Industrial / Factory",
                  "Healthcare / Mini-Grid",
                ] as const
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition cursor-pointer text-center ${
                    propertyType === type
                      ? "bg-[#E8F3DA] text-[#3F6B1A] border-[#7BB042] ring-1 ring-[#7BB042]"
                      : "bg-[#F8F9FA] text-gray-700 border-[#D9D9D9] hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Equipment Setup & Schedule ───────────────────── */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 block">
            3. EQUIPMENT SETUP &amp; INSPECTION SCHEDULE
          </span>

          <label className="font-semibold text-gray-700 block">
            Do you already have solar equipment?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setEquipmentStatus("need_both")}
              className={`p-3.5 rounded-xl border text-left space-y-1 transition cursor-pointer ${
                equipmentStatus === "need_both"
                  ? "bg-[#E8F3DA] border-[#7BB042] text-gray-950 ring-1 ring-[#7BB042]"
                  : "bg-white border-[#D9D9D9] text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">No, I need equipment + installation</span>
                {equipmentStatus === "need_both" && (
                  <CheckCircle2 className="w-4 h-4 text-[#3F6B1A]" />
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Complete turnkey solar system engineered by Petfeb
              </p>
            </button>

            <button
              type="button"
              onClick={() => setEquipmentStatus("install_only")}
              className={`p-3.5 rounded-xl border text-left space-y-1 transition cursor-pointer ${
                equipmentStatus === "install_only"
                  ? "bg-[#E8F3DA] border-[#7BB042] text-gray-950 ring-1 ring-[#7BB042]"
                  : "bg-white border-[#D9D9D9] text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">Yes, I need installation only</span>
                {equipmentStatus === "install_only" && (
                  <CheckCircle2 className="w-4 h-4 text-[#3F6B1A]" />
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Inspect and commission my existing hardware safely
              </p>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Preferred Inspection Date *</label>
              <input
                required
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-700">Preferred Time Window</label>
              <div className="relative">
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-10 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                >
                  <option>Morning (9:00 AM – 1:00 PM WAT)</option>
                  <option>Afternoon (2:00 PM – 6:00 PM WAT)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Upload Drop Zone Box */}
          <div className="space-y-1 pt-1">
            <span className="font-semibold text-gray-700 block">
              Upload Roof / Electrical Panel Photos (Optional)
            </span>
            <div className="border border-dashed border-[#D9D9D9] rounded-xl p-4 text-center space-y-1 bg-[#F8F9FA]">
              <Upload className="w-5 h-5 text-gray-400 mx-auto" />
              <p className="text-xs font-medium text-gray-700">
                Click to upload or drag and drop roof, meter or distribution board photos
              </p>
              <p className="text-[10px] text-gray-400">PNG, JPG or PDF up to 10MB</p>
            </div>
          </div>

          {/* Technical Notes Textarea */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Technical Notes / Special Instructions</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about your daytime loads (e.g. air conditioners, deep freezers, water pumping machines) or generator capacity..."
              className="w-full px-3 py-2.5 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Submit Button & Security Note */}
        <div className="space-y-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 min-h-[50px]"
          >
            <span>{isSubmitting ? "Submitting Request..." : "Submit Installation Request"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-[#7BB042]" />
            <span>Data protected under NDPR · Free site audit with no obligation to purchase</span>
          </p>
        </div>
      </form>
    </div>
  );
}
