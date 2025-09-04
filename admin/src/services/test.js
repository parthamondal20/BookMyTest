import api from "../api/axios";

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

const editTest = async (testForm, test_id) => {
  try {
    const res = await api.put("/test/edit", { testForm, test_id });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const addTest = async (testForm) => {
  try {
    const res = await api.post("/test/add", {
      testForm,
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const deleteTest = async (testId) => {
  try {
    await api.delete(`/test/delete/${testId}`);
  } catch (error) {
    throw error;
  }
};
export { getTests, getTestdetails, editTest, addTest, deleteTest };
