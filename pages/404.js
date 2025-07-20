import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found | TodoApp</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist"
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-6 py-24 md:py-32 text-center relative z-10">
            {/* Animated 404 Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-9xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                404
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto max-w-xs mt-4"
              />
            </motion.div>

            {/* Message */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Oops!
              </span>{" "}
              Page Not Found
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
            >
              The page you're looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Return Home
                </motion.button>
              </Link>

              <Link href="/contact" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-500/30 bg-white/50 px-8 py-4 rounded-full text-lg font-medium text-blue-600 hover:bg-white transition-all backdrop-blur-sm"
                >
                  Contact Support
                </motion.button>
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-400/20 blur-xl -z-10"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple-400/20 blur-xl -z-10"
            />
          </div>
        </section>

        {/* Features Section (Reused from Homepage) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">
              Maybe you were looking for...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Task Management",
                  description: "Powerful tools to organize your work",
                  link: "/features/tasks",
                  icon: "✅",
                  color: "from-blue-400 to-blue-600",
                },
                {
                  title: "Productivity Analytics",
                  description: "Track and improve your performance",
                  link: "/features/analytics",
                  icon: "📊",
                  color: "from-purple-400 to-purple-600",
                },
                {
                  title: "Team Collaboration",
                  description: "Work seamlessly with your team",
                  link: "/features/team",
                  icon: "👥",
                  color: "from-amber-400 to-amber-600",
                },
              ].map((item, index) => (
                <Link href={item.link} key={index} passHref>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div
                      className={`text-4xl mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
