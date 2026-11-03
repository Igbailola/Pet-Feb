import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { getProjectBySlug, getRelatedProjects, getAllProjects } from "@/lib/projects-data";
import { ProjectHeroSlider } from "@/components/public/ProjectHeroSlider";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Petfeb Solar",
    };
  }

  return {
    title: `${project.title} | Petfeb Solar Installations`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const rawRelated = getRelatedProjects(project.slug, 2);
  const related =
    rawRelated.length > 0
      ? rawRelated
      : getAllProjects()
          .filter((p) => p.slug !== project.slug)
          .slice(0, 2);

  return (
    <div className="py-8 sm:py-14 max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 space-y-10 sm:space-y-12">
      {/* ── Breadcrumb Navigation ─────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/projects" className="hover:text-gray-900 flex items-center gap-1 transition">
          <ChevronLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[220px] sm:max-w-lg">
          {project.title}
        </span>
      </nav>

      {/* ── Project Header ────────────────────────────────────── */}
      <header className="space-y-4 w-full">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight w-full">
          {project.title}
        </h1>
      </header>

      {/* ── Project Hero Banner with Slide Animation ──────────── */}
      <ProjectHeroSlider
        images={project.heroImages && project.heroImages.length > 0 ? project.heroImages : [project.imageUrl]}
        title={project.title}
      />

      {/* ── Main Project Content (Full-Width Sections) ────────── */}
      <div className="w-full space-y-10">
        <div className="w-full space-y-8">
          {project.sections && project.sections.length > 0 ? (
            <div className="w-full space-y-8">
              {project.sections.map((sec, idx) => (
                <section
                  key={idx}
                  className="w-full space-y-4"
                >
                  {sec.heading && (
                    <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-[26px] text-gray-950 w-full">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.paragraphs.length > 0 && (
                    <div className="w-full space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="w-full">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="w-full space-y-3 pt-1 text-base sm:text-lg text-gray-700">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 w-full">
                          <CheckCircle2 className="w-5 h-5 text-[#7BB042] shrink-0 mt-1" />
                          <span className="flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.closingParagraphs && sec.closingParagraphs.length > 0 && (
                    <div className="w-full space-y-4 pt-1 text-base sm:text-lg text-gray-700 leading-relaxed">
                      {sec.closingParagraphs.map((cp, cpIdx) => (
                        <p key={cpIdx} className="w-full">
                          {cp}
                        </p>
                      ))}
                    </div>
                  )}
                  {sec.images && sec.images.length > 0 && (
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        sec.imageCols === 2 ? "" : "lg:grid-cols-3"
                      } gap-5 pt-4`}
                    >
                      {sec.images.map((imgUrl, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-xs image-zoom"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgUrl}
                            alt={`${project.title} — photo ${imgIdx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="w-full space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p className="w-full">{project.summary}</p>
            </div>
          )}
        </div>

        {/* Project Field Photo Gallery */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="w-full space-y-5 pt-6 border-t border-gray-200">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-950">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.galleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-xs image-zoom"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`${project.title} — photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Related Case Studies (Black Background Section) ─────────── */}
      {related.length > 0 && (
        <section className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8 shadow-md w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  More Projects
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-300 w-full">
                Explore more of our latest projects and see how we’re building a cleaner, brighter future across Nigeria.
              </p>
            </div>
            <Link
              href="/projects"
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold text-white transition inline-flex items-center gap-1.5 shrink-0"
            >
              <span>All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((item) => (
              <article
                key={item.id}
                className="bg-white text-gray-900 rounded-[20px] border border-[#D9D9D9] p-4 shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#7BB042] transition-all duration-300 hover-lift"
              >
                <Link
                  href={`/projects/${item.slug}`}
                  className="h-56 bg-gray-900 rounded-[14px] relative overflow-hidden block image-zoom"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="pt-4 px-1 pb-1 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-950 leading-snug">
                      <Link href={`/projects/${item.slug}`} className="hover:text-[#3F6B1A] transition">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                    <Link
                      href={`/projects/${item.slug}`}
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Bottom Call To Action (Yellow Background Section) ────────── */}
      <section className="bg-[#F5B82E] text-black rounded-[32px] p-8 sm:p-12 lg:p-14 text-center space-y-6 shadow-md w-full">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight w-full">
          Ready to Power Your Home, Business, or Community with Clean Solar Energy?
        </h2>

        <p className="text-base sm:text-lg text-black/85 w-full leading-relaxed font-normal">
          From residential rooftops to large-scale commercial installations, Pet-Feb delivers dependable solar solutions tailored to your energy needs across Nigeria.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/installation"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[12px] text-sm sm:text-base font-heading font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Request Installation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[12px] text-sm sm:text-base font-heading font-bold bg-black text-white hover:bg-gray-900 transition shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
