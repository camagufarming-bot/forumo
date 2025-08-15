import { createSlice } from '@reduxjs/toolkit';

const persisted = JSON.parse(localStorage.getItem('forumo_cart') || '[]');

const slice = createSlice({
  name: 'cart',
  initialState: { items: persisted },
  reducers: {
    addToCart(state, { payload }){
      const idx = state.items.findIndex(i=>i.product._id===payload.product._id);
      if (idx>=0) state.items[idx].qty += payload.qty || 1;
      else state.items.push({ product: payload.product, qty: payload.qty || 1 });
      localStorage.setItem('forumo_cart', JSON.stringify(state.items));
    },
    removeFromCart(state, { payload }){
      state.items = state.items.filter(i=>i.product._id !== payload);
      localStorage.setItem('forumo_cart', JSON.stringify(state.items));
    },
    updateQty(state, { payload }){
      const { id, qty } = payload;
      const it = state.items.find(i=>i.product._id===id);
      if (it) it.qty = qty;
      localStorage.setItem('forumo_cart', JSON.stringify(state.items));
    },
    clearCart(state){ state.items = []; localStorage.setItem('forumo_cart', '[]'); }
  }
});

export const { addToCart, removeFromCart, updateQty, clearCart } = slice.actions;
export default slice.reducer;
