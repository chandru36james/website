import React, { useState, useEffect } from 'react';
import { UserManagementView } from './UserManagementView';
import { AuditView } from './AuditView';
import { RuleEngineView } from './RuleEngineView';
import { 
  UserCheck, History, Settings2, ShieldAlert, Trash2, Shield, RefreshCw, 
  AlertTriangle, ChevronRight, ArrowLeft, ShieldCheck, KeyRound, Smartphone, 
  Mail, Timer, Check, Loader2, Calendar, HardDrive, Building2, Plus, Trash
} from 'lucide-react';
import { useVFMS } from '../context/VFMSContext';
import { useToast } from './ToastProvider';

export const SettingsView: React.FC = () => {
  const { 
    userRole, wipeDatabase, seedDatabase, isLoading, securityPolicy, updateSecurityPolicy, 
    approvalPin, updateApprovalPin, currentUser, setupUserApprovalPin, changeUserApprovalPin,
    forgotApprovalPinRequestOTP, verifyOTPAndResetPin, pinResetAudits, updateUserProfileFields,
    updateAdminCredentials, branches, addBranch, deleteBranch
  } = useVFMS();
  const { toast } = useToast();
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'branches' | 'audit' | 'rules' | 'security' | 'danger'>(
    userRole === 'Auditor' ? 'audit' : userRole === 'Manager' ? 'security' : 'users'
  );

  // Mobile navigation drill down status
  const [isMobileSubTabOpen, setIsMobileSubTabOpen] = useState(false);

  // Danger zone states
  const [wipeConfirm, setWipeConfirm] = useState('');
  const [isWiping, setIsWiping] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Security states
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [pinViewMode, setPinViewMode] = useState<'status' | 'change' | 'forgot'>('status');
  
  // Forgot PIN recovery states
  const [recoveryMethod, setRecoveryMethod] = useState<'mobile' | 'email'>('mobile');
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1);
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isResettingPin, setIsResettingPin] = useState(false);
  const [autoLockMin, setAutoLockMin] = useState(String(securityPolicy?.autoLockTimeoutMinutes || 15));

  // Recovery Profile states
  const [recoveryName, setRecoveryName] = useState(currentUser?.displayName || '');
  const [recoveryPhone, setRecoveryPhone] = useState(currentUser?.phone || '');
  const [recoveryEmail, setRecoveryEmail] = useState(currentUser?.email || '');
  const [recoveryPassword, setRecoveryPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Branch Management states
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchCode, setNewBranchCode] = useState('');
  const [isAddingBranch, setIsAddingBranch] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setRecoveryPhone(currentUser.phone || '');
      setRecoveryEmail(currentUser.email || '');
      setRecoveryName(currentUser.displayName || '');
      setRecoveryPassword('');
    }
  }, [currentUser]);

  const handleUpdateRecoveryContact = async () => {
    if (!currentUser) return;
    if (!recoveryName.trim()) {
      toast.error('Name Required', 'Please enter your full name.');
      return;
    }
    if (!recoveryEmail.trim()) {
      toast.error('Email Required', 'Please enter a valid email address.');
      return;
    }
    if (!recoveryPhone.trim()) {
      toast.error('Mobile Number Required', 'Please enter a valid mobile number for OTP.');
      return;
    }
    if (recoveryPassword && recoveryPassword.trim().length < 6) {
      toast.error('Weak Password', 'New password must be at least 6 characters long.');
      return;
    }

    setIsUpdatingProfile(true);
    try {
      // 1. Update Firebase Auth (if applicable) and user profile fields
      await updateAdminCredentials(
        recoveryName.trim(),
        recoveryEmail.trim().toLowerCase(),
        recoveryPassword.trim() || undefined
      );

      // 2. Also update phone number in profile fields
      await updateUserProfileFields(currentUser.uid, {
        phone: recoveryPhone.trim()
      });

      toast.success('Account Updated', 'Your profile details and recovery settings have been successfully saved.');
      setRecoveryPassword(''); // Clear password field
    } catch (err: any) {
      toast.error('Update Failed', err.message || 'Failed to update account details.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (userRole !== 'Super Admin' && userRole !== 'Manager' && userRole !== 'Auditor') {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center py-16 flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 stroke-[1.25]" />
        <h3 className="text-sm font-bold text-slate-800">Access Restricted</h3>
        <p className="text-xs text-slate-500 max-w-xs">You do not have clearance to view administrative control registries.</p>
      </div>
    );
  }

  const handleWipe = async () => {
    if (wipeConfirm !== 'WIPE ALL DATA') {
      toast.error('Confirmation Required', 'Type WIPE ALL DATA exactly to confirm.');
      return;
    }
    setIsWiping(true);
    try {
      await wipeDatabase();
      toast.success('Database Wiped', 'All customer data, loans, payments, and expenses have been cleared.');
      setWipeConfirm('');
    } catch (err: any) {
      toast.error('Wipe Failed', err.message || 'An error occurred while wiping the database.');
    } finally {
      setIsWiping(false);
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      toast.success('Demo Data Loaded', 'Sample customers, loans, and payment schedules have been seeded.');
    } catch (err: any) {
      toast.error('Seed Failed', err.message || 'An error occurred while seeding demo data.');
    } finally {
      setIsSeeding(false);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleCreatePin = async () => {
    if (newPin !== confirmPin) {
      toast.error('PIN Mismatch', 'PINs do not match. Please check.');
      return;
    }
    try {
      await setupUserApprovalPin(newPin);
      toast.success('PIN Setup Successful', 'Your Approval PIN has been created.');
      setNewPin('');
      setConfirmPin('');
      setPinViewMode('status');
    } catch (err: any) {
      toast.error('Setup Failed', err.message);
    }
  };

  const handleChangePin = async () => {
    if (newPin !== confirmPin) {
      toast.error('PIN Mismatch', 'New PINs do not match.');
      return;
    }
    try {
      await changeUserApprovalPin(currentPin, newPin);
      toast.success('PIN Updated', 'Your Approval PIN has been changed successfully.');
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      setPinViewMode('status');
    } catch (err: any) {
      toast.error('Change Failed', err.message);
    }
  };

  const handleRequestOtp = async () => {
    setIsRequestingOtp(true);
    try {
      const res = await forgotApprovalPinRequestOTP(recoveryMethod);
      if (res.success) {
        toast.success('OTP Dispatched', res.message || 'OTP sent successfully.');
        setRecoveryStep(2);
        setOtpTimer(60);
        setResendDisabled(true);
      }
    } catch (err: any) {
      toast.error('OTP Request Failed', err.message);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleResetPin = async () => {
    if (newPin !== confirmPin) {
      toast.error('PIN Mismatch', 'New PINs do not match.');
      return;
    }
    setIsResettingPin(true);
    try {
      await verifyOTPAndResetPin(otpValue, newPin);
      toast.success('PIN Reset Successful', 'Your PIN has been reset. You have been logged out.');
    } catch (err: any) {
      toast.error('Reset Failed', err.message);
    } finally {
      setIsResettingPin(false);
    }
  };

  const handleAutoLockUpdate = () => {
    const mins = parseInt(autoLockMin);
    if (isNaN(mins) || mins < 1) {
      toast.error('Invalid Value', 'Auto-lock timeout must be at least 1 minute.');
      return;
    }
    updateSecurityPolicy({ autoLockTimeoutMinutes: mins });
    toast.success('Security Updated', `Auto-lock set to ${mins} minutes.`);
  };

  const tabs = [
    ...(userRole === 'Super Admin' ? [
      { id: 'users', label: 'User Access', icon: <UserCheck className="w-3.5 h-3.5" /> },
      { id: 'branches', label: 'Branches', icon: <Building2 className="w-3.5 h-3.5" /> },
      { id: 'rules', label: 'Business Rules', icon: <Settings2 className="w-3.5 h-3.5" /> },
    ] : []),
    ...(userRole === 'Super Admin' || userRole === 'Manager' ? [
      { id: 'security', label: 'Security', icon: <Shield className="w-3.5 h-3.5" /> },
    ] : []),
    ...(userRole === 'Super Admin' ? [
      { id: 'danger', label: 'Danger Zone', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true },
    ] : []),
    ...(userRole === 'Super Admin' || userRole === 'Manager' || userRole === 'Auditor' ? [
      { id: 'audit', label: 'Audit Logs', icon: <History className="w-3.5 h-3.5" /> },
    ] : []),
  ] as { id: 'users' | 'branches' | 'audit' | 'rules' | 'security' | 'danger' | 'branches'; label: string; icon: React.ReactNode; danger?: boolean }[];

  const renderSecurityPanel = () => {
    const hasPin = !!currentUser?.approvalPin;
    const isResetRequired = !!currentUser?.approvalPinResetRequired;
    const isFirstTime = !hasPin || isResetRequired;

    // Filter audits related to this user or generally for administrators
    const relatedAudits = pinResetAudits.filter(a => a.companyId === currentUser?.companyId);

    return (
      <div className="space-y-5">
        
        {/* ── CARD 1: PIN STATUS / SETUP ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600 animate-pulse" />
                Approval PIN Settings
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Manage secure transaction auth passcode codes used for loans, waivers, and EOD closings.</p>
            </div>
            <div>
              {isFirstTime ? (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Not Configured
                </span>
              ) : (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Active Badge
                </span>
              )}
            </div>
          </div>

          {/* First Time / Reset Required Setup */}
          {isFirstTime ? (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-[11px] text-indigo-800 leading-relaxed font-semibold">
                Approval PIN is required to approve loans, waivers, and perform daily cash closings.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">New Approval PIN</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      maxLength={8}
                      value={newPin}
                      onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Confirm New PIN</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      maxLength={8}
                      value={confirmPin}
                      onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleCreatePin}
                disabled={!newPin || !confirmPin}
                className="btn btn-primary px-4 py-2 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Create PIN Code</span>
              </button>
            </div>
          ) : (
            /* PIN Exists - Show security summary card */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-4 border border-slate-100 rounded-xl text-[11px] text-slate-600">
                <div className="space-y-1.5">
                  <p className="font-semibold"><span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block">Last Changed</span> {currentUser?.approvalPinLastChanged ? new Date(currentUser.approvalPinLastChanged).toLocaleString() : 'System Seeded'}</p>
                  <p className="font-semibold"><span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block">Changed By</span> {currentUser?.approvalPinLastChangedBy || 'Admin'}</p>
                </div>
                <div className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-4">
                  <p className="font-semibold"><span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block">Device Binding</span> {navigator.userAgent.split(' ')[0] || 'Web Browser'}</p>
                  <p className="font-semibold"><span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block">Security Level</span> High (OTP Recovery Configured)</p>
                </div>
              </div>

              {pinViewMode === 'status' && (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setPinViewMode('change')}
                    className="btn bg-white hover:bg-slate-50 text-slate-700 border border-slate-350 px-4 py-2 text-xs font-black rounded-lg cursor-pointer transition-colors shadow-xs"
                  >
                    Change Approval PIN
                  </button>
                  <button
                    onClick={() => {
                      setPinViewMode('forgot');
                      setRecoveryStep(1);
                      setOtpValue('');
                      setNewPin('');
                      setConfirmPin('');
                    }}
                    className="btn bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 px-4 py-2 text-xs font-black rounded-lg cursor-pointer transition-colors shadow-xs"
                  >
                    Forgot Approval PIN?
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── CARD 1.5: ACCOUNT & RECOVERY PROFILE SETTINGS ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              Account & Recovery Profile
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Manage your administrator profile details, secure password, and registered recovery details.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Administrator Name</label>
              <input
                type="text"
                value={recoveryName}
                onChange={e => setRecoveryName(e.target.value)}
                placeholder="VGot You Admin"
                className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Recovery Mobile (OTP)</label>
              <input
                type="tel"
                value={recoveryPhone}
                onChange={e => setRecoveryPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Login Email Address</label>
              <input
                type="email"
                value={recoveryEmail}
                onChange={e => setRecoveryEmail(e.target.value)}
                placeholder="admin@vfms.com"
                className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">New Password (Leave blank to keep current)</label>
              <input
                type="password"
                value={recoveryPassword}
                onChange={e => setRecoveryPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
            </div>
          </div>
          <button
            onClick={handleUpdateRecoveryContact}
            disabled={isUpdatingProfile}
            className="btn btn-primary px-4 py-2 flex items-center gap-1.5"
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving Credentials...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Save Account Settings</span>
              </>
            )}
          </button>
        </div>

        {/* ── CARD 2: CHANGE PIN VIEW ── */}
        {pinViewMode === 'change' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 animate-slide-in">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-indigo-500" />
                  Change Approval PIN
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Please verify your current PIN code and input your new passcode.</p>
              </div>
              <button
                onClick={() => {
                  setPinViewMode('status');
                  setCurrentPin('');
                  setNewPin('');
                  setConfirmPin('');
                }}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-bold cursor-pointer underline"
              >
                Back to Status
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Current PIN</label>
                <input
                  type="password"
                  maxLength={8}
                  value={currentPin}
                  onChange={e => setCurrentPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">New PIN</label>
                <input
                  type="password"
                  maxLength={8}
                  value={newPin}
                  onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Confirm New PIN</label>
                <input
                  type="password"
                  maxLength={8}
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleChangePin}
                disabled={!currentPin || !newPin || !confirmPin}
                className="btn btn-primary px-4 py-2"
              >
                Update PIN Code
              </button>
              <button
                onClick={() => {
                  setPinViewMode('status');
                  setCurrentPin('');
                  setNewPin('');
                  setConfirmPin('');
                }}
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── CARD 3: FORGOT PIN OTP RECOVERY ── */}
        {pinViewMode === 'forgot' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4 animate-slide-in">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-indigo-500" />
                  Approval PIN Identity Recovery
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Securely verify your identity using OTP code credentials to bypass your forgotten PIN.</p>
              </div>
              <button
                onClick={() => {
                  setPinViewMode('status');
                  setOtpValue('');
                  setNewPin('');
                  setConfirmPin('');
                }}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-bold cursor-pointer underline"
              >
                Back to Status
              </button>
            </div>

            {/* Step 1: Select recovery channel & send OTP */}
            {recoveryStep === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2 max-w-sm">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Choose Verification Channel</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setRecoveryMethod('mobile')}
                      className={`p-3 rounded-lg border text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        recoveryMethod === 'mobile' 
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 font-black' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-[10px]">Mobile OTP ({currentUser?.phone || '98765•••••'})</span>
                    </button>
                    <button
                      onClick={() => setRecoveryMethod('email')}
                      className={`p-3 rounded-lg border text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        recoveryMethod === 'email' 
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 font-black' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-[10px]">Email OTP ({currentUser?.email ? `${currentUser.email.substring(0, 3)}••••@${currentUser.email.split('@')[1]}` : 'Admin Address'})</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleRequestOtp}
                  disabled={isRequestingOtp}
                  className="btn btn-primary px-4 py-2 flex items-center gap-1.5"
                >
                  {isRequestingOtp ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating OTP...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Request Secure OTP</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Step 2: Verify OTP & Input New PIN */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Enter OTP Code</label>
                      {otpTimer > 0 ? (
                        <span className="text-[9px] text-amber-600 font-mono flex items-center gap-0.5">
                          <Timer className="w-3 h-3" /> {otpTimer}s
                        </span>
                      ) : (
                        <button
                          onClick={handleRequestOtp}
                          className="text-[9px] text-indigo-600 font-black underline cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={e => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 123456"
                      className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Choose New PIN</label>
                    <input
                      type="password"
                      maxLength={8}
                      value={newPin}
                      onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Confirm New PIN</label>
                    <input
                      type="password"
                      maxLength={8}
                      value={confirmPin}
                      onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-mono text-center tracking-widest focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleResetPin}
                    disabled={!otpValue || !newPin || !confirmPin || isResettingPin}
                    className="btn btn-primary px-4 py-2 flex items-center gap-1.5"
                  >
                    {isResettingPin ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Reset Approval PIN</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setRecoveryStep(1)}
                    className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CARD 4: POLICIES (AUTO-LOCK & ACTION PIN GUARD) ── */}
        {userRole === 'Super Admin' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Timeout */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-amber-500 animate-pulse" />
                  Auto-Lock Timeout
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Terminal locks automatically after minutes of inactivity.</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={autoLockMin}
                  onChange={e => setAutoLockMin(e.target.value)}
                  className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-300 text-center bg-white text-slate-800"
                />
                <span className="text-slate-500 font-semibold">minutes</span>
                <button
                  onClick={handleAutoLockUpdate}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Action Guard Switch */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3 flex flex-col justify-between">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  PIN Guard on Actions
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Enforces PIN authorization entry on sensitive transactions.</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => updateSecurityPolicy({ pinRequiredForActions: !securityPolicy?.pinRequiredForActions })}
                  className={`relative inline-block w-11 h-6 rounded-full cursor-pointer transition-colors ${securityPolicy?.pinRequiredForActions ? 'bg-red-500' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${securityPolicy?.pinRequiredForActions ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="font-bold text-xs text-slate-700">
                  {securityPolicy?.pinRequiredForActions ? 'Enforce on approvals' : 'Waivers unchecked'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ── CARD 5: SECURITY HISTORY AUDIT TRAIL (Super Admins / Auditors only) ── */}
        {(userRole === 'Super Admin' || userRole === 'Auditor') && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-500" />
                PIN Security Audit History
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Immutable record of Approval PIN updates, resets, and OTP authentications.</p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">User Profile</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Verification Method</th>
                    <th className="p-3">Device / Terminal</th>
                    <th className="p-3">Operator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {relatedAudits.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 font-mono">
                        No security audit events recorded.
                      </td>
                    </tr>
                  ) : (
                    relatedAudits.map(audit => (
                      <tr key={audit.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                        <td className="p-3 whitespace-nowrap text-slate-500 font-mono">{new Date(audit.createdAt).toLocaleString()}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-800">{audit.userName}</div>
                          <div className="text-[9px] text-slate-400 font-mono">{audit.userEmail}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider ${
                            audit.action === 'Created' 
                              ? 'bg-blue-50 text-blue-700' 
                              : audit.action === 'Changed' 
                                ? 'bg-indigo-50 text-indigo-700' 
                                : 'bg-red-50 text-red-700'
                          }`}>
                            {audit.action}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">{audit.method}</td>
                        <td className="p-3 text-slate-500 max-w-[150px] truncate" title={audit.device}>{audit.device.split(' ')[0]} ({audit.ipAddress})</td>
                        <td className="p-3 text-slate-700 font-bold">{audit.updatedBy}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    );
  };

  const renderDangerPanel = () => (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-black text-red-800">Danger Zone — Irreversible Actions</h3>
          <p className="text-[11px] text-red-600 mt-0.5">These operations cannot be undone. Proceed only if you know exactly what you are doing.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-500" />
              Load Demo Data
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Seeds the system with sample customers, loans, and payment history for demonstration.</p>
          </div>
          <button
            onClick={handleSeed}
            disabled={isSeeding || isLoading}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-black rounded-xl cursor-pointer transition-colors whitespace-nowrap shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            {isSeeding ? 'Loading...' : 'Load Demo Data'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm p-5 space-y-4">
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-black text-red-800">Wipe All Data</h3>
            <p className="text-[11px] text-red-500 mt-0.5 leading-relaxed">
              Permanently deletes all customers, loans, payment records, expenses, cash books, and visits from both local storage and Firestore cloud. <strong>This cannot be undone.</strong>
            </p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 space-y-2">
          <label className="text-[10px] font-black text-red-700 uppercase tracking-wider block">
            Type WIPE ALL DATA to confirm
          </label>
          <input
            type="text"
            value={wipeConfirm}
            onChange={e => setWipeConfirm(e.target.value)}
            placeholder="WIPE ALL DATA"
            className="w-full border-2 border-red-200 focus:border-red-500 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none bg-white text-red-800 placeholder-red-300"
          />
        </div>
        <button
          onClick={handleWipe}
          disabled={wipeConfirm !== 'WIPE ALL DATA' || isWiping || isLoading}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black rounded-xl cursor-pointer transition-colors shadow-sm"
        >
          <Trash2 className={`w-3.5 h-3.5 ${isWiping ? 'animate-spin' : ''}`} />
          {isWiping ? 'Wiping...' : 'Wipe All Data Permanently'}
        </button>
      </div>
    </div>
  );

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName.trim() || !newBranchCode.trim()) {
      toast.error('Required Fields', 'Please enter branch name and code.');
      return;
    }
    setIsAddingBranch(true);
    try {
      await addBranch(newBranchName.trim(), newBranchCode.trim().toUpperCase());
      toast.success('Branch Added', `Successfully created branch: ${newBranchName}`);
      setNewBranchName('');
      setNewBranchCode('');
    } catch (err: any) {
      toast.error('Addition Failed', err.message);
    } finally {
      setIsAddingBranch(false);
    }
  };

  const handleDeleteBranch = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete branch "${name}"?`)) return;
    try {
      await deleteBranch(id);
      toast.success('Branch Deleted', `Successfully deleted branch: ${name}`);
    } catch (err: any) {
      toast.error('Deletion Failed', err.message);
    }
  };

  const renderBranchPanel = () => {
    return (
      <div className="space-y-5">
        {/* Branch Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              Add New Branch Office
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Register a new physical office center or service branch location.</p>
          </div>
          
          <form onSubmit={handleAddBranch} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl items-end">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Branch Name</label>
              <input
                type="text"
                value={newBranchName}
                onChange={e => setNewBranchName(e.target.value)}
                placeholder="e.g. North Side Hub"
                className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Branch Code</label>
              <input
                type="text"
                value={newBranchCode}
                onChange={e => setNewBranchCode(e.target.value)}
                placeholder="e.g. VY-N04"
                className="w-full px-3 py-2 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
            </div>
            <button
              type="submit"
              disabled={isAddingBranch}
              className="btn btn-primary px-4 py-2 flex items-center justify-center gap-1.5 h-[34px] w-full sm:w-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Branch</span>
            </button>
          </form>
        </div>

        {/* Branch List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" />
              Active Branch Locations Directory
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Directory list of all registered business branch locations.</p>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-3">Branch ID</th>
                  <th className="p-3">Branch Name</th>
                  <th className="p-3">Branch Code</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map(branch => (
                  <tr key={branch.id} className="hover:bg-slate-50/50 transition-colors font-medium">
                    <td className="p-3 text-slate-500 font-mono">{branch.id}</td>
                    <td className="p-3 font-bold text-slate-800">{branch.name}</td>
                    <td className="p-3 text-slate-650 font-mono font-bold">{branch.code}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteBranch(branch.id, branch.name)}
                        disabled={branches.length <= 1}
                        className="p-1 text-red-500 hover:text-red-700 disabled:opacity-30 cursor-pointer"
                        title="Delete Branch"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderActivePanel = () => {
    switch (activeSubTab) {
      case 'users':
        return userRole === 'Super Admin' ? <UserManagementView /> : null;
      case 'branches':
        return userRole === 'Super Admin' ? renderBranchPanel() : null;
      case 'rules':
        return userRole === 'Super Admin' ? <RuleEngineView /> : null;
      case 'audit':
        return <AuditView />;
      case 'security':
        return (userRole === 'Super Admin' || userRole === 'Manager') ? renderSecurityPanel() : null;
      case 'danger':
        return userRole === 'Super Admin' ? renderDangerPanel() : null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 animate-fade-in text-xs">

      {/* ── 1. DESKTOP VIEW (hidden md:block) ── */}
      <div className="hidden md:block space-y-4">
        {/* Settings Navigation Bar */}
        <div className="bg-white p-3 rounded-[10px] border border-slate-200 flex gap-2 flex-wrap shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === tab.id
                  ? tab.danger
                    ? 'bg-red-600 text-white border border-red-700'
                    : 'bg-red-50/50 text-red-700 font-black border border-red-100'
                  : tab.danger
                    ? 'text-red-500 hover:bg-red-50 border border-transparent'
                    : 'text-slate-500 hover:bg-slate-50 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Panel */}
        <div>
          {renderActivePanel()}
        </div>
      </div>

      {/* ── 2. MOBILE VIEW (md:hidden) ── */}
      <div className="md:hidden space-y-4">
        {!isMobileSubTabOpen ? (
          <div className="space-y-3">
            {/* Greeting Header */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-sm font-black text-slate-800">Control Settings</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Select a category below to manage administrative controls.</p>
            </div>

            {/* Menu Lists */}
            <div className="bg-white rounded-xl border border-slate-250 overflow-hidden shadow-xs divide-y divide-slate-100">
              {tabs.map(tab => {
                let desc = '';
                let colorClass = '';
                if (tab.id === 'users') { desc = 'Manage team profiles, roles, and branch clearances'; colorClass = 'text-red-500 bg-red-50'; }
                else if (tab.id === 'rules') { desc = 'Configure lending rates, processing fees, and grace margins'; colorClass = 'text-blue-500 bg-blue-50'; }
                else if (tab.id === 'security') { desc = 'Manage screen timeouts, approval PIN codes, and guards'; colorClass = 'text-indigo-500 bg-indigo-50'; }
                else if (tab.id === 'danger') { desc = 'Perform database clearouts and system reset operations'; colorClass = 'text-orange-600 bg-orange-50'; }
                else if (tab.id === 'audit') { desc = 'Browse immutable trail logs and operator history'; colorClass = 'text-slate-500 bg-slate-50'; }

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveSubTab(tab.id);
                      setIsMobileSubTabOpen(true);
                    }}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-transparent ${colorClass}`}>
                        {tab.icon}
                      </span>
                      <div className="space-y-0.5 pr-2">
                        <h4 className={`font-bold text-xs ${tab.danger ? 'text-red-700' : 'text-slate-800'}`}>{tab.label}</h4>
                        <p className="text-[10px] text-slate-400 font-medium leading-tight">{desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mobile Subtab Header */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setIsMobileSubTabOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {tabs.find(t => t.id === activeSubTab)?.label}
                </h2>
              </div>
            </div>

            {/* Active Panel Container */}
            <div className="animate-fade-in">
              {renderActivePanel()}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
