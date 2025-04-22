
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    game: "Roblox",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    robux: "400",
    price: "R$19,90",
  },
  {
    id: 2,
    game: "Roblox",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    robux: "800",
    price: "R$34,90",
  },
  {
    id: 3,
    game: "Roblox",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    robux: "1700",
    price: "R$69,90",
  },
  {
    id: 4,
    game: "Roblox",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    robux: "4500",
    price: "R$149,90",
  },
  {
    id: 5,
    game: "Roblox",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    robux: "10000",
    price: "R$299,90",
  },
];

const Catalog = () => {
  const [selectedGame, setSelectedGame] = useState('all');
  
  const games = ['all', 'Roblox', 'Adopt Me!', 'Brookhaven RP', 'Blox Fruits'];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="neon-text-blue">Game</span> Catalog
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our selection of Robux and in-game currency packages for your favorite games.
            </p>
          </div>
          
          {/* Game Filter */}
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
                {game === 'all' ? 'All Games' : game}
              </Button>
            ))}
          </div>
          
          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {products
              .filter(p => selectedGame === 'all' || p.game === selectedGame)
              .map((product) => (
                <Card key={product.id} className="neon-border overflow-hidden bg-dark-bg">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.game} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-neon-blue/80 text-white text-xs rounded-full px-2 py-1">
                      {product.game}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold text-white">{product.robux}</div>
                        <div className="text-sm text-neon-blue">ROBUX</div>
                      </div>
                      <div className="text-xl font-semibold text-white">{product.price}</div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
