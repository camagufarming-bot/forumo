import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
import endpoints from '../api/endpoints';

export const createOrder = createAsyncThunk('orders/create', async (payload)=>{
  const { data } = await client.post(endpoints.orders.create, payload);
  return data;
});
export const fetchMyOrders = createAsyncThunk('orders/my', async ()=>{
  const { data } = await client.get(endpoints.orders.mine);
  return data.items || data;
});

const slice = createSlice({
  name: 'orders',
  initialState: { items: [], lastOrder: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(createOrder.fulfilled, (s,a)=>{ s.lastOrder=a.payload; s.items.unshift(a.payload); s.status='succeeded'; })
     .addCase(fetchMyOrders.fulfilled, (s,a)=>{ s.items=a.payload; s.status='succeeded'; })
     .addMatcher((a)=>a.type.startsWith('orders/') && a.type.endsWith('/pending'), (s)=>{ s.status='loading'; s.error=null; })
     .addMatcher((a)=>a.type.startsWith('orders/') && a.type.endsWith('/rejected'), (s,a)=>{ s.status='failed'; s.error=a.error.message; });
  }
});

export default slice.reducer;
