
import React from 'react';
import { allPackages } from "@/data/robuxPackages";
import PackagesCarousel from "./pricing/PackagesCarousel";

const PricingSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-darker-bg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Preços</span> <span className="neon-text-purple">Transparentes</span> <span className="text-white">e Simples</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escolha o pacote de Robux que atenda às suas necessidades. Todos os pacotes incluem entrega instantânea e nosso suporte de classe mundial.
          </p>
        </div>
        
        <PackagesCarousel packages={allPackages} />
      </div>
    </section>
  );
};

export default PricingSection;
