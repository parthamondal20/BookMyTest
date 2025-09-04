import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message:"",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
    setMsg:(state,action)=>{
      state.message=action.payload;
    }
  },
});

export const { showLoader, hideLoader,setMsg } = loaderSlice.actions;
export default loaderSlice.reducer;
