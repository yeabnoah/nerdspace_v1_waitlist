import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full text-center text-xs sm:text-sm text-gray-400 mt-8 sm:mt-12"
    >
      © {new Date().getFullYear()} Nerdspace. All rights reserved.
    </motion.footer>
  );
}