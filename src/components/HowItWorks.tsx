
import React from 'react';
import { ShoppingCart, CreditCard, User } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Choose Your Package",
    description: "Browse our selection of Robux packages and choose the one that best fits your gaming needs.",
    icon: ShoppingCart,
    color: "neon-blue"
  },
  {
    id: 2,
    title: "Make Secure Payment",
    description: "Complete your purchase using our secure payment options including Pix, credit card, or PayPal.",
    icon: CreditCard,
    color: "neon-purple"
  },
  {
    id: 3,
    title: "Receive Your Robux",
    description: "After payment confirmation, we'll deliver your Robux directly to your account within minutes.",
    icon: User,
    color: "neon-blue"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="neon-text-purple">How It</span> Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting your Robux is simple and fast. Just follow these easy steps to power up your gaming experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${step.color === 'neon-blue' ? 'neon-border' : 'neon-border-purple'}`}>
                <step.icon className={`w-8 h-8 ${step.color === 'neon-blue' ? 'text-neon-blue' : 'text-neon-purple'}`} />
              </div>
              
              {step.id < steps.length && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
