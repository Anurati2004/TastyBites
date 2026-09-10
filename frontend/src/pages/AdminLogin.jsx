import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await API.post("/auth/login", formData);

      if (response.data.user.role !== "Admin") {
        setError("Admin access required");
        return;
      }

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Admin login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-6 py-12">

      <div className="bg-white w-full max-w-md p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
        
        {/* Top Accent Line for Admin Badge Feel */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600"></div>

        {/* Header / Security Shield Icon */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 border border-red-100/60 shadow-xs">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          
          <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-bold tracking-wider text-red-600 bg-red-50 rounded-full border border-red-100 uppercase">
            Restricted Access
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access management controls
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200/80 text-red-800 text-sm p-4 rounded-xl mb-6">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              placeholder="admin@tastybites.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-98"
          >
            Admin Login
          </button>

        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
          Not an administrator?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:text-red-600 font-semibold transition-colors"
          >
            User Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;