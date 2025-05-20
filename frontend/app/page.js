"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "Skilled Professionals",
    description:
      "Connect with verified construction experts, engineers, and specialists.",
  },
  {
    icon: <BuildingOffice2Icon className="h-6 w-6" />,
    title: "Project Management",
    description:
      "Efficiently manage your construction projects from start to finish.",
  },
  {
    icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    title: "Quality Services",
    description:
      "Access top-rated construction services and suppliers in one place.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.01)_0%,rgba(255,255,255,0)_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            >
              Build Your Construction Projects
              <span className="block text-orange-500 mt-2">
                With Top Talent
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400"
            >
              Connect with skilled professionals, manage projects efficiently,
              and find quality construction services all in one platform.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
              >
                Browse Marketplace
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/auth/redirect"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                Dashboard 
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-orange-500/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { label: "Professionals", value: "500+" },
              { label: "Projects Completed", value: "1,000+" },
              { label: "Client Satisfaction", value: "98%" },
              { label: "Cities Covered", value: "50+" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeIn} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-8 sm:p-12">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Join our platform today and connect with top construction
                  professionals in your area.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-orange-600 font-medium hover:bg-gray-100 transition-colors"
                >
                  Get Started Now
                </Link>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
