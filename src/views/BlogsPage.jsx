'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { fetchBlogs } from '@/lib/api'
import { ArrowRight, Calendar, User } from 'lucide-react'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-gradient-to-br from-navy-950 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <span className="text-[12px] uppercase tracking-widest text-indigo-300 font-600 mb-3 block">Insights</span>
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] leading-tight tracking-tight mb-4 max-w-3xl">
              SEPL Blog &amp; Technical Insights
            </h1>
            <p className="text-indigo-100 text-[14px] sm:text-[16px] max-w-2xl leading-relaxed">
              Industry perspectives on loading arms, quality systems, manufacturing, and global project delivery.
            </p>
          </div>
        </section>

        <section className="bg-slate-50/60 min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {loading ? (
              <p className="text-slate-500 text-center">Loading articles…</p>
            ) : posts.length === 0 ? (
              <p className="text-slate-500 text-center">No articles published yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-200 hover:shadow-[0_12px_40px_rgba(67,56,202,0.1)] transition-all"
                  >
                    <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-slate-100">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-slate-200" />
                      )}
                    </Link>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(post.tags || []).slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] font-600 uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-display font-700 text-[1.1rem] sm:text-[1.25rem] text-navy-900 leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[12px] text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <User size={13} />
                          {post.author || 'SEPL'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-600 text-indigo-600 hover:text-indigo-800"
                      >
                        Read article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
