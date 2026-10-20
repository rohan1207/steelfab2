'use client'

import { useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'

const ACCENTS = ['#4338ca', '#0ea5e9', '#0891b2', '#7c3aed']

const STATIC_FEATURED = [
  {
    id: 'loading-arms',
    title: 'Loading Arm Systems',
    description: 'Top and bottom loading arms for road tankers, rail cars, and marine applications. Engineered for zero spillage.',
    image: '/product-images/loading-arm-desktop.png',
    accent: '#4338ca',
    href: '/products/loading-arms',
  },
  {
    id: 'loading-arms-2',
    title: 'Loading Arms',
    description: 'Single and multi-product top loading configurations with manual, semi-automatic and automatic operation modes.',
    image: '/product-images/gallery/loading-arms-alt-desktop.png',
    accent: '#0ea5e9',
    href: '/products/loading-arms',
  },
  {
    id: 'floating-suction',
    title: 'Floating Suction Assemblies',
    description: 'Designed to draw clean product from the surface of storage tanks, minimizing contamination and sediment pickup.',
    image: '/product-images/floating-suction-desktop.png',
    accent: '#0891b2',
    href: '/products/floating-suction',
  },
  {
    id: 'prover-tanks',
    title: 'Prover Tanks',
    description: 'High-precision bi-directional and unidirectional prover tanks for accurate flow meter calibration and custody transfer.',
    image: '/product-images/prover-tank-desktop.png',
    accent: '#7c3aed',
    href: '/products/prover-tanks',
  },
]

function FeaturedCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white hover:border-transparent hover:shadow-[0_12px_48px_rgba(30,27,75,0.14)] transition-all duration-400 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-52 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[11px] font-500 text-white px-3 py-1 rounded-full backdrop-blur-sm"
            style={{ background: `${product.accent}99` }}
          >
            SEPL Product
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="font-display font-700 text-[14px] sm:text-[17px] text-navy-900 mb-2 sm:mb-2.5 leading-snug">
          {product.title}
        </h3>
        <p className="text-slate-500 text-[12px] sm:text-[13.5px] leading-relaxed mb-4 sm:mb-5">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <Link
            href="/enquiry"
            className="btn-pill btn-primary text-[11px] sm:text-[12.5px] py-2 px-3 sm:px-4 flex-1 justify-center"
          >
            Request Quote
          </Link>
          <Link
            href={product.href}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 flex-shrink-0"
          >
            <ArrowRight size={13} className="sm:hidden" />
            <ArrowRight size={15} className="hidden sm:block" />
          </Link>
        </div>
      </div>

      {/* Color accent bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${product.accent}, ${product.accent}88)` }}
      />
    </motion.div>
  )
}

export default function FeaturedProductsSection() {
  const { products, fromApi } = useProducts()
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  const mapToFeatured = (list) =>
    list.map((p, i) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      accent: ACCENTS[i % ACCENTS.length],
      href: p.href,
    }))

  const featuredProducts = useMemo(() => {
    if (fromApi && products.length) {
      const featured = products.filter((p) => p.isFeatured)
      const source = featured.length >= 4 ? featured : products
      return mapToFeatured(source).slice(0, 4)
    }
    return STATIC_FEATURED.slice(0, 4)
  }, [products, fromApi])

  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-[12px] font-600 tracking-widest uppercase text-indigo-600 mb-4">
              Featured Range
            </span>
            <h2 className="font-display font-700 text-[1.75rem] sm:text-[2.5rem] text-navy-900 tracking-tight leading-[1.15]">
              Engineering Precision,<br className="hidden sm:block" /> Delivered at Scale
            </h2>
          </div>
          <Link href="/products" className="btn-pill btn-outline text-[13.5px] w-full justify-center sm:w-auto flex-shrink-0">
            All Products
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {featuredProducts.map((p, i) => (
            <FeaturedCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
