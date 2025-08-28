import api from "../../api/axios";
const getUserAddressess = async (userId) => {
  try {
    const response = await api.get(`/user/address/${userId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const saveUserAddress = async (userId, address) => {
  try {
    const response = await api.put("/user/save-address", {
      userId,
      address,
    });
    return response.data.date;
  } catch (error) {
    throw error;
  }
};
export { getUserAddressess, saveUserAddress };
