"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ClipboardIcon,
  MapPinIcon,
  FolderIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  PlusIcon,
  DocumentPlusIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import NewProjectModal from "../components/NewProjectModal";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

// Helper function to convert timestamp to "time ago" format
const timeAgo = (timestamp) => {
  const now = new Date();
  const activityDate = new Date(timestamp);
  const seconds = Math.floor((now - activityDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export default function Dashboard() {
  const {
    data: projects,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/dashboard", fetcher);

  // Fixed the metrics to be more responsive with fallbacks
  const metrics = [
    {
      title: "Total Projects",
      value: projects?.projectCount || 0,
      icon: <FolderIcon className="h-6 w-6" />,
    },
    {
      title: "Active Tasks",
      value: projects?.activeTasks || 0,
      icon: <ClipboardIcon className="h-6 w-6" />,
    },
    {
      title: "Team Members",
      value: projects?.members || 0,
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
  ];

  const [showModal, setShowModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const hasProjects = projects?.data && projects.data.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Metrics Grid - Fixed to be responsive */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl border border-gray-700 hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <div className="text-orange-500">{metric.icon}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-gray-700/50 rounded animate-pulse"></span>
                  ) : (
                    metric.value
                  )}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {hasProjects ? "Active Projects" : "My Projects"}
              </h2>

              {/* Only show the New Project button when there are existing projects */}
              {hasProjects && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg
                            shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                >
                  New Project
                </motion.button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 h-48 animate-pulse"
                  >
                    <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        </div>
                        <div>
                          <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !hasProjects ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-8 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-orange-500/10 rounded-full">
                    <DocumentPlusIcon className="h-12 w-12 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    No projects yet
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Get started by creating your first construction project to
                    track tasks, materials, and collaborate with team members.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg
                              shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Create Your First Project
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projects.data.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    <Link href={`/client/project/${project.id}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-white font-semibold">
                          {project.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            project.status === "In_PROGRESS"
                              ? "bg-orange-500/20 text-orange-500"
                              : project.status === "On_Hold"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : project.status === "Almost_Done"
                              ? "bg-emerald-500/20 text-emerald-500"
                              : project.status === "Completed"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-gray-500/20 text-gray-500"
                          }`}
                        >
                         {project.status.replace("_", " ").toLowerCase()}

                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-400">Budget</p>
                            <p className="text-sm text-white font-medium mt-0.5">
                              Rs.{project.budget?.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Type</p>
                            <p className="text-sm text-white font-medium mt-0.5">
                              {project.projectType}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 pt-2 border-t border-gray-700/50">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-400 overflow-hidden">
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Recent Activity
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                    <div className="w-full">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !hasProjects ||
              projects.data.every(
                (project) =>
                  !project.owner.recentActivities ||
                  project.owner.recentActivities.length === 0
              ) ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-3 bg-gray-700/50 rounded-full mb-3">
                  <ExclamationCircleIcon className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-400">No recent activities to display</p>
                <p className="text-sm text-gray-500 mt-1">
                  Activities will appear here once you start working on projects
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.data.flatMap((project) =>
                  project.owner.recentActivities?.map((activity, index) => (
                    <motion.div
                      key={`${project.id}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                      <div>
                        <p className="text-white">{activity.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-400">
                            {timeAgo(activity.time)}
                          </span>
                          <span className="text-xs text-orange-500 bg-orange-500/20 px-2 py-1 rounded-full">
                            {activity.project.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {showModal && (
              <NewProjectModal setShowModal={setShowModal} mutate={mutate} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
