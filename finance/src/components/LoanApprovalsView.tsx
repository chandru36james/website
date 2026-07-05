import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { CheckSquare, Check, X, FileText, ClipboardList, Clock, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { Loan, UserRole } from '../types';

export const LoanApprovalsView: React.FC = () => {
  const { loans, approveLoan, rejectLoan, disburseLoan, userRole } = useVFMS();

  const [activeLoanId, setActiveLoanId] = useState<string | null>(null);
  const [confirmType, setConfirmType] = useState<'approve' | 'reject' | 'disburse' | null>(null);
  const [remarks, setRemarks] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmAction = async () => {
    if (!activeLoanId || !confirmType) return;

    setIsSubmitting(true);
    try {
      if (confirmType === 'approve') {
        await approveLoan(activeLoanId, remarks.trim() || 'Approved by Manager');
        alert("Loan application approved.");
      } else if (confirmType === 'reject') {
        if (!remarks.trim()) {
          alert("Please enter rejection remarks.");
          setIsSubmitting(false);
          return;
        }
        await rejectLoan(activeLoanId, remarks.trim());
        alert("Loan application rejected.");
      } else if (confirmType === 'disburse') {
        await disburseLoan(activeLoanId);
        alert("Loan funds disbursed and schedule activated.");
      }
      setActiveLoanId(null);
      setConfirmType(null);
      setRemarks('');
    } catch (err: any) {
      alert(err.message || "Failed to process loan action.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingApprovals = loans.filter(l => l.status === 'Pending Approval');
  const approvedLoans = loans.filter(l => l.status === 'Approved');

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-red-600" />
            Loan Approvals Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review field agent requests, approve lending limits, and authorize disbursement releases.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pending Approvals List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Pending Manager Approvals</span>
              <span className="text-[10px] font-mono text-slate-400">{pendingApprovals.length} requests</span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingApprovals.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  No pending loan applications.
                </div>
              ) : (
                pendingApprovals.map(l => (
                  <div key={l.id} className="p-4 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-950">{l.customerName}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Loan No: {l.loanNumber} | Requested: {new Date(l.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 font-bold px-2 py-0.5 rounded font-mono">
                        ₹{l.principal.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] font-medium text-slate-500 font-mono">
                      <span>Daily: ₹{l.dailyCollectionAmount || 500}</span>
                      <span>Duration: {l.duration} Days</span>
                      <span>Book: ₹{l.loanBookAmount || l.principal}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1.5">
                      <button
                        onClick={() => { setActiveLoanId(l.id); setConfirmType('approve'); }}
                        className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded border border-emerald-100 cursor-pointer flex items-center justify-center gap-1 font-bold px-2.5 py-1 text-[10px] transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Request</span>
                      </button>
                      <button
                        onClick={() => { setActiveLoanId(l.id); setConfirmType('reject'); }}
                        className="p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-100 cursor-pointer flex items-center justify-center gap-1 font-bold px-2.5 py-1 text-[10px] transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Approved Loans awaiting Disbursement */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Approved (Awaiting Disbursement)</span>
              <span className="text-[10px] font-mono text-slate-400">{approvedLoans.length} loans</span>
            </div>

            <div className="divide-y divide-slate-100">
              {approvedLoans.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  No approved loans waiting for disbursement.
                </div>
              ) : (
                approvedLoans.map(l => (
                  <div key={l.id} className="p-4 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-950">{l.customerName}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Loan No: {l.loanNumber} | Approved: {l.remarks || 'No remarks'}</p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-2 py-0.5 rounded font-mono">
                        ₹{l.principal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[10px] font-mono text-slate-400">
                        Disbursed amount: <span className="font-bold text-slate-700">₹{l.disbursedAmount}</span> (Principal minus processing fee)
                      </div>
                      <button
                        onClick={() => { setActiveLoanId(l.id); setConfirmType('disburse'); }}
                        className="p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded cursor-pointer flex items-center justify-center gap-1 font-bold px-3 py-1 text-[10px] transition-colors"
                      >
                        <span>Release Funds</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Dialog Modal */}
      {activeLoanId && confirmType && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full space-y-4 animate-scale-up text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-950 font-bold text-sm">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
              <span>Confirm Loan Action</span>
            </div>

            <p className="text-slate-500 leading-normal">
              Are you sure you want to <span className="font-bold text-slate-800 uppercase">{confirmType}</span> this loan request?
            </p>

            {(confirmType === 'approve' || confirmType === 'reject') && (
              <div className="space-y-1">
                <label className="font-bold text-slate-800">{confirmType === 'reject' ? 'Rejection Remarks' : 'Approval Remarks'}</label>
                <input
                  type="text"
                  required={confirmType === 'reject'}
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  placeholder="Enter remarks code"
                  className="form-input"
                />
              </div>
            )}

            <div className="flex items-center gap-3 justify-end pt-2">
              <button
                onClick={() => { setActiveLoanId(null); setConfirmType(null); setRemarks(''); }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={isSubmitting}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1"
              >
                {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                <span>Confirm Action</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
