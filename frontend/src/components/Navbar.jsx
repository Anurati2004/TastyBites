import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-red-500/20 group-hover:scale-105 transition-transform duration-200">
            T
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              TastyBites
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">
              RESTAURANT
            </p>
          </div>
        </Link>

        {/* Guest Navbar */}
        {!user && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/"
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-xs sm:text-sm font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Register
            </Link>

            <div className="h-4 w-px bg-gray-200 mx-1" />

            <Link
              to="/admin-login"
              className="text-xs font-semibold text-gray-400 hover:text-gray-700 px-2.5 py-1.5 rounded-lg hover:bg-gray-100"
            >
              Admin Portal
            </Link>
          </div>
        )}

        {/* Normal User Navbar */}
        {user && user.role === "User" && (
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50"
            >
              Home
            </Link>

            <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block bg-gray-100 px-2.5 py-1 rounded-full">
              {user.name || "Customer"}
            </span>

            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-semibold bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        )}

        {/* Admin Navbar */}
        {user && user.role === "Admin" && (
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;