import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../slices/productsSlice';

export default function AddProduct(){
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title:'', description:'', price:'', category:'other', condition:'good', images:[] });
  const onChange = (k,v)=>setForm({...form,[k]:v});

  const submit = async (e)=>{
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    await dispatch(createProduct(payload));
    setForm({ title:'', description:'', price:'', category:'other', condition:'good', images:[] });
    alert('Product created');
  };

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <div className="card space-y-3">
        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title} onChange={(e)=>onChange('title', e.target.value)} required />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input h-32" value={form.description} onChange={(e)=>onChange('description', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Price (R)</label>
            <input type="number" className="input" value={form.price} onChange={(e)=>onChange('price', e.target.value)} required />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category} onChange={(e)=>onChange('category', e.target.value)}>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
              <option value="automotive">Automotive</option>
              <option value="beauty">Beauty</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Condition</label>
          <select className="input" value={form.condition} onChange={(e)=>onChange('condition', e.target.value)}>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div>
          <label className="label">Image URL</label>
          <input className="input" value={form.images[0] || ''} onChange={(e)=>onChange('images', e.target.value ? [e.target.value] : [])} placeholder="https://..." />
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
      </div>
      <div className="card">
        <p className="text-sm text-gray-500">Tip: You can switch this to real file uploads later using presigned URLs; for now we accept a single image URL.</p>
      </div>
    </form>
  );
}
