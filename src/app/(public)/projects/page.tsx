import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { ProjectsCatalog } from "@/components/public/ProjectsCatalog";
import { getAllProjects } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Our Solar Projects | Petfeb Engineering & Community Impact",
  description:
    "Explore Petfeb solar installation projects across Nigeria, from community electrification like Light Up Umueri to commercial and industrial solar arrays.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string; region?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category, region } = await searchParams;
  const projects = getAllProjects();

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* ── 1. Page Header Band (Green-50 with breadcrumb, pill, and stats) ── */}
      <section className="bg-[#F4F9EC] border-b border-[#D9D9D9] pt-8 sm:pt-12 pb-10 sm:pb-14 relative overflow-hidden">
        {/* Subtle sun-arc motif in top-right */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none opacity-20 border-[24px] border-[#7BB042]"
          aria-hidden="true"
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10 space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-gray-900 transition">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-semibold">Projects</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#D9D9D9] text-[#3F6B1A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>Engineering Grid Audited & Verified</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
                Our Solar Projects
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
                Explore how Petfeb is delivering clean, reliable energy across homes, businesses, and communities in Nigeria.
              </p>
            </div>

            <div className="text-xs text-gray-500 lg:text-right">
              <span className="inline-block px-3 py-1.5 rounded-md bg-white border border-[#D9D9D9] font-medium text-gray-600">
                Certified by NEMSA & SON Standards (demo placeholder)
              </span>
            </div>
          </div>

          {/* Stat Strip Box */}
          <div className="mt-8 bg-white rounded-2xl border border-[#D9D9D9] p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 shadow-sm">
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900">
                4.8 <span className="text-xl sm:text-2xl text-[#3F6B1A]">MWp</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Total Installed Capacity</p>
              <p className="text-[11px] text-gray-400">(demo placeholders, pending Petfeb approval)</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900">
                180<span className="text-xl sm:text-2xl text-[#3F6B1A]">+</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Commissioned Sites</p>
              <p className="text-[11px] text-gray-400">(demo placeholders, pending Petfeb approval)</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900">
                36
              </div>
              <p className="text-xs font-medium text-gray-900">Nigerian States Reached</p>
              <p className="text-[11px] text-gray-400">(demo placeholders, pending Petfeb approval)</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900">
                99.4<span className="text-xl sm:text-2xl text-[#3F6B1A]">%</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Uptime Recorded</p>
              <p className="text-[11px] text-gray-400">(demo placeholders, pending Petfeb approval)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive Projects Catalog with Filter Toolbar & Cards ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <ProjectsCatalog projects={projects} initialCategory={category} initialRegion={region} />
      </section>

      {/* ── 3. Bottom CTA Band (Deep Green #1F3A0B per stitch frame) ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-[#1F3A0B] text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl space-y-8">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-200 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Zero Risk Clean Energy Migration</span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Want to power your community, business, or facility?
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              Our certified engineers assess your load profile, design custom turnkey solar architecture, and structure flexible Buy Small installment financing tailored to your cashflow.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                <span>Tier-1 Components</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                <span>25-Year Panel Warranty (demo placeholder)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7BB042]" />
                <span>Full Installation Escrow</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-emerald-900/80">
            <Link
              href="/installation"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm min-h-[48px]"
            >
              Request Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition border border-white/20"
            >
              Contact Engineering Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
