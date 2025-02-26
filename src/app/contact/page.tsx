"use client";

import React, { FormEvent, useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      company: "",
      message: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", company: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <section className="min-h-screen bg-[#010C0A] flex pt-16 px-4 md:pt-20">
        <div className="mx-auto max-w-[1200px] py-8 px-12 md:py-12">
          <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-24">
            {/* Left Column */}
            <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-3 mb-4 md:gap-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#132b1c] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Contact us
                </h1>
              </div>
              <p className="text-base md:text-lg text-gray-400 mb-6">
                We are always looking for ways to improve our products and
                services. Contact us and let us know how we can help you.
              </p>
              <div className="text-gray-400">
                <p className="text-sm md:text-base">Email</p>
                <p className="text-white text-sm md:text-base">
                  support@zeniary.com
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:flex-1">
              <div className="rounded-xl md:rounded-2xl p-[1px] relative bg-gradient-to-b from-gray-800 to-transparent">
                <div className="rounded-xl md:rounded-2xl bg-gradient-to-b from-[#0F1211] to-transparent p-6 md:p-8 backdrop-blur-sm">
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5 md:space-y-6"
                  >
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 md:mb-2">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 md:mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 md:mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5 md:mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-auto px-5 py-2.5 md:px-6 md:py-3 bg-[#1A1D1C]/80 text-white text-sm md:text-base rounded-lg border border-gray-800 hover:bg-[#242827] transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
