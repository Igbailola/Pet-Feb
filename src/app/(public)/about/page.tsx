import type { Metadata } from "next";
import Image from "next/image";
import { TeamShowcase } from "@/components/public/TeamShowcase";

export const metadata: Metadata = {
  title: "About Us | Pet-Feb Solar Energy",
  description:
    "Learn about Pet-Feb International Company Limited, our history, engineering leadership, and mission to empower Nigeria with reliable, sustainable clean energy.",
};

const TEAM_MEMBERS = [
  {
    name: "Mr. Steven F. Egwuatu",
    role: "Operations Manager / Business Development Manager",
    image: "/figma-assets/steven-egwuatu.jpg.png",
    bio: "Directing operational efficiency, system procurement standards, client engagement, and nationwide installation fulfillment.",
  },
  {
    name: "Mr. Jude Egbri",
    role: "Branch / Regional Manager (Abuja)",
    image: "/figma-assets/jude-egbri.jpg.jpeg",
    bio: "Overseeing Federal Capital Territory (FCT) and Northern regional installations, technical surveys, and client relationship management.",
  },
  {
    name: "Mr. Dennis Onakposegha",
    role: "Logistics Manager",
    image: "/figma-assets/dennis-onakposegha.jpg.jpeg",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-[#333333] pb-16 overflow-x-clip">
      {/* ── 1. Hero Section ("● ABOUT PET-FEB") matching Original About us.jpg ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[45px] pt-8 sm:pt-12 pb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 pb-8">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" aria-hidden="true" />
            <h1 className="font-heading font-bold text-[32px] sm:text-[44px] lg:text-[54px] text-gray-950 uppercase tracking-tight leading-tight">
              ABOUT PET-FEB
            </h1>
          </div>
          <div className="max-w-xl">
            <p className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed font-normal">
              Pet-Feb is a trusted solar energy company in Nigeria, dedicated to providing reliable and sustainable power solutions. From residential homes to large-scale projects, we design, install, and maintain systems that reduce costs, protect the environment, and empower communities with clean energy.
            </p>
          </div>
        </div>

        {/* Hero installation banner */}
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
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 space-y-12">
        {/* ── 2. Our Story (Light Green Container) matching Original About us.jpg ── */}
        <section className="bg-[#D6E7C4] text-gray-950 rounded-[32px] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: CEO Leadership Card */}
            <div className="lg:col-span-5">
              <div className="w-full bg-black rounded-[24px] overflow-hidden shadow-md text-white p-4 space-y-4">
                <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden bg-neutral-900">
                  <Image
                    src="/figma-assets/about-ceo-petra.webp"
                    alt="Mrs. Petra Solomon - CEO/Managing Director PET-FEB International Company"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>
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

            {/* Right: Story narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-black shrink-0" />
                  <span className="font-heading font-bold text-lg text-black tracking-wide">
                    Our Story
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-snug">
                  Building Nigeria&apos;s Clean Energy Future One Milestone at a Time
                </h2>
              </div>

              <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Since its founding, Pet-Feb International Company Limited has been at the forefront of Nigeria&apos;s renewable energy transformation. What began as a small, passionate vision to reduce the country&apos;s dependence on fossil fuels has grown into one of Nigeria&apos;s leading names in solar innovation and sustainable power solutions.
                </p>
                <p>
                  From powering homes and businesses to empowering people through training, every year of our journey tells a story of growth, resilience, and impact.
                </p>
              </div>

              {/* 2019 The Beginning Black Card matching Figma */}
              <div className="bg-black text-white rounded-[20px] p-6 sm:p-7 space-y-2.5 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#7BB042]" />
                  <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                    2019 — The Beginning
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  Pet-Feb was officially founded with a mission to make solar energy accessible and affordable to all Nigerians. What started as a small team with a big dream quickly became a movement for cleaner, greener energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Our Mission (Black Container with Yellow Box) matching Figma ── */}
        <section className="bg-black text-white rounded-[32px] p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" />
                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                  Our Mission
                </h2>
              </div>
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

        {/* ── 4. Our Vision (Yellow Container with Black Box) matching Figma ── */}
        <section className="bg-[#F5B82E] text-black rounded-[32px] p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-black text-white rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-lg">
                <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-gray-200">
                  At Pet-Feb, our vision is to lead Nigeria&apos;s transition into clean, renewable energy by delivering reliable and innovative solar solutions. We aim to create a sustainable future where homes, businesses, and communities thrive through affordable power.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 flex lg:justify-end">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-black shrink-0" />
                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
                  Our Vision
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Rest Of The Team Section matching Original About us.jpg ── */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" />
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 tracking-tight">
                Rest Of The Team
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl font-normal">
              Experienced renewable energy leaders directing operations, technical engineering surveys, and nationwide logistics.
            </p>
          </div>

          <TeamShowcase members={TEAM_MEMBERS} />
        </section>

        {/* ── 6. Team's Event (Black Container) matching Original About us.jpg ── */}
        <section className="bg-black text-white rounded-[32px] p-6 sm:p-10 lg:p-12 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5B82E] shrink-0" />
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Team&apos;s Event
              </h2>
            </div>
            <p className="text-sm text-gray-300 font-normal">
              Global Partnerships, Local Impact
            </p>
          </div>

          {/* China Event Photo */}
          <div className="relative rounded-[24px] overflow-hidden h-[300px] sm:h-[420px] lg:h-[500px] w-full bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma-assets/about-event-china.png"
              alt="Petfeb leadership delegation at international manufacturing partner facility"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
          </div>

          {/* Event Narrative */}
          <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal pt-2 border-t border-white/10">
            <p>
              At Pet-Feb, we know that the future of energy cannot be built in isolation. That&apos;s why in March, our team embarked on a landmark visit to China — a journey that opened new doors for innovation, learning, and collaboration. During this strategic trip, Pet-Feb International Company Limited secured an international trade partnership with some of the world&apos;s leading renewable energy manufacturers. This milestone does more than strengthen our global footprint — it positions us to launch our own line of branded solar products tailored for the Nigerian market.
            </p>
            <p>
              What this means for our customers:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Access to reliable, world-class solar panels, inverters, and batteries.</li>
              <li>Continuous product innovation backed by international expertise.</li>
              <li>Expert installation, maintenance, and training services built on global standards.</li>
              <li>A trusted partner committed to delivering affordable and sustainable solar energy in Nigeria.</li>
            </ul>
            <p>
              At Pet-Feb, our mission is bigger than energy. We are committed to reducing carbon emissions, empowering communities, and helping businesses transition to clean, sustainable power solutions. With every partnership we forge, we take one more step towards creating a greener, healthier future for Nigeria and beyond.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
