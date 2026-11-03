import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import {
  MilestoneCardDeck,
  type StoryMilestone,
} from "@/components/public/MilestoneCardDeck";
import { TeamShowcase, type TeamMember } from "@/components/public/TeamShowcase";
import {
  FloatingBounce,
  ParallaxLayer,
  ScrollReveal,
  ScrollScale,
  StaggerChildren,
} from "@/components/motion";

export const metadata: Metadata = {
  title: "About Us | Pet-Feb Solar Energy",
  description:
    "Learn about Pet-Feb International Company Limited, our history, engineering leadership, and mission to empower Nigeria with reliable, sustainable clean energy.",
};

const STORY_MILESTONES: StoryMilestone[] = [
  {
    period: "2019",
    title: "The Beginning",
    paragraphs: [
      "Pet-Feb was officially founded with a mission to make solar energy accessible and affordable to all Nigerians. What started as a small team with a big dream quickly became a movement for cleaner, greener energy.",
    ],
  },
  {
    period: "2020–2021",
    title: "Building Foundations",
    paragraphs: [
      "These early years were about laying the groundwork: building partnerships, gaining trust, and delivering our first major solar installations. Pet-Feb completed its first large-scale project and began training local technicians who would later become leaders in the field.",
    ],
  },
  {
    period: "2022",
    title: "The Learning Curve",
    paragraphs: [
      "Every great journey has its turning point. For Pet-Feb, 2022 was a year of learning and refinement.",
      "While we continued to execute smaller projects, our focus shifted toward improving operations, training, and quality assurance, preparing the foundation for the expansion to come.",
    ],
  },
  {
    period: "2023",
    title: "Expansion Across Nigeria",
    paragraphs: [
      "Our next milestone came in 2023, when Pet-Feb expanded operations across Lagos, Abuja, and Port Harcourt.",
      "With new offices, larger teams, and increased project capacity, we took bold steps toward becoming a truly national renewable energy provider.",
    ],
  },
  {
    period: "2024",
    title: "Scaling Impact",
    paragraphs: [
      "The year 2024 marked one of our most impactful seasons yet. Pet-Feb executed multiple community-based projects, from rural solar outreaches and solar streetlight installations to household inverter systems across Nigeria.",
      "Each project brought light, empowerment, and opportunity to people who needed it most.",
    ],
  },
  {
    period: "2025",
    title: "New Horizons",
    paragraphs: [
      "In 2025, we took another leap forward by moving into a larger operational space in Port Harcourt and Abuja, expanding our capacity to serve customers and train more professionals.",
      "We also strengthened international partnerships with top renewable energy manufacturers, positioning Pet-Feb as a key player in bringing advanced solar technologies to the Nigerian market.",
    ],
  },
];

const STORY_CLOSING =
  "As we continue to grow, one thing remains constant: our commitment to innovation, sustainability, and empowering Nigeria with clean energy that lasts.";

const MISSION_POINTS = [
  "Deliver world-class solar products and installations across Nigeria.",
  "Train and empower individuals with solar energy knowledge and skills.",
  "Promote recycling and eco-friendly practices in the solar industry.",
  "Provide customer-focused services with integrity and professionalism.",
];

