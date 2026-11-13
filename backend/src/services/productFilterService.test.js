import test from 'node:test';
import assert from 'node:assert/strict';
import {
  executeProductPipeline,
  applySortingPipeline,
  calculateInventoryMeta
} from './productFilterService.js';

const mockInventory = [
  { id: '1', name: 'Alpha Running Shoes', category: 'Footwear', price: 120, rating: 4.5, reviewsCount: 100 },
  { id: '2', name: 'Beta Leather Boots', category: 'Footwear', price: 200, rating: 4.8, reviewsCount: 300 },
  { id: '3', name: 'Gamma Wireless Earbuds', category: 'Electronics', price: 50, rating: 3.8, reviewsCount: 50 },
  { id: '4', name: 'Delta Smart Laptop', category: 'Electronics', price: 1000, rating: 4.9, reviewsCount: 800 },
  { id: '5', name: 'Epsilon Casual T-Shirt', category: 'Apparel', price: 25, rating: 4.0, reviewsCount: 20 },
  { id: '6', name: 'Zeta Cheap Slippers', category: 'Footwear', price: 10, rating: 2.0, reviewsCount: 5 }
];

test('Graceful Null Handling: returns all items when filters are empty or undefined', () => {
  const result = executeProductPipeline(mockInventory, {});
  assert.equal(result.length, 6);

  const resultNull = executeProductPipeline(mockInventory, {
    categories: null,
    minPrice: null,
    maxPrice: null,
    minRating: null
  });
  assert.equal(resultNull.length, 6);
});

test('Category Checklist Filtering: filters items matching single or multiple categories', () => {
  const single = executeProductPipeline(mockInventory, { categories: ['Electronics'] });
  assert.equal(single.length, 2);
  assert.ok(single.every((p) => p.category === 'Electronics'));

  const multiple = executeProductPipeline(mockInventory, { categories: ['Footwear', 'Apparel'] });
  assert.equal(multiple.length, 4);
  assert.ok(multiple.every((p) => p.category === 'Footwear' || p.category === 'Apparel'));
});

test('Price Boundary: respects dual-point bounds', () => {
  const priceRange = executeProductPipeline(mockInventory, { minPrice: 30, maxPrice: 150 });
  // Should include: Alpha (120), Gamma (50)
  assert.equal(priceRange.length, 2);
  assert.deepEqual(priceRange.map((p) => p.id).sort(), ['1', '3']);
});

test('Star Rating Threshold: returns items with rating >= minRating', () => {
  const ratingFiltered = executeProductPipeline(mockInventory, { minRating: 4.5 });
  // Alpha (4.5), Beta (4.8), Delta (4.9)
  assert.equal(ratingFiltered.length, 3);
  assert.ok(ratingFiltered.every((p) => p.rating >= 4.5));
});

test('Combinatorial Intersect Filtering: simultaneously satisfies category, price, and rating', () => {
  const combined = executeProductPipeline(mockInventory, {
    categories: ['Footwear'],
    minPrice: 50,
    maxPrice: 250,
    minRating: 4.6
  });
  // Footwear, price 50-250, rating >= 4.6 -> Beta Leather Boots (200, 4.8)
  assert.equal(combined.length, 1);
  assert.equal(combined[0].id, '2');
});

test('Empty Match Handling: returns empty array when filters are too tight', () => {
  const empty = executeProductPipeline(mockInventory, {
    categories: ['Electronics'],
    minPrice: 2000 // No electronics > 2000
  });
  assert.equal(empty.length, 0);
});

test('Sorting Pipeline: Price Low to High', () => {
  const sorted = executeProductPipeline(mockInventory, { sortBy: 'price_asc' });
  assert.equal(sorted[0].id, '6'); // 10
  assert.equal(sorted[1].id, '5'); // 25
  assert.equal(sorted[sorted.length - 1].id, '4'); // 1000
});

test('Sorting Pipeline: Top Rated First', () => {
  const sorted = executeProductPipeline(mockInventory, { sortBy: 'rating_desc' });
  assert.equal(sorted[0].id, '4'); // 4.9
  assert.equal(sorted[1].id, '2'); // 4.8
  assert.equal(sorted[sorted.length - 1].id, '6'); // 2.0
});

test('Metadata Calculation: computes bounds correctly', () => {
  const meta = calculateInventoryMeta(mockInventory);
  assert.equal(meta.totalProducts, 6);
  assert.equal(meta.minPrice, 10);
  assert.equal(meta.maxPrice, 1000);
  assert.equal(meta.categories['Footwear'], 3);
});
