/** Curated gallery items — layouts assigned for a filled bento (no holes). */
export const GALLERY_ITEMS = [
  {
    id: 'loading-arms',
    title: 'Loading Arm Systems',
    category: 'Fluid Transfer',
    image: '/product-images/loading-arm-desktop.png',
    imagePhone: '/product-images/loading-arm-phone.png',
    href: '/products/loading-arms',
    layout: 'hero',
  },
  {
    id: 'unloading-arms',
    title: 'Unloading Arms',
    category: 'Tanker & Marine',
    image: '/product-images/gallery/loading-arms-alt-desktop.png',
    imagePhone: '/product-images/gallery/loading-arms-alt-phone.png',
    href: '/products/unloading-arms',
    layout: 'tall',
  },
  {
    id: 'floating-suction',
    title: 'Floating Suction Assemblies',
    category: 'Aviation Fuel',
    image: '/product-images/floating-suction-desktop.png',
    imagePhone: '/product-images/floating-suction-phone.png',
    href: '/products/floating-suction',
    layout: 'sm',
  },
  {
    id: 'test-aiders',
    title: 'Test Aiders',
    category: 'QA Equipment',
    image: '/product-images/test-aider-desktop.jpg',
    imagePhone: '/product-images/test-aider-phone.png',
    href: '/products/test-aiders',
    layout: 'sm',
  },
  {
    id: 'prover-tanks',
    title: 'Prover Tanks',
    category: 'Weights & Measures',
    image: '/product-images/prover-tank-desktop.png',
    imagePhone: '/product-images/prover-tank-phone.png',
    href: '/products/prover-tanks',
    layout: 'wide',
  },
  {
    id: 'swivel-joints',
    title: 'Swivel Joints',
    category: 'Precision Rotation',
    image: '/product-images/swivel-joint-desktop.png',
    imagePhone: '/product-images/swivel-joint-phone.png',
    href: '/products/swivel-joints',
    layout: 'wide',
  },
  {
    id: 'facility',
    title: 'Manufacturing Facility',
    category: 'SEPL Plant',
    image: '/facilities/facility-hadapsar-main.jpg',
    href: '/about',
    layout: 'wide',
  },
  {
    id: 'pressure-vessels',
    title: 'API Plan & Seal Support',
    category: 'Mechanical Seals',
    image: '/product-images/api-plan-desktop.jpeg',
    imagePhone: '/product-images/api-plan-phone.png',
    href: '/products/mechanical-seal-support',
    layout: 'sm',
  },
  {
    id: 'storage-systems',
    title: 'Storage & Terminal Solutions',
    category: 'Custom Fabrication',
    image: '/product-images/storage-tank-desktop.png',
    imagePhone: '/product-images/storage-tank-phone.png',
    href: '/enquiry',
    layout: 'sm',
  },
]

/**
 * Fixed home bento: 4-col grid, 3 rows — completely filled, no gaps.
 * [ hero 2×2 ] [ tall 1×2 ] [ sm ]
 *               [         ] [ sm ]
 * [ wide 2×1  ] [ wide 2×1        ]
 */
export const HOME_BENTO_LAYOUTS = ['hero', 'tall', 'sm', 'sm', 'wide', 'wide']

export const BENTO_LAYOUT_CLASS = {
  hero: 'col-span-2 row-span-2',
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  sm: 'col-span-1 row-span-1',
  medium: 'col-span-2 row-span-1',
  default: 'col-span-1 row-span-1',
}

/** Build a filled 6-tile bento from gallery items (order + layout fixed). */
export function getHomeBentoItems(items) {
  const source = items?.length ? items : GALLERY_ITEMS
  return HOME_BENTO_LAYOUTS.map((layout, i) => {
    const item = source[i % source.length]
    return {
      ...item,
      id: `${item.id || item.slug || 'item'}-bento-${i}`,
      layout,
    }
  })
}

/**
 * Assign layouts so a 4-col grid never has holes between cards.
 * Complete groups of 6 use the home pattern; remainder uses 1×1 tiles.
 */
export function assignFilledBentoLayouts(items) {
  if (!items?.length) return []
  const full = Math.floor(items.length / 6) * 6
  const rem = items.length - full
  const remUsesWide = rem === 2 || rem === 4

  return items.map((item, i) => {
    const layout =
      i < full ? HOME_BENTO_LAYOUTS[i % 6] : remUsesWide ? 'wide' : 'sm'
    return {
      ...item,
      id: item.id || item.slug || `gallery-${i}`,
      layout,
    }
  })
}
