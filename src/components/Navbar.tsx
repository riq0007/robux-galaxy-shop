import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import UserDropdown from './UserDropdown';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Clock } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const { getCount } = useCart();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-darker-bg border-b border-neon-blue/20">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Left side: Logo and navigation links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold neon-text-blue">
            POP<span className="neon-text-purple">OTA</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-gray-300">
              Catálogo
            </Link>
            <Link to="/support" className="hover:text-gray-300">
              Suporte
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              Sobre nós
            </Link>
          </nav>
        </div>

        {/* Right side: Cart and user authentication */}
        <div className="flex items-center space-x-4">
          {isMounted && location.pathname !== '/cart' && (
            <Link to="/cart" className="relative">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-neon-blue/10">
                Carrinho
                {getCount() > 0 && (
                  <span className="absolute top-[-6px] right-[-6px] bg-neon-blue text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {getCount()}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* User authentication */}
          {user ? (
            <UserDropdown />
          ) : (
            <div className="hidden md:block">
              <Link to="/login">
                <Button variant="secondary">Entrar</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-darker-bg border-l border-neon-blue/20 w-64">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <Link to="/" className="block py-2 hover:text-gray-300">
                  Início
                </Link>
                <Link to="/catalog" className="block py-2 hover:text-gray-300">
                  Catálogo
                </Link>
                <Link to="/support" className="block py-2 hover:text-gray-300">
                  Suporte
                </Link>
                <Link to="/about" className="block py-2 hover:text-gray-300">
                  Sobre nós
                </Link>
                {user ? (
                  <>
                    <Link to="/order-history" className="block py-2 hover:text-gray-300">
                      <Clock className="inline-block w-4 h-4 mr-2" />
                      Meus Pedidos
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => {}} className="w-full mt-4">
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link to="/login" className="block py-2 hover:text-gray-300">
                    Entrar
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
