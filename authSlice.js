import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client, { setToken } from '../api/client';
import endpoints from '../api/endpoints';

export const login = createAsyncThunk('auth/login', async (payload)=>{
  const { data } = await client.post(endpoints.auth.login, payload);
  return data;
});
export const register = createAsyncThunk('auth/register', async (payload)=>{
  const { data } = await client.post(endpoints.auth.register, payload);
  return data;
});
export const fetchMe = createAsyncThunk('auth/me', async ()=>{
  const { data } = await client.get(endpoints.auth.me);
  return data;
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('auth_token'), status: 'idle', error: null },
  reducers: {
    logout(state){ state.user=null; state.token=null; setToken(null); }
  },
  extraReducers: (b)=>{
    b.addCase(login.fulfilled, (s,a)=>{ s.user=a.payload.user; s.token=a.payload.token; setToken(a.payload.token); s.status='succeeded'; })
     .addCase(register.fulfilled, (s,a)=>{ s.user=a.payload.user; s.token=a.payload.token; setToken(a.payload.token); s.status='succeeded'; })
     .addCase(fetchMe.fulfilled, (s,a)=>{ s.user=a.payload; s.status='succeeded'; })
     .addMatcher((a)=>a.type.startsWith('auth/') && a.type.endsWith('/pending'), (s)=>{ s.status='loading'; s.error=null; })
     .addMatcher((a)=>a.type.startsWith('auth/') && a.type.endsWith('/rejected'), (s,a)=>{ s.status='failed'; s.error=a.error.message; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
