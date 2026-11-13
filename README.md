# E-Commerce Product Multi-Filter Sidebar

> **Quantiphi Vibe Coding Round Solution**  
> High-Traffic Marketplace Catalog with Server-Side Combinatorial Intersect Filtering, Sticky Multi-Filter Sidebar, Dual-Point Price Range Slider, and Instant Reactive Sorting.

---

## 🌟 Executive Summary & Problem Mission

In a high-traffic e-commerce marketplace, customers need the ability to sift through large inventories simultaneously using multiple, complex filtering criteria without performance degradation or inconsistent UI state.

This production-grade solution adheres to all candidate guidelines:
1. **Interactive Sidebar Layout:** Left sticky filter panel containing a Category Checklist group, a dual-point Price Range Slider track with min/max bounds, and a Minimum Star Rating radio group (1 to 5 stars).
2. **Dynamic Product Inventory Grid:** Right section displaying responsive product cards with thumbnails, prices, star ratings, review counts, badges, and quick actions.
3. **Instant State Feedback:** Instant catalog updates on every click or slider change without a manual "Submit" button. If 0 items match, renders a `"No items match your criteria. Reset filters"` screen.
4. **Server-Side Business Logic & Calculations:** All computations, validations, data reduction, combinatorial intersection, and sorting are executed on the backend. The frontend handles presentation and user interaction.
5. **The Vibe Check (Sorting Pipeline):** A top-right "Sort By" dropdown menu (*Price: Low to High*, *Price: High to Low*, *Top Rated First*, *Featured*). The data pipeline filters the master inventory first, and then arranges the visual presentation order of the remaining items.
6. **Clean, Scalable Architecture:** Modular separation between API controllers, service logic, data layer, unit tests, and React components.

---

## 🏗️ Architecture & System Design

```
quantiphi/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── productController.js        # Request handling, query normalization & response formatting
│   │   ├── services/
│   │   │   ├── productFilterService.js     # Core combinatorial intersect filtering & sorting pipeline
│   │   │   └── productFilterService.test.js# Automated unit tests covering all edge cases
│   │   ├── data/
│   │   │   └── products.js                 # Master inventory dataset across 6 distinct categories
│   │   └── server.js                       # Express server with CORS, health check, and route mounting
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar/
│   │   │   │   ├── CategoryFilter.jsx      # Multi-select category checklist with item count badges
│   │   │   │   ├── PriceRangeSlider.jsx    # Dual-point range slider track with visual highlight
│   │   │   │   ├── RatingFilter.jsx        # 1-5 Star minimum rating radio buttons
│   │   │   │   └── Sidebar.jsx             # Sticky sidebar panel container
│   │   │   ├── Catalog/
│   │   │   │   ├── ProductCard.jsx         # Card with image, price, rating, badge, reviews
│   │   │   │   ├── ProductGrid.jsx         # Responsive grid + skeleton loading state
│   │   │   │   ├── SortDropdown.jsx        # Top-right "Sort By" dropdown menu (The Vibe Check)
│   │   │   │   ├── EmptyState.jsx          # "No items match your criteria. Reset filters" screen
│   │   │   │   └── ActiveFiltersBar.jsx    # Active filter chips with quick dismiss and live count
│   │   │   ├── Header/
│   │   │   │   └── Navbar.jsx              # Brand header with instant search bar
│   │   │   ├── services/
│   │   │   │   └── api.js                  # Frontend API client communicating with backend
│   │   │   ├── App.jsx                     # Core state coordinator & layout orchestrator
│   │   │   ├── main.jsx                    # React entry point
│   │   │   └── index.css                   # Custom dual-point slider styling & Tailwind directives
│   ├── vite.config.js                      # Vite config with API proxy
│   ├── tailwind.config.js                  # Custom palette & styling rules
│   └── package.json
├── package.json                            # Unified workspace runner scripts
└── README.md                               # Project documentation & Viva Guide
```

---

## ⚙️ Core Logic Deep Dive (For Evaluation & Viva)

### 1. Combinatorial Intersect Filtering Array
Located in `backend/src/services/productFilterService.js`:

```javascript
const filteredProducts = inventory.filter((product) => {
  // 1. Category Checklist intersection (OR within categories, AND across criteria)
  if (normalizedCategories.length > 0) {
    if (!product.category || !normalizedCategories.includes(product.category.toLowerCase())) {
      return false;
    }
  }

  // 2. Dual-point Price Boundary check (Min <= Price <= Max)
  const price = Number(product.price);
  if (!isNaN(price)) {
    if (minPrice !== null && price < minPrice) return false;
    if (maxPrice !== null && price > maxPrice) return false;
  }

  // 3. Minimum Star Rating threshold (Rating >= MinRating)
  const rating = Number(product.rating);
  if (minRating > 0) {
    if (isNaN(rating) || rating < minRating) return false;
  }

  return true;
});
```

- **Time Complexity:** $O(N)$ linear single-pass over the master inventory.
- **Set Intersection:** A candidate item is only retained if `satisfiesCategory AND satisfiesPrice AND satisfiesRating`.

