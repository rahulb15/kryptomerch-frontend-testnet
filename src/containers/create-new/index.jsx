// import { useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { useForm } from "react-hook-form";
// import Button from "@ui/button";
// import ProductModal from "@components/modals/product-modal";
// import ErrorText from "@ui/error-text";
// import { toast } from "react-toastify";
// import AddIcon from "@mui/icons-material/Add";
// import { IconButton, Paper } from "@mui/material";
// import CreateCollectionModal from "./createCollectionModal";

// const CreateNewArea = ({ className, space }) => {
//     const [showProductModal, setShowProductModal] = useState(false);
//     const [selectedImage, setSelectedImage] = useState();
//     const [hasImageError, setHasImageError] = useState(false);
//     const [previewData, setPreviewData] = useState({});
//     const [collectionName, setCollectionName] = useState("");
//     const [collectionCreated, setCollectionCreated] = useState(false);
//     const [showCollectionModal, setShowCollectionModal] = useState(false);
//     const [collectionImage, setCollectionImage] = useState(null);
//     const [collectionTokenSymbol, setCollectionTokenSymbol] = useState("");

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         mode: "onChange",
//     });

//     const notify = () => toast("Your product has been submitted");

//     const handleProductModal = () => {
//         setShowProductModal(false);
//     };

//     const handleCollectionModal = () => {
//         setShowCollectionModal(false);
//     };

//     const imageChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setSelectedImage(e.target.files[0]);
//         }
//     };

//     const onSubmit = (data, e) => {
//         setHasImageError(!selectedImage);

//         if (!collectionCreated) {
//             toast.error("Please create a collection before creating an NFT.");
//             return;
//         }

//         const { target } = e;
//         const submitBtn =
//             target.localName === "span" ? target.parentElement : target;
//         const isPreviewBtn = submitBtn.dataset?.btn;

//         if (isPreviewBtn && selectedImage) {
//             setPreviewData({ ...data, image: selectedImage });
//             setShowProductModal(true);
//         }

//         if (!isPreviewBtn) {
//             notify();
//             reset();
//             setSelectedImage();
//         }
//     };

//     const handleAddCollectionClick = () => {
//         setShowCollectionModal(true);
//     };

//     const handleCollectionSubmit = () => {
//         // Perform validation and collection creation logic
//         if (!collectionName || !collectionImage || !collectionTokenSymbol) {
//             toast.error("Please fill all collection fields.");
//             return;
//         }
//         setCollectionCreated(true);
//         setShowCollectionModal(false);
//         toast.success("Collection created successfully.");
//     };

//     return (
//         <>

//                 <form action="#" onSubmit={handleSubmit(onSubmit)}>
//                     <div className="container">
//                         <div className="row g-5">
//                             <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
//                                 <div className="upload-area mt--30">
//                                     <div className="upload-formate mb--30">
//                                         <h6 className="title">Upload file</h6>
//                                         <p className="formate">
//                                             Drag or choose your file to upload
//                                         </p>
//                                     </div>

//                                     <div className="brows-file-wrapper">
//                                         <input
//                                             name="file"
//                                             id="file"
//                                             type="file"
//                                             className="inputfile"
//                                             data-multiple-caption="{count} files selected"
//                                             multiple
//                                             onChange={imageChange}
//                                         />
//                                         {selectedImage && (
//                                             <img
//                                                 id="createfileImage"
//                                                 src={URL.createObjectURL(
//                                                     selectedImage
//                                                 )}
//                                                 alt=""
//                                                 data-black-overlay="6"
//                                             />
//                                         )}

//                                         <label
//                                             htmlFor="file"
//                                             title="No File Choosen"
//                                         >
//                                             <i className="feather-upload" />
//                                             <span className="text-center">
//                                                 Choose a File
//                                             </span>
//                                             <p className="text-center mt--10">
//                                                 PNG, GIF, WEBP, MP4 or MP3.{" "}
//                                                 <br /> Max 1Gb.
//                                             </p>
//                                         </label>
//                                     </div>
//                                     {hasImageError && !selectedImage && (
//                                         <ErrorText>Image is required</ErrorText>
//                                     )}
//                                 </div>

