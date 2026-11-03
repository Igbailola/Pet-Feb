export interface ProjectSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  closingParagraphs?: string[];
  images?: string[];
  imageCols?: 2 | 3;
}

export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  category: "Ongoing" | "Collaboration" | "Training" | "Completed" | string;
  location: string;
  capacity: string;
  panels: string;
  imageUrl: string;
  heroImages?: string[];
  galleryImages?: string[];
  summary: string;
  clientType: string;
  commissionedYear: string;
  challenge: string;
  solution: string;
  impact: string;
  highlights: string[];
  sections?: ProjectSection[];
  specs: {
    inverter: string;
    battery: string;
    pvArray: string;
    transferTime: string;
    systemType: string;
    monitoring: string;
  };
}

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: "proj-solar-street-lighting",
    slug: "solar-street-lighting",
    title:
      "Lighting the Future: How Pet-Feb Is Transforming Communities Through Solar Street Lighting",
    shortTitle:
      "How Pet-Feb Is Transforming Communities Through Solar Street Lighting",
    category: "Ongoing",
    location: "Rural & Urban Communities, Nigeria",
    capacity: "Solar Street Lighting & Floodlight Infrastructure",
    panels: "Integrated Monocrystalline Solar Street Lights & Floodlights",
    imageUrl:
      "https://framerusercontent.com/images/Pe6chdzlkxNa92G279oCEMkkpc.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/Pe6chdzlkxNa92G279oCEMkkpc.png?width=3906&height=1656",
      "https://framerusercontent.com/images/t9tRc4eUkv0WKXcaxW9yAYUscc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/KnovYrUoQ5Mqxhqa7hKU2XFGXDw.png?width=2444&height=2208",
      "https://framerusercontent.com/images/oXVhcZk6I9edV28ioY7XamTdU.png?width=2444&height=2208",
      "https://framerusercontent.com/images/jfjCSC4UlAZOKEp3gSvH2nN3qOw.png?width=2444&height=2208",
    ],
    galleryImages: [
      "https://framerusercontent.com/images/t9tRc4eUkv0WKXcaxW9yAYUscc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/KnovYrUoQ5Mqxhqa7hKU2XFGXDw.png?width=2444&height=2208",
      "https://framerusercontent.com/images/oXVhcZk6I9edV28ioY7XamTdU.png?width=2444&height=2208",
      "https://framerusercontent.com/images/jfjCSC4UlAZOKEp3gSvH2nN3qOw.png?width=2444&height=2208",
      "https://framerusercontent.com/images/wvsf3H4VHhDltyqOQJ9Zw5F2eM.png?width=2444&height=2208",
      "https://framerusercontent.com/images/tp64lHdj7EV5aI6OnaBdhViIwg.png?width=2444&height=2208",
      "https://framerusercontent.com/images/kMAP1HQXuy5CZ49MHxuntGqg9Uw.png?width=2444&height=2208",
      "https://framerusercontent.com/images/Yb8Nl5PAO4xkdKz14mp5KpOK8Yk.png?width=2444&height=2208",
    ],
    clientType: "Public Infrastructure, Private Estates & Communities",
    commissionedYear: "Ongoing",
    summary:
      "These projects form part of our broader rural electrification campaign an effort designed to bring dependable illumination to communities long overlooked by traditional grid infrastructure. By replacing diesel-powered or poorly maintained electric street lights with clean, solar-powered alternatives, we help reduce carbon emissions while ensuring continuous lighting throughout the year.",
    challenge:
      "These projects form part of our broader rural electrification campaign an effort designed to bring dependable illumination to communities long overlooked by traditional grid infrastructure. By replacing diesel-powered or poorly maintained electric street lights with clean, solar-powered alternatives, we help reduce carbon emissions while ensuring continuous lighting throughout the year.",
    solution:
      "Beyond large public projects, we also provide targeted lighting solutions for private estates and individual clients. Solar floodlights have become one of our most effective tools for solving illumination challenges an efficient, maintenance-friendly option that boosts security and cuts energy costs without compromising brightness.",
    impact:
      "Our installations have improved night-time visibility, strengthened security, and enhanced economic activity across several regions. From highways and village access roads to marketplaces and community centers, Pet-Feb’s systems continue to make daily life safer and more convenient. Every system we deploy reflects our commitment to cleaner energy, smarter infrastructure, and a brighter future for the communities we serve.",
    highlights: [
      "Replaces diesel-powered and poorly maintained electric street lights with clean, solar-powered alternatives.",
      "Improves night-time visibility, strengthens security, and enhances evening economic activity across marketplaces and access roads.",
      "Delivers targeted solar floodlight solutions for highways, village roads, private estates, and individual clients.",
      "Maintenance-friendly, zero-emission illumination that cuts energy costs without compromising brightness.",
    ],
    sections: [
      {
        paragraphs: [
          "These projects form part of our broader rural electrification campaign an effort designed to bring dependable illumination to communities long overlooked by traditional grid infrastructure. By replacing diesel-powered or poorly maintained electric street lights with clean, solar-powered alternatives, we help reduce carbon emissions while ensuring continuous lighting throughout the year.",
          "Our installations have improved night-time visibility, strengthened security, and enhanced economic activity across several regions. From highways and village access roads to marketplaces and community centers, Pet-Feb’s systems continue to make daily life safer and more convenient.",
          "Beyond large public projects, we also provide targeted lighting solutions for private estates and individual clients. Solar floodlights have become one of our most effective tools for solving illumination challenges an efficient, maintenance-friendly option that boosts security and cuts energy costs without compromising brightness. Every system we deploy reflects our commitment to cleaner energy, smarter infrastructure, and a brighter future for the communities we serve.",
        ],
      },
    ],
    specs: {
      inverter: "Integrated Smart Dusk-to-Dawn MPPT Solar Charge Controllers",
      battery: "Built-In Deep-Cycle Lithium Iron Phosphate (LiFePO4) Packs",
      pvArray: "High-Efficiency Monocrystalline Solar Street Light & Floodlight Modules",
      transferTime: "Automatic Photocell Dusk-to-Dawn & Motion Sensor Activation",
      systemType: "Standalone Municipal Solar Street Lighting & Estate Floodlight Systems",
      monitoring: "Automated Smart Dimming & Weatherproof IP65/IP66 Outdoor Enclosure",
    },
  },
  {
    id: "proj-clean-energy-landscape",
    slug: "clean-energy-landscape",
    title:
      "Powering Progress: Pet-Feb’s Journey Across Nigeria’s Clean Energy Landscape",
    shortTitle: "Pet-Feb’s Journey Across Nigeria’s Clean Energy Landscape",
    category: "Ongoing",
    location: "Onne (Rivers State), Edo State & Nationwide",
    capacity: "15kVA / 50kWh Backup & Industrial Hybrid Systems",
    panels: "Industrial Solar + Inverter Hybrid Systems & Off-Grid Deployments",
    imageUrl:
      "https://framerusercontent.com/images/T17xko4xI33fpTlQYYKXJeZJwk.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/T17xko4xI33fpTlQYYKXJeZJwk.png?width=3906&height=1656",
      "https://framerusercontent.com/images/ouN3rsXAKyw7PjwEu9a9id2jDhk.png?width=1524&height=764",
      "https://framerusercontent.com/images/1QjfCy9Y4m1AwsOYggwt8cs8oY.png?width=1524&height=764",
      "https://framerusercontent.com/images/BxR3rcFDKdHvorb8nsw4BrCQF0.png?width=1524&height=764",
      "https://framerusercontent.com/images/JYUUwXd19cgXtlt4Og6nXL1PhNI.jpg?width=1040&height=520",
    ],
    galleryImages: [
      "https://framerusercontent.com/images/deArVjqIqIE4OtCEUKDRX7zBOic.jpg?width=810&height=1080",
      "https://framerusercontent.com/images/ouN3rsXAKyw7PjwEu9a9id2jDhk.png?width=1524&height=764",
      "https://framerusercontent.com/images/1QjfCy9Y4m1AwsOYggwt8cs8oY.png?width=1524&height=764",
      "https://framerusercontent.com/images/BxR3rcFDKdHvorb8nsw4BrCQF0.png?width=1524&height=764",
      "https://framerusercontent.com/images/xyrhLbRC9JyspLBq3TZdYJN7U.png?width=2444&height=2208",
      "https://framerusercontent.com/images/efiej2HT5dZ6MwrkRwMLnlZWxmc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/JYUUwXd19cgXtlt4Og6nXL1PhNI.jpg?width=1040&height=520",
      "https://framerusercontent.com/images/8XO0tIsD5Yjc76UAjNP05XMvH7E.jpg?width=1040&height=520",
      "https://framerusercontent.com/images/k3UxjsxWY7q0d2c3pDXZuFtjkZU.jpg?width=810&height=1080",
      "https://framerusercontent.com/images/ocdKtoAy5td6vuIpwSctRNAePKU.jpg?width=765&height=1020",
      "https://framerusercontent.com/images/JORmT3dRQeNsBXHZG9XJj2Yjg.jpg?width=810&height=1080",
      "https://framerusercontent.com/images/a6DOUEq20lFRdDXv9iWn451LSA.jpg?width=1020&height=459",
    ],
    clientType: "Oil & Gas Infrastructure (NGIC, NNPC), SMEs & Households",
    commissionedYear: "2022 – Ongoing",
    summary:
      "One of our standout achievements is the backup system deployed at the Nigerian Gas Infrastructure Company (NGIC) gas plant in Onne, Rivers State. In 2023, our team designed and installed a 15kVA inverter system paired with a 50kWh lithium battery bank.",
    challenge:
      "The goal was simple but critical: Provide stable backup power for their control system during grid downtimes. Reduce fire-risk exposure by eliminating reliance on combustion-based backup sources. Improve operational safety with a clean, emission-free energy alternative.",
    solution:
      "In 2022, Pet-Feb extended its clean-energy expertise to an NNPC sub flow station in Edo State. We deployed a solar-powered inverter system designed to run essential control operations at the facility.",
    impact:
      "By powering the flow station’s control system with solar, the team achieved better uptime, reduced operational risk, and contributed to NNPC’s broader sustainability goals.",
    highlights: [
      "Provide stable backup power for their control system during grid downtimes.",
      "Reduce fire-risk exposure by eliminating reliance on combustion-based backup sources.",
      "Improve operational safety with a clean, emission-free energy alternative.",
      "A steady stream of renewable energy to reduce dependence on unstable supply lines.",
      "A safer, cleaner, and quieter alternative to generator-based systems.",
    ],
    sections: [
      {
        heading: "15kVA / 50kWh Backup Inverter System",
        paragraphs: [
          "One of our standout achievements is the backup system deployed at the Nigerian Gas Infrastructure Company (NGIC) gas plant in Onne, Rivers State. In 2023, our team designed and installed a 15kVA inverter system paired with a 50kWh lithium battery bank.",
          "The goal was simple but critical:",
        ],
        bullets: [
          "Provide stable backup power for their control system during grid downtimes.",
          "Reduce fire-risk exposure by eliminating reliance on combustion-based backup sources.",
          "Improve operational safety with a clean, emission-free energy alternative.",
        ],
        closingParagraphs: [
          "This installation continues to support NGIC’s operations by delivering dependable, instant backup power when the grid fails—exactly when precision matters most.",
        ],
      },
      {
        heading: "NNPC Sub Flow Station , Edo State – 2022.",
        paragraphs: [
          "Solar + Inverter Hybrid System",
          "In 2022, Pet-Feb extended its clean-energy expertise to an NNPC sub flow station in Edo State. We deployed a solar-powered inverter system designed to run essential control operations at the facility.",
          "This setup delivered two strategic outcomes:",
        ],
        bullets: [
          "A steady stream of renewable energy to reduce dependence on unstable supply lines.",
          "A safer, cleaner, and quieter alternative to generator-based systems.",
        ],
        closingParagraphs: [
          "By powering the flow station’s control system with solar, the team achieved better uptime, reduced operational risk, and contributed to NNPC’s broader sustainability goals.",
        ],
      },
      {
        heading: "Scaling Clean Energy Across Communities and Homes",
        paragraphs: [
          "Beyond large industrial facilities, Pet-Feb has executed numerous small-scale off-grid projects for households and SMEs across Nigeria. These installations support everyday needs from lighting and cooling to business continuity helping customers escape energy unreliability and cut long-term power costs.",
          "We’re also advancing plans for pilot mini-grid projects in communities with limited energy access. These initiatives are positioned to offer long-term, community-wide solutions that unlock economic growth and improve quality of life.",
        ],
      },
      {
        heading: "A Track Record Built on Integrity, Expertise, and Results",
        paragraphs: [
          "Our portfolio is proof of a team committed to solving real energy challenges with practical, sustainable solutions. Each project large or small reflects our dedication to reliability, safety, and innovation in Nigeria’s renewable-energy space. Pet-Feb International continues to move forward, lighting up homes, businesses, and critical infrastructure with clean, dependable power.",
        ],
      },
    ],
    specs: {
      inverter: "15kVA Industrial Backup Inverter & Solar Hybrid Control Systems",
      battery: "50kWh High-Capacity Lithium Battery Bank (LiFePO4)",
      pvArray: "High-Efficiency Monocrystalline Solar + Inverter Hybrid Arrays",
      transferTime: "< 10ms Instantaneous Control-System Backup Transfer",
      systemType: "Industrial Gas Plant / Flow Station Backup & Off-Grid Hybrid Systems",
      monitoring: "Precision Control Room Telemetry & Automated Battery Management System",
    },
  },
  {
    id: "proj-light-up-umueri",
    slug: "light-up-umueri",
    title:
      "“Light Up Umueri” A Journey to Power Up Lives Through Renewable Energy",
    shortTitle: "A Journey to Power Up Lives Through Renewable Energy",
    category: "Collaboration",
    location: "Umueri, Anambra State, Nigeria",
    capacity: "500 Solar Home Kits & 1,500 Solar Reading Lamps",
    panels: "Community Rural Electrification & Off-Grid Solar Home Systems",
    imageUrl:
      "https://framerusercontent.com/images/CWkdJA2gAFDbAqRSfKsMSs3EJU.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/CWkdJA2gAFDbAqRSfKsMSs3EJU.png?width=3906&height=1656",
      "https://framerusercontent.com/images/DW7rme2XjltZ0m6fTH61XKd9TY.png?width=2444&height=2208",
      "https://framerusercontent.com/images/puOOkBFuMuVaH9XbrTjG4dDsZE.png?width=2444&height=2208",
      "https://framerusercontent.com/images/wBaJ3u4FK1D1Cbjos0cCoLeLxU.png?width=2444&height=2208",
      "https://framerusercontent.com/images/RKkhLQqtVmYZb1YWkTMGdeeUcI.png?width=2444&height=2208",
    ],
    galleryImages: [],
    clientType: "Community Rural Electrification & Social Impact Partnership",
    commissionedYear: "June 2023",
    summary:
      "In June 2023, Pet-Feb embarked on an inspiring journey to the serene community of Umueri, Anambra State, to fulfill one simple yet powerful mission to bring clean, affordable, and sustainable energy to underserved regions. Sparked by the initiative of a passionate local ambassador who believed in our vision, this partnership grew into a transformative rural electrification program titled “Light Up Umueri.”",
    challenge:
      "What began as a conversation soon became a full-scale renewable energy movement designed to empower lives, strengthen education, and create lasting social impact. Our team worked closely with local leaders, youth groups, and women’s associations to identify community needs and deliver solutions tailored to their realities. From the start, the project embodied Pet-Feb’s belief that sustainable progress is rooted in empathy, collaboration, and innovation.",
    solution:
      "Beyond technology deployment, our team focused on building capacity and transferring knowledge within the community. Pet-Feb engineers conducted on-site demonstrations, showing residents how to safely operate, maintain, and troubleshoot their solar systems.",
    impact:
      "The “Light Up Umueri” initiative became more than a solar project, it became a story of empowerment and transformation. Together, these outcomes reinforced Pet-Feb’s mission to drive inclusive growth through innovation and human-centered renewable energy solutions.",
    highlights: [
      "Distribution of 1,500 solar reading lamps to students — extending study hours and improving learning outcomes.",
      "Provision of 500 solar home kits to low-income households for consistent and affordable electricity access.",
      "On-site installation and user training sessions for residents to ensure system longevity and self-reliance.",
      "Community interest in renewable energy advocacy, with several residents expressing a desire to learn, support, and promote green energy initiatives.",
      "A memorable milestone: installation for an elderly woman (aged nearly 120) who had never experienced reliable electricity, a powerful reminder of how renewable energy restores dignity and hope.",
    ],
    sections: [
      {
        heading: "Project Overview:",
        paragraphs: [
          "In June 2023, Pet-Feb embarked on an inspiring journey to the serene community of Umueri, Anambra State, to fulfill one simple yet powerful mission to bring clean, affordable, and sustainable energy to underserved regions. Sparked by the initiative of a passionate local ambassador who believed in our vision, this partnership grew into a transformative rural electrification program titled “Light Up Umueri.”",
          "What began as a conversation soon became a full-scale renewable energy movement designed to empower lives, strengthen education, and create lasting social impact. Our team worked closely with local leaders, youth groups, and women’s associations to identify community needs and deliver solutions tailored to their realities. From the start, the project embodied Pet-Feb’s belief that sustainable progress is rooted in empathy, collaboration, and innovation.",
        ],
        images: [
          "https://framerusercontent.com/images/DW7rme2XjltZ0m6fTH61XKd9TY.png?width=2444&height=2208",
          "https://framerusercontent.com/images/puOOkBFuMuVaH9XbrTjG4dDsZE.png?width=2444&height=2208",
          "https://framerusercontent.com/images/wBaJ3u4FK1D1Cbjos0cCoLeLxU.png?width=2444&height=2208",
          "https://framerusercontent.com/images/RKkhLQqtVmYZb1YWkTMGdeeUcI.png?width=2444&height=2208",
        ],
        imageCols: 2,
      },
      {
        heading: "Staff Training & Development:",
        paragraphs: [
          "Beyond technology deployment, our team focused on building capacity and transferring knowledge within the community. Pet-Feb engineers conducted on-site demonstrations, showing residents how to safely operate, maintain, and troubleshoot their solar systems.",
          "Particular attention was given to elderly residents and caregivers to ensure confidence and independence in using the new systems. This hands-on training fostered a spirit of ownership and sustainability, allowing beneficiaries to become active participants in maintaining their energy solutions.",
          "Moreover, our team members received additional field-based training in community engagement, adaptive installation, and rural power design, strengthening their practical expertise in off-grid renewable energy solutions.",
        ],
      },
      {
        heading: "Key Highlights:",
        paragraphs: [],
        bullets: [
          "Distribution of 1,500 solar reading lamps to students — extending study hours and improving learning outcomes.",
          "Provision of 500 solar home kits to low-income households for consistent and affordable electricity access.",
          "On-site installation and user training sessions for residents to ensure system longevity and self-reliance.",
          "Community interest in renewable energy advocacy, with several residents expressing a desire to learn, support, and promote green energy initiatives.",
          "A memorable milestone: installation for an elderly woman (aged nearly 120) who had never experienced reliable electricity, a powerful reminder of how renewable energy restores dignity and hope.",
        ],
      },
      {
        heading: "Impact:",
        paragraphs: [
          "The “Light Up Umueri” initiative became more than a solar project, it became a story of empowerment and transformation.",
          "Educational Impact: Children gained the ability to study safely after dark, improving literacy and performance.",
          "Economic Impact: Families reduced dependence on costly fuel generators, saving income while improving comfort and safety.",
          "Social Impact: The initiative united the community, inspired local ambassadors for renewable energy, and sparked discussions about broader sustainability goals.",
          "Environmental Impact: The reduction in generator use contributed to cleaner air and a smaller carbon footprint in the area.",
          "Together, these outcomes reinforced Pet-Feb’s mission to drive inclusive growth through innovation and human-centered renewable energy solutions.",
        ],
      },
      {
        heading: "Conclusion:",
        paragraphs: [
          "The success of “Light Up Umueri” reaffirmed our belief that real change starts with connection, understanding people’s stories, challenges, and dreams.",
          "Through strategic partnerships, community trust, and sustainable technology, we didn’t just power homes, we illuminated futures. As we continue to expand our impact, Pet-Feb remains committed to empowering more communities, nurturing green champions, and lighting the path toward a cleaner, brighter Nigeria.",
        ],
      },
    ],
    specs: {
      inverter: "500 × Off-Grid Solar Home Kit Inverters & Charge Controllers",
      battery: "Integrated Lithium & Deep-Cycle Home Storage + 1,500 Solar Reading Lamps",
      pvArray: "High-Efficiency Monocrystalline Solar Home Kit Panels",
      transferTime: "Plug-and-Play Instant DC/AC Household Power Delivery",
      systemType: "Community Rural Electrification & Off-Grid Household Solar Program",
      monitoring: "On-Site Resident User Training, Caregiver Demonstrations & Field Support",
    },
  },
  {
    id: "proj-china-training",
    slug: "building-global-capacity",
    title:
      "Building Global Capacity  Pet-Feb’s China Partnership & Staff Training Program",
    shortTitle:
      "Building Global Capacity  Pet-Feb’s China Partnership & Staff Training Program",
    category: "Training",
    location: "China & Nigeria",
    capacity: "Global Manufacturing Partnerships & Technical Training",
    panels: "Modern Hybrid Inverter & Lithium-Ion Battery Systems",
    imageUrl:
      "https://framerusercontent.com/images/DAqrGApeEoamVF3v8UXegv0.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/DAqrGApeEoamVF3v8UXegv0.png?width=3906&height=1656",
      "https://framerusercontent.com/images/EqzEmErJ4EZPWDc6Z10DKBoSFTc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/ajestYwk9gWiDVpDM4R0bASbU.png?width=2444&height=2208",
    ],
    galleryImages: [
      "https://framerusercontent.com/images/EqzEmErJ4EZPWDc6Z10DKBoSFTc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/ajestYwk9gWiDVpDM4R0bASbU.png?width=2444&height=2208",
    ],
    clientType: "International Manufacturer Collaboration & Capacity Building",
    commissionedYear: "March 2025",
    summary:
      "Empowering our team with world-class solar expertise to drive innovation, quality, and sustainability in Nigeria. At Pet-Feb, we understand that the future of energy cannot be built in isolation. In March, our team embarked on a landmark visit to China a journey that opened new doors for innovation, learning, and global collaboration.",
    challenge:
      "At Pet-Feb, we understand that the future of energy cannot be built in isolation. In March, our team embarked on a landmark visit to China a journey that opened new doors for innovation, learning, and global collaboration.",
    solution:
      "During this strategic trip, Pet-Feb International Company Limited formed key partnerships with some of the world’s leading renewable-energy manufacturers. This milestone strengthens our global footprint and positions us to introduce a new line of branded solar products designed specifically for the Nigerian market.",
    impact:
      "This project reinforces our promise to deliver world-class solar solutions in Nigeria powered by a skilled, globally trained team. It also ensures that every Pet-Feb installation reflects international quality, safety, and sustainability standards.",
    highlights: [
      "Advanced technical training on modern inverter and lithium-ion battery systems.",
      "Knowledge exchange on renewable-energy manufacturing standards.",
      "Strengthened global partnerships for continuous research and innovation.",
      "Exposure to international solar-project management techniques.",
      "Access to reliable, high-performance solar products.",
      "Smarter system installations and long-term maintenance support.",
      "Innovation driven by global expertise and local understanding.",
    ],
    sections: [
      {
        heading: "Project Overview:",
        paragraphs: [
          "Empowering our team with world-class solar expertise to drive innovation, quality, and sustainability in Nigeria.",
          "At Pet-Feb, we understand that the future of energy cannot be built in isolation. In March, our team embarked on a landmark visit to China a journey that opened new doors for innovation, learning, and global collaboration.",
          "During this strategic trip, Pet-Feb International Company Limited formed key partnerships with some of the world’s leading renewable-energy manufacturers. This milestone strengthens our global footprint and positions us to introduce a new line of branded solar products designed specifically for the Nigerian market.",
        ],
      },
      {
        heading: "Staff Training & Development:",
        paragraphs: [
          "Beyond trade partnerships, this initiative was centered on capacity building. Our engineers and technical staff participated in hands-on training sessions, factory tours, and knowledge-sharing workshops led by industry leaders. These immersive experiences ensure the Pet-Feb team stays ahead with the latest solar technologies, manufacturing processes, and installation best practices.",
        ],
        images: [
          "https://framerusercontent.com/images/EqzEmErJ4EZPWDc6Z10DKBoSFTc.png?width=2444&height=2208",
          "https://framerusercontent.com/images/ajestYwk9gWiDVpDM4R0bASbU.png?width=2444&height=2208",
        ],
        imageCols: 2,
      },
      {
        heading: "Key Highlights:",
        paragraphs: [],
        bullets: [
          "Advanced technical training on modern inverter and lithium-ion battery systems.",
          "Knowledge exchange on renewable-energy manufacturing standards.",
          "Strengthened global partnerships for continuous research and innovation.",
          "Exposure to international solar-project management techniques.",
        ],
      },
      {
        heading: "Impact:",
        paragraphs: [
          "This project reinforces our promise to deliver world-class solar solutions in Nigeria powered by a skilled, globally trained team. It also ensures that every Pet-Feb installation reflects international quality, safety, and sustainability standards.",
        ],
      },
      {
        heading: "For Our Customers, This Means:",
        paragraphs: [],
        bullets: [
          "Access to reliable, high-performance solar products.",
          "Smarter system installations and long-term maintenance support.",
          "Innovation driven by global expertise and local understanding.",
        ],
      },
      {
        heading: "Conclusion:",
        paragraphs: [
          "At Pet-Feb, our mission extends beyond providing energy we are shaping Nigeria’s clean-energy future. Through strategic partnerships and continuous staff training, we continue to empower communities, reduce carbon emissions, and deliver solar solutions that truly make a difference.",
        ],
      },
    ],
    specs: {
      inverter: "Modern Hybrid Inverter Topologies (5kVA – 30kVA+)",
      battery: "High-Cycle Lithium-Ion (LiFePO4) Battery Systems with Active BMS",
      pvArray: "Tier-1 Monocrystalline Solar Modules Tailored for Nigerian Climate",
      transferTime: "International Quality, Safety & Sustainability Standards",
      systemType: "Global Manufacturing Partnership & Engineering Capacity Program",
      monitoring: "Factory Quality Assurance, Diagnostic Protocols & Project Management",
    },
  },
  {
    id: "proj-greenglo-fggc-ibuza",
    slug: "greenglo-initiative-fggc-ibuza",
    title:
      "Empowering the Next Generation The GreenGlo Initiative at FGGC Ibuza",
    shortTitle:
      "Empowering the Next Generation The GreenGlo Initiative at FGGC Ibuza",
    category: "Completed",
    location: "FGGC Ibuza (Iguzor), Delta State",
    capacity: "1,000+ Girls Trained & Equipped with Free Solar Reading Lamps",
    panels: "Week-Long Renewable Energy, STEM & Entrepreneurship Outreach",
    imageUrl:
      "https://framerusercontent.com/images/niaaorPV8XzvvS6cMlu3mBlvgw.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/niaaorPV8XzvvS6cMlu3mBlvgw.png?width=3906&height=1656",
      "https://framerusercontent.com/images/NJ3BKXRpiY8ieV3fd0VIREprN6M.jpg?width=1080&height=810",
      "https://framerusercontent.com/images/96HG2DlwTrnXEEoyerz5xMT38So.jpg?width=1080&height=810",
      "https://framerusercontent.com/images/2KHeD2MJKIx3m3Lriqi9GiqoUdA.jpg?width=1080&height=810",
    ],
    galleryImages: [
      "https://framerusercontent.com/images/NJ3BKXRpiY8ieV3fd0VIREprN6M.jpg?width=1080&height=810",
      "https://framerusercontent.com/images/96HG2DlwTrnXEEoyerz5xMT38So.jpg?width=1080&height=810",
      "https://framerusercontent.com/images/2KHeD2MJKIx3m3Lriqi9GiqoUdA.jpg?width=1080&height=810",
    ],
    clientType: "Youth & Girl-Child STEM Empowerment (Federal Government Girls College)",
    commissionedYear: "June 2024",
    summary:
      "The GreenGlo Initiative at the Federal Government Skills College, Iguzor was a week-long outreach program that marked the birth of the GreenGlo vision. The initiative was designed to empower young women and girls, from secondary school through their tertiary years, by introducing them to renewable energy and entrepreneurship opportunities within the sector.",
    challenge:
      "The GreenGlo Initiative at the Federal Government Skills College, Iguzor was a week-long outreach program that marked the birth of the GreenGlo vision. The initiative was designed to empower young women and girls, from secondary school through their tertiary years, by introducing them to renewable energy and entrepreneurship opportunities within the sector.",
    solution:
      "Inspired by the idea of nurturing future innovators early, the team decided to start from the alma mater of the CEO of Petfeb. Over the course of one impactful week, more than 1,000 girls were trained in the fundamentals of renewable energy, entrepreneurship, and practical technical skills. Each participant also received a free reading lamp as a symbol of clean, sustainable energy.",
    impact:
      "With an estimated budget of Four million Naira, covering logistics, facilitators, and materials, the outreach served as a meaningful investment in the next generation of women entrepreneurs. Beyond skill acquisition, participants were encouraged to explore marketing strategies, technical know-how, and ways to integrate themselves into the renewable energy ecosystem. Facilitators shared their own career journeys and showed the girls how they, too, could become facilitators and change agents in the future. To ensure long-term impact, GreenGlo also created mentorship opportunities, enabling participants to continue learning, growing, and shaping their paths within the renewable energy industry.",
    highlights: [
      "Over 1,000 girls trained in the fundamentals of renewable energy, entrepreneurship, and practical technical skills.",
      "Each participant received a free solar reading lamp as a symbol of clean, sustainable energy.",
      "Four million Naira investment covering logistics, facilitators, and training materials at the CEO alma mater.",
      "Participants explored marketing strategies, technical know-how, and career pathways to become future facilitators and change agents.",
      "Ongoing mentorship opportunities established to support participants from secondary school through their tertiary years.",
    ],
    sections: [
      {
        paragraphs: [
          "The GreenGlo Initiative at the Federal Government Skills College, Iguzor was a week-long outreach program that marked the birth of the GreenGlo vision. The initiative was designed to empower young women and girls, from secondary school through their tertiary years, by introducing them to renewable energy and entrepreneurship opportunities within the sector.",
          "Inspired by the idea of nurturing future innovators early, the team decided to start from the alma mater of the CEO of Petfeb. Over the course of one impactful week, more than 1,000 girls were trained in the fundamentals of renewable energy, entrepreneurship, and practical technical skills. Each participant also received a free reading lamp as a symbol of clean, sustainable energy.",
          "With an estimated budget of Four million Naira, covering logistics, facilitators, and materials, the outreach served as a meaningful investment in the next generation of women entrepreneurs. Beyond skill acquisition, participants were encouraged to explore marketing strategies, technical know-how, and ways to integrate themselves into the renewable energy ecosystem. Facilitators shared their own career journeys and showed the girls how they, too, could become facilitators and change agents in the future.",
          "To ensure long-term impact, GreenGlo also created mentorship opportunities, enabling participants to continue learning, growing, and shaping their paths within the renewable energy industry.",
        ],
      },
    ],
    specs: {
      inverter: "Hands-On Solar PV & Inverter Fundamentals Demonstration Kits",
      battery: "1,000+ Rechargeable Solar Reading Lamps Distributed to Students",
      pvArray: "Educational Solar PV Training Modules & Portable Clean Energy Kits",
      transferTime: "1-Week Intensive On-Campus Outreach + Long-Term Mentorship",
      systemType: "Girl-Child Renewable Energy & Entrepreneurship Empowerment Program",
      monitoring: "Continuous Career Mentorship & STEM Ecosystem Integration",
    },
  },
  {
    id: "proj-naca-headquarters",
    slug: "naca-headquarters-system-overhaul",
    title:
      "NACA Headquarters – System Overhaul  30kVA / 150kWh per  + 90×440W Panels per system design",
    shortTitle:
      "NACA Headquarters – System Overhaul = 30kVA / 150kWh per  + 90×440W Panels per system design",
    category: "Completed",
    location: "NACA Headquarters, Abuja, Nigeria",
    capacity: "30kVA Inverter System / 150kWh Lithium Battery Bank (Per Phase)",
    panels: "90 × 440W Monocrystalline Solar Panels (Per System Design)",
    imageUrl:
      "https://framerusercontent.com/images/Sp6K5CQBjMLpUy8FDCjH6bqF4k.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/Sp6K5CQBjMLpUy8FDCjH6bqF4k.png?width=3906&height=1656",
      "https://framerusercontent.com/images/EXCRnZqS5vjWrfe5Td4tp0W0KM.jpg?width=3580&height=2014",
      "https://framerusercontent.com/images/Y3j8zNOm4nfoGxKBpqE07Vb5Nq8.png?width=4032&height=2268",
      "https://framerusercontent.com/images/P4Zw0jXn2FrApnGeMrSatZeSEPc.png?width=4096&height=2304",
      "https://framerusercontent.com/images/9U0RV4PI8oglCnV4u5NLQd7ybU.png?width=4096&height=2304",
    ],
    galleryImages: [
      "https://framerusercontent.com/images/EXCRnZqS5vjWrfe5Td4tp0W0KM.jpg?width=3580&height=2014",
      "https://framerusercontent.com/images/Y3j8zNOm4nfoGxKBpqE07Vb5Nq8.png?width=4032&height=2268",
      "https://framerusercontent.com/images/P4Zw0jXn2FrApnGeMrSatZeSEPc.png?width=4096&height=2304",
      "https://framerusercontent.com/images/9U0RV4PI8oglCnV4u5NLQd7ybU.png?width=4096&height=2304",
      "https://framerusercontent.com/images/cZDf2guX31QP3GfZxLvShnzGxwk.jpg?width=3580&height=2014",
      "https://framerusercontent.com/images/sP2hoh0nwA36XvBioDrY5MDpFI.png?width=4032&height=2268",
      "https://framerusercontent.com/images/g8xmMiR01Ay441WhMmGWX2D4jU.png?width=2444&height=2208",
      "https://framerusercontent.com/images/LyQItTyVKaZ2rEqNlufBHms8.png?width=2444&height=2208",
    ],
    clientType: "Federal Government Agency Headquarters (NACA)",
    commissionedYear: "2024",
    summary:
      "Recently one of our most structured and technically intensive projects was executed for the National Agency for the Control of AIDS (NACA). Pet-Feb was contracted to overhaul their ageing inverter and solar infrastructure and replace it with a more robust, efficient, and future-ready system—delivered in two major phases.",
    challenge:
      "Recently one of our most structured and technically intensive projects was executed for the National Agency for the Control of AIDS (NACA). Pet-Feb was contracted to overhaul their ageing inverter and solar infrastructure and replace it with a more robust, efficient, and future-ready system—delivered in two major phases.",
    solution:
      "The final outcome is a modernized, high-performance clean-energy system capable of supporting NACA’s mission-critical operations without compromise. Our team carried out the upgrade while maintaining strict adherence to industry standards, safety protocols, and best practices.",
    impact:
      "Zero disruption to ongoing agency operations. A seamless transition from the old system to the new design. Increased energy efficiency, improved battery life cycles, and better load management.",
    highlights: [
      "A 30kVA inverter system per phase design.",
      "A 150kWh lithium battery bank per phase design.",
      "90 units of 440W monocrystalline solar panels per system design.",
      "Zero disruption to ongoing agency operations.",
      "A seamless transition from the old system to the new design.",
      "Increased energy efficiency, improved battery life cycles, and better load management.",
    ],
    sections: [
      {
        paragraphs: [
          "Recently one of our most structured and technically intensive projects was executed for the National Agency for the Control of AIDS (NACA). Pet-Feb was contracted to overhaul their ageing inverter and solar infrastructure and replace it with a more robust, efficient, and future-ready system—delivered in two major phases.",
          "The final outcome is a modernized, high-performance clean-energy system capable of supporting NACA’s mission-critical operations without compromise.",
        ],
      },
      {
        heading: "Each phase included:",
        paragraphs: [],
        bullets: [
          "A 30kVA inverter system",
          "A 150kWh lithium battery bank",
          "90 units of 440W monocrystalline solar panels",
        ],
        closingParagraphs: [
          "Our team carried out the upgrade while maintaining strict adherence to industry standards, safety protocols, and best practices. This ensured:",
        ],
      },
      {
        paragraphs: [],
        bullets: [
          "Zero disruption to ongoing agency operations.",
          "A seamless transition from the old system to the new design.",
          "Increased energy efficiency, improved battery life cycles, and better load management.",
        ],
      },
    ],
    specs: {
      inverter: "30kVA Commercial Hybrid Inverter System (Per Phase)",
      battery: "150kWh High-Capacity Lithium Battery Bank (Per Phase)",
      pvArray: "90 × 440W Monocrystalline Solar Panels (39.6kWp Per System Design)",
      transferTime: "< 10ms Zero-Disruption Automatic Changeover",
      systemType: "Two-Phase Institutional Solar & Inverter Infrastructure Overhaul",
      monitoring: "Smart Load Management, Battery Life-Cycle Optimization & BMS Telemetry",
    },
  },
  {
    id: "proj-renewable-energy-leaders",
    slug: "empowering-next-generation-renewable-energy-leaders",
    title: "Empowering the Next Generation of Renewable Energy Leaders",
    shortTitle: "Empowering the Next Generation of Renewable Energy Leaders",
    category: "Completed",
    location: "Ogun State, Lagos State & Delta State, Nigeria",
    capacity: "Redeemer’s University SPVI, FCNL Lagos & GreenGlow Trainings",
    panels: "Practical Solar PV Design, Installation & Certification Programs",
    imageUrl:
      "https://framerusercontent.com/images/3nbXbY6KeeNsRkGhg0TmSY1jlU.png?width=3906&height=1656",
    heroImages: [
      "https://framerusercontent.com/images/3nbXbY6KeeNsRkGhg0TmSY1jlU.png?width=3906&height=1656",
      "https://framerusercontent.com/images/h86onno5G4w20Bz4ZvuI3lx6wc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/50LeTCmNyusbHkKeDFtzG7XcuI0.png?width=2444&height=2208",
      "https://framerusercontent.com/images/PXPvctgeOBcvjTLSSmtT4eTPPQ.png?width=2444&height=2208",
      "https://framerusercontent.com/images/FP7ja1h0VLTzFfZ97toJtQWCor0.jpg?width=4096&height=3072",
    ],
    galleryImages: [
      "https://framerusercontent.com/images/h86onno5G4w20Bz4ZvuI3lx6wc.png?width=2444&height=2208",
      "https://framerusercontent.com/images/50LeTCmNyusbHkKeDFtzG7XcuI0.png?width=2444&height=2208",
      "https://framerusercontent.com/images/PXPvctgeOBcvjTLSSmtT4eTPPQ.png?width=2444&height=2208",
      "https://framerusercontent.com/images/tkYly0VK7yic5o0wRE5pxG9XA.png?width=2444&height=2208",
      "https://framerusercontent.com/images/FP7ja1h0VLTzFfZ97toJtQWCor0.jpg?width=4096&height=3072",
      "https://framerusercontent.com/images/owOVR3I6QOUfgGPgm9H2vBsSIM.jpg?width=4096&height=3072",
      "https://framerusercontent.com/images/e3eGfEUVO6aLr7qnwqjsp9COR8.jpg?width=4096&height=3072",
      "https://framerusercontent.com/images/BiHu4tz5BADxNiduHdiS8QXGM.jpg?width=1000&height=667",
      "https://framerusercontent.com/images/F3sgiS455mpoNTuVviHLoihzCdg.jpg?width=1000&height=667",
      "https://framerusercontent.com/images/1ovlJO0w5PF1AizRcgAGbctg.jpg?width=1000&height=667",
    ],
    clientType: "Universities, Technical Institutes & Secondary Schools",
    commissionedYear: "2022 – 2024",
    summary:
      "At PET-FEB Solar, youth development is not a side project it is a core mission. As the world accelerates toward clean energy, PET-FEB continues to invest in training, mentorship, and real-world exposure that prepares young Nigerians, especially young women, to participate meaningfully in the renewable energy industry.",
    challenge:
      "At PET-FEB Solar, youth development is not a side project it is a core mission. As the world accelerates toward clean energy, PET-FEB continues to invest in training, mentorship, and real-world exposure that prepares young Nigerians, especially young women, to participate meaningfully in the renewable energy industry.",
    solution:
      "A major highlight of PET-FEB’s impact was the Solar PV Installation (SPVI) training and workshop conducted in collaboration with Redeemer’s University, Ogun State, in May 2022. With full consent and support from the institution, the program empowered students with practical skills in system design, installation, and safety best practices.",
    impact:
      "The initiative strengthened awareness on why mastering renewable-energy-driven solutions is essential for Nigeria’s future energy stability and economic growth.",
    highlights: [
      "Solar PV Installation (SPVI) training and workshop conducted in collaboration with Redeemer’s University, Ogun State (May 2022).",
      "Intensive three-week hands-on training program at the FCNL Training Institute in Lagos State with full participant certification.",
      "GreenGlow Initiative practical renewable-energy training for students of Federal Government Girls College, Ibusa, Delta State (June 2024).",
      "Empowers the girl child early to understand the value of entrepreneurship, technical competence, and participation in STEM-driven industries.",
    ],
    sections: [
      {
        paragraphs: [
          "At PET-FEB Solar, youth development is not a side project it is a core mission. As the world accelerates toward clean energy, PET-FEB continues to invest in training, mentorship, and real-world exposure that prepares young Nigerians, especially young women, to participate meaningfully in the renewable energy industry.",
        ],
      },
      {
        heading: "Building Capacity Through Strategic Partnerships",
        paragraphs: [
          "A major highlight of PET-FEB’s impact was the Solar PV Installation (SPVI) training and workshop conducted in collaboration with Redeemer’s University, Ogun State, in May 2022. With full consent and support from the institution, the program empowered students with practical skills in system design, installation, and safety best practices.",
          "The initiative strengthened awareness on why mastering renewable-energy-driven solutions is essential for Nigeria’s future energy stability and economic growth.",
        ],
      },
      {
        heading: "Strengthening Youth Skills Through Industry Collaboration",
        paragraphs: [
          "PET-FEB has continued to deepen its commitment by partnering with key industry stakeholders such as Facility Control Nigeria Limited (FCNL). Together, we executed an intensive three-week hands-on training program at the FCNL Training Institute in Lagos State.",
          "Participants were fully certified at the end of the program, equipping them with employable skills and the confidence to build careers in the solar and energy-efficiency space.",
        ],
      },
      {
        heading: "Championing the Girl Child Through the GreenGlow Initiative",
        paragraphs: [
          "In June 2024, PET-FEB expanded its youth empowerment vision through the GreenGlow Initiative, hosting a practical renewable-energy training for students of Federal Government Girls College, Ibusa, in Delta State.",
          "This project was designed to inspire and empower the girl child early — helping them understand the value of entrepreneurship, technical competence, and participation in STEM-driven industries.",
          "By introducing these skills at a foundational stage, PET-FEB aims to cultivate a new generation of female innovators who can compete and lead in the renewable energy sector.",
        ],
      },
    ],
    specs: {
      inverter: "Practical Hybrid Inverter Wiring, Sizing & Protection Workbenches",
      battery: "Lithium & Deep-Cycle Battery Bank Configuration & Safety Modules",
      pvArray: "Solar PV Array Design, Mounting, Stringing & Commissioning Labs",
      transferTime: "Certified Hands-On Workshops (1-Week to 3-Week Intensive Tracks)",
      systemType: "University, Industry & STEM Youth Capacity-Building Program",
      monitoring: "Practical Assessment, Safety Auditing & Full Participant Certification",
    },
  },
];

export function getAllProjects(): ProjectDetail[] {
  return PROJECTS_DATA;
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS_DATA.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase()
  );
}

export function getRelatedProjects(currentSlug: string, limit = 2): ProjectDetail[] {
  return PROJECTS_DATA.filter(
    (p) => p.slug.toLowerCase() !== currentSlug.toLowerCase() && p.id.toLowerCase() !== currentSlug.toLowerCase()
  ).slice(0, limit);
}
