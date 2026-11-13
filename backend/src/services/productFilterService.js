/**
 * Product Filter & Sorting Service
 *
 * Implements:
 * 1. Combinatorial Intersect Filtering Array:
 *    - Category selection intersection (multi-category support)
 *    - Dual-point price boundary validation (minPrice <= price <= maxPrice)
 *    - Minimum star rating threshold (rating >= minRating)
 *    - Search query matching (optional bonus for enhanced marketplace UX)
 * 2. Graceful Null Handling:
 *    - If filters are null/undefined/empty, cleanly bypasses reduction to return base inventory.
 * 3. Sorting Pipeline:
 *    - Filters the original dataset first, then arranges visual presentation order.
 */

/**
 * Filter criteria interface/type:
 * @typedef {Object} FilterCriteria
 * @property {string[]|string} [categories] - Selected category or list of categories
 * @property {number|string} [minPrice] - Minimum price bound
 * @property {number|string} [maxPrice] - Maximum price bound
 * @property {number|string} [minRating] - Minimum star rating (1 to 5)
 * @property {string} [sortBy] - Sorting rule ('price_asc', 'price_desc', 'rating_desc', 'featured')
 * @property {string} [search] - Keyword search
 */

/**
 * Core processing function that executes combinatorial intersect filtering
 * and subsequent sorting over a product inventory dataset.
 *
 * @param {Array<Object>} inventory - Master product item inventory array
 * @param {FilterCriteria} criteria - Active combination criteria state
 * @returns {Array<Object>} - Processed products satisfying all intersect constraints
 */
export function executeProductPipeline(inventory, criteria = {}) {
  if (!Array.isArray(inventory)) {
    return [];
  }

  // Normalize criteria safely (Graceful Null Handling)
  const normalizedCategories = normalizeCategories(criteria.categories);
  const minPrice = parseNumeric(criteria.minPrice, null);
  const maxPrice = parseNumeric(criteria.maxPrice, null);
  const minRating = parseNumeric(criteria.minRating, 0);
  const search = typeof criteria.search === 'string' ? criteria.search.trim().toLowerCase() : '';
  const sortBy = criteria.sortBy || 'featured';

  // STEP 1: Combinatorial Intersect Filtering Loop
  const filteredProducts = inventory.filter((product) => {
    // Defensive check
    if (!product || typeof product !== 'object') {
      return false;
    }

    // 1. Category Checklist intersection
    // If no category selected, category filter is bypassed
    if (normalizedCategories.length > 0) {
      if (!product.category || !normalizedCategories.includes(product.category.toLowerCase())) {
        return false;
      }
    }

    // 2. Dual-point Price Boundary check
    // Ensure product price is within [minPrice, maxPrice]
    const price = Number(product.price);
    if (!isNaN(price)) {
      if (minPrice !== null && price < minPrice) {
        return false;
      }
      if (maxPrice !== null && price > maxPrice) {
        return false;
      }
    }

    // 3. Minimum Star Rating threshold
    // Product meets or exceeds the star rating (1 to 5)
    const rating = Number(product.rating);
    if (minRating > 0) {
      if (isNaN(rating) || rating < minRating) {
        return false;
      }
    }

    // Optional Search query intersection (enhances high-traffic store experience)
    if (search.length > 0) {
      const nameMatch = product.name?.toLowerCase().includes(search);
      const descMatch = product.description?.toLowerCase().includes(search);
      const brandMatch = product.brand?.toLowerCase().includes(search);
      if (!nameMatch && !descMatch && !brandMatch) {
        return false;
      }
    }

    // All active criteria satisfied (Intersection)
    return true;
  });

  // STEP 2: Sorting Pipeline Execution
  // Candidate refactors logic loop to filter first, then arrange visual order
  const sortedProducts = applySortingPipeline(filteredProducts, sortBy);

  return sortedProducts;
}

/**
 * Normalizes category inputs into an array of lowercase strings.
 * Handles single string, comma-separated string, or array.
 */
function normalizeCategories(categories) {
  if (!categories) return [];

  let list = [];
  if (Array.isArray(categories)) {
    list = categories;
  } else if (typeof categories === 'string') {
    list = categories.split(',').map((c) => c.trim());
  }

  return list
    .filter((cat) => typeof cat === 'string' && cat.trim().length > 0)
    .map((cat) => cat.trim().toLowerCase());
}

/**
 * Safely parses numeric filter parameters with fallback
 */
function parseNumeric(val, fallback = null) {
  if (val === undefined || val === null || val === '') {
    return fallback;
  }
  const parsed = Number(val);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Applies the visual ordering pipeline based on selected sort choice:
 * - 'price_asc': Price: Low to High
 * - 'price_desc': Price: High to Low
 * - 'rating_desc': Top Rated First
 * - 'featured': Default inventory arrangement
 */
export function applySortingPipeline(products, sortBy) {
  // Create a shallow copy to prevent in-place mutation of the filtered subset
  const result = [...products];

  switch (sortBy) {
    case 'price_asc':
    case 'price_low_high':
      return result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));

    case 'price_desc':
    case 'price_high_low':
      return result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));

    case 'rating_desc':
    case 'top_rated':
      return result.sort((a, b) => {
        const ratingDiff = (Number(b.rating) || 0) - (Number(a.rating) || 0);
        // Secondary sort by reviews count for tie-breaking high-rated products
        if (ratingDiff === 0) {
          return (Number(b.reviewsCount) || 0) - (Number(a.reviewsCount) || 0);
        }
        return ratingDiff;
      });

    case 'featured':
    default:
      return result;
  }
}

/**
 * Calculates metadata about the inventory (min/max price, category distribution)
 * useful for initializing frontend dual-point slider bounds dynamically.
 */
export function calculateInventoryMeta(inventory) {
  if (!Array.isArray(inventory) || inventory.length === 0) {
    return {
      totalProducts: 0,
      minPrice: 0,
      maxPrice: 1000,
      categories: {}
    };
  }

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  const categories = {};

  inventory.forEach((p) => {
    const price = Number(p.price) || 0;
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;

    if (p.category) {
      categories[p.category] = (categories[p.category] || 0) + 1;
    }
  });

  return {
    totalProducts: inventory.length,
    minPrice: Math.floor(minPrice),
    maxPrice: Math.ceil(maxPrice),
    categories
  };
}
