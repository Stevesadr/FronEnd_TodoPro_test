import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Navbar from "../components/Navbar";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";

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

// const PricingCard = ({
//   name,
//   price,
//   period,
//   features,
//   buttonText,
//   highlight,
//   disabled = false,
// }) => {
//   return (
//     <motion.div
//       whileHover={!disabled ? { y: -10 } : {}}
//       className={`relative rounded-xl p-8 border-2 ${
//         highlight
//           ? "border-purple-300 bg-purple-50 shadow-lg"
//           : "border-gray-200 bg-white"
//       } ${disabled ? "opacity-80" : ""}`}
//     >
//       {highlight && (
//         <motion.div
//           initial={{ scale: 0 }}
//           whileInView={{ scale: 1 }}
//           className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium"
//         >
//           Popular
//         </motion.div>
//       )}

//       <h3 className="text-2xl font-bold mb-2">{name}</h3>
//       <p className="text-4xl font-bold mb-4">
//         {price}
//         <span className="text-lg text-gray-500">/{period}</span>
//       </p>

//       <ul className="space-y-3 mb-8">
//         {features.map((feature, i) => (
//           <motion.li
//             key={i}
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className={`flex items-start ${
//               feature.startsWith("✓") ? "text-gray-700" : "text-gray-400"
//             }`}
//           >
//             <span className="mr-2">{feature.startsWith("✓") ? "✓" : "✗"}</span>
//             <span>{feature.substring(2)}</span>
//           </motion.li>
//         ))}
//       </ul>

//       <motion.button
//         whileHover={!disabled ? { scale: 1.03 } : {}}
//         whileTap={!disabled ? { scale: 0.98 } : {}}
//         className={`w-full py-3 rounded-lg font-medium ${
//           highlight && !disabled
//             ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
//             : disabled
//             ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//             : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//         }`}
//         disabled={disabled}
//       >
//         {buttonText}
//       </motion.button>
//     </motion.div>
//   );
// };

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
