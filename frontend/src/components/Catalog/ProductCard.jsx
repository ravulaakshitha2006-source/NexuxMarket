import React, { useState } from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, countInCart = 0 }) {
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const {
    name,
    category,
    price,
    rating,
    reviewsCount,
    image,
    description,
    brand
  } = product;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col">
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
          {category}
        </span>

        {/* Brand Badge */}
        {brand && (
          <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            {brand}
          </span>
        )}

        {/* In Cart Indicator on Image */}
        {countInCart > 0 && (
          <span className="absolute top-3 right-3 bg-brand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md">
            {countInCart} in cart
          </span>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Star Rating Display */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < rating
                      ? 'fill-amber-300 text-amber-300'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800 ml-1">
              {Number(rating).toFixed(1)}
            </span>
            {reviewsCount && (
              <span className="text-xs text-slate-400 font-medium">
                ({reviewsCount.toLocaleString()})
              </span>
            )}
          </div>

          {/* Item Name */}
          <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-base leading-snug">
            {name}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Footer: Price Tag and Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Price
            </span>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              ${Number(price).toFixed(2)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 font-semibold text-xs rounded-xl transition-all duration-200 shadow-sm cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white scale-105'
                : countInCart > 0
                ? 'bg-brand-600 hover:bg-brand-700 text-white'
                : 'bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white'
            }`}
            aria-label={`Add ${name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added!</span>
              </>
            ) : countInCart > 0 ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add More ({countInCart})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
