'use client'

import { useEffect, useMemo, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { fetchProductBySlug } from '@/lib/api'
import { findStaticProduct, mapApiProductToDetail, normalizeProduct } from '@/lib/products'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Factory,
  Droplets,
  Settings,
  Building2,
  Wrench,
  BadgeCheck,
} from 'lucide-react'

const productDetails = {
  'loading-arms': {
    title: 'Loading Arm Systems',
    subtitle:
      'We are leading Manufacturer, Supplier, Exporter of Loading Arm Systems for industrial applications from Pune, Maharashtra, India.',
    heroImage: '/product-images/loading-arm-desktop.png',
    gallery: ['/product-images/loading-arm-desktop.png', '/product-images/gallery/loading-arms-alt-desktop.png', '/product-images/gallery/loading-arms-alt2-desktop.png', '/product-images/gallery/test-aider-16-desktop.png'],
    intro: [
      "Steelfab's engineered loading arm systems are fast, easy, and reliable for transferring petroleum products, asphalt, LPG, ammonia, solvents, acids, alkalies, hazardous corrosive liquids, milk, and edible oils.",
      'The system eliminates expensive and clumsy hose pipe operations while reducing labor cost, improving operator safety, and delivering user-friendly handling.',
      'Every system is equipped with a fully adjustable balancing mechanism and smooth, torque-free 360-degree swiveling to avoid operational fatigue.',
    ],
    highlights: [
      { label: 'Operational Mode', value: 'Fast, Easy & Reliable' },
      { label: 'Rotation Capability', value: 'Smooth 360° Swiveling' },
      { label: 'Balancing Options', value: 'Spring Box / Counter Weight' },
      { label: 'Designed For', value: 'Hazardous + Critical Fluids' },
    ],
    features: [
      'Simple trouble-free operations',
      'Reduced labour cost',
      'No spillage, hence zero wastage',
      'Available in various materials and sizes',
      'Pantograph and cantilever style options',
      'Repairable in the field',
      'Safe handling of hazardous liquids',
      'Environment-friendly operations',
      'No recurring hose-pipe replacement cost',
    ],
    applications: [
      'Oil Terminals / Depots',
      'Tank Farms',
      'Petrochemical / Chemical Complexes',
      'Refineries',
      'Edible Oil Plants',
      'Fertilizer Plants',
      'Milk dairies and allied process plants',
    ],
    specifications: [
      'Materials of Construction: Carbon Steel, Aluminum, SS 316, SS 316L, SS 304 / SS304L, PTFE lined, or as per compatibility',
      'Elastomers: Nitrile, Neoprene, Viton, PTFE, EPDM, or as per compatibility',
      'Optional Accessories: Ball Valve, Drain Valve, Vacuum Breaker, Vapour Recovery System, Bellows Assembly, QRC, working position lock, overfill protection and sensing device',
      'Sizes: 1", 1.5", 2", 2.5", 3", 4", 6" and custom sizes as required',
      'Balancing: Spring Box or Counter Weight',
    ],
    clients: [
      'HPCL (Hindustan Petroleum Corporation Limited)',
      'BPCL (Bharat Petroleum Corporation Limited)',
      'IOCL (Indian Oil Corporation Limited)',
      'CPCL (Chennai Petroleum Corporation Limited)',
      'Technip Engineering and Services',
      'Rashtriya Chemicals & Fertilizers Ltd.',
      'Deepak Fertilizers & Petrochemicals Corporation Ltd.',
      'S. Mark Group',
      'Gulf Petrochem India Pvt Ltd',
      'Gilbarco Veeder Root Pvt Ltd',
      'Vermont Technologies Pvt Ltd',
      'Honeywell Automation India Ltd',
      'Mahathi Infra Services Pvt Ltd',
    ],
  },
  'unloading-arms': {
    title: 'Unloading Arm Systems',
    subtitle:
      'Engineered bottom unloading arm systems for safe, fast and controlled transfer operations at depots, terminals and process plants.',
    heroImage: '/product-images/gallery/loading-arms-alt-desktop.png',
    gallery: ['/product-images/gallery/loading-arms-alt-desktop.png', '/product-images/gallery/loading-arms-alt2-desktop.png', '/product-images/loading-arm-desktop.png', '/product-images/swivel-joint-desktop.png'],
    intro: [
      'SEPL unloading arm systems are designed to reduce turnaround time while improving operator safety and environmental compliance.',
      'The system provides controlled, leak-resistant product transfer for petroleum, solvents, chemicals and other process fluids.',
      'Heavy-duty construction with smooth articulation helps reduce operator fatigue and enables long life under field conditions.',
    ],
    highlights: [
      { label: 'Flow Direction', value: 'Bottom / Controlled Unloading' },
      { label: 'Safety Focus', value: 'Reduced Spill & Vapour Exposure' },
      { label: 'Operation', value: 'Manual / Assisted Options' },
      { label: 'Industry Fit', value: 'Terminal & Depot Ready' },
    ],
    features: [
      'Quick and ergonomic tanker connection interface',
      'Smooth articulation with low operating torque',
      'Suitable for hazardous and corrosive service media',
      'Low maintenance design for continuous operations',
      'Available with dry-break and safety interlock options',
      'Reduced product loss and cleaner unloading operations',
      'Robust balancing mechanisms for easier handling',
    ],
    applications: [
      'Road tanker unloading stations',
      'Rail wagon unloading terminals',
      'Fuel and petrochemical depots',
      'Refineries and blending plants',
      'Chemical manufacturing facilities',
      'Bulk liquid handling terminals',
    ],
    specifications: [
      'Material options: CS, SS304, SS316, SS316L, Aluminum',
      'Seal compatibility: Nitrile, Viton, PTFE, EPDM, Neoprene',
      'Size range: 2" to 6" standard, custom sizes on request',
      'Accessories: QRC, vapour return, drain valve, locking systems',
      'Balancing: spring-cylinder / spring-box / counterweight',
    ],
    clients: [
      'Public and private oil marketing companies',
      'Terminal operators and logistics integrators',
      'Petrochemical and specialty chemical plants',
      'Large process industries with bulk fluid transfer needs',
    ],
  },
  'floating-suction': {
    title: 'Floating Suction Assemblies',
    subtitle:
      'Manufacturer of floating suction assemblies for horizontal or vertical above/below-ground storage tanks where little or no contamination can be tolerated.',
    heroImage: '/product-images/floating-suction-desktop.png',
    gallery: ['/product-images/floating-suction-desktop.png', '/product-images/storage-tank-desktop.png', '/product-images/cone-storage-tank-desktop.png', '/product-images/swivel-joint-desktop.png'],
    intro: [
      'Steelfab Engineering manufactures floating suction assemblies that float near the top liquid surface and draw from near-surface, contamination-free product — since fuel near the top is least likely to contain foreign particles.',
      'All floating suctions are designed for long, trouble-free life and nearly maintenance-free operation. On-site installation and commissioning support is available.',
      'Units can be installed in fixed-roof, external floating-roof and internal floating-roof tanks, with single or double swivel-joint models sized to tank characteristics.',
    ],
    highlights: [
      { label: 'Models', value: 'Single / Double Swivel' },
      { label: 'Tank Types', value: 'Fixed · IFR · EFR' },
      { label: 'Service', value: 'Near Maintenance-Free' },
      { label: 'Support', value: 'Install & Commission' },
    ],
    features: [
      'Single or double swivel-joint floating suction according to tank size',
      'Permanently lubricated swivel joints',
      'Suitable for fixed roof, external floating roof and internal floating roof tanks',
      'Maintenance-free design with long service life',
      'Decreases maintenance of filters and separators',
      'Reliable, secure and uncontaminated product transfer',
      'Smooth, controlled operations',
    ],
    applications: [
      'Oil and gas industries',
      'Oil and petrol storage tanks',
      'Chemical industries and chemical storage tanks',
      'Food industries — oil and beverage storage',
      'Ground vertical storage tanks',
    ],
    specifications: [
      'Materials: Carbon Steel, Aluminium, SS316, SS316L, SS304, SS304L or as per compatibility',
      'Various sizes according to tank characteristics',
      'Swivel joints designed for submerged service',
      'Dual float chambers for puncture redundancy (as designed)',
      'On-site installation and commissioning assistance available',
    ],
    clients: [
      'Oil and gas storage infrastructure operators',
      'Refineries and process plants',
      'Edible oil processing companies',
      'Chemical and specialty fluid handling industries',
    ],
  },
  'prover-tanks': {
    title: 'Prover Tanks',
    subtitle:
      'Precision prover tanks under Weights & Measures certification — for calibration and verification of flow metering systems.',
    heroImage: '/product-images/prover-tank-desktop.png',
    gallery: ['/product-images/prover-tank-desktop.png', '/product-images/storage-tank-desktop.png', '/product-images/cone-storage-tank-desktop.png', '/product-images/api-plan-desktop.jpeg'],
    intro: [
      'SEPL prover tanks are built for high-accuracy calibration workflows in custody transfer and process metering applications.',
      'Manufactured and supplied under Legal Metrology / Weights & Measures certification (Manufacture, Dealer and Repair licences valid to 2035).',
      'Stationary and mobile designs for proving commercial bulk measures, vehicle tanks and bulk meters — with standards-aligned fabrication and documentation.',
    ],
    highlights: [
      { label: 'Certification', value: 'Weights & Measures' },
      { label: 'Licences', value: 'Manufacture · Dealer · Repair' },
      { label: 'Use Case', value: 'Custody Transfer Validation' },
      { label: 'Capacity', value: '50 L – 5,000 L' },
    ],
    certifications: [
      {
        title: 'Weights & Measures — Manufacture',
        detail: 'Authorised manufacture of prover tanks / measuring systems (valid to 2035).',
        href: '/download',
      },
      {
        title: 'Weights & Measures — Dealer',
        detail: 'Authorised dealing / supply under Legal Metrology (valid to 2035).',
        href: '/download',
      },
      {
        title: 'Weights & Measures — Repair',
        detail: 'Authorised repair and servicing of certified measuring equipment (valid to 2035).',
        href: '/download',
      },
    ],
    features: [
      'Weights & Measures certified manufacture, dealing and repair',
      'Designed for high repeatability in proving cycles',
      'Robust fabricated construction for field durability',
      'Fixed (T1) and mobile (T2) prover tank configurations',
      'Easy integration with metering and test setups',
      'Suitable for periodic and routine validation workflows',
    ],
    applications: [
      'Custody transfer metering stations',
      'Fuel depots and terminal operations',
      'Pipeline and transfer metering systems',
      'Checking commercial bulk measures and vehicle tanks',
    ],
    specifications: [
      'Capacity range typically 50 L to 5,000 L',
      'Material options: CS / SS grades as per service requirement',
      'Connections and nozzles defined to project standards',
      'Supplied with Weights & Measures / Legal Metrology documentation as applicable',
    ],
    clients: [
      'Oil marketing and distribution organizations',
      'Terminal automation and metering contractors',
      'Process plants with compliance-driven metering needs',
    ],
  },
  'swivel-joints': {
    title: 'Swivel Joints (All Types)',
    subtitle:
      'Forged, ASME-aligned swivel joints with smooth, torque-free rotation for transferring liquids and gases between stationary and rotating piping.',
    heroImage: '/product-images/swivel-joint-desktop.png',
    gallery: ['/product-images/swivel-joint-desktop.png', '/product-images/flange-swivel-desktop.png', '/product-images/rotary-joint-desktop.png', '/product-images/loading-arm-desktop.png'],
    intro: [
      'Swivel joints rotation is smooth and torque free — avoiding operational fatigue. They transfer liquids and gases from stationary pipe/tube to rotary pipe/tube or vice versa.',
      'SEPL manufactures all types of swivel joints for loading/unloading systems, floating suction, floating roof tankages, LPG bottling, aviation and hydraulic service.',
      'Double-race designs with primary and secondary seals prevent product entry into the bearing chamber; precision ball and groove alignment ensures trouble-free service.',
    ],
    highlights: [
      { label: 'Welding', value: '100% Penetration' },
      { label: 'Standard', value: 'ASME Aligned' },
      { label: 'Design', value: 'Double Race' },
      { label: 'Sizes', value: '3/4″ – 16″+' },
    ],
    features: [
      '100% penetration welding — meets ASME requirements',
      'Precision ball & ball groove alignment',
      'Double race design for trouble-free alignment',
      'Primary and secondary seals prevent product entry into bearing chamber',
      'Atmospheric seal keeps away dirt and contaminants',
      'Three-piece construction for easy seal replacement',
      'Hardened ball grooves with leak detection port',
      'CS, SS, aluminium and PTFE-lined options',
    ],
    applications: [
      'Floating roof tankages',
      'Petrol depots / terminals',
      'Floating suction assemblies',
      'Rotary dryers and rolling mills',
      'Loading / unloading arm systems',
      'LPG bottling plants and bowzers',
    ],
    specifications: [
      'Typical size range: 3/4" to 16" (others on request)',
      'Technics: forged construction with polished finish options',
      'Material options by fluid and operating conditions',
      'Seal/elastomer options per media compatibility',
    ],
    clients: [
      'Loading arm OEMs and terminal operators',
      'Process and petrochemical plants',
      'Engineering procurement and turnkey contractors',
    ],
  },
  'rotary-joints': {
    title: 'Rotary Joints',
    subtitle:
      'Precision rotary joints for continuous transfer of liquids and gases between stationary and rotating equipment.',
    heroImage: '/product-images/rotary-joint-desktop.png',
    gallery: ['/product-images/rotary-joint-desktop.png', '/product-images/swivel-joint-desktop.png', '/product-images/flange-swivel-desktop.png', '/product-images/api-plan-desktop.jpeg'],
    intro: [
      'SEPL rotary joints enable reliable fluid transfer where one side of the connection must rotate continuously.',
      'Designed for low operating torque, durable sealing and field-maintainable service across process and utility duties.',
    ],
    highlights: [
      { label: 'Duty', value: 'Continuous Rotation' },
      { label: 'Focus', value: 'Low Torque · Long Seal Life' },
      { label: 'Service', value: 'Field Maintainable' },
      { label: 'MOC', value: 'CS / SS / Specialty' },
    ],
    features: [
      'Low-torque rotation for continuous duty',
      'Seal and bearing packages matched to media and RPM',
      'Carbon steel, stainless and specialty material options',
      'Maintainable design for seal replacement',
      'Compatible with industrial fluid handling systems',
    ],
    applications: [
      'Process and utility rotary equipment',
      'Hydraulic and cooling circuits',
      'Transfer systems requiring rotary connection',
      'OEM and retrofit projects',
    ],
    specifications: [
      'Configured to pressure, temperature and speed requirements',
      'Material and elastomer selection per media',
      'Single and multi-passage options as ordered',
      'Documentation and testing as per project ITP',
    ],
    clients: [
      'Process plants and OEMs',
      'Terminal and utility operators',
      'Maintenance and retrofit contractors',
    ],
  },
  'spares': {
    title: 'Spares for All Products',
    subtitle:
      'OEM spare parts for loading arms, swivel / rotary joints, floating suction, prover tanks and related systems.',
    heroImage: '/product-images/test-aider-desktop.jpg',
    gallery: ['/product-images/test-aider-desktop.jpg', '/product-images/gallery/test-aider-16-desktop.png', '/product-images/gallery/test-aider-16b-desktop.png', '/product-images/gallery/test-aider-alt-desktop.jpg'],
    intro: [
      'We supply genuine spares across the full SEPL product range so your equipment stays reliable with minimal downtime.',
      'Typical parts include vacuum breakers, O-rings, balls, seals, couplers, bellows and complete rebuild kits.',
    ],
    highlights: [
      { label: 'Coverage', value: 'All Product Lines' },
      { label: 'Examples', value: 'Vacuum Breakers · O-Rings · Balls' },
      { label: 'Kits', value: 'Rebuild & Seal Sets' },
      { label: 'Support', value: 'Match to Your Equipment' },
    ],
    features: [
      'Vacuum breakers for loading / unloading systems',
      'O-rings, seals and packing sets',
      'Balls and bearing components for swivel / rotary joints',
      'Dry-break couplers, QRC and bellows assemblies',
      'Counterbalance and arm accessories',
      'Guidance from model / serial or site photos',
    ],
    applications: [
      'Planned maintenance and overhauls',
      'Emergency breakdown support',
      'Stocking recommended critical spares',
      'Retrofit and upgrade projects',
    ],
    specifications: [
      'Parts matched to SEPL equipment and duty',
      'Material and elastomer options as required',
      'Kit or individual item supply',
      'Fast quotation against BOM or photos',
    ],
    clients: [
      'Terminal and plant maintenance teams',
      'OEMs and service contractors',
      'Existing SEPL equipment operators',
    ],
  },
  'test-aiders': {
    title: 'Test Aiders',
    subtitle:
      'Specialized testing loading arms (typically 6″–18″ NB) for pump manufacturers, flow labs and industrial test beds.',
    heroImage: '/product-images/test-aider-desktop.jpg',
    gallery: ['/product-images/test-aider-desktop.jpg', '/product-images/gallery/test-aider-16-desktop.png', '/product-images/gallery/test-aider-16b-desktop.png', '/product-images/loading-arm-desktop.png'],
    intro: [
      'Test Aiders are a specialized SEPL loading-arm configuration engineered for pump manufacturers, flow measurement stations and industrial test beds.',
      'Large-bore designs (typically 6″ to 18″ NB) support extreme high-capacity flow testing, pressure spikes and continuous cyclic duty without joint degradation.',
      'They replace dangerous large-bore hose pipes with torque-free swivel joints and heavy-duty balancing for safer, longer-life test operations.',
    ],
    highlights: [
      { label: 'Size Range', value: '6″ – 18″ NB' },
      { label: 'Duty', value: 'High-Capacity Flow Testing' },
      { label: 'Rotation', value: 'Torque-Free 360°' },
      { label: 'Use Case', value: 'Pump Test Beds' },
    ],
    features: [
      'Built for extreme high-capacity flow testing',
      'Withstands pressure spikes and continuous cyclic testing',
      'Replaces unmanageable large-bore hose pipes',
      'Smooth, torque-free 360° swivel operation',
      'Fully adjustable heavy-duty balancing',
      'Custom MOC, flange and accessory packages',
    ],
    applications: [
      'Pump manufacturers and OEM validation',
      'Flow measurement stations',
      'Industrial test beds',
      'High-flow process testing facilities',
    ],
    specifications: [
      'Typical size range: 6" to 18" NB (project specific)',
      'Materials: CS / SS grades as per media and pressure',
      'Balancing: heavy-duty spring / counterweight systems',
      'Documentation support as per project scope',
    ],
    clients: [
      'QA and inspection teams in process industries',
      'Project commissioning contractors',
      'Operations and maintenance departments',
    ],
  },
  'mechanical-seal-support': {
    title: 'Mechanical Seal Support Systems (API Plan)',
    subtitle:
      'In-house manufacture of mechanical seal support systems — coolers, pressure vessels, thermosyphons and API Plan 52/53 arrangements.',
    heroImage: '/product-images/api-plan-desktop.jpeg',
    gallery: ['/product-images/api-plan-desktop.jpeg', '/product-images/prover-tank-desktop.png', '/product-images/storage-tank-desktop.png', '/product-images/rotary-joint-desktop.png'],
    intro: [
      'SEPL manufactures mechanical seal support systems that keep seals cool, clean, and pressurised for reliable rotating-equipment duty.',
      'Our scope covers coolers, pressure vessels, thermosyphons and complete API Plan 52 / 53 style support packages engineered to project specifications.',
      'Systems are designed, fabricated and tested in-house under ISO 9001:2015 quality processes for process, petrochemical and related industries.',
    ],
    highlights: [
      { label: 'Standards', value: 'API Plan 52 / 53' },
      { label: 'Scope', value: 'Coolers · Vessels · Thermosyphons' },
      { label: 'Capability', value: 'Design + Manufacture' },
      { label: 'Quality', value: 'ISO 9001:2015' },
    ],
    features: [
      'API Plan oriented seal support packages for mechanical seals',
      'Seal coolers and heat-exchange elements for barrier / buffer fluids',
      'Pressure vessels sized for plan reservoirs and accumulators',
      'Thermosyphon loops for natural circulation seal cooling',
      'Material and connection options matched to process media',
      'In-house fabrication, inspection and documentation',
    ],
    applications: [
      'Pumps and compressors with mechanical seals',
      'Refinery and petrochemical rotating equipment',
      'Chemical process units requiring barrier fluid systems',
      'Seal upgrade and reliability improvement projects',
    ],
    specifications: [
      'Configured to API Plan 52 / 53 and project datasheets',
      'Material grades per fluid, pressure and temperature',
      'Instrumentation and valve packages as ordered',
      'Hydro / pneumatic testing as per ITP',
    ],
    clients: [
      'Process and petrochemical plants',
      'Pump OEMs and reliability teams',
      'EPC and maintenance contractors',
    ],
  },
}

