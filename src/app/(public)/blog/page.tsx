import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Search,
} from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Blog & Field Notes | Petfeb Solar",
  description:
    "Discover how Pet-Feb is powering communities, expanding across Nigeria, and equipping the next generation of renewable energy engineers.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="bg-white pb-16 overflow-x-clip">
      {/* ── Top Header Band matching Original Shop Page-1.jpg ────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-8 sm:pt-12 pb-6">
        <div className="flex items-center gap-4 pb-6">
          <span
            className="w-[28px] h-[28px] rounded-full bg-[#F5B82E] shrink-0"
            aria-hidden="true"
          />
          <h1 className="font-heading font-bold text-[32px] sm:text-[44px] lg:text-[54px] text-gray-950 uppercase tracking-tight leading-tight">
            WELCOME TO PETFEB <br />
            <span className="text-[#3F6B1A]">BLOG POST.</span>
          </h1>
        </div>
      </section>

      {/* ── Featured Post & Top Stories Layout ────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Featured Article */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Posted: 27/09/2025
            </span>

            {/* Featured Image with Overlay Title */}
            <div className="relative w-full h-[320px] sm:h-[460px] rounded-[24px] overflow-hidden shadow-md bg-gray-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/about-hero-clean.jpg"
                alt="Pet-Feb Team celebrating Port Harcourt Launch"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#7BB042] text-white">
                  Renewable Energy
                </span>
                <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
                  Feb Expands to Port Harcourt Bringing Solar Innovation Closer to Southern Nigeria
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-xl font-normal">
                  Discover how Pet-Feb is training Nigeria&apos;s next generation of solar engineers through hands-on workshops and international knowledge exchange.
                </p>
              </div>
            </div>

            {/* Article Content Paragraphs matching design */}
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal pt-2">
              <p>
                In August 2025, Pet-Feb International Company Limited marked a new milestone with the opening of our regional office in Port Harcourt, Rivers State — a major step toward expanding clean energy access in Southern Nigeria.
              </p>
              <p>
                The launch ceremony brought together team members, partners, and stakeholders who celebrated this exciting new chapter. The Port Harcourt office is not just a workspace — it&apos;s a hub for innovation, training, and customer engagement, designed to support Pet-Feb&apos;s growing network of renewable energy clients.
              </p>
              <p>
                This expansion reflects our dedication to being closer to the people we serve. With the region&apos;s increasing demand for clean, reliable energy, the new office enables faster response times for installations, maintenance, and technical support.
              </p>
              <p>
                Pet-Feb&apos;s Port Harcourt hub will also host training programs, product showcases, and community initiatives, ensuring that residents and businesses alike can experience the full potential of solar energy. By expanding our reach, we&apos;re taking another bold step toward our vision of a sustainable Nigeria powered by renewable energy.
              </p>
            </div>

            {/* Author & Interactions Row matching Figma */}
            <div className="flex flex-wrap items-center justify-between py-4 border-y border-gray-200 gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                  PF
                </div>
                <span className="font-bold text-gray-900">Pet-Feb Admin</span>
              </div>

              <div className="flex items-center gap-5 text-gray-600">
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#7BB042]">
                  <ThumbsUp className="w-4 h-4 text-[#7BB042]" />
                  <span className="font-semibold">128</span>
                </span>
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
                  <ThumbsDown className="w-4 h-4" />
                  <span>0</span>
                </span>
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
                  <MessageSquare className="w-4 h-4" />
                  <span>80</span>
                </span>
                <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
                  <Share2 className="w-4 h-4" />
                  <span>12</span>
                </span>
              </div>
            </div>

            {/* 45 Comments Section */}
            <div className="space-y-4 pt-2">
              <h3 className="font-heading font-bold text-lg text-gray-950">
                45 Comments
              </h3>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#E8F3DA] text-[#3F6B1A] font-bold text-xs flex items-center justify-center">
                    MJ
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    Lorem ipsum dolor sit amet consectet
                  </span>
                </div>
                <p className="text-xs text-gray-600 pl-9">
                  Lorem ipsum dolor sit amet consectet Loolor sit amet consectetet 👍
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 pl-9 pt-1">
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-[#7BB042]" /> 12</span>
                  <span className="flex items-center gap-1"><ThumbsDown className="w-3 h-3" /> 0</span>
                </div>
              </div>

              {/* Leave Comment input */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-gray-700">Leave Comment:</label>
                <textarea
                  rows={3}
                  placeholder="Share your thoughts on this story..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BB042] focus:bg-white transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Top Stories & Yellow Newsletter Box */}
          <div className="lg:col-span-4 space-y-8">
            {/* Top Stories List */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-gray-950">
                Top Stories
              </h3>

              <div className="space-y-4">
                {/* Story 1 */}
                <div className="flex gap-4 items-start p-3 rounded-2xl border border-gray-100 bg-[#F8F9FA] hover:border-[#7BB042] transition group">
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A]">
                      Renewable Energy
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#3F6B1A] transition leading-snug line-clamp-2">
                      Lighting Up Communities Pet-Feb&apos;s Renewable Energy Projects Transforming Lives
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      Discover how Pet-Feb&apos;s solar projects are delivering affordable, reliable clean energy to Nigerian homes.
                    </p>
                  </div>
                  <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/figma-assets/blog-1.png"
                      alt="Solar Panels"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Story 2 */}
                <div className="flex gap-4 items-start p-3 rounded-2xl border border-gray-100 bg-[#F8F9FA] hover:border-[#7BB042] transition group">
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F6B1A]">
                      Renewable Energy
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#3F6B1A] transition leading-snug line-clamp-2">
                      Pet-Feb Expands to Port Harcourt — Bringing Solar Innovation Closer to Southern Nigeria
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      Pet-Feb opens a new regional office in Port Harcourt, reinforcing its commitment to clean energy access.
                    </p>
                  </div>
                  <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/figma-assets/blog-2.png"
                      alt="Port Harcourt Hub"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Card (Yellow Background) matching Figma */}
            <div className="rounded-[24px] bg-[#F5B82E] text-gray-950 p-6 sm:p-7 space-y-4 shadow-md">
              <h3 className="font-heading font-bold text-lg text-black leading-snug">
                Stay Up To Date on Our Latest projects and Posts
              </h3>
              <form className="relative flex items-center pt-1">
                <input
                  type="email"
                  placeholder="Email Address:"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Our Recent Blog Post (Black Container) matching Figma ─── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
        <div className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Our Recent Blog Post
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl font-normal">
              Discover a wide range of high-quality solar panels, inverters, and batteries designed to power homes, businesses, and communities across Nigeria. Every product is tested for performance, durability, and efficiency giving you reliable clean energy you can trust.
            </p>
          </div>

          {/* Search Bar matching Figma */}
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Blog Post"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7BB042] transition"
            />
          </div>

          {/* 3 Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentPosts.map((post, idx) => {
              const tags = ["Training", "Project", "News"];
              const tag = tags[idx % tags.length];
              const postImg = idx === 1 ? "/figma-assets/blog-2.png" : "/figma-assets/blog-1.png";

              return (
                <div
                  key={post.id}
                  className="bg-white text-gray-900 rounded-[24px] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition group"
                >
                  <div className="space-y-3">
                    <div className="h-52 w-full overflow-hidden rounded-[16px] bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover_image || postImg}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold text-gray-700 bg-gray-100">
                      {tag}
                    </span>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-gray-950 group-hover:text-[#3F6B1A] transition leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {post.body.slice(0, 130)}...
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="w-fit px-4 py-2 rounded-lg text-xs font-bold bg-[#7BB042] text-white hover:bg-[#6AA035] transition inline-flex items-center gap-1.5"
                    >
                      <span>Read More</span>
                    </Link>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">PF</span>
                        <span>Pet-Feb</span>
                      </div>
                      <span>August 23, 2025</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section: Join Our Next Training Today (Yellow Right Container) ─── */}
        <div className="pt-4">
          <div className="rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[426px]">
            {/* Left Column: Technician Photo */}
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

            {/* Right Column: Yellow container matching Figma */}
            <div className="lg:col-span-7 bg-[#F5B82E] p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" />
                  <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-black tracking-tight">
                    Join Our Next Training Today
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-black/90 leading-relaxed font-normal max-w-xl">
                  Petfeb Solar Training is designed to equip individuals with hands-on knowledge in solar installation,
                  maintenance, and system design. Weather you&apos;re starting out or upgrading your skills, our training
                  prepares you to work confidently in the fast-growing solar industry
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
