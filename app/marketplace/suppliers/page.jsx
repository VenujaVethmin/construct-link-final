"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  FunnelIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const suppliers = [
  {
    id: 1,
    name: "Global Construction Supply",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800",
    rating: 4.9,
    verifiedYears: 8,
    location: "New York, NY",
    specialties: ["Building Materials", "Tools"],
    responseTime: "< 12 hours",
  },
  {
    id: 2,
    name: "Safety Pro Equipment",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800",
    rating: 4.7,
    verifiedYears: 5,
    location: "Chicago, IL",
    specialties: ["Safety Equipment", "PPE"],
    responseTime: "< 6 hours",
  },
  // Add more suppliers with similar structure
];

const categories = [
  "All",
  "Building Materials",
  "Safety Equipment",
  "Tools",
  "Machinery",
  "Electrical",
  "Plumbing",
];
const locations = [
  "All Locations",
  "New York",
  "Chicago",
  "Los Angeles",
  "Houston",
  "Miami",
];
const ratings = ["All Ratings", "4.5+", "4.0+", "3.5+"];

const SuppliersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Construction Suppliers
            </h1>
            <p className="text-gray-400 text-sm">
              Find and connect with verified suppliers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select className="bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm px-3 py-1.5">
              <option>Rating: High to Low</option>
              <option>Response Time</option>
              <option>Years Verified</option>
            </select>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers by name or specialty..."
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

                {/* Filters Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Location */}
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Location
                    </h3>
                    <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm px-3 py-1.5">
                      {locations.map((location) => (
                        <option key={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Minimum Rating
                    </h3>
                    <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm px-3 py-1.5">
                      {ratings.map((rating) => (
                        <option key={rating}>{rating}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {suppliers.map((supplier) => (
            <motion.div
              key={supplier.id}
              whileHover={{ y: -4 }}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={supplier.image}
                  alt={supplier.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-xs flex items-center gap-1">
                  <CheckBadgeIcon className="h-3 w-3" />
                  <span>{supplier.verifiedYears}Y</span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-white truncate">
                    {supplier.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MapPinIcon className="h-3 w-3" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-3.5 w-3.5 text-yellow-400" />
                      <span className="text-white text-xs font-medium">
                        {supplier.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  <p className="truncate">{supplier.specialties.join(" • ")}</p>
                  <p className="text-green-400 mt-1">
                    Response: {supplier.responseTime}
                  </p>
                </div>

                <div className="flex gap-1.5 pt-1">
                  <button className="flex-1 bg-orange-500 text-white py-1.5 rounded text-xs font-medium hover:bg-orange-600">
                    Contact
                  </button>
                  <button className="p-1.5 rounded bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white">
                    <PhoneIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white">
                    <EnvelopeIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;
