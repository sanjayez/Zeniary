"use client";

import React, { useState, FormEvent } from "react";
import classNames from "classnames";
import supabase from "@/utils/supabase";
import { toastError, toastSuccess, toastWarning } from "@/utils/toast";
import posthog from "posthog-js";

type EmailStatus = "idle" | "loading" | "success" | "error";

interface EmailProps {
  className?: string;
  location?: string;
}

interface WaitlistEntry {
  email: string;
  created_at: string;
}

const Email: React.FC<EmailProps> = ({ className, location = "unknown" }) => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<EmailStatus>("idle");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("loading");

    const sanitizedEmail = sanitizeEmail(email);

    if (!validateEmail(sanitizedEmail)) {
      setStatus("idle");
      toastError("Please enter a valid email address");
      return;
    }

    try {
      const { error } = await supabase.from("waitlist").insert<WaitlistEntry>([
        {
          email: sanitizedEmail,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          toastWarning("This email is already on the waitlist");
          // Don't track as a new submission if the email is already on the waitlist
        } else {
          throw error;
        }
      } else {
        // Only track successful email submissions
        posthog.capture("Email CTA Click", {
          location: location,
          page_path: window.location.pathname,
          email_domain: sanitizedEmail.split("@")[1], // Track email domain for analytics
          status: "success",
        });

        toastSuccess("Thanks! You are on the waitlist.");
        setEmail("");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toastError("Something went wrong. Please try again later.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(
        "flex flex-col md:flex-row gap-4 items-center w-full justify-center px-8 md:px-0 relative",
        className
      )}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={status === "loading"}
        className={classNames(
          "w-full max-w-lg md:max-w-md px-6 py-3 rounded",
          "bg-white/5 text-white placeholder-white/60 focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={classNames(
          "px-4 py-1 md:px-8 md:py-2 rounded font-medium text-lg",
          "transition-colors",
          status === "loading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white text-[#0A0A0A] hover:bg-white/95"
        )}
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
};

export default Email;
