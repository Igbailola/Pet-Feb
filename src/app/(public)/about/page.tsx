import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { MilestoneCardDeck } from "@/components/public/MilestoneCardDeck";
import { TeamShowcase } from "@/components/public/TeamShowcase";

export const metadata: Metadata = {
  title: "About Us | Pet-Feb Solar Energy",
  description:
    "Learn about Pet-Feb International Company Limited, our history, engineering leadership, and mission to empower Nigeria with reliable, sustainable clean energy.",
};

interface StoryMilestone {
  period: string;
  title: string;
  paragraphs: string[];
}

const STORY_INTRO = [
  "Since its founding, Pet-Feb International Company Limited has been at the forefront of Nigeria’s renewable energy transformation. What began as a small, passionate vision to reduce the country’s dependence on fossil fuels has grown into one of Nigeria’s leading names in solar innovation and sustainable power solutions.",
  "From powering homes and businesses to empowering people through training, every year of our journey tells a story of growth, resilience, and impact.",
];

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

const VISION_POINTS = [
  "Become Nigeria's most trusted provider of solar energy solutions.",
  "Drive widespread adoption of renewable energy across Africa.",
  "Build sustainable communities powered by clean energy.",
  "Inspire innovation in eco-friendly technologies.",
];

const MISSION_POINTS = [
  "Deliver world-class solar products and installations across Nigeria",
  "Train and empower individuals with solar energy knowledge and skills.",
  "Promote recycling and eco-friendly practices in the solar industry.",
  "Provide customer-focused services with integrity and professionalism.",
];

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

