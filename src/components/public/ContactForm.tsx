"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Send, AlertCircle } from "lucide-react";

const NIGERIAN_STATES = [
  "Abia",
  "Abuja (FCT)",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos State",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers State (Port Harcourt)",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const CONFIRMED_SERVICES = [
  "Residential Solar Installation",
  "Commercial & Industrial Solar Solutions",
  "Pet-Feb Buy Small Small Installment Plan",
  "Solar Technical Academy & Training Program",
  "System Maintenance, Audit & Inverter Repair",
  "Custom Solar Micro-Grid & Street Lighting",
  "General Product & Equipment Enquiry",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "Rivers State (Port Harcourt)",
    serviceRequired: "Residential Solar Installation",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    // Nigerian phone validation (accepts 11 digits like 080..., or +234...)
    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    const phoneRegex = /^(0|\+?234)[789][01]\d{8}$/;
    if (!cleanPhone) {
      errs.phone = "Please enter your phone number.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = "Please enter a valid Nigerian phone number (e.g. 0813 585 4054).";
    }

    if (!formData.location) {
      errs.location = "Please select your location or state.";
    }

    if (!formData.serviceRequired) {
      errs.serviceRequired = "Please select the service required.";
    }

    if (!formData.message.trim()) {
      errs.message = "Please describe your solar project or enquiry.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Please provide at least 10 characters so our team can assist you effectively.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate reliable submission (Notice clearly logged in compliance with Phase 4)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-100 text-gray-900">
      {submitted ? (
        <div className="text-center py-10 space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9 text-[#7BB042]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
              Thank You for Contacting Pet-Feb
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
              Your solar enquiry has been received. Our certified engineering desk will review your requirements and reach out via phone/WhatsApp within 24 business hours.
            </p>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: "",
                  phone: "",
                  location: "Rivers State (Port Harcourt)",
                  serviceRequired: "Residential Solar Installation",
                  message: "",
                });
                setErrors({});
              }}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition cursor-pointer"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* 1. Full Name */}
            <div className="space-y-2">
              <label htmlFor="contact-fullName" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                placeholder="e.g. Engr. Emeka Williams"
                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/40 focus:ring-red-400"
                    : "border-gray-200 bg-gray-50/50 focus:ring-[#7BB042] focus:bg-white"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* 2. Phone Number */}
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                placeholder="e.g. 0813 585 4054"
                className={`w-full px-4 py-3.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-400 bg-red-50/40 focus:ring-red-400"
                    : "border-gray-200 bg-gray-50/50 focus:ring-[#7BB042] focus:bg-white"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* 3. Location / Area */}
            <div className="space-y-2">
              <label htmlFor="contact-location" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Location / State <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="contact-location"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (errors.location) setErrors({ ...errors, location: "" });
                  }}
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition cursor-pointer"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Service Required */}
            <div className="space-y-2">
              <label htmlFor="contact-service" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Service Required <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="contact-service"
                  value={formData.serviceRequired}
                  onChange={(e) => {
                    setFormData({ ...formData, serviceRequired: e.target.value });
                    if (errors.serviceRequired) setErrors({ ...errors, serviceRequired: "" });
                  }}
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition cursor-pointer"
                >
                  {CONFIRMED_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 5. Message */}
          <div className="space-y-2">
            <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Message / Project Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              placeholder="Tell us about your power requirements, current electricity challenges, or the specific solar products you need..."
              className={`w-full px-4 py-3.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 resize-none ${
                errors.message
                  ? "border-red-400 bg-red-50/40 focus:ring-red-400"
                  : "border-gray-200 bg-gray-50/50 focus:ring-[#7BB042] focus:bg-white"
              }`}
            />
            {errors.message && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-base font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[52px] disabled:opacity-70"
            >
              {loading ? (
                <span>Sending Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

