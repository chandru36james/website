import React, { useState } from 'react';
import { VFMSProvider, useVFMS } from './context/VFMSContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CustomersView } from './components/CustomersView';
import { LoansView } from './components/LoansView';
import { ReportsView } from './components/ReportsView';
import { LoginView } from './components/LoginView';
import { LockScreenView } from './components/LockScreenView';
import { SettingsView } from './components/SettingsView';
import { ToastProvider } from './components/ToastProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OnboardingWizardView } from './components/OnboardingWizardView';
import { LayoutDashboard, Coins, BarChart3, Settings, KeyRound, ShieldAlert, Check, LogOut, WifiOff, Download, X, Users, FileText, Wallet } from 'lucide-react';

// Redesigned Microfinance Views
import { DailyCollectionsView } from './components/DailyCollectionsView';
import { AgentRouteView } from './components/AgentRouteView';
import { ExpensesView } from './components/ExpensesView';
import { CashClosingView } from './components/CashClosingView';
import { NotificationsView } from './components/NotificationsView';
import { LoanApprovalsView } from './components/LoanApprovalsView';
import { AgentPerformanceView } from './components/AgentPerformanceView';

import { ActionConfirmModal } from './components/ActionConfirmModal';

const MainAppLayout: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  React.useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem('vfms_pwa_install_dismissed');
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    }
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('vfms_pwa_install_dismissed', 'true');
  };

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    userRole, 
    currentUser, 
    isLoading, 
    isAppLocked, 
    lockApp, 
    securityPolicy, 
    logAudit, 
    setupUserApprovalPin, 
    logout,
    activeApprovalRequest,
    setActiveApprovalRequest,
    isSystemInitialized
  } = useVFMS();


  // ── Anti-inspect: Right-click block ──
  React.useEffect(() => {
    if (!currentUser || !securityPolicy?.disableRightClick) return;
    const handler = (e: MouseEvent) => {
      e.preventDefault();
      logAudit('INTRUSION_RIGHT_CLICK_BLOCKED', 'Security', 'Right-Click', 'Blocked', 'Right-click context menu blocked.');
    };
    window.addEventListener('contextmenu', handler);
    return () => window.removeEventListener('contextmenu', handler);
  }, [currentUser, securityPolicy?.disableRightClick, logAudit]);

  // ── Anti-inspect: DevTools shortcut block ──
  React.useEffect(() => {
    if (!currentUser || !securityPolicy?.preventDevTools) return;
    const handler = (e: KeyboardEvent) => {
      const blocked =
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) ||
        (e.ctrlKey && ['U','u'].includes(e.key));
      if (blocked) {
        e.preventDefault();
        logAudit('INTRUSION_DEVTOOLS_SHORTCUT_BLOCKED', 'Security', 'Keyboard', e.key, 'DevTools shortcut blocked.');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentUser, securityPolicy?.preventDevTools, logAudit]);

  // ── Remove HTML loader once React mounts ──
  React.useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.3s';
      setTimeout(() => loader.remove(), 300);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center select-none animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain animate-pulse rounded-xl" />
          <div className="w-6 h-6 border-2 border-red-650 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-[10px] font-mono tracking-wide">Initializing secure session...</p>
        </div>
      </div>
    );
  }

  if (!isSystemInitialized) {
    return <OnboardingWizardView />;
  }

  if (!currentUser) return <LoginView />;
  if (isAppLocked)  return <LockScreenView />;

  const isAdmin = currentUser.role === 'Super Admin' || currentUser.role === 'Manager';
  const isPinSetupRequired = isAdmin && (!currentUser.approvalPin || currentUser.approvalPinResetRequired);
  if (isPinSetupRequired) return <PinSetupRequiredView />;

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':    return <DashboardView />;
      case 'collections':  return <DailyCollectionsView />;
      case 'expenses':     return userRole !== 'Loan Officer' ? <ExpensesView /> : <DashboardView />;
      case 'customers':    return <CustomersView />;
      case 'loans':        return <LoansView />;
      case 'approvals':    return <LoanApprovalsView />;
      case 'closing':      return <CashClosingView />;
      case 'reports':      return <ReportsView />;
      case 'notifications':return <NotificationsView />;
      case 'settings':     return <SettingsView />;
      case 'profile':      return <AgentPerformanceView />;
      default:             return <DashboardView />;
    }
  };

  return (
    <div className="flex bg-slate-50 h-screen text-slate-800 overflow-hidden">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white relative">
        {!isOnline && (
          <div className="bg-red-600 text-white px-4 py-1.5 flex items-center justify-center gap-2 text-[10px] font-bold tracking-wide animate-pulse z-50 shrink-0">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Working Offline Mode. Transactions will be synchronized automatically.</span>
          </div>
        )}
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/60 pb-20 md:pb-6 print:p-0 print:overflow-visible print:bg-white">
          <div className="max-w-7xl mx-auto space-y-4 animate-fade-in">
            {renderView()}
          </div>
        </main>

        <footer className="print:hidden h-8 border-t border-slate-200 px-6 flex items-center justify-between bg-white text-[10px] text-slate-400 font-mono shrink-0 safe-bottom pb-20 md:pb-0">
          <div className="flex gap-4">
            <span>System: <span className="text-emerald-500 font-bold">Operational</span></span>
            <span className="hidden sm:inline">Server: AP-SOUTH-1</span>
          </div>
          <span>© {new Date().getFullYear()} VGot You Finance Management System v2.0.0</span>
        </footer>

        <ActionConfirmModal
          isOpen={activeApprovalRequest !== null}
          onClose={() => setActiveApprovalRequest(null)}
          onConfirm={activeApprovalRequest?.onConfirm || (() => {})}
          title="Manager Approval Required"
          description={activeApprovalRequest?.description || "This action requires authorization from a Manager or Super Admin."}
        />

        {/* Mobile Bottom Navigation Bar (Dynamic & Role-Based) */}
        <div className="print:hidden md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/60 h-14 flex items-center justify-around z-40 px-2 pb-safe-bottom shadow-md">
          {(userRole === 'Loan Officer' 
            ? [
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
                { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
                { id: 'loans', label: 'Loans', icon: <FileText className="w-5 h-5" /> },
                { id: 'collections', label: 'Collections', icon: <Coins className="w-5 h-5" /> },
              ]
            : [
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
                { id: 'collections', label: 'Collections', icon: <Coins className="w-5 h-5" /> },
                { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
                ...(['Super Admin', 'Manager', 'Auditor'].includes(userRole) ? [
                  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
                ] : []),
              ]
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-colors cursor-pointer relative h-full ${
                activeTab === tab.id ? 'text-red-600 font-black' : 'text-slate-400 font-bold'
              }`}
            >
              {tab.icon}
              <span className="text-[9px] mt-0.5">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-red-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
        {/* PWA Install Banner */}
        {showInstallBanner && (
          <div className="fixed bottom-16 md:bottom-6 right-4 z-[9999] max-w-sm bg-slate-900/95 text-white backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-2xl flex flex-col gap-3 animate-fade-in text-[11px]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-100">Install Mobile App</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">Install VYFL Finance on your phone or computer for offline ledger access and native experience.</p>
                </div>
              </div>
              <button 
                onClick={dismissInstallBanner}
                className="p-1 hover:bg-slate-800 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 justify-end text-[10px]">
              <button 
                onClick={dismissInstallBanner}
                className="px-3 py-1.5 border border-slate-700 hover:bg-slate-800 rounded-lg font-bold text-slate-300 transition-colors cursor-pointer"
              >
                Later
              </button>
              <button 
                onClick={handleInstallApp}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-750 text-white rounded-lg font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Install Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <VFMSProvider>
        <ToastProvider>
          <MainAppLayout />
        </ToastProvider>
      </VFMSProvider>
    </ErrorBoundary>
  );
}

const PinSetupRequiredView: React.FC = () => {
  const { currentUser, setupUserApprovalPin, logout, approvalPin } = useVFMS();
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPin !== confirmPin) {
      setError('PINs do not match. Please re-enter.');
      return;
    }
    setIsSubmitting(true);
    try {
      await setupUserApprovalPin(newPin);
    } catch (err: any) {
      setError(err.message || 'Failed to setup PIN.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative font-sans text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/50 z-10 space-y-6 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-650 to-purple-650 opacity-20 blur animate-pulse" />
          <div className="relative h-14 w-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
            <KeyRound className="h-6 w-6 animate-bounce" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-sm font-black text-slate-100">Approval PIN Setup Required</h2>
          <p className="text-[11px] text-slate-400 max-w-[280px] mx-auto leading-relaxed font-medium">
            Hello <span className="text-slate-200 font-semibold">{currentUser?.displayName}</span>. To protect sensitive actions, please configure your new 4 to 8 digit Approval PIN.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Choose Approval PIN</label>
              <input
                type="password"
                maxLength={8}
                required
                value={newPin}
                onChange={e => {
                  setNewPin(e.target.value.replace(/\D/g, ''));
                  setError(null);
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.75em] font-mono text-base font-bold bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl h-11 text-white placeholder-slate-700 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Confirm Approval PIN</label>
              <input
                type="password"
                maxLength={8}
                required
                value={confirmPin}
                onChange={e => {
                  setConfirmPin(e.target.value.replace(/\D/g, ''));
                  setError(null);
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.75em] font-mono text-base font-bold bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl h-11 text-white placeholder-slate-700 bg-white"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-1.5 text-[10px] text-red-400 font-medium bg-red-950/20 border border-red-500/10 p-2.5 rounded-lg leading-normal">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              disabled={!newPin || !confirmPin || isSubmitting}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Configuring...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Create Approval PIN</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={logout}
              className="w-full h-11 bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cancel & Sign Out</span>
            </button>
          </div>
        </form>
        
        {/* Micro Hint */}
        <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between w-full pt-2 border-t border-slate-800/80">
          <span>Security Layer: Active</span>
          <span>Seeded Default: {approvalPin || '1234'}</span>
        </div>
      </div>
    </div>
  );
};
