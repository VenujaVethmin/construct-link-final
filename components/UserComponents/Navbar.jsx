"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  CogIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  {
    href: "/user/dashboard",
    label: "Home",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    href: "/user/projects",
    label: "Projects",
    icon: <ChartBarIcon className="h-6 w-6" />,
  },
  {
    href: "/marketplace",
    label: "Market",
    icon: <BuildingStorefrontIcon className="h-6 w-6" />,
  },
  {
    href: "/talents",
    label: "Talents",
    icon: <UserGroupIcon className="h-6 w-6" />,
  },
  {
    href: "/user/profile",
    label: "Profile",
    icon: <UserCircleIcon className="h-6 w-6" />,
  },
];

const userMenuItems = [
  { label: "Profile Settings", icon: <CogIcon className="h-5 w-5" /> },
  { label: "Sign Out", icon: <ArrowRightOnRectangleIcon className="h-5 w-5" /> },
];

const notifications = [
  {
    id: 1,
    title: "New Project Invitation",
    message: "You've been invited to join Project X",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Task Update",
    message: "Task 'Design Review' has been completed",
    time: "1h ago",
  },
  {
    id: 3,
    title: "Meeting Reminder",
    message: "Team meeting starts in 30 minutes",
    time: "3h ago",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-black/10"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <span
                    className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 
                                 text-transparent bg-clip-text"
                  >
                    Construct
                  </span>
                  <span className="text-2xl font-bold text-white">Link</span>
                </motion.div>
              </Link>

              {/* Desktop Links */}
              <div className="flex items-center space-x-4">
                {navLinks.slice(0, 4).map((link) => (
                  <motion.div
                    key={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200
                        ${
                          pathname === link.href
                            ? "bg-orange-500/10 text-orange-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative text-gray-400 hover:text-white"
                >
                  <BellIcon className="h-6 w-6" />
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full 
                                 text-xs flex items-center justify-center text-white font-medium"
                  >
                    3
                  </span>
                </motion.button>

                {/* User Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile"
                      )
                    }
                    className="flex items-center space-x-3 text-gray-400 hover:text-white 
                             bg-gray-800/50 rounded-lg px-4 py-2"
                  >
                    <UserCircleIcon className="h-8 w-8" />
                    <span className="font-medium">John Doe</span>
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === "profile" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 
                                 rounded-xl shadow-xl overflow-hidden"
                      >
                        {userMenuItems.map((item, index) => (
                          <motion.button
                            key={index}
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-3 text-gray-300 
                                     hover:text-white transition-colors"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Mobile Top Bar */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 inset-x-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800"
          >
            <div className="px-4 h-16">
              <div className="flex items-center justify-between h-full">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center"
                  >
                    <span
                      className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 
                                   text-transparent bg-clip-text"
                    >
                      Construct
                    </span>
                    <span className="text-xl font-bold text-white">Link</span>
                  </motion.div>
                </Link>

                {/* Top Bar Actions */}
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "notifications"
                          ? null
                          : "notifications"
                      )
                    }
                    className="relative text-gray-400 hover:text-white"
                  >
                    <BellIcon className="h-6 w-6" />
                    <span
                      className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full 
                                   text-xs flex items-center justify-center text-white font-medium"
                    >
                      3
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile"
                      )
                    }
                    className="relative w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                             flex items-center justify-center"
                  >
                    <UserCircleIcon className="h-6 w-6 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Dropdowns */}
            <AnimatePresence>
              {activeDropdown === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full left-0 right-0 mt-2 mx-4 bg-gray-800 
                           border border-gray-700 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        Notifications
                      </h3>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveDropdown(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-3"
                        >
                          <div className="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                          <div>
                            <p className="text-white font-medium">
                              {notification.title}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {notification.message}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeDropdown === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full right-4 mt-2 w-48 bg-gray-800 border border-gray-700 
                           rounded-xl shadow-xl overflow-hidden"
                >
                  {userMenuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-gray-300 
                               hover:text-white transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
          {/* Mobile Bottom Navigation */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800"
          >
            <div className="grid grid-cols-5 h-16">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center justify-center space-y-1
                        ${isActive ? "text-orange-500" : "text-gray-400"}`}
                    >
                      <div
                        className={`${
                          isActive ? "-mt-3" : ""
                        } transition-all duration-200`}
                      >
                        {link.icon}
                      </div>
                      <span className="text-xs font-medium">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-0.5 w-12 h-1 bg-orange-500 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

          
          </motion.div>
          {/* Spacers for top and bottom navigation */}
          <div className="h-16" /> {/* Top spacer */}
          <div className="h-16" /> {/* Bottom spacer */}
        </>
      )}
    </>
  );
}