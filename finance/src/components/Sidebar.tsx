import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import {
  LayoutDashboard, Users, FileText, Landmark, BookOpen,
  Settings, History, BarChart3, Coins, LogOut,
  Shield, X, UserCheck, ChevronRight, ChevronLeft,
  MapPin, Calendar, Bell, CheckSquare, Wallet
} from 'lucide-react';
import { UserRole } from '../types';
import { BRAND } from '../config/brand';
import { VYFLLogo } from './VYFLLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MENU_GROUPS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Accountant', 'Auditor'] as UserRole[] },
      { id: 'reports', label: 'Reports Centre', icon: BarChart3, roles: ['Super Admin', 'Manager', 'Accountant', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Field Operations',
    items: [
      { id: 'collections', label: 'Daily Collections', icon: Coins, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
      { id: 'expenses', label: 'Expenses Log', icon: Wallet, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Lending & KYC',
    items: [
      { id: 'customers', label: 'Customers Directory', icon: Users, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
      { id: 'loans', label: 'Loans Ledger', icon: FileText, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
      { id: 'approvals', label: 'Loan Approvals', icon: CheckSquare, roles: ['Super Admin', 'Manager', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Finance & Tools',
    items: [
      { id: 'closing', label: 'Cash Closing', icon: Shield, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Accountant', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'settings', label: 'Control Settings', icon: Settings, roles: ['Super Admin', 'Manager', 'Auditor'] as UserRole[] },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { userRole, currentUser, logout, isFirestoreMode } = useVFMS();
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('sidebar-collapsed') === 'true');

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
  };

  const groups = userRole === 'Loan Officer' ? [
    {
      label: 'Agent Portal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Loan Officer'] },
        { id: 'customers', label: 'My Customers', icon: Users, roles: ['Loan Officer'] },
        { id: 'loans', label: 'Loan Requests', icon: FileText, roles: ['Loan Officer'] },
        { id: 'collections', label: 'Collections', icon: Coins, roles: ['Loan Officer'] },
        { id: 'closing', label: 'Cash Closing', icon: Shield, roles: ['Loan Officer'] },
        { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['Loan Officer'] },
        { id: 'profile', label: 'Profile', icon: UserCheck, roles: ['Loan Officer'] },
      ]
    }
  ] : MENU_GROUPS;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          print:hidden fixed inset-y-0 left-0 bg-white border-r border-slate-200 flex flex-col z-50
          transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:z-20 shrink-0 shadow-sm
          ${isCollapsed ? 'w-16 lg:w-16' : 'w-60 lg:w-60'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* ── Brand Header ── */}
        <div className={`h-14 ${isCollapsed ? 'px-2 justify-center' : 'px-5 justify-between'} flex items-center border-b border-slate-200 shrink-0 transition-all duration-300`}>
          <VYFLLogo size="sm" hideText={isCollapsed} />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
          {groups.map(group => {
            const visible = group.items.filter(item => item.roles.includes(userRole));
            if (!visible.length) return null;

            return (
              <div key={group.label} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-3 mb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">
                    {group.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {visible.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`nav-link-${item.id}`}
                        onClick={() => { setActiveTab(item.id); onClose(); }}
                        className={`
                          w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative group
                          ${isActive
                            ? 'nav-active text-red-600 font-extrabold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }
                        `}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                        {!isCollapsed && isActive && <ChevronRight className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="p-2.5 border-t border-slate-200 shrink-0 space-y-2 safe-bottom transition-all duration-300">
          {/* Collapse/Expand Toggle Row */}
          <button
            onClick={toggleCollapse}
            className={`hidden lg:flex w-full items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all cursor-pointer group`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4.5 h-4.5 shrink-0 text-slate-400 group-hover:text-slate-600" />
            ) : (
              <>
                <ChevronLeft className="w-4.5 h-4.5 shrink-0" />
                <span className="truncate">Collapse Sidebar</span>
              </>
            )}
          </button>

          <button
            id="logout-sidebar-btn"
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group`}
            title="Sign Out"
          >
            <LogOut className="w-4.5 h-4.5 text-slate-400 group-hover:text-red-500 transition-colors shrink-0" />
            {!isCollapsed && <span className="truncate">Sign Out</span>}
          </button>


          {!isCollapsed && (
            <div className="text-[9px] text-slate-400 font-mono text-center pt-0.5 truncate">
              {BRAND.name} · v{BRAND.version}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
