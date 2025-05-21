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
  AcademicCapIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const specializationOptions = [
  "All Specializations",
  "Residential Construction",
  "Commercial Construction",
  "Industrial Construction",
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Architecture",
  "Interior Design",
  "Plumbing",
  "HVAC",
  "Project Management",
];

const experienceOptions = [
  "Any Experience",
  "Entry Level (0-2 years)",
  "Mid Level (3-5 years)",
  "Senior Level (6-10 years)",
  "Expert (10+ years)",
];

const rateRanges = [
  "Any Rate",
  "Under $50/hr",
  "$50 - $100/hr",
  "$100 - $150/hr",
  "$150 - $200/hr",
  "Over $200/hr",
];

const skillOptions = [
  "All Skills",
  "AutoCAD",
  "Revit",
  "Project Management",
  "BIM",
  "Structural Engineering",
  "Electrical Engineering",
  "HVAC",
  "Plumbing",
  "Construction Management",
  "Site Supervision",
  "Interior Design",
];

const TalentSearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const {
    data: talentResults,
    error,
    isLoading,
  } = useSWR(`/talents/searchTalents?search=${query}`, fetcher);

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  const [filters, setFilters] = useState({
    specialization: "All Specializations",
    experienceLevel: "Any Experience",
    rateRange: "Any Rate",
    rating: 0,
    skill: "All Skills",
  });

  // Handle new search
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/talents/talent?search=${encodeURIComponent(searchTerm)}`);
  };

  // Update search term when URL query changes
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
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
                placeholder="Search for construction professionals by name, skill, or specialization..."
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
              : "All Construction Professionals"}
          </h1>
          <p className="text-gray-400">
            {isLoading
              ? "Loading professionals..."
              : `${talentResults?.length || 0} professionals found`}
          </p>
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
                <option value="experience_high">
                  Sort by: Most Experience
                </option>
                <option value="rate_low">Sort by: Rate (Low to High)</option>
                <option value="rate_high">Sort by: Rate (High to Low)</option>
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
                  {/* Specialization Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Specialization
                    </label>
                    <select
                      value={filters.specialization}
                      onChange={(e) =>
                        handleFilterChange("specialization", e.target.value)
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
                      {specializationOptions.map((option) => (
                        <option key={`spec-${option}`} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Experience Level
                    </label>
                    <select
                      value={filters.experienceLevel}
                      onChange={(e) =>
                        handleFilterChange("experienceLevel", e.target.value)
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
                      {experienceOptions.map((option) => (
                        <option key={`exp-${option}`} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rate Range Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Hourly Rate
                    </label>
                    <select
                      value={filters.rateRange}
                      onChange={(e) =>
                        handleFilterChange("rateRange", e.target.value)
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
                      {rateRanges.map((range) => (
                        <option key={`rate-${range}`} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Skills Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Key Skill
                    </label>
                    <select
                      value={filters.skill}
                      onChange={(e) =>
                        handleFilterChange("skill", e.target.value)
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
                      {skillOptions.map((skill) => (
                        <option key={`skill-${skill}`} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>

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
                        specialization: "All Specializations",
                        experienceLevel: "Any Experience",
                        rateRange: "Any Rate",
                        rating: 0,
                        skill: "All Skills",
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

        {/* Talent Results */}
        <AnimatePresence mode="wait">
          <motion.div
            key="talents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : error ? (
              <div className="bg-gray-800/50 rounded-xl p-10 text-center">
                <h3 className="text-xl font-medium text-white mb-2">
                  Error loading professionals
                </h3>
                <p className="text-gray-400 mb-6">
                  There was an error loading the data. Please try again later.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {talentResults?.map((talent, index) => (
                    <motion.div
                      key={`talent-${talent.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
                    >
                      <Link href={`/talents/${talent.id}`}>
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-xl overflow-hidden flex-shrink-0">
                              <Image
                                src={talent.image || "/noavatar.png"}
                                alt={talent.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold text-white mb-2">
                                    {talent.name}
                                  </h3>
                                  <div className="text-orange-400 text-sm font-medium mb-3">
                                    {talent.talentProfile?.title ||
                                      "Professional"}{" "}
                                    {talent.talentProfile?.specialization && (
                                      <span className="text-gray-400 text-sm font-normal">
                                        • {talent.talentProfile.specialization}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                      <StarIconSolid className="h-4 w-4 text-yellow-400" />
                                      <span className="text-white">
                                        {talent.talentProfile?.rating || "New"}
                                      </span>
                                      {talent.talentProfile?.reviewCount >
                                        0 && (
                                        <span className="text-gray-400">
                                          ({talent.talentProfile.reviewCount}{" "}
                                          reviews)
                                        </span>
                                      )}
                                    </div>
                                    {talent.talentProfile?.location && (
                                      <>
                                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                          <MapPinIcon className="h-4 w-4" />
                                          <span>
                                            {talent.talentProfile.location}
                                          </span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {talent.talentProfile?.yearsExperience > 0 && (
                                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                    {talent.talentProfile.yearsExperience} Years
                                    Experience
                                  </div>
                                )}
                              </div>

                              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {talent.talentProfile?.about ||
                                  "No description provided"}
                              </p>

                              {talent.talentProfile?.skills &&
                                talent.talentProfile.skills.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {talent.talentProfile.skills.map(
                                      (skill, i) => (
                                        <span
                                          key={`skill-${talent.id}-${i}`}
                                          className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs"
                                        >
                                          {skill}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-800/30 rounded-xl">
                            <div className="text-center">
                              <div className="font-medium text-white">
                                ${talent.talentProfile?.hourlyRate || 0}/hr
                              </div>
                              <div className="text-xs text-gray-400">
                                Hourly Rate
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-white">
                                {talent.talentProfile?.completedProjects || 0}
                              </div>
                              <div className="text-xs text-gray-400">
                                Projects Completed
                              </div>
                            </div>
                            <div className="text-center">
                              {/* This info isn't in your API but kept for UI consistency */}
                              <div className="font-medium text-white">100%</div>
                              <div className="text-xs text-gray-400">
                                Job Success
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-col md:flex-row gap-4">
                            {/* Credentials section */}
                            <div className="flex-1">
                              <h4 className="text-white text-sm font-medium mb-3">
                                Credentials
                              </h4>

                              <div className="space-y-3">
                                {talent.talentProfile?.certifications &&
                                talent.talentProfile.certifications.length >
                                  0 ? (
                                  <div className="flex items-start gap-2">
                                    <CheckBadgeIcon className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="text-sm text-white">
                                        Certifications
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {talent.talentProfile.certifications
                                          .slice(0, 2)
                                          .join(", ")}
                                        {talent.talentProfile.certifications
                                          .length > 2 && "..."}
                                      </p>
                                    </div>
                                  </div>
                                ) : null}

                                {talent.talentProfile?.education &&
                                talent.talentProfile.education.length > 0 ? (
                                  <div className="flex items-start gap-2">
                                    <AcademicCapIcon className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="text-sm text-white">
                                        Education
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {
                                          talent.talentProfile.education[0]
                                            .degree
                                        }
                                        ,{" "}
                                        {
                                          talent.talentProfile.education[0]
                                            .institution
                                        }
                                      </p>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-end">
                              <div className="flex gap-2 mt-4 md:mt-0">
                                <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium transition-colors">
                                  View Profile
                                </button>
                                <button className="p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
                                  <DocumentTextIcon className="h-5 w-5" />
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

                {talentResults?.length === 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-10 text-center">
                    <h3 className="text-xl font-medium text-white mb-2">
                      No professionals found
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Try adjusting your search terms or filters
                    </p>
                    <button
                      onClick={() => {
                        setFilters({
                          specialization: "All Specializations",
                          experienceLevel: "Any Experience",
                          rateRange: "Any Rate",
                          rating: 0,
                          skill: "All Skills",
                        });
                      }}
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
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

export default TalentSearchPage;
