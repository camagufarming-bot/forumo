import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../slices/authSlice';

export default function Register(){
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username:'', email:'', password:'', firstName:'', lastName:'', phone:'' });
  const onChange = (k,v)=>setForm({...form,[k]:v});

  const submit = async (e)=>{
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      alert('Account created');
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto card space-y-3">
      <h1 className="text-xl font-black">Create account</h1>
      {['username','email','password','firstName','lastName','phone'].map(k=>(
        <input key={k} className="input" type={k==='password'?'password':'text'} placeholder={k} value={form[k]} onChange={(e)=>onChange(k, e.target.value)} />
      ))}
      <button className="btn btn-primary" type="submit">Register</button>
    </form>
  );
}
