import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export function DashboardTab({ 
  nftsCount, 
  onShowHealthRecords, 
  onShowMarketplace, 
  onShowEditProfile 
}: { 
  nftsCount: number, 
  onShowHealthRecords: () => void, 
  onShowMarketplace: () => void, 
  onShowEditProfile: () => void 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div 
        variants={itemVariants}
        className="bg-bt-bg-elevated rounded-none p-8 border border-bt-border group hover:border-bt-blood/50 transition-all flex flex-col h-full"
      >
        <h2 className="text-2xl font-bt-display font-bold mb-4 text-bt-text group-hover:text-bt-blood transition-colors flex items-center">
          Health Records
        </h2>
        <p className="text-sm font-bt-body text-bt-text-sec mb-8 flex-grow">View and manage your complete medical history securely.</p>
        <button
          onClick={onShowHealthRecords}
          className="w-full py-3 bg-bt-bg hover:bg-bt-blood text-bt-text hover:text-white border border-bt-border hover:border-bt-blood font-bt-body uppercase text-sm tracking-wider transition-all"
        >
          View Records
        </button>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-bt-bg-elevated rounded-none p-8 border border-bt-border group hover:border-bt-blood/50 transition-all flex flex-col h-full"
      >
        <h2 className="text-2xl font-bt-display font-bold mb-4 text-bt-text group-hover:text-bt-blood transition-colors flex items-center">
          Marketplace
        </h2>
        <p className="text-sm font-bt-body text-bt-text-sec mb-8 flex-grow">Explore and purchase health services using your HIVE balance.</p>
        <button
          onClick={onShowMarketplace}
          className="w-full py-3 bg-bt-bg hover:bg-bt-blood text-bt-text hover:text-white border border-bt-border hover:border-bt-blood font-bt-body uppercase text-sm tracking-wider transition-all"
        >
          Visit Marketplace
        </button>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-bt-bg-elevated rounded-none p-8 border border-bt-border group hover:border-bt-blood/50 transition-all flex flex-col h-full"
      >
        <h2 className="text-2xl font-bt-display font-bold mb-4 text-bt-text group-hover:text-bt-blood transition-colors flex items-center">
          My Account
        </h2>
        <p className="text-sm font-bt-body text-bt-text-sec mb-8 flex-grow">Update your personal profile and account preferences.</p>
        <button
          onClick={onShowEditProfile}
          className="w-full py-3 bg-bt-bg hover:bg-bt-blood text-bt-text hover:text-white border border-bt-border hover:border-bt-blood font-bt-body uppercase text-sm tracking-wider transition-all"
        >
          Edit Profile
        </button>
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
      >
        <div className="bg-bt-bg p-6 border border-bt-border border-l-4 border-l-bt-blood">
          <p className="text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">Blood Type</p>
          <p className="text-3xl font-bt-display font-bold text-bt-text">O+</p>
        </div>
        <div className="bg-bt-bg p-6 border border-bt-border border-l-4 border-l-bt-success">
          <p className="text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">Last Checkup</p>
          <p className="text-3xl font-bt-display font-bold text-bt-text">28 Jun</p>
        </div>
        <div className="bg-bt-bg p-6 border border-bt-border border-l-4 border-l-bt-warning">
          <p className="text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">NFTs Owned</p>
          <p className="text-3xl font-bt-display font-bold text-bt-text">{nftsCount}</p>
        </div>
        <div className="bg-bt-bg p-6 border border-bt-border border-l-4 border-l-blue-500">
          <p className="text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">Health Score</p>
          <p className="text-3xl font-bt-display font-bold text-bt-text">92<span className="text-lg text-bt-text-sec">/100</span></p>
        </div>
      </motion.div>
      
      {/* AI Health Oracle (Hackathon USP) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 bg-bt-bg-elevated p-8 border border-bt-blood/30 mt-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-bt-blood/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center mb-6 border-b border-bt-border pb-4">
          <div className="w-10 h-10 bg-bt-bg border border-bt-blood rounded-full flex items-center justify-center mr-4 animate-pulse shadow-[0_0_15px_rgba(198,40,40,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bt-blood" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bt-display font-bold text-bt-text">AI Health Oracle</h3>
            <p className="font-bt-mono text-xs text-bt-blood uppercase tracking-widest mt-1">Analyzing your blockchain medical history...</p>
          </div>
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="bg-bt-bg border-l-2 border-bt-blood p-4">
            <p className="font-bt-body text-bt-text-sec text-sm leading-relaxed">
              <strong className="text-bt-text">Insight:</strong> Based on your recent <strong className="text-bt-text">Blood Test</strong> (15 Apr), your iron levels are slightly below optimal. Your <strong className="text-bt-text">92/100 Health Score</strong> remains strong due to your active step-count streak.
            </p>
          </div>
          <div className="bg-bt-bg border-l-2 border-bt-success p-4">
            <p className="font-bt-body text-bt-text-sec text-sm leading-relaxed">
              <strong className="text-bt-text">Recommendation:</strong> We suggest the <strong className="text-white">Premium Health Check</strong> or a <strong className="text-white">Nutrition Consultation</strong>. You currently have <strong className="text-bt-success">3 unused LifeNFTs</strong> that can be redeemed for a 15% discount on these services in the Marketplace.
            </p>
          </div>
          
          <button onClick={onShowMarketplace} className="mt-4 px-6 py-2 bg-bt-bg border border-bt-border hover:border-bt-blood hover:text-bt-blood transition-colors font-bt-mono text-xs font-bold uppercase tracking-wider text-bt-text">
            Explore Recommended Services
          </button>
        </div>
      </motion.div>
      
      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 bg-bt-bg-elevated p-8 border border-bt-border mt-8"
      >
        <h3 className="text-2xl font-bt-display font-bold text-bt-text mb-8 border-b border-bt-border pb-4">Recent Activity</h3>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-bt-bg border border-bt-border border-l-4 border-l-bt-success">
            <div>
              <p className="font-bt-body font-bold text-bt-text">Annual Physical Completed</p>
              <p className="text-sm font-bt-body text-bt-text-sec mt-1">Your annual physical exam results have been added.</p>
            </div>
            <span className="text-xs font-bt-mono text-bt-text-sec mt-2 md:mt-0 uppercase">2 days ago</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-bt-bg border border-bt-border border-l-4 border-l-bt-blood">
            <div>
              <p className="font-bt-body font-bold text-bt-text">Blood Donation NFT Received</p>
              <p className="text-sm font-bt-body text-bt-text-sec mt-1">You've received a new NFT for your recent blood donation.</p>
            </div>
            <span className="text-xs font-bt-mono text-bt-text-sec mt-2 md:mt-0 uppercase">1 week ago</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-bt-bg border border-bt-border border-l-4 border-l-blue-500">
            <div>
              <p className="font-bt-body font-bold text-bt-text">Health Score Updated</p>
              <p className="text-sm font-bt-body text-bt-text-sec mt-1">Your health score has improved to 92/100.</p>
            </div>
            <span className="text-xs font-bt-mono text-bt-text-sec mt-2 md:mt-0 uppercase">2 weeks ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
