import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Toast({ message, onOpenCart }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700/60 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <div className="flex-1 text-xs font-medium truncate">
          {message}
        </div>
        {onOpenCart && (
          <button
            type="button"
            onClick={onOpenCart}
            className="text-xs font-bold text-brand-300 hover:text-white underline underline-offset-2 shrink-0 ml-1 cursor-pointer"
          >
            View Cart
          </button>
        )}
      </div>
    </div>
  );
}
