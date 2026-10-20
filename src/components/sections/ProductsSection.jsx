'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-[0_8px_40px_rgba(67,56,202,0.1)] transition-all duration-300 flex flex-col h-full"
    >
      {/* Product image */}
      <Link href={product.href} className="relative block h-32 sm:h-44 overflow-hidden shrink-0">
        <Image
          src={product.image || '/product-images/loading-arm-desktop.png'}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
        {product.tag && (
          <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[10px] sm:text-[11px] font-500 text-white bg-indigo-600/90 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-sm border border-white/20">
            {product.tag}
          </span>
        )}
      </Link>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="font-display font-700 text-[14px] sm:text-[18px] text-navy-900 mb-2 sm:mb-3 leading-snug">
          {product.title}
        </h3>
        <p className="text-slate-500 text-[11px] sm:text-[14px] leading-relaxed flex-1 line-clamp-3 min-h-[3.25rem] sm:min-h-[4.25rem] mb-4 sm:mb-5">
          {product.description}
        </p>

        <div className="flex items-center gap-2 sm:gap-3 mt-auto shrink-0">
          <Link
            href="/enquiry"
            className="btn-pill btn-primary text-[11px] sm:text-[13px] py-2 px-3 sm:py-2.5 sm:px-5 flex-1 justify-center"
          >
            Request Quote
          </Link>
          <Link
            href={product.href}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex-shrink-0"
            aria-label={`View ${product.title}`}
          >
            <ArrowRight size={14} className="sm:hidden" />
            <ArrowRight size={16} className="hidden sm:block" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left pointer-events-none" />
    </motion.div>
  )
}

export default function ProductsSection({ previewCount } = {}) {
  const { products } = useProducts()
  const displayProducts = previewCount ? products.slice(0, previewCount) : products
  const gridCols =
    previewCount >= 4
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="products" className="section-pad bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[12px] font-600 tracking-widest uppercase text-indigo-600 mb-4">
            Our Product Range
          </span>
          <h2 className="font-display font-700 text-[1.75rem] sm:text-[2.6rem] text-navy-900 tracking-tight mb-4">
            Our Products
          </h2>
          <p className="text-slate-500 text-[14px] sm:text-[16px] max-w-xl mx-auto leading-relaxed px-1">
            Comprehensive fluid handling solutions engineered to the highest international standards for every industrial application.
          </p>
        </motion.div>

        <div className={`${gridCols} items-stretch`}>
          {displayProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {previewCount ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-pill btn-outline">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
