import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';
import * as hiveTx from "hive-tx";
import HiveTransactions from "./HiveTransactions";
import HiveKeychainLogin from "./HiveKeychainLogin";
import BroadcastTransaction from "./BroadcastTransaction";
import { motion } from "framer-motion";

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

// Mock health records data
const mockHealthRecords = [
  {
    id: 1,
    type: 'Blood Test',
    date: '2023-04-15',
    provider: 'City General Hospital',
    results: 'Normal',
    notes: 'All values within normal range'
  },
  {
    id: 2,
    type: 'COVID-19 Vaccination',
    date: '2023-02-10',
    provider: 'Community Vaccination Center',
    results: 'Completed',
    notes: 'Second dose of Pfizer-BioNTech'
  },
  {
    id: 3,
    type: 'Annual Physical',
    date: '2023-01-05',
    provider: 'Dr. Smith Clinic',
    results: 'Healthy',
    notes: 'Recommended regular exercise and balanced diet'
  }
];

// Mock marketplace items
const mockMarketplaceItems = [
  {
    id: 1,
    name: 'Premium Health Check',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b7e9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '200 HIVE',
    provider: 'HealthPlus Network',
    description: 'Comprehensive health check including blood work, cardiac assessment, and nutrition consultation.'
  },
  {
    id: 2,
    name: 'Mental Wellness Package',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '150 HIVE',
    provider: 'MindfulHealth',
    description: 'Four therapy sessions with certified professionals and stress management resources.'
  },
  {
    id: 3,
    name: 'Fitness Tracker Pro',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '80 HIVE',
    provider: 'FitLife Medical',
    description: 'Advanced fitness tracker with health metrics monitoring and personalized insights.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100 
    }
  }
};

const cardHoverVariants = {
  hover: { 
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 400 }
  }
};

