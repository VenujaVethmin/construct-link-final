"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ClipboardIcon,
  ClockIcon,
  FolderIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// ... existing metrics, projects, activities constants ...
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

const projects = [
  {
    name: "City Center Mall",
    progress: 75,
    status: "In Progress",
    deadline: "15 Dec",
    team: 12,
  },
  {
    name: "Office Complex",
    progress: 45,
    status: "On Hold",
    deadline: "20 Dec",
    team: 8,
  },
  {
    name: "Residential Tower",
    progress: 90,
    status: "Almost Done",
    deadline: "10 Dec",
    team: 15,
  },
  {
    name: "Shopping Plaza",
    progress: 30,
    status: "In Progress",
    deadline: "25 Dec",
    team: 10,
  },
];

const activities = [
  {
    text: "New task assigned: Floor plan review",
    time: "2 hours ago",
    project: "City Center Mall",
  },
  {
    text: "Project milestone completed",
    time: "4 hours ago",
    project: "Office Complex",
  },
  {
    text: "Team meeting scheduled",
    time: "6 hours ago",
    project: "Residential Tower",
  },
];

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    team: "",
    budget: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowModal(false);
  };

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
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <Link href={`/user/project`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-white font-semibold">
                        {project.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.status === "In Progress"
                            ? "bg-orange-500/20 text-orange-500"
                            : project.status === "On Hold"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 text-sm">Progress</span>
                        <span className="text-white text-sm">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-orange-500 rounded-full h-2"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {project.deadline}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {project.team} members
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
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
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
                        {activity.time}
                      </span>
                      <span className="text-xs text-orange-500 bg-orange-500/20 px-2 py-1 rounded-full">
                        {activity.project}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Create New Project
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </motion.button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        placeholder="Project description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Team Size
                        </label>
                        <input
                          type="number"
                          name="team"
                          value={formData.team}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                   focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          placeholder="No. of members"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget
                        </label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                   focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          placeholder="Enter budget"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                   focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                   focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg
                               font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 
                               transition-all duration-300"
                    >
                      Create Project
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
