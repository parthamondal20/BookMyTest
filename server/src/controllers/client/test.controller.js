import Test from "../../models/test.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import ApiError from "../../utils/apiError.js";
const getAllTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, "All tests fetched successfully", tests));
});

const getTestDetails = asyncHandler(async (req, res) => {
  const testId = req.params.id;
  const test = await Test.findById(testId);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Test details fetched successfully", test));
});

export { getAllTests, getTestDetails };
