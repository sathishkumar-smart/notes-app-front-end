"use client";

import { useState } from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import axiosInstance from "../../../lib/axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/**
 * LoginPage
 * - Stylish login layout
 * - Shows per-field validation errors
 * - Inline backend errors
 * - Redirects on success
 */
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" })); // clear field error on typing
    setServerError(""); // clear server error
  };

  // Validate fields before sending
  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await axiosInstance.post("/auth/login", {
        user_email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("user_details", JSON.stringify(res.data.details));

      router.push("/").then(() => window.location.reload()); // redirect on success
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.detail || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left promotional side */}
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
          Organize your thoughts, ideas, and tasks in one secure and beautiful place.
        </motion.p>
        <motion.ul
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="list-disc list-inside space-y-2"
        >
          <li>Fast and secure note-taking</li>
          <li>Rich text formatting</li>
          <li>Organized and easy to manage</li>
        </motion.ul>
      </div>

      {/* Right login form */}
      <div className="md:w-1/2 flex items-center justify-center bg-white p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#5A3E36] text-center">
            Login to Keep Notes
          </h2>

          {/* Server error */}
          {serverError && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
              {serverError}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
            {fieldErrors.email && <p className="text-red-600 text-sm">{fieldErrors.email}</p>}

            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />
            {fieldErrors.password && <p className="text-red-600 text-sm">{fieldErrors.password}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#D19C4F] hover:bg-[#C77B39] text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-[#D19C4F] hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
