import axios from "axios";

const generateAddressFromCoords = async (lat, lng) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        format: "json",
        lat,
        lon: lng,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Geocoding failed:", error.message);
    return null;
  }
};

export { generateAddressFromCoords };
