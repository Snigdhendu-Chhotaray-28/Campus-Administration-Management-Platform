'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, GraduationCap, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp, Role } from '@/context/AppContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';

export default function Login() {
  const router = useRouter();
  const { login, user } = useApp();
  const [role, setRole] = useState<Role>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle Login submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all credential fields.');
      return;
    }

    setIsLoading(true);

    // Simulate net latency
    setTimeout(() => {
      const isValid = login(email, role);
      setIsLoading(false);

      if (isValid) {
        setSuccess('Authentication successful! Loading dashboard...');
        
        // Wait and redirect
        setTimeout(() => {
          if (role === 'ADMIN') {
            router.push('/admin');
          } else if (role === 'FACULTY') {
            router.push('/dashboard/faculty');
          } else {
            router.push('/dashboard/student');
          }
        }, 1200);
      } else {
        setError(`Invalid credentials for ${role} portal. Hint: Use quick fill credentials below!`);
      }
    }, 1000);
  };

  // Quick fill function
  const handleQuickFill = (targetRole: Role) => {
    setRole(targetRole);
    setPassword('password123'); // mock pass
    if (targetRole === 'STUDENT') {
      setEmail('student@nexus.edu');
    } else if (targetRole === 'FACULTY') {
      setEmail('faculty@nexus.edu');
    } else if (targetRole === 'ADMIN') {
      setEmail('admin@nexus.edu');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-brand-dark-bg min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Graphics */}
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-emerald-500/10 dark:bg-emerald-600/5 blur-[90px] pointer-events-none" />

      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 relative z-10">
        
        {/* Brand Logo header */}
        <div className="text-center space-y-2">
          <div className="bg-brand-primary text-white p-3 rounded-2xl w-fit mx-auto shadow-md">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Access CAMP Portal</h2>
          <p className="text-xs text-slate-500">Sign in to your student, faculty, or admin dashboard</p>
        </div>

        {/* Role tabs switcher */}
        <Tabs
          tabs={[
            { id: 'STUDENT', label: 'Student' },
            { id: 'FACULTY', label: 'Faculty' },
            { id: 'ADMIN', label: 'Admin' }
          ]}
          activeTab={role}
          onChange={(tabId) => setRole(tabId as Role)}
          variant="pills"
          className="w-full"
        />

        {/* Feedback Alert banners */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-rose-650 font-medium">
            <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-205 dark:border-emerald-800/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-emerald-650 font-semibold">
            <CheckCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Input Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Institutional Email"
            type="email"
            placeholder="name@nexus.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-[34px] text-slate-400 hover:text-slate-600 outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-slate-550 dark:text-slate-450 cursor-pointer select-none">
              <input type="checkbox" className="rounded text-brand-primary" />
              <span>Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-brand-primary font-bold hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full justify-center mt-2" isLoading={isLoading}>
            Sign In to Portal
          </Button>
        </form>

        {/* Divider and Quick Fill Testing triggers */}
        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800/60 pt-6">
          <div className="text-center relative">
            <span className="bg-white dark:bg-slate-900 px-3 text-xxs font-bold text-slate-450 uppercase tracking-widest relative z-10">Demo Quick Logins</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickFill('STUDENT')}
              className="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 text-brand-primary dark:text-indigo-400 font-bold border border-indigo-200/50 dark:border-indigo-900/30 rounded-lg p-2.5 text-center text-xxs outline-none cursor-pointer active:scale-95 transition-all"
            >
              Student Portal
            </button>
            <button
              onClick={() => handleQuickFill('FACULTY')}
              className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-brand-secondary dark:text-emerald-450 border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg p-2.5 text-center text-xxs outline-none cursor-pointer active:scale-95 transition-all"
            >
              Faculty Portal
            </button>
            <button
              onClick={() => handleQuickFill('ADMIN')}
              className="bg-pink-50 hover:bg-pink-100 dark:bg-pink-955/20 dark:hover:bg-pink-950/40 text-brand-accent dark:text-pink-400 border border-pink-200/50 dark:border-pink-900/30 rounded-lg p-2.5 text-center text-xxs outline-none cursor-pointer active:scale-95 transition-all"
            >
              Admin Portal
            </button>
          </div>
        </div>

        {/* Back Link */}
        <p className="text-center text-xs text-slate-500 mt-2">
          New to Campus?{' '}
          <Link href="/auth/register" className="text-brand-primary font-bold hover:underline">
            Register Account
          </Link>
        </p>

      </div>
    </div>
  );
}
