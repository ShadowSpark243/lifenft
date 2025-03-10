import React, { useState, useEffect } from 'react';
import { NFTCard } from '../components/NFTCard';

// Blood donation themed NFT data
const allNFTs = [
  {
    id: 1,
    name: "Blood Donation NFT #1",
    creator: "BloodBank",
    description: "A unique NFT representing a blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "2.0 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 2,
    name: "Blood Donation NFT #2",
    creator: "HealthOrg",
    description: "Commemorating the importance of blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "1.5 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 3,
    name: "Blood Donation NFT #3",
    creator: "Charity",
    description: "Supporting blood donation initiatives.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "3.0 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 4,
    name: "Blood Donation NFT #4",
    creator: "Community",
    description: "Recognizing community efforts in blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "2.5 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 5,
    name: "Blood Donation NFT #5",
    creator: "MedicalAlliance",
    description: "Honoring medical professionals involved in blood donation.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "3.5 ETH",
    isVerified: true,
    category: "Blood Donation"
  },
  {
    id: 6,
    name: "Community Drive Success #12",
    creator: "NeighborhoodHeroes",
    description: "Celebrating successful community blood drives that exceeded donation targets by over 200% and saved countless lives.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    price: "1.8 ETH",
    isVerified: true,
    category: "Community"
  }
];

// Get unique categories
const categories = ["All", ...new Set(allNFTs.map(nft => nft.category))];

export function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("price-low-high");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Fix for flickering: Use a ref to store animation state
  const isInitialMount = React.useRef(true);

  // Simulated loading state - shorter for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort NFTs
  const filteredNFTs = allNFTs
    .filter(nft => 
      (selectedCategory === "All" || nft.category === selectedCategory) &&
      (nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       nft.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
       nft.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      
      if (sortOption === "price-low-high") {
        return priceA - priceB;
      } else if (sortOption === "price-high-low") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="w-10 h-10 absolute top-3 left-3 rounded-full border-4 border-t-transparent border-r-red-400 border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <div className="ml-4 text-xl font-semibold text-red-500">Loading Blood Donation NFTs...</div>
      </div>
    );
  }

  // Return the main component
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Blood Donation NFTs</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Support blood donation initiatives by collecting unique NFTs that commemorate generosity and help save lives around the world.</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search NFTs or creators"
            className="w-full p-4 pl-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => setSearchTerm("")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Filter Toggle Button */}
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-700/80 transition-all duration-300"
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {showFilters ? "▲" : "▼"}
        </button>
      </div>
      
      {/* Filter and Sort */}
      {showFilters && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-white">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-white">Sort & View</h3>
              <div className="flex flex-wrap gap-4">
                <select
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
                
                <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                  <button 
                    className={`px-3 py-2 flex items-center ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    className={`px-3 py-2 flex items-center ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-6 text-slate-400">
        Found {filteredNFTs.length} {filteredNFTs.length === 1 ? 'item' : 'items'}
        {selectedCategory !== "All" ? ` in ${selectedCategory}` : ''}
        {searchTerm ? ` matching "${searchTerm}"` : ''}
      </div>

      {filteredNFTs.length > 0 ? (
        <div className={viewMode === 'grid' ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
          "flex flex-col gap-6"
        }>
          {filteredNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 my-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-slate-400">No NFTs found</h3>
          <p className="text-slate-500 mt-2 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium rounded-lg transition-all shadow-lg"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8">
        <button
          className="p-4 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-110"
          onClick={() => alert("Donate Blood Today! Click confirmed.")}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}