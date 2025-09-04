import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import cartReducer from "../features/cartSlice.js";
import orderReducer from "../features/orderSlice.js";
import addressReducer from "../features/addressSlice.js";
import loaderReducer from "../features/loaderSlice.js";
import patientsReducer from "../features/patientSlice.js";
const saveState = (state) => {
  localStorage.setItem("reduxState", JSON.stringify(state));
};

const loadState = () => {
  const state = localStorage.getItem("reduxState");
  return state ? JSON.parse(state) : undefined;
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
    loader: loaderReducer,
    patients: patientsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    cart: store.getState().cart,
    order: store.getState().order,
    address: store.getState().address,
    patients: store.getState().patients,
  });
});

export default store;
