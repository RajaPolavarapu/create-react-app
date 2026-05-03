import Product from '../models/Product.js';
export const getProducts = async (_req, res) => res.json(await Product.find().sort({ createdAt: -1 }));
export const getProductById = async (req, res) => res.json(await Product.findById(req.params.id));
