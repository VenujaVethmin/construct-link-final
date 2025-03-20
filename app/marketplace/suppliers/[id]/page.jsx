"use client";

import { useState } from "react";
import {
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock data for supplier profile
const supplierProfile = {
  id: 1,
  name: "Global Construction Supply",
  image:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200",
  rating: 4.9,
  reviewCount: 128,
  verifiedYears: 8,
  location: "New York, NY",
  address: "123 Business Street, NY 10001",
  about:
    "Leading supplier of construction materials with over 20 years of experience. We specialize in providing high-quality building materials and professional tools.",
  specialties: ["Building Materials", "Tools", "Safety Equipment"],
  stats: {
    established: 2010,
    employees: "100-500",
    responseTime: "< 12 hours",
    orderFulfillment: "98%",
    deliveryRange: "Nationwide",
  },
  certifications: [
    "ISO 9001:2015",
    "Construction Quality Certified",
    "Safety Standards Compliant",
  ],
  products: [
    {
      id: 1,
      name: "Premium Portland Cement",
      category: "Building Materials",
      image:
        "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
      rating: 4.8,
      reviewCount: 56,
      specifications: ["Type I/II", "42.5 Grade", "50 KG Bag"],
      minOrder: "100 Bags",
    },
    {
      id: 2,
      name: "Steel Rebar Bundle",
      category: "Steel Products",
      image:
        "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=800",
      rating: 4.9,
      reviewCount: 34,
      specifications: ["Grade 60", "12mm-25mm", "12m Length"],
      minOrder: "5 Tons",
    },
    // Add more products...
  ],
};

const SupplierProfile = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="h-48 sm:h-64">
            <Image
              src={supplierProfile.image}
              alt={supplierProfile.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>

          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {supplierProfile.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">{supplierProfile.rating}</span>
                  <span className="text-gray-300">
                    ({supplierProfile.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{supplierProfile.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Contact Now
              </button>
              <button className="bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-gray-700">
                <PhoneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Company Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <BuildingOffice2Icon className="h-5 w-5" />
              <span className="text-sm font-medium">Company Info</span>
            </div>
            <p className="text-white text-sm">
              Est. {supplierProfile.stats.established}
            </p>
            <p className="text-gray-400 text-sm">
              {supplierProfile.stats.employees} Employees
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <ClockIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Response Time</span>
            </div>
            <p className="text-green-400 text-sm">
              {supplierProfile.stats.responseTime}
            </p>
            <p className="text-gray-400 text-sm">
              {supplierProfile.stats.orderFulfillment} Fulfillment
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TruckIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Delivery</span>
            </div>
            <p className="text-white text-sm">
              {supplierProfile.stats.deliveryRange}
            </p>
            <p className="text-gray-400 text-sm">Free quotes available</p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <CheckBadgeIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Certifications</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {supplierProfile.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="space-y-4">
          <div className="border-b border-gray-700">
            <div className="flex gap-6">
              {["products", "about", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "products" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {supplierProfile.products.map((product) => (
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
                        <h3 className="text-sm font-medium text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {product.category}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-3.5 w-3.5 text-yellow-400" />
                          <span className="text-white text-xs">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          Min: {product.minOrder}
                        </span>
                      </div>
                      <button className="w-full bg-gray-700/30 text-white py-1.5 rounded text-xs hover:bg-gray-700/50">
                        Get Quote
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {supplierProfile.about}
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplierProfile.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-2">Address</h3>
                    <p className="text-gray-400 text-sm">
                      {supplierProfile.address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
                {/* Add reviews content */}
                <p className="text-gray-400 text-sm">Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
    