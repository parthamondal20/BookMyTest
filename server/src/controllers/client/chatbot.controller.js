import { GoogleGenerativeAI } from "@google/generative-ai";
import Test from "../../models/test.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
const genAI = new GoogleGenerativeAI("AIzaSyBNi8vpoBtUYUtzjr4zxvJ-Jibi5-dUdiA");
const chatbot = asyncHandler(async (req, res) => {
  const { testId, question } = req.body;

  if (!testId || !question) {
    throw new ApiError(400, "Missing testId or question");
  }

  const test = await Test.findById(testId);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  const context = `
  Test Name: ${test.testname}
  Description: ${test.description}
  Preparation: ${test.preparation}
  Duration: ${test.duration} minutes
  Category: ${test.category}
  Price: ${test.price}
  Test booking process:click on book now ->add required informations -> select payment method ->place order
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(`
    You are a helpful medical assistant. Use the context of the lab test below to answer clearly.
    ${context}
    User Question: ${question}
  `);

  return res.status(200).json(
    new ApiResponse(200, "Answer generated", {
      answer: result.response.text(),
    })
  );
});

export { chatbot };