//                                 <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
//                                     <h5> Note: </h5>
//                                     <span>
//                                         {" "}
//                                         Service fee : <strong>2.5%</strong>{" "}
//                                     </span>{" "}
//                                     <br />
//                                     <span>
//                                         {" "}
//                                         You will receive :{" "}
//                                         <strong>25.00 ETH $50,000</strong>
//                                     </span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-7">
//                                 <div className="header-title text-center mb--30">
//                                     <h3>Create New NFT</h3>
//                                     <p>
//                                         {" "}
//                                         Create your own NFT and sell it on our
//                                         platform{" "}
//                                     </p>
//                                 </div>
//                                 <div className="form-wrapper-one">
//                                     <div className="row">
//                                         <div className="col-12 mb-4">
//                                             <Paper
//                                                 elevation={0}
//                                                 style={{
//                                                     width: "200px",
//                                                     height: "100px",
//                                                     margin: "0 auto",
//                                                     display: "flex",
//                                                     justifyContent: "center",
//                                                     alignItems: "center",
//                                                     cursor: "pointer",
//                                                     transition: "all 0.3s ease",
//                                                     position: "relative",
//                                                     overflow: "hidden",
//                                                 }}
//                                             >
//                                                 <div
//                                                     style={{
//                                                         display: "flex",
//                                                         flexDirection: "column",
//                                                         alignItems: "center",
//                                                         justifyContent:
//                                                             "center",
//                                                         height: "100%",
//                                                         width: "100%",
//                                                         transition:
//                                                             "all 0.3s ease",
//                                                     }}
//                                                     onMouseEnter={(e) => {
//                                                         e.currentTarget.style.backgroundColor =
//                                                             "transparent";
//                                                         e.currentTarget.querySelector(
//                                                             ".add-icon"
//                                                         ).style.display =
//                                                             "none";
//                                                         e.currentTarget.querySelector(
//                                                             ".create-text"
//                                                         ).style.opacity = 1;
//                                                     }}
//                                                     onMouseLeave={(e) => {
//                                                         e.currentTarget.style.backgroundColor =
//                                                             "#f5f5f5";
//                                                         e.currentTarget.querySelector(
//                                                             ".add-icon"
//                                                         ).style.display =
//                                                             "block";
//                                                         e.currentTarget.querySelector(
//                                                             ".create-text"
//                                                         ).style.opacity = 0;
//                                                     }}
//                                                     onClick={
//                                                         handleAddCollectionClick
//                                                     }
//                                                 >
//                                                     <AddIcon
//                                                         className="add-icon"
//                                                         style={{
//                                                             width: "40px",
//                                                             height: "40px",
//                                                             color: "#1976d2",
//                                                         }}
//                                                     />
//                                                     <div
//                                                         className="create-text"
//                                                         style={{
//                                                             position:
//                                                                 "absolute",
//                                                             opacity: 0,
//                                                             transition:
//                                                                 "opacity 0.3s ease",
//                                                             textAlign: "center",
//                                                             color: "#1976d2",
//                                                             fontWeight: "bold",
//                                                         }}
//                                                     >
//                                                         Create Collection
//                                                     </div>
//                                                 </div>
//                                             </Paper>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="name"
//                                                     className="form-label"
//                                                 >
//                                                     Name
//                                                 </label>
//                                                 <input
//                                                     id="name"
//                                                     placeholder="e. g. `Digital Awesome Game`"
//                                                     {...register("name", {
//                                                         required:
//                                                             "Name is required",
//                                                     })}
//                                                 />
//                                                 {errors.name && (
//                                                     <ErrorText>
//                                                         {errors.name?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="Discription"
//                                                     className="form-label"
//                                                 >
//                                                     Discription
//                                                 </label>
//                                                 <textarea
//                                                     id="discription"
//                                                     rows="3"
//                                                     placeholder="e. g. “This is a digital art piece that I created for my collection. It is a one of a kind piece that will never be replicated.”"
//                                                     {...register(
//                                                         "discription",
//                                                         {
//                                                             required:
//                                                                 "Discription is required",
//                                                         }
//                                                     )}
//                                                 />
//                                                 {errors.discription && (
//                                                     <ErrorText>
//                                                         {
//                                                             errors.discription
//                                                                 ?.message
//                                                         }
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="supply"
//                                                     className="form-label"
//                                                 >
//                                                     Supply
//                                                 </label>
//                                                 <input
//                                                     id="supply"
//                                                     placeholder="e. g. `20`"
//                                                     {...register("supply", {
//                                                         pattern: {
//                                                             value: /^[0-9]+$/,
//                                                             message:
//                                                                 "Please enter a number",
//                                                         },
//                                                         required:
//                                                             "Supply is required",
//                                                     })}
//                                                 />
//                                                 {errors.supply && (
//                                                     <ErrorText>
//                                                         {errors.supply?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="externalLink"
//                                                     className="form-label"
//                                                 >
//                                                     External Link
//                                                 </label>
//                                                 <input
//                                                     id="externalLink"
//                                                     placeholder="e. g. `https://www.example.com`"
//                                                     {...register(
//                                                         "externalLink",
//                                                         {
//                                                             required:
//                                                                 "Link is required",
//                                                         }
//                                                     )}
//                                                 />
//                                                 {errors.externalLink && (
//                                                     <ErrorText>
//                                                         {
//                                                             errors.externalLink
//                                                                 ?.message
//                                                         }
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box">
//                                                 <Button
//                                                     type="button"
//                                                     data-btn="preview"
//                                                     className="mr--15"
//                                                     onClick={handleSubmit(
//                                                         onSubmit
//                                                     )}
//                                                 >
//                                                     Preview
//                                                 </Button>
//                                                 <Button type="submit">
//                                                     Submit Item
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>

