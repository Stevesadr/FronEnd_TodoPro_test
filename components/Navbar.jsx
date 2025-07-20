// components/Navbar.jsx
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const shadow = useTransform(
    scrollY,
    [0, 100],
    ["none", "0 4px 30px rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, []);

  return (
    <motion.nav
      style={{
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "transparent",
        boxShadow: shadow,
      }}
      className="fixed top-0 w-full overflow-hidden z-50 transition-all duration-300 border-b border-gray-100/0"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href={user ? "/dashboard" : "/"}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TodoPro
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <NavLink href="/dashboard" text="Dashboard" />
                <NavLink href="/tasks" text="Tasks" />
                <NavLink href="/profile" text="Profile" />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <NavLink href="/Features" text="Features" />
                <NavLink href="/Pricing" text="Pricing" />
                <NavLink href="/Integrations" text="Integrations" />
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-600 hover:text-black transition-colors font-medium"
                >
                  Sign In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 flex flex-col space-y-1">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 7 } : {}}
                className="h-0.5 bg-gray-800"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 bg-gray-800"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -7 } : {}}
                className="h-0.5 bg-gray-800"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-4 z-50 relative overflow-hidden bg-gray-50"
          >
            {user ? (
              <>
                <MobileNavLink href="/dashboard" text="Dashboard" />
                <MobileNavLink href="/tasks" text="Tasks" />
                <MobileNavLink href="/profile" text="Profile" />
                <button
                  onClick={logout}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink href="/features" text="Features" />
                <MobileNavLink href="/pricing" text="Pricing" />
                <MobileNavLink href="/integrations" text="Integrations" />
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
