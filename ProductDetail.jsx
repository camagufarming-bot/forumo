import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../slices/productsSlice';
import { addToCart } from '../slices/cartSlice';
import InventoryBadge from '../components/InventoryBadge';
import { createThread, fetchThread, sendMessage } from '../slices/chatSlice';

export default function ProductDetail(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(s=>s.products.selected);
  const { token, user } = useSelector(s=>s.auth);
  const chat = useSelector(s=>s.chat.current);
  const [msg, setMsg] = useState('Hi! Is this still available?');

  useEffect(()=>{ dispatch(fetchProduct(id)); }, [id]);
  const contactSeller = async ()=>{
    if (!token) return navigate('/login', { state: { from: `/products/${id}` } });
    // Assume product has seller info
    const payload = { productId: id, toUserId: product?.seller?._id };
    const res = await dispatch(createThread(payload)).unwrap();
  };
  const send = async ()=>{
    if (!chat?._id) return;
    await dispatch(sendMessage({ threadId: chat._id, message: msg }));
    setMsg('');
  };

  if (!product) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        {product.images?.[0] && <img src={product.images[0]} alt={product.title} className="w-full aspect-video object-cover rounded-xl" />}
      </div>
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">{product.title}</h1>
          <InventoryBadge product={product} />
        </div>
        <div className="text-gray-600">{product.description}</div>
        <div className="text-2xl font-black">R {Number(product.price).toFixed(2)}</div>
        <div className="flex items-center gap-3">
          <button className="btn btn-primary" onClick={()=>dispatch(addToCart({ product, qty: 1 }))}>
            Add to cart
          </button>
          <button className="btn" onClick={contactSeller}>
            Contact seller
          </button>
        </div>

        {/* Inline chat composer (shows once a thread is opened/created) */}
        {token && (
          <div className="mt-4 space-y-2">
            <div className="text-sm text-gray-500">Message seller</div>
            <div className="flex gap-2">
              <input className="input flex-1" placeholder="Write a message..." value={msg} onChange={(e)=>setMsg(e.target.value)} />
              <button className="btn btn-primary" onClick={send}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
