import React, { useState } from 'react';
import { useVFMS } from '../context/VFMSContext';
import { UserProfile } from '../types';
import { Lock, Eye, EyeOff, ArrowRight, Landmark } from 'lucide-react';
import { BRAND } from '../config/brand';

export const LoginView: React.FC = () => {
  const { login, userProfiles, logAudit } = useVFMS();
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
        const targetUser = userProfiles.find(u => u.email.toLowerCase() === 'admin@vfms.com');
        if (targetUser) {
          login(targetUser);
        } else {
          const rootAdmin: UserProfile = {
            uid: 'admin-1',
            displayName: 'VGot You Super Admin',
            email: 'admin@vfms.com',
            role: 'Super Admin',
            branchId: 'main-branch',
            companyId: 'vgot-you-finance',
            createdAt: new Date().toISOString(),
          };
          login(rootAdmin);
        }
      } else {
        setError('Invalid credentials. This attempt has been recorded.');
        logAudit('FAILED_LOGIN_ATTEMPT', 'Security', inputEmail, 'ACCESS_DENIED',
          `Unauthorized sign-in attempt using email: ${inputEmail}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in text-xs font-medium text-slate-700">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-150 animate-pulse">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900 font-black text-lg tracking-tight leading-tight">
              {BRAND.name}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              Secure Terminal Login
            </p>
          </div>
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
