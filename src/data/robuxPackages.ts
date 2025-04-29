
export interface RobuxPackage {
  id: number;
  name: string;
  robux: string;
  price: string;
  features: string[];
  popular: boolean;
  tier: string;
}

// All packages combined in one flat array
export const allPackages: RobuxPackage[] = [
  // Starter plans
  {
    id: 101,
    name: "Starter",
    robux: "400",
    price: "R$19,90",
    features: ["Entrega Instantânea", "Suporte por Email", "Suporte Discord"],
    popular: false,
    tier: "starter"
  },
  {
    id: 102,
    name: "Starter Plus",
    robux: "600",
    price: "R$27,90",
    features: ["Entrega Instantânea", "Suporte por Email", "Suporte Discord"],
    popular: false,
    tier: "starter"
  },
  {
    id: 103,
    name: "Starter Pro",
    robux: "700",
    price: "R$30,90",
    features: ["Entrega Instantânea", "Suporte por Email", "Suporte Discord", "Bônus Exclusivos"],
    popular: false,
    tier: "starter"
  },
  
  // Standard plans
  {
    id: 201,
    name: "Standard",
    robux: "800",
    price: "R$34,90",
    features: ["Entrega Instantânea", "Suporte Prioritário", "Suporte Discord", "Benefícios de Membro"],
    popular: true,
    tier: "standard"
  },
  {
    id: 202,
    name: "Standard Plus",
    robux: "1200",
    price: "R$48,90",
    features: ["Entrega Instantânea", "Suporte Prioritário", "Suporte Discord", "Benefícios de Membro"],
    popular: false,
    tier: "standard"
  },
  {
    id: 203,
    name: "Standard Pro",
    robux: "1500",
    price: "R$58,90",
    features: ["Entrega Instantânea", "Suporte Prioritário", "Suporte Discord", "Benefícios de Membro", "Bônus Exclusivos"],
    popular: true,
    tier: "standard"
  },
  
  // Pro plans
  {
    id: 301,
    name: "Pro Gamer",
    robux: "1700",
    price: "R$69,90",
    features: ["Entrega Instantânea", "Suporte VIP", "Suporte Discord", "Benefícios de Membro", "Vantagens Exclusivas"],
    popular: false,
    tier: "pro"
  },
  {
    id: 302,
    name: "Pro Gamer Plus",
    robux: "2200",
    price: "R$87,90",
    features: ["Entrega Instantânea", "Suporte VIP", "Suporte Discord", "Benefícios de Membro", "Vantagens Exclusivas"],
    popular: false,
    tier: "pro"
  },
  {
    id: 303,
    name: "Pro Gamer Ultimate",
    robux: "3000",
    price: "R$115,90",
    features: ["Entrega Instantânea", "Suporte VIP", "Suporte Discord", "Benefícios de Membro", "Vantagens Exclusivas", "Bônus Mensais"],
    popular: false,
    tier: "pro"
  },
  
  // God plans
  {
    id: 401,
    name: "God",
    robux: "4000",
    price: "R$159,90",
    features: ["Entrega Instantânea", "Suporte Premium", "Suporte Discord Exclusivo", "Benefícios VIP", "Vantagens Exclusivas", "Acesso Antecipado"],
    popular: false,
    tier: "god"
  },
  {
    id: 402,
    name: "God Plus",
    robux: "5000",
    price: "R$189,90",
    features: ["Entrega Instantânea", "Suporte Premium", "Suporte Discord Exclusivo", "Benefícios VIP", "Vantagens Exclusivas", "Acesso Antecipado"],
    popular: true,
    tier: "god"
  },
  {
    id: 403,
    name: "God Ultimate",
    robux: "6000",
    price: "R$219,90",
    features: ["Entrega Instantânea", "Suporte Premium", "Suporte Discord Exclusivo", "Benefícios VIP", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Exclusivos"],
    popular: false,
    tier: "god"
  },
  
  // Premium plans
  {
    id: 501,
    name: "Hacker",
    robux: "7000",
    price: "R$249,90",
    features: ["Entrega Instantânea", "Suporte Dedicado", "Suporte Discord Privado", "Benefícios Premium", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Raros"],
    popular: false,
    tier: "premium"
  },
  {
    id: 502,
    name: "Admin",
    robux: "8500",
    price: "R$299,90",
    features: ["Entrega Instantânea", "Suporte Exclusivo", "Suporte Discord Privado", "Benefícios Premium", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Raros", "Convites Especiais"],
    popular: true,
    tier: "premium"
  },
  {
    id: 503,
    name: "VIP",
    robux: "10000",
    price: "R$349,90",
    features: ["Entrega Instantânea", "Suporte Personalizado", "Suporte Discord Privado", "Benefícios Premium", "Vantagens Exclusivas", "Acesso Antecipado", "Itens Legendários", "Convites VIP", "Eventos Exclusivos"],
    popular: true,
    tier: "premium"
  }
];
