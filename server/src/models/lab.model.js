import mongoose, { Schema } from "mongoose";
const labSchema = new Schema(
  {
    labname: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
    },
    description: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    image: [{ type: String, required: true, trim: true }],
    tests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
  },
  { timestamps: true }
);

const Lab = mongoose.model("Lab", labSchema);
export default Lab;
