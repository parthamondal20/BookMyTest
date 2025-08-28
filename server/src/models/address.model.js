import mongoose, { Schema } from "mongoose";
const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pincode: { type: String, required: true, trim: true },
    addressLine: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    landmark: { type: String, trim: true },
    type: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
