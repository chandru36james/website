import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { ShieldCheck, X, KeyRound, AlertCircle, Loader2 } from 'lucide-react';
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
  const { verifySupervisorPinSecure, currentUser } = useVFMS();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    // Wait slightly to let state update and render loading spinner (improves UX with bcrypt)
    setTimeout(async () => {
      try {
        const result = await verifySupervisorPinSecure(pin);
        if (result.success) {
          onConfirm();
          setPin('');
          onClose();
        } else {
          setError(result.message || 'Invalid Approval PIN.');
          setPin('');
        }
      } catch (err: any) {
        setError(err.message || 'Invalid Approval PIN.');
        setPin('');
      } finally {
        setIsSubmitting(false);
      }
    }, 100);
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
            <div className="flex items-center gap-2 text-red-650">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-bold text-sm text-slate-900 font-sans">Manager Approval Required</h3>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="mt-4 space-y-3 font-sans">
            <div>
              <h4 className="text-xs font-bold text-slate-800">{title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                {description || "This action requires authorization from a Manager or Super Admin."}
              </p>
              <p className="text-[10px] text-red-600/90 font-medium bg-red-50 border border-red-100/50 p-2.5 rounded-lg leading-normal mt-2.5">
                This action requires authorization from a Manager or Super Admin. Please ask an authorized user to enter their Approval PIN.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Enter Supervisor / Manager PIN
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    maxLength={8}
                    required
                    disabled={isSubmitting}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, ''));
                      setError(null);
                    }}
                    placeholder="••••"
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-center bg-white"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-1.5 text-[10px] text-red-650 font-medium bg-red-50 border border-red-100 p-2 rounded-lg leading-normal">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!pin || isSubmitting}
                  className="flex-1 py-1.5 bg-red-600 hover:bg-red-500 disabled:bg-slate-150 disabled:text-slate-400 disabled:border-transparent text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Approve</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Micro Footer Hint */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>Security Layer: Active</span>
            <span>Operator: <strong className="text-slate-650">{currentUser?.displayName || 'Agent'}</strong></span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
