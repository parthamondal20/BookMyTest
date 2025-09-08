import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logoutAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
