import React, { useState } from 'react';

const labLocation = {
  lat: 23.23939180910786,
  lng: 87.81565143106016,
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          (error) => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported by your browser'));
      }
    });

  const handleGetDirections = async () => {
    setLoading(true);

    try {
      const userLocation = await getUserLocation();
      const destinationLabel = encodeURIComponent('My Lab');
      
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${labLocation.lat},${labLocation.lng}+(${destinationLabel})&travelmode=driving`;

      window.open(mapsUrl, '_blank');
    } catch (error) {
      alert('Unable to get your location: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <p className="mb-4">
        📍 Our Lab Address: <br />
        23°14'21.5"N 87°48'56.1"E <br />
        (Latitude: {labLocation.lat.toFixed(6)}, Longitude: {labLocation.lng.toFixed(6)})
      </p>

      <button
        type="button"
        onClick={handleGetDirections}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Loading...' : 'Get Directions to My Lab'}
      </button>
    </div>
  );
}
