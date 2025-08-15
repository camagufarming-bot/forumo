import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';
import ProductCard from '../components/ProductCard';

export default function Products(){
  const dispatch = useDispatch();
  const items = useSelector(s=>s.products.items);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  useEffect(()=>{ dispatch(fetchProducts()); }, [dispatch]);

  const search = ()=>{
    dispatch(fetchProducts({ q, category }));
  };

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap items-center gap-3">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products..." className="input max-w-sm" />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="input max-w-xs">
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
          <option value="sports">Sports</option>
          <option value="books">Books</option>
          <option value="automotive">Automotive</option>
          <option value="beauty">Beauty</option>
          <option value="other">Other</option>
        </select>
        <button onClick={search} className="btn btn-primary">Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p._id} item={p} />)}
      </div>
    </div>
  );
}
