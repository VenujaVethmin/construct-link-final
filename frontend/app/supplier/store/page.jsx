"use client";

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  StarIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { toast } from "sonner";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const categories = [
  "All Products",
  "Building Materials",
  "Flooring",
  "Electrical",
  "Plumbing",
  "Paint & Finish",
  "Windows & Doors",
  "Hardware",
];

const StorePage = () => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR("/supplier/store", fetcher);

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "Rs. 0";
    return `Rs. ${amount.toLocaleString("en-IN")}`;
  };

  // Handle product deletion
  const handleDeleteProduct = async (id) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/supplier/products/${id}`);
      toast.success("Product deleted successfully");
      mutate(); // Refresh data
      setDeleteConfirmProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter products based on criteria
  const filteredProducts = data
    ? data.filter((product) => {
        const matchesCategory =
          selectedCategory === "All Products" ||
          product.category === selectedCategory;

        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesMinPrice =
          priceRange.min === "" ||
          (product.price && product.price >= parseFloat(priceRange.min));

        const matchesMaxPrice =
          priceRange.max === "" ||
          (product.price && product.price <= parseFloat(priceRange.max));

        return (
          matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
        );
      })
    : [];

  // Sort products based on criteria
  const sortedProducts =
    filteredProducts.length > 0
      ? [...filteredProducts].sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return (a.price || 0) - (b.price || 0);
            case "price-high":
              return (b.price || 0) - (a.price || 0);
            case "rating":
              return (b.rating || 0) - (a.rating || 0);
            case "newest":
              return new Date(b.createdAt) - new Date(a.createdAt);
            case "oldest":
              return new Date(a.createdAt) - new Date(b.createdAt);
            default:
              return new Date(b.createdAt) - new Date(a.createdAt);
          }
        })
      : [];

  // Get unique categories from the products data
  const productCategories = data
    ? [
        "All Products",
        ...new Set(data.map((product) => product.category).filter(Boolean)),
      ]
    : categories;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-red-500/30">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-400">
            Failed to load store information. Please try again later.
          </p>
          <button
            onClick={() => mutate()}
            className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const storeInfo =
    data?.length > 0 && data[0].supplier?.stores?.length > 0
      ? data[0].supplier.stores[0]
      : null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 p-6"
    >
      {/* Store Header */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 rounded-xl bg-gray-700/50 flex items-center justify-center overflow-hidden">
            {storeInfo?.image ? (
              <Image
                src={storeInfo.image}
                alt={storeInfo.name}
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <ShoppingBagIcon className="h-10 w-10" />
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">
              {storeInfo?.name || "Your Store"}
            </h1>
            <p className="text-gray-400 mt-1">
              {storeInfo?.description || "Manage your products and inventory"}
            </p>
            <div className="flex flex-wrap mt-3 gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1">
                <InformationCircleIcon className="h-4 w-4" />
                {data?.length || 0} Products
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {storeInfo?.type || "Supplier"}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            
          </div>
        </div>
      </motion.div>

      {/* Filter and Search */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="px-4 py-2.5 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-gray-700/50 transition-colors"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filter
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1rem",
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={itemVariants}
        className="flex overflow-x-auto gap-2 py-2 scrollbar-hide"
      >
        {productCategories.map((category) => (
          <button
            key={category || "uncategorized"}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-colors ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            {category || "Uncategorized"}
          </button>
        ))}
      </motion.div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-10 text-center"
        >
          <div className="mx-auto w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
            <ShoppingBagIcon className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-400 mb-6">
            {data?.length === 0
              ? "You haven't added any products yet."
              : "No products match your current filters."}
          </p>
          {data?.length === 0 && (
            <Link href="/supplier/products/new">
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors inline-flex items-center gap-2">
                <PlusIcon className="h-5 w-5" />
                Add Your First Product
              </button>
            </Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "/noimage.webp"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {product.category || "Uncategorized"}
                  </span>
                </div>

                {/* Status badge */}
                <div className="absolute top-2 left-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > (product.minStock || 0)
                        ? "bg-green-500/20 text-green-400"
                        : product.stock > 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.stock > (product.minStock || 0)
                      ? "In Stock"
                      : product.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-medium text-lg line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                    <span className="text-white ml-1">
                      {product.rating || "0"}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-400">
                    {product.reviewCount || 0} reviews
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="text-orange-400 font-semibold text-lg">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      /{product.unit || "item"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/supplier/products/${product.id}/edit`}>
                      <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-blue-500 text-gray-300 hover:text-white transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </Link>
                    <button
                      className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-500 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setDeleteConfirmProduct(product)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <Link href={`/supplier/products/${product.id}`}>
                  <button className="w-full mt-3 py-2 bg-gray-700/50 hover:bg-orange-500 text-gray-300 hover:text-white transition-colors rounded-lg text-sm font-medium">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-800 rounded-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  Filter Products
                </h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1 hover:bg-gray-700 rounded-full"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Categories
                  </h4>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {productCategories.map((category) => (
                      <button
                        key={category || "uncategorized"}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterModalOpen(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-orange-500 text-white"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {category || "Uncategorized"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Price Range
                  </h4>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategory("All Products");
                      setPriceRange({ min: "", max: "" });
                    }}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-800 rounded-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Delete Product?
                </h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete "{deleteConfirmProduct.name}"?
                  This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    disabled={isDeleting}
                    onClick={() => setDeleteConfirmProduct(null)}
                    className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={() => handleDeleteProduct(deleteConfirmProduct.id)}
                    className={`px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center ${
                      isDeleting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StorePage;
