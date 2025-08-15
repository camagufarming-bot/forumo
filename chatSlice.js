import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
import endpoints from '../api/endpoints';

export const createThread = createAsyncThunk('chat/createThread', async (payload)=>{
  const { data } = await client.post(endpoints.chat.create, payload);
  return data;
});
export const fetchThreads = createAsyncThunk('chat/threads', async ()=>{
  const { data } = await client.get(endpoints.chat.threads);
  return data.items || data;
});
export const fetchThread = createAsyncThunk('chat/thread', async (id)=>{
  const { data } = await client.get(endpoints.chat.threadById(id));
  return data;
});
export const sendMessage = createAsyncThunk('chat/send', async ({ threadId, message })=>{
  const { data } = await client.post(endpoints.chat.send(threadId), { message });
  return data;
});

const slice = createSlice({
  name: 'chat',
  initialState: { threads: [], current: null, unread: 0, status: 'idle' },
  reducers: {
    receiveSocketMessage(state, { payload }){
      // payload: { threadId, message }
      if (state.current && state.current._id === payload.threadId) {
        state.current.messages.unshift(payload.message);
      } else {
        state.unread += 1;
      }
    },
    openThread(state, { payload }){
      state.current = payload;
      state.unread = 0;
    },
    clearThread(state){ state.current = null; }
  },
  extraReducers: (b)=>{
    b.addCase(fetchThreads.fulfilled, (s,a)=>{ s.threads = a.payload; s.status='succeeded'; })
     .addCase(fetchThread.fulfilled, (s,a)=>{ s.current = a.payload; s.status='succeeded'; })
     .addCase(createThread.fulfilled, (s,a)=>{ s.current = a.payload; s.status='succeeded'; })
     .addCase(sendMessage.fulfilled, (s,a)=>{
        if (s.current && s.current._id === a.payload.threadId) {
          s.current.messages.unshift(a.payload.message);
        }
     })
     .addMatcher((a)=>a.type.startsWith('chat/') && a.type.endsWith('/pending'), (s)=>{ s.status='loading'; })
     .addMatcher((a)=>a.type.startsWith('chat/') && a.type.endsWith('/rejected'), (s)=>{ s.status='failed'; });
  }
});

export const { receiveSocketMessage, openThread, clearThread } = slice.actions;
export default slice.reducer;
