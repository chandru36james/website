import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { calculateInterest, addPeriodsToDate, generateSchedule } from '../utils/finance';
import { Loan, LoanSchedule, LoanStatus, PaymentMethod } from '../types';
import { 
  Plus, Search, FileSpreadsheet, ChevronRight, Check, X,
  ArrowRight, ShieldCheck, CreditCard, Coins, Calendar, Ban, 
  Trash2, Scale, Percent, FileCheck, ArrowLeft
} from 'lucide-react';

export const LoansView: React.FC = () => {
  const { 
    loans, customers, schedules, payments, ledgers, 
    createLoan, approveLoan, rejectLoan, disburseLoan, submitPayment, 
    waiveInstallment, writeOffLoan, userRole, financeRules
  } = useVFMS();

  const [activeSubTab, setActiveSubTab] = useState<'list' | 'create' | 'payment'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LoanStatus>('All');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // CREATE LOAN STATE
  const [customerId, setCustomerId] = useState('');
  const [loanType, setLoanType] = useState('Personal');
  const [principal, setPrincipal] = useState('20000');
  const [interestType, setInterestType] = useState<'Flat' | 'Reducing' | 'Simple' | 'Compound'>('Flat');
  const [interestRate, setInterestRate] = useState('12');
  const [interestFrequency, setInterestFrequency] = useState<'Daily' | 'Weekly' | 'Monthly'>('Monthly');
  const [duration, setDuration] = useState('6');
  const [collectionFrequency, setCollectionFrequency] = useState<'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly'>('Monthly');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [remarks, setRemarks] = useState('');

  // PAYMENT RECORD STATE
  const [paymentLoanId, setPaymentLoanId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [receiptNumber, setReceiptNumber] = useState('');

  // WAIVER STATE
  const [isWaiverOpen, setIsWaiverOpen] = useState(false);
  const [waiveLoanId, setWaiveLoanId] = useState('');
  const [waiveSchedId, setWaiveSchedId] = useState('');
  const [waiveAmt, setWaiveAmt] = useState('');
  const [waiveReason, setWaiveReason] = useState('');

  // Live Calculation Preview (for Form)
  const selectedCust = customers.find(x => x.id === customerId);
  const currentRules = financeRules[0] || { processingFeePercent: 1.5, processingFeeFixed: 500 };
  
  const calculatedFee = customerId 
    ? Math.max(
        currentRules.processingFeeFixed, 
        (parseFloat(principal) || 0) * (currentRules.processingFeePercent / 100)
      )
    : 0;

  const netDisbursement = (parseFloat(principal) || 0) - calculatedFee;

  const previewSchedule = customerId && principal && interestRate && duration
    ? generateSchedule({
        id: 'preview',
        customerId,
        customerName: selectedCust?.name || 'Preview',
        loanNumber: 'PREVIEW',
        loanType,
        principal: parseFloat(principal),
        processingFee: calculatedFee,
        disbursedAmount: netDisbursement,
        interestType,
        interestRate: parseFloat(interestRate),
        interestFrequency,
        duration: parseInt(duration),
        collectionFrequency,
        startDate,
        endDate: addPeriodsToDate(startDate, parseInt(duration), collectionFrequency),
        status: 'Draft',
        formulaVersion: 'v1',
        companyId: 'preview',
        branchId: 'preview',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    : [];

  const totalInterest = previewSchedule.reduce((sum, item) => sum + item.interestDue, 0);
  const emiAmount = previewSchedule.length > 0 ? previewSchedule[0].installmentNumber : 0;

  const handleCreateLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !principal || !interestRate || !duration) return;

    await createLoan({
      customerId,
      customerName: selectedCust?.name || 'Unknown',
      loanType,
      principal: parseFloat(principal),
      interestRate: parseFloat(interestRate),
      interestType,
      interestFrequency,
      duration: parseInt(duration),
      collectionFrequency,
      startDate,
      endDate: addPeriodsToDate(startDate, parseInt(duration), collectionFrequency),
      processingFee: calculatedFee,
      remarks
    });

    // Reset Form
    setCustomerId('');
    setPrincipal('20000');
    setInterestRate('12');
    setDuration('6');
    setRemarks('');
    setActiveSubTab('list');
  };

  const handleRepayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentLoanId || !paymentAmount) return;

    await submitPayment({
      loanId: paymentLoanId,
      amount: parseFloat(paymentAmount),
      paymentMethod,
      receiptNumber
    });

    setPaymentLoanId('');
    setPaymentAmount('');
    setReceiptNumber('');
    setActiveSubTab('list');
  };

  const handleWaiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waiveLoanId || !waiveSchedId || !waiveAmt || !waiveReason) return;

    await waiveInstallment(
      waiveLoanId,
      waiveSchedId,
      parseFloat(waiveAmt),
      waiveReason
    );

    setWaiveLoanId('');
    setWaiveSchedId('');
    setWaiveAmt('');
    setWaiveReason('');
    setIsWaiverOpen(false);
  };

  const filteredLoans = loans.filter(l => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = l.customerName.toLowerCase().includes(term) || l.loanNumber.toLowerCase().includes(term);
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ── RENDER SUB-TAB 0: INSTALLMENT WAIVER PAGE ──
  if (isWaiverOpen) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in max-w-sm mx-auto">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setIsWaiverOpen(false)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">Waive Installment Due</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Authorise installment waiver parameters</p>
          </div>
        </div>
        
        <form onSubmit={handleWaiveSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="form-label">Waiver Amount (₹) *</label>
            <input
              type="number"
              required
              value={waiveAmt}
              onChange={(e) => setWaiveAmt(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="space-y-1">
            <label className="form-label">Waiver Underwriting Reason *</label>
            <input
              type="text"
              required
              value={waiveReason}
              onChange={(e) => setWaiveReason(e.target.value)}
              placeholder="e.g. Extreme personal emergency / grace"
              className="form-input"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsWaiverOpen(false)}
              className="btn btn-secondary px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
            >
              Confirm Waiver
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Sub tabs navigation */}
      <div className="bg-white p-3.5 rounded-[10px] border border-slate-200 flex justify-between items-center shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveSubTab('list'); setSelectedLoan(null); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'list' ? 'bg-red-50/50 text-red-600 font-black border border-red-100' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Active Contracts ({loans.length})
          </button>
          {userRole !== 'Auditor' && (
            <>
              <button
                onClick={() => { setActiveSubTab('create'); setSelectedLoan(null); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === 'create' ? 'bg-red-50/50 text-red-600 font-black border border-red-100' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Create Loan
              </button>
              <button
                onClick={() => { setActiveSubTab('payment'); setSelectedLoan(null); }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === 'payment' ? 'bg-red-50/50 text-red-600 font-black border border-red-100' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Record Collection
              </button>
            </>
          )}
        </div>

        {activeSubTab === 'list' && (
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-[10px] text-xs font-bold text-slate-600 focus:outline-none"
            >
              <option value="All">All Portfolio Status</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Active">Active Ledger</option>
              <option value="Overdue">Overdue Arrears</option>
              <option value="Closed">Closed / Paid Off</option>
              <option value="Rejected">Rejected Application</option>
              <option value="Written Off">Written Off</option>
            </select>
          </div>
        )}
      </div>

      {/* RENDER TAB 1: LIST ACTIVE CONTRACTS */}
      {activeSubTab === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main List */}
          <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by client or contract..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-[10px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">{filteredLoans.length} Contracts found</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
                    <th className="px-4 py-2.5">Loan number</th>
                    <th className="px-4 py-2.5">Borrower Client</th>
                    <th className="px-4 py-2.5">Principal</th>
                    <th className="px-4 py-2.5">Interest Type</th>
                    <th className="px-4 py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLoans.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">No matching contracts in active ledger.</td>
                    </tr>
                  ) : (
                    filteredLoans.map(loan => (
                      <tr
                        key={loan.id}
                        onClick={() => setSelectedLoan(loan)}
                        className={`hover:bg-slate-50/50 cursor-pointer ${selectedLoan?.id === loan.id ? 'bg-red-50/10' : ''}`}
                      >
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-900">{loan.loanNumber}</td>
                        <td className="px-4 py-2.5 font-bold text-slate-800">{loan.customerName}</td>
                        <td className="px-4 py-2.5 font-bold">₹{loan.principal.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-slate-500 font-medium">{loan.interestRate}% ({loan.interestType})</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            loan.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-150' :
                            loan.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700 border border-amber-150' :
                            loan.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-150 animate-pulse' :
                            loan.status === 'Closed' ? 'bg-slate-50 text-slate-500 border border-slate-150' : 'bg-red-50 text-red-700 border border-red-150'
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

          {/* Details Side Workspace */}
          <div className="lg:col-span-1">
            {selectedLoan ? (
              <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm p-4 space-y-4">
                
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-150 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{selectedLoan.customerName}</h3>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{selectedLoan.loanNumber}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedLoan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedLoan.status}
                  </span>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Principal Disbursed</span>
                    <span className="font-bold text-slate-800">₹{selectedLoan.principal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Rate & Calculation</span>
                    <span className="font-medium text-slate-700">{selectedLoan.interestRate}% ({selectedLoan.interestType})</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Tenure Months</span>
                    <span className="font-bold text-slate-800">{selectedLoan.duration} Months</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Collection Target</span>
                    <span className="font-medium text-slate-700">{selectedLoan.collectionFrequency} cycle</span>
                  </div>
                </div>

                {/* Workflow underwriter buttons */}
                {userRole !== 'Auditor' && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    
                    {selectedLoan.status === 'Pending Approval' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveLoan(selectedLoan.id)}
                          className="flex-1 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold rounded-[10px] flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => rejectLoan(selectedLoan.id)}
                          className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-[10px] flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}

                    {selectedLoan.status === 'Approved' && (
                      <button
                        onClick={() => disburseLoan(selectedLoan.id)}
                        className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-[10px] flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      >
                        <Coins className="w-3.5 h-3.5" /> Disburse & Generate Ledger Book
                      </button>
                    )}

                    {selectedLoan.status === 'Overdue' && userRole === 'Super Admin' && (
                      <button
                        onClick={() => writeOffLoan(selectedLoan.id, 'Bad Debt Write-off')}
                        className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-600 text-[11px] font-bold rounded-[10px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Scale className="w-3.5 h-3.5" /> Underwrite Write-Off Loss
                      </button>
                    )}

                  </div>
                )}

                {/* Schedules Table */}
                <div className="border-t border-slate-150 pt-3">
                  <h4 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2">Amortization Timelines</h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {(() => {
                      const loanScheds = schedules[selectedLoan.id] || [];
                      if (loanScheds.length === 0) {
                        return <span className="text-[10px] text-slate-400 italic">No schedules generated yet.</span>;
                      }
                      
                      // Sort schedules chronologically
                      const sortedScheds = [...loanScheds].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

                      return sortedScheds.map(item => (
                        <div key={item.id} className="p-2 border border-slate-150 rounded-lg flex justify-between items-center bg-slate-50/50 text-[10px] font-medium text-slate-700">
                          <div>
                            <span className="font-bold text-slate-800">₹{item.installmentNumber.toLocaleString()}</span>
                            <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                              Due: {item.dueDate} | Paid: ₹{((item.principalDue + item.interestDue + item.penaltyDue) - item.outstanding).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right flex flex-col items-end gap-1.5">
                            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                              item.status === 'Paid' ? 'bg-green-50 text-green-700 border border-green-100' :
                              item.status === 'Waived' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                              item.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {item.status}
                            </span>
                            {item.status !== 'Paid' && item.status !== 'Waived' && userRole === 'Super Admin' && (
                              <button
                                onClick={() => {
                                  setWaiveLoanId(selectedLoan.id);
                                  setWaiveSchedId(item.id);
                                  setWaiveAmt(String(item.outstanding));
                                  setIsWaiverOpen(true);
                                }}
                                className="text-[9px] font-bold text-red-600 hover:underline"
                              >
                                Waive Fee
                              </button>
                            )}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white p-6 rounded-[10px] border border-slate-200 shadow-sm text-center text-slate-400 py-16 flex flex-col items-center justify-center">
                <FileSpreadsheet className="w-10 h-10 text-slate-300 stroke-[1.5]" />
                <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider mt-3">No Selected Contract</h3>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[180px]">Select a contract folder on the left to inspect future EMI timelines, ledger links, and underwriting gates.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* RENDER TAB 2: CREATE LOAN APPLICATION */}
      {activeSubTab === 'create' && (
        <form onSubmit={handleCreateLoan} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-xl mx-auto space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Book Underwrite Loan Application</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Calculates interest timelines and applies processing fee allocations</p>
          </div>

          <div className="space-y-4 text-xs font-medium text-slate-700">
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Select Register Borrower Folder *</label>
              <select
                required
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
              >
                <option value="">-- Choose Borrower Folder --</option>
                {customers.filter(c => c.status === 'Active').map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.occupation || 'Self-Employed'})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Principal Loan Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Classification Class</label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                >
                  <option value="Personal">Personal Unsecured Loan</option>
                  <option value="Business">Business Growth capital</option>
                  <option value="Gold">Gold Ornaments Pledge</option>
                  <option value="Property">Mortgage Property backed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Interest Percentage Rate (% Annual) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Interest Model Type</label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                >
                  <option value="Flat">Flat Rate calculation</option>
                  <option value="Reducing">Reducing Balance EMI</option>
                  <option value="Simple">Simple Interest formula</option>
                  <option value="Compound">Compound Interest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Duration tenure (Months) *</label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Interest Frequency</label>
                <select
                  value={interestFrequency}
                  onChange={(e) => setInterestFrequency(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Collection frequency</label>
                <select
                  value={collectionFrequency}
                  onChange={(e) => setCollectionFrequency(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Disbursement Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Internal underwriting Remarks</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Special criteria observations..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Calculations Preview Side Strip */}
            {customerId && (
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-[10px] space-y-3.5">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-200/50 pb-1.5 uppercase tracking-wider">Underwriting calculations preview</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-700">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Processing Fee:</span>
                    <span className="font-bold text-slate-800">₹{calculatedFee.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Net Disbursed:</span>
                    <span className="font-bold text-red-600">₹{netDisbursement.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Total Interest:</span>
                    <span className="font-bold text-slate-800">₹{totalInterest.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Estimated EMI:</span>
                    <span className="font-sans font-bold text-red-600 text-sm">₹{emiAmount.toFixed(2)}</span>
                  </div>
                </div>

                {selectedCust && (
                  <div className="pt-2 border-t border-slate-200/50 text-[10px] font-medium text-slate-600">
                    <p>Borrower folder check: <strong className="text-slate-800">{selectedCust.name}</strong> has a registered risk score of <strong>{selectedCust.riskCategory}</strong>.</p>
                    {selectedCust.riskCategory === 'High' && (
                      <p className="text-red-600 font-semibold mt-1">Warning: Collateral pledge strongly suggested.</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Book Underwrite Application
                </button>
              </div>
            )}

          </div>
        </form>
      )}

      {/* RENDER TAB 3: RECORD COLLECTION PAYMENT ENTRY */}
      {activeSubTab === 'payment' && (
        <form onSubmit={handleRepayment} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-xl mx-auto space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-900">Record Installment Repayment Entry</h2>
            <p className="text-xs text-gray-400 mt-0.5">Applies rules allocation (Penalty first, then Interest, then Principal).</p>
          </div>

          <div className="space-y-4 text-xs font-medium text-slate-700">
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Select Active Loan Portfolio *</label>
              <select
                required
                value={paymentLoanId}
                onChange={(e) => setPaymentLoanId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none"
              >
                <option value="">-- Choose Loan Portfolio --</option>
                {loans.filter(l => ['Active', 'Overdue'].includes(l.status)).map(l => (
                  <option key={l.id} value={l.id}>{l.customerName} ({l.loanNumber}) - Principal: ₹{l.principal}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Collection Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Receipt Reference Number</label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  placeholder="Optional reference ID"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase block">Transaction Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Cash'}
                    onChange={() => setPaymentMethod('Cash')}
                    className="accent-red-600"
                  />
                  Rupee Cash Drawer
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Bank Transfer'}
                    onChange={() => setPaymentMethod('Bank Transfer')}
                    className="accent-red-600"
                  />
                  RTGS / Bank Deposit
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="accent-red-600"
                  />
                  UPI QR Transfer
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
            >
              Post Repayment Collection
            </button>

          </div>
        </form>
      )}

    </div>
  );
};
