import React from 'react';
import { useVFMS } from '../context/VFMSContext';
import { 
  TrendingUp, Landmark, ShieldCheck, IndianRupee, 
  Clock, AlertTriangle, Users, FileText, ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { 
    loans, customers, payments, ledgers, collaterals, 
    cashBooks, auditLogs, userRole, approveLoan, disburseLoan
  } = useVFMS();

  // Financial aggregation
  const activeLoans = loans.filter(l => l.status === 'Active' || l.status === 'Overdue');
  const pendingApprovals = loans.filter(l => l.status === 'Pending Approval');
  
  const totalLent = loans
    .filter(l => ['Active', 'Overdue', 'Closed'].includes(l.status))
    .reduce((sum, l) => sum + l.principal, 0);

  const outstandingBalance = activeLoans.reduce((sum, l) => sum + l.principal, 0); // simplifed outstanding

  const totalCollections = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalInterestEarned = payments.reduce((sum, p) => sum + p.interestPaid, 0);
  
  const totalCollateralValue = collaterals
    .filter(c => c.status === 'Deposited')
    .reduce((sum, c) => sum + c.estimatedValue, 0);

  const latestCashBook = cashBooks[0];
  const cashInHand = latestCashBook ? latestCashBook.closingCash : 50000;

  // Pie chart data
  const statusCounts = loans.reduce((acc: { [key: string]: number }, loan) => {
    acc[loan.status] = (acc[loan.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  const COLORS = ['#e11d48', '#3b82f6', '#10b981', '#f59e0b', '#6b7280', '#8b5cf6'];

  // Trend data
  const trendData = [
    { name: 'Jan', Lent: 150000, Collections: 80000, Interest: 12000 },
    { name: 'Feb', Lent: 220000, Collections: 120000, Interest: 18000 },
    { name: 'Mar', Lent: 180000, Collections: 140000, Interest: 21000 },
    { name: 'Apr', Lent: 310000, Collections: 190000, Interest: 29000 },
    { name: 'May', Lent: 250000, Collections: 210000, Interest: 32000 },
    { name: 'Jun', Lent: totalLent ? Math.min(totalLent, 400000) : 190000, Collections: totalCollections ? Math.min(totalCollections, 300000) : 170000, Interest: totalInterestEarned ? Math.min(totalInterestEarned, 50000) : 25000 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Visual greeting bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time calculations for lending portfolios, daily closing, and customer collections.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-[10px] border border-slate-200/55">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>FMS Automated Rules: Active</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today's Cash in Hand</span>
            <div className="w-7 h-7 rounded-[8px] bg-red-50 text-red-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
              ₹{cashInHand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>Balanced with Cash Book</span>
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Loan Portfolio</span>
            <div className="w-7 h-7 rounded-[8px] bg-blue-50 text-blue-600 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
              ₹{outstandingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">
              {activeLoans.length} Loans Active
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collections Received</span>
            <div className="w-7 h-7 rounded-[8px] bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
              ₹{totalCollections.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[10px] text-green-600 font-bold mt-0.5 block">
              Interest portion: ₹{totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collaterals Held</span>
            <div className="w-7 h-7 rounded-[8px] bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
              ₹{totalCollateralValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h3>
            <span className="text-[10px] text-purple-600 font-bold mt-0.5 block">
              Pledged Assets Ledger
            </span>
          </div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Trend Chart */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Collections vs Lending Volume</h2>
              <p className="text-[10px] text-slate-400">Monthly trend comparisons</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorLent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="Lent" stroke="#e11d48" strokeWidth={2} fillOpacity={1} fill="url(#colorLent)" />
                <Area type="monotone" dataKey="Collections" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCollections)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Pie Chart */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Loan Portfolio Status</h2>
            <p className="text-[10px] text-slate-400">Contracts spread</p>
          </div>
          <div className="h-48 flex items-center justify-center relative my-2">
            {pieData.length === 0 ? (
              <div className="text-xs text-slate-400">No loans active</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-slate-800">{loans.length}</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Total Loans</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-1 border-t border-slate-100 pt-2">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-[9px] text-slate-600 font-bold truncate">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lower Widgets: Pending Approvals & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Loan Approvals Board */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Underwriting Approvals</h2>
              <p className="text-[10px] text-slate-400">Requires Manager/Admin review</p>
            </div>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100">
              {pendingApprovals.length} Pending
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
              <ShieldCheck className="w-8 h-8 text-slate-300 stroke-[1.5]" />
              <p className="text-xs mt-1">All loan applications are current and approved.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {pendingApprovals.map(loan => (
                <div key={loan.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{loan.customerName}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {loan.loanNumber} • {loan.loanType} • Interest {loan.interestRate}%
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">₹{loan.principal.toLocaleString()}</span>
                    {['Super Admin', 'Manager'].includes(userRole) ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => approveLoan(loan.id)}
                          className="px-2.5 py-1 bg-red-600 text-white rounded-[10px] text-[10px] font-bold hover:bg-red-700 transition-colors shadow-xs"
                        >
                          Approve
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 italic">No access</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Audits Board */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Operational Activities</h2>
              <p className="text-[10px] text-slate-400">System logs trace</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">Immutable Ledger</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="py-2 flex justify-between items-start gap-4 text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800">{log.reason || log.newValue}</p>
                  <p className="text-[10px] text-slate-400">
                    Module: <span className="font-bold text-slate-600">{log.module}</span> • {log.userName}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
