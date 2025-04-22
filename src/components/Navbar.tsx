
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Discord, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-dark-bg/90 border-b border-neon-blue/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold neon-text-blue">ROBUX</span>
            <span className="text-2xl font-bold neon-text-purple">GALAXY</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors">Home</Link>
            <Link to="/catalog" className="text-white hover:text-neon-blue transition-colors">Catalog</Link>
            <Link to="/about" className="text-white hover:text-neon-blue transition-colors">About</Link>
            <Link to="/support" className="text-white hover:text-neon-blue transition-colors">Support</Link>
            
            <div className="pl-4 border-l border-gray-600 flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-neon-purple hover:bg-neon-purple/20">
                <Discord className="w-4 h-4 mr-2" />
                Discord
              </Button>
              <Button variant="outline" size="sm" className="border-neon-blue hover:bg-neon-blue/20">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-700 mt-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Home</Link>
              <Link to="/catalog" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Catalog</Link>
              <Link to="/about" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">About</Link>
              <Link to="/support" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Support</Link>
              
              <div className="flex flex-col pt-2 border-t border-gray-700 mt-2">
                <Button variant="outline" size="sm" className="border-neon-purple hover:bg-neon-purple/20 mb-2">
                  <Discord className="w-4 h-4 mr-2" />
                  Discord
                </Button>
                <Button variant="outline" size="sm" className="border-neon-blue hover:bg-neon-blue/20">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
