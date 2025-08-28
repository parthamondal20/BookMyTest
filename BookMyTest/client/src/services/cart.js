import api from "../../api/axios";
const addToCart = async (userId, testId) => {
  try {
    const response = await api.post("/cart/add-to-cart", {
      userId,
      testId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

const getUserCart = async (userId) => {
  try {
    const response = await api.get(`/cart/get-cart/${userId}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
const removeFromCart = async (userId, testId) => {
  try {
    const response = await api.post("/cart/remove-from-cart", {
      userId,
      testId,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};
const mergeCart = async (userId, cartItems) => {
  try {
    const response = await api.post("/cart/merge", {
      userId,
      cartItems,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export { addToCart, getUserCart, removeFromCart, mergeCart };
