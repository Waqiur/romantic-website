import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingBox = ({ index }: { index: number }) => {
  return (
    <motion.div
      className="w-5 h-5 md:w-8 md:h-8 rounded-md m-1"
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 1, 1, 0],
        rotate: [0, 0, 180, 180, 0],
        backgroundColor: [
          "#8b5cf6", // Purple
          "#3b82f6", // Blue
          "#ec4899", // Pink
          "#8b5cf6", // Purple
          "#3b82f6", // Blue
        ]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        delay: index * 0.2,
      }}
    />
  );
};

const LoadingScreen3D: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center items-center">
        <LoadingBox index={0} />
        <LoadingBox index={1} />
        <LoadingBox index={2} />
      </div>
      <motion.div 
        className="text-white mt-8 font-medium text-xl"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen3D;