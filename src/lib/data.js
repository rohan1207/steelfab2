export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'SEPL Introduction', href: '/about/introduction' },
      { label: 'Factory Overlook', href: '/about/factory' },
      { label: 'Manufacturing Facility', href: '/about/manufacturing' },
      { label: 'Quality Assurance', href: '/about/quality' },
      { label: 'Certificates', href: '/about/certificates' },
      { label: 'Certificate Of Vendor', href: '/about/vendor-certificate' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Loading Arms', href: '/products/loading-arms' },
      { label: 'Unloading Arms Systems', href: '/products/unloading-arms' },
      { label: 'Floating Suction Assemblies', href: '/products/floating-suction' },
      { label: 'Prover Tanks', href: '/products/prover-tanks' },
      { label: 'Swivel Joints (All Types)', href: '/products/swivel-joints' },
      { label: 'Rotary Joints', href: '/products/rotary-joints' },
      { label: 'Test Aiders', href: '/products/test-aiders' },
      { label: 'Mechanical Seal Support (API Plan)', href: '/products/mechanical-seal-support' },
      { label: 'Spares', href: '/products/spares' },
      { label: 'Customized Products', href: '/products#custom' },
    ],
  },
  { label: 'Careers', href: '/careers' },
  { label: 'Global Exports', href: '/global' },
  { label: 'Clients', href: '/clients' },
  { label: 'CSR', href: '/csr' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Download', href: '/download' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Enquiry', href: '/enquiry', highlight: true },
]

/** Top bar — 6 primary links (About & Products include desktop dropdowns) */
export const PRIMARY_NAV_LABELS = ['Home', 'About Us', 'Products', 'Clients', 'Gallery', 'Blog', 'Contact Us']

export function getPrimaryNavItems() {
  return NAV_ITEMS.filter((item) => PRIMARY_NAV_LABELS.includes(item.label))
}

export const PRODUCTS = [
  {
    id: 'loading-arms',
    title: 'Loading Arms',
    description: 'Precision-engineered top loading arms for safe and efficient fluid transfer operations in petrochemical industries.',
    href: '/products/loading-arms',
    image: '/product-images/loading-arm-desktop.png',
    imagePhone: '/product-images/loading-arm-phone.png',
    icon: '⚙️',
    tag: 'Most Popular',
  },
  {
    id: 'unloading-arms',
    title: 'Unloading Arms Systems',
    description: 'High-performance bottom unloading systems designed for tanker trucks, rail cars, and marine vessels.',
    href: '/products/unloading-arms',
    image: '/product-images/gallery/loading-arms-alt-desktop.png',
    imagePhone: '/product-images/gallery/loading-arms-alt-phone.png',
    icon: '🔧',
    tag: null,
  },
  {
    id: 'floating-suction',
    title: 'Floating Suction Assemblies',
    description: 'Advanced floating suction systems that draw product from the cleanest level in storage tanks.',
    href: '/products/floating-suction',
    image: '/product-images/floating-suction-desktop.png',
    imagePhone: '/product-images/floating-suction-phone.png',
    icon: '🌊',
    tag: null,
  },
  {
    id: 'prover-tanks',
    title: 'Prover Tanks',
    description:
      'Prover tanks under Weights & Measures certification — accurate calibration of flow meters for custody transfer and bulk measurement.',
    href: '/products/prover-tanks',
    image: '/product-images/prover-tank-desktop.png',
    imagePhone: '/product-images/prover-tank-phone.png',
    icon: '🏭',
    tag: 'Weights & Measures',
  },
  {
    id: 'swivel-joints',
    title: 'Swivel Joints (All Types)',
    description:
      'Single and multi-plane swivel joints for loading arms, floating suction, roof drains and rotary service — all types, smooth torque-free rotation.',
    href: '/products/swivel-joints',
    image: '/product-images/swivel-joint-desktop.png',
    imagePhone: '/product-images/swivel-joint-phone.png',
    icon: '🔩',
    tag: 'All Types',
  },
  {
    id: 'rotary-joints',
    title: 'Rotary Joints',
    description:
      'Precision rotary joints for continuous transfer of liquids and gases between stationary and rotating equipment.',
    href: '/products/rotary-joints',
    image: '/product-images/rotary-joint-desktop.png',
    imagePhone: '/product-images/rotary-joint-phone.png',
    icon: '🔄',
    tag: null,
  },
  {
    id: 'test-aiders',
    title: 'Test Aiders',
    description: 'Specialized testing equipment and aids for quality assurance and performance verification of fluid systems.',
    href: '/products/test-aiders',
    image: '/product-images/test-aider-desktop.jpg',
    imagePhone: '/product-images/test-aider-phone.png',
    icon: '📐',
    tag: null,
  },
  {
    id: 'mechanical-seal-support',
    title: 'Mechanical Seal Support Systems (API Plan)',
    description:
      'Manufacture of mechanical seal support systems — coolers, pressure vessels, thermosyphons and API Plan 52/53 arrangements for reliable seal performance.',
    href: '/products/mechanical-seal-support',
    image: '/product-images/api-plan-desktop.jpeg',
    imagePhone: '/product-images/api-plan-phone.png',
    icon: '🛡️',
    tag: 'API Plan',
  },
  {
    id: 'spares',
    title: 'Spares for All Products',
    description:
      'OEM spares for loading arms and related systems — vacuum breakers, O-rings, balls, seals, couplers and rebuild kits.',
    href: '/products/spares',
    image: '/product-images/flange-swivel-desktop.png',
    imagePhone: '/product-images/flange-swivel-phone.png',
    icon: '🧰',
    tag: 'OEM',
  },
]

