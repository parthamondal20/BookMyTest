import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addTestInCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((x) => x._id === item._id);
      if (!exist) {
        state.cartItems.push(item);
      }
    },
    removeTestFromCart: (state, action) => {
      const itemId = action.payload;
      console.log(itemId);
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
export default cartSlice.reducer;
export const { addTestInCart, removeTestFromCart, clearCart, setCart } =
  cartSlice.actions;
