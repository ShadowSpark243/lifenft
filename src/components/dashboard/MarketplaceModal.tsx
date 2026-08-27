import React from 'react';
import { motion } from 'framer-motion';

export function MarketplaceModal({ items, onClose }: { items: any[], onClose: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-bt-bg-card rounded-none max-w-5xl w-full p-8 relative border border-bt-border shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-8 border-b border-bt-border pb-4">
          <h3 className="text-2xl font-bt-display font-bold text-bt-text">LifeNFT Marketplace</h3>
          <button 
            onClick={onClose}
            className="text-bt-text-sec hover:text-bt-blood transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-bt-bg-elevated border border-bt-border group hover:border-bt-blood/50 transition-colors flex flex-col h-full">
              <div className="h-48 overflow-hidden relative border-b border-bt-border">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-bt-bg border-l border-b border-bt-border px-3 py-1 text-sm font-bt-mono text-bt-blood font-bold">
                  {item.price}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bt-display font-bold text-bt-text mb-2 group-hover:text-bt-blood transition-colors">{item.name}</h4>
                <p className="text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-4">{item.provider}</p>
                <p className="text-sm font-bt-body text-bt-text-sec mb-6 flex-grow">{item.description}</p>
                
                <button className="w-full py-3 bg-bt-bg hover:bg-bt-blood text-bt-text hover:text-white border border-bt-border hover:border-bt-blood font-bt-body font-medium uppercase tracking-wider text-sm transition-all">
                  Purchase NFT
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
