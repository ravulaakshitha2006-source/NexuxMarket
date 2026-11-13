import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onResetFilters }) {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto my-12 flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-5 shadow-sm">
        <SearchX className="w-8 h-8 stroke-[1.75]" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No items match your criteria
      </h3>

      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        Your current combination of category, price bounds, or rating filters is too restrictive.
        Try widening your range or resetting filters.
      </p>

      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset filters</span>
      </button>
    </div>
  );
}
