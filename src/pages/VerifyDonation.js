import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';

export function VerifyDonation() {
  const { userRole } = useContext(RoleContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorName: '',
    donorId: '',
    bloodType: 'O+',
    amount: '',
    notes: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      navigate('/hospital-dashboard');
    }, 2000);
  };

  if (userRole !== 'hospital') {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-slate-400 mb-6">You don't have permission to access this page.</p>
        <Link to="/" className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Verify Blood Donation</h1>
        <p className="mt-2 text-slate-400">Record a new blood donation and issue an NFT to the donor</p>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Donor Name</label>
              <input 
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Donor ID / Wallet Address</label>
              <input 
                type="text"
                name="donorId"
                value={formData.donorId}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Amount (ml)</label>
              <input 
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          
          <div className="pt-4 border-t border-slate-700">
            <h3 className="text-lg font-medium mb-4">Verification Process</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-slate-300">Donor information entered</p>
              </div>
              
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  formData.donorName && formData.donorId && formData.amount
                    ? 'bg-green-500/20 border border-green-500 text-green-500'
                    : 'bg-slate-600/20 border border-slate-600 text-slate-500'
                }`}>
                  {formData.donorName && formData.donorId && formData.amount ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>2</span>
                  )}
                </div>
                <p className={`text-sm ${
                  formData.donorName && formData.donorId && formData.amount
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}>Donation verification</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-slate-600/20 border border-slate-600 flex items-center justify-center text-slate-500 mr-3">
                  <span>3</span>
                </div>
                <p className="text-sm text-slate-500">NFT creation and assignment</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6">
            <Link
              to="/hospital-dashboard"
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20 flex items-center"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify & Issue NFT'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 