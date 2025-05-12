"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

// Product categories
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
  "Fencing"
];

const SupplierOnboardingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  
  // Company info
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    description: "",
    established: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  
  // Business details
  const [businessDetails, setBusinessDetails] = useState({
    type: "Manufacturer",
    registrationNumber: "",
    taxId: "",
    employeeCount: "1-10",
    annualRevenue: "",
    operatingHours: "",
    serviceAreas: [],
  });
  
  // Products & Services
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [products, setProducts] = useState([
    { name: "", description: "", minOrderQty: "", unit: "", price: "" }
  ]);
  
  // Shipping & Policies
  const [policies, setPolicies] = useState({
    shippingOptions: [],
    paymentMethods: [],
    returnPolicy: "",
    qualityAssurance: "",
    deliveryTimeframe: "",
    minimumOrderValue: "",
  });
  
  const [shippingOption, setShippingOption] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({ ...businessDetails, [name]: value });
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const addCustomCategory = () => {
    if (customCategory && !selectedCategories.includes(customCategory)) {
      setSelectedCategories([...selectedCategories, customCategory]);
      setCustomCategory("");
    }
  };
  
  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", description: "", minOrderQty: "", unit: "", price: "" }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };
  
  const handlePolicyChange = (e) => {
    const { name, value } = e.target;
    setPolicies({ ...policies, [name]: value });
  };
  
  const addShippingOption = () => {
    if (shippingOption && !policies.shippingOptions.includes(shippingOption)) {
      setPolicies({
        ...policies,
        shippingOptions: [...policies.shippingOptions, shippingOption]
      });
      setShippingOption("");
    }
  };
  
  const removeShippingOption = (option) => {
    setPolicies({
      ...policies,
      shippingOptions: policies.shippingOptions.filter(o => o !== option)
    });
  };
  
  const addPaymentMethod = () => {
    if (paymentMethod && !policies.paymentMethods.includes(paymentMethod)) {
      setPolicies({
        ...policies,
        paymentMethods: [...policies.paymentMethods, paymentMethod]
      });
      setPaymentMethod("");
    }
  };
  
  const removePaymentMethod = (method) => {
    setPolicies({
      ...policies,
      paymentMethods: policies.paymentMethods.filter(m => m !== method)
    });
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogoImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverImageChange = (e) => {
    if (e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // This would be replaced with an actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example API call:
      // await createSupplierProfile({
      //   companyInfo,
      //   businessDetails,
      //   categories: selectedCategories,
      //   products,
      //   policies,
      //   logoImage,
      //   coverImage
      // });
      
      setStep(5); // Show success step
    } catch (error) {
      console.error("Error creating supplier profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-white">Create Your Supplier Profile</h1>
          <p className="text-gray-400 mt-1">Set up your company profile to start selling construction materials and services</p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step > stepNumber ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <div className={`text-xs mt-2 ${step >= stepNumber ? 'text-gray-300' : 'text-gray-500'}`}>
                {stepNumber === 1 && "Company Info"}
                {stepNumber === 2 && "Business Details"}
                {stepNumber === 3 && "Products"}
                {stepNumber === 4 && "Shipping & Policies"}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-gray-700 mt-4 mb-12 relative">
          <div 
            className="absolute h-1 bg-orange-500 transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">Company Information</h2>
            
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
                      <p className="text-gray-500 text-xs mt-1">Recommended: 400x400px</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Store Banner
                  </label>
                  <div>
                    <div className="w-full h-24 rounded-lg bg-gray-700 overflow-hidden mb-2">
                      {coverImage ? (
                        <Image 
                          src={coverImage} 
                          width={300} 
                          height={100} 
                          alt="Banner" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <PencilIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <label className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer flex items-center gap-2 inline-block">
                      <CloudArrowUpIcon className="h-5 w-5" />
                      <span>Upload Banner</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleCoverImageChange}
                        accept="image/*"
                      />
                    </label>
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
                    Year Established
                  </label>
                  <input
                    type="text"
                    name="established"
                    value={companyInfo.established}
                    onChange={handleCompanyInfoChange}
                    placeholder="e.g. 2005"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="website"
                      value={companyInfo.website}
                      onChange={handleCompanyInfoChange}
                      placeholder="https://yourcompany.com"
                      className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Business Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleCompanyInfoChange}
                    placeholder="contact@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                
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
                    
                    <input
                      type="text"
                      name="country"
                      value={companyInfo.country}
                      onChange={handleCompanyInfoChange}
                      placeholder="Country"
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
                disabled={!companyInfo.name || !companyInfo.description || !companyInfo.email || !companyInfo.phone}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  !companyInfo.name || !companyInfo.description || !companyInfo.email || !companyInfo.phone
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
            <h2 className="text-xl font-semibold text-white mb-6">Business Details</h2>
            
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Registration/License Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={businessDetails.registrationNumber}
                    onChange={handleBusinessDetailsChange}
                    placeholder="Business registration number"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Tax ID/VAT Number
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={businessDetails.taxId}
                    onChange={handleBusinessDetailsChange}
                    placeholder="Tax identification number"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Number of Employees
                  </label>
                  <select
                    name="employeeCount"
                    value={businessDetails.employeeCount}
                    onChange={handleBusinessDetailsChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Annual Revenue (Optional)
                  </label>
                  <input
                    type="text"
                    name="annualRevenue"
                    value={businessDetails.annualRevenue}
                    onChange={handleBusinessDetailsChange}
                    placeholder="e.g. $1M - $5M"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Operating Hours
                </label>
                <input
                  type="text"
                  name="operatingHours"
                  value={businessDetails.operatingHours}
                  onChange={handleBusinessDetailsChange}
                  placeholder="e.g. Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
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
                      <button onClick={() => {
                        setBusinessDetails({
                          ...businessDetails,
                          serviceAreas: businessDetails.serviceAreas.filter(a => a !== area)
                        });
                      }}>
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
                    onChange={(e) => setBusinessDetails({
                      ...businessDetails,
                      newServiceArea: e.target.value
                    })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && businessDetails.newServiceArea) {
                        e.preventDefault();
                        if (!businessDetails.serviceAreas.includes(businessDetails.newServiceArea)) {
                          setBusinessDetails({
                            ...businessDetails,
                            serviceAreas: [...businessDetails.serviceAreas, businessDetails.newServiceArea],
                            newServiceArea: ""
                          });
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (businessDetails.newServiceArea && !businessDetails.serviceAreas.includes(businessDetails.newServiceArea)) {
                        setBusinessDetails({
                          ...businessDetails,
                          serviceAreas: [...businessDetails.serviceAreas, businessDetails.newServiceArea],
                          newServiceArea: ""
                        });
                      }
                    }}
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
                <p className="text-gray-500 text-xs mt-1">Add the regions where you can supply products or provide services</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={businessDetails.serviceAreas.length === 0}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  businessDetails.serviceAreas.length === 0
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
        
        {/* Step 3: Products & Categories */}
        {step === 3 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">Products & Categories</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Product Categories <span className="text-orange-500">*</span>
                </label>
                <p className="text-gray-400 text-sm mb-4">
                  Select all categories of products that your company supplies
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCategories.map((category) => (
                    <div 
                      key={category}
                      className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <span>{category}</span>
                      <button onClick={() => handleCategoryToggle(category)}>
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {selectedCategories.length === 0 && (
                    <div className="text-gray-500 text-sm">No categories selected yet</div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Add Custom Category
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="e.g. Green Building Materials"
                      className="flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      onClick={addCustomCategory}
                      disabled={!customCategory}
                      className={`px-4 py-2 rounded-lg ${
                        !customCategory
                          ? "bg-gray-600 cursor-not-allowed text-gray-300"
                          : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {productCategories.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${
                        selectedCategories.includes(category)
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Featured Products</h3>
                  <button 
                    onClick={addProduct}
                    className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-sm"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    Add Product
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  Add some of your featured products or services to showcase in your store
                </p>
                
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/50 rounded-lg p-4 mb-5 border border-gray-600/50"
                  >
                    <div className="flex justify-between mb-3">
                      <h4 className="text-white text-sm font-medium">Product #{index + 1}</h4>
                      {products.length > 1 && (
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-xs font-medium mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, "name", e.target.value)}
                          placeholder="e.g. Premium Portland Cement"
                          className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-xs font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          value={product.description}
                          onChange={(e) => handleProductChange(index, "description", e.target.value)}
                          rows="2"
                          placeholder="Brief description of the product"
                          className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">
                            Price (per unit)
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                            <input
                              type="text"
                              value={product.price}
                              onChange={(e) => handleProductChange(index, "price", e.target.value)}
                              placeholder="0.00"
                              className="w-full pl-8 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">
                            Unit
                          </label>
                          <input
                            type="text"
                            value={product.unit}
                            onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                            placeholder="e.g. bag, ton, piece"
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-xs font-medium mb-1">
                            Min. Order Qty
                          </label>
                          <input
                            type="text"
                            value={product.minOrderQty}
                            onChange={(e) => handleProductChange(index, "minOrderQty", e.target.value)}
                            placeholder="e.g. 10"
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={selectedCategories.length === 0}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  selectedCategories.length === 0
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
        
        {/* Step 4: Shipping & Policies */}
        {step === 4 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">Shipping & Business Policies</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Shipping Options
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {policies.shippingOptions.map((option) => (
                    <div 
                      key={option}
                      className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <TruckIcon className="h-3 w-3" />
                      <span>{option}</span>
                      <button onClick={() => removeShippingOption(option)}>
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shippingOption}
                    onChange={(e) => setShippingOption(e.target.value)}
                    placeholder="e.g. Standard Delivery, Express Shipping"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={addShippingOption}
                    disabled={!shippingOption}
                    className={`px-4 py-2 rounded-lg ${
                      !shippingOption
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Payment Methods
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {policies.paymentMethods.map((method) => (
                    <div 
                      key={method}
                      className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <CurrencyDollarIcon className="h-3 w-3" />
                      <span>{method}</span>
                      <button onClick={() => removePaymentMethod(method)}>
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="e.g. Credit Card, Bank Transfer"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={addPaymentMethod}
                    disabled={!paymentMethod}
                    className={`px-4 py-2 rounded-lg ${
                      !paymentMethod
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Minimum Order Value
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span>
                    <input
                      type="text"
                      name="minimumOrderValue"
                      value={policies.minimumOrderValue}
                      onChange={handlePolicyChange}
                      placeholder="e.g. 100"
                      className="w-full pl-8 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Delivery Timeframe
                  </label>
                  <input
                    type="text"
                    name="deliveryTimeframe"
                    value={policies.deliveryTimeframe}
                    onChange={handlePolicyChange}
                    placeholder="e.g. 3-5 business days"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Return Policy
                </label>
                <textarea
                  name="returnPolicy"
                  value={policies.returnPolicy}
                  onChange={handlePolicyChange}
                  rows="3"
                  placeholder="Describe your return and refund policy..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Quality Assurance
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="qualityAssurance"
                    value={policies.qualityAssurance}
                    onChange={handlePolicyChange}
                    rows="3"
                    placeholder="Describe your quality standards, certifications, and guarantees..."
                    className="w-full pl-10 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Store...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <ArrowRightIcon className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Success Step */}
        {step === 5 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-6 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Store Created Successfully!</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Your supplier profile and store have been set up successfully. You can now manage your store, add more products, and start receiving orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/suppliers/dashboard')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => router.push('/suppliers/manage-store')}
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