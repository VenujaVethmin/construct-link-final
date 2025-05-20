"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ProjectInvitationPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null); // 'accepted', 'declined', or null

  // This would normally come from URL params or context
  const invitation = {
    projectName: "Riverfront Tower Construction",
    role: "Structural Engineer",
    senderName: "Alex Johnson",
    companyName: "ABC Developers Ltd",
    date: "May 15, 2025",
    message: "We're looking for an experienced structural engineer to join our team for the Riverfront Tower project. Your expertise would be invaluable for this 6-month engagement."
  };

  const handleResponse = async (accept) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be your actual API call:
      // const result = await fetch('/api/invitations/respond', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     invitationId: invitationId, 
      //     accepted: accept 
      //   })
      // });
      
      setResponse(accept ? 'accepted' : 'declined');
    } catch (error) {
      console.error("Error responding to invitation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl"
      >
        {response === null ? (
          <>
            <h1 className="text-xl font-bold text-white mb-6 text-center">Project Invitation</h1>
            
            <div className="space-y-4 mb-6">
              <div>
                <h2 className="text-orange-500 font-medium text-lg">
                  {invitation.projectName}
                </h2>
                <p className="text-gray-300">Role: {invitation.role}</p>
              </div>
              
              <p className="text-gray-400 text-sm border-t border-gray-700 pt-4">
                {invitation.message}
              </p>
              
              <div className="text-gray-400 text-sm border-t border-gray-700 pt-4">
                <p>From: {invitation.senderName}</p>
                <p>Company: {invitation.companyName}</p>
                <p>Date: {invitation.date}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleResponse(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Decline"}
              </button>
              
              <button
                onClick={() => handleResponse(true)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Accept"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            {response === 'accepted' ? (
              <>
                <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-white text-xl font-bold mb-2">Invitation Accepted</h2>
                <p className="text-gray-400 mb-6">
                  You have successfully joined the project.
                </p>
              </>
            ) : (
              <>
                <XCircleIcon className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                <h2 className="text-white text-xl font-bold mb-2">Invitation Declined</h2>
                <p className="text-gray-400 mb-6">
                  You have declined this project invitation.
                </p>
              </>
            )}
            
            <button
              onClick={() => router.push('/user/dashboard')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors w-full"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectInvitationPage;