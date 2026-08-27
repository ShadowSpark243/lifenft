import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export function NFTsTab({ 
  nfts, 
  onHoverCard, 
  onLeaveCard, 
  onRedeem 
}: { 
  nfts: any[], 
  onHoverCard: (id: number) => void, 
  onLeaveCard: () => void, 
  onRedeem: (nft: any) => void 
}) {
  return (
    <>
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bt-display font-bold mb-8 text-bt-text border-b border-bt-border pb-4"
      >
        My Health NFTs
      </motion.h2>
      
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="bg-bt-bg-elevated border border-bt-border group hover:border-bt-blood/50 transition-all flex flex-col"
            onMouseEnter={() => onHoverCard(nft.id)}
            onMouseLeave={onLeaveCard}
          >
            <div className="h-48 overflow-hidden relative border-b border-bt-border">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-0 left-0 bg-bt-bg border-r border-b border-bt-border px-3 py-1 text-xs font-bt-mono font-bold text-bt-text-sec flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-bt-text-sec" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Soulbound (SBT)
              </div>
              <div className="absolute top-0 right-0 bg-bt-bg border-l border-b border-bt-border px-3 py-1 text-xs font-bt-mono font-bold text-bt-blood">
                {nft.bloodType}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bt-display font-bold mb-1 text-bt-text group-hover:text-bt-blood transition-colors">{nft.name}</h3>
              <p className="text-xs font-bt-mono text-bt-text-sec mb-4 uppercase tracking-wider">{nft.hospital} &bull; {nft.donationDate}</p>
              
              <div className="mb-6 flex-grow">
                <h4 className="text-xs font-bt-mono text-bt-text font-bold mb-3 uppercase tracking-wider">Benefits</h4>
                <ul className="text-sm font-bt-body text-bt-text-sec space-y-2">
                  {nft.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-bt-success mr-2 font-bold">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => {
                  if (!nft.redeemed) {
                    onRedeem(nft);
                  }
                }}
                disabled={nft.redeemed}
                className={`w-full py-3 font-bt-body uppercase text-sm tracking-wider transition-all border ${
                  nft.redeemed 
                    ? "bg-bt-bg text-bt-text-muted border-bt-border cursor-not-allowed" 
                    : "bg-bt-bg hover:bg-bt-blood text-bt-text hover:text-white border-bt-border hover:border-bt-blood"
                }`}
              >
                {nft.redeemed ? 'Already Redeemed' : 'Redeem Benefits'}
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
