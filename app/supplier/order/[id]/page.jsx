"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  TruckIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  PhoneIcon,
  UserIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  ChatBubbleLeftEllipsisIcon,
  PrinterIcon,
  EnvelopeIcon,
  MapPinIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// Sample order data (in a real app this would come from an API)
const orderData = {
  id: "ORD123456",
  status: "pending",
  createdAt: "2025-04-28T14:30:00Z",
  customer: {
    id: "CUST789",
    name: "Rahul Sharma",
    company: "RS Builders & Contractors",
    email: "rahul@rsbuilders.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    verified: true,
    avgResponseTime: "2 hours",
    joinedDate: "March 2023",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  product: {
    id: 1,
    name: "Premium Portland Cement",
    category: "Building Materials",
    image: "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    specifications: ["Type I/II", "42.5 Grade", "50 KG Bag"],
    sku: "CEMENT-PPC-50KG",
    price: 950,
    priceFormatted: "Rs. 950/bag",
  },
  quantity: 500,
  totalAmount: 475000,
  shippingFee: 0,
  paymentMethod: "invoice",
  paymentStatus: "pending",
  shippingInfo: {
    address: {
      name: "Site Office - Residential Project",
      fullAddress: "456 Builder Road, Andheri East, Mumbai 411001",
      type: "site",
      contactPerson: "Amit Kumar",
      contactPhone: "+91 87654 32109",
    },
    estimatedDelivery: "2025-05-06T00:00:00Z",
    trackingCode: "",
  },
  project: {
    id: "p2",
    name: "Residential Complex Phase 2",
    location: "Andheri East, Mumbai",
  },
  notes: "Please deliver during working hours (9 AM - 5 PM). Call site manager before delivery.",
  history: [
    {
      timestamp: "2025-04-28T14:30:00Z",
      status: "Order placed",
      description: "Order was placed by the customer",
    },
    {
      timestamp: "2025-04-28T15:45:00Z",
      status: "Order confirmed",
      description: "Order was confirmed by the supplier",
    }
  ]
};

// Status options for the order
const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-500", description: "Order is awaiting processing" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-500", description: "Order has been confirmed" },
  { value: "processing", label: "Processing", color: "bg-purple-500", description: "Order is being processed" },
  { value: "ready", label: "Ready for Dispatch", color: "bg-teal-500", description: "Order is ready for dispatch" },
  { value: "shipped", label: "Shipped", color: "bg-indigo-500", description: "Order has been shipped" },
  { value: "delivered", label: "Delivered", color: "bg-green-500", description: "Order has been delivered" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-500", description: "Order has been cancelled" },
];

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch order data
  useEffect(() => {
    // In a real app, you would fetch the order data from an API
    setLoading(true);
    
    // Simulate API fetch
    setTimeout(() => {
      setOrder(orderData);
      setCurrentStatus(orderData.status);
      setTrackingCode(orderData.shippingInfo.trackingCode || "");
      
      // Format estimated delivery date for input field
      const estDate = orderData.shippingInfo.estimatedDelivery 
        ? new Date(orderData.shippingInfo.estimatedDelivery).toISOString().split('T')[0] 
        : "";
      setEstimatedDelivery(estDate);
      
      setLoading(false);
    }, 800);
  }, [params.id]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Status badge with color
  const StatusBadge = ({ status }) => {
    const statusObj = statusOptions.find(s => s.value === status) || statusOptions[0];
    return (
      <span className={`${statusObj.color} px-3 py-1 rounded-full text-white text-xs font-medium`}>
        {statusObj.label}
      </span>
    );
  };

  const updateOrderStatus = () => {
    if (!newStatus) return;
    
    // In a real app, you would send this update to an API
    console.log(`Updating order ${params.id} status to ${newStatus}`);
    
    // Add new status to history
    const updatedHistory = [
      ...order.history,
      {
        timestamp: new Date().toISOString(),
        status: statusOptions.find(s => s.value === newStatus)?.label || newStatus,
        description: newNote || `Order status updated to ${newStatus}`
      }
    ];
    
    // Update order object
    setOrder({
      ...order,
      status: newStatus,
      history: updatedHistory,
      shippingInfo: {
        ...order.shippingInfo,
        trackingCode: trackingCode,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery).toISOString() : order.shippingInfo.estimatedDelivery
      }
    });
    
    setCurrentStatus(newStatus);
    setIsStatusModalOpen(false);
    setIsConfirmationOpen(false);
    setNewNote("");
  };

  const handleMessageSend = () => {
    if (!message.trim()) return;
    
    // In a real app, you would send this message to an API
    console.log(`Sending message to customer: ${message}`);
    
    // Show a success toast or notification here
    setMessage("");
    setIsMessageModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="flex items-center space-x-2 text-white">
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
          <span>Loading order details...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
          <h2 className="text-xl font-medium mb-1">Order not found</h2>
          <p className="text-gray-400 mb-4">The order you're looking for doesn't exist or you don't have access to it.</p>
          <Link href="/marketplace/supplier/orders" className="text-orange-500 hover:text-orange-400">
            Return to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/marketplace/supplier/orders"
            className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to Orders
          </Link>
        </div>

        {/* Order header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Order #{order.id}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-gray-400 text-sm">
              Placed on {formatDateTime(order.createdAt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setIsMessageModalOpen(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center"
            >
              <ChatBubbleLeftEllipsisIcon className="h-4 w-4 mr-1.5" />
              Message Customer
            </button>
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm flex items-center">
              <PrinterIcon className="h-4 w-4 mr-1.5" />
              Print Invoice
            </button>
            <button 
              onClick={() => setIsStatusModalOpen(true)}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm flex items-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1.5" />
              Update Status
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column - Order details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product details */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <h2 className="text-lg font-medium text-white mb-4">Order Items</h2>
              
              <div className="flex gap-4 border-b border-gray-700 pb-4 mb-4">
                <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={order.product.image}
                    alt={order.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-white font-medium">{order.product.name}</h3>
                    <span className="text-orange-400 font-medium">
                      {order.product.priceFormatted}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">SKU: {order.product.sku}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {order.product.specifications.map((spec, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-700/30 text-gray-300 rounded-full px-2 py-0.5 text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Quantity: <span className="text-white">{order.quantity} units</span>
                    </span>
                    <span className="text-sm text-gray-400">
                      Subtotal: <span className="text-white">Rs. {order.totalAmount.toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">Rs. {order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">
                    {order.shippingFee === 0 ? "Free" : `Rs. ${order.shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 mt-2 border-t border-gray-700">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-orange-400 font-bold">
                    Rs. {(order.totalAmount + order.shippingFee).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping information */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <h2 className="text-lg font-medium text-white mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Delivery Address</h3>
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <p className="text-white font-medium">{order.shippingInfo.address.name}</p>
                    <p className="text-gray-300 text-sm mt-1">{order.shippingInfo.address.fullAddress}</p>
                    
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <p className="text-sm flex items-center gap-2 text-gray-300">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        {order.shippingInfo.address.contactPerson}
                      </p>
                      <p className="text-sm flex items-center gap-2 text-gray-300 mt-1">
                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                        {order.shippingInfo.address.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Shipping Details</h3>
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <div className="mb-2">
                      <p className="text-sm text-gray-300">Estimated Delivery:</p>
                      <p className="text-white">
                        {order.shippingInfo.estimatedDelivery ? 
                          formatDate(order.shippingInfo.estimatedDelivery) : 
                          "Not yet scheduled"}
                      </p>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm text-gray-300">Tracking Number:</p>
                      <p className="text-white">
                        {order.shippingInfo.trackingCode ? 
                          order.shippingInfo.trackingCode : 
                          "Not yet assigned"}
                      </p>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm text-gray-300">Payment Method:</p>
                      <p className="text-white capitalize">
                        {order.paymentMethod === "cod" ? "Cash on Delivery" : 
                         order.paymentMethod === "invoice" ? "Invoice (30 days)" : 
                         order.paymentMethod}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-300">Payment Status:</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        order.paymentStatus === "paid" ? "bg-green-500/20 text-green-400" :
                        order.paymentStatus === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {order.paymentStatus === "paid" ? "Paid" :
                         order.paymentStatus === "pending" ? "Pending" :
                         "Failed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {order.notes && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h3 className="text-sm text-gray-400 mb-2">Special Instructions</h3>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-white">
                    {order.notes}
                  </div>
                </div>
              )}
              
              {order.project && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h3 className="text-sm text-gray-400 mb-2">Associated Project</h3>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start">
                      <ClipboardDocumentListIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-blue-300 font-medium">{order.project.name}</p>
                        <p className="text-blue-400 text-sm">{order.project.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order History Timeline */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <h2 className="text-lg font-medium text-white mb-4">Order Timeline</h2>
              
              <div className="space-y-4">
                {order.history.map((event, index) => (
                  <div key={index} className="relative pl-6">
                    {/* Timeline connector */}
                    {index !== order.history.length - 1 && (
                      <div className="absolute top-4 bottom-0 left-2.5 w-0.5 bg-gray-700"></div>
                    )}
                    
                    {/* Status dot */}
                    <div className="absolute top-1 left-0 w-5 h-5 rounded-full bg-gray-800 border-2 border-blue-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    
                    <div>
                      <p className="text-white font-medium">{event.status}</p>
                      <p className="text-sm text-gray-400">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDateTime(event.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Customer details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer info */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sticky top-6">
              <h2 className="text-lg font-medium text-white mb-4">Customer Information</h2>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image 
                    src={order.customer.profileImage} 
                    alt={order.customer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium flex items-center">
                    {order.customer.name}
                    {order.customer.verified && (
                      <span className="ml-1.5 bg-blue-500 text-xs text-white px-1.5 py-0.5 rounded-full">Verified</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-400">{order.customer.company}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{order.customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <PhoneIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">{order.customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">{order.customer.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-400">Customer Since</p>
                    <p className="text-white">{order.customer.joinedDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Link 
                  href={`/marketplace/supplier/customers/${order.customer.id}`}
                  className="text-orange-500 hover:text-orange-400 text-sm"
                >
                  View Customer Profile
                </Link>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <h2 className="text-lg font-medium text-white mb-3">Quick Actions</h2>
              
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setNewStatus("confirmed");
                    setIsConfirmationOpen(true);
                  }}
                  disabled={order.status !== "pending"}
                  className={`w-full py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 ${
                    order.status === "pending" 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <CheckIcon className="h-4 w-4" />
                  Confirm Order
                </button>
                
                <button 
                  onClick={() => {
                    setNewStatus("shipped");
                    setIsConfirmationOpen(true);
                  }}
                  disabled={!["confirmed", "processing", "ready"].includes(order.status)}
                  className={`w-full py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 ${
                    ["confirmed", "processing", "ready"].includes(order.status)
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <TruckIcon className="h-4 w-4" />
                  Mark as Shipped
                </button>
                
                <button 
                  onClick={() => {
                    setNewStatus("delivered");
                    setIsConfirmationOpen(true);
                  }}
                  disabled={order.status !== "shipped"}
                  className={`w-full py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 ${
                    order.status === "shipped"
                      ? "bg-teal-600 hover:bg-teal-700 text-white" 
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Mark as Delivered
                </button>
                
                <button 
                  onClick={() => {
                    setNewStatus("cancelled");
                    setIsConfirmationOpen(true);
                  }}
                  disabled={["delivered", "cancelled"].includes(order.status)}
                  className={`w-full py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 ${
                    !["delivered", "cancelled"].includes(order.status)
                      ? "bg-red-600 hover:bg-red-700 text-white" 
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  Cancel Order
                </button>
                
                <button 
                  onClick={() => {
                    setIsStatusModalOpen(true);
                  }}
                  className="w-full py-2 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center gap-1.5"
                >
                  <DocumentTextIcon className="h-4 w-4" />
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Update Order Status
              </h3>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Order Status
                </label>
                <select
                  value={newStatus || currentStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Tracking Number (optional)
                </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Estimated Delivery Date (optional)
                </label>
                <input
                  type="date"
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Note (optional)
                </label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note about this status update"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  rows={3}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsConfirmationOpen(true);
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 w-full max-w-md">
            <div className="text-center mb-4">
              <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-white">
                Confirm Status Update
              </h3>
              <p className="text-gray-400 mt-2">
                Are you sure you want to update the order status to "
                {statusOptions.find(s => s.value === (newStatus || currentStatus))?.label}"? 
                This action will notify the customer.
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateOrderStatus}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Message to Customer
              </h3>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-2">
              <p className="text-gray-400 text-sm">To: {order.customer.name} ({order.customer.email})</p>
              <p className="text-gray-400 text-sm">About: Order #{order.id}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  rows={6}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleMessageSend}
                disabled={!message.trim()}
                className={`px-4 py-2 rounded-lg ${
                  message.trim() 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;