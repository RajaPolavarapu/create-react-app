import crypto from 'crypto';
import Razorpay from 'razorpay';
import Product from '../models/Product.js';
import Purchase from '../models/Purchase.js';

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

export const createOrder = async (req, res) => {
  const { productId, couponCode } = req.body;
  const product = await Product.findById(productId);
  let amount = product.price;
  if (couponCode === 'WELCOME10') amount *= 0.9;
  const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency: 'INR', receipt: `rcpt_${productId}` });
  await Purchase.create({ productId, userId: req.user?.uid, email: req.user?.email, razorpayOrderId: order.id, status: 'created' });
  res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const digest = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  if (digest !== razorpay_signature) return res.status(400).json({ message: 'Signature mismatch' });
  const payment = await razorpay.payments.fetch(razorpay_payment_id);
  if (payment.status !== 'captured') return res.status(400).json({ message: 'Payment not captured' });
  await Purchase.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { razorpayPaymentId: razorpay_payment_id, status: 'captured' });
  res.json({ success: true });
};

export const razorpayWebhook = async (req, res) => {
  const body = JSON.stringify(req.body);
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(body).digest('hex');
  if (expected !== req.headers['x-razorpay-signature']) return res.status(400).send('invalid');
  const event = req.body.event;
  if (event === 'payment.captured') {
    const payment = req.body.payload.payment.entity;
    await Purchase.findOneAndUpdate({ razorpayOrderId: payment.order_id }, { status: 'captured', razorpayPaymentId: payment.id });
  }
  if (event === 'payment.failed') {
    const payment = req.body.payload.payment.entity;
    await Purchase.findOneAndUpdate({ razorpayOrderId: payment.order_id }, { status: 'failed' });
  }
  res.json({ ok: true });
};
