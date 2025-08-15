import React from 'react';
import { Link } from 'react-router-dom';
import InventoryBadge from './InventoryBadge';

export default function ProductCard({ item }){
  return (
    <Link to={`/products/${item._id}`} className="card">
      {item.images?.[0] && (
        <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover rounded-xl" />
      )}
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{item.title}</h3>
          <InventoryBadge product={item} />
        </div>
        <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
        <div className="font-bold mt-1">R {Number(item.price).toFixed(2)}</div>
      </div>
    </Link>
  );
}
