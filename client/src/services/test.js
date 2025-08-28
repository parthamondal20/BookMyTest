import api from "../../api/axios";
const getTests = async () => {
  try {
    const response = await api.get("/test/all");
    console.log("Response from getTests:", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const getTestdetails = async (testId) => {
  try {
    const response = await api.get(`/test/${testId}`);
    console.log("Response from getTestdetails:", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export { getTests, getTestdetails };
