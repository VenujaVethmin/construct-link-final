"use client";

import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  ClockIcon,
  FunnelIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  SparklesIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  AcademicCapIcon as AcademicCapSolid,
  BriefcaseIcon as BriefcaseSolid,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const featuredProfessionals = [
  {
    id: 1,
    name: "John Smith",
    title: "Civil Engineer",
    image: "https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=400",
    rating: 4.9,
    reviewCount: 127,
    location: "New York, NY",
    hourlyRate: "$75",
    availability: "Available Now",
    verified: true,
    yearsExperience: 8,
    skills: ["Structural Design", "Project Management", "AutoCAD"],
    languages: ["English", "Spanish"],
    completedProjects: 143,
    specialization: "Commercial Construction",
    certifications: ["PE Licensed", "PMP Certified"],
    featured: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Architecture Specialist",
    image: "https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=400",
    rating: 4.8,
    reviewCount: 95,
    location: "Los Angeles, CA",
    hourlyRate: "$85",
    availability: "Available in 2 weeks",
    verified: true,
    yearsExperience: 6,
    skills: ["3D Modeling", "Revit", "Green Building"],
    languages: ["English"],
    completedProjects: 89,
    specialization: "Sustainable Architecture",
    certifications: ["LEED AP", "AIA Member"],
    featured: true,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    title: "Project Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    rating: 4.7,
    reviewCount: 112,
    location: "Chicago, IL",
    hourlyRate: "$90",
    availability: "Available Now",
    verified: true,
    yearsExperience: 10,
    skills: ["Construction Management", "Budgeting", "Scheduling"],
    languages: ["English", "Portuguese"],
    completedProjects: 178,
    specialization: "Commercial & Residential",
    certifications: ["PMP", "CCM"],
    featured: true,
  },
  {
    id: 4,
    name: "Emily Chen",
    title: "Interior Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
    rating: 4.9,
    reviewCount: 87,
    location: "San Francisco, CA",
    hourlyRate: "$80",
    availability: "Available next week",
    verified: true,
    yearsExperience: 7,
    skills: ["Space Planning", "3D Rendering", "Material Selection"],
    languages: ["English", "Mandarin"],
    completedProjects: 92,
    specialization: "Commercial Interiors",
    certifications: ["NCIDQ Certified", "LEED GA"],
    featured: true,
  },
];

