import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function AddMenuItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Starter",
    price: "",
    availability: true,
    image: null
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("availability", formData.availability);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await API.post("/menu-items", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate("/menu-items");

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to add menu item"
      );
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Header Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-red-500/20">
              T
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                TastyBites
              </h1>
              <p className="text-xs text-gray-400 font-medium">Add Menu Item</p>
            </div>
          </div>

          <Link
            to="/menu-items"
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">Item Details</h2>
            <p className="text-xs text-gray-400">Fill in the information below to add a new menu item.</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Item Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Paneer Butter Masala"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief description of ingredients, flavor profile, etc."
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder-gray-400 resize-none"
              />
            </div>

            {/* Grid for Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all cursor-pointer"
                >
                  <option value="Starter">Starter</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">
                  Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="250"
                    className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder-gray-400"
                  />
                </div>
              </div>

            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">
                Availability
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all cursor-pointer"
              >
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>

            {/* Image Upload Input */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-600 mb-2">
                Item Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-red-400 transition-colors bg-gray-50/50">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-semibold text-red-500 hover:text-red-600 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {formData.image ? formData.image.name : "PNG, JPG, GIF up to 5MB"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-98"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding Item...</span>
                </>
              ) : (
                "Add Menu Item"
              )}
            </button>

          </form>

        </div>
      </main>

    </div>
  );
}

export default AddMenuItem;