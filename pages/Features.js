import { motion } from "framer-motion";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <>
      <Head>
        <title>TodoApp | Features & Roadmap</title>
      </Head>

      <Navbar />

      <main className="bg-white ">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white -z-10">
          <div className="container mx-auto px-6 text-center z-0">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-light mb-8"
            >
              <span className="block">Simple.</span>
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powerful.
              </span>
              <span className="block mt-2 text-xl text-gray-600">
                Everything you need in a todo app
              </span>
            </motion.h1>
          </div>
        </section>

        {/* Text Content Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              transition={{ type: "spring" }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Streamline Your Productivity
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                TodoApp is designed to help you focus on what truly matters. Our
                free version lets you manage{" "}
                <span className="font-medium text-blue-600">
                  up to 20 daily tasks
                </span>{" "}
                with basic features that cover most personal productivity needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 20 }}
              whileInView={{ x: 0 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Current Features
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Task creation with due dates and priorities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Cross-device sync across 2 devices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Basic task categorization with tags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Simple reminder notifications</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Coming Soon (Premium)
              </h3>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3">◌</span>
                    <span>Unlimited tasks and projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3">◌</span>
                    <span>Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3">◌</span>
                    <span>Team collaboration features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3">◌</span>
                    <span>Location-based reminders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-3">◌</span>
                    <span>Custom themes and dark mode</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-purple-600">
                  * Premium features are under active development
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-gray-500 mb-6">
                Have suggestions? We'd love to hear from you!
              </p>
              <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
                Contact Us
              </button>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
