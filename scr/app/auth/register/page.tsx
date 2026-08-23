'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail, GraduationCap, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    // Simulate register request
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Account created successfully! Redirecting to login portal...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 dark:bg-brand-dark-bg min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-500/10 dark:bg-indigo-650/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-emerald-500/10 dark:bg-emerald-650/5 blur-[90px] pointer-events-none" />

      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <div className="bg-brand-primary text-white p-3 rounded-2xl w-fit mx-auto shadow-md">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Create Portal Account</h2>
          <p className="text-xs text-slate-500">Register with your institutional details to access the CAMP system</p>
        </div>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-955/20 border border-rose-200 dark:border-rose-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-rose-650 font-medium animate-fade-in">
            <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-205 dark:border-emerald-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-emerald-650 font-semibold animate-fade-in">
            <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={16} />}
            required
          />

          <Input
            label="Institutional Email"
            type="email"
            placeholder="name@nexus.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 uppercase">Role Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border bg-white dark:bg-slate-900 border-slate-205 dark:border-slate-800 text-sm py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-slate-850 dark:text-slate-100"
            >
              <option value="STUDENT">STUDENT</option>
              <option value="FACULTY">FACULTY</option>
            </select>
          </div>

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={16} />}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Key size={16} />}
            required
          />

          <Button type="submit" className="w-full justify-center mt-2" isLoading={isLoading}>
            Submit Registration
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href="/auth/login" className="text-brand-primary font-bold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}
