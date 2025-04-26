"use client";

import {
  PlusIcon,
  XMarkIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { useParams } from 'next/navigation'

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);


const priorityColors = {
  high: "bg-red-500/20 text-red-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  low: "bg-green-500/20 text-green-400",
};

const statusLabels = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const Tasks = () => {

const params = useParams()


   const {
     data,
     error,
     isLoading,
   } = useSWR(`/user/getTasks/${params.id}`, fetcher);
    


  const [tasks, setTasks] = useState([]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
 const [newTask, setNewTask] = useState({
   title: "",
   status: "TODO", // match Prisma TaskStatus enum
   assignedToId: "", // correct field name for Prisma
   dueDate: "",
   priority: "MEDIUM", // match Priority enum
   labels: [],
   description: "",
   isWatching: false,
   
 });

  const [newLabel, setNewLabel] = useState("");


   useEffect(() => {
    if (data && data.data) {
      setTasks(data.data);
    }
  }, [data]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {

    try {

      const res = await axiosInstance.put(`/user/updateTask/${taskId}`, {
        status: newStatus,
      });
      
      if(res.status === 200) {

        
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      
    }
  
  };

  const handleCreateTask = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post(`/user/createTask/${params.id}`, {
      ...newTask,
    });

    if (res.status === 200) {
      window.alert("Task created successfully!");
    }

    setIsAddingTask(false);
    resetNewTask();
  } catch (err) {
    console.error("Create Task Error:", err.response?.data?.error || err.message);
    console.error(`Failed to create task: ${err.response?.data?.error || err.message}`);
  }
};


  const resetNewTask = () => {
    setNewTask({
      title: "",
      status: "TODO",
      assignee: "",
      dueDate: "",
      priority: "MEDIUM",
      labels: [],
      description: "",
      comments: 0,
      isWatching: false,
    });
    setNewLabel("");
  };

  const addLabel = () => {
    if (newLabel.trim() && !newTask.labels.includes(newLabel.trim())) {
      setNewTask({
        ...newTask,
        labels: [...newTask.labels, newLabel.trim()],
      });
      setNewLabel("");
    }
  };

  const removeLabel = (labelToRemove) => {
    setNewTask({
      ...newTask,
      labels: newTask.labels.filter((label) => label !== labelToRemove),
    });
  };

  const handleDragStart = (task) => {
    setIsDragging(true);
    setDraggedTask(task);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      handleStatusChange(draggedTask.id, status);
    }
    setIsDragging(false);
    setDraggedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Task Board
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Manage project tasks
          </p>
        </div>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-colors"
        >
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {Object.keys(statusLabels).map((status) => (
          <div
            key={status}
            className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4"
            onDragOver={(e) => handleDragOver(e, status)}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-white capitalize">
                {statusLabels[status]}
              </h3>
              <span className="px-2 py-0.5 bg-gray-600/50 rounded text-xs text-gray-300">
                {tasks.filter((t) => t.status === status).length}
              </span>
            </div>
            <div className="space-y-2 sm:space-y-3 min-h-32">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-transparent ${
                      isDragging && draggedTask?.id === task.id
                        ? "opacity-50"
                        : ""
                    } 
                              ${
                                isDragging && draggedTask?.id !== task.id
                                  ? "border-dotted border-gray-600"
                                  : ""
                              } 
                              ${
                                !isMobile ? "cursor-grab" : ""
                              } hover:bg-gray-700/50 transition-colors`}
                    draggable={!isMobile}
                    onDragStart={() => !isMobile && handleDragStart(task)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-white line-clamp-2">
                        {task.title}
                      </h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    {task.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {task.labels.map((label, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>

                      <div className="flex items-center text-gray-400">
                        <UserIcon className="w-3 h-3 mr-1" />
                        {task.assignee}
                      </div>

                      {task.dueDate && (
                        <div className="flex items-center text-gray-400">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}

                      {task.comments > 0 && (
                        <span className="text-gray-400">
                          {task.comments} comments
                        </span>
                      )}
                    </div>

                    {/* Mobile status select */}
                    {isMobile && (
                      <div className="mt-3 pt-2 border-t border-gray-700">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task.id, e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded text-sm p-2 text-white mt-1"
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAddingTask && (
        <div className="fixed -top-70 max-md:-top-120 inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl w-full max-w-md p-4 sm:p-5 md:max-h-[90vh] overflow-y-auto shadow-xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-gradient-to-b from-gray-800 to-gray-800/95 py-2 z-10">
              <h3 className="text-lg font-medium text-white">Add New Task</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsAddingTask(false);
                  resetNewTask();
                }}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-white" />
              </motion.button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="w-full bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="w-full bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="assignee"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Assignee
                  </label>
                  <div className="relative">
                    <select
                      id="assignee"
                      className="w-full bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500 appearance-none"
                      value={newTask.assignee}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignee: e.target.value })
                      }
                    >
                      <option value="">Select team member</option>
                      {/* Dummy team members data */}
                      <option value="John Smith">
                        John Smith (Civil Engineer)
                      </option>
                      <option value="Sarah Wilson">
                        Sarah Wilson (Architect)
                      </option>
                      <option value="Mike Johnson">
                        Mike Johnson (Project Manager)
                      </option>
                      <option value="Emily Davis">
                        Emily Davis (Structural Engineer)
                      </option>
                      <option value="David Brown">
                        David Brown (Electrical Engineer)
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    className="w-full bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      className="w-full bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500 appearance-none"
                      value={newTask.status}
                      onChange={(e) =>
                        setNewTask({ ...newTask, status: e.target.value })
                      }
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      id="priority"
                      className="w-full bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500 appearance-none"
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Labels
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newTask.labels.map((label, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={() => removeLabel(label)}
                        className="ml-1 hover:text-red-400"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-gray-700/70 border border-gray-600 rounded-lg p-2.5 text-white text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Add label"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addLabel())
                    }
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addLabel}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <TagIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isWatching"
                  className="rounded bg-gray-700 border-gray-600 text-orange-500 focus:ring-orange-500"
                  checked={newTask.isWatching}
                  onChange={(e) =>
                    setNewTask({ ...newTask, isWatching: e.target.checked })
                  }
                />
                <label
                  htmlFor="isWatching"
                  className="ml-2 text-sm text-gray-300"
                >
                  Watch this task
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsAddingTask(false);
                    resetNewTask();
                  }}
                  className="px-4 py-2.5 bg-gray-700/70 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm shadow-lg shadow-orange-500/20 transition-all"
                >
                  Create Task
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
