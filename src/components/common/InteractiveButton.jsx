import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveButton({
  onClick,
  arrowDirection,
  threshold = 50, // Порог расстояния для магнитного эффекта
  className = '', // Дополнительные стили
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const diffX = e.clientX - centerX;
      const diffY = e.clientY - centerY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < threshold) {
        const magneticStrength = (threshold - distance) / threshold;
        setPosition({
          x: diffX * magneticStrength * 0.5, // Ограничиваем движение кнопки
          y: diffY * magneticStrength * 0.5,
        });
        setIconPosition({
          x: diffX * magneticStrength * 0.8, // Иконка движется сильнее
          y: diffY * magneticStrength * 0.8,
        });
      } else {
        setPosition({ x: 0, y: 0 });
        setIconPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [threshold]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center 
                    bg-gray-100  overflow-hidden transition-colors`}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 100,
        }}
      >
        {/* Псевдоэлемент для вертикальной заливки */}
        <span
          className={`absolute inset-0 transform origin-bottom transition-transform duration-500 ease-in-out ${
            hovered ? 'scale-y-100 bg-black' : 'scale-y-0 bg-black'
          }`}
        ></span>

        {/* Иконка с независимым движением */}
        <motion.span
          className={`relative z-10 transition-colors duration-500 ${
            hovered ? 'text-white' : 'text-black'
          }`}
          animate={{
            x: iconPosition.x,
            y: iconPosition.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 100,
          }}
        >
          {arrowDirection}
        </motion.span>
      </motion.button>
    </div>
  );
}
