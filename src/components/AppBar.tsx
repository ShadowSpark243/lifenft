import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Compass, LayoutDashboard, LogIn, LogOut, UserPlus, Info } from 'lucide-react';
import { Logo } from './Logo';
import { RoleContext } from '../contexts/RoleContext';
import { NavBar } from './ui/tubelight-navbar';

const AppBar = () => {
  const { userRole, isLoggedIn, logout } = useContext(RoleContext);
  const navigate = useNavigate();

  const getDashboardPath = () => {
    switch (userRole) {
      case 'government': return '/gov-dashboard';
      case 'hospital': return '/hospital-dashboard';
      case 'user': return '/user-dashboard';
      default: return '/';
    }
  };

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Explore', url: '/explore', icon: Compass },
    { name: 'About', url: '/about', icon: Info },
  ];

  if (isLoggedIn) {
    navItems.push({ name: 'Dashboard', url: getDashboardPath(), icon: LayoutDashboard });
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 px-[clamp(1rem,4vw,40px)] py-4 flex items-center justify-between border-b"
      style={{
        background: 'rgba(5, 5, 5, 0.94)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
        borderColor: 'var(--bt-color-border-subtle)',
      }}
    >
      {/* Left side: Logo */}
      <div className="flex items-center shrink-0 mr-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 px-0 sm:px-1 py-2 hover:text-secondary-light transition-colors">
          <div className="w-5 h-5 sm:w-6 sm:h-6">
            <Logo />
          </div>
          <span className="hidden sm:inline font-bt-body text-sm font-extrabold tracking-widest uppercase text-white whitespace-nowrap">LifeNFT</span>
        </Link>
      </div>

      {/* Middle: Tubelight Navbar (stretches/centers evenly) */}
      <div className="flex-1 flex justify-center">
        <div className="relative static sm:static w-auto flex justify-center">
          <NavBar items={navItems} className="!relative sm:!top-0 !bottom-auto !left-auto !translate-x-0 !mb-0 !pt-0 w-full flex justify-center" />
        </div>
      </div>

      {/* Right side: Auth buttons */}
      <div className="flex items-center shrink-0 ml-4">
        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-secondary bg-transparent hover:text-secondary-light text-white font-bt-body font-semibold uppercase tracking-wider transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 border-b border-transparent hover:border-white text-white font-bt-body font-semibold uppercase tracking-wider transition-colors text-xs whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-secondary hover:bg-secondary-dark text-white font-bt-body font-bold uppercase tracking-wider transition-colors text-xs sm:text-sm whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Register</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppBar;