import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMenuItems = async (searchValue = "") => {
    try {
      setLoading(true);

      const response = await API.get("/menu-items", {
        params: searchValue ? { search: searchValue } : {}
      });

      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchMenuItems(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800">

      {/* Hero / Header Banner with Background Image */}
      <div className="relative py-20 px-6 text-center shadow-xs overflow-hidden bg-gray-900">
        
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop"
          alt="Delicious food table"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />

        {/* Gradient Overlay for subtle contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/40 to-gray-950/60" />

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block px-3.5 py-1 mb-4 text-xs font-bold tracking-wider text-red-400 bg-red-950/60 rounded-full border border-red-500/30 backdrop-blur-md">
            FRESH & DELICIOUS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Welcome to <span className="text-red-500">TastyBites</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-normal leading-relaxed">
            Explore our curated menu of delicious culinary creations crafted just for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search Bar Container */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative flex items-center">
            <svg
              className="w-5 h-5 absolute left-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for dishes, appetizers, drinks..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Loading State Skeleton Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-xs max-w-lg mx-auto">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No items found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search criteria or clear the filter.</p>
          </div>
        ) : (
          /* Menu Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
              >
                {/* Image & Status Badge */}
                <div className="relative overflow-hidden bg-gray-100 h-52">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      No Image Available
                    </div>
                  )}

                  {/* Stock Pill Badge floating top right */}
                  <div className="absolute top-3 right-3">
                    {item.availability ? (
                      <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-md rounded-full shadow-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-semibold bg-gray-800/80 text-white backdrop-blur-md rounded-full shadow-sm">
                        Out of Stock
                      </span>
                    ) }
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-500 transition-colors">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-semibold block">Price</span>
                      <span className="text-xl font-black text-gray-900">
                        ₹{item.price}
                      </span>
                    </div>

                    <Link
                      to={`/menu/${item._id}`}
                      className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-95"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;