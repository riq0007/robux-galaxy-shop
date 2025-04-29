import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image?: string;
  quantity: number;
}

interface OrderDetails {
  robloxNickname: string;
  discordHandle: string;
  paymentMethod: 'pix' | 'card' | 'robux-transfer';
  paymentProof?: File;
  cardDetails?: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pendente' | 'processando' | 'entregue';
  robloxNickname: string;
  discordHandle: string;
  paymentMethod: 'pix' | 'card' | 'robux-transfer';
  created: string;
  deliveredAt?: string;
  comment?: string;
  paymentProofUrl?: string;
  transactionId: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
  recentlyAdded: CartItem[];
  checkout: (orderDetails: OrderDetails) => Promise<string>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock orders database for demonstration
export const MOCK_ORDERS: Order[] = [];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
    localStorage.removeItem('cart');
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

  // New checkout function
  const checkout = async (orderDetails: OrderDetails): Promise<string> => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para finalizar a compra",
        variant: "destructive"
      });
      navigate('/login');
      return 'error';
    }

    // Generate a transaction ID
    const transactionId = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Create new order
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      items: [...items],
      totalAmount: getTotal(),
      status: orderDetails.paymentMethod === 'card' ? 'processando' : 'pendente',
      robloxNickname: orderDetails.robloxNickname,
      discordHandle: orderDetails.discordHandle,
      paymentMethod: orderDetails.paymentMethod,
      created: new Date().toISOString().slice(0, 19).replace('T', ' '),
      transactionId
    };
    
    // Add order to mock database
    MOCK_ORDERS.push(newOrder);
    
    // Clear the cart after successful checkout
    clearCart();
    
    // Show success message
    toast({
      title: "Pedido realizado com sucesso!",
      description: `Seu pedido #${newOrder.id.split('-')[1]} foi registrado.`,
    });
    
    // Navigate to order confirmation page
    navigate('/order-confirmation', { state: { orderId: newOrder.id } });
    
    return newOrder.id;
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
        recentlyAdded,
        checkout
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
