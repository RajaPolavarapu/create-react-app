import { Router } from 'express';
import { createOrder, razorpayWebhook, verifyPayment } from '../controllers/paymentController.js';
import { optionalAuth } from '../middleware/auth.js';
const router = Router();
router.post('/create-order', optionalAuth, createOrder);
router.post('/verify-payment', optionalAuth, verifyPayment);
router.post('/purchase', optionalAuth, verifyPayment);
router.post('/webhook/razorpay', razorpayWebhook);
export default router;
