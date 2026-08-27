import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export function ProfileTab({ 
  userData, 
  username 
}: { 
  userData: any, 
  username: string 
}) {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bt-display font-bold mb-8 text-bt-text border-b border-bt-border pb-4"
      >
        My Profile
      </motion.h2>
      
      <motion.div 
        variants={itemVariants}
        className="bg-bt-bg-elevated border border-bt-border relative"
      >
        {/* Banner Area */}
        <div className="h-40 bg-bt-bg border-b border-bt-border overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-bt-blood/20 to-transparent"></div>
          {/* subtle pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        <div className="px-8 pb-10">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="w-32 h-32 rounded-none border-4 border-bt-bg-elevated bg-bt-bg flex items-center justify-center relative overflow-hidden shadow-2xl">
              {userData?.First_Name ? (
                <div className="w-full h-full flex items-center justify-center bg-bt-bg text-bt-blood text-5xl font-bt-display font-bold">
                  {userData.First_Name[0].toUpperCase()}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-bt-bg text-bt-blood text-5xl font-bt-display font-bold">
                  {(userData?.User_Id || username || "U")[0].toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <span className="px-4 py-1.5 bg-bt-bg border border-bt-blood text-bt-blood font-bt-mono text-xs font-bold uppercase tracking-widest">
                {userData?.Role === 'user' ? 'Verified Patient' : 'Hive Account'}
              </span>
            </div>
          </div>
          
          <div className="space-y-8 mt-8">
            <div className="border-b border-bt-border pb-6">
              <h3 className="text-3xl font-bt-display font-bold text-bt-text">
                {userData?.First_Name ? `${userData.First_Name} ${userData.Last_Name || ''}` : (userData?.User_Id || username)}
              </h3>
              <p className="font-bt-mono text-sm text-bt-text-sec mt-2 uppercase tracking-wider">{userData?.isHiveUser ? 'Web3 Connected' : 'LifeNFT Core Profile'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-3">Username / ID</label>
                <div className="p-4 bg-bt-bg border border-bt-border text-bt-text font-bt-body group-hover:border-bt-blood/50 transition-colors">
                  {userData?.User_Id || username || 'Not set'}
                </div>
              </div>
              
              <div className="group">
                <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-3">Email Address</label>
                <div className="p-4 bg-bt-bg border border-bt-border text-bt-text font-bt-body group-hover:border-bt-blood/50 transition-colors">
                  {userData?.Email || 'Not provided'}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-3">Account Role</label>
                <div className="p-4 bg-bt-bg border border-bt-border text-bt-text font-bt-body capitalize group-hover:border-bt-blood/50 transition-colors">
                  {userData?.Role || 'User'}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-3">Wallet Status</label>
                <div className="p-4 bg-bt-bg border border-bt-border text-bt-success font-bt-mono font-bold uppercase text-sm tracking-wider flex items-center group-hover:border-bt-blood/50 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-bt-success mr-3 animate-pulse"></span>
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
