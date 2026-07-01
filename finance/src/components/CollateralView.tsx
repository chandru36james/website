import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Plus, Landmark, Eye, ShieldCheck, RefreshCw, X, ArrowLeft } from 'lucide-react';
import { CollateralStatus } from '../types';

export const CollateralView: React.FC = () => {
  const { collaterals, loans, addCollateral, updateCollateralStatus, userRole } = useVFMS();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [type, setType] = useState('Gold');
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [storageLocation, setStorageLocation] = useState('');

  const selectedLoan = loans.find(x => x.id === loanId);
  const calculatedLtv = selectedLoan && parseFloat(estimatedValue) > 0
    ? Math.round((selectedLoan.principal / parseFloat(estimatedValue)) * 100 * 100) / 100
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanId || !estimatedValue || !description) return;

    await addCollateral({
      loanId,
      type,
      description,
      estimatedValue: parseFloat(estimatedValue) || 0,
      storageLocation,
      status: 'Deposited',
      ltv: calculatedLtv
    });

    setLoanId('');
    setType('Gold');
    setDescription('');
    setEstimatedValue('');
    setStorageLocation('');
    setIsCreateOpen(false);
  };

  // ── RENDER SUB-TAB 1: CREATE COLLATERAL PAGE ──
  if (isCreateOpen) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in max-w-lg mx-auto">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <button
            onClick={() => setIsCreateOpen(false)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-black text-slate-900 text-[13px] uppercase tracking-wider">Pledge Asset Against Loan</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Register tomorrow's vault deposit assets</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="form-label">Select Active Contract *</label>
            <select
              required
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              className="form-input"
            >
              <option value="">-- Choose Loan Portfolio --</option>
              {loans.filter(l => ['Active', 'Approved', 'Overdue'].includes(l.status)).map(l => (
                <option key={l.id} value={l.id}>{l.customerName} ({l.loanNumber}) - Principal: ₹{l.principal}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="form-label">Asset Classification</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-input"
              >
                <option value="Gold">Gold Ornaments</option>
                <option value="Vehicle">Vehicle Book (Asset backed)</option>
                <option value="Property">Property Deed / Land Title</option>
                <option value="Equipment">Machinery / Equipment</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="form-label">Estimated Market Value (₹) *</label>
              <input
                type="number"
                required
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="e.g. 5000"
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="form-label">Storage Location Details</label>
            <input
              type="text"
              value={storageLocation}
              onChange={(e) => setStorageLocation(e.target.value)}
              placeholder="e.g. Branch Locker B, Vault 1"
              className="form-input"
            />
          </div>

          <div className="space-y-1">
            <label className="form-label">Condition & Particular Description *</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 24 karat gold chains, total weight 35g, mint condition"
              rows={3}
              className="form-input"
            />
          </div>

          {selectedLoan && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[11px] font-medium text-slate-700 space-y-1">
              <p className="font-bold text-[10px] text-slate-500 uppercase">Calculated Loan-to-Value (LTV)</p>
              <div className="flex justify-between">
                <span className="text-slate-400">Loan Principal:</span>
                <span className="font-bold text-slate-800">₹{selectedLoan.principal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Collateral Value:</span>
                <span className="font-bold text-slate-800">₹{parseFloat(estimatedValue) || 0}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/50 pt-1.5 mt-1">
                <span className="font-bold text-slate-600">LTV Ratio:</span>
                <span className={`font-black ${calculatedLtv > 80 ? 'text-red-600' : 'text-green-600'}`}>
                  {calculatedLtv}% {calculatedLtv > 80 ? '(High Risk Overdue)' : '(Safe Cover)'}
                </span>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="btn btn-secondary px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
            >
              Register Vault Deposit
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── RENDER SUB-TAB 2: LIST VIEW ──
  return (
    <div className="space-y-4">
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Physical Vault Registry</h2>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Track and audit pledged physical assets and LTV ratios</p>
        </div>

        {userRole !== 'Auditor' && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deposit Collateral</span>
          </button>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[10px] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-white text-slate-400 font-bold text-[10px] uppercase border-b border-slate-100">
              <th className="px-4 py-2.5">Owner Client</th>
              <th className="px-4 py-2.5">Asset Type</th>
              <th className="px-4 py-2.5">Storage Location</th>
              <th className="px-4 py-2.5">Vault Valuation</th>
              <th className="px-4 py-2.5">LTV Ratio</th>
              <th className="px-4 py-2.5 text-right">Status Option</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {collaterals.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">No physical collaterals registered in vault.</td>
              </tr>
            ) : (
              collaterals.map(col => {
                const linkedLoan = loans.find(l => l.id === col.loanId);
                const ltv = linkedLoan ? Math.round((linkedLoan.principal / col.estimatedValue) * 100) : 0;
                return (
                  <tr key={col.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 font-bold text-slate-900">
                      {linkedLoan ? linkedLoan.customerName : 'N/A Owner'}
                    </td>
                    <td className="px-4 py-2.5 font-medium">{col.type}</td>
                    <td className="px-4 py-2.5 text-slate-500">{col.storageLocation || 'Vault Core Locker'}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-800">₹{col.estimatedValue.toLocaleString()}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        ltv > 80 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
                      }`}>
                        {ltv}% LTV
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {userRole !== 'Auditor' ? (
                        <select
                          value={col.status}
                          onChange={(e) => updateCollateralStatus(col.id, e.target.value as CollateralStatus)}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 focus:outline-none"
                        >
                          <option value="Deposited">Deposited</option>
                          <option value="Returned">Returned</option>
                          <option value="Liquidated">Liquidated</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold border ${
                          col.status === 'Deposited' ? 'bg-green-50 text-green-700 border-green-200' :
                          col.status === 'Returned' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {col.status}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
