"use client";

import { useState } from "react";
import {
  StarIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CheckBadgeIcon,
  TruckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const product = {
  id: 1,
  name: "Premium Portland Cement",
  category: "Building Materials",
  images: [
    "https://images.unsplash.com/photo-1638681823665-cc5fe9bad783?q=80&w=800",
    "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=800",
  ],
  supplier: {
    id: 1,
    name: "Global Construction Supply",
    location: "New York, NY",
    verified: true,
    rating: 4.8,
    responseTime: "< 12 hours",
  },
  rating: 4.8,
  reviewCount: 156,
  description:
    "High-quality Portland cement suitable for all construction needs. Meets ASTM C150 standards.",
  specifications: [
    { label: "Type", value: "Type I/II" },
    { label: "Grade", value: "42.5" },
    { label: "Package", value: "50 KG Bag" },
    { label: "Standard", value: "ASTM C150" },
  ],
  features: [
    "High strength development",
    "Excellent workability",
    "Consistent quality",
    "Superior fineness",
  ],
  packaging: {
    minOrder: "100 Bags",
    delivery: "14-21 days",
    payment: "L/C, T/T",
  },
};

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-orange-500" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-orange-500">{product.category}</p>
              <h1 className="text-2xl font-bold text-white mt-1">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-medium">
                    {product.rating}
                  </span>
                  <span className="text-gray-400">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">
                  Min Order: {product.packaging.minOrder}
                </span>
              </div>
            </div>

            {/* Supplier Card */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BuildingOffice2Icon className="h-5 w-5 text-gray-400" />
                  <h3 className="text-white font-medium">
                    {product.supplier.name}
                  </h3>
                  {product.supplier.verified && (
                    <CheckBadgeIcon className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{product.supplier.location}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                  Request Quote
                </button>
                <button className="flex-1 bg-gray-700/30 text-white py-2 rounded-lg hover:bg-gray-700/50">
                  Contact Supplier
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3"
                >
                  <p className="text-gray-400 text-sm">{spec.label}</p>
                  <p className="text-white text-sm font-medium mt-1">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TruckIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Delivery</p>
                    <p className="text-sm text-white">
                      {product.packaging.delivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Response Time</p>
                    <p className="text-sm text-white">
                      {product.supplier.responseTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-300 text-sm"
                >
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-4">Description</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
