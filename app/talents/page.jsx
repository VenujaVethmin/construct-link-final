"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  ClockIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const serviceProviders = [
  {
    id: 1,
    name: "John Smith",
    title: "Civil Engineer",
    image:
      "https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=400",
    rating: 4.9,
    reviewCount: 127,
    location: "New York, NY",
    hourlyRate: "$75",
    availability: "Available Now",
    verified: true,
    yearsExperience: 8,
    skills: ["Structural Design", "Project Management", "AutoCAD"],
    languages: ["English", "Spanish"],
    completedProjects: 143,
    specialization: "Commercial Construction",
    certifications: ["PE Licensed", "PMP Certified"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Architecture Specialist",
    image:
      "https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=400",
    rating: 4.8,
    reviewCount: 95,
    location: "Los Angeles, CA",
    hourlyRate: "$85",
    availability: "Available in 2 weeks",
    verified: true,
    yearsExperience: 6,
    skills: ["3D Modeling", "Revit", "Green Building"],
    languages: ["English"],
    completedProjects: 89,
    specialization: "Sustainable Architecture",
    certifications: ["LEED AP", "AIA Member"],
  },
  // Add more service providers...
];

const categories = [
  "All Categories",
  "Civil Engineering",
  "Architecture",
  "Project Management",
  "Interior Design",
  "MEP Engineering",
  "Site Supervision",
  "Quantity Surveying",
];

const experienceLevels = [
  "Any Experience",
  "3+ years",
  "5+ years",
  "8+ years",
  "10+ years",
];
const availability = [
  "Any Availability",
  "Available Now",
  "Available this week",
  "Available this month",
];
const priceRanges = [
  "Any Rate",
  "Under $50/hr",
  "$50-100/hr",
  "$100-150/hr",
  "$150+/hr",
];

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedExperience, setSelectedExperience] =
    useState("Any Experience");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Construction Professionals
            </h1>
            <p className="text-gray-400 text-sm">
              Find skilled experts for your construction projects
            </p>
          </div>
         
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by skill, title, or location..."
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
                    Expertise
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Experience Level
                    </h3>
                    <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm px-3 py-1.5">
                      {experienceLevels.map((level) => (
                        <option key={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Availability
                    </h3>
                    <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm px-3 py-1.5">
                      {availability.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      Hourly Rate
                    </h3>
                    <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm px-3 py-1.5">
                      {priceRanges.map((range) => (
                        <option key={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceProviders.map((provider) => (
            <motion.div
              key={provider.id}
              whileHover={{ y: -4 }}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <Link href={"talents/g"}>
              <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">
                        {provider.name}
                      </h3>
                      {provider.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <p className="text-orange-500 text-sm">{provider.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-white">{provider.rating}</span>
                        <span className="text-gray-400">
                          ({provider.reviewCount})
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <BriefcaseIcon className="h-4 w-4" />
                      <span>{provider.yearsExperience} years experience</span>
                    </div>
                    <span className="text-white font-medium">
                      {provider.hourlyRate}/hr
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <ClockIcon className="h-4 w-4" />
                      <span>{provider.availability}</span>
                    </div>
                    <span className="text-gray-400">
                      {provider.completedProjects} projects
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600">
                    Hire Now
                  </button>
                  <button className="flex-1 bg-gray-700/30 text-white py-2 rounded-lg text-sm hover:bg-gray-700/50">
                    View Profile
                  </button>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
