import React from 'react';
import { useVFMS } from '../context/VFMSContext';
import { 
  TrendingUp, Landmark, ShieldCheck, IndianRupee, 
  Clock, AlertTriangle, Users, FileText, ArrowUpRight, 
  ChevronRight, ClipboardList, Wallet, Bell, AlertCircle,
  Activity, ArrowUp, ArrowDown, Sparkles, Send, ShieldAlert,
  Coins, CheckSquare, Settings2, Receipt
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { 
    loans, customers, payments, ledgers, collaterals, 
    cashBooks, auditLogs, userRole, expenses, agentVisits, settlements,
    currentUser, currentBranch, isFirestoreMode, dashboardAction, setDashboardAction
  } = useVFMS();

  // Financial Aggrs
  const activeLoans = loans.filter(l => l.status === 'Active' || l.status === 'Overdue');
  const pendingApprovals = loans.filter(l => l.status === 'Pending Approval');
  
  const totalLent = loans
    .filter(l => ['Active', 'Overdue', 'Closed'].includes(l.status))
    .reduce((sum, l) => sum + (l.loanBookAmount || l.principal), 0);

  const outstandingBalance = activeLoans.reduce((sum, l) => {
    const loanPayments = payments.filter(p => p.loanId === l.id);
    const paid = loanPayments.reduce((s, p) => s + p.amount, 0);
    const bookAmt = l.loanBookAmount || l.principal;
    return sum + Math.max(0, bookAmt - paid);
  }, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  
  const todayCollections = payments
    .filter(p => p.paymentDate.startsWith(todayStr))
    .reduce((sum, p) => sum + p.amount, 0);

  const todayRecoveries = payments
    .filter(p => {
      if (!p.paymentDate.startsWith(todayStr)) return false;
      const l = loans.find(x => x.id === p.loanId);
      return l?.status === 'Overdue';
    })
    .reduce((sum, p) => sum + p.amount, 0);

  const todayExpenses = expenses
    .filter(e => e.createdAt.startsWith(todayStr) && e.status === 'Approved')
    .reduce((sum, e) => sum + e.amount, 0);

  const pendingExpenseApprovals = expenses.filter(e => e.status === 'Pending');
  const pendingCashClosingCount = cashBooks.filter(c => c.status === 'Pending Verification').length;
  const overdueCustomersCount = loans.filter(l => l.status === 'Overdue').length;

  const getCollectionsTrendData = () => {
    const dailyMap: { [date: string]: number } = {};
    payments.forEach(p => {
      dailyMap[p.paymentDate] = (dailyMap[p.paymentDate] || 0) + p.amount;
    });

    const sortedDates = Object.keys(dailyMap).sort().slice(-8);
    return sortedDates.map(d => ({
      date: d.substring(5), // MM-DD
      collections: dailyMap[d]
    }));
  };

  const getLoanCompositionData = () => {
    const counts: { [type: string]: number } = {};
    loans.forEach(l => {
      counts[l.loanType] = (counts[l.loanType] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({
      name: k,
      value: counts[k]
    }));
  };

  const COLORS = ['#f43f5e', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

  const navigateToTab = (tabId: string) => {
    const btn = document.getElementById(`nav-link-${tabId}`);
    if (btn) btn.click();
  };

  // ----------------------------------------------------
  // ROLE CONDITIONAL PARAMETERS
  // ----------------------------------------------------
  const isAdminOrManager = userRole === 'Super Admin' || userRole === 'Manager';

  // Agent parameters
  const agentVisitsToday = agentVisits.filter(v => v.visitDate === todayStr && v.agentId === currentUser?.uid);
  const totalVisitsCount = agentVisitsToday.length;
  const completedVisits = agentVisitsToday.filter(v => v.status === 'Collected').length;
  const agentPaymentsToday = payments.filter(p => p.paymentDate.startsWith(todayStr) && p.collectorId === currentUser?.uid);
  const agentExpensesToday = expenses.filter(e => e.createdAt.startsWith(todayStr) && e.agentId === currentUser?.uid && e.status === 'Approved');
  const agentCollectedSum = agentPaymentsToday.reduce((sum, p) => sum + p.amount, 0);
  const agentExpensesSum = agentExpensesToday.reduce((sum, e) => sum + e.amount, 0);
  const agentExpectedCash = Math.max(0, agentCollectedSum - agentExpensesSum);

  if (userRole === 'Loan Officer') {
    const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';
    const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const percentComplete = totalVisitsCount > 0 ? Math.round((completedVisits / totalVisitsCount) * 100) : 0;
    
    const pendingLoansCount = loans.filter(l => l.status === 'Pending Approval' && agentVisitsToday.some(v => v.customerId === l.customerId)).length;
    const pendingExpensesCount = expenses.filter(e => e.agentId === currentUser?.uid && e.status === 'Pending').length;
    const remainingVisitsCount = Math.max(0, totalVisitsCount - completedVisits);

    const summaryCards = [
      { label: 'Assigned Customers', value: totalVisitsCount, icon: <Users className="w-4 h-4 text-red-600" /> },
      { label: 'Customers Collected', value: completedVisits, icon: <CheckSquare className="w-4 h-4 text-emerald-600" /> },
      { label: 'Remaining Customers', value: remainingVisitsCount, icon: <Clock className="w-4 h-4 text-amber-500" /> },
      { label: "Today's Collection", value: `₹${agentCollectedSum.toLocaleString()}`, icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
      { label: 'Cash In Hand', value: `₹${agentExpectedCash.toLocaleString()}`, icon: <Wallet className="w-4 h-4 text-indigo-600" /> },
      { label: 'Pending Loans', value: pendingLoansCount, icon: <FileText className="w-4 h-4 text-amber-600" /> },
      { label: 'Pending Expenses', value: pendingExpensesCount, icon: <Receipt className="w-4 h-4 text-rose-500" /> },
    ];

    return (
      <div className="space-y-6 text-xs text-slate-800 animate-fade-in pb-16">
        {/* Header Block */}
        <div className="bg-white p-5 rounded-[10px] border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{dateStr}</span>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">{greeting}, {currentUser?.displayName || 'Agent'}</h1>
            <p className="text-[10px] text-slate-500 font-semibold">Logged in at {currentBranch.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-[10px]">
              <span className={`w-2 h-2 rounded-full ${isFirestoreMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="font-bold text-slate-600 uppercase tracking-wider">{isFirestoreMode ? 'Online' : 'Offline (Playground)'}</span>
            </div>
          </div>
        </div>

        {/* Today's Progress Bar */}
        <div className="bg-white p-5 rounded-[10px] border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Today's Progress</h3>
            <span className="font-mono font-bold text-red-650">Collected {completedVisits} / {totalVisitsCount} Customers ({percentComplete}% Complete)</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-red-600 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryCards.map((card, idx) => (
            <div key={idx} className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-xs flex flex-col justify-between h-24">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-normal max-w-[80%]">{card.label}</span>
                <span className="p-1 bg-slate-50 rounded-lg">{card.icon}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 font-mono tracking-tight">{card.value}</h3>
            </div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <button 
              onClick={() => { setDashboardAction('register_customer'); navigateToTab('customers'); }}
              className="bg-white border border-slate-200 p-4 rounded-[10px] hover:bg-red-50/10 hover:border-red-200 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><Users className="w-5 h-5" /></div>
              <span className="font-bold text-slate-700">Register Customer</span>
            </button>
            <button 
              onClick={() => { setDashboardAction('create_loan'); navigateToTab('loans'); }}
              className="bg-white border border-slate-200 p-4 rounded-[10px] hover:bg-red-50/10 hover:border-red-200 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><FileText className="w-5 h-5" /></div>
              <span className="font-bold text-slate-700">New Loan Request</span>
            </button>
            <button 
              onClick={() => navigateToTab('collections')}
              className="bg-white border border-slate-200 p-4 rounded-[10px] hover:bg-red-50/10 hover:border-red-200 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><Coins className="w-5 h-5" /></div>
              <span className="font-bold text-slate-700">Receive Payment</span>
            </button>
            <button 
              onClick={() => { setDashboardAction('upload_kyc'); navigateToTab('customers'); }}
              className="bg-white border border-slate-200 p-4 rounded-[10px] hover:bg-red-50/10 hover:border-red-200 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><Wallet className="w-5 h-5" /></div>
              <span className="font-bold text-slate-700">Upload KYC</span>
            </button>
            <button 
              onClick={() => navigateToTab('expenses')}
              className="bg-white border border-slate-200 p-4 rounded-[10px] hover:bg-red-50/10 hover:border-red-200 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><Receipt className="w-5 h-5" /></div>
              <span className="font-bold text-slate-700">Add Expense</span>
            </button>
            <button 
              onClick={() => navigateToTab('closing')}
              className="bg-white border border-slate-200 p-4 rounded-[10px] hover:bg-red-50/10 hover:border-red-200 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><CheckSquare className="w-5 h-5" /></div>
              <span className="font-bold text-slate-700">Cash Closing</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-xs pb-16">

      {/* ======================================================
         1. MOBILE VIEW (md:hidden) — Sleek Mobile Wallet Dashboard
         ====================================================== */}
      <div className="md:hidden space-y-5 animate-fade-in px-0.5">
        
        {/* Mobile Header */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase font-mono">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <h2 className="text-sm font-black text-slate-900 mt-0.5">
              VYFL Control Cabin
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-rose-50 border border-rose-100 rounded-lg text-[9px] font-bold text-rose-600 font-mono uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {currentBranch.code}
          </span>
        </div>

        {/* Dynamic Mobile Visa-Style Wallet Card */}
        {isAdminOrManager ? (
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-950 to-slate-900 rounded-2xl p-5 border border-rose-800/40 shadow-md text-white flex flex-col justify-between h-40">
            <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Branch Net Flow</p>
                <h3 className="text-2xl font-black mt-1 font-mono tracking-tight">₹{(todayCollections - todayExpenses).toLocaleString()}</h3>
              </div>
              <Landmark className="w-5 h-5 text-rose-400 opacity-60" />
            </div>

            <div className="flex justify-between items-center border-t border-rose-900/60 pt-3 text-[9px] text-rose-200">
              <div>
                <span className="block text-[8px] text-rose-400 uppercase font-bold tracking-wider">Collections</span>
                <span className="font-mono font-bold">₹{todayCollections.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-rose-400 uppercase font-bold tracking-wider">Outflow</span>
                <span className="font-mono font-bold text-rose-350">₹{todayExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-700 via-rose-800 to-slate-900 rounded-2xl p-5 border border-rose-800/30 shadow-md text-white flex flex-col justify-between h-40">
            <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Expected Net Cash</p>
                <h3 className="text-2xl font-black mt-1 font-mono tracking-tight">₹{agentExpectedCash.toLocaleString()}</h3>
              </div>
              <Wallet className="w-5 h-5 text-rose-400 opacity-60" />
            </div>

            <div className="flex justify-between items-center border-t border-rose-900/60 pt-3 text-[9px] text-rose-200">
              <div>
                <span className="block text-[8px] text-rose-400 uppercase font-bold tracking-wider">Collected</span>
                <span className="font-mono font-bold">₹{agentCollectedSum.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-rose-400 uppercase font-bold tracking-wider">Expenses filed</span>
                <span className="font-mono font-bold text-red-300">₹{agentExpensesSum.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Quick Action Circles */}
        <div className="space-y-2.5">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Operational Channels</span>
          <div className="grid grid-cols-4 gap-2 text-[9px] font-bold text-slate-600 text-center">
            <button 
              onClick={() => navigateToTab('collections')}
              className="bg-white border border-slate-200 p-2.5 rounded-xl hover:bg-slate-50 flex flex-col items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600"><Coins className="w-4 h-4" /></span>
              <span>Collections</span>
            </button>
            <button 
              onClick={() => navigateToTab('expenses')}
              className="bg-white border border-slate-200 p-2.5 rounded-xl hover:bg-slate-50 flex flex-col items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600"><Wallet className="w-4 h-4" /></span>
              <span>Expenses</span>
            </button>
            <button 
              onClick={() => navigateToTab('closing')}
              className="bg-white border border-slate-200 p-2.5 rounded-xl hover:bg-slate-50 flex flex-col items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600"><CheckSquare className="w-4 h-4" /></span>
              <span>Cash Close</span>
            </button>
            <button 
              onClick={() => navigateToTab('reports')}
              className="bg-white border border-slate-200 p-2.5 rounded-xl hover:bg-slate-50 flex flex-col items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600"><FileText className="w-4 h-4" /></span>
              <span>Exception</span>
            </button>
          </div>
        </div>

        {/* Mobile Action Alert Feed / Target Progress */}
        {isAdminOrManager ? (
          <div className="space-y-2.5">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Attention Required Today</span>
            <div className="space-y-2">
              
              <div 
                onClick={() => navigateToTab('approvals')}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs cursor-pointer hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  <div>
                    <h4 className="font-bold text-slate-800">Pending Loan Approvals</h4>
                    <p className="text-[9px] text-slate-400">{pendingApprovals.length} applications need manager underwriting</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div 
                onClick={() => navigateToTab('closing')}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs cursor-pointer hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <div>
                    <h4 className="font-bold text-slate-800">Agent Cash Closing</h4>
                    <p className="text-[9px] text-slate-400">{pendingCashClosingCount} route closing books need audit verification</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div 
                onClick={() => navigateToTab('reports')}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs cursor-pointer hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  <div>
                    <h4 className="font-bold text-slate-800">Exceptions Register</h4>
                    <p className="text-[9px] text-slate-400">{overdueCustomersCount} portfolio accounts flagged overdue status</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Today's Target Progress</span>
                <h3 className="text-sm font-black text-slate-800 mt-0.5">{completedVisits} / {totalVisitsCount} Clients Visited</h3>
              </div>
              <span className="text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-lg">
                {totalVisitsCount > 0 ? Math.round((completedVisits / totalVisitsCount) * 100) : 0}% Target
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-rose-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${totalVisitsCount > 0 ? (completedVisits / totalVisitsCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Mobile Sleek Sparkline Chart */}
        {isAdminOrManager && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-600" />
                Collections Trend
              </h3>
            </div>
            <div className="h-28 w-full">
              {payments.length === 0 ? (
                <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <AlertCircle className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider">No Data Available</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getCollectionsTrendData()} margin={{ top: 5, right: 5, left: -32, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mobColTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.12}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" stroke="#cbd5e1" fontSize={8} tickLine={false} />
                    <YAxis stroke="#cbd5e1" fontSize={8} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '9px' }}
                      formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Collections']}
                    />
                    <Area type="monotone" dataKey="collections" stroke="#f43f5e" strokeWidth={1.5} fillOpacity={1} fill="url(#mobColTrend)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ======================================================
         2. DESKTOP VIEW (hidden md:block) — Large Control Center
         ====================================================== */}
      <div className="hidden md:block space-y-6 animate-fade-in">
        {/* Banner with Greeting */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-slate-800">
          <div className="absolute right-0 top-0 w-32 h-32 bg-slate-50 rounded-full blur-2xl" />
          <div className="relative flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[9px] font-black tracking-widest text-rose-600 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-spin-slow text-rose-500" />
                {userRole} dashboard
              </span>
              <h1 className="text-base font-black tracking-tight text-slate-900 mt-1">
                Welcome back, {currentUser?.displayName || 'Administrator'}
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold max-w-sm">
                Control cabin showing global microfinance metrics and operational exception triggers.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[1.5]" />
              <span className="text-[9px] font-bold text-slate-600 tracking-wider uppercase">VYFL Connected</span>
            </div>
          </div>
        </div>

        {isAdminOrManager ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between text-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Active Loans</span>
                <div className="mt-3.5 flex justify-between items-baseline">
                  <h3 className="text-xl font-black text-rose-600 font-mono">{activeLoans.length}</h3>
                  <span className="text-[8px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded">VYFL Global</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between text-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Loan Book Value</span>
                <div className="mt-3.5">
                  <h3 className="text-xl font-black text-slate-800 font-mono">₹{totalLent.toLocaleString()}</h3>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between text-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Outstanding Portfolio</span>
                <div className="mt-3.5">
                  <h3 className="text-xl font-black text-emerald-600 font-mono">₹{outstandingBalance.toLocaleString()}</h3>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between text-slate-700">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Today's Collections</span>
                <div className="mt-3.5 flex justify-between items-center">
                  <h3 className="text-xl font-black text-slate-800 font-mono">₹{todayCollections.toLocaleString()}</h3>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <ArrowUp className="w-2.5 h-2.5" />
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Controls */}
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Urgent Verification Controls</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div 
                  onClick={() => navigateToTab('approvals')}
                  className="bg-white p-3.5 rounded-xl border border-amber-200 bg-amber-50/10 hover:bg-amber-50/30 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-1.5"
                >
                  <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block">Loan Approvals</span>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-amber-800 font-mono">{pendingApprovals.length}</h3>
                    <ChevronRight className="w-4 h-4 text-amber-500" />
                  </div>
                </div>

                <div 
                  onClick={() => navigateToTab('expenses')}
                  className="bg-white p-3.5 rounded-xl border border-rose-200 bg-rose-50/10 hover:bg-rose-50/30 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-1.5"
                >
                  <span className="text-[9px] font-bold text-rose-700 uppercase tracking-wider block">Expense Claims</span>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-rose-800 font-mono">{pendingExpenseApprovals.length}</h3>
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                  </div>
                </div>

                <div 
                  onClick={() => navigateToTab('closing')}
                  className="bg-white p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/10 hover:bg-emerald-50/30 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-1.5"
                >
                  <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block">Cash Closings</span>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-emerald-800 font-mono">{pendingCashClosingCount}</h3>
                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>

                <div 
                  onClick={() => navigateToTab('reports')}
                  className="bg-white p-3.5 rounded-xl border border-rose-200 bg-rose-50/10 hover:bg-rose-50/30 transition-all shadow-xs cursor-pointer flex flex-col justify-between space-y-1.5"
                >
                  <span className="text-[9px] font-bold text-rose-700 uppercase tracking-wider block">Overdue Debtors</span>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-rose-800 font-mono">{overdueCustomersCount}</h3>
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div>
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-rose-600" />
                    Collections Velocity Timeline
                  </h3>
                </div>
                <div className="h-48 w-full">
                  {payments.length === 0 ? (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                      <AlertCircle className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider">No Data Available</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getCollectionsTrendData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={9} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '10px' }}
                          formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Collections']}
                        />
                        <Area type="monotone" dataKey="collections" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colTrend)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">Portfolio Risk Share</h3>
                </div>
                <div className="h-32 w-full relative flex items-center justify-center">
                  {loans.length === 0 ? (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                      <AlertCircle className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider">No Data Available</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getLoanCompositionData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {getLoanCompositionData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '10px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                {loans.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 pt-2 border-t border-slate-100">
                    {getLoanCompositionData().map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span>{entry.name} ({entry.value})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Audit Logs */}
            {userRole === 'Super Admin' && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">System Operations Activity</h3>
                <div className="divide-y divide-slate-150 font-mono text-[9px] max-h-36 overflow-y-auto">
                  {auditLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="py-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800">[{log.action}]</span>
                        <span className="text-slate-400 ml-2 font-semibold">{log.newValue || log.reason}</span>
                      </div>
                      <span className="text-[8px] text-slate-400">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Agent Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visits Completed</span>
                <h3 className="text-lg font-bold text-slate-900">{completedVisits} / {totalVisitsCount}</h3>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-rose-600 h-1.5 rounded-full" 
                    style={{ width: `${totalVisitsCount > 0 ? (completedVisits / totalVisitsCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cash Collected</span>
                <h3 className="text-lg font-bold text-emerald-600 font-mono">₹{agentCollectedSum.toLocaleString()}</h3>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-205 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Approved Expenses</span>
                <h3 className="text-lg font-bold text-red-600 font-mono">₹{agentExpensesSum.toLocaleString()}</h3>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-205 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected Net Cash</span>
                <h3 className="text-lg font-bold text-slate-950 font-mono">₹{agentExpectedCash.toLocaleString()}</h3>
              </div>
            </div>
 
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => navigateToTab('collections')}
                className="bg-white p-5 rounded-xl border border-rose-200 bg-rose-50/5 hover:bg-rose-50/10 transition-all shadow-sm cursor-pointer flex justify-between items-center"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Start Collections Route</h4>
                  <p className="text-[10px] text-slate-500">Select area and load collection panel.</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-rose-500 shrink-0" />
              </div>
              <div 
                onClick={() => navigateToTab('expenses')}
                className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/5 hover:bg-amber-50/10 transition-all shadow-sm cursor-pointer flex justify-between items-center"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">File Fuel/Beta Expenses</h4>
                  <p className="text-[10px] text-slate-500">Quick-log fuel receipts for approval.</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-amber-500 shrink-0" />
              </div>
              <div 
                onClick={() => navigateToTab('closing')}
                className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/5 hover:bg-emerald-50/10 transition-all shadow-sm cursor-pointer flex justify-between items-center"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Daily Cash Closing</h4>
                  <p className="text-[10px] text-slate-500">Submit closing cash declarations.</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-500 shrink-0" />
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
};
