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
    setTests: (state, action) => {
      state.tests = action.payload;
    },
    removeTest: (state, action) => {
      const id = action.payload;
      state.tests = state.tests.filter((test) => test._id !== id);
    },
    addPatient: (state, action) => {
      state.patient = action.payload;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    addTimeSlot: (state, action) => {
      state.timeslot = action.payload;
    },
  },
});

export const { setTests, addAddress, addPatient, addTimeSlot } =
  orderSlice.actions;
export default orderSlice.reducer;
