import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";
import Patient from "../../models/patient.model.js";
import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import crypto from "crypto";
const createOrder = asyncHandler(async (req, res) => {
  const { orderDetails, paymentData } = req.body;

  //signature verification

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    paymentData;
  const secret = process.env.RAZORPAY_API_SECRET;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid payment signature");
  }
  let patient = await Patient.findOne(orderDetails.patient);
  if (!patient) {
    patient = await Patient.create(orderDetails.patient);
  }
  console.log(patient);
  const newOrder = await Order.create({
    user: orderDetails.user,
    patient: patient._id,
    address: orderDetails.address,
    tests: orderDetails.tests,
    timeslot: orderDetails.timeslot,
    testingDate: Date.now(),
    paymentDetails: {
      transactionId: paymentData.razorpay_payment_id,
      paymentStatus: "success",
    },
    status: "pending",
  });
  if (!newOrder) {
    throw new ApiError(401, "Failed to place Order");
  }

  const user = await User.findById(orderDetails.user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.orders.push(newOrder._id);
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Test booking successful", newOrder));
});

export { createOrder };
