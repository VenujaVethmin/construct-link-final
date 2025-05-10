"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BuildingStorefrontIcon,
  TruckIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ClockIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Dummy data (replace with actual API calls in production)
const supplierOverview = {
  name: "ABC Building Materials Ltd.",
  profileImage: "/placeholder.png",
  stats: {
    totalRevenue: 254768,
    totalOrders: 128,
    pendingOrders: 24,
    activeProducts: 76,
  },
  recentOrders: [
    {
      id: "ORD-9385",
      project: "Commercial Tower A21",
      items: [
        { name: "Portland Cement", quantity: 150, unit: "bags" },
        { name: "Steel Reinforcement Bars", quantity: 80, unit: "pieces" },
      ],
      status: "pending",
      date: "2025-04-26T10:30:00",
      amount: 12840,
    },
    {
      id: "ORD-9384",
      project: "Residential Complex B7",
      items: [
        { name: "Ceramic Tiles", quantity: 2000, unit: "sq.ft" },
        { name: "PVC Pipes", quantity: 100, unit: "meters" },
      ],
      status: "completed",
      date: "2025-04-25T13:15:00",
      amount: 8650,
    },
    {
      id: "ORD-9382",
      project: "Office Building C14",
      items: [
        { name: "Glass Panels", quantity: 45, unit: "panels" },
        { name: "Insulation Material", quantity: 120, unit: "rolls" },
      ],
      status: "in_progress",
      date: "2025-04-24T09:45:00",
      amount: 16750,
    },
    {
      id: "ORD-9381",
      project: "Highway Extension P3",
      items: [
        { name: "Bitumen", quantity: 500, unit: "gallons" },
        { name: "Gravel", quantity: 20, unit: "tons" },
      ],
      status: "completed",
      date: "2025-04-24T08:20:00",
      amount: 9320,
    },
  ],
  lowStockItems: [
    { name: "Portland Cement", stock: 52, minRequired: 100 },
    { name: "Steel Reinforcement Bars", stock: 34, minRequired: 50 },
    { name: "Ceramic Tiles", stock: 230, minRequired: 500 },
    { name: "Glass Panels", stock: 8, minRequired: 20 },
  ],
  revenueByMonth: [
    { month: "Jan", amount: 18500 },
    { month: "Feb", amount: 22400 },
    { month: "Mar", amount: 21300 },
    { month: "Apr", amount: 24800 },
  ],
  topProducts: [
    { name: "Portland Cement", sales: 2450, growth: 12 },
    { name: "Steel Reinforcement Bars", sales: 1980, growth: -3 },
    { name: "Ceramic Tiles", sales: 1740, growth: 8 },
    { name: "Glass Panels", sales: 1520, growth: 15 },
  ],
};

const SupplierDashboard = () => {
  const [timeframe, setTimeframe] = useState("month");

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-500/20",
          text: "text-amber-400",
          label: "Pending",
        };
      case "in_progress":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-400",
          label: "In Progress",
        };
      case "completed":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          label: "Completed",
        };
      case "cancelled":
        return {
          bg: "bg-red-500/20",
          text: "text-red-400",
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-gray-500/20",
          text: "text-gray-400",
          label: status,
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 p-6"
    >
      {/* Supplier Profile Overview */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 rounded-xl bg-gray-700/50 flex items-center justify-center overflow-hidden">
            <BuildingStorefrontIcon className="h-12 w-12 text-orange-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">
              {supplierOverview.name}
            </h1>
            <p className="text-gray-400 mt-1">
              Supplier of construction materials and equipment
            </p>
            <div className="flex flex-wrap mt-3 gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Verified Supplier
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Top Rated
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                Premium Partner
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
              Add Products
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              View Store
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <CurrencyDollarIcon className="h-5 w-5 text-orange-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatCurrency(supplierOverview.stats.totalRevenue)}
          </h3>
          <p className="text-sm text-gray-400">Total Revenue</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShoppingBagIcon className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {supplierOverview.stats.totalOrders}
          </h3>
          <p className="text-sm text-gray-400">Total Orders</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <ClockIcon className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {supplierOverview.stats.pendingOrders}
          </h3>
          <p className="text-sm text-gray-400">Pending Orders</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <BuildingStorefrontIcon className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {supplierOverview.stats.activeProducts}
          </h3>
          <p className="text-sm text-gray-400">Active Products</p>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <TruckIcon className="h-5 w-5 text-blue-400" />
              Recent Orders
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              View All <ChevronRightIcon className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-3 text-left text-sm font-medium text-gray-400">
                    Order ID
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400">
                    Project
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400">
                    Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400">
                    Amount
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {supplierOverview.recentOrders.map((order) => {
                  const status = getStatusStyle(order.status);
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-3 text-sm font-medium text-white">
                        {order.id}
                      </td>
                      <td className="py-3 text-sm text-gray-300">
                        {order.project}
                      </td>
                      <td className="py-3 text-sm text-gray-300">
                        {formatDate(order.date)}
                      </td>
                      <td className="py-3 text-sm text-gray-300">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <XCircleIcon className="h-5 w-5 text-red-400" />
              Low Stock Alert
            </h3>
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-sm">
              {supplierOverview.lowStockItems.length} items
            </span>
          </div>

          <div className="space-y-4">
            {supplierOverview.lowStockItems.map((item, index) => {
              const stockPercentage = (item.stock / item.minRequired) * 100;

              return (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg p-3 border border-gray-700 hover:border-red-500/30 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <span className="text-xs text-red-400">Low Stock</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>Current: {item.stock} units</span>
                    <span>Min: {item.minRequired} units</span>
                  </div>
                  <div className="mt-2 relative h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full ${
                        stockPercentage < 30 ? "bg-red-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}

            <button className="w-full mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <PlusIcon className="h-4 w-4" />
              Restock Items
            </button>
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-purple-400" />
            Top Products
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeframe("week")}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeframe === "week"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe("month")}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeframe === "month"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe("year")}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeframe === "year"
                  ? "bg-purple-500/20 text-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Year
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supplierOverview.topProducts.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-700/30 rounded-lg p-4 border border-gray-700 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white font-medium">{product.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    {formatCurrency(product.sales)} in sales
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    product.growth > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {product.growth > 0 ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {Math.abs(product.growth)}%
                  </span>
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${(product.sales / 3000) * 100}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    
    

   
    </motion.div>
  );
};

export default SupplierDashboard;
