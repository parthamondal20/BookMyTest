import { useState } from "react";
import { showError } from "../utils/toast";
import { useDispatch } from "react-redux";
import { addTimeSlot } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";
const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
];

export default function TimeSlotPage() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleConfirm = () => {
        if (!selectedSlot) {
            showError("Please select a time solt");
            return;
        }
        console.log(selectedSlot);
        dispatch(addTimeSlot(selectedSlot));
        navigate("/payment-details");
        return;
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose a Time Slot for Lab Test</h2>
            <ul className="list-none p-0">
                {timeSlots.map((slot) => (
                    <li key={slot} className="mb-3">
                        <button
                            onClick={() => handleSelect(slot)}
                            className={`w-full py-3 rounded-md border transition-colors font-medium
                                ${selectedSlot === slot
                                    ? "bg-blue-600 text-white font-bold border-blue-600"
                                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-50"
                                }`}
                        >
                            {slot}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleConfirm}
                disabled={!selectedSlot}
                className={`mt-6 w-full py-3 rounded-md font-bold transition-colors
                    ${selectedSlot
                        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Confirm Booking
            </button>
        </div>
    );
}