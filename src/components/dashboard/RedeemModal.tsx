import React from 'react';
import { motion } from 'framer-motion';

export function RedeemModal({ nft, onConfirm, onClose }: { nft: any, onConfirm: () => void, onClose: () => void }) {
  if (!nft) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-bt-bg-card rounded-none max-w-md w-full p-8 relative border border-bt-border shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-6 border-b border-bt-border pb-4">
          <h3 className="text-2xl font-bt-display font-bold text-bt-text">Redeem Benefits</h3>
          <button 
            onClick={onClose}
            className="text-bt-text-sec hover:text-bt-blood transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6 border border-bt-border p-2 bg-bt-bg">
          <img src={nft.image} alt={nft.name} className="w-full h-40 object-cover mb-4" />
          <h4 className="font-bt-display font-bold text-xl px-2 pb-2">{nft.name}</h4>
        </div>
        
        <div className="mb-8">
          <h5 className="font-bt-mono text-xs uppercase tracking-wider text-bt-blood font-bold mb-4">Available Benefits:</h5>
          <ul className="space-y-3">
            {nft.benefits.map((benefit: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bt-blood mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bt-body text-sm text-bt-text">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex space-x-4 border-t border-bt-border pt-6">
          <motion.button
            onClick={onClose}
            className="flex-1 py-3 bg-bt-bg hover:bg-bt-bg-elevated border border-bt-border text-bt-text font-bt-body uppercase text-sm tracking-wider transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            onClick={onConfirm}
            className="flex-1 py-3 bg-bt-blood hover:bg-secondary-light text-white border border-bt-blood hover:border-secondary-light font-bt-body uppercase text-sm tracking-wider transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
