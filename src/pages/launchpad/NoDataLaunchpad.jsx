import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const NoData = ({ message }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '456px',
    textAlign: 'center',
    color: '#9ca3af',
    backgroundColor: 'rgb(46 47 33)',
    borderRadius: '8px',
    padding: '24px'
  };

  const headingStyle = {
    marginTop: '16px',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#d1d5db'
  };

  const messageStyle = {
    marginTop: '8px',
    color: '#9ca3af'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={containerStyle}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
      >
        <AlertCircle size={48} color="#eab308" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={headingStyle}
      >
        No Data Available
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={messageStyle}
      >
        {message || "There are no past collections to display."}
      </motion.p>
    </motion.div>
  );
};

export default NoData;