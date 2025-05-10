"use client";

import { useState, useRef, useCallback } from "react";
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
  PlusIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  TagIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const AddProductPage = () => {
  const router = useRouter();
  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  const unitTypes = [
    "unit",
    "bag",
    "piece",
    "ton",
    "kg",
    "sq.ft",
    "sq.m",
    "meter",
    "liter",
    "gallon",
    "roll",
    "sheet",
    "panel",
    "bundle",
  ];

  const categories = [
    "Building Materials",
    "Structural Materials",
    "Flooring",
    "Electrical",
    "Plumbing",
    "Paint & Finish",
    "Windows & Doors",
    "Hardware",
    "Tools & Equipment",
    "Fixtures",
    "Roofing",
    "Insulation",
    "Landscaping",
    "Mechanical Equipment",
    "Renewable Energy",
    "Other",
  ];

  const availabilityOptions = [
    "In Stock",
    "Low Stock",
    "Out of Stock",
    "Made to Order",
    "Pre-Order",
    "Ships in 3 days",
    "Ships in 1 week",
    "Ships in 2 weeks",
  ];

  const [activeSection, setActiveSection] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);

  const [productForm, setProductForm] = useState({
    name: "",
    category: "Building Materials",
    price: "",
    pricePerUnit: "",
    unit: "unit",
    stock: "",
    minStock: "",
    minOrder: "1",
    availability: "In Stock",
    estimatedDelivery: "3-5 Business Days",
    shipping: "Free shipping on orders over $2,000",
    description: "",
    specifications: [],
    features: [],
    applications: [],
    certifications: [],
    faqs: [],
    image: "",
    images: [],
    status: "active",
  });

  const handleMainImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
        setProductForm({
          ...productForm,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

      if (validFiles.length < files.length) {
        toast.warning("Some images were skipped (size > 5MB)");
      }

      const newImages = validFiles.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImages).then((results) => {
        setAdditionalImages([...additionalImages, ...results]);
        setProductForm({
          ...productForm,
          images: [...additionalImages, ...results],
        });
      });
    }
  };

  const removeAdditionalImage = (index) => {
    const updatedImages = [...additionalImages];
    updatedImages.splice(index, 1);
    setAdditionalImages(updatedImages);
    setProductForm({
      ...productForm,
      images: updatedImages,
    });
  };

  const handleAddItem = (type, value) => {
    if (!value.trim()) return;

    const updatedForm = { ...productForm };

    if (type === "specifications") {
      // For specifications, we need to handle name:value pairs
      const [name, specValue] = value.split(":").map((s) => s.trim());

      if (!name || !specValue) {
        toast.warning("Please use format 'Name: Value' for specifications");
        return;
      }

      const newSpec = { name, value: specValue };
      updatedForm.specifications = [
        ...(updatedForm.specifications || []),
        newSpec,
      ];
    } else {
      // For other arrays like features, applications, etc.
      updatedForm[type] = [...(updatedForm[type] || []), value.trim()];
    }

    setProductForm(updatedForm);

    // Clear the input field
    document.getElementById(`${type}-input`).value = "";
  };

  const handleAddFAQ = () => {
    const question = document.getElementById("faq-question-input").value.trim();
    const answer = document.getElementById("faq-answer-input").value.trim();

    if (!question || !answer) {
      toast.warning("Both question and answer are required for FAQs");
      return;
    }

    const newFAQ = { question, answer };
    setProductForm({
      ...productForm,
      faqs: [...(productForm.faqs || []), newFAQ],
    });

    // Clear inputs
    document.getElementById("faq-question-input").value = "";
    document.getElementById("faq-answer-input").value = "";
  };

  const removeItem = (type, index) => {
    const updatedForm = { ...productForm };
    const updatedItems = [...updatedForm[type]];
    updatedItems.splice(index, 1);
    updatedForm[type] = updatedItems;
    setProductForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Required field validation
      if (!productForm.name || !productForm.price || !productForm.stock) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const res = await axiosInstance.post(
        "/supplier/createProduct",
        productForm
      );

      if (res.status === 201) {
        toast.success("Product added successfully!");
        // Redirect to products list after short delay
        setTimeout(() => {
          router.push("/supplier/products");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="bg-gray-800 py-4 border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                href="/supplier/products"
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
              </Link>
              <h1 className="text-2xl font-bold text-white">Add New Product</h1>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.push("/supplier/products")}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 bg-orange-500 text-white rounded-lg font-medium flex items-center gap-2 ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-orange-600"
                } transition-colors`}
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Side Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sticky top-8">
              <nav className="space-y-1">
                {[
                  { id: "basic", label: "Basic Information" },
                  { id: "details", label: "Details & Features" },
                  { id: "media", label: "Images & Media" },
                  { id: "advanced", label: "Advanced Settings" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        : "text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800/20 rounded-lg">
                <h4 className="text-white font-medium mb-2">Listing Tips</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>High-quality photos increase sales by up to 80%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>
                      Detailed specifications help buyers make decisions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>Adding FAQs reduces customer support inquiries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="col-span-12 lg:col-span-9 space-y-8">
            {/* Basic Information */}
            {activeSection === "basic" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Basic Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Product Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      placeholder="Enter a descriptive product name"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Category <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1rem",
                      }}
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Price <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          Rs.
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              price: e.target.value,
                            })
                          }
                          placeholder="0.00"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-12 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Price Per Unit (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          Rs.
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={productForm.pricePerUnit}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              pricePerUnit: e.target.value,
                            })
                          }
                          placeholder="0.00"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-12 text-white"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        If different from the main price
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Unit Type <span className="text-orange-500">*</span>
                      </label>
                      <select
                        value={productForm.unit}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            unit: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none"
                        style={{
                          backgroundImage:
                            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                        required
                      >
                        {unitTypes.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Availability Status
                      </label>
                      <select
                        value={productForm.availability}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            availability: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none"
                        style={{
                          backgroundImage:
                            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1rem",
                        }}
                      >
                        {availabilityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Current Stock <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.stock}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            stock: e.target.value,
                          })
                        }
                        placeholder="0"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Min. Stock Alert Level
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.minStock}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            minStock: e.target.value,
                          })
                        }
                        placeholder="0"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        For low stock notifications
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Min. Order Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={productForm.minOrder}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            minOrder: e.target.value,
                          })
                        }
                        placeholder="1"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Estimated Delivery
                      </label>
                      <input
                        type="text"
                        value={productForm.estimatedDelivery}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            estimatedDelivery: e.target.value,
                          })
                        }
                        placeholder="e.g. 3-5 Business Days"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Shipping Information
                      </label>
                      <input
                        type="text"
                        value={productForm.shipping}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            shipping: e.target.value,
                          })
                        }
                        placeholder="e.g. Free shipping on orders over ₹2,000"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Product Description
                    </label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Provide a detailed description of your product including material, construction, and key benefits..."
                      rows={6}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveSection("details")}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    Next: Details & Features
                  </button>
                </div>
              </div>
            )}

            {/* Details & Features */}
            {activeSection === "details" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Details & Features
                </h2>

                <div className="space-y-8">
                  {/* Specifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                      <h3 className="text-lg font-medium text-white">
                        Technical Specifications
                      </h3>
                    </div>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <p className="text-gray-300 mb-4">
                        Add specifications in Name: Value format (e.g.,
                        "Material: Steel")
                      </p>

                      <div className="flex gap-3 mb-4">
                        <input
                          id="specifications-input"
                          type="text"
                          placeholder="e.g. Material: Carbon Steel"
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddItem("specifications", e.target.value);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleAddItem(
                              "specifications",
                              document.getElementById("specifications-input")
                                .value
                            )
                          }
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {productForm.specifications?.length > 0 && (
                        <div className="bg-gray-800/60 rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Added Specifications:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {productForm.specifications.map((spec, index) => (
                              <div
                                key={`spec-${index}`}
                                className="flex items-center justify-between bg-gray-700/40 rounded-lg px-4 py-2"
                              >
                                <div className="text-white">
                                  <span className="text-gray-400">
                                    {spec.name}:{" "}
                                  </span>
                                  {spec.value}
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem("specifications", index)
                                  }
                                  className="p-1 hover:bg-gray-600 rounded-full transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      <h3 className="text-lg font-medium text-white">
                        Key Features
                      </h3>
                    </div>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <p className="text-gray-300 mb-4">
                        Highlight the main features and benefits of your product
                      </p>

                      <div className="flex gap-3 mb-4">
                        <input
                          id="features-input"
                          type="text"
                          placeholder="e.g. Rust-resistant coating"
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddItem("features", e.target.value);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleAddItem(
                              "features",
                              document.getElementById("features-input").value
                            )
                          }
                          className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {productForm.features?.length > 0 && (
                        <div className="bg-gray-800/60 rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Added Features:
                          </h4>
                          <div className="space-y-2">
                            {productForm.features.map((feature, index) => (
                              <div
                                key={`feature-${index}`}
                                className="flex items-center justify-between bg-gray-700/40 rounded-lg px-4 py-2"
                              >
                                <div className="text-white">{feature}</div>
                                <button
                                  type="button"
                                  onClick={() => removeItem("features", index)}
                                  className="p-1 hover:bg-gray-600 rounded-full transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TagIcon className="h-5 w-5 text-orange-400" />
                      <h3 className="text-lg font-medium text-white">
                        Applications
                      </h3>
                    </div>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <p className="text-gray-300 mb-4">
                        List the common uses and applications for this product
                      </p>

                      <div className="flex gap-3 mb-4">
                        <input
                          id="applications-input"
                          type="text"
                          placeholder="e.g. Commercial buildings"
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddItem("applications", e.target.value);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleAddItem(
                              "applications",
                              document.getElementById("applications-input")
                                .value
                            )
                          }
                          className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {productForm.applications?.length > 0 && (
                        <div className="bg-gray-800/60 rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Added Applications:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {productForm.applications.map(
                              (application, index) => (
                                <div
                                  key={`application-${index}`}
                                  className="inline-flex items-center bg-gray-700/40 rounded-full pl-3 pr-2 py-1.5"
                                >
                                  <span className="text-white mr-1">
                                    {application}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeItem("applications", index)
                                    }
                                    className="p-0.5 hover:bg-gray-600 rounded-full transition-colors"
                                  >
                                    <XMarkIcon className="h-4 w-4 text-gray-400" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
                      <h3 className="text-lg font-medium text-white">
                        Certifications
                      </h3>
                    </div>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <p className="text-gray-300 mb-4">
                        Add any certifications, standards or compliance
                        information
                      </p>

                      <div className="flex gap-3 mb-4">
                        <input
                          id="certifications-input"
                          type="text"
                          placeholder="e.g. ISO 9001 certified"
                          className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddItem("certifications", e.target.value);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleAddItem(
                              "certifications",
                              document.getElementById("certifications-input")
                                .value
                            )
                          }
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {productForm.certifications?.length > 0 && (
                        <div className="bg-gray-800/60 rounded-lg p-4 mt-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Added Certifications:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {productForm.certifications.map(
                              (certification, index) => (
                                <div
                                  key={`cert-${index}`}
                                  className="inline-flex items-center bg-gray-700/40 rounded-full pl-3 pr-2 py-1.5"
                                >
                                  <span className="text-white mr-1">
                                    {certification}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeItem("certifications", index)
                                    }
                                    className="p-0.5 hover:bg-gray-600 rounded-full transition-colors"
                                  >
                                    <XMarkIcon className="h-4 w-4 text-gray-400" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FAQs */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <QuestionMarkCircleIcon className="h-5 w-5 text-yellow-400" />
                      <h3 className="text-lg font-medium text-white">
                        Frequently Asked Questions
                      </h3>
                    </div>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <p className="text-gray-300 mb-4">
                        Add common questions and answers about your product
                      </p>

                      <div className="space-y-4 mb-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Question
                          </label>
                          <input
                            id="faq-question-input"
                            type="text"
                            placeholder="e.g. Does this product come with a warranty?"
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Answer
                          </label>
                          <textarea
                            id="faq-answer-input"
                            placeholder="Provide a clear and helpful answer..."
                            rows={3}
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white resize-none"
                          />
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={handleAddFAQ}
                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                          >
                            Add FAQ
                          </button>
                        </div>
                      </div>

                      {productForm.faqs?.length > 0 && (
                        <div className="bg-gray-800/60 rounded-lg p-4 mt-6">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Added FAQs:
                          </h4>
                          <div className="space-y-4">
                            {productForm.faqs.map((faq, index) => (
                              <div
                                key={`faq-${index}`}
                                className="bg-gray-700/40 rounded-lg p-4"
                              >
                                <div className="flex justify-between mb-2">
                                  <h5 className="font-medium text-white">
                                    {faq.question}
                                  </h5>
                                  <button
                                    type="button"
                                    onClick={() => removeItem("faqs", index)}
                                    className="p-1 hover:bg-gray-600 rounded-full transition-colors"
                                  >
                                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                                  </button>
                                </div>
                                <p className="text-gray-300 text-sm">
                                  {faq.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveSection("basic")}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSection("media")}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    Next: Images & Media
                  </button>
                </div>
              </div>
            )}

            {/* Images & Media */}
            {activeSection === "media" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Images & Media
                </h2>

                <div className="space-y-8">
                  {/* Main Product Image */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Main Product Image
                    </h3>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <div className="flex items-center gap-6">
                        <div
                          className="relative w-40 h-40 bg-gray-800/60 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-600"
                          onClick={() => mainImageRef.current?.click()}
                        >
                          {mainImagePreview ? (
                            <Image
                              src={mainImagePreview}
                              alt="Main product image"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <PhotoIcon className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                              <p className="text-sm text-gray-400">
                                Click to upload
                              </p>
                            </div>
                          )}
                          <input
                            ref={mainImageRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMainImageSelect}
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-2">
                            Main Product Image
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            This is the primary image customers will see in
                            search results and listings. Recommended size:
                            1000x1000px.
                          </p>
                          <button
                            type="button"
                            onClick={() => mainImageRef.current?.click()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors inline-flex items-center gap-2"
                          >
                            <PlusIcon className="h-5 w-5" />
                            {mainImagePreview ? "Change Image" : "Upload Image"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Images */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Additional Images
                    </h3>

                    <div className="bg-gray-700/20 border border-gray-700/30 rounded-xl p-5">
                      <p className="text-gray-300 mb-4">
                        Add multiple images to showcase different angles and
                        details of your product
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {additionalImages.map((image, index) => (
                          <div
                            key={`additional-img-${index}`}
                            className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 group"
                          >
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => additionalImagesRef.current?.click()}
                          className="aspect-square bg-gray-800/60 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center hover:bg-gray-700/60 transition-colors"
                        >
                          <PlusIcon className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-400">
                            Add Images
                          </span>
                          <input
                            ref={additionalImagesRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleAdditionalImagesSelect}
                          />
                        </button>
                      </div>

                      <p className="text-xs text-gray-500">
                        You can upload up to 8 additional images. Maximum size:
                        5MB per image.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveSection("details")}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSection("advanced")}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Next: Advanced Settings
                  </button>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeSection === "advanced" && (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Advanced Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Product Status
                    </label>
                    <select
                      value={productForm.status}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>\')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1rem",
                      }}
                    >
                      <option value="active">
                        Active (Visible to customers)
                      </option>
                      <option value="draft">
                        Draft (Hidden from customers)
                      </option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-700">
                  <div className="bg-green-900/20 border border-green-800/20 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          Almost Done!
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Review your product information, then click "Save
                          Product" to publish it to the marketplace.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveSection("media")}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`px-6 py-3 bg-orange-500 text-white rounded-lg font-medium flex items-center gap-2 ${
                        loading
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-orange-600"
                      } transition-colors`}
                    >
                      {loading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        "Save Product"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
