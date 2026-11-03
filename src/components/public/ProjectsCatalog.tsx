"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Filter } from "lucide-react";
import type { ProjectDetail } from "@/lib/projects-data";

interface ProjectsCatalogProps {
  projects: ProjectDetail[];
  initialCategory?: string;
  initialRegion?: string;
}

/**
 * "Our Recent Projects" black container — mirrors the Blog page's
 * "Our Recent Blog Post" block (heading, filters, 3-up white card grid).
 */
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

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const regions = [
    "All States",
    "Abuja",
    "Anambra",
    "Delta State",
    "Rivers State",
    "Edo State",
    "Lagos",
    "Ogun State",
    "China",
  ];

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

  const pillClass = (active: boolean) =>
    `px-4 py-2 min-h-[40px] rounded-full text-xs font-bold transition cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:ring-offset-2 focus:ring-offset-black ${
      active
        ? "bg-[#7BB042] text-white"
        : "bg-white text-gray-800 border border-[#D9D9D9] hover:bg-gray-100"
    }`;

  return (
    <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Our Recent Projects
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl font-normal">
          From residential rooftops to large-scale commercial installations, Pet-Feb has delivered
          solar solutions that light up communities and drive sustainable growth. Explore some of
          our latest projects and see how we’re building a cleaner, brighter future across Nigeria.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="toolbar"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className={pillClass(selectedCategory === null)}
            aria-pressed={selectedCategory === null}
          >
            All Projects ({projects.length})
          </button>

          {categories.map((cat) => {
            const count = projects.filter(
              (p) => p.category.toLowerCase() === cat.toLowerCase()
            ).length;
            const isSelected = selectedCategory?.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(isSelected ? null : cat)}
                className={pillClass(isSelected)}
                aria-pressed={isSelected}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative self-start sm:self-auto">
          <label htmlFor="region-select" className="sr-only">
            Filter by Region
          </label>
          <select
            id="region-select"
            value={selectedRegion || "All States"}
            onChange={(e) =>
              setSelectedRegion(e.target.value === "All States" ? null : e.target.value)
            }
            className="appearance-none bg-white border border-[#D9D9D9] rounded-xl px-4 py-2.5 pr-9 text-xs font-medium text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7BB042] cursor-pointer"
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

      {filteredProjects.length === 0 ? (
        <div className="bg-white text-gray-900 p-12 rounded-[24px] text-center space-y-3">
          <Zap className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="font-heading font-bold text-lg">No Installations Found</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            No projects match the selected category and region filters.
          </p>
          <button
            type="button"
            onClick={() => {
              handleSelectCategory(null);
              setSelectedRegion(null);
            }}
            className="mt-2 text-xs font-bold text-[#3F6B1A] hover:underline cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white text-gray-900 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover-lift group"
            >
              <div className="space-y-3">
                <div className="h-52 w-full overflow-hidden rounded-[16px] bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl || "/api/websitepic/commercial"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950 group-hover:text-[#3F6B1A] transition leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/projects/${item.slug || item.id}`}
                  className="w-fit px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition inline-flex items-center gap-1.5"
                >
                  <span>View Project</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
