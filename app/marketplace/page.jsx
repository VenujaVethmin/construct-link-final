"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    title: "Construction Materials",
    description: "Direct from top manufacturers",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920",
  },
  {
    id: 2,
    title: "Heavy Machinery",
    description: "Professional equipment solutions",
    image:
      "https://images.unsplash.com/photo-1573611030146-ff6916c398fa?q=80&w=1920",
  },
  {
    id: 3,
    title: "Safety Equipment",
    description: "Complete protection gear",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1920",
  },
];

const categories = [
  {
    id: 1,
    name: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    count: 1250,
  },
  {
    id: 2,
    name: "Heavy Equipment",
    image:
      "https://images.unsplash.com/photo-1573611030146-ff6916c398fa?q=80&w=800",
    count: 450,
  },
  {
    id: 3,
    name: "Safety Gear",
    image:
      "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=800",
    count: 780,
  },
  {
    id: 4,
    name: "Tools",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800",
    count: 920,
  },
];

const topSuppliers = [
  {
    id: 1,
    name: "Global Construction Supply",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800",
    rating: 4.9,
    verifiedYears: 8,
    location: "New York, NY",
    specialties: ["Building Materials", "Tools"],
    featured: [
      {
        id: 101,
        name: "Premium Cement",
        image:
          "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=400",
      },
      {
        id: 102,
        name: "Steel Rebar",
        image:
          "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=400",
      },
    ],
  },
  {
    id: 2,
    name: "Safety Solutions Inc",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800",
    rating: 4.7,
    verifiedYears: 5,
    location: "Chicago, IL",
    specialties: ["Safety Equipment", "PPE"],
    featured: [
      {
        id: 201,
        name: "Safety Helmets",
        image:
          "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=400",
      },
      {
        id: 202,
        name: "Work Gloves",
        image:
          "https://images.unsplash.com/photo-1583624394526-131e0261977b?q=80&w=400",
      },
    ],
  },
  {
    id: 3,
    name: "Heavy Equipment Co",
    image:
      "https://images.unsplash.com/photo-1573611030146-ff6916c398fa?q=80&w=800",
    rating: 4.8,
    verifiedYears: 12,
    location: "Houston, TX",
    specialties: ["Machinery", "Equipment"],
    featured: [
      {
        id: 301,
        name: "Excavator",
        image:
          "https://images.unsplash.com/photo-1603136654730-6c513ef21c65?q=80&w=400",
      },
      {
        id: 302,
        name: "Bulldozer",
        image:
          "https://images.unsplash.com/photo-1572831215351-4c070cb444e1?q=80&w=400",
      },
    ],
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Premium Cement",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    supplier: "Global Construction Supply",
    rating: 4.8,
    reviewCount: 156,
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Safety Helmet Pro",
    category: "Safety Equipment",
    image:
      "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=800",
    supplier: "Safety Solutions Inc",
    rating: 4.9,
    reviewCount: 89,
    location: "Chicago, IL",
  },
  {
    id: 3,
    name: "Heavy Excavator",
    category: "Machinery",
    image:
      "https://images.unsplash.com/photo-1603136654730-6c513ef21c65?q=80&w=800",
    supplier: "Heavy Equipment Co",
    rating: 4.7,
    reviewCount: 234,
    location: "Houston, TX",
  },
  {
    id: 4,
    name: "Steel Rebar Bundle",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=800",
    supplier: "Global Construction Supply",
    rating: 4.6,
    reviewCount: 67,
    location: "New York, NY",
  },
];

const Marketplace = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollCarousel = (direction) => {
    if (direction === "left") {
      setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    } else {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search products, suppliers, or materials..."
            className="w-full px-4 py-3 pl-12 pr-4 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Banner Carousel */}
        <div className="relative rounded-xl overflow-hidden mb-12 group">
          <div className="relative h-[400px]">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-xl">{banner.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentBanner === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-300">
                        {category.count}+ products
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Suppliers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Top Suppliers</h2>
            <button className="text-orange-500 hover:text-orange-400 text-sm">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSuppliers.map((supplier) => (
              <motion.div
                key={supplier.id}
                whileHover={{ y: -5 }}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
              >
                <Link href={`/marketplace/suppliers`}>
                  <div className="relative aspect-video">
                    <Image
                      src={supplier.image}
                      alt={supplier.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      {supplier.verifiedYears} Years Verified
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {supplier.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{supplier.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="text-white">{supplier.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <BuildingOffice2Icon className="h-4 w-4" />
                      <span>{supplier.specialties.join(", ")}</span>
                    </div>

                    {/* Featured Products */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {supplier.featured.map((product) => (
                        <div
                          key={product.id}
                          className="bg-gray-700/30 rounded-lg p-2 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="relative aspect-square rounded-md overflow-hidden mb-2">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-300 truncate">
                            {product.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm">
                        View Products
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white">
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white">
                        <EnvelopeIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <button className="text-orange-500 hover:text-orange-400 text-sm">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
              >
                <Link href={`/marketplace/products`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-gray-400">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-white mt-1 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-white">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{product.supplier}</span>
                      <span className="text-gray-400">{product.location}</span>
                    </div>
                    <button className="w-full mt-4 bg-gray-700/30 text-white py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                      Contact Supplier
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;
