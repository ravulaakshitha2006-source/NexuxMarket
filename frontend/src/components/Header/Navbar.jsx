import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';

export default function Navbar({ searchQuery = '', onSearchChange }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">
              NexusMarket
            </span>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              High-Traffic Product Multi-Filter Catalog
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by product name, category, or keyword..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-sm rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right spacer */}
        <div />
      </div>
    </header>
  );
}
