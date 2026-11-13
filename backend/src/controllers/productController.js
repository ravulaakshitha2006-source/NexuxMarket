import { masterProductInventory, ALL_CATEGORIES } from '../data/products.js';
import {
  executeProductPipeline,
  calculateInventoryMeta
} from '../services/productFilterService.js';

/**
 * Controller to fetch products with combinatorial filtering and sorting
 * GET /api/products
 * Query Params:
 *  - categories: comma-separated or array
 *  - minPrice: number
 *  - maxPrice: number
 *  - minRating: number (1 to 5)
 *  - sortBy: 'price_asc' | 'price_desc' | 'rating_desc' | 'featured'
 *  - search: string
 */
export function getProducts(req, res) {
  try {
    const { categories, minPrice, maxPrice, minRating, sortBy, search } = req.query;

    const criteria = {
      categories,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      search
    };

    // Execute server-side combinatorial intersect filtering and sorting pipeline
    const filteredProducts = executeProductPipeline(masterProductInventory, criteria);

    return res.status(200).json({
      success: true,
      count: filteredProducts.length,
      totalInventory: masterProductInventory.length,
      appliedFilters: {
        categories: categories ? (Array.isArray(categories) ? categories : categories.split(',')) : [],
        minPrice: minPrice ? Number(minPrice) : null,
        maxPrice: maxPrice ? Number(maxPrice) : null,
        minRating: minRating ? Number(minRating) : null,
        sortBy: sortBy || 'featured',
        search: search || ''
      },
      data: filteredProducts
    });
  } catch (error) {
    console.error('Error processing product pipeline:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process product inventory filtering pipeline.',
      error: error.message
    });
  }
}

/**
 * Controller to fetch inventory metadata (price ranges, categories with counts)
 * GET /api/products/meta
 */
export function getProductsMeta(req, res) {
  try {
    const meta = calculateInventoryMeta(masterProductInventory);
    return res.status(200).json({
      success: true,
      allCategories: ALL_CATEGORIES,
      ...meta
    });
  } catch (error) {
    console.error('Error fetching inventory metadata:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate inventory metadata.',
      error: error.message
    });
  }
}
