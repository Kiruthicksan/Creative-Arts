import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  FileText,
  DollarSign,
  Layers,
  Save,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useAssetsStore from "../../store/useAssetsStore";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { createProduct, loading } = useAssetsStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Graphic Design",
    price: "",
    originalPrice: "",
    discount: "",
    author: "",
    included: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [downloadFile, setDownloadFile] = useState(null);

  const categories = [
    "Graphic Design",
    "Illustrations",
    "Short Novels",
    "Posters",
    "ConceptArt",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e) => {
    setDownloadFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.author ||
      !downloadFile ||
      previewImages.length === 0
    ) {
      toast.error("Please fill in all required fields and upload files.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    previewImages.forEach((image) => {
      data.append("previewImages", image);
    });

    if (downloadFile) {
      data.append("downloadFile", downloadFile);
    }

    const { success, error } = await createProduct(data);

    if (success) {
      toast.success("Product created successfully!");
      navigate("/admin-products");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin-products"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-1">
            Create a new digital asset for your store.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText size={20} className="text-indigo-600" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g. Abstract 3D Shapes Pack"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Describe your product..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author / Creator *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Creator Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
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
          </div>

          {/* Pricing Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" />
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Layers size={20} className="text-purple-600" />
              Additional Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Included Items
              </label>
              <textarea
                name="included"
                value={formData.included}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder="List what's included (e.g. 5 PSD files, 1 PDF guide)..."
              />
            </div>
          </div>
        </div>

        {/* Right Column - Uploads */}
        <div className="space-y-6">
          {/* Preview Images Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ImageIcon size={20} className="text-orange-600" />
              Preview Images
            </h2>

            <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors bg-gray-50/50 block cursor-pointer">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload size={32} className="text-gray-400 mb-3" />
                <span className="text-indigo-600 font-semibold hover:text-indigo-700">
                  Click to upload
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </label>

            {previewImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {previewImages.length} images selected
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from(previewImages).map((file, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product File Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Upload size={20} className="text-blue-600" />
              Product File
            </h2>

            <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors bg-gray-50/50 block cursor-pointer">
              <div className="flex flex-col items-center justify-center text-center">
                <FileText size={32} className="text-gray-400 mb-3" />
                <span className="text-indigo-600 font-semibold hover:text-indigo-700">
                  Upload ZIP
                </span>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-1">
                  ZIP file containing all assets
                </p>
              </div>
            </label>

            {downloadFile && (
              <div className="flex items-center gap-3 p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm border border-indigo-100">
                <FileText size={16} />
                <span className="truncate flex-1">{downloadFile.name}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="sticky top-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Product
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Changes will be published immediately upon creation.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
