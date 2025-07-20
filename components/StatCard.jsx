import { motion } from "framer-motion";

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 ${color} bg-opacity-20`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </motion.div>
  );
}

export default StatCard;
