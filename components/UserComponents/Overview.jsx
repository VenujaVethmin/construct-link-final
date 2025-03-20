"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  PencilIcon,
  ChartBarIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";


const initialTasks = [
  {
    id: 1,
    title: "Foundation Work",
    status: "in-progress",
    assignee: "John Smith",
    dueDate: "2024-04-01",
    priority: "high",
  },
  {
    id: 2,
    title: "Site Survey",
    status: "completed",
    assignee: "Jane Doe",
    dueDate: "2024-03-25",
    priority: "medium",
  },
];

const initialTeam= [
  {
    id: 1,
    name: "John Smith",
    role: "Civil Engineer",
    avatar: "/avatars/john.jpg",
    status: "online",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Architect",
    avatar: "/avatars/jane.jpg",
    status: "offline",
  },
];

const initialExpenses = [
  {
    id: 1,
    description: "Building Materials",
    amount: 25000,
    date: "2024-03-20",
    category: "Materials",
  },
];



const initialTimeline = {
  startDate: "2024-03-01",
  endDate: "2024-12-31",
};

const initialActivities = [
  {
    id: 1,
    type: "task",
    description: "started foundation work",
    timestamp: "2024-03-20T09:00:00",
    user: initialTeam[0],
  },
  {
    id: 2,
    type: "expense",
    description: "added new expense for materials",
    timestamp: "2024-03-19T14:30:00",
    user: initialTeam[1],
  },
];
const Overview = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [team, setTeam] = useState(initialTeam);
  const [activities, setActivities] = useState(initialActivities);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [editingTimeline, setEditingTimeline] = useState(false);

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

  const calculateProgress = () => {
    const start = new Date(timeline.startDate).getTime();
    const end = new Date(timeline.endDate).getTime();
    const now = new Date().getTime();
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(Math.round(progress), 0), 100);
  };

  // Stats data
  const statsCards = [
    {
      icon: ClipboardDocumentListIcon,
      value: tasks.length,
      label: "Active Tasks",
      color: "blue",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      detail: `${
        tasks.filter((t) => t.status === "completed").length
      } completed`,
    },
    {
      icon: UserGroupIcon,
      value: team.length,
      label: "Team Members",
      color: "green",
      bgColor: "bg-green-500/10",
      textColor: "text-green-400",
      detail: `${team.filter((t) => t.status === "online").length} online`,
    },
    {
      icon: BanknotesIcon,
      value: `₹${expenses
        .reduce((sum, exp) => sum + exp.amount, 0)
        .toLocaleString()}`,
      label: "Total Budget",
      color: "orange",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-400",
      detail: `${expenses.length} transactions`,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card) => (
          <motion.div
            key={card.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 ${card.bgColor} rounded-lg`}>
                <card.icon className={`h-5 w-5 ${card.textColor}`} />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                {card.detail}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
            <p className="text-sm text-gray-400">{card.label}</p>
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
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
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={timeline.startDate}
                    onChange={(e) =>
                      setTimeline({ ...timeline, startDate: e.target.value })
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
                    value={timeline.endDate}
                    onChange={(e) =>
                      setTimeline({ ...timeline, endDate: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2
                             text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative h-2 bg-gray-700/50 rounded-full mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 top-0 h-full bg-orange-500"
          />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400 mb-1">Start Date</p>
            <p className="text-sm font-medium text-white">
              {new Date(timeline.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-lg font-bold text-orange-400"
            >
              {calculateProgress()}%
            </motion.div>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">End Date</p>
            <p className="text-sm font-medium text-white">
              {new Date(timeline.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
      >
        <h3 className="text-lg font-medium text-white mb-4 flex items-center justify-between">
          Recent Activity
          <span className="text-xs text-gray-400">Last 7 days</span>
        </h3>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={activity.user.avatar}
                alt={activity.user.name}
                className="w-10 h-10 rounded-full ring-2 ring-gray-700"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
