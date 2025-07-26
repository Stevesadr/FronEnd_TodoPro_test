import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { POST } from "./api/postWithOutToken";
import { useAuth } from "../context/AuthContext";

export default function EmailVerification() {
  const router = useRouter();
  const { email } = router.query; // Get email from URL query
  const { login } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    verificationCode: Yup.string()
      .required("Verification code is required")
      .length(6, "Code must be 6 digits")
      .matches(/^\d+$/, "Code must contain only numbers"),
  });

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      setIsSubmitting(true);

      try {
        // Send code and email to backend
        const response = await POST("auth/verify", {
          code: values.verificationCode,
          email: email,
        });

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        const data = await response.json();

        // Save token and user info
        await login(data.token, {
          email: email,
          isVerified: true,
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Verification error:", error);
        setServerError(
          error.message || "Verification failed. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Email Verification | TodoPro</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <h1 className="text-3xl font-bold text-white">
                Email Verification
              </h1>
              <p className="mt-2 text-blue-100">
                Verification code sent to {email}
              </p>
            </div>

            <div className="p-8">
              {serverError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {serverError}
                </div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="verificationCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    6-digit Verification Code
                  </label>
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    inputMode="numeric"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.verificationCode}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formik.touched.verificationCode &&
                      formik.errors.verificationCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="------"
                    disabled={isSubmitting}
                    maxLength={6}
                  />
                  {formik.touched.verificationCode &&
                    formik.errors.verificationCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.verificationCode}
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-70"
                >
                  {isSubmitting ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
