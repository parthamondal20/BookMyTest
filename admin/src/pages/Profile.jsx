import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const admin = useSelector((state) => state.auth.admin);
    const navigate = useNavigate();

    if (!admin) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-100">
                <p>No admin logged in.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6 transition-colors duration-300">
            <div className="flex flex-col items-center gap-4">
                {/* Profile Avatar */}
                <img
                    src={admin.avatar || "https://i.pravatar.cc/150?img=3"}
                    alt="Admin Avatar"
                    className="w-32 h-32 rounded-full border-2 border-gray-300 dark:border-gray-700"
                />

                {/* Admin Info */}
                <h2 className="text-2xl font-semibold">{admin.name || "Admin"}</h2>
                <p className="text-gray-600 dark:text-gray-400">{admin.email}</p>

                {/* Edit Profile Button */}
                <button
                    onClick={() => navigate("/edit-profile")}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors duration-300"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
