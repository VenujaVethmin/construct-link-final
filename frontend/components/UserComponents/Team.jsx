import {
  UserGroupIcon,
  ArrowRightIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const Team = () => {
  const params = useParams();
  const router = useRouter();
  const { data, error, isLoading } = useSWR(`/user/team/${params.id}`, fetcher);

  const navigateToTalents = () => {
    router.push("/talents");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Team Members</h2>
            <p className="text-sm text-gray-400">
              Manage project collaborators
            </p>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-700 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-700 rounded w-36"></div>
              <div className="h-3 bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Team Members</h2>
            <p className="text-sm text-gray-400">
              Manage project collaborators
            </p>
          </div>
        </div>
        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg">
          Failed to load team members. Please try again later.
        </div>
      </div>
    );
  }

  const owner = data?.owner;
  const projectMembers = data?.projectMembers || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Team Members</h2>
          <p className="text-sm text-gray-400">Manage project collaborators</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={navigateToTalents}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 
                    text-white rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 
                    transition-all duration-200"
        >
          <UserGroupIcon className="h-5 w-5" />
          Browse Talents
        </motion.button>
      </div>

      {/* Owner Section */}
      {owner && (
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-400 mb-3">
            Project Owner
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-orange-500/10 backdrop-blur-sm rounded-xl border border-orange-500/30 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={owner.image || "/default-avatar.png"}
                  alt={owner.name}
                  className="w-12 h-12 rounded-full bg-gray-700 object-cover"
                />
                <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full p-1">
                  <UsersIcon className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-white font-medium group-hover:text-orange-500 
                             transition-colors duration-200"
                >
                  {owner.name}
                </h3>
                <p className="text-sm text-orange-400">Project Owner</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Team Members Section */}
      <div>
        <h3 className="text-md font-medium text-gray-400 mb-3">Team Members</h3>
        {projectMembers.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
            <p className="text-gray-400 mb-4">No team members yet</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={navigateToTalents}
              className="flex items-center gap-2 px-4 py-2 mx-auto bg-gray-700 hover:bg-gray-600
                       text-white rounded-lg transition-all duration-200"
            >
              <UserGroupIcon className="h-5 w-5" />
              Browse Talents
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4
                       hover:bg-gray-800/80 hover:border-orange-500/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={member.user.image || "/default-avatar.png"}
                      alt={member.user.name}
                      className="w-12 h-12 rounded-full bg-gray-700 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-white font-medium group-hover:text-orange-500 
                               transition-colors duration-200"
                    >
                      {member.user.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {member.user.talentProfile?.title || "Team Member"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Browse More Talents Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={navigateToTalents}
        className="mt-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 
                 p-5 cursor-pointer hover:border-orange-500/30 group transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-500/10">
              <UserGroupIcon className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-medium group-hover:text-orange-500 transition-colors duration-200">
                Find More Talent
              </h3>
              <p className="text-sm text-gray-400">
                Browse our marketplace for professionals
              </p>
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" />
        </div>
      </motion.div>
    </div>
  );
};

export default Team;
