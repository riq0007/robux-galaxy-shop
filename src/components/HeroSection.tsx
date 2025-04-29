
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const {
    isAuthenticated
  } = useAuth();
  
  return <section className="pt-32 pb-20 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633320926216-85d7c479d350?q=80&w=1974')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block">O Melhor Lugar para</span>
            <span className="neon-text-green">Comprar </span>
            <span className="neon-text-blue">Robux </span> 
            <span className="text-white">para Seus</span> 
            <span className="neon-text-purple"> Jogos</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Entrega rápida, transações seguras e suporte 24/7. Junte-se a milhares de jogadores satisfeitos que confiam em nós para suas necessidades de moeda de jogo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalog">
              <Button className="neon-button w-full sm:w-auto text-lg">
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={isAuthenticated ? "/about" : "/login"}>
              <Button variant="outline" className="border-neon-blue hover:bg-neon-blue/20 w-full sm:w-auto text-lg">
                {isAuthenticated ? "Saiba Mais" : "Entrar / Cadastrar"}
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center mt-12 space-x-4 md:space-x-8">
            <div className="flex items-center">
              <ShieldCheck className="w-5 h-5 text-neon-blue mr-2" />
              <span className="text-gray-300">Pagamentos Seguros</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="w-5 h-5 text-neon-blue mr-2" />
              <span className="text-gray-300">Suporte 24/7</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="w-5 h-5 text-neon-blue mr-2" />
              <span className="text-gray-300">Entrega Rápida</span>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <Star className="w-5 h-5 text-neon-purple mr-2" />
              <span className="text-gray-300">Planos VIP até 10000 Robux</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
