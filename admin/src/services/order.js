import api from "../api/axios";
const getAllOrders = async () => {
  try {
    const response = await api.get("/order/all");
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { getAllOrders };
