import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Navbar from "../components/Navbar";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";
import images from "../public/image/photo_2025-07-25 20.49.07.jpeg";
import Image from "next/image";

export default function PricingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <>
      <Head>
        <title>TodoApp | Pricing</title>
      </Head>

      <Navbar />

      <main className="relative">
        {/* Sticky Hero Section */}
        <motion.section
          style={{ opacity, scale }}
          className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white z-10"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-light mb-8"
            >
              <span className="block">Simple Pricing</span>
              <motion.span
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPositionX: ["0%", "100%"],
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
                No Surprises.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Start free. Upgrade when you need more.
            </motion.p>
          </div>
        </motion.section>

        {/* Pricing Plans Section */}
        <section className="relative z-20 bg-white py-32">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {/* Free Plan */}
              <PricingCard
                name="Free"
                price="$0"
                period="forever"
                features={[
                  "✓ 20 tasks/day",
                  "✓ Basic reminders",
                  "✓ 2 device sync",
                  "✗ Advanced analytics",
                  "✗ Priority support",
                ]}
                buttonText="Get Started"
                highlight={false}
              />

              {/* Pro Plan (Coming Soon) */}
              <PricingCard
                name="Pro"
                price="$9"
                period="per month"
                features={[
                  "✓ Unlimited tasks",
                  "✓ Advanced reminders",
                  "✓ 5 device sync",
                  "✓ Basic analytics",
                  "✗ Team features",
                ]}
                buttonText="Coming Soon"
                highlight={true}
                disabled={true}
              />

              {/* Enterprise Plan (Coming Soon) */}
              <PricingCard
                name="Enterprise"
                price="$29"
                period="per month"
                features={[
                  "✓ Everything in Pro",
                  "✓ Team collaboration",
                  "✓ Unlimited devices",
                  "✓ Advanced analytics",
                  "✓ Dedicated support",
                ]}
                buttonText="Contact Us"
                highlight={false}
                disabled={true}
              />
            </motion.div>
            {/* Bitcoin Donation Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16 max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Support Our Development
              </h3>
              <p className="text-gray-600 mb-6">
                Love our free service? Help us keep it running by donating
                Bitcoin. Every contribution helps improve TodoApp!
              </p>

              {/* QR Code Display */}
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-white rounded-lg border border-gray-200 inline-block">
                  <Image
                    src={images}
                    alt="Bitcoin QR Code"
                    className="w-32 h-32"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' fill='%236b7280'%3EBTC QR%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  Bitcoin Wallet Address:
                </p>
                <div className="flex items-center justify-between">
                  <code className="font-mono text-gray-800 break-all">
                    bc1q0adr8z0khwpmk9mvf8nfe5g740fw9y5dwgg47a
                  </code>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "bc1q0adr8z0khwpmk9mvf8nfe5g740fw9y5dwgg47a"
                      );
                      alert("Bitcoin address copied!");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-3 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm"
                  >
                    Copy
                  </motion.button>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Thank you for supporting independent developers!
              </p>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-32 max-w-3xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">
                Common Questions
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-gray-200 pb-6"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const faqs = [
  {
    question: "Is there really no charge for the Free plan?",
    answer:
      "Yes! Our Free plan lets you manage up to 20 tasks per day at no cost, forever.",
  },
  {
    question: "When will Pro features be available?",
    answer:
      "We're actively developing premium features. Sign up to get notified when they launch.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Absolutely. You can start with Free and upgrade anytime.",
  },
];
