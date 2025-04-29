
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Mail, UserPlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center relative z-10">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-3xl font-bold neon-text-blue">ROBUX</span>
              <span className="text-3xl font-bold neon-text-purple">GALAXY</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p className="text-gray-400">Entre para acessar os melhores preços do universo Robux</p>
          </div>
          
          <div className="space-y-4">
            <Button className="w-full py-6 flex items-center justify-center bg-transparent border border-neon-blue hover:bg-neon-blue/10">
              <User className="w-5 h-5 mr-3 text-neon-blue" />
              <span>Entrar com Google</span>
            </Button>
            
            <Button className="w-full py-6 flex items-center justify-center bg-transparent border border-neon-purple hover:bg-neon-purple/10">
              <MessageSquare className="w-5 h-5 mr-3 text-neon-purple" />
              <span>Entrar com Discord</span>
            </Button>
            
            <Button className="w-full py-6 flex items-center justify-center bg-transparent border border-neon-blue hover:bg-neon-blue/10">
              <Mail className="w-5 h-5 mr-3 text-neon-blue" />
              <span>Entrar com Email e Senha</span>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-bg text-gray-500">ou</span>
              </div>
            </div>
            
            <Button className="w-full py-6 flex items-center justify-center bg-transparent border border-neon-purple hover:bg-neon-purple/10">
              <UserPlus className="w-5 h-5 mr-3 text-neon-purple" />
              <span>Cadastrar Nova Conta</span>
            </Button>
            
            <div className="text-center mt-6">
              <Link to="/">
                <Button variant="link" className="text-gray-400 hover:text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar como Visitante
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