// <CreateCollectionModal
//                 open={showCollectionModal}
//                 handleClose={handleCollectionModal}
//             />
//             {/* <ProductModal
//                 open={showProductModal}
//                 handleClose={handleProductModal}
//                 previewData={previewData}
//             /> */}

//         </>
//     );
// };

// CreateNewArea.propTypes = {
//     className: PropTypes.string,
//     space: PropTypes.oneOf([1]),
// };
// CreateNewArea.defaultProps = {
//     space: 1,
// };

// export default CreateNewArea;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { useLaunchSingleNftMutation } from "src/services/marketplace.service";
import { useAccountContext } from "src/contexts";
import { useTheme } from "@mui/material/styles";
import {
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Box,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./ApplyLaunchpadWrapper.module.css";
import collectionService from "src/services/collection.service";
import { MutatingDots } from "react-loader-spinner";
import singleNftService from "src/services/singleNft.service";
import Image from "next/image";
import { motion } from "framer-motion";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            backgroundColor: "#242435",
            color: "#fff",
        },
    },
};

const policies = [
    "INSTANT-MINT",
    "MARKETPLACE",
    "FIXED-SALE",
    "AUCTION-SALE",
    "DUTCH-AUCTION-SALE",
    "ADJUSTABLE-ROYALTY",
    "BLACKLIST",
    "DISABLE-BURN",
    "DISABLE-TRANSFER",
    "DISABLE-SALE",
    "ROYALTY",
    "NON-FUNGIBLE"
];

const defaultPolicies = ["MARKETPLACE", "NON-FUNGIBLE", "INSTANT-MINT"];


