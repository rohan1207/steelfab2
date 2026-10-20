import { GALLERY_ITEMS, BENTO_LAYOUT_CLASS } from '@/lib/galleryData'

export { BENTO_LAYOUT_CLASS }

export function normalizeGalleryItem(item) {
  return {
    id: item.slug || item.id,
    slug: item.slug || item.id,
    title: item.title,
    category: item.category || 'General',
    image: item.image || '/product-images/loading-arm-desktop.png',
    href: item.href || '/gallery',
    layout: item.layout || 'default',
  }
}

export function getStaticGalleryItems() {
  return GALLERY_ITEMS.map(normalizeGalleryItem)
}

export function getGalleryCategories(items) {
  return ['All', ...new Set(items.map((i) => i.category))]
}
