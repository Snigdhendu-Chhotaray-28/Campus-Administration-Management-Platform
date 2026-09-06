import React from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/Button';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 select-none">
              <div className="bg-brand-primary text-white p-2 rounded-xl">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                CAMP
              </span>
            </Link>
            <p className="text-sm text-slate-450 leading-relaxed mt-2">
              Campus Administration & Management Platform (CAMP) is an integrated solution powering academic excellence, operational efficiency, and student success at Nexus University.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="hover:text-white transition-colors duration-250" title="Facebook">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-250" title="X (formerly Twitter)">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-250" title="Instagram">
                <svg className="h-[18px] w-[18px] fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-250" title="LinkedIn">
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8h2.8v-4.8c0-.25.05-.5.12-.68a1.14 1.14 0 0 1 1-.76c.76 0 1 .52 1 1.3v4.94h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5v-8H5v8h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3.5 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">About Campus</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors duration-200">Departments</Link></li>
              <li><Link href="/academics" className="hover:text-white transition-colors duration-200">Academic Programs</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors duration-200">Admissions 2026</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-primary flex-shrink-0" />
                <span>100 University Boulevard, Tech District, UT 90210</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-brand-primary flex-shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-brand-primary flex-shrink-0" />
                <span>admissions@nexus.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Campus Newsletter</h4>
            <p className="text-sm text-slate-450 leading-relaxed">
              Subscribe to receive the latest academic schedules, notices, and event highlights in your inbox.
            </p>
            <div className="flex gap-2 mt-2 w-full">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none text-white w-full placeholder-slate-500"
              />
              <Button size="sm" variant="primary">Join</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="bg-slate-950 border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Nexus University. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Accessibility Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
