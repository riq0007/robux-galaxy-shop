
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

// Interface para os produtos
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  game?: string;
  rarity?: string;
  type?: string;
}

// Produtos do Blox Fruits
const bloxFruitsProducts: Product[] = [
  {
    id: 1,
    name: "Rocket Fruit",
    image: "/lovable-uploads/f1d4034d-8132-4770-bd58-be805387cc8c.png",
    rarity: "Common",
    type: "Natural",
    price: "R$19,90",
    description: "Um poder explosivo que permite lançar projéteis.",
    game: "Blox Fruits"
  },
  {
    id: 2,
    name: "Dragon Fruit",
    image: "/lovable-uploads/1b085fa0-e187-4cce-ac3e-db975685b3a4.png",
    rarity: "Mythical",
    type: "Ancient",
    price: "R$299,90",
    description: "O poder lendário do dragão ancestral.",
    game: "Blox Fruits"
  },
  // ... Adicione mais frutas aqui
];

// Produtos do Brookhaven
const brookhavenProducts: Product[] = [
  {
    id: 101,
    name: "Premium",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    description: "Acesso a recursos premium no jogo",
    price: "R$49,90",
    game: "Brookhaven RP",
    rarity: "Special",
    type: "Game Pass"
  },
  {
    id: 102,
    name: "VIP",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    description: "Status VIP e benefícios exclusivos",
    price: "R$99,90",
    game: "Brookhaven RP",
    rarity: "Rare",
    type: "Game Pass"
  }
];

// Produtos do Adopt Me
const adoptMeProducts: Product[] = [
  {
    id: 201,
    name: "VIP Pass",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    description: "Acesso VIP ao Adopt Me",
    price: "R$34,90",
    game: "Adopt Me!",
    rarity: "Uncommon",
    type: "Game Pass"
  },
  {
    id: 202,
    name: "Premium Pets",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    description: "Pets exclusivos e raros",
    price: "R$69,90",
    game: "Adopt Me!",
    rarity: "Rare",
    type: "Game Pass"
  }
];

const Catalog = () => {
  const [selectedGame, setSelectedGame] = useState('all');
  
  const games = ['all', 'Blox Fruits', 'Adopt Me!', 'Brookhaven RP'];
  
  const getProductsByGame = (game: string) => {
    switch(game) {
      case 'Blox Fruits':
        return bloxFruitsProducts;
      case 'Adopt Me!':
        return adoptMeProducts;
      case 'Brookhaven RP':
        return brookhavenProducts;
      default:
        return [...bloxFruitsProducts, ...adoptMeProducts, ...brookhavenProducts];
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="neon-text-blue">Catálogo</span> de Jogos
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Navegue por nossa seleção de moedas e itens para seus jogos favoritos.
            </p>
          </div>
          
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {games.map((game) => (
              <Button 
                key={game}
                variant={selectedGame === game ? 'default' : 'outline'}
                className={selectedGame === game ? 
                  'bg-neon-blue hover:bg-neon-blue/80' : 
                  'border-neon-blue text-neon-blue hover:bg-neon-blue/20'
                }
                onClick={() => setSelectedGame(game)}
              >
                {game === 'all' ? 'Todos os Jogos' : game}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {getProductsByGame(selectedGame).map((product) => (
              <HoverCard key={product.id}>
                <HoverCardTrigger asChild>
                  <Card className="neon-border overflow-hidden bg-dark-bg cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-neon-blue/80 text-white text-xs rounded-full px-2 py-1">
                        {selectedGame === 'all' && product.game ? product.game : ''}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl font-bold text-white">{product.name}</div>
                          <div className="text-sm text-neon-blue">{product.description}</div>
                        </div>
                        <div className="text-xl font-semibold text-white">{product.price}</div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar Agora
                      </Button>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                
                {product.rarity && product.type && (
                  <HoverCardContent className="w-80 bg-dark-bg border border-neon-blue p-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white">{product.name}</h4>
                      <div className="text-sm text-gray-400">
                        <p>Raridade: {product.rarity}</p>
                        <p>Tipo: {product.type}</p>
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
