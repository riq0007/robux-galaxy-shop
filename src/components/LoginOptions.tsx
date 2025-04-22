
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
              <span className="neon-text-blue">Join</span> Our Community
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Create an account or sign in to track your orders, receive exclusive deals, and join our community of gamers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Button className="h-auto py-6 flex flex-col items-center border border-neon-purple bg-transparent hover:bg-neon-purple/20">
              <MessageSquare className="w-8 h-8 mb-3 text-neon-purple" />
              <span className="text-lg font-medium">Discord Login</span>
              <span className="text-xs text-gray-400 mt-1">Connect with Discord</span>
            </Button>
            
            <Button className="h-auto py-6 flex flex-col items-center border border-neon-blue bg-transparent hover:bg-neon-blue/20">
              <User className="w-8 h-8 mb-3 text-neon-blue" />
              <span className="text-lg font-medium">Google Login</span>
              <span className="text-xs text-gray-400 mt-1">Sign in with Google</span>
            </Button>
            
            <Button className="h-auto py-6 flex flex-col items-center border border-neon-purple bg-transparent hover:bg-neon-purple/20">
              <Gamepad className="w-8 h-8 mb-3 text-neon-purple" />
              <span className="text-lg font-medium">Roblox Login</span>
              <span className="text-xs text-gray-400 mt-1">Connect your Roblox</span>
            </Button>
          </div>
          
          <div className="text-center mt-8 text-gray-400">
            <p>Don't have an account? <a href="#" className="text-neon-blue hover:underline">Create one</a> in seconds.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginOptions;
