const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export async function trackLead(payload) {
  const url = API_BASE ? `${API_BASE}/track` : '/api/track'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to submit')
  return res.json()
}

export async function fetchJobs() {
  const url = API_BASE ? `${API_BASE}/jobs` : '/api/jobs'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchUpcomingProjects() {
  const url = API_BASE ? `${API_BASE}/upcoming-projects` : '/api/upcoming-projects'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchDownloads(category) {
  const q = category ? `?category=${category}` : ''
  const url = API_BASE ? `${API_BASE}/downloads${q}` : `/api/downloads${q}`
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchCsrEvents() {
  const url = API_BASE ? `${API_BASE}/csr-events` : '/api/csr-events'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchBlogs() {
  const url = API_BASE ? `${API_BASE}/blogs` : '/api/blogs'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchBlogBySlug(slug) {
  const url = API_BASE ? `${API_BASE}/blogs/${slug}` : `/api/blogs/${slug}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Not found')
  return res.json()
}

export async function fetchCertifications(category) {
  const q = category ? `?category=${encodeURIComponent(category)}` : ''
  const url = API_BASE ? `${API_BASE}/certifications${q}` : `/api/certifications${q}`
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchProducts() {
  const url = API_BASE ? `${API_BASE}/products` : '/api/products'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchProductBySlug(slug) {
  const url = API_BASE ? `${API_BASE}/products/${slug}` : `/api/products/${slug}`
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

export async function fetchClients(type) {
  const q = type ? `?type=${encodeURIComponent(type)}` : ''
  const url = API_BASE ? `${API_BASE}/clients${q}` : `/api/clients${q}`
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchGallery() {
  const url = API_BASE ? `${API_BASE}/gallery` : '/api/gallery'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchGlobalPresence() {
  const url = API_BASE ? `${API_BASE}/global-presence` : '/api/global-presence'
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function fetchGlobalPresenceBySlug(slug) {
  const url = API_BASE ? `${API_BASE}/global-presence/${slug}` : `/api/global-presence/${slug}`
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}
