import React, { useState, useEffect } from "react";
import Button from "@ui/button";
import styles from "./ApplyLaunchpadWrapper.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import Loader from "@components/loader";
import { useDispatch, useSelector } from "react-redux";
import { useLaunchCollectionMutation } from "src/services/marketplace.service";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { MutatingDots } from "react-loader-spinner";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { useRouter } from "next/router";
import { FaTwitter, FaGlobe, FaDiscord, FaInstagram } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import collectionService from "src/services/collection.service";
import { useAccountContext } from "src/contexts";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

// const policies = [
//     "COLLECTION",
//     "INSTANT-MINT",
//     "MARKETPLACE",
//     "FIXED-SALE",
//     "AUCTION-SALE",
//     "BLACKLIST",
//     "DISABLE-BURN",
//     "DISABLE-TRANSFER",
//     "DISABLE-SALE",
//     "DUTCH-AUCTION-SALE",
//     "EXTRA-POLICIES",
//     "FIXED-ISSUANCE",
//     "GUARDS",
//     "NON-FUNGIBLE",
//     "ROYALTY",
//     "TRUSTED-CUSTODY",
// ];

const policies = [
    "COLLECTION",
    "INSTANT-MINT",
    "MARKETPLACE",
    "FIXED-SALE",
    "AUCTION-SALE",
    "ADJUSTABLE-ROYALTY",
    "DISABLE-BURN",
    "DUTCH-AUCTION-SALE",
    "NON-FUNGIBLE",
    "ROYALTY",
];