const serviceProviders = [
  ...featuredProfessionals,
  {
    id: 5,
    name: "David Wilson",
    title: "MEP Engineer",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400",
    rating: 4.6,
    reviewCount: 73,
    location: "Boston, MA",
    hourlyRate: "$70",
    availability: "Available in 3 days",
    verified: true,
    yearsExperience: 9,
    skills: ["HVAC Design", "Electrical Systems", "Plumbing"],
    languages: ["English"],
    completedProjects: 104,
    specialization: "Commercial Buildings",
    certifications: ["PE", "LEED AP"],
  },
  {
    id: 6,
    name: "Lisa Washington",
    title: "Construction Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
    rating: 4.7,
    reviewCount: 115,
    location: "Atlanta, GA",
    hourlyRate: "$95",
    availability: "Available Now",
    verified: true,
    yearsExperience: 12,
    skills: ["Team Leadership", "Risk Management", "Quality Control"],
    languages: ["English"],
    completedProjects: 167,
    specialization: "Large-scale Projects",
    certifications: ["PMP", "OSHA 30"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Project Director, BuildTech Inc.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200",
    content: "Finding qualified civil engineers used to take weeks. With ConstructLink's talent platform, we sourced a specialized structural engineer within days. The quality of professionals is outstanding.",
    rating: 5,
  },
  {
    id: 2,
    name: "Samantha Chen",
    role: "CEO, Modern Builders",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200",
    content: "The verification process for professionals on this platform gives us confidence. We've hired three project managers through ConstructLink, and each has exceeded our expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    role: "Development Manager, Urban Living",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    content: "As a residential developer, finding architects who understand our vision is crucial. The filtering system made it easy to find exactly the specialized talent we needed for our eco-friendly development.",
    rating: 4,
  },
];

const categories = [
  "Civil Engineering",
  "Architecture",
  "Project Management",
  "Interior Design",
  "MEP Engineering",
  "Site Supervision",
  "Quantity Surveying",
];

const TalentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Premium Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background image/gradient */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1887&auto=format"
            alt="Construction background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:max-w-xl pt-20 md:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-orange-500/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4"
              >
                <span className="text-orange-300 text-sm font-medium">Premium Construction Talent Network</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Elite Construction <br/>
                <span className="text-orange-500">Professionals</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-300 mb-8"
              >
                Connect with industry-leading engineers, architects, and specialized 
                construction experts to elevate your projects to new heights.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for skills or expertise..."
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                  Find Experts
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 mt-8"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden">
                      <Image 
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${10 + i}.jpg`}
                        alt="User"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-300">
                  <span className="text-white font-medium">1,200+</span> clients hired talent this week
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hidden md:block relative h-[380px] w-[380px] lg:h-[440px] lg:w-[440px] bg-gradient-to-br from-orange-500/20 to-blue-500/10 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-1 bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full -ml-20 -mb-20"></div>
                
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                      <span className="text-green-400 text-xs font-medium">12 Available Now</span>
                    </div>
                    <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                      <span className="text-orange-400 text-xs font-medium">Premium Network</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0 grid grid-cols-2 gap-4 overflow-y-auto p-1 hide-scrollbar">
                      {[...featuredProfessionals, ...serviceProviders].slice(0, 6).map((pro, index) => (
                        <div 
                          key={pro.id}
                          className="bg-gray-800/70 border border-gray-700/50 rounded-lg p-3 flex flex-col hover:border-orange-500/30 transition-colors cursor-pointer"
                          style={{
                            animationDelay: `${index * 0.2}s`,
                            animation: 'fadeInUp 0.5s ease-out forwards',
                            opacity: 0,
                            transform: 'translateY(20px)'
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden">
                              <Image 
                                src={pro.image}
                                alt={pro.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="text-white text-sm font-medium truncate">{pro.name}</h4>
                              <p className="text-orange-400 text-xs truncate">{pro.title}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-1">
                              <StarIconSolid className="h-3 w-3 text-yellow-400" />
                              <span className="text-gray-300">{pro.rating}</span>
                            </div>
                            <span className="text-gray-300 font-medium">{pro.hourlyRate}/hr</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700/30">
                    <Link
                      href="/talents/search"
                      className="flex items-center justify-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
                    >
                      View all professionals
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Premium Credentials Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-y border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">Verified Professionals</h4>
                <p className="text-gray-400 text-xs">100% identity & credential verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AcademicCapSolid className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">Elite Expertise</h4>
                <p className="text-gray-400 text-xs">Top 10% industry specialists</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BriefcaseSolid className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">Enterprise Ready</h4>
                <p className="text-gray-400 text-xs">Supporting large-scale projects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-orange-400" />
              <div>
                <h4 className="text-white text-sm font-medium">Satisfaction Guarantee</h4>
                <p className="text-gray-400 text-xs">98% client satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Professionals Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Elite Construction Professionals
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Discover our handpicked selection of industry-leading experts ready to transform your projects
              </p>
            </div>
            <Link
              href="/talents/search"
              className="text-orange-400 hover:text-orange-300 flex items-center mt-4 md:mt-0 text-sm font-medium"
            >
              View all professionals
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProfessionals.map((professional, index) => (
              <motion.div
                key={professional.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden flex flex-col group"
              >
                <div className="relative h-48">
                  <Image
                    src={professional.image}
                    alt={professional.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                  
                  {professional.featured && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium truncate">
                        {professional.name}
                      </h3>
                      {professional.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-orange-400 text-sm truncate">{professional.title}</p>
                  </div>
                </div>
                
                <div className="p-4 flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <StarIconSolid className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">{professional.rating}</span>
                      <span className="text-gray-400">({professional.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{professional.location}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-1 text-gray-400">
                        <BriefcaseIcon className="h-4 w-4" />
                        <span>{professional.yearsExperience} years</span>
                      </div>
                      <span className="text-white font-medium">
                        {professional.hourlyRate}/hr
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <ClockIcon className="h-4 w-4" />
                      <span>{professional.availability}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {professional.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 pt-0">
                  <Link
                    href={`/talents/${professional.id}`}
                    className="block w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-center rounded-lg transition-colors font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Expertise Showcase */}
      <div className="py-16 bg-gradient-to-b from-gray-900 via-gray-800/80 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="sticky top-20"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Specialized Expertise
                </h2>
                <p className="text-gray-300 mb-6">
                  Our platform connects you with industry specialists across all construction disciplines, from structural engineering to interior design.
                </p>
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 p-5 rounded-xl backdrop-blur-sm border border-orange-500/10">
                  <h3 className="text-xl font-medium text-white mb-3">Why Choose Our Experts?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">Rigorously vetted professionals with verified credentials</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">Specialized in complex, high-value construction projects</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">Proven track records with extensive portfolio examples</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm">Advanced technical skills and industry certifications</p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link 
                    href="/talents/search"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition-colors text-sm"
                  >
                    Explore all specializations
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 cursor-pointer"
                  >
                    <Link href={`/talents/search?category=${encodeURIComponent(category)}`} className="block h-full">
                      <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-orange-400 font-bold">{category.charAt(0)}</span>
                      </div>
                      <h3 className="text-white font-medium mb-2">{category}</h3>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-gray-400 text-sm">
                          {Math.floor(Math.random() * 200) + 50}+ experts
                        </p>
                        <ArrowRightIcon className="h-4 w-4 text-orange-500" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials + How it Works */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Testimonials */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-orange-500"></div>
                <h3 className="text-orange-400 font-medium">Success Stories</h3>
              </div>
              <h2 className="text-3xl font-bold text-white mb-8">
                What Our Clients Say
              </h2>
              
              <div className="relative h-[280px]">
                {testimonials.map((testimonial, index) => (
                  <AnimatePresence key={testimonial.id}>
                    {activeTestimonial === index && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
                      >
                        <div className="flex flex-col h-full">
                          <div className="mb-6">
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <StarIconSolid
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <blockquote className="relative">
                              <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-gray-700 absolute -top-4 -left-2 opacity-50" />
                              <p className="text-gray-200 text-lg italic relative z-10 pl-2">
                                "{testimonial.content}"
                              </p>
                            </blockquote>
                          </div>
                          
                          <div className="mt-auto flex items-center gap-4">
                            <div className="relative h-14 w-14 rounded-full overflow-hidden">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {testimonial.name}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
                
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-2 w-8 rounded-full transition-colors ${
                        activeTestimonial === index ? "bg-orange-500" : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* How it Works */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-8 bg-orange-500"></div>
                <h3 className="text-orange-400 font-medium">Simple Process</h3>
              </div>
              <h2 className="text-3xl font-bold text-white mb-8">
                How It Works
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Define your needs",
                    description: "Specify your project requirements and the expertise you're looking for."
                  },
                  {
                    step: "02",
                    title: "Browse elite professionals",
                    description: "Review detailed profiles, portfolios, and client reviews of our verified experts."
                  },
                  {
                    step: "03",
                    title: "Connect and collaborate",
                    description: "Engage directly with chosen professionals to discuss your project details."
                  },
                  {
                    step: "04",
                    title: "Secure top talent",
                    description: "Hire your selected expert and manage the entire project through our platform."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="text-2xl font-bold text-orange-500">{item.step}</div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/talents/search"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-colors"
                >
                  Find Your Expert Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Banner */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative py-12 px-6 md:py-16 md:px-12 text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Ready to elevate your construction project?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-300 text-lg mb-8"
              >
                Join industry leaders who trust our network of elite construction professionals to deliver exceptional results.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  href="/talents/search"
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg"
                >
                  Explore Top Talent
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 text-white font-medium rounded-lg"
                >
                  Request Custom Matching
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentsPage;