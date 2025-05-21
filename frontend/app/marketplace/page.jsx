"use client";

import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  QueueListIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";







const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);


// Sample data
const banners = [
  {
    id: 1,
    title: "Premium Construction Materials",
    description: "Top-quality supplies direct from verified manufacturers",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1970&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "Sustainable Building Materials",
    description: "Eco-friendly options for the conscious builder",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2072&auto=format&fit=crop",
  },
];




const categoryOptions = [
  "Building Materials",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Tools & Equipment",
  "Finishing Materials",
  "Safety Equipment",
  "Structural Materials",
  "Renewable Energy",
  "Mechanical Equipment",
];

const unitTypes = [
  "Each",
  "Box",
  "Pack",
  "Pallet",
  "Sq ft",
  "Linear ft",
  "Cubic yard",
  "Ton",
  "Gallon",
  "Pound",
];

const Marketplace = () => {

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR("/marketplace/marketplace", fetcher);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [activeProductCategory, setActiveProductCategory] = useState("All");

  const [addForm, setAddForm] = useState({
    name: "",
    category: categoryOptions[0],
    image: "",
    price: "",
    unit: unitTypes[0],
    stock: "",
    minStock: "",
    specifications: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollCarousel = (direction) => {
    if (direction === "left") {
      setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    } else {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSpecInput = (value) => {
    if (value.trim() && !addForm.specifications.includes(value.trim())) {
      setAddForm({
        ...addForm,
        specifications: [...addForm.specifications, value.trim()],
      });
      if (document.getElementById("spec-input")) {
        document.getElementById("spec-input").value = "";
      }
    }
  };

  const removeSpec = (index) => {
    setAddForm({
      ...addForm,
      specifications: addForm.specifications.filter((_, i) => i !== index),
    });
  };




  return (
    <div className="min-h-screen bg-gray-900">
      {/* Premium Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background image/gradient */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1970&auto=format&fit=crop"
            alt="Construction materials background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:max-w-xl pt-20 md:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-orange-500/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4"
              >
                <span className="text-orange-300 text-sm font-medium">
                  Premium Construction Marketplace
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Quality Materials for <br />
                <span className="text-orange-500">Successful Projects</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8"
              >
                Connect with industry-leading suppliers and access premium
                construction materials to ensure your projects succeed from the
                ground up.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for products, materials or suppliers..."
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <Link
                  href={`/marketplace/products?search=${searchTerm}`}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  Search
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 mt-8"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="text-white font-medium">100%</span>{" "}
                    verified suppliers
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <HandThumbUpIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="text-white font-medium">10,000+</span>{" "}
                    quality products
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Credentials Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-y border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">
                  Verified Suppliers
                </h4>
                <p className="text-gray-400 text-xs">
                  100% verified manufacturers & distributors
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <QueueListIcon className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">
                  Premium Selection
                </h4>
                <p className="text-gray-400 text-xs">
                  Curated high-quality materials
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TruckIcon className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">
                  Fast Logistics
                </h4>
                <p className="text-gray-400 text-xs">
                  Express shipping & dedicated delivery
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TagIcon className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">
                  Competitive Pricing
                </h4>
                <p className="text-gray-400 text-xs">
                  Bulk discounts and wholesale rates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Carousel */}
        <div className="relative rounded-xl overflow-hidden mb-16 group">
          <div className="relative h-[450px]">
            {banners.map((banner, index) => (
              <motion.div
                key={`banner-${banner.id}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentBanner === index ? 1 : 0,
                  x: `${(index - currentBanner) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-10 text-white max-w-xl">
                    <h2 className="text-4xl font-bold mb-3">{banner.title}</h2>
                    <p className="text-xl mb-6">{banner.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                    >
                      Browse Products
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={`banner-dot-${index}`}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentBanner === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories Section */}
      

        {/* Top Suppliers Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Top Verified Suppliers
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Connect with our network of trusted suppliers offering quality
                construction materials
              </p>
            </div>
            <Link
              href="/marketplace/suppliers"
              className="text-orange-400 hover:text-orange-300 flex items-center mt-4 md:mt-0 text-sm font-medium"
            >
              View all suppliers
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.suppliers.map((supplier, index) => (
              <motion.div
                key={`supplier-${supplier.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
              >
                <Link href={`/marketplace/suppliers/${supplier.id}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={supplier.image || "/nosupplier.webp"}
                      alt={supplier.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    {supplier.products && supplier.products.length > 0 && (
                      <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircleIcon className="h-3.5 w-3.5" />
                        <span>{supplier.products.length} Products</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-300 text-sm">
                        <MapPinIcon className="h-4 w-4" />
                        <span>
                          {supplier.stores && supplier.stores[0]?.city
                            ? `${supplier.stores[0].city}, ${
                                supplier.stores[0].state || ""
                              }`
                            : "Location not available"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 space-y-2">
                      {supplier.stores && supplier.stores[0] && (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <BuildingOffice2Icon className="h-4 w-4 text-orange-400" />
                              <span className="text-gray-300 font-medium">
                                {supplier.stores[0].name || "Store"}
                                <span className="ml-1 text-xs text-gray-500">
                                  • {supplier.stores[0].type || "Supplier"}
                                </span>
                              </span>
                            </div>

                            {supplier.stores[0].phone && (
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <PhoneIcon className="h-3.5 w-3.5" />
                                <span>{supplier.stores[0].phone}</span>
                              </div>
                            )}
                          </div>

                          {supplier.stores[0].description && (
                            <p className="text-xs text-gray-400 line-clamp-2">
                              {supplier.stores[0].description}
                            </p>
                          )}

                          {supplier.stores[0].serviceAreas &&
                            supplier.stores[0].serviceAreas.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {supplier.stores[0].serviceAreas.map(
                                  (area, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full"
                                    >
                                      {area}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                        </>
                      )}
                    </div>

                    <div className="border-t border-gray-700/30 pt-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-white text-sm font-medium">
                          Featured Products
                        </h4>
                        {supplier.products && supplier.products.length > 2 && (
                          <span className="text-xs text-orange-400">
                            +{supplier.products.length - 2} more
                          </span>
                        )}
                      </div>

                      {supplier.products && supplier.products.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {supplier.products.slice(0, 2).map((product) => (
                            <div
                              key={`featured-${product.id}`}
                              className="bg-gray-700/30 rounded-lg p-2 hover:bg-gray-700/50 transition-colors group"
                            >
                              <div className="relative aspect-square rounded-md overflow-hidden mb-2">
                                <Image
                                  src={
                                    product.images && product.images.length > 0
                                      ? product.images[0]
                                      : "/noimage.webp"
                                  }
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {product.category && (
                                  <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md">
                                    {product.category}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-xs text-gray-300 font-medium line-clamp-1">
                                  {product.name}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-[10px] text-orange-400 font-semibold">
                                    Rs. {product.price?.toLocaleString()}
                                    <span className="text-gray-500">
                                      /{product.unit || "each"}
                                    </span>
                                  </p>
                                  <p className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                                    {product.stock > 0
                                      ? "In Stock"
                                      : "Out of Stock"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center bg-gray-800/40 rounded-lg p-4 text-gray-400 text-sm">
                          <ShoppingCartIcon className="h-4 w-4 mr-2 opacity-70" />
                          No products available
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="col-span-2 flex justify-center items-center bg-orange-500 text-white py-2 px-3 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                        View Store
                      </button>
                      {/* {supplier.stores && supplier.stores[0]?.phone ? (
                        <a
                          href={`tel:${supplier.stores[0].phone}`}
                          className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors flex justify-center items-center"
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </a>
                      ) : (
                        <div className="p-2 rounded-lg bg-gray-700/30 text-gray-600 flex justify-center items-center">
                          <PhoneIcon className="h-5 w-5" />
                        </div>
                      )} */}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Featured Products
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Explore our premium selection of high-quality construction
                materials
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link
                href="/marketplace/products"
                className="text-orange-400 hover:text-orange-300 flex items-center text-sm font-medium"
              >
                View all
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.products.map((product, index) => (
              <motion.div
                key={`product-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden flex flex-col"
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
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-orange-400">
                        {product.category || "Uncategorized"}
                      </span>
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        <span className="text-white text-sm">
                          {product.rating || "New"}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-gray-400 text-sm">
                        {product.reviewCount || 0} reviews
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{product.location || "Online"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">
                          Rs. {product.price?.toLocaleString() || 0}
                        </span>
                        <span className="text-gray-400 text-xs">
                          /{product.unit || "each"}
                        </span>
                      </div>
                      <div>
                        {product.stock > 0 ? (
                          <span className="text-sm px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                            {product.stock > product.minStock
                              ? "In Stock"
                              : "Low Stock"}
                          </span>
                        ) : (
                          <span className="text-sm px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                        View Details
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                        <ShoppingCartIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -ml-32 -mb-32"></div>

          <div className="relative py-12 px-6 md:py-16 md:px-12 text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Need custom material solutions?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300 text-lg mb-8"
            >
              Connect with our supplier network for customized construction
              materials and wholesale pricing options.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="/marketplace/suppliers"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg"
              >
                Find Suppliers
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 text-white font-medium rounded-lg"
              >
                Request Custom Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
