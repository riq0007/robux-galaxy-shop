
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const games = [
  {
    id: 1,
    name: "Roblox",
    image: "https://images.unsplash.com/photo-1636590256029-37dbaf0a8524?q=80&w=1972",
    description: "The ultimate virtual universe where you can play, create, and be anything you can imagine.",
    category: "Adventure"
  },
  {
    id: 2,
    name: "Adopt Me!",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071",
    description: "Raise pets, decorate your home, and explore a magical world with friends.",
    category: "Role-playing"
  },
  {
    id: 3,
    name: "Brookhaven RP",
    image: "https://images.unsplash.com/photo-1600861194942-a0d18154daa2?q=80&w=2069",
    description: "Live your dream life in a vast city with amazing cars, houses, and activities.",
    category: "Role-playing"
  },
  {
    id: 4,
    name: "Blox Fruits",
    image: "https://images.unsplash.com/photo-1591631368469-8d3b4c9ba25a?q=80&w=1974",
    description: "Become the strongest warrior in this One Piece inspired adventure game.",
    category: "Fighting"
  }
];

const FeaturedGames = () => {
  return (
    <section className="py-24 bg-darker-bg relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="neon-text-blue">Featured</span> Games
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide Robux and in-game currency for a wide variety of popular games. 
            Check out some of our most requested titles below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="neon-border overflow-hidden bg-dark-bg hover:animate-glow transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{game.name}</h3>
                  <span className="text-xs text-neon-blue px-2 py-1 rounded-full border border-neon-blue/30">
                    {game.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{game.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;