function getStyles(name, policy, theme) {
    return {
        fontWeight:
            policy.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const wallets = [
    { name: "Stripe", src: "/wallet/Stripe.svg", width: 200, height: 200 },
    {
        name: "Ecko Wallet",
        src: "/wallet/eckowallet.png",
        width: 100,
        height: 100,
    },
    {
        name: "Chainweaver",
        src: "/wallet/chainweaver.png",
        width: 100,
        height: 100,
    },
    {
        name: "WalletConnect",
        src: "/wallet/walletconnect.svg",
        width: 100,
        height: 100,
    },
];

const CreateSingleNFTArea = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [policy, setPolicy] = useState(defaultPolicies);
    const [disabledPolicies, setDisabledPolicies] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const account = useAccountContext();
    const [launchSingleNft, { isLoading }] = useLaunchSingleNftMutation();
    const theme = useTheme();
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [connectedWallet, setConnectedWallet] = useState(null);

    useEffect(() => {
        if (account?.user?.walletName) {
            setConnectedWallet(account.user.walletName);
        }
    }, [account]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const uploadImage = async (file) => {
        setImageLoading(true);

        try {
            const formData = new FormData();
            formData.append("profileImage", file);
            const response = await collectionService.uploadImageById(formData);
            console.log("Image Upload Response:", response.data);

            if (response?.data?.status === "success") {
                const imageUrl = response.data.data.collectionBannerImage;
                console.log("Image URL:", imageUrl);
                setSelectedImage(imageUrl);
                setImageLoading(false);
                return imageUrl;
            } else {
                toast.error("Image Upload Failed");
                setImageLoading(false);
                return null;
            }
        } catch (error) {
            console.log("Image Upload Error:", error);
            setImageLoading(false);
            return null;
        } finally {
            document.getElementById("nftFile").value = null;
        }
    };

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setSelectedImage(imageUrl);
            }
        }
    };

    // const handlePolicyChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPolicy(typeof value === "string" ? value.split(",") : value);
    // };

    const handlePolicyChange = (event) => {
        const {
            target: { value },
        } = event;

        let newValue = typeof value === "string" ? value.split(",") : value;

        // Check if ADJUSTABLE-ROYALTY or ROYALTY is being added or removed
        const isAdjustableRoyaltyChanged =
            newValue.includes("ADJUSTABLE-ROYALTY") !==
            policy.includes("ADJUSTABLE-ROYALTY");
        const isRoyaltyChanged =
            newValue.includes("ROYALTY") !== policy.includes("ROYALTY");

        if (isAdjustableRoyaltyChanged) {
            if (newValue.includes("ADJUSTABLE-ROYALTY")) {
                // If ADJUSTABLE-ROYALTY is added, remove and disable ROYALTY
                newValue = newValue.filter((item) => item !== "ROYALTY");
                setDisabledPolicies(["ROYALTY"]);
            } else {
                // If ADJUSTABLE-ROYALTY is removed, enable ROYALTY
                setDisabledPolicies([]);
            }
        } else if (isRoyaltyChanged) {
            if (newValue.includes("ROYALTY")) {
                // If ROYALTY is added, remove and disable ADJUSTABLE-ROYALTY
                newValue = newValue.filter(
                    (item) => item !== "ADJUSTABLE-ROYALTY"
                );
                setDisabledPolicies(["ADJUSTABLE-ROYALTY"]);
            } else {
                // If ROYALTY is removed, enable ADJUSTABLE-ROYALTY
                setDisabledPolicies([]);
            }
        }

        newValue = [...new Set([...defaultPolicies, ...newValue])];

        setPolicy(newValue);
    };

    const onSubmit = async (data) => {
        setHasImageError(!selectedImage);

        if (!selectedImage) {
            toast.error("Please select an image for the NFT.");
            return;
        }

        try {
            const nftData = {
                account: account?.user?.walletAddress,
                royaltyAccount: data.royaltyAddress,
                nftName: data.name,
                nftUri: data.uri,
                nftPolicy: policy.join(" "),
                nftPrice: parseFloat(data.price),
                royaltyPerc: parseFloat(data.royaltyPercentage) / 100,
                walletName: account?.user?.walletName,
            };

            if (selectedWallet === "Stripe") {
                // Implement Stripe payment logic here
                console.log("Proceeding with Stripe payment");
                // You'll need to integrate with your backend to create a Stripe session
            } else {
                const resultData = await launchSingleNft(nftData).unwrap();
                console.log("Launch Single NFT Result:", resultData);
                if (resultData.result.status === "success") {
                    const body = {
                        user: account?.user?._id,
                        nftName: data.name,
                        creator: account?.user?._id,
                        creatorName: account?.user?.name,
                        tokenImage: selectedImage,
                        nftPrice: parseFloat(data.price),
                        policies: policy,
                        uri: data.uri,
                        royaltyAccount: data.royaltyAddress,
                        royaltyPercentage: parseFloat(data.royaltyPercentage),
                    };
                    console.log("Create Single NFT Body:", body);

                    const result = await singleNftService.createSingleNFT(body);
                    console.log("Create Single NFT Result:", result);
                    if (result.status === "success") {
                        toast.success("NFT launched successfully!");
                        reset();
                        setSelectedImage(null);
                        setPolicy([defaultPolicies]);
                    } else {
                        toast.error("Failed to launch NFT. Please try again.");
                    }
                } else {
                    toast.error("Failed to launch NFT. Please try again.");
                }
            }
        } catch (err) {
            console.error("Launch Single NFT Error:", err);
            toast.error(
                err.message || "An error occurred while launching the NFT"
            );
        }
    };

    return (
        <div className="create-area">
            <div className="container">
                <IconButton
                    onClick={onBack}
                    style={{
                        backgroundColor: "#b99603",
                        color: "#fff",
                        marginBottom: "20px",
                        width: "fit-content",
                        padding: "10px",
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <div className="row g-5">
                    <div className="col-lg-3 offset-1">
                        <div className="upload-area">
                            <div className="upload-formate mb--30">
                                <h6 className="title">Upload file</h6>
                                <p className="formate">
                                    Drag or choose your file to upload
                                </p>
                            </div>
                            <div className="brows-file-wrapper">
                                <input
                                    name="nftFile"
                                    id="nftFile"
                                    type="file"
                                    className="inputfile"
                                    onChange={handleImageChange}
                                />
                                {selectedImage && (
                                    <img
                                        id="nftImage"
                                        src={selectedImage}
                                        alt=""
                                        data-black-overlay="6"
                                    />
                                )}
                                <label htmlFor="nftFile" title="No File Chosen">
                                    {imageLoading ? (
                                        <MutatingDots
                                            color="#fff"
                                            size={30}
                                            speed={1}
                                        />
                                    ) : (
                                        <i className="feather-upload" />
                                    )}
                                    <span className="text-center">
                                        {imageLoading
                                            ? "Uploading..."
                                            : "Choose a File"}
                                    </span>
                                    <p className="text-center mt--10">
                                        PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                                    </p>
                                </label>
                            </div>
                            {hasImageError && !selectedImage && (
                                <ErrorText>Image is required</ErrorText>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="form-wrapper-one">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="name"
                                                className="form-label"
                                            >
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                placeholder="e. g. `Digital Awesome NFT`"
                                                {...register("name", {
                                                    required:
                                                        "Name is required",
                                                })}
                                            />
                                            {errors.name && (
                                                <ErrorText>
                                                    {errors.name.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="price"
                                                className="form-label"
                                            >
                                                Price
                                            </label>
                                            <input
                                                id="price"
                                                type="number"
                                                step="0.000000000000000001"
                                                min="0"
                                                placeholder="e. g. `20`"
                                                {...register("price", {
                                                    required:
                                                        "Price is required",
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Price must be non-negative",
                                                    },
                                                })}
                                            />
                                            {errors.price && (
                                                <ErrorText>
                                                    {errors.price.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="royaltyPercentage"
                                                className="form-label"
                                            >
                                                Royalty Percentage
                                            </label>
                                            <input
                                                id="royaltyPercentage"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="100"
                                                placeholder="e.g. 2.5 (Max 100)"
                                                {...register(
                                                    "royaltyPercentage",
                                                    {
                                                        required:
                                                            "Royalty Percentage is required",
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Royalty must be non-negative",
                                                        },
                                                        max: {
                                                            value: 100,
                                                            message:
                                                                "Royalty cannot exceed 100%",
                                                        },
                                                        validate: (value) =>
                                                            parseFloat(value) <=
                                                                100 ||
                                                            "Royalty cannot exceed 100%",
                                                    }
                                                )}
                                                onChange={(e) => {
                                                    const value = parseFloat(
                                                        e.target.value
                                                    );
                                                    if (value > 100) {
                                                        e.target.value = 100;
                                                    }
                                                }}
                                            />
                                            {errors.royaltyPercentage && (
                                                <ErrorText>
                                                    {
                                                        errors.royaltyPercentage
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="royaltyAddress"
                                                className="form-label"
                                            >
                                                Royalty Address
                                            </label>
                                            <input
                                                id="royaltyAddress"
                                                placeholder="e. g. `k:0x1234567890`"
                                                {...register("royaltyAddress", {
                                                    required:
                                                        "Royalty Address is required",
                                                    pattern: {
                                                        value: /^k:/,
                                                        message:
                                                            "Please enter a valid wallet address",
                                                    },
                                                })}
                                            />
                                            {errors.royaltyAddress && (
                                                <ErrorText>
                                                    {
                                                        errors.royaltyAddress
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="uri"
                                                className="form-label"
                                            >
                                                URI
                                            </label>
                                            <input
                                                id="uri"
                                                type="text"
                                                placeholder="e. g. `https://www.example.com`"
                                                {...register("uri", {
                                                    required: "URI is required",
                                                    pattern: {
                                                        message:
                                                            "Please enter a valid URI",
                                                    },
                                                })}
                                            />
                                            {errors.uri && (
                                                <ErrorText>
                                                    {errors.uri.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div> */}

<div className="col-md-12">
                <div className="input-box pb--20">
                    <label htmlFor="uri" className="form-label">
                        URI
                    </label>
                    <input
                        id="uri"
                        type="text"
                        placeholder="e. g. `https://www.example.com`"
                        {...register("uri", {
                            required: "URI is required",
                            pattern: {
                                value: /^https?:\/\/\S+$/,
                                message: "Please enter a valid URI",
                            },
                            validate: {
                                noSpaces: (value) => !/\s/.test(value) || "Spaces are not allowed in the URI",
                                noCommas: (value) => !/,/.test(value) || "Commas are not allowed in the URI",
                            },
                        })}
                    />
                    {errors.uri && (
                        <ErrorText>
                            {errors.uri.message}
                        </ErrorText>
                    )}
                </div>
            </div>



                                    {/* <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="policy" className="form-label">
                                                Policy
                                            </label>
                                            <Select
                                                labelId="policy-multiple-chip-label"
                                                id="policy-multiple-chip"
                                                multiple
                                                value={policy}
                                                onChange={handlePolicyChange}
                                                input={<OutlinedInput id="select-multiple-chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {policies.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, policy, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="policy"
                                                className="form-label"
                                            >
                                                Policy
                                            </label>
                                            <Select
                                                labelId="policy-multiple-chip-label"
                                                id="policy-multiple-chip"
                                                className={
                                                    styles["form-select"]
                                                }
                                                multiple
                                                value={policy}
                                                onChange={handlePolicyChange}
                                                input={
                                                    <OutlinedInput id="select-multiple-chip" />
                                                }
                                                renderValue={(selected) => (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        {selected.map(
                                                            (value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        value
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {policies.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(
                                                            name,
                                                            policy,
                                                            theme
                                                        )}
                                                        disabled={disabledPolicies.includes(
                                                            name
                                                        )}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div> */}

<div className="col-md-12">
                <div className="input-box pb--20">
                    <label htmlFor="policy" className="form-label">
                        Policy
                    </label>
                    <Select
                        labelId="policy-multiple-chip-label"
                        id="policy-multiple-chip"
                        className={styles["form-select"]}
                        multiple
                        value={policy}
                        onChange={handlePolicyChange}
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip 
                                        key={value} 
                                        label={value} 
                                        style={{
                                            opacity: defaultPolicies.includes(value) ? 0.7 : 1,
                                            cursor: defaultPolicies.includes(value) ? 'not-allowed' : 'default'
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {policies.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, policy, theme)}
                                disabled={defaultPolicies.includes(name)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

                                    <div className="col-md-12 col-xl-4 mt--20 mb--20">
                                        <label
                                            className="rn-check-box-label"
                                            htmlFor="payment-option"
                                        >
                                            Payment Options
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "start",
                                            gap: "20px",
                                            marginBottom: "30px",
                                        }}
                                    >
                                        {/* Always show Stripe */}
                                        <motion.div
                                            key="Stripe"
                                            className="rn-check-box"
                                            whileHover={{
                                                scale: 1.03,
                                                transition: { duration: 0.3 },
                                            }}
                                            onClick={() =>
                                                setSelectedWallet("Stripe")
                                            }
                                            style={{
                                                border: `2px solid ${
                                                    selectedWallet === "Stripe"
                                                        ? "#00ff00"
                                                        : "#363545"
                                                }`,
                                                padding: "10px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Image
                                                src="/wallet/Stripe.svg"
                                                alt="Stripe"
                                                width={200}
                                                height={200}
                                            />
                                        </motion.div>

                                        {/* Show connected wallet or all options if no wallet is connected */}
                                        {wallets
                                            .filter(
                                                (wallet) =>
                                                    wallet.name !== "Stripe"
                                            )
                                            .filter(
                                                (wallet) =>
                                                    !connectedWallet ||
                                                    wallet.name ===
                                                        connectedWallet ||
                                                    connectedWallet ===
                                                        "WalletConnect"
                                            )
                                            .map((wallet) => (
                                                <motion.div
                                                    key={wallet.name}
                                                    className="rn-check-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        setSelectedWallet(
                                                            wallet.name
                                                        )
                                                    }
                                                    style={{
                                                        border: `2px solid ${
                                                            selectedWallet ===
                                                            wallet.name
                                                                ? "#00ff00"
                                                                : "#363545"
                                                        }`,
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <Image
                                                        src={wallet.src}
                                                        alt={wallet.name}
                                                        width={wallet.width}
                                                        height={wallet.height}
                                                    />
                                                </motion.div>
                                            ))}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box">
                                            <Button
                                                type="submit"
                                                fullwidth
                                                disabled={isLoading}
                                            >
                                                {isLoading
                                                    ? "Launching..."
                                                    : "Launch NFT"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSingleNFTArea;
