
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define user roles
export type UserRole = 'user' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  requireAuth: () => boolean;
  requireAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for demo purposes with predefined users
const MOCK_USERS = [
  {
    id: 'admin-1',
    name: 'Administrador',
    email: 'admin@admin.com',
    password: 'admin1234',
    role: 'admin' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: 'user-1',
    name: 'Usuário Teste',
    email: 'usuario@teste.com',
    password: 'senha123',
    role: 'user' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=123'
  }
];

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

  const login = (email: string, password: string) => {
    setIsLoading(true);
    
    // Find user with matching email and password
    const foundUser = MOCK_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      // Remove password from user object before storing
      const { password: _, ...safeUserData } = foundUser;
      
      setUser(safeUserData);
      localStorage.setItem('user', JSON.stringify(safeUserData));
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${safeUserData.name}!`,
      });
      
      // Redirect admin to admin dashboard, regular users to home
      if (safeUserData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: "Falha no login",
        description: "Email ou senha incorretos",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };
  
  const register = (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast({
        title: "Erro no cadastro",
        description: "Este email já está cadastrado",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Create new user with user role
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      role: 'user' as UserRole
    };
    
    // In a real app, you would send this to your backend
    // For this mock version, we'll add it to our mock database
    const newUserWithPassword = {...newUser, password};
    MOCK_USERS.push(newUserWithPassword);
    
    // Log in the user automatically
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast({
      title: "Cadastro realizado com sucesso",
      description: `Bem-vindo, ${name}!`,
    });
    
    navigate('/');
    setIsLoading(false);
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
  
  const requireAdmin = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para acessar esta funcionalidade",
        variant: "destructive"
      });
      navigate('/login');
      return false;
    }
    
    if (user.role !== 'admin') {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área",
        variant: "destructive"
      });
      navigate('/');
      return false;
    }
    
    return true;
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isAdmin: user?.role === 'admin',
        isLoading, 
        login, 
        register,
        logout,
        requireAuth,
        requireAdmin
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
