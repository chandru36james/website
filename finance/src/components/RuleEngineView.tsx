import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Settings, ShieldAlert, Check, RefreshCw, Scale } from 'lucide-react';
import { ActionConfirmModal } from './ActionConfirmModal';
import { useToast } from './ToastProvider';

export const RuleEngineView: React.FC = () => {
  const { financeRules, updateFinanceRules, userRole, securityPolicy } = useVFMS();
  const { toast } = useToast();

  const currentRules = financeRules[0] || {
    id: 'default-rule',
    version: '1.0',
    interestRateMin: 5,
    interestRateMax: 36,
    gracePeriodDays: 3,
    penaltyValue: 50,
    penaltyRate: 2,
    penaltyType: 'Flat Amount' as const,
    processingFeeFixed: 500,
    processingFeePercent: 1.5,
    allocationPriority: ['Penalty', 'Interest', 'Principal'],
    loanNumberPrefix: 'VY-LN-',
    companyId: 'vgot-you-finance',
    branchId: 'main-branch',
    createdAt: new Date().toISOString()
  };

  const [penaltyRate, setPenaltyRate] = useState(String(currentRules.penaltyRate));
  const [gracePeriodDays, setGracePeriodDays] = useState(String(currentRules.gracePeriodDays));
  const [processingFeePercent, setProcessingFeePercent] = useState(String(currentRules.processingFeePercent));
  const [processingFeeFixed, setProcessingFeeFixed] = useState(String(currentRules.processingFeeFixed));
  const [loanNumberPrefix, setLoanNumberPrefix] = useState(currentRules.loanNumberPrefix);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSaveAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'Super Admin') {
      alert('Unauthorized! Only the Super Admin role can edit business rule equations.');
      return;
    }

    if (securityPolicy?.pinRequiredForActions) {
      setIsConfirmOpen(true);
    } else {
      executeSave();
    }
  };

  const executeSave = async () => {
    try {
      await updateFinanceRules({
        penaltyRate: parseFloat(penaltyRate),
        gracePeriodDays: parseInt(gracePeriodDays),
        processingFeePercent: parseFloat(processingFeePercent),
        processingFeeFixed: parseFloat(processingFeeFixed),
        loanNumberPrefix
      });
      toast.success('Rules Updated', 'Business calculation rules updated and version incremented.');
    } catch (err: any) {
      console.error('Update finance rules error:', err);
      toast.error('Update Failed', err.message || 'Could not update business rules.');
    }
  };

  if (userRole !== 'Super Admin') {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center max-w-md mx-auto py-16 flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-600 animate-pulse" />
        <h3 className="font-bold text-gray-800 text-base">Access Denied</h3>
        <p className="text-xs text-gray-500">
          The Finance Rule Engine is under strict audit lock. Only the <b>Super Admin</b> role is authorized to modify core loan formulas, penalty rates, or prefix sequences.
        </p>
        <p className="text-[10px] text-gray-400 font-mono">Current role level: {userRole}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* Banner */}
      <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm flex items-center gap-3">
        <div className="w-8 h-8 rounded-[10px] bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
          <Settings className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Finance Rule Engine</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Configure operational thresholds, allocation structures, and fee calculations across branches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Rules configuration form */}
        <form onSubmit={handleSaveAttempt} className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <div className="border-b border-slate-100 pb-2.5 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Underwriting Equations</h3>
            <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded-full text-[10px] font-bold">
              Schema version: {currentRules.version}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700">
            
            <div className="space-y-1">
              <label className="font-bold text-[10px] text-slate-500 uppercase">Daily Penalty Rate (%)</label>
              <input
                type="number"
                step="0.01"
                required
                value={penaltyRate}
                onChange={(e) => setPenaltyRate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400 font-medium">Charged on overdue principal per day</p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[10px] text-slate-500 uppercase">Penalty Grace Period (Days)</label>
              <input
                type="number"
                required
                value={gracePeriodDays}
                onChange={(e) => setGracePeriodDays(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400 font-medium">Days before penalty calculations accrue</p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[10px] text-slate-500 uppercase">Processing Fee (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={processingFeePercent}
                onChange={(e) => setProcessingFeePercent(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400 font-medium">Deducted from principal during loan booking</p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[10px] text-slate-500 uppercase">Minimum Processing Fee (₹)</label>
              <input
                type="number"
                required
                value={processingFeeFixed}
                onChange={(e) => setProcessingFeeFixed(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400 font-medium">Fixed minimum fee if percentage is lower</p>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[10px] text-slate-500 uppercase">Alphanumeric Contract Prefix</label>
              <input
                type="text"
                required
                value={loanNumberPrefix}
                onChange={(e) => setLoanNumberPrefix(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-[10px] text-xs focus:outline-none focus:border-red-500"
              />
              <p className="text-[10px] text-slate-400 font-medium">Standard system prefix for new loan generations</p>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-[10px] text-xs transition-colors cursor-pointer shadow-sm"
            >
              Update Formulas Version
            </button>
          </div>
        </form>

        {/* Right side: Compliance card displaying allocation queue */}
        <div className="bg-white p-4 rounded-[10px] border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-wider">Payment Allocation Chain</h3>
            <p className="text-xs text-slate-400 font-medium">Priority order for allocating receipts in double entry books:</p>
            
            <div className="space-y-2">
              {currentRules.allocationPriority.map((priority, idx) => (
                <div key={priority} className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-100 rounded-[10px]">
                   <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center font-mono text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{priority} Component</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-red-50/50 border border-red-100 rounded-[10px] text-xs text-red-700 space-y-1">
            <p className="font-bold uppercase tracking-wider text-[10px]">Rule Engine Safety Log</p>
            <p className="text-[10px] leading-relaxed font-medium">
              Every formula alteration triggers recalculations across draft applications. Locked or active amortized loans preserve their booked formulas to ensure contract compliance.
            </p>
          </div>
        </div>

      </div>

      <ActionConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeSave}
        title="Modify Financial Formula Constants"
        description="You are editing the underlying financial calculations (penalty rate, processing fee). This action directly alters future amortization tables and is subject to security audit trails."
      />

    </div>
  );
};


