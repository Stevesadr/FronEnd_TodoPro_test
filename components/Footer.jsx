import Link from "next/link";
import { motion } from "framer-motion";
import QRimage from "../public/image/photo_2025-07-25 20.49.07.jpeg";
import Image from "next/image";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-gray-300 py-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Platform Info */}
          <motion.div whileHover={{ y: -5 }} className="space-y-4">
            <h3 className="text-white text-xl font-bold">TodoApp</h3>
            <p className="text-gray-400">
              The minimalist productivity app that helps you focus on what
              matters most.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/Stevesadr"
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/Features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/Pricing"
                  className="text-gray-400 hover:text-white transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/Integrations"
                  className="text-gray-400 hover:text-white transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@todoapp.com</li>
              <li className="text-gray-400">+1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Bitcoin Donation */}
          <motion.div whileHover={{ y: -5 }} className="space-y-4">
            <h3 className="text-white text-xl font-bold">Support Us</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 text-sm mb-2">Bitcoin Donation:</p>
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded">
                  <Image
                    src={QRimage}
                    alt="Bitcoin QR Code"
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex-1">
                  <code className="text-xs text-gray-300 break-all block mb-1">
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
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Copy Address
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Created by{" "}
            <Link
              href="https://github.com/Stevesadr"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              Steve
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
