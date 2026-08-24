'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Bell, Search, Calendar, User, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Component that reads query params (must be wrapped in Suspense)
function NoticesContent() {
  const { notices } = useApp();
  const searchParams = useSearchParams();
  const initialSearch = searchParams ? searchParams.get('search') || '' : '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Exams', 'Placement', 'Admissions', 'Events', 'General'];

  // Filter notices based on search query and category
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = selectedCategory === 'All' || notice.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Exams':
        return 'bg-red-50 text-[#b32025] dark:bg-red-950/20 border-red-200/50';
      case 'Placement':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 border-emerald-200/50';
      case 'Admissions':
        return 'bg-blue-50 text-[#004b93] dark:bg-blue-950/20 border-blue-200/50';
      case 'Events':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 border-amber-200/50';
      default:
        return 'bg-white text-slate-600 dark:bg-slate-900 border-slate-200/50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-[#004b93] placeholder-slate-400"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#004b93] border-[#004b93] text-white shadow shadow-blue-800/10'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Count */}
      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
        <span>Found {filteredNotices.length} Notice{filteredNotices.length !== 1 ? 's' : ''}</span>
        {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <Card
              key={notice.id}
              variant="default"
              className="hover:border-[#004b93] hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-900"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col gap-4">
                
                {/* Header Information */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge className={`px-2.5 py-1 text-[10px] uppercase font-bold border ${getCategoryStyle(notice.category)}`}>
                      {notice.category}
                    </Badge>
                    {notice.hasAttachment && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-800">
                        <FileText size={10} /> Attachment
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {notice.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={13} /> {notice.author}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 text-left">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium pt-1">
                    {notice.content}
                  </p>
                </div>

                {/* Footer Attachment Mock Download */}
                {notice.hasAttachment && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#004b93]/30 text-[#004b93] hover:border-[#004b93] font-bold text-xs"
                      leftIcon={<FileText size={14} />}
                    >
                      Download Circular File PDF
                    </Button>
                  </div>
                )}

              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <Bell size={40} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
            <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-200">No notices found</h4>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search terms or selecting another category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NoticesPage() {
  return (
    <div className="min-h-[80vh] bg-white dark:bg-brand-dark-bg transition-colors duration-300">
      
      {/* Sub-header Banner */}
      <section className="bg-white dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004b93] hover:underline mb-2">
                <ChevronLeft size={14} /> Back to Home
              </Link>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
                Notice Board
              </h1>
            </div>
            <Badge variant="primary" className="bg-[#b32025] text-white border-none py-1.5 px-4 font-bold text-xs">
              Official Bulletins
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="text-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-[#004b93] border-t-transparent rounded-full mx-auto" />
            <p className="text-xs text-slate-500 mt-2.5 font-bold">Loading notices...</p>
          </div>
        }>
          <NoticesContent />
        </Suspense>
      </section>

    </div>
  );
}
