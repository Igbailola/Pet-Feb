"use client";

import { useState } from "react";
import { CheckCircle2, Send, ChevronDown } from "lucide-react";

export function HomeContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    serviceOption: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-[24px] border border-[#EBEBEB] p-6 sm:p-10 lg:p-12 shadow-[0px_2px_22px_0px_rgba(45,45,45,0.06)]">
      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#7BB042]" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-gray-950">
            Thank You for Contacting Pet-Feb
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Your consultation request has been received. Our certified solar engineering team will review your specifications and contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                zip: "",
                serviceOption: "",
                message: "",
              });
            }}
            className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Full Name, Email, Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Full Name:
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter Full Name:"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter Email:"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Phone Number:
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter Phone Number:"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Row 2: Address, City, Zip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter Your Address:"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                City:
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Enter Your City:"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Zip:
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                placeholder="Enter Your Zip Code:"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Row 3: Option Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Service of Interest:
            </label>
            <div className="relative">
              <select
                value={formData.serviceOption}
                onChange={(e) => setFormData({ ...formData, serviceOption: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition pr-10"
              >
                <option value="">Choose an Option</option>
                <option value="residential">Residential Solar Installation (5kVA - 15kVA)</option>
                <option value="commercial">Commercial & Industrial Power Solutions (30kVA+)</option>
                <option value="buy_small">Buy Small Solar Installment Financing</option>
                <option value="street_lighting">Solar Street Lighting & Community Projects</option>
                <option value="audit">Energy Audit, Inverter Repairs & Maintenance</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Row 4: Message Textarea */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Message:
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Type your message..."
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-base font-bold bg-[#7BB042] text-white hover:bg-[#6EA138] transition shadow-xs flex items-center justify-center gap-2 min-h-[52px]"
            >
              <span>Submit Consultation Request</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
