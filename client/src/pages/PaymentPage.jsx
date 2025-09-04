import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Banknote, Globe } from "lucide-react";
import { useSelector } from "react-redux";
export default function PaymentPage() {
    const [method, setMethod] = useState("card");
    const methods = [
        { id: "card", name: "Debit / Credit Card", icon: <CreditCard size={18} /> },
        { id: "upi", name: "UPI", icon: <Smartphone size={18} /> },
        { id: "wallet", name: "Wallet", icon: <Wallet size={18} /> },
        { id: "netbanking", name: "Net Banking", icon: <Globe size={18} /> },
        { id: "cod", name: "Cash on Delivery", icon: <Banknote size={18} /> },
    ];

    const handlePay = async () => {
        const options = {
            key: "rzp_test_xxxxxxxx",
            amount: order.amount,
            currency: "INR",
            name: "MyShop",
            description: "Order Payment",
            order_id: order.id,
            handler: (response) => {
                alert("Payment Successful: " + response.razorpay_payment_id);
            },
            theme: { color: "#4F46E5" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Order Summary
            <div className="bg-white shadow rounded-2xl p-4 mb-6">
                <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                <div className="flex justify-between text-sm text-gray-600">
                    <p>Items ({cartItems.length})</p>
                    <p>₹{cartItems.reduce((acc, test) => acc + test.price, 0)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <p>Delivery</p>
                    <p>₹50.00</p>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                    <p>Total</p>
                    <p>₹900.00</p>
                </div>
            </div> */}

            {/* Payment Options */}
            <div className="bg-white shadow rounded-2xl overflow-hidden">
                {methods.map((m) => (
                    <div
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`p-4 border-b flex items-center gap-3 cursor-pointer ${method === m.id ? "bg-indigo-50" : "hover:bg-gray-50"
                            }`}
                    >
                        <span className="text-indigo-600">{m.icon}</span>
                        <span className="font-medium">{m.name}</span>
                    </div>
                ))}
            </div>

            {/* Payment Details */}
            <div className="bg-white shadow rounded-2xl p-4 mt-6">
                {method === "card" && (
                    <div>
                        <h3 className="font-medium mb-3">Pay using Card</h3>
                        <input
                            className="w-full border p-2 rounded-lg mb-3"
                            placeholder="Card Number"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input className="border p-2 rounded-lg" placeholder="MM/YY" />
                            <input className="border p-2 rounded-lg" placeholder="CVV" />
                        </div>
                    </div>
                )}

                {method === "upi" && (
                    <div>
                        <h3 className="font-medium mb-3">Pay via UPI</h3>
                        <input
                            className="w-full border p-2 rounded-lg mb-3"
                            placeholder="example@upi"
                        />
                        <div className="flex gap-3 mt-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Google_Pay_Logo.svg" alt="Google Pay" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/PhonePe-Logo.svg" alt="PhonePe" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Paytm_logo.png" alt="Paytm" className="h-8" />
                        </div>
                    </div>
                )}

                {method === "wallet" && (
                    <div>
                        <h3 className="font-medium mb-3">Select Wallet</h3>
                        <p className="text-gray-600">Wallets like Paytm, PhonePe will be available.</p>
                    </div>
                )}

                {method === "netbanking" && (
                    <div>
                        <h3 className="font-medium mb-3">Net Banking</h3>
                        <p className="text-gray-600">You will be redirected to your bank’s page.</p>
                    </div>
                )}

                {method === "cod" && (
                    <div>
                        <h3 className="font-medium mb-3">Cash on Delivery</h3>
                        <p className="text-gray-600">Pay in cash when your order arrives.</p>
                    </div>
                )}

                {/* Pay Button */}
                <button
                    onClick={handlePay}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}
