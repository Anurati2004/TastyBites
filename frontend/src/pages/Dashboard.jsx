import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [menuCount, setMenuCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/admin-login");
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const menuResponse = await API.get("/menu-items");
                const userResponse = await API.get("/users", config);

                setMenuCount(menuResponse.data.length);
                setUserCount(userResponse.data.length);

            } catch (error) {
                console.log(error);

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/admin-login");
                } else {
                    setError("Failed to load dashboard data");
                }
            }
        };

        fetchDashboardData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50/50 text-gray-800">

            {/* Dashboard Hero Banner */}
            <div className="relative py-12 px-6 overflow-hidden bg-gray-900 shadow-xs">

                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop"
                    alt="Restaurant ambiance"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/60 to-gray-950/80" />

                {/* Banner Content */}
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-red-400 bg-red-950/60 rounded-full border border-red-500/30 backdrop-blur-md">
                            ADMIN OVERVIEW
                        </span>

                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Control Center & Management
                        </h2>

                        <p className="text-gray-300 text-sm mt-1 max-w-xl">
                            Monitor user registrations, inventory listings, and system operations in real time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-2xl w-fit">

                    <Link
                        to="/dashboard"
                        className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-xs transition-all"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/menu-items"
                        className="text-gray-600 hover:text-gray-900 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/60"
                    >
                        Menu Items
                    </Link>

                    <Link
                        to="/users"
                        className="text-gray-600 hover:text-gray-900 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/60"
                    >
                        Users
                    </Link>

                </div>

                {/* Error Alert */}
                {error && (
                    <div className="flex items-center gap-2.5 bg-red-50 border border-red-200/80 text-red-800 text-sm p-4 rounded-xl mb-6">

                        <svg
                            className="w-5 h-5 text-red-500 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <p className="font-medium">
                            {error}
                        </p>

                    </div>
                )}

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Menu Items Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">

                        <div>
                            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                                Total Menu Items
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
                                {menuCount}
                            </h2>
                        </div>

                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center border border-red-100/60">

                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332 1.253-4.5 1.253"
                                />
                            </svg>

                        </div>

                    </div>

                    {/* Registered Users Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">

                        <div>
                            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                                Total Users
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
                                {userCount}
                            </h2>
                        </div>

                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center border border-red-100/60">

                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>

                        </div>

                    </div>

                    {/* Orders Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">

                        <div>
                            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                                Total Orders
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
                                0
                            </h2>
                        </div>

                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center border border-red-100/60">

                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;