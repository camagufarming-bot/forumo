import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Home(){
  const dispatch = useDispatch();
  const items = useSelector(s=>s.products.items);
  useEffect(()=>{ dispatch(fetchProducts()); }, [dispatch]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Discover local deals</h1>
        <Link to="/add-product" className="btn btn-primary">Sell an item</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p._id} item={p} />)}
      </div>
    </div>
  );
}
