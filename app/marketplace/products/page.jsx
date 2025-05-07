"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import Link from "next/link";



const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);


// const products = [
//   {
//     id: 1,
//     name: "Premium Portland Cement",
//     category: "Building Materials",
//     image:
//       "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
//     supplier: {
//       name: "Global Construction Supply",
//       location: "New York, NY",
//       verified: true,
//       rating: 4.8,
//     },
//     rating: 4.8,
//     reviewCount: 156,
//     specifications: ["Type I/II", "42.5 Grade", "50 KG Bag"],
//     minOrder: "100 Bags",
//     price: "Rs. 950/bag",
//     stock: {
//       available: true,
//       quantity: 5000,
//       unit: "bags",
//     },
//   },
  
// ];

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
  "Price: Low to High",
  "Price: High to Low",
  "In Stock First",
];
const priceRanges = [
  "All Prices",
  "Under Rs. 1,000",
  "Rs. 1,000 - Rs. 10,000",
  "Rs. 10,000 - Rs. 50,000",
  "Above Rs. 50,000",
];

const ProductsPage = () => {

   const {
     data: products,
     error,
     isLoading,
     mutate,
   } = useSWR("/marketplace/getProducts", fetcher);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                      Availability
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="verifiedOnly"
                          checked={showVerifiedOnly}
                          onChange={(e) =>
                            setShowVerifiedOnly(e.target.checked)
                          }
                          className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                        />
                        <label
                          htmlFor="verifiedOnly"
                          className="text-sm text-gray-400"
                        >
                          Show verified suppliers only
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="inStockOnly"
                          checked={showInStockOnly}
                          onChange={(e) => setShowInStockOnly(e.target.checked)}
                          className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                        />
                        <label
                          htmlFor="inStockOnly"
                          className="text-sm text-gray-400"
                        >
                          Show in-stock products only
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative">
                {/* Stock ribbon */}
                <div
                  className={`absolute top-0 right-0 z-10 p-1.5 px-3 text-xs font-medium ${
                    product.stock
                      ? "bg-green-500/80 text-white"
                      : "bg-red-500/80 text-white"
                  }`}
                >
                  {product.stock
                    ? `In Stock: ${product.stock} ${product.unit}`
                    : "Out of Stock"}
                </div>

                {product.supplier.verified && (
                  <div className="absolute top-0 left-0 z-10 p-1.5 px-3 bg-blue-500/80 text-white text-xs font-medium">
                    Verified Supplier
                  </div>
                )}

                <div className="relative aspect-video">
                  <Image
                    src={
                      product.image ||
                      "https://i0.wp.com/tinasbotanicals.com/wp-content/uploads/2025/01/No-Product-Image-Available.png?fit=800%2C800&ssl=1"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Quick overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-1 bg-gray-900/80 px-2 py-1 rounded-full">
                      <StarIcon className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-white">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-300">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <span className="text-xs text-white bg-gray-900/80 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-base font-medium text-white">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BuildingOffice2Icon className="h-3.5 w-3.5 text-gray-400" />
                      <p className="text-xs text-gray-300 truncate">
                        {product.supplier.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400 truncate max-w-[100px]">
                        {product.supplier?.stores?.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-1">
                  {product.specifications.map((spec, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-700/30 text-gray-300 rounded-full px-2 py-0.5 text-xs mr-1.5 mb-1.5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Min: {product.minOrder}
                    </span>
                    <span className="text-orange-400 font-medium">
                      Rs. {product.price}
                    </span>
                  </div>

                  <Link
                    href={`/marketplace/order/${product.id}`}
                    className="w-full mt-4 py-2 rounded-lg text-sm flex items-center justify-center gap-1 transition-colors bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {/* <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-white">{indexOfFirstProduct + 1}</span> to{" "}
            <span className="text-white">
              {Math.min(indexOfLastProduct, totalItems)}
            </span>{" "}
            of <span className="text-white">{totalItems}</span> products
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border ${
                currentPage === 1
                  ? "border-gray-700 text-gray-600 cursor-not-allowed"
                  : "border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <div className="text-sm font-medium text-white">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border ${
                currentPage === totalPages
                  ? "border-gray-700 text-gray-600 cursor-not-allowed"
                  : "border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductsPage;
