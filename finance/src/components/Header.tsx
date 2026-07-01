import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {
  Building2, ChevronDown, LogOut, Menu, X, Bell, Shield
} from 'lucide-react';
import { BRAND } from '../config/brand';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const {
    branches, currentBranch, switchBranch,
    currentUser, isFirestoreMode, logout,
  } = useVFMS();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const initial = currentUser?.displayName
    ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'SA';

  const handleLogout = async () => {
    try {
      if (isFirestoreMode && auth.currentUser) {
        await signOut(auth);
      }
      await logout();
    } catch { /* ignore */ }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm shrink-0">

      {/* Left: Hamburger + Branch */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Branch Selector */}
        <div className="relative">
          <button
            id="branch-selector-btn"
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-xs font-semibold text-slate-700 group"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors" />
            <span className="hidden sm:inline font-bold">{currentBranch.name}</span>
            <span className="sm:hidden font-mono font-bold text-[10px]">{currentBranch.code}</span>
            <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md hidden sm:inline">{currentBranch.code}</span>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isBranchDropdownOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsBranchDropdownOpen(false)} />
              <div className="absolute left-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                <div className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                  Switch Branch
                </div>
                {branches.map(branch => (
                  <button
                    key={branch.id}
                    onClick={() => { switchBranch(branch.id); setIsBranchDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors hover:bg-slate-50 ${
                      currentBranch.id === branch.id ? 'text-red-600 bg-red-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{branch.name}</span>
                    <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{branch.code}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Status + User Menu */}
      <div className="flex items-center gap-2">

        {/* Live Mode Badge */}
        <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
          isFirestoreMode
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-amber-50 border-amber-200 text-amber-700'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isFirestoreMode ? 'bg-emerald-500 live-dot' : 'bg-amber-400'}`} />
          <span>{isFirestoreMode ? 'Live Database' : 'Sandbox Mode'}</span>
        </div>

        {/* Security Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600">
          <Shield className="w-3 h-3 text-slate-400" />
          <span>Secured</span>
        </div>

        {/* User Avatar + Menu */}
        <div className="relative border-l border-slate-200 pl-3 ml-1">
          <button
            id="user-menu-btn"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-[10px] font-black shadow-sm">
              {initial}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser?.displayName || 'Admin'}</p>
              <p className="text-[9px] text-slate-400 font-mono">{currentUser?.email?.split('@')[0]}</p>
            </div>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isUserMenuOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setIsUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-800">{currentUser?.displayName}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{currentUser?.email}</p>
                  <span className="inline-flex mt-1 items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-100 rounded-full text-[9px] font-bold text-red-700 uppercase tracking-wider">
                    {currentUser?.role}
                  </span>
                </div>
                <button
                  id="user-menu-signout"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
