"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { format } from "date-fns";
import { toast } from "sonner";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const InvitationsListPage = () => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const {
    data: invitations,
    error,
    isLoading,
    mutate,
  } = useSWR("/talents/invitations", fetcher);

  const handleResponse = async (id, accept) => {
    setLoadingId(id);

    try {
      // Call the API to respond to invitation
      const res = await axiosInstance.post(`/talents/acceptInvite/${id}`, {
        status: accept,
      });

      if(res.status === 200) {
        // Update the invitations list
        mutate();
        toast.success(
          accept
            ? "Invitation accepted successfully"
            : "Invitation declined successfully"
        )
      }
    } catch (error) {
      console.error("Error responding to invitation:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-5 w-5 text-orange-500 animate-spin" />
          <span className="text-white">Loading invitations...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">
            Project Invitations
          </h1>
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-8 text-center">
            <p className="text-red-400">Failed to load invitations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Project Invitations
        </h1>

        {!invitations || invitations.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
            <p className="text-gray-400">You have no pending invitations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-orange-500 font-medium text-lg line-clamp-1">
                        {invitation.project?.name || "Project"}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <BriefcaseIcon className="h-4 w-4 mr-1" />
                           sender : {invitation.sender?.name || "Unknown"}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                          {invitation.project?.projectType ||
                            "Construction Project"}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {formatDate(invitation.createdAt)}
                        </div>
                      </div>
                      {invitation.message && (
                        <p className="text-gray-400 mt-2 text-sm">
                          "{invitation.message}"
                        </p>
                      )}
                    </div>

                    {invitation.status === "PENDING" ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleResponse(invitation?.id, false)}
                          disabled={loadingId === invitation.id}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm flex items-center disabled:opacity-50"
                        >
                          {loadingId === invitation.id ? (
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1 animate-spin" />
                              Processing
                            </span>
                          ) : (
                            <>
                              <XCircleIcon className="h-4 w-4 mr-1" />
                              Decline
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleResponse(invitation.id, true)}
                          disabled={loadingId === invitation.id}
                          className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm flex items-center disabled:opacity-50"
                        >
                          {loadingId === invitation.id ? (
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1 animate-spin" />
                              Processing
                            </span>
                          ) : (
                            <>
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Accept
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`px-3 py-1 rounded-full text-sm flex items-center ${
                          invitation.status === "ACCEPTED"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {invitation.status === "ACCEPTED" ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Accepted
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-4 w-4 mr-1" />
                            Declined
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationsListPage;
