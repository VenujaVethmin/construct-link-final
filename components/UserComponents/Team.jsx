


import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from 'next/link';



const initialTeam = [
  {
    id: 1,
    name: "John Smith",
    role: "Civil Engineer",
    avatar: "/avatars/john.jpg",
    status: "online",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Architect",
    avatar: "/avatars/jane.jpg",
    status: "offline",
  },
];


const Team = () => {
    const [team, setTeam] = useState(initialTeam);
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">Team Members</h2>
                    <p className="text-xs sm:text-sm text-gray-400">Manage project team</p>
                </div>
                <Link href={"talents"} className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg text-sm">
                    <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Add Member</span>
                    <span className="sm:hidden">Add</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                                />
                                <span
                                    className={`absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-700
                                        ${member.status === "online" ? "bg-green-500" : "bg-gray-500"}`}
                                />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-white">
                                    {member.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-600">
                            <div className="flex items-center justify-between">
                                <button className="text-xs sm:text-sm text-gray-400 hover:text-white">
                                    View Profile
                                </button>
                                <button className="text-xs sm:text-sm text-gray-400 hover:text-white">
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;