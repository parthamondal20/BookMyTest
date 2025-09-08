import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    // Store both reference + snapshot
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    addressSnapshot: {
      type: Object, // Keeps backup of address details
      // required: true,
    },
    tests: [
      {
        type: Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

    timeslot: {
      type: String, // e.g. "10:00 AM - 11:00 AM"
      required: true,
    },

    testingDate: {
      type: Date, // Use Date instead of string
      required: true,
    },

    paymentDetails: {
      transactionId: { type: String },
      paymentStatus: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
      },
      paidAt: { type: Date },
    },

    status: {
      type: String,
      required: true,
      default: "pending",
      enum: [
        "pending",
        "sample_collected",
        "in_analysis",
        "report_ready",
        "completed",
        "cancelled",
        "rejected",
      ],
    },
  },
  { timestamps: true } // auto adds createdAt, updatedAt
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
