import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, FileText, History, 
  Bell, Settings, LogOut, User, 
  CheckCircle, Clock, AlertCircle, Download, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';

// Define proper TypeScript interface for orders
interface Order {
  id: string;
  userId: string;
  user: string;
  product: string;
  price: string;
  status: string;
  created: string;
  deliveredAt?: string;
  comment?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  created: string;
}

// Mock data for demo
const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'João Silva', email: 'joao@example.com', created: '2023-10-15' },
  { id: 'user-2', name: 'Maria Oliveira', email: 'maria@example.com', created: '2023-11-20' },
  { id: 'user-3', name: 'Pedro Santos', email: 'pedro@example.com', created: '2023-12-05' },
  { id: 'user-4', name: 'Ana Costa', email: 'ana@example.com', created: '2024-01-10' },
  { id: 'user-5', name: 'Lucas Ferreira', email: 'lucas@example.com', created: '2024-02-12' },
];

const MOCK_ORDERS: Order[] = [
  { 
    id: 'order-1', 
    userId: 'user-2', 
    user: 'Maria Oliveira',
    product: 'Robux 1000', 
    price: 'R$55,90', 
    status: 'pendente',
    created: '2024-04-25 14:30' 
  },
  { 
    id: 'order-2', 
    userId: 'user-1', 
    user: 'João Silva',
    product: 'Robux 400', 
    price: 'R$19,90', 
    status: 'processando',
    created: '2024-04-26 09:15' 
  },
  { 
    id: 'order-3', 
    userId: 'user-4', 
    user: 'Ana Costa',
    product: 'Robux 2500', 
    price: 'R$115,90', 
    status: 'entregue',
    created: '2024-04-24 16:45',
    deliveredAt: '2024-04-24 18:20',
    comment: 'Enviado via Discord' 
  },
  { 
    id: 'order-4', 
    userId: 'user-3', 
    user: 'Pedro Santos',
    product: 'Robux 800', 
    price: 'R$42,90', 
    status: 'pendente',
    created: '2024-04-27 11:05' 
  },
  { 
    id: 'order-5', 
    userId: 'user-5', 
    user: 'Lucas Ferreira',
    product: 'Robux 5000', 
    price: 'R$179,90', 
    status: 'processando',
    created: '2024-04-27 13:20' 
  },
];

