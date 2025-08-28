import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function SelectAddress({ addresses = [], onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (addr) => {
    setSelected(addr._id);
    onSelect(addr); // pass selected address to parent
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", latitude, longitude);

        // ⚡ Call your backend API (e.g. Google Maps or OpenStreetMap reverse geocoding)
        // Example: fetch(`/api/location?lat=${latitude}&lng=${longitude}`)
        // For now, just mock an address:
        const currentAddress = {
          addressLine: `Lat: ${latitude}, Lng: ${longitude}`,
          city: "Detected City",
          pincode: "000000",
          type: "Home",
        };
        onSelect(currentAddress);
        alert("Location detected successfully!");
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Select Patient Address
      </h2>

      {/* Saved addresses */}
      <div className="space-y-4">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => handleSelect(addr)}
              className={`p-4 rounded-xl border cursor-pointer transition ${selected === addr._id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
                }`}
            >
              <p className="font-medium text-gray-800">{addr.type}</p>
              <p className="text-gray-700">{addr.addressLine}</p>
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

      {/* Use my location */}
      <button
        type="button"
        onClick={handleUseMyLocation}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow transition"
      >
        <MapPin className="w-5 h-5" />
        Use My Location
      </button>
    </div>
  );
}
