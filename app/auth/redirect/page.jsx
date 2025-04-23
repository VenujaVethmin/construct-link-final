"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";

const LoadingDot = ({ delay }) => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      delay,
    }}
    className="w-2 h-2 rounded-full bg-orange-500"
  />
);

export default function Redirect() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          router.push("/auth/signin");
          return;
        }

        const response = await axiosInstance.get("/me");

        if (!response.status === 200) {
          router.push("/auth/signin");
          return;
        }

        const userData = await response.data;
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/auth/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "CLIENT":
          router.push("/user/dashboard");
          break;
        case "PROFESSIONAL":
          router.push("/professional/dashboard");
          break;
        case "SUPPLIER":
          router.push("/supplier/dashboard");
          break;
        default:
          router.push("/auth/signin");
      }
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Spinner Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-orange-600 border-l-orange-600"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-4 border-transparent border-b-orange-500 border-r-orange-500"
        />

        {/* Center Circle */}
        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 flex items-center justify-center">
          <BuildingOffice2Icon className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-2xl font-bold text-white"
      >
        Welcome to ConstructLink
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-2 text-gray-400"
      >
        Redirecting you to your dashboard
      </motion.div>

      {/* Loading Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-1.5 mt-4"
      >
        {[0, 0.2, 0.4].map((delay, index) => (
          <LoadingDot key={index} delay={delay} />
        ))}
      </motion.div>
    </div>
  );
}
