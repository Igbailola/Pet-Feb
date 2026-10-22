import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, FolderKanban, BookOpen, Layers } from "lucide-react";
import { getAllProjects } from "@/lib/projects-data";
import { getPublishedBlogPosts } from "@/lib/public-data";
import { ProjectsCatalog } from "@/components/public/ProjectsCatalog";
import { BlogCatalog } from "@/components/public/BlogCatalog";

export const metadata: Metadata = {
  title: "Projects & Engineering Journal | Petfeb Solar Systems",
  description:
    "Explore Petfeb solar installation case studies across Nigeria alongside our engineering field notes, maintenance guides, and solar electrification updates.",
};

interface ProjectBlogPageProps {
  searchParams: Promise<{ view?: string; category?: string; region?: string }>;
}

export default async function ProjectBlogHubPage({ searchParams }: ProjectBlogPageProps) {
  const { view = "all", category, region } = await searchParams;
  const projects = getAllProjects();
  const blogPosts = await getPublishedBlogPosts();

  const activeView = view === "projects" || view === "blog" ? view : "all";

  return (
    <div className="space-y-0">
      {/* ── Page Header Band ─────────────────────────────────────── */}
      <section className="bg-[#F4F9EC] border-b border-[#D2E8B5] pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5C5C5C]">
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Project-Blog Hub</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#D2E8B5] text-[#3F6B1A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7BB042]" />
              <span>Commissioned Deployments & Field Telemetry</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight">
              Projects & Solar Field Journal
            </h1>
            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed max-w-2xl">
              Inspect real-world turnkey solar installations delivered across Nigerian communities and facilities, alongside engineering field notes and technical advisory from Petfeb specialists.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Link
              href="/project-blog?view=all"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition min-h-[40px] ${
                activeView === "all"
                  ? "bg-[#7BB042] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Hub Content</span>
            </Link>

            <Link
              href="/project-blog?view=projects"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition min-h-[40px] ${
                activeView === "projects"
                  ? "bg-[#7BB042] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50"
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Featured Projects ({projects.length})</span>
            </Link>

            <Link
              href="/project-blog?view=blog"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition min-h-[40px] ${
                activeView === "blog"
                  ? "bg-[#7BB042] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-[#D9D9D9] hover:bg-gray-50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Solar Journal & Articles ({blogPosts.length})</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Content Sections ───────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14 space-y-16">
        {/* Projects Stream */}
        {(activeView === "all" || activeView === "projects") && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Engineering Portfolio
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
                  Featured Solar Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#3F6B1A] hover:underline"
              >
                <span>View standalone projects directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProjectsCatalog
              projects={projects}
              initialCategory={category}
              initialRegion={region}
            />
          </section>
        )}

        {/* Blog Stream */}
        {(activeView === "all" || activeView === "blog") && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6B1A]">
                  Field Insights & Case Studies
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950">
                  Solar Journal & Field Notes
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#3F6B1A] hover:underline"
              >
                <span>Browse full journal archive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <BlogCatalog posts={blogPosts} initialCategory={category} />
          </section>
        )}

        {/* ── Bottom Installation Action Band ─────────────────────── */}
        <section className="bg-[#1F3A0B] text-white rounded-2xl p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5B82E]">
              Turnkey Energy Transition
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Have a residential or commercial facility to power?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Petfeb engineers audit your peak electrical demand and install certified tier-1 solar kits backed by manufacturer warranties and Buy Small financing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              href="/installation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition shadow-xs min-h-[48px]"
            >
              <span>Request Installers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition border border-white/20 min-h-[48px]"
            >
              <span>Explore Solar Hardware</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
