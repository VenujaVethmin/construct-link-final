"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";


const accountTypes = [
  {
    id: "CLIENT",
    title: "Client",
    icon: <BuildingOffice2Icon className="h-6 w-6" />,
    description:
      "I want to hire professionals and find suppliers for my construction projects",
    color: "orange",
  },
  {
    id: "PROFFESIONAL",
    title: "Professional",
    icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    description:
      "I want to offer my professional services and find construction projects",
    color: "blue",
  },
  {
    id: "SUPPLIER",
    title: "Supplier",
    icon: <UserGroupIcon className="h-6 w-6" />,
    description:
      "I want to sell construction materials and equipment to clients",
    color: "green",
  },
];

export default function Onboarding() {
  const [selectedType, setSelectedType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    try {
      if (selectedType) {
        setIsLoading(true); // Move this up to show loader immediately
        const res = await axiosInstance.put("/account/accountType", {
          role: selectedType,
        });

        if (res.status === 200) {
         
          if (selectedType === "PROFFESIONAL") {
            router.push("/onboarding/talent");
          }

          if (selectedType === "SUPPLIER") {
            router.push("/onboarding/supplier");
          }
          if (selectedType === "CLIENT") {
            router.push("/client/dashboard");
          }
         
        }

        setIsLoading(false); // Stop loader regardless of success
      }
    } catch (error) {
      setIsLoading(false); // Also stop loader on error
      console.error("Error during account type update:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Choose your account type
          </h1>
          <p className="mt-2 text-gray-400">
            Select how you want to use ConstructLink
          </p>
        </div>

        <div className="grid gap-4">
          {accountTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              whileHover={{ y: -2 }}
              className={`p-6 text-left rounded-xl border ${
                selectedType === type.id
                  ? `border-${type.color}-500 bg-${type.color}-500/10`
                  : "border-gray-700/50 bg-gray-800/40 hover:border-gray-600"
              } backdrop-blur-sm transition-colors`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg bg-${type.color}-500/10 text-${type.color}-500`}
                >
                  {type.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {type.title}
                  </h3>
                  <p className="mt-1 text-gray-400">{type.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedType || isLoading}
          className="w-full py-3 px-4 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>
      </motion.div>
    </div>
  );
}
