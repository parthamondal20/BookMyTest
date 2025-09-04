import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import User from "../../models/user.model.js";
import Address from "../../models/address.model.js";
const getUserAddressess = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "User id is missing ");
  }

  const user = await User.findById(userId).populate("address");
  return res
    .status(200)
    .json(
      new ApiResponse(200, "User addressess fetched successfully", user.address)
    );
});

const saveUserAddress = asyncHandler(async (req, res) => {
  const { userId, address } = req.body;
  const {
    pincode = "",
    addressLine = "",
    landmark = "",
    city = "",
    type = "Home",
  } = address;
  if (!userId) {
    throw new ApiError(400, "User Id is missing");
  }
  if (!pincode || !addressLine || !city) {
    throw new ApiError(400, "address details is missing");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // const exist = await Address.findOne({
  //   user: userId,
  //   type,
  // });
  const newAddress = await Address.create({
    user: userId,
    pincode,
    addressLine,
    landmark,
    city,
    type,
  });
  user.address.push(newAddress._id);
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully saved the user address"));
});

const getSavedpatientDetails = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    throw new ApiError(400, "The userId is missing");
  }
  const user = await User.findById(user_id).populate("patients");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "successfully fetched the patients details",
        user.patients
      )
    );
});

export { getUserAddressess, saveUserAddress, getSavedpatientDetails };
