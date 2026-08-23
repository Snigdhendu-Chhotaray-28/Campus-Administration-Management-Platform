'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, GraduationCap, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please fill in your registered email.');
      return;
    }

    setIsLoading(true);

    // Simulate recovery link dispatch
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('If the email is registered, we have sent a reset password link to it.');
    }, 1200);
  };

  return (
    <div className="bg-slate-50 dark:bg-brand-dark-bg min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <div className="bg-brand-primary text-white p-3 rounded-2xl w-fit mx-auto shadow-md">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Recover Password</h2>
          <p className="text-xs text-slate-500">Provide email to retrieve your portal account access link</p>
        </div>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-955/20 border border-rose-200 dark:border-rose-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-rose-650 font-medium">
            <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/40 dark:border-emerald-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-emerald-650 font-semibold">
            <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Recovery Email Address"
            type="email"
            placeholder="name@nexus.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            required
          />

          <Button type="submit" className="w-full justify-center mt-2" isLoading={isLoading}>
            Send Reset Link
          </Button>
        </form>

        <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <Link href="/auth/login" className="text-slate-500 hover:text-brand-primary flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <Link href="/auth/reset-password" className="text-brand-primary font-bold hover:underline">
            Go to Reset Form
          </Link>
        </div>

      </div>
    </div>
  );
}
