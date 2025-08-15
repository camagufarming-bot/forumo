import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQty, clearCart } from '../slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const { items } = useSelector(s=>s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = items.reduce((sum,i)=> sum + Number(i.product.price) * i.qty, 0);

  return (
    <div className="space-y-4">
      <div className="card">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary mt-3">Browse products</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(it=>(
              <div key={it.product._id} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold">{it.product.title}</div>
                  <div className="text-sm text-gray-500">R {Number(it.product.price).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>dispatch(updateQty({ id: it.product._id, qty: Math.max(1, it.qty-1) }))} className="btn">-</button>
                  <span className="w-10 text-center">{it.qty}</span>
                  <button onClick={()=>dispatch(updateQty({ id: it.product._id, qty: it.qty+1 }))} className="btn">+</button>
                </div>
                <button onClick={()=>dispatch(removeFromCart(it.product._id))} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-black">Total: R {total.toFixed(2)}</div>
        <div className="flex items-center gap-3">
          <button onClick={()=>dispatch(clearCart())}>Clear</button>
          <button onClick={()=>navigate('/checkout')} className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
}
