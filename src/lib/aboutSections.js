const POLICY_BASE = '/Policy-20261012T061849Z-1-001/Policy'

export const CORE_VALUES = [
  {
    title: 'Safety First',
    detail: 'Every system is engineered to protect operators, assets, and the environment — closed-loop transfer, fail-safe joints, and rigorous testing before dispatch.',
  },
  {
    title: 'Engineering Integrity',
    detail: 'ISO-aligned design and manufacturing processes with traceable materials, controlled welding, and documented quality gates at every stage.',
  },
  {
    title: 'Customer Partnership',
    detail: 'We listen first, engineer to site realities, and support clients from enquiry through installation, commissioning, and after-sales service.',
  },
  {
    title: 'Continuous Improvement',
    detail: 'Ongoing investment in people, process, and plant — from passivation and paint booths to inspection equipment and skilled craftsmanship.',
  },
  {
    title: 'Reliability & Delivery',
    detail: 'On-time delivery with competitive pricing, backed by NSIC registration and a track record across domestic and export projects.',
  },
  {
    title: 'Ethical Business',
    detail: 'Transparent dealings with customers, vendors, and employees — building long-term trust in oil, gas, chemical, and terminal markets.',
  },
]

export const TESTING_FACILITIES = [
  {
    title: 'Hydrostatic & pneumatic testing',
    detail: 'Pressure proving of arms, tanks, and vessels to specified design and test pressures with calibrated gauges.',
  },
  {
    title: 'Dimensional & assembly inspection',
    detail: 'Fit-up, alignment, reach envelope, and swivel torque checks before final acceptance.',
  },
  {
    title: 'Material & weld quality checks',
    detail: 'Incoming material verification, WPS/PQR controlled welding, and visual / NDT as applicable to the order.',
  },
  {
    title: 'Functional cycle testing',
    detail: 'Articulation, counterbalance, dry-break coupler, and vapour recovery function trials on finished assemblies.',
  },
  {
    title: 'Documentation pack',
    detail: 'ITP, material certificates, test reports, and as-built drawings issued with each major supply.',
  },
  {
    title: 'Dedicated test setups',
    detail: 'In-house capability to validate loading / unloading configurations and specialised Test Aider systems.',
  },
]

export const COMPANY_FACILITIES = [
  {
    id: 'hadapsar-main',
    image: '/facilities/facility-hadapsar-main.jpg',
    area: '22,186 Sq. Ft.',
    address:
      'PLOT NO. 35, 36, 37, SWAMI VIVEKANAND CO-OP INDUSTRIAL ESTATE, HANDEWADI RD. SATAV NAGAR, HADAPSAR, PUNE: 411048.',
  },
  {
    id: 'hadapsar-plot32',
    image: '/facilities/facility-hadapsar-plot32.jpg',
    area: '6,620 Sq. Ft.',
    address:
      'PLOT NO. 32, SWAMI VIVEKANAND CO-OP INDUSTRIAL ESTATE, HANDEWADI RD. SATAV NAGAR, HADAPSAR, PUNE: 411048.',
  },
  {
    id: 'jejuri',
    image: '/facilities/facility-jejuri.jpg',
    area: '22,000 Sq. Ft.',
    address: 'A-15, MIDC JEJURI-412302, DIST. PUNE, MAHARASHTRA.',
  },
]

/** Surface prep & finishing — photo cards (drop real process shots into /public/process/). */
export const PROCESS_CAPABILITIES = [
  {
    id: 'blasting',
    title: 'Blasting',
    detail:
      'In-house abrasive blasting for surface preparation — cleaner substrate, better coating adhesion and consistent finish quality.',
    image: '/process/blasting.jpg',
  },
  {
    id: 'pickling',
    title: 'Pickling',
    detail:
      'Chemical pickling to remove scale, oxides and weld discoloration from stainless and carbon steel fabrications.',
    image: '/process/pickling.jpg',
  },
  {
    id: 'passivation',
    title: 'Passivation',
    detail:
      'In-house passivation of stainless assemblies to restore the protective chromium oxide layer where specifications require it.',
    image: '/process/passivation.jpg',
  },
]

export const INFRASTRUCTURE_ITEMS = [
  {
    title: 'Paint booth & painting room',
    detail: 'Dedicated finishing environment for protective and customer-specified paint systems.',
  },
  {
    title: 'Engineering & QC desk',
    detail: 'Design, detailing, and quality documentation coordinated under ISO 9001:2015 systems.',
  },
]

