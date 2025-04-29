
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Cart = () => {
  const { items, removeFromCart, getTotal, clearCart } = useCart();
  const { isAuthenticated, requireAuth } = useAuth();
  const navigate = useNavigate();
  
  // If cart is empty, show a message
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <ShoppingBag className="mx-auto text-gray-400 w-16 h-16 mb-6" />
              <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
              <p className="text-gray-400 mb-8">Explore nossos produtos e adicione itens ao seu carrinho.</p>
              
              <Button onClick={() => navigate('/catalog')} className="bg-neon-blue hover:bg-neon-blue/80">
                Ver Catálogo
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  const handleCheckout = () => {
    // Check if user is authenticated
    if (requireAuth()) {
      navigate('/checkout');
    }
  };

  const formatPrice = (price: string) => {
    // Remove any non-numeric characters and parse as number
    return Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
              <span className="neon-text-blue">Seu</span> Carrinho
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Cart items */}
              <div className="flex-grow">
                <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="font-medium">Itens no Carrinho</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-700">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 flex items-center">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                        )}
                        
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-400">Quantidade: {item.quantity}</p>
                        </div>
                        
                        <div className="text-right mr-4">
                          <div className="font-medium">{item.price}</div>
                          <div className="text-sm text-gray-400">
                            Total: R$ {(formatPrice(item.price) * item.quantity).toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-neon-red hover:bg-neon-red/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-700 flex justify-between">
                    <Button 
                      variant="ghost" 
                      className="text-gray-400"
                      onClick={clearCart}
                    >
                      Limpar Carrinho
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/catalog')}
                      variant="outline" 
                      className="border-neon-blue text-neon-blue hover:bg-neon-blue/20"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="w-full md:w-80">
                <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden sticky top-24">
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="font-medium">Resumo do Pedido</h2>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal:</span>
                      <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-neon-blue">R$ {getTotal().toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                    >
                      Finalizar Compra
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
