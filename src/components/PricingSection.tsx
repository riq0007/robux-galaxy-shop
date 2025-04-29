
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

// All packages combined in one flat array
const allPackages = [
  // Starter plans
  {
    id: 101,
    name: "Starter",
    robux: "400",
    price: "R$19,90",
    features: ["Entrega Instantânea", "Suporte por Email", "Suporte Discord"],
    popular: false,
    tier: "starter"
  },
  {
    id: 102,
    name: "Starter Plus",
    robux: "600",
    price: "R$27,90",
    features: ["Entrega Instantânea", "Suporte por Email", "Suporte Discord"],
    popular: false,
    tier: "starter"
  },
  {
    id: 103,
    name: "Starter Pro",
    robux: "700",
    price: "R$30,90",
    features: ["Entrega Instantânea", "Suporte por Email", "Suporte Discord", "Bônus Exclusivos"],
    popular: false,
    tier: "starter"
  },
  
  // Standard plans
  {
    id: 201,
    name: "Standard",
    robux: "800",
    price: "R$34,90",
    features: ["Entrega Instantânea", "Suporte Prioritário", "Suporte Discord", "Benefícios de Membro"],
    popular: true,
    tier: "standard"
  },
  {
    id: 202,
    name: "Standard Plus",
    robux: "1200",
    price: "R$48,90",
    features: ["Entrega Instantânea", "Suporte Prioritário", "Suporte Discord", "Benefícios de Membro"],
    popular: false,
    tier: "standard"
  },
  {
    id: 203,
    name: "Standard Pro",
    robux: "1500",
    price: "R$58,90",
    features: ["Entrega Instantânea", "Suporte Prioritário", "Suporte Discord", "Benefícios de Membro", "Bônus Exclusivos"],
    popular: true,
    tier: "standard"
  },
  
  // Pro plans
  {
    id: 301,
    name: "Pro Gamer",
    robux: "1700",
    price: "R$69,90",
    features: ["Entrega Instantânea", "Suporte VIP", "Suporte Discord", "Benefícios de Membro", "Vantagens Exclusivas"],
    popular: false,
    tier: "pro"
  },
  {
    id: 302,
    name: "Pro Gamer Plus",
    robux: "2200",
    price: "R$87,90",
    features: ["Entrega Instantânea", "Suporte VIP", "Suporte Discord", "Benefícios de Membro", "Vantagens Exclusivas"],
    popular: false,
    tier: "pro"
  },
  {
    id: 303,
    name: "Pro Gamer Ultimate",
    robux: "3000",
    price: "R$115,90",
    features: ["Entrega Instantânea", "Suporte VIP", "Suporte Discord", "Benefícios de Membro", "Vantagens Exclusivas", "Bônus Mensais"],
    popular: false,
    tier: "pro"
  },
  
  // God plans
  {
    id: 401,
    name: "God",
    robux: "4000",
    price: "R$159,90",
    features: ["Entrega Instantânea", "Suporte Premium", "Suporte Discord Exclusivo", "Benefícios VIP", "Vantagens Exclusivas", "Acesso Antecipado"],
    popular: false,
    tier: "god"
  },
  {
    id: 402,
    name: "God Plus",
    robux: "5000",
    price: "R$189,90",
    features: ["Entrega Instantânea", "Suporte Premium", "Suporte Discord Exclusivo", "Benefícios VIP", "Vantagens Exclusivas", "Acesso Antecipado"],
    popular: true,
    tier: "god"
  },
  {
    id: 403,
    name: "God Ultimate",
    robux: "6000",
    price: "R$219,90",
    features: ["Entrega Instantânea", "Suporte Premium", "Suporte Discord Exclusivo", "Benefícios VIP", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Exclusivos"],
    popular: false,
    tier: "god"
  },
  
  // Premium plans
  {
    id: 501,
    name: "Hacker",
    robux: "7000",
    price: "R$249,90",
    features: ["Entrega Instantânea", "Suporte Dedicado", "Suporte Discord Privado", "Benefícios Premium", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Raros"],
    popular: false,
    tier: "premium"
  },
  {
    id: 502,
    name: "Admin",
    robux: "8500",
    price: "R$299,90",
    features: ["Entrega Instantânea", "Suporte Exclusivo", "Suporte Discord Privado", "Benefícios Premium", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Raros", "Convites Especiais"],
    popular: true,
    tier: "premium"
  },
  {
    id: 503,
    name: "VIP",
    robux: "10000",
    price: "R$349,90",
    features: ["Entrega Instantânea", "Suporte Personalizado", "Suporte Discord Privado", "Benefícios Premium", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Legendários", "Convites VIP", "Eventos Exclusivos"],
    popular: true,
    tier: "premium"
  }
];

const PricingSection = () => {
  const { requireAuth } = useAuth();
  const { addToCart } = useCart();
  const isMobile = useIsMobile();
  
  const handleBuyNow = (pkg: any) => {
    if (requireAuth()) {
      addToCart(pkg);
    }
  };

  // Function to determine if a package is premium tier
  const isPremiumTier = (tier: string) => {
    return ['god', 'premium'].includes(tier);
  };
  
  // Render a package card
  const renderPackageCard = (pkg: any) => {
    const isPremium = isPremiumTier(pkg.tier);
    
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
          onClick={() => handleBuyNow(pkg)}
        >
          Comprar Agora <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    );
  };

  // Number of items to show per slide based on screen size
  const itemsPerSlide = isMobile ? 1 : 3;
  
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
        
        {/* All plans in one carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {allPackages.map((pkg, index) => (
                <CarouselItem key={pkg.id} className="pl-2 md:pl-4 lg:basis-1/3 md:basis-1/2 basis-full">
                  {renderPackageCard(pkg)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 sm:-left-8 md:-left-10 lg:-left-12 top-1/2" />
            <CarouselNext className="absolute -right-12 sm:-right-8 md:-right-10 lg:-right-12 top-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
