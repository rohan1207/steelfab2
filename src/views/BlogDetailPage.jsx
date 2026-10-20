'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { fetchBlogBySlug } from '@/lib/api'
import { ArrowLeft, Calendar, User } from 'lucide-react'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetchBlogBySlug(slug)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <main>
      <Navbar />
      <div className="pt-nav bg-white min-h-screen">
        {loading ? (
          <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500">Loading…</div>
        ) : !post ? (
          <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <p className="text-slate-600 mb-4">Article not found.</p>
            <Link href="/blogs" className="btn-pill btn-outline">Back to Blog</Link>
          </div>
        ) : (
          <>
            {post.coverImageUrl && (
              <div className="relative h-[220px] sm:h-[360px] bg-slate-100">
                <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
              </div>
            )}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-[13px] font-600 text-indigo-600 hover:text-indigo-800 mb-6">
                <ArrowLeft size={16} /> All articles
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {(post.tags || []).map((tag) => (
                  <span key={tag} className="text-[10px] font-600 uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-display font-700 text-[1.75rem] sm:text-[2.5rem] text-navy-900 leading-tight tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-[13px] text-slate-500 mb-8 pb-8 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {post.author || 'SEPL Team'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
              </div>
              {post.excerpt && (
                <p className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed mb-8 font-medium">{post.excerpt}</p>
              )}
              <div
                className="blog-content prose prose-slate prose-indigo max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-a:text-indigo-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
