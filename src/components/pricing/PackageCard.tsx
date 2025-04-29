
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { RobuxPackage } from "@/data/robuxPackages";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface PackageCardProps {
  pkg: RobuxPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  const { requireAuth } = useAuth();
  const { addToCart } = useCart();
  
  const handleBuyNow = () => {
    if (requireAuth()) {
      addToCart(pkg);
    }
  };

  // Function to determine if a package is premium tier
  const isPremium = ['god', 'premium'].includes(pkg.tier);
  
  return (
    <div className={`relative rounded-lg ${pkg.popular ? 'neon-border-purple' : 'border border-gray-700'} 
      bg-gradient-to-b from-dark-bg to-darker-bg p-6 flex flex-col h-full min-h-[400px]`}>
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-purple text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse-neon">
          Mais Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
        <div className="mb-4">
          <span className={`text-4xl font-bold text-white`}>{pkg.robux}</span>
          <span className={`${isPremium ? "text-neon-purple" : "text-neon-blue"} ml-1`}>ROBUX</span>
        </div>
        <div className="text-2xl font-semibold text-gray-300">{pkg.price}</div>
      </div>
      
      <ul className="space-y-3 mb-6 flex-grow">
        {pkg.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center">
            <ShieldCheck className={`w-5 h-5 mr-2 ${pkg.popular || isPremium ? 'text-neon-purple' : 'text-neon-blue'}`} />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={pkg.popular || isPremium ? 
          "w-full bg-neon-purple hover:bg-neon-purple/80 text-white" : 
          "w-full bg-transparent border border-neon-blue hover:bg-neon-blue/20 text-white"
        }
        onClick={handleBuyNow}
      >
        Comprar Agora <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default PackageCard;
