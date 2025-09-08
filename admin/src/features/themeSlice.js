import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: false,
};

const themeSlice = createSlice({
  name: "theme", // You were missing the slice name
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

// Export the action
export const { toggleTheme } = themeSlice.actions;

// Export the reducer (to use in store)
export default themeSlice.reducer;
