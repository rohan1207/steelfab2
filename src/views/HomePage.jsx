'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ClientsMarquee from '@/components/sections/ClientsMarquee'
import ProductsSection from '@/components/sections/ProductsSection'
import AboutSection from '@/components/sections/AboutSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import FacilityVideoSection from '@/components/sections/FacilityVideoSection'
import StatsSection from '@/components/sections/StatsSection'
import CtaSection from '@/components/sections/CtaSection'
import UpcomingProjectsSection from '@/components/sections/UpcomingProjectsSection'
import ProductGalleryBento from '@/components/sections/ProductGalleryBento'
import LocationMapSection from '@/components/sections/LocationMapSection'
import CustomerSatisfactionSection from '@/components/sections/CustomerSatisfactionSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClientsMarquee />
      <ProductsSection previewCount={4} />
      <AboutSection />
      <StatsSection />
      <FacilityVideoSection />
      <WhyChooseUsSection />
      <CustomerSatisfactionSection />
      <UpcomingProjectsSection />
      <CtaSection />
      <ProductGalleryBento />
      <LocationMapSection />
      <Footer />
    </main>
  )
}
