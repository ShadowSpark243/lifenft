import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export function EmergencyQRModal({ userId, onClose }: { userId: string, onClose: () => void }) {
  // Generate the URL that a paramedic would scan
  // Assuming the app is hosted on the current domain, or a fixed domain
  const emergencyUrl = `${window.location.origin}/emergency/${encodeURIComponent(userId)}`;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-bt-bg-card rounded-none max-w-sm w-full p-8 relative border-4 border-bt-blood shadow-[0_0_50px_rgba(198,40,40,0.5)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-bt-blood flex items-center justify-center mb-4 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bt-display font-bold text-white mb-2">Emergency ID</h3>
          <p className="font-bt-body text-bt-text-sec text-sm mb-8">Scan this code to instantly access vital health records. For medical personnel only.</p>
          
          <div className="bg-white p-4 mb-8">
            <QRCodeSVG value={emergencyUrl} size={200} level="H" />
          </div>
          
          <p className="font-bt-mono text-xs text-bt-blood uppercase tracking-wider mb-8 break-all">
            {userId}
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-bt-bg border border-bt-border text-bt-text hover:bg-bt-bg-elevated hover:text-white font-bt-body uppercase text-sm tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
