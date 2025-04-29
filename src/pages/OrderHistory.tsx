
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_ORDERS } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Clock, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter orders to show only the current user's orders
  const userOrders = MOCK_ORDERS.filter(order => order.userId === user?.id);
  
  // Filter orders based on search term
  const filteredOrders = userOrders.filter(order => {
    return (
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pendente': 
        return 'bg-amber-500/20 text-amber-500 border-amber-500';
      case 'processando': 
        return 'bg-blue-500/20 text-blue-500 border-blue-500';
      case 'entregue': 
        return 'bg-green-500/20 text-green-500 border-green-500';
      default: 
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': 
        return <Clock className="w-4 h-4 mr-1" />;
      case 'processando': 
        return <AlertCircle className="w-4 h-4 mr-1" />;
      case 'entregue': 
        return <CheckCircle className="w-4 h-4 mr-1" />;
      default: 
        return null;
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'card': return 'Cartão';
      case 'robux-transfer': return 'Transferência Robux';
      default: return 'N/A';
    }
  };

  if (!user) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Meus Pedidos</h1>
            <p className="text-gray-400">Visualize o histórico de todas as suas compras</p>
          </div>
          
          {userOrders.length > 0 ? (
            <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="font-medium">Histórico de Pedidos</h2>
                <div className="w-64">
                  <Input 
                    placeholder="Pesquisar pedidos..." 
                    className="bg-dark-bg border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-neon-blue/5">
                      <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                      <TableCell>R$ {order.totalAmount.toFixed(2).replace('.', ',')}</TableCell>
                      <TableCell>{getPaymentMethodName(order.paymentMethod)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{order.created}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate('/order-confirmation', { state: { orderId: order.id } })}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="bg-darker-bg rounded-lg border border-gray-700 p-8 text-center">
              <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-neon-blue" />
              </div>
              <h2 className="text-xl font-bold mb-2">Nenhum pedido encontrado</h2>
              <p className="text-gray-400 mb-6">Você ainda não realizou nenhuma compra em nossa plataforma.</p>
              <Button onClick={() => navigate('/catalog')} className="bg-neon-blue hover:bg-neon-blue/80">
                Explorar produtos
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
