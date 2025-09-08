import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../features/loaderSlice";
import authReducer from "../features/authSlice.js";
import themeReducer from "../features/themeSlice.js";
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
    auth: authReducer,
    theme: themeReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    theme: store.getState().theme,
  });
});
export default store;
