import { useState } from 'react';
import { motion } from 'framer-motion';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default function InteractiveButton({
  onClick,
  bgColor = 'bg-gray-50',
  hoverColor = 'hover:bg-[#9FB3A2]',
  isDown = true,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxOffset = 40;
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
        onClick={onClick}
        className={`interaktive-button ${hoverColor} ${bgColor} duration-700 bg-gray-50`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 10,
        }}
      >
        {isDown ? <DownOutlined /> : <UpOutlined />}
      </motion.button>
    </div>
  );
}
