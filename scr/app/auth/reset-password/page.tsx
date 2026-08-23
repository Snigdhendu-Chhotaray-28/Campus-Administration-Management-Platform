'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, GraduationCap, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Please provide the recovery token sent to your email.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    // Simulate reset request
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Your password has been reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 dark:bg-brand-dark-bg min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <div className="bg-brand-primary text-white p-3 rounded-2xl w-fit mx-auto shadow-md">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Reset Password</h2>
          <p className="text-xs text-slate-500">Provide token and input new password for your portal account</p>
        </div>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-955/20 border border-rose-205 dark:border-rose-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-rose-650 font-medium">
            <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/45 dark:border-emerald-805/45 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-emerald-650 font-semibold">
            <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Recovery Token"
            type="text"
            placeholder="HEX-4829-TOK"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            icon={<Key size={16} />}
            required
          />

          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={16} />}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock size={16} />}
            required
          />

          <Button type="submit" className="w-full justify-center mt-2" isLoading={isLoading}>
            Update Password
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Remembered details?{' '}
          <Link href="/auth/login" className="text-brand-primary font-bold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}
