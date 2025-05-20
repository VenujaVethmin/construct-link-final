"use client";

import { useState, useEffect, useRef } from "react";
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
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  {
    href: "/proffesional/dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    href: "/proffesional/invitations",
    label: "Invitations",
    icon: <BellIcon className="h-6 w-6" />,
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
  {
    label: "Sign Out",
    icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
  },
];

const notifications = [
  {
    id: 1,
    title: "New Project Invitation",
    message: "You've been invited to join Project X",
    time: "2m ago",
    type: "alert", // alert, success, info
    isUnread: true,
  },
  {
    id: 2,
    title: "Task Update",
    message: "Task 'Design Review' has been completed",
    time: "1h ago",
    type: "success",
    isUnread: true,
  },
  {
    id: 3,
    title: "Meeting Reminder",
    message: "Team meeting starts in 30 minutes",
    time: "3h ago",
    type: "info",
    isUnread: false,
  },
  {
    id: 4,
    title: "Payment Processed",
    message: "Your payment of $1,200 has been processed",
    time: "5h ago",
    type: "success",
    isUnread: false,
  },
  {
    id: 5,
    title: "New Message",
    message: "You have a new message from Emma Thompson",
    time: "1d ago",
    type: "info",
    isUnread: false,
  },
];

export default function NavbarSupp() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userNotifications, setUserNotifications] = useState(notifications);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = userNotifications.filter((n) => n.isUnread).length;

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        activeDropdown === "notifications"
      ) {
        setActiveDropdown(null);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        activeDropdown === "profile"
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const markAllAsRead = () => {
    setUserNotifications(
      userNotifications.map((notification) => ({
        ...notification,
        isUnread: false,
      }))
    );
  };

  const markAsRead = (id) => {
    setUserNotifications(
      userNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isUnread: false }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setUserNotifications(
      userNotifications.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "alert":
        return <ExclamationCircleIcon className="h-5 w-5 text-orange-500" />;
      case "info":
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

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
                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
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
                    {unreadCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full 
                                    text-xs flex items-center justify-center text-white font-medium"
                      >
                        {unreadCount}
                      </span>
                    )}
                  </motion.button>

                  {/* Notification Panel */}
                  <AnimatePresence>
                    {activeDropdown === "notifications" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 
                                  rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">
                              Notifications
                            </h3>
                            <div className="flex space-x-2">
                              {unreadCount > 0 && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={markAllAsRead}
                                  className="text-xs text-orange-400 hover:text-orange-300"
                                >
                                  Mark all as read
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="max-h-[480px] overflow-y-auto">
                          {userNotifications.length > 0 ? (
                            userNotifications.map((notification) => (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`p-4 border-b border-gray-700/50 hover:bg-gray-700/30 relative ${
                                  notification.isUnread ? "bg-gray-700/20" : ""
                                }`}
                              >
                                <div className="flex">
                                  <div className="flex-shrink-0 mr-3 mt-1">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <p
                                        className={`font-medium ${
                                          notification.isUnread
                                            ? "text-white"
                                            : "text-gray-300"
                                        }`}
                                      >
                                        {notification.title}
                                      </p>
                                      <div className="flex items-center space-x-1 ml-2">
                                        {notification.isUnread && (
                                          <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">
                                      {notification.message}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                      <div className="flex items-center text-gray-500 text-xs">
                                        <ClockIcon className="h-3 w-3 mr-1" />
                                        {notification.time}
                                      </div>
                                      <div className="flex space-x-1">
                                        {notification.isUnread && (
                                          <button
                                            onClick={() =>
                                              markAsRead(notification.id)
                                            }
                                            className="text-xs text-gray-400 hover:text-white"
                                          >
                                            Mark as read
                                          </button>
                                        )}
                                        <button
                                          onClick={() =>
                                            deleteNotification(notification.id)
                                          }
                                          className="text-xs text-gray-400 hover:text-white"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="p-6 text-center">
                              <p className="text-gray-400">No notifications</p>
                            </div>
                          )}
                        </div>

                        <div className="p-3 border-t border-gray-700 text-center">
                          <Link
                            href="/notifications"
                            className="text-sm text-orange-400 hover:text-orange-300"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative" ref={profileRef}>
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
                                 rounded-xl shadow-xl overflow-hidden z-50"
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
                  <div className="relative" ref={notificationRef}>
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
                      {unreadCount > 0 && (
                        <span
                          className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full 
                                   text-xs flex items-center justify-center text-white font-medium"
                        >
                          {unreadCount}
                        </span>
                      )}
                    </motion.button>
                  </div>

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
                  className="absolute top-full left-0 right-0 mx-4 bg-gray-800 
                           border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        Notifications
                      </h3>
                      <div className="flex space-x-3">
                        {unreadCount > 0 && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={markAllAsRead}
                            className="text-xs text-orange-400"
                          >
                            Mark all as read
                          </motion.button>
                        )}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDropdown(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto">
                    {userNotifications.length > 0 ? (
                      userNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`p-4 border-b border-gray-700/50 ${
                            notification.isUnread ? "bg-gray-700/20" : ""
                          }`}
                        >
                          <div className="flex">
                            <div className="flex-shrink-0 mr-3 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p
                                  className={`font-medium ${
                                    notification.isUnread
                                      ? "text-white"
                                      : "text-gray-300"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                {notification.isUnread && (
                                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm mt-1">
                                {notification.message}
                              </p>
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center text-gray-500 text-xs">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {notification.time}
                                </div>
                                <div className="flex space-x-2">
                                  {notification.isUnread && (
                                    <button
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                      className="text-xs text-gray-400 hover:text-white"
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                  <button
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                    className="text-xs text-gray-400 hover:text-white"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-gray-400">No notifications</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-gray-700 text-center">
                    <Link
                      href="/notifications"
                      className="text-sm text-orange-400 hover:text-orange-300"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeDropdown === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full right-4 mt-2 w-48 bg-gray-800 border border-gray-700 
                           rounded-xl shadow-xl overflow-hidden z-50"
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
