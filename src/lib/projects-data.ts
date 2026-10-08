export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  capacity: string;
  panels: string;
  imageUrl: string;
  summary: string;
  clientType: string;
  commissionedYear: string;
  challenge: string;
  solution: string;
  impact: string;
  highlights: string[];
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
    id: "proj-light-up-umueri",
    slug: "light-up-umueri",
    title: '"Light Up Umueri" — A Journey to Power Up Lives Through Renewable Energy',
    category: "Community Impact",
    location: "Anambra State, Nigeria",
    capacity: "Community Solar Electrification Array",
    panels: "High-Efficiency Monocrystalline Arrays (12kWp)",
    imageUrl: "/api/websitepic/community",
    clientType: "Community & Public Infrastructure",
    commissionedYear: "2024",
    summary:
      "A flagship community renewable project delivering clean, dependable solar power to public centers, medical outposts, and residential clusters, dramatically reducing kerosene and petrol generator reliance.",
    challenge:
      "The Umueri community experienced severe national grid instability, frequently lasting weeks without electrical power. The local healthcare clinic struggled to refrigerate essential vaccines and emergency medical supplies, while public lighting and water boreholes depended entirely on noisy, expensive petrol generators.",
    solution:
      "Pet-Feb engineers performed a thorough community load profile audit and designed a centralized solar microgrid array coupled with high-capacity lithium iron phosphate (LiFePO4) storage. The installation was hardened with industrial copper earth rods and surge arrestors to withstand coastal thunderstorm strikes.",
    impact:
      "Successfully restored 24/7 power to primary health facilities, powered night-time illumination across communal gathering centers, and eliminated over 14,000 litres of toxic generator fuel consumption each year.",
    highlights: [
      "Powering critical healthcare clinic, cold chain vaccine storage, and community water supply",
      "Eliminating noxious exhaust fumes and reducing household energy costs by over 80%",
      "Engineered, commissioned, and maintained directly by Pet-Feb field technicians",
      "Comprehensive community training on routine maintenance and basic safety checks",
    ],
    specs: {
      inverter: "15kVA Commercial Low-Frequency Hybrid Pure Sine Wave Inverter",
      battery: "30kWh High-Cycle Lithium Iron Phosphate (LiFePO4) Battery Bank",
      pvArray: "24 x 500W High-Efficiency Monocrystalline Photovoltaic Panels (12kWp)",
      transferTime: "< 10ms Seamless Automatic Changeover",
      systemType: "Centralized Community Hybrid Solar Microgrid",
      monitoring: "Remote GSM Telemetry & On-Site Engineering Status Display",
    },
  },
  {
    id: "proj-china-training",
    slug: "building-global-capacity",
    title: "Building Global Capacity: International Partnership & Staff Training Program",
    category: "Global Capacity",
    location: "International Technology Collaboration & Nigeria",
    capacity: "Global Manufacturing Standards Transfer",
    panels: "Tier-1 Hybrid Inverter & LiFePO4 Battery Systems",
    imageUrl: "/api/websitepic/commercial",
    clientType: "Engineering Capacity & Technology Transfer",
    commissionedYear: "2025",
    summary:
      "A landmark technical initiative empowering our engineering staff with international training, factory quality inspections, and global best practices to introduce resilient solar equipment tailored for the Nigerian climate.",
    challenge:
      "Bridging the technology gap between international tier-1 solar manufacturers and local installation standards in West Africa required firsthand knowledge of modern inverter topologies, battery management systems (BMS), and manufacturing defect detection.",
    solution:
      "Pet-Feb dispatched senior electrical engineers and operations management to global manufacturing lines for deep-dive technical sessions. The team mastered high-voltage lithium architecture, string inverter optimization, and tailored component selection for high ambient Nigerian temperatures.",
    impact:
      "Direct technical knowledge transfer resulted in enhanced installation benchmarks, lower warranty claim rates, and the introduction of climate-hardened solar kits across Nigeria.",
    highlights: [
      "Advanced hands-on training on modern hybrid inverter topology and lithium BMS communication",
      "Direct technical knowledge exchange on manufacturing quality control and component auditing",
      "Enhanced system installation protocols and long-term preventive maintenance standards",
      "Establishment of localized technical testing benches at Pet-Feb hubs",
    ],
    specs: {
      inverter: "Multi-Topology Hybrid Inverter Standards (5kVA to 30kVA)",
      battery: "Rack-Mounted Lithium Iron Phosphate Systems with Active BMS Balancing",
      pvArray: "Bifacial & Monocrystalline High-Voltage Modules (450W - 650W)",
      transferTime: "Zero-Crossing Sub-8ms UPS Switching",
      systemType: "Technology Transfer & Engineering Certification",
      monitoring: "Cloud IoT Telemetry, Protocol Analyzers, & Firmware Diagnostic Tools",
    },
  },
  {
    id: "proj-commercial-lagos",
    slug: "commercial-hybrid-lagos",
    title: "10kVA Commercial Hybrid Solar Installation",
    category: "Commercial",
    location: "Victoria Island, Lagos",
    capacity: "10kVA Pure Sine Wave Inverter / 15kWh Lithium Storage",
    panels: "16 x 450W Monocrystalline Panels (7.2kWp)",
    imageUrl: "/api/websitepic/blog",
    clientType: "Corporate Office & Commercial Enterprise",
    commissionedYear: "2025",
    summary:
      "Engineered continuous power backup for an administrative commercial office, ensuring zero-downtime operation for workstations, air conditioning, and IT server infrastructure.",
    challenge:
      "Frequent grid fluctuations and sudden blackouts in Victoria Island disrupted daily office workflow, corrupted sensitive server databases, and drove monthly diesel expenditure beyond ₦1.8 million.",
    solution:
      "Designed and deployed a 10kVA pure sine wave hybrid inverter system with 15kWh of lithium storage. Implemented dual MPPT string arrays on the office roof with neat aluminium rail mountings and dedicated circuit breaker panels.",
    impact:
      "Decreased commercial diesel reliance by over 78%, eliminated workstation shutdown interruptions, and paid back upfront capital investment within 14 months of operation.",
    highlights: [
      "Zero-second automatic transfer switchgear protecting critical IT servers and network equipment",
      "Surge suppression and dedicated clean-earth bonding preventing harmonic electrical noise",
      "Over 78% reduction in monthly corporate diesel fuel costs",
      "Quiet operation allowing peaceful workplace environments during business hours",
    ],
    specs: {
      inverter: "10kVA Pure Sine Wave Industrial Low-Frequency Hybrid Inverter",
      battery: "15kWh Wall-Mounted Lithium (LiFePO4) Battery with Smart BMS",
      pvArray: "16 x 450W High-Efficiency Monocrystalline Panels (7.2kWp)",
      transferTime: "< 5ms (Server & Workstation UPS Grade)",
      systemType: "Commercial Rooftop Hybrid Solar System",
      monitoring: "Real-time Mobile App & Desktop Energy Consumption Dashboard",
    },
  },
  {
    id: "proj-ph-coldchain",
    slug: "agro-coldchain-ph",
    title: "15kVA Agro-Processing & Cold-Storage Solar Array",
    category: "Commercial",
    location: "Port Harcourt, Rivers State",
    capacity: "15kVA Industrial Hybrid / 30kWh Lithium Bank",
    panels: "24 x 500W High-Voltage PV Arrays (12kWp)",
    imageUrl: "/api/websitepic/commercial",
    clientType: "Agro-Processing & Cold Chain Logistics",
    commissionedYear: "2024",
    summary:
      "Dedicated off-grid solar installation designed for heavy continuous duty, running cold storage refrigeration and processing motors for agricultural distribution.",
    challenge:
      "High ambient coastal humidity combined with erratic power grid supply caused frequent cold storage compressor failures and high product spoilage rates in fresh produce distribution.",
    solution:
      "Installed a heavy-duty 15kVA hybrid solar system engineered with soft-start inductive motor buffers, stainless marine-grade racking, and a climate-controlled lithium storage cabinet.",
    impact:
      "Achieved 100% cold-chain uptime without spoilage incidents, slashing operating overhead and guaranteeing product freshness for supermarket delivery networks.",
    highlights: [
      "Engineered specifically for high-humidity Niger Delta coastal climate conditions",
      "Heavy inductive motor soft-start protection preventing compressor startup trip-outs",
      "24/7 continuous operation without relying on volatile local grid supplies",
      "Corrosion-resistant aluminium and stainless steel mounting structure",
    ],
    specs: {
      inverter: "15kVA Three-Phase / Split-Phase Heavy Duty Hybrid Inverter",
      battery: "30kWh Industrial Lithium Iron Phosphate (LiFePO4) Cabinet",
      pvArray: "24 x 500W High-Voltage Monocrystalline PV Arrays (12kWp)",
      transferTime: "< 10ms Industrial Transfer Switch",
      systemType: "Industrial Cold-Storage Renewable Microgrid",
      monitoring: "Cellular 4G IoT Telemetry with Automated Temperature & Voltage Alerts",
    },
  },
  {
    id: "proj-abuja-residence",
    slug: "smart-whole-home-abuja",
    title: "5kVA Smart Whole-Home Solar Backup",
    category: "Residential",
    location: "Maitama / Wuse 2, Abuja",
    capacity: "5kVA Inverter / 10kWh Battery Bank",
    panels: "10 x 400W High-Efficiency Panels (4kWp)",
    imageUrl: "/api/websitepic/residential",
    clientType: "Residential Private Estate",
    commissionedYear: "2025",
    summary:
      "Whole-home solar backup powering deep freezers, refrigeration, borehole pumping machines, security lighting, and smart home appliances with whisper-quiet operation.",
    challenge:
      "The homeowner desired uninterrupted electrical power for security cameras, air conditioning, and kitchen appliances without bearing the noise, diesel fumes, and maintenance hassle of a 7kVA generator.",
    solution:
      "Supplied and installed a 5kVA pure sine wave hybrid inverter with 10kWh lithium battery storage and 4kWp roof-mounted monocrystalline solar panels. Integrated seamlessly with the main consumer unit.",
    impact:
      "Delivered 24/7 quiet power throughout the year, eliminated nighttime generator disturbance, and reduced residential electricity utility expenditures by 85%.",
    highlights: [
      "Neat surface conduit cabling and flush distribution board integration",
      "Remote mobile monitoring of daily kilowatt-hour generation and household consumption",
      "Extended battery life with intelligent MPPT regulation and thermal protection",
      "Silent automatic changeover during sudden public utility blackouts",
    ],
    specs: {
      inverter: "5kVA Pure Sine Wave Intelligent Hybrid Inverter",
      battery: "10kWh 51.2V LiFePO4 Lithium Battery with Integrated Smart Screen",
      pvArray: "10 x 400W Tier-1 Monocrystalline Solar Panels (4kWp)",
      transferTime: "< 8ms Instantaneous UPS Transfer",
      systemType: "Residential Smart Hybrid Solar System",
      monitoring: "Wi-Fi Smartphone App with Solar Yield & Battery State-of-Charge Monitoring",
    },
  },
  {
    id: "proj-starter-ibadan",
    slug: "compact-starter-ibadan",
    title: "1kVA Compact Starter Solar Solution",
    category: "Residential",
    location: "Ibadan, Oyo State",
    capacity: "1kVA Inverter / 1 x 100Ah Deep-Cycle Battery",
    panels: "2 x 200W Monocrystalline Panels (400Wp)",
    imageUrl: "/api/websitepic/battery",
    clientType: "Residential Apartment & Home Office",
    commissionedYear: "2025",
    summary:
      "Compact starter system delivering uninterrupted power for interior lighting, device charging hubs, ventilation fans, and television for modern apartments.",
    challenge:
      "Remote workers and small households faced constant disruptions during work hours due to erratic neighborhood load-shedding and high fuel costs for small portable generators.",
    solution:
      "Configured a plug-and-play 1kVA solar starter kit featuring dual 200W panels, a pure sine wave inverter, and durable deep-cycle storage with built-in breaker protection.",
    impact:
      "Provided uninterrupted connectivity for laptops, Wi-Fi routers, fans, and entertainment setups, liberating the household from daily fuel queues and generator fumes.",
    highlights: [
      "Plug-and-play installation with integrated breaker protection and easy relocation",
      "Affordable entry point into clean renewable power for apartments and small businesses",
      "Upgradable battery and panel expansion slots for future power demand increases",
      "Compact indoor footprint with silent cooling fans",
    ],
    specs: {
      inverter: "1kVA / 1000W Pure Sine Wave Compact Inverter",
      battery: "1 x 100Ah High-Efficiency Deep-Cycle Storage Unit",
      pvArray: "2 x 200W Monocrystalline Solar Panels (400Wp)",
      transferTime: "< 15ms Automatic Changeover",
      systemType: "Compact Residential Starter Solar Kit",
      monitoring: "Integrated LED Status Screen (Battery %, Load Wattage, Voltage)",
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
