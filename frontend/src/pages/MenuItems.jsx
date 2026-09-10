import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function MenuItems() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchMenuItems = async (searchValue = "") => {
    try {
      const response = await API.get("/menu-items", {
        params: searchValue ? { search: searchValue } : {}
      });

      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to load menu items");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetchMenuItems();
  }, [navigate]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchMenuItems(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/menu-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchMenuItems(search);

    } catch (error) {
      console.log(error);
      setError("Failed to delete menu item");
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
              <p className="text-xs text-gray-400 font-medium">Menu Management</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Top Controls: Search & Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          
          <div className="relative w-full sm:w-80">
            <svg className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>

          <Link
            to="/menu-items/add"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-98"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Menu Item
          </Link>

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

        {/* Table / Empty State */}
        {menuItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No menu items found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="p-4 pl-6">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                  {menuItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                      
                      <td className="p-4 pl-6">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-[10px] text-gray-400 font-semibold">
                            NO IMAGE
                          </div>
                        )}
                      </td>

                      <td className="p-4 font-semibold text-gray-900">
                        {item.name}
                      </td>

                      <td className="p-4 text-gray-500">
                        <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-gray-900">
                        ₹{item.price}
                      </td>

                      <td className="p-4">
                        {item.availability ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Out of Stock
                          </span>
                        )}
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          
                          <Link
                            to={`/menu-items/edit/${item._id}`}
                            className="px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg text-xs font-semibold transition-all duration-150"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold shadow-2xs hover:shadow-red-500/20 transition-all duration-150"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default MenuItems;