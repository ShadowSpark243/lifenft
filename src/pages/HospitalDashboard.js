import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';
import { motion } from "framer-motion";
import * as hiveTx from "hive-tx";

// Mock data for pending donations
const mockPendingDonations = [
  {
    id: 1,
    donorId: "donor123",
    donorName: "John Smith",
    bloodType: "O+",
    donationDate: "2023-07-15",
    status: "pending",
    notes: "First-time donor"
  },
  {
    id: 2,
    donorId: "donor456",
    donorName: "Sarah Johnson",
    bloodType: "A-",
    donationDate: "2023-07-16",
    status: "pending",
    notes: "Regular donor, last donation 3 months ago"
  },
  {
    id: 3,
    donorId: "donor789",
    donorName: "Michael Brown",
    bloodType: "B+",
    donationDate: "2023-07-16",
    status: "pending",
    notes: "Has medical history on file"
  }
];

// Mock data for verified donations
const mockVerifiedDonations = [
  {
    id: 101,
    donorId: "donor222",
    donorName: "Emma Wilson",
    bloodType: "AB+",
    donationDate: "2023-07-10",
    verificationDate: "2023-07-10",
    nftIssued: true,
    nftId: "NFT-2023-101"
  },
  {
    id: 102,
    donorId: "donor333",
    donorName: "James Davis",
    bloodType: "O-",
    donationDate: "2023-07-09",
    verificationDate: "2023-07-09",
    nftIssued: true,
    nftId: "NFT-2023-102"
  },
  {
    id: 103,
    donorId: "donor444",
    donorName: "Olivia Martinez",
    bloodType: "A+",
    donationDate: "2023-07-08",
    verificationDate: "2023-07-08",
    nftIssued: false
  }
];

// Mock hospital stats
const mockHospitalStats = {
  totalDonations: 1245,
  monthlyDonations: 87,
  pendingVerifications: 3,
  nftsIssued: 1156
};

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

