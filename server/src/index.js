import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import Product from './models/Product.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);

const seedProducts = async () => {
  if (await Product.countDocuments()) return;
  await Product.insertMany([
    { title: '21 Day Inner Peace PDF', description: 'Daily reflective guide', slug: 'inner-peace-pdf', price: 499, type: 'PDF', preview: 'https://example.com/sample.pdf', file_url: 'https://storage.example.com/inner-peace.pdf', isPremium: true },
    { title: '108 Mantra Healing Audio Pack', description: 'High quality chants', slug: 'mantra-audio-pack', price: 799, type: 'AUDIO', preview: 'https://example.com/sample.mp3', file_url: 'https://storage.example.com/mantra-pack.mp3', isPremium: true },
    { title: 'Awakening Foundations Course', description: 'Structured spiritual curriculum', slug: 'awakening-course', price: 1999, type: 'COURSE', preview: 'Lesson preview', file_url: 'https://storage.example.com/course', isPremium: true, lessons: [{ title: 'Breath Awareness', type: 'video', contentUrl: 'https://example.com/lesson-1.mp4' }] }
  ]);
};

connectDB().then(async () => {
  await seedProducts();
  app.listen(process.env.PORT || 5000, () => console.log('API running'));
});
