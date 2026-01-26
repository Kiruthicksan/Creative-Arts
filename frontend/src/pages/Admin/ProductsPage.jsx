import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = [
    {
      id: 1,
      name: "Abstract Modern 3D Art",
      category: "Digital Art",
      price: 120.0,
      stock: 45,
      status: "Active",
      sales: 128,
      image:
        "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      name: "Minimalist Poster Pack",
      category: "Print",
      price: 45.5,
      stock: 120,
      status: "Active",
      sales: 852,
      image:
        "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      name: "Handcrafted Ceramics Set",
      category: "Crafts",
      price: 89.99,
      stock: 0,
      status: "Out of Stock",
      sales: 64,
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      name: "Oil Painting Texture Brushes",
      category: "Tools",
      price: 24.0,
      stock: 999,
      status: "Active",
      sales: 2401,
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 5,
      name: "Urban Photography Collection",
      category: "Photography",
      price: 60.0,
      stock: 15,
      status: "Low Stock",
      sales: 42,
      image:
        "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    "Digital Art",
    "Print",
    "Crafts",
    "Tools",
    "Photography",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      case "Low Stock":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            Manage your store catalog and inventory.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <Filter size={18} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-700 cursor-pointer min-w-[100px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          ID: #{product.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {product.sales}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Mock) */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1 to 5 of 124 results</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;