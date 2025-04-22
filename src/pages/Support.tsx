
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, HelpCircle, Phone } from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Need</span> <span className="neon-text-blue">Help?</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
          </div>
          
          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="neon-border bg-dark-bg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <MessageSquare className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Discord</h3>
                <p className="text-gray-400 mb-4">Join our Discord server for instant support and community.</p>
                <Button className="w-full bg-gradient-to-r from-[#7289DA] to-[#5865F2] hover:opacity-90">
                  Join Discord
                </Button>
              </CardContent>
            </Card>
            
            <Card className="neon-border bg-dark-bg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <Mail className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-400 mb-4">Send us an email and we'll respond within 24 hours.</p>
                <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                  support@robuxgalaxy.com
                </Button>
              </CardContent>
            </Card>
            
            <Card className="neon-border bg-dark-bg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <Phone className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-400 mb-4">Message us directly for immediate assistance.</p>
                <Button className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90">
                  Contact via WhatsApp
                </Button>
              </CardContent>
            </Card>
            
            <Card className="neon-border bg-dark-bg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border bg-dark-bg">
                  <HelpCircle className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">FAQ</h3>
                <p className="text-gray-400 mb-4">Find answers to frequently asked questions.</p>
                <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="neon-border p-6 rounded-lg bg-darker-bg">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">How long does delivery take?</h3>
                <p className="text-gray-300">Most deliveries are completed within 5-15 minutes after payment confirmation. For larger orders, it may take up to 1 hour.</p>
              </div>
              
              <div className="neon-border p-6 rounded-lg bg-darker-bg">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300">We accept PIX, credit cards, and PayPal. All transactions are secure and encrypted.</p>
              </div>
              
              <div className="neon-border p-6 rounded-lg bg-darker-bg">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">Is it safe to buy Robux from you?</h3>
                <p className="text-gray-300">Yes, our service is safe and we've served thousands of satisfied customers. We never ask for your account password or sensitive information.</p>
              </div>
              
              <div className="neon-border p-6 rounded-lg bg-darker-bg">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">What do I need to provide for delivery?</h3>
                <p className="text-gray-300">We only need your Roblox username or ID to deliver the Robux to your account. No passwords or security details are ever required.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
