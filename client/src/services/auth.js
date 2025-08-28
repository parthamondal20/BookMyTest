import api from "../../api/axios";
const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const logoutUser = async (userId) => {
  try {
    const response = await api.post("/auth/logout", { userId });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export { registerUser, loginUser, logoutUser };
