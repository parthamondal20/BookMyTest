import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js";

const getUserAddressess = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "User id is missing ");
  }

  const address = await User.findById(userId).populate("address");
  return res
    .status(200)
    .json(
      new ApiResponse(200, "User addressess fetched successfully", address)
    );
});

const saveUserAddress = asyncHandler(async (req, res) => {
  const { userId ,address} = req.body;
  if(!userId){
    throw new ApiError(400,"User Id is missing");
  }
  if(!address){
    throw new ApiError(400,"address details is missing");
  }
  
});
export { getUserAddressess, saveUserAddress };
