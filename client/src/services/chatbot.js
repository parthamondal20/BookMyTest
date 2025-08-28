import api from "../../api/axios";
const askQuestion = async (testId, question) => {
  try {
    const res = await api.post("/chatbot/ask", {
      testId,
      question,
    });
    console.log(res);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export default askQuestion;
