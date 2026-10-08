"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export interface ProjectItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  location: string;
  capacity: string;
  panels: string;
  summary: string;
  highlights?: string[];
  imageUrl?: string;
}

interface ProjectsCatalogProps {
  projects: ProjectItem[];
  initialCategory?: string;
}

export function ProjectsCatalog({
  projects,
  initialCategory,
}: ProjectsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );

  // Extract unique categories
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? projects.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : projects;

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
    <div className="space-y-8">
      {/* ── Category Pill Buttons ──────────────────────────────── */}
      <div
        role="toolbar"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2.5 border-b border-gray-200 pb-5"
      >
        <button
          type="button"
          onClick={() => handleSelectCategory(null)}
          className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
            selectedCategory === null
              ? "bg-[#7BB042] text-white shadow-sm ring-1 ring-[#7BB042]"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          }`}
          aria-pressed={selectedCategory === null}
        >
          All Projects ({projects.length})
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
              className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] ${
                isSelected
                  ? "bg-[#7BB042] text-white shadow-sm ring-1 ring-[#7BB042]"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`}
              aria-pressed={isSelected}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Projects Grid ─────────────────────────────────────── */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
          <Zap className="w-10 h-10 text-gray-300 mx-auto" />
          <h2 className="font-heading font-bold text-lg text-gray-900">
            No Projects Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            No projects found in this category.
          </p>
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className="mt-2 text-xs font-semibold text-[#3F6B1A] hover:underline"
          >
            Reset category filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-colors"
            >
              {/* Project Header Banner */}
              <div className="h-48 bg-gradient-to-br from-emerald-950 to-[#1F3A0B] p-6 flex flex-col justify-between text-white relative overflow-hidden">
                {item.imageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Gradient overlay to guarantee contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20">
                    {item.category}
                  </span>
                  <Zap className="w-5 h-5 text-[#F5B82E] drop-shadow-sm" />
                </div>
                <div className="relative z-10">
                  <span className="text-[11px] text-emerald-200 block font-medium">
                    Capacity Footprint
                  </span>
                  <span className="font-heading font-bold text-base sm:text-lg text-white line-clamp-1 drop-shadow-sm">
                    {item.capacity}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
                    <span>{item.location}</span>
                  </div>

                  <h2 className="font-heading font-bold text-lg text-gray-900 leading-snug">
                    <Link
                      href={`/projects/${item.slug || item.id}`}
                      className="hover:text-[#3F6B1A] transition"
                    >
                      {item.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.highlights && (
                    <ul className="pt-2 space-y-1 text-xs text-gray-600">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7BB042] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Technical Footprint & Case Study Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="truncate max-w-[150px] text-gray-500">{item.panels}</span>
                  <Link
                    href={`/projects/${item.slug || item.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#3F6B1A] hover:text-[#2d4e13] transition shrink-0"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
