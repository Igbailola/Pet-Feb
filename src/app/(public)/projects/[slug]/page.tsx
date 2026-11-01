import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Zap,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
} from "lucide-react";
import { getProjectBySlug, getRelatedProjects, getAllProjects } from "@/lib/projects-data";
import { ProjectAddToCartButton } from "@/components/public/ProjectAddToCartButton";

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
    <div className="py-8 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
      {/* ── Breadcrumb Navigation ─────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/projects" className="hover:text-gray-900 flex items-center gap-1 transition">
          <ChevronLeft className="w-4 h-4" />
          Back to Projects Archive
        </Link>
        <span>/</span>
        <span className="text-gray-400">{project.category}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">
          {project.title}
        </span>
      </nav>

      {/* ── Project Header ────────────────────────────────────── */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#3F6B1A] border border-emerald-200">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
            {project.location}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-[#7BB042]" />
            Commissioned {project.commissionedYear}
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-950 tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1">
          {project.summary}
        </p>
      </header>

      {/* ── High-Impact Visual Showcase ───────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-900 h-80 sm:h-[460px] lg:h-[520px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Floating Spec Bar on Image */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B82E] block">
              Installed System Footprint
            </span>
            <p className="font-heading font-extrabold text-xl sm:text-2xl text-white drop-shadow-md">
              {project.capacity}
            </p>
            <p className="text-xs sm:text-sm text-emerald-200 drop-shadow-sm">
              {project.panels}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-100 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#7BB042]" />
            <span>Verified Field Performance</span>
          </div>
        </div>
      </div>

      {/* ── Executive Footprint Strip ─────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm text-xs sm:text-sm">
        <div className="space-y-1">
          <span className="text-gray-400 block uppercase tracking-wider text-[11px] font-semibold">
            Client Sector
          </span>
          <span className="font-heading font-bold text-gray-900 block truncate">
            {project.clientType}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 block uppercase tracking-wider text-[11px] font-semibold">
            Project Location
          </span>
          <span className="font-heading font-bold text-gray-900 block truncate">
            {project.location}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 block uppercase tracking-wider text-[11px] font-semibold">
            Inverter Topology
          </span>
          <span className="font-heading font-bold text-gray-900 block truncate">
            {project.specs.inverter.split(" ")[0]} {project.specs.inverter.split(" ")[1] || "Hybrid"}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-gray-400 block uppercase tracking-wider text-[11px] font-semibold">
            Operating Status
          </span>
          <span className="font-heading font-bold text-[#3F6B1A] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7BB042] animate-pulse" />
            Active & Commissioned
          </span>
        </div>
      </div>

      {/* ── Main Narrative: Challenge, Solution, Impact ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7 space-y-10">
          {/* Challenge Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#3F6B1A]">
              <Clock className="w-5 h-5 text-[#7BB042]" />
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-900">
                The Operational Challenge
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {project.challenge}
            </p>
          </section>

          {/* Engineering Solution Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#3F6B1A]">
              <Cpu className="w-5 h-5 text-[#7BB042]" />
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-900">
                Pet-Feb Engineering Solution
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {project.solution}
            </p>
          </section>

          {/* Measurable Real-World Impact */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#3F6B1A]">
              <Zap className="w-5 h-5 text-[#7BB042]" />
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-900">
                Measurable Impact & Outcomes
              </h2>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-sm text-gray-800 leading-relaxed">
              {project.impact}
            </div>
          </section>

          {/* Key Deliverables & Highlights */}
          <section className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-gray-900">
              Key Engineering Deliverables
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7BB042] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Detailed Technical Specification Matrix */}
        <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-heading font-bold text-lg text-gray-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#7BB042]" />
                Technical Specifications
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                Verified
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Inverter Rating & Topology</span>
                <span className="font-semibold text-gray-900 block">{project.specs.inverter}</span>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-100">
                <span className="text-gray-400 block font-medium">Battery Energy Storage</span>
                <span className="font-semibold text-gray-900 block">{project.specs.battery}</span>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-100">
                <span className="text-gray-400 block font-medium">Photovoltaic Array (PV)</span>
                <span className="font-semibold text-gray-900 block">{project.specs.pvArray}</span>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-100">
                <span className="text-gray-400 block font-medium">Transfer Switching Time</span>
                <span className="font-semibold text-gray-900 block">{project.specs.transferTime}</span>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-100">
                <span className="text-gray-400 block font-medium">System Topology</span>
                <span className="font-semibold text-gray-900 block">{project.specs.systemType}</span>
              </div>

              <div className="space-y-1 pt-3 border-t border-gray-100">
                <span className="text-gray-400 block font-medium">Monitoring & Telemetry</span>
                <span className="font-semibold text-gray-900 block">{project.specs.monitoring}</span>
              </div>
            </div>

            {/* Quick Action in Sidebar */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              <Link
                href="/installation"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm text-center"
              >
                Request Similar System Site Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/2348135854054"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition text-center"
              >
                Inquire on WhatsApp (+234 813-585-4054)
              </a>

              {/* Working Add to Cart & Buy Small for this Project Package */}
              <ProjectAddToCartButton project={project} />
            </div>
          </div>
        </aside>
      </div>

      {/* ── Related Case Studies (Black Background Section) ─────────── */}
      {related.length > 0 && (
        <section className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7BB042] block">
                Case Study Archives
              </span>
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  More Featured Installations
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
                Explore additional verified Petfeb solar deployments engineered for round-the-clock power security across Nigeria.
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
                  className="h-52 bg-gray-900 rounded-[14px] relative overflow-hidden block image-zoom"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm border border-white/20">
                    {item.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-[#F5B82E]">{item.capacity}</span>
                    <span className="text-[11px] text-gray-200">{item.commissionedYear}</span>
                  </div>
                </Link>

                <div className="pt-4 px-1 pb-1 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#7BB042]" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-gray-950 leading-snug">
                      <Link href={`/projects/${item.slug}`} className="hover:text-[#3F6B1A] transition">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
                    <span className="text-gray-500 font-medium truncate">{item.panels}</span>
                    <Link
                      href={`/projects/${item.slug}`}
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Read Case Study</span>
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
      <section className="bg-[#F5B82E] text-black rounded-[32px] p-8 sm:p-12 lg:p-14 text-center space-y-6 shadow-md">
        <div className="inline-flex items-center justify-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" aria-hidden="true" />
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-black/80">
            Turnkey Solar Engineering
          </span>
        </div>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight max-w-2xl mx-auto">
          Ready to Engineer Clean Power for Your Facility?
        </h2>

        <p className="text-sm sm:text-base text-black/85 max-w-xl mx-auto leading-relaxed font-normal">
          Our engineering team conducts precision load audits and designs turnkey hybrid solar solutions across Nigeria.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/installation"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[12px] text-sm sm:text-base font-heading font-bold bg-[#7BB042] text-white hover:bg-[#6aa035] transition shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Schedule On-Site Survey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[12px] text-sm sm:text-base font-heading font-bold bg-black text-white hover:bg-gray-900 transition shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Speak With an Engineer</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
