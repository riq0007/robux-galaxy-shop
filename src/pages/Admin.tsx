
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, FileText, History, 
  Bell, Settings, LogOut, User, 
  CheckCircle, Clock, AlertCircle, Download, Search, Filter, FileUp, MessageCircle, Eye
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { MOCK_ORDERS, Order } from '@/contexts/CartContext';

// Define proper TypeScript interface for users
interface User {
  id: string;
  name: string;
  email: string;
  created: string;
  role?: string;
}

// Mock data for demo users
const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'João Silva', email: 'joao@example.com', created: '2023-10-15' },
  { id: 'user-2', name: 'Maria Oliveira', email: 'maria@example.com', created: '2023-11-20' },
  { id: 'user-3', name: 'Pedro Santos', email: 'pedro@example.com', created: '2023-12-05' },
  { id: 'user-4', name: 'Ana Costa', email: 'ana@example.com', created: '2024-01-10' },
  { id: 'user-5', name: 'Lucas Ferreira', email: 'lucas@example.com', created: '2024-02-12' },
];

// Define action log interface
interface ActionLog {
  id: string;
  action: string;
  details: string;
  adminId: string;
  adminName: string;
  timestamp: string;
}

// Mock action logs
const MOCK_ACTION_LOGS: ActionLog[] = [];

