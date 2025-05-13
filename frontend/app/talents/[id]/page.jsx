"use client";

import axiosInstance from "@/lib/axiosInstance";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

// Mock talent data - replace with actual API call in production
const talentData = {
  id: "1",
  name: "John Smith",
  title: "Civil Engineer",
  image:
    "https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=400",
  coverImage:
    "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1887&auto=format",
  rating: 4.9,
  reviewCount: 127,
  location: "New York, NY",
  hourlyRate: "$75",
  availability: "Available Now",
  verified: true,
  yearsExperience: 8,
  skills: [
    "Structural Design",
    "Project Management",
    "AutoCAD",
    "Concrete Design",
    "Steel Construction",
    "Cost Estimation",
  ],
  languages: ["English", "Spanish"],
  completedProjects: 143,
  specialization: "Commercial Construction",
  certifications: ["PE Licensed", "PMP Certified"],
  education: [
    {
      degree: "Master of Engineering",
      institution: "Cornell University",
      year: "2015",
    },
    {
      degree: "Bachelor of Civil Engineering",
      institution: "University of Michigan",
      year: "2012",
    },
  ],
  about:
    "I am a licensed civil engineer with over 8 years of experience in structural design and project management. I specialize in commercial construction projects with expertise in concrete and steel structures. My approach focuses on sustainable design practices and cost-effective solutions that exceed client expectations.",
  experience: [
    {
      position: "Senior Structural Engineer",
      company: "BuildTech Solutions",
      period: "2018 - Present",
      description:
        "Lead structural engineer for commercial high-rise projects exceeding $50M in value.",
    },
    {
      position: "Project Engineer",
      company: "Global Construction Partners",
      period: "2015 - 2018",
      description:
        "Managed structural integrity for mid-size commercial and residential developments.",
    },
  ],
  portfolio: [
    {
      title: "Downtown Office Complex",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500",
      description:
        "12-story steel frame office building with sustainable design elements.",
    },
    {
      title: "Waterfront Residential Tower",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=500",
      description:
        "Luxury 24-story residential building with innovative structural solutions.",
    },
    {
      title: "University Research Facility",
      image:
        "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=500",
      description:
        "State-of-the-art research facility with complex foundation requirements.",
    },
  ],
  reviews: [
    {
      name: "Sarah Johnson",
      role: "Project Director",
      rating: 5,
      text: "John delivered exceptional structural designs that optimized our project budget without compromising quality. His communication was clear and consistent throughout the project.",
    },
    {
      name: "Michael Chen",
      role: "Development Manager",
      rating: 5,
      text: "Excellent work on our complex high-rise project. John's expertise in structural engineering saved us significant costs while maintaining the highest standards.",
    },
  ],
};

// Mock projects list
const projectsList = [
  {
    id: "proj1",
    name: "Downtown Renovation",
    description: "Commercial building renovation in downtown area",
    status: "In_PROGRESS",
    budget: 1250000,
    location: "New York, NY",
  },
  {
    id: "proj2",
    name: "Waterfront Residential Complex",
    description: "New residential development with 120 units",
    status: "On_Hold",
    budget: 8750000,
    location: "Boston, MA",
  },
  {
    id: "proj3",
    name: "Community Center Expansion",
    description: "Adding new facilities to existing community center",
    status: "Almost_Done",
    budget: 950000,
    location: "Chicago, IL",
  },
];

