"use client";

import axiosInstance from "@/lib/axiosInstance";
import {
  BuildingOffice2Icon,
  CalendarIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const SupplierProfile = () => {
  const [activeTab, setActiveTab] = useState("products");
  const params = useParams();
  const supplierId = params.id;
  const {
    data: supplierData,
    error,
    isLoading,
  } = useSWR(`/supplier/getSupplierById/${supplierId}`, fetcher);

  // Extract store information for easy access
  const store = supplierData?.stores?.[0] || {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Error Loading Supplier
          </h2>
          <p className="text-gray-400">Could not load supplier information.</p>
        </div>
      </div>
    );
  }

  if (!supplierData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Supplier Not Found
          </h2>
          <p className="text-gray-400">
            The supplier you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Calculate business metrics from product data
  const totalProducts = supplierData.products?.length || 0;
  const inStockProducts =
    supplierData.products?.filter((p) => p.stock > 0)?.length || 0;
  const hasMinOrderProducts =
    supplierData.products?.some((p) => p.minOrder) || false;
  const establishedDate = new Date(store.createdAt);
  const establishedYear = establishedDate.getFullYear();
  const monthsInBusiness = Math.floor(
    (new Date() - establishedDate) / (1000 * 60 * 60 * 24 * 30)
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="h-48 sm:h-64">
            <Image
              src={supplierData.image || "/noimage.webp"}
              alt={supplierData.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>

          <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {store.name || supplierData.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-5 w-5" />
                  <span className="text-gray-300">
                    {store.city && store.state
                      ? `${store.city}, ${store.state}`
                      : "Location not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TagIcon className="h-5 w-5" />
                  <span className="text-gray-300">
                    {store.type || "Supplier"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm font-medium">
                Contact Now
              </button>
              {store.phone && (
                <a
                  href={`tel:${store.phone}`}
                  className="bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-gray-700"
                >
                  <PhoneIcon className="h-5 w-5" />
                </a>
              )}
              {supplierData.email && (
                <a
                  href={`mailto:${supplierData.email}`}
                  className="bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-gray-700"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                </a>
              )}
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
              Established {establishedYear || "Recently"}
            </p>
            <p className="text-gray-400 text-sm">
              {monthsInBusiness > 0
                ? `${monthsInBusiness} months in business`
                : "New supplier"}
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Product Inventory</span>
            </div>
            <p className="text-white text-sm">
              {totalProducts} Products Available
            </p>
            <p className="text-gray-400 text-sm">
              {inStockProducts} Currently in stock
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TruckIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Delivery</span>
            </div>
            <p className="text-white text-sm">
              {hasMinOrderProducts
                ? "Bulk orders available"
                : "No minimum orders"}
            </p>
            <p className="text-gray-400 text-sm">
              {supplierData.products.some((p) => p.estimatedDelivery)
                ? "Estimated delivery times available"
                : "Contact for delivery details"}
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MapPinIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Service Areas</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {store.serviceAreas && store.serviceAreas.length > 0 ? (
                store.serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full"
                  >
                    {area}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-xs">
                  No service areas specified
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="space-y-4">
          <div className="border-b border-gray-700">
            <div className="flex gap-6">
              {["products", "about", "contact"].map((tab) => (
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
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-white">
                    Products ({totalProducts})
                  </h2>
                  <div className="flex gap-2">
                    <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-lg">
                      Sort by: Newest
                    </span>
                  </div>
                </div>

                {(supplierData.products || []).length === 0 ? (
                  <div className="flex flex-col items-center justify-center bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
                    <ShoppingCartIcon className="h-12 w-12 text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium text-white">
                      No products available yet
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      This supplier has not listed any products.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {supplierData.products.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -5 }}
                        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
                      >
                        <Link href={`/marketplace/products/${product.id}`}>
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
                            {product.minOrder && (
                              <div className="absolute bottom-2 left-2">
                                <span className="bg-gray-900/80 backdrop-blur-sm text-gray-300 text-xs px-2 py-1 rounded-full">
                                  Min: {product.minOrder}
                                  {product.unit && ` ${product.unit}`}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-white font-medium line-clamp-1">
                              {product.name}
                            </h3>

                            <div className="mt-1 flex items-center justify-between">
                              <div className="text-orange-400 font-medium">
                                Rs. {product.price?.toLocaleString() || "Quote"}
                                <span className="text-gray-400 text-xs ml-1">
                                  /{product.unit || "each"}
                                </span>
                              </div>
                              <div>
                                {product.stock > (product.minStock || 0) ? (
                                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                    In Stock
                                  </span>
                                ) : product.stock > 0 ? (
                                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                                    Low Stock
                                  </span>
                                ) : (
                                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                                    Out of Stock
                                  </span>
                                )}
                              </div>
                            </div>

                            {product.estimatedDelivery && (
                              <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                <span>{product.estimatedDelivery}</span>
                              </div>
                            )}

                            {product.features &&
                              product.features.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {product.features
                                    .slice(0, 2)
                                    .map((feature, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs px-2 py-0.5 bg-gray-700/50 text-gray-300 rounded-full"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  {product.features.length > 2 && (
                                    <span className="text-xs px-2 py-0.5 bg-gray-700/50 text-gray-300 rounded-full">
                                      +{product.features.length - 2} more
                                    </span>
                                  )}
                                </div>
                              )}

                            <button className="w-full mt-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-colors">
                              View Details
                            </button>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "about" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  About {store.name || supplierData.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {store.description || "No company description provided."}
                </p>

                <div className="mt-6 space-y-5">
                  {/* Business Type Information */}
                  <div>
                    <h3 className="text-white font-medium mb-2">
                      Business Type
                    </h3>
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          <TagIcon className="h-5 w-5 text-orange-400 flex-shrink-0" />
                          <div>
                            <p className="text-white text-sm font-medium">
                              Business Category
                            </p>
                            <p className="text-gray-400 text-sm">
                              {store.type || "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <CalendarIcon className="h-5 w-5 text-orange-400 flex-shrink-0" />
                          <div>
                            <p className="text-white text-sm font-medium">
                              Established
                            </p>
                            <p className="text-gray-400 text-sm">
                              {new Date(store.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products & Services */}
                  <div>
                    <h3 className="text-white font-medium mb-2">
                      Products & Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        new Set(
                          supplierData.products
                            .map((p) => p.category)
                            .filter(Boolean)
                        )
                      ).map((category, index) => (
                        <span
                          key={index}
                          className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                      {supplierData.products.length === 0 && (
                        <p className="text-gray-400 text-sm">
                          No products listed yet
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Certifications Section */}
                  {supplierData.products.some(
                    (p) => p.certifications && p.certifications.length > 0
                  ) && (
                    <div>
                      <h3 className="text-white font-medium mb-2">
                        Product Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(
                          new Set(
                            supplierData.products
                              .flatMap((p) => p.certifications || [])
                              .filter(Boolean)
                          )
                        ).map((cert, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                          >
                            <ShieldCheckIcon className="h-3.5 w-3.5" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4 text-sm">
                      {(store.address || store.city) && (
                        <div className="flex items-start gap-3 text-gray-300">
                          <MapPinIcon className="h-6 w-6 text-orange-400 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-white mb-1">
                              Address
                            </p>
                            <p>{store.address}</p>
                            <p>
                              {store.city}
                              {store.state ? `, ${store.state}` : ""}
                              {store.postalCode ? ` ${store.postalCode}` : ""}
                            </p>
                          </div>
                        </div>
                      )}
                      {store.phone && (
                        <div className="flex items-start gap-3 text-gray-300">
                          <PhoneIcon className="h-6 w-6 text-orange-400 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-white mb-1">Phone</p>
                            <a
                              href={`tel:${store.phone}`}
                              className="hover:text-orange-400"
                            >
                              {store.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      {supplierData.email && (
                        <div className="flex items-start gap-3 text-gray-300">
                          <EnvelopeIcon className="h-6 w-6 text-orange-400 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-white mb-1">Email</p>
                            <a
                              href={`mailto:${supplierData.email}`}
                              className="hover:text-orange-400 break-all"
                            >
                              {supplierData.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {store.serviceAreas && store.serviceAreas.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-white font-medium mb-2">
                          Service Areas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {store.serviceAreas.map((area, index) => (
                            <span
                              key={index}
                              className="flex items-center gap-1 bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                            >
                              <MapPinIcon className="h-3.5 w-3.5" />
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">
                      Send a Message
                    </h4>
                    <form className="space-y-3">
                      <div>
                        <label
                          className="block text-gray-400 text-sm mb-1"
                          htmlFor="name"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-400 text-sm mb-1"
                          htmlFor="email"
                        >
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-400 text-sm mb-1"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                          placeholder="What would you like to know about this supplier?"
                        />
                      </div>
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
