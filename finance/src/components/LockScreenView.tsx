import React, { useState, useEffect } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { Lock, Unlock, ShieldAlert, ArrowRight, CornerDownLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LockScreenView: React.FC = () => {
  const { unlockApp, currentUser, approvalPin, logout } = useVFMS();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin) return;

    setError(null);
    const success = unlockApp(pin);
    if (success) {
      setPin('');
      setError(null);
    } else {
      setError('Invalid authorization passcode. Access denied.');
      setPin('');
      setAttempts(prev => prev + 1);
    }
  };

  const handleKeyPress = (num: string) => {
    if (pin.length < 8) {
      setPin(prev => prev + num);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between items-center p-6 relative font-sans text-slate-100">
      
      {/* Decorative Grid Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Top Brand Block */}
      <div className="w-full max-w-md flex items-center justify-between z-10 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-[6px] flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-red-600/20">
            V
          </div>
          <span className="font-bold text-xs tracking-widest text-slate-400">VGOT YOU SECURE PORTAL</span>
        </div>
        <div className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-wider">Session Inactive</span>
        </div>
      </div>

      {/* Main Lock Interactive Panel */}
      <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/50 z-10 my-auto flex flex-col items-center">
        
        {/* Animated Shield/Lock Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 opacity-20 blur animate-pulse" />
          <div className="relative h-14 w-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400 shadow-inner">
            <Lock className="h-6 w-6" />
          </div>
        </div>

        {/* User context */}
        <h2 className="text-base font-bold text-slate-100 text-center">Screen Automatically Locked</h2>
        <p className="text-[11px] text-slate-400 text-center mt-1 max-w-[280px]">
          Hello <span className="text-slate-200 font-semibold">{currentUser?.displayName}</span>. Your VFMS terminal session has been locked for security compliance.
        </p>

        {/* PIN Entry Display */}
        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              readOnly
              value={pin}
              placeholder="••••"
              className="w-full text-center tracking-[0.75em] font-mono text-lg font-bold bg-slate-950/80 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl h-12 text-white placeholder-slate-700"
            />
            <div className="absolute right-3 top-3.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-1.5 text-[10px] text-red-400 font-medium bg-red-950/20 border border-red-500/10 p-2 rounded-lg"
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tactical PIN Pad Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="h-11 bg-slate-800/40 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-slate-700 active:bg-slate-900 rounded-xl font-bold text-slate-300 text-xs transition-all active:scale-95 flex items-center justify-center font-mono"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="h-11 bg-slate-800/10 hover:bg-slate-800/20 border border-transparent hover:border-slate-800 rounded-xl font-bold text-slate-500 text-[10px] uppercase tracking-wider transition-all flex items-center justify-center"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="h-11 bg-slate-800/40 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-slate-700 active:bg-slate-900 rounded-xl font-bold text-slate-300 text-xs transition-all active:scale-95 flex items-center justify-center font-mono"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="h-11 bg-slate-800/10 hover:bg-slate-800/20 border border-transparent hover:border-slate-800 rounded-xl font-bold text-slate-500 text-xs transition-all flex items-center justify-center"
              title="Backspace"
            >
              ⌫
            </button>
          </div>

          <button
            type="submit"
            disabled={!pin}
            className="w-full h-11 bg-red-600 hover:bg-red-500 disabled:bg-slate-800/50 disabled:text-slate-600 disabled:border-transparent text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-red-500/20 hover:border-red-400 transition-all shadow-lg shadow-red-950/20 active:scale-98"
          >
            <span>Verify Passcode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between w-full border-t border-slate-800/80 pt-4 text-[10px] text-slate-500 font-mono">
          <span>Demo PIN: <strong className="text-slate-400">{approvalPin}</strong></span>
          <button 
            onClick={logout}
            className="text-slate-400 hover:text-red-400 font-semibold transition-colors"
          >
            Force Sign Out
          </button>
        </div>
      </div>

      {/* Bottom Footer block */}
      <div className="text-center pb-4 z-10 text-[9px] text-slate-500 font-mono">
        &copy; 2026 VGot You SECURE SHELL. Encrypted with AES-256 standard.
      </div>

    </div>
  );
};
