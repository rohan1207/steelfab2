import jwt from 'jsonwebtoken'

export function getAdminFromRequest(request) {
  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Bearer ')) return null
  try {
    return jwt.verify(header.slice(7), process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export function requireAdmin(request) {
  const admin = getAdminFromRequest(request)
  if (!admin) return null
  return admin
}