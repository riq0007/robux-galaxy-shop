
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center neon-border p-8 rounded-xl bg-darker-bg/80">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Ready to</span> <span className="neon-text-blue">Power Up</span> <span className="text-white">Your Gaming?</span>
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of satisfied gamers who trust Robux Galaxy for their gaming currency needs.
            Fast delivery, secure transactions, and 24/7 support.
          </p>
          
          <Link to="/catalog">
            <Button className="neon-button text-lg px-8 py-6">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
