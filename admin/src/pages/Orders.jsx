import { useState, useEffect } from "react";
import { getAllOrders } from "../services/order";
import { showLoader, hideLoader } from "../features/loaderSlice";
import { showError } from "../utils/toast";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    const fetchOrders = async () => {
        try {
            dispatch(showLoader());
            const  data  = await getAllOrders();
            setOrders(data);  // Assuming ApiResponse wraps data under `.data`
        } catch (error) {
            console.error(error);
            showError("Failed to fetch orders");
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">📋 All Orders</h1>

            <Loader message="Loading orders..." />

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white  cursor-pointer border border-gray-200 shadow rounded-lg p-6 hover:shadow-lg transition">
                            <h2 className="text-lg font-semibold text-indigo-600 mb-4">
                                Order ID: <span className="font-mono">{order._id}</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                                <div className="space-y-2">
                                    <p><span className="font-medium text-gray-800">👤 User:</span> {order.user.username} ({order.user.email || order.user.mobileNo})</p>
                                    <p><span className="font-medium text-gray-800">🧑 Patient:</span> {order.patient.name}, Age: {order.patient.age}</p>
                                    <p><span className="font-medium text-gray-800">📍 Address:</span> {order.address.line1}, {order.address.city}, {order.address.pincode}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="font-medium text-gray-800">🧪 Tests:</p>
                                        <ul className="list-disc list-inside text-gray-700 ml-4">
                                            {order.tests.map((test, idx) => (
                                                <li key={idx}>
                                                    {test.testname} - ₹{test.price} ({test.duration})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p><span className="font-medium text-gray-800">⏰ Timeslot:</span> {order.timeslot}</p>
                                    <p>
                                        <span className="font-medium text-gray-800">🔖 Status:</span> 
                                        <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                            order.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : order.status === "processing"
                                                ? "bg-blue-100 text-blue-800"
                                                : order.status === "completed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
