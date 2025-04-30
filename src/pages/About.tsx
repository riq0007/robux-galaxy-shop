import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Users, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">About</span> <span className="neon-text-blue">Popota Shop</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Learn more about who we are and why thousands of gamers trust us for their gaming currency needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-2xl font-bold mb-4"><span className="neon-text-purple">Our</span> Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2023, Popota Shop began with a simple mission: to provide gamers with a safe, affordable, and fast way to get the in-game currency they need to enhance their gaming experience.
              </p>
              <p className="text-gray-300 mb-4">
                What started as a small operation quickly grew as word spread about our reliable service, competitive prices, and exceptional customer support. Today, we're proud to serve thousands of satisfied customers across Brazil and beyond.
              </p>
              <p className="text-gray-300">
                At Popota Shop, we understand the importance of trust in this industry. That's why we've built our business on principles of transparency, security, and customer satisfaction.
              </p>
            </div>
            
            <div className="relative">
              <div className="neon-border rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611608502385-d44bd5239fcd?q=80&w=1973" 
                  alt="Gaming setup" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-8 text-center"><span className="neon-text-blue">Why</span> Choose Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 neon-border rounded-lg bg-darker-bg">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <ShieldCheck className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Security & Trust</h3>
                <p className="text-gray-400">
                  Your security is our priority. All transactions are encrypted and we never ask for sensitive account information.
                </p>
              </div>
              
              <div className="p-6 neon-border rounded-lg bg-darker-bg">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <Clock className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
                <p className="text-gray-400">
                  Most orders are delivered within minutes of payment confirmation, so you can get back to gaming without delay.
                </p>
              </div>
              
              <div className="p-6 neon-border rounded-lg bg-darker-bg">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <Users className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Customer Support</h3>
                <p className="text-gray-400">
                  Our friendly support team is available 24/7 to assist you with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4"><span className="neon-text-purple">Our</span> Promise</h2>
            <p className="text-gray-300 mb-8">
              We strive to provide the best service possible to our customers. If you're ever unsatisfied with your purchase or experience, please contact us and we'll make it right. Your satisfaction is our top priority.
            </p>
            
            <div className="neon-border p-6 rounded-lg bg-darker-bg inline-block">
              <p className="text-xl text-white italic">
                "We're gamers too, and we built the service we wished existed."
              </p>
              <p className="text-neon-blue mt-2">- Popota Shop Team</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
