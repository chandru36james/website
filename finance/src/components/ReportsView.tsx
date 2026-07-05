import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { BarChart3, Printer, Download, Eye, Calendar, FileText, ArrowUpRight, ChevronRight } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie 
} from 'recharts';
import { DetailedReportView } from './DetailedReportView';

export const ReportsView: React.FC = () => {
  const { loans, payments, cashBooks, auditLogs, currentBranch, expenses, schedules, customers } = useVFMS();

  const [activeReport, setActiveReport] = useState<'collections' | 'outstanding' | 'cashbook' | 'audit'>('collections');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exceptionFilter, setExceptionFilter] = useState<'All' | 'Paid' | 'Recovery' | 'Missed' | 'Advance' | 'Partial'>('All');
  const [selectedDetailedCustomer, setSelectedDetailedCustomer] = useState<any | null>(null);
  const [normalCollectionsCollapsed, setNormalCollectionsCollapsed] = useState(true);

  // 1. Collections Report computations
  const collectionsList = payments.filter(p => {
    if (p.branchId !== currentBranch.id) return false;
    if (startDate && p.paymentDate < startDate) return false;
    if (endDate && p.paymentDate > endDate) return false;
    return true;
  });

  const totalCollectedInPeriod = collectionsList.reduce((sum, p) => sum + p.amount, 0);

  // 2. Outstanding Portfolio computations
  const outstandingList = loans.filter(l => {
    if (l.branchId !== currentBranch.id) return false;
    if (l.status !== 'Disbursed') return false;
    return true;
  });

  const totalLent = outstandingList.reduce((sum, l) => sum + l.principal, 0);
  const outstandingBalance = outstandingList.reduce((sum, l) => sum + (l.loanBookAmount - (payments.filter(p => p.loanId === l.id).reduce((s, p) => s + p.amount, 0))), 0);

  // 3. Cash Book computations
  const cashBookPeriodList = cashBooks.filter(cb => {
    if (cb.branchId !== currentBranch.id) return false;
    if (startDate && cb.date < startDate) return false;
    if (endDate && cb.date > endDate) return false;
    return true;
  });

  const getExceptionReportData = () => {
    if (loans.length === 0) return [];

    const todayStr = new Date().toISOString().split('T')[0];
    const exceptionList: any[] = [];

    loans.forEach(loan => {
      if (loan.branchId !== currentBranch.id) return;
      
      const todayPayments = payments.filter(p => p.loanId === loan.id && p.paymentDate === todayStr);
      const paidToday = todayPayments.reduce((sum, p) => sum + p.amount, 0);

      const loanSchedules = schedules[loan.id] || [];
      const todaySchedule = loanSchedules.find(s => s.dueDate === todayStr);
      const dailyDue = todaySchedule ? (todaySchedule.principalDue + todaySchedule.interestDue + todaySchedule.penaltyDue) : (loan.dailyCollectionAmount || (loan.principal / loan.duration));

      let type: 'Paid' | 'Recovery' | 'Missed' | 'Advance' | 'Partial' = 'Paid';
      let reason = '—';
      let remarks = 'Normal daily payment.';

      if (paidToday === 0) {
        type = 'Missed';
        reason = 'No Payment';
        remarks = 'No payment was received today for this active loan.';
      } else if (paidToday > dailyDue) {
        type = 'Advance';
        reason = 'Paid Extra';
        remarks = `Customer paid ₹${paidToday} exceeding the daily due of ₹${dailyDue.toFixed(0)}.`;
      } else if (paidToday < dailyDue) {
        type = 'Partial';
        reason = 'Partial Payment';
        remarks = `Customer paid ₹${paidToday} against a daily due of ₹${dailyDue.toFixed(0)}.`;
      }

      const agentName = todayPayments[0]?.collectorName || 'Officer';
      const custObj = customers.find(c => c.id === loan.customerId);

      exceptionList.push({
        id: `exc-${loan.id}`,
        customer: loan.customerName,
        village: custObj?.village || 'Branch Area',
        agent: agentName,
        dailyDue,
        paidToday,
        type,
        reason,
        remarks,
        loanAmount: loan.principal,
        time: todayPayments[0] ? new Date(todayPayments[0].paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'
      });
    });

    return exceptionList;
  };

  const exceptionData = getExceptionReportData();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayPayments = payments.filter(p => p.paymentDate === todayStr && p.branchId === currentBranch.id);
  const todayCollectedVal = todayPayments.reduce((sum, p) => sum + p.amount, 0);

  const countPaid = exceptionData.filter(x => x.type === 'Paid').length;
  const countRecovery = exceptionData.filter(x => x.type === 'Recovery').length;
  const countMissed = exceptionData.filter(x => x.type === 'Missed').length;
  const countAdvance = exceptionData.filter(x => x.type === 'Advance').length;
  const countPartial = exceptionData.filter(x => x.type === 'Partial').length;

  const getCollectionsMethodMix = () => {
    const map: { [method: string]: number } = {
      'Cash': 0,
      'Bank Transfer': 0,
      'UPI': 0
    };
    collectionsList.forEach(p => {
      map[p.paymentMethod] = (map[p.paymentMethod] || 0) + p.amount;
    });
    if (Object.values(map).every(v => v === 0)) {
      return [
        { method: 'Cash Drawer', amount: 165000 },
        { method: 'Bank RTGS', amount: 50000 },
        { method: 'UPI QR', amount: 30000 }
      ];
    }
    return Object.keys(map).map(k => ({
      method: k === 'Cash' ? 'Cash Drawer' : k === 'Bank Transfer' ? 'Bank RTGS' : 'UPI QR',
      amount: map[k]
    }));
  };

  const getOutstandingCategoryMix = () => {
    const map: { [type: string]: number } = {};
    outstandingList.forEach(l => {
      map[l.loanType] = (map[l.loanType] || 0) + l.principal;
    });
    if (Object.keys(map).length === 0) {
      return [
        { name: 'Business Loans', value: 360000 },
        { name: 'Personal Loans', value: 120000 }
      ];
    }
    return Object.keys(map).map(k => ({
      name: `${k} Loans`,
      value: map[k]
    }));
  };

  const getCashBalanceTrend = () => {
    const trend = [...cashBookPeriodList]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(cb => ({
        date: cb.date.substring(5),
        balance: cb.closingCash
      }));
    if (trend.length === 0) {
      return [
        { date: '06-28', balance: 48000 },
        { date: '06-29', balance: 52000 },
        { date: '06-30', balance: 50000 },
        { date: '07-01', balance: 53500 },
        { date: '07-02', balance: 51200 }
      ];
    }
    return trend;
  };

  const handlePrint = () => {
    window.print();
  };

  if (selectedDetailedCustomer) {
    return (
      <DetailedReportView 
        customer={selectedDetailedCustomer} 
        onBack={() => setSelectedDetailedCustomer(null)} 
      />
    );
  }

  // Period Collections calculation
  const collectionsInPeriod = payments.filter(p => {
    if (p.branchId !== currentBranch.id) return false;
    if (startDate && p.paymentDate < startDate) return false;
    if (endDate && p.paymentDate > endDate) return false;
    return true;
  });
  const totalCollections = collectionsInPeriod.reduce((sum, p) => sum + p.amount, 0);

  // Period Approved Expenses calculation
  const expensesInPeriod = expenses.filter(e => {
    if (e.branchId !== currentBranch.id) return false;
    if (e.status !== 'Approved') return false;
    const expDate = e.createdAt.split('T')[0];
    if (startDate && expDate < startDate) return false;
    if (endDate && expDate > endDate) return false;
    return true;
  });
  const totalExpenses = expensesInPeriod.reduce((sum, e) => sum + e.amount, 0);

  const netProfit = totalCollections - totalExpenses;

  return (
    <div className="space-y-4 print:p-0">
      
      {/* Date Filter & Profit Summary Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 print:hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Financial Net Profit Report</h2>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Net Profit = Total Collections - Total Expenses</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Period:</span>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-medium"
            />
            <span className="text-slate-400 text-xs font-semibold">to</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-medium"
            />
            {(startDate || endDate) && (
              <button
                onClick={() => { setStartDate(''); setEndDate(''); }}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[10px] text-[10px] font-bold cursor-pointer transition-all border border-slate-200"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex flex-col justify-between shadow-xs">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Collections</span>
            <h3 className="text-base font-black text-slate-900 mt-2 font-mono">₹{totalCollections.toLocaleString()}</h3>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex flex-col justify-between shadow-xs">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Expenses</span>
            <h3 className="text-base font-black text-rose-600 mt-2 font-mono">₹{totalExpenses.toLocaleString()}</h3>
          </div>

          <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-xs ${
            netProfit >= 0 ? 'bg-emerald-50/40 border-emerald-100' : 'bg-rose-50/40 border-rose-100'
          }`}>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Net Profit</span>
            <h3 className={`text-base font-black mt-2 font-mono ${
              netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              ₹{netProfit.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* ======================================================
         1. DESKTOP VIEW (hidden md:block)
         ====================================================== */}
      <div className="print:hidden hidden md:block space-y-4">
        
        {/* Simplified Today's Exceptions Report Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5 print:border-none print:shadow-none">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 print:hidden">
            <div>
              <h1 className="text-base font-black text-slate-900 uppercase tracking-wider">Today's Exceptions Report</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Clean, simplified collection audits and exception feeds for manager review.</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl text-xs font-black flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
          </div>

          {/* 6 Summary Cards matching mockup exactly & serving as Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-1">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex flex-col justify-between shadow-xs">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Today's Collection</span>
              <h3 className="text-base font-black text-slate-900 mt-2 font-mono">₹{todayCollectedVal.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-xs">🟢</span> Paid Today
              </span>
              <h3 className="text-base font-black text-emerald-600 mt-2 font-mono">{countPaid}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-xs">🟡</span> Recovery
              </span>
              <h3 className="text-base font-black text-amber-600 mt-2 font-mono">{countRecovery}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-xs">🔴</span> Missed
              </span>
              <h3 className="text-base font-black text-red-600 mt-2 font-mono">{countMissed}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-xs">🔵</span> Advance
              </span>
              <h3 className="text-base font-black text-blue-600 mt-2 font-mono">{countAdvance}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="text-xs">🟠</span> Partial
              </span>
              <h3 className="text-base font-black text-orange-600 mt-2 font-mono">{countPartial}</h3>
            </div>
          </div>

          {/* One-Click Filters */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Filter by Exception:</span>
            <button
              onClick={() => setExceptionFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                exceptionFilter === 'All' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Exceptions
            </button>
            <button
              onClick={() => setExceptionFilter('Recovery')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer flex items-center gap-1 ${
                exceptionFilter === 'Recovery' ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>🟡</span> Recovery
            </button>
            <button
              onClick={() => setExceptionFilter('Missed')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer flex items-center gap-1 ${
                exceptionFilter === 'Missed' ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
              }`}
            >
              <span>🔴</span> Missed
            </button>
            <button
              onClick={() => setExceptionFilter('Advance')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer flex items-center gap-1 ${
                exceptionFilter === 'Advance' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
              }`}
            >
              <span>🔵</span> Advance
            </button>
            <button
              onClick={() => setExceptionFilter('Partial')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer flex items-center gap-1 ${
                exceptionFilter === 'Partial' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
              }`}
            >
              <span>🟠</span> Partial
            </button>
          </div>

        </div>

        {/* Customer Exception List */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Customer Exception List
            </h3>
            <span className="text-[10px] text-slate-400 font-bold font-mono">Exceptions Feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] font-medium text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold font-mono text-[9px] uppercase border-b border-slate-200">
                  <th className="px-3 py-2">Customer</th>
                  <th className="px-3 py-2">Village</th>
                  <th className="px-3 py-2">Agent</th>
                  <th className="px-3 py-2 text-right">Daily Due</th>
                  <th className="px-3 py-2 text-right">Paid Today</th>
                  <th className="px-3 py-2">Collection Type</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {exceptionData
                  .filter(exc => exc.type !== 'Paid')
                  .filter(exc => exceptionFilter === 'All' || exc.type === exceptionFilter).length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-3 py-6 text-center text-slate-405 font-bold italic">
                      No collection exceptions logged for today.
                    </td>
                  </tr>
                ) : (
                  exceptionData
                    .filter(exc => exc.type !== 'Paid')
                    .filter(exc => exceptionFilter === 'All' || exc.type === exceptionFilter)
                    .map(exc => (
                    <tr key={exc.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2.5 font-bold text-slate-800">{exc.customer}</td>
                      <td className="px-3 py-2.5">{exc.village}</td>
                      <td className="px-3 py-2.5">{exc.agent}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-slate-500">₹{exc.dailyDue.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-800">₹{exc.paidToday.toLocaleString()}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          exc.type === 'Recovery' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          exc.type === 'Missed' ? 'bg-red-50 text-red-700 border-red-100' :
                          exc.type === 'Advance' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-orange-50 text-orange-700 border-orange-100'
                        }`}>
                          <span>{exc.type === 'Recovery' ? '🟡' : exc.type === 'Missed' ? '🔴' : exc.type === 'Advance' ? '🔵' : '🟠'}</span>
                          <span>{exc.type === 'Missed' ? 'No Collection' : `${exc.type} Payment`}</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-slate-500 font-semibold">{exc.reason}</td>
                      <td className="px-3 py-2.5 text-center">
                        <button
                          onClick={() => setSelectedDetailedCustomer(exc)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                        >
                          👁 View
                        </button>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* ======================================================
         2. MOBILE VIEW (md:hidden) — Simple & Compact
         ====================================================== */}
      <div className="print:hidden md:hidden space-y-4">
        
        {/* Mobile Header */}
        <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <h1 className="text-xs font-black text-slate-900 uppercase tracking-wider">Today's Exceptions</h1>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Audits & anomalies feed</p>
          </div>
          <button
            onClick={handlePrint}
            className="p-2 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl text-red-650 cursor-pointer transition-colors"
            title="Print Report"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Exception Feed List (Simple list layout) */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {getExceptionReportData()
            .filter(exc => exc.type !== 'Paid')
            .map(exc => (
              <div 
                key={exc.id} 
                onClick={() => setSelectedDetailedCustomer(exc)}
                className="p-3.5 flex justify-between items-center hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">
                    {exc.type === 'Recovery' ? '🟡' : exc.type === 'Missed' ? '🔴' : exc.type === 'Advance' ? '🔵' : '🟠'}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{exc.customer}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{exc.village} · Agent {exc.agent}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-right">
                  <div className="text-[10px] font-bold text-slate-700">
                    {exc.type === 'Missed' ? (
                      <span className="text-red-500 font-semibold">Missed</span>
                    ) : (
                      <span className="font-mono">₹{exc.paidToday.toLocaleString()}</span>
                    )}
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-350" />
                </div>
              </div>
            ))}
        </div>

      </div>

      {/* ======================================================
         3. DEDICATED PRINT VIEW (visible ONLY when printing)
         ====================================================== */}
      <div className="hidden print:block font-serif text-[10px] text-slate-900 space-y-6">
        {/* Print Header */}
        <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-baseline">
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider">VYFL Today's Exceptions Audit Report</h1>
            <p className="text-[9px] text-slate-500 font-mono mt-0.5">Generated on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} | Branch: {currentBranch.name}</p>
          </div>
          <span className="font-mono font-bold text-xs">{currentBranch.code}</span>
        </div>

        {/* Print Summary Metrics Row */}
        <div className="grid grid-cols-5 gap-4 border border-slate-300 p-3 rounded-lg font-mono">
          <div>
            <span className="block text-[8px] text-slate-500 uppercase font-bold">Total Collection</span>
            <span className="font-bold text-xs">₹{todayCollectedVal.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-[8px] text-slate-500 uppercase font-bold">Recovery</span>
            <span className="font-bold text-xs text-amber-700">{countRecovery}</span>
          </div>
          <div>
            <span className="block text-[8px] text-slate-500 uppercase font-bold">Missed</span>
            <span className="font-bold text-xs text-red-700">{countMissed}</span>
          </div>
          <div>
            <span className="block text-[8px] text-slate-500 uppercase font-bold">Advance</span>
            <span className="font-bold text-xs text-blue-700">{countAdvance}</span>
          </div>
          <div>
            <span className="block text-[8px] text-slate-500 uppercase font-bold">Partial</span>
            <span className="font-bold text-xs text-orange-700">{countPartial}</span>
          </div>
        </div>

        {/* Print Exception Table */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-wider border-b border-slate-350 pb-1">Detailed Exception List</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-400 font-mono text-[8px] uppercase text-slate-600">
                <th className="py-2.5 pr-2">Customer</th>
                <th className="py-2.5 px-2">Village</th>
                <th className="py-2.5 px-2">Agent</th>
                <th className="py-2.5 px-2 text-right">Daily Due</th>
                <th className="py-2.5 px-2 text-right">Paid Today</th>
                <th className="py-2.5 px-2">Exception Type</th>
                <th className="py-2.5 pl-2">Reason / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-305">
              {exceptionData.filter(exc => exc.type !== 'Paid').length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400 italic">
                    No exceptions logged for today.
                  </td>
                </tr>
              ) : (
                exceptionData
                  .filter(exc => exc.type !== 'Paid')
                  .map(exc => (
                  <tr key={exc.id} className="align-top border-b border-slate-200">
                    <td className="py-2.5 pr-2 font-bold">{exc.customer}</td>
                    <td className="py-2.5 px-2">{exc.village}</td>
                    <td className="py-2.5 px-2">{exc.agent}</td>
                    <td className="py-2.5 px-2 text-right font-mono">₹{exc.dailyDue.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold">₹{exc.paidToday.toLocaleString()}</td>
                    <td className="py-2.5 px-2 font-bold">
                      {exc.type === 'Recovery' ? '🟡 Recovery' :
                       exc.type === 'Missed' ? '🔴 Missed' :
                       exc.type === 'Advance' ? '🔵 Advance' :
                       '🟠 Partial'}
                    </td>
                    <td className="py-2.5 pl-2 text-slate-600 italic">
                      {exc.reason || '—'}
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>

        {/* Verification Signatures block */}
        <div className="pt-12 grid grid-cols-2 gap-12 font-mono text-[8px]">
          <div className="border-t border-slate-400 pt-2 text-center">
            <span className="block font-bold">Field Supervisor Signature</span>
            <span className="text-slate-400">Date: ____/____/________</span>
          </div>
          <div className="border-t border-slate-400 pt-2 text-center">
            <span className="block font-bold">Branch Manager Signature</span>
            <span className="text-slate-400">Date: ____/____/________</span>
          </div>
        </div>

      </div>

    </div>
  );
};
