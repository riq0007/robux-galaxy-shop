
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, ShieldCheck } from "lucide-react";
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 1,
    name: "Starter",
    robux: "400",
    price: "R$19,90",
    features: ["Instant Delivery", "Email Support", "Discord Support"],
    popular: false
  },
  {
    id: 2,
    name: "Standard",
    robux: "800",
    price: "R$34,90",
    features: ["Instant Delivery", "Priority Support", "Discord Support", "Member Benefits"],
    popular: true
  },
  {
    id: 3,
    name: "Pro Gamer",
    robux: "1700",
    price: "R$69,90",
    features: ["Instant Delivery", "VIP Support", "Discord Support", "Member Benefits", "Exclusive Perks"],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-darker-bg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Simple,</span> <span className="neon-text-purple">Transparent</span> <span className="text-white">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the package that fits your needs. All packages include instant delivery and our world-class support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative rounded-lg ${pkg.popular ? 'neon-border-purple' : 'border border-gray-700'} bg-gradient-to-b from-dark-bg to-darker-bg p-6 flex flex-col h-full`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-purple text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse-neon">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{pkg.robux}</span>
                  <span className="text-neon-blue ml-1">ROBUX</span>
                </div>
                <div className="text-2xl font-semibold text-gray-300">{pkg.price}</div>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ShieldCheck className={`w-5 h-5 mr-2 ${pkg.popular ? 'text-neon-purple' : 'text-neon-blue'}`} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={pkg.popular ? 
                  "w-full bg-neon-purple hover:bg-neon-purple/80 text-white" : 
                  "w-full bg-transparent border border-neon-blue hover:bg-neon-blue/20 text-white"
                }
              >
                Buy Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Need a custom amount? We've got you covered!</p>
          <Link to="/catalog">
            <Button variant="outline" className="border-neon-blue hover:bg-neon-blue/20">
              View All Options
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
