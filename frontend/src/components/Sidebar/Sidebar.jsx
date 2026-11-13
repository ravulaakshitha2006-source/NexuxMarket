import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import PriceRangeSlider from './PriceRangeSlider';
import RatingFilter from './RatingFilter';

export default function Sidebar({
  categories = [],
  categoryCounts = {},
  selectedCategories = [],
  onCategoriesChange,
  priceBounds = { min: 0, max: 1500 },
  selectedPrice = { min: 0, max: 1500 },
  onPriceChange,
  selectedRating = 0,
  onRatingChange,
  onResetFilters,
  isFiltered = false
}) {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm sticky top-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <SlidersHorizontal className="w-5 h-5 text-brand-600" />
            <h2 className="text-base tracking-tight">Filter Products</h2>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1 rounded-md hover:bg-rose-50 transition-colors"
              title="Reset all filters to base inventory"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          )}
        </div>

        {/* 1. Category Checklist group */}
        <CategoryFilter
          categories={categories}
          categoryCounts={categoryCounts}
          selectedCategories={selectedCategories}
          onChange={onCategoriesChange}
        />

        <div className="border-t border-slate-100" />

        {/* 2. Dual-point Price Range Slider track */}
        <PriceRangeSlider
          minBound={priceBounds.min}
          maxBound={priceBounds.max}
          currentMin={selectedPrice.min}
          currentMax={selectedPrice.max}
          onChange={onPriceChange}
        />

        <div className="border-t border-slate-100" />

        {/* 3. Minimum Star Rating set of radio selection buttons */}
        <RatingFilter
          selectedRating={selectedRating}
          onChange={onRatingChange}
        />
      </div>
    </aside>
  );
}
