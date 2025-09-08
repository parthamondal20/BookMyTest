import Order from "../../models/order.model.js";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user")
    .populate("patient")
    .populate("address")
    .populate("tests");
//   console.log(orders);
  return res
    .status(200)
    .json(new ApiResponse(200, "Order data fetched", orders));
});

export { getAllOrders };
