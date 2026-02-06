"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  orderId: string | number;
  onClose: () => void;
  branchWhatsApp: string;
};

export default function SuccessModal({
  orderId,
  onClose,
  branchWhatsApp,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-green-600 text-center">
            Order Confirmed 🎉
          </h2>

          <p className="text-center mt-2">
            Order ID: <strong>#{orderId}</strong>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              window.open(
                `https://wa.me/${branchWhatsApp}?text=${encodeURIComponent(
                  `Hello, I want to confirm my order #${orderId}`
                )}`,
                "_blank"
              )
            }
            className="mt-6 w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-3"
          >
            <span>💬</span>
            <span>Chat on WhatsApp</span>
          </motion.button>

          <button
            onClick={onClose}
            className="mt-4 w-full text-sm text-gray-500"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}