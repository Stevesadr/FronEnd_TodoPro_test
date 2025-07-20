import { motion } from "framer-motion";

const PricingCard = ({ name, price, period, features, highlight = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 300 },
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative p-6 rounded-xl transition-all duration-300 ${
        highlight
          ? "bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 shadow-lg hover:shadow-xl"
          : "bg-white border border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Badge */}
      {highlight && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md"
        >
          Popular
        </motion.div>
      )}

      {/* Header */}
      <motion.div whileHover={{ x: 2 }} className="mb-5">
        <h3
          className={`text-xl font-semibold ${
            highlight ? "text-gray-800" : "text-gray-700"
          }`}
        >
          {name}
        </h3>
        <div className="flex items-end mt-1">
          <p
            className={`text-4xl font-bold ${
              highlight ? "text-gray-900" : "text-gray-800"
            }`}
          >
            {price}
          </p>
          <span className="text-gray-500 ml-1.5 mb-1.5">{period}</span>
        </div>
      </motion.div>

      {/* Features */}
      <ul className="space-y-2.5 mb-6">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              x: 3,
              transition: { type: "spring", stiffness: 500 },
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-start"
          >
            <span
              className={`mr-2 mt-1 ${
                feature.startsWith("✓")
                  ? highlight
                    ? "text-blue-500"
                    : "text-purple-500"
                  : "text-gray-300"
              }`}
            >
              {feature.startsWith("✓") ? "✓" : "✗"}
            </span>
            <span
              className={`text-sm ${
                feature.startsWith("✓") ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {feature.substring(2)}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Button */}
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow: highlight
            ? "0 5px 15px rgba(124, 58, 237, 0.3)"
            : "0 5px 15px rgba(0, 0, 0, 0.05)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400 }}
        className={`w-full py-2.5 rounded-lg font-medium ${
          highlight
            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        {highlight ? "Get Started" : "Learn More"}
      </motion.button>
    </motion.div>
  );
};

export default PricingCard;
