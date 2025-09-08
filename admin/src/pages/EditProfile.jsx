import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";
import { Camera } from "lucide-react";
// import your updateAdmin service if you have one
// import { updateAdminProfile } from "../services/auth";

export default function EditProfile() {
    const admin = useSelector((state) => state.auth.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(admin?.name || "");
    const [email, setEmail] = useState(admin?.email || "");
    const [avatar, setAvatar] = useState(admin?.avatar || "");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call your backend API to update admin info
            // await updateAdminProfile({ name, email, avatar });
            showSuccess("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.log(error);
            showError("Failed to update profile");
        }
    };

    if (!admin) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-100">
                <p>No admin logged in.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6 transition-colors duration-300">
            <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow"
            >
                {/* Avatar Preview */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32">
                        {/* Avatar Circle */}
                        <img
                            src={avatar || "https://i.pravatar.cc/150?img=3"}
                            alt="Avatar Preview"
                            className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover"
                        />

                        {/* Overlay Button */}
                        <label
                            htmlFor="avatarUpload"
                            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors"
                            title="Change Avatar"
                        >
                            <Camera className="w-5 h-5" />
                        </label>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        id="avatarUpload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>

                {/* Name */}
                <div className="flex flex-col">
                    <label className="mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        required
                    />
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors duration-300"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
