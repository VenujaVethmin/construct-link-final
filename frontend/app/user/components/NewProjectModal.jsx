"use client";

import axiosInstance from "@/lib/axiosInstance";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { m } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const NewProjectModal = ({ setShowModal , mutate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    projectType: "",

    startDate: "",

    budget: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/createProject", {
        ...formData,
      });

      if (res.status === 200) {
        toast.success("Project created successfully!");
        mutate("/user/dashboard"); 
        setShowModal(false);
      } else {
        window.alert("Error creating project. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md border border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">New Project</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              placeholder="Project name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              placeholder="Project description"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300">
              Project Details
            </h4>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Project Type
              </label>
              <select
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              >
                <option value="">Select project type</option>
                <option value="residential">Residential Construction</option>
                <option value="commercial">Commercial Construction</option>
                <option value="industrial">Industrial Construction</option>
                <option value="renovation">Renovation</option>
                <option value="infrastructure">Infrastructure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                placeholder="Project location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Budget (Optional)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
              placeholder="Enter budget amount"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
