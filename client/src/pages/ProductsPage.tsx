import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Product } from '../types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { api.get('/products').then((r) => setProducts(r.data)); }, []);
  return <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4">{products.map((p) => <Link key={p._id} to={`/product/${p._id}`} className="card"><h3 className="font-semibold">{p.title}</h3><p>{p.description}</p><p className="mt-2">₹{p.price}</p></Link>)}</div>;
}
