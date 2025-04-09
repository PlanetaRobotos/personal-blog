"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Add all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Send the email using the server action
    const result = await sendEmail(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Email sent successfully!");
      reset(); // Clear the form fields after successful submission
    }
  };

  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in"
      >
        Hello! My name is{" "}
        <input
            type="text"
            placeholder="your name"
            {...register("name", { required: "Name is required", maxLength: 80 })}
            className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray
        focus:border-gray bg-transparent"
        />
        {errors.name && <span className="text-red-500 text-sm block mt-1">{errors.name.message}</span>}

        and I want to discuss a potential project. You can email me at
        <input
            type="email"
            placeholder="your@email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email"
              }
            })}
            className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray
          focus:border-gray bg-transparent"
        />
        {errors.email && <span className="text-red-500 text-sm block mt-1">{errors.email.message}</span>}

        or reach out to me on
        <input
            type="tel"
            placeholder="your phone"
            {...register("phone number")}
            className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray
        focus:border-gray bg-transparent"
        />

        Here are some details about my project: <br />
        <textarea
            {...register("project details", { required: "Project details are required" })}
            placeholder="My project is about..."
            rows={3}
            className="w-full outline-none border-0 p-0 mx-0 focus:ring-0 placeholder:text-lg border-b border-gray
          focus:border-gray bg-transparent"
        />
        {errors["project details"] && <span className="text-red-500 text-sm block mt-1">{errors["project details"].message}</span>}

        <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Request"}
        </button>
      </form>
  );
}