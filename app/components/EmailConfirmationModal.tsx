import { motion, AnimatePresence } from "framer-motion";

interface EmailConfirmationModalProps {
  isOpen: boolean;
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EmailConfirmationModal({
  isOpen,
  email,
  onConfirm,
  onCancel,
}: EmailConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#0A0A0A] p-6 rounded-none border border-neutral-800 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Your Email
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to use <span className="text-white">{email}</span> to join the waitlist?
            </p>
            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-neutral-800 text-gray-300 hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
              >
                Yes, Join Waitlist
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 