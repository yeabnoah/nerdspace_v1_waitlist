import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-between items-center mb-8 sm:mb-12 px-4 sm:px-6 py-4"
    >
      <Link href="/" className="flex items-center space-x-2 px-3 rounded">
        <Image
          className="rounded"
          src="/nerdspace.png"
          alt="Nerdspace-logo"
          height={30}
          width={30}
        />
        <span className="text-xl sm:text-2xl font-bold text-white">Nerdspace</span>
      </Link>

      <button className="bg-purple-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-purple-700 transition-colors duration-300">
        Sign In
      </button>
    </motion.header>
  );
}