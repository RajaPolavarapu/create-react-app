import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Product } from '../types';
import AudioPlayer from '../components/AudioPlayer';

declare global { interface Window { Razorpay: any } }

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => { api.get(`/product/${id}`).then((r) => setProduct(r.data)); }, [id]);

  const checkout = async () => {
    if (!product) return;
    const { data } = await api.post('/create-order', { productId: product._id, couponCode: '' });
    const rz = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      order_id: data.orderId,
      amount: data.amount,
      currency: data.currency,
      name: 'InnerLight',
      handler: async (response: any) => {
        await api.post('/verify-payment', { ...response, productId: product._id });
        setHasAccess(true);
      }
    });
    rz.open();
  };

  if (!product) return null;
  return <div className="max-w-3xl mx-auto p-4 space-y-4"><div className="card"><h2 className="text-2xl font-bold">{product.title}</h2><p>{product.description}</p><button onClick={checkout} className="mt-4 px-4 py-2 rounded bg-stone-800 text-white">Buy Now ₹{product.price}</button></div>{product.type === 'AUDIO' && hasAccess && <AudioPlayer tracks={[{ title: product.title, url: product.file_url }]} />}{!hasAccess && <div className="card">Locked content. Purchase to unlock download / stream.</div>}</div>;
}
