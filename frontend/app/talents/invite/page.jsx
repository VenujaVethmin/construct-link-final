"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

// Mock talent data (minimal version for this page)
const talentData = {
  id: "1",
  name: "John Smith",
  title: "Civil Engineer",
  image:
    "https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=400",
  rating: 4.9,
  hourlyRate: "$75",
  specialization: "Commercial Construction",
};

// Mock user projects
const userProjects = [
  {
    id: "proj1",
    name: "Downtown Renovation",
    description: "Commercial building renovation in downtown area",
    status: "In_PROGRESS",
    budget: 1250000,
    location: "New York, NY",
    startDate: "2025-06-15",
    endDate: "2025-12-30",
    teamSize: 8,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
  },
  {
    id: "proj2",
    name: "Waterfront Residential Complex",
    description: "New residential development with 120 units",
    status: "On_Hold",
    budget: 8750000,
    location: "Boston, MA",
    startDate: "2025-08-01",
    endDate: "2026-10-15",
    teamSize: 24,
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800",
  },
  {
    id: "proj3",
    name: "Community Center Expansion",
    description: "Adding new facilities to existing community center",
    status: "Almost_Done",
    budget: 950000,
    location: "Chicago, IL",
    startDate: "2025-04-10",
    endDate: "2025-09-30",
    teamSize: 12,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
  },
  {
    id: "proj4",
    name: "Industrial Warehouse Construction",
    description: "New warehouse facility for manufacturing company",
    status: "In_PROGRESS",
    budget: 3200000,
    location: "Detroit, MI",
    startDate: "2025-07-01",
    endDate: "2026-03-15",
    teamSize: 18,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112c5ce17f?q=80&w=800",
  },
];



const ProjectInvitationPage = () => {
  const params = useParams();
  const router = useRouter();
  const [talent, setTalent] = useState(talentData);
  const [projects, setProjects] = useState(userProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
 

 
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // This would be replaced with actual API calls in production
  useEffect(() => {
    // Fetch talent data
    // Example: fetchTalentData(params.id).then(data => setTalent(data))
    // Fetch user's projects
    // Example: fetchUserProjects().then(data => setProjects(data))
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsSubmitting(true);
    try {
      // This would be an actual API call in production
      // Example: await sendProjectInvitation({
      //   talentId: talent.id,
      //   projectId: selectedProject.id,
      //   role: selectedRole || customRole,
      //   message,
      //   startDate,
      //   payRate: payRate ? parseFloat(payRate) : null
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error sending invitation:", error);
      setIsSubmitting(false);
      // Show error notification
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setProjectDropdownOpen(false);
  };


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href={`/talents/${params.id}`}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Back to Profile</span>
          </Link>
        </div>

        {showSuccess ? (
          <div className="bg-gray-800 border border-gray-700/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Invitation Sent Successfully!
            </h2>
            <p className="text-gray-300 mb-8">
              Your invitation to {talent.name} for the {selectedProject?.name}{" "}
              project has been sent. You'll be notified when they respond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/talents/${params.id}`}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Return to Profile
              </Link>
              <Link
                href={`/projects/${selectedProject?.id}`}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                View Project
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-8">
              Invite Professional to Project
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1">
                <div className="bg-gray-800 border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={talent.image}
                        alt={talent.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-white font-medium">{talent.name}</h2>
                      <p className="text-orange-400 text-sm">{talent.title}</p>
                      <div className="text-gray-400 text-xs mt-1">
                        {talent.specialization}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700/50 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-400 text-sm">Hourly Rate</div>
                      <div className="text-white font-medium">
                        {talent.hourlyRate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-gray-800 border border-gray-700/50 rounded-xl p-6"
                >
                  <div className="space-y-6">
                    {/* Project Selection */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Select Project{" "}
                        <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between ${
                            selectedProject
                              ? "bg-gray-700 text-white"
                              : "bg-gray-700/50 text-gray-400"
                          } border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                          onClick={() =>
                            setProjectDropdownOpen(!projectDropdownOpen)
                          }
                        >
                          {selectedProject ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded overflow-hidden bg-gray-600 flex-shrink-0">
                                <Image
                                  src={selectedProject.image}
                                  alt={selectedProject.name}
                                  width={24}
                                  height={24}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span>{selectedProject.name}</span>
                            </div>
                          ) : (
                            <span>Select a project</span>
                          )}
                          <ChevronDownIcon className="h-5 w-5" />
                        </button>

                        {projectDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-72 overflow-y-auto">
                            {projects.map((project) => (
                              <button
                                key={project.id}
                                type="button"
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-600/50 text-left border-b border-gray-600/30 last:border-0"
                                onClick={() => handleProjectSelect(project)}
                              >
                                <div className="w-10 h-10 rounded overflow-hidden bg-gray-600 flex-shrink-0">
                                  <Image
                                    src={project.image}
                                    alt={project.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="text-white font-medium">
                                    {project.name}
                                  </div>
                                  <div className="text-gray-400 text-xs truncate max-w-[300px]">
                                    {project.description}
                                  </div>
                                </div>
                                {selectedProject?.id === project.id && (
                                  <CheckIcon className="h-5 w-5 text-orange-500 ml-auto" />
                                )}
                              </button>
                            ))}

                            {projects.length === 0 && (
                              <div className="px-4 py-3 text-gray-400 text-center">
                                No projects available
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    {selectedProject && (
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <h3 className="text-white font-medium mb-3">
                          Project Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                            <span>{selectedProject.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                            <span>
                              ${selectedProject.budget.toLocaleString()} budget
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            <span>
                              {formatDate(selectedProject.startDate)} -{" "}
                              {formatDate(selectedProject.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <UserGroupIcon className="h-4 w-4 text-gray-400" />
                            <span>{selectedProject.teamSize} team members</span>
                          </div>
                        </div>
                      </div>
                    )}

                    



                    {/* Message */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Message <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent h-32"
                        placeholder="Describe the project and why you'd like this professional to join your team..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={
                          !selectedProject ||
                          isSubmitting 
                          
                        }
                        className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 ${
                          !selectedProject ||
                          isSubmitting 
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        } transition-colors`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending Invitation...
                          </>
                        ) : (
                          <>
                            <PaperAirplaneIcon className="h-5 w-5" />
                            Send Invitation
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectInvitationPage;
