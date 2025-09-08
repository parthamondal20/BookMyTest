import mongoose, { Schema } from "mongoose";
const patientSchema = new Schema(
  {
    name: String,
    DOB: Date,
    age: Number,
    gender: String,
    mobileNo:String,
    email: String,
  },
  {
    timestamps: true,
  }
);
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
