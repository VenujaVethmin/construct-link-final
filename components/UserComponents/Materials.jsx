"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  ChevronRightIcon,
  BuildingStorefrontIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const Materials = () => {
  // Sample materials data
  const [materials, setMaterials] = useState([
    {
      id: "m1",
      name: "Premium Portland Cement",
      quantity: 500,
      unit: "bags",
      price: "Rs. 950/bag",
      totalCost: "Rs. 475,000",
      supplier: "Global Construction Supply",
      addedAt: "2024-04-12",
      status: "ordered",
    },
    {
      id: "m2",
      name: "Steel Reinforcement Bars (12mm)",
      quantity: 15,
      unit: "tons",
      price: "Rs. 85,000/ton",
      totalCost: "Rs. 1,275,000",
      supplier: "MetalCraft Industries",
      addedAt: "2024-04-15",
      status: "pending",
    },
    {
      id: "m3",
      name: "PVC Water Pipes (4 inch)",
      quantity: 300,
      unit: "meters",
      price: "Rs. 320/meter",
      totalCost: "Rs. 96,000",
      supplier: "Flow Systems Inc.",
      addedAt: "2024-04-18",
      status: "delivered",
    },
    {
      id: "m4",
      name: "Premium Ceramic Floor Tiles",
      quantity: 2500,
      unit: "sq.ft",
      price: "Rs. 120/sq.ft",
      totalCost: "Rs. 300,000",
      supplier: "Luxury Living Surfaces",
      addedAt: "2024-04-20",
      status: "delivered",
    },
  ]);

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    ordered: "bg-blue-500/20 text-blue-400",
    delivered: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  const statusIcons = {
    pending: <ClockIcon className="h-4 w-4 mr-1" />,
    ordered: <ShoppingCartIcon className="h-4 w-4 mr-1" />,
    delivered: <TruckIcon className="h-4 w-4 mr-1" />,
    cancelled: <ExclamationCircleIcon className="h-4 w-4 mr-1" />,
  };

  const handleRemoveMaterial = (materialId) => {
    setMaterials(materials.filter((m) => m.id !== materialId));
  };

  const getTotalStats = () => {
    let total = 0;
    let delivered = 0;
    let pending = 0;
    let ordered = 0;

    materials.forEach((m) => {
      // Extract numeric value from totalCost (removing "Rs. " and ",")
      const costValue = parseInt(m.totalCost.replace(/[^0-9]/g, ""));
      total += costValue;

      if (m.status === "delivered") delivered += costValue;
      if (m.status === "pending") pending += costValue;
      if (m.status === "ordered") ordered += costValue;
    });

    return {
      total: `Rs. ${total.toLocaleString()}`,
      delivered: `Rs. ${delivered.toLocaleString()}`,
      pending: `Rs. ${pending.toLocaleString()}`,
      ordered: `Rs. ${ordered.toLocaleString()}`,
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Project Materials
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Track and manage construction materials
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-colors"
          onClick={() => window.open("/marketplace/products", "_blank")}
        >
          <BuildingStorefrontIcon className="h-4 w-4" />
          <span>Shop Materials</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
          <span className="text-sm text-gray-400">Total Materials Value</span>
          <p className="text-xl font-semibold text-white mt-1">{stats.total}</p>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
          <span className="text-sm text-gray-400">Delivered</span>
          <p className="text-xl font-semibold text-green-400 mt-1">
            {stats.delivered}
          </p>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
          <span className="text-sm text-gray-400">In Transit</span>
          <p className="text-xl font-semibold text-blue-400 mt-1">
            {stats.ordered}
          </p>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
          <span className="text-sm text-gray-400">Pending</span>
          <p className="text-xl font-semibold text-yellow-400 mt-1">
            {stats.pending}
          </p>
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/30">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Material
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {materials.map((material) => (
                <motion.tr
                  key={material.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/20"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {material.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Added: {new Date(material.addedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {material.quantity} {material.unit}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">{material.price}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-orange-400 font-medium">
                      {material.totalCost}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {material.supplier}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[material.status]
                      }`}
                    >
                      {statusIcons[material.status]}
                      {material.status.charAt(0).toUpperCase() +
                        material.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemoveMaterial(material.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {materials.length === 0 && (
          <div className="py-8 text-center">
            <ExclamationCircleIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              No materials added to this project yet
            </p>
            <button
              onClick={() => window.open("/marketplace/products", "_blank")}
              className="mt-4 inline-flex items-center text-sm text-orange-500 hover:text-orange-400"
            >
              Browse marketplace to add materials{" "}
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;
