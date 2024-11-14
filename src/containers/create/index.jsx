// import React, { useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import CreateNewArea from '@containers/create-new';
// import MarketplaceCreateCollectionWrapper from '@containers/collection-create-marketplace';

// const CreateNFTPage = () => {
//   const [currentView, setCurrentView] = useState('main');

//   const renderMainView = () => (
//     <>
//       <motion.div 
//         className="create-left-section"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="create-title">Create</h1>
//         <motion.button 
//           className="create-button"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setCurrentView('createCollection')}
//         >
//           Create Collection
//         </motion.button>
//         <motion.button 
//           className="create-button"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setCurrentView('createSingleNFT')}
//         >
//           Create Single NFT
//         </motion.button>
//         <p className="create-learn-more">Learn more about each option.</p>
//       </motion.div>
//       <motion.div 
//         className="create-right-section"
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Image
//           src="/assets-images/AI-nft/New-NFT/nft2.png"
//           alt="NFT Example"
//           layout="fill"
//           objectFit="cover"
//         />
//         <div className="create-overlay"></div>
//       </motion.div>
//     </>
//   );

//   const renderCreateSingleNFTView = () => (
//     <div className="create-content-container">
//       <CreateNewArea />
//     </div>
//   );

//   const renderCreateCollectionView = () => (
//     <div className="create-content-container">
//       <MarketplaceCreateCollectionWrapper />
//     </div>
//   );

//   return (
//     <div className="create-container">
//       {currentView === 'main' && renderMainView()}
//       {currentView === 'createSingleNFT' && renderCreateSingleNFTView()}
//       {currentView === 'createCollection' && renderCreateCollectionView()}
//     </div>
//   );
// };

// export default CreateNFTPage;


import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CreateNewArea from '@containers/create-new';
import MarketplaceCreateCollectionWrapper from '@containers/collection-create-marketplace';

const CreateNFTPage = () => {
  const [currentView, setCurrentView] = useState('main');

  const handleBackNavigation = () => {
    setCurrentView('main');
  };

  const renderMainView = () => (
    <>
      <motion.div 
        className="create-left-section"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="create-title">Create</h1>
        <motion.button 
          className="create-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('createCollection')}
        >
          Create Collection
        </motion.button>
        <motion.button 
          className="create-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('createSingleNFT')}
        >
          Create Single NFT
        </motion.button>
        <p className="create-learn-more">Learn more about each option.</p>
      </motion.div>
      <motion.div 
        className="create-right-section"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/assets-images/AI-nft/New-NFT/nft2.png"
          alt="NFT Example"
          layout="fill"
          objectFit="cover"
        />
        <div className="create-overlay"></div>
      </motion.div>
    </>
  );

  const renderCreateSingleNFTView = () => (
    <div className="create-content-container">
      <CreateNewArea  onBack={handleBackNavigation} />
    </div>
  );

  const renderCreateCollectionView = () => (
    <div className="create-content-container">
      <MarketplaceCreateCollectionWrapper onBack={handleBackNavigation} />
    </div>
  );

  return (
    <div className="create-container">
      {currentView === 'main' && renderMainView()}
      {currentView === 'createSingleNFT' && renderCreateSingleNFTView()}
      {currentView === 'createCollection' && renderCreateCollectionView()}
    </div>
  );
};

export default CreateNFTPage;