import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import Cart from "../../models/cart.model.js";
const addToCart = asyncHandler(async (req, res) => {
  const { userId, testId } = req.body;
  if (!userId || !testId) {
    throw new ApiError(400, "User ID and Test ID are required");
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      tests: [testId],
    });
  } else {
    const exist = cart.tests.find((x) => x.toString() === testId);
    if (!exist) {
      cart.tests.push(testId);
    }
  }
  await cart.save();
  return res
    .status(200)
    .json(new apiResponse(true, "Test added to cart successfully", cart));
});

const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  const cart = await Cart.findOne({ user: userId }).populate("tests");
  if (!cart) {
    return res
      .status(200)
      .json(new apiResponse(true, "Cart is empty", { tests: [] }));
  }
  return res
    .status(200)
    .json(new apiResponse(true, "Cart fetched successfully", cart.tests));
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { userId, testId } = req.body;
  if (!userId || !testId) {
    throw new ApiError(400, "User ID and Test ID are required");
  }
  const cart = await Cart.findOne({ user: userId });
  cart.tests = cart.tests.filter((x) => x.toString() !== testId);
  await cart.save();
  return res
    .status(200)
    .json(new apiResponse(true, "Test removed from cart successfully"));
});

const mergeCart = asyncHandler(async (req, res) => {
  const { userId, cartItems } = req.body;
  if (!userId || !cartItems) {
    throw new ApiError(400, "Missing credentials");
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      tests: [],
    });
  }
  for (const item of cartItems) {
    cart.tests.push(item._id);
  }
  await cart.save();
  await cart.populate("tests");
  return res
    .status(200)
    .json(new apiResponse(200, "cart merged successfully", cart.tests));
});
export { addToCart, getUserCart, removeFromCart, mergeCart };
