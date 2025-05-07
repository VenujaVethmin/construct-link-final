"use client";

import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOffice2Icon,
  PhotoIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
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
  {
    id: 5,
    name: "Flooring",
    image:
      "https://images.unsplash.com/photo-1615529161791-5d95e779b52f?q=80&w=800",
    count: 560,
  },
  {
    id: 6,
    name: "Electrical",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
    count: 650,
  },
  {
    id: 7,
    name: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1581094487416-8bbe7467cb9c?q=80&w=800",
    count: 420,
  },
  {
    id: 8,
    name: "Windows & Doors",
    image:
      "https://images.unsplash.com/photo-1598511726583-fad5109d2175?q=80&w=800",
    count: 310,
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

const categoryOptions = [
  "Building Materials",
  "Heavy Equipment",
  "Safety Gear",
  "Tools",
  "Flooring",
  "Electrical",
  "Plumbing",
  "Windows & Doors",
  "Paint & Finish",
  "Hardware",
  "Fixtures",
  "Roofing",
  "Insulation",
  "Landscaping",
  "Other",
];

// Unit types for dropdown
const unitTypes = [
  "bag",
  "piece",
  "ton",
  "kg",
  "sq.ft",
  "sq.m",
  "meter",
  "liter",
  "gallon",
  "roll",
  "sheet",
  "panel",
  "unit",
];

const Marketplace = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const [addForm, setAddForm] = useState({
    name: "",
    category: "Building Materials",
    price: "",
    unit: "bag",
    stock: "",
    minStock: "",
    specifications: [],
    image: "",
    status: "active",
  });

  const scrollCarousel = (direction) => {
    if (direction === "left") {
      setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    } else {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // For demo purposes, we'll use the preview as the image URL
        setAddForm({
          ...addForm,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new product
  const handleAddProduct = () => {
    alert("Product added successfully!");
    setIsAddModal(false);

    // Reset form
    setAddForm({
      name: "",
      category: "Building Materials",
      price: "",
      unit: "bag",
      stock: "",
      minStock: "",
      specifications: [],
      image: "",
      status: "active",
    });
    setSelectedImage(null);
    setImagePreview("");
  };

  // Handle specification input
  const handleSpecInput = (value) => {
    if (!value.trim()) return;

    setAddForm({
      ...addForm,
      specifications: [...addForm.specifications, value.trim()],
    });

    // Clear the input field
    document.getElementById("spec-input").value = "";
  };

  // Remove specification
  const removeSpec = (index) => {
    const updatedSpecs = [...addForm.specifications];
    updatedSpecs.splice(index, 1);
    setAddForm({
      ...addForm,
      specifications: updatedSpecs,
    });
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
        {/* Search Bar and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search products, suppliers, or materials..."
              className="w-full px-4 py-3 pl-12 pr-4 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <button
            onClick={() => setIsAddModal(true)}
            className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Product
          </button>
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

        {/* Add Product Modal */}
        <AnimatePresence>
          {isAddModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-md p-6 my-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Add New Product
                  </h3>
                  <button
                    onClick={() => setIsAddModal(false)}
                    className="p-1 hover:bg-gray-700 rounded-full"
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
                        <option key={category} value={category}>
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
                          <option key={unit} value={unit}>
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
                        className="px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg"
                      >
                        Add
                      </button>
                    </div>

                    {addForm.specifications.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {addForm.specifications.map((spec, index) => (
                          <span
                            key={index}
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
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
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
                          : "bg-orange-500 text-white hover:bg-orange-600"
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
      </main>
    </div>
  );
};

export default Marketplace;
