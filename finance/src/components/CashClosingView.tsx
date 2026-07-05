import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Shield, Coins, Check, AlertTriangle, HelpCircle, Loader2 } from 'lucide-react';
import { CashBook } from '../types';

export const CashClosingView: React.FC = () => {
  const { 
    cashBooks, submitCashBookClosing, verifyCashBook, payments, expenses, 
    userRole, currentUser, currentBranch 
  } = useVFMS();

  const [notes, setNotes] = useState<string>('');
  const [bankDeposit, setBankDeposit] = useState<string>('0');
  const [variance, setVariance] = useState<string>('0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today's Date String
  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate today's collections and expenses for current agent
  const isAgent = userRole === 'Loan Officer';
  const todayPayments = payments.filter(p => p.paymentDate.startsWith(todayStr) && (!isAgent || p.collectorId === currentUser?.uid));
  const todayExpenses = expenses.filter(e => e.createdAt.startsWith(todayStr) && e.status === 'Approved' && (!isAgent || e.agentId === currentUser?.uid));

  const totalCollections = todayPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate expected closing balance
  const expectedCashBalance = Math.max(0, totalCollections - totalExpenses);

  const handleSubmitClosing = async () => {
    setIsSubmitting(true);
    try {
      const deposit = parseFloat(bankDeposit) || 0;
      const varAmt = parseFloat(variance) || 0;

      await submitCashBookClosing({
        collections: totalCollections,
        expenses: totalExpenses,
        bankDeposit: deposit,
        variance: varAmt,
        notes: notes.trim()
      });

      setNotes('');
      setBankDeposit('0');
      setVariance('0');
      alert("Daily closing details submitted successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to submit closing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyClosing = async (bookId: string) => {
    try {
      await verifyCashBook(bookId);
      alert("Cash book verified and day locked successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to verify cash book.");
    }
  };

  const pendingVerificationBooks = cashBooks.filter(b => b.status === 'Pending Verification' && b.branchId === currentBranch.id);
  const closedBooks = cashBooks.filter(b => b.status === 'Closed' && b.branchId === currentBranch.id);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            End of Day Cash Closing
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit daily collection reconciliation, file expenses, and verify closing handovers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Agent Declaration Panel */}
        {isAgent && (
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs font-medium text-slate-700">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <Coins className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Submit Daily Cash</h3>
                  <p className="text-[10px] text-slate-400">Declare cash collected and close your day.</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold uppercase text-[9px]">Total Collections</span>
                  <span className="font-bold text-slate-900 font-mono text-xs">₹{totalCollections.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold uppercase text-[9px]">Approved Expenses</span>
                  <span className="font-bold text-slate-900 font-mono text-xs">- ₹{totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 font-bold uppercase text-[9px]">Expected Cash Balance</span>
                  <span className="font-black text-slate-950 font-mono text-sm">₹{expectedCashBalance.toLocaleString()}</span>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bank Deposit (₹)</label>
                  <input
                    type="number"
                    value={bankDeposit}
                    onChange={e => setBankDeposit(e.target.value)}
                    placeholder="₹0"
                    className="form-input"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Cash Variance / Difference (₹)</label>
                  <input
                    type="number"
                    value={variance}
                    onChange={e => setVariance(e.target.value)}
                    placeholder="₹0"
                    className="form-input"
                  />
                  <p className="text-[9px] text-slate-400 leading-normal">Enter variance if actual physical cash differs from expected balance.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Notes / Explanations</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Traffic fine receipt attached"
                    className="form-input"
                  />
                </div>

                <button
                  onClick={handleSubmitClosing}
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Submit Closing Declaration</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manager verification panel */}
        <div className={isAgent ? 'lg:col-span-8 space-y-6' : 'lg:col-span-12 space-y-6'}>
          
          {/* Pending verification lists */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Pending Closings Verification</span>
              <span className="text-[10px] font-mono text-slate-400">{pendingVerificationBooks.length} reports</span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingVerificationBooks.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  No pending cash closures waiting verification.
                </div>
              ) : (
                pendingVerificationBooks.map(b => (
                  <div key={b.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Branch Cash Close: {b.date}</span>
                        {b.variance !== 0 && (
                          <span className="text-[10px] bg-red-50 text-red-700 font-bold border border-red-200 px-1.5 rounded flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>Variance: ₹{b.variance}</span>
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-x-6 gap-y-1 mt-2 text-[10px] font-medium text-slate-500 font-mono">
                        <span>Collections: ₹{b.collections}</span>
                        <span>Expenses: ₹{b.expenses}</span>
                        <span>Bank Deposit: ₹{b.bankDeposit}</span>
                        <span>Opening Cash: ₹{b.openingCash}</span>
                        <span className="text-slate-900 font-bold">Closing Cash: ₹{b.closingCash}</span>
                      </div>
                      {b.notes && <p className="text-[10px] text-slate-500 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">Notes: {b.notes}</p>}
                    </div>

                    {!isAgent && (
                      <button
                        onClick={() => handleVerifyClosing(b.id)}
                        className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded border border-emerald-100 cursor-pointer flex items-center justify-center gap-1.5 font-bold px-3 py-1.5 text-[11px]"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify & Lock Day</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Past closures logs */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Branch Closed Cash books</span>
              <span className="text-[10px] font-mono text-slate-400">{closedBooks.length} days closed</span>
            </div>

            <div className="divide-y divide-slate-100">
              {closedBooks.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-bold">
                  No cash closing records.
                </div>
              ) : (
                closedBooks.map(b => (
                  <div key={b.id} className="p-4 flex justify-between items-center text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Verified Date: {b.date}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded font-bold">Closed</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Expected closing cash: ₹{b.closingCash} | Variance: ₹{b.variance}</p>
                      <p className="text-[9px] text-slate-400 font-medium font-mono mt-0.5">Verified by manager: {b.managerName || 'System Admin'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
