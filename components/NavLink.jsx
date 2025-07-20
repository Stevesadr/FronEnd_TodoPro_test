import Link from "next/link";
import { motion } from "framer-motion";

const NavLink = ({ href, text }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        href={href}
        className="text-gray-600 hover:text-black transition-colors font-medium relative group"
      >
        {text}
        <motion.span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all group-hover:w-full"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
        />
      </Link>
    </motion.div>
  );
};

export default NavLink;
