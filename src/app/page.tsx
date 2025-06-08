"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FaqSection } from '@/components/sections/FaqSection';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
