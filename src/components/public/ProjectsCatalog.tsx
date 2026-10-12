"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";
import type { ProjectDetail } from "@/lib/projects-data";

interface ProjectsCatalogProps {
  projects: ProjectDetail[];
  initialCategory?: string;
  initialRegion?: string;
}

export function ProjectsCatalog({
  projects,
  initialCategory,
  initialRegion,
}: ProjectsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    initialRegion || null
  );

  // Extract unique categories & regions
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const regions = [
    "All States",
    "Lagos",
    "Abuja",
    "Rivers State",
    "Anambra",
    "Oyo State",
  ];

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory
      ? p.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesRegion =
      selectedRegion && selectedRegion !== "All States"
        ? p.location.toLowerCase().includes(selectedRegion.toLowerCase())
        : true;
    return matchesCat && matchesRegion;
  });

  // Featured flagship project (first community/flagship project)
  const featuredProject =
    projects.find((p) => p.slug === "light-up-umueri") || projects[0];

  const handleSelectCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat) {
        url.searchParams.set("category", cat);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="space-y-10">
      {/* ── 1. Filter Toolbar (Pills matching stitch design frame) ─────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9D9D9]">
        <div
          role="toolbar"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-black whitespace-nowrap ${
              selectedCategory === null
                ? "bg-[#7BB042] text-white font-bold shadow-sm"
                : "bg-white text-[#333333] border border-[#D9D9D9] hover:bg-gray-50"
            }`}
            aria-pressed={selectedCategory === null}
          >
            <span>All Projects</span>
            <span className="text-[11px] opacity-75">({projects.length})</span>
          </button>

          {categories.map((cat) => {
            const count = projects.filter(
              (p) => p.category.toLowerCase() === cat.toLowerCase()
            ).length;
            const isSelected =
              selectedCategory?.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(isSelected ? null : cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-black whitespace-nowrap ${
                  isSelected
                    ? "bg-[#7BB042] text-white font-bold shadow-sm"
                    : "bg-white text-[#333333] border border-[#D9D9D9] hover:bg-gray-50"
                }`}
                aria-pressed={isSelected}
              >
                <span>{cat}</span>
                <span className="text-[11px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Region filter dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="region-select" className="sr-only">
            Filter by Region
          </label>
          <div className="relative">
            <select
              id="region-select"
              value={selectedRegion || "All States"}
              onChange={(e) =>
                setSelectedRegion(
                  e.target.value === "All States" ? null : e.target.value
                )
              }
              className="appearance-none bg-white border border-[#D9D9D9] rounded-lg px-3.5 py-2 pr-9 text-xs font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  Region: {reg}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── 2. Featured Flagship Project Card (Stitch Frame layout) ────── */}
      {selectedCategory === null && selectedRegion === null && featuredProject && (
        <div className="bg-white rounded-3xl border border-[#D9D9D9] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          {/* Photo Side */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-gray-900 overflow-hidden flex flex-col justify-between p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredProject.imageUrl || "/api/websitepic/community"}
              alt={featuredProject.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            {/* Top Chips */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>{featuredProject.location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-emerald-300 backdrop-blur-md border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042]" />
                <span>NEMSA Verified Standards (demo placeholder)</span>
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10">
              <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#F5B82E] text-black mb-1.5">
                Flagship Municipal Modernization
              </span>
              <p className="text-xs text-white/90 font-medium max-w-lg">
                Decentralized rural clean power ensuring autonomous cold-chain vaccine preservation, public lighting, and zero generator reliance.
              </p>
            </div>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full font-semibold bg-emerald-50 text-[#3F6B1A] border border-emerald-200">
                  {featuredProject.category}
                </span>
                <span className="text-gray-400 font-mono">Project Ref: #PF-RV-24</span>
              </div>

              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-900 leading-snug">
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="hover:text-[#3F6B1A] transition"
                >
                  {featuredProject.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {featuredProject.summary}
              </p>

              {/* 4 Mini Stat Grid per stitch frame */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9]">
                  <span className="font-heading font-extrabold text-lg text-gray-900 block">
                    500+
                  </span>
                  <span className="text-[11px] text-gray-600">Poles & Centers</span>
                  <span className="text-[10px] text-gray-400 block">(demo placeholder)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9]">
                  <span className="font-heading font-extrabold text-lg text-gray-900 block">
                    24/7
                  </span>
                  <span className="text-[11px] text-gray-600">Clean Illumination</span>
                  <span className="text-[10px] text-gray-400 block">(demo placeholder)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9]">
                  <span className="font-heading font-extrabold text-lg text-gray-900 block">
                    Zero
                  </span>
                  <span className="text-[11px] text-gray-600">Grid Dependency</span>
                  <span className="text-[10px] text-gray-400 block">(demo placeholder)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9]">
                  <span className="font-heading font-extrabold text-lg text-gray-900 block">
                    38 T
                  </span>
                  <span className="text-[11px] text-gray-600">CO2 Offset / yr</span>
                  <span className="text-[10px] text-gray-400 block">(demo placeholder)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href={`/projects/${featuredProject.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm min-h-[46px]"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Verified Installations Archive ──────────────────────────── */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-900">
              Verified Installations Archive
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Engineered for high ambient heat, surge tolerance, and round-the-clock power security.
            </p>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
            <span>NEMSA Certified Telemetry (demo placeholder)</span>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-[#D9D9D9] text-center space-y-3">
            <Zap className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-gray-900">
              No Installations Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              No projects match the selected category and region filters.
            </p>
            <button
              type="button"
              onClick={() => {
                handleSelectCategory(null);
                setSelectedRegion(null);
              }}
              className="mt-2 text-xs font-semibold text-[#3F6B1A] hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[#D9D9D9] shadow-sm overflow-hidden flex flex-col justify-between hover:border-black transition-colors"
              >
                {/* Photo Header */}
                <div className="h-52 bg-gray-900 relative overflow-hidden flex flex-col justify-between p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl || "/api/websitepic/commercial"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm border border-white/20">
                      <MapPin className="w-3 h-3 text-[#7BB042]" />
                      <span>{item.location}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-gray-900">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Capacity Spec Pill */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#E8F3DA] text-[#3F6B1A] border border-[#7BB042]/30">
                      <Zap className="w-3.5 h-3.5 text-[#3F6B1A]" />
                      <span className="font-semibold">{item.capacity}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 leading-snug">
                      <Link
                        href={`/projects/${item.slug || item.id}`}
                        className="hover:text-[#3F6B1A] transition"
                      >
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="pt-2 space-y-1.5 text-xs text-gray-600">
                        {item.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={`/projects/${item.slug || item.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold border border-[#D9D9D9] text-[#333333] hover:border-black hover:bg-gray-50 transition"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── 4. Pagination matching stitch frame ────────────────────── */}
        <div className="pt-8 border-t border-[#D9D9D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-600">
          <span>
            Showing <strong className="text-gray-900">{filteredProjects.length}</strong> completed energy installations across Nigeria
          </span>

          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-md border border-[#D9D9D9] text-gray-400 cursor-not-allowed text-xs font-medium"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 rounded-md bg-[#7BB042] text-white font-bold text-xs">
              1
            </span>
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-md border border-[#D9D9D9] text-gray-400 cursor-not-allowed text-xs font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
