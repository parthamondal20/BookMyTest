import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";

const getAllUserData = asyncHandler(async (req, res) => {
  const users = await User.find({role:"user"}).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, "Fetch all users", users));
});

export { getAllUserData };
