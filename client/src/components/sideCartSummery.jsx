import { useDispatch, useSelector } from "react-redux";
import { removeTestFromCart } from "../features/cartSlice";
import { FlaskConical } from "lucide-react";

export default function CartSummery() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const total = cartItems.reduce((acc, test) => acc + test.price, 0);

    return (
        <div className="fixed right-5 top-20 w-96 max-h-[70vh] bg-white shadow-2xl rounded-2xl z-50 flex flex-col border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                    Your Cart{" "}
                    <span className="text-sm text-gray-500">
                        ({cartItems.length} Test{cartItems.length > 1 ? "s" : ""})
                    </span>
                </h2>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center mt-5">🛒 Your cart is empty</p>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="p-3 border rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition flex flex-col gap-2"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.testname}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.preparation ? (
                                            <>Preparation: <span className="italic">{item.preparation}</span></>
                                        ) : (
                                            "No preparation required"
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.category}
                                    </p>
                                </div>
                                <p className="text-gray-800 font-medium">₹{item.price}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FlaskConical className="w-4 h-4 text-blue-600" />
                                    <span>By Thyrocare</span>
                                </div>
                                <button
                                    onClick={() => dispatch(removeTestFromCart(item._id))}
                                    className="text-red-500 hover:bg-red-100 px-2 py-1 rounded-md text-xs font-medium transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                    <div className="flex justify-between text-gray-700 mb-1">
                        <span>Pick up charges</span>
                        <span className="font-medium text-green-600">₹0</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                        <span>Total</span>
                        <span className="text-blue-600">₹{total}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
