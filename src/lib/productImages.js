/**
 * Real product photos from public/product-images (sanitized from Product Photos).
 * Each entry has desktop + phone variants.
 */

const BASE = '/product-images'

/** @typedef {{ desktop: string, phone: string }} Variant */

/** @type {Record<string, Variant>} */
export const PRODUCT_IMAGE_SET = {
  'loading-arms': {
    desktop: `${BASE}/loading-arm-desktop.png`,
    phone: `${BASE}/loading-arm-phone.png`,
  },
  'unloading-arms': {
    desktop: `${BASE}/gallery/loading-arms-alt-desktop.png`,
    phone: `${BASE}/gallery/loading-arms-alt-phone.png`,
  },
  'floating-suction': {
    desktop: `${BASE}/floating-suction-desktop.png`,
    phone: `${BASE}/floating-suction-phone.png`,
  },
  'prover-tanks': {
    desktop: `${BASE}/prover-tank-desktop.png`,
    phone: `${BASE}/prover-tank-phone.png`,
  },
  'swivel-joints': {
    desktop: `${BASE}/swivel-joint-desktop.png`,
    phone: `${BASE}/swivel-joint-phone.png`,
  },
  'flange-swivel': {
    desktop: `${BASE}/flange-swivel-desktop.png`,
    phone: `${BASE}/flange-swivel-phone.png`,
  },
  'rotary-joints': {
    desktop: `${BASE}/rotary-joint-desktop.png`,
    phone: `${BASE}/rotary-joint-phone.png`,
  },
  'test-aiders': {
    desktop: `${BASE}/test-aider-desktop.jpg`,
    phone: `${BASE}/test-aider-phone.png`,
  },
  'mechanical-seal-support': {
    desktop: `${BASE}/api-plan-desktop.jpeg`,
    phone: `${BASE}/api-plan-phone.png`,
  },
  spares: {
    desktop: `${BASE}/flange-swivel-desktop.png`,
    phone: `${BASE}/flange-swivel-phone.png`,
  },
  'storage-tank': {
    desktop: `${BASE}/storage-tank-desktop.png`,
    phone: `${BASE}/storage-tank-phone.png`,
  },
  'cone-storage-tank': {
    desktop: `${BASE}/cone-storage-tank-desktop.png`,
    phone: `${BASE}/cone-storage-tank-phone.png`,
  },
}

export const PRODUCT_GALLERY = {
  'loading-arms': [
    `${BASE}/loading-arm-desktop.png`,
    `${BASE}/gallery/loading-arms-alt-desktop.png`,
    `${BASE}/gallery/loading-arms-alt2-desktop.png`,
    `${BASE}/gallery/test-aider-16-desktop.png`,
  ],
  'unloading-arms': [
    `${BASE}/gallery/loading-arms-alt-desktop.png`,
    `${BASE}/gallery/loading-arms-alt2-desktop.png`,
    `${BASE}/loading-arm-desktop.png`,
    `${BASE}/swivel-joint-desktop.png`,
  ],
  'floating-suction': [
    `${BASE}/floating-suction-desktop.png`,
    `${BASE}/storage-tank-desktop.png`,
    `${BASE}/cone-storage-tank-desktop.png`,
    `${BASE}/swivel-joint-desktop.png`,
  ],
  'prover-tanks': [
    `${BASE}/prover-tank-desktop.png`,
    `${BASE}/storage-tank-desktop.png`,
    `${BASE}/cone-storage-tank-desktop.png`,
    `${BASE}/api-plan-desktop.jpeg`,
  ],
  'swivel-joints': [
    `${BASE}/swivel-joint-desktop.png`,
    `${BASE}/flange-swivel-desktop.png`,
    `${BASE}/rotary-joint-desktop.png`,
    `${BASE}/loading-arm-desktop.png`,
  ],
  'rotary-joints': [
    `${BASE}/rotary-joint-desktop.png`,
    `${BASE}/swivel-joint-desktop.png`,
    `${BASE}/flange-swivel-desktop.png`,
    `${BASE}/api-plan-desktop.jpeg`,
  ],
  'test-aiders': [
    `${BASE}/test-aider-desktop.jpg`,
    `${BASE}/gallery/test-aider-16-desktop.png`,
    `${BASE}/gallery/test-aider-16b-desktop.png`,
    `${BASE}/gallery/test-aider-alt-desktop.jpg`,
  ],
  'mechanical-seal-support': [
    `${BASE}/api-plan-desktop.jpeg`,
    `${BASE}/prover-tank-desktop.png`,
    `${BASE}/storage-tank-desktop.png`,
    `${BASE}/rotary-joint-desktop.png`,
  ],
  spares: [
    `${BASE}/flange-swivel-desktop.png`,
    `${BASE}/swivel-joint-desktop.png`,
    `${BASE}/rotary-joint-desktop.png`,
    `${BASE}/loading-arm-desktop.png`,
  ],
}

/** Site-wide atmospheric / section photos (no steel1–5 dummies). */
export const SITE_PHOTOS = {
  about: PRODUCT_IMAGE_SET['loading-arms'].desktop,
  contact: PRODUCT_IMAGE_SET['storage-tank'].desktop,
  specs: PRODUCT_IMAGE_SET['prover-tanks'].desktop,
  factory: [
    PRODUCT_IMAGE_SET['loading-arms'].desktop,
    PRODUCT_IMAGE_SET['test-aiders'].desktop,
    PRODUCT_IMAGE_SET['swivel-joints'].desktop,
    PRODUCT_IMAGE_SET['mechanical-seal-support'].desktop,
    PRODUCT_IMAGE_SET['prover-tanks'].desktop,
  ],
}

export function productSrc(id, variant = 'desktop') {
  const set = PRODUCT_IMAGE_SET[id]
  if (!set) return PRODUCT_IMAGE_SET['loading-arms'].desktop
  return set[variant] || set.desktop
}

export function productGallery(id) {
  return PRODUCT_GALLERY[id] || PRODUCT_GALLERY['loading-arms']
}
