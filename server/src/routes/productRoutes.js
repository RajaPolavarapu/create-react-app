import { Router } from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';
const router = Router();
router.get('/products', getProducts);
router.get('/product/:id', getProductById);
export default router;
