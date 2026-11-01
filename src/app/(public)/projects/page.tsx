import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Zap, CheckCircle2 } from "lucide-react";
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

  // Featured flagship project + "Top Projects" sidebar (same pattern as Blog)
  const featuredProject =
    projects.find((p) => p.slug === "light-up-umueri") || projects[0];
  const topProjects = projects.filter((p) => p.id !== featuredProject?.id).slice(0, 2);

  return (
    <div className="bg-white pb-16 overflow-x-clip">
      {/* ── Top Header Band ───────────────────────────────────────────── */}
      <section
        data-reveal
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-8 sm:pt-12 pb-6"
      >
        <div className="flex items-center gap-4 pb-6">
          <span
            className="w-[28px] h-[28px] rounded-full bg-[#F5B82E] shrink-0"
            aria-hidden="true"
          />
          <h1 className="font-heading font-bold text-[32px] sm:text-[44px] lg:text-[54px] text-gray-950 uppercase tracking-tight leading-tight">
            WELCOME TO PETFEB <br />
            <span className="text-[#3F6B1A]">PROJECTS.</span>
          </h1>
        </div>
      </section>

      {/* ── Featured Project & Top Projects Layout ───────────────────── */}
      {featuredProject && (
        <section
          data-reveal
          className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pb-12 sm:pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Featured Project */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Commissioned: {featuredProject.commissionedYear}
              </span>

              <Link
                href={`/projects/${featuredProject.slug}`}
                className="relative block w-full rounded-[24px] overflow-hidden shadow-md bg-gray-900 group image-zoom"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredProject.imageUrl || "/api/websitepic/community"}
                  alt={featuredProject.title}
                  className="w-full h-auto max-h-[560px] object-cover"
                />
              </Link>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal pt-2">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 leading-snug">
                  {featuredProject.title}
                </h2>
                <p>{featuredProject.summary}</p>
                <p>{featuredProject.impact}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between py-4 border-y border-gray-200 gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                    PF
                  </div>
                  <span className="font-bold text-gray-900">Pet-Feb Engineering</span>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#7BB042]" />
                    <span className="font-semibold">{featuredProject.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#7BB042]" />
                    <span className="font-semibold">{featuredProject.capacity}</span>
                  </span>
                </div>
              </div>

              {featuredProject.highlights?.length > 0 && (
                <ul className="space-y-2 text-sm text-gray-700">
                  {featuredProject.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/projects/${featuredProject.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-xl text-sm font-bold bg-[#7BB042] text-white hover:bg-[#6A9E36] transition shadow-xs w-fit"
              >
                Read Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Column: Top Projects & Yellow Consultation Box */}
            <div className="lg:col-span-4 space-y-8">
              {topProjects.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-xl text-gray-950">Top Projects</h3>
                  <div className="space-y-4">
                    {topProjects.map((item) => (
                      <Link
                        key={item.id}
                        href={`/projects/${item.slug}`}
                        className="flex gap-4 items-start p-3 rounded-2xl border border-gray-100 bg-[#F8F9FA] hover:border-[#7BB042] transition group"
                      >
                        <div className="space-y-1.5 flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A]">
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#3F6B1A] transition leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 line-clamp-2">{item.summary}</p>
                        </div>
                        <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl || "/api/websitepic/commercial"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-[24px] bg-[#F5B82E] text-gray-950 p-6 sm:p-7 space-y-4 shadow-md">
                <h3 className="font-heading font-bold text-lg text-black leading-snug">
                  Want to power your community, business, or facility?
                </h3>
                <Link
                  href="/installation"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-bold hover:bg-gray-800 transition"
                >
                  Request Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Our Recent Projects (Black Container) + Training CTA ──────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
        <div data-reveal>
          <ProjectsCatalog projects={projects} initialCategory={category} initialRegion={region} />
        </div>

        <div data-reveal className="pt-4">
          <div className="rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[426px]">
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[426px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/mission-img-2.png"
                alt="Petfeb hands-on solar training lab"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7BB042]" />
                Lekki Phase 1, 2024
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#F5B82E] p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" />
                  <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-black tracking-tight">
                    Join Our Next Training Today
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-black/90 leading-relaxed font-normal max-w-xl">
                  Petfeb Solar Training is designed to equip individuals with hands-on knowledge in
                  solar installation, maintenance, and system design. Whether you&apos;re starting
                  out or upgrading your skills, our training prepares you to work confidently in the
                  fast-growing solar industry.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/training"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-[12px] text-base sm:text-lg font-bold font-heading bg-black text-white hover:bg-gray-900 transition shadow-sm"
                >
                  Join Training
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
