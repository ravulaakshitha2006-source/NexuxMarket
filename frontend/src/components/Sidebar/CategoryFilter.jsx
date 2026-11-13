import React from 'react';
import { Check } from 'lucide-react';

export default function CategoryFilter({
  categories = [],
  selectedCategories = [],
  categoryCounts = {},
  onChange
}) {
  const handleToggle = (category) => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Categories
        </h3>
        {selectedCategories.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-brand-600 hover:text-brand-800 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {categories.map((cat) => {
          const isChecked = selectedCategories.includes(cat);
          const count = categoryCounts[cat] || 0;

          return (
            <label
              key={cat}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-all select-none ${
                isChecked
                  ? 'bg-brand-50 text-brand-900 font-semibold border border-brand-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-colors border ${
                    isChecked
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => handleToggle(cat)}
                />
                <span>{cat}</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isChecked
                    ? 'bg-brand-200/60 text-brand-800'
                    : 'bg-slate-200/70 text-slate-500'
                }`}
              >
                {count}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
