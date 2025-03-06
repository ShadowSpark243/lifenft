import React, { useState } from 'react';

export function NFTCard({ nft }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-1 nft-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={nft.image} 
          alt={nft.name} 
          className={`w-full h-72 object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {nft.isVerified && (
          <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/70 text-purple-200 backdrop-blur-sm badge-verified shadow-glow">
            <svg className="w-3 h-3 mr-1 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white drop-shadow-md">{nft.name}</h3>
            <div className="bg-slate-800/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg border border-slate-700/50">
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M8 1L15 8L8 15L1 8L8 1Z" fill="url(#paint0_linear)" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="1" y1="1" x2="15" y2="15" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A855F7" />
                      <stop offset="1" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-sm font-semibold text-white">{nft.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden mr-2">
            <img 
              src={`https://avatars.dicebear.com/api/identicon/${nft.creator}.svg`} 
              alt={nft.creator} 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-slate-400">By <span className="text-purple-300 hover:text-purple-200 cursor-pointer">{nft.creator}</span></p>
        </div>
        
        <p className="mt-2 text-sm text-slate-300 line-clamp-2 mb-4">{nft.description}</p>
        
        <div className="flex justify-between items-center">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/30 btn-glow">
            Purchase
          </button>
          <div className="flex items-center space-x-1">
            <button className="p-2 text-slate-400 hover:text-pink-400 rounded-full hover:bg-slate-700/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 