function UserDashboard() {
  const { userRole, logout } = useContext(RoleContext);
  const [nfts, setNfts] = useState(mockNFTs);
  const [healthRecords, setHealthRecords] = useState(mockHealthRecords);
  const [marketplaceItems, setMarketplaceItems] = useState(mockMarketplaceItems);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const [username, setUsername] = useState("");
  const [hoverCard, setHoverCard] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showHealthRecords, setShowHealthRecords] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.First_Name || '',
    lastName: userData?.Last_Name || '',
    email: userData?.Email || '',
    phone: ''
  });
  const navigate = useNavigate();
  
  // Redeem NFT function
  const handleRedeemNFT = (nftId) => {
    const updatedNfts = nfts.map(nft => 
      nft.id === nftId ? { ...nft, redeemed: true } : nft
    );
    setNfts(updatedNfts);
    setShowRedeemModal(false);
    setSelectedNft(null);
  };

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('userData');
    const storedHiveUser = localStorage.getItem('hive_username');
    
    // Initialize states
    let isHiveLogin = false;
    
    if (storedHiveUser) {
      setUsername(storedHiveUser);
      isHiveLogin = true;
    }
    
    if (!storedUser && !storedHiveUser) {
      // No user data found, redirect to login
      navigate('/login');
      return;
    }
    
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Check if the user has the correct role
        if (parsedUser.Role !== 'user' && !parsedUser.isHiveUser) {
          // Wrong dashboard for this user, redirect
          switch(parsedUser.Role) {
            case 'hospital':
              navigate('/hospital-dashboard');
              break;
            case 'government':
              navigate('/gov-dashboard');
              break;
            default:
              navigate('/login');
          }
          return;
        }
        
        // Set the user data
        setUserData(parsedUser);
        
        // If this is a Hive user login, set the username
        if (parsedUser.isHiveUser && parsedUser.User_Id) {
          setUsername(parsedUser.User_Id);
          isHiveLogin = true;
        }
        
        // Initialize form data
        setFormData({
          firstName: parsedUser.First_Name || '',
          lastName: parsedUser.Last_Name || '',
          email: parsedUser.Email || '',
          phone: parsedUser.Phone || ''
        });
      } else if (storedHiveUser) {
        // Create basic user data for Hive users
        setUserData({
          User_Id: storedHiveUser,
          isHiveUser: true
        });
      }
      
      // If user logged in with Hive, automatically show the blockchain tab
      if (isHiveLogin) {
        setActiveTab('blockchain');
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = (user) => {
    setUsername(user);
    localStorage.setItem("hive_username", user);
    
    // Auto-switch to blockchain tab when Hive account connected
    setActiveTab('blockchain');
  };

  const handleLogout = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('userData');
      localStorage.removeItem('hive_username');
      setUsername("");
      if (logout) logout();
      navigate('/login');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the updated profile to the server
    // For now, just update the local userData
    setUserData(prev => ({
      ...prev,
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Email: formData.email,
      Phone: formData.phone
    }));
    
    // Update localStorage too
    const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedData = {
      ...storedData,
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Email: formData.email,
      Phone: formData.phone
    };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    
    setShowEditProfile(false);
    // Show success message
    alert("Profile updated successfully!");
  };

  // Render the redeem modal
  const renderRedeemModal = () => {
    if (!showRedeemModal || !selectedNft) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div 
          className="bg-slate-800 rounded-xl max-w-md w-full p-6 relative border border-slate-700 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button 
            onClick={() => setShowRedeemModal(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="text-xl font-bold mb-4">Redeem NFT Benefits</h3>
          
          <div className="mb-4">
            <img src={selectedNft.image} alt={selectedNft.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h4 className="font-semibold">{selectedNft.name}</h4>
          </div>
          
          <div className="mb-6">
            <h5 className="font-medium text-purple-400 mb-2">Available Benefits:</h5>
            <ul className="space-y-2">
              {selectedNft.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              onClick={() => setShowRedeemModal(false)}
              className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              onClick={() => handleRedeemNFT(selectedNft.id)}
              className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm Redemption
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-3 text-slate-300">Loading user dashboard...</p>
        </div>
      </div>
    );
  }

  // Render health records section
  const renderHealthRecords = () => {
    if (!showHealthRecords) return null;
    
    return (
      <motion.div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-slate-800 rounded-xl max-w-4xl w-full p-6 relative border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">My Health Records</h3>
            <button 
              onClick={() => setShowHealthRecords(false)}
              className="text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {healthRecords.map(record => (
              <motion.div 
                key={record.id}
                className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{record.type}</h4>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    {record.date}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-2">
                  <div>
                    <span className="text-slate-400">Provider:</span> {record.provider}
                  </div>
                  <div>
                    <span className="text-slate-400">Result:</span> {record.results}
                  </div>
                </div>
                
                <div className="text-sm text-slate-300">
                  <span className="text-slate-400">Notes:</span> {record.notes}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={() => setShowHealthRecords(false)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  // Render marketplace section
  const renderMarketplace = () => {
    if (!showMarketplace) return null;
    
    return (
      <motion.div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-slate-800 rounded-xl max-w-5xl w-full p-6 relative border border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">LifeNFT Marketplace</h3>
            <button 
              onClick={() => setShowMarketplace(false)}
              className="text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map(item => (
              <motion.div 
                key={item.id}
                className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                      {item.price}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-2">Provider: {item.provider}</p>
                  <p className="text-sm text-slate-300 mb-4">{item.description}</p>
                  
                  <motion.button
                    onClick={() => alert(`You have purchased ${item.name} for ${item.price}!`)}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Purchase
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={() => setShowMarketplace(false)}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  // Render edit profile form
  const renderEditProfile = () => {
    if (!showEditProfile) return null;
    
    return (
      <motion.div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-slate-800 rounded-xl max-w-md w-full p-6 relative border border-slate-700 shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <button 
              onClick={() => setShowEditProfile(false)}
              className="text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your first name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your last name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your phone number"
              />
            </div>
            
            <div className="flex space-x-3 pt-2">
              <motion.button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Transparent Logout Button - Fixed in corner */}
      <motion.button>
        
      </motion.button>
      
      <header className="bg-gradient-to-r from-slate-900 via-purple-900/10 to-slate-900 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                Welcome, {userData?.First_Name || userData?.User_Id || username || "User"}
              </motion.h1>
              <motion.p 
                className="text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Your personal health dashboard
              </motion.p>
            </div>
            
            <motion.div 
              className="flex space-x-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.button
                onClick={() => setActiveTab("dashboard")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "dashboard" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Dashboard
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab("nfts")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "nfts" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                My NFTs
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab("blockchain")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "blockchain" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Blockchain
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "profile" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Profile
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl hover:shadow-purple-900/10 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-1.024 6.54c-.308.132-.64.202-.976.202H4.828a2 2 0 01-1.414-.586 1.99 1.99 0 01-.41-2.21 1.98 1.98 0 01.624-.784l.708-.708 2.132-2.132A3 3 0 009 8.172z" clipRule="evenodd" />
                </svg>
                Health Records
              </h2>
              <p className="text-slate-400 mb-4">View and manage your complete health history</p>
              <motion.button
                onClick={() => setShowHealthRecords(true)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Records
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl hover:shadow-purple-900/10 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                LifeNFT Marketplace
              </h2>
              <p className="text-slate-400 mb-4">Explore and purchase health services and products</p>
              <motion.button
                onClick={() => setShowMarketplace(true)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Visit Marketplace
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl hover:shadow-purple-900/10 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                My Account
              </h2>
              <p className="text-slate-400 mb-4">Update your profile and preferences</p>
              <motion.button
                onClick={() => setShowEditProfile(true)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit Profile
              </motion.button>
            </motion.div>
            
            {/* Health Statistics Cards */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
            >
              <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Blood Type</p>
                    <p className="text-2xl font-semibold">O+</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Last Checkup</p>
                    <p className="text-2xl font-semibold">28 Jun 2023</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">NFTs Owned</p>
                    <p className="text-2xl font-semibold">{nfts.length}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Health Score</p>
                    <p className="text-2xl font-semibold">92/100</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Activity Timeline */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-3 bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl mt-4"
            >
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Annual Physical Completed</p>
                    <p className="text-sm text-slate-400">Your annual physical exam results have been added to your records.</p>
                    <p className="text-xs text-slate-500 mt-1">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Blood Donation NFT Received</p>
                    <p className="text-sm text-slate-400">You've received a new NFT for your recent blood donation.</p>
                    <p className="text-xs text-slate-500 mt-1">1 week ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Health Score Updated</p>
                    <p className="text-sm text-slate-400">Your health score has improved to 92/100. Keep up the good work!</p>
                    <p className="text-xs text-slate-500 mt-1">2 weeks ago</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <motion.button
                  className="px-4 py-2 bg-slate-700/80 hover:bg-slate-600 rounded-lg text-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Activity
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* NFTs Tab */}
        {activeTab === "nfts" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
              My Health NFTs
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {nfts.map((nft) => (
                <motion.div
                  key={nft.id}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 shadow-xl"
                  variants={cardHoverVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoverCard(nft.id)}
                  onMouseLeave={() => setHoverCard(null)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={nft.image} 
                      alt={nft.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
                      {nft.bloodType}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{nft.name}</h3>
                    <p className="text-sm text-slate-400 mb-3">Donated on {nft.donationDate} at {nft.hospital}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-300 mb-1">Benefits:</h4>
                      <ul className="text-xs text-slate-400">
                        {nft.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <motion.button
                      onClick={() => {
                        if (!nft.redeemed) {
                          setSelectedNft(nft);
                          setShowRedeemModal(true);
                        }
                      }}
                      className={`w-full py-2 rounded-lg font-medium transition-all ${
                        nft.redeemed 
                          ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                          : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/20"
                      }`}
                      whileHover={!nft.redeemed ? { scale: 1.02 } : {}}
                      whileTap={!nft.redeemed ? { scale: 0.98 } : {}}
                    >
                      {nft.redeemed ? 'Already Redeemed' : 'Redeem Benefits'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        
        {/* Blockchain Tab */}
        {activeTab === "blockchain" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
              Blockchain Transactions
            </motion.h2>
            
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
              {!username ? (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <h3 className="text-xl font-semibold mb-4">Connect Your Hive Account</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto">Connect your Hive account to manage blockchain transactions and NFTs</p>
                  <HiveKeychainLogin onLogin={handleLogin} />
                </motion.div>
              ) : (
                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">Connected as: <span className="text-purple-400">{username}</span></h3>
                      <p className="text-slate-400">Manage your Hive blockchain transactions</p>
                    </div>
                    <motion.button
                      onClick={() => {
                        setUsername("");
                        localStorage.removeItem("hive_username");
                      }}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Disconnect
                    </motion.button>
                  </div>
                  
                  <motion.div variants={itemVariants} className="space-y-6">
                    <HiveTransactions username={username} />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
              My Profile
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-slate-700"
            >
              <div className="h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
              <div className="relative px-6 pb-6">
                <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden bg-slate-700">
                  {userData?.First_Name ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl font-bold">
                      {userData.First_Name[0]}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 text-white text-3xl font-bold">
                      {(userData?.User_Id || username || "U")[0].toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="mt-14 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">{userData?.First_Name ? `${userData.First_Name} ${userData.Last_Name || ''}` : (userData?.User_Id || username)}</h3>
                    <p className="text-slate-400">{userData?.isHiveUser ? 'Hive User' : 'LifeNFT User'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Username/ID</label>
                      <div className="p-3 bg-slate-700/50 border border-slate-600 rounded-lg">
                        {userData?.User_Id || username}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                      <div className="p-3 bg-slate-700/50 border border-slate-600 rounded-lg">
                        {userData?.Email || 'Not provided'}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setShowEditProfile(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20 mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
      
      {/* Health Records Modal */}
      {showHealthRecords && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Health Records</h3>
              <button 
                onClick={() => setShowHealthRecords(false)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {healthRecords.map(record => (
                  <div key={record.id} className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-medium">{record.type}</h4>
                      <span className="bg-slate-600 px-2 py-1 rounded text-xs">{record.date}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-1">Provider: <span className="text-slate-400">{record.provider}</span></p>
                    <p className="text-sm text-slate-300 mb-1">Result: <span className="text-slate-400">{record.results}</span></p>
                    <p className="text-sm text-slate-300">Notes: <span className="text-slate-400">{record.notes}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Marketplace Modal */}
      {showMarketplace && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">LifeNFT Marketplace</h3>
              <button 
                onClick={() => setShowMarketplace(false)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketplaceItems.map(item => (
                  <motion.div 
                    key={item.id} 
                    className="bg-slate-700/50 rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-slate-400 mb-2">Provider: {item.provider}</p>
                      <p className="text-xs text-slate-400 mb-3">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-purple-400">{item.price}</p>
                        <motion.button
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Purchase
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-800 rounded-xl max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                // Handle profile update logic here
                setShowEditProfile(false);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="First Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Last Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Redeem NFT Modal */}
      {showRedeemModal && selectedNft && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-800 rounded-xl max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Redeem NFT Benefits</h3>
              <button 
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedNft(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
              <h4 className="text-lg font-semibold mb-2">{selectedNft.name}</h4>
                <p className="text-sm text-slate-400">From {selectedNft.hospital}</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h5 className="font-medium mb-2">Available Benefits:</h5>
                <ul className="space-y-2">
                  {selectedNft.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-sm text-slate-400 mb-6">
                Once redeemed, this NFT will be marked as used and benefits will be activated. This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <motion.button
                  onClick={() => {
                    setShowRedeemModal(false);
                    setSelectedNft(null);
                  }}
                  className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  onClick={() => handleRedeemNFT(selectedNft.id)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Redeem Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Health Records Modal */}
      {showHealthRecords && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">My Health Records</h3>
              <button 
                onClick={() => setShowHealthRecords(false)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {mockHealthRecords.map(record => (
                  <motion.div 
                    key={record.id}
                    className="bg-slate-700/50 rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: record.id * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{record.type}</h4>
                        <p className="text-sm text-slate-400">Provider: {record.provider}</p>
                        <p className="text-sm text-slate-400">Date: {record.date}</p>
                      </div>
                      <div className="bg-slate-600/50 px-3 py-1 rounded-full text-sm">
                        {record.results}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <p className="text-sm">{record.notes}</p>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <motion.button
                        className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request New Records
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Marketplace Modal */}
      {showMarketplace && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-800 rounded-xl max-w-5xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">LifeNFT Marketplace</h3>
              <button 
                onClick={() => setShowMarketplace(false)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search marketplace..."
                      className="w-full p-3 pl-10 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <select className="p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">All Categories</option>
                  <option value="health">Health Services</option>
                  <option value="wellness">Wellness</option>
                  <option value="equipment">Medical Equipment</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMarketplaceItems.map(item => (
                  <motion.div 
                    key={item.id}
                    className="bg-slate-700/50 rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-slate-400 mb-2">Provider: {item.provider}</p>
                      <p className="text-xs text-slate-400 mb-3">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-purple-400">{item.price}</p>
                        <motion.button
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            // Handle purchase logic
                            alert(`Purchasing ${item.name} for ${item.price}`);
                          }}
                        >
                          Purchase
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <motion.button
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Items
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;