// NoData.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const NoData = ({ message }) => {
  return (
    <motion.div 
      className="no-data-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
      >
        <AlertCircle size={48} className="no-data-icon" />
      </motion.div>
      <motion.h3
        className="no-data-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        No Data Available
      </motion.h3>
      <motion.p
        className="no-data-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {message || "There are no past collections to display."}
      </motion.p>
    </motion.div>
  );
};

export default NoData;