export const POLICY_TABS = [
  {
    id: 'company',
    label: 'Company policy',
    title: 'Company Policy',
    body: [
      'We conduct business with integrity, fairness, and accountability toward customers, employees, vendors, and the community.',
      'We comply with applicable statutory and regulatory requirements and maintain ethical practices across procurement, manufacturing, and sales.',
      'We invest in people, skills, and safe workplaces so every stakeholder benefits from sustainable growth.',
    ],
    image: `${POLICY_BASE}/HR Policy.png`,
    imageFormat: 'image',
  },
  {
    id: 'quality',
    label: 'Quality policy',
    title: 'Quality Policy',
    body: [
      'We are committed to enhancing customer satisfaction by manufacturing, supplying, and servicing products that meet quality, delivery, and competitive-price expectations.',
      'We remain sensitive to customer needs and strive to exceed expectations through trained, motivated teams and continual improvement of our QMS.',
      'All work processes are executed safely, without harm to personnel or property, while maintaining mutually beneficial partner relationships.',
    ],
    image: `${POLICY_BASE}/Quality Policy.png`,
    imageFormat: 'image',
  },
  {
    id: 'ehs',
    label: 'Safety policy — EHS',
    title: 'Safety Policy (EHS)',
    body: [
      'Environment, Health & Safety are integral to every design and shop-floor activity at SEPL.',
      'We aim to prevent incidents through safe work methods, PPE discipline, and equipment that reduces operator exposure during fluid transfer.',
      'Visitor and workplace safety procedures are enforced across our facilities; continuous awareness keeps EHS culture alive.',
    ],
    image: `${POLICY_BASE}/EHS Policy.pdf`,
    imageFormat: 'pdf',
    previewImage: `${POLICY_BASE}/Visitor Safety Policy.png`,
  },
  {
    id: 'vision',
    label: 'Vision & mission',
    title: 'Vision & Mission',
    body: [
      'Vision — To be a trusted global partner for safe, efficient, and environment-friendly fluid transfer systems.',
      'Mission — Design and manufacture loading / unloading solutions that eliminate hoses, cut spillage, and protect people and the planet.',
      'Core values — Safety, integrity, craftsmanship, customer focus, and continuous improvement guide every project we execute.',
    ],
    image: `${POLICY_BASE}/Vision-Mission-Core Value.png`,
    imageFormat: 'image',
  },
  {
    id: 'success',
    label: 'Success stories',
    title: 'Success Stories',
    body: [
      'Decades of supply to oil, gas, chemical, and terminal operators — from standard loading arms to specialised Test Aiders up to large NB sizes.',
      'Export credentials and NSIC registration support delivery into demanding domestic and international projects.',
      'Repeat orders and long-term relationships reflect systems that perform reliably in continuous industrial duty.',
    ],
    stories: [
      {
        title: 'Terminal loading systems',
        detail: 'Top and bottom loading arms engineered for tanker and rail terminals with vapour recovery options.',
      },
      {
        title: 'Chemical & corrosive duty',
        detail: 'PTFE-lined and specialty-material arms for aggressive chemicals where standard metallurgy is not enough.',
      },
      {
        title: 'Pump & prover testing',
        detail: 'Heavy-duty Test Aider configurations supporting high-capacity industrial pump and flow-proving applications.',
      },
    ],
  },
]

export const TIMELINE = [
  {
    year: '1995',
    title: 'Company incorporated',
    detail: 'Steelfab Engineering Pvt. Ltd. formed (Cert. No. 11-85768, 21.02.1995) — foundation of our fluid-handling journey.',
    image: '/product-images/loading-arm-desktop.png',
  },
  {
    year: '2000s',
    title: 'Product range expansion',
    detail: 'Loading / unloading arms, swivel joints, floating suction, prover tanks, and seal-support systems established as core offerings.',
    image: '/product-images/swivel-joint-desktop.png',
  },
  {
    year: 'ISO era',
    title: 'Quality systems strengthened',
    detail: 'ISO 9001 certification journey and NSIC registration reinforcing design, manufacture, and supply discipline.',
    image: '/product-images/prover-tank-desktop.png',
  },
  {
    year: 'Capacity growth',
    title: 'Dual-plant footprint',
    detail: 'Hadapsar and Jejuri facilities expanded covered and open areas to support larger project execution.',
    image: '/facilities/facility-hadapsar-main.jpg',
  },
  {
    year: 'Today',
    title: 'Infrastructure & exports',
    detail: 'In-house blasting, paint booth, passivation, and continued supply to domestic majors and export markets.',
    image: '/product-images/api-plan-desktop.jpeg',
  },
]
