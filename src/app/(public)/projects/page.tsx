import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectsCatalog } from "@/components/public/ProjectsCatalog";
import { getAllProjects } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Our Projects | Petfeb Solar Installations",
  description:
    "Explore Petfeb solar installation projects across Nigeria, from community electrification like Light Up Umueri to commercial and industrial solar arrays.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category } = await searchParams;

  return (
    <div className="py-12 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F6B1A]">
          Installation Archive & Community Impact
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight mt-2 mb-4">
          Our Solar Engineering Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          From residential rooftops to large-scale commercial installations and community initiatives like &ldquo;Light Up Umueri&rdquo;, Pet-Feb delivers solar solutions that illuminate lives and drive sustainable growth across Nigeria.
        </p>
      </div>

      {/* ── Interactive Projects Catalog with Working Category Pill Buttons ── */}
      <ProjectsCatalog projects={getAllProjects()} initialCategory={category} />

      {/* ── Training & Survey Callout ─────────────────────────── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#1F3A0B] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7BB042]">
            Certified Field Workmanship
          </span>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
            Have a Residential or Commercial Site Requirement?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
            Our certified engineering teams in Port Harcourt, Lagos, and Abuja conduct detailed on-site surveys and load analyses.
          </p>
        </div>
        <Link
          href="/installation"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shrink-0 shadow-sm"
        >
          Book Technical Assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
