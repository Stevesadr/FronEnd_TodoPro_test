import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { POST } from "./api/postWithOutToken";
import { useAuth } from "../context/AuthContext";

export default function EmailVerification() {
  const router = useRouter();
  const { user } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // اعتبارسنجی فرم با Yup
  const validationSchema = Yup.object({
    verificationCode: Yup.string()
      .required("Verification code is required")
      .length(6, "Code must be 6 digits")
      .matches(/^\d+$/, "Code must contain only numbers"),
  });

  // مدیریت فرم با Formik
  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      try {
        const response = await POST("auth/verify-email", {
          email: user?.email,
          code: values.verificationCode,
        });

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        // ریدایرکت به داشبورد پس از تأیید موفق
        // router.push("/dashboard");
      } catch (error) {
        console.error("Verification error:", error);
        setServerError(
          error.message || "Verification failed. Please try again."
        );
      }
    },
  });

  // تابع برای ارسال مجدد کد
  const handleResendCode = async () => {
    try {
      const response = await POST("auth/resend-verification", {
        email: user?.email,
      });

      if (!response.ok) {
        throw new Error("Failed to resend code");
      }

      setServerSuccess("Verification code has been resent to your email");
      setCountdown(60);
      setIsResendDisabled(true);
    } catch (error) {
      console.error("Resend error:", error);
      setServerError(
        error.message || "Failed to resend code. Please try again."
      );
    }
  };

  // تایمر برای دکمه ارسال مجدد
  useEffect(() => {
    let timer;
    if (countdown > 0 && isResendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  return (
    <>
      <Head>
        <title>Email Verification | TodoPro</title>
        <meta name="description" content="Verify your TodoPro account" />
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
                Verify Your Email
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-blue-100"
              >
                We sent a code to your email
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

              {serverSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm"
                >
                  {serverSuccess}
                </motion.div>
              )}

              <div className="mb-6 text-center">
                <p className="text-gray-600 mb-4">
                  We've sent a 6-digit verification code to{" "}
                  <span className="font-semibold">{user?.email}</span>
                </p>
              </div>

              <form onSubmit={formik.handleSubmit}>
                {/* فیلد Verification Code */}
                <div className="mb-4">
                  <label
                    htmlFor="verificationCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Verification Code
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      inputMode="numeric"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.verificationCode}
                      className={`w-full px-4 py-3 rounded-lg border text-gray-500 ${
                        formik.touched.verificationCode &&
                        formik.errors.verificationCode
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Enter 6-digit code"
                      disabled={formik.isSubmitting}
                    />
                  </motion.div>
                  {formik.touched.verificationCode &&
                  formik.errors.verificationCode ? (
                    <motion.p
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.verificationCode}
                    </motion.p>
                  ) : null}
                </div>

                {/* دکمه Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed mb-4"
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
                      Verifying...
                    </span>
                  ) : (
                    "Verify Email"
                  )}
                </motion.button>

                {/* دکمه ارسال مجدد */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResendDisabled || formik.isSubmitting}
                    className={`text-blue-600 hover:text-blue-800 text-sm font-medium ${
                      isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isResendDisabled
                      ? `Resend code in ${countdown}s`
                      : "Resend code"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
