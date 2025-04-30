import React from 'react';
import { Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-darker-bg relative">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">
                <span className="neon-text-blue">POPOTA</span>
                <span className="neon-text-purple">SHOP</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for Robux and gaming currency. Fast delivery, secure transactions, 24/7 support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-neon-blue transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-neon-blue transition-colors">Catalog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-neon-blue transition-colors">About Us</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-neon-blue transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-neon-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-neon-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-gray-400 hover:text-neon-blue transition-colors">Refund Policy</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-neon-blue transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-2 text-neon-blue" />
                <span>+55 (11) 9999-9999</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2 text-neon-purple" />
                <span>support@robuxgalaxy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Popota Shop. All rights reserved.</p>
          <p className="mt-2 text-xs">Not affiliated with Roblox Corporation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
