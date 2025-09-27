"use client";

import { useState } from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import axiosInstance from "../../../lib/axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); // For field-level errors
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear field error on typing
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    setLoading(true);
    try {
      let resp=await axiosInstance.post("/auth/signup", {
        user_name: formData.name,
        user_email: formData.email,
        password: formData.password,
      });
      console.log(resp);
      router.push("/auth/login"); // Success → redirect
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (detail) {
        // If backend returns field-specific errors
        setErrors((prev) => ({ ...prev, email: detail }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left promo side */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#FDEBD0] to-[#F7D9A2] text-[#5A3E36] flex flex-col justify-center p-12">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Keep Notes
        </motion.h1>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg mb-4"
        >
          Organize your ideas, tasks, and notes in one beautiful and secure place.
        </motion.p>
      </div>

      {/* Right signup form */}
      <div className="md:w-1/2 flex items-center justify-center bg-white p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#5A3E36] text-center">
            Create your account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#D19C4F] hover:bg-[#C77B39] text-white mt-2"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#D19C4F] hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
