import { useState } from 'react';
import { motion } from 'framer-motion';
import { DownOutlined } from '@ant-design/icons';

export default function InteractiveButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxOffset = 20;
    setPosition({
      x: Math.min(Math.max(x, -maxOffset), maxOffset),
      y: Math.min(Math.max(y, -maxOffset), maxOffset),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 overflow-hidden hover:bg-[#9FB3A2] duration-700"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 40,
        }}
      >
        <DownOutlined />
      </motion.button>
    </div>
  );
}
