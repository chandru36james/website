import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { useToast } from './ToastProvider';
import { Coins, Plus, Landmark, CheckSquare, Sparkles, AlertTriangle, AlertCircle, Calendar, X, ArrowLeft } from 'lucide-react';

export const CashBookView: React.FC = () => {
  const { 
    cashBooks, payments, submitCashBookClosing, verifyCashBook, userRole, currentBranch 
  } = useVFMS();

  const { toast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState<'list' | 'close'>('list');
  const [expenses, setExpenses] = useState('');
  const [bankDeposit, setBankDeposit] = useState('');
  const [physicalCash, setPhysicalCash] = useState('');
  const [notes, setNotes] = useState('');

  // Daily figures computation helper
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCollections = payments
    .filter(p => p.branchId === currentBranch.id && p.paymentDate === todayStr && p.paymentMethod === 'Cash')
    .reduce((sum, p) => sum + p.amount, 0);

  // Load last closing book to determine opening cash
  let prevClosingCash = 50000; // base default
  const closedBooks = cashBooks.filter(b => b.branchId === currentBranch.id && b.status === 'Closed');
  if (closedBooks.length > 0) {
    closedBooks.sort((a, b) => b.date.localeCompare(a.date));
    prevClosingCash = closedBooks[0].closingCash;
  }

  const expAmt = parseFloat(expenses) || 0;
  const depAmt = parseFloat(bankDeposit) || 0;
  const expectedClosing = prevClosingCash + todayCollections - expAmt - depAmt;

  const physAmt = parseFloat(physicalCash) || 0;
  const calculatedVariance = physicalCash ? physAmt - expectedClosing : 0;

  const handleSubmitClosing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!physicalCash) return;

    try {
      await submitCashBookClosing({
        collections: todayCollections,
        expenses: expAmt,
        bankDeposit: depAmt,
        variance: Math.round(calculatedVariance * 100) / 100,
        notes
      });

      setExpenses('');
      setBankDeposit('');
      setPhysicalCash('');
      setNotes('');
      setActiveSubTab('list');
      toast.success('Desk Closed Successfully', 'Daily closing submitted for manager verification.');
    } catch (err: any) {
      console.error('Submit closing error:', err);
      toast.error('Closing Failed', err.message || 'Could not submit daily closing.');
    }
  };

  const isTodayBookClosed = cashBooks.some(b => b.branchId === currentBranch.id && b.date === todayStr);

  // ── RENDER 1: LIST SUB-TAB ──
  if (activeSubTab === 'list') {
    return (
      <div className="space-y-4">
        {/* Upper banner displaying active cash status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cash Status Card */}
          <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm md:col-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Branch Cashier Desk</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Daily cash receipts, ledger verification, and closing audits.</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                isTodayBookClosed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {isTodayBookClosed ? 'Daily Book Finalized' : 'Day Desk Open'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 border-t border-slate-100 pt-3 text-xs font-bold">
              <div>
                <p className="text-slate-400 font-mono text-[9px] uppercase">Opening balance</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">₹{prevClosingCash.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 font-mono text-[9px] uppercase">Collections</p>
                <p className="text-sm font-bold text-green-600 mt-0.5">₹{todayCollections.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 font-mono text-[9px] uppercase">Est. Cash Desk</p>
                <p className="text-sm font-bold text-red-600 mt-0.5">₹{expectedClosing.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Action card */}
          <div className="bg-slate-50 p-4 rounded-[10px] border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Bookmaker Controls</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Submit daily closing tally of vault and register drawer books.</p>
            </div>
            <div className="mt-4">
              {userRole !== 'Auditor' && !isTodayBookClosed ? (
                <button
                  id="close-desk-btn"
                  onClick={() => setActiveSubTab('close')}
                  className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Close Daily Cash Book</span>
                </button>
              ) : (
                <p className="text-xs text-green-600 font-bold italic text-center">
                  ✔ Cash Book closed or reader-only access.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Historical Logs List */}
        <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Historical Daily Cash Logs</h3>
            <span className="text-[10px] font-mono text-slate-400 font-bold">Chronological list</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                  <th className="px-4 py-2.5">Closing Date</th>
                  <th className="px-4 py-2.5">Opening Cash</th>
                  <th className="px-4 py-2.5">Cash Collections</th>
                  <th className="px-4 py-2.5">Expenses Paid</th>
                  <th className="px-4 py-2.5">Bank Deposits</th>
                  <th className="px-4 py-2.5">Closing Cash</th>
                  <th className="px-4 py-2.5">Variance</th>
                  <th className="px-4 py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {cashBooks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">No Cash Book logs registered.</td>
                  </tr>
                ) : (
                  cashBooks.map(cb => (
                    <tr key={cb.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-600 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{cb.date}</span>
                      </td>
                      <td className="px-4 py-2.5">₹{cb.openingCash.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-green-600 font-bold">+₹{cb.collections.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-slate-500 font-bold">-₹{cb.expenses.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-blue-600 font-bold">-₹{cb.bankDeposit.toLocaleString()}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-800">₹{cb.closingCash.toLocaleString()}</td>
                      <td className="px-4 py-2.5">
                        {cb.variance === 0 ? (
                          <span className="text-[11px] text-green-600 font-bold">Tally Balanced</span>
                        ) : (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            cb.variance > 0 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                          }`}>
                            {cb.variance > 0 ? `+${cb.variance}` : cb.variance} Variance
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {cb.status === 'Pending Verification' && ['Super Admin', 'Manager'].includes(userRole) ? (
                          <button
                            onClick={async () => {
                              try {
                                await verifyCashBook(cb.id);
                                toast.success('Cash Book Verified', 'Desk closing locked and verified successfully.');
                              } catch (err: any) {
                                console.error('Verify cashbook error:', err);
                                toast.error('Verification Failed', err.message || 'Could not verify cash book closing.');
                              }
                            }}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-[10px] transition-colors shadow-sm cursor-pointer"
                          >
                            Verify & Lock
                          </button>
                        ) : (
                          <span className={`text-[10px] font-bold uppercase ${
                            cb.status === 'Closed' ? 'text-green-600 font-bold' : 'text-amber-600 font-bold'
                          }`}>
                            {cb.status} {cb.managerName ? `by ${cb.managerName.substring(0, 6)}` : ''}
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
      </div>
    );
  }

  // ── RENDER 2: DEDICATED CLOSING VIEW PAGE ──
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in max-w-xl mx-auto">
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
        <button
          onClick={() => setActiveSubTab('list')}
          className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">Daily Cash Closing</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Post daily vault balances and audit drawer ledger</p>
        </div>
      </div>

      <form onSubmit={handleSubmitClosing} className="p-6 space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Tally Collections</p>
            <p className="text-sm font-black text-emerald-600 mt-1">₹{todayCollections.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Expected Closing</p>
            <p className="text-sm font-black text-slate-950 mt-1">₹{expectedClosing.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="form-label">Daily Expenses (₹)</label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="e.g. 500"
              className="form-input"
            />
          </div>
          <div className="space-y-1">
            <label className="form-label">Bank Deposit Cash (₹)</label>
            <input
              type="number"
              value={bankDeposit}
              onChange={(e) => setBankDeposit(e.target.value)}
              placeholder="e.g. 20000"
              className="form-input"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="form-label">Actual Physical Cash in Drawer (₹) *</label>
          <input
            type="number"
            required
            value={physicalCash}
            onChange={(e) => setPhysicalCash(e.target.value)}
            placeholder="Count exact physical rupee cash"
            className="form-input"
          />
        </div>

        {physicalCash && (
          <div className="p-3 rounded-xl border flex justify-between items-center text-xs font-bold bg-white border-slate-200">
            <span className="text-slate-600">Calculated Variance Tally:</span>
            <span className={calculatedVariance === 0 ? 'text-green-600' : 'text-red-600'}>
              ₹{calculatedVariance.toFixed(2)} {calculatedVariance === 0 ? 'Balanced' : 'Discrepancy'}
            </span>
          </div>
        )}

        <div className="space-y-1">
          <label className="form-label">Add Auditing Comments</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional details, petty cash descriptions, or explanation for variance..."
            rows={3}
            className="form-input"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveSubTab('list')}
            className="btn btn-secondary px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary px-4 py-2"
          >
            Post Closing Book
          </button>
        </div>
      </form>
    </div>
  );
};
