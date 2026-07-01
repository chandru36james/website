import React from 'react';
import { useVFMS } from '../context/VFMSContext';
import {
  LayoutDashboard, Users, FileText, Landmark, BookOpen,
  Settings, History, BarChart3, Coins, LogOut,
  Shield, X, UserCheck, ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';
import { BRAND } from '../config/brand';

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
      { id: 'dashboard', label: 'Dashboard',     icon: LayoutDashboard, roles: ['Super Admin', 'Manager', 'Loan Officer', 'Accountant', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Lending',
    items: [
      { id: 'customers',  label: 'Customers',         icon: Users,      roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
      { id: 'loans',      label: 'Loans & EMIs',       icon: FileText,   roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
      { id: 'guarantors', label: 'Guarantors',         icon: UserCheck,  roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
      { id: 'collateral', label: 'Collaterals',        icon: Landmark,   roles: ['Super Admin', 'Manager', 'Loan Officer', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'cashbook', label: 'Cash Book',           icon: Coins,      roles: ['Super Admin', 'Manager', 'Accountant', 'Auditor'] as UserRole[] },
      { id: 'ledger',   label: 'Double Entry Ledger', icon: BookOpen,   roles: ['Super Admin', 'Manager', 'Accountant', 'Auditor'] as UserRole[] },
      { id: 'reports',  label: 'Reports',             icon: BarChart3,  roles: ['Super Admin', 'Manager', 'Accountant', 'Auditor'] as UserRole[] },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'rules', label: 'Rule Engine',        icon: Settings, roles: ['Super Admin'] as UserRole[] },
      { id: 'users', label: 'User Access Control',icon: Shield,   roles: ['Super Admin'] as UserRole[] },
      { id: 'audit', label: 'Audit Trail',        icon: History,  roles: ['Super Admin', 'Auditor'] as UserRole[] },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { userRole, currentUser, logout, isFirestoreMode } = useVFMS();



  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
  };

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
          fixed inset-y-0 left-0 w-60 bg-white border-r border-slate-200 flex flex-col z-50
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:z-20 shrink-0 shadow-sm
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* ── Brand Header ── */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <span className="text-white font-black text-sm tracking-tight">V</span>
            </div>
            <div className="leading-none">
              <p className="text-[13px] font-black text-slate-900 tracking-tight">{BRAND.shortName}</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Finance FMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>



        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {MENU_GROUPS.map(group => {
            const visible = group.items.filter(item => item.roles.includes(userRole));
            if (!visible.length) return null;

            return (
              <div key={group.label}>
                <p className="px-3 mb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {group.label}
                </p>
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
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative group
                          ${isActive
                            ? 'nav-active text-red-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className="flex-1 text-left">{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 text-red-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="p-3 border-t border-slate-200 shrink-0 space-y-2 safe-bottom">
          <button
            id="logout-sidebar-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
            <span>Sign Out</span>
          </button>
          
          <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-[10px] text-[9px] font-bold font-mono text-center flex items-center justify-center gap-1 select-none">
            <span className="text-slate-400">Environment:</span>
            <span className={isFirestoreMode ? 'text-indigo-600' : 'text-emerald-600'}>
              {isFirestoreMode ? '☁️ Firebase Cloud' : '🟢 Sandbox'}
            </span>
          </div>

          <div className="text-[9px] text-slate-400 font-mono text-center pt-0.5">
            {BRAND.name} · v{BRAND.version}
          </div>
        </div>
      </aside>
    </>
  );
};
