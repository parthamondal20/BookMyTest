import mongoose, { Schema } from "mongoose";
const testSchema = new Schema(
  {
    testname: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    preparation: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    lab: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Test = mongoose.model("Test", testSchema);
export default Test;