const VISION_POINTS = [
  "Become Nigeria's most trusted provider of solar energy solutions.",
  "Drive widespread adoption of renewable energy across Africa.",
  "Build sustainable communities powered by clean energy.",
  "Inspire innovation in eco-friendly technologies.",
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mr. Steven F. Egwuatu",
    role: "Operations Manager / Business Development Manager",
    shortRole: "Operations & Business Dev.",
    image: "/figma-assets/steven-egwuatu.jpg.png",
    bio: "Directing operational efficiency, system procurement standards, client engagement, and nationwide installation fulfillment across Nigeria's residential and commercial solar sectors.",
  },
  {
    name: "Mr. Jude Egbri",
    role: "Branch / Regional Manager (Abuja)",
    shortRole: "Regional Manager (Abuja)",
    image: "/figma-assets/jude-egbri.jpg.jpeg",
    bio: "Overseeing Federal Capital Territory (FCT) and Northern regional installations, technical engineering site surveys, and strategic client relationship management.",
  },
  {
    name: "Mr. Dennis Onakposegha",
    role: "Logistics Manager",
    shortRole: "Logistics Manager",
    image: "/figma-assets/dennis-onakposegha.jpg.jpeg",
    bio: "Directing nationwide supply chain logistics, heavy-duty solar hardware transport, warehouse inventory verification, and secure on-site material delivery.",
  },
  {
    name: "Mrs. Petra Solomon",
    role: "CEO / Managing Director, PET-FEB International Company",
    shortRole: "CEO & Managing Director",
    image: "/figma-assets/about-ceo-petra.webp",
    bio: "Leading Pet-Feb International Company Limited's strategic vision, global manufacturer partnerships, and mission to make clean, sustainable solar power accessible across Nigeria.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-[#333333] pb-16">
      {/* ── 1. Hero Section ("● ABOUT PET-FEB") ── */}
      <section className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 pt-8 sm:pt-12 pb-10">
        <ScrollReveal direction="up" duration={0.7} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 pb-8">
          <div className="flex items-start gap-4">
            <span
              className="w-[30px] h-[30px] rounded-full bg-[#F5B82E] shrink-0 mt-2 sm:mt-3"
              aria-hidden="true"
            />
            <h1 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] uppercase tracking-[2px] sm:tracking-[3px] leading-[1.1] text-shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
              <span className="text-black block">ABOUT</span>
              <span className="text-[#70A03C] block">PET-FEB</span>
            </h1>
          </div>
          <div className="max-w-[532px] pl-[46px] lg:pl-0">
            <p className="font-sans font-normal text-[16px] sm:text-[18px] text-[#333] leading-[1.6] uppercase text-left">
              Pet-Feb is a trusted solar energy company in Nigeria, dedicated to providing reliable and sustainable power solutions. From residential homes to large-scale projects, we design, install, and maintain systems that reduce costs, protect the environment, and empower communities with clean energy.
            </p>
          </div>
        </ScrollReveal>

        {/* Hero installation banner */}
        <ScrollScale from={0.94} rise={36}>
          <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[580px] rounded-[31px] overflow-hidden shadow-sm">
            <Image
              src="/bannerimages/about-page-banner.jpg"
              alt="Pet-Feb solar installations nationwide"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
        </ScrollScale>
      </section>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12">
        {/* ── 2. Our Story (Light Green Container with Sticky CEO + Scroll-Driven Stacking Milestone Deck) ── */}
        <section className="bg-[#D6E7C4] text-gray-950 rounded-[32px] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Sticky CEO Leadership Card with Parallax & Floating Bounce */}
            <div className="lg:col-span-5 lg:sticky lg:top-[124px] self-start">
              <div className="group w-full bg-black rounded-[24px] overflow-hidden shadow-[0px_8px_28px_rgba(0,0,0,0.22)] text-white p-4 space-y-4 transition-all duration-300 motion-safe:hover:-translate-y-1">
                <ParallaxLayer travel={14}>
                  <FloatingBounce distance={6} duration={2.8}>
                    <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden bg-neutral-900">
                      <Image
                        src="/figma-assets/about-ceo-petra.webp"
                        alt="Mrs. Petra Solomon - CEO/Managing Director PET-FEB International Company"
                        fill
                        priority
                        className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 420px"
                      />
                    </div>
                  </FloatingBounce>
                </ParallaxLayer>
                <div className="px-2 pt-1 pb-2">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    Mrs. Petra Solomon
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    CEO/Managing Director PET-FEB International Company
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Story narrative + Scroll-Driven Stacking Milestone Card Deck */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-black shrink-0" />
                  <span className="font-heading font-bold text-lg text-black tracking-wide">
                    Our Story
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-snug">
                  Building Nigeria&apos;s Clean Energy Future One Milestone at a Time
                </h2>
              </ScrollReveal>

              <ScrollReveal
                delay={0.08}
                className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed font-normal"
              >
                <p>
                  Since its founding, Pet-Feb International Company Limited has been at the forefront of Nigeria&apos;s renewable energy transformation. What began as a small, passionate vision to reduce the country&apos;s dependence on fossil fuels has grown into one of Nigeria&apos;s leading names in solar innovation and sustainable power solutions.
                </p>
                <p>
                  From powering homes and businesses to empowering people through training, every year of our journey tells a story of growth, resilience, and impact.
                </p>
              </ScrollReveal>

              {/* Scroll-Driven Stacking Milestone Card Deck matching scroll-card-and-our-mission-petfeb.mp4 */}
              <MilestoneCardDeck
                milestones={STORY_MILESTONES}
                closing={STORY_CLOSING}
              />
            </div>
          </div>
        </section>

        {/* ── 3 & 4. Scroll-Stacked Our Mission & Our Vision (matching scroll-card-and-our-mission-petfeb.mp4) ── */}
        <div className="relative space-y-10 lg:space-y-12">
          {/* 3. Our Mission (Black Container with Yellow Box — pins first on desktop) */}
          <div className="lg:sticky lg:top-[112px] z-10">
            <ScrollScale from={0.93} rise={40}>
              <section className="bg-black text-white rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0px_12px_36px_rgba(0,0,0,0.22)] border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" />
                      <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                        Our Mission
                      </h2>
                    </div>

                    <StaggerChildren
                      staggerDelay={0.08}
                      distance={28}
                      className="space-y-2.5 pt-1"
                    >
                      {MISSION_POINTS.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#7BB042]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-[#7BB042]" strokeWidth={2.5} />
                          </span>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </StaggerChildren>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="bg-[#F5B82E] text-black rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-lg">
                      <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                        Our mission is to provide affordable, efficient, and sustainable solar power solutions that meet the energy needs of Nigerians today while safeguarding the environment for tomorrow.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollScale>
          </div>

          {/* 4. Our Vision (Yellow Container with Black Box — slides up and stacks over Our Mission) */}
          <div className="lg:sticky lg:top-[136px] z-20">
            <ScrollScale from={0.93} rise={44}>
              <section className="bg-[#F5B82E] text-black rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0px_-8px_28px_rgba(0,0,0,0.18),0px_14px_36px_rgba(0,0,0,0.16)] border border-black/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
                  <div className="lg:col-span-7 order-2 lg:order-1">
                    <div className="bg-black text-white rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-lg">
                      <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-gray-200">
                        At Pet-Feb, our vision is to lead Nigeria&apos;s transition into clean, renewable energy by delivering reliable and innovative solar solutions. We aim to create a sustainable future where homes, businesses, and communities thrive through affordable power.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col lg:items-end space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" />
                      <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
                        Our Vision
                      </h2>
                    </div>

                    <StaggerChildren
                      staggerDelay={0.08}
                      distance={28}
                      className="space-y-2.5 w-full"
                    >
                      {VISION_POINTS.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-black text-[#F5B82E] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </span>
                          <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </StaggerChildren>
                  </div>
                </div>
              </section>
            </ScrollScale>
          </div>
        </div>

        {/* ── 5. Rest Of The Team Section (matching petfeb-team-animation-reference.mp4) ── */}
        <section className="space-y-6 pt-4">
          <ScrollReveal className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" />
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 tracking-tight">
                Rest Of The Team
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl font-normal">
              Experienced renewable energy leaders directing operations, technical engineering surveys, and nationwide logistics.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <TeamShowcase members={TEAM_MEMBERS} />
          </ScrollReveal>
        </section>

        {/* ── 6. Team's Event (Black Container) ── */}
        <ScrollScale from={0.94} rise={36}>
          <section className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-6">
            <ScrollReveal className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Team&apos;s Event
                </h2>
              </div>
              <p className="text-sm text-gray-300 font-normal">
                Global Partnerships, Local Impact
              </p>
            </ScrollReveal>

            {/* China Event Photo */}
            <div className="relative rounded-[24px] overflow-hidden h-[300px] sm:h-[420px] lg:h-[500px] w-full bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-assets/about-event-china.png"
                alt="Petfeb leadership delegation at international manufacturing partner facility"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
            </div>

            {/* Event Narrative */}
            <ScrollReveal
              delay={0.08}
              className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal pt-2 border-t border-white/10"
            >
              <p>
                At Pet-Feb, we know that the future of energy cannot be built in isolation. That&apos;s why in March, our team embarked on a landmark visit to China — a journey that opened new doors for innovation, learning, and collaboration. During this strategic trip, Pet-Feb International Company Limited secured an international trade partnership with some of the world&apos;s leading renewable energy manufacturers. This milestone does more than strengthen our global footprint — it positions us to launch our own line of branded solar products tailored for the Nigerian market.
              </p>
              <p>What this means for our customers:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Access to reliable, world-class solar panels, inverters, and batteries.</li>
                <li>Continuous product innovation backed by international expertise.</li>
                <li>
                  Expert installation, maintenance, and training services built on global standards.
                </li>
                <li>
                  A trusted partner committed to delivering affordable and sustainable solar energy in Nigeria.
                </li>
              </ul>
              <p>
                At Pet-Feb, our mission is bigger than energy. We are committed to reducing carbon emissions, empowering communities, and helping businesses transition to clean, sustainable power solutions. With every partnership we forge, we take one more step towards creating a greener, healthier future for Nigeria and beyond.
              </p>
            </ScrollReveal>
          </section>
        </ScrollScale>
      </div>
    </main>
  );
}
