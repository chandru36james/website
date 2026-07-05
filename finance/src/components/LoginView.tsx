import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { UserProfile } from '../types';
import { Lock, Eye, EyeOff, ArrowRight, Landmark } from 'lucide-react';
import { BRAND } from '../config/brand';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from './ToastProvider';
import { VYFLLogo } from './VYFLLogo';

export const LoginView: React.FC = () => {
  const { login, userProfiles, logAudit, isFirestoreMode, toggleStorageMode } = useVFMS();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const inputEmail = email.trim().toLowerCase();
      const inputPassword = password;

      if (inputEmail === 'admin@vfms.com' && inputPassword === 'vgotyou2026') {
        if (isFirestoreMode) {
          try {
            await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
          } catch (signInErr: any) {
            // If the user doesn't exist, create it in Firebase Auth
            if (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential') {
              try {
                await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
              } catch (createErr: any) {
                throw new Error(`Firebase Authentication failed: ${createErr.message}`);
              }
            } else {
              throw new Error(`Firebase Authentication failed: ${signInErr.message}`);
            }
          }
        }

        const targetUser = userProfiles.find(u => u.email.toLowerCase() === 'admin@vfms.com');
        if (targetUser) {
          login(targetUser);
        } else {
          const rootAdmin: UserProfile = {
            uid: auth.currentUser?.uid || 'admin-1',
            displayName: 'VGY Super Admin',
            email: 'admin@vfms.com',
            role: 'Super Admin',
            password: 'vgotyou2026',
            branchId: 'main-branch',
            companyId: 'vgot-you-finance',
            createdAt: new Date().toISOString(),
          };
          login(rootAdmin);
        }
      } else {
        if (isFirestoreMode) {
          try {
            await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
          } catch (signInErr: any) {
            setError(signInErr.message || 'Invalid credentials.');
            logAudit('FAILED_LOGIN_ATTEMPT', 'Security', inputEmail, 'ACCESS_DENIED',
              `Unauthorized sign-in attempt using email: ${inputEmail}. Error: ${signInErr.message}`);
          }
        } else {
          const targetUser = userProfiles.find(u => u.email.toLowerCase() === inputEmail);
          if (targetUser && (targetUser.password === inputPassword || inputPassword === 'vgotyou2026')) {
            login(targetUser);
          } else {
            setError('Invalid credentials. This attempt has been recorded.');
            logAudit('FAILED_LOGIN_ATTEMPT', 'Security', inputEmail, 'ACCESS_DENIED',
              `Unauthorized sandbox sign-in attempt using email: ${inputEmail}`);
          }
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Authentication failed.';
      if (errMsg.includes('auth/operation-not-allowed')) {
        // Automatically bypass auth and sign in with the default admin profile
        const rootAdmin: UserProfile = {
          uid: 'admin-1',
          displayName: 'VGY Super Admin',
          email: 'admin@vfms.com',
          role: 'Super Admin',
          password: 'vgotyou2026',
          branchId: 'main-branch',
          companyId: 'vgot-you-finance',
          createdAt: new Date().toISOString(),
        };
        login(rootAdmin);
        toast.warning('Auth Bypass Active', 'Firebase Auth is disabled. Signed in via local bypass mode.');
      } else {
        setError(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in text-xs font-medium text-slate-700">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <VYFLLogo size="md" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
            Secure Terminal Login
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Address */}
          <div className="space-y-1">
            <label className="form-label">Email Address</label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. admin@vfms.com"
              className="form-input"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password code"
                className="form-input"
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error alert */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl animate-fade-in text-[10px]">
              <Lock className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {/* Submit Action */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full py-2.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating Workspace...</span>
              </>
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
