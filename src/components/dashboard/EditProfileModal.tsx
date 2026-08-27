import React from 'react';
import { motion } from 'framer-motion';

export function EditProfileModal({ formData, setFormData, onSubmit, onClose }: { formData: any, setFormData: any, onSubmit: (e: any) => void, onClose: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-bt-bg-card rounded-none max-w-lg w-full p-8 relative border border-bt-border shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-8 border-b border-bt-border pb-4">
          <h3 className="text-2xl font-bt-display font-bold text-bt-text">Edit Profile</h3>
          <button 
            onClick={onClose}
            className="text-bt-text-sec hover:text-bt-blood transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full p-3 bg-bt-bg border border-bt-border text-bt-text focus:outline-none focus:border-bt-blood font-bt-body transition-colors"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full p-3 bg-bt-bg border border-bt-border text-bt-text focus:outline-none focus:border-bt-blood font-bt-body transition-colors"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 bg-bt-bg border border-bt-border text-bt-text focus:outline-none focus:border-bt-blood font-bt-body transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bt-mono text-bt-text-sec uppercase tracking-wider mb-2">Phone Number</label>
            <input 
              type="tel" 
              className="w-full p-3 bg-bt-bg border border-bt-border text-bt-text focus:outline-none focus:border-bt-blood font-bt-body transition-colors"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          
          <div className="pt-6 border-t border-bt-border flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-bt-bg hover:bg-bt-bg-elevated border border-bt-border text-bt-text font-bt-body uppercase text-sm tracking-wider transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="flex-1 py-3 bg-bt-blood hover:bg-secondary-light text-white border border-bt-blood hover:border-secondary-light font-bt-body uppercase text-sm tracking-wider transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
