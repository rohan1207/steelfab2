'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductsSection from '@/components/sections/ProductsSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import CustomizedProductsSection from '@/components/sections/CustomizedProductsSection'
import CtaSection from '@/components/sections/CtaSection'
import Link from 'next/link'

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <div className="bg-gradient-to-br from-navy-950 to-indigo-900 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block text-[12px] font-600 tracking-widest uppercase text-indigo-300 mb-4">
              Complete Product Range
            </span>
            <h1 className="font-display font-700 text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] text-white tracking-tight mb-4">
              Our Products
            </h1>
            <p className="text-indigo-100/90 text-[14px] sm:text-[16px] max-w-2xl mb-6">
              Standard range plus customized solutions for your sector — with optional reference photos.
            </p>
            <Link href="/products#custom" className="btn-pill btn-primary text-[13px]">
              Request a customized product
            </Link>
          </div>
        </div>
        <ProductsSection />
        <FeaturedProductsSection />
        <CustomizedProductsSection />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
