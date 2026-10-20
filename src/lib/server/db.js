import mongoose from 'mongoose'

const g = global
let cached = g.mongoose || { conn: null, promise: null }
g.mongoose = cached

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set')
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((m) => m)
  }
  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }
  return cached.conn
}