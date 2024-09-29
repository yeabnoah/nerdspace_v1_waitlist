import { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

interface EmailSignupProps {
  onSubmit: (email: string) => void;
  isSubmitted: boolean;
}

export default function EmailSignup({ onSubmit, isSubmitted }: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        onSubmit(email);
        toast.success('Thank you for signing up! We are excited to have you on board!', {
          icon: '🎉',
          duration: 5000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setEmail('');
      } else {
        toast.error(data.error || 'An error occurred. Please try again.', {
          icon: '❌',
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', {
        icon: '❌',
        duration: 4000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3.5 rounded-2xl bg-[#2A2A3A] text-white placeholder-gray-400 mb-4 pr-32 text-lg"
            required
          />
          <motion.button
            type="submit"
            className="absolute right-1 top-1.5 bg-purple-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Now'}
          </motion.button>
        </div>
      </motion.form>
    </>
  );
}