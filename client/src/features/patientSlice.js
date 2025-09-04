import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  patients: [],
};

const patientsSclice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    removePatient: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload
      );
    },
  },
});

export const { setPatients, removePatient } = patientsSclice.actions;
export default patientsSclice.reducer;