const CUSTOMER_BENEFITS = [
  "Access to reliable, world-class solar panels, inverters, and batteries.",
  "Continuous product innovation backed by international expertise.",
  "Expert installation, maintenance, and training services built on global standards.",
  "A trusted partner committed to delivering affordable and sustainable solar energy in Nigeria.",
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen text-[#333333] selection:bg-[#7BB042]/20">
      {/* 1. Hero Section ("About Pet-Feb") */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px] pt-12 pb-14 lg:pt-[80px] lg:pb-[80px]">
        <div className="max-w-[640px]">
          <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[64px] text-black leading-tight tracking-tight">
            About Pet-Feb
          </h1>
          <p className="mt-5 lg:mt-6 text-[#333333] text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.6]">
            Pet-Feb is a trusted solar energy company in Nigeria, dedicated to providing reliable and sustainable power solutions. From residential homes to large-scale projects, we design, install, and maintain systems that reduce costs, protect the environment, and empower communities with clean energy.
          </p>
        </div>

        {/* Hero installation banner */}
        <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[442px] mt-10 lg:mt-[50px] rounded-[24px] overflow-hidden border-4 border-white shadow-[0px_4px_24px_rgba(0,0,0,0.08)] bg-neutral-100">
          <Image
            src="/figma-assets/about-hero.png"
            alt="Pet-Feb solar installations nationwide"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1350px) 100vw, 1350px"
          />
        </div>
      </section>

      {/* Subtle divider */}
      <div className="border-b border-gray-100 w-full" aria-hidden="true" />

      {/* 2. Our Story & Leadership (Dark Section with Desktop Sticky CEO Card) */}
      <section className="bg-black text-white py-16 lg:py-[100px]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[40px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-[80px]">
            {/* Left: Sticky CEO Leadership Card on desktop */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="w-full max-w-[420px] lg:sticky lg:top-[124px] self-start">
                <div className="group w-full bg-black rounded-[24px] overflow-hidden shadow-[0px_4px_12px_rgba(245,184,46,0.18)] pb-4 flex flex-col motion-safe:hover:-translate-y-1.5 hover:shadow-[0px_10px_32px_rgba(0,0,0,0.65),0px_6px_24px_rgba(245,184,46,0.24)] transition-all duration-300 ease-out">
                  <div className="relative w-full h-[300px] sm:h-[340px] lg:h-[360px] overflow-hidden rounded-t-[24px] bg-neutral-900">
                    <Image
                      src="/figma-assets/about-ceo-petra.webp"
                      alt="Mrs. Petra Solomon - CEO/Managing Director PET-FEB International Company"
                      fill
                      priority
                      className="object-cover object-[center_16%] scale-[1.20] sm:scale-[1.14] lg:scale-[1.24] origin-[center_16%] motion-safe:group-hover:scale-[1.26] motion-safe:sm:group-hover:scale-[1.20] motion-safe:lg:group-hover:scale-[1.30] transition-transform duration-500 ease-out"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                  </div>
                  <div className="px-5 sm:px-6 pt-3.5 sm:pt-4">
                    <h3 className="font-heading font-bold text-[22px] sm:text-[24px] text-[#e6e6e6]">
                      Mrs. Petra Solomon
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-[#ebebeb] leading-[1.5] mt-1 sm:mt-1.5">
                      CEO/Managing Director PET-FEB International Company
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Story narrative, 6 milestones, and closing */}
            <div className="lg:col-span-7 flex flex-col space-y-10 lg:space-y-12">
              {/* Section label & Main heading */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#7BB042] shrink-0" aria-hidden="true" />
                  <span className="font-heading font-medium text-[20px] sm:text-[24px] text-[#F5B82E] tracking-wide">
                    Our Story
                  </span>
                </div>
                <h2 className="font-heading font-bold text-[32px] sm:text-[44px] lg:text-[52px] text-white tracking-tight leading-[1.15]">
                  Building Nigeria’s Clean Energy Future One Milestone at a Time
                </h2>
              </div>

              {/* Introduction paragraphs */}
              <div className="space-y-4 text-[#ebebeb] text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.7]">
                {STORY_INTRO.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Scroll-Driven Stacking Milestone Card Deck */}
              <MilestoneCardDeck
                milestones={STORY_MILESTONES}
                closing={STORY_CLOSING}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Vision & Our Mission (Side-by-side Light Section) */}
      <section className="bg-white py-16 lg:py-[80px]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-start">
            {/* Our Vision */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#7BB042] shrink-0" aria-hidden="true" />
                <h2 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[64px] text-black tracking-tight leading-tight">
                  Our Vision
                </h2>
              </div>
              <p className="mt-5 lg:mt-6 text-[#333333] text-[16px] lg:text-[18px] leading-[1.6]">
                At Pet-Feb, our vision is to lead Nigeria’s transition into clean, renewable energy by delivering reliable and innovative solar solutions. We aim to create a sustainable future where homes, businesses, and communities thrive through affordable power.
              </p>
              <div className="mt-7 space-y-3">
                {VISION_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-1">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#7BB042]" strokeWidth={2.5} />
                    </div>
                    <p className="text-[#5c5c5c] text-[15px] sm:text-[16px] leading-[1.6]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#7BB042] shrink-0" aria-hidden="true" />
                <h2 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[64px] text-black tracking-tight leading-tight">
                  Our Mission
                </h2>
              </div>
              <p className="mt-5 lg:mt-6 text-[#5c5c5c] text-[16px] lg:text-[18px] leading-[1.6]">
                Our mission is to provide affordable, efficient, and sustainable solar power solutions that meet the energy needs of Nigerians today while safeguarding the environment for tomorrow.
              </p>
              <div className="mt-7 space-y-3">
                {MISSION_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-1">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#7BB042]" strokeWidth={2.5} />
                    </div>
                    <p className="text-[#5c5c5c] text-[15px] sm:text-[16px] leading-[1.6]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rest Of The Team */}
      <TeamShowcase members={TEAM_MEMBERS} title="Rest Of The Team" />

      {/* 5. Team's Event (Global Partnerships, Local Impact) */}
      <section className="bg-white pb-20 lg:pb-[100px]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-[45px]">
          <div className="border-b border-gray-200 mb-12 lg:mb-16" aria-hidden="true" />

          {/* Event Header */}
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-[26px] sm:text-[30px] lg:text-[32px] text-black">
              Team’s Event
            </h2>
            <p className="font-heading font-bold text-[18px] sm:text-[22px] lg:text-[24px] text-[#5c5c5c]">
              Global Partnerships, Local Impact
            </p>
          </div>

          {/* Event Card with photo and indicator */}
          <div className="bg-white rounded-[24px] shadow-[0px_2px_22px_rgba(45,45,45,0.08)] border border-gray-100 p-4 sm:p-6 lg:p-8 mt-8">
            <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[620px] xl:h-[720px] rounded-[20px] overflow-hidden bg-neutral-900">
              <Image
                src="/figma-assets/about-event-china.png"
                alt="Pet-Feb Team landmark visit to China renewable energy manufacturers"
                fill
                className="object-cover"
                sizes="(max-width: 1350px) 100vw, 1350px"
              />
            </div>

            {/* Pagination indicator dots */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7BB042]" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>

          {/* Event Narrative Story */}
          <div className="mt-10 lg:mt-12 text-[#5c5c5c] text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.7] space-y-5 max-w-[1200px]">
            <p>
              At Pet-Feb, we know that the future of energy cannot be built in isolation. That’s why in March, our team embarked on a landmark visit to China — a journey that opened new doors for innovation, learning, and collaboration.
            </p>
            <p>
              During this strategic trip, Pet-Feb International Company Limited secured an international trade partnership with some of the world’s leading renewable energy manufacturers. This milestone does more than strengthen our global footprint — it positions us to launch our own line of branded solar products tailored for the Nigerian market.
            </p>
            <p>
              But the partnership goes beyond products. Our engineers and staff engaged in hands-on training sessions, knowledge-sharing workshops, and a meet-and-greet with industry leaders. These experiences ensure our team stays ahead with the latest solar technology, manufacturing insights, and global best practices.
            </p>

            <div className="pt-2">
              <p className="font-heading font-semibold text-[18px] sm:text-[20px] text-gray-900 mb-3">
                What this means for our customers:
              </p>
              <ul className="space-y-2.5 pl-6 list-disc">
                {CUSTOMER_BENEFITS.map((benefit, idx) => (
                  <li key={idx} className="text-[#5c5c5c]">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <p className="pt-2">
              At Pet-Feb, our mission is bigger than energy. We are committed to reducing carbon emissions, empowering communities, and helping businesses transition to clean, sustainable power solutions. With every partnership we forge, we take one more step towards creating a greener, healthier future for Nigeria and beyond.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}