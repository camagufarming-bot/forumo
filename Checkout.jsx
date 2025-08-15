import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../slices/ordersSlice';
import { clearCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { items } = useSelector(s=>s.cart);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = items.reduce((sum,i)=> sum + Number(i.product.price) * i.qty, 0);

  const submit = async (e)=>{
    e.preventDefault();
    const payload = {
      items: items.map(i=>({ productId: i.product._id, qty: i.qty, price: i.product.price })),
      shippingAddress: { line1: address }
    };
    await dispatch(createOrder(payload));
    dispatch(clearCart());
    alert('Order created');
    navigate('/orders');
  };

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <div className="card space-y-3">
        <div className="text-xl font-black">Shipping</div>
        <input className="input" placeholder="Delivery address" value={address} onChange={(e)=>setAddress(e.target.value)} />
        <div className="text-sm text-gray-500">Total: R {total.toFixed(2)}</div>
        <button className="btn btn-primary" type="submit">Place order</button>
      </div>
      <div className="card">
        <div className="font-semibold mb-2">Cart summary</div>
        <ul className="space-y-1 text-sm">
          {items.map(i=>(
            <li key={i.product._id} className="flex justify-between">
              <span>{i.product.title} × {i.qty}</span>
              <span>R {(Number(i.product.price)*i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
