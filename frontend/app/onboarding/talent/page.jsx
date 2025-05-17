"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import axiosInstance from "@/lib/axiosInstance";

// Construction skills for selection
const constructionSkills = [
  "Project Management",
  "Structural Engineering",
  "Civil Engineering",
  "Architecture",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Plumbing",
  "HVAC",
  "AutoCAD",
  "BIM Modeling",
  "Cost Estimation",
  "Site Supervision",
  "Safety Management",
  "Quality Control",
  "Concrete Work",
  "Steel Construction",
  "Masonry",
  "Carpentry",
  "Interior Design",
  "Landscaping",
  "Sustainable Construction",
  "Green Building",
  "Contract Management",
  "Procurement",
  "Scheduling",
];

const TalentOnboardingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Basic info
  const [formData, setFormData] = useState({
    title: "",
    specialization: "",
    location: "",
    hourlyRate: "",

    about: "",
    yearsExperience: 0,
  });

  // Skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");

  // Education
  const [education, setEducation] = useState([
    { degree: "", institution: "", year: "" },
  ]);

  // Work experience
  const [experience, setExperience] = useState([
    { position: "", company: "", period: "", description: "" },
  ]);

  // Certifications
  const [certifications, setCertifications] = useState([""]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill]);
      setCustomSkill("");
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { position: "", company: "", period: "", description: "" },
    ]);
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  const handleCertificationChange = (index, value) => {
    const newCertifications = [...certifications];
    newCertifications[index] = value;
    setCertifications(newCertifications);
  };

  const addCertification = () => {
    setCertifications([...certifications, ""]);
  };

  const removeCertification = (index) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
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

    // Here you would submit all the data to your API
    try {
      const res = await axiosInstance.post("/talents/profileUpdate", {
        ...formData,
        skills: selectedSkills,
        education,
        experience,
        certifications,
        profileImage,
      });

      // console.log({
      //   ...formData,
      //   skills: selectedSkills,
      //   education,
      //   experience,
      //   certifications,
      //   profileImage,
      // }
      // )

      if (res.status === 200) {
        // Navigate to the newly created profile
        // router.push('/talents/profile');
        setStep(5); // Show success page
      }

      // Navigate to the newly created profile
      // router.push('/talents/profile');
      setStep(5); // Show success page
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-white">
            Create Your Professional Profile
          </h1>
          <p className="text-gray-400 mt-1">
            Complete your profile to showcase your expertise and start finding
            projects
          </p>
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
                {stepNumber === 1 && "Basic Info"}
                {stepNumber === 2 && "Skills"}
                {stepNumber === 3 && "Education"}
                {stepNumber === 4 && "Experience"}
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
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Basic Information
            </h2>

            <div className="space-y-6">
              {/* Profile Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-gray-700 overflow-hidden flex-shrink-0">
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          width={96}
                          height={96}
                          alt="Profile"
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
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleProfileImageChange}
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

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Professional Title{" "}
                    <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Civil Engineer"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Specialization <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g. Commercial Construction"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Location <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State/Country"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Hourly Rate (USD) <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      Rs
                    </span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      placeholder="100"
                      className="w-full pl-8 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Years of Experience{" "}
                    <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  About Me <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Share your professional background, expertise, and what makes you stand out..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                ></textarea>
                <p className="text-gray-500 text-xs mt-1">
                  {formData.about.length}/500 characters
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={nextStep}
                disabled={
                  !formData.title ||
                  !formData.specialization ||
                  !formData.location ||
                  !formData.about
                }
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  !formData.title ||
                  !formData.specialization ||
                  !formData.location ||
                  !formData.about
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

        {/* Step 2: Skills */}
        {step === 2 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Professional Skills
            </h2>

            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                Select all the skills that represent your expertise. These will
                help clients find you for relevant projects.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>{skill}</span>
                    <button onClick={() => handleSkillToggle(skill)}>
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {selectedSkills.length === 0 && (
                  <div className="text-gray-500 text-sm">
                    No skills selected yet
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Add Custom Skill
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    placeholder="e.g. Bridge Design"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={addCustomSkill}
                    disabled={!customSkill}
                    className={`px-4 py-2 rounded-lg ${
                      !customSkill
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-3">
                  Common Construction Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {constructionSkills.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
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
                onClick={nextStep}
                disabled={selectedSkills.length === 0}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  selectedSkills.length === 0
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

        {/* Step 3: Education & Certifications */}
        {step === 3 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Education & Certifications
            </h2>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Education</h3>
                <button
                  onClick={addEducation}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-sm"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  Add Education
                </button>
              </div>

              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 rounded-lg p-4 mb-4 border border-gray-600/50"
                >
                  <div className="flex justify-between">
                    <h4 className="text-white text-sm font-medium mb-3">
                      Education #{index + 1}
                    </h4>
                    {education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Degree/Certificate
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        placeholder="e.g. Bachelor of Civil Engineering"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        placeholder="e.g. University of Michigan"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">
                      Year Completed
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(index, "year", e.target.value)
                      }
                      placeholder="e.g. 2018"
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">
                  Certifications & Licenses
                </h3>
                <button
                  onClick={addCertification}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-sm"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  Add Certification
                </button>
              </div>

              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) =>
                      handleCertificationChange(index, e.target.value)
                    }
                    placeholder="e.g. PE License, PMP Certification"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                  />
                  {certifications.length > 1 && (
                    <button
                      onClick={() => removeCertification(index)}
                      className="p-2 text-gray-400 hover:text-red-400"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
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
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2"
              >
                Continue
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Work Experience */}
        {step === 4 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Work Experience
            </h2>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-300">
                  Add your relevant work experience to showcase your expertise
                  to potential clients.
                </p>
                <button
                  onClick={addExperience}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-sm whitespace-nowrap"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  Add Experience
                </button>
              </div>

              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 rounded-lg p-4 mb-6 border border-gray-600/50"
                >
                  <div className="flex justify-between">
                    <h4 className="text-white text-sm font-medium mb-3">
                      Position #{index + 1}
                    </h4>
                    {experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Position/Title
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Senior Structural Engineer"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="e.g. BuildTech Solutions"
                        className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 text-xs font-medium mb-1">
                      Time Period
                    </label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) =>
                        handleExperienceChange(index, "period", e.target.value)
                      }
                      placeholder="e.g. 2018 - Present"
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows="3"
                      placeholder="Describe your responsibilities and achievements..."
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:ring-2 focus:ring-orange-500/50 focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
              ))}
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
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
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
                    Complete Profile
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
            <h2 className="text-2xl font-bold text-white mb-4">
              Profile Created Successfully!
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Your professional profile has been set up and is now live. You can
              start exploring projects and receiving invitations from clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/talents/dashboard")}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/projects/browse")}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Browse Projects
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentOnboardingPage;
