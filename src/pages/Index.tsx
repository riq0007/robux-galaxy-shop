
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedGames from '@/components/FeaturedGames';
import PricingSection from '@/components/PricingSection';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import LoginOptions from '@/components/LoginOptions';
import PaymentMethods from '@/components/PaymentMethods';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedGames />
        <PricingSection />
        <HowItWorks />
        <TestimonialsSection />
        <LoginOptions />
        <PaymentMethods />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
