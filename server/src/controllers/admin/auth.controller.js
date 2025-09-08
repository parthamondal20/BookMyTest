import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import generateAccessAndRefreshToken from "../../utils/generateAccessAndRefreshToken.js";
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Credentials missing");
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.staus(400).json(new ApiResponse(400, "User not found"));
  }

  const isPasswordMatched = await existUser.isPasswordCorrect(password);
  if (!isPasswordMatched) {
    throw new ApiError(400, "Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existUser._id
  );

  const admin = await User.findById(existUser._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(new ApiResponse(200, "Admin logged in successfully", admin));
});

const logOutAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.body;
  if (!adminId) {
    throw new ApiError(400, "Admin id not found");
  }

  await User.findByIdAndUpdate(
    adminId,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, "Admin logged out successfully"));
});

export { loginAdmin, logOutAdmin };
