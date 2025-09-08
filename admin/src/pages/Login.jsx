import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import { showLoader, hideLoader } from "../features/loaderSlice.js";
import { showError, showSuccess } from "../utils/toast";
import { loginAdmin } from "../services/auth";
import { setAdmin } from "../features/authSlice";
export default function Login() {
    const dispatch = useDispatch();
    const admin = useSelector(state => state.auth.admin);
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoader());
            const admin = await loginAdmin(userData);
            console.log(admin);
            dispatch(setAdmin(admin));
            showSuccess("Login successful!");
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
            showError("Login failed!");
        } finally {
            dispatch(hideLoader());
        }
    };



    return (
        <>
            <Loader message="logging in.." />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
                    <img
                        src="https://accounts.practo.com/static/images/illustration.png"
                        alt="Health-e"
                        className="w-32 h-32 mb-6"
                    />
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">
                        Login as admin
                    </h2>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label
                                htmlFor="mobile-no"
                                className="block text-blue-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="tel"
                                id="email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={(e) =>
                                    setUserData({ ...userData, email: e.target.value })
                                }
                                required
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-blue-700 font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={userData.password}
                                onChange={(e) =>
                                    setUserData({ ...userData, password: e.target.value })
                                }
                                required
                                placeholder="Password"
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-10 text-blue-500 hover:text-blue-700"
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
                        >
                            Login
                        </button>
                    </form>
                    <span className="text-gray-700">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </>
    );
}
