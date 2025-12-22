import { Loader2, PackageCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-5"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
        >
          <Loader2 className="w-8 h-8 text-white" />
        </motion.div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Verifying your order
          </h2>
          <p className="text-sm text-gray-600">
            Please wait while we confirm your order details.
          </p>
        </div>

        {/* Subtle status */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <PackageCheck className="w-4 h-4" />
          Securely checking order number
        </div>
      </motion.div>
    </div>
  );
}
