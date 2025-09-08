import api from "../../api/axios";

const saveOrder = async (orderDetails, paymentData) => {
  try {
    const response = await api.post("/order/save-order", {
      orderDetails,
      paymentData,
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { saveOrder };
