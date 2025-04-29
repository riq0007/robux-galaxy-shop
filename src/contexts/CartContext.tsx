
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
  recentlyAdded: CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Clear the recently added items after 3 seconds
  useEffect(() => {
    if (recentlyAdded.length > 0) {
      const timer = setTimeout(() => {
        setRecentlyAdded([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [recentlyAdded]);
  
  const addToCart = (product: any) => {
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if the item already exists in the cart
      setItems(items.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new item to the cart
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };
      setItems([...items, newItem]);
    }
    
    // Add to recently added items
    const newRecentlyAdded = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    
    setRecentlyAdded(prev => [newRecentlyAdded, ...prev].slice(0, 3));
    
    toast({
      title: "Item adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho`,
    });
  };
  
  const removeFromCart = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const getTotal = () => {
    return items.reduce((total, item) => {
      // Remove non-numeric characters and convert to number
      const price = Number(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };
  
  const getCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        getTotal, 
        getCount,
        recentlyAdded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
