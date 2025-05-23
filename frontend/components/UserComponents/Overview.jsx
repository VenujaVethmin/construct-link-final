"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  PencilIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const statusColors = {
  In_PROGRESS: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    label: "In Progress",
  },
  On_Hold: { bg: "bg-amber-500/20", text: "text-amber-400", label: "On Hold" },
  Almost_Done: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    label: "Almost Done",
  },
  Completed: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    label: "Completed",
  },
};

const Overview = () => {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `/user/overview/${params.id}`,
    fetcher
  );
  const [editingTimeline, setEditingTimeline] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  // Set form data when project data is loaded
  useEffect(() => {
    if (data) {
      setFormData({
        startDate: data.startDate
          ? new Date(data.startDate).toISOString().split("T")[0]
          : "",
        endDate: data.endDate
          ? new Date(data.endDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [data]);

  const handleTimelineUpdate = async () => {
    try {
      await axiosInstance.patch(`/user/project/${params.id}`, {
        startDate: formData.startDate ? new Date(formData.startDate) : null,
        endDate: formData.endDate ? new Date(formData.endDate) : null,
      });
      setEditingTimeline(false);
    } catch (error) {
      console.error("Error updating timeline:", error);
    }
  };

  const calculateProgress = () => {
    if (!data || !data.startDate) return 0;

    const start = new Date(data.startDate).getTime();
    const end = data.endDate
      ? new Date(data.endDate).getTime()
      : start + 90 * 24 * 60 * 60 * 1000; // Default to 90 days if no end date
    const now = new Date().getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(Math.round(progress), 0), 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const daysLeft = () => {
    if (!data || !data.endDate) return null;

    const end = new Date(data.endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    return `${diffDays} days left`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 text-red-400 p-4 rounded-xl">
        Error loading project data. Please try again.
      </div>
    );
  }

  const status = data?.status || "In_PROGRESS";
  const statusStyle = statusColors[status] || statusColors.In_PROGRESS;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Project Header Card */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{data?.name}</h1>
            <p className="text-gray-400 mt-1">{data?.description}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-lg ${statusStyle.bg} ${statusStyle.text} text-sm font-medium`}
          >
            {statusStyle.label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <BuildingOfficeIcon className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Project Type</p>
              <p className="text-sm font-medium text-white capitalize">
                {data?.projectType || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <MapPinIcon className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm font-medium text-white">
                {data?.location || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <BanknotesIcon className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Budget</p>
              <p className="text-sm font-medium text-white">
                {data?.budget
                  ? `Rs. ${Number(data.budget).toLocaleString("en-US")}`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ClipboardDocumentListIcon className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {data?._count.tasks || 0}
          </h3>
          <p className="text-sm text-gray-400">Active Tasks</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <UserGroupIcon className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {data?._count.projectMembers || 0}
          </h3>
          <p className="text-sm text-gray-400">Team Members</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <ClockIcon className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {daysLeft() || "No deadline"}
          </h3>
          <p className="text-sm text-gray-400">Time Remaining</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>
      </div>

      {/* Timeline Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-medium text-white">Project Timeline</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setEditingTimeline(!editingTimeline)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
          >
            <PencilIcon className="h-4 w-4" />
          </motion.button>
        </div>

        <AnimatePresence>
          {editingTimeline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2
                             text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2
                             text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setEditingTimeline(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTimelineUpdate}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Visualization */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-700/50 -translate-y-1/2"></div>

          {/* Start Date Node */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="col-span-1 sm:col-span-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border-4 border-blue-500 flex items-center justify-center z-10 shadow-lg shadow-blue-500/10">
                <CalendarIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-center mt-2">
                <p className="text-blue-400 font-semibold">Start Date</p>
                <p className="text-sm text-gray-300">
                  {formatDate(data?.startDate)}
                </p>
              </div>
            </div>

            {/* Progress Node */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 border-4 border-orange-500 flex items-center justify-center z-10 shadow-lg shadow-orange-500/10">
                <p className="text-lg font-bold text-orange-400">
                  {calculateProgress()}%
                </p>
              </div>
              <div className="text-center mt-2">
                <p className="text-orange-400 font-semibold">
                  Current Progress
                </p>
                <p className="text-sm text-gray-300">
                  Project is{" "}
                  {status === "Completed" ? "complete" : "in progress"}
                </p>
              </div>
            </div>

            {/* End Date Node */}
            <div className="col-span-1 sm:col-span-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center z-10 shadow-lg shadow-green-500/10">
                <CalendarIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-center mt-2">
                <p className="text-green-400 font-semibold">End Date</p>
                <p className="text-sm text-gray-300">
                  {formatDate(data?.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-amber-500"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 px-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </motion.div>

      
    </motion.div>
  );
};

export default Overview;
