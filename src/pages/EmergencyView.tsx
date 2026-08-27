import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export function EmergencyView() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching emergency data from the blockchain/D1
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bt-blood flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-bt-display font-bold mb-2">VERIFYING BLOCKCHAIN RECORD</h1>
        <p className="font-bt-mono text-sm uppercase tracking-widest opacity-80">Fetching immutable health data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bt-bg text-bt-text font-bt-body flex flex-col">
      <header className="bg-bt-blood text-white p-6 sticky top-0 z-10 shadow-lg border-b-4 border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <h1 className="text-2xl font-bt-display font-bold">MEDICAL EMERGENCY</h1>
          </div>
          <span className="px-3 py-1 bg-white text-bt-blood font-bt-mono text-xs font-bold uppercase tracking-widest">
            Verified
          </span>
        </div>
        <p className="font-bt-mono text-xs opacity-90 break-all">ID: {userId}</p>
      </header>

      <main className="flex-grow p-6 space-y-6">
        <motion.div 
          className="bg-bt-bg-elevated border-2 border-bt-border p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-bt-mono text-bt-text-sec uppercase tracking-wider mb-6 pb-2 border-b border-bt-border">Patient Demographics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-bt-text-sec uppercase">Name</p>
              <p className="text-xl font-bt-display font-bold text-white">Aryan Rajbhar</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-bt-text-sec uppercase">DOB</p>
                <p className="font-bt-body text-white">15 May 1995 (29 y/o)</p>
              </div>
              <div>
                <p className="text-xs text-bt-text-sec uppercase">Sex</p>
                <p className="font-bt-body text-white">Male</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-bt-bg border-2 border-bt-blood p-6 relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-bt-blood/10 rounded-bl-full pointer-events-none"></div>
          <h2 className="text-sm font-bt-mono text-bt-blood font-bold uppercase tracking-wider mb-6 pb-2 border-b border-bt-blood/30">Critical Information</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs text-bt-text-sec uppercase mb-1">Blood Type</p>
              <p className="text-4xl font-bt-display font-bold text-white">O+</p>
            </div>
            <div>
              <p className="text-xs text-bt-text-sec uppercase mb-1">Donor Status</p>
              <p className="text-lg font-bt-body font-bold text-bt-success">Active Organ Donor</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-bt-blood/30 pt-4">
            <div>
              <p className="text-xs text-bt-blood font-bold uppercase mb-1">Allergies</p>
              <ul className="list-disc list-inside text-white font-bt-body">
                <li>Penicillin (Severe Anaphylaxis)</li>
                <li>Peanuts (Mild)</li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-bt-blood font-bold uppercase mb-1">Existing Conditions</p>
              <ul className="list-disc list-inside text-white font-bt-body">
                <li>Asthma</li>
                <li>Hypertension</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-bt-bg-elevated border-2 border-bt-border p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-bt-mono text-bt-text-sec uppercase tracking-wider mb-6 pb-2 border-b border-bt-border">Emergency Contacts</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bt-body font-bold text-white">Jane Doe</p>
                <p className="text-xs text-bt-text-sec uppercase">Spouse</p>
              </div>
              <a href="tel:+15550001234" className="px-4 py-2 bg-bt-bg border border-bt-border text-white text-sm font-bold transition-colors hover:border-white">
                CALL
              </a>
            </div>
          </div>
        </motion.div>

      </main>
      
      <footer className="p-6 text-center border-t border-bt-border">
        <p className="text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider">
          Secured by LifeNFT &bull; Immutable Hive Record
        </p>
      </footer>
    </div>
  );
}
