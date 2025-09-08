import { useParams } from "react-router-dom";
import { getTestdetails } from "../services/test";
import { useEffect, useState } from "react";
import { showLoader, hideLoader } from "../features/loaderSlice";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TestDetailPage() {
  const { test_id } = useParams();
  const [test, setTest] = useState(null);
  const [bookingsData, setBookingsData] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const dispatch = useDispatch();

  const fetchTestDetails = async () => {
    dispatch(showLoader());
    try {
      const data = await getTestdetails(test_id);
      setTest(data);

      const monthlyBookings = [
        { month: "Jan", count: 12 },
        { month: "Feb", count: 18 },
        { month: "Mar", count: 25 },
        { month: "Apr", count: 10 },
        { month: "May", count: 30 },
        { month: "Jun", count: 22 },
      ];

      setBookingsData(monthlyBookings);
      setTotalBookings(
        monthlyBookings.reduce((acc, curr) => acc + curr.count, 0)
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchTestDetails();
  }, [test_id]);

  if (!test) {
    return <Loader message="Fetching test details..." />;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-gray-900 dark:text-gray-100">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{test.testname}</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">
            <Pencil className="w-4 h-4" /> Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="w-full h-72 bg-gray-100 dark:bg-gray-700">
            <img
              src={test.image || "https://via.placeholder.com/400"}
              alt={test.testname}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <p className="text-lg font-semibold text-green-600">₹{test.price}</p>
          <p>
            <span className="font-medium">Category:</span> {test.category}
          </p>
          <p>
            <span className="font-medium">Lab:</span> {test.lab}
          </p>
          <p>
            <span className="font-medium">Duration:</span> {test.duration} mins
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p>Created At: {new Date(test.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(test.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h2 className="text-xl font-bold">Details</h2>
        <p>
          <span className="font-medium">Short Description:</span>{" "}
          {test.shortDescription}
        </p>
        <p className="leading-relaxed">
          <span className="font-medium">Full Description:</span>{" "}
          {test.description}
        </p>
        <p>
          <span className="font-medium">Preparation:</span> {test.preparation}
        </p>
      </div>

      {/* Bookings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">Total Bookings</p>
          <h3 className="text-3xl font-bold text-blue-600">{totalBookings}</h3>
        </div>

        <h2 className="text-xl font-bold mb-4">Monthly Bookings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
            <XAxis dataKey="month" stroke="#888888" />
            <YAxis allowDecimals={false} stroke="#888888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937", // dark background
                borderRadius: "8px",
                borderColor: "#374151",
              }}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
