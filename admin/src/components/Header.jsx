import { Bell, LogOut, LogIn, Moon, Sun } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin as logoutAdminService } from "../services/auth";
import { showSuccess, showError } from "../utils/toast";
import { logoutAdmin } from "../features/authSlice";
import { showLoader, hideLoader, setMsg } from "../features/loaderSlice";
import { toggleTheme } from "../features/themeSlice";
import NotificationDropdown from "./NotificationDropDown";
export default function Header() {
  const admin = useSelector(state => state.auth.admin);
  const dark = useSelector((state) => state.theme.dark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    if (!admin) {
      showError("First login");
      return;
    }
    try {
      dispatch(showLoader());
      dispatch(setMsg("Logged out..."));
      await logoutAdminService(admin._id);
      showSuccess("Logged out successfully");
      dispatch(logoutAdmin());
    } catch (error) {
      console.log(error);
      showError("Logout failed!");
    } finally {
      dispatch(hideLoader());
    }
  }
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm px-6 py-4 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <h1
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
          className="text-lg cursor-pointer font-semibold text-gray-800 dark:text-gray-100"
        >
          Medilab
        </h1>
      </div>

      <div className="flex items-center gap-5">

        {admin && (
          <NotificationDropdown onViewAll={handleViewAllNotifications} />
        )}
        {/* {admin && (
          <button

            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )} */}

        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Toggle Theme"
        >
          {dark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {admin ? (
          <>
            <div
              onClick={() => navigate("/profile")}
              className="flex cursor-pointer items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="Admin Avatar"
                className="w-9 h-9 rounded-full border"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Admin
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        )}
      </div>
    </header>

  );
}
