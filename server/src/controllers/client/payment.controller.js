import Razorpay from "razorpay";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import dotenv from 'dotenv';
dotenv.config();  
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // Razorpay needs amount in paise
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  if (!order) {
    throw new ApiError(505, "Razorpay order failed!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Payment successfull", order));
});

export { createRazorpayOrder };
