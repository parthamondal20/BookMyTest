import mongoose, { Schema } from "mongoose";
const patientSchema = new Schema(
  {
    name: String,
    DOB: Date,
    age: Number,
    gender: String,
    email: String,
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
