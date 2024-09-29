"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import EmailSignup from './components/EmailSignup';
import CategoryCarousel from './components/CategoryCarousel';
import Footer from './components/Footer';
import { categories, Category } from './data/categories';
import { FaStar, FaHeart, FaMusic, FaCamera, FaSun, FaMoon } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface FloatingIconProps {
  Icon: IconType;
  initialPosition: {
    x: number;
    y: number;
  };
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, initialPosition }) => {
  return (
    <motion.div
      initial={initialPosition}
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute text-white opacity-20"
    >
      <Icon size={20 + Math.random() * 20} />
    </motion.div>
  );
};

export default function Home() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [icons, setIcons] = useState<FloatingIconProps[]>([]);

  const handleEmailSubmit = (email: string): void => {
    console.log('Email submitted:', email);
    setIsEmailSubmitted(true);
  };

  useEffect(() => {
    const newIcons: FloatingIconProps[] = categories.map((category: Category) => ({
      Icon: category.icon,
      initialPosition: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
    }));
    setIcons(newIcons);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-gradient-bg' : 'bg_image'} text-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden`}>
      {icons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} />
      ))}

      <Header />

      <AnimatePresence>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 right-0 z-50"
        >
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-l-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center"
      >
        <Hero />
        <EmailSignup onSubmit={handleEmailSubmit} isSubmitted={isEmailSubmitted} />
        <CategoryCarousel categories={categories} />
      </motion.main>

      <Footer />
    </div>
  );
}