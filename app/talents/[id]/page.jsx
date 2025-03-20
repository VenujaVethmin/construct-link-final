"use client";

import { useState } from "react";
import {
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock provider data
const provider = {
  id: 1,
  name: "John Smith",
  title: "Civil Engineer",
  image: "https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=400",
  coverImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200",
  rating: 4.9,
  reviewCount: 127,
  location: "New York, NY",
  hourlyRate: "$75",
  availability: "Available Now",
  verified: true,
  yearsExperience: 8,
  skills: ["Structural Design", "Project Management", "AutoCAD", "Construction Planning", "Site Supervision"],
  languages: ["English", "Spanish"],
  completedProjects: 143,
  specialization: "Commercial Construction",
  certifications: ["PE Licensed", "PMP Certified"],
  about: "Civil Engineer with 8+ years of experience in structural design and project management. Specialized in commercial construction projects with a focus on sustainable building practices.",
  portfolio: [
    {
      id: 1,
      title: "City Center Complex",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
      description: "Lead structural engineer for 30-story commercial building",
    },
    {
      id: 2,
      title: "Riverside Development",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600",
      description: "Project manager for waterfront residential complex",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "David Chen",
      rating: 5,
      date: "2 months ago",
      comment: "Excellent work on our commercial project. Very professional and knowledgeable.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
    },
    // Add more reviews...
  ],
  contact: {
    phone: "+1 234 567 890",
    email: "john.smith@example.com",
  },
};

// Mock project data
const projects = [
  { id: 1, title: "Downtown Office Building" },
  { id: 2, title: "Residential Complex" },
  { id: 3, title: "Shopping Mall Renovation" },
];

const ProviderProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showHireModal, setShowHireModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Cover Image */}
      <div className="relative h-64 lg:h-80">
        <Image
          src={provider.coverImage}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32">
        <div className="relative z-10 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border-4 border-gray-800">
              <Image
                src={provider.image}
                alt={provider.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{provider.name}</h1>
                {provider.verified && (
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-sm flex items-center gap-1">
                    <CheckBadgeIcon className="h-4 w-4" />
                    Verified
                  </span>
                )}
              </div>
              
              <p className="text-orange-500 text-lg mb-3">{provider.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-medium">{provider.rating}</span>
                  <span className="text-gray-400">({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{provider.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <BriefcaseIcon className="h-5 w-5" />
                  <span>{provider.yearsExperience} years experience</span>
                </div>
                <div className="flex items-center gap-1 text-white font-medium">
                  <CurrencyDollarIcon className="h-5 w-5" />
                  <span>{provider.hourlyRate}/hr</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:self-start">
              <button 
                onClick={() => setShowHireModal(true)}
                className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 font-medium"
              >
                Request to Join Your Project
              </button>
              <button className="bg-gray-700/50 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700/70">
                <ChatBubbleLeftIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              <span>{provider.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              <span>{provider.contact.email}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-b border-gray-700">
            <div className="flex gap-6">
              {["overview", "portfolio", "reviews"].map((tab) => (
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
          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* About */}
                  <div>
                    <h2 className="text-lg font-medium text-white mb-3">About</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">{provider.about}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-lg font-medium text-white mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {provider.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-gray-700/50 text-gray-300 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h2 className="text-lg font-medium text-white mb-3">Certifications</h2>
                    <div className="flex flex-wrap gap-2">
                      {provider.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Quick Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                          <BuildingOffice2Icon className="h-5 w-5" />
                          <span>Completed Projects</span>
                        </div>
                        <span className="text-white">{provider.completedProjects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                          <CalendarIcon className="h-5 w-5" />
                          <span>Availability</span>
                        </div>
                        <span className="text-green-400">{provider.availability}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400">
                          <DocumentTextIcon className="h-5 w-5" />
                          <span>Languages</span>
                        </div>
                        <span className="text-white">{provider.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {provider.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {provider.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium">{review.name}</h3>
                          <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Professionals */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Similar Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProfessionals.map((related) => (
              <motion.div
                key={related.id}
                whileHover={{ y: -4 }}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{related.name}</h3>
                    <p className="text-orange-500 text-sm">{related.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">{related.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{related.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hire Modal */}
      {showHireModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-white mb-4">Request to Join Your Project</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Select Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowHireModal(false)}
                  className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;