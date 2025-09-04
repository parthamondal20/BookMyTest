import { useState } from "react";
import { Navigation, Loader2 } from "lucide-react";
import Stepper from "../components/Stepper";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../features/orderSlice";
import { saveUserAddress } from "../services/patient";
import { useNavigate } from "react-router-dom";
import CartSummery from "../components/sideCartSummery";
import { generateAddressFromCoords } from "../services/geolocation";
import { showError } from "../utils/toast";
export default function AddressForm() {
    const [form, setForm] = useState({
        pincode: "",
        addressLine: "",
        landmark: "",
        city: "",
        type: "Home",
    });
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await saveUserAddress(user._id, form);
            dispatch(addAddress(form));
            navigate("/patient-time-slot/3");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUseLocation = async () => {

        if (!navigator.geolocation) {
            showError("Geolocation is not supported by your browser.");
            return;
        }


        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const data = await generateAddressFromCoords(latitude, longitude);
                    setForm((prev) => (
                        {
                            ...prev,
                            addressLine: data.display_name || "Detected from GPS",
                            pincode: data.address.postcode || "000000",
                            city: data.address.city || data.address.town || data.address.village || "",
                            landmark:
                                data.address.road ||
                                data.address.suburb ||
                                data.address.neighbourhood ||
                                "Near landmark not found",
                        }
                    ));
                } catch (error) {
                    console.log(error);
                    showError("Unable to fetch you location.Type the address manually");
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.log(error);
                showError("Unable to retrieve your location.");
                setIsLoadingLocation(false);
            }
        )
    };

    return (
        <>
            <Stepper />
            <CartSummery />
            <div className="min-h-screen  flex items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    {/* Card */}
                    <div className="bg-white shadow-xl rounded-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Address</h1>
                            <p className="text-gray-600 text-lg">Enter your delivery details</p>
                        </div>

                        {/* Location Button */}
                        <button
                            onClick={handleUseLocation}
                            disabled={isLoadingLocation}
                            className="w-full mb-6 flex items-center justify-center gap-2 py-3 text-base text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                        >
                            {isLoadingLocation ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Navigation size={18} />
                            )}
                            {isLoadingLocation ? 'Detecting location...' : 'Use current location'}
                        </button>

                        {/* Form */}
                        <div className="space-y-5">
                            {/* Pincode & City */}
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pincode <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        placeholder="Pincode"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="addressLine"
                                    value={form.addressLine}
                                    onChange={handleChange}
                                    placeholder="House no, building, street, area"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base resize-none"
                                />
                            </div>

                            {/* Landmark */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={form.landmark}
                                    onChange={handleChange}
                                    placeholder="Landmark"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-base"
                                />
                            </div>

                            {/* Address Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Save as</label>
                                <div className="flex gap-6">
                                    {["Home", "Work", "Other"].map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value={option}
                                                checked={form.type === option}
                                                onChange={handleChange}
                                                className="mr-2 accent-blue-600"
                                            />
                                            <span className="text-base text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mt-6 shadow-md"
                            >
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
