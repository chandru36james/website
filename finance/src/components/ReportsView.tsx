import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { BarChart3, Printer, Download, Eye, Calendar, FileText, ArrowUpRight } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { loans, payments, cashBooks, auditLogs, currentBranch } = useVFMS();

  const [activeReport, setActiveReport] = useState<'collections' | 'outstanding' | 'cashbook' | 'audit'>('collections');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    if (['Active', 'Overdue'].includes(l.status) === false) return false;
    return true;
  });

  const totalOutstandingPortfolio = outstandingList.reduce((sum, l) => sum + l.principal, 0);

  // 3. Cash Book Audit lists
  const cashBookPeriodList = cashBooks.filter(cb => {
    if (cb.branchId !== currentBranch.id) return false;
    if (startDate && cb.date < startDate) return false;
    if (endDate && cb.date > endDate) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 print:p-0">
      
      {/* Tab Selectors & Print Trigger */}
      <div className="bg-white p-3 rounded-[10px] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3 print:hidden">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveReport('collections')}
            className={`px-3 py-1.5 rounded-[10px] text-[11px] font-bold border transition-all cursor-pointer ${
              activeReport === 'collections' 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Collections Log
          </button>
          <button
            onClick={() => setActiveReport('outstanding')}
            className={`px-3 py-1.5 rounded-[10px] text-[11px] font-bold border transition-all cursor-pointer ${
              activeReport === 'outstanding' 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Outstanding Book
          </button>
          <button
            onClick={() => setActiveReport('cashbook')}
            className={`px-3 py-1.5 rounded-[10px] text-[11px] font-bold border transition-all cursor-pointer ${
              activeReport === 'cashbook' 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Cash Books Audit
          </button>
          <button
            onClick={() => setActiveReport('audit')}
            className={`px-3 py-1.5 rounded-[10px] text-[11px] font-bold border transition-all cursor-pointer ${
              activeReport === 'audit' 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            System Footprint
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 bg-red-600 text-white hover:bg-red-700 rounded-[10px] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print Sheet Ledger</span>
        </button>
      </div>

      {/* Date Range filters (Simulated) */}
      <div className="bg-white p-3 rounded-[10px] border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center text-[11px] font-medium text-slate-700 print:hidden">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-600">Period:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>From</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-slate-200 px-2 py-1 rounded-[10px] bg-slate-50 text-[11px] focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span>To</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-slate-200 px-2 py-1 rounded-[10px] bg-slate-50 text-[11px] focus:outline-none focus:border-red-500"
          />
        </div>
        {(startDate || endDate) && (
          <button
            onClick={() => { setStartDate(''); setEndDate(''); }}
            className="text-red-600 hover:underline font-bold"
          >
            Clear Date Filters
          </button>
        )}
      </div>

      {/* 1. COLLECTIONS LEDGER */}
      {activeReport === 'collections' && (
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-3 print:border-none print:shadow-none">
          <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Collections Summary Report</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Consolidated list of active payment receipts and electronic transfers.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Total Period Collections</span>
              <p className="text-lg font-bold text-green-600 mt-0.5">₹{totalCollectedInPeriod.toLocaleString()}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] font-medium text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold font-mono text-[9px] uppercase border-b border-slate-200">
                  <th className="px-3 py-2">Receipt Code</th>
                  <th className="px-3 py-2">Customer Contract</th>
                  <th className="px-3 py-2">Payment Date</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2">Principal component</th>
                  <th className="px-3 py-2">Interest component</th>
                  <th className="px-3 py-2 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {collectionsList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">No collections posted during specified filters.</td>
                  </tr>
                ) : (
                  collectionsList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-mono text-slate-500">{item.receiptNumber}</td>
                      <td className="px-3 py-2 font-bold text-slate-800">{item.loanNumber || 'VY-LN-N/A'}</td>
                      <td className="px-3 py-2 font-mono">{item.paymentDate}</td>
                      <td className="px-3 py-2">{item.paymentMethod}</td>
                      <td className="px-3 py-2 text-slate-500">₹{item.principalPaid.toLocaleString()}</td>
                      <td className="px-3 py-2 text-slate-500">₹{item.interestPaid.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right font-bold text-green-600">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. OUTSTANDING LEDGER */}
      {activeReport === 'outstanding' && (
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-3 print:border-none print:shadow-none">
          <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Lending Portfolio Balance Sheet</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Total outstanding risk indices categorized by loan category.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Consolidated Risk Outstanding</span>
              <p className="text-lg font-bold text-red-600 mt-0.5">₹{totalOutstandingPortfolio.toLocaleString()}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] font-medium text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold font-mono text-[9px] uppercase border-b border-slate-200">
                  <th className="px-3 py-2">Contract Code</th>
                  <th className="px-3 py-2">Customer Profile</th>
                  <th className="px-3 py-2">Start Date</th>
                  <th className="px-3 py-2">Classification</th>
                  <th className="px-3 py-2">Gross Principal</th>
                  <th className="px-3 py-2">Duration Term</th>
                  <th className="px-3 py-2 text-right">Portfolio Risk Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {outstandingList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">No active risk portfolios.</td>
                  </tr>
                ) : (
                  outstandingList.map(loan => (
                    <tr key={loan.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-mono text-slate-500">{loan.loanNumber}</td>
                      <td className="px-3 py-2 font-bold text-slate-800">{loan.customerName}</td>
                      <td className="px-3 py-2 font-mono">{loan.startDate}</td>
                      <td className="px-3 py-2">{loan.loanType}</td>
                      <td className="px-3 py-2 font-semibold">₹{loan.principal.toLocaleString()}</td>
                      <td className="px-3 py-2">{loan.duration} months</td>
                      <td className="px-3 py-2 text-right">
                        <span className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold border ${
                          loan.status === 'Active' 
                            ? 'bg-green-50 text-green-700 border-green-100' 
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. CASH BOOK LEDGER */}
      {activeReport === 'cashbook' && (
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-3 print:border-none print:shadow-none">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Historical Cash Desk Audit Reports</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Chronological daily tallies of branch vault cash boxes.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] font-medium text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold font-mono text-[9px] uppercase border-b border-slate-200">
                  <th className="px-3 py-2">Closing Date</th>
                  <th className="px-3 py-2">Opening cash</th>
                  <th className="px-3 py-2">Receipts collections</th>
                  <th className="px-3 py-2">Expenses Paid</th>
                  <th className="px-3 py-2">Bank deposits</th>
                  <th className="px-3 py-2">Closing cash</th>
                  <th className="px-3 py-2 text-right">Audit Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cashBookPeriodList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">No closed cash books registered during filters.</td>
                  </tr>
                ) : (
                  cashBookPeriodList.map(cb => (
                    <tr key={cb.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-mono">{cb.date}</td>
                      <td className="px-3 py-2">₹{cb.openingCash.toLocaleString()}</td>
                      <td className="px-3 py-2 text-green-600 font-bold">+₹{cb.collections.toLocaleString()}</td>
                      <td className="px-3 py-2 text-slate-500">-₹{cb.expenses.toLocaleString()}</td>
                      <td className="px-3 py-2 text-blue-600">-₹{cb.bankDeposit.toLocaleString()}</td>
                      <td className="px-3 py-2 font-bold">₹{cb.closingCash.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right font-bold">
                        {cb.variance === 0 ? (
                          <span className="text-green-600">Perfect Tally</span>
                        ) : (
                          <span className={cb.variance > 0 ? 'text-green-600' : 'text-red-600'}>
                            ₹{cb.variance}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SYSTEM AUDIT TRAIL */}
      {activeReport === 'audit' && (
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-3 print:border-none print:shadow-none">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Immutable System Footprint Log</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Complete list of chronological operational audit tracks for active operators.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px] font-medium text-slate-700">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold font-mono text-[9px] uppercase border-b border-slate-200">
                  <th className="px-3 py-2">Audit timestamp</th>
                  <th className="px-3 py-2">Module</th>
                  <th className="px-3 py-2">Operator Name</th>
                  <th className="px-3 py-2">Operator Role</th>
                  <th className="px-3 py-2 text-right">Narrative Reason / Change details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.slice(0, 30).map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="px-3 py-2 font-mono text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-2 font-bold text-slate-700">{log.module}</td>
                    <td className="px-3 py-2">{log.userName}</td>
                    <td className="px-3 py-2 font-mono uppercase text-[9px] text-slate-400 font-bold">{log.userRole}</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-500 max-w-md truncate">{log.reason || log.newValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
