/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* -------------------------------------------------------------------------
   Static data – defined once, not on every render
   --------------------------------------------------------------------- */
const INTEGRATIONS = [
  {
    name: "Google Calendar",
    logo: "📅",
    category: "Productivity",
    description: "Sync your tasks with Google Calendar events",
    status: "coming soon",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Slack",
    logo: "💬",
    category: "Communication",
    description: "Get task notifications in Slack channels",
    status: "active",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "GitHub",
    logo: "💻",
    category: "Development",
    description: "Link pull requests to your tasks",
    status: "beta",
    color: "bg-gray-100 text-gray-600",
  },
  {
    name: "Zoom",
    logo: "🎥",
    category: "Meeting",
    description: "Create tasks from meeting notes",
    status: "coming soon",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Trello",
    logo: "📌",
    category: "Project Management",
    description: "Import boards as projects",
    status: "coming soon",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Notion",
    logo: "📝",
    category: "Documentation",
    description: "Embed tasks in Notion pages",
    status: "coming soon",
    color: "bg-gray-100 text-gray-600",
  },
];

/* Derive categories automatically so new ones are picked up without code edits */
const CATEGORIES = Array.from(new Set(INTEGRATIONS.map((i) => i.category)));
const TABS = ["All", ...CATEGORIES];

/* Mapping status → badge styles */
const STATUS_STYLES = {
  active: "bg-green-100 text-green-800",
  beta: "bg-blue-100 text-blue-800",
  "coming soon": "bg-gray-100 text-gray-800",
};

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  /**
   * useMemo avoids recomputing filtering on every render unless dependencies
   * change.
   */
  const filteredIntegrations = useMemo(() => {
    if (activeTab === "All") return INTEGRATIONS;
    return INTEGRATIONS.filter((i) => i.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <Head>
        <title>Integrations | TodoApp</title>
        <meta
          name="description"
          content="Connect TodoApp with your favorite tools"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://todoapp.example.com/integrations" />
      </Head>

      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* -------------------- Hero ------------------------------------- */}
        <section className="pt-32 pb-20 text-center">
          <motion.h1
            initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
            animate={prefersReducedMotion ? false : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 select-none"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x [background-size:200%]">
              Powerful
            </span>{" "}
            Integrations
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? false : { opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Connect TodoApp with your favorite tools and supercharge your
            workflow
          </motion.p>
        </section>

        {/* -------------------- Tabs ------------------------------------- */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mb-12 overflow-x-auto pb-2"
            >
              <div
                role="tablist"
                aria-label="Integration categories"
                className="inline-flex bg-white rounded-full p-1 shadow"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                      activeTab === tab
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ---------------- Cards Grid ------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIntegrations.map((integration, i) => (
                <motion.article
                  key={integration.name}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white rounded-xl shadow border border-gray-100 hover:shadow-lg transition-shadow group"
                >
                  <div className="p-8">
                    <header className="flex items-start mb-6">
                      <div
                        className={`p-4 rounded-lg ${integration.color} mr-4 text-3xl`}
                        aria-hidden="true"
                      >
                        {integration.logo}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {integration.name}
                        </h3>
                        <span className="block mt-1 text-sm text-gray-500">
                          {integration.category}
                        </span>
                      </div>
                    </header>

                    <p className="text-gray-600 mb-6 min-h-[48px]">
                      {integration.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          STATUS_STYLES[integration.status]
                        }`}
                      >
                        {integration.status}
                      </span>

                      <motion.button
                        whileHover={
                          integration.status === "active" &&
                          !prefersReducedMotion
                            ? { scale: 1.05 }
                            : undefined
                        }
                        whileTap={
                          integration.status === "active" &&
                          !prefersReducedMotion
                            ? { scale: 0.95 }
                            : undefined
                        }
                        disabled={integration.status !== "active"}
                        className={`px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                          integration.status === "active"
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {integration.status === "active"
                          ? "Connect"
                          : integration.status}
                      </motion.button>
                    </div>
                  </div>

                  {/* soft color overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------
   Utility – gradient text animation (pure CSS)
   --------------------------------------------------------------------- */
// globals.css
// @keyframes gradient-x {
//   0% { background-position: 0% 50%; }
//   100% { background-position: 100% 50%; }
// }
// .animate-gradient-x { animation: gradient-x 4s ease-in-out infinite alternate; }
