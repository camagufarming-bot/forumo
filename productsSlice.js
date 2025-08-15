import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
import endpoints from '../api/endpoints';

export const fetchProducts = createAsyncThunk('products/fetch', async (params={})=>{
  const { data } = await client.get(endpoints.products.list, { params });
  return data.items || data;
});
export const fetchProduct = createAsyncThunk('products/fetchOne', async (id)=>{
  const { data } = await client.get(endpoints.products.byId(id));
  return data;
});
export const createProduct = createAsyncThunk('products/create', async (payload)=>{
  const { data } = await client.post(endpoints.products.create, payload, { headers:{'Content-Type':'application/json'} });
  return data;
});

const slice = createSlice({
  name: 'products',
  initialState: { items: [], selected: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(fetchProducts.fulfilled, (s,a)=>{ s.items=a.payload; s.status='succeeded'; })
     .addCase(fetchProduct.fulfilled, (s,a)=>{ s.selected=a.payload; s.status='succeeded'; })
     .addCase(createProduct.fulfilled, (s,a)=>{ s.items.unshift(a.payload); s.status='succeeded'; })
     .addMatcher((a)=>a.type.startsWith('products/') && a.type.endsWith('/pending'), (s)=>{ s.status='loading'; s.error=null; })
     .addMatcher((a)=>a.type.startsWith('products/') && a.type.endsWith('/rejected'), (s,a)=>{ s.status='failed'; s.error=a.error.message; });
  }
});

export default slice.reducer;
