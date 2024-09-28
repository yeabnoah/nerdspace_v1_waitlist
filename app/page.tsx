"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import EmailSignup from './components/EmailSignup';
import CategoryCarousel from './components/CategoryCarousel';
import Footer from './components/Footer';
import { categories } from './data/categories';

export default function Home() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
    setIsEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen bg_image text-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
      <Header />

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