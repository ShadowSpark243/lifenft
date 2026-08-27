import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
import { mockNFTs, mockHealthRecords, mockMarketplaceItems } from '../data/mockData';

// Modals
import { HealthRecordsModal } from '../components/dashboard/HealthRecordsModal';
import { MarketplaceModal } from '../components/dashboard/MarketplaceModal';
import { EditProfileModal } from '../components/dashboard/EditProfileModal';
import { RedeemModal } from '../components/dashboard/RedeemModal';
import { EmergencyQRModal } from '../components/dashboard/EmergencyQRModal';

// Tabs
import { DashboardTab } from '../components/dashboard/DashboardTab';
import { NFTsTab } from '../components/dashboard/NFTsTab';
import { BlockchainTab } from '../components/dashboard/BlockchainTab';
import { ProfileTab } from '../components/dashboard/ProfileTab';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function UserDashboard() {
  const { userRole, logout } = useContext(RoleContext);
  const navigate = useNavigate();

  // State
  const [nfts, setNfts] = useState(mockNFTs);
  const [healthRecords, setHealthRecords] = useState(mockHealthRecords);
  const [marketplaceItems, setMarketplaceItems] = useState(mockMarketplaceItems);
  
  const [userData, setUserData] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // UI State
  const [showHealthRecords, setShowHealthRecords] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showEmergencyQR, setShowEmergencyQR] = useState(false);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedHiveUser = localStorage.getItem('hive_username');
    
    if (storedHiveUser) {
      setUsername(storedHiveUser);
    }
    
    if (!storedUser && !storedHiveUser) {
      navigate('/login');
      return;
    }
    
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        if (parsedUser.Role !== 'user' && !parsedUser.isHiveUser) {
          switch(parsedUser.Role) {
            case 'hospital': navigate('/hospital-dashboard'); break;
            case 'government': navigate('/gov-dashboard'); break;
            default: navigate('/login');
          }
          return;
        }
        
        setUserData(parsedUser);
        setFormData({
          firstName: parsedUser.First_Name || '',
          lastName: parsedUser.Last_Name || '',
          email: parsedUser.Email || '',
          phone: ''
        });
      } else if (storedHiveUser) {
        setUserData({
          User_Id: storedHiveUser,
          Role: 'user',
          isHiveUser: true
        });
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [navigate]);

  const handleRedeemNFT = () => {
    if (selectedNft) {
      const updatedNfts = nfts.map(nft => 
        nft.id === selectedNft.id ? { ...nft, redeemed: true } : nft
      );
      setNfts(updatedNfts);
      setShowRedeemModal(false);
      setSelectedNft(null);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...userData,
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Email: formData.email
    };
    setUserData(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setShowEditProfile(false);
  };

  const handleHiveLogin = (user: string) => {
    setUsername(user);
    localStorage.setItem("hive_username", user);
  };

  const handleDisconnectHive = () => {
    setUsername("");
    localStorage.removeItem("hive_username");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bt-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bt-border border-t-bt-blood rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-bt-mono text-bt-text-sec uppercase tracking-widest text-sm">Initializing System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bt-bg text-bt-text font-bt-body">
      
      {/* Header */}
      <header className="border-b border-bt-border bg-bt-bg pt-20 pb-12 px-6 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-bt-blood/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-4 mb-3">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bt-display font-bold text-bt-text"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  Welcome, <span className="text-bt-blood">{userData?.First_Name || userData?.User_Id || username || "User"}</span>
                </motion.h1>
                
                <motion.button
                  onClick={() => setShowEmergencyQR(true)}
                  className="px-3 py-1 bg-bt-blood text-white font-bt-mono text-xs font-bold uppercase tracking-widest border border-bt-blood hover:bg-transparent hover:text-bt-blood transition-colors flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Emergency ID
                </motion.button>
              </div>
              <motion.p 
                className="font-bt-mono text-sm text-bt-text-sec uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Personal Health Dashboard
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'nfts', label: 'My NFTs' },
                { id: 'blockchain', label: 'Blockchain' },
                { id: 'profile', label: 'Profile' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-bt-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === tab.id 
                      ? "bg-bt-blood text-white border-bt-blood" 
                      : "bg-bt-bg text-bt-text-sec border-bt-border hover:text-bt-text hover:border-bt-blood/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <DashboardTab 
                nftsCount={nfts.length}
                onShowHealthRecords={() => setShowHealthRecords(true)}
                onShowMarketplace={() => setShowMarketplace(true)}
                onShowEditProfile={() => setShowEditProfile(true)}
              />
            </motion.div>
          )}
          
          {activeTab === "nfts" && (
            <motion.div key="nfts" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <NFTsTab 
                nfts={nfts}
                onHoverCard={setHoverCard}
                onLeaveCard={() => setHoverCard(null)}
                onRedeem={(nft) => {
                  setSelectedNft(nft);
                  setShowRedeemModal(true);
                }}
              />
            </motion.div>
          )}
          
          {activeTab === "blockchain" && (
            <motion.div key="blockchain" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <BlockchainTab 
                username={username}
                handleLogin={handleHiveLogin}
                onDisconnect={handleDisconnectHive}
              />
            </motion.div>
          )}
          
          {activeTab === "profile" && (
            <motion.div key="profile" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <ProfileTab 
                userData={userData}
                username={username}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showHealthRecords && (
          <HealthRecordsModal records={healthRecords} onClose={() => setShowHealthRecords(false)} />
        )}
        
        {showMarketplace && (
          <MarketplaceModal items={marketplaceItems} onClose={() => setShowMarketplace(false)} />
        )}
        
        {showEditProfile && (
          <EditProfileModal 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleProfileSubmit} 
            onClose={() => setShowEditProfile(false)} 
          />
        )}
        
        {showRedeemModal && selectedNft && (
          <RedeemModal 
            nft={selectedNft} 
            onConfirm={handleRedeemNFT} 
            onClose={() => setShowRedeemModal(false)} 
          />
        )}
        
        {showEmergencyQR && (
          <EmergencyQRModal 
            userId={userData?.User_Id || username || "aryan_rajbhar"} 
            onClose={() => setShowEmergencyQR(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserDashboard;