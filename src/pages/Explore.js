import React, { useState } from 'react';
import { NFTCard } from '../components/NFTCard';

// Sample NFT data
const allNFTs = [
  {
    id: 1,
    name: "Digital Dreamscape #42",
    creator: "CryptoArtist",
    description: "A mesmerizing digital dreamscape that blends surrealism with futuristic elements.",
    image: "https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    price: "1.2 ETH",
    isVerified: true,
    category: "Art"
  },
  {
    id: 2,
    name: "Abstract Harmony #08",
    creator: "DigitalMaster",
    description: "An abstract composition of shapes and colors creating a harmonious visual experience.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
    price: "0.8 ETH",
    isVerified: false,
    category: "Art"
  },
  {
    id: 3,
    name: "Neon Genesis #17",
    creator: "FutureVisions",
    description: "A neon-infused cyberpunk cityscape that imagines the urban landscape of tomorrow.",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    price: "2.4 ETH",
    isVerified: true,
    category: "Photography"
  },
  {
    id: 4,
    name: "Metaverse Portal #03",
    creator: "VRCreator",
    description: "A gateway to digital realms beyond imagination. Step through the portal to explore new worlds.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    price: "1.5 ETH",
    isVerified: false,
    category: "Virtual Worlds"
  },
  {
    id: 5, 
    name: "Crypto Punk #5238",
    creator: "PunkWorks",
    description: "One of the original NFT collectibles. This punk features rare attributes and unique styling.",
    image: "https://images.unsplash.com/photo-1643101809037-a7462f07d342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    price: "18.5 ETH",
    isVerified: true,
    category: "Collectibles"
  },
  {
    id: 6,
    name: "Game Asset Bundle #12",
    creator: "GameDev3D",
    description: "A collection of premium 3D assets for game developers, including characters, weapons, and environments.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    price: "3.2 ETH",
    isVerified: true,
    category: "Gaming"
  }
];

// Get unique categories
const categories = ["All", ...new Set(allNFTs.map(nft => nft.category))];

export function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("price-low-high");

  // Filter and sort NFTs
  const filteredNFTs = allNFTs
    .filter(nft => 
      (selectedCategory === "All" || nft.category === selectedCategory) &&
      (nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       nft.creator.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      
      if (sortOption === "price-low-high") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-gradient">Explore NFTs</h1>
      
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
            className="w-full p-4 pl-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Filter and Sort */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex-none">
          <select
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNFTs.map(nft => (
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
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-purple-500/20"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
} 