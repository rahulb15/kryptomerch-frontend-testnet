// import React from 'react';
// import { motion } from 'framer-motion';
// import { Box, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Image from 'next/image';

// const FullScreenImage = ({ src, alt, onClose }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.9)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 9999,
//       }}
//     >
//       <IconButton
//         onClick={onClose}
//         sx={{
//           position: 'absolute',
//           top: 16,
//           right: 16,
//           color: 'white',
//         }}
//       >
//         <CloseIcon />
//       </IconButton>
//       <Box sx={{ position: 'relative', width: '90vw', height: '90vh' }}>
//         <Image
//           src={src}
//           alt={alt}
//           layout="fill"
//           objectFit="contain"
//         />
//       </Box>
//     </motion.div>
//   );
// };

// export default FullScreenImage;

import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FullScreenImage = ({ src, alt, onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default FullScreenImage;