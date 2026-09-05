'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle
}) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left font-medium text-slate-850 dark:text-slate-205 hover:text-brand-primary dark:hover:text-indigo-400 transition-colors duration-200 focus:outline-none"
      >
        <span className="text-sm sm:text-base font-semibold">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180 text-brand-primary' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