function HospitalDashboard() {
  const { userRole } = useContext(RoleContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingDonations, setPendingDonations] = useState(mockPendingDonations);
  const [verifiedDonations, setVerifiedDonations] = useState(mockVerifiedDonations);
  const [hospitalStats, setHospitalStats] = useState(mockHospitalStats);
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showIssueNFTModal, setShowIssueNFTModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [newDonation, setNewDonation] = useState({
    donorId: "",
    donorName: "",
    bloodType: "O+",
    notes: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [settingsForm, setSettingsForm] = useState({
    hospitalName: "",
    address: "",
    phone: "",
    email: "",
    website: ""
  });
  const [hiveUsername, setHiveUsername] = useState("");
  const [isHiveConnected, setIsHiveConnected] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and has the hospital role
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (!userData || userData.Role !== "hospital") {
      navigate("/login");
      return;
    }
    
    // Fetch hospital data
    const fetchHospitalData = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use the localStorage data
        setHospitalData(userData);
        
        // Initialize settings form with hospital data
        setSettingsForm({
          hospitalName: userData.Hospital_Name || "",
          address: userData.Address || "",
          phone: userData.Phone || "",
          email: userData.Email || "",
          website: userData.Website || ""
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        setLoading(false);
      }
    };
    
    fetchHospitalData();
  }, [navigate]);
  
  useEffect(() => {
    // Check if user is logged in with Hive
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (userData && userData.hiveUsername) {
      setHiveUsername(userData.hiveUsername);
      setIsHiveConnected(true);
    }
    
    // Check if Hive Keychain is available
    if (!window.hive_keychain) {
      console.log("Hive Keychain extension is not installed!");
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };
  
  const handleVerifyDonation = (donation) => {
    setSelectedDonation(donation);
    setShowVerifyModal(true);
  };
  
  const confirmVerification = () => {
    // Remove from pending and add to verified
    setPendingDonations(pendingDonations.filter(d => d.id !== selectedDonation.id));
    
    const verifiedDonation = {
      ...selectedDonation,
      status: "verified",
      verificationDate: new Date().toISOString().split('T')[0],
      nftIssued: false
    };
    
    setVerifiedDonations([verifiedDonation, ...verifiedDonations]);
    
    // Update stats
    setHospitalStats({
      ...hospitalStats,
      pendingVerifications: hospitalStats.pendingVerifications - 1,
      totalDonations: hospitalStats.totalDonations + 1,
      monthlyDonations: hospitalStats.monthlyDonations + 1
    });
    
    setShowVerifyModal(false);
    setSelectedDonation(null);
  };
  
  const handleIssueNFT = (donation) => {
    setSelectedDonation(donation);
    setShowIssueNFTModal(true);
  };
  
  const confirmIssueNFT = () => {
    // Update the donation to mark NFT as issued
    const updatedDonations = verifiedDonations.map(d => 
      d.id === selectedDonation.id 
        ? { ...d, nftIssued: true, nftId: `NFT-${new Date().getFullYear()}-${d.id}` } 
        : d
    );
    
    setVerifiedDonations(updatedDonations);
    
    // Update stats
    setHospitalStats({
      ...hospitalStats,
      nftsIssued: hospitalStats.nftsIssued + 1
    });
    
    setShowIssueNFTModal(false);
    setSelectedDonation(null);
    
    // In a real app, this would trigger the blockchain transaction to mint the NFT
    alert(`NFT successfully issued to ${selectedDonation.donorName}`);
  };
  
  const handleAddDonation = () => {
    const newId = Math.max(...pendingDonations.map(d => d.id), 0) + 1;
    
    const donation = {
      id: newId,
      ...newDonation,
      donationDate: new Date().toISOString().split('T')[0],
      status: "pending"
    };
    
    setPendingDonations([donation, ...pendingDonations]);
    
    // Update stats
    setHospitalStats({
      ...hospitalStats,
      pendingVerifications: hospitalStats.pendingVerifications + 1
    });
    
    // Reset form
    setNewDonation({
      donorId: "",
      donorName: "",
      bloodType: "O+",
      notes: ""
    });
    
    setShowAddDonationModal(false);
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would update the hospital settings via API
    setHospitalData({
      ...hospitalData,
      Hospital_Name: settingsForm.hospitalName,
      Address: settingsForm.address,
      Phone: settingsForm.phone,
      Email: settingsForm.email,
      Website: settingsForm.website
    });
    
    setShowSettingsModal(false);
    alert("Hospital settings updated successfully");
  };
  
  const filteredPendingDonations = pendingDonations.filter(donation => 
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredVerifiedDonations = verifiedDonations.filter(donation => 
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (donation.nftId && donation.nftId.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const connectToHive = () => {
    if (!window.hive_keychain) {
      alert("Hive Keychain extension is not installed!");
      return;
    }
    
    const username = prompt("Enter your Hive username:");
    if (!username) return;
    
    // Request a simple signing to verify the user has access to this account
    window.hive_keychain.requestSignBuffer(
      username,
      `Login to LifeNFT as Hospital: ${new Date().toISOString()}`,
      "Posting",
      (response) => {
        if (response.success) {
          setHiveUsername(username);
          setIsHiveConnected(true);
          
          // Save to localStorage
          const userData = JSON.parse(localStorage.getItem("userData")) || {};
          userData.hiveUsername = username;
          localStorage.setItem("userData", JSON.stringify(userData));
          
          alert(`Successfully connected to Hive as @${username}`);
        } else {
          alert(`Failed to authenticate: ${response.message}`);
        }
      }
    );
  };
  
  const confirmVerifyDonation = () => {
    if (!isHiveConnected || !selectedDonation) {
      alert("Please connect to Hive blockchain first to verify donations");
      return;
    }
    
    const customJson = {
      app: "lifenft",
      action: "verify_donation",
      donation_id: selectedDonation.id,
      donor_id: selectedDonation.donorId,
      donor_name: selectedDonation.donorName,
      blood_type: selectedDonation.bloodType,
      amount: selectedDonation.amount,
      hospital_id: "hospital_id_placeholder", // Replace with actual hospital ID
      hospital_name: "hospital_name_placeholder", // Replace with actual hospital name
      verified_by: hiveUsername,
      timestamp: new Date().toISOString()
    };
    
    window.hive_keychain.requestCustomJson(
      hiveUsername,
      "lifenft_donation_verification",
      "Active",
      JSON.stringify(customJson),
      `Verify Blood Donation: ${selectedDonation.donorName}`,
      (response) => {
        if (response.success) {
          const updatedPendingDonations = pendingDonations.filter(
            donation => donation.id !== selectedDonation.id
          );
          setPendingDonations(updatedPendingDonations);
          
          const verifiedDonation = {
            ...selectedDonation,
            verificationDate: new Date().toLocaleDateString(),
            nftIssued: false,
            blockchainTxId: response.result.id || "unknown"
          };
          setVerifiedDonations([verifiedDonation, ...verifiedDonations]);
          
          setShowVerifyModal(false);
          setSelectedDonation(null);
          
          alert(`Donation by ${selectedDonation.donorName} has been verified on the blockchain!`);
        } else {
          alert(`Blockchain transaction failed: ${response.message}`);
        }
      }
    );
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-slate-300">Loading hospital dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Hospital Dashboard
              </h1>
              <p className="text-slate-400">
                {hospitalData?.Hospital_Name || hospitalData?.User_Id}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 pb-4 overflow-x-auto">
            <motion.button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "dashboard" 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Dashboard
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab("donations")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "donations" 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Donations
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab("nfts")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "nfts" 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              NFTs
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "reports" 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Reports
            </motion.button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Total Donations</p>
                    <p className="text-3xl font-bold mt-2">{hospitalStats.totalDonations}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm font-medium">↑ 12% </span>
                  <span className="text-slate-400 text-sm">from last month</span>
                </div>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Monthly Donations</p>
                    <p className="text-3xl font-bold mt-2">{hospitalStats.monthlyDonations}</p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm font-medium">↑ 8% </span>
                  <span className="text-slate-400 text-sm">from last month</span>
                </div>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Pending Verifications</p>
                    <p className="text-3xl font-bold mt-2">{hospitalStats.pendingVerifications}</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-slate-400 text-sm">Requires verification</span>
                </div>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400">NFTs Issued</p>
                    <p className="text-3xl font-bold mt-2">{hospitalStats.nftsIssued}</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-400 text-sm font-medium">↑ 15% </span>
                  <span className="text-slate-400 text-sm">from last month</span>
                </div>
              </div>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  onClick={() => setShowAddDonationModal(true)}
                  className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/20 rounded-xl flex items-center transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span>Add New Donation</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab("donations")}
                  className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/20 rounded-xl flex items-center transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3 bg-green-500/10 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Verify Donations</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab("nfts")}
                  className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 rounded-xl flex items-center transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span>Issue NFTs</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowSettingsModal(true)}
                  className="p-4 bg-gradient-to-r from-slate-500/10 to-slate-400/10 hover:from-slate-500/20 hover:to-slate-400/20 border border-slate-500/20 rounded-xl flex items-center transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3 bg-slate-500/10 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Hospital Settings</span>
                </motion.button>
              </div>
            </motion.div>
            
            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg overflow-hidden">
                <div className="divide-y divide-slate-700">
                  {pendingDonations.slice(0, 3).map(donation => (
                    <div key={donation.id} className="p-4 hover:bg-slate-700/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{donation.donorName}</h3>
                          <p className="text-sm text-slate-400">
                            Blood Type: {donation.bloodType} • Date: {donation.donationDate}
                          </p>
                        </div>
                        <motion.button
                          onClick={() => handleVerifyDonation(donation)}
                          className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Verify
                        </motion.button>
                      </div>
                    </div>
                  ))}
                  
                  {pendingDonations.length === 0 && (
                    <div className="p-4 text-center text-slate-400">
                      No pending donations to verify
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Donations Tab */}
        {activeTab === "donations" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Verify Donation</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search donations..."
                />
                <button
                  onClick={() => {
                    // Implement search functionality
                  }}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                >
                  Search
                </button>
              </div>
            </motion.div>
            
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg overflow-hidden">
              <div className="divide-y divide-slate-700">
                {filteredPendingDonations.map(donation => (
                  <div key={donation.id} className="p-4 hover:bg-slate-700/30 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{donation.donorName}</h3>
                        <p className="text-sm text-slate-400">
                          Blood Type: {donation.bloodType} • Date: {donation.donationDate}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => handleVerifyDonation(donation)}
                        className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Verify
                      </motion.button>
                    </div>
                  </div>
                ))}
                
                {filteredPendingDonations.length === 0 && (
                  <div className="p-4 text-center text-slate-400">
                    No matching donations found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Verify Donation Modal */}
        {showVerifyModal && selectedDonation && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-slate-800 rounded-xl max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Verify Donation</h3>
                <button 
                  onClick={() => {
                    setShowVerifyModal(false);
                    setSelectedDonation(null);
                  }}
                  className="p-2 rounded-lg hover:bg-slate-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Donor Information</h4>
                  <div className="bg-slate-700/50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span>{selectedDonation.donorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID:</span>
                      <span>{selectedDonation.donorId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Blood Type:</span>
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded-md text-sm">
                        {selectedDonation.bloodType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Donation Date:</span>
                      <span>{selectedDonation.donationDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Verification Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Verification Date</label>
                      <input
                        type="text"
                        value={selectedDonation.verificationDate}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter verification date"
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Verification Notes</label>
                      <textarea
                        value={selectedDonation.notes}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                        placeholder="Add verification notes..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => {
                      setShowVerifyModal(false);
                      setSelectedDonation(null);
                    }}
                    className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={confirmVerifyDonation}
                    className={`flex-1 py-2.5 rounded-lg font-medium transition-all shadow-lg ${
                      isHiveConnected 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/20" 
                        : "bg-slate-600 cursor-not-allowed"
                    }`}
                    whileHover={isHiveConnected ? { scale: 1.02 } : {}}
                    whileTap={isHiveConnected ? { scale: 0.98 } : {}}
                    disabled={!isHiveConnected}
                  >
                    Verify Donation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Issue NFT Modal */}
        {showIssueNFTModal && selectedDonation && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-slate-800 rounded-xl max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Issue NFT Certificate</h3>
                <button 
                  onClick={() => {
                    setShowIssueNFTModal(false);
                    setSelectedDonation(null);
                  }}
                  className="p-2 rounded-lg hover:bg-slate-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Donor Information</h4>
                  <div className="bg-slate-700/50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span>{selectedDonation.donorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID:</span>
                      <span>{selectedDonation.donorId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Blood Type:</span>
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded-md text-sm">
                        {selectedDonation.bloodType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Donation Date:</span>
                      <span>{selectedDonation.donationDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">NFT Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">NFT Title</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Blood Donation Certificate #123"
                        defaultValue={`Blood Donation Certificate - ${selectedDonation.donorName}`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                      <textarea
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                        placeholder="Add NFT description..."
                        defaultValue={`This certificate verifies that ${selectedDonation.donorName} donated blood type ${selectedDonation.bloodType} on ${selectedDonation.donationDate} at ${hospitalData?.Hospital_Name || 'our hospital'}.`}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Benefits</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="benefit1"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="benefit1">10% discount at partner pharmacies</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="benefit2"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="benefit2">Free health checkup within 3 months</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="benefit3"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="benefit3">Priority appointment booking</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => {
                      setShowIssueNFTModal(false);
                      setSelectedDonation(null);
                    }}
                    className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleIssueNFT()}
                    className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Issue NFT
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Add Donation Modal */}
        {showAddDonationModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-slate-800 rounded-xl max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Add New Donation</h3>
                <button 
                  onClick={() => setShowAddDonationModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleAddDonation}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Donor ID</label>
                      <input
                        type="text"
                        value={newDonation.donorId}
                        onChange={(e) => setNewDonation({...newDonation, donorId: e.target.value})}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter donor ID"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Donor Name</label>
                      <input
                        type="text"
                        value={newDonation.donorName}
                        onChange={(e) => setNewDonation({...newDonation, donorName: e.target.value})}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter donor name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Blood Type</label>
                      <select
                        value={newDonation.bloodType}
                        onChange={(e) => setNewDonation({...newDonation, bloodType: e.target.value})}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <label className="block text-sm font-medium text-slate-400 mb-1">Notes</label>
                      <textarea
                        value={newDonation.notes}
                        onChange={(e) => setNewDonation({...newDonation, notes: e.target.value})}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                        placeholder="Add any notes about this donation..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <motion.button
                      type="button"
                      onClick={() => setShowAddDonationModal(false)}
                      className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add Donation
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Hospital Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-slate-800 rounded-xl max-w-2xl w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Hospital Settings</h3>
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSaveSettings}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Hospital Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Hospital Name</label>
                          <input
                            type="text"
                            value={settingsForm.hospitalName}
                            onChange={(e) => setSettingsForm({...settingsForm, hospitalName: e.target.value})}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter hospital name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
                          <textarea
                            value={settingsForm.address}
                            onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                            placeholder="Enter hospital address"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Contact Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={settingsForm.phone}
                            onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter phone number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                          <input
                            type="email"
                            value={settingsForm.email}
                            onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email address"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-400 mb-1">Website</label>
                          <input
                            type="url"
                            value={settingsForm.website}
                            onChange={(e) => setSettingsForm({...settingsForm, website: e.target.value})}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter website URL"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Blockchain Integration</h4>
                      <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                        <p className="text-sm text-slate-400 mb-4">
                          Connect your hospital to the blockchain for secure and transparent donation verification.
                        </p>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="enableBlockchain"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="enableBlockchain">Enable blockchain integration for NFT issuance</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <motion.button
                      type="button"
                      onClick={() => setShowSettingsModal(false)}
                      className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/20"
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
      </main>
    </div>
  );
}

export default HospitalDashboard;