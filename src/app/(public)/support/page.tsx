import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Cpu,
  ShieldCheck,
  Truck,
  RotateCcw,
  Wrench,
  CreditCard,
  Search,
  ArrowRight,
  PhoneCall,
  FileQuestion,
} from "lucide-react";
import { SupportFaqAccordion, type FaqItem } from "@/components/public/SupportFaqAccordion";

export const metadata: Metadata = {
  title: "Support & Help Center | Pet-Feb Solar",
  description:
    "Find answers to frequently asked questions about Pet-Feb solar systems, warranties, Buy Small financing, installation, and order tracking.",
};

const SUPPORT_CATEGORIES = [
  {
    id: "faq",
    title: "Frequently Asked Questions",
    desc: "Quick answers to common questions about systems, pricing, and warranties.",
    icon: HelpCircle,
    href: "#faqs",
    isAnchor: true,
  },
  {
    id: "sizing",
    title: "Product & System Sizing",
    desc: "Calculate your energy usage and select the appropriate kVA inverter and storage bank.",
    icon: Cpu,
    href: "/shop",
    isAnchor: false,
  },
  {
    id: "warranty",
    title: "Warranty & Hardware Claims",
    desc: "Understand Pet-Feb hardware replacement protections and component coverage guidelines.",
    icon: ShieldCheck,
    href: "#faqs",
    isAnchor: true,
  },
  {
    id: "delivery-install",
    title: "Delivery & Installation",
    desc: "Request certified engineer installation or review transit timelines for Lagos, Abuja, and nationwide.",
    icon: Truck,
    href: "/installation",
    isAnchor: false,
  },
  {
    id: "returns",
    title: "Returns & Equipment Refunds",
    desc: "Our policies regarding factory hardware inspection, testing, and verified component replacements.",
    icon: RotateCcw,
    href: "#faqs",
    isAnchor: true,
  },
  {
    id: "maintenance",
    title: "Maintenance & System Repairs",
    desc: "Schedule inverter servicing, battery BMS calibration, or solar array cleaning.",
    icon: Wrench,
    href: "/installation",
    isAnchor: false,
  },
  {
    id: "buy-small",
    title: "Buy Small Financing Support",
    desc: "Installment schedules, weekly/monthly plans, 30% initial deposits, and repayment FAQs.",
    icon: CreditCard,
    href: "/buy-small",
    isAnchor: false,
  },
  {
    id: "track-order",
    title: "Track Your Order",
    desc: "Monitor shipment dispatch status, driver allocation, and delivery telemetry in real-time.",
    icon: Search,
    href: "/track-order",
    isAnchor: false,
  },
];

const SUGGESTED_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Sizing",
    question: "How do I choose the right solar system size?",
    answer:
      "System sizing depends on your total daily power consumption, peak wattage (such as pumps, refrigerators, and air conditioning), and required backup duration. We recommend requesting a complimentary load assessment from our engineering team or starting with our starter 1kVA (basic essentials), 3kVA (standard home), or 5kVA+ (high-capacity) packages.",
    isConfirmed: true,
  },
  {
    id: "faq-2",
    category: "Sizing",
    question: "What appliances can a 5kVA system power?",
    answer:
      "A typical Pet-Feb 5kVA hybrid solar system paired with a 5.12kWh+ LiFePO4 battery comfortably runs lighting, multiple LED TVs, refrigerators, freezers, standing fans, washing machines, sound systems, and a 1HP–1.5HP inverter air conditioner during sunny daylight hours.",
    isConfirmed: true,
  },
  {
    id: "faq-3",
    category: "Installation",
    question: "How long does solar installation take?",
    answer:
      "Standard residential installations (1kVA to 5kVA) are typically mounted, wired, and commissioned within 24 to 48 hours following component delivery. Larger commercial and industrial micro-grid installations require between 3 to 7 business days depending on structural roofing and distribution synchronization.",
    isConfirmed: true,
  },
  {
    id: "faq-4",
    category: "Warranty",
    question: "What does the product warranty cover?",
    isConfirmed: false, // Flagged for management approval per Phase 5
  },
  {
    id: "faq-5",
    category: "Buy Small",
    question: "How does the Buy Small payment option work?",
    answer:
      "Buy Small allows homeowners and businesses to spread the cost of solar hardware over flexible weekly or monthly installments. Following an initial downpayment deposit (typically 30% to 50%), the system is installed at your property, and ownership transfers fully upon completion of the scheduled tenure.",
    isConfirmed: true,
  },
  {
    id: "faq-6",
    category: "Buy Small",
    question: "What happens if I miss a repayment?",
    isConfirmed: false, // Flagged for financial/legal policy confirmation
  },
  {
    id: "faq-7",
    category: "Coverage",
    question: "Which locations does Pet-Feb serve?",
    answer:
      "Pet-Feb operates from our Port Harcourt Head Office, alongside regional operations in Lagos and Abuja, deploying certified solar installation engineers and logistics dispatch across Nigeria.",
    isConfirmed: true,
  },
  {
    id: "faq-8",
    category: "Installation",
    question: "Do your solar products come with installation?",
    answer:
      "Products purchased on the Pet-Feb shop can be ordered with optional Certified Turnkey Installation at checkout. Our nationwide technical engineers will conduct site audits, handle mounting, safety breakers, earthing, and handover commissioning.",
    isConfirmed: true,
  },
  {
    id: "faq-9",
    category: "Maintenance",
    question: "How do I request product maintenance?",
    answer:
      "You can request preventive maintenance, inverter firmware diagnostics, or battery expansion by reaching our technical support desk or submitting a request via our Contact or Request Installer pages.",
    isConfirmed: true,
  },
  {
    id: "faq-10",
    category: "Logistics",
    question: "How can I track my order?",
    answer:
      "Once your order has been dispatched, you receive a dispatch tracking code. You can enter this code on our dedicated Track Order page (/track-order) to monitor delivery transit milestones and direct driver contact.",
    isConfirmed: true,
  },
  {
    id: "faq-11",
    category: "Assessment",
    question: "Can I request a solar assessment?",
    answer:
      "Yes. You can submit your location and load specifications through our Contact page (/contact) or Request Installer page (/installation) to schedule a zero-obligation engineering site survey.",
    isConfirmed: true,
  },
  {
    id: "faq-12",
    category: "Support",
    question: "How do I contact the support team?",
    answer:
      "Our support and customer care desks are available via phone at +234 813 585 4054, WhatsApp (+234 813 585 4054), or by email at Info@petfeb.com (Monday through Friday 8:00 AM – 5:30 PM, Saturday 9:00 AM – 2:00 PM).",
    isConfirmed: true,
  },
];

export default function SupportPage() {
  return (
    <div className="bg-[#F8F9FA] pb-20 font-sans">
      {/* ── Section 1: Support Hero ── */}
      <section className="bg-white border-b border-gray-100 pt-10 sm:pt-16 pb-12 sm:pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-heading font-semibold text-xs tracking-wider uppercase">
              <HelpCircle className="w-4 h-4 text-[#7BB042]" />
              Pet-Feb Solar Knowledge &amp; Customer Support
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-tight">
              How Can We Help You?
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Find helpful information about our solar products, installations, warranties, delivery and customer support.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#faqs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7BB042] text-white font-heading font-bold text-sm hover:bg-[#6EA138] transition shadow-xs"
              >
                <span>Browse FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/track-order"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-heading font-semibold text-sm hover:bg-gray-50 transition shadow-2xs"
              >
                <Search className="w-4 h-4 text-[#7BB042]" />
                <span>Track Your Order</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Support Categories Grid ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042]">
              Support Categories
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 mt-1">
              Explore Topics &amp; Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SUPPORT_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-[22px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#7BB042] transition group"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-[#E8F3DA] text-[#3F6B1A] flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5 text-[#7BB042]" />
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950 group-hover:text-[#3F6B1A] transition leading-snug">
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    {cat.isAnchor ? (
                      <a
                        href={cat.href}
                        className="text-xs font-bold text-[#3F6B1A] flex items-center gap-1 hover:underline"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={cat.href}
                        className="text-xs font-bold text-[#3F6B1A] flex items-center gap-1 hover:underline"
                      >
                        <span>Go to Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Frequently Asked Questions ── */}
      <section id="faqs" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 scroll-mt-28">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042]">
              Knowledge Base
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-950">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Answers to the most common questions about our solar engineering, equipment warranties, and Buy Small financing.
            </p>
          </div>

          <SupportFaqAccordion faqs={SUGGESTED_FAQS} />
        </div>
      </section>

      {/* ── Section 4: Contact Support CTA ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-black text-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#7BB042] text-white flex items-center justify-center mx-auto shadow-md">
            <FileQuestion className="w-7 h-7" />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
              Still Need Help?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Our team is available to help you find the right information and support for your solar needs.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#7BB042] text-white font-heading font-bold text-sm hover:bg-[#6EA138] transition shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Our Team</span>
            </Link>

            <Link
              href="/track-order"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-heading font-semibold text-sm hover:bg-gray-100 transition shadow-2xs"
            >
              <Search className="w-4 h-4" />
              <span>Track Your Order</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
