// import { useSelector, useDispatch } from "react-redux";
// import { Box, Typography, Button, ClickAwayListener } from "@mui/material";
// import { removeSingleItem, removeFromCart, emptyCart } from "src/features/cartSlice";
// import { useState } from "react";
// import { FaShoppingCart, FaTrash } from "react-icons/fa";
// import Scrollbars from "react-custom-scrollbars-2";
// import { motion, AnimatePresence } from "framer-motion";

// const CartDropdown = () => {
//     const { carts } = useSelector((state) => state.cart);
//     console.log(carts);
//     const dispatch = useDispatch();
//     const [isOpen, setIsOpen] = useState(false);

//     const handleRemoveItem = (item) => {
//         dispatch(removeFromCart(item._id));
//     };

//     const handleCheckout = () => {
//         dispatch(emptyCart());
//         setIsOpen(false);
//     };

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const closeDropdown = () => {
//         setIsOpen(false);
//     };

//     return (
//         <ClickAwayListener onClickAway={closeDropdown}>
//             <Box position="relative">
//                 <Button
//                     onClick={toggleDropdown}
//                     startIcon={<FaShoppingCart />}
//                     sx={{
//                         color: 'white',
//                         '&:hover': {
//                             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                         },
//                     }}
//                 >
//                     {carts?.length}
//                 </Button>
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -20 }}
//                             transition={{ duration: 0.2 }}
//                             style={{
//                                 position: "absolute",
//                                 right: 0,
//                                 marginTop: 10,
//                                 width: 350,
//                                 backgroundColor: "#ffffff",
//                                 boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
//                                 borderRadius: 12,
//                                 overflow: "hidden",
//                                 zIndex: 10,
//                             }}
//                         >
//                             <Typography variant="h6" sx={{ p: 3, borderBottom: "1px solid #e0e0e0", color: "#333", fontWeight: 600 }}>
//                                 Your Cart
//                             </Typography>
//                             <Scrollbars style={{ height: 300 }}>
//                                 <Box p={3}>
//                                     <AnimatePresence>
//                                         {carts?.length > 0 ? (
//                                             carts.map((item) => (
//                                                 <motion.div
//                                                     key={item.id}
//                                                     initial={{ opacity: 0, y: 20 }}
//                                                     animate={{ opacity: 1, y: 0 }}
//                                                     exit={{ opacity: 0, x: -20 }}
//                                                     transition={{ duration: 0.2 }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             display: "flex",
//                                                             alignItems: "center",
//                                                             mb: 3,
//                                                             pb: 3,
//                                                             borderBottom: "1px solid #e0e0e0",
//                                                         }}
//                                                     >
//                                                         <img
//                                                             src={item.tokenImage}
//                                                             alt={item.tokenId}
//                                                             style={{
//                                                                 width: 70,
//                                                                 height: 70,
//                                                                 borderRadius: 10,
//                                                                 marginRight: 16,
//                                                                 objectFit: "cover",
//                                                             }}
//                                                         />
//                                                         <Box flex={1}>
//                                                             <Typography variant="subtitle1" sx={{ color: "#333", fontWeight: "bold", mb: 0.5 }}>
//                                                                 {item.collectionName}
//                                                             </Typography>
//                                                             <Typography variant="body2" sx={{ color: "#666" }}>
//                                                                 {item.tokenId}
//                                                             </Typography>
//                                                         </Box>
//                                                         <Button
//                                                             onClick={() => handleRemoveItem(item)}
//                                                             sx={{
//                                                                 minWidth: 'auto',
//                                                                 p: 1,
//                                                                 color: '#ff4444',
//                                                                 '&:hover': {
//                                                                     backgroundColor: 'rgba(255, 68, 68, 0.1)',
//                                                                 },
//                                                             }}
//                                                         >
//                                                             <FaTrash size={18} />
//                                                         </Button>
//                                                     </Box>
//                                                 </motion.div>
//                                             ))
//                                         ) : (
//                                             <Typography variant="body1" sx={{ color: "#666", textAlign: "center", mt: 4 }}>
//                                                 Your cart is empty
//                                             </Typography>
//                                         )}
//                                     </AnimatePresence>
//                                 </Box>
//                             </Scrollbars>
//                             {carts?.length > 0 && (
//                                 <Box
//                                     p={3}
//                                     sx={{
//                                         borderTop: "1px solid #e0e0e0",
//                                         backgroundColor: "#f8f8f8",
//                                     }}
//                                 >
//                                     <Button
//                                         variant="contained"
//                                         onClick={handleCheckout}
//                                         fullWidth
//                                         sx={{
//                                             textTransform: "none",
//                                             fontWeight: "bold",
//                                             backgroundColor: "#4CAF50",
//                                             borderRadius: 2,
//                                             py: 1.5,
//                                             '&:hover': {
//                                                 backgroundColor: "#45a049",
//                                             }
//                                         }}
//                                     >
//                                         Proceed to Checkout
//                                     </Button>
//                                 </Box>
//                             )}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </Box>
//         </ClickAwayListener>
//     );
// };

