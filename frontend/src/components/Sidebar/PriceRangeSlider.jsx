import React from 'react';
import { DollarSign } from 'lucide-react';

export default function PriceRangeSlider({
  minBound = 0,
  maxBound = 1500,
  currentMin = 0,
  currentMax = 1500,
  onChange
}) {
  // Safe bounds
  const min = Math.min(minBound, maxBound);
  const max = Math.max(minBound, maxBound) || 1000;
  const range = max - min || 1;

  const safeMin = Math.max(min, Math.min(currentMin ?? min, currentMax ?? max));
  const safeMax = Math.min(max, Math.max(currentMax ?? max, currentMin ?? min));

  const minPercentage = Math.max(0, Math.min(100, ((safeMin - min) / range) * 100));
  const maxPercentage = Math.max(0, Math.min(100, ((safeMax - min) / range) * 100));

  const handleMinChange = (e) => {
    const val = Number(e.target.value);
    const newMin = Math.min(val, safeMax - 5);
    onChange(newMin, safeMax);
  };

  const handleMaxChange = (e) => {
    const val = Number(e.target.value);
    const newMax = Math.max(val, safeMin + 5);
    onChange(safeMin, newMax);
  };

  const handleResetPrice = () => {
    onChange(min, max);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Price Range
        </h3>
        {(safeMin !== min || safeMax !== max) && (
          <button
            type="button"
            onClick={handleResetPrice}
            className="text-xs text-brand-600 hover:text-brand-800 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Dual Value Indicators */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-2 shadow-sm text-center">
          <span className="block text-[11px] font-medium text-slate-400 uppercase">Min</span>
          <span className="text-sm font-bold text-slate-800">${safeMin}</span>
        </div>
        <span className="text-slate-400 font-medium">—</span>
        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-2 shadow-sm text-center">
          <span className="block text-[11px] font-medium text-slate-400 uppercase">Max</span>
          <span className="text-sm font-bold text-slate-800">${safeMax}</span>
        </div>
      </div>

      {/* Dual-Point Slider Track */}
      <div className="relative pt-3 pb-3">
        <div className="relative w-full h-2 rounded-full bg-slate-200">
          {/* Highlighted active range */}
          <div
            className="absolute top-0 bottom-0 bg-brand-600 rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${Math.max(0, maxPercentage - minPercentage)}%`
            }}
          />
        </div>

        {/* Lower Bound Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step="5"
          value={safeMin}
          onChange={handleMinChange}
          aria-label="Minimum Price Bound"
          className="range-slider-thumb top-3"
          style={{ zIndex: safeMin > max - 100 ? 5 : 3 }}
        />

        {/* Upper Bound Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step="5"
          value={safeMax}
          onChange={handleMaxChange}
          aria-label="Maximum Price Bound"
          className="range-slider-thumb top-3"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="flex justify-between text-[11px] font-semibold text-slate-400">
        <span>${min}</span>
        <span>${Math.round((min + max) / 2)}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
