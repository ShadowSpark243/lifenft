import React from 'react';
import { motion } from 'framer-motion';

export function HealthRecordsModal({ records, onClose }: { records: any[], onClose: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-bt-bg-card rounded-none max-w-4xl w-full p-8 relative border border-bt-border shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-8 border-b border-bt-border pb-4">
          <h3 className="text-2xl font-bt-display font-bold text-bt-text">My Health Records</h3>
          <button 
            onClick={onClose}
            className="text-bt-text-sec hover:text-bt-blood transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          {records.map(record => (
            <div key={record.id} className="bg-bt-bg-elevated p-6 border border-bt-border group hover:border-bt-blood/50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bt-display font-bold text-bt-text group-hover:text-bt-blood transition-colors">{record.type}</h4>
                  <p className="text-sm font-bt-body text-bt-text-sec mt-1">{record.provider}</p>
                </div>
                <div className="mt-2 md:mt-0 text-left md:text-right">
                  <p className="text-sm font-bt-body font-medium text-bt-text">{record.date}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-bt-bg border border-bt-border text-xs font-bt-mono text-bt-text uppercase tracking-wider">
                    {record.results}
                  </span>
                </div>
              </div>
              <p className="text-sm font-bt-body text-bt-text-sec border-t border-bt-border pt-4 mt-4">
                {record.notes}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