const TalentProfilePage = () => {


  const params = useParams();
  const {
    data : talent,
    error,
    isLoading,
    mutate,
  } = useSWR(`/talents/talentProfile/${params.id}`, fetcher);

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("about");
  const [projects, setProjects] = useState(projectsList);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading1, setIsLoading] = useState(false);

  // This would be replaced with an actual API call in production
  useEffect(() => {
    // Fetch talent data and projects
    // Example: fetchTalentData(params.id).then(data => setTalent(data))
  }, [params.id]);

  const handleSendRequest = (project) => {
    setSelectedProject(project);
    setShowConfirmation(true);
  };

  const confirmSendRequest = async () => {
    if (!selectedProject) return;

    setIsLoading(true);
    try {
      // This would be an actual API call in production
      // Example: await sendJoinRequest({ talentId: talent.id, projectId: selectedProject.id })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      setShowConfirmation(false);
      setIsLoading(false);

      // You could add a toast notification here
      alert(`Request sent to join ${selectedProject.name}`);
    } catch (error) {
      console.error("Error sending request:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Profile Header/Banner */}
      <div className="relative h-64 sm:h-80">
        <Image
          src={talent?.coverImage || "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1887&auto=format"}
          alt="Cover image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-gray-800 rounded-xl border border-gray-700/50 shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 border-b border-gray-700/50">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Image */}
              <div className="w-32 h-32 rounded-xl border-4 border-gray-800 overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src={talent?.image || "/noimage.webp"}
                  alt={talent?.name || "talent"}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-grow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-white">
                        {talent?.name}
                      </h1>
                      {talent?.talentProfile?.verified && (
                        <CheckBadgeIcon className="h-6 w-6 text-blue-400" />
                      )}
                    </div>
                    <p className="text-orange-400 text-lg mb-2">
                      {talent?.talentProfile?.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-medium">
                          {talent?.talentProfile?.rating}
                        </span>
                        <span className="text-gray-400">
                          ({talent?.talentProfile?.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPinIcon className="h-5 w-5" />
                        <span>{talent?.talentProfile?.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <BriefcaseIcon className="h-5 w-5" />
                        <span>{talent?.talentProfile?.yearsExperience} years experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Rate & Availability */}
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <p className="text-gray-300 text-sm mb-1">Hourly Rate /</p>
                    <p className="text-white text-2xl font-bold mb-1">
                     Rs. {talent?.talentProfile?.hourlyRate}
                    </p>
                
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <p className="text-gray-300 text-xs mb-1">
                      Projects Completed
                    </p>
                    <p className="text-white text-xl font-bold">
                      {talent?.talentProfile.completedProjects}
                    </p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <p className="text-gray-300 text-xs mb-1">Specialization</p>
                    <p className="text-white text-md font-medium">
                      {talent?.talentProfile.specialization}
                    </p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <p className="text-gray-300 text-xs mb-1">Languages</p>
                    <p className="text-white text-md font-medium">
                      {talent?.talentProfile?.languages?.join(", ")}
                    </p>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <p className="text-gray-300 text-xs mb-1">Certifications</p>
                    <p className="text-white text-md font-medium">
                      {talent?.talentProfile?.certifications?.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-8 justify-end">
              <button className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                Message
              </button>
              <Link href={`/talents/invite/${params.id}`}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                
              >
                Invite to Project
              </Link>
            </div>
          </div>

          {/* Profile Tabs and Content */}
          <div>
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-700/50">
              {["about", "experience", "projects", "reviews"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-orange-400 border-b-2 border-orange-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {/* About Tab */}
              {activeTab === "about" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">About</h2>
                  <p className="text-gray-300 mb-8">{talent?.talentProfile.about}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {talent?.talentProfile?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-700/40 text-gray-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">
                        Education
                      </h3>
                      <div className="space-y-4">
                        {talent?.talentProfile?.education?.map((edu, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-gray-700 pl-4"
                          >
                            <h4 className="text-white font-medium">
                              {edu.degree}
                            </h4>
                            <p className="text-gray-400">{edu.institution}</p>
                            <p className="text-gray-500 text-sm">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Certifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {talent?.talentProfile?.certifications?.map((cert, index) => (
                        <div
                          key={index}
                          className="bg-gray-700/30 border border-gray-700/50 rounded-lg p-4 flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <ClipboardDocumentCheckIcon className="h-5 w-5 text-orange-400" />
                          </div>
                          <span className="text-white">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">
                    Work Experience
                  </h2>
                  <div className="space-y-8">
                    {talent?.talentProfile?.experience?.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-gray-700 pl-6 relative"
                      >
                        <div className="absolute w-4 h-4 bg-orange-500 rounded-full -left-[9px] top-0"></div>
                        <h3 className="text-lg font-medium text-white">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-orange-400">{exp.company}</span>
                          <span className="text-gray-500">• {exp.period}</span>
                        </div>
                        <p className="text-gray-300">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Tab */}
              {activeTab === "portfolio" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">
                    Project Portfolio
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talent?.talentProfile?.portfolio?.map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 border border-gray-700/50 rounded-lg overflow-hidden group"
                      >
                        <div className="relative h-48">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-medium mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Tab - Show projects they can join */}
              {activeTab === "projects" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                      Available Projects
                    </h2>
                    <Link
                      href="/projects"
                      className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1"
                    >
                      View all projects
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5 hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-white font-medium mb-1">
                              {project.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                              <div className="flex items-center gap-1 text-gray-400">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{project.location}</span>
                              </div>

                              <div className="flex items-center gap-1 text-gray-400">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    project.status === "In_PROGRESS"
                                      ? "bg-blue-500"
                                      : project.status === "On_Hold"
                                      ? "bg-yellow-500"
                                      : project.status === "Almost_Done"
                                      ? "bg-green-300"
                                      : "bg-green-500"
                                  }`}
                                ></span>
                                <span>{project.status.replace("_", " ")}</span>
                              </div>

                              <div className="flex items-center gap-1 text-gray-400">
                                <span className="font-medium text-white">
                                  ${project.budget.toLocaleString()}
                                </span>
                                <span>budget</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleSendRequest(project)}
                            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors whitespace-nowrap"
                          >
                            Request to Join
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                      Client Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <StarIconSolid className="h-5 w-5 text-yellow-400" />
                      <span className="text-white font-medium">
                        {talent?.talentProfile.rating}
                      </span>
                      <span className="text-gray-400">
                        ({talent?.talentProfile.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {talent?.talentProfile.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-white font-medium">
                              {review.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {review.role}
                            </p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIconSolid
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default TalentProfilePage;
