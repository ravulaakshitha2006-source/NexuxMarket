import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Header/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import ProductGrid from './components/Catalog/ProductGrid';
import SortDropdown from './components/Catalog/SortDropdown';
import ActiveFiltersBar from './components/Catalog/ActiveFiltersBar';
import CartDrawer from './components/Cart/CartDrawer';
import Toast from './components/Cart/Toast';
import { fetchProducts, fetchInventoryMeta } from './services/api';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function App() {
  // Inventory Metadata
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 1500 });

  // Active Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState({ min: 0, max: 1500 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Data & Request States
  const [products, setProducts] = useState([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Cart Management with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Cart Handlers
  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }
      ];
    });

    // Trigger toast notification
    setToastMessage(`Added "${product.name}" to cart`);
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // 1. Initial Load: Fetch Metadata & Initial Products
  useEffect(() => {
    async function initMeta() {
      try {
        const meta = await fetchInventoryMeta();
        if (meta.success) {
          setCategories(meta.allCategories || []);
          setCategoryCounts(meta.categories || {});
          const min = meta.minPrice ?? 0;
          const max = meta.maxPrice ?? 1500;
          setPriceBounds({ min, max });
          setSelectedPrice({ min, max });
        }
      } catch (err) {
        console.warn('Metadata fetch failed, falling back to defaults:', err);
      }
    }
    initMeta();
  }, []);

  // 2. Fetch products whenever any filter, sorting, or search state changes
  // Instant State Feedback: every click or slider adjustment updates instantly!
  const loadProducts = useCallback(async (filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchProducts(filters);
      if (response.success) {
        setProducts(response.data);
        setTotalInventory(response.totalInventory || response.count);
      } else {
        throw new Error(response.message || 'Error fetching products');
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'Failed to fetch catalog.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger query with slight debounce for smooth slider & typing interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts({
        categories: selectedCategories,
        minPrice: selectedPrice.min,
        maxPrice: selectedPrice.max,
        minRating: selectedRating,
        sortBy,
        search: searchQuery
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [
    selectedCategories,
    selectedPrice.min,
    selectedPrice.max,
    selectedRating,
    sortBy,
    searchQuery,
    loadProducts
  ]);

  // Reset all filters to base inventory
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice({ min: priceBounds.min, max: priceBounds.max });
    setSelectedRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  const handlePriceChange = (newMin, newMax) => {
    setSelectedPrice({ min: newMin, max: newMax });
  };

  const handleResetPrice = () => {
    setSelectedPrice({ min: priceBounds.min, max: priceBounds.max });
  };

  const handleRemoveCategory = (cat) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  // Determine if any reduction filters are active
  const isFiltered = useMemo(() => {
    const isCatFiltered = selectedCategories.length > 0;
    const isPriceFiltered =
      selectedPrice.min > priceBounds.min || selectedPrice.max < priceBounds.max;
    const isRatingFiltered = selectedRating > 0;
    const isSearchFiltered = searchQuery.trim().length > 0;
    return isCatFiltered || isPriceFiltered || isRatingFiltered || isSearchFiltered;
  }, [selectedCategories, selectedPrice, priceBounds, selectedRating, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>Filters {isFiltered && '• Active'}</span>
          </button>

          <SortDropdown
            currentSort={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Desktop Layout: Sticky Sidebar + Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Interactive Sidebar */}
          <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
            <Sidebar
              categories={categories}
              categoryCounts={categoryCounts}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              priceBounds={priceBounds}
              selectedPrice={selectedPrice}
              onPriceChange={handlePriceChange}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </div>

          {/* Right Product Section */}
          <div className="flex-1 w-full min-w-0">
            {/* Top Toolbar (Desktop): Sort Dropdown & Active Filters */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Product Inventory
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Explore high-quality products filtered by category, price bounds, and rating
                  </p>
                </div>

                {/* The Vibe Check: Sort By Dropdown Component */}
                <div className="hidden lg:block shrink-0">
                  <SortDropdown
                    currentSort={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>
              </div>

              {/* Active Filter Chips & Live Count */}
              <div className="pt-4">
                <ActiveFiltersBar
                  count={products.length}
                  total={totalInventory}
                  selectedCategories={selectedCategories}
                  onRemoveCategory={handleRemoveCategory}
                  selectedPrice={selectedPrice}
                  priceBounds={priceBounds}
                  onResetPrice={handleResetPrice}
                  selectedRating={selectedRating}
                  onResetRating={() => setSelectedRating(0)}
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-center justify-between">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => loadProducts({})}
                  className="font-semibold underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retry
                </button>
              </div>
            )}

            {/* Dynamic Product Inventory Grid / Empty State Screen */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onResetFilters={handleResetFilters}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          </div>
        </div>
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Instant Action Toast Notification */}
      <Toast
        message={toastMessage}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-16 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} E-Commerce Marketplace Store. All rights reserved.</span>
          <span className="font-medium text-slate-500">Built with Node.js & React</span>
        </div>
      </footer>
    </div>
  );
}