// export default CartDropdown;


import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, emptyCart } from 'src/features/cartSlice';
import { FaShoppingCart, FaTrash, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Skeleton component for loading state
const CartItemSkeleton = () => (
    <div className="cart-item-skeleton">
        <div className="skeleton-image" />
        <div className="skeleton-content">
            <div className="skeleton-title" />
            <div className="skeleton-subtitle" />
        </div>
    </div>
);

const CartDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { carts } = useSelector((state) => state.cart);

    // const carts = [
    //     {
    //         _id: '1',
    //         collectionName: 'Collection 1',
    //         tokenId: '1234sdfsdfdsfsdfsdfsdf',
    //         tokenImage: '/assets-images/AI-nft/AI-5.jpeg',
    //         price: 0.1,
    //     },
    //     {
    //         _id: '2',
    //         collectionName: 'Collection 2',
    //         tokenId: '5678sdfsdfsdfsdfsdffsdfsdffsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfs',
    //         tokenImage: 'https://via.placeholder.com/150',
    //         price: 0.2,
    //     }
    // ];



    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, setIsOpen]);

    // Simulate loading state
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            // Simulate API call delay
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item._id));
    };

    const handleCheckout = () => {
        dispatch(emptyCart());
        setIsOpen(false);
    };

    const renderSkeletons = () => {
        return Array(3).fill(null).map((_, index) => (
            <CartItemSkeleton key={`skeleton-${index}`} />
        ));
    };

    return (
        <div className="cart-container" ref={dropdownRef}>
            <button 
                className="cart-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaShoppingCart size={16} />
                {carts?.length > 0 && (
                    <span className="cart-count">{carts.length}</span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="cart-backdrop" onClick={() => setIsOpen(false)} />
                        <motion.div
                            className="cart-dropdown"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="cart-header">
                                <h3 className="cart-title">
                                    Your Cart ({carts?.length || 0})
                                </h3>
                                <button className="cart-close" onClick={() => setIsOpen(false)}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="cart-items">
                                {isLoading ? (
                                    renderSkeletons()
                                ) : (
                                    <AnimatePresence>
                                        {carts?.length > 0 ? (
                                            carts.map((item) => (
                                                <motion.div
                                                    key={item._id}
                                                    className="cart-item"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <img
                                                        src={item.tokenImage}
                                                        alt={item.tokenId}
                                                        className="cart-item-image"
                                                    />
                                                    <div className="cart-item-details">
                                                        <div className="cart-item-title">
                                                            {item.collectionName}
                                                        </div>
                                                        <div className="cart-item-subtitle">
                                                            Token ID: {item?.tokenId?.slice(0, 10)}...{item?.tokenId?.slice(-10)}
                                                        </div>
                                                        {item.price && (
                                                            <div className="cart-item-price">
                                                                {item.price} ETH
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        className="cart-item-remove"
                                                        onClick={() => handleRemoveItem(item)}
                                                        aria-label="Remove item"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.div
                                                className="cart-empty"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Your cart is empty
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>

                            {!isLoading && carts?.length > 0 && (
                                <div className="cart-footer">
                                    <motion.button
                                        className="cart-checkout"
                                        onClick={handleCheckout}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CartDropdown;