import api from "../api/axios.js";

const getAllUsersData = async () => {
  try {
    const response = await api.get("/user/all");
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { getAllUsersData };
