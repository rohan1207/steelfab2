import { PRODUCTS as STATIC_PRODUCTS } from '@/lib/data'

export function normalizeProduct(p) {
  const slug = p.slug || p.id
  return {
    id: slug,
    slug,
    title: p.title,
    description: p.description || '',
    href: `/products/${slug}`,
    image: p.image || '/product-images/loading-arm-desktop.png',
    icon: p.icon || '⚙️',
    tag: p.tag || null,
    isFeatured: Boolean(p.isFeatured),
    raw: p,
  }
}

export function mapApiProductToDetail(p) {
  if (!p) return null
  const hasDetail =
    (p.intro && p.intro.length > 0) ||
    (p.features && p.features.length > 0) ||
    (p.highlights && p.highlights.length > 0)

  if (!hasDetail) return null

  const gallery = (p.gallery || [])
    .map((g) => (typeof g === 'string' ? g : g.url))
    .filter(Boolean)

  return {
    title: p.title,
    subtitle: p.subtitle || p.description,
    heroImage: p.heroImage || p.image || '/product-images/loading-arm-desktop.png',
    gallery: gallery.length ? gallery : [p.image || '/product-images/loading-arm-desktop.png'],
    intro: p.intro?.length ? p.intro : [p.description].filter(Boolean),
    highlights: p.highlights?.length
      ? p.highlights
      : [
          { label: 'Designed For', value: 'Industrial Fluid Transfer' },
          { label: 'Support', value: 'End-to-End Assistance' },
        ],
    features: p.features || [],
    applications: p.applications || [],
    specifications: p.specifications || [],
    clients: p.clients || [],
  }
}

export function getStaticProducts() {
  return STATIC_PRODUCTS.map((p) => normalizeProduct({ ...p, slug: p.id }))
}

export function findStaticProduct(slug) {
  const p = STATIC_PRODUCTS.find((item) => item.id === slug)
  return p ? normalizeProduct({ ...p, slug: p.id }) : null
}
