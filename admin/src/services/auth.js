import api from "../api/axios";

const loginAdmin = async (adminData) => {
  try {
    const res = await api.post("/auth/login", adminData);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const logoutAdmin = async (adminId) => {
  try {
    await api.post("/auth/logout", {
      adminId,
    });
  } catch (error) {
    throw error;
  }
};

export { loginAdmin, logoutAdmin };
