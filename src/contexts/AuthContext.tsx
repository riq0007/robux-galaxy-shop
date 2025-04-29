
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: string) => void;
  logout: () => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (provider: string) => {
    // Mock login - in a real app, this would connect to Firebase/OAuth
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock user data
      const mockUser = {
        id: '123456',
        name: 'Usuário Teste',
        email: 'usuario@teste.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=123'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${mockUser.name}!`,
      });
      
      navigate('/');
    }, 1000);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta",
    });
    navigate('/');
  };
  
  const requireAuth = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para acessar esta funcionalidade",
        variant: "destructive"
      });
      navigate('/login');
      return false;
    }
    return true;
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout,
        requireAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
