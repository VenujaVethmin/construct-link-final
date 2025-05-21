"use client";

import axiosInstance from "@/lib/axiosInstance";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ClipboardDocumentListIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";


const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const OrderPage = () => {
  const params = useParams();
  const productId = params.id;

  const { data, error, isLoading, mutate } = useSWR(
    productId ? `/marketplace/getProductByid/${productId}` : null,
    fetcher
  );

  const [quantity, setQuantity] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [formData, setFormData] = useState({
    addressName: "",
    fullAddress: "",
    addressType: "site",
    contactPerson: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (data?.data) {
      const minQty = parseInt(data.data.minOrder) || 1;
      setQuantity(minQty);
      const defaultAddress = data.address.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddress || data.address[0] || null);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-white">Loading product details...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-red-400">Error loading product details</div>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const minOrderNumber = parseInt(data.data.minOrder) || 1;
    let newQty = quantity + change;

    if (newQty < minOrderNumber) {
      toast.error(`Minimum order quantity is ${minOrderNumber}`);
      newQty = minOrderNumber;
    }
    if (newQty > data.data.stock) {
      toast.error(`Maximum available stock is ${data.data.stock}`);
      newQty = data.data.stock;
    }

    setQuantity(newQty);
  };

  const getSubtotal = () => {
    return data.data.price * quantity;
  };

  const getShippingFee = () => {
    const subtotal = getSubtotal();
    return subtotal > 10000 ? 0 : 500;
  };

  const getTotalAmount = () => {
    return getSubtotal() + getShippingFee();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewAddress = async () => {
    if (
      !formData.addressName ||
      !formData.fullAddress ||
      !formData.contactPerson
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/marketplace/addNewAddress",
        formData
      );
      const newAddress = response.data;

      mutate({
        ...data,
        address: [...data.address, newAddress],
      });

      setSelectedAddress(newAddress);
      setIsAddingNewAddress(false);
      setIsAddressModalOpen(false);
      setFormData({
        addressName: "",
        fullAddress: "",
        addressType: "site",
        contactName: "",
        contactNumber: "",
      });
      toast.success("Address added successfully");
    } catch (error) {
      // toast.error("Failed to add address");
      console.error(error.message)
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      const orderData = {
        productId: data.data.id,
        quantity,
        projectId: selectedProject?.id || null,
        addressId: selectedAddress.id,
        paymentMethod,
        amount: getTotalAmount(),
      };

      const response = await axiosInstance.post(
        "/marketplace/placeOrder",
        orderData
      );
      setOrderNumber(response.data.orderNumber);
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/marketplace/products/${productId}`}
            className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to Products
          </Link>
        </div>

        {!orderPlaced ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h1 className="text-xl font-semibold text-white mb-4">
                  Order Details
                </h1>
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={
                        data.data.image ||
                        "https://i0.wp.com/tinasbotanicals.com/wp-content/uploads/2025/01/No-Product-Image-Available.png?fit=800%2C800&ssl=1"
                      }
                      alt={data.data.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h2 className="text-white font-medium">{data.data.name}</h2>
                    <p className="text-sm text-gray-400">
                      Category: {data.data.category}
                    </p>
                    <p className="text-sm text-gray-400">
                      Supplier: {data.data.supplier.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {data?.data?.specifications?.map((spec, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-gray-700/30 text-gray-300 rounded-full px-2 py-0.5 text-xs"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p className="mt-auto text-orange-400 font-medium">
                      Rs. {data.data.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Quantity</p>
                      <p className="text-xs text-gray-500">
                        Minimum: {data.data.minOrder || 1} | Stock:{" "}
                        {data.data.stock}
                      </p>
                    </div>
                    <div className="flex items-center bg-gray-700/50 border border-gray-600 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-white"
                        disabled={
                          quantity <= (parseInt(data.data.minOrder) || 1)
                        }
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-4 text-white font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-3 py-1.5 text-gray-400 hover:text-white"
                        disabled={quantity >= data.data.stock}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-white mb-3">
                  Assign to Project{" "}
                  <span className="text-gray-400">(Optional)</span>
                </h2>
                <div className="space-y-3">
                {data?.projects?.length === 0 ? (
  <p className="text-gray-400">
    No projects yet — head over to the dashboard
    
    to create one.
  </p>
) : (
  data.projects.map((project, idx) => (
    <div
      key={idx}
      onClick={() => setSelectedProject(project)}
      className={`cursor-pointer p-3 rounded-lg border transition-all ${
        selectedProject?.name === project.name
          ? "border-orange-500 bg-orange-500/10"
          : "border-gray-700 hover:border-gray-600"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`h-4 w-4 mr-3 rounded-full border ${
            selectedProject?.name === project.name
              ? "border-orange-500 bg-orange-500"
              : "border-gray-600"
          }`}
        />
        <h3 className="text-white font-medium">{project.name}</h3>
      </div>
    </div>
  ))
)}

                </div>
               
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-white mb-3">
                  Delivery Address
                </h2>
                {!isAddingNewAddress ? (
                  <>
                    <div className="space-y-3 mb-4">
                      {data.address.map((address) => (
                        <div
                          key={address.id}
                          onClick={() => setSelectedAddress(address)}
                          className={`cursor-pointer p-4 rounded-lg border transition-all ${
                            selectedAddress?.id === address.id
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`h-4 w-4 mt-1 mr-3 rounded-full border ${
                                selectedAddress?.id === address.id
                                  ? "border-orange-500 bg-orange-500"
                                  : "border-gray-600"
                              }`}
                            />
                            <div>
                              <h3 className="text-white font-medium">
                                {address.addressName}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {address.fullAddress}
                              </p>
                              <p className="text-sm text-gray-400">
                                Contact: {address.contactName}
                                {address.contactNumber
                                  ? `, ${address.contactNumber}`
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingNewAddress(true);
                        setIsAddressModalOpen(true);
                      }}
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
                          Address Name *
                        </label>
                        <input
                          type="text"
                          name="addressName"
                          value={formData.addressName}
                          onChange={handleInputChange}
                          placeholder="e.g. Project Site, Office"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          placeholder="Name of contact person"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">
                          Full Address *
                        </label>
                        <textarea
                          name="fullAddress"
                          value={formData.fullAddress}
                          onChange={handleInputChange}
                          placeholder="Street address, city, postal code"
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
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        onClick={() => {
                          setIsAddingNewAddress(false);
                          setIsAddressModalOpen(false);
                        }}
                        className="px-3 py-1.5 border border-gray-600 rounded-lg text-gray-300 text-sm hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNewAddress}
                        className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-white mb-3">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMethod("CASH")}
                    className={`cursor-pointer p-4 rounded-lg border transition-all ${
                      paymentMethod === "CASH"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 mr-3 rounded-full border ${
                          paymentMethod === "CASH"
                            ? "border-orange-500 bg-orange-500"
                            : "border-gray-600"
                        }`}
                      />
                      <div>
                        <h3 className="text-white font-medium">
                          Cash on Delivery
                        </h3>
                        <p className="text-sm text-gray-400">
                          Pay upon delivery
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("CREDIT_CARD")}
                    className={`cursor-pointer p-4 rounded-lg border transition-all ${
                      paymentMethod === "CREDIT_CARD"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-4 w-4 mr-3 rounded-full border ${
                          paymentMethod === "CREDIT_CARD"
                            ? "border-orange-500 bg-orange-500"
                            : "border-gray-600"
                        }`}
                      />
                      <div>
                        <h3 className="text-white font-medium">
                          Credit Card
                        </h3>
                        <p className="text-sm text-gray-400">
                          Visa / Master
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sticky top-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">
                      Rs. {getSubtotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Quantity</span>
                    <span className="text-white">
                      {quantity} {data.data.unit || "units"}
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
                  <div className="pt-3 border-t border-gray-700 flex justify-between">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-orange-400 font-bold">
                      Rs. {getTotalAmount().toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {selectedProject && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm">
                      <div className="flex items-start">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-blue-400 mr-2" />
                        <div>
                          <p className="text-blue-300 font-medium">Project:</p>
                          <p className="text-blue-200">
                            {selectedProject.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedAddress && (
                    <div className="bg-gray-700/30 rounded-lg p-3 text-sm">
                      <div className="flex items-start">
                        <TruckIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-gray-300 font-medium">
                            Delivering to:
                          </p>
                          <p className="text-gray-400">
                            {selectedAddress.addressName}
                          </p>
                          <p className="text-gray-500">
                            {selectedAddress.fullAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedAddress}
                    className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
                      selectedAddress
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                        : "bg-gray-700 cursor-not-allowed"
                    }`}
                  >
                    Place Order
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By ordering, you agree to our{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl text-white font-medium mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-300 mb-6">
              Your order has been received and is being processed. You'll
              receive a confirmation email with details soon.
            </p>
            <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
              <div className="flex items-start mb-2">
                <p className="text-gray-400 text-sm mr-2">Order Number:</p>
                <p className="text-white font-medium">
                  {orderNumber || `ORD-${Math.floor(Math.random() * 1000000)}`}
                </p>
              </div>
              <div className="flex items-start mb-2">
                <p className="text-gray-400 text-sm mr-2">Amount:</p>
                <p className="text-orange-400 font-medium">
                  Rs. {getTotalAmount().toLocaleString()}
                </p>
              </div>
              <div className="flex items-start">
                <p className="text-gray-400 text-sm mr-2">
                  Estimated Delivery:
                </p>
                <p className="text-white">3-5 Business Days</p>
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

      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Add New Address
              </h3>
              <button
                onClick={() => {
                  setIsAddressModalOpen(false);
                  setIsAddingNewAddress(false);
                }}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Address Name *
                </label>
                <input
                  type="text"
                  name="addressName"
                  value={formData.addressName}
                  onChange={handleInputChange}
                  placeholder="e.g. Project Site, Office"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Name of contact person"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Full Address *
                </label>
                <textarea
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="Street address, city, postal code"
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
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsAddressModalOpen(false);
                  setIsAddingNewAddress(false);
                }}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewAddress}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
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
