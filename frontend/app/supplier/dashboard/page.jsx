"use client";

import {
  BuildingStorefrontIcon,
  ChevronRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  TruckIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";


import LoadingScreen from "@/components/LoadingScreen";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

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



const SupplierDashboard = () => {

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR("/supplier/dashboard", fetcher);

  
  if (isLoading) {
    return (
     <LoadingScreen/>
    );
  }



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
            {data?.store?.stores[0]?.image ? (
              <Image src={data?.store?.stores[0]?.image}
              alt="Store Image"
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-xl"
              
              
              />
            ) : (
              <BuildingStorefrontIcon className="h-12 w-12 text-orange-400" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">
              {data?.store?.stores[0]?.name}
            </h1>
            <p className="text-gray-400 mt-1">
              {data?.store?.stores[0]?.description
                ? data?.store?.stores[0].description
                : "Supplier of construction materials and equipment"}
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
            <Link
              href={"/supplier/products"}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Add Products
            </Link>
            <Link
              href={"/supplier/store"}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              View Store
            </Link>
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
            {formatCurrency(data?.totalRevenue)}
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
            {data?.totalOrders}
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
            {data?.pendingOrders}
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
            {data?.activeProducts}
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
                  <th className="pb-3  text-left text-sm font-medium text-gray-400">
                    Order ID
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
                {data?.data?.map((order) => {
                  const status = getStatusStyle(order?.status);
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-3  text-sm font-medium text-white">
                        {order.id}
                      </td>

                      <td className="py-3 text-sm text-gray-300">
                        {formatDate(order?.createdAt)}
                      </td>
                      <td className="py-3 text-sm text-gray-300">
                        {formatCurrency(order?.totalPrice)}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                        >
                          {status?.label}
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
           
          </div>

          <div className="space-y-4">
            {data?.products?.map((item, index) => {
              const stockPercentage = (item.stock / item.minStock) * 100;

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
                    <span>Min: {item.minStock} units</span>
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
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SupplierDashboard;
