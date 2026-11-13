import React from 'react';
import { X } from 'lucide-react';

export default function ActiveFiltersBar({
  count = 0,
  total = 0,
  selectedCategories = [],
  onRemoveCategory,
  selectedPrice = { min: 0, max: 1500 },
  priceBounds = { min: 0, max: 1500 },
  onResetPrice,
  selectedRating = 0,
  onResetRating,
  searchQuery = '',
  onClearSearch
}) {
  const isPriceActive =
    (selectedPrice.min > priceBounds.min) || (selectedPrice.max < priceBounds.max);
  const isRatingActive = selectedRating > 0;
  const isSearchActive = searchQuery.trim().length > 0;

  const hasAnyFilters =
    selectedCategories.length > 0 || isPriceActive || isRatingActive || isSearchActive;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
      {/* Product Count Indicator */}
      <div className="text-sm font-semibold text-slate-700">
        Showing <span className="text-brand-600 font-bold">{count}</span> of{' '}
        <span className="text-slate-900 font-bold">{total}</span> products
      </div>

      {/* Active Filter Chips */}
      {hasAnyFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {/* Categories */}
          {selectedCategories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200"
            >
              <span>{cat}</span>
              <button
                type="button"
                onClick={() => onRemoveCategory(cat)}
                className="hover:text-brand-900 focus:outline-none"
                aria-label={`Remove ${cat} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Price Range */}
          {isPriceActive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span>
                ${selectedPrice.min} – ${selectedPrice.max}
              </span>
              <button
                type="button"
                onClick={onResetPrice}
                className="hover:text-emerald-900 focus:outline-none"
                aria-label="Reset price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Rating */}
          {isRatingActive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <span>{selectedRating}★ & up</span>
              <button
                type="button"
                onClick={onResetRating}
                className="hover:text-amber-900 focus:outline-none"
                aria-label="Reset rating filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Search Query */}
          {isSearchActive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
              <span>"{searchQuery}"</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="hover:text-purple-900 focus:outline-none"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
