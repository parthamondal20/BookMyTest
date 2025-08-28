import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, removeFromCart } from "../services/cart";
import Loader from "../components/Loader";
import { showError, showSuccess } from "../utils/toast";
import { removeTestFromCart } from "../features/cartSlice";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems(cart);
    }
  }, [cart, user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cart = await getUserCart(user._id);
      setCartItems(cart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (testId) => {
    if (!user) {
      dispatch(removeTestFromCart(testId));
      setCartItems((prev) => prev.filter((item) => item._id !== testId));
      return;
    }
    try {
      await removeFromCart(user._id, testId);
      setCartItems((prev) => prev.filter((item) => item._id !== testId));
      dispatch(removeTestFromCart(testId));
      showSuccess("Item removed ");
    } catch (error) {
      console.error("Error removing from cart:", error);
      showError("Failed to remove item from cart. Please try again.");
    }
  };

  return (
    <>
      <Loader isVisible={loading} />

      {cartItems.length > 0 ? (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items Section */}
              <div className="md:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <Link
                      to={`/test/${item._id}`}
                      className="flex items-center space-x-5"
                    >
                      <img
                        src={item.image}
                        alt={item.testname}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.testname}
                        </h2>
                        <p className="text-gray-500 mt-1">
                          Price:{" "}
                          <span className="font-medium text-gray-800">
                            ₹{item.price}
                          </span>
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 
                      rounded-lg shadow-sm hover:bg-red-600 active:bg-red-700 
                      transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Total:</span>
                    <span>
                      ₹
                      {cartItems.reduce((total, item) => total + item.price, 0)}
                    </span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart Section
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 h-40 mb-6 opacity-80"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mt-2">
            Add some tests to your cart to proceed.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Go to Tests
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