const sectionMeta = {
  features: { title: 'Features', icon: Settings },
  applications: { title: 'Areas of Application', icon: Factory },
  specifications: { title: 'Specifications', icon: ShieldCheck },
  clients: { title: 'Trusted Clients', icon: Building2 },
}

function SectionGrid({ items, icon: Icon }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 hover:border-indigo-200 hover:shadow-[0_10px_24px_rgba(67,56,202,0.08)] transition-all duration-200"
        >
          <div className="flex items-start gap-2.5">
            <Icon size={15} className="text-indigo-600 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] sm:text-[14px] text-slate-700 leading-relaxed">{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProductDetailPage({ params }) {
  const { slug } = params
  const [apiProduct, setApiProduct] = useState(null)

  useEffect(() => {
    fetchProductBySlug(slug)
      .then(setApiProduct)
      .catch(() => setApiProduct(null))
  }, [slug])

  const product = apiProduct ? normalizeProduct(apiProduct) : findStaticProduct(slug)

  const minimalDetail =
    product &&
    ({
      title: product.title,
      subtitle: product.description,
      heroImage: product.image || '/product-images/loading-arm-desktop.png',
      gallery: [product.image || '/product-images/loading-arm-desktop.png', '/product-images/swivel-joint-desktop.png', '/product-images/prover-tank-desktop.png'],
      intro: [product.description],
      highlights: [
        { label: 'Designed For', value: 'Industrial Fluid Transfer' },
        { label: 'Manufacturing', value: 'Precision Engineered' },
        { label: 'Support', value: 'End-to-End Assistance' },
        { label: 'Customization', value: 'Available on Request' },
      ],
      features: ['High reliability', 'Low maintenance', 'Robust construction', 'Flexible configuration'],
      applications: ['Process industries', 'Terminals', 'Storage & handling'],
      specifications: ['Available in multiple sizes and materials'],
      clients: ['Shared on request'],
    })

  const detail = mapApiProductToDetail(apiProduct) || productDetails[slug] || minimalDetail

  const tabs = useMemo(() => ['features', 'applications', 'specifications', 'clients'], [])
  const [activeTab, setActiveTab] = useState('features')

  if (!detail) {
    return (
      <main>
        <Navbar />
        <div className="pt-nav min-h-screen flex items-center justify-center">
          <Link href="/products" className="btn-pill btn-primary">
            Back to Products
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const activeItems = detail[activeTab]
  const ActiveIcon = sectionMeta[activeTab].icon

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-indigo-900 text-white">
          <div className="absolute inset-0 opacity-25">
            <img src={detail.heroImage} alt={detail.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/65" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-indigo-300 text-[13px] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              All Products
            </Link>
            <div className="max-w-3xl">
              <h1 className="font-display font-700 text-[2rem] sm:text-[3.1rem] leading-[1.1] tracking-tight mb-4">
                {detail.title}
              </h1>
              <p className="text-indigo-100/95 text-[14px] sm:text-[17px] leading-relaxed mb-8">{detail.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/enquiry" className="btn-pill btn-primary">
                  Request a Quote
                  <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn-pill btn-ghost-white">
                  Talk to an Engineer
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {detail.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all"
                >
                  <div className="text-[11px] sm:text-[12px] font-600 uppercase tracking-wider text-slate-500 mb-1.5">
                    {item.label}
                  </div>
                  <div className="text-[13px] sm:text-[15px] font-600 text-slate-800 leading-snug">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {detail.certifications?.length > 0 && (
          <section className="bg-indigo-50/50 border-y border-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">
                  Certification
                </span>
              </div>
              <h2 className="font-display font-700 text-[1.4rem] sm:text-[1.7rem] text-navy-900 mb-6">
                Weights &amp; Measures — Prover Tanks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {detail.certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="rounded-2xl border border-indigo-200 bg-white p-5"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <BadgeCheck size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                      <h3 className="font-display font-700 text-[14px] sm:text-[15px] text-navy-900">
                        {cert.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4">{cert.detail}</p>
                    <Link href={cert.href} className="text-[12.5px] font-600 text-indigo-700 hover:underline">
                      View certificates →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="lg:col-span-2 space-y-4">
                {detail.intro.map((paragraph) => (
                  <p key={paragraph} className="text-slate-600 text-[14px] sm:text-[15.5px] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(67,56,202,0.08)]">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck size={18} className="text-indigo-600" />
                  <h3 className="font-display font-700 text-[18px] text-navy-900">Quick Enquiry</h3>
                </div>
                <p className="text-[13.5px] text-slate-600 mb-5">
                  Tell us your flow medium, required size and operating conditions. We will suggest the right configuration quickly.
                </p>
                <div className="space-y-2.5">
                  <Link href="/enquiry" className="btn-pill btn-primary w-full justify-center">
                    Send Requirement
                  </Link>
                  <Link href="/contact" className="btn-pill btn-outline w-full justify-center">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-11 shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-600 transition-all sm:text-[13px] ${
                    activeTab === tab
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_8px_20px_rgba(46,49,146,0.28)]'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700'
                  }`}
                >
                  {sectionMeta[tab].title}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <ActiveIcon size={18} className="text-indigo-600" />
              <h2 className="font-display font-700 text-[1.4rem] sm:text-[1.8rem] text-navy-900">
                {sectionMeta[activeTab].title}
              </h2>
            </div>
            <SectionGrid items={activeItems} icon={activeTab === 'clients' ? Building2 : CheckCircle2} />
          </div>
        </section>

        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-2 mb-5">
              <Droplets size={18} className="text-indigo-600" />
              <h2 className="font-display font-700 text-[1.4rem] sm:text-[1.8rem] text-navy-900">
                Product Gallery
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {detail.gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 h-36 sm:h-44 lg:h-52"
                >
                  <img
                    src={image}
                    alt={`${detail.title} ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-indigo-900 text-white p-6 sm:p-8 flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
              <div>
                <h3 className="font-display font-700 text-[1.4rem] sm:text-[1.8rem] leading-tight mb-2">
                  Need a customized Loading Arm configuration?
                </h3>
                <p className="text-indigo-100 text-[13.5px] sm:text-[15px]">
                  Share your fluid type, temperature, pressure, and tanker arrangement. Our team will recommend the right build.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link href="/enquiry" className="btn-pill btn-primary w-full sm:w-auto justify-center">
                  Get Custom Quote
                  <ArrowRight size={15} />
                </Link>
                <Link href="/download" className="btn-pill btn-ghost-white w-full sm:w-auto justify-center">
                  Download Brochure
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