const Admin = () => {
  const { user, isAdmin, requireAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin, redirect if not
    requireAdmin();
  }, [requireAdmin]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus, 
            ...(newStatus === 'entregue' ? { deliveredAt: new Date().toISOString().slice(0, 16).replace('T', ' ') } : {})
          } 
        : order
    ));
    
    toast({
      title: "Status atualizado",
      description: `Pedido #${orderId.split('-')[1]} marcado como ${newStatus}`,
    });
    
    setSelectedOrder(null);
  };

  const handleAddComment = (orderId: string, comment: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, comment } 
        : order
    ));
    
    toast({
      title: "Comentário adicionado",
      description: `Comentário adicionado ao pedido #${orderId.split('-')[1]}`,
    });
    
    setSelectedOrder(null);
  };

  const exportToCsv = () => {
    // Create CSV content
    const headers = "ID,Usuário,Produto,Preço,Status,Data\n";
    const rows = orders.map(order => 
      `${order.id},${order.user},${order.product},${order.price},${order.status},${order.created}`
    ).join("\n");
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pedidos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    
    // Trigger download and clean up
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportação concluída",
      description: "Relatório de pedidos exportado com sucesso",
    });
  };

  if (!isAdmin) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

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

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-darker-bg border-r border-neon-blue/20 flex flex-col">
          <div className="p-6 border-b border-neon-blue/20">
            <div className="flex items-center justify-center">
              <span className="text-xl font-bold neon-text-blue">ADMIN</span>
              <span className="text-xl font-bold neon-text-purple">PANEL</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-md ${
                  activeTab === 'orders' 
                    ? 'bg-neon-blue/20 text-white' 
                    : 'text-gray-400 hover:bg-neon-blue/10 hover:text-white'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Pedidos</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-md ${
                  activeTab === 'users' 
                    ? 'bg-neon-blue/20 text-white' 
                    : 'text-gray-400 hover:bg-neon-blue/10 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Usuários</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-md ${
                  activeTab === 'history' 
                    ? 'bg-neon-blue/20 text-white' 
                    : 'text-gray-400 hover:bg-neon-blue/10 hover:text-white'
                }`}
              >
                <History className="w-5 h-5" />
                <span>Histórico</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-md ${
                  activeTab === 'reports' 
                    ? 'bg-neon-blue/20 text-white' 
                    : 'text-gray-400 hover:bg-neon-blue/10 hover:text-white'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Relatórios</span>
              </button>
            </nav>
          </div>
          
          <div className="p-4 border-t border-neon-blue/20">
            <div className="flex items-center mb-4 px-4">
              <div className="w-10 h-10 rounded-full bg-neon-purple/30 flex items-center justify-center">
                <User className="w-6 h-6 text-neon-purple" />
              </div>
              <div className="ml-3">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-400">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-400">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-400" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-darker-bg border-b border-neon-blue/20 py-4 px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">
                {activeTab === 'orders' && 'Gerenciar Pedidos'}
                {activeTab === 'users' && 'Usuários Cadastrados'}
                {activeTab === 'history' && 'Histórico de Atividades'}
                {activeTab === 'reports' && 'Relatórios'}
              </h1>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={`Pesquisar ${activeTab === 'users' ? 'usuários' : 'pedidos'}...`} 
                  className="pl-9 w-64 bg-dark-bg border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </header>
          
          {/* Content area */}
          <main className="flex-1 overflow-auto p-6">
            {/* Orders tab */}
            {activeTab === 'orders' && (
              <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="font-medium">Lista de Pedidos</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                      Filtrar
                    </Button>
                    <Button onClick={exportToCsv} variant="outline" size="sm" className="border-gray-700 text-gray-400">
                      <Download className="w-4 h-4 mr-1" />
                      Exportar
                    </Button>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-neon-blue/5">
                        <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                        <TableCell>{order.user}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.price}</TableCell>
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
                            onClick={() => setSelectedOrder(order)}
                          >
                            Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* Users tab */}
            {activeTab === 'users' && (
              <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="font-medium">Usuários Registrados</h2>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Registro</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-neon-blue/5">
                        <TableCell className="font-medium">#{user.id.split('-')[1]}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.created}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Ver detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* History tab */}
            {activeTab === 'history' && (
              <div className="bg-darker-bg rounded-lg border border-gray-700 p-6">
                <h2 className="text-xl font-bold mb-4">Histórico de Atividades</h2>
                <p className="text-gray-400">Acompanhe todas as ações realizadas na plataforma.</p>
                
                <div className="mt-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start p-4 border border-gray-700 rounded-md">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        i % 3 === 0 ? 'bg-green-500/20' : i % 3 === 1 ? 'bg-blue-500/20' : 'bg-amber-500/20'
                      }`}>
                        {i % 3 === 0 ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : i % 3 === 1 ? (
                          <Package className="w-6 h-6 text-blue-500" />
                        ) : (
                          <User className="w-6 h-6 text-amber-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">
                          {i % 3 === 0 ? 'Pedido entregue' : i % 3 === 1 ? 'Novo pedido recebido' : 'Novo usuário registrado'}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {i % 3 === 0 
                            ? 'Pedido #10' + (i + 1) + ' foi marcado como entregue.' 
                            : i % 3 === 1 
                              ? 'Pedido #10' + (i + 2) + ' foi recebido.' 
                              : 'Usuário "Novo Usuário ' + (i + 1) + '" foi registrado.'
                          }
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {`2024-04-${28 - i} ${10 + i}:${10 + i * 5}:00`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reports tab */}
            {activeTab === 'reports' && (
              <div className="bg-darker-bg rounded-lg border border-gray-700 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Relatórios</h2>
                  <Button onClick={exportToCsv} variant="outline" className="border-neon-blue text-neon-blue">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Relatório
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-dark-bg border border-gray-700 rounded-lg p-6">
                    <h3 className="text-gray-400 mb-2">Total de Vendas</h3>
                    <p className="text-3xl font-bold">R$ 414,50</p>
                    <p className="text-sm text-green-500 mt-2">↑ 12% em relação ao mês anterior</p>
                  </div>
                  
                  <div className="bg-dark-bg border border-gray-700 rounded-lg p-6">
                    <h3 className="text-gray-400 mb-2">Pedidos Pendentes</h3>
                    <p className="text-3xl font-bold">2</p>
                    <p className="text-sm text-amber-500 mt-2">↑ 1 novo pedido hoje</p>
                  </div>
                  
                  <div className="bg-dark-bg border border-gray-700 rounded-lg p-6">
                    <h3 className="text-gray-400 mb-2">Usuários Cadastrados</h3>
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-green-500 mt-2">↑ 2 novos esta semana</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-dark-bg border border-gray-700 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Distribuição de Vendas por Plano</h3>
                  <div className="h-64 flex items-end space-x-4">
                    {['Starter', 'Standard', 'Pro', 'God', 'Hacker'].map((plan, i) => (
                      <div key={plan} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-full ${
                            i === 0 ? 'h-1/4 bg-neon-blue/60' : 
                            i === 1 ? 'h-2/4 bg-neon-blue/70' : 
                            i === 2 ? 'h-3/4 bg-neon-blue/80' : 
                            i === 3 ? 'h-2/4 bg-neon-purple/70' : 
                            'h-1/3 bg-neon-purple/60'
                          } rounded-t-md`}
                        ></div>
                        <div className="mt-2 text-xs text-gray-400">{plan}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
        
        {/* Order detail modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-darker-bg border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-bold">Detalhes do Pedido #{selectedOrder.id.split('-')[1]}</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  ×
                </Button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Usuário</h3>
                    <p className="font-medium">{selectedOrder.user}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">ID do Usuário</h3>
                    <p className="font-medium">#{selectedOrder.userId.split('-')[1]}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Produto</h3>
                    <p className="font-medium">{selectedOrder.product}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Valor</h3>
                    <p className="font-medium">{selectedOrder.price}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Data do Pedido</h3>
                    <p className="font-medium">{selectedOrder.created}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status}
                    </span>
                  </div>
                  
                  {selectedOrder.deliveredAt && (
                    <div>
                      <h3 className="text-sm text-gray-400 mb-1">Entregue em</h3>
                      <p className="font-medium">{selectedOrder.deliveredAt}</p>
                    </div>
                  )}
                  
                  {selectedOrder.comment && (
                    <div className="col-span-2">
                      <h3 className="text-sm text-gray-400 mb-1">Comentário</h3>
                      <p className="font-medium">{selectedOrder.comment}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="font-medium mb-3">Atualizar Status</h3>
                  <div className="flex space-x-2">
                    <Button 
                      variant={selectedOrder.status === 'pendente' ? 'default' : 'outline'} 
                      size="sm"
                      className={selectedOrder.status === 'pendente' ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-500 text-amber-500'}
                      onClick={() => updateOrderStatus(selectedOrder.id, 'pendente')}
                    >
                      Pendente
                    </Button>
                    <Button 
                      variant={selectedOrder.status === 'processando' ? 'default' : 'outline'} 
                      size="sm"
                      className={selectedOrder.status === 'processando' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-500 text-blue-500'}
                      onClick={() => updateOrderStatus(selectedOrder.id, 'processando')}
                    >
                      Processando
                    </Button>
                    <Button 
                      variant={selectedOrder.status === 'entregue' ? 'default' : 'outline'} 
                      size="sm"
                      className={selectedOrder.status === 'entregue' ? 'bg-green-500 hover:bg-green-600' : 'border-green-500 text-green-500'}
                      onClick={() => updateOrderStatus(selectedOrder.id, 'entregue')}
                    >
                      Entregue
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="font-medium mb-3">Adicionar Comentário</h3>
                  <Input 
                    placeholder="Ex: Enviado pelo Discord..." 
                    className="bg-dark-bg border-gray-700 mb-2"
                    defaultValue={selectedOrder.comment || ''}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment(selectedOrder.id, e.currentTarget.value);
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Ex: Enviado pelo Discord..."]') as HTMLInputElement;
                      if (input) {
                        handleAddComment(selectedOrder.id, input.value);
                      }
                    }}
                  >
                    Salvar Comentário
                  </Button>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setSelectedOrder(null)}>Fechar</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
