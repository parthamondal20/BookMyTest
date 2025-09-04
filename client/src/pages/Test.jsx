import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { showError, showSuccess } from "../utils/toast";
import { useParams, useNavigate } from "react-router-dom";
import { getTestdetails } from "../services/test";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../services/cart";
import { savedPatientDetails } from "../services/patient";
import { addTestInCart, removeTestFromCart } from "../features/cartSlice";
import Chatbot from "../components/Chatbot";
import { setPatients } from "../features/patientSlice";
import { setTests } from "../features/orderSlice";
import socket from "../utils/socket";
function Test() {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { id: testId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const savedPatients = useSelector(state => state.patients.patients);
  const fetchTest = async () => {
    try {
      setLoading(true);
      const test = await getTestdetails(testId);
      setTest(test);
    } catch (error) {
      console.error("Error fetching test:", error);
      showError("Poor internet connection");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPatientsDetails = async () => {
    try {
      const patients = await savedPatientDetails(user._id);
      dispatch(setPatients([patients]));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTest();
    fetchSavedPatientsDetails();
    socket.on("testDeleted", (deletedTestId) => {
      if (testId === deletedTestId) {
        showError("This test is no longer available.");
        navigate("/");
        return;
      }
    })
    return () => {
      socket.off("testDeleted");
    }
  }, []);

  const inCart = test && cartItems.some((x) => x._id === test._id);
  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleAddToCart = async () => {
    try {
      if (!user) {
        dispatch(addTestInCart(test));
        return;
      }
      await addToCart(user._id, testId);
      dispatch(addTestInCart(test));
      showSuccess("Test added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showError("Failed to add test to cart. Please try again.");
    }
  };

  const handleBookNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(addTestInCart(test));
    if (savedPatients.length > 0) {
      navigate("/select-patient/1");
    } else {
      navigate("/patient-details/1");
    }
    return;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <Loader isVisible={loading} />
      {test && !loading && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Image + Info */}
          <div className="lg:col-span-2">
            <img
              src={test.image}
              alt={test.testname}
              className="rounded-lg w-full h-72 object-cover shadow-md mb-6"
            />

            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {test.testname}
            </h1>
            <p className="text-gray-600 mb-4">Also known as Thyroid Profile</p>

            {/* Badges */}
            <div className="flex items-center gap-6 mb-4 text-sm">
              <span className="flex items-center gap-1 text-blue-700 font-medium">
                🔵 Certified Labs
              </span>
              <span className="flex items-center gap-1 text-green-600 font-medium">
                ✅ Free Home Sample Pickup
              </span>
            </div>

            {/* Price + Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-2xl font-semibold text-gray-900">
                ₹{test.price}
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`px-6 py-2.5 rounded-xl font-semibold border shadow-sm transition-transform duration-150 ease-in-out
                ${inCart
                    ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "border-blue-500 text-blue-600 bg-white hover:bg-blue-50 active:scale-95"
                  }`}
              >
                {inCart ? "Added to cart" : "🛒 Add to Cart"}
              </button>

              {/* Book Now */}
              <button
                onClick={handleBookNow}
                className="px-6 py-2.5 rounded-xl font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-transform duration-150 ease-in-out"
              >
                Book Now
              </button>
            </div>
            <Chatbot testId={test._id} />

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 text-2xl">
                  <img
                    src="https://www.practo.com/tests/public/icons/home_sample_pickup.png"
                    alt=""
                  />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Home sample collection for FREE
                  </p>
                  <p className="text-gray-600 text-sm">
                    A certified professional will collect your sample from your
                    preferred location
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-2xl">
                  <img
                    src="https://www.practo.com/tests/public/icons/e_reports_on_next_day.png"
                    alt=""
                  />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Get digital report within {test.duration} day
                  </p>
                  <p className="text-gray-600 text-sm">
                    Labs ensure turn-around-time of 24 hours from specimen
                    pickup
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">
                  <img
                    src="https://www.practo.com/tests/public/icons/offers.png"
                    alt=""
                  />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Offers and affordable prices
                  </p>
                  <p className="text-gray-600 text-sm">
                    Get discounts and offers on tests and packages
                  </p>
                </div>
              </div>
            </div>

            {/* Accordion */}
            <div className="divide-y border rounded-lg">
              {[
                {
                  key: "desc",
                  title: "What is this test?",
                  content: test.description,
                },
                {
                  key: "prep",
                  title: "Test Preparation",
                  content: test.preparation,
                },
                {
                  key: "results",
                  title: "Understanding your test results",
                  content: "Result interpretation info goes here.",
                },
              ].map((item) => (
                <div key={item.key} className="p-4">
                  <button
                    onClick={() => toggleAccordion(item.key)}
                    className="w-full flex justify-between items-center font-semibold text-gray-800"
                  >
                    {item.title}
                    <svg
                      className={`w-5 h-5 transform transition-transform ${activeAccordion === item.key ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeAccordion === item.key && (
                    <p className="mt-3 text-gray-600 text-sm">{item.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Cart/Help Box */}
          <div className="space-y-6">
            <div className="border rounded-lg shadow-sm p-4 bg-gray-50">
              {/* Header */}
              <h2 className="font-semibold text-gray-900 mb-1">Your Cart</h2>
              <p className="text-sm text-gray-500 mb-4">{cartItems.length} Tests</p>

              {/* Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200"
                  >
                    {/* Left: Test Info */}
                    <div>
                      <p className="text-base font-semibold text-gray-800">{test.testname}</p>
                      <p className="text-sm text-gray-500">Preparation: {test.preparation || "None"}</p>

                    </div>

                    {/* Right: Price + Remove */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">₹{test.price}</p>
                      <button
                        onClick={() => dispatch(removeTestFromCart(test._id))}
                        className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {cartItems.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-medium text-gray-700">Pick up charges</p>
                    <p className="text-lg font-bold text-indigo-600">
                      ₹0
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-medium text-gray-700">Total</p>
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{cartItems.reduce((total, item) => total + item.price, 0)}
                    </p>
                  </div>

                  <button
                    className={`w-full py-2 rounded-md font-semibold transition ${cartItems.length > 0
                      ? "text-white bg-blue-700 hover:bg-blue-800"
                      : "cursor-not-allowed bg-gray-200 text-gray-500"
                      }`}
                    onClick={() => {
                      if (cartItems.length > 0) {
                        user ? navigate(`/select-patient/1`) : navigate("/login");
                        dispatch(setTests(cartItems)); // ✅ pass all cart items, not single "test"
                      }
                    }}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>




            <div className="bg-blue-50 border rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">
                Need help with booking your test?
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Our experts are here to help you
              </p>
              <div className="flex items-center gap-2 border-2 border-dashed border-gray-400 p-3 rounded-md">
                <span className="text-xl">📞</span>
                <span className="font-semibold text-blue-700">
                  +91 8045684087
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Test;