const defaultPolicies = [
    "COLLECTION",
    "MARKETPLACE",
    "NON-FUNGIBLE",
    "INSTANT-MINT",
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
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

const MarketplaceCreateCollectionWrapper = ({ className, space, onBack }) => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const [launchCollection, { isLoading, isError, error }] =
        useLaunchCollectionMutation();
    // const balance = useSelector((state) => state.balance.value);
    // console.log(balance, "balance");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);
    const [hasImageError, setHasImageError] = useState(false);
    const [imageCoverLoading, setImageCoverLoading] = useState(false);
    const [imageBannerLoading, setImageBannerLoading] = useState(false);
    const [tokenCount, setTokenCount] = useState(0);
    const [policy, setPolicy] = useState(defaultPolicies);
    const [disabledPolicies, setDisabledPolicies] = useState([]);
    const account = useAccountContext();
    console.log("Account:", account);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [connectedWallet, setConnectedWallet] = useState(null);
    const [haveSufficientBalance, setHaveSufficientBalance] = useState(false);
    const [tokenList, setTokenList] = useState([]);
    const [imageCoverProgress, setImageCoverProgress] = useState(0);
    const [imageBannerProgress, setImageBannerProgress] = useState(0);
    const [isCoverUploading, setIsCoverUploading] = useState(false);
    const [isBannerUploading, setIsBannerUploading] = useState(false);
    const [coverUploadError, setCoverUploadError] = useState(null);
    const [bannerUploadError, setBannerUploadError] = useState(null);
    console.log("imageCoverProgress", imageCoverProgress);
    console.log("imageBannerProgress", imageBannerProgress);

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
        setValue,
        watch,
    } = useForm({
        mode: "onChange",
    });
    // const tokenList = watch("tokenList");

    useEffect(() => {
        console.log("watch", watch("tokenList"));
        const tokenList = watch("tokenList") || "";

        // Remove any whitespace
        const processedTokenList = tokenList.trim();

        if (
            processedTokenList &&
            !processedTokenList.includes(" ") &&
            !processedTokenList.includes('"') &&
            !processedTokenList.includes(",") &&
            !processedTokenList.includes("[") &&
            !processedTokenList.includes("]")
        ) {
            // dispatch(setCollectionRequestUriList(processedTokenList));
            setTokenList(processedTokenList);
        } else {
            // dispatch(setCollectionRequestUriList([]));
            setTokenList([]);
        }
    }, [watch("tokenList")]);

    useEffect(() => {
        console.log("Account:", account?.user?.walletAddress);
        if (account?.user?.walletAddress) {
            setValue("creatorWallet", account?.user?.walletAddress);
        }
    }, [account, setValue]);

    // useEffect(() => {
    //     if (balance >= parseFloat(process.env.NEXT_PUBLIC_LAUNCHPAD_CHARGES)) {
    //         setHaveSufficientBalance(true);
    //     } else {
    //         setHaveSufficientBalance(false);
    //     }
    // }, [balance]);

    // useEffect(() => {
    //     if (tokenList) {
    //         const count = tokenList
    //             .split(",")
    //             .filter((token) => token.trim() !== "").length;
    //         setTokenCount(count);
    //         setValue("totalSupply", count);
    //     }
    // }, [tokenList, setValue]);

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

        const isAdjustableRoyaltyChanged =
            newValue.includes("ADJUSTABLE-ROYALTY") !==
            policy.includes("ADJUSTABLE-ROYALTY");
        const isRoyaltyChanged =
            newValue.includes("ROYALTY") !== policy.includes("ROYALTY");

        if (isAdjustableRoyaltyChanged) {
            if (newValue.includes("ADJUSTABLE-ROYALTY")) {
                newValue = newValue.filter((item) => item !== "ROYALTY");
                setDisabledPolicies(["ROYALTY"]);
            } else {
                setDisabledPolicies([]);
            }
        } else if (isRoyaltyChanged) {
            if (newValue.includes("ROYALTY")) {
                newValue = newValue.filter(
                    (item) => item !== "ADJUSTABLE-ROYALTY"
                );
                setDisabledPolicies(["ADJUSTABLE-ROYALTY"]);
            } else {
                setDisabledPolicies([]);
            }
        }
        newValue = [...new Set([...defaultPolicies, ...newValue])];

        setPolicy(newValue);
    };

    // const uploadImage = async (name, file) => {
    //     if (name === "coverImage") setImageCoverLoading(true);
    //     if (name === "profileImage") setImageBannerLoading(true);

    //     try {
    //         const formData = new FormData();
    //         formData.append(name, file);
    //         const response = await collectionService.uploadImageById(formData);
    //         console.log("Image Upload Response:", response.data);

    //         if (response?.data?.status === "success") {
    //             const imageUrl =
    //                 response.data.data.collectionCoverImage ||
    //                 response.data.data.collectionBannerImage;
    //             console.log("Image URL:", imageUrl);

    //             if (name === "coverImage") {
    //                 setSelectedImage(imageUrl); // Use the server URL
    //                 setImageCoverLoading(false);
    //             }
    //             if (name === "profileImage") {
    //                 setSelectedBannerImage(imageUrl); // Use the server URL
    //                 setImageBannerLoading(false);
    //             }
    //         } else {
    //             toast.error("Image Upload Failed");
    //             setImageCoverLoading(false);
    //             setImageBannerLoading(false);
    //         }
    //     } catch (error) {
    //         console.log("Image Upload Error:", error);
    //         setImageCoverLoading(false);
    //         setImageBannerLoading(false);
    //     } finally {
    //         // Reset the file input to allow re-uploading the same file
    //         document.getElementById(
    //             name === "coverImage" ? "coverFile" : "bannerFile"
    //         ).value = null;
    //     }
    // };

    // const uploadImage = async (name, file) => {
    //     const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
    //     if (name === "coverImage") setImageCoverLoading(true);
    //     if (name === "profileImage") setImageBannerLoading(true);

    //     return new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         const formData = new FormData();
    //         formData.append(name, file);

    //         xhr.open(
    //             "POST",
    //             `${API_URL}launch-collection/upload-image-data-ipfs`,
    //             true
    //         );

    //         // Add your authentication token
    //         const token = localStorage.getItem("token");
    //         xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    //         xhr.upload.onprogress = (event) => {
    //             if (event.lengthComputable) {
    //                 const percentComplete = (event.loaded / event.total) * 100;
    //                 // Update your progress state here
    //                 if (name === "coverImage") {
    //                     setImageCoverProgress(percentComplete);
    //                 } else if (name === "profileImage") {
    //                     setImageBannerProgress(percentComplete);
    //                 }
    //             }
    //         };

    //         xhr.onload = function () {
    //             if (this.status >= 200 && this.status < 300) {
    //                 const response = JSON.parse(xhr.responseText);
    //                 console.log("Image Upload Response:", response.data);

    //                 if (response.status === "success") {
    //                     const imageUrl =
    //                         name === "coverImage"
    //                             ? response.data.collectionCoverImage
    //                             : response.data.collectionBannerImage;

    //                     if (name === "coverImage") {
    //                         setSelectedImage(imageUrl);
    //                         setImageCoverLoading(false);
    //                     } else if (name === "profileImage") {
    //                         setSelectedBannerImage(imageUrl);
    //                         setImageBannerLoading(false);
    //                     }
    //                     resolve(response);
    //                 } else {
    //                     toast.error("Image Upload Failed");
    //                     setImageCoverLoading(false);
    //                     setImageBannerLoading(false);
    //                     reject(new Error("Image Upload Failed"));
    //                 }
    //             } else {
    //                 console.error("Image Upload Error:", xhr.statusText);
    //                 setImageCoverLoading(false);
    //                 setImageBannerLoading(false);
    //                 reject(new Error(xhr.statusText));
    //             }
    //         };

    //         xhr.onerror = function () {
    //             console.error("Image Upload Error:", xhr.statusText);
    //             setImageCoverLoading(false);
    //             setImageBannerLoading(false);
    //             reject(new Error("Network Error"));
    //         };

    //         xhr.send(formData);
    //     });
    // };

    const uploadImage = async (name, file) => {
        const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const isProfileImage = name === "profileImage";
        
        if (isProfileImage) {
            setIsBannerUploading(true);
            setBannerUploadError(null);
        } else {
            setIsCoverUploading(true);
            setCoverUploadError(null);
        }

        if (isProfileImage) setImageBannerLoading(true);
        else setImageCoverLoading(true);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append(name, file);

            xhr.open(
                "POST",
                `${API_URL}launch-collection/upload-image-data-ipfs`,
                true
            );

            const token = localStorage.getItem("token");
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    if (isProfileImage) {
                        setImageBannerProgress(percentComplete);
                    } else {
                        setImageCoverProgress(percentComplete);
                    }
                }
            };

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    console.log("Image Upload Response:", response.data);

                    if (response.status === "success") {
                        const imageUrl = isProfileImage
                            ? response.data.collectionBannerImage
                            : response.data.collectionCoverImage;

                        if (isProfileImage) {
                            setSelectedBannerImage(imageUrl);
                            setImageBannerLoading(false);
                        } else {
                            setSelectedImage(imageUrl);
                            setImageCoverLoading(false);
                        }
                        isProfileImage ? setIsBannerUploading(false) : setIsCoverUploading(false);
                        resolve(response);
                    } else {
                        const errorMessage = "Image Upload Failed";
                        isProfileImage ? setBannerUploadError(errorMessage) : setCoverUploadError(errorMessage);
                        setImageBannerLoading(false);
                        setImageCoverLoading(false);
                        isProfileImage ? setIsBannerUploading(false) : setIsCoverUploading(false);
                        reject(new Error(errorMessage));
                    }
                } else {
                    const errorMessage = `Error: ${xhr.statusText}`;
                    isProfileImage ? setBannerUploadError(errorMessage) : setCoverUploadError(errorMessage);
                    setImageBannerLoading(false);
                    setImageCoverLoading(false);
                    isProfileImage ? setIsBannerUploading(false) : setIsCoverUploading(false);
                    reject(new Error(errorMessage));
                }
            };

            xhr.onerror = function () {
                const errorMessage = "Network Error";
                isProfileImage ? setBannerUploadError(errorMessage) : setCoverUploadError(errorMessage);
                setImageBannerLoading(false);
                setImageCoverLoading(false);
                isProfileImage ? setIsBannerUploading(false) : setIsCoverUploading(false);
                reject(new Error(errorMessage));
            };

            xhr.send(formData);
        });
    };

    console.log("Selected Image:", selectedImage);
    console.log("Selected Banner Image:", selectedBannerImage);

    const handleCoverImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            uploadImage("coverImage", file);
        }
    };

    const handleBannerImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            uploadImage("profileImage", file);
        }
    };

    const onSubmit = async (data) => {
        if (!selectedImage || !selectedBannerImage) {
            setHasImageError(true);
            return;
        }

        const mintStartDate = moment(
            `${data.mintStartDate} ${data.mintStartTime}`
        )
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss");
        const formattedStartDate = `time "${mintStartDate}Z"`;

        const mintEndDate = moment(`${data.mintEndDate} ${data.mintEndTime}`)
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = `time "${mintEndDate}Z"`;

        const collectionData = {
            collectionRequestName: data.collectionName,
            collectionRequestSymbol: "",
            collectionRequestCreator: data.creatorWallet,
            collectionRequestDescription: data.projectDescription,
            collectionRequestCategory: data.projectCategory.toUpperCase(),
            collectionRequestSupply: data.totalSupply,
            collectionRequestUriList: tokenList,
            collectionRequestMintPrice: data.mintPrice,
            collectionRequestRoyalityPerc: data.royaltyPercentage,
            collectionRequestRoyalityAddress: data.royaltyAddress,
            collectionRequestCoverImgUrl: selectedImage,
            collectionRequestBannerImgUrl: selectedBannerImage,
            collectionRequestStartDate: formattedStartDate,
            collectionRequesEndDate: formattedEndDate,
            collectionRequestEnableFreeMint: data.allowFreeMints,
            collectionRequestEnableWl: data.enableWhitelist,
            collectionRequestEnablePresale: data.enablePresale,
            collectionRequestEnableAirdrop: data.enableAirdrop,
            collectionRequestPolicy: policy.join(" "),
            walletName: account?.user?.walletName,
        };

        try {
            console.log(policy);

            if (selectedWallet === "Stripe") {
                // Implement Stripe payment logic here
                console.log("Proceeding with Stripe payment");
            } else {
                const result = await launchCollection(collectionData).unwrap();
                if (result.result.status === "success") {
                    Swal.fire({
                        title: "Success",
                        text: "Collection Synced Successfully with the blockchain",
                        icon: "success",
                        confirmButtonText: "Cool",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const body = {
                                collectionName: data.collectionName,
                                creatorName: account?.user?.name,
                                creatorEmail: account?.user?.email,
                                creatorWallet: data.creatorWallet,
                                projectDescription: data.projectDescription,
                                projectCategory:
                                    data.projectCategory.toUpperCase(),
                                expectedLaunchDate: mintStartDate,
                                // contractType: formData.contractType,
                                totalSupply: data.totalSupply,
                                collectionCoverImage: selectedImage,
                                collectionBannerImage: selectedBannerImage,
                                mintPrice: data.mintPrice,
                                royaltyPercentage: data.royaltyPercentage,
                                mintStartDate: mintStartDate,
                                mintStartTime: formattedStartDate,
                                mintEndDate: mintEndDate,
                                mintEndTime: formattedEndDate,
                                allowFreeMints: data.allowFreeMints,
                                enableWhitelist: data.enableWhitelist,
                                enablePresale: data.enablePresale,
                                enableAirdrop: data.enableAirdrop,
                                royaltyAddress: data.royaltyAddress,
                                policy: policy,
                                collectionType: "marketplace",
                                collectionId: Math.floor(
                                    Math.random() * 1000000
                                ),
                                tokenList: data.tokenList
                                    .split(",")
                                    .map((token) =>
                                        token.replace(/"/g, "").trim()
                                    ),
                            };

                            console.log(
                                "🚀 ~ createCollectionRequest ~ body",
                                body
                            );

                            const response =
                                await collectionService.launchCollection(body);
                            console.log(
                                "🚀 ~ createCollectionRequest ~ response",
                                response
                            );
                            if (response?.data?.status === "success") {
                                Swal.fire({
                                    title: "Success",
                                    text: "Collection Created Successfully",
                                    icon: "success",
                                    confirmButtonText: "Cool",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        reset();
                                        router.push("/");
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text:
                                        response?.data?.message ||
                                        "An error occurred while creating the collection",
                                    icon: "error",
                                    confirmButtonText: "Ok",
                                });
                            }

                            // reset();
                            // router.push("/");
                        }
                    });
                } else {
                    toast.error(
                        "Failed to launch collection. Please try again."
                    );
                }
            }
        } catch (err) {
            console.log("Launch Collection Error:", err);
            Swal.fire({
                title: "Error",
                text:
                    err.message ||
                    "An error occurred while creating the collection",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    return (
        <div
            className={`create-area ${
                space === 1 && "rn-section-gapTop"
            } ${className}`}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                            {/* <div className="upload-area">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">
                                        Upload Collection Cover Image
                                    </h6>
                                    <p className="formate">
                                        Drag or choose your image to upload
                                    </p>
                                </div>
                                <div className="brows-file-wrapper">
                                    <input
                                        name="coverFile"
                                        id="coverFile"
                                        type="file"
                                        className="inputfile"
                                        onChange={handleCoverImageChange}
                                    />
                                    {selectedImage && (
                                        <img
                                            id="createCoverImage"
                                            src={selectedImage}
                                            alt=""
                                            data-black-overlay="6"
                                        />
                                    )}
                                    <label
                                        htmlFor="coverFile"
                                        title="No File Chosen"
                                    >
                                        {imageCoverLoading ? (
                                            // <MutatingDots
                                            //     color="#fff"
                                            //     size={30}
                                            //     speed={1}
                                            // />
                                            <div>
                                                Uploading cover image:{" "}
                                                {imageCoverProgress.toFixed(2)}%
                                            </div>
                                        ) : (
                                            <i className="feather-upload" />
                                        )}
                                        <span className="text-center">
                                            Choose a Cover Image
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, JPEG, JPG. Max 1Gb.
                                        </p>
                                    </label>
                                </div>
                                {hasImageError && !selectedImage && (
                                    <ErrorText>
                                        Cover Image is required
                                    </ErrorText>
                                )}
                            </div> */}

<div className="upload-area">
                    <div className="upload-formate mb--30">
                        <h6 className="title">Upload Collection Cover Image</h6>
                        <p className="formate">Drag or choose your image to upload</p>
                    </div>
                    <div className="brows-file-wrapper">
                        <input
                            name="coverFile"
                            id="coverFile"
                            type="file"
                            className="inputfile"
                            onChange={handleCoverImageChange}
                        />
                        {selectedImage && (
                            <img
                                id="createCoverImage"
                                src={selectedImage}
                                alt=""
                                data-black-overlay="6"
                            />
                        )}
                        <label htmlFor="coverFile" title="No File Chosen">
                            {imageCoverLoading ? (
                                <div>
                                    {imageCoverProgress < 100 ? (
                                        `Uploading cover image: ${imageCoverProgress.toFixed(2)}%`
                                    ) : (
                                        <>
                                            Please wait...
                                            <MutatingDots
                                                color="#fff"
                                                size={30}
                                                speed={1}
                                            />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <i className="feather-upload" />
                            )}
                            <span className="text-center">Choose a Cover Image</span>
                            <p className="text-center mt--10">PNG, GIF, JPEG, JPG. Max 1Gb.</p>
                        </label>
                    </div>
                    {coverUploadError && <ErrorText>{coverUploadError}</ErrorText>}
                    {hasImageError && !selectedImage && (
                        <ErrorText>Cover Image is required</ErrorText>
                    )}
                </div>

                <div className="upload-area mt--50">
                    <div className="upload-formate mb--30">
                        <h6 className="title">Upload Collection Banner Image</h6>
                        <p className="formate">Drag or choose your image to upload</p>
                    </div>
                    <div className="brows-file-wrapper">
                        <input
                            name="bannerFile"
                            id="bannerFile"
                            type="file"
                            className="inputfile"
                            onChange={handleBannerImageChange}
                        />
                        {selectedBannerImage && (
                            <img
                                id="createBannerImage"
                                src={selectedBannerImage}
                                alt=""
                                data-black-overlay="6"
                            />
                        )}
                        <label htmlFor="bannerFile" title="No File Chosen">
                            {imageBannerLoading ? (
                                <div>
                                    {imageBannerProgress < 100 ? (
                                        `Uploading banner image: ${imageBannerProgress.toFixed(2)}%`
                                    ) : (
                                        <>
                                            Please wait...
                                            <MutatingDots
                                                color="#fff"
                                                size={30}
                                                speed={1}
                                            />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <i className="feather-upload" />
                            )}
                            <span className="text-center">Choose a Banner Image</span>
                            <p className="text-center mt--10">PNG, GIF, JPEG, JPG. Max 1Gb.</p>
                        </label>
                    </div>
                    {bannerUploadError && <ErrorText>{bannerUploadError}</ErrorText>}
                    {hasImageError && !selectedBannerImage && (
                        <ErrorText>Banner Image is required</ErrorText>
                    )}
                </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="form-wrapper-one">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="collectionName"
                                                className="form-label"
                                            >
                                                Collection Name
                                            </label>
                                            <input
                                                id="collectionName"
                                                placeholder="e. g. `Digital Awesome Game`"
                                                {...register("collectionName", {
                                                    required:
                                                        "Collection Name is required",
                                                })}
                                            />
                                            {errors.collectionName && (
                                                <ErrorText>
                                                    {
                                                        errors.collectionName
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="creatorWallet"
                                                className="form-label"
                                            >
                                                Creator Wallet Address
                                            </label>
                                            <input
                                                id="creatorWallet"
                                                placeholder="e. g. `k:0x1234567890`"
                                                {...register("creatorWallet", {
                                                    pattern: {
                                                        value: /^k:/,
                                                        message:
                                                            "Please enter a valid wallet address",
                                                    },
                                                    required:
                                                        "Wallet Address is required",
                                                })}
                                                disabled={
                                                    !!account?.user?.wallet
                                                }
                                            />
                                            {errors.creatorWallet && (
                                                <ErrorText>
                                                    {
                                                        errors.creatorWallet
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="projectDescription"
                                                className="form-label"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id="projectDescription"
                                                rows="3"
                                                placeholder="e. g. `This is a digital awesome game`"
                                                {...register(
                                                    "projectDescription",
                                                    {
                                                        required:
                                                            "Description is required",
                                                    }
                                                )}
                                            />
                                            {errors.projectDescription && (
                                                <ErrorText>
                                                    {
                                                        errors
                                                            .projectDescription
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="projectCategory"
                                                className="form-label"
                                            >
                                                Project Category
                                            </label>
                                            <select
                                                id="projectCategory"
                                                style={{
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #363545",
                                                    marginBottom: "10px",
                                                    height: "50px",
                                                    backgroundColor: "#f7f7f7",
                                                }}
                                                {...register(
                                                    "projectCategory",
                                                    {
                                                        required:
                                                            "Project Category is required",
                                                    }
                                                )}
                                            >
                                                <option value="">
                                                    Select a category
                                                </option>
                                                <option value="art">
                                                    Art & Collectibles
                                                </option>
                                                <option value="photography">
                                                    Photography
                                                </option>
                                                <option value="gaming">
                                                    Gaming
                                                </option>
                                                <option value="music">
                                                    Music & Audio
                                                </option>
                                                <option value="virtual">
                                                    Virtual Real Estate
                                                </option>
                                                <option value="fashion">
                                                    Fashion & Accessories
                                                </option>
                                                <option value="sports">
                                                    Sports
                                                </option>
                                                <option value="utility">
                                                    Utility & Memberships
                                                </option>
                                                <option value="domains">
                                                    Domains & Virtual Assets
                                                </option>
                                                <option value="real">
                                                    Real World Assets
                                                </option>
                                            </select>
                                            {errors.projectCategory && (
                                                <ErrorText>
                                                    {
                                                        errors.projectCategory
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="totalSupply"
                                                className="form-label"
                                            >
                                                Total Supply
                                            </label>
                                            <input
                                                id="totalSupply"
                                                type="number"
                                                {...register("totalSupply", {
                                                    required:
                                                        "Total Supply is required",
                                                    min: {
                                                        value: 1,
                                                        message:
                                                            "Total Supply must be at least 1",
                                                    },
                                                    validate: (value) =>
                                                        Number.isInteger(
                                                            Number(value)
                                                        ) ||
                                                        "Total Supply must be an integer",
                                                })}
                                            />
                                            {errors.totalSupply && (
                                                <ErrorText>
                                                    {
                                                        errors.totalSupply
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintPrice"
                                                className="form-label"
                                            >
                                                Mint Price
                                            </label>
                                            <input
                                                id="mintPrice"
                                                type="number"
                                                step="0.000000000000000001"
                                                {...register("mintPrice", {
                                                    required:
                                                        "Mint Price is required",
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Mint price must be non-negative",
                                                    },
                                                })}
                                            />
                                            {errors.mintPrice && (
                                                <ErrorText>
                                                    {errors.mintPrice.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
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
                                                {...register(
                                                    "royaltyPercentage",
                                                    {
                                                        required:
                                                            "Royalty Percentage is required",
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Royalty percentage must be non-negative",
                                                        },
                                                        max: {
                                                            value: 100,
                                                            message:
                                                                "Royalty percentage must be 100 or less",
                                                        },
                                                    }
                                                )}
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
                                    </div> */}

                                    <div className="col-md-6">
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
                                            {...register("royaltyPercentage", {
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
                                                    parseFloat(value) <= 100 ||
                                                    "Royalty cannot exceed 100%",
                                            })}
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
                                                    pattern: {
                                                        value: /^k:/,
                                                        message:
                                                            "Please enter a valid wallet address",
                                                    },
                                                    required:
                                                        "Royalty Address is required",
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
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintStartDate"
                                                className="form-label"
                                            >
                                                Mint Start Date
                                            </label>
                                            <input
                                                id="mintStartDate"
                                                type="date"
                                                {...register("mintStartDate", {
                                                    required:
                                                        "Mint Start Date is required",
                                                })}
                                            />
                                            {errors.mintStartDate && (
                                                <ErrorText>
                                                    {
                                                        errors.mintStartDate
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintStartTime"
                                                className="form-label"
                                            >
                                                Mint Start Time
                                            </label>
                                            <input
                                                id="mintStartTime"
                                                type="time"
                                                {...register("mintStartTime", {
                                                    required:
                                                        "Mint Start Time is required",
                                                })}
                                            />
                                            {errors.mintStartTime && (
                                                <ErrorText>
                                                    {
                                                        errors.mintStartTime
                                                            .message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintEndDate"
                                                className="form-label"
                                            >
                                                Mint End Date
                                            </label>
                                            <input
                                                id="mintEndDate"
                                                type="date"
                                                {...register("mintEndDate", {
                                                    required:
                                                        "Mint End Date is required",
                                                })}
                                            />
                                            {errors.mintEndDate && (
                                                <ErrorText>
                                                    {errors.mintEndDate.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintEndTime"
                                                className="form-label"
                                            >
                                                Mint End Time
                                            </label>
                                            <input
                                                id="mintEndTime"
                                                type="time"
                                                {...register("mintEndTime", {
                                                    required:
                                                        "Mint End Time is required",
                                                })}
                                            />
                                            {errors.mintEndTime && (
                                                <ErrorText>
                                                    {errors.mintEndTime.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="tokenList"
                                                className="form-label"
                                            >
                                                Token URI
                                            </label>
                                            <textarea
                                                id="tokenList"
                                                rows="5"
                                                placeholder="Enter a single token URI"
                                                {...register("tokenList", {
                                                    required:
                                                        "Token URI is required",
                                                    validate: (value) => {
                                                        const processed =
                                                            value.trim();
                                                        if (
                                                            processed.includes(
                                                                " "
                                                            ) ||
                                                            processed.includes(
                                                                '"'
                                                            ) ||
                                                            processed.includes(
                                                                ","
                                                            ) ||
                                                            processed.includes(
                                                                "["
                                                            ) ||
                                                            processed.includes(
                                                                "]"
                                                            )
                                                        ) {
                                                            return "Please enter a single token URI without spaces, quotes, commas, or brackets";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                            />
                                            {errors.tokenList && (
                                                <ErrorText>
                                                    {errors.tokenList?.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
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
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div> */}
                                    {/* 
                                    <div className="col-md-12">
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
                                                                    style={{
                                                                        opacity:
                                                                            defaultPolicies.includes(
                                                                                value
                                                                            )
                                                                                ? 0.7
                                                                                : 1,
                                                                        cursor: defaultPolicies.includes(
                                                                            value
                                                                        )
                                                                            ? "not-allowed"
                                                                            : "default",
                                                                    }}
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
                                                        disabled={defaultPolicies.includes(
                                                            name
                                                        )}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="allowFreeMints"
                                                {...register("allowFreeMints")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="allowFreeMints"
                                            >
                                                Allow Free Mints
                                            </label>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableWhitelist"
                                                {...register("enableWhitelist")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enableWhitelist"
                                            >
                                                Enable Whitelist
                                            </label>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enablePresale"
                                                {...register("enablePresale")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enablePresale"
                                            >
                                                Enable Presale
                                            </label>
                                        </div>
                                    </div> */}
                                    <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableAirdrop"
                                                {...register("enableAirdrop")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enableAirdrop"
                                            >
                                                Enable Airdrop
                                            </label>
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
                                            <Button type="submit" fullwidth>
                                                Create Collection
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {isLoading && <Loader />}
        </div>
    );
};

export default MarketplaceCreateCollectionWrapper;
