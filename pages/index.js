import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingCard from "../components/PricingCard";
import Link from "next/link";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <>
      <Head>
        <title>TodoApp | Ultimate Productivity Tool</title>
        <meta
          name="description"
          content="Minimalist todo app with powerful features"
        />
      </Head>

      <Navbar />

      <main className="min-h-[300vh] bg-gray-50">
        {/* Hero Section (Sticky) */}
        <motion.section
          style={{ opacity }}
          className="sticky top-0 h-screen flex items-center justify-center"
        >
          <div className="container mx-auto px-6 text-center -z-50">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-light mb-8"
            >
              <span className="block">Do More.</span>
              <motion.span
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              >
                Stress Less.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
            >
              Meet your new productivity partner. TodoApp combines powerful
              features with minimalist design to help you focus on what truly
              matters.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href={"./register"}
                className="bg-black text-white px-8 py-3 -z-20 rounded-full text-lg font-medium hover:bg-gray-800 transition-all"
              >
                Discover How It Works →
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        {/* Ultimate Productivity Section */}
        <section className="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDAsMTE2LDEzOSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
          />

          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Enterprise-Grade
                </span>{" "}
                Productivity
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed for professionals who demand peak performance
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Feature Header */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600" />

                  <div className="p-8">
                    <div className="flex items-start mb-6">
                      <div className={`p-3 rounded-lg ${feature.iconBg} mr-4`}>
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-6">{feature.description}</p>

                    {/* Feature Highlights */}
                    <ul className="space-y-3">
                      {feature.highlights.map((highlight, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-20 bg-gray-900 rounded-xl p-8 text-white"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "3.8x", label: "Faster Task Completion" },
                  { value: "62%", label: "Reduced Stress Levels" },
                  { value: "24/7", label: "Global Availability" },
                  { value: "99.9%", label: "Uptime Reliability" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-200 mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section (Parallax) */}
        {/* Premium Trust Indicators Section */}
        <section className="relative bg-gray-800 text-white py-28 overflow-hidden">
          {/* Animated Background Pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.05 }}
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"
          />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
                  Industry Leaders
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of top-performing teams who rely on TodoApp to
                deliver exceptional results
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-gray-700/50 rounded-xl p-8 backdrop-blur-sm border border-gray-600/20 hover:border-blue-400/30 transition-all"
                >
                  <motion.p
                    className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-purple-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-300">{stat.label}</p>
                  {stat.badge && (
                    <span className="inline-block mt-3 text-xs font-medium px-2 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-800">
                      {stat.badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Client Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-gray-700/50"
            >
              <p className="text-center text-gray-400 mb-8">
                TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
              </p>
              <div className="flex flex-wrap justify-center gap-12 opacity-80 hover:opacity-100 transition-all">
                {[
                  "TechCorp",
                  "InnoVision",
                  "DigitalHQ",
                  "NexusLabs",
                  "Vertex",
                ].map((company, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="text-2xl font-light text-gray-300"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section - Premium Version */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white z-10">
          <div className="container mx-auto px-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-4 ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
                  Pricing
                </span>{" "}
                <span className="text-gray-800">That Scales</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From solo creators to enterprise teams
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan - Modern Design */}
              <PricingCard
                name="Starter"
                price="$0"
                period="forever"
                description="Essential features to begin"
                features={[
                  "✓ Up to 5 projects",
                  "✓ Basic analytics",
                  "✓ 1GB storage",
                  "✗ Team collaboration",
                  "✗ Priority support",
                ]}
                buttonText="Get Started"
                accentColor="from-gray-400 to-gray-600"
                cardBg="bg-white"
                highlight={false}
              />

              {/* Pro Plan - Featured */}
              <PricingCard
                name="Professional"
                price="$9"
                period="per month"
                description="For growing businesses"
                features={[
                  "✓ Unlimited projects",
                  "✓ Advanced analytics",
                  "✓ 50GB storage",
                  "✓ Up to 10 team members",
                  "✓ 24/7 support",
                ]}
                buttonText="Start Free Trial"
                accentColor="from-purple-500 to-indigo-600"
                cardBg="bg-gradient-to-br from-purple-50 to-indigo-50"
                highlight={true}
                badgeText="Most Popular"
              />

              {/* Enterprise Plan - Premium */}
              <PricingCard
                name="Enterprise"
                price="$29"
                period="per month"
                description="For large organizations"
                features={[
                  "✓ Everything in Pro",
                  "✓ Custom workflows",
                  "✓ Unlimited storage",
                  "✓ Dedicated manager",
                  "✓ SLA guarantee",
                ]}
                buttonText="Contact Sales"
                accentColor="from-amber-400 to-orange-500"
                cardBg="bg-white"
                highlight={false}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-purple-900 text-white py-28">
          {/* Animated Background Elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5 }}
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-xl"
          />

          <div className="container mx-auto px-6 text-center relative ">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">
                Supercharge
              </span>{" "}
              Your Productivity?
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
            >
              Join <span className="font-semibold">12,500+ professionals</span>{" "}
              who ship their best work faster with TodoApp.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href={"./register"}
                  className="bg-white text-blue-800 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free 14-Day Trial →
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
              >
                <Link
                  href={"./login"}
                  className="border-2 border-white/30 bg-white/5 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  See How It Works
                </Link>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 text-sm text-white/70"
            >
              No credit card required • Cancel anytime
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const features = [
  {
    icon: "⚡",
    iconBg: "bg-blue-100 text-blue-600",
    title: "Lightning Workflow",
    description: "Accelerate your task management with AI-powered automation",
    highlights: [
      "Smart task prioritization",
      "One-click scheduling",
      "Cross-platform sync",
    ],
  },
  {
    icon: "🔒",
    iconBg: "bg-purple-100 text-purple-600",
    title: "Military-Grade Security",
    description: "Enterprise-level protection for your sensitive data",
    highlights: [
      "End-to-end encryption",
      "SOC 2 Type II certified",
      "Zero-knowledge architecture",
    ],
  },
  {
    icon: "🌐",
    iconBg: "bg-amber-100 text-amber-600",
    title: "Global Collaboration",
    description: "Seamlessly work across timezones and languages",
    highlights: [
      "Real-time team updates",
      "Multilingual interface",
      "24/7 customer support",
    ],
  },
];

const stats = [
  {
    value: "10M+",
    label: "Tasks Completed Daily",
    badge: "Industry Leader",
  },
  {
    value: "99.9%",
    label: "Uptime Reliability",
    badge: "Guaranteed",
  },
  {
    value: "94%",
    label: "Customer Satisfaction",
    badge: "Top Rated",
  },
  {
    value: "24/7",
    label: "Global Support",
    badge: "Multilingual",
  },
];
