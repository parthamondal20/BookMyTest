import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showSuccess, showError } from "../utils/toast";
import { registerUser } from "../services/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
function Register() {
  const [userData, setUserData] = useState({
    username: "",
    mobileNo: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    try {
      const user = await registerUser(userData);
      console.log(user);
      showSuccess(`Welcome ${user.username}`);
      const from = location.state?.pathname;
      navigate(from || "/", { replace: true });
      dispatch(login(user));
    } catch (error) {
      console.log(error);
      showError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img
          src="https://accounts.practo.com/static/images/illustration.png"
          alt="Health-e"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Register to Health-e
        </h2>
        <form className="w-full" onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-blue-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              id="username"
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobile-no"
              className="block text-blue-700 font-medium mb-2"
            >
              Mobile No
            </label>
            <input
              type="text"
              id="mobile-no"
              value={userData.mobileNo}
              onChange={(e) =>
                setUserData({ ...userData, mobileNo: e.target.value })
              }
              placeholder="Mobile No"
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-blue-700 font-medium mb-2"
            >
              Create Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute  right-3 top-10 text-blue-500 hover:text-blue-700"
              tabIndex={-1}
            >
              {showPassword ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 cursor-pointer"
          >
            Register
          </button>
        </form>
        <span className="text-gray-700">
          Already have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
