import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-between items-center mb-8 sm:mb-12"
    >
      <div className="text-xl sm:text-2xl font-bold text-white">Nerdspace</div>
      <button className="bg-purple-600 px-4 py-3 rounded-full text-sm font-bold hover:bg-purple-700 transition-colors duration-300">
        Sign In
      </button>
    </motion.header>
  );
}