export const HERO_SLIDES = [
  {
    id: 'floating-suction',
    headline: 'Floating Suction Assemblies',
    subline:
      'Used in aviation fuelling storage tanks for suction of product without sediments. Custom fabricated to your tank dimensions and operating conditions.',
    tag: 'Aviation Fuelling',
    image: '/product-images/floating-suction-desktop.png',
    imagePhone: '/product-images/floating-suction-phone.png',
    href: '/products/floating-suction',
    ctaLabel: 'View Product',
    stat1: { value: 'Up to 24″', label: 'Diameter Range' },
    stat2: { value: 'Custom', label: 'Built to Spec' },
  },
  {
    id: 'prover-tank',
    headline: 'Prover Tanks',
    subline:
      'Weights & Measures certified prover tanks — portable or stationary — for accurate volumetric checks at petroleum terminals.',
    tag: 'Weights & Measures',
    image: '/product-images/prover-tank-desktop.png',
    imagePhone: '/product-images/prover-tank-phone.png',
    href: '/products/prover-tanks',
    ctaLabel: 'View Product',
    stat1: { value: 'Up to 5 KL', label: 'Capacity' },
    stat2: { value: 'Mobile / Fixed', label: 'Configurations' },
  },
  {
    id: 'loading-arms',
    headline: 'Engineered Loading Arm Systems',
    subline:
      "Steelfab's system eliminates the expensive, bulky, clumsy use of hose pipe — with reduced labour cost and user-friendly operation for safer transfers.",
    tag: 'Flagship Systems',
    image: '/product-images/loading-arm-desktop.png',
    imagePhone: '/product-images/loading-arm-phone.png',
    href: '/products/loading-arms',
    ctaLabel: 'View Product',
    stat1: { value: '1″ – 12″', label: 'Size Range' },
    stat2: { value: 'Top & Bottom', label: 'Loading Types' },
  },
  {
    id: 'storage-tank',
    headline: 'Storage Tanks',
    subline:
      'Field-repairable tanks in vertical and horizontal designs — aboveground and underground configurations for industrial storage applications.',
    tag: 'Custom Fabrication',
    image: '/product-images/storage-tank-desktop.png',
    imagePhone: '/product-images/storage-tank-phone.png',
    href: '/enquiry',
    ctaLabel: 'Request Quote',
    stat1: { value: 'Up to 90 KL', label: 'Capacity' },
    stat2: { value: 'Vertical / Horizontal', label: 'Design Options' },
  },
  {
    id: 'swivel-joints',
    headline: 'Swivel Joints',
    subline:
      'Smooth, torque-free rotation that avoids operational fatigue — trusted on loading arms, floating roof tanks, and demanding rotary service.',
    tag: 'Precision Rotation',
    image: '/product-images/swivel-joint-desktop.png',
    imagePhone: '/product-images/swivel-joint-phone.png',
    href: '/products/swivel-joints',
    ctaLabel: 'View Product',
    stat1: { value: '3/4″ – 24″', label: 'Size Range' },
    stat2: { value: 'Torque-Free', label: 'Operation' },
  },
]

export const WHY_CHOOSE_US = [
  {
    title: 'Engineered for Safety',
    description:
      'Designed to minimize spillages, leaks and operator risk during loading and unloading operations.',
    icon: 'shield',
  },
  {
    title: 'Smooth & Ergonomic Operation',
    description: 'Precision-balanced design enables easy handling with minimal operator effort.',
    icon: 'settings',
  },
  {
    title: 'Leak-Free Performance',
    description:
      'High-quality swivel joints and sealing systems ensure reliable, maintenance-friendly operation.',
    icon: 'building',
  },
  {
    title: 'Custom-Built Solutions',
    description:
      'Available in various sizes, pressure ratings, materials and configurations to meet specific customer requirements.',
    icon: 'calendar',
  },
  {
    title: 'Comprehensive Quality Assurance',
    description:
      'Every loading arm undergoes dimensional inspection, pressure testing, functional testing and quality verification before dispatch.',
    icon: 'globe',
  },
  {
    title: 'Technical Support',
    description:
      'Experienced engineering team provides design assistance, documentation, installation guidance and after-sales support.',
    icon: 'truck',
  },
]
