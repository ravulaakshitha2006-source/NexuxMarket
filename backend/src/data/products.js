/**
 * Master Product Item Inventory Dataset
 * High-traffic marketplace product inventory with realistic attributes,
 * diverse categories, pricing distributions, and star ratings.
 */

export const masterProductInventory = [
  // --- Electronics ---
  {
    id: "prod-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Electronics",
    price: 399.99,
    rating: 4.8,
    reviewsCount: 2450,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description: "Industry-leading noise canceling with two processors and 8 microphones.",
    inStock: true,
    brand: "Sony"
  },
  {
    id: "prod-2",
    name: "Apple MacBook Air M3 15-inch",
    category: "Electronics",
    price: 1299.00,
    rating: 4.9,
    reviewsCount: 1820,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    description: "Strikingly thin design with up to 18 hours of battery life and Liquid Retina display.",
    inStock: true,
    brand: "Apple"
  },
  {
    id: "prod-3",
    name: "Logitech MX Master 3S Wireless Mouse",
    category: "Electronics",
    price: 99.99,
    rating: 4.7,
    reviewsCount: 3100,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
    description: "Quiet clicks and 8K DPI any-surface tracking with ergonomic thumb rest.",
    inStock: true,
    brand: "Logitech"
  },
  {
    id: "prod-4",
    name: "Amazon Echo Dot 5th Gen Smart Speaker",
    category: "Electronics",
    price: 49.99,
    rating: 4.2,
    reviewsCount: 890,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&auto=format&fit=crop&q=80",
    description: "Vibrant sound with Alexa integration for smart home voice control.",
    inStock: true,
    brand: "Amazon"
  },
  {
    id: "prod-5",
    name: "Budget Bluetooth Earbuds Basic",
    category: "Electronics",
    price: 19.99,
    rating: 2.8,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    description: "Entry level wireless earbuds with basic stereo sound and microphone.",
    inStock: true,
    brand: "SoundMini"
  },
  {
    id: "prod-6",
    name: "Kindle Paperwhite 16GB Display",
    category: "Electronics",
    price: 149.99,
    rating: 4.6,
    reviewsCount: 1650,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description: "6.8\" display with adjustable warm light and waterproof chassis.",
    inStock: true,
    brand: "Amazon"
  },
  {
    id: "prod-7",
    name: "GoPro HERO12 Black Action Camera",
    category: "Electronics",
    price: 349.00,
    rating: 4.5,
    reviewsCount: 780,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80",
    description: "5.3K video recording, HyperSmooth 6.0 stabilization, and rugged build.",
    inStock: true,
    brand: "GoPro"
  },

  // --- Apparel ---
  {
    id: "prod-8",
    name: "Classic Heavyweight Cotton Crewneck Tee",
    category: "Apparel",
    price: 28.00,
    rating: 4.4,
    reviewsCount: 920,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    description: "100% premium combed organic cotton with reinforced collar ribbing.",
    inStock: true,
    brand: "Urban Basics"
  },
  {
    id: "prod-9",
    name: "Patagonia Torrentshell 3L Rain Jacket",
    category: "Apparel",
    price: 179.00,
    rating: 4.9,
    reviewsCount: 1420,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    description: "H2No Performance Standard 3-layer waterproof and breathable protection.",
    inStock: true,
    brand: "Patagonia"
  },
  {
    id: "prod-10",
    name: "Levi's 501 Original Fit Jeans",
    category: "Apparel",
    price: 79.50,
    rating: 4.6,
    reviewsCount: 4500,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80",
    description: "The timeless straight leg icon with signature button fly closure.",
    inStock: true,
    brand: "Levi's"
  },
  {
    id: "prod-11",
    name: "Merino Wool Thermal Knit Sweater",
    category: "Apparel",
    price: 115.00,
    rating: 4.7,
    reviewsCount: 680,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    description: "Ultra-fine merino yarn offering natural odor resistance and thermoregulation.",
    inStock: true,
    brand: "Nordic Wool"
  },
  {
    id: "prod-12",
    name: "Generic Graphic Print T-Shirt",
    category: "Apparel",
    price: 14.99,
    rating: 2.4,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    description: "Faded graphic tee with synthetic blend fabric.",
    inStock: true,
    brand: "FastStyle"
  },
  {
    id: "prod-13",
    name: "Athletic Quick-Dry Training Hoodie",
    category: "Apparel",
    price: 65.00,
    rating: 4.3,
    reviewsCount: 530,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    description: "Moisture-wicking 4-way stretch fabric with thumbhole cuffs.",
    inStock: true,
    brand: "AeroActive"
  },

  // --- Footwear ---
  {
    id: "prod-14",
    name: "Nike Air Zoom Pegasus 40 Running Shoes",
    category: "Footwear",
    price: 130.00,
    rating: 4.7,
    reviewsCount: 2200,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description: "Springy ride for every run, familiar feel to conquer your training goals.",
    inStock: true,
    brand: "Nike"
  },
  {
    id: "prod-15",
    name: "Birkenstock Arizona Leather Sandals",
    category: "Footwear",
    price: 110.00,
    rating: 4.8,
    reviewsCount: 3800,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=80",
    description: "Anatomically shaped cork-latex footbed with dual adjustable straps.",
    inStock: true,
    brand: "Birkenstock"
  },
  {
    id: "prod-16",
    name: "Timberland 6-Inch Premium Waterproof Boot",
    category: "Footwear",
    price: 198.00,
    rating: 4.6,
    reviewsCount: 3100,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80",
    description: "Seam-sealed waterproof construction in rugged nubuck leather.",
    inStock: true,
    brand: "Timberland"
  },
  {
    id: "prod-17",
    name: "Vans Old Skool Classic Skate Shoes",
    category: "Footwear",
    price: 70.00,
    rating: 4.5,
    reviewsCount: 4100,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80",
    description: "Durable suede and canvas uppers featuring the unmistakable side stripe.",
    inStock: true,
    brand: "Vans"
  },
  {
    id: "prod-18",
    name: "Cheap Foam Shower Slides",
    category: "Footwear",
    price: 12.00,
    rating: 1.8,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
    description: "Rigid lightweight EVA slide sandals for pool and locker rooms.",
    inStock: true,
    brand: "SlipQuick"
  },
  {
    id: "prod-19",
    name: "Salomon Speedcross 5 Trail Running Shoes",
    category: "Footwear",
    price: 145.00,
    rating: 4.8,
    reviewsCount: 1120,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    description: "Deep chevron lugs with aggressive grip and precise Sensifit cradle.",
    inStock: true,
    brand: "Salomon"
  },

  // --- Accessories ---
  {
    id: "prod-20",
    name: "Bellroy Slim Sleeve Leather Wallet",
    category: "Accessories",
    price: 79.00,
    rating: 4.7,
    reviewsCount: 890,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
    description: "Certified environmentally accredited top-grain leather with pull-tab card storage.",
    inStock: true,
    brand: "Bellroy"
  },
  {
    id: "prod-21",
    name: "Ray-Ban Classic Polarized Wayfarer",
    category: "Accessories",
    price: 185.00,
    rating: 4.8,
    reviewsCount: 2900,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    description: "Iconic square frame with crystal green UV-protective polarized lenses.",
    inStock: true,
    brand: "Ray-Ban"
  },
  {
    id: "prod-22",
    name: "Aer City Sling 2 EDC Crossbody Bag",
    category: "Accessories",
    price: 89.00,
    rating: 4.9,
    reviewsCount: 640,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    description: "1680D Cordura ballistic nylon exterior with Fidlock magnetic buckle.",
    inStock: true,
    brand: "Aer"
  },
  {
    id: "prod-23",
    name: "Stainless Steel Insulated Travel Tumbler 20oz",
    category: "Accessories",
    price: 34.95,
    rating: 4.6,
    reviewsCount: 1780,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80",
    description: "Double-wall vacuum insulation keeps ice frozen for 24+ hours.",
    inStock: true,
    brand: "HydroVibe"
  },
  {
    id: "prod-24",
    name: "Plastic Clip Keychain Ring",
    category: "Accessories",
    price: 6.99,
    rating: 2.9,
    reviewsCount: 80,
    image: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop&q=80",
    description: "Multicolor plastic carabiner clips pack of 3.",
    inStock: true,
    brand: "DailyFinds"
  },

  // --- Home & Kitchen ---
  {
    id: "prod-25",
    name: "Fellow Ode Gen 2 Brew Coffee Grinder",
    category: "Home & Kitchen",
    price: 345.00,
    rating: 4.9,
    reviewsCount: 870,
    image: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&auto=format&fit=crop&q=80",
    description: "Commercial-grade 64mm flat burrs with 31 grind settings for pour-over excellence.",
    inStock: true,
    brand: "Fellow"
  },
  {
    id: "prod-26",
    name: "Le Creuset Enameled Cast Iron Dutch Oven 5.5 Qt",
    category: "Home & Kitchen",
    price: 420.00,
    rating: 4.9,
    reviewsCount: 2600,
    image: "https://images.unsplash.com/photo-1584990347449-399c75908b89?w=600&auto=format&fit=crop&q=80",
    description: "Superior heat distribution and heat retention for slow-cooking and searing.",
    inStock: true,
    brand: "Le Creuset"
  },
  {
    id: "prod-27",
    name: "Ninja Air Fryer Pro 4-in-1",
    category: "Home & Kitchen",
    price: 119.99,
    rating: 4.7,
    reviewsCount: 5200,
    image: "https://images.unsplash.com/photo-1585695344338-59375163292e?w=600&auto=format&fit=crop&q=80",
    description: "Air fry, roast, reheat, and dehydrate up to 5 lbs of food with 75% less fat.",
    inStock: true,
    brand: "Ninja"
  },
  {
    id: "prod-28",
    name: "Chefs Non-Stick 8-inch Frying Pan",
    category: "Home & Kitchen",
    price: 24.99,
    rating: 3.4,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80",
    description: "Aluminum skillet with standard Teflon coating and silicone handle.",
    inStock: true,
    brand: "CookPro"
  },
  {
    id: "prod-29",
    name: "Manual Citrus Lemon Juicer Press",
    category: "Home & Kitchen",
    price: 16.50,
    rating: 4.1,
    reviewsCount: 450,
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600&auto=format&fit=crop&q=80",
    description: "Heavy duty zinc alloy hand press squeezer with ergonomic handles.",
    inStock: true,
    brand: "KitchenAid"
  },

  // --- Books ---
  {
    id: "prod-30",
    name: "Designing Data-Intensive Applications",
    category: "Books",
    price: 45.00,
    rating: 4.9,
    reviewsCount: 4900,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description: "The definitive guide to the architecture of storage engines, distributed systems, and streams.",
    inStock: true,
    brand: "O'Reilly Media"
  },
  {
    id: "prod-31",
    name: "Atomic Habits: Proven Way to Build Good Habits",
    category: "Books",
    price: 18.00,
    rating: 4.9,
    reviewsCount: 15400,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
    description: "An easy and proven way to build good habits and break bad ones by James Clear.",
    inStock: true,
    brand: "Penguin"
  },
  {
    id: "prod-32",
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    category: "Books",
    price: 42.50,
    rating: 4.5,
    reviewsCount: 3900,
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80",
    description: "Best practices, code smells, and heuristics for writing professional clean code.",
    inStock: true,
    brand: "Prentice Hall"
  },
  {
    id: "prod-33",
    name: "Outdated Tech Handbook 2012 Edition",
    category: "Books",
    price: 8.99,
    rating: 2.1,
    reviewsCount: 18,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80",
    description: "Archival reference on deprecated software APIs and discontinued systems.",
    inStock: true,
    brand: "LegacyPress"
  }
];

export const ALL_CATEGORIES = [
  "Electronics",
  "Apparel",
  "Footwear",
  "Accessories",
  "Home & Kitchen",
  "Books"
];
