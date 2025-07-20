import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { POST } from "./api/postWithOutToken";

export default function Register() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState(null);

  // اعتبارسنجی فرم با Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // مدیریت فرم با Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      try {
        const response = await POST("auth/register", values);

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const data = await response.json();
        const token = data.token;

        // ذخیره توکن و اطلاعات کاربر
        await login(token, {
          username: values.username,
          email: values.email,
        });

        // ریدایرکت به داشبورد
        router.push("/emailVerification");
      } catch (error) {
        console.error("Registration error:", error);
        setServerError(
          error.message || "Registration failed. Please try again."
        );
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | TodoPro</title>
        <meta name="description" content="Create your TodoPro account" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* هدر فرم */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-white"
              >
                Create Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-blue-100"
              >
                Join TodoPro today
              </motion.p>
            </div>

            {/* بدنه فرم */}
            <div className="p-8">
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                >
                  {serverError}
                </motion.div>
              )}

              <form onSubmit={formik.handleSubmit}>
                {/* فیلد Username */}
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      className={`w-full px-4 py-3 rounded-lg border text-gray-500 ${
                        formik.touched.username && formik.errors.username
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Choose a username"
                      disabled={formik.isSubmitting}
                    />
                  </motion.div>
                  {formik.touched.username && formik.errors.username ? (
                    <motion.p
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.username}
                    </motion.p>
                  ) : null}
                </div>

                {/* فیلد Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`w-full px-4 py-3 rounded-lg border text-gray-500 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Your email address"
                      disabled={formik.isSubmitting}
                    />
                  </motion.div>
                  {formik.touched.email && formik.errors.email ? (
                    <motion.p
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.email}
                    </motion.p>
                  ) : null}
                </div>

                {/* فیلد Password */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={`w-full px-4 py-3 rounded-lg border text-gray-500 ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Create a password"
                      disabled={formik.isSubmitting}
                    />
                  </motion.div>
                  {formik.touched.password && formik.errors.password ? (
                    <motion.p
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.password}
                    </motion.p>
                  ) : null}
                </div>

                {/* دکمه Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formik.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Creating Account...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </motion.button>
              </form>

              {/* لینک‌های پایینی */}
              <div className="mt-6 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm"
                >
                  <span className="text-gray-600">
                    Already have an account?
                  </span>{" "}
                  <Link href="/login">
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      Sign in
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
