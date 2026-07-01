import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { ShieldCheck, X, KeyRound, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ActionConfirmModal: React.FC<ActionConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description
}) => {
  const { approvalPin, logAudit } = useVFMS();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pin === approvalPin) {
      onConfirm();
      setPin('');
      onClose();
    } else {
      setError('Invalid authorization PIN. Verification failed.');
      setPin('');
      logAudit('FAILED_ACTION_AUTH', 'Security', 'PIN Verification', pin, `Unauthorized action attempt for: ${title}`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white w-full max-w-sm rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-red-600">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-bold text-sm text-slate-900">Secure Action Verification</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800">{title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Enter Supervisor PIN
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    maxLength={8}
                    required
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, ''));
                      setError(null);
                    }}
                    placeholder="••••"
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-center"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-[10px] text-red-600 font-medium bg-red-50 border border-red-100 p-2 rounded-lg">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!pin}
                  className="flex-1 py-1.5 bg-red-600 hover:bg-red-500 disabled:bg-slate-150 disabled:text-slate-400 disabled:border-transparent text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  Authorize
                </button>
              </div>
            </form>
          </div>

          {/* Micro Footer Hint */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>Security Layer: Active</span>
            <span>Demo PIN: <strong className="text-slate-600">{approvalPin}</strong></span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
