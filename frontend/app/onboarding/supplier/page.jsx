"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  MapPinIcon,
  PencilIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Product categories (not used in this form, but kept for future use)
const productCategories = [
  "Building Materials",
  "Flooring",
  "Electrical",
  "Plumbing",
  "Paint & Finish",
  "Windows & Doors",
  "Hardware",
  "Tools & Equipment",
  "Safety Equipment",
  "Insulation",
  "Roofing",
  "Lumber",
  "Concrete",
  "Masonry",
  "Landscaping",
  "HVAC",
  "Lighting",
  "Fencing",
];

const SupplierOnboardingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null); // preview URL
  const [imageUrl, setLogoFile] = useState(null); // actual file

  // Company info
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    description: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    
  });

  // Business details
  const [businessDetails, setBusinessDetails] = useState({
    type: "Manufacturer",
    serviceAreas: [],
    
  });

  // Handle company info changes
  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  // Handle business details changes
  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({ ...businessDetails, [name]: value });
  };

  // Handle logo upload
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("imageFormData", file);

      try {
        const res = await axiosInstance.post("/cloudinary/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            
          },
        });

        if (res.status === 200) {
          window.alert("Image uploaded successfully");
          setLogoFile(res.data.secure_url);
        
        } else {
          toast.error("Failed to upload image");
         
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
        
      }
    }
   
      setLogoImage(URL.createObjectURL(e.target.files[0]));
      setLogoFile(e.target.files[0]);
    
  };

  // Step navigation
  const nextStep = async () => {
    if (step === 2) {
      await handleSubmit();
    } else {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const formData = new FormData();
      // Object.entries(companyInfo).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
      // formData.append("type", businessDetails.type);
      // businessDetails.serviceAreas.forEach((area, idx) =>
      //   formData.append(`serviceAreas[${idx}]`, area)
      // );
      // if (logoFile) {
      //   formData.append("logo", logoFile);
      // }

      const res = await axiosInstance.post("/supplier/createStore", {
        ...companyInfo,
        type: businessDetails.type,
        serviceAreas: businessDetails.serviceAreas,
        image: imageUrl,
      });
      
      if(res.status === 200){
        setStep(3); 
      }

      console.log({
        ...companyInfo,
        type: businessDetails.type,
        serviceAreas: businessDetails.serviceAreas,
        image: imageUrl,
      });

   

   
    } catch (error) {
      alert("Error creating supplier profile.");
      console.error("Error creating supplier profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Service area add/remove
  const addServiceArea = () => {
    const area = businessDetails.newServiceArea.trim();
    if (area && !businessDetails.serviceAreas.includes(area)) {
      setBusinessDetails({
        ...businessDetails,
        serviceAreas: [...businessDetails.serviceAreas, area],
        newServiceArea: "",
      });
    }
  };

  const removeServiceArea = (area) => {
    setBusinessDetails({
      ...businessDetails,
      serviceAreas: businessDetails.serviceAreas.filter((a) => a !== area),
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-white">
            Create Your Supplier Profile
          </h1>
          <p className="text-gray-400 mt-1">
            Set up your company profile to start selling construction materials
            and services
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center">
          {[1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {step > stepNumber ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <div
                className={`text-xs mt-2 ${
                  step >= stepNumber ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {stepNumber === 1 && "Company Info"}
                {stepNumber === 2 && "Business Details"}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-gray-700 mt-4 mb-12 relative">
          <div
            className="absolute h-1 bg-orange-500 transition-all duration-300"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Company Information
            </h2>
            <div className="space-y-6">
              {/* Company Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Company Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-gray-700 overflow-hidden flex-shrink-0">
                      {logoImage ? (
                        <Image
                          src={logoImage}
                          width={96}
                          height={96}
                          alt="Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <PencilIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer flex items-center gap-2">
                        <CloudArrowUpIcon className="h-5 w-5" />
                        <span>Upload Logo</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="text-gray-500 text-xs mt-1">
                        Recommended: 400x400px
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Company Fields */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Company Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleCompanyInfoChange}
                  placeholder="e.g. ABC Building Materials"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Company Description <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={companyInfo.description}
                  onChange={handleCompanyInfoChange}
                  rows="4"
                  placeholder="Describe your company, specialties, and why customers should choose you..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Business Phone <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={companyInfo.phone}
                    onChange={handleCompanyInfoChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Address <span className="text-orange-500">*</span>
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    value={companyInfo.address}
                    onChange={handleCompanyInfoChange}
                    placeholder="Street Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={companyInfo.city}
                      onChange={handleCompanyInfoChange}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />

                    <input
                      type="text"
                      name="state"
                      value={companyInfo.state}
                      onChange={handleCompanyInfoChange}
                      placeholder="State/Province"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="postalCode"
                      value={companyInfo.postalCode}
                      onChange={handleCompanyInfoChange}
                      placeholder="Postal Code"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />

                   
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={nextStep}
                disabled={
                  !companyInfo.name ||
                  !companyInfo.description ||
                  !companyInfo.phone ||
                  !companyInfo.address ||
                  !companyInfo.city ||
                  !companyInfo.state ||
                  !companyInfo.postalCode
                }
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  !companyInfo.name ||
                  !companyInfo.description ||
                  !companyInfo.phone ||
                  !companyInfo.address ||
                  !companyInfo.city ||
                  !companyInfo.state ||
                  !companyInfo.postalCode 
                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                Continue
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 2 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Business Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Business Type
                </label>
                <select
                  name="type"
                  value={businessDetails.type}
                  onChange={handleBusinessDetailsChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Service Provider">Service Provider</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Service Areas <span className="text-orange-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {businessDetails.serviceAreas.map((area) => (
                    <div
                      key={area}
                      className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <MapPinIcon className="h-3 w-3" />
                      <span>{area}</span>
                      <button
                        type="button"
                        onClick={() => removeServiceArea(area)}
                      >
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add city, region, or country"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={businessDetails.newServiceArea || ""}
                    onChange={(e) =>
                      setBusinessDetails({
                        ...businessDetails,
                        newServiceArea: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addServiceArea();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addServiceArea}
                    disabled={!businessDetails.newServiceArea}
                    className={`px-4 py-2 rounded-lg ${
                      !businessDetails.newServiceArea
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    Add
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Add the regions where you can supply products or provide
                  services
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={businessDetails.serviceAreas.length === 0 || loading}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  businessDetails.serviceAreas.length === 0 || loading
                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRightIcon className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 3 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-6 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Store Created Successfully!
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Your supplier profile and store have been set up successfully. You
              can now manage your store, add more products, and start receiving
              orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/supplier/dashboard")}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/supplier/manage-store")}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Manage Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierOnboardingPage;
