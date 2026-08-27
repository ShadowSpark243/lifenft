import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explore } from './pages/Explore';
import { About } from './pages/About';
import UserDashboard from "./pages/UserDashboard";
import GovDashboard from "./pages/GovDashboard";
import { EmergencyView } from "./pages/EmergencyView";
import ProtectedRoute from "./components/ProtectedRoute";
import HospitalDashboard from './pages/HospitalDashboard';
import { VerifyDonation } from './pages/VerifyDonation';
import { RedeemNFT } from './pages/RedeemNFT';
import { ManageHospitals } from './pages/ManageHospitals';
import { RoleContext } from './contexts/RoleContext';
import AppBar from './components/AppBar';

import { DonationProvider } from './contexts/DonationContext';
import { RoleProvider } from "./contexts/RoleContext";
import NFTPage from './pages/NFTPage';
import ReportsPage from './pages/ReportsPage';
import DesignPreview from './pages/DesignPreview';

function App() {
  const [userRole, setUserRole] = useState(() => {
    // Try to get role from localStorage on initial load
    return localStorage.getItem('userRole') || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/'; // Redirect to home page after logout
  };

  // Helper function to get dashboard based on role
  const getDashboardPath = () => {
    switch (userRole) {
      case 'government': return '/gov-dashboard';
      case 'hospital': return '/hospital-dashboard';
      case 'user': return '/user-dashboard';
      default: return '/';
    }
  };

  return (
    <DonationProvider>
      <RoleProvider>
        <RoleContext.Provider value={{ userRole, isLoggedIn, login, logout }}>
          <Router>
            <div
              className="bold-typography-theme min-h-screen text-white relative"
              style={{
                background: 'var(--bt-color-bg)',
              }}
            >
              <div className="bt-noise" />
              <div className="relative z-10">
                {/* Use the new AppBar */}
                <AppBar />

                {/* Routes */}
                <div className="pt-24 pb-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/gov-dashboard" element={<GovDashboard />} />
                    <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/verify-donation" element={<VerifyDonation />} />
                    <Route path="/redeem-nft" element={<RedeemNFT />} />
                    <Route path="/manage-hospitals" element={<ManageHospitals />} />
                    <Route path="/nfts" element={<NFTPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/emergency/:userId" element={<EmergencyView />} />
                    <Route path="/design-preview" element={<DesignPreview />} />
                  </Routes>
                </div>

                {/* Footer */}
                <footer className="mt-12 py-12 border-t border-slate-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h3 className="font-bt-body text-sm font-extrabold uppercase tracking-widest text-white mb-4">BloodDonorNFT</h3>
                        <p className="bt-body text-sm">Rewarding blood donors with NFTs, connecting hospitals and donors for a healthier community.</p>
                      </div>
                      <div>
                        <h4 className="bt-label text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                          <li><Link to="/" className="bt-body text-sm hover:text-white transition-colors">Home</Link></li>
                          <li><Link to="/explore" className="bt-body text-sm hover:text-white transition-colors">Explore</Link></li>
                          <li><Link to="/about" className="bt-body text-sm hover:text-white transition-colors">About</Link></li>
                          <li><Link to="/login" className="bt-body text-sm hover:text-white transition-colors">Login</Link></li>
                          <li><Link to="/register" className="bt-body text-sm hover:text-white transition-colors">Register</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="bt-label text-white mb-3">Contact</h4>
                        <p className="bt-body text-sm">info@blooddonornft.com</p>
                        <p className="bt-body text-sm">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center">
                      <p className="bt-mono text-xs text-slate-500">© 2023 BloodDonorNFT. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </div>

            </div>
          </Router>
        </RoleContext.Provider>
      </RoleProvider>
    </DonationProvider>
  );
}

export default App;