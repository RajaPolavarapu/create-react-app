import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <section className="card text-center">
        <h1 className="text-3xl font-bold">Find Daily Spiritual Clarity</h1>
        <p className="mt-2">Transform your routine with guided PDFs, mantra audio packs, and step-by-step courses.</p>
        <Link to="/products" className="inline-block mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl">Explore Products</Link>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        {['Guided practices', 'Deep healing chants', 'Practical spiritual courses'].map((b) => <div key={b} className="card">{b}</div>)}
      </section>
    </main>
  );
}
