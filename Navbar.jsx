import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { fetchThreads } from '../slices/chatSlice';
import { getSocket } from '../services/socket';
import { receiveSocketMessage } from '../slices/chatSlice';

export default function Navbar(){
  const { user, token } = useSelector(s=>s.auth);
  const cartCount = useSelector(s=>s.cart.items.length);
  const unread = useSelector(s=>s.chat.unread);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) return;
    const socket = getSocket(token);
    socket.on('chat:new-message', (payload)=>{
      dispatch(receiveSocketMessage(payload));
    });
    dispatch(fetchThreads());
    return ()=>{ socket.off('chat:new-message'); };
  }, [token]);

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container-p py-3 flex items-center gap-4">
        <Link to="/" className="text-xl font-black">Forumo</Link>
        <nav className="flex-1 flex items-center gap-4 text-sm">
          <Link to="/products" className="hover:underline">Browse</Link>
          <Link to="/add-product" className="hover:underline">Sell</Link>
          {user && <Link to="/messages" className="hover:underline">Messages
            {unread > 0 && <span className="ml-1 inline-flex items-center justify-center text-xs bg-black text-white rounded-full w-5 h-5">{unread}</span>}
          </Link>}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">Cart
            <span className="ml-1 inline-flex items-center justify-center text-xs bg-black text-white rounded-full w-5 h-5">{cartCount}</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/orders" className="hover:underline">Orders</Link>
              <Link to="/profile" className="hover:underline">{user.firstName || user.email}</Link>
              <button className="text-red-600 hover:underline" onClick={()=>{dispatch(logout()); navigate('/');}}>Sign out</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Log in</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
