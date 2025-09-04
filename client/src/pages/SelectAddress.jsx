import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, Building, LocateIcon } from "lucide-react"; // 👈 if you use lucide-react icons

export default function SelectAddress() {
  const [selected, setSelected] = useState(null);
  const [selectAddressError, setSelectAddressError] = useState("");
  const addresses = useSelector((state) => state.address.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (addr) => {
    setSelected(addr._id);
    setSelectAddressError("");
  };

  const handleAddressSubmit = () => {
    if (!selected) {
      setSelectAddressError("Please select an address before continuing.");
      return;
    }
    dispatch(addAddress(selected));
    navigate("/patient-time-slot/3"); // ✅ dynamic ID later
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const currentAddress = {
          _id: "temp-location",
          addressLine: `Lat: ${latitude}, Lng: ${longitude}`,
          city: "Detected City",
          pincode: "000000",
          type: "Home",
        };

        setSelected(currentAddress._id);
        dispatch(addAddress(currentAddress));
        alert("Location detected successfully!");
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="text-lg font-semibold text-gray-800">
          Select Patient Address
        </h2>
        <p className="text-sm text-gray-500">Choose an address to continue</p>
      </div>

      {/* Address List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => handleSelect(addr)}
              className={`p-4 rounded-xl border shadow-sm cursor-pointer transition 
                ${selected === addr._id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {addr.type === "Home" ? (
                    <Home className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Building className="w-5 h-5 text-blue-600" />
                  )}
                  <p className="font-medium text-gray-800">{addr.type}</p>
                </div>
                {selected === addr._id && (
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-600 text-white">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-gray-700 mt-1">{addr.addressLine}</p>
              <p className="text-gray-600 text-sm">
                {addr.city} - {addr.pincode}
              </p>
              {addr.landmark && (
                <p className="text-gray-500 text-xs">
                  Landmark: {addr.landmark}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No saved addresses found.</p>
        )}

      </div>

      {/* Error Message */}
      {selectAddressError && (
        <p className="px-4 text-red-500 text-sm mb-2">{selectAddressError}</p>
      )}

      {/* Sticky Footer Button */}
      <div className="p-4 border-t bg-white">
        <button
          disabled={!selected}
          onClick={handleAddressSubmit}
          className={`w-full py-3 rounded-xl font-medium transition ${selected
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
