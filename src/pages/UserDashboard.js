import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';

// Mock data for user's NFTs
const mockNFTs = [
  { 
    id: 1, 
    name: 'Blood Donation #1', 
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bloodType: 'O+',
    donationDate: '2023-01-15',
    hospital: 'City General Hospital',
    redeemed: false,
    benefits: ['10% discount at MedPharm', 'Free health checkup at City General']
  },
  { 
    id: 2, 
    name: 'Blood Donation #2', 
    image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bloodType: 'O+',
    donationDate: '2023-02-20',
    hospital: 'Memorial Medical Center',
    redeemed: true,
    benefits: ['15% discount at HealthStore', 'Priority appointment at Memorial Medical']
  },
  { 
    id: 3, 
    name: 'Blood Donation #3', 
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bloodType: 'O+',
    donationDate: '2023-03-10',
    hospital: 'University Health System',
    redeemed: false,
    benefits: ['Free wellness package', '25% off at University Pharmacy']
  }
];

export function UserDashboard() {
  const { userRole } = useContext(RoleContext);
  const [nfts, setNfts] = useState(mockNFTs);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);

  // Redeem NFT (mock function)
  const handleRedeemNFT = (nftId) => {
    const updatedNfts = nfts.map(nft => 
      nft.id === nftId ? { ...nft, redeemed: true } : nft
    );
    setNfts(updatedNfts);
    setShowRedeemModal(false);
    setSelectedNft(null);
  };

  if (userRole !== 'user') {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Blood Donation NFTs</h1>
        <p className="mt-2 text-slate-400">Manage your donation NFTs and redeem benefits</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Total Donations</h3>
          <p className="text-3xl font-bold">{nfts.length}</p>
          <div className="mt-2 text-sm text-purple-400">
            Thank you for your contributions!
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Available Benefits</h3>
          <p className="text-3xl font-bold">{nfts.filter(n => !n.redeemed).length}</p>
          <div className="mt-2 text-sm text-purple-400">
            Unredeemed NFT benefits
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-slate-400 text-sm uppercase tracking-wide mb-1">Last Donation</h3>
          <p className="text-xl font-bold">{nfts.length > 0 ? nfts[nfts.length - 1].donationDate : 'N/A'}</p>
          <div className="mt-2 text-sm text-green-400">
            Your donation helped save lives!
          </div>
        </div>
      </div>

      {/* NFT Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {nfts.map(nft => (
          <div key={nft.id} className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all">
            <div className="relative h-48">
              <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold">{nft.name}</h3>
                <p className="text-sm text-slate-300">{nft.hospital}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-sm text-slate-400">Blood Type</p>
                  <p className="font-medium">{nft.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Donated</p>
                  <p className="font-medium">{nft.donationDate}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-400 mb-1">Benefits</p>
                <ul className="text-sm space-y-1">
                  {nft.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={nft.redeemed ? 'text-slate-500 line-through' : 'text-slate-300'}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                {nft.redeemed ? (
                  <span className="inline-block w-full px-4 py-2 bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed">
                    Already Redeemed
                  </span>
                ) : (
                  <button 
                    onClick={() => {
                      setSelectedNft(nft);
                      setShowRedeemModal(true);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                  >
                    Redeem Benefits
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && selectedNft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80">
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Redeem NFT Benefits</h3>
            <div className="mb-6">
              <p className="text-slate-300 mb-4">You are about to redeem benefits for:</p>
              <div className="flex items-center mb-4">
                <img src={selectedNft.image} alt={selectedNft.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div>
                  <h4 className="font-semibold">{selectedNft.name}</h4>
                  <p className="text-sm text-slate-400">{selectedNft.hospital}</p>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Benefits you'll redeem:</p>
                <ul className="text-sm space-y-1">
                  {selectedNft.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-yellow-400 text-sm mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Once redeemed, this action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedNft(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleRedeemNFT(selectedNft.id)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg"
              >
                Confirm Redemption
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 