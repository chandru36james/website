import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {
  Building2, ChevronDown, LogOut, Menu, X, Bell, Shield, Search
} from 'lucide-react';
import { BRAND } from '../config/brand';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  setActiveTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen, setActiveTab }) => {
  const {
    branches, currentBranch, switchBranch,
    currentUser, isFirestoreMode, logout,
    customers, loans, payments, userProfiles, notifications
  } = useVFMS();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    type: 'Customer' | 'Loan' | 'Payment' | 'Agent';
    id: string;
    title: string;
    subtitle: string;
    details: any;
  }[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    const query = val.toLowerCase().trim();
    const results: typeof searchResults = [];

    // Search Customers
    customers.forEach(c => {
      if (
        c.name.toLowerCase().includes(query) ||
        (c.phone && c.phone.includes(query)) ||
        (c.aadhaar && c.aadhaar.includes(query)) ||
        (c.pan && c.pan.toLowerCase().includes(query))
      ) {
        results.push({
          type: 'Customer',
          id: c.id,
          title: c.name,
          subtitle: `Customer | Mobile: ${c.phone} | Village: ${c.village || 'N/A'}`,
          details: c
        });
      }
    });

    // Search Loans
    loans.forEach(l => {
      if (l.loanNumber.toLowerCase().includes(query)) {
        results.push({
          type: 'Loan',
          id: l.id,
          title: l.loanNumber,
          subtitle: `Loan | Principal: ₹${l.principal} | Borrower: ${l.customerName} (${l.status})`,
          details: l
        });
      }
    });

    // Search Payments
    payments.forEach(p => {
      if (p.receiptNumber.toLowerCase().includes(query)) {
        results.push({
          type: 'Payment',
          id: p.id,
          title: p.receiptNumber,
          subtitle: `Receipt | Amount: ₹${p.amount} | Date: ${p.paymentDate.split('T')[0]}`,
          details: p
        });
      }
    });

    // Search Agents
    userProfiles.forEach(u => {
      if (u.displayName.toLowerCase().includes(query)) {
        results.push({
          type: 'Agent',
          id: u.uid,
          title: u.displayName,
          subtitle: `Agent | Email: ${u.email} | Role: ${u.role}`,
          details: u
        });
      }
    });

    setSearchResults(results.slice(0, 8));
  };

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
    <header className="print:hidden sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm shrink-0 pt-safe-top">
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between w-full">

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

      {/* Middle: Unified Global Search Box */}
      <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Global search (Name, Mobile, Aadhaar, PAN, Loan, Receipt)..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Dropdown Results */}
        {searchResults.length > 0 && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setSearchResults([])} />
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-80 overflow-y-auto py-2 z-50 animate-scale-in text-xs">
              {searchResults.map(res => (
                <button
                  key={res.id}
                  onClick={() => {
                    setSelectedResult(res);
                    setSearchResults([]);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex flex-col gap-0.5 border-b border-slate-100 last:border-0 cursor-pointer"
                >
                  <span className="font-bold text-slate-900">{res.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{res.subtitle}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Global Search Result Modal Popups */}
      {selectedResult && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full space-y-4 animate-scale-up text-xs font-medium text-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Search className="h-5 w-5 text-indigo-600" />
                <span>Search Match: {selectedResult.type}</span>
              </div>
              <button 
                onClick={() => setSelectedResult(null)} 
                className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">{selectedResult.title}</h4>
              <p className="text-[10px] text-slate-400 font-mono">{selectedResult.subtitle}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 font-mono text-[10px] leading-relaxed overflow-x-auto max-h-48 whitespace-pre-wrap text-left">
                {selectedResult.type === 'Customer' ? (
                  <div className="space-y-1.5 font-sans">
                    <p><strong>Name:</strong> {selectedResult.details.name}</p>
                    <p><strong>Mobile:</strong> {selectedResult.details.phone}</p>
                    <p><strong>Aadhaar:</strong> {selectedResult.details.aadhaar}</p>
                    <p><strong>PAN:</strong> {selectedResult.details.pan}</p>
                    <p><strong>Village:</strong> {selectedResult.details.village || 'N/A'}</p>
                    <p><strong>Area:</strong> {selectedResult.details.area || 'N/A'}</p>
                    <p><strong>Address:</strong> {selectedResult.details.address}</p>
                  </div>
                ) : selectedResult.type === 'Loan' ? (
                  <div className="space-y-1.5 font-sans">
                    <p><strong>Loan Number:</strong> {selectedResult.details.loanNumber}</p>
                    <p><strong>Borrower:</strong> {selectedResult.details.customerName}</p>
                    <p><strong>Principal:</strong> ₹{selectedResult.details.principal}</p>
                    <p><strong>Book Amount:</strong> ₹{selectedResult.details.loanBookAmount || selectedResult.details.principal}</p>
                    <p><strong>Daily Collection:</strong> ₹{selectedResult.details.dailyCollectionAmount || 500}</p>
                    <p><strong>Duration:</strong> {selectedResult.details.duration} Days</p>
                    <p><strong>Status:</strong> {selectedResult.details.status}</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 font-sans">
                    <p><strong>ID/Code:</strong> {selectedResult.details.id || selectedResult.details.uid}</p>
                    <p><strong>Info:</strong> {selectedResult.title}</p>
                    <p><strong>Details:</strong> {selectedResult.subtitle}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right: Status + User Menu */}
      <div className="flex items-center gap-2">

        {/* Search Icon for Mobile */}
        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition-all cursor-pointer mr-1"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Icon */}
        <button
          onClick={() => {
            if (setActiveTab) {
              setActiveTab('notifications');
            } else {
              const btn = document.getElementById('nav-link-notifications');
              if (btn) {
                btn.click();
              }
            }
          }}
          className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all relative cursor-pointer mr-1"
          title="System Notifications"
        >
          <Bell className="w-4 h-4" />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
          )}
        </button>

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
      </div>

      {/* Mobile Search Box */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 py-2.5 border-t border-slate-200 bg-white animate-fade-in relative z-40">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search (Name, Mobile, Loan, Receipt)..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Mobile Search Dropdown Results */}
          {searchResults.length > 0 && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSearchResults([])} />
              <div className="absolute left-4 right-4 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 max-h-60 overflow-y-auto py-2 z-50 animate-scale-in text-xs">
                {searchResults.map(res => (
                  <button
                    key={res.id}
                    onClick={() => {
                      setSelectedResult(res);
                      setSearchResults([]);
                      setSearchQuery('');
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex flex-col gap-0.5 border-b border-slate-100 last:border-0 cursor-pointer"
                  >
                    <span className="font-bold text-slate-900">{res.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{res.subtitle}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
