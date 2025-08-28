import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tests: [],
  patient: null,
  address: null,
  timeslot: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addTests: (state, action) => {
      state.tests = action.payload;
    },
    addPatient: (state, action) => {
      state.patient = action.payload;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    addTimeSlot: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { addTests, addAddress, addPatient, addTimeSlot } =
  orderSlice.actions;
export default orderSlice.reducer;
