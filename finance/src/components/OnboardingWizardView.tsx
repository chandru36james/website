import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { useToast } from './ToastProvider';
import { Building2, UserCheck, ShieldCheck, Lock, Mail, KeyRound, Check, Loader2 } from 'lucide-react';

export const OnboardingWizardView: React.FC = () => {
  const { initializeSystem } = useVFMS();
  const { toast } = useToast();

  const [companyName, setCompanyName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [branchCode, setBranchCode] = useState('');

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [isInitializing, setIsInitializing] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const validateWeakPin = (pin: string) => {
    if (pin.length < 4 || pin.length > 8) return 'PIN must be between 4 and 8 digits.';
    const isRepeated = /^(\d)\1+$/.test(pin);
    if (isRepeated) return 'PIN cannot be repeated numbers (e.g. 1111).';
    const seq = '01234567890123456789';
    const revSeq = '98765432109876543210';
    if (seq.includes(pin) || revSeq.includes(pin)) return 'PIN cannot be a simple sequence (e.g. 1234 or 4321).';
    return null;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !branchName.trim() || !branchCode.trim()) {
      toast.error('Required Fields', 'Please fill in all organization and branch details.');
      return;
    }
    setStep(2);
  };

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim() || !adminEmail.trim() || !adminPassword.trim() || !adminPin.trim()) {
      toast.error('Required Fields', 'Please fill in all administrator account fields.');
      return;
    }
    if (adminPassword.length < 6) {
      toast.error('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }
    const pinErr = validateWeakPin(adminPin);
    if (pinErr) {
      toast.error('Weak PIN Code', pinErr);
      return;
    }
    if (adminPin !== confirmPin) {
      toast.error('PIN Mismatch', 'Approval PINs do not match.');
      return;
    }

    setIsInitializing(true);
    try {
      await initializeSystem(
        companyName.trim(),
        branchName.trim(),
        branchCode.trim().toUpperCase(),
        adminName.trim(),
        adminEmail.trim().toLowerCase(),
        adminPassword,
        adminPin
      );
      toast.success('System Initialized', 'Welcome! Your organization platform is ready to use.');
    } catch (err: any) {
      toast.error('Initialization Failed', err.message || 'An error occurred during onboarding.');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans antialiased relative overflow-hidden select-none">
      
      {/* Decorative Gradients (Red Brand Themed) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-800/10 blur-3xl" />

      <div className="w-full max-w-xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6 relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-750 flex items-center justify-center shadow-lg animate-pulse">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-black text-white uppercase tracking-wider">System Setup Wizard</h1>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto">Initialize your new tenant organization, operational branch, and root admin user.</p>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-center gap-2">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-red-600' : 'w-2 bg-slate-700'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-red-600' : 'w-2 bg-slate-700'}`} />
        </div>

        {step === 1 ? (
          /* STEP 1: ORGANIZATION & BRANCH SETUP */
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-700 pb-2">
              <Building2 className="w-4 h-4" />
              1. Organization & Branch Details
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company / Business Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. VGY Finance Ltd"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">First Branch Name</label>
                  <input
                    type="text"
                    required
                    value={branchName}
                    onChange={e => setBranchName(e.target.value)}
                    placeholder="e.g. Main Head Office"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Branch Code</label>
                  <input
                    type="text"
                    required
                    value={branchCode}
                    onChange={e => setBranchCode(e.target.value)}
                    placeholder="e.g. VY-M01"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-red-600 hover:bg-red-750 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Continue to Admin Account Setup
            </button>
          </form>
        ) : (
          /* STEP 2: ADMINISTRATOR SETUP */
          <form onSubmit={handleInitialize} className="space-y-4">
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-700 pb-2">
              <UserCheck className="w-4 h-4" />
              2. Root Administrator Credentials
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Admin Full Name</label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={e => setAdminName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Admin Login Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      placeholder="admin@vfms.com"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Login Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Secure Approval PIN</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      maxLength={8}
                      required
                      value={adminPin}
                      onChange={e => setAdminPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="4 to 8 digits"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner text-center font-mono tracking-widest"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Confirm PIN Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      maxLength={8}
                      required
                      value={confirmPin}
                      onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="Re-enter PIN"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-red-600 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner text-center font-mono tracking-widest"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 border border-slate-700 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isInitializing}
                className="w-2/3 py-3 bg-red-600 hover:bg-red-750 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isInitializing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Configuring tenant...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Initialize System</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
