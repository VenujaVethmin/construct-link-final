import {
  PlusIcon,
  UserPlusIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample team members data
const sampleTeamMembers = [
  {
    id: "1",
    user: {
      name: "John Smith",
      image: "/default-avatar.png",
    },
    role: "Civil Engineer",
    accessLevel: "ADMIN",
  },
  {
    id: "2",
    user: {
      name: "Sarah Wilson",
      image: "/default-avatar.png",
    },
    role: "Architect",
    accessLevel: "WRITE",
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      image: "/default-avatar.png",
    },
    role: "Project Manager",
    accessLevel: "READ",
  }
];

const Team = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMethod, setAddMethod] = useState(null);
  const [memberId, setMemberId] = useState("");
  const [teamMembers, setTeamMembers] = useState(sampleTeamMembers);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      // Add your API integration here
      console.log("Adding member:", { memberId, accessLevel: "READ" });
      setShowAddModal(false);
      setAddMethod(null);
      setMemberId("");
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

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
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 
                    text-white rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 
                    transition-all duration-200"
        >
          
          Add Member
        </motion.button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4
                     hover:bg-gray-800/80 hover:border-orange-500/50 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={member.user.image}
                  alt={member.user.name}
                  className="w-12 h-12 rounded-full bg-gray-700"
                />
              
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-orange-500 
                             transition-colors duration-200">
                  {member.user.name}
                </h3>
                <p className="text-sm text-gray-400">{member.role}</p>
                
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl border border-gray-700 
                       shadow-xl shadow-black/20 w-full max-w-md relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Add Team Member</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowAddModal(false);
                    setAddMethod(null);
                  }}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-white" />
                </motion.button>
              </div>

              <div className="p-6">
                {!addMethod ? (
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAddMethod("id")}
                      className="flex flex-col items-center gap-3 p-6 rounded-xl
                               bg-gray-800/50 border border-gray-700 hover:border-orange-500 
                               hover:bg-gray-800/80 transition-all duration-200"
                    >
                      <div className="p-3 rounded-full bg-orange-500/10">
                        <UserPlusIcon className="h-8 w-8 text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-white">Add by ID</span>
                      <p className="text-xs text-gray-400 text-center">
                        Add member using their unique ID
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAddMethod("browse")}
                      className="flex flex-col items-center gap-3 p-6 rounded-xl
                               bg-gray-800/50 border border-gray-700 hover:border-orange-500 
                               hover:bg-gray-800/80 transition-all duration-200"
                    >
                      <div className="p-3 rounded-full bg-orange-500/10">
                        <UserGroupIcon className="h-8 w-8 text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-white">Browse Talents</span>
                      <p className="text-xs text-gray-400 text-center">
                        Search and add from available talents
                      </p>
                    </motion.button>
                  </div>
                ) : addMethod === "id" ? (
                  <form onSubmit={handleAddMember} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">
                        Member ID
                      </label>
                      <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 
                                 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 
                                 focus:ring-orange-500 transition-all duration-200"
                        placeholder="Enter member ID"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddModal(false);
                          setAddMethod(null);
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-800/50 text-gray-300 rounded-lg 
                                 hover:bg-gray-800 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 
                                 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 
                                 transition-colors duration-200"
                      >
                        Add Member
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Redirecting to talents page...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;