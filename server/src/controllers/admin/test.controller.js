import Test from "../../models/test.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import { io } from "../../index.js";
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

const editTest = asyncHandler(async (req, res) => {
  const { testForm, test_id } = req.body;
  if (!test_id) {
    throw new ApiError(400, "Test ID is required");
  }
  if (!testForm) {
    throw new ApiError(400, "test data is missing");
  }
  const updatedTest = await Test.findByIdAndUpdate(
    test_id,
    { $set: testForm },
    { new: true, runValidators: true }
  );

  if (!updatedTest) {
    throw new ApiError(404, "Test not found or failed to update");
  }

  io.emit("testUpdated", updatedTest);
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully update the test", updatedTest));
});

const addTest = asyncHandler(async (req, res) => {
  const { testForm } = req.body;
  if (!testForm) {
    throw new ApiError(400, "test data is missing");
  }

  const newTest = await Test.create(testForm);
  if (!newTest) {
    throw new ApiError(404, "Test not found or failed to create new Test");
  }

  io.emit("testAdded", newTest);
  return res
    .status(200)
    .json(new ApiResponse(200, "New test created", newTest));
});

const deleteTest = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  if (!testId) {
    throw new ApiError(400, "Test id is missing");
  }
  await Test.findByIdAndDelete(testId);
  io.emit("testDeleted", testId);
  return res
    .status(200)
    .json(new ApiResponse(200, "Test is deleted successfully"));
});
export { editTest, getAllTests, getTestDetails, addTest, deleteTest };
