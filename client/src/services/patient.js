import api from "../../api/axios";
const getUserAddressess = async (userId) => {
  try {
    const response = await api.get(`/patient/address/${userId}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const saveUserAddress = async (userId, address) => {
  try {
    const response = await api.put("/patient/save-address", {
      userId,
      address,
    });
    return response.data.date;
  } catch (error) {
    throw error;
  }
};

const savedPatientDetails = async (user_id) => {
  try {
    const response = await api.get(`/patient/details/${user_id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export { getUserAddressess, saveUserAddress, savedPatientDetails };
