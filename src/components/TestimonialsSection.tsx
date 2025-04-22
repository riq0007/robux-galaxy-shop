
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Pedro Souza",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
    rating: 5,
    text: "Super rápido! Comprei os Robux e em menos de 5 minutos já estava na minha conta. Recomendo muito!"
  },
  {
    id: 2,
    name: "Gabriela Lima",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
    rating: 5,
    text: "Melhor site para comprar Robux! Preço justo e o atendimento pelo Discord é excelente."
  },
  {
    id: 3,
    name: "Lucas Oliveira",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
    rating: 4,
    text: "Já fiz várias compras e sempre recebi muito rápido. Só uma vez que demorou um pouco mais, mas o suporte resolveu super bem!"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative bg-darker-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">What Our</span> <span className="neon-text-blue">Customers</span> <span className="text-white">Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what some of our happy customers have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="neon-border bg-dark-bg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
