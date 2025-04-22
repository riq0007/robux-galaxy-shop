
import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <section className="py-16 bg-dark-bg relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="neon-text-blue">Secure</span> Payment Options
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer multiple secure payment methods for your convenience and peace of mind.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center p-4 border border-gray-700 rounded-lg w-40 h-24">
            <div className="flex flex-col items-center">
              <CreditCard className="w-8 h-8 text-neon-blue mb-2" />
              <span className="text-white">Credit Card</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-4 border border-gray-700 rounded-lg w-40 h-24">
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-neon-blue mb-2" />
              <span className="text-white">PIX</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-4 border border-gray-700 rounded-lg w-40 h-24">
            <div className="flex items-center justify-center">
              <svg className="w-24 h-12" viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746z" fill="#003087"/>
                <path d="M53.867 13.417c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zm-4.599-6.668h-6.133c-.476 0-.878.34-.94.8l-2.767 17.537a.57.57 0 0 0 .563.658h3.155a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.872-4.415-.971-1.142-2.696-1.746-4.985-1.746z" fill="#009cde"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            All transactions are encrypted and secure. We never store your payment details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
