import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../features/loaderSlice";
const saveState = (state) => {
  localStorage.setItem("adminReduxState", JSON.stringify(state));
};
const loadState = () => {
  const state = localStorage.getItem("adminReduxState");
  return state ? JSON.parse(state) : undefined;
};
const preloadedState = loadState();
const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
  preloadedState,
});
export default store;
