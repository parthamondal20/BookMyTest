import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { logoutUser } from "../services/auth";
import { clearCart } from "../features/cartSlice";
const Header = () => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      showSuccess(`Searching for "${search}"`);
    } else {
      showError("Please enter a search term.");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Logging out user:", user);
      await logoutUser(user._id);
      showSuccess("Logout successful");
      dispatch(logout());
      dispatch(clearCart());
      setShowMenu(false);
      navigate("/");
      return;
    } catch (error) {
      console.error("Logout failed:", error);
      showError("Logout failed. Please try again.");
    }
  };
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-800 tracking-tight"
          >
            Health-e
          </Link>
        </div>
        {/* Search Bar Centered */}
        <form onSubmit={handleSearch} className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search health topics, doctors, articles..."
              className="w-full pl-4 pr-12 py-2 border border-blue-200 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition font-semibold"
            >
              Search
            </button>
          </div>
        </form>
        {/* Navigation Right */}
        <nav className="flex items-center gap-8 ml-8">
          {!user && (
            <Link
              to="/login"
              className="text-blue-700 hover:text-blue-900 font-semibold transition"
            >
              Login
            </Link>
          )}
          {user && (
            <div ref={menuRef} className="relative">
              {/* Profile Button */}
              <div
                className="cursor-pointer flex items-center gap-2"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                  alt="Profile"
                  className="w-7 h-7 rounded-full"
                />
                <p>Your profile</p>
              </div>

              {/* Dropdown Menu */}
              {showMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-700 rounded-xl transition"
                  >
                    <img
                      className="w-5 h-5 mr-3"
                      src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-e63ddf.svg"
                      alt="Logout"
                    />
                    <span className="text-sm font-medium">Logout</span>
                  </button>

                  <div>
                    <Link
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-700 rounded-xl transition"
                    >
                      <img
                        className="w-5 h-5 mr-3"
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                        alt="Profile"
                      />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          <Link
            to="/features"
            className="text-blue-700 hover:text-blue-900 font-semibold transition"
          >
            Features
          </Link>
          <Link
            to="/contact-page"
            className="text-blue-700 hover:text-blue-900 font-semibold transition"
          >
            Contact
          </Link>
          <Link to="/cart" title="Cart">
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* cart image */}
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"
                alt="cart"
                className="w-7 h-7"
              />

              {/* badge */}
              {cartItems.length > 0 && (
                <span
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold 
                       rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
