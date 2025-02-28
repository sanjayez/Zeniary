"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { toastError, toastSuccess } from "@/utils/toast";
import supabase from "@/utils/supabase";
import {
  SurveyConfig,
  FormData,
  FormErrors,
  ConditionalFieldsState,
  SurveySubmissionData,
} from "./surveyTypes";
import { journalingSurveyConfig } from "./surveyConfig";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import posthog from "posthog-js";

const SurveyPage = () => {
  const [surveyConfig, setSurveyConfig] = useState<SurveyConfig | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConditionalFields, setShowConditionalFields] =
    useState<ConditionalFieldsState>({
      insights_elaboration: false,
      insight_other: false,
      integrations_comment: false,
      price_other: false,
    });

  useEffect(() => {
    // Use the journaling survey configuration
    setSurveyConfig(journalingSurveyConfig);

    // Initialize form data with empty values
    const initialData: FormData = {};
    journalingSurveyConfig.fields.forEach((field) => {
      if (field.type === "checkbox") {
        initialData[field.id] = [];
      } else {
        initialData[field.id] = "";
      }
    });
    setFormData(initialData);

    // Track survey page entry
    posthog.capture("Survey Page Enter", {
      survey_id: journalingSurveyConfig.id,
      survey_name: journalingSurveyConfig.title,
    });
  }, []);

  // Update conditional field visibility when form data changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      setShowConditionalFields({
        insights_elaboration: formData.personalized_insights === "yes",
        insight_other:
          Array.isArray(formData.insight_preferences) &&
          formData.insight_preferences.includes("other"),
        integrations_comment: formData.integrations === "yes",
        price_other: formData.price_range === "other",
      });
    }
  }, [formData]);

  // Add custom scroll tracking for surveys
  useScrollDepthTracking({
    thresholds: [20, 40, 60, 80, 100],
    pageIdentifier: "survey_page",
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!surveyConfig) return false;

    surveyConfig.fields.forEach((field) => {
      // Skip validation for conditional fields that aren't shown
      if (
        (field.id === "insights_elaboration" &&
          !showConditionalFields.insights_elaboration) ||
        (field.id === "insight_other" &&
          !showConditionalFields.insight_other) ||
        (field.id === "integrations_comment" &&
          !showConditionalFields.integrations_comment) ||
        (field.id === "price_other" && !showConditionalFields.price_other)
      ) {
        return;
      }

      if (field.required) {
        if (field.type === "checkbox") {
          const selectedOptions = formData[field.id] as string[];
          if (!selectedOptions || selectedOptions.length === 0) {
            newErrors[field.id] = `Please select at least one option`;
            isValid = false;
          }
        } else if (!formData[field.id]) {
          newErrors[field.id] = `${field.label} is required`;
          isValid = false;
        }
      }

      // Email validation
      if (field.type === "email" && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id] as string)) {
          newErrors[field.id] = "Please enter a valid email address";
          isValid = false;
        }
      }

      // Price validation if "Other" is selected
      if (field.id === "price_other" && showConditionalFields.price_other) {
        if (field.required && !formData[field.id]) {
          newErrors[field.id] = "Please specify your preferred price";
          isValid = false;
        } else if (formData[field.id]) {
          const priceValue = parseFloat(
            (formData[field.id] as string).replace(/[^0-9.]/g, "")
          );
          if (isNaN(priceValue) || priceValue <= 0) {
            newErrors[field.id] = "Please enter a valid price";
            isValid = false;
          }
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const sanitizeFormData = (): FormData => {
    const sanitized: FormData = { ...formData };

    // Trim text inputs
    Object.keys(sanitized).forEach((key) => {
      if (typeof sanitized[key] === "string") {
        sanitized[key] = (sanitized[key] as string).trim();
      }
    });

    // Convert numeric strings to numbers where appropriate
    if (sanitized.privacy_importance) {
      sanitized.privacy_importance = parseInt(
        sanitized.privacy_importance as string,
        10
      );
    }

    if (sanitized.adoption_likelihood) {
      sanitized.adoption_likelihood = parseInt(
        sanitized.adoption_likelihood as string,
        10
      );
    }

    if (sanitized.price_range && sanitized.price_range !== "other") {
      sanitized.price_range = parseInt(sanitized.price_range as string, 10);
    }

    if (sanitized.price_other) {
      const priceValue = parseFloat(
        (sanitized.price_other as string).replace(/[^0-9.]/g, "")
      );
      if (!isNaN(priceValue)) {
        sanitized.price_other = priceValue;
      }
    }

    return sanitized;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      toastError("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize form data before submission
      const sanitizedData = sanitizeFormData();

      // Add metadata
      const submissionData: SurveySubmissionData = {
        ...sanitizedData,
        survey_id: surveyConfig?.id || "",
        created_at: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_size: `${window.innerWidth}x${window.innerHeight}`,
      };

      // Submit to Supabase "surveys" table
      const { error } = await supabase.from("surveys").insert([submissionData]);

      if (error) {
        console.error("Supabase error:", error);

        // Handle specific error cases
        if (error.code === "23505") {
          // Unique constraint violation (e.g., duplicate email)
          toastError(
            "You've already submitted this survey with this email address."
          );
        } else if (error.code === "23503") {
          // Foreign key constraint violation
          toastError("There was a reference error in your submission.");
        } else if (error.code === "23502") {
          // Not null violation
          toastError("Please fill in all required fields.");
        } else {
          // Generic error message
          toastError(`Error submitting survey: ${error.message}`);
        }

        throw new Error(error.message || "Error submitting survey");
      }

      // Track survey submission only after successful submission
      posthog.capture("Survey Submission", {
        survey_id: surveyConfig?.id || "",
        survey_name: surveyConfig?.title || "",
        status: "success",
      });

      // Success message
      toastSuccess(
        "Thank you for completing the survey! Your feedback is valuable to us."
      );

      // Reset form after successful submission
      if (surveyConfig) {
        const initialData: FormData = {};
        surveyConfig.fields.forEach((field) => {
          if (field.type === "checkbox") {
            initialData[field.id] = [];
          } else {
            initialData[field.id] = "";
          }
        });
        setFormData(initialData);
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (fieldId: string, value: string | string[]): void => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: "",
      }));
    }
  };

  const handleCheckboxChange = (
    fieldId: string,
    value: string,
    checked: boolean
  ): void => {
    const currentValues = [...((formData[fieldId] as string[]) || [])];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }

    handleChange(fieldId, currentValues);
  };

  // Determine if a field should be shown based on conditional logic
  const shouldShowField = (fieldId: string): boolean => {
    switch (fieldId) {
      case "insights_elaboration":
        return showConditionalFields.insights_elaboration;
      case "insight_other":
        return showConditionalFields.insight_other;
      case "integrations_comment":
        return showConditionalFields.integrations_comment;
      case "price_other":
        return showConditionalFields.price_other;
      default:
        return true;
    }
  };

  if (!surveyConfig) {
    return (
      <div className="min-h-screen bg-[#010C0A] flex items-center justify-center">
        <div className="text-white">Loading survey...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background flex pt-16 px-2 md:pt-20">
      <div className="mx-auto max-w-[1200px] py-8 px-4 sm:px-8 md:px-12 md:py-12 w-full">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {surveyConfig.title}
              </h1>
            </div>
            <p className="text-base md:text-lg text-gray-400 mb-6">
              {surveyConfig.description}
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:flex-1">
            <div className="rounded-xl md:rounded-2xl p-[1px] relative bg-gradient-to-b from-gray-800 to-transparent">
              <div className="rounded-xl md:rounded-2xl bg-gradient-to-b from-[#0F1211] to-transparent p-4 sm:p-6 md:p-8 backdrop-blur-sm">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 md:space-y-6"
                >
                  {surveyConfig.fields.map(
                    (field) =>
                      shouldShowField(field.id) && (
                        <div
                          key={field.id}
                          className="transition-all duration-300"
                        >
                          <label className="block text-sm text-gray-400 mb-1.5 md:mb-2">
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>

                          {field.type === "text" || field.type === "email" ? (
                            <input
                              type={field.type}
                              value={formData[field.id] as string}
                              onChange={(e) =>
                                handleChange(field.id, e.target.value)
                              }
                              placeholder={field.placeholder}
                              className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                            />
                          ) : field.type === "textarea" ? (
                            <textarea
                              rows={4}
                              value={formData[field.id] as string}
                              onChange={(e) =>
                                handleChange(field.id, e.target.value)
                              }
                              placeholder={field.placeholder}
                              className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 resize-none"
                            />
                          ) : field.type === "select" ? (
                            <select
                              value={formData[field.id] as string}
                              onChange={(e) =>
                                handleChange(field.id, e.target.value)
                              }
                              className="w-full bg-[#1A1D1C]/80 border border-gray-800 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-gray-600"
                            >
                              <option value="">Select an option</option>
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "radio" ? (
                            <div className="space-y-2">
                              {field.options?.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    type="radio"
                                    id={`${field.id}-${option.value}`}
                                    name={field.id}
                                    value={option.value}
                                    checked={
                                      formData[field.id] === option.value
                                    }
                                    onChange={(e) =>
                                      handleChange(field.id, e.target.value)
                                    }
                                    className="mr-2 text-green-500 focus:ring-green-500 h-4 w-4"
                                  />
                                  <label
                                    htmlFor={`${field.id}-${option.value}`}
                                    className="text-white text-sm md:text-base"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : field.type === "checkbox" ? (
                            <div className="space-y-2">
                              {field.options?.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={`${field.id}-${option.value}`}
                                    value={option.value}
                                    checked={(
                                      (formData[field.id] as string[]) || []
                                    ).includes(option.value)}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        field.id,
                                        option.value,
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2 text-green-500 focus:ring-green-500 h-4 w-4"
                                  />
                                  <label
                                    htmlFor={`${field.id}-${option.value}`}
                                    className="text-white text-sm md:text-base"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {errors[field.id] && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors[field.id]}
                            </p>
                          )}
                        </div>
                      )
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-auto px-5 py-2.5 md:px-6 md:py-3 bg-[#1A1D1C]/80 text-white text-sm md:text-base rounded-lg border border-gray-800 hover:bg-[#242827] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Survey"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurveyPage;
