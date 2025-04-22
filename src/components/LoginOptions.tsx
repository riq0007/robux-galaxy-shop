
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Gamepad } from "lucide-react";

const LoginOptions = () => {
  return (
    <section className="py-24 bg-darker-bg relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="neon-text-blue">Junte-se</span> à Nossa Comunidade
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Crie uma conta ou faça login para acompanhar seus pedidos, receber ofertas exclusivas e participar da nossa comunidade de jogadores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Button className="h-auto py-6 flex flex-col items-center border border-neon-purple bg-transparent hover:bg-neon-purple/20">
              <MessageSquare className="w-8 h-8 mb-3 text-neon-purple" />
              <span className="text-lg font-medium">Login com Discord</span>
              <span className="text-xs text-gray-400 mt-1">Conecte-se com Discord</span>
            </Button>
            
            <Button className="h-auto py-6 flex flex-col items-center border border-neon-blue bg-transparent hover:bg-neon-blue/20">
              <User className="w-8 h-8 mb-3 text-neon-blue" />
              <span className="text-lg font-medium">Login com Google</span>
              <span className="text-xs text-gray-400 mt-1">Faça login com Google</span>
            </Button>
            
            <Button className="h-auto py-6 flex flex-col items-center border border-neon-purple bg-transparent hover:bg-neon-purple/20">
              <Gamepad className="w-8 h-8 mb-3 text-neon-purple" />
              <span className="text-lg font-medium">Login com Roblox</span>
              <span className="text-xs text-gray-400 mt-1">Conecte sua conta Roblox</span>
            </Button>
          </div>
          
          <div className="text-center mt-8 text-gray-400">
            <p>Não tem uma conta? <a href="#" className="text-neon-blue hover:underline">Crie uma</a> em segundos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginOptions;
