import React, { useState } from 'react';
import { VFMSProvider, useVFMS } from './context/VFMSContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CustomersView } from './components/CustomersView';
import { LoansView } from './components/LoansView';
import { CollateralView } from './components/CollateralView';
import { CashBookView } from './components/CashBookView';
import { LedgerView } from './components/LedgerView';
import { RuleEngineView } from './components/RuleEngineView';
import { ReportsView } from './components/ReportsView';
import { AuditView } from './components/AuditView';
import { LoginView } from './components/LoginView';
import { UserManagementView } from './components/UserManagementView';
import { LockScreenView } from './components/LockScreenView';
import { GuarantorsView } from './components/GuarantorsView';
import { ToastProvider } from './components/ToastProvider';
import { ErrorBoundary } from './components/ErrorBoundary';

const MainAppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userRole, currentUser, isLoading, isAppLocked, lockApp, securityPolicy, logAudit } = useVFMS();


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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-xs font-mono">Initializing secure session...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginView />;
  if (isAppLocked)  return <LockScreenView />;

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':  return <DashboardView />;
      case 'customers':  return <CustomersView />;
      case 'loans':      return <LoansView />;
      case 'guarantors': return <GuarantorsView />;
      case 'collateral': return <CollateralView />;
      case 'cashbook':   return <CashBookView />;
      case 'ledger':     return <LedgerView />;
      case 'rules':      return userRole === 'Super Admin' ? <RuleEngineView /> : <DashboardView />;
      case 'users':      return userRole === 'Super Admin' ? <UserManagementView /> : <DashboardView />;
      case 'reports':    return <ReportsView />;
      case 'audit':      return (userRole === 'Super Admin' || userRole === 'Auditor') ? <AuditView /> : <DashboardView />;
      default:           return <DashboardView />;
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
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/60">
          <div className="max-w-7xl mx-auto space-y-4 animate-fade-in">
            {renderView()}
          </div>
        </main>

        <footer className="h-8 border-t border-slate-200 px-6 flex items-center justify-between bg-white text-[10px] text-slate-400 font-mono shrink-0 safe-bottom">
          <div className="flex gap-4">
            <span>System: <span className="text-emerald-500 font-bold">Operational</span></span>
            <span className="hidden sm:inline">Server: AP-SOUTH-1</span>
          </div>
          <span>© {new Date().getFullYear()} VGot You Finance Management System v2.0.0</span>
        </footer>
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