### 2. Graceful Null Handling
When all sidebar filters are unselected, reset, or cleared:
- `normalizedCategories.length === 0` $\rightarrow$ category check bypassed.
- `minPrice === null && maxPrice === null` $\rightarrow$ price check bypassed.
- `minRating === 0` $\rightarrow$ star rating check bypassed.
- The pipeline effortlessly returns the base product inventory without throwing errors or dropping data.

### 3. The Vibe Check: Filtering First, Then Sorting
As specified in the prompt, sorting runs **after** the data reduction step:
1. Master dataset ($N$ items) $\rightarrow$ Combinatorial Filter $\rightarrow$ Filtered subset ($K$ items, $K \le N$).
2. Filtered subset ($K$ items) $\rightarrow$ Sorting Algorithm $\rightarrow$ Sorted presentation order.
- **Benefit:** Sorting $K \log K$ elements where $K \le N$ is strictly faster and computationally more efficient than sorting the entire catalog of $N$ items before filtering.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended, tested on v24)
- npm (v9+ recommended)

### 1. Quick Start (Run Both Backend & Frontend Simultaneously)
From the root directory:
```bash
# Start backend (port 5000) and frontend (port 3000) concurrently
npm run dev
```
Open your browser at `http://localhost:3000`.

### 2. Running Services Individually
```bash
# Terminal 1: Start Backend API
cd backend
npm run dev
# Running on http://localhost:5000

# Terminal 2: Start Frontend UI
cd frontend
npm run dev
# Running on http://localhost:3000
```

### 3. Running Automated Unit Tests
```bash
npm test
# or: cd backend && npm test
```
**Test Results:**
```
✔ Graceful Null Handling: returns all items when filters are empty or undefined
✔ Category Checklist Filtering: filters items matching single or multiple categories
✔ Price Boundary: respects dual-point bounds
✔ Star Rating Threshold: returns items with rating >= minRating
✔ Combinatorial Intersect Filtering: simultaneously satisfies category, price, and rating
✔ Empty Match Handling: returns empty array when filters are too tight
✔ Sorting Pipeline: Price Low to High
✔ Sorting Pipeline: Top Rated First
✔ Metadata Calculation: computes bounds correctly

ℹ tests 9 | pass 9 | fail 0
```

---

## 📡 Backend API Reference

### `GET /api/products`
Retrieves products matching active criteria.

**Query Parameters:**
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `categories` | String | Comma-separated list of categories | `Electronics,Footwear` |
| `minPrice` | Number | Minimum price bound | `50` |
| `maxPrice` | Number | Maximum price bound | `500` |
| `minRating` | Number | Minimum star rating threshold (1-5) | `4.0` |
| `sortBy` | String | Sort order: `price_asc`, `price_desc`, `rating_desc`, `featured` | `price_asc` |
| `search` | String | Optional keyword search query | `wireless` |

**Sample Response:**
```json
{
  "success": true,
  "count": 2,
  "totalInventory": 33,
  "appliedFilters": {
    "categories": ["Electronics"],
    "minPrice": 50,
    "maxPrice": 500,
    "minRating": 4.5,
    "sortBy": "price_asc"
  },
  "data": [
    {
      "id": "prod-1",
      "name": "Sony WH-1000XM5 Wireless Headphones",
      "category": "Electronics",
      "price": 399.99,
      "rating": 4.8,
      "reviewsCount": 2450,
      "image": "https://images.unsplash.com/...",
      "brand": "Sony"
    }
  ]
}
```

### `GET /api/products/meta`
Returns catalog metadata including dynamic minimum/maximum prices and per-category product counts to dynamically initialize frontend slider bounds.

---

## 🎤 Viva Discussion Guide & Cheat Sheet

During the Viva evaluation round, be ready to address the following key points:

1. **Why implement filtering and sorting on the server side instead of in the browser?**
   - In a high-traffic marketplace store with tens of thousands of items, transferring the full inventory payload to the browser causes high bandwidth consumption, slow initial page loads, and memory bottlenecks on mobile devices.
   - Performing computations server-side allows the database/backend to apply indexed filtering, pagination, and caching before sending only the relevant view payload.

2. **How does the Combinatorial Intersect Filtering work?**
   - It computes the mathematical intersection ($A \cap B \cap C$) of all active conditions.
   - A product must satisfy category condition (if selected), dual-point price boundary, and star rating threshold simultaneously.
   - If an item fails any active condition, it is excluded immediately.

3. **Why refactor the pipeline to filter first, then sort?**
   - Computational complexity: Filtering reduces the collection from $N$ to $K$ items ($K \le N$). Sorting has a complexity of $O(K \log K)$. Sorting only the filtered subset is strictly more optimal than sorting all $N$ items ($O(N \log N)$) and then discarding elements.

4. **How is Instant State Feedback achieved without UI lag?**
   - Filter state updates trigger an API call immediately on clicks.
   - For continuous inputs like the dual-point range slider and search input, a 120ms debounce prevents unnecessary intermediate network calls while maintaining a fluid 60fps interaction feel.

5. **How does the dual-point price slider work without third-party heavy dependencies?**
   - Built using dual overlapping HTML5 range inputs with CSS pointer-event controls and a dynamically computed track highlight bar (`left` and `width` derived from percentages). This ensures zero extra bundle weight and 100% native mobile touch support.
