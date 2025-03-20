"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Premium Portland Cement",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    supplier: {
      name: "Global Construction Supply",
      location: "New York, NY",
      verified: true,
      rating: 4.8,
    },
    rating: 4.8,
    reviewCount: 156,
    specifications: ["Type I/II", "42.5 Grade", "50 KG Bag"],
    minOrder: "100 Bags",
    price: "Contact for Price",
  },
  {
    id: 2,
    name: "Industrial Safety Helmet",
    category: "Safety Equipment",
    image:
      "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=800",
    supplier: {
      name: "Safety Pro Equipment",
      location: "Chicago, IL",
      verified: true,
      rating: 4.9,
    },
    rating: 4.9,
    reviewCount: 89,
    specifications: ["ANSI Certified", "Adjustable", "Impact Resistant"],
    minOrder: "20 Units",
    price: "$24.99/unit",
  },
  // Add more products...
];

const categories = [
  "All Categories",
  "Building Materials",
  "Safety Equipment",
  "Tools",
  "Heavy Equipment",
  "Electrical",
  "Plumbing",
];
const sortOptions = [
  "Relevance",
  "Rating: High to Low",
  "Reviews",
  "Min Order: Low to High",
];
const priceRanges = [
  "All Prices",
  "Under $50",
  "$50 - $200",
  "$200 - $1000",
  "Above $1000",
  "Contact for Price",
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Construction Products
            </h1>
            <p className="text-gray-400 text-sm">
              Find quality products from verified suppliers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm px-3 py-1.5"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name, category, or supplier..."
                className="w-full px-4 py-2.5 pl-10 pr-4 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2.5 rounded-lg border ${
              isFilterOpen
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            <FunnelIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 space-y-4">
                {/* Categories */}
                <div>
                  <h3 className="text-white text-sm font-medium mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-xs ${
                          selectedCategory === category
                            ? "bg-orange-500 text-white"
                            : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Price Range
                    </h3>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm px-3 py-1.5"
                    >
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Supplier
                    </h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="verifiedOnly"
                        checked={showVerifiedOnly}
                        onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                        className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                      />
                      <label
                        htmlFor="verifiedOnly"
                        className="text-sm text-gray-400"
                      >
                        Show verified suppliers only
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <p className="text-xs text-gray-400">{product.category}</p>
                  <h3 className="text-sm font-medium text-white truncate mt-0.5">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="text-white">{product.rating}</span>
                    <span className="text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <span className="text-gray-400">Min: {product.minOrder}</span>
                </div>

                <div className="border-t border-gray-700/50 pt-2 mt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <BuildingOffice2Icon className="h-3.5 w-3.5 text-gray-400" />
                    <p className="text-xs text-gray-300 truncate">
                      {product.supplier.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {product.supplier.location}
                      </span>
                    </div>
                    <span className="text-xs text-orange-500 font-medium">
                      {product.price}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gray-700/30 text-white py-1.5 rounded text-xs hover:bg-gray-700/50">
                  Get Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
