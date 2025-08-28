import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const authenticateUser = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    throw new ApiError(401, "You are not authorized to access this resource");
  }
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(401, "Invalid token! User not found");
  }
  req.user = user;
  next();
});
export default authenticateUser;
