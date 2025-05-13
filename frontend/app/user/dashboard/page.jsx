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

const metrics = [
  {
    title: "Total Projects",
    value: "24",
    change: "+2.5%",
    icon: <FolderIcon className="h-6 w-6" />,
  },
  {
    title: "Active Tasks",
    value: "156",
    change: "+3.2%",
    icon: <ClipboardIcon className="h-6 w-6" />,
  },
  {
    title: "Team Members",
    value: "38",
    change: "+1.5%",
    icon: <UserGroupIcon className="h-6 w-6" />,
  },
  {
    title: "Budget Used",
    value: "$847K",
    change: "+5.2%",
    icon: <ChartBarIcon className="h-6 w-6" />,
  },
];

export default function Dashboard() {
  const { data: projects, error, isLoading, mutate } = useSWR(
    "/user/dashboard",
    fetcher
  );
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Metrics Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center text-emerald-500 text-sm"
                  >
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    {metric.change}
                  </motion.div>
                </div>
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {metric.value}
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
              <h2 className="text-2xl font-bold text-white">Active Projects</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg
                          shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                New Project
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects?.data?.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <Link href={`/user/project/${project.id}`}>
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
                        {project.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-400">Budget</p>
                          <p className="text-sm text-white font-medium mt-0.5">
                            ${project.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text_xs text-gray-400">Type</p>
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
            <div className="space-y-4">
              {projects?.data.flatMap((project) =>
                project.owner.recentActivities.map((activity, index) => (
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