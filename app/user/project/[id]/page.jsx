"use client";

import { motion, AnimatePresence } from "framer-motion";
import ExpenseCom from "@/components/UserComponents/Expense";
import Overview from "@/components/UserComponents/Overview";
import Tasks from "@/components/UserComponents/Tasks";
import Team from "@/components/UserComponents/Team";
import {
  BanknotesIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ProjectDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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

  const accordionVariants = {
    collapsed: { height: 0 },
    expanded: {
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

   const projectDetails = {
     title: "Commercial Building Project",
     description:
       "A state-of-the-art commercial complex featuring modern office spaces, retail outlets, and underground parking. This sustainable building project incorporates green technologies and smart building systems.",
     status: "Active",
     phase: "Construction",
     dueDate: "Dec 2024",
     location: "Downtown Business District",
     budget: "$25M",
     client: "Apex Development Corp",
     contractor: "BuildTech Solutions",
     startDate: "Mar 2024",
   };

   const navItems = [
     { id: "overview", icon: ChartBarIcon, label: "Overview" },
     { id: "tasks", icon: ClipboardDocumentListIcon, label: "Tasks" },
     { id: "team", icon: UserGroupIcon, label: "Team" },
     { id: "expenses", icon: BanknotesIcon, label: "Expenses" },
   ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "tasks":
        return <Tasks />;
      case "team":
        return <Team />;
      case "expenses":
        return <ExpenseCom />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {/* Animated Accordion Header */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-xl rounded-lg border border-gray-700 mb-4 sm:mb-6 overflow-hidden"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className="w-full flex items-center justify-between p-4"
          >
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-white">
                {projectDetails.title}
              </h1>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-1.5 sm:px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full"
                >
                  {projectDetails.status}
                </motion.span>
                <span>•</span>
                <span>Phase: {projectDetails.phase}</span>
                <span>•</span>
                <span>Due: {projectDetails.dueDate}</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isDescriptionOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isDescriptionOpen && (
              <motion.div
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={accordionVariants}
                className="overflow-hidden"
              >
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {/* Project Description */}
                    <motion.div variants={itemVariants} className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-400">
                        Description
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {projectDetails.description}
                      </p>
                    </motion.div>

                   
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animated Navigation Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-6 bg-gray-800/50 backdrop-blur-xl rounded-lg p-0.5 sm:p-1 border border-gray-700"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium flex-1
                ${
                  activeTab === item.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                }`}
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.slice(0, 3)}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Animated Content Area */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-xl rounded-lg sm:rounded-xl border border-gray-700 p-2 sm:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Animated Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 z-50 sm:inset-auto sm:right-0 sm:top-0 sm:w-80 sm:h-screen"
          >
            <TeamChat />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed sm:hidden right-3 bottom-3 p-3 bg-orange-500 text-white rounded-full shadow-lg"
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
}
