import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { UserRole, UserProfile } from '../types';
import { ShieldCheck, Search, ShieldAlert, Users, Building, Activity, Shield, ArrowRight, UserCheck, UserPlus, Mail, Key, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const UserManagementView: React.FC = () => {
  const { 
    userProfiles, updateUserAccess, currentUser, branches, auditLogs,
    securityPolicy, updateSecurityPolicy, approvalPin, updateApprovalPin,
    isFirestoreMode, toggleStorageMode, registerNewUser, adminResetUserPin,
    toggleUserPinDisabled
  } = useVFMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [newPinCode, setNewPinCode] = useState(approvalPin);
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New user registration state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Loan Officer');
  const [branchId, setBranchId] = useState(branches[0]?.id || 'main-branch');
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Admin PIN Reset States
  const [resetTargetUser, setResetTargetUser] = useState<UserProfile | null>(null);
  const [adminSecretInput, setAdminSecretInput] = useState('');
  const [isResettingPin, setIsResettingPin] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleResetUserPin = async () => {
    if (!resetTargetUser) return;
    setResetError(null);
    setIsResettingPin(true);
    try {
      await adminResetUserPin(resetTargetUser.uid, adminSecretInput);
      setSuccessMsg(`Approval PIN for ${resetTargetUser.displayName} has been reset. They must configure a new PIN on next login.`);
      setResetTargetUser(null);
      setAdminSecretInput('');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setResetError(err.message || 'Verification failed.');
    } finally {
      setIsResettingPin(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError("A valid email address is required.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    setIsCreatingUser(true);
    try {
      await registerNewUser(fullName.trim(), email.trim().toLowerCase(), password, role, branchId);
      setSuccessMsg(`User account for ${fullName} created successfully!`);
      setFullName('');
      setEmail('');
      setPassword('');
      setRole('Loan Officer');
      setBranchId(branches[0]?.id || 'main-branch');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setFormError(err?.message || "Failed to create user account.");
    } finally {
      setIsCreatingUser(false);
    }
  };

  // Security check: Guard this view
  if (currentUser?.role !== 'Super Admin') {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto my-12 shadow-sm">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-slate-500 mb-6">
          Only users with the <span className="font-semibold text-slate-900">Super Admin</span> role are authorized to manage user privileges and edit roles.
        </p>
      </div>
    );
  }

  // Filter profiles based on search query
  const filteredProfiles = userProfiles.filter(profile => {
    const term = searchTerm.toLowerCase();
    return (
      profile.displayName.toLowerCase().includes(term) ||
      profile.email.toLowerCase().includes(term) ||
      profile.role.toLowerCase().includes(term)
    );
  });

  // Calculate stats
  const totalUsers = userProfiles.length;
  const adminCount = userProfiles.filter(u => u.role === 'Super Admin').length;
  const managerCount = userProfiles.filter(u => u.role === 'Manager').length;
  const otherCount = totalUsers - adminCount - managerCount;

  // Security/Auth audit logs
  const securityAudits = auditLogs.filter(log => log.module === 'Security' || log.module === 'Auth');

  const handleRoleChange = async (userId: string, role: UserRole, branchId: string) => {
    setUpdatingUserId(userId);
    setSuccessMsg(null);
    try {
      await updateUserAccess(userId, role, branchId);
      setSuccessMsg('User access controls updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleBranchChange = async (userId: string, role: UserRole, branchId: string) => {
    setUpdatingUserId(userId);
    setSuccessMsg(null);
    try {
      await updateUserAccess(userId, role, branchId);
      setSuccessMsg('User branch routing updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-emerald-600" />
            User Access Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Audit system operations, update employee branch routings, and configure RBAC authorization policies.
          </p>
        </div>
      </div>

      {/* Stats Cards Dashboard Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">Total Users</div>
            <div className="text-xl font-bold text-slate-900">{totalUsers}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">Super Admins</div>
            <div className="text-xl font-bold text-slate-900">{adminCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">Branch Managers</div>
            <div className="text-xl font-bold text-slate-900">{managerCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">Operators & Auditors</div>
            <div className="text-xl font-bold text-slate-900">{otherCount}</div>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-3 flex gap-2 items-center shadow-sm">
          <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <UserCheck className="h-3 w-3" />
          </div>
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Profiles and Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Users List & Management */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            
            {/* Table Header Controls */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 text-sm">System Access Control Directory</h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter users, roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* User Profiles Table */}
            <div className="overflow-x-auto">
              {filteredProfiles.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  No registered users matched the active filters.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                  <thead className="bg-slate-50/30 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left font-bold">User Information</th>
                      <th scope="col" className="px-4 py-3 text-left font-bold">Assign Role</th>
                      <th scope="col" className="px-4 py-3 text-left font-bold">Assign Branch</th>
                      <th scope="col" className="px-4 py-3 text-center font-bold">PIN Status</th>
                      <th scope="col" className="px-4 py-3 text-right font-bold">Session ID</th>
                      <th scope="col" className="px-4 py-3 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredProfiles.map((profile) => {
                      const isMe = currentUser?.uid === profile.uid;
                      const isUpdating = updatingUserId === profile.uid;

                      return (
                        <tr key={profile.uid} className={`hover:bg-slate-50/30 transition-colors ${isMe ? 'bg-indigo-50/20' : ''}`}>
                          
                          {/* User Details */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600 border border-slate-200 relative uppercase shrink-0">
                                {profile.displayName.substring(0, 2)}
                                {isMe && (
                                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Account" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                                  {profile.displayName}
                                  {isMe && <span className="text-[9px] bg-indigo-500/10 text-indigo-500 font-mono px-1 rounded">You</span>}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">{profile.email}</span>
                              </div>
                            </div>
                          </td>

                          {/* Role Selector */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <select
                              value={profile.role}
                              onChange={(e) => handleRoleChange(profile.uid, e.target.value as UserRole, profile.branchId)}
                              disabled={isUpdating}
                              className={`bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                                profile.role === 'Super Admin' ? 'border-red-200 text-red-700 bg-red-50/50 hover:bg-red-50' :
                                profile.role === 'Manager' ? 'border-amber-200 text-amber-700 bg-amber-50/50 hover:bg-amber-50' :
                                profile.role === 'Loan Officer' ? 'border-sky-200 text-sky-700 bg-sky-50/50 hover:bg-sky-50' :
                                'border-slate-200 text-slate-700'
                              }`}
                            >
                              <option value="Super Admin">Super Admin</option>
                              <option value="Manager">Manager</option>
                              <option value="Loan Officer">Loan Officer</option>
                              <option value="Accountant">Accountant</option>
                              <option value="Auditor">Auditor</option>
                            </select>
                          </td>

                          {/* Branch Selector */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <select
                              value={profile.branchId}
                              onChange={(e) => handleBranchChange(profile.uid, profile.role, e.target.value)}
                              disabled={isUpdating}
                              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-[11px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                            >
                              {branches.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                            </select>
                          </td>

                          {/* PIN Status */}
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {profile.pinDisabled ? (
                              <span className="px-2 py-0.5 text-[9px] bg-slate-100 text-slate-500 border border-slate-200 font-bold rounded-md uppercase tracking-wider">
                                Disabled
                              </span>
                            ) : profile.approvalPinResetRequired ? (
                              <span className="px-2 py-0.5 text-[9px] bg-red-50 text-red-700 border border-red-150 font-bold rounded-md uppercase tracking-wider">
                                Reset Required
                              </span>
                            ) : profile.approvalPin ? (
                              <span className="px-2 py-0.5 text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-150 font-bold rounded-md uppercase tracking-wider">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-[9px] bg-slate-100 text-slate-500 border border-slate-200 font-bold rounded-md uppercase tracking-wider">
                                Not Configured
                              </span>
                            )}
                          </td>

                          {/* Metadata UID */}
                          <td className="px-4 py-4 whitespace-nowrap text-right font-mono text-[10px] text-slate-400">
                            {profile.uid.substring(0, 10)}...
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            {!isMe && (
                              <div className="flex justify-end gap-1.5">
                                {(profile.role === 'Super Admin' || profile.role === 'Manager') && (
                                  <>
                                    <button
                                      onClick={async () => {
                                        try {
                                          await toggleUserPinDisabled(profile.uid);
                                        } catch (err: any) {
                                          alert(err.message || 'Failed to toggle PIN status.');
                                        }
                                      }}
                                      className={`px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-md border transition-colors cursor-pointer ${
                                        profile.pinDisabled
                                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                                          : 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                                      }`}
                                    >
                                      {profile.pinDisabled ? 'Enable PIN' : 'Disable PIN'}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setResetTargetUser(profile);
                                        setAdminSecretInput('');
                                        setResetError(null);
                                      }}
                                      className="px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-md bg-red-50 text-red-750 hover:bg-red-100 border border-red-100 transition-colors cursor-pointer"
                                    >
                                      Reset PIN
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Security Compliance & Policies card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Security Compliance & Access Policies</h3>
                  <p className="text-[10px] text-slate-400">Configure terminal locks, sensitive record masking, and action passcodes.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
              
              {/* Policy: Sensitive Data Masking */}
              <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">Sensitive Data Masking</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">Mask Aadhaar, PAN, phone, and email in lists until Decrypted.</span>
                </div>
                <button
                  onClick={() => updateSecurityPolicy({ sensitiveDataMasking: !securityPolicy?.sensitiveDataMasking })}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    securityPolicy?.sensitiveDataMasking ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    securityPolicy?.sensitiveDataMasking ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Policy: Require PIN for Actions */}
              <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">Action Verification PIN</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">Require a supervisor authorization PIN before making core changes.</span>
                </div>
                <button
                  onClick={() => updateSecurityPolicy({ pinRequiredForActions: !securityPolicy?.pinRequiredForActions })}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    securityPolicy?.pinRequiredForActions ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    securityPolicy?.pinRequiredForActions ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Policy: Database Storage Mode Toggle */}
              <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">Database Storage Mode</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">
                    Switch between Live Cloud Firestore and Local Playground Sandbox.
                  </span>
                </div>
                <button
                  onClick={toggleStorageMode}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    isFirestoreMode ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    isFirestoreMode ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Policy: Supervisor passcode change */}
              <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">Supervisor Authorization PIN</span>
                  <span className="text-[10px] text-slate-400 block">Global PIN used to authorize secure actions.</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isEditingPin ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        maxLength={8}
                        value={newPinCode}
                        onChange={(e) => setNewPinCode(e.target.value.replace(/\D/g, ''))}
                        className="w-16 px-1.5 py-1 bg-white border border-slate-300 rounded-lg text-xs text-center font-bold font-mono text-slate-800 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (newPinCode.length >= 4) {
                            updateApprovalPin(newPinCode);
                            setIsEditingPin(false);
                          } else {
                            alert('PIN code must be at least 4 digits.');
                          }
                        }}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[10px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-slate-800 text-sm tracking-wider">••••</span>
                      <button
                        onClick={() => {
                          setNewPinCode(approvalPin);
                          setIsEditingPin(true);
                        }}
                        className="text-[10px] font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
                      >
                        Edit PIN
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SUBSECTION: ANTI-REVERSE ENGINEERING & ANTI-HACKING */}
              <div className="md:col-span-2 pt-3 border-t border-slate-150">
                <h4 className="font-bold text-red-600 text-xs uppercase tracking-wider mb-2">Anti-Reverse Engineering & Cyber Defense</h4>
              </div>

              {/* Policy: Disable Right Click */}
              <div className="p-3 border border-slate-100 bg-red-50/10 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 flex items-center gap-1.5">
                    Context Menu Suppression
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-normal">Disable right-click interaction to prevent browser inspector element selectors.</span>
                </div>
                <button
                  onClick={() => updateSecurityPolicy({ disableRightClick: !securityPolicy?.disableRightClick })}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    securityPolicy?.disableRightClick ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    securityPolicy?.disableRightClick ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Policy: Prevent DevTools Keys */}
              <div className="p-3 border border-slate-100 bg-red-50/10 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">Inspector Hotkey Locks</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">Lock inspector shortcut keys (F12, Ctrl+Shift+I, Ctrl+Shift+C) and View-Source (Ctrl+U).</span>
                </div>
                <button
                  onClick={() => updateSecurityPolicy({ preventDevTools: !securityPolicy?.preventDevTools })}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    securityPolicy?.preventDevTools ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    securityPolicy?.preventDevTools ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Policy: Active Anti-Debugger Shield */}
              <div className="p-3 border border-slate-100 bg-red-50/10 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">Debugger Pausing Trap</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">Inject high-frequency debugging statements to crash/halt any active developer console step-tracer.</span>
                </div>
                <button
                  onClick={() => updateSecurityPolicy({ antiDebuggerShield: !securityPolicy?.antiDebuggerShield })}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    securityPolicy?.antiDebuggerShield ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    securityPolicy?.antiDebuggerShield ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Policy: DOM Tampering Observer */}
              <div className="p-3 border border-slate-100 bg-red-50/10 rounded-xl flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[11px] text-slate-900 block">DOM Integrity Guard</span>
                  <span className="text-[10px] text-slate-400 block leading-normal">Use standard MutationObserver to monitor manual HTML element tampering (Inspect Element value fakes) and auto-lock terminal.</span>
                </div>
                <button
                  onClick={() => updateSecurityPolicy({ domIntegrityCheck: !securityPolicy?.domIntegrityCheck })}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 cursor-pointer ${
                    securityPolicy?.domIntegrityCheck ? 'bg-red-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    securityPolicy?.domIntegrityCheck ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Security Audit Log Feed */}
        <div className="lg:col-span-4 space-y-4">

          {/* Add New User Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 animate-fade-in text-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <UserPlus className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Register Team Account</h3>
                <p className="text-[10px] text-slate-400">Add credentials for a new teammate or manager.</p>
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[10px] text-red-700 font-semibold flex items-start gap-1.5 animate-fade-in">
                <ShieldAlert className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="form-label font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="form-label font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. manager@vfms.com"
                    className="form-input"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="form-label font-bold text-slate-700">Secure Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="form-input"
                  />
                  <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Select Role and Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="form-input bg-slate-50 hover:bg-slate-100 cursor-pointer font-medium"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Loan Officer">Loan Officer</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="form-label font-bold text-slate-700">Branch</label>
                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="form-input bg-slate-50 hover:bg-slate-100 cursor-pointer font-medium"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isCreatingUser}
                className="btn btn-primary w-full py-2 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
              >
                {isCreatingUser ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Registering Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Register Account</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100 shrink-0">
              <Shield className="h-5 w-5 text-indigo-600" />
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Privilege Audit Feed</h3>
                <p className="text-[10px] text-slate-400 font-sans">Real-time access changes & active role tracking.</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[500px]">
              {securityAudits.length === 0 ? (
                <div className="h-32 flex flex-col justify-center items-center text-slate-400 text-[10px] font-mono">
                  No access control modifications have been logged yet.
                </div>
              ) : (
                securityAudits.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col gap-1.5 text-[10px] leading-normal font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 uppercase tracking-wide font-mono text-[9px] px-1 rounded bg-slate-200/50 text-slate-600">
                        {log.action}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-slate-600 text-[10px] font-medium font-sans">
                      {log.reason || `Operator changed system privilege matrix.`}
                    </p>

                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[9px] bg-slate-100/50 p-1 rounded border border-slate-200/20">
                      <span className="truncate max-w-[80px] text-slate-500 font-bold">{log.userName}</span>
                      <ArrowRight className="h-2 w-2 shrink-0" />
                      <span className="text-indigo-600 shrink-0">{log.newValue}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Admin Reset User PIN Verification Modal */}
      {resetTargetUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 space-y-4 animate-scale-in">
            <div className="flex items-center gap-2.5 text-red-600">
              <div className="p-2 bg-red-50 rounded-lg">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950">Confirm PIN Reset</h3>
                <p className="text-[10px] text-slate-400">Target user: {resetTargetUser.displayName}</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Resetting this user's Approval PIN will clear their current passcode and force them to configure a new PIN on their next dashboard login session.
            </p>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Verify Admin Password or PIN</label>
              <input
                type="password"
                value={adminSecretInput}
                onChange={e => setAdminSecretInput(e.target.value)}
                placeholder="Enter password or your PIN"
                className="w-full px-3 py-2 border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg text-xs focus:outline-none bg-white text-slate-800"
              />
              {resetError && (
                <p className="text-[9px] text-red-600 font-bold mt-1 font-sans">{resetError}</p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleResetUserPin}
                disabled={!adminSecretInput || isResettingPin}
                className="btn bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg cursor-pointer px-4 py-2 flex items-center gap-1.5 disabled:opacity-60 transition-colors shadow-xs"
              >
                {isResettingPin ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  <span>Confirm Reset</span>
                )}
              </button>
              <button
                onClick={() => {
                  setResetTargetUser(null);
                  setAdminSecretInput('');
                  setResetError(null);
                }}
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2 text-xs font-black rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
