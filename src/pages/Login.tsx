import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, User, Mail, UserPlus, LogIn, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  passwordConfirm: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas não coincidem",
  path: ["passwordConfirm"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { login, register } = useAuth();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  // Reset the other form when switching tabs to avoid data contamination
  const switchTab = (tab: 'login' | 'register') => {
    if (tab === 'login') {
      registerForm.reset();
    } else {
      loginForm.reset();
    }
    setActiveTab(tab);
  };

  const onLoginSubmit = (values: LoginFormValues) => {
    login(values.email, values.password);
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    register(values.name, values.email, values.password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center relative z-10">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-3xl font-bold neon-text-blue">POPOTA</span>
              <span className="text-3xl font-bold neon-text-purple">SHOP</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {activeTab === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h1>
            <p className="text-gray-400">
              {activeTab === 'login' 
                ? 'Entre para acessar os melhores preços do universo Robux' 
                : 'Cadastre-se para aproveitar todas as vantagens'}
            </p>
            
            {/* Credentials info */}
            <div className="mt-2 p-2 bg-gray-800/50 rounded-md">
              <p className="text-xs text-gray-300">
                <strong>Credenciais pré-definidas:</strong><br/>
                <span className="text-neon-blue">Admin:</span> admin@admin.com / admin1234<br/>
                <span className="text-neon-purple">Usuário:</span> usuario@teste.com / senha123
              </p>
            </div>
          </div>
          
          {/* Tab selection */}
          <div className="flex mb-6">
            <button 
              className={`flex-1 py-3 text-center ${activeTab === 'login' 
                ? 'border-b-2 border-neon-blue font-bold text-white' 
                : 'border-b border-gray-700 text-gray-400'}`}
              onClick={() => switchTab('login')}
            >
              Entrar
            </button>
            <button 
              className={`flex-1 py-3 text-center ${activeTab === 'register' 
                ? 'border-b-2 border-neon-purple font-bold text-white' 
                : 'border-b border-gray-700 text-gray-400'}`}
              onClick={() => switchTab('register')}
            >
              Cadastrar
            </button>
          </div>
          
          {activeTab === 'login' ? (
            // Login Form
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="seu@email.com" 
                            className="pl-10 bg-darker-bg border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10 bg-darker-bg border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full py-6 bg-neon-blue hover:bg-neon-blue/80">
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Entrar</span>
                </Button>
                
                <div className="text-center mt-4">
                  <Link to="/" className="text-sm text-gray-400 hover:text-neon-blue">
                    Esqueci minha senha
                  </Link>
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-dark-bg text-gray-500">ou entre com</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="py-5 flex items-center justify-center border-neon-blue">
                    <User className="w-5 h-5 mr-2 text-neon-blue" />
                    <span>Google</span>
                  </Button>
                  
                  <Button variant="outline" className="py-5 flex items-center justify-center border-neon-purple">
                    <MessageSquare className="w-5 h-5 mr-2 text-neon-purple" />
                    <span>Discord</span>
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            // Register Form
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="Seu nome" 
                            className="pl-10 bg-darker-bg border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="seu@email.com" 
                            className="pl-10 bg-darker-bg border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10 bg-darker-bg border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10 bg-darker-bg border-gray-700"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full py-6 bg-neon-purple hover:bg-neon-purple/80">
                  <UserPlus className="w-5 h-5 mr-2" />
                  <span>Criar Conta</span>
                </Button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-dark-bg text-gray-500">ou cadastre-se com</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="py-5 flex items-center justify-center border-neon-blue">
                    <User className="w-5 h-5 mr-2 text-neon-blue" />
                    <span>Google</span>
                  </Button>
                  
                  <Button variant="outline" className="py-5 flex items-center justify-center border-neon-purple">
                    <MessageSquare className="w-5 h-5 mr-2 text-neon-purple" />
                    <span>Discord</span>
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
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
  );
};

export default Login;
