"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  HeartIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { useParams } from "next/navigation";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);



const ProductDetail = () => {


  const params = useParams();

  const {
    data: productData,
    error,
    isLoading,
    mutate,
  } = useSWR(`marketplace/getProductByid/${params.id}`, fetcher);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(productData?.data.minOrder);
  const [activeTab, setActiveTab] = useState("description");
  const [openFaq, setOpenFaq] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);



  const reviewFileRef = useRef(null);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= productData?.data.minOrderQty) {
      setQuantity(value);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > productData?.data.minOrderQty) {
      setQuantity(quantity - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const openLightbox = (index) => {
    setLightboxImage(index);
    setIsLightboxOpen(true);
  };

  const handleReviewImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // In a real app, you would upload the files to a server
      // For this example, we'll just create object URLs
      const newImages = files.map((file) => URL.createObjectURL(file));
      setReviewForm({
        ...reviewForm,
        images: [...reviewForm.images, ...newImages],
      });
    }
  };

  const removeReviewImage = (index) => {
    setReviewForm({
      ...reviewForm,
      images: reviewForm.images.filter((_, i) => i !== index),
    });
  };

  const handleReviewSubmit = () => {
    // In a real app, you would submit the review to your backend
    console.log("Review submitted:", reviewForm);
    setIsWriteReviewOpen(false);
    setReviewForm({
      rating: 0,
      title: "",
      text: "",
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-800 py-4 border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link
              href="/marketplace"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Marketplace
            </Link>
            <ChevronRightIcon className="h-5 w-5 text-gray-600 mx-2" />
            <Link
              href="/marketplace/categories/structural-materials"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Structural Materials
            </Link>
            <ChevronRightIcon className="h-5 w-5 text-gray-600 mx-2" />
            <span className="text-white">{productData?.data.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden mb-4 group">
              <Image
                src={productData?.data.images[selectedImage] || "https://i0.wp.com/tinasbotanicals.com/wp-content/uploads/2025/01/No-Product-Image-Available.png?fit=800%2C800&ssl=1"}
                alt={productData?.data.images[selectedImage] || "image"}
                fill
                className="object-cover"
              />
              <button
                onClick={() => openLightbox(selectedImage)}
                className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ArrowsPointingOutIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productData?.data.images.map((image, index) => (
                <button
                  key={`thumb-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-transparent hover:border-gray-500"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${image} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-orange-400 mb-2">
                <Link
                  href={`/marketplace/categories/${productData?.data.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="hover:text-orange-300 transition-colors"
                >
                  {productData?.data.category}
                </Link>
                <span className="w-1 h-1 rounded-full bg-orange-500/70"></span>
                <span className="text-green-400">
                  {/* {productData.availability} */}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {productData?.data.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={`star-${i}`}
                        className={`h-5 w-5 ${
                          i < Math.floor(productData?.data.rating)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">
                    {productData?.data.rating}
                  </span>
                  {/* <Link
                    href="#reviews"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ({productData.reviewCount} reviews)
                  </Link> */}
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{productData?.data?.supplier?.store?.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {formatPrice(productData?.data.price)}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatPrice(productData?.data.price)} per{" "}
                    {productData?.data.unit}
                  </div>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BuildingOffice2Icon className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-400">Supplied by </span>
                      <Link
                        href={`/marketplace/suppliers/${productData?.data.supplier.id}`}
                        className="text-white hover:text-orange-400 transition-colors font-medium"
                      >
                        {productData?.data.supplier.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                  

                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-2">
                      Total Price
                    </div>
                    <div className="text-2xl font-bold text-white">
                      
                      Rs.  {productData?.data.price} / {productData?.data.unit}
                       
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5" />
                    Request Quote
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <button className="p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
                    <ShareIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <TruckIcon className="h-6 w-6 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">
                      Estimated Delivery
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {productData?.data.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">
                      Quality Guarantee
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {/* {productData.guarantee} */}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BuildingOffice2Icon className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Trusted Supplier</h4>
                    <p className="text-gray-400 text-sm">
                      {/* {productData?.data.supplier.name} •{" "} */}
                      {/* {productData?.data.supplier.verifiedYears} Years Verified • */}
                      <span className="text-green-400 ml-1">
                        {/* {productData.supplier.responseTime} response */}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/marketplace/suppliers/${productData?.data.supplier.id}`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                Contact supplier directly
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-800 mb-8">
            {["description", "faqs"].map((tab) => (
              <button
                key={`tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-orange-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {productData?.data.description}
                  </p>

                  <h4 className="text-lg font-semibold text-white mb-3">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                    {productData?.data.features.map((feature, index) => (
                      <li
                        key={`feature-${index}`}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-semibold text-white mb-3">
                    Applications
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                    {productData?.data.applications.map((app, index) => (
                      <li
                        key={`app-${index}`}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <CheckCircleIcon className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-semibold text-white mb-3">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {productData?.data.certifications.map((cert, index) => (
                      <div
                        key={`cert-${index}`}
                        className="bg-gray-800/60 border border-gray-700/50 rounded-full px-4 py-1.5 text-sm text-gray-300 flex items-center gap-2"
                      >
                        <CheckBadgeIcon className="h-4 w-4 text-blue-400" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-fit">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Product Details
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white">
                        {productData?.data.category}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Price per unit</span>
                      <span className="text-white">
                        {formatPrice(productData?.data.price)} per{" "}
                        {productData?.data.unit}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Min. order quantity</span>
                      <span className="text-white">
                        {productData?.data.minOrder} {productData?.data.unit}s
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Availability</span>
                      <span className="text-green-400">
                        {/* {productData.availability} */}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Delivery time</span>
                      <span className="text-white">
                        {productData?.data.estimatedDelivery}
                      </span>
                    </div>
                  </div>

                
                </div>
              </motion.div>
            )}

            

           

            {activeTab === "faqs" && (
              <motion.div
                key="faqs-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-xl p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-4">
                    {productData?.data?.faqs.map((faq, index) => (
                      <div
                        key={`faq-${index}`}
                        className={`border border-gray-700/30 rounded-xl overflow-hidden transition-colors ${
                          openFaq === index
                            ? "bg-gray-800/50"
                            : "bg-gray-800/20 hover:bg-gray-800/30"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(openFaq === index ? null : index)
                          }
                          className="w-full flex justify-between items-center p-5 text-left"
                        >
                          <span className="font-medium text-white">
                            {faq.question}
                          </span>
                          <ChevronDownIcon
                            className={`h-5 w-5 text-gray-400 transition-transform ${
                              openFaq === index ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-gray-300 border-t border-gray-700/30 pt-3">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <QuestionMarkCircleIcon className="h-10 w-10 text-orange-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-white mb-1">
                        Have more questions?
                      </h4>
                      <p className="text-gray-300">
                        Contact the supplier directly for more information about
                        this product.
                      </p>
                    </div>
                    <Link
                      href={`/marketplace/suppliers/${productData?.data.supplier.id}`}
                      className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      Contact Supplier
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Similar Products */}
        {/* <section className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-white">Similar Products</h2>
            <Link
              href="/marketplace/categories/structural-materials"
              className="text-orange-400 hover:text-orange-300 flex items-center text-sm font-medium"
            >
              View all
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productData.similarProducts.map((product, index) => (
              <motion.div
                key={`similar-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden flex flex-col"
              >
                <Link href={`/marketplace/products/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        <span className="text-white text-sm">
                          {product.rating}
                        </span>
                        <span className="text-gray-400 text-xs">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-3">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-gray-700/50 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section> */}
      </main>

      {/* Image Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="relative w-full max-w-5xl max-h-[80vh]">
              <div className="relative h-full w-full">
                <Image
                  src={productData.images[lightboxImage]}
                  alt={`${productData.name} full view`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <button
              onClick={() =>
                setLightboxImage((prev) =>
                  prev === 0 ? productData.images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>

            <button
              onClick={() =>
                setLightboxImage(
                  (prev) => (prev + 1) % productData.images.length
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {productData.images.map((_, index) => (
                <button
                  key={`lightbox-dot-${index}`}
                  onClick={() => setLightboxImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    lightboxImage === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
};

// Helper icon for review functionality
const ThumbUpIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10h3.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0114.263 21h-4.017c-.163 0-.326-.02-.485-.06L5 20V10h3.5a2 2 0 002-2V5h2a2 2 0 012 2v3zm-8 3v4"
    />
  </svg>
);

export default ProductDetail;
