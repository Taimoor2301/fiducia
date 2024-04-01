import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    total: 1
  },
  reducers: {
    addToCart: (state, action) => {
      state.data = [...state.data, action.payload]
    },

    removeFromCart: (state, action) => {
      state.data = state.data.filter(el => el.id !== action.payload.id)
    },
    clearCart: state => {
      state.data = []
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
