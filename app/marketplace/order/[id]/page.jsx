"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Sample data for the order page
const products = [
  {
    id: 1,
    name: "Premium Portland Cement",
    category: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1590937276191-ce8e88f2ff71?q=80&w=800",
    supplier: {
      name: "Global Construction Supply",
      location: "New York, NY",
      verified: true,
      rating: 4.8,
    },
    specifications: ["Type I/II", "42.5 Grade", "50 KG Bag"],
    minOrder: "100 Bags",
    price: 950,
    priceFormatted: "Rs. 950/bag",
    stock: {
      available: true,
      quantity: 5000,
      unit: "bags",
    },
  },
  {
    id: 2,
    name: "Industrial Safety Helmet",
    category: "Safety Equipment",
    image:
      "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=800",
    supplier: {
      name: "Safety Pro Equipment",
      location: "Chicago, IL",
      verified: true,
      rating: 4.9,
    },
    specifications: ["ANSI Certified", "Adjustable", "Impact Resistant"],
    minOrder: "20 Units",
    price: 1450,
    priceFormatted: "Rs. 1,450/unit",
    stock: {
      available: true,
      quantity: 350,
      unit: "units",
    },
  },
];

// Sample user projects
const userProjects = [
  { id: "p1", name: "Office Tower Construction", location: "Mumbai Central" },
  { id: "p2", name: "Residential Complex Phase 2", location: "Pune East" },
  { id: "p3", name: "Highway Extension Project", location: "Nagpur" },
  { id: "p4", name: "Bridge Renovation", location: "Delhi South" },
];

// Sample user addresses
const userAddresses = [
  {
    id: 1,
    name: "Main Office",
    address: "123 Construction Avenue, Mumbai 400001",
    type: "office",
    isDefault: true,
  },
  {
    id: 2,
    name: "Site Office - Residential Project",
    address: "456 Builder Road, Pune 411001",
    type: "site",
    isDefault: false,
  },
  {
    id: 3,
    name: "Warehouse",
    address: "789 Storage Lane, Mumbai 400099",
    type: "warehouse",
    isDefault: false,
  },
];

const OrderPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    addressName: "",
    fullAddress: "",
    addressType: "site",
    contactPerson: "",
    contactPhone: "",
  });

  useEffect(() => {
    // Find the product based on URL parameter
    const foundProduct = products.find(
      (p) => p.id === parseInt(productId || "1")
    );
    if (foundProduct) {
      setProduct(foundProduct);
      // Set initial quantity based on minimum order
      const minQty = parseInt(foundProduct.minOrder.match(/\d+/)[0]) || 1;
      setQuantity(minQty);
    }

    // Set default address if available
    const defaultAddress = userAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [productId]);

  const handleQuantityChange = (change) => {
    if (!product) return;

    const minOrderNumber = parseInt(product.minOrder.match(/\d+/)[0]) || 1;
    let newQty = quantity + change;

    if (newQty < minOrderNumber) newQty = minOrderNumber;
    if (product.stock.available && newQty > product.stock.quantity) {
      newQty = product.stock.quantity;
    }

    setQuantity(newQty);
  };

  const getSubtotal = () => {
    if (!product) return 0;
    return product.price * quantity;
  };

  const getShippingFee = () => {
    // Simple calculation - could be more complex in real app
    const subtotal = getSubtotal();
    if (subtotal > 10000) return 0; // Free shipping over 10000
    return 500; // Standard shipping fee
  };

  const getTotalAmount = () => {
    return getSubtotal() + getShippingFee();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddNewAddress = () => {
    // Validate the form
    if (!formData.addressName || !formData.fullAddress) {
      // Show some validation error
      return;
    }

    // In a real app, you would save this to the backend
    const newAddress = {
      id: userAddresses.length + 1,
      name: formData.addressName,
      address: formData.fullAddress,
      type: formData.addressType,
      isDefault: false,
    };

    // This is just for demo - in a real app you'd update the global state or backend
    userAddresses.push(newAddress);
    setSelectedAddress(newAddress);
    setIsAddingNewAddress(false);
    setIsAddressModalOpen(false);
  };

  const handlePlaceOrder = () => {
    if (!product || !selectedAddress) return;

    // In a real app, you would send this data to your backend
    const orderData = {
      productId: product.id,
      quantity: quantity,
      projectId: selectedProject?.id || null,
      addressId: selectedAddress.id,
      paymentMethod: paymentMethod,
      amount: getTotalAmount(),
    };

    console.log("Placing order:", orderData);

    // Simulate order success
    setOrderPlaced(true);

    // In a real app, you would redirect to a success page or show a success message
    setTimeout(() => {
      // Redirect to order history or confirmation page
    }, 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-white">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/marketplace/products"
            className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to Products
          </Link>
        </div>

        {!orderPlaced ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column: Product summary */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <h1 className="text-xl font-semibold text-white mb-4">
                    Order Details
                  </h1>

                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-white font-medium">{product.name}</h2>
                      <p className="text-sm text-gray-400">
                        Supplier: {product.supplier.name}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {product.specifications.map((spec, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-gray-700/30 text-gray-300 rounded-full px-2 py-0.5 text-xs"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <p className="mt-auto text-orange-400 font-medium">
                        {product.priceFormatted}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-300">Quantity</p>
                        <p className="text-xs text-gray-500">
                          Minimum: {product.minOrder}
                        </p>
                      </div>
                      <div className="flex items-center bg-gray-700/50 border border-gray-600 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="px-3 py-1.5 text-gray-400 hover:text-white"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-white font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="px-3 py-1.5 text-gray-400 hover:text-white"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project selection */}
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <h2 className="text-lg font-medium text-white mb-3">
                    Assign to Project{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </h2>
                  <p className="text-sm text-gray-400 mb-3">
                    Adding this order to a project helps you track materials and
                    expenses.
                  </p>

                  <div className="space-y-2 mb-2">
                    {userProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`cursor-pointer p-3 rounded-lg border ${
                          selectedProject?.id === project.id
                            ? "border-orange-500 bg-orange-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`h-4 w-4 mt-1 mr-3 rounded-full border flex-shrink-0 ${
                              selectedProject?.id === project.id
                                ? "border-orange-500 bg-orange-500"
                                : "border-gray-600"
                            }`}
                          />
                          <div>
                            <h3 className="text-white font-medium">
                              {project.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {project.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="text-sm text-blue-400 hover:text-blue-300 mt-2 flex items-center">
                    <PlusCircleIcon className="h-4 w-4 mr-1" />
                    Create New Project
                  </button>
                </div>

                {/* Delivery address */}
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <h2 className="text-lg font-medium text-white mb-3">
                    Delivery Address
                  </h2>

                  {!isAddingNewAddress ? (
                    <>
                      <div className="space-y-2 mb-3">
                        {userAddresses.map((address) => (
                          <div
                            key={address.id}
                            onClick={() => setSelectedAddress(address)}
                            className={`cursor-pointer p-3 rounded-lg border ${
                              selectedAddress?.id === address.id
                                ? "border-orange-500 bg-orange-500/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`h-4 w-4 mt-1 mr-3 rounded-full border flex-shrink-0 ${
                                  selectedAddress?.id === address.id
                                    ? "border-orange-500 bg-orange-500"
                                    : "border-gray-600"
                                }`}
                              />
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-white font-medium">
                                    {address.name}
                                  </h3>
                                  {address.isDefault && (
                                    <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">
                                  {address.address}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setIsAddressModalOpen(true)}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                      >
                        <PlusCircleIcon className="h-4 w-4 mr-1" />
                        Add New Address
                      </button>
                    </>
                  ) : (
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">
                        Add New Address
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">
                            Address Name
                          </label>
                          <input
                            type="text"
                            name="addressName"
                            value={formData.addressName}
                            onChange={handleInputChange}
                            placeholder="e.g. Project Site, Office, Warehouse"
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">
                            Full Address
                          </label>
                          <textarea
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleInputChange}
                            placeholder="Street address, landmark, city, pin code"
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                            rows={3}
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">
                            Address Type
                          </label>
                          <select
                            name="addressType"
                            value={formData.addressType}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                          >
                            <option value="site">Project Site</option>
                            <option value="office">Office</option>
                            <option value="warehouse">Warehouse</option>
                          </select>
                        </div>

                        <div className="flex gap-2 justify-end mt-2">
                          <button
                            onClick={() => setIsAddingNewAddress(false)}
                            className="px-3 py-1.5 border border-gray-600 rounded-lg text-gray-300 text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddNewAddress}
                            className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment method */}
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <h2 className="text-lg font-medium text-white mb-3">
                    Payment Method
                  </h2>

                  <div className="space-y-2">
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`cursor-pointer p-3 rounded-lg border ${
                        paymentMethod === "cod"
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-4 w-4 mr-3 rounded-full border ${
                            paymentMethod === "cod"
                              ? "border-orange-500 bg-orange-500"
                              : "border-gray-600"
                          }`}
                        />
                        <div>
                          <h3 className="text-white font-medium">
                            Cash on Delivery
                          </h3>
                          <p className="text-sm text-gray-400">
                            Pay when your order is delivered
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("invoice")}
                      className={`cursor-pointer p-3 rounded-lg border ${
                        paymentMethod === "invoice"
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-4 w-4 mr-3 rounded-full border ${
                            paymentMethod === "invoice"
                              ? "border-orange-500 bg-orange-500"
                              : "border-gray-600"
                          }`}
                        />
                        <div>
                          <h3 className="text-white font-medium">
                            Pay by Invoice (30 days)
                          </h3>
                          <p className="text-sm text-gray-400">
                            For verified business accounts only
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: Order summary */}
              <div className="md:col-span-1">
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sticky top-6">
                  <h2 className="text-lg font-medium text-white mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">
                        Rs. {getSubtotal().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Quantity</span>
                      <span className="text-white">
                        {quantity} {product.stock.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-white">
                        {getShippingFee() === 0
                          ? "Free"
                          : `Rs. ${getShippingFee().toLocaleString()}`}
                      </span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-700 flex justify-between">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-orange-400 font-bold">
                        Rs. {getTotalAmount().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {selectedProject && (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm">
                        <div className="flex items-start mb-1">
                          <ClipboardDocumentListIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-blue-300 font-medium">
                            Will be added to project:
                          </span>
                        </div>
                        <p className="text-blue-200 pl-7">
                          {selectedProject.name}
                        </p>
                      </div>
                    )}

                    {selectedAddress && (
                      <div className="bg-gray-700/30 rounded-lg p-3 text-sm">
                        <div className="flex">
                          <TruckIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300 font-medium">
                              Delivering to:
                            </p>
                            <p className="text-gray-400 mt-1">
                              {selectedAddress.name}
                            </p>
                            <p className="text-gray-500">
                              {selectedAddress.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handlePlaceOrder}
                      disabled={!selectedAddress}
                      className={`w-full py-3 rounded-lg text-white font-medium ${
                        selectedAddress
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          : "bg-gray-700 cursor-not-allowed"
                      }`}
                    >
                      Place Order
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By placing this order, you agree to our{" "}
                      <a href="#" className="text-blue-400 hover:underline">
                        Terms and Conditions
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl text-white font-medium mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Your order has been received and will be processed shortly. A
              confirmation with order details has been sent to your email.
            </p>
            <div className="bg-gray-700/30 rounded-lg p-4 max-w-md mx-auto mb-6">
              <div className="flex items-start mb-2">
                <div className="mr-3">
                  <p className="text-gray-400 text-sm">Order Number:</p>
                </div>
                <div className="text-white font-medium">
                  ORD-{Math.floor(Math.random() * 1000000)}
                </div>
              </div>
              <div className="flex items-start mb-2">
                <div className="mr-3">
                  <p className="text-gray-400 text-sm">Amount:</p>
                </div>
                <div className="text-orange-400 font-medium">
                  Rs. {getTotalAmount().toLocaleString()}
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3">
                  <p className="text-gray-400 text-sm">Estimated Delivery:</p>
                </div>
                <div className="text-white">3-5 Business Days</div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                href="/marketplace/products"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Continue Shopping
              </Link>
              <Link
                href="/dashboard/orders"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
              >
                View My Orders
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Add New Delivery Address
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Address Name
                </label>
                <input
                  type="text"
                  name="addressName"
                  value={formData.addressName}
                  onChange={handleInputChange}
                  placeholder="e.g. Project Site, Office, Warehouse"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Name of person who will receive the delivery"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Phone number for delivery coordination"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Full Address
                </label>
                <textarea
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="Street address, landmark, city, pin code"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  rows={3}
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Address Type
                </label>
                <div className="flex space-x-3">
                  {["site", "office", "warehouse"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="addressType"
                        value={type}
                        checked={formData.addressType === type}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          formData.addressType === type
                            ? "bg-orange-500 text-white"
                            : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {type === "site"
                          ? "Project Site"
                          : type === "office"
                          ? "Office"
                          : "Warehouse"}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewAddress}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
