import { Router } from 'express';
import { getProducts, getProductsMeta } from '../controllers/productController.js';

const router = Router();

// GET /api/products/meta - returns inventory metadata and price bounds
router.get('/meta', getProductsMeta);

// GET /api/products - returns filtered and sorted products
router.get('/', getProducts);

export default router;
