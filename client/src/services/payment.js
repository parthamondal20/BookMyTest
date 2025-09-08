import api from "../../api/axios.js";
const createRazorpayOrder = async (amount) => {
  try {
    const response = await api.post("/payment/create-order", {
      amount,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { createRazorpayOrder };