const Admin = () => {
  const { user, isAdmin, requireAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orderStatus, setOrderStatus] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [deliveryProof, setDeliveryProof] = useState<File | null>(null);
  const [commentText, setCommentText] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin, redirect if not
    requireAdmin();
    
    // Load orders from mock database
    setOrders(MOCK_ORDERS);
    setActionLogs(MOCK_ACTION_LOGS);
  }, [requireAdmin]);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.robloxNickname && order.robloxNickname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.discordHandle && order.discordHandle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = orderStatus === 'all' || order.status === orderStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDeliveryProof(e.target.files[0]);
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus as 'pendente' | 'processando' | 'entregue', 
            ...(newStatus === 'entregue' ? { deliveredAt: new Date().toISOString().slice(0, 16).replace('T', ' ') } : {})
          } 
        : order
    ));
    
    // Add action log
    const newLog: ActionLog = {
      id: `log-${Date.now()}`,
      action: 'update_status',
      details: `Pedido #${orderId.split('-')[1]} marcado como ${newStatus}`,
      adminId: user?.id || '',
      adminName: user?.name || '',
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    
    setActionLogs(prev => [newLog, ...prev]);
    MOCK_ACTION_LOGS.unshift(newLog);
    
    toast({
      title: "Status atualizado",
      description: `Pedido #${orderId.split('-')[1]} marcado como ${newStatus}`,
    });
  };

  const handleAddComment = (orderId: string) => {
    if (!commentText.trim()) {
      toast({
        title: "Erro",
        description: "O comentário não pode estar vazio",
        variant: "destructive"
      });
      return;
    }
    
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, comment: commentText } 
        : order
    ));
    
    // Add action log
    const newLog: ActionLog = {
      id: `log-${Date.now()}`,
      action: 'add_comment',
      details: `Comentário adicionado ao pedido #${orderId.split('-')[1]}`,
      adminId: user?.id || '',
      adminName: user?.name || '',
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    
    setActionLogs(prev => [newLog, ...prev]);
    MOCK_ACTION_LOGS.unshift(newLog);
    
    toast({
      title: "Comentário adicionado",
      description: `Comentário adicionado ao pedido #${orderId.split('-')[1]}`,
    });
    
    setCommentText('');
  };

  const exportToCsv = () => {
    // Create CSV content with enhanced fields
    const headers = "ID,Usuário,Nickname Roblox,Discord,Produto,Valor,Forma de Pagamento,Status,Data,ID da Transação\n";
    const rows = orders.map(order => 
      `${order.id},${order.userName},${order.robloxNickname || 'N/A'},${order.discordHandle || 'N/A'},${order.items?.map(item => item.name).join(';') || 'N/A'},R$ ${order.totalAmount?.toFixed(2) || '0.00'},${order.paymentMethod || 'N/A'},${order.status},${order.created},${order.transactionId || 'N/A'}`
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
    
    // Add action log
    const newLog: ActionLog = {
      id: `log-${Date.now()}`,
      action: 'export_data',
      details: 'Relatório de pedidos exportado',
      adminId: user?.id || '',
      adminName: user?.name || '',
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    
    setActionLogs(prev => [newLog, ...prev]);
    MOCK_ACTION_LOGS.unshift(newLog);
  };

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

  const getPaymentMethodName = (method: string | undefined) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'card': return 'Cartão';
      case 'robux-transfer': return 'Transferência Robux';
      default: return 'N/A';
    }
  };

  if (!isAdmin) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

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
                onClick={() => setActiveTab('logs')}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-md ${
                  activeTab === 'logs' 
                    ? 'bg-neon-blue/20 text-white' 
                    : 'text-gray-400 hover:bg-neon-blue/10 hover:text-white'
                }`}
              >
                <History className="w-5 h-5" />
                <span>Histórico de Logs</span>
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
                {activeTab === 'logs' && 'Histórico de Logs'}
                {activeTab === 'reports' && 'Relatórios e Métricas'}
              </h1>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={`Pesquisar ${
                    activeTab === 'users' 
                      ? 'usuários' 
                      : activeTab === 'logs' 
                        ? 'logs' 
                        : 'pedidos'
                  }...`} 
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
              <div className="space-y-6">
                <Tabs value={orderStatus} onValueChange={setOrderStatus} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                    <TabsTrigger value="processando">Processando</TabsTrigger>
                    <TabsTrigger value="entregue">Entregues</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="bg-darker-bg rounded-lg border border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <h2 className="font-medium">Lista de Pedidos</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-400">
                        <Filter className="w-4 h-4 mr-2" />
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
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Nick Roblox</TableHead>
                        <TableHead>Discord</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <TableRow key={order.id} className="hover:bg-neon-blue/5">
                            <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                            <TableCell>{order.userName}</TableCell>
                            <TableCell>{order.robloxNickname || 'N/A'}</TableCell>
                            <TableCell>{order.discordHandle || 'N/A'}</TableCell>
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
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-400">
                            {searchTerm ? 'Nenhum pedido encontrado com esses filtros.' : 'Ainda não há pedidos registrados.'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
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
                      <TableHead>Função</TableHead>
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
                        <TableCell>{user.role || 'usuário'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Ver detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* Logs tab */}
            {activeTab === 'logs' && (
              <div className="bg-darker-bg rounded-lg border border-gray-700 p-6">
                <h2 className="text-xl font-bold mb-4">Histórico de Atividades</h2>
                <p className="text-gray-400 mb-6">Registro de todas as ações realizadas pelos administradores.</p>
                
                <div className="space-y-4">
                  {actionLogs.length > 0 ? (
                    actionLogs.map((log) => (
                      <div key={log.id} className="flex items-start p-4 border border-gray-700 rounded-md">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.action === 'update_status' ? 'bg-blue-500/20' : 
                          log.action === 'add_comment' ? 'bg-green-500/20' : 
                          'bg-amber-500/20'
                        }`}>
                          {log.action === 'update_status' ? (
                            <AlertCircle className="w-6 h-6 text-blue-500" />
                          ) : log.action === 'add_comment' ? (
                            <MessageCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <FileText className="w-6 h-6 text-amber-500" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">
                            {log.action === 'update_status' ? 'Status atualizado' : 
                             log.action === 'add_comment' ? 'Comentário adicionado' :
                             log.action === 'export_data' ? 'Dados exportados' :
                             'Ação do administrador'}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {log.details}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Por {log.adminName} - {log.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      Nenhum registro de atividade encontrado.
                    </div>
                  )}
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
                    <p className="text-3xl font-bold">
                      R$ {orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-sm text-green-500 mt-2">↑ {orders.length} pedidos realizados</p>
                  </div>
                  
                  <div className="bg-dark-bg border border-gray-700 rounded-lg p-6">
                    <h3 className="text-gray-400 mb-2">Pedidos Pendentes</h3>
                    <p className="text-3xl font-bold">
                      {orders.filter(order => order.status === 'pendente').length}
                    </p>
                    <p className="text-sm text-amber-500 mt-2">
                      {orders.filter(order => order.status === 'pendente').length > 0 ? 'Aguardando processamento' : 'Nenhum pedido pendente'}
                    </p>
                  </div>
                  
                  <div className="bg-dark-bg border border-gray-700 rounded-lg p-6">
                    <h3 className="text-gray-400 mb-2">Usuários Cadastrados</h3>
                    <p className="text-3xl font-bold">{users.length}</p>
                    <p className="text-sm text-green-500 mt-2">↑ {users.filter(u => u.created.startsWith('2024')).length} novos em 2024</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-dark-bg border border-gray-700 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Distribuição de Vendas por Método de Pagamento</h3>
                  <div className="h-64 flex items-end space-x-4">
                    {['pix', 'card', 'robux-transfer'].map((method, i) => {
                      const count = orders.filter(o => o.paymentMethod === method).length;
                      const percentage = orders.length > 0 ? count / orders.length : 0;
                      return (
                        <div key={method} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full ${
                              method === 'pix' ? 'h-[' + (percentage * 100) + '%] bg-neon-blue/70' : 
                              method === 'card' ? 'h-[' + (percentage * 100) + '%] bg-neon-blue/80' : 
                              'h-[' + (percentage * 100) + '%] bg-neon-purple/70'
                            } rounded-t-md`}
                            style={{ height: `${Math.max(percentage * 100, 10)}%` }}
                          ></div>
                          <div className="mt-2 text-xs text-gray-400">
                            {method === 'pix' ? 'PIX' : 
                             method === 'card' ? 'Cartão' : 
                             'Robux'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {count} {count === 1 ? 'pedido' : 'pedidos'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
        
        {/* Order detail modal */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
            <DialogContent className="bg-darker-bg border border-gray-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">Detalhes do Pedido #{selectedOrder.id.split('-')[1]}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Visualize e gerencie os detalhes deste pedido
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Usuário</h3>
                  <p className="font-medium">{selectedOrder.userName}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">ID do Usuário</h3>
                  <p className="font-medium">#{selectedOrder.userId.split('-')[1]}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Nickname do Roblox</h3>
                  <p className="font-medium">{selectedOrder.robloxNickname || 'N/A'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Discord</h3>
                  <p className="font-medium">{selectedOrder.discordHandle || 'N/A'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Método de Pagamento</h3>
                  <p className="font-medium">{getPaymentMethodName(selectedOrder.paymentMethod)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Valor Total</h3>
                  <p className="font-medium">R$ {selectedOrder.totalAmount.toFixed(2).replace('.', ',')}</p>
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
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">ID da Transação</h3>
                  <p className="font-medium">{selectedOrder.transactionId || 'N/A'}</p>
                </div>
                
                {selectedOrder.deliveredAt && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Entregue em</h3>
                    <p className="font-medium">{selectedOrder.deliveredAt}</p>
                  </div>
                )}
                
                <div className="col-span-2">
                  <h3 className="text-sm text-gray-400 mb-1">Itens do Pedido</h3>
                  <div className="bg-dark-bg border border-gray-700 rounded-lg p-3 space-y-2">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedOrder.comment && (
                  <div className="col-span-2">
                    <h3 className="text-sm text-gray-400 mb-1">Comentário</h3>
                    <p className="font-medium p-3 bg-dark-bg border border-gray-700 rounded-lg">
                      {selectedOrder.comment}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mt-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Atualizar Status</h3>
                  <div className="flex flex-wrap gap-2">
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
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Adicionar Comentário</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700"
                      onClick={() => handleAddComment(selectedOrder.id)}
                    >
                      Salvar Comentário
                    </Button>
                  </div>
                  <Textarea 
                    placeholder="Ex: Enviado pelo Discord..." 
                    className="bg-dark-bg border-gray-700 mb-2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Upload de Comprovante</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700"
                      disabled={!deliveryProof}
                    >
                      <FileUp className="w-4 h-4 mr-1" />
                      Enviar Arquivo
                    </Button>
                  </div>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="bg-dark-bg border-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: JPG, PNG, PDF (máx. 5MB)
                  </p>
                </div>
              </div>
              
              <DialogFooter className="pt-4 mt-4 border-t border-gray-700">
                <Button onClick={() => setSelectedOrder(null)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Admin;
