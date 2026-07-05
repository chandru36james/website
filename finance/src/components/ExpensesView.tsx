import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Wallet, Plus, Check, X, ShieldAlert, ClipboardList, IndianRupee } from 'lucide-react';
import { UserRole, Expense } from '../types';

export const ExpensesView: React.FC = () => {
  const { 
    expenses, 
    addExpense, 
    approveExpense, 
    rejectExpense, 
    userRole, 
    currentUser, 
    expenseCategories, 
    addExpenseCategory, 
    deleteExpenseCategory 
  } = useVFMS();

  const [expenseType, setExpenseType] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatAmount, setNewCatAmount] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  // Confirm states
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmType, setConfirmType] = useState<'approve' | 'reject' | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('');

  // Pre-populate Agent Form category and amount
  React.useEffect(() => {
    if (expenseCategories && expenseCategories.length > 0) {
      if (!expenseType) {
        setExpenseType(expenseCategories[0].name);
        setAmount(String(expenseCategories[0].amount));
      }
    } else {
      if (!expenseType) {
        setExpenseType('Petrol');
        setAmount('200');
      }
    }
  }, [expenseCategories, expenseType]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setExpenseType(val);
    const cat = expenseCategories.find(c => c.name === val);
    if (cat) {
      setAmount(String(cat.amount));
    } else {
      // Fallback defaults for default select options
      const fallbacks: { [key: string]: number } = {
        'Petrol': 200,
        'Beta Charge': 300,
        'Food': 150,
        'Parking': 50,
        'Vehicle Repair': 500,
        'Other': 100
      };
      setAmount(String(fallbacks[val] || 100));
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addExpense({
        type: expenseType || 'Other',
        amount: amt,
        description: description.trim()
      });
      setDescription('');
      alert("Expense logged successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to submit expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newCatAmount);
    if (!newCatName.trim()) {
      alert("Please enter a category name.");
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsAddingCat(true);
    try {
      await addExpenseCategory({
        name: newCatName.trim(),
        amount: amt
      });
      setNewCatName('');
      setNewCatAmount('');
      alert("Expense category added successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to add category.");
    } finally {
      setIsAddingCat(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!confirmId || !confirmType) return;

    try {
      if (confirmType === 'approve') {
        await approveExpense(confirmId);
        alert("Expense approved successfully.");
      } else if (confirmType === 'reject') {
        if (!rejectReason.trim()) {
          alert("Please enter a rejection reason.");
          return;
        }
        await rejectExpense(confirmId, rejectReason);
        alert("Expense claim rejected.");
      }
      setConfirmId(null);
      setConfirmType(null);
      setRejectReason('');
    } catch (err: any) {
      alert(err.message || "Failed to process expense.");
    }
  };

  // Filter lists based on role
  const isAgent = userRole === 'Loan Officer';
  const displayedExpenses = isAgent 
    ? expenses.filter(e => e.agentId === currentUser?.uid) 
    : expenses;

  const pendingExpenses = displayedExpenses.filter(e => e.status === 'Pending');
  const processedExpenses = displayedExpenses.filter(e => e.status !== 'Pending');

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="h-5 w-5 text-red-600" />
            Field Expenses Log
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log fuel charges, meals, beta charges, and parking logs for field collection operations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Agent Expense Log Submission Form */}
        {isAgent && (
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Log Expense Claim</h3>
                  <p className="text-[10px] text-slate-400">Declare a field operational expense.</p>
                </div>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Expense Type</label>
                  <select
                    value={expenseType}
                    onChange={handleCategoryChange}
                    className="form-input bg-slate-50 cursor-pointer text-slate-800"
                  >
                    {expenseCategories && expenseCategories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    {(!expenseCategories || expenseCategories.length === 0) && (
                      <>
                        <option value="Petrol">Petrol</option>
                        <option value="Beta Charge">Beta Charge</option>
                        <option value="Food">Food</option>
                        <option value="Parking">Parking</option>
                        <option value="Vehicle Repair">Vehicle Repair</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g. ₹350"
                    readOnly={isAgent}
                    className={`form-input ${isAgent ? 'bg-slate-100 text-slate-500 cursor-not-allowed font-semibold' : ''}`}
                  />
                  {isAgent && (
                    <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                      ⚠️ Fixed Daily Allotment: Managed by Administrator settings.
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Claim Details / Notes</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Fuel for Karur route"
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Expense Claim</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Admin Category Management Section */}
        {!isAgent && ['Super Admin', 'Manager'].includes(userRole) && (
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                <div className="h-8 w-8 bg-red-50 text-red-650 rounded-lg flex items-center justify-center font-bold">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Add Expense Category</h3>
                  <p className="text-[10px] text-slate-400">Configure global expense categories.</p>
                </div>
              </div>

              <form onSubmit={handleAddCategory} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Expense Name</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    placeholder="e.g. Petrol Expense"
                    className="form-input"
                  />
                </div>

                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Default Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCatAmount}
                    onChange={e => setNewCatAmount(e.target.value)}
                    placeholder="e.g. 200"
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAddingCat}
                  className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Category</span>
                </button>
              </form>
            </div>

            {/* List of Configured Categories */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Configured Categories</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {(!expenseCategories || expenseCategories.length === 0) ? (
                  <p className="text-slate-400 text-center py-4 italic font-bold">No categories created yet.</p>
                ) : (
                  expenseCategories.map(cat => (
                    <div key={cat.id} className="flex justify-between items-center p-2 bg-slate-50 border border-slate-100 rounded-lg">
                      <div>
                        <p className="font-bold text-slate-800">{cat.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">₹{cat.amount}</p>
                      </div>
                      <button
                        onClick={() => deleteExpenseCategory(cat.id)}
                        className="p-1 hover:bg-red-50 hover:text-red-600 text-slate-450 rounded transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expenses List Panel */}
        <div className={(isAgent || ['Super Admin', 'Manager'].includes(userRole)) ? 'lg:col-span-8 space-y-6' : 'lg:col-span-12 space-y-6'}>
          
          {/* Pending Reviews Card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Pending Approvals</span>
              <span className="text-[10px] font-mono text-slate-400">{pendingExpenses.length} claims</span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingExpenses.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  No pending expense reviews found.
                </div>
              ) : (
                pendingExpenses.map(e => (
                  <div key={e.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{e.type}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded font-bold">₹{e.amount}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{e.description}</p>
                      <p className="text-[9px] text-slate-400 font-medium font-mono mt-0.5">Submitted by: {e.agentName} | {new Date(e.createdAt).toLocaleDateString()}</p>
                    </div>

                    {!isAgent && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setConfirmId(e.id); setConfirmType('approve'); }}
                          className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded border border-emerald-100 cursor-pointer flex items-center justify-center gap-1.5 font-bold px-2.5 py-1 text-[11px]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => { setConfirmId(e.id); setConfirmType('reject'); }}
                          className="p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-100 cursor-pointer flex items-center justify-center gap-1.5 font-bold px-2.5 py-1 text-[11px]"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Past History Card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900">Expense Claim History</span>
              <span className="text-[10px] font-mono text-slate-400">{processedExpenses.length} claims</span>
            </div>

            <div className="divide-y divide-slate-100">
              {processedExpenses.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-bold">
                  No expenses submitted.
                </div>
              ) : (
                processedExpenses.map(e => (
                  <div key={e.id} className="p-4 flex justify-between items-center text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{e.type}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded font-bold">₹{e.amount}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{e.description}</p>
                      <p className="text-[9px] text-slate-400 font-medium font-mono mt-0.5">Submitted by: {e.agentName} | Approved/Rejected by: {e.approvedByName || 'N/A'}</p>
                    </div>

                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        e.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Dialog Modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full space-y-4 animate-scale-up text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-950 font-bold text-sm">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
              <span>Confirm Expense Action</span>
            </div>

            <p className="text-slate-500 leading-normal">
              Are you sure you want to <span className="font-bold text-slate-800 uppercase">{confirmType}</span> this expense claim?
            </p>

            {confirmType === 'reject' && (
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Rejection Reason</label>
                <input
                  type="text"
                  required
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="e.g. Missing valid receipt proof"
                  className="form-input"
                />
              </div>
            )}

            <div className="flex items-center gap-3 justify-end pt-2">
              <button
                onClick={() => { setConfirmId(null); setConfirmType(null); setRejectReason(''); }}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
