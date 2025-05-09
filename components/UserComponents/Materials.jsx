
"use client";

import {
  BuildingStorefrontIcon,
  ChevronRightIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ShoppingCartIcon,
  TrashIcon,
  TruckIcon,
  CheckCircleIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { format } from "date-fns";

// Enums
const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

// Fetcher
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

// Constants
const statusConfigs = {
  PENDING: {
    color: "bg-yellow-500/20 text-yellow-400",
    icon: <ClockIcon className="h-4 w-4 mr-1" />,
  },
  PROCESSING: {
    color: "bg-blue-500/20 text-blue-400",
    icon: <CogIcon className="h-4 w-4 mr-1" />,
  },
  CONFIRMED: {
    color: "bg-blue-600/20 text-blue-300",
    icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
  },
  SHIPPED: {
    color: "bg-blue-500/20 text-blue-400",
    icon: <ShoppingCartIcon className="h-4 w-4 mr-1" />,
  },
  DELIVERED: {
    color: "bg-green-500/20 text-green-400",
    icon: <TruckIcon className="h-4 w-4 mr-1" />,
  },
  CANCELLED: {
    color: "bg-red-500/20 text-red-400",
    icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />,
  },
};

const Materials = () => {
  const params = useParams();
  const { data: materials, error, isLoading } = useSWR(
    params.id ? `/user/projectMaterials/${params.id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(value);

  const getTotalStats = useCallback(() => {
    if (!materials) {
      return {
        total: formatCurrency(0),
        delivered: formatCurrency(0),
        inTransit: formatCurrency(0),
        pending: formatCurrency(0),
      };
    }

    const stats = materials.reduce(
      (acc, material) => {
        const cost = material.totalPrice;
        acc.total += cost;

        if (material.status === OrderStatus.DELIVERED) acc.delivered += cost;
        if (material.status === OrderStatus.PENDING) acc.pending += cost;
        if (
          [
            OrderStatus.PROCESSING,
            OrderStatus.CONFIRMED,
            OrderStatus.SHIPPED,
          ].includes(material.status)
        ) {
          acc.inTransit += cost;
        }

        return acc;
      },
      { total: 0, delivered: 0, inTransit: 0, pending: 0 }
    );

    return {
      total: formatCurrency(stats.total),
      delivered: formatCurrency(stats.delivered),
      inTransit: formatCurrency(stats.inTransit),
      pending: formatCurrency(stats.pending),
    };
  }, [materials]);

  const handleRemoveMaterial = async (materialId) => {
    try {
      await axiosInstance.delete(`/user/projectMaterials/${materialId}`);
      // SWR will automatically revalidate
    } catch (error) {
      console.error("Failed to remove material:", error);
      // TODO: Show error toast/notification
    }
  };

  const stats = useMemo(() => getTotalStats(), [getTotalStats]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <p className="text-gray-400 text-sm">
          Failed to load materials. Please try again later.
        </p>
      </div>
    );
  }

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
        {[
          { label: "Total Materials Value", value: stats.total },
          { label: "Delivered", value: stats.delivered, color: "text-green-400" },
          { label: "In Transit", value: stats.inTransit, color: "text-blue-400" },
          { label: "Pending", value: stats.pending, color: "text-yellow-400" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
          >
            <span className="text-sm text-gray-400">{stat.label}</span>
            <p
              className={`text-xl font-semibold mt-1 ${
                stat.color || "text-white"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Materials Table */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/30">
                {[
                  "Material",
                  "Quantity",
                  "Price",
                  "Total Cost",
                  "Supplier",
                  "Added By",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {materials?.map((material) => (
                <motion.tr
                  key={material.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/20"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {material.product.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Added: {format(new Date(material.createdAt), "MMM dd, yyyy")}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {material.quantity} {material.product.unit || "units"}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {formatCurrency(material.product.price)}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-orange-400 font-medium">
                      {formatCurrency(material.totalPrice)}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {material.product.supplier.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {material.user?.name || "Unknown"}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusConfigs[material.status]?.color || "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {statusConfigs[material.status]?.icon || null}
                      {material.status
                        ? material.status.charAt(0).toUpperCase() +
                          material.status.slice(1).toLowerCase()
                        : "Unknown"}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleRemoveMaterial(material.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      aria-label="Remove material"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {materials?.length === 0 && (
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
