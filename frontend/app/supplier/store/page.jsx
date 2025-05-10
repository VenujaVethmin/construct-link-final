"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  ArchiveBoxIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

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

// Dummy data
const products = [
  {
    id: 1,
    name: "Premium Portland Cement",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    price: 950,
    unit: "bag",
    rating: 4.7,
    reviews: 124,
    stock: 5000,
    sales: 1240,
  },
  {
    id: 2,
    name: "Steel Reinforcement Bars",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1611750325917-cdfaf72101be?q=80&w=800",
    price: 85000,
    unit: "ton",
    rating: 4.8,
    reviews: 82,
    stock: 50,
    sales: 32,
  },
  {
    id: 3,
    name: "Ceramic Floor Tiles",
    category: "Flooring",
    image:
      "https://images.unsplash.com/photo-1615529161791-5d95e779b52f?q=80&w=800",
    price: 120,
    unit: "sq.ft",
    rating: 4.5,
    reviews: 210,
    stock: 12000,
    sales: 3450,
  },
  {
    id: 4,
    name: "PVC Pipes (4 inch)",
    category: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1581094487416-8bbe7467cb9c?q=80&w=800",
    price: 450,
    unit: "piece",
    rating: 4.3,
    reviews: 64,
    stock: 780,
    sales: 120,
  },
  {
    id: 5,
    name: "Glass Panels (Tempered)",
    category: "Windows & Doors",
    image:
      "https://images.unsplash.com/photo-1598511726583-fad5109d2175?q=80&w=800",
    price: 3250,
    unit: "panel",
    rating: 4.9,
    reviews: 36,
    stock: 45,
    sales: 28,
  },
  {
    id: 6,
    name: "Hardwood Flooring",
    category: "Flooring",
    image:
      "https://images.unsplash.com/photo-1622142566918-c437a3ffa321?q=80&w=800",
    price: 320,
    unit: "sq.ft",
    rating: 4.6,
    reviews: 95,
    stock: 2500,
    sales: 980,
  },
];

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
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        return b.sales - a.sales;
    }
  });

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
            <Image
              src="https://images.unsplash.com/photo-1585713181954-a1d4176e6783?q=80&w=800"
              alt="Company Logo"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">
              ABC Building Materials Store
            </h1>
            <p className="text-gray-400 mt-1">
              Your trusted partner for quality construction supplies
            </p>
            <div className="flex flex-wrap mt-3 gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center">
                <StarIcon className="h-4 w-4 mr-1" />
                4.8 Rating
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                246 Successful Orders
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                Premium Supplier
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
              Manage Store
            </button>
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
          <option value="popularity">Popularity</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={itemVariants}
        className="flex overflow-x-auto gap-2 py-2 scrollbar-hide"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-colors ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-white font-medium text-lg line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-white ml-1">{product.rating}</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-sm text-gray-400">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <span className="text-orange-400 font-semibold text-lg">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    /{product.unit}
                  </span>
                </div>
                <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-orange-500 text-gray-300 hover:text-white transition-colors">
                  <ShoppingBagIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-800 rounded-xl w-full max-w-md p-6"
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
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
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
                        {category}
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
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
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
    </motion.div>
  );
};

export default StorePage;
