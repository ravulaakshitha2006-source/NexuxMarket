/**
 * API Service for fetching products and inventory metadata from the backend.
 * All computations, filtering, validations, and sorting occur on the server.
 */

const BASE_URL = '/api';

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.categories && filters.categories.length > 0) {
    params.set('categories', filters.categories.join(','));
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    params.set('minPrice', filters.minPrice);
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    params.set('maxPrice', filters.maxPrice);
  }

  if (filters.minRating && filters.minRating > 0) {
    params.set('minRating', filters.minRating);
  }

  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }

  if (filters.search && filters.search.trim().length > 0) {
    params.set('search', filters.search.trim());
  }

  const queryString = params.toString();
  const url = `${BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Server returned status ${response.status}`);
  }

  return await response.json();
}

export async function fetchInventoryMeta() {
  const response = await fetch(`${BASE_URL}/products/meta`);
  if (!response.ok) {
    throw new Error(`Failed to fetch inventory metadata: ${response.status}`);
  }
  return await response.json();
}
