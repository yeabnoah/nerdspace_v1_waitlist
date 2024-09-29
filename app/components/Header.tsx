import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaXTwitter, FaLinkedin, FaTelegram } from 'react-icons/fa6';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 15 }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const socialIcons = {
    x: {
      icon: FaXTwitter,
      link: "https://x.com/Nerd_space1"
    },
    linkedin: {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/company/nerd-space/"
    },
    telegram: {
      icon: FaTelegram,
      link: "https://t.me/selfmadecoder/#Nerd_space"
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-between items-center mb-8 sm:mb-12 px-4 sm:px-6 py-4"
    >
      <Link href="/" className="flex items-center space-x-2 md:px-3 sm:px-0 rounded">
        <Image
          className="rounded"
          src="/nerdspace.png"
          alt="Nerdspace-logo"
          height={30}
          width={30}
        />
        <span className="text-xl sm:text-2xl font-bold text-white">Nerdspace</span>
      </Link>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="relative px-4 py-2 rounded-full text-sm font-bold text-white bg-purple-600 transition-colors duration-300 overflow-hidden"
        >
          <span className="relative z-10">Follow our Journey</span>
          <span className="absolute inset-0 rounded-full border-2 border-transparent animate-gradient-border"></span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-2 bg-gray-800 rounded-2xl shadow-lg p-2 z-10"
            >
              <div className="flex space-x-3">
                {Object.entries(socialIcons).map(([social, { icon: Icon, link }], index) => (
                  <motion.a
                    key={social}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                    href={link}
                    className="text-white text-xl hover:text-purple-400 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}