import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
        "Failed to delete user"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Header Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-red-500/20">
              T
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                TastyBites
              </h1>
              <p className="text-xs text-gray-400 font-medium">User Management</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200/80 text-red-800 text-sm p-4 rounded-xl mb-6">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* User Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Registered Users</h2>
              <p className="text-xs text-gray-400">View and manage all registered accounts on the platform.</p>
            </div>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
              Total: {users.length}
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
              <svg className="animate-spin h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Loading users...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-medium text-sm">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                      User
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Role
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Joined Date
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center text-xs">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-500 font-medium">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            user.role === "Admin"
                              ? "bg-red-50 text-red-600 border border-red-200/60"
                              : "bg-blue-50 text-blue-600 border border-blue-200/60"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-400 font-medium text-xs">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}

export default Users;