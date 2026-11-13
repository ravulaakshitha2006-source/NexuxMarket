import React from 'react';
import { Star } from 'lucide-react';

const RATING_OPTIONS = [
  { value: 4.5, label: '4.5 & up', stars: 5 },
  { value: 4.0, label: '4.0 & up', stars: 4 },
  { value: 3.0, label: '3.0 & up', stars: 3 },
  { value: 2.0, label: '2.0 & up', stars: 2 },
  { value: 1.0, label: '1.0 & up', stars: 1 },
];

export default function RatingFilter({ selectedRating = 0, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Minimum Rating
        </h3>
        {selectedRating > 0 && (
          <button
            type="button"
            onClick={() => onChange(0)}
            className="text-xs text-brand-600 hover:text-brand-800 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1.5" role="radiogroup" aria-label="Minimum Star Rating">
        {/* All / Any Option */}
        <label
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all select-none ${
            selectedRating === 0
              ? 'bg-brand-50 text-brand-900 font-semibold border border-brand-200'
              : 'text-slate-600 hover:bg-slate-100 border border-transparent'
          }`}
        >
          <input
            type="radio"
            name="ratingFilter"
            value="0"
            checked={selectedRating === 0}
            onChange={() => onChange(0)}
            className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-slate-300"
          />
          <span>All Ratings</span>
        </label>

        {RATING_OPTIONS.map((opt) => {
          const isSelected = selectedRating === opt.value;

          return (
            <label
              key={opt.value}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-all select-none ${
                isSelected
                  ? 'bg-brand-50 text-brand-900 font-semibold border border-brand-200'
                  : 'text-slate-600 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="ratingFilter"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange(opt.value)}
                  className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < opt.stars
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
