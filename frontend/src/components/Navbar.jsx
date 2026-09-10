import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

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
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">RESTAURANT</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          <Link
            to="/"
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
          >
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-xs sm:text-sm font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm shadow-red-500/20 active:scale-95"
              >
                Register
              </Link>

              <div className="h-4 w-px bg-gray-200 mx-1" />

              <Link
                to="/admin-login"
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 px-2.5 py-1.5 rounded-lg hover:bg-gray-100/80 transition-all duration-200"
              >
                Admin Portal
              </Link>
            </>
          )}

          {user && user.role === "User" && (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-xs font-semibold text-gray-500 hidden sm:inline-block bg-gray-100 px-2.5 py-1 rounded-full">
                {user.name || "Customer"}
              </span>

              <button
                onClick={handleLogout}
                className="text-xs sm:text-sm font-semibold bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-transparent hover:border-red-200/60 px-4 py-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                Logout
              </button>
            </div>
          )}

          {user && user.role === "Admin" && (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/70 px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-xs sm:text-sm font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 px-4 py-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                Logout
              </button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;