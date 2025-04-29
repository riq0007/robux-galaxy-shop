
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { MOCK_ORDERS } from '@/contexts/CartContext';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderId = location.state?.orderId;
  const order = MOCK_ORDERS.find(o => o.id === orderId);
  
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
              <p className="text-gray-400 mb-8">Não foi possível encontrar os detalhes do seu pedido.</p>
              
              <Button onClick={() => navigate('/')} className="bg-neon-blue hover:bg-neon-blue/80">
                Voltar para a página inicial
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  const getStatusInfo = () => {
    switch (order.paymentMethod) {
      case 'pix':
        return {
          title: "Aguardando confirmação do pagamento",
          description: "Recebemos seu comprovante PIX e estamos verificando o pagamento. Você receberá uma notificação quando seu pedido for confirmado."
        };
      case 'card':
        return {
          title: "Pagamento processado com sucesso",
          description: "Seu pedido foi confirmado e será entregue em breve. Você receberá uma notificação quando seu pedido for entregue."
        };
      case 'robux-transfer':
        return {
          title: "Aguardando transferência de Robux",
          description: "Estamos aguardando a confirmação da sua transferência de Robux. Assim que confirmada, seu pedido será entregue."
        };
      default:
        return {
          title: "Pedido recebido",
          description: "Seu pedido foi recebido e está sendo processado."
        };
    }
  };
  
  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                
                <h1 className="text-2xl font-bold mb-2">Pedido Realizado</h1>
                <p className="text-gray-400 mb-6">
                  Seu pedido #{order.id.split('-')[1]} foi registrado com sucesso!
                </p>
                
                <div className="border border-gray-700 rounded-lg p-4 mb-6">
                  <h2 className="font-medium text-neon-blue mb-2">{statusInfo.title}</h2>
                  <p className="text-sm text-gray-400">{statusInfo.description}</p>
                </div>
                
                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="text-sm text-gray-400">ID do Pedido</h3>
                    <p className="font-medium">{order.id.split('-')[1]}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400">Data do Pedido</h3>
                    <p className="font-medium">{order.created}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400">Total</h3>
                    <p className="font-medium">R$ {order.totalAmount.toFixed(2).replace('.', ',')}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400">Método de Pagamento</h3>
                    <p className="font-medium">
                      {order.paymentMethod === 'pix' && 'PIX'}
                      {order.paymentMethod === 'card' && 'Cartão de Crédito'}
                      {order.paymentMethod === 'robux-transfer' && 'Transferência de Robux'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400">Status</h3>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mt-1
                      {order.status === 'pendente' && 'bg-amber-500/20 text-amber-500 border-amber-500'}
                      {order.status === 'processando' && 'bg-blue-500/20 text-blue-500 border-blue-500'}
                      {order.status === 'entregue' && 'bg-green-500/20 text-green-500 border-green-500'}
                    ">
                      {order.status === 'pendente' && 'Pendente'}
                      {order.status === 'processando' && 'Processando'}
                      {order.status === 'entregue' && 'Entregue'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 mt-6">
                  <Button onClick={() => navigate('/')} className="bg-neon-blue hover:bg-neon-blue/80">
                    Voltar para a Página Inicial
                  </Button>
                  
                  <Button variant="ghost" onClick={() => navigate('/catalog')} className="text-gray-400">
                    Continuar Comprando
                  </Button>
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

export default OrderConfirmation;
