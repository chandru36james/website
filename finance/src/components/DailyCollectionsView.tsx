import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { 
  Coins, Search, MapPin, CheckCircle2, AlertCircle, HelpCircle, 
  XCircle, Check, Loader2, Navigation, ClipboardList, TrendingUp,
  ArrowLeft, ArrowUpRight, Phone, Upload, Eye, FileText, CheckCircle
} from 'lucide-react';
import { useToast } from './ToastProvider';

interface VisitState {
  type: 'Paid' | 'Recovery' | 'Missed' | 'Advance' | 'Partial' | 'Pending';
  amount: number;
  isDone: boolean;
  reason?: string;
  remarks?: string;
  receiptNo?: string;
  time?: string;
}

export const DailyCollectionsView: React.FC = () => {
  const { 
    customers, loans, payments, submitPayment, agentVisits, 
    updateVisitStatus, createAgentRoute, userRole, currentUser,
    selectedLoanIdForCollection, setSelectedLoanIdForCollection
  } = useVFMS();
  const { toast } = useToast();

  const [agentStep, setAgentStep] = useState<'dashboard' | 'list' | 'customer'>('dashboard');
  const [selectedCustId, setSelectedCustId] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<'Today' | 'Recovery' | 'Advance' | 'Partial' | 'NoCollection' | null>(null);

  React.useEffect(() => {
    if (selectedLoanIdForCollection) {
      const loan = loans.find(l => l.id === selectedLoanIdForCollection);
      if (loan) {
        setSelectedCustId(loan.customerId);
        setAgentStep('customer');
        setPaymentType(null);
      }
      setSelectedLoanIdForCollection(null);
    }
  }, [selectedLoanIdForCollection]);
  
  // Custom states
  const [paymentMode, setPaymentMode] = useState<string>('Cash');
  const [remarks, setRemarks] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [reasonInput, setReasonInput] = useState<string>('House Locked');
  
  // Last saved transaction state
  const [successReceipt, setSuccessReceipt] = useState<{
    receiptNo: string;
    amount: number;
    time: string;
  } | null>(null);

  const [visitStates, setVisitStates] = useState<{ [custId: string]: VisitState }>({});

  const getCustomerVisitList = () => {
    // Return standard active customers
    return customers.map(c => {
      const state = visitStates[c.id] || { type: 'Pending', amount: 0, isDone: false };
      return {
        ...c,
        visitState: state
      };
    });
  };

  const activeCust = customers.find(c => c.id === selectedCustId);
  const activeLoan = loans.find(l => l.customerId === selectedCustId && l.status === 'Active');

  const handleSavePayment = async () => {
    if (!activeCust || !activeLoan) return;

    let amountVal = 500;
    let category: 'Paid' | 'Recovery' | 'Advance' | 'Partial' | 'Missed' = 'Paid';
    let displayReason = '';

    if (paymentType === 'Today') {
      amountVal = 500;
      category = 'Paid';
    } else if (paymentType === 'Recovery') {
      amountVal = parseFloat(amountInput) || 1000;
      category = 'Recovery';
      displayReason = 'Paid yesterday & today';
    } else if (paymentType === 'Advance') {
      amountVal = parseFloat(amountInput) || 1500;
      category = 'Advance';
      displayReason = 'Paid 3 days';
    } else if (paymentType === 'Partial') {
      amountVal = parseFloat(amountInput) || 250;
      category = 'Partial';
      displayReason = 'Will pay balance tomorrow';
    } else if (paymentType === 'NoCollection') {
      amountVal = 0;
      category = 'Missed';
      displayReason = reasonInput;
    }

    try {
      const receiptNo = `RC-${Math.floor(100000 + Math.random() * 900000)}`;
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (category !== 'Missed') {
        await submitPayment({
          loanId: activeLoan.id,
          amount: amountVal,
          paymentMethod: paymentMode,
          receiptNumber: receiptNo
        });
      }

      // Save visit status locally
      setVisitStates(prev => ({
        ...prev,
        [activeCust.id]: {
          type: category,
          amount: amountVal,
          isDone: true,
          reason: displayReason,
          remarks: remarks || 'Manual field logging.',
          receiptNo,
          time: timeStr
        }
      }));

      setSuccessReceipt({
        receiptNo,
        amount: amountVal,
        time: timeStr
      });

      // Reset forms
      setPaymentType(null);
      setRemarks('');
      setAmountInput('');
      toast.success('Collection Saved', `Receipt ${receiptNo} recorded.`);
    } catch (err: any) {
      toast.error('Logging Error', err.message || 'Failed to submit payment.');
    }
  };

  const activeLoansList = loans.filter(l => l.status === 'Active');
  const targetVisits = customers.length;
  const targetCollectionVal = activeLoansList.length * 500;

  const getCompletedCount = () => {
    return Object.values(visitStates).filter(v => v.isDone).length;
  };

  const getRemainingCount = () => {
    return Math.max(0, targetVisits - getCompletedCount());
  };

  const getCollectedVolume = () => {
    return Object.values(visitStates).reduce((sum, v) => sum + v.amount, 0);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen text-xs select-none">

      {/* STEP 1: AGENT DASHBOARD */}
      {agentStep === 'dashboard' && (
        <div className="space-y-5 animate-fade-in p-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Welcome Back</p>
              <h1 className="text-base font-black text-slate-900 mt-1">Good Morning, {currentUser?.displayName || 'Arun'}</h1>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">Today's Targets</span>
                <span className="text-base font-black text-slate-800 mt-1 block">{targetVisits} Customers</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">Completed Tasks</span>
                <span className="text-base font-black text-emerald-600 mt-1 block">{getCompletedCount()} / {targetVisits}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                <span>Collections Progress</span>
                <span>₹{getCollectedVolume().toLocaleString()} / ₹{targetCollectionVal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${targetCollectionVal > 0 ? (getCollectedVolume() / targetCollectionVal) * 100 : 0}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setAgentStep('list')}
              className="w-full py-3 bg-red-600 text-white rounded-xl text-xs font-black tracking-wider uppercase text-center hover:bg-red-700 cursor-pointer shadow-sm"
            >
              Today's Customers
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TODAY'S CUSTOMERS VISIT LIST */}
      {agentStep === 'list' && (
        <div className="space-y-4 animate-fade-in p-4">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setAgentStep('dashboard')}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Today's Customers</h2>
          </div>

          <div className="space-y-2.5">
            {getCustomerVisitList().length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-400 font-bold">
                No collections recorded today.
              </div>
            ) : (
              getCustomerVisitList().map(c => {
                const vs = c.visitState;
                const hasColor = vs.type !== 'Pending';
                
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCustId(c.id);
                      setSuccessReceipt(null);
                      setAgentStep('customer');
                    }}
                    className="bg-white p-4 rounded-xl border border-slate-250 hover:border-slate-350 transition-colors shadow-xs flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm mt-0.5">
                        {vs.type === 'Paid' ? '🟢' : vs.type === 'Recovery' ? '🟡' : vs.type === 'Missed' ? '🔴' : vs.type === 'Advance' ? '🔵' : vs.type === 'Partial' ? '🟠' : '⚪'}
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-xs">{c.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Due: ₹500 | {c.village}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      {hasColor ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500">
                          {vs.type === 'Missed' ? (
                            <span className="text-red-500 font-bold">Missed</span>
                          ) : (
                            <span className="font-mono text-emerald-600 font-bold">₹{vs.amount.toLocaleString()}</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-450 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">Pending</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* STEP 3: CUSTOMER COLLECTION PANEL */}
      {agentStep === 'customer' && activeCust && (
        <div className="space-y-4 animate-fade-in p-4">
          
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setAgentStep('list')}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Customer Audit Sheet</span>
          </div>

          {/* Success Banner */}
          {successReceipt && (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl space-y-3 animate-scale-up">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Collection Saved Successfully</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-emerald-700 bg-white/50 p-2.5 rounded-lg">
                <div>Receipt: <strong>{successReceipt.receiptNo}</strong></div>
                <div>Amount: <strong>₹{successReceipt.amount.toLocaleString()}</strong></div>
                <div className="col-span-2">Time: <strong>{successReceipt.time}</strong></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => toast.success('Print Queue', 'Receipt sent to printer.')}
                  className="py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-center cursor-pointer text-[10px]"
                >
                  Print / Share
                </button>
                <button 
                  onClick={() => setSuccessReceipt(null)}
                  className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-center cursor-pointer text-[10px]"
                >
                  Dismiss Banner
                </button>
              </div>
            </div>
          )}

          {/* Customer Metadata Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
            <div>
              <span className="text-[9px] font-mono text-slate-400 uppercase">Customer Visits</span>
              <h3 className="text-sm font-black text-slate-800 mt-0.5">{activeCust.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[10px] text-slate-600 font-medium">
              <div>Loan Amount: <strong className="text-slate-800">₹{activeLoan?.principal.toLocaleString() || '1,00,000'}</strong></div>
              <div>Today's Due: <strong className="text-slate-800">₹500</strong></div>
              <div>Outstanding: <strong className="text-slate-800">₹55,000</strong></div>
              <div>Mobile: <strong className="text-slate-800">{activeCust.phone}</strong></div>
            </div>
          </div>

          {/* Transaction Forms & Button Matrix */}
          {!paymentType ? (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">Select Collection Action</span>
              
              <div className="grid grid-cols-1 gap-2.5">
                <button 
                  onClick={() => { setPaymentType('Today'); setSuccessReceipt(null); }}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-left px-4 font-black flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>🟢 Today's Payment</span>
                  <span className="text-[9px] font-mono text-emerald-600">₹500</span>
                </button>
                <button 
                  onClick={() => { setPaymentType('Recovery'); setSuccessReceipt(null); }}
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-left px-4 font-black flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>🟡 Recovery Payment</span>
                  <span className="text-[9px] font-mono text-amber-600">₹1,000+</span>
                </button>
                <button 
                  onClick={() => { setPaymentType('Advance'); setSuccessReceipt(null); }}
                  className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-left px-4 font-black flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>🔵 Advance Payment</span>
                  <span className="text-[9px] font-mono text-blue-600">Prepay Installments</span>
                </button>
                <button 
                  onClick={() => { setPaymentType('Partial'); setSuccessReceipt(null); }}
                  className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl text-left px-4 font-black flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>🟠 Partial Payment</span>
                  <span className="text-[9px] font-mono text-orange-600">Partial Installment</span>
                </button>
                <button 
                  onClick={() => { setPaymentType('NoCollection'); setSuccessReceipt(null); }}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-left px-4 font-black flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span>🔴 No Collection</span>
                  <span className="text-[9px] font-mono text-rose-600">Log Missed Reason</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 animate-scale-up text-left">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                  {paymentType === 'Today' && '🟢 Today\'s Installment'}
                  {paymentType === 'Recovery' && '🟡 Recovery Installment'}
                  {paymentType === 'Advance' && '🔵 Advance Installment'}
                  {paymentType === 'Partial' && '🟠 Partial Installment'}
                  {paymentType === 'NoCollection' && '🔴 Missed Installment'}
                </h4>
                <button 
                  onClick={() => setPaymentType(null)}
                  className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                >
                  Cancel
                </button>
              </div>

              {/* Dynamic Inputs */}
              <div className="space-y-3 text-xs">
                
                {paymentType === 'Today' && (
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono block">Amount</label>
                    <input 
                      type="text" 
                      value="₹500" 
                      disabled 
                      className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg font-mono font-bold text-slate-700" 
                    />
                  </div>
                )}

                {paymentType === 'Recovery' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono block">Amount Received</label>
                      <input 
                        type="number" 
                        placeholder="₹1000" 
                        value={amountInput}
                        onChange={e => setAmountInput(e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg font-mono font-bold focus:outline-none focus:border-red-500" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono block">Recovered Days</label>
                      <input 
                        type="number" 
                        defaultValue="1" 
                        disabled
                        className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg font-mono font-bold text-slate-700" 
                      />
                    </div>
                  </>
                )}

                {paymentType === 'Advance' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono block">Amount Received</label>
                      <input 
                        type="number" 
                        placeholder="₹1500" 
                        value={amountInput}
                        onChange={e => setAmountInput(e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg font-mono font-bold focus:outline-none focus:border-red-500" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono block">Advance Days</label>
                      <input 
                        type="number" 
                        defaultValue="2" 
                        disabled
                        className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg font-mono font-bold text-slate-700" 
                      />
                    </div>
                  </>
                )}

                {paymentType === 'Partial' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono block">Amount Received</label>
                      <input 
                        type="number" 
                        placeholder="₹250" 
                        value={amountInput}
                        onChange={e => setAmountInput(e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg font-mono font-bold focus:outline-none focus:border-red-500" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono block">Balance Pending</label>
                      <input 
                        type="text" 
                        value="₹250" 
                        disabled
                        className="w-full border border-slate-200 bg-slate-50 p-2.5 rounded-lg font-mono font-bold text-slate-700" 
                      />
                    </div>
                  </>
                )}

                {paymentType === 'NoCollection' && (
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono block">Reason</label>
                    <select
                      value={reasonInput}
                      onChange={e => setReasonInput(e.target.value)}
                      className="w-full border border-slate-200 p-2.5 rounded-lg bg-white focus:outline-none"
                    >
                      <option value="House Locked">House Locked</option>
                      <option value="Out of Station">Out of Station</option>
                      <option value="No Cash">No Cash</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {paymentType !== 'NoCollection' && (
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono block">Payment Mode</label>
                    <select
                      value={paymentMode}
                      onChange={e => setPaymentMode(e.target.value)}
                      className="w-full border border-slate-200 p-2.5 rounded-lg bg-white focus:outline-none"
                    >
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono block">Remarks</label>
                  <input 
                    type="text" 
                    placeholder="Enter remarks..." 
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                    className="w-full border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-red-500" 
                  />
                </div>

                <button
                  onClick={handleSavePayment}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-black uppercase rounded-lg text-center cursor-pointer shadow-sm text-[10px] tracking-wider pt-3"
                >
                  Save Collection
                </button>
              </div>
            </div>
          )}

          {/* Follow-up tasks panel */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">Post-Collection Actions</span>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
              <button 
                onClick={() => toast.success('KYC Vault', 'Redirecting to document vault.')}
                className="py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer flex items-center justify-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload KYC Docs</span>
              </button>
              <button 
                onClick={() => toast.warning('Manager Called', 'Routing phone call to regional manager.')}
                className="py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Manager</span>
              </button>
              <button 
                onClick={() => toast.success('Audit Ledger', 'Pulling historical schedules.')}
                className="py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer flex items-center justify-center gap-1 col-span-2"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Payment History</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
