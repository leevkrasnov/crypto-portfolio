import { motion } from 'framer-motion';

export default function VerticalFillButton() {
  return (
    <div className="relative inline-block">
      <motion.button className="relative px-6 py-2 border border-blue-600 rounded-lg overflow-hidden focus:outline-none cursor-pointer text-blue-600">
        {/* Заливка */}
        <motion.div
          className="absolute inset-0 bg-blue-600"
          initial={{ height: '0%' }}
          whileHover={{ height: '100%' }}
          transition={{ duration: 0.3 }}
          style={{ bottom: 0 }}
        />
        {/* Текст */}
        <motion.span
          className="relative z-10"
          initial={{ color: '#1D4ED8' }}
          whileHover={{ color: '#FFFFFF' }}
          transition={{ duration: 0.3 }}
        >
          Наведи на меня
        </motion.span>
      </motion.button>
    </div>
  );
}
