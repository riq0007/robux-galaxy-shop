
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, User, Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { items, getCount, getTotal, recentlyAdded } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const formatPrice = (price: number) => {
    return `R$${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-dark-bg/90 border-b border-neon-blue/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold neon-text-blue">ROBUX</span>
            <span className="text-2xl font-bold neon-text-purple">GALAXY</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors">Início</Link>
            <Link to="/catalog" className="text-white hover:text-neon-blue transition-colors">Catálogo</Link>
            <Link to="/about" className="text-white hover:text-neon-blue transition-colors">Sobre</Link>
            <Link to="/support" className="text-white hover:text-neon-blue transition-colors">Suporte</Link>
            
            <div className="pl-4 border-l border-gray-600 flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-neon-purple hover:bg-neon-purple/20">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discord
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="border-neon-blue hover:bg-neon-blue/20 relative">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Carrinho
                        {getCount() > 0 && (
                          <span className="absolute -top-2 -right-2 bg-neon-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {getCount()}
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                      <div className="p-4 border-b border-gray-700">
                        <div className="font-medium">Seu Carrinho</div>
                        <div className="text-xs text-gray-400">{getCount()} itens - {formatPrice(getTotal())}</div>
                      </div>
                      
                      {recentlyAdded.length > 0 && (
                        <div className="p-4 border-b border-gray-700 animate-fade-in">
                          <div className="font-medium mb-2">Adicionado Recentemente</div>
                          <div className="space-y-2">
                            {recentlyAdded.map((item, index) => (
                              <div key={`${item.id}-${index}`} className="flex items-center gap-2">
                                {item.image && (
                                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-400">{item.price}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4">
                        {items.length > 0 ? (
                          <div className="space-y-2">
                            {items.slice(0, 3).map((item) => (
                              <div key={item.id} className="flex items-center gap-2">
                                {item.image && (
                                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-400">{item.price} x {item.quantity}</div>
                                </div>
                              </div>
                            ))}
                            {items.length > 3 && (
                              <div className="text-xs text-center text-gray-400">
                                + {items.length - 3} outros itens
                              </div>
                            )}
                            <Button className="w-full mt-2 bg-neon-purple hover:bg-neon-purple/80" onClick={() => navigate('/cart')}>
                              Ver Carrinho Completo
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-400">
                            Seu carrinho está vazio
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" size="sm" className="border-neon-red hover:bg-neon-red/20" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" className="border-neon-blue hover:bg-neon-blue/20" onClick={handleLogin}>
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-700 mt-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Início</Link>
              <Link to="/catalog" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Catálogo</Link>
              <Link to="/about" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Sobre</Link>
              <Link to="/support" className="px-3 py-2 text-white hover:bg-white/5 rounded-md">Suporte</Link>
              
              <div className="flex flex-col pt-2 border-t border-gray-700 mt-2">
                <Button variant="outline" size="sm" className="border-neon-purple hover:bg-neon-purple/20 mb-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discord
                </Button>
                
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-neon-blue hover:bg-neon-blue/20 mb-2 relative"
                      onClick={() => navigate('/cart')}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Carrinho
                      {getCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-neon-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getCount()}
                        </span>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" className="border-neon-red hover:bg-neon-red/20" onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" className="border-neon-blue hover:bg-neon-blue/20" onClick={handleLogin}>
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
