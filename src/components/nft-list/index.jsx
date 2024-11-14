// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { motion } from 'framer-motion';
// import { Box, Tabs, Tab, Typography } from '@mui/material';
// import { Range } from "react-range";
// import Product from '@components/product/layout-01';
// import { ProductType } from '@utils/types';
// // import { addToCart, removeToCart } from "src/features/cartSlice";
// import { addToCart, removeFromCart } from "src/features/cartSlice";

// const NftListArea = ({ className, space, data, collection }) => {
//   console.log('collection', collection);
//   const dispatch = useDispatch();
//   const { carts } = useSelector((state) => state.cart);

//   const [activeTab, setActiveTab] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [sliderValues, setSliderValues] = useState([0]);

//   useEffect(() => {
//     setProducts(data?.products || []);
//   }, [data?.products]);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const filterProducts = (category) => {
//     if (category === 'all') {
//       setProducts(data?.products);
//     } else {
//       const filteredProducts = data?.products.filter((product) =>
//         product.categories.includes(category)
//       );
//       setProducts(filteredProducts);
//     }
//   };

//   const handleSliderChange = (values) => {
//     const newValue = Math.round(values[0] * products.length / 100);
//     const currentItemsInCart = carts?.length;

//     if (newValue > currentItemsInCart) {
//       // Add items to cart
//       for (let i = currentItemsInCart; i < newValue; i++) {
//         dispatch(addToCart(products[i]));
//       }
//     } else if (newValue < currentItemsInCart) {
//       // Remove items from cart
//       for (let i = currentItemsInCart - 1; i >= newValue; i--) {
//         const itemToRemove = carts[i];
//         if (itemToRemove) {
//           // dispatch(removeToCart(itemToRemove._id));
//           dispatch(removeFromCart(itemToRemove._id));
//         }
//       }
//     }

//     setSliderValues(values);
//   };

//   const renderSlider = () => (
//     <Box sx={{ width: '100%', padding: '20px 0' }}>
//       <Range
//         step={1}
//         min={0}
//         max={100}
//         values={sliderValues}
//         onChange={handleSliderChange}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: '6px',
//               width: '100%',
//               backgroundColor: '#ddd'
//             }}
//           >
//             <div
//               style={{
//                 height: '6px',
//                 width: `${sliderValues[0]}%`,
//                 backgroundColor: '#a9b729c9'
//               }}
//             />
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: '20px',
//               width: '20px',
//               backgroundColor: '#a9b729c9',
//               borderRadius: '50%'
//             }}
//           />
//         )}
//       />
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
//         <Typography variant="body2">0 items</Typography>
//         <Typography variant="body2">{products.length} items</Typography>
//       </Box>
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <Typography variant="h6" sx={{ color: '#a9b729c9' }}>
//           {carts?.length} item{carts?.length !== 1 ? 's' : ''} in cart
//         </Typography>
//       </Box>
//     </Box>
//   );

//   const renderNfts = () => (
//     <motion.div layout className="isotope-list item-5">
//       {renderSlider()}
//       {products.map((nft) => (
//         <motion.div key={nft.tokenId} className={clsx('grid-item')} layout>
//           <Product nft={nft} />
//         </motion.div>
//       ))}
//     </motion.div>
//   );

//   const renderOverview = () => (
//     <motion.div layout className="isotope-list item-5" style={{ display: 'flex', flexDirection: 'column' }}>
//       <div className={clsx('grid-item')}>
//         <h3 style={{ color: '#a9b729c9', fontSize: 'x-large' }}>Overview</h3>
//         {/* <p style={{ fontSize: 'large', textAlign: 'justify' }}>
//           The NFT collection is a collection of unique digital art pieces created by the Kryptomind team. 
//           Each NFT is unique and has its own story. The collection is a limited edition with only a few pieces available. 
//           The NFTs are created using the latest technology and stored on the blockchain. 
//           Each NFT comes with a certificate of authenticity and is signed by the artist. 
//           The NFT collection is a great way to own a piece of digital art that is unique and valuable.
//         </p> */}
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className={clsx('rn-product-area masonary-wrapper-activation', space === 1 && 'rn-section-gapTop', className)}>
//       <div className="container">
//         <div className="col-lg-12">
//           <Box sx={{ width: '100%', marginBottom: '30px' }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               aria-label="nft tabs"
//               sx={{
//                 '& .MuiTab-root': {
//                   color: '#888',
//                   fontSize: 'small',
//                   '&.Mui-selected': {
//                     color: '#a9b729c9',
//                     fontSize: 'large',
//                   },
//                 },
//                 '& .MuiTabs-indicator': {
//                   backgroundColor: '#a9b729c9',
//                 },
//               }}
//             >
//               <Tab label="NFTs" />
//               <Tab label="Overview" />
//             </Tabs>
//           </Box>
//           <div style={{ width: '100%', height: '1px', backgroundColor: '#a9b729c9', marginBottom: '30px' }} />
          
//           {activeTab === 0 && renderNfts()}
//           {activeTab === 1 && renderOverview()}
//         </div>
//       </div>
//     </div>
//   );
// };

// NftListArea.propTypes = {
//   className: PropTypes.string,
//   space: PropTypes.oneOf([1, 2]),
//   data: PropTypes.shape({
//     products: PropTypes.arrayOf(ProductType),
//   }),
// };

// NftListArea.defaultProps = {
//   space: 1,
// };

// export default NftListArea;



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import { Range } from "react-range";
import Product from "@components/product/layout-01";
import { ProductType } from '@utils/types';
import { addToCart, removeFromCart } from "src/features/cartSlice";
import RenderDescription from '@components/description/launchpadDescription';

const NftListArea = ({ className, space, data, collection }) => {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cart);

  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [sliderValues, setSliderValues] = useState([0]);

  useEffect(() => {
    setProducts(data?.products || []);
  }, [data?.products]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSliderChange = (values) => {
    const newValue = Math.round(values[0] * products.length / 100);
    const currentItemsInCart = carts?.length;

    if (newValue > currentItemsInCart) {
      for (let i = currentItemsInCart; i < newValue; i++) {
        dispatch(addToCart(products[i]));
      }
    } else if (newValue < currentItemsInCart) {
      for (let i = currentItemsInCart - 1; i >= newValue; i--) {
        const itemToRemove = carts[i];
        if (itemToRemove) {
          dispatch(removeFromCart(itemToRemove._id));
        }
      }
    }

    setSliderValues(values);
  };

  const renderSlider = () => (
    <Box sx={{ width: '100%', padding: '20px 0' }}>
      <Range
        step={1}
        min={0}
        max={100}
        values={sliderValues}
        onChange={handleSliderChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ddd'
            }}
          >
            <div
              style={{
                height: '6px',
                width: `${sliderValues[0]}%`,
                backgroundColor: '#a9b729c9'
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#a9b729c9',
              borderRadius: '50%'
            }}
          />
        )}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Typography variant="body2">0 items</Typography>
        <Typography variant="body2">{products.length} items</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="h6" sx={{ color: '#a9b729c9' }}>
          {carts?.length} item{carts?.length !== 1 ? 's' : ''} in cart
        </Typography>
      </Box>
    </Box>
  );

  const renderNfts = () => (
    <motion.div layout className="isotope-list item-5">
      {/* {renderSlider()} */}
      {products.map((nft) => (
        <motion.div key={nft.tokenId} className={clsx('grid-item')} layout>
          {/* <Product nft={nft} /> */}
          <Product
                                        title={nft.collectionName}
                                        slug={nft.tokenId}
                                        price={nft.nftPrice}
                                        likeCount={nft.likes}
                                        image={nft.tokenImage}
                                        authors={[{ name: nft.creatorName }]}
                                        bitCount={nft.bidInfo.length}
                                        nft={nft}
                                    />
        </motion.div>
      ))}
    </motion.div>
  );



  return (
    <div className={clsx('rn-product-area masonary-wrapper-activation', space === 1 && 'rn-section-gapTop', className)}>
      <div className="container">
        <div className="col-lg-12">
          <Box sx={{ width: '100%', marginBottom: '30px' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="nft tabs"
              sx={{
                '& .MuiTab-root': {
                  color: '#888',
                  fontSize: 'medium',
                  '&.Mui-selected': {
                    color: '#a9b729c9',
                    fontSize: 'large',
                    fontWeight: 'bold',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#a9b729c9',
                },
              }}
            >
              <Tab label="Description" />
              <Tab label="NFTs" />
            </Tabs>
          </Box>
          <div style={{ width: '100%', height: '2px', backgroundColor: '#a9b729c9', marginBottom: '30px' }} />
          
          {activeTab === 0 && <RenderDescription collection={collection} />}
          {activeTab === 1 && renderNfts()}
        </div>
      </div>
    </div>
  );
};

NftListArea.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1, 2]),
  data: PropTypes.shape({
    products: PropTypes.arrayOf(ProductType),
  }),
  collection: PropTypes.object,
};

NftListArea.defaultProps = {
  space: 1,
};

export default NftListArea;