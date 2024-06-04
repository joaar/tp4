'use client'
import { useEffect, useState } from 'react';

const CounterComponent = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCount = async () => {
    const response = await fetch('/api/counter');
    const data = await response.json();
    setCount(data.count);
  };

  const incrementCount = async () => {
    setLoading(true);
    const response = await fetch('/api/counter', { method: 'POST' });
    const data = await response.json();
    setCount(data.count);
    setLoading(false);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className=" p-8 bg-zinc-900 rounded shadow-md text-center">
        <h1 className=" text-5xl font-bold mb-4 text-white">{count}</h1>
        <button
          onClick={incrementCount}
          className={`px-8 py-4 bg-zinc-700 rounded text-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Aumentar'}
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;

