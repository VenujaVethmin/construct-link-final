"use client";

import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
  QueueListIcon,
  FunnelIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    id: 2,
    title: "Save Up to 25% on Bulk Orders",
    description: "Special discounts on bulk purchases this month only",
    image:
      "https://images.unsplash.com/photo-1565895405127-481853366cf8?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Sustainable Building Materials",
    description: "Eco-friendly options for the conscious builder",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2072&auto=format&fit=crop",
  },
];

const categories = [
  {
    id: 1,
    name: "Building Materials",
    count: 1240,
    image:
      "https://images.unsplash.com/photo-1618038483079-e5f12e0838ef?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Electrical Supplies",
    count: 857,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Plumbing & HVAC",
    count: 642,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Tools & Equipment",
    count: 1089,
    image:
      "https://images.unsplash.com/photo-1581147036324-c47a03a81d48?q=80&w=1974&auto=format&fit=crop",
  },
];

const topSuppliers = [
  {
    id: 1,
    name: "GreenBuild Materials",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    location: "Toronto, Canada",
    rating: 4.9,
    verifiedYears: 8,
    specialties: ["Sustainable Materials", "Insulation"],
    featured: [
      {
        id: 1,
        name: "Eco-Insulation Panels",
        image:
          "https://images.unsplash.com/photo-1638865257163-89910a04a010?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Recycled Composite Lumber",
        image:
          "https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=2429&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 2,
    name: "Industrial Hardware Co.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    location: "Chicago, IL",
    rating: 4.8,
    verifiedYears: 12,
    specialties: ["Fasteners", "Structural Steel"],
    featured: [
      {
        id: 3,
        name: "Premium Steel Fasteners",
        image:
          "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 4,
        name: "Construction-grade Bolts",
        image:
          "https://images.unsplash.com/photo-1626847037657-fd3626206892?q=80&w=1974&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 3,
    name: "Modern Electrical Supply",
    image:
      "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop",
    location: "San Francisco, CA",
    rating: 4.7,
    verifiedYears: 6,
    specialties: ["Smart Systems", "Wiring"],
    featured: [
      {
        id: 5,
        name: "Smart Home Control Systems",
        image:
          "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Commercial-grade Wiring",
        image:
          "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?q=80&w=1936&auto=format&fit=crop",
      },
    ],
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Premium Steel Rebar Bundle",
    category: "Structural Materials",
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 142,
    supplier: "MetalWorks Inc.",
    location: "Detroit, MI",
    price: "$1,200.00",
    pricePerUnit: "$4.00/unit",
    availability: "In Stock",
    featured: true,
  },
  {
    id: 2,
    name: "High-Efficiency HVAC System",
    category: "Mechanical Equipment",
    image:
      "https://images.unsplash.com/photo-1531973486364-5fa64260d75b?q=80&w=2069&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 97,
    supplier: "Cool Systems Co.",
    location: "Dallas, TX",
    price: "$4,500.00",
    pricePerUnit: "$4,500.00/unit",
    availability: "Ships in 2 weeks",
    featured: true,
  },
  {
    id: 3,
    name: "Smart Home Integration Kit",
    category: "Electrical",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1974&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 78,
    supplier: "Modern Electrical Supply",
    location: "San Francisco, CA",
    price: "$650.00",
    pricePerUnit: "$650.00/kit",
    availability: "In Stock",
    featured: true,
  },
  {
    id: 4,
    name: "Eco-Friendly Insulation Panels",
    category: "Insulation",
    image:
      "https://images.unsplash.com/photo-1501952515248-2235f7f0ae78?q=80&w=1933&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 65,
    supplier: "GreenBuild Materials",
    location: "Toronto, Canada",
    price: "$180.00",
    pricePerUnit: "$18.00/sq ft",
    availability: "In Stock",
    featured: true,
  },
];

const trendingProducts = [
  {
    id: 5,
    name: "Solar Panel Roofing System",
    category: "Renewable Energy",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 87,
    supplier: "SunTech Solutions",
    location: "Phoenix, AZ",
    price: "$5,200.00",
    pricePerUnit: "$260.00/panel",
    availability: "Ships in 3 days",
    featured: true,
  },
  {
    id: 6,
    name: "Load-Bearing Concrete Mix",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1607251032678-8de17ce826b1?q=80&w=1974&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 124,
    supplier: "Industrial Concrete Corp.",
    location: "Denver, CO",
    price: "$240.00",
    pricePerUnit: "$12.00/bag",
    availability: "In Stock",
    featured: false,
  },
  {
    id: 7,
    name: "Premium Quartz Countertop",
    category: "Finishing Materials",
    image:
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 102,
    supplier: "Elite Surfaces",
    location: "New York, NY",
    price: "$1,800.00",
    pricePerUnit: "$90.00/sq ft",
    availability: "Made to Order",
    featured: false,
  },
  {
    id: 8,
    name: "Heavy-Duty Power Generator",
    category: "Power Equipment",
    image:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 56,
    supplier: "PowerMax Generators",
    location: "Houston, TX",
    price: "$2,400.00",
    pricePerUnit: "$2,400.00/unit",
    availability: "Ships in 1 week",
    featured: false,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAddModal, setIsAddModal] = useState(false);
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

  const handleAddProduct = () => {
    // Handle form submission
    console.log("Product added:", addForm);
    setIsAddModal(false);
    // Reset form
    setAddForm({
      name: "",
      category: categoryOptions[0],
      image: "",
      price: "",
      unit: unitTypes[0],
      stock: "",
      minStock: "",
      specifications: [],
    });
    setImagePreview(null);
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
                <button
                  onClick={() => setIsAddModal(true)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Product
                </button>
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
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Browse Categories
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Explore our comprehensive selection of high-quality construction
                materials across all categories
              </p>
            </div>
            <Link
              href="/marketplace/categories"
              className="text-orange-400 hover:text-orange-300 flex items-center mt-4 md:mt-0 text-sm font-medium"
            >
              View all categories
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={`category-${category.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-72">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                      <h3 className="text-2xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {category.count}+ products
                      </p>
                      <Link
                        href={`/marketplace/categories/${category.id}`}
                        className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
                      >
                        Browse Category
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Suppliers Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
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
            {topSuppliers.map((supplier, index) => (
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
                      src={supplier.image}
                      alt={supplier.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {supplier.verifiedYears} Years Verified
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-300 text-sm">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{supplier.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-medium">
                          {supplier.rating}
                        </span>
                        <span className="text-gray-400 text-sm">rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <BuildingOffice2Icon className="h-4 w-4" />
                        <span>Specializes in</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {supplier.specialties.map((specialty, i) => (
                        <span
                          key={`specialty-${supplier.id}-${i}`}
                          className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-gray-700/30 pt-4 mb-4">
                      <h4 className="text-white text-sm font-medium mb-3">
                        Featured Products
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {supplier.featured.map((product) => (
                          <div
                            key={`featured-${product.id}`}
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
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                        View Products
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                        <EnvelopeIcon className="h-5 w-5" />
                      </button>
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
              <div className="flex flex-wrap gap-2">
                {["All", "Building", "Electrical", "Plumbing", "Tools"].map(
                  (category) => (
                    <button
                      key={`filter-${category}`}
                      onClick={() => setActiveProductCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeProductCategory === category
                          ? "bg-orange-500 text-white"
                          : "bg-gray-700/30 text-gray-300 hover:bg-gray-700/60"
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
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
            {featuredProducts.map((product, index) => (
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
                      src={product.image}
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
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        <span className="text-white text-sm">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-gray-400 text-sm">
                        {product.reviewCount} reviews
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{product.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">
                          {product.price}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {product.pricePerUnit}
                        </span>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          product.availability === "In Stock"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {product.availability}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                        View Details
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                        <CurrencyDollarIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Trending Materials
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Discover the most popular construction materials contractors are
                using right now
              </p>
            </div>
            <Link
              href="/marketplace/trending"
              className="text-orange-400 hover:text-orange-300 flex items-center mt-4 md:mt-0 text-sm font-medium"
            >
              View all trending
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={`trending-${product.id}`}
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
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Hot Item
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-orange-400">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        <span className="text-white text-sm">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-gray-400 text-sm">
                        {product.reviewCount} reviews
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{product.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">
                          {product.price}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {product.pricePerUnit}
                        </span>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          product.availability === "In Stock"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {product.availability}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                        View Details
                      </button>
                      <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                        <CurrencyDollarIcon className="h-5 w-5" />
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

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl w-full max-w-md p-6 my-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  Add New Product
                </h3>
                <button
                  onClick={() => setIsAddModal(false)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm({ ...addForm, name: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={addForm.category}
                    onChange={(e) =>
                      setAddForm({ ...addForm, category: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1rem",
                    }}
                    required
                  >
                    {categoryOptions.map((category) => (
                      <option
                        key={`category-option-${category}`}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Product Image
                  </label>

                  <div className="mt-1 flex items-center space-x-4">
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="flex flex-col items-center justify-center w-32 h-32 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg hover:bg-gray-700/80 cursor-pointer transition-colors"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview}
                            alt="Product preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <>
                          <PhotoIcon className="h-10 w-10 text-gray-400" />
                          <span className="mt-2 text-xs text-gray-400">
                            Click to upload
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={addForm.image}
                        onChange={(e) =>
                          setAddForm({ ...addForm, image: e.target.value })
                        }
                        placeholder="Or enter image URL"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Upload an image or provide an URL
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={addForm.price}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          price: Math.max(0, Number(e.target.value)),
                        })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Unit Type *
                    </label>
                    <select
                      value={addForm.unit}
                      onChange={(e) =>
                        setAddForm({ ...addForm, unit: e.target.value })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1rem",
                      }}
                      required
                    >
                      {unitTypes.map((unit) => (
                        <option key={`unit-${unit}`} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Initial Stock *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={addForm.stock}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          stock: Math.max(0, Number(e.target.value)),
                        })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Minimum Stock Level *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={addForm.minStock}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          minStock: Math.max(0, Number(e.target.value)),
                        })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Specifications
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      id="spec-input"
                      type="text"
                      placeholder="Add specification and press Enter"
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSpecInput(e.target.value);
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        handleSpecInput(
                          document.getElementById("spec-input").value
                        )
                      }
                      className="px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {addForm.specifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {addForm.specifications.map((spec, index) => (
                        <span
                          key={`spec-${index}`}
                          className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-700 text-gray-300"
                        >
                          {spec}
                          <button
                            onClick={() => removeSpec(index)}
                            className="ml-1 text-gray-400 hover:text-gray-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setIsAddModal(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    disabled={
                      !addForm.name ||
                      !addForm.price ||
                      !addForm.stock ||
                      !addForm.minStock
                    }
                    className={`px-4 py-2 rounded-lg ${
                      !addForm.name ||
                      !addForm.price ||
                      !addForm.stock ||
                      !addForm.minStock
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                    }`}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
