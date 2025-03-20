"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


const initialTasks = [
  {
    id: 1,
    title: "Foundation Work",
    status: "in-progress",
    assignee: "John Smith",
    dueDate: "2024-04-01",
    priority: "high",
    isWatching: true,
    labels: ["Phase 1", "Critical"],
    description: "Complete foundation work for the main building",
    comments: 3,
  },
  // ...existing tasks
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: tasks.length + 1,
    };
    setTasks([...tasks, newTask]);
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
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg text-sm"
        >
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {["todo", "in-progress", "completed"].map((status) => (
          <div
            key={status}
            className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-medium text-white capitalize">
                {status.replace("-", " ")}
              </h3>
              <span className="text-xs text-gray-400">
                {tasks.filter((t) => t.status === status).length}
              </span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-800/50 rounded-lg p-3 sm:p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-white">
                        {task.title}
                      </h4>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className="text-xs bg-gray-700 text-gray-300 rounded px-2 py-1 border border-gray-600"
                      >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs
                                                ${
                                                  task.priority === "high"
                                                    ? "bg-red-500/20 text-red-400"
                                                    : task.priority === "medium"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "bg-green-500/20 text-green-400"
                                                }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {task.assignee}
                      </span>
                      {task.dueDate && (
                        <span className="text-gray-400 text-xs">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Tasks;
