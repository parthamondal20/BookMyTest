import User from "../models/user.model.js";
import asyncHandler from "./../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken.js";
const registerUser = asyncHandler(async (req, res) => {
  const { username, mobileNo, password } = req.body;
  if (!username || !mobileNo || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ mobileNo });
  if (existingUser) {
    throw new ApiError(400, "User already exist");
  }
  const user = await User.create({
    username,
    mobileNo,
    password,
  });
  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser._id
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };
  return res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .status(201)
    .json(new ApiResponse(201, "user registered successfully", newUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { mobileNo, password } = req.body;
  if (!mobileNo || !password) {
    throw new ApiError(400, "All information required");
  }
  const user = await User.findOne({ mobileNo });
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const isPasswordMatched = await user.isPasswordCorrect(password);
  if (!isPasswordMatched) {
    throw new ApiError(400, "Incorrect Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };
  return res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .status(201)
    .json(new ApiResponse(201, "User loggedIn successfully", newUser));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inComingRefreshToken = req.cookies.refreshToken;
  if (!inComingRefreshToken) {
    throw new ApiError(401, "You are not authorized to access this resource");
  }
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  if (user.refreshToken !== inComingRefreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };
  return res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json(new ApiResponse(200, "Access token refreshed successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  await User.findByIdAndUpdate(
    userId,
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
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});
export { registerUser, loginUser, refreshAccessToken, logoutUser };
