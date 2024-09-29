import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmailSignupProps {
  onSubmit: (email: string) => void;
  isSubmitted: boolean;
}

export default function EmailSignup({ onSubmit, isSubmitted }: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

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
        setMessage(data.message || 'Thank you for signing up!');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.error || 'An error occurred. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 font-semibold ${
            messageType === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message}
        </motion.p>
      )}
      {isSubmitted && !message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 mt-2 font-semibold"
        >
          Thanks for joining! Check your email for next steps.
        </motion.p>
      )}
    </motion.form>
  );
}