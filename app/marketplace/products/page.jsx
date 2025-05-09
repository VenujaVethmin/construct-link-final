"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  ClockIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  XMarkIcon,
  TruckIcon,
  TagIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// Sample data - in a real app this would come from an API call based on search parameters
const productResults = [
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
    description:
      "High-quality steel rebar for reinforced concrete structures. ASTM A615 Grade 60.",
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
    description:
      "Energy-efficient HVAC system with smart controls. SEER rating 21.",
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
    description:
      "Complete smart home integration system with wireless connectivity for new constructions.",
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
    featured: false,
    description:
      "Eco-friendly insulation made from recycled materials with high R-value.",
  },
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
    description:
      "Integrated solar panel system for residential roofing with battery storage option.",
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
    description:
      "High-strength concrete mix for load-bearing applications, 5000 PSI.",
  },
];

const supplierResults = [
  {
    id: 1,
    name: "GreenBuild Materials",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    location: "Toronto, Canada",
    rating: 4.9,
    reviewCount: 156,
    verifiedYears: 8,
    specialties: ["Sustainable Materials", "Insulation", "Green Building"],
    description:
      "Leading supplier of eco-friendly building materials for sustainable construction projects.",
    productsCount: 214,
    fulfillmentRate: 98,
    responseTime: "Under 2 hours",
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
    reviewCount: 207,
    verifiedYears: 12,
    specialties: ["Fasteners", "Structural Steel", "Hardware"],
    description:
      "Premier supplier of industrial-grade fasteners and hardware for commercial construction.",
    productsCount: 762,
    fulfillmentRate: 97,
    responseTime: "Under 1 hour",
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
    reviewCount: 184,
    verifiedYears: 6,
    specialties: ["Smart Systems", "Wiring", "Electrical Components"],
    description:
      "Specialized in cutting-edge electrical systems and smart building technology.",
    productsCount: 329,
    fulfillmentRate: 95,
    responseTime: "Under 3 hours",
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
  {
    id: 4,
    name: "MetalWorks Inc.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    location: "Detroit, MI",
    rating: 4.9,
    reviewCount: 163,
    verifiedYears: 15,
    specialties: ["Structural Steel", "Metal Fabrication", "Rebar"],
    description:
      "Industry leader in steel fabrication and metal products for major construction projects.",
    productsCount: 428,
    fulfillmentRate: 99,
    responseTime: "Under 1 hour",
    featured: [
      {
        id: 7,
        name: "Premium Steel Rebar Bundle",
        image:
          "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 8,
        name: "Custom Metal Fabrication",
        image:
          "https://images.unsplash.com/photo-1520587963533-65f1795bde61?q=80&w=1972&auto=format&fit=crop",
      },
    ],
  },
];

const categories = [
  "All Categories",
  "Building Materials",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Tools & Equipment",
  "Finishing Materials",
  "Safety Equipment",
  "Structural Materials",
  "Renewable Energy",
];

const priceRanges = [
  "Any Price",
  "Under $100",
  "$100 - $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "Over $5,000",
];

const availabilityOptions = [
  "Any Availability",
  "In Stock",
  "Ships in 3 days",
  "Ships in 1 week",
  "Ships in 2 weeks",
  "Made to Order",
];

const specialtyOptions = [
  "All Specialties",
  "Sustainable Materials",
  "Smart Systems",
  "Metal Fabrication",
  "Green Building",
  "Electrical Components",
  "Structural Steel",
  "Insulation",
  "Wiring",
  "Hardware",
  "Fasteners",
];

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState(query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  const [filters, setFilters] = useState({
    category: "All Categories",
    priceRange: "Any Price",
    availability: "Any Availability",
    rating: 0,
    specialty: "All Specialties",
  });

  // Handle new search
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/marketplace/search?q=${encodeURIComponent(searchTerm)}`);
  };

  // Update search term when URL query changes
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  // Get filtered and sorted results
  const getFilteredProducts = () => {
    // In a real app, this would be replaced with a proper filtering logic
    // This is just a simplified example
    return productResults.filter(
      (product) =>
        (filters.category === "All Categories" ||
          product.category === filters.category) &&
        (filters.availability === "Any Availability" ||
          product.availability === filters.availability) &&
        (filters.rating === 0 || product.rating >= filters.rating)
    );
  };

  const getFilteredSuppliers = () => {
    // Simplified example filter
    return supplierResults.filter(
      (supplier) =>
        (filters.specialty === "All Specialties" ||
          supplier.specialties.includes(filters.specialty)) &&
        (filters.rating === 0 || supplier.rating >= filters.rating)
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products, materials or suppliers..."
                className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {query
              ? `Search results for "${query}"`
              : "All Marketplace Results"}
          </h1>
          <p className="text-gray-400">
            {activeTab === "products"
              ? `${getFilteredProducts().length} products found`
              : `${getFilteredSuppliers().length} suppliers found`}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-700/50">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                activeTab === "products"
                  ? "text-orange-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Products
              {activeTab === "products" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  layoutId="activeTabIndicator"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                activeTab === "suppliers"
                  ? "text-orange-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Suppliers
              {activeTab === "suppliers" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  layoutId="activeTabIndicator"
                />
              )}
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="flex gap-4">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 bg-gray-800/80 hover:bg-gray-700 rounded-lg text-gray-300 text-sm font-medium transition-colors border border-gray-700/50 cursor-pointer"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="rating">Sort by: Highest Rating</option>
                <option value="price_low">Sort by: Price (Low to High)</option>
                <option value="price_high">Sort by: Price (High to Low)</option>
                <option value="newest">Sort by: Newest First</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>View:</span>
              <button className="p-1.5 bg-orange-500 text-white rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button className="p-1.5 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1rem",
                      }}
                    >
                      {categories.map((cat) => (
                        <option key={`cat-${cat}`} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  {activeTab === "products" && (
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Price Range
                      </label>
                      <select
                        value={filters.priceRange}
                        onChange={(e) =>
                          handleFilterChange("priceRange", e.target.value)
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                        style={{
                          backgroundImage:
                            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                      >
                        {priceRanges.map((range) => (
                          <option key={`price-${range}`} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Availability Filter */}
                  {activeTab === "products" && (
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Availability
                      </label>
                      <select
                        value={filters.availability}
                        onChange={(e) =>
                          handleFilterChange("availability", e.target.value)
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                        style={{
                          backgroundImage:
                            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                      >
                        {availabilityOptions.map((option) => (
                          <option key={`avail-${option}`} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Specialty Filter */}
                  {activeTab === "suppliers" && (
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Specialty
                      </label>
                      <select
                        value={filters.specialty}
                        onChange={(e) =>
                          handleFilterChange("specialty", e.target.value)
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white appearance-none"
                        style={{
                          backgroundImage:
                            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                      >
                        {specialtyOptions.map((option) => (
                          <option key={`spec-${option}`} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Minimum Rating
                    </label>
                    <div className="flex items-center gap-3">
                      {[...Array(5)].map((_, index) => (
                        <button
                          key={`rating-${index}`}
                          type="button"
                          onClick={() =>
                            handleFilterChange("rating", index + 1)
                          }
                          className="focus:outline-none"
                        >
                          {index < filters.rating ? (
                            <StarIconSolid className="h-6 w-6 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-6 w-6 text-gray-600 hover:text-gray-400" />
                          )}
                        </button>
                      ))}
                      {filters.rating > 0 && (
                        <button
                          onClick={() => handleFilterChange("rating", 0)}
                          className="ml-2 text-xs text-gray-400 hover:text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={() => {
                      setFilters({
                        category: "All Categories",
                        priceRange: "Any Price",
                        availability: "Any Availability",
                        rating: 0,
                        specialty: "All Specialties",
                      });
                    }}
                    className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Results */}
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredProducts().map((product, index) => (
                  <motion.div
                    key={`product-${product.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
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

                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <BuildingOffice2Icon className="h-4 w-4" />
                            <span>{product.supplier}</span>
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

              {getFilteredProducts().length === 0 && (
                <div className="bg-gray-800/50 rounded-xl p-10 text-center">
                  <h3 className="text-xl font-medium text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: "All Categories",
                        priceRange: "Any Price",
                        availability: "Any Availability",
                        rating: 0,
                        specialty: "All Specialties",
                      });
                    }}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Supplier Results */}
          {activeTab === "suppliers" && (
            <motion.div
              key="suppliers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getFilteredSuppliers().map((supplier, index) => (
                  <motion.div
                    key={`supplier-${supplier.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
                  >
                    <Link href={`/marketplace/suppliers/${supplier.id}`}>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={supplier.image}
                              alt={supplier.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  {supplier.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex items-center gap-1">
                                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                                    <span className="text-white">
                                      {supplier.rating}
                                    </span>
                                    <span className="text-gray-400">
                                      ({supplier.reviewCount} reviews)
                                    </span>
                                  </div>
                                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>{supplier.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {supplier.verifiedYears} Years Verified
                              </div>
                            </div>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {supplier.description}
                            </p>

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
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-800/30 rounded-xl">
                          <div className="text-center">
                            <div className="font-medium text-white">
                              {supplier.productsCount}
                            </div>
                            <div className="text-xs text-gray-400">
                              Products
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-white">
                              {supplier.fulfillmentRate}%
                            </div>
                            <div className="text-xs text-gray-400">
                              Fulfillment Rate
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-white">
                              {supplier.responseTime}
                            </div>
                            <div className="text-xs text-gray-400">
                              Response Time
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
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

                          <div className="flex-1 flex flex-col justify-end">
                            <div className="flex gap-2 mt-4 md:mt-0">
                              <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                                View Profile
                              </button>
                              <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                                <PhoneIcon className="h-5 w-5" />
                              </button>
                              <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                                <EnvelopeIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {getFilteredSuppliers().length === 0 && (
                <div className="bg-gray-800/50 rounded-xl p-10 text-center">
                  <h3 className="text-xl font-medium text-white mb-2">
                    No suppliers found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: "All Categories",
                        priceRange: "Any Price",
                        availability: "Any Availability",
                        rating: 0,
                        specialty: "All Specialties",
                      });
                    }}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <nav className="flex items-center gap-1">
            <button className="px-3 py-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={`page-${page}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
