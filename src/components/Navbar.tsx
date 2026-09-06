'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, Menu, X, Sun, Moon, LogOut, User as UserIcon, Search, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from './ui/Button';

// SVG Nexus University Logo Component styled like the Silicon Logo
const NexusLogo = () => (
  <div className="flex items-center gap-2.5 select-none">
    <div className="bg-[#004b93] text-white p-2 rounded-xl shadow-md transition-transform hover:scale-105">
      <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-xl font-black tracking-tight text-[#004b93] dark:text-white leading-none">
        NEXUS
      </span>
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1">
        UNIVERSITY
      </span>
    </div>
  </div>
);

// SVG 28 Years Anniversary Logo Component styled like Silicon's badge
const NexusBadge = () => (
  <svg viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto opacity-90 hidden xl:block">
    <g transform="translate(2, 0)">
      <text x="0" y="32" fill="#004b93" fontWeight="800" fontSize="28" fontFamily="var(--font-display), serif" className="dark:fill-white">28</text>
      <text x="34" y="18" fill="#004b93" fontWeight="bold" fontSize="9" fontFamily="var(--font-sans), sans-serif" className="dark:fill-slate-200">Years of</text>
      <text x="34" y="30" fill="#004b93" fontWeight="950" fontSize="10" fontFamily="var(--font-sans), sans-serif" letterSpacing="0.3" className="dark:fill-white">Excellence</text>
      <path d="M 0 38 L 82 38" stroke="#004b93" strokeWidth="1" strokeDasharray="2 2" className="dark:stroke-slate-500" />
    </g>
  </svg>
);

// Submenu data structure
interface SubMenuItem {
  label: string;
  path: string;
}

interface MainNavItem {
  label: string;
  path: string;
  submenus?: SubMenuItem[];
  columns?: number; // for multi-column layouts like Admissions
}

const mainNavItems: MainNavItem[] = [
  {
    label: 'ACADEMICS',
    path: '/academics',
    submenus: [
      { label: 'PROGRAMS', path: '/academics' },
      { label: 'SUMMER INTERNSHIP', path: '/academics' },
      { label: 'PRACTICE SCHOOL', path: '/academics' },
    ],
  },
  {
    label: 'ADMISSIONS',
    path: '/admissions',
    columns: 2,
    submenus: [
      { label: 'ADMISSIONS 2026-27', path: '/admissions' },
      { label: 'UNDERGRADUATE ADMISSIONS', path: '/admissions' },
      { label: 'POSTGRADUATE ADMISSIONS', path: '/admissions' },
      { label: 'Ph.D. OPPORTUNITIES', path: '/admissions' },
      { label: 'FREQUENTLY ASKED QUESTIONS', path: '/admissions' },
    ],
  },
  {
    label: 'PLACEMENTS',
    path: '/departments',
    submenus: [
      { label: 'PLACEMENTS AT SILICON', path: '/departments' },
      { label: 'SUMMER INTERNSHIP', path: '/departments' },
      { label: 'PRACTICE SCHOOL', path: '/departments' },
    ],
  },
  {
    label: 'RESEARCH',
    path: '/academics',
    submenus: [
      { label: 'RESEARCH AT SILICON', path: '/academics' },
      { label: 'RESEARCH PUBLICATIONS', path: '/academics' },
    ],
  },
  {
    label: 'ENTREPRENEURSHIP',
    path: '/about',
    submenus: [
      { label: 'ENTREPRENEURSHIP DEVELOPMENT CELL', path: '/about' },
      { label: 'BUSINESS INCUBATOR', path: '/about' },
      { label: 'INSTITUTION INNOVATION COUNCIL', path: '/about' },
    ],
  },
  {
    label: 'CAMPUS LIFE',
    path: '/events',
  },
];

// Desktop dropdown component
function NavDropdown({ item, isActive }: { item: MainNavItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), 200);
  }, []);

  const handleLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const hasSubmenu = item.submenus && item.submenus.length > 0;

  if (!hasSubmenu) {
    return (
      <Link
        href={item.path}
        className={`text-xs xl:text-sm font-extrabold tracking-wider transition-all duration-200 ${
          isActive
            ? 'text-[#004b93] dark:text-sky-400 border-b-2 border-[#004b93] dark:border-sky-400 pb-0.5'
            : 'text-[#004b93] dark:text-sky-400 hover:text-[#00376c] dark:hover:text-sky-300'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  const columns = item.columns || 1;
  // Split submenus into columns
  const itemsPerCol = Math.ceil(item.submenus!.length / columns);
  const columnArrays: SubMenuItem[][] = [];
  for (let i = 0; i < columns; i++) {
    columnArrays.push(item.submenus!.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.path}
        className={`text-xs xl:text-sm font-extrabold tracking-wider transition-all duration-200 inline-flex items-center gap-0.5 ${
          isActive || open
            ? 'text-[#004b93] dark:text-sky-400 border-b-2 border-[#004b93] dark:border-sky-400 pb-0.5'
            : 'text-[#004b93] dark:text-sky-400 hover:text-[#00376c] dark:hover:text-sky-300'
        }`}
      >
        {item.label}
      </Link>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        style={{ minWidth: columns > 1 ? '520px' : '300px' }}
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-md overflow-hidden">
          <div className={`${columns > 1 ? 'grid grid-cols-2' : ''}`}>
            {columnArrays.map((col, colIdx) => (
              <div key={colIdx} className={colIdx > 0 ? 'border-l border-slate-100 dark:border-slate-800' : ''}>
                {col.map((sub, idx) => (
                  <Link
                    key={sub.label}
                    href={sub.path}
                    onClick={() => setOpen(false)}
                    className="block group"
                  >
                    <div className="px-5 py-3.5">
                      <span className="text-xs font-extrabold tracking-wide text-slate-800 dark:text-slate-200 group-hover:text-[#004b93] dark:group-hover:text-sky-400 transition-colors">
                        {sub.label}
                      </span>
                    </div>
                    {idx < col.length - 1 && (
                      <div className="mx-5 h-px bg-gradient-to-r from-[#c0392b]/50 via-[#c0392b]/30 to-transparent" />
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile accordion submenu component
function MobileNavAccordion({ item, onLinkClick }: { item: MainNavItem; onLinkClick: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const hasSubmenu = item.submenus && item.submenus.length > 0;

  if (!hasSubmenu) {
    return (
      <Link
        href={item.path}
        onClick={onLinkClick}
        className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
          isActive
            ? 'bg-slate-100 dark:bg-slate-900 text-[#004b93] dark:text-sky-400 font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
          isActive || expanded
            ? 'bg-slate-100 dark:bg-slate-900 text-[#004b93] dark:text-sky-400 font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-[#004b93]/20 dark:border-sky-400/20 pl-3">
          {item.submenus!.map((sub) => (
            <Link
              key={sub.label}
              href={sub.path}
              onClick={onLinkClick}
              className="block px-2 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#004b93] dark:hover:text-sky-400 rounded transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll shadow/opacity effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggler
  useEffect(() => {
    const savedTheme = localStorage.getItem('camp_theme') as 'light' | 'dark' | null;
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (preferDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('camp_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Top sub-row links
  const topLinks = [
    { label: 'ABOUT US', path: '/about' },
    { label: 'ALUMNI', path: '/events' },
    { label: 'BHUBANESWAR CAMPUS', path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/auth/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'FACULTY') return '/dashboard/faculty';
    return '/dashboard/student';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/notices?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="relative w-full z-45 bg-white dark:bg-slate-950">
      {/* Top Thin Blue ribbon */}
      <div className="w-full bg-[#004b93] text-white text-center py-2 px-4 text-xs font-semibold tracking-wider uppercase select-none">
        Nexus University CAMP Portal | Academics &amp; Operations
      </div>

      {/* Main Header Container */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'sticky top-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-slate-800/40'
            : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Desktop Double-Tier Navigation Layout */}
          <div className="hidden lg:flex items-center justify-between py-4">
            
            {/* Left: Nexus Logo */}
            <Link href="/" className="flex-shrink-0 select-none">
              <NexusLogo />
            </Link>

            {/* Center: Double-Tier Links */}
            <div className="flex flex-col items-center gap-3 flex-grow px-8">
              {/* Row 1: Sub Links (ABOUT US, ALUMNI, BHUBANESWAR CAMPUS) */}
              <div className="flex items-center gap-6 w-full justify-start pl-4">
                {topLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.path}
                    className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-600 hover:text-[#004b93] dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Row 2: Main Links with Dropdown Submenus */}
              <nav className="flex items-center gap-5 xl:gap-7 w-full justify-start pl-4">
                {mainNavItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <NavDropdown key={item.label} item={item} isActive={isActive} />
                  );
                })}
              </nav>
            </div>

            {/* Right: Search, Anniversary Logo & Portal Actions */}
            <div className="flex items-center gap-4 flex-shrink-0">
              
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                 <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 xl:w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs px-3 py-1.5 pr-8 rounded focus:outline-none focus:border-[#004b93] transition-all placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-0 h-full px-2.5 bg-[#004b93] hover:bg-[#00376c] text-white rounded-r flex items-center justify-center transition-colors"
                  title="Search portal"
                >
                  <Search size={12} />
                </button>
              </form>

              {/* 28 Years Anniversary Badge */}
              <NexusBadge />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg transition-colors outline-none"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Session / Portal Actions */}
              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <Link href={getDashboardLink()} className="flex items-center gap-1.5" title="Go to Dashboard">
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-[#004b93]/40">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#004b93]">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link href={getDashboardLink()}>
                    <Button variant="outline" size="sm" className="py-1 px-2.5 text-xs font-bold border-[#004b93]/30 hover:border-[#004b93] text-[#004b93] dark:border-slate-800 dark:text-slate-200">
                      Portal
                    </Button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-slate-500 hover:text-[#b32025] hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="primary" size="sm" className="bg-[#004b93] hover:bg-[#00376c] py-1.5 px-3 text-xs font-bold border-none" leftIcon={<UserIcon size={12} />}>
                    Portal
                  </Button>
                </Link>
              )}
            </div>

          </div>

          {/* Mobile Navigation Layout */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <Link href="/">
              <NexusLogo />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg outline-none"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-1 shadow-lg absolute w-full top-full left-0 z-50">
          {/* Main nav items with accordion submenus */}
          {mainNavItems.map((item) => (
            <MobileNavAccordion key={item.label} item={item} onLinkClick={() => setIsOpen(false)} />
          ))}

          {/* Top links */}
          <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
            {topLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-900 text-[#004b93] dark:text-sky-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Search bar for mobile */}
          <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={(e) => { handleSearchSubmit(e); setIsOpen(false); }} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm px-3 py-2 pr-10 rounded-lg focus:outline-none focus:border-[#004b93] transition-all placeholder-slate-400"
              />
              <button
                type="submit"
                className="absolute right-0 h-full px-3 bg-[#004b93] hover:bg-[#00376c] text-white rounded-r-lg flex items-center justify-center transition-colors"
              >
                <Search size={14} />
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {user ? (
              <div className="px-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-[#004b93]/40">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      {user.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={getDashboardLink()} onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full bg-[#004b93] text-xs font-bold py-1.5 border-none">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => { setIsOpen(false); handleLogout(); }} className="w-full text-xs font-bold py-1.5 border-slate-300">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" onClick={() => setIsOpen(false)} className="block w-full">
                <Button variant="primary" className="w-full bg-[#004b93] text-xs font-bold py-2 border-none">
                  Portal Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
