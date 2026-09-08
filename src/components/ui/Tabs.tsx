'use client';

import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underlined' | 'fullWidth';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underlined',
  className = ''
}) => {
  const baseListStyles = 'flex items-center gap-1 overflow-x-auto no-scrollbar border-slate-100 dark:border-slate-800/80';
  
  const lists = {
    underlined: 'border-b pb-[1px]',
    pills: 'bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-xl border border-slate-200/20 dark:border-slate-800/30',
    fullWidth: 'border-b pb-[1px] w-full justify-between'
  };

  const itemBaseStyles = 'flex items-center gap-2 font-medium text-sm transition-all duration-300 py-2.5 px-4 outline-none whitespace-nowrap cursor-pointer rounded-lg';
  
  const items = {
    underlined: (isActive: boolean) => 
      isActive 
        ? 'border-b-2 border-brand-primary text-brand-primary font-semibold rounded-none translate-y-[1px]' 
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-none border-b-2 border-transparent',
    pills: (isActive: boolean) => 
      isActive 
        ? 'bg-white dark:bg-slate-900 text-brand-primary font-semibold shadow-sm border border-slate-200/50 dark:border-slate-800/50' 
        : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent',
    fullWidth: (isActive: boolean) => 
      isActive 
        ? 'border-b-2 border-brand-primary text-brand-primary font-semibold rounded-none translate-y-[1px] flex-1 text-center justify-center' 
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-none border-b-2 border-transparent flex-1 text-center justify-center'
  };

  return (
    <div className={`${baseListStyles} ${lists[variant]} ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`${itemBaseStyles} ${items[variant](isActive)}`}
          >
            {tab.icon && <span className="inline-flex h-4 w-4">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
