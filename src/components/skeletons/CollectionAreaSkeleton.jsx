// import React from 'react';
// import { motion } from 'framer-motion';

// const CollectionAreaSkeleton = () => {
//   const shimmer = {
//     hidden: { x: '-100%', opacity: 0 },
//     visible: { 
//       x: '100%', 
//       opacity: 1,
//       transition: { 
//         repeat: Infinity, 
//         repeatType: "loop", 
//         duration: 1.5, 
//         ease: "linear" 
//       }
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="rn-collection-area rn-section-gapTop"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="container">
//         <div className="row">
//           {[...Array(8)].map((_, index) => (
//             <motion.div 
//               key={index} 
//               className="col-lg-3 col-md-6 col-sm-6 col-12"
//               variants={itemVariants}
//             >
//               <motion.div 
//                 className="collection-wrapper" 
//                 style={{ 
//                   backgroundColor: "#f0f0f0", 
//                   borderRadius: "8px", 
//                   padding: "20px", 
//                   marginBottom: "30px",
//                   overflow: "hidden",
//                   position: "relative"
//                 }}
//               >
//                 <motion.div 
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
//                   }}
//                   variants={shimmer}
//                   initial="hidden"
//                   animate="visible"
//                 />
//                 <motion.div className="skeleton-image" style={{ width: "100%", height: "200px", backgroundColor: "#e0e0e0", marginBottom: "15px", borderRadius: "8px" }} />
//                 <motion.div className="skeleton-title" style={{ width: "70%", height: "20px", backgroundColor: "#e0e0e0", marginBottom: "10px" }} />
//                 <motion.div className="skeleton-description" style={{ width: "100%", height: "15px", backgroundColor: "#e0e0e0", marginBottom: "5px" }} />
//                 <motion.div className="skeleton-description" style={{ width: "80%", height: "15px", backgroundColor: "#e0e0e0" }} />
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CollectionAreaSkeleton;


import React from 'react';
import { motion } from 'framer-motion';

const CollectionAreaSkeleton = () => {
  const shimmer = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: '100%', 
      opacity: 1,
      transition: { 
        repeat: Infinity, 
        repeatType: "loop", 
        duration: 1.5, 
        ease: "linear" 
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const containerStyle = {
    padding: '40px 0',
    backgroundColor: 'rgb(46, 47, 33)',
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -15px',
  };

  const colStyle = {
    flex: '0 0 25%',
    maxWidth: '25%',
    padding: '0 15px',
    marginBottom: '30px',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const shimmerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
  };

  const skeletonImageStyle = {
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: '15px',
    borderRadius: '8px',
  };

  const skeletonTextStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: '15px',
    marginBottom: '10px',
    borderRadius: '4px',
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={containerStyle}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <div style={rowStyle}>
          {[...Array(8)].map((_, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              style={colStyle}
            >
              <motion.div style={cardStyle}>
                <motion.div 
                  style={shimmerStyle}
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                />
                <motion.div style={skeletonImageStyle} />
                <motion.div style={{ ...skeletonTextStyle, width: '70%' }} />
                <motion.div style={{ ...skeletonTextStyle, width: '100%' }} />
                <motion.div style={{ ...skeletonTextStyle, width: '80%' }} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionAreaSkeleton;