// import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import SectionTitle from "@components/section-title/layout-02";
// import Slider, { SliderItem } from "@ui/slider";
// import { SectionTitleType, ProductType } from "@utils/types";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import collectionService from "src/services/collection.service";

// const SliderOptions = {
//     infinite: true,
//     slidesToShow: 5,
//     slidesToScroll: 2,
//     arrows: true,
//     dots: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     responsive: [
//         {
//             breakpoint: 1399,
//             settings: {
//                 slidesToShow: 4,
//                 slidesToScroll: 1,
//             },
//         },
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//             },
//         },
//         {
//             breakpoint: 992,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1,
//             },
//         },
//         {
//             breakpoint: 576,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 dots: true,
//                 arrows: false,
//             },
//         },
//     ],
// };

// {
//     /* <option value="art">
// Art & Collectibles
// </option>
// <option value="photography">
// Photography
// </option>
// <option value="gaming">
// Gaming
// </option>
// <option value="music">
// Music & Audio
// </option>
// <option value="virtual">
// Virtual Real Estate
// </option>
// <option value="fashion">
// Fashion & Accessories
// </option>
// <option value="sports">
// Sports
// </option>
// <option value="utility">
// Utility & Memberships
// </option>
// <option value="domains">
// Domains & Virtual Assets
// </option>
// <option value="real">
// Real World Assets
// </option> */
// }

// const LaunchpadCategory = ({ className, space }) => {
//     const [collections, setCollections] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [search, setSearch] = useState("");
//     const [timeRange, setTimeRange] = useState("all");

//     const data = [
//         {
//             section_title: {
//                 title: "Music",
//                 subtitle: "Explore the most popular products",
//             },
//             products: [
//                 {
//                     id: 1,
//                     title: "Art & Collectibles",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-01.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 2,
//                     title: "Photography",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-02.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 3,
//                     title: "Gaming",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-03.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 4,
//                     title: "Music & Audio",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-04.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 5,
//                     title: "Virtual Real Estate",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-05.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 6,
//                     title: "Fashion & Accessories",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-06.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 7,
//                     title: "Sports",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-07.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 8,
//                     title: "Utility & Memberships",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-08.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 9,
//                     title: "Domains & Virtual Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-09.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//                 {
//                     id: 10,
//                     title: "Real World Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-10.jpeg",
//                     },
//                     path: "/collections/kadena/Priority Pass",
//                 },
//             ],
//         },
//         {
//             section_title: {
//                 title: "Art",
//                 subtitle: "Explore the most popular products",
//             },
//             products: [
//                 {
//                     id: 1,
//                     title: "Art & Collectibles",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-01.jpeg",
//                     },
//                     path: "/launchpad/art",
//                 },
//                 {
//                     id: 2,
//                     title: "Photography",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-02.jpeg",
//                     },
//                     path: "/launchpad/photography",
//                 },
//                 {
//                     id: 3,
//                     title: "Gaming",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-03.jpeg",
//                     },
//                     path: "/launchpad/gaming",
//                 },
//                 {
//                     id: 4,
//                     title: "Music & Audio",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-04.jpeg",
//                     },
//                     path: "/launchpad/music",
//                 },
//                 {
//                     id: 5,
//                     title: "Virtual Real Estate",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-05.jpeg",
//                     },
//                     path: "/launchpad/virtual",
//                 },
//                 {
//                     id: 6,
//                     title: "Fashion & Accessories",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-06.jpeg",
//                     },
//                     path: "/launchpad/fashion",
//                 },
//                 {
//                     id: 7,
//                     title: "Sports",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-07.jpeg",
//                     },
//                     path: "/launchpad/sports",
//                 },
//                 {
//                     id: 8,
//                     title: "Utility & Memberships",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-08.jpeg",
//                     },
//                     path: "/launchpad/utility",
//                 },
//                 {
//                     id: 9,
//                     title: "Domains & Virtual Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-09.jpeg",
//                     },
//                     path: "/launchpad/domains",
//                 },
//                 {
//                     id: 10,
//                     title: "Real World Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-10.jpeg",
//                     },
//                     path: "/launchpad/real",
//                 },
//             ],
//         },
//         {
//             section_title: {
//                 title: "Photography",
//                 subtitle: "Explore the most popular products",
//             },
//             products: [
//                 {
//                     id: 1,
//                     title: "Art & Collectibles",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-01.jpeg",
//                     },
//                     path: "/launchpad/art",
//                 },
//                 {
//                     id: 2,
//                     title: "Photography",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-02.jpeg",
//                     },
//                     path: "/launchpad/photography",
//                 },
//                 {
//                     id: 3,
//                     title: "Gaming",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-03.jpeg",
//                     },
//                     path: "/launchpad/gaming",
//                 },
//                 {
//                     id: 4,
//                     title: "Music & Audio",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-04.jpeg",
//                     },
//                     path: "/launchpad/music",
//                 },
//                 {
//                     id: 5,
//                     title: "Virtual Real Estate",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-05.jpeg",
//                     },
//                     path: "/launchpad/virtual",
//                 },
//                 {
//                     id: 6,
//                     title: "Fashion & Accessories",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-06.jpeg",
//                     },
//                     path: "/launchpad/fashion",
//                 },
//                 {
//                     id: 7,
//                     title: "Sports",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-07.jpeg",
//                     },
//                     path: "/launchpad/sports",
//                 },
//                 {
//                     id: 8,
//                     title: "Utility & Memberships",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-08.jpeg",
//                     },
//                     path: "/launchpad/utility",
//                 },
//                 {
//                     id: 9,
//                     title: "Domains & Virtual Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-09.jpeg",
//                     },
//                     path: "/launchpad/domains",
//                 },
//                 {
//                     id: 10,
//                     title: "Real World Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-10.jpeg",
//                     },
//                     path: "/launchpad/real",
//                 },
//             ],
//         },
//         {
//             section_title: {
//                 title: "Gaming",
//                 subtitle: "Explore the most popular products",
//             },
//             products: [
//                 {
//                     id: 1,
//                     title: "Art & Collectibles",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-01.jpeg",
//                     },
//                     path: "/launchpad/art",
//                 },
//                 {
//                     id: 2,
//                     title: "Photography",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-02.jpeg",
//                     },
//                     path: "/launchpad/photography",
//                 },
//                 {
//                     id: 3,
//                     title: "Gaming",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-03.jpeg",
//                     },
//                     path: "/launchpad/gaming",
//                 },
//                 {
//                     id: 4,
//                     title: "Music & Audio",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-04.jpeg",
//                     },
//                     path: "/launchpad/music",
//                 },
//                 {
//                     id: 5,
//                     title: "Virtual Real Estate",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-05.jpeg",
//                     },
//                     path: "/launchpad/virtual",
//                 },
//                 {
//                     id: 6,
//                     title: "Fashion & Accessories",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-06.jpeg",
//                     },
//                     path: "/launchpad/fashion",
//                 },
//                 {
//                     id: 7,
//                     title: "Sports",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-07.jpeg",
//                     },
//                     path: "/launchpad/sports",
//                 },
//                 {
//                     id: 8,
//                     title: "Utility & Memberships",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-08.jpeg",
//                     },
//                     path: "/launchpad/utility",
//                 },
//                 {
//                     id: 9,
//                     title: "Domains & Virtual Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-09.jpeg",
//                     },
//                     path: "/launchpad/domains",
//                 },
//                 {
//                     id: 10,
//                     title: "Real World Assets",
//                     image: {
//                         src: "/assets-images/launchpad/launchpad-10.jpeg",
//                     },
//                     path: "/launchpad/real",
//                 },
//             ],
//         },
//     ];

//     const getCollectionsAllCategory = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response =
//                 await collectionService.getCollectionsAllCategory();
//             console.log("API response:", response);
//             setCollections(response.data.data);
//         } catch (error) {
//             console.error("Error fetching collections:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, [currentPage, itemsPerPage, search, timeRange]);

//     useEffect(() => {
//         getCollectionsAllCategory();
//     }, [getCollectionsAllCategory]);

//     console.log("collections:", collections);

//     // Array(10) [
//     //     {
//     //       category: 'art',
//     //       categoryName: 'Art & Collectibles',
//     //       collections: []
//     //     },
//     //     {
//     //       category: 'photography',
//     //       categoryName: 'Photography',
//     //       collections: []
//     //     },
//     //     { category: 'gaming', categoryName: 'Gaming', collections: [] },
//     //     {
//     //       category: 'music',
//     //       categoryName: 'Music & Audio',
//     //       collections: []
//     //     },
//     //     {
//     //       category: 'virtual',
//     //       categoryName: 'Virtual Real Estate',
//     //       collections: []
//     //     },
//     //     {
//     //       category: 'fashion',
//     //       categoryName: 'Fashion & Accessories',
//     //       collections: []
//     //     },
//     //     { category: 'sports', categoryName: 'Sports', collections: [] },
//     //     {
//     //       category: 'utility',
//     //       categoryName: 'Utility & Memberships',
//     //       collections: [
//     //         {
//     //           _id: '66f2a14e5bd6284a43d883f7',
//     //           collectionName: 'DBCOOPER002',
//     //           creatorName: 'Rahul',
//     //           totalSupply: '500',
//     //           mintPrice: '0.1',
//     //           collectionCoverImage:
//     //             'https://ipfs.filebase.io/ipfs/QmcQbaVQZvepRbj7m5xT7yDQRtWpqqmmWDKXRjUHPXv9Ao'
//     //         }
//     //       ]
//     //     },
//     //     {
//     //       category: 'domains',
//     //       categoryName: 'Domains & Virtual Assets',
//     //       collections: []
//     //     },
//     //     {
//     //       category: 'real',
//     //       categoryName: 'Real World Assets',
//     //       collections: []
//     //     }
//     //   ]

//     return (
//         <div
//             className={clsx(
//                 "en-product-area",
//                 space === 1 && "rn-section-gapTop",
//                 space === 2 && "rn-section-gap",
//                 space === 3 && "rn-section-gapBottom",
//                 className
//             )}
//         >
//             <div className="container mt--80 mt_md--60 mt_sm--40 mt-3">
//                 {collections
//                     .filter((category) => {
//                         console.log("category:", category);
//                         if (category?.collections.length > 0) {
//                             return category;
//                         }
//                     })
//                     .map((category, index) => (
//                         <div key={index}>
//                             <div className="row mb--30 mt--30">
//                                 <div className="col-12">
//                                     <SectionTitle
//                                         title={category.categoryName}
//                                         subtitle="Explore the most popular products"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <Slider
//                                         options={SliderOptions}
//                                         className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
//                                     >
//                                         {category.collections.map((prod) => (
//                                             <SliderItem
//                                                 key={prod._id}
//                                                 className="single-slide-product"
//                                             >
//                                                 <div className="product-card">
//                                                     <motion.div
//                                                         whileHover={{
//                                                             scale: 1.05,
//                                                         }}
//                                                         whileTap={{ scale: 1 }}
//                                                     >
//                                                         <Link
//                                                             href={`/launchpad/kadena/${prod.collectionName}`}
//                                                         >
//                                                             <div className="image">
//                                                                 <img
//                                                                     src={
//                                                                         prod.collectionCoverImage
//                                                                     }
//                                                                     alt={
//                                                                         prod.collectionName
//                                                                     }
//                                                                     style={{
//                                                                         width: "100%",
//                                                                         height: "auto",
//                                                                         borderRadius:
//                                                                             "10px",
//                                                                         boxShadow:
//                                                                             "0 0 2px #fbf39c, 0 0 5px #cbd02e, 0 0 10px #fef2a1",
//                                                                     }}
//                                                                 />
//                                                             </div>
//                                                         </Link>
//                                                     </motion.div>
//                                                 </div>
//                                             </SliderItem>
//                                         ))}
//                                     </Slider>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// LaunchpadCategory.propTypes = {
//     className: PropTypes.string,
//     space: PropTypes.oneOf([1, 2, 3, 4]),
// };

// LaunchpadCategory.defaultProps = {
//     space: 1,
// };

// export default LaunchpadCategory;




// import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import SectionTitle from "@components/section-title/layout-02";
// import Slider, { SliderItem } from "@ui/slider";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import collectionService from "src/services/collection.service";

// const SliderOptions = {
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 2,
//     arrows: true,
//     dots: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     responsive: [
//         {
//             breakpoint: 1399,
//             settings: {
//                 slidesToShow: 4,
//                 slidesToScroll: 1,
//             },
//         },
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//             },
//         },
//         {
//             breakpoint: 992,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1,
//             },
//         },
//         {
//             breakpoint: 576,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 dots: true,
//                 arrows: false,
//             },
//         },
//     ],
// };

// const LaunchpadCategory = ({ className, space }) => {
//     const [collections, setCollections] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const getCollectionsAllCategory = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await collectionService.getCollectionsAllCategory();
//             setCollections(response.data.data);
//         } catch (error) {
//             console.error("Error fetching collections:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         getCollectionsAllCategory();
//     }, [getCollectionsAllCategory]);

//     return (
//         <div
//             className={clsx(
//                 "en-product-area",
//                 space === 1 && "rn-section-gapTop",
//                 space === 2 && "rn-section-gap",
//                 space === 3 && "rn-section-gapBottom",
//                 className
//             )}
//             style={{ marginTop: "-150px" }}
//         >
//             <div className="container mt--80 mt_md--60 mt_sm--40 mt-3">
//                 {collections
//                     .filter((category) => category?.collections.length > 0)
//                     .map((category, index) => (
//                         <div key={index}>
//                             <div className="row mb--30 mt--80">
//                                 <div className="col-12">
//                                     <SectionTitle
//                                         title={category.categoryName}
//                                         subtitle="Explore the most popular products"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <Slider
//                                         options={SliderOptions}
//                                         className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
//                                     >
//                                         {category.collections.map((prod) => (
//                                             <SliderItem
//                                                 key={prod._id}
//                                                 className="single-slide-product"
//                                             >
//                                                 <div className="product-card">
//                                                     <motion.div
//                                                         whileHover={{
//                                                             scale: 1.05,
//                                                         }}
//                                                         whileTap={{ scale: 1 }}
//                                                     >
//                                                         <Link
//                                                             href={`/launchpad/kadena/${prod.collectionName}`}
//                                                         >
//                                                             <div className="image">
//                                                                 <img
//                                                                     src={prod.collectionCoverImage}
//                                                                     alt={prod.collectionName}
//                                                                     style={{
//                                                                         width: "100%",
//                                                                         height: "auto",
//                                                                         maxHeight: "400px",
//                                                                         borderRadius: "10px",
//                                                                         boxShadow: "0 0 2px #fbf39c, 0 0 5px #cbd02e, 0 0 10px #fef2a1",
//                                                                     }}
//                                                                 />
//                                                             </div>
//                                                         </Link>
//                                                     </motion.div>
//                                                 </div>
//                                             </SliderItem>
//                                         ))}
//                                     </Slider>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// LaunchpadCategory.propTypes = {
//     className: PropTypes.string,
//     space: PropTypes.oneOf([1, 2, 3, 4]),
// };

// LaunchpadCategory.defaultProps = {
//     space: 1,
// };

// export default LaunchpadCategory;




// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CategoryCard = ({ title, images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (!isHovered) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//       }, 3000);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [isHovered, images.length]);

//   return (
//     <div 
//       className="category-card"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="card-stack">
//         {images.map((img, index) => (
//           <motion.div
//             key={index}
//             className="stacked-card"
//             initial={false}
//             animate={{
//               rotate: index === currentIndex ? 0 : -20 + (index * 15),
//               x: index === currentIndex ? 0 : -20 + (index * 15),
//               y: index === currentIndex ? 0 : -10 + (index * 5),
//               scale: index === currentIndex ? 1 : 0.95 - (index * 0.05),
//               zIndex: images.length - index,
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 200,
//               damping: 20
//             }}
//           >
//             <img 
//               src={img} 
//               alt={`${title} ${index + 1}`}
//               className="card-image"
//             />
//           </motion.div>
//         ))}
//       </div>
//       <h3 className="category-title">{title}</h3>
//     </div>
//   );
// };

// const PopularCategories = () => {
//   const categories = [
//     {
//       title: 'PFP',
//       images: [
//         '/assets-images/launchpad/launchpad-01.jpeg',
//         '/assets-images/launchpad/launchpad-02.jpeg',
//         '/assets-images/launchpad/launchpad-03.jpeg'
//       ]
//     },
//     {
//       title: 'Art',
//       images: [
//         '/assets-images/launchpad/launchpad-01.jpeg',
//         '/assets-images/launchpad/launchpad-02.jpeg',
//         '/assets-images/launchpad/launchpad-03.jpeg'
//       ]
//     },
//     {
//       title: 'Metaverse',
//       images: [
//         '/assets-images/launchpad/launchpad-01.jpeg',
//         '/assets-images/launchpad/launchpad-02.jpeg',
//         '/assets-images/launchpad/launchpad-03.jpeg'
//       ]
//     },
//     {
//       title: 'Domains',
//       images: [
//         '/assets-images/launchpad/launchpad-01.jpeg',
//         '/assets-images/launchpad/launchpad-02.jpeg',
//         '/assets-images/launchpad/launchpad-03.jpeg'
//       ]
//     }
//   ];

//   return (
//     <div className="popular-categories">
//       <h2 className="text-2xl font-bold mb-8 text-white">Popular categories</h2>
//       <div className="categories-grid">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} {...category} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularCategories;

// import React from 'react';
// import { motion } from 'framer-motion';

// const CategoryCard = ({ title, images }) => {
//   return (
//     <div className="category-wrapper">
//       <div className="category-container">
//         <div className="cards-scroll-container">
//           {images.map((img, index) => (
//             <motion.div
//               key={index}
//               className="scroll-card"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <img 
//                 src={img} 
//                 alt={`${title} ${index + 1}`}
//                 className="card-image"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <h3 className="category-title">{title}</h3>
//     </div>
//   );
// };

// const PopularCategories = () => {
//   const categories = [
//     {
//       title: 'PFP',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     },
//     {
//       title: 'Art',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     },
//     {
//       title: 'Metaverse',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     },
//     {
//       title: 'Domains',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     }
//   ];

//   return (
//     <div className="popular-categories">
//       <h2 className="text-2xl font-bold mb-8 text-white">Popular categories</h2>
//       <div className="categories-grid">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} {...category} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularCategories;



// import React, { useState, useEffect, useCallback } from "react";
// import collectionService from "src/services/collection.service";


// const CategoryCard = ({ title, images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const handlePrevClick = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextClick = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="category-wrapper">
//       <div className="category-container">
//         <div className="carousel-container">
//           <div 
//             className="carousel-track"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {images.map((img, index) => (
//               <div key={index} className="carousel-slide">
//                 <img 
//                   src={img} 
//                   alt={`${title} ${index + 1}`}
//                   className="slide-image"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="carousel-dots">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
//                 onClick={() => setCurrentIndex(index)}
//               />
//             ))}
//           </div>

//           <button 
//             className="carousel-button prev"
//             onClick={handlePrevClick}
//             aria-label="Previous slide"
//           >
//             ←
//           </button>
//           <button 
//             className="carousel-button next"
//             onClick={handleNextClick}
//             aria-label="Next slide"
//           >
//             →
//           </button>
//         </div>
//       </div>
//       <h3 className="category-title">{title}</h3>
//     </div>
//   );
// };

// const PopularCategories = () => {
//   const [collections, setCollections] = useState([]);
//   console.log("collections:", collections);
//   const [loading, setLoading] = useState(false);
//   const categories = [
//     {
//       title: 'PFP',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     },
//     {
//       title: 'Art',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     },
//     {
//       title: 'Metaverse',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     },
//     {
//       title: 'Domains',
//       images: ['/assets-images/launchpad/launchpad-01.jpeg', '/assets-images/launchpad/launchpad-02.jpeg', '/assets-images/launchpad/launchpad-03.jpeg']
//     }
//   ];



  
//       const getCollectionsAllCategory = useCallback(async () => {
//           setLoading(true);
//           try {
//               const response = await collectionService.getCollectionsAllCategory();
//               setCollections(response.data.data);
//           } catch (error) {
//               console.error("Error fetching collections:", error);
//           } finally {
//               setLoading(false);
//           }
//       }, []);
  
//       useEffect(() => {
//           getCollectionsAllCategory();
//       }, [getCollectionsAllCategory]);

//   return (
//     <div className="popular-categories">
//       <h2 className="text-2xl font-bold mb-8 text-white">Popular categories</h2>
//       <div className="categories-grid">
//         {categories.map((category, index) => (
//           <CategoryCard key={index} {...category} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularCategories;




// import React, { useState, useEffect, useCallback } from "react";
// import collectionService from "src/services/collection.service";

// const defaultCategoryImages = {
//     art: "/assets-images/launchpad/launchpad-01.jpeg",
//     photography: "/assets-images/launchpad/launchpad-02.jpeg",
//     gaming: "/assets-images/launchpad/launchpad-03.jpeg",
//     music: "/assets-images/launchpad/launchpad-04.jpeg",
//     virtual: "/assets-images/launchpad/launchpad-05.jpeg",
//     fashion: "/assets-images/launchpad/launchpad-06.jpeg",
//     sports: "/assets-images/launchpad/launchpad-07.jpeg",
//     utility: "/assets-images/launchpad/launchpad-08.jpeg",
//     domains: "/assets-images/launchpad/launchpad-09.jpeg",
//     real: "/assets-images/launchpad/launchpad-10.jpeg",
// };

// const allCategories = [
//     { id: 1, title: "Art & Collectibles", category: "art", path: "/launchpad/art" },
//     { id: 2, title: "Photography", category: "photography", path: "/launchpad/photography" },
//     { id: 3, title: "Gaming", category: "gaming", path: "/launchpad/gaming" },
//     { id: 4, title: "Music & Audio", category: "music", path: "/launchpad/music" },
//     { id: 5, title: "Virtual Real Estate", category: "virtual", path: "/launchpad/virtual" },
//     { id: 6, title: "Fashion & Accessories", category: "fashion", path: "/launchpad/fashion" },
//     { id: 7, title: "Sports", category: "sports", path: "/launchpad/sports" },
//     { id: 8, title: "Utility & Memberships", category: "utility", path: "/launchpad/utility" },
//     { id: 9, title: "Domains & Virtual Assets", category: "domains", path: "/launchpad/domains" },
//     { id: 10, title: "Real World Assets", category: "real", path: "/launchpad/real" },
// ];

// const CategoryCard = ({ title, category, images, path }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
    
//     // If no images provided, use default image
//     const displayImages = images.length > 0 
//         ? images.map(img => img.collectionCoverImage)
//         : [defaultCategoryImages[category]];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => 
//                 prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
//             );
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [displayImages.length]);

//     const handlePrevClick = () => {
//         setCurrentIndex((prevIndex) => 
//             prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
//         );
//     };

//     const handleNextClick = () => {
//         setCurrentIndex((prevIndex) => 
//             prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     return (
//         <div className="category-wrapper">
//             <div className="category-container">
//                 <div className="carousel-container">
//                     <div 
//                         className="carousel-track"
//                         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                     >
//                         {displayImages.map((img, index) => (
//                             <div key={index} className="carousel-slide">
//                                 <img 
//                                     src={img}
//                                     alt={`${title} ${index + 1}`}
//                                     className="slide-image"
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     {displayImages.length > 1 && (
//                         <>
//                             <div className="carousel-dots">
//                                 {displayImages.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
//                                         onClick={() => setCurrentIndex(index)}
//                                     />
//                                 ))}
//                             </div>

//                             <button 
//                                 className="carousel-button prev"
//                                 onClick={handlePrevClick}
//                                 aria-label="Previous slide"
//                             >
//                                 ←
//                             </button>
//                             <button 
//                                 className="carousel-button next"
//                                 onClick={handleNextClick}
//                                 aria-label="Next slide"
//                             >
//                                 →
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>
//             <h3 className="category-title">{title}</h3>
//         </div>
//     );
// };

// const PopularCategories = () => {
//     const [collections, setCollections] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const getCollectionsAllCategory = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await collectionService.getCollectionsAllCategory();
//             setCollections(response.data.data);
//         } catch (error) {
//             console.error("Error fetching collections:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         getCollectionsAllCategory();
//     }, [getCollectionsAllCategory]);

//     // Process collections data
//     const processedCategories = allCategories.map(cat => {
//         const categoryData = collections.find(c => c.category === cat.category);
//         return {
//             ...cat,
//             images: categoryData?.collections || []
//         };
//     });

//     if (loading) {
//         return <div className="text-white text-center">Loading...</div>;
//     }

//     return (
//         <div className="popular-categories">
//             <h2 className="text-2xl font-bold mb-8 text-white">Popular categories</h2>
//             <div className="categories-grid">
//                 {processedCategories.map((category) => (
//                     <CategoryCard 
//                         key={category.id}
//                         title={category.title}
//                         category={category.category}
//                         images={category.images}
//                         path={category.path}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PopularCategories;




// import React, { useState, useEffect, useCallback } from "react";
// import collectionService from "src/services/collection.service";
// import Slider from "react-slick";

// const defaultCategoryImages = {
//     art: "/assets-images/launchpad/launchpad-01.jpeg",
//     photography: "/assets-images/launchpad/launchpad-02.jpeg",
//     gaming: "/assets-images/launchpad/launchpad-03.jpeg",
//     music: "/assets-images/launchpad/launchpad-04.jpeg",
//     virtual: "/assets-images/launchpad/launchpad-05.jpeg",
//     fashion: "/assets-images/launchpad/launchpad-06.jpeg",
//     sports: "/assets-images/launchpad/launchpad-07.jpeg",
//     utility: "/assets-images/launchpad/launchpad-08.jpeg",
//     domains: "/assets-images/launchpad/launchpad-09.jpeg",
//     real: "/assets-images/launchpad/launchpad-10.jpeg",
// };

// const allCategories = [
//     { id: 1, title: "Art & Collectibles", category: "art", path: "/launchpad/art" },
//     { id: 2, title: "Photography", category: "photography", path: "/launchpad/photography" },
//     { id: 3, title: "Gaming", category: "gaming", path: "/launchpad/gaming" },
//     { id: 4, title: "Music & Audio", category: "music", path: "/launchpad/music" },
//     { id: 5, title: "Virtual Real Estate", category: "virtual", path: "/launchpad/virtual" },
//     { id: 6, title: "Fashion & Accessories", category: "fashion", path: "/launchpad/fashion" },
//     { id: 7, title: "Sports", category: "sports", path: "/launchpad/sports" },
//     { id: 8, title: "Utility & Memberships", category: "utility", path: "/launchpad/utility" },
//     { id: 9, title: "Domains & Virtual Assets", category: "domains", path: "/launchpad/domains" },
//     { id: 10, title: "Real World Assets", category: "real", path: "/launchpad/real" },
// ];

// const SlickSettings = {
//   dots: true,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   initialSlide: 0,
//   responsive: [
//       {
//           breakpoint: 1399,
//           settings: {
//               slidesToShow: 4,
//               slidesToScroll: 1,
//           },
//       },
//       {
//           breakpoint: 1200,
//           settings: {
//               slidesToShow: 3,
//               slidesToScroll: 1,
//           },
//       },
//       {
//           breakpoint: 992,
//           settings: {
//               slidesToShow: 2,
//               slidesToScroll: 1,
//           },
//       },
//       {
//           breakpoint: 576,
//           settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               dots: true,
//               arrows: false,
//           },
//       },
//   ],
// };

// const CategoryCard = ({ title, category, images, path }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
    
//     // If no images provided, use default image
//     const displayImages = images.length > 0 
//         ? images.map(img => img.collectionCoverImage)
//         : [defaultCategoryImages[category]];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => 
//                 prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
//             );
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [displayImages.length]);

//     const handlePrevClick = () => {
//         setCurrentIndex((prevIndex) => 
//             prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
//         );
//     };

//     const handleNextClick = () => {
//         setCurrentIndex((prevIndex) => 
//             prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     return (
//         <div className="category-wrapper">
//             <div className="category-container">
//                 <div className="carousel-container">
//                     <div 
//                         className="carousel-track"
//                         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                     >
//                         {displayImages.map((img, index) => (
//                             <div key={index} className="carousel-slide">
//                                 <img 
//                                     src={img}
//                                     alt={`${title} ${index + 1}`}
//                                     className="slide-image"
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     {displayImages.length > 1 && (
//                         <>
//                             <div className="carousel-dots">
//                                 {displayImages.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
//                                         onClick={() => setCurrentIndex(index)}
//                                     />
//                                 ))}
//                             </div>

//                             <button 
//                                 className="carousel-button prev"
//                                 onClick={handlePrevClick}
//                                 aria-label="Previous slide"
//                             >
//                                 ←
//                             </button>
//                             <button 
//                                 className="carousel-button next"
//                                 onClick={handleNextClick}
//                                 aria-label="Next slide"
//                             >
//                                 →
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>
//             <h3 className="category-title">{title}</h3>
//         </div>
//     );
// };

// const PopularCategories = () => {
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getCollectionsAllCategory = useCallback(async () => {
//       setLoading(true);
//       try {
//           const response = await collectionService.getCollectionsAllCategory();
//           setCollections(response.data.data);
//       } catch (error) {
//           console.error("Error fetching collections:", error);
//       } finally {
//           setLoading(false);
//       }
//   }, []);

//   useEffect(() => {
//       getCollectionsAllCategory();
//   }, [getCollectionsAllCategory]);

//   const processedCategories = allCategories.map(cat => {
//       const categoryData = collections.find(c => c.category === cat.category);
//       return {
//           ...cat,
//           images: categoryData?.collections || []
//       };
//   });

//   if (loading) {
//       return <div className="text-white text-center">Loading...</div>;
//   }

//   return (
//       <div className="popular-categories">
//           <h2 className="text-2xl font-bold mb-8 text-white">Popular categories</h2>
//           <Slider {...SlickSettings} className="categories-slider">
//               {processedCategories.map((category) => (
//                   <div key={category.id} className="slider-item">
//                       <CategoryCard 
//                           title={category.title}
//                           category={category.category}
//                           images={category.images}
//                           path={category.path}
//                       />
//                   </div>
//               ))}
//           </Slider>
//       </div>
//   );
// };

// export default PopularCategories;




import React, { useState, useEffect, useCallback } from "react";
import collectionService from "src/services/collection.service";
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const defaultCategoryImages = {
    art: "/assets-images/launchpad/launchpad-01.jpeg",
    photography: "/assets-images/launchpad/launchpad-02.jpeg",
    gaming: "/assets-images/launchpad/launchpad-03.jpeg",
    music: "/assets-images/launchpad/launchpad-04.jpeg",
    virtual: "/assets-images/launchpad/launchpad-05.jpeg",
    fashion: "/assets-images/launchpad/launchpad-06.jpeg",
    sports: "/assets-images/launchpad/launchpad-07.jpeg",
    utility: "/assets-images/launchpad/launchpad-08.jpeg",
    domains: "/assets-images/launchpad/launchpad-09.jpeg",
    real: "/assets-images/launchpad/launchpad-10.jpeg",
};

const allCategories = [
    { id: 1, title: "Art & Collectibles", category: "art", path: "/launchpad/art" },
    { id: 2, title: "Photography", category: "photography", path: "/launchpad/photography" },
    { id: 3, title: "Gaming", category: "gaming", path: "/launchpad/gaming" },
    { id: 4, title: "Music & Audio", category: "music", path: "/launchpad/music" },
    { id: 5, title: "Virtual Real Estate", category: "virtual", path: "/launchpad/virtual" },
    { id: 6, title: "Fashion & Accessories", category: "fashion", path: "/launchpad/fashion" },
    { id: 7, title: "Sports", category: "sports", path: "/launchpad/sports" },
    { id: 8, title: "Utility & Memberships", category: "utility", path: "/launchpad/utility" },
    { id: 9, title: "Domains & Virtual Assets", category: "domains", path: "/launchpad/domains" },
    { id: 10, title: "Real World Assets", category: "real", path: "/launchpad/real" },
];

const SlickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
      autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
      {
          breakpoint: 1399,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
          },
      },
      {
          breakpoint: 1200,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
          },
      },
      {
          breakpoint: 992,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
          },
      },
      {
          breakpoint: 576,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
          },
      },
  ],
};

// Add these custom arrow components before the PopularCategories component:

function NextArrow(props) {
  const { onClick } = props;
  return (
      <div className="slick-arrow slick-next" onClick={onClick}>
          <IoIosArrowForward size={24} />
      </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
          <IoIosArrowBack size={24} />
      </div>
  );
}
const CategoryCard = ({ title, category, images, path }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // If no images provided, use default image
    const displayImages = images?.length > 0 
        ? images.map(img => img.collectionCoverImage)
        : [defaultCategoryImages[category]];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [displayImages.length]);

    const handleClick = () => {
        window.location.href = path;
    };

    return (
        <div 
            className="category-wrapper" 
            data-category={category}
            onClick={handleClick}
        >
            <div className="category-container">
                <div className="carousel-container">
                    <div 
                        className="carousel-track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {displayImages.map((img, index) => (
                            <div key={index} className="carousel-slide">
                                <img 
                                    src={img}
                                    alt={`${title} ${index + 1}`}
                                    className="slide-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <h3 className="category-title">{title}</h3>
        </div>
    );
};

const PopularCategories = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCollectionsAllCategory = useCallback(async () => {
        setLoading(true);
        try {
            const response = await collectionService.getCollectionsAllCategory();
            setCollections(response.data.data);
        } catch (error) {
            console.error("Error fetching collections:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCollectionsAllCategory();
    }, [getCollectionsAllCategory]);

    const processedCategories = allCategories.map(cat => {
        const categoryData = collections.find(c => c.category === cat.category);
        return {
            ...cat,
            images: categoryData?.collections || []
        };
    });

    if (loading) {
        return <div className="text-white text-center">Loading...</div>;
    }

    return (
        <div className="popular-categories">
            <h2 className="section-title">Popular Categories</h2>
            <Slider {...SlickSettings} className="categories-slider">
                {processedCategories.map((category) => (
                    <div key={category.id} className="slider-item">
                        <CategoryCard 
                            title={category.title}
                            category={category.category}
                            images={category.images}
                            path={category.path}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PopularCategories;