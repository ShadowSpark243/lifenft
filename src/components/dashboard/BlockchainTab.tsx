import React from 'react';
import { motion } from 'framer-motion';
import HiveTransactions from "../../pages/HiveTransactions";
import HiveKeychainLogin from "../../pages/HiveKeychainLogin";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export function BlockchainTab({ 
  username, 
  handleLogin, 
  onDisconnect 
}: { 
  username: string, 
  handleLogin: (user: string) => void, 
  onDisconnect: () => void 
}) {
  return (
    <>
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bt-display font-bold mb-8 text-bt-text border-b border-bt-border pb-4"
      >
        Blockchain Transactions
      </motion.h2>
      
      <div className="bg-bt-bg-elevated border border-bt-border p-8">
        {!username ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-bt-display font-bold mb-4 text-bt-text">Connect Your Hive Account</h3>
            <p className="font-bt-body text-bt-text-sec mb-8 max-w-md mx-auto">Authenticate via Hive Keychain to view and interact with your on-chain health data.</p>
            <HiveKeychainLogin onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-bt-border">
              <div>
                <h3 className="text-xl font-bt-display font-bold text-bt-text">
                  Connected as: <span className="text-bt-blood font-bt-mono ml-2 uppercase tracking-wider">{username}</span>
                </h3>
                <p className="font-bt-body text-bt-text-sec mt-2 text-sm">Manage your Hive blockchain transactions</p>
              </div>
              <button
                onClick={onDisconnect}
                className="mt-4 md:mt-0 px-6 py-2 bg-bt-bg border border-bt-border hover:border-bt-blood hover:text-bt-blood font-bt-body uppercase text-sm tracking-wider transition-colors text-bt-text"
              >
                Disconnect
              </button>
            </div>
            
            <motion.div variants={itemVariants} className="space-y-6">
              <HiveTransactions username={username} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}
