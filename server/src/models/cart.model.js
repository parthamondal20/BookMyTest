import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
  },
  { timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
