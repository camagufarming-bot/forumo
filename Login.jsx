import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || '/';

  const submit = async (e)=>{
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(redirectTo, { replace: true });
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto card space-y-3">
      <h1 className="text-xl font-black">Log in</h1>
      <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="btn btn-primary" type="submit">Sign in</button>
      <p className="text-sm">No account? <Link to="/register" className="underline">Register</Link></p>
    </form>
  );
}
