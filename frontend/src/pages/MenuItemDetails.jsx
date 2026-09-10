import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function MenuItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await API.get(`/menu-items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
          <div className="w-full h-80 bg-gray-200"></div>
          <div className="p-8 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-16 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center py-12 px-6">
        <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-md w-full">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Item Not Found
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            The menu item you are looking for does not exist or has been removed.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-red-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-sm hover:shadow-md hover:shadow-red-500/20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Navigation Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors mb-6 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Menu
        </Link>

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {item.image && (
            <div className="relative h-80 sm:h-96 w-full bg-gray-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 sm:p-10">

            {/* Category Pill & Stock Status */}
            <div className="flex items-center justify-between gap-4 mb-3">
              {item.category && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 rounded-full border border-red-100">
                  {item.category}
                </span>
              )}

              <div>
                {item.availability ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {item.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mt-4">
              {item.description}
            </p>

            {/* Price Footer Bar */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">

              <div>
                <span className="text-xs text-gray-400 uppercase font-semibold block">
                  Price
                </span>

                <span className="text-3xl font-black text-gray-900">
                  ₹{item.price}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">

                {/* Static Order Button */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 bg-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 active:scale-95 transition-all shadow-sm hover:shadow-md hover:shadow-red-500/20"
                >
                  Order Now
                </button>

                {/* Back to Menu */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                >
                  <span>Back to Menu</span>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;