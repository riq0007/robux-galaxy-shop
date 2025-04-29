
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { QrCode, CreditCard, Coins, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import QRCode from '@/components/QRCode';

// Form validation schema
const checkoutSchema = z.object({
  robloxNickname: z.string().min(2, { message: "Nickname do Roblox é obrigatório" }),
  discordHandle: z.string().min(2, { message: "@ do Discord é obrigatório" }).regex(/^.+#\d{4}$|^.+$/, {
    message: "Formato incorreto, use seu nome de usuário do Discord"
  }),
  paymentMethod: z.enum(["pix", "card", "robux-transfer"]),
  // Card fields (conditional)
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, getTotal, checkout } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      robloxNickname: "",
      discordHandle: "",
      paymentMethod: "pix",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    },
  });
  
  // Watch for payment method changes
  const paymentMethod = form.watch("paymentMethod");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the order details
      const orderDetails = {
        robloxNickname: values.robloxNickname,
        discordHandle: values.discordHandle,
        paymentMethod: values.paymentMethod as 'pix' | 'card' | 'robux-transfer',
        paymentProof: paymentProof || undefined,
        cardDetails: values.paymentMethod === 'card' ? {
          cardNumber: values.cardNumber || '',
          expiry: values.cardExpiry || '',
          cvv: values.cardCvv || '',
        } : undefined,
      };
      
      // Process the checkout
      await checkout(orderDetails);
      
    } catch (error) {
      toast({
        title: "Erro no checkout",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate PIX info
  const pixKey = "henrisai2006@gmail.com";
  const totalAmount = getTotal();
  const pixData = `${pixKey};${totalAmount.toFixed(2)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
              <span className="neon-text-blue">Finalizar</span> Compra
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Order summary */}
              <div className="md:col-span-1">
                <Card className="bg-darker-bg border-gray-700">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{item.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-700 mt-4 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-neon-blue">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Checkout form */}
              <div className="md:col-span-2">
                <Card className="bg-darker-bg border-gray-700">
                  <CardHeader>
                    <CardTitle>Informações de Checkout</CardTitle>
                    <CardDescription>Preencha os dados abaixo para finalizar sua compra</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* User information */}
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="robloxNickname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nickname do Roblox</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Seu nickname no Roblox" 
                                    {...field} 
                                    className="bg-dark-bg border-gray-700"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Seu nickname é necessário para identificação na entrega
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="discordHandle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>@ do Discord</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Seu nome de usuário no Discord" 
                                    {...field} 
                                    className="bg-dark-bg border-gray-700"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Seu Discord será utilizado para contato e suporte
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Payment methods */}
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Método de Pagamento</FormLabel>
                                <FormControl>
                                  <Tabs 
                                    defaultValue="pix" 
                                    value={field.value} 
                                    onValueChange={field.onChange}
                                    className="w-full"
                                  >
                                    <TabsList className="grid grid-cols-3 mb-4">
                                      <TabsTrigger value="pix" className="flex items-center gap-2">
                                        <QrCode className="w-4 h-4" />
                                        <span>PIX</span>
                                      </TabsTrigger>
                                      
                                      <TabsTrigger value="card" className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        <span>Cartão</span>
                                      </TabsTrigger>
                                      
                                      <TabsTrigger value="robux-transfer" className="flex items-center gap-2">
                                        <Coins className="w-4 h-4" />
                                        <span>Robux</span>
                                      </TabsTrigger>
                                    </TabsList>
                                    
                                    {/* PIX payment */}
                                    <TabsContent value="pix" className="space-y-4">
                                      <div className="p-4 border border-gray-700 rounded-lg">
                                        <div className="text-center mb-4">
                                          <QRCode value={pixData} size={200} />
                                        </div>
                                        
                                        <div className="text-center mb-4">
                                          <p className="font-medium">Chave PIX:</p>
                                          <div className="bg-dark-bg border border-gray-700 rounded p-2 flex items-center justify-between">
                                            <span className="text-neon-blue">{pixKey}</span>
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => {
                                                navigator.clipboard.writeText(pixKey);
                                                toast({
                                                  title: "Chave PIX copiada!",
                                                  description: "A chave foi copiada para a área de transferência.",
                                                });
                                              }}
                                              className="h-auto py-1"
                                            >
                                              Copiar
                                            </Button>
                                          </div>
                                        </div>
                                        
                                        <div className="text-center mb-4">
                                          <p className="font-medium">Valor a pagar:</p>
                                          <p className="text-xl font-bold text-neon-blue">R$ {totalAmount.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <p className="text-sm text-gray-400">
                                            Após realizar o pagamento, envie o comprovante:
                                          </p>
                                          <Input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="bg-dark-bg border-gray-700"
                                          />
                                          <p className="text-xs text-gray-500">
                                            Formatos aceitos: JPG, PNG, PDF (máx. 5MB)
                                          </p>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    
                                    {/* Card payment */}
                                    <TabsContent value="card" className="space-y-4">
                                      <div className="p-4 border border-gray-700 rounded-lg">
                                        <p className="text-sm text-gray-400 mb-4">
                                          Este é um fluxo simulado para testes. Informe os dados abaixo:
                                        </p>
                                        
                                        <div className="space-y-4">
                                          <FormField
                                            control={form.control}
                                            name="cardNumber"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Número do Cartão</FormLabel>
                                                <FormControl>
                                                  <Input 
                                                    placeholder="1234 5678 9012 3456" 
                                                    {...field} 
                                                    className="bg-dark-bg border-gray-700"
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          
                                          <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                              control={form.control}
                                              name="cardExpiry"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>Validade</FormLabel>
                                                  <FormControl>
                                                    <Input 
                                                      placeholder="MM/AA" 
                                                      {...field} 
                                                      className="bg-dark-bg border-gray-700"
                                                    />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            
                                            <FormField
                                              control={form.control}
                                              name="cardCvv"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>CVV</FormLabel>
                                                  <FormControl>
                                                    <Input 
                                                      placeholder="123" 
                                                      {...field} 
                                                      className="bg-dark-bg border-gray-700"
                                                    />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    
                                    {/* Robux transfer */}
                                    <TabsContent value="robux-transfer" className="space-y-4">
                                      <div className="p-4 border border-gray-700 rounded-lg">
                                        <p className="font-medium mb-3">Transferência direta de Robux</p>
                                        <p className="text-sm text-gray-400 mb-4">
                                          Para pagar com Robux, transfira a quantidade equivalente para nossa conta:
                                        </p>
                                        
                                        <div className="bg-dark-bg border border-gray-700 rounded p-3 mb-4">
                                          <p className="font-medium">Username:</p>
                                          <p className="text-neon-blue">RobuxGalaxyOficial</p>
                                        </div>
                                        
                                        <div className="mb-4">
                                          <p className="font-medium">Valor a transferir:</p>
                                          <p className="text-xl font-bold text-neon-blue">
                                            {Math.round(totalAmount * 10)} Robux
                                          </p>
                                        </div>
                                        
                                        <div className="text-sm text-gray-400">
                                          <p>Importante:</p>
                                          <ul className="list-disc pl-5 space-y-1 mt-2">
                                            <li>Não esqueça de confirmar seu nickname no formulário acima</li>
                                            <li>Após a transferência, seu pedido será verificado manualmente</li>
                                            <li>A confirmação será enviada via Discord</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processando...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Check className="mr-2 h-4 w-4" />
                              Finalizar Pedido
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
