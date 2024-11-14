/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "@ui/button";
import styles from "./ApplyLaunchpadWrapper.module.css";
import userService from "src/services/user.service";
import collectionService from "src/services/collection.service";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SumsubWebSdk from "@sumsub/websdk-react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useAccountContext } from "src/contexts";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import Loader from "@components/loader";
import { useDispatch, useSelector } from "react-redux";
import {
    useCollectionRequestMutation,
    useGetLaunchFeeMutation,
} from "src/services/launchpad.service";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { MutatingDots } from "react-loader-spinner";
import { useTheme } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import {
    setCollectionRequestName,
    setCollectionRequestSymbol,
    setCollectionRequestCreator,
    setLastRequestResult,
    setCollectionRequestDescription,
    setCollectionRequestCategory,
    setCollectionRequestSupply,
    setCollectionRequestUriList,
    setCollectionRequestMintPrice,
    setCollectionRequestRoyalityPerc,
    setCollectionRequestRoyalityAddress,
    setCollectionRequestCoverImgUrl,
    setCollectionRequestBannerImgUrl,
    setCollectionRequestStartDate,
    setCollectionRequesEndDate,
    setCollectionRequestEnableFreeMint,
    setCollectionRequestEnableWl,
    setCollectionRequestEnablePresale,
    setCollectionRequestEnableAirdrop,
    setCollectionRequestPolicy,
    setWalletName,
} from "src/features/launchpadSlice";
import moment from "moment";
import ConnectModal from "@components/modals/connect-modal";
import { useRouter } from "next/router";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import axios from "axios";
import Swal from "sweetalert2";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    XIcon,
    WhatsappIcon,
} from "react-share";
import { Instagram } from "lucide-react";

const socialMediaConfig = {
    facebook: {
        icon: FacebookIcon,
        pattern: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
    },
    X: { icon: XIcon, pattern: /^https?:\/\/(www\.)?x\.com\/.+/i },
    instagram: {
        icon: Instagram,
        pattern: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
    },
    linkedin: {
        icon: LinkedinIcon,
        pattern: /^https?:\/\/(www\.)?linkedin\.com\/.+/i,
    },
    telegram: {
        icon: TelegramIcon,
        pattern: /^https?:\/\/(t\.me|telegram\.me)\/.+/i,
    },
    whatsapp: {
        icon: WhatsappIcon,
        pattern: /^https?:\/\/(api\.)?whatsapp\.com\/.+/i,
    },
    email: { icon: EmailIcon, pattern: /^mailto:.+@.+\..+/i },
};

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

const shakeAnimation = {
    shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: {
            duration: 0.4,
        },
    },
};

const ApplyLaunchpadWrapper = ({ className, space }) => {
    const theme = useTheme();
    const router = useRouter();

    const dispatch = useDispatch();
    const [collectionRequest, { isLoading, isError, error }] =
        useCollectionRequestMutation();
    const [getLaunchFee] = useGetLaunchFeeMutation();
    const account = useAccountContext();
    const [step, setStep] = useState(1);
    // Get WalletConnect client and session
    const { client: wcClient, session: wcSession } = useWalletConnectClient();
    const [formData, setFormData] = useState({
        creatorName: "",
        twitter: "",
        discord: "",
        instagram: "",
        website: "",
        contractType: "",
        tokenList: "",
        mintPriceCurrency: "kda",
    });
    const balance = useSelector((state) => state.balance.value);
    console.log(balance, "balance");
    const [accessToken, setAccessToken] = useState("");
    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [shake, setShake] = useState(false);
    const [kycStatus, setKycStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageCoverLoading, setImageCoverLoading] = useState(false);
    const [imageBannerLoading, setImageBannerLoading] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [collectionData, setCollectionData] = useState({});
    const [showConnectModal, setShowConnectModal] = useState(false);
    const {
        collectionRequestName,
        collectionRequestSymbol,
        collectionRequestCreator,
        collectionRequestDescription,
        collectionRequestCategory,
        collectionRequestSupply,
        collectionRequestUriList,
        collectionRequestMintPrice,
        collectionRequestRoyalityPerc,
        collectionRequestRoyalityAddress,
        collectionRequestCoverImgUrl,
        collectionRequestBannerImgUrl,
        collectionRequestStartDate,
        collectionRequesEndDate,
        collectionRequestEnableFreeMint,
        collectionRequestEnableWl,
        collectionRequestEnablePresale,
        collectionRequestEnableAirdrop,
        collectionRequestPolicy,
        walletName,
    } = useSelector((state) => state.launchpad);
    const [showMusicSubCategory, setShowMusicSubCategory] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [policy, setPolicy] = useState(defaultPolicies);
    const [mintStartDateTime, setMintStartDateTime] = useState(null);
    const [mintEndDateTime, setMintEndDateTime] = useState(null);
    const [haveSufficientBalance, setHaveSufficientBalance] = useState(false);
    const [launchpadFee, setLaunchpadFee] = useState(0);
    console.log(process.env.NEXT_PUBLIC_LAUNCHPAD_CHARGES);
    const [disabledPolicies, setDisabledPolicies] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({
        coverImage: 0,
        profileImage: 0,
    });
    const [connectedWallet, setConnectedWallet] = useState(null);
    console.log("connectedWallet", connectedWallet);

    const [availableSocialMedia, setAvailableSocialMedia] = useState([
        { name: "Facebook", value: "facebook" },
        { name: "X", value: "X" },
        { name: "Instagram", value: "instagram" },
        { name: "LinkedIn", value: "linkedin" },
        { name: "Telegram", value: "telegram" },
        { name: "WhatsApp", value: "whatsapp" },
        { name: "Email", value: "email" },
    ]);

    const musicSubCategories = [
        { value: "pop", label: "Pop" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "classical", label: "Classical" },
        { value: "electronic", label: "Electronic/Dance" },
        { value: "hiphop", label: "Hip Hop/Rap" },
        { value: "rb", label: "R&B/Soul" },
        { value: "country", label: "Country" },
        { value: "folk", label: "Folk" },
        { value: "blues", label: "Blues" },
        { value: "world", label: "World Music" },
        { value: "ambient", label: "Ambient" },
        { value: "experimental", label: "Experimental" },
        { value: "soundtrack", label: "Soundtrack" },
        { value: "metal", label: "Metal" },
        { value: "reggae", label: "Reggae" },
        { value: "latin", label: "Latin" },
        { value: "indie", label: "Indie" }
      ];
    
    const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
    const [socialMediaUrl, setSocialMediaUrl] = useState("");
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    console.log("socialMediaLinks", socialMediaLinks);

    const handleSocialMediaChange = (event) => {
        setSelectedSocialMedia(event.target.value);
    };

    const handleSocialMediaUrlChange = (event) => {
        setSocialMediaUrl(event.target.value);
    };

    // const addSocialMediaLink = () => {
    //     if (selectedSocialMedia && socialMediaUrl) {
    //         setSocialMediaLinks((prev) => ({
    //             ...prev,
    //             [selectedSocialMedia]: socialMediaUrl,
    //         }));
    //         setAvailableSocialMedia((prev) =>
    //             prev.filter((item) => item.value !== selectedSocialMedia)
    //         );
    //         setSelectedSocialMedia("");
    //         setSocialMediaUrl("");
    //     }
    // };

    const addSocialMediaLink = () => {
        if (selectedSocialMedia && socialMediaUrl) {
            const pattern = socialMediaConfig[selectedSocialMedia]?.pattern;
            if (pattern && !pattern.test(socialMediaUrl)) {
                toast.error(`Invalid ${selectedSocialMedia} URL`);
                return;
            }
            setSocialMediaLinks((prev) => ({
                ...prev,
                [selectedSocialMedia]: socialMediaUrl,
            }));
            setAvailableSocialMedia((prev) =>
                prev.filter((item) => item.value !== selectedSocialMedia)
            );
            setSelectedSocialMedia("");
            setSocialMediaUrl("");
        }
    };
    const removeSocialMediaLink = (platform) => {
        const { [platform]: _, ...rest } = socialMediaLinks;
        setSocialMediaLinks(rest);
        setAvailableSocialMedia((prev) => [
            ...prev,
            {
                name: platform.charAt(0).toUpperCase() + platform.slice(1),
                value: platform,
            },
        ]);
    };

    // Add this to your form submission logic
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            socialMediaLinks,
        }));
    }, [socialMediaLinks]);

    // const renderSocialMediaSection = () => (
    //     <>
    //         <div className="col-md-12">
    //             <div className="input-box pb--20">
    //                 <label htmlFor="socialMedia" className="form-label">
    //                     Social Media Links
    //                 </label>
    //             </div>
    //         </div>
    //         <div className="col-md-5">
    //             <div className="input-box pb--20">
    //                 <select
    //                     style={{
    //                         padding: "10px",
    //                         borderRadius: "5px",
    //                         border: "1px solid #363545",
    //                         marginBottom: "10px",
    //                         height: "50px",
    //                         backgroundColor: "#242435",
    //                         width: "100%",
    //                         fontSize: "16px",
    //                     }}
    //                     id="socialMedia"
    //                     value={selectedSocialMedia}
    //                     onChange={handleSocialMediaChange}
    //                 >
    //                     <option value="">Select a platform</option>
    //                     {availableSocialMedia.map(({ name, value }) => (
    //                         <option key={value} value={value}>
    //                             {name}
    //                         </option>
    //                     ))}
    //                 </select>
    //             </div>
    //         </div>
    //         <div className="col-md-5">
    //             <div className="input-box pb--20">
    //                 <input
    //                     type="text"
    //                     id="socialMediaUrl"
    //                     placeholder="Enter social media URL"
    //                     value={socialMediaUrl}
    //                     onChange={handleSocialMediaUrlChange}
    //                     style={{
    //                         width: "100%",
    //                         padding: "10px",
    //                         borderRadius: "5px",
    //                         border: "1px solid #363545",
    //                         backgroundColor: "#242435",
    //                         color: "#fff",
    //                         fontSize: "16px",
    //                         height: "50px",
    //                     }}
    //                 />
    //             </div>
    //         </div>
    //         <div className="col-md-2">
    //             <div className="input-box pb--20">
    //                 <button
    //                     type="button"
    //                     onClick={addSocialMediaLink}
    //                     style={{
    //                         width: "100%",
    //                         height: "50px",
    //                         padding: "10px",
    //                         borderRadius: "5px",
    //                         border: "1px solid #363545",
    //                         backgroundColor: "#242435",
    //                         color: "#fff",
    //                         cursor: "pointer",
    //                         display: "flex",
    //                         justifyContent: "center",
    //                         alignItems: "center",
    //                     }}
    //                 >
    //                     <FaPlus size={20} />
    //                 </button>
    //             </div>
    //         </div>
    //         <div className="col-md-12">
    //                 {Object.entries(socialMediaLinks).map(([platform, url]) => (
    //                     <Chip
    //                         key={platform}
    //                         label={`${platform}: ${url}`}
    //                         sx={{ color: "#fff", backgroundColor: "#363545",width: "fit-content" }}
    //                         onDelete={() => removeSocialMediaLink(platform)}
    //                         style={{ margin: "5px" }}
    //                     />
    //                 ))}
    //             </div>
    //     </>
    // );

    const renderSocialMediaSection = () => (
        <>
            <div className="col-md-12">
                <div className="input-box pb--20">
                    <label htmlFor="socialMedia" className="form-label">
                        Social Media Links
                    </label>
                </div>
            </div>
            <div className="col-md-5">
                <div className="input-box pb--20">
                    <select
                        id="socialMedia"
                        value={selectedSocialMedia}
                        onChange={handleSocialMediaChange}
                    >
                        <option value="">Select a platform</option>
                        {availableSocialMedia.map(({ name, value }) => {
                            const Icon = socialMediaConfig[value]?.icon;
                            return (
                                <option key={value} value={value}>
                                    {Icon && <Icon size={16} round />} {name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="col-md-5">
                <div className="input-box pb--20">
                    <input
                        type="text"
                        id="socialMediaUrl"
                        placeholder="Enter social media URL"
                        value={socialMediaUrl}
                        onChange={handleSocialMediaUrlChange}
                    />
                </div>
            </div>
            <div className="col-md-2">
                <div className="input-box pb--20">
                    <button
                        type="button"
                        className="btn-add"
                        onClick={addSocialMediaLink}
                        // style={{
                        //     width: "100%",
                        //     height: "50px",
                        //     padding: "10px",
                        //     borderRadius: "5px",
                        //     border: "1px solid #363545",
                        //     backgroundColor: "#242435",
                        //     color: "#fff",
                        //     cursor: "pointer",
                        //     display: "flex",
                        //     justifyContent: "center",
                        //     alignItems: "center",
                        // }}
                    >
                        <FaPlus size={20} />
                    </button>
                </div>
            </div>
            <div className="col-md-12">
                {Object.entries(socialMediaLinks).map(([platform, url]) => {
                    const Icon = socialMediaConfig[platform]?.icon;
                    return (
                        <Chip
                        className="chip"
                            key={platform}
                            icon={Icon && <Icon size={16} round />}
                            label={`${platform}: ${url}`}
                            onDelete={() => removeSocialMediaLink(platform)}
                            // style={{
                            //     margin: "5px",
                            //     backgroundColor: "#363545",
                            //     color: "#fff",
                            // }}
                        />
                    );
                })}
            </div>
        </>
    );
    useEffect(() => {
        if (account?.user?.walletName) {
            setConnectedWallet(account.user.walletName);
        }
    }, [account]);

    useEffect(() => {
        const fetchLaunchFee = async () => {
            const response = await getLaunchFee();
            console.log("🚀 ~ fetchLaunchFee ~ response", response);
            setLaunchpadFee(response?.data || 0);
            // { data: 1 }
            if (balance >= 1) {
                setHaveSufficientBalance(true);
            } else {
                setHaveSufficientBalance(false);
            }
        };
        fetchLaunchFee();
    }, [balance]);

    const handleConnectModal = () => {
        setShowConnectModal((prev) => !prev);
    };

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
    const wallets = [
        { name: "Stripe", src: "/wallet/Stripe.svg", width: 200, height: 200 },
        {
            name: "EckoWallet",
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
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const collectionName = watch("collectionName");
    const creatorName = watch("creatorName");
    const creatorEmail = watch("creatorEmail");
    const creatorWallet = watch("creatorWallet");
    const projectDescription = watch("projectDescription");
    const projectCategory = watch("projectCategory");
    const expectedLaunchDate = watch("expectedLaunchDate");
    const mintPrice = watch("mintPrice");
    const mintPriceCurrency = watch("mintPriceCurrency");
    const royaltyPercentage = watch("royaltyPercentage");
    const mintStartDate = watch("mintStartDate");
    const mintEndDate = watch("mintEndDate");
    const mintStartTime = watch("mintStartTime");
    const mintEndTime = watch("mintEndTime");
    const tokenList = watch("tokenList");
    const royaltyAddress = watch("royaltyAddress");
    const allowFreeMints = watch("allowFreeMints");
    const enableWhitelist = watch("enableWhitelist");
    const enablePresale = watch("enablePresale");
    const enableAirdrop = watch("enableAirdrop");

    useEffect(() => {
        console.log("watch", watch("collectionName"));
        dispatch(setCollectionRequestName(watch("collectionName")));
    }, [collectionName]);

    useEffect(() => {
        console.log("watch", watch("creatorName"));
        setFormData({ ...formData, creatorName: watch("creatorName") });
    }, [creatorName]);

    useEffect(() => {
        console.log("watch", watch("creatorWallet"));
        dispatch(setCollectionRequestCreator(watch("creatorWallet")));
    }, [creatorWallet]);

    useEffect(() => {
        console.log("watch", watch("projectDescription"));
        dispatch(setCollectionRequestDescription(watch("projectDescription")));
    }, [projectDescription]);
    const mainCategory = watch("projectCategory");

    useEffect(() => {
        if (mainCategory === "music") {
          setShowMusicSubCategory(true);
        } else {
          setShowMusicSubCategory(false);
          setSelectedSubCategory('');
        }
      }, [mainCategory]);

        // Handle sub-category changes
  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setSelectedSubCategory(subCategory);
    // Combine main category and sub-category for storage
    const combinedCategory = subCategory ? `MUSIC_${subCategory.toUpperCase()}` : 'MUSIC';
    console.log("combinedCategory", combinedCategory);
    // dispatch(setCollectionRequestCategory(combinedCategory));
  };

  console.log("selectedSubCategory", selectedSubCategory);


    useEffect(() => {
        console.log("watch", watch("projectCategory"));
        dispatch(
            setCollectionRequestCategory(
                watch("projectCategory")?.toUpperCase()
            )
        );
    }, [projectCategory]);

    useEffect(() => {
        console.log("watch", watch("expectedLaunchDate"));
        dispatch(setCollectionRequestStartDate(watch("expectedLaunchDate")));
    }, [expectedLaunchDate]);

    useEffect(() => {
        console.log("watch", watch("mintPrice"));
        dispatch(setCollectionRequestMintPrice(watch("mintPrice")));
    }, [mintPrice]);

    useEffect(() => {
        console.log("watch", watch("royaltyPercentage"));
        dispatch(setCollectionRequestRoyalityPerc(watch("royaltyPercentage")));
    }, [royaltyPercentage]);

    useEffect(() => {
        console.log("watch", watch("mintStartTime"));

        const mintStartDate = moment(
            `${watch("mintStartDate")} ${watch("mintStartTime")}`
        )
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss");
        const formattedStartDate = `time "${mintStartDate}Z"`;
        console.log("formattedDate", formattedStartDate);

        dispatch(setCollectionRequestStartDate(formattedStartDate));

        // setMintStartDateTime(moment(dateTime).utc().format());
        setMintStartDateTime(
            moment(`${watch("mintStartDate")} ${watch("mintStartTime")}`)
                .utc()
                .format()
        );
    }, [mintStartTime]);
    console.log("mintStartDateTime get time only ", mintStartDateTime);

    useEffect(() => {
        console.log("watch", watch("mintEndTime"));
        const mintEndDate = moment(
            `${watch("mintEndDate")} ${watch("mintEndTime")}`
        )
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = `time "${mintEndDate}Z"`;
        console.log("formattedEndDate", formattedEndDate);

        dispatch(setCollectionRequesEndDate(formattedEndDate));

        setMintEndDateTime(
            moment(`${watch("mintEndDate")} ${watch("mintEndTime")}`)
                .utc()
                .format()
        );
    }, [mintEndTime]);
    console.log("mintEndDateTime", mintEndDateTime);

    // useEffect(() => {
    //     console.log("watch", watch("tokenList"));
    //     dispatch(
    //         setCollectionRequestUriList(
    //             watch("tokenList")
    //                 ?.split(",")
    //                 ?.map((token) => token.replace(/"/g, "").trim())
    //         )
    //     );

    //     //totalSupply
    //     setValue(
    //         "totalSupply",
    //         watch("tokenList")
    //             ?.split(",")
    //             .map((token) => token.replace(/"/g, "").trim()).length
    //     );

    //     dispatch(
    //         setCollectionRequestSupply(
    //             watch("tokenList")
    //                 ?.split(",")
    //                 ?.map((token) => token.replace(/"/g, "").trim()).length
    //         )
    //     );
    // }, [tokenList]);

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
            dispatch(setCollectionRequestUriList(processedTokenList));
        } else {
            dispatch(setCollectionRequestUriList([]));
        }
    }, [watch("tokenList")]);

    // Remove the automatic totalSupply calculation
    useEffect(() => {
        console.log("watch", watch("totalSupply"));
        dispatch(
            setCollectionRequestSupply(parseInt(watch("totalSupply")) || 0)
        );
    }, [watch("totalSupply")]);

    useEffect(() => {
        console.log("watch", watch("royaltyAddress"));
        dispatch(setCollectionRequestRoyalityAddress(watch("royaltyAddress")));
    }, [royaltyAddress]);

    useEffect(() => {
        console.log("watch", watch("allowFreeMints"));
        dispatch(setCollectionRequestEnableFreeMint(watch("allowFreeMints")));
    }, [allowFreeMints]);

    useEffect(() => {
        console.log("watch", watch("enableWhitelist"));
        dispatch(setCollectionRequestEnableWl(watch("enableWhitelist")));
    }, [enableWhitelist]);

    useEffect(() => {
        console.log("watch", watch("enablePresale"));
        dispatch(setCollectionRequestEnablePresale(watch("enablePresale")));
    }, [enablePresale]);

    useEffect(() => {
        console.log("watch", watch("enableAirdrop"));
        dispatch(setCollectionRequestEnableAirdrop(watch("enableAirdrop")));
    }, [enableAirdrop]);

    useEffect(() => {
        console.log("policy", policy);
        const newPolicy = policy.toString().replace(/,/g, " ");
        console.log("newPolicy", newPolicy);

        dispatch(setCollectionRequestPolicy(newPolicy));
    }, [policy]);

    useEffect(() => {
        console.log("selectedWallet", selectedWallet);
        dispatch(setWalletName(selectedWallet));
    }, [selectedWallet]);

    //contract
    const contractType = watch("contractType");
    useEffect(() => {
        console.log("watch", watch("contractType"));
        setFormData({ ...formData, contractType });
    }, [contractType]);

    //twitter
    const twitter = watch("twitter");
    useEffect(() => {
        console.log("watch", watch("twitter"));
        setFormData({ ...formData, twitter });
    }, [twitter]);

    //discord
    const discord = watch("discord");
    useEffect(() => {
        console.log("watch", watch("discord"));
        setFormData({ ...formData, discord });
    }, [discord]);

    //instagram
    const instagram = watch("instagram");
    useEffect(() => {
        console.log("watch", watch("instagram"));
        setFormData({ ...formData, instagram });
    }, [instagram]);

    //website
    const website = watch("website");
    useEffect(() => {
        console.log("watch", watch("website"));
        setFormData({ ...formData, website });
    }, [website]);

    const imageChange = (e) => {
        console.log("🚀 ~ imageChange ~ e", e);
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            // uploadImage("coverImage", e.target.files[0]);
        }
    };
    const imageBannerChange = (e) => {
        console.log("🚀 ~ imageBannerChange ~ e", e);
        if (e.target.files && e.target.files.length > 0) {
            setSelectedBannerImage(e.target.files[0]);
            // uploadImage("profileImage", e.target.files[0]);
        }
    };

    console.log("formData", collectionRequestUriList);

    const handleWalletSubmit = async () => {
        // console.log(data);

        console.log(
            "collectionRequestCoverImgUrl",
            collectionRequestCoverImgUrl
        );
        console.log(
            "collectionRequestBannerImgUrl",
            collectionRequestBannerImgUrl
        );
        if (walletName === "WalletConnect") {
            console.log("🚀 ~ handleWalletSubmit ~ wcClient", wcClient);
            console.log("🚀 ~ handleWalletSubmit ~ wcSession", wcSession);
        }

        try {
            const result = await collectionRequest({
                collectionRequestName,
                collectionRequestSymbol,
                collectionRequestCreator,
                collectionRequestDescription,
                collectionRequestCategory,
                collectionRequestSupply,
                collectionRequestUriList,
                collectionRequestMintPrice,
                collectionRequestRoyalityPerc,
                collectionRequestRoyalityAddress,
                collectionRequestCoverImgUrl,
                collectionRequestBannerImgUrl,
                collectionRequestStartDate,
                collectionRequesEndDate,
                collectionRequestEnableFreeMint,
                collectionRequestEnableWl,
                collectionRequestEnablePresale,
                collectionRequestEnableAirdrop,
                collectionRequestPolicy,
                walletName,
                wcClient,
                wcSession,
            }).unwrap();
            dispatch(setLastRequestResult(result));
            if (result.result.status === "success") {
                const createResponse = await createCollectionRequest();
                if (createResponse?.data?.status === "success") {
                    const body = {
                        paymentId: result.reqKey,
                        paymentStatus: "paid",
                        paymentAmount: 1,
                        paymentCurrency: "kda",
                        paymentDate: new Date(),
                        paymentMethod: "wallet",
                        paymentDescription: "collection creation",
                        paymentUserRole: "user",
                        order_id: createResponse?.data?.data?._id,
                        order_type: "apply-launchpad",
                        type: "wallet",
                    };
                    const response =
                        await collectionService.createCheckoutSession(body);

                    dispatch(setCollectionRequestName(""));
                    dispatch(setCollectionRequestSymbol(""));
                    dispatch(setCollectionRequestCreator(""));
                    dispatch(setCollectionRequestDescription(""));
                    dispatch(setCollectionRequestCategory(""));
                    dispatch(setCollectionRequestSupply(0));
                    dispatch(setCollectionRequestUriList([]));
                    dispatch(setCollectionRequestMintPrice(0));
                    dispatch(setCollectionRequestRoyalityPerc(0));
                    dispatch(setCollectionRequestRoyalityAddress(""));
                    dispatch(setCollectionRequestCoverImgUrl(""));
                    dispatch(setCollectionRequestBannerImgUrl(""));
                    dispatch(setCollectionRequestStartDate(""));
                    dispatch(setCollectionRequesEndDate(""));
                    dispatch(setCollectionRequestEnableFreeMint(false));
                    dispatch(setCollectionRequestEnableWl(false));
                    dispatch(setCollectionRequestEnablePresale(false));
                    dispatch(setCollectionRequestEnableAirdrop(false));
                    dispatch(setCollectionRequestPolicy(""));
                    dispatch(setWalletName(""));
                    setStep(1);

                    console.log("🚀 ~ handleWalletSubmit ~ response", response);
                    Swal.fire({
                        title: "Success",
                        text: "Collection Created Successfully",
                        icon: "success",
                        confirmButtonText: "Cool",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(setCollectionRequestName(""));
                            dispatch(setCollectionRequestSymbol(""));
                            dispatch(setCollectionRequestCreator(""));
                            dispatch(setCollectionRequestDescription(""));
                            dispatch(setCollectionRequestCategory(""));
                            dispatch(setCollectionRequestSupply(0));
                            dispatch(setCollectionRequestUriList([]));
                            dispatch(setCollectionRequestMintPrice(0));
                            dispatch(setCollectionRequestRoyalityPerc(0));
                            dispatch(setCollectionRequestRoyalityAddress(""));
                            dispatch(setCollectionRequestCoverImgUrl(""));
                            dispatch(setCollectionRequestBannerImgUrl(""));
                            dispatch(setCollectionRequestStartDate(""));
                            dispatch(setCollectionRequesEndDate(""));
                            dispatch(setCollectionRequestEnableFreeMint(false));
                            dispatch(setCollectionRequestEnableWl(false));
                            dispatch(setCollectionRequestEnablePresale(false));
                            dispatch(setCollectionRequestEnableAirdrop(false));
                            dispatch(setCollectionRequestPolicy(""));
                            dispatch(setWalletName(""));
                            window.location.href = "/";
                        }
                    });
                }
            }
        } catch (err) {
            dispatch(setLastRequestResult(err));
            console.log("🚀 ~ handleWalletSubmit ~ err", err);
            if (err.message === "Insufficient funds") {
                Swal.fire({
                    title: "Error",
                    text: "Insufficient funds",
                    icon: "error",
                    confirmButtonText: "Cool",
                });
            }

            // Handle error
        }
    };

    // Add this validation function
    const validateDateTime = () => {
        const startDate = watch("mintStartDate");
        const endDate = watch("mintEndDate");
        const startTime = watch("mintStartTime");
        const endTime = watch("mintEndTime");

        if (startDate && endDate && startTime && endTime) {
            const startDateTime = new Date(`${startDate}T${startTime}`);
            const endDateTime = new Date(`${endDate}T${endTime}`);
            return endDateTime > startDateTime;
        }
        return true;
    };

    useEffect(() => {
        console.log("watch", watch("mintStartTime"));

        const mintStartDate = moment(
            `${watch("mintStartDate")} ${watch("mintStartTime")}`
        )
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss");
        const formattedStartDate = `time "${mintStartDate}Z"`;
        console.log("formattedDate", formattedStartDate);

        if (validateDateTime()) {
            dispatch(setCollectionRequestStartDate(formattedStartDate));
            setMintStartDateTime(
                moment(`${watch("mintStartDate")} ${watch("mintStartTime")}`)
                    .utc()
                    .format()
            );
        } else {
            toast.error("Start date/time must be before end date/time");
        }
    }, [watch("mintStartTime"), watch("mintStartDate")]);

    useEffect(() => {
        console.log("watch", watch("mintEndTime"));
        const mintEndDate = moment(
            `${watch("mintEndDate")} ${watch("mintEndTime")}`
        )
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = `time "${mintEndDate}Z"`;
        console.log("formattedEndDate", formattedEndDate);

        if (validateDateTime()) {
            dispatch(setCollectionRequesEndDate(formattedEndDate));
            setMintEndDateTime(
                moment(`${watch("mintEndDate")} ${watch("mintEndTime")}`)
                    .utc()
                    .format()
            );
        } else {
            toast.error("End date/time must be after start date/time");
        }
    }, [watch("mintEndTime"), watch("mintEndDate")]);

    const createCollectionRequest = async () => {
        const body = {
            collectionName: collectionRequestName,
            creatorName: account?.user?.name,
            creatorEmail: account?.user?.email,
            creatorWallet: creatorWallet,
            projectDescription: collectionRequestDescription,
            projectCategory: collectionRequestCategory,
            musicSubCategory: selectedSubCategory,
            expectedLaunchDate: expectedLaunchDate,
            // twitter: formData.twitter,
            // discord: formData.discord,
            // instagram: formData.instagram,
            // website: formData.website,
            socialMediaLinks: socialMediaLinks,
            contractType: formData.contractType,
            totalSupply: collectionRequestSupply,
            mintPrice: collectionRequestMintPrice,
            mintPriceCurrency: mintPriceCurrency,
            royaltyPercentage: collectionRequestRoyalityPerc,
            mintStartDate: mintStartDateTime,
            mintStartTime: collectionRequestStartDate,
            mintEndDate: mintEndDateTime,
            mintEndTime: collectionRequesEndDate,
            allowFreeMints: collectionRequestEnableFreeMint,
            enableWhitelist: collectionRequestEnableWl,
            enablePresale: collectionRequestEnablePresale,
            enableAirdrop: collectionRequestEnableAirdrop,
            royaltyAddress: collectionRequestRoyalityAddress,
            policy: collectionRequestPolicy,
            tokenList: collectionRequestUriList,
            collectionCoverImage: collectionRequestCoverImgUrl,
            collectionBannerImage: collectionRequestBannerImgUrl,
        };

        console.log("🚀 ~ createCollectionRequest ~ body", body);

        const response = await collectionService.launchCollection(body);
        if (response?.data?.status === "success") {
            return response;
        } else {
            if (response?.data?.message === "Conflict") {
                toast.error("Collection with this name already exists");
            }
        }
    };

    const onSubmit = async (data, e) => {
        if (haveSufficientBalance === false) {
            Swal.fire({
                title: "Error",
                text: "Insufficient balance",
                icon: "error",
                confirmButtonText: "Top Up",
                showCancelButton: true,
                cancelButtonText: "Close",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/deposit");
                }
            });

            return;
        }

        console.log("account", account);
        if (account?.user?.walletAddress) {
            if (kycStatus) {
                if (step === 1) {
                    setStep(2);
                }
                if (step === 2) {
                    if (!selectedImage || !selectedBannerImage) {
                        setHasImageError(true);
                        return;
                    }

                    if (selectedWallet === null) {
                        setShake(true);
                        toast.error("Please select payment option");
                        return;
                    }

                    if (!validateDateTime()) {
                        toast.error(
                            "End date/time must be after start date/time"
                        );
                        return;
                    }

                    if (selectedWallet === "Stripe") {
                        const responsecreate = await createCollectionRequest();
                        if (responsecreate?.data?.status === "success") {
                            const stripe = await loadStripe(
                                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                            );
                            const body = {
                                collectionName: collectionRequestName,
                                mintPrice: launchpadFee,
                                mintPriceCurrency: mintPriceCurrency,
                                type: "apply-launchpad",
                            };
                            const response =
                                await collectionService.createCheckoutSession(
                                    body
                                );
                            const session = response.data.data;
                            const result = await stripe.redirectToCheckout({
                                sessionId: session.id,
                            });
                        }
                    }
                    if (
                        selectedWallet === "EckoWallet" ||
                        selectedWallet === "Chainweaver" ||
                        selectedWallet === "WalletConnect"
                    ) {
                        console.log("EckoWallet");
                        handleWalletSubmit();
                    }
                }
            } else {
                setShake(true);
            }
        } else {
            handleConnectModal();
        }
    };

    // const uploadImage = async (name, file) => {
    //     console.log("🚀 ~ uploadImage ~ name:", name);
    //     console.log("🚀 ~ uploadImage ~ file:", file);
    //     if (name === "coverImage") {
    //         setImageCoverLoading(true);
    //     }
    //     if (name === "profileImage") {
    //         setImageBannerLoading(true);
    //     }

    //     try {
    //         const formData = new FormData();
    //         formData.append(name, file);
    //         const response = await collectionService.uploadImage(
    //             formData,
    //             collectionRequestName
    //         );
    //         console.log("🚀 ~ uploadImage ~ response", response);
    //         if (response?.data?.status === "success") {
    //             if (name === "coverImage") {
    //                 setSelectedImage(file);
    //                 setImageCoverLoading(false);
    //                 dispatch(
    //                     setCollectionRequestCoverImgUrl(
    //                         response.data.data.collectionCoverImage
    //                     )
    //                 );
    //             }
    //             if (name === "profileImage") {
    //                 setSelectedBannerImage(file);
    //                 setImageBannerLoading(false);
    //                 dispatch(
    //                     setCollectionRequestBannerImgUrl(
    //                         response.data.data.collectionBannerImage
    //                     )
    //                 );
    //             }
    //         } else {
    //             toast.error("Image Upload Failed");
    //             if (name === "coverImage") {
    //                 setImageCoverLoading(false);
    //             }
    //             if (name === "profileImage") {
    //                 setImageBannerLoading(false);
    //             }
    //         }
    //     } catch (error) {
    //         console.log("🚀 ~ uploadImage ~ error", error);
    //         setImageCoverLoading(false);
    //         setImageBannerLoading(false);
    //     }
    // };

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
    //                 dispatch(setCollectionRequestCoverImgUrl(imageUrl));
    //             }
    //             if (name === "profileImage") {
    //                 setSelectedBannerImage(imageUrl); // Use the server URL
    //                 setImageBannerLoading(false);
    //                 dispatch(setCollectionRequestBannerImgUrl(imageUrl));
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

    // console.log("Selected Image:", selectedImage);
    // console.log("Selected Banner Image:", selectedBannerImage);

    // const handleCoverImageChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0];
    //         uploadImage("coverImage", file);
    //     }
    // };

    // const handleBannerImageChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0];
    //         uploadImage("profileImage", file);
    //     }
    // };

    const uploadImage = async (name, file) => {
        if (name === "coverImage") setImageCoverLoading(true);
        if (name === "profileImage") setImageBannerLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
            const formData = new FormData();
            formData.append(name, file);

            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${API_URL}launch-collection/upload-image-data-ipfs`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress((prev) => ({
                            ...prev,
                            [name]: percentCompleted,
                        }));
                    },
                }
            );

            console.log("Image Upload Response:", response.data);

            if (response?.data?.status === "success") {
                const imageUrl =
                    response.data.data.collectionCoverImage ||
                    response.data.data.collectionBannerImage;
                console.log("Image URL:", imageUrl);

                if (name === "coverImage") {
                    setSelectedImage(imageUrl);
                    setImageCoverLoading(false);
                    dispatch(setCollectionRequestCoverImgUrl(imageUrl));
                }
                if (name === "profileImage") {
                    setSelectedBannerImage(imageUrl);
                    setImageBannerLoading(false);
                    dispatch(setCollectionRequestBannerImgUrl(imageUrl));
                }
            } else {
                toast.error("Image Upload Failed");
                setImageCoverLoading(false);
                setImageBannerLoading(false);
            }
        } catch (error) {
            console.log("Image Upload Error:", error);
            toast.error("Image Upload Failed");
            setImageCoverLoading(false);
            setImageBannerLoading(false);
        } finally {
            // Reset the file input to allow re-uploading the same file
            document.getElementById(
                name === "coverImage" ? "coverFile" : "bannerFile"
            ).value = null;
            setUploadProgress((prev) => ({ ...prev, [name]: 0 }));
        }
    };

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

    useEffect(() => {
        if (account?.user?.verified) {
            setKycStatus(true);
        }
        reset({
            creatorName: account?.user?.name,
            creatorEmail: account?.user?.email,
            creatorWallet: account?.user?.walletAddress,
        });
    }, [account]);

    const handleKyc = async (e) => {
        e.preventDefault();
        console.log(account?.user?.verified);
        if (account?.user?.verified === false) {
            const response = await userService.getAccessToken();
            console.log("🚀 ~ handleSubmit ~ response", response);
            if (response?.data?.status === "success") {
                const accessToken = response.data.data.token;
                console.log("🚀 ~ handleSubmit ~ accessToken", accessToken);
                setAccessToken(accessToken);
                setOpen(true);
            } else {
                toast.error(
                    "Oops! Something went wrong. Please try again later."
                );
            }
        } else {
            console.log("🚀 ~ handleKyc ~ kycStatus", kycStatus);
        }
    };

    const verificationComplete = async (payload) => {
        const data = {
            applicantData: payload,
        };
        // createVerification
        const response = await userService.createVerification(data);
        console.log("🚀 ~ verificationComplete ~ response", response);
        if (response?.status === 200 || response?.status === 201) {
            setKycStatus(true);
        } else {
            toast.error("Oops! Something went wrong. Please try again later.");
        }
    };

    const renderStage1Form = () => (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block text-jusify">
                                    <Image
                                        src="/assets-images/LogoIcon.png"
                                        alt="Launchpad"
                                        width={100}
                                        height={100}
                                        style={{ marginBottom: "20px" }}
                                    />
                                    <h5>
                                        {" "}
                                        Launchpad - Expression of Interest{" "}
                                    </h5>
                                    <span style={{ fontSize: "16px" }}>
                                        Ready to Blast Off? Kryptomerch is on
                                        the lookout for stellar, one-of-a-kind
                                        projects to launch their collections via
                                        the Kryptomerch Launchpad. If your
                                        project’s got the right spark, we might
                                        just help you take it to the moon!
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        Applications are reviewed on a rolling
                                        basis, and with the cosmic number of
                                        submissions we receive, we can't always
                                        respond to everyone. But don’t worry –
                                        if your project is out of this world,
                                        you’ll hear from us!
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        Re-applying: Want to give your
                                        application a boost? Feel free to
                                        re-apply with any rocket-fuelled
                                        updates—whether it's new details on your
                                        collection, community growth, or any
                                        extra bells and whistles. When
                                        re-applying, please mark the first field
                                        “Project Name” as [RE-APPLY], followed
                                        by your project’s name (e.g.,
                                        “[RE-APPLY] Galactic Journey”).
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        {" "}
                                        Heads up! The info you provide in this
                                        form is subject to our Privacy Policy,
                                        so we’ve got your back!
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        By submitting your Expression of
                                        Interest, you're agreeing to
                                        <a
                                            href="https://kryptomerch.com/terms-of-service"
                                            target="_blank"
                                        >
                                            {" "}
                                            Kryptomerch Terms of Service
                                        </a>{" "}
                                        So, buckle up, and let’s see if your
                                        project has what it takes to launch!
                                    </span>{" "}
                                    <div className="mt--30">
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {" "}
                                            Launchpad Fee : {launchpadFee} KDA
                                        </span>{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-md-4">
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
                                                    {...register(
                                                        "collectionName",
                                                        {
                                                            required:
                                                                "Collection Name is required",
                                                        }
                                                    )}
                                                />
                                                {errors.collectionName && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .collectionName
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="creatorName"
                                                    className="form-label"
                                                >
                                                    Creator Name
                                                </label>
                                                <input
                                                    id="creatorName"
                                                    placeholder="e. g. `John Doe`"
                                                    // value={account?.user?.name}
                                                    {...register(
                                                        "creatorName",
                                                        {
                                                            required:
                                                                "Creator Name is required",
                                                        }
                                                    )}
                                                />
                                                {errors.creatorName && (
                                                    <ErrorText>
                                                        {
                                                            errors.creatorName
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="creatorEmail"
                                                    className="form-label"
                                                >
                                                    Creator Email
                                                </label>
                                                <input
                                                    id="creatorEmail"
                                                    placeholder="e. g. `abc@example.com`"
                                                    // value={account?.user?.email}
                                                    {...register(
                                                        "creatorEmail",
                                                        {
                                                            required:
                                                                "Creator Email is required",
                                                        }
                                                    )}
                                                    disabled={
                                                        account?.user?.email
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {errors.creatorEmail && (
                                                    <ErrorText>
                                                        {
                                                            errors.creatorEmail
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
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
                                                    // value={account?.user?.walletAddress}
                                                    {...register(
                                                        "creatorWallet",
                                                        {
                                                            pattern: {
                                                                // wallet address start with k
                                                                value: /^k:/,
                                                                message:
                                                                    "Please enter a valid wallet address",
                                                            },

                                                            required:
                                                                "Wallet Address is required",
                                                        }
                                                    )}
                                                    disabled={
                                                        account?.user
                                                            ?.walletAddress
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {errors.creatorWallet && (
                                                    <ErrorText>
                                                        {
                                                            errors.creatorWallet
                                                                ?.message
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
                                                    Discription
                                                </label>
                                                <textarea
                                                    id="projectDescription"
                                                    rows="3"
                                                    placeholder="e. g. “This is a digital art collection”"
                                                    {...register(
                                                        "projectDescription",
                                                        {
                                                            required:
                                                                "Discription is required",
                                                        }
                                                    )}
                                                />
                                                {errors.projectDescription && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .projectDescription
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        {/* project category */}
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="projectCategory"
                                                    className="form-label"
                                                >
                                                    Project Category
                                                </label>
                                                <select
                                                    id="projectCategory"
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
                                                            errors
                                                                .projectCategory
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>
                                        {showMusicSubCategory && (
        <div className="col-md-4">
          <div className="input-box pb--20">
            <label htmlFor="musicSubCategory" className="form-label">
              Music Genre
            </label>
            <select
              id="musicSubCategory"
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Select a genre</option>
              {musicSubCategories.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="expectedLaunchDate"
                                                    className="form-label"
                                                >
                                                    Expected Launch Date
                                                </label>
                                                <input
                                                    id="expectedLaunchDate"
                                                    type="date"
                                                    {...register(
                                                        "expectedLaunchDate",
                                                        {
                                                            required:
                                                                "Expected Launch Date is required",
                                                        }
                                                    )}
                                                />
                                                {errors.expectedLaunchDate && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .expectedLaunchDate
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        {/* <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="twitter"
                                                    className="form-label"
                                                >
                                                    <span>Twitter</span>{" "}
                                                    <FaTwitter />
                                                </label>
                                                <input
                                                    id="twitter"
                                                    placeholder="e. g. `https://twitter.com/username`"
                                                    {...register("twitter")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="discord"
                                                    className="form-label"
                                                >
                                                    Discord <FaDiscord />
                                                </label>
                                                <input
                                                    id="discord"
                                                    placeholder="e. g. `https://discord.com/username`"
                                                    {...register("discord")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="instagram"
                                                    className="form-label"
                                                >
                                                    Instagram <FaInstagram />
                                                </label>
                                                <input
                                                    id="instagram"
                                                    placeholder="e. g. `https://instagram.com/username`"
                                                    {...register("instagram")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="website"
                                                    className="form-label"
                                                >
                                                    Website <FaGlobe />
                                                </label>
                                                <input
                                                    id="website"
                                                    placeholder="e. g. `https://example.com`"
                                                    {...register("website")}
                                                />
                                            </div>
                                        </div> */}

                                        {renderSocialMediaSection()}

                                        <div className="col-md-12">
                                            <div className="input-box pb--20 rn-check-box">
                                                <p
                                                    style={{
                                                        fontSize: "16px",
                                                        color: "#fff",
                                                        marginBottom: "10px",
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    Before submitting the form,
                                                    please ensure that the
                                                    information provided is
                                                    accurate and true. If you
                                                    have not completed KYC,
                                                    please initiate KYC. If you
                                                    have completed KYC, then you
                                                    are good to go.
                                                </p>

                                                {shake && (
                                                    <p
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#ff4f4f",
                                                            marginBottom:
                                                                "10px",
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        Please click on KYC
                                                        Verification to proceed.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-xl-4">
                                            <div className="input-box">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    data-btn="preview"
                                                    onClick={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            {kycStatus === false ? (
                                                <motion.div
                                                    className="input-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    animate={
                                                        shake ? "shake" : ""
                                                    }
                                                    variants={shakeAnimation}
                                                >
                                                    <Button
                                                        type="submit"
                                                        fullwidth
                                                        onClick={handleKyc}
                                                    >
                                                        KYC Verification
                                                    </Button>
                                                </motion.div>
                                            ) : (
                                                <div className="input-box">
                                                    <Button
                                                        type="submit"
                                                        fullwidth
                                                        onClick={handleSubmit(
                                                            onSubmit
                                                        )}
                                                        disabled={kycStatus}
                                                        style={{
                                                            backgroundColor:
                                                                "#4d3f17",
                                                        }}
                                                    >
                                                        KYC Verified
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );

    const renderStage2Form = () => (
        <div
            className={clsx(
                "create-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
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
                                            <MutatingDots
                                                color="#fff"
                                                size={30}
                                                speed={1}
                                            />
                                        ) : (
                                            <i className="feather-upload" />
                                        )}

                                        <span className="text-center">
                                            Choose a Cover Image
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, JPEG, JPG. <br /> Max 1Gb.
                                        </p>
                                    </label>
                                </div>
                                {hasImageError && !selectedImage && (
                                    <ErrorText>Image is required</ErrorText>
                                )}
                            </div>

                            <div className="upload-area mt--50 mt_sm--30 mt_md--30 d-none d-lg-block">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">
                                        Upload Collection Banner Image
                                    </h6>
                                    <p className="formate">
                                        Drag or choose your image to upload
                                    </p>
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
                                    <label
                                        htmlFor="bannerFile"
                                        title="No File Chosen"
                                    >
                                        {imageBannerLoading ? (
                                            <MutatingDots
                                                color="#fff"
                                                size={30}
                                                speed={1}
                                            />
                                        ) : (
                                            <i className="feather-upload" />
                                        )}

                                        <span className="text-center">
                                            Choose a Banner Image
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, JPEG, JPG. <br /> Max 1Gb.
                                        </p>
                                    </label>
                                </div>

                                {hasImageError && !selectedBannerImage && (
                                    <ErrorText>Image is required</ErrorText>
                                )}
                            </div> */}

                            <div className="upload-area">
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
                                            <div>
                                                <MutatingDots
                                                    color="#fff"
                                                    size={30}
                                                    speed={1}
                                                />
                                                <p>
                                                    Uploading:{" "}
                                                    {uploadProgress.coverImage}%
                                                </p>
                                            </div>
                                        ) : (
                                            <i className="feather-upload"  style={{color: "#cbd13f"}} />
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
                                    <ErrorText>Image is required</ErrorText>
                                )}
                            </div>

                            <div className="upload-area mt--50">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">
                                        Upload Collection Banner Image
                                    </h6>
                                    <p className="formate">
                                        Drag or choose your image to upload
                                    </p>
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
                                    <label
                                        htmlFor="bannerFile"
                                        title="No File Chosen"
                                    >
                                        {imageBannerLoading ? (
                                            <div>
                                                <MutatingDots
                                                    color="#fff"
                                                    size={30}
                                                    speed={1}
                                                />
                                                <p>
                                                    Uploading:{" "}
                                                    {
                                                        uploadProgress.profileImage
                                                    }
                                                    %
                                                </p>
                                            </div>
                                        ) : (
                                            <i className="feather-upload" style={{color: "#cbd13f"}} />
                                        )}
                                        <span className="text-center">
                                            Choose a Banner Image
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, JPEG, JPG. Max 1Gb.
                                        </p>
                                    </label>
                                </div>
                                {hasImageError && !selectedBannerImage && (
                                    <ErrorText>Image is required</ErrorText>
                                )}
                            </div>

                            <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>1.5%</strong>{" "}
                                </span>{" "}
                                <br />
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="form-wrapper-one">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="contractType"
                                                className="form-label"
                                            >
                                                Contract Type
                                            </label>
                                            <select
                                                id="contractType"
                                                name="contractType"
                                                // style={{
                                                //     padding: "10px",
                                                //     borderRadius: "5px",
                                                //     border: "1px solid #363545",
                                                //     marginBottom: "10px",
                                                //     height: "50px",
                                                //     backgroundColor: "#242435",
                                                // }}
                                                {...register("contractType")}
                                            >
                                                <option value="ng">NG</option>
                                                <option value="v2">V2</option>
                                            </select>

                                            {errors.contractType && (
                                                <ErrorText>
                                                    {
                                                        errors.contractType
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                                min="0"
                                                step="any"
                                                {...register("mintPrice", {
                                                    required:
                                                        "Mint Price is required",
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Mint Price must be non-negative",
                                                    },
                                                    validate: (value) =>
                                                        value >= 0 ||
                                                        "Mint Price must be non-negative",
                                                })}
                                            />

                                            {errors.mintPrice && (
                                                <ErrorText>
                                                    {errors.mintPrice?.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintPriceCurrency"
                                                className="form-label"
                                            >
                                                Mint Price Currency
                                            </label>
                                            <select
                                                id="mintPriceCurrency"
                                                name="mintPriceCurrency"
                                                // style={{
                                                //     padding: "10px",
                                                //     borderRadius: "5px",
                                                //     border: "1px solid #363545",
                                                //     marginBottom: "10px",
                                                //     height: "50px",
                                                //     backgroundColor: "#242435",
                                                // }}
                                                {...register(
                                                    "mintPriceCurrency"
                                                )}
                                            >
                                                <option value="kda">KDA</option>
                                                <option value="usd">USD</option>
                                            </select>

                                            {errors.mintPriceCurrency && (
                                                <ErrorText>
                                                    {
                                                        errors.mintPriceCurrency
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintStartDate"
                                                className="form-label"
                                            >
                                                Public Mint Start Date
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
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintEndDate"
                                                className="form-label"
                                            >
                                                Public Mint End Date
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
                                                    {
                                                        errors.mintEndDate
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintStartTime"
                                                className="form-label"
                                            >
                                                Public Mint Start Time
                                            </label>
                                            <input
                                                id="mintStartTime"
                                                type="time"
                                                {...register("mintStartTime", {
                                                    required:
                                                        "Mint Start Time is required",
                                                })}
                                                disabled={
                                                    //if date is not selected
                                                    watch("mintStartDate")
                                                        ? false
                                                        : true
                                                }
                                            />
                                            {errors.mintStartTime && (
                                                <ErrorText>
                                                    {
                                                        errors.mintStartTime
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintEndTime"
                                                className="form-label"
                                            >
                                                Public Mint End Time
                                            </label>
                                            <input
                                                id="mintEndTime"
                                                type="time"
                                                {...register("mintEndTime", {
                                                    required:
                                                        "Mint End Time is required",
                                                })}
                                                disabled={
                                                    //if date is not selected
                                                    watch("mintEndDate")
                                                        ? false
                                                        : true
                                                }
                                            />
                                            {errors.mintEndTime && (
                                                <ErrorText>
                                                    {
                                                        errors.mintEndTime
                                                            ?.message
                                                    }
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
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#242435",
                                                    color: "#fff",
                                                    borderRadius: 5,
                                                }}
                                                multiple
                                                value={policy}
                                                onChange={handlePolicyChange}
                                                input={
                                                    <OutlinedInput
                                                        id="select-multiple-chip"
                                                        label="Chip"
                                                    />
                                                }
                                                renderValue={(selected) => (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 0.5,
                                                            alignItems:
                                                                "center",
                                                            p: 0.5,
                                                            bgcolor: "#242435",
                                                            borderRadius: 5,
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
                                                                        color: "#fff",
                                                                        backgroundColor:
                                                                            "#363545",
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
                                            {/* <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#242435",
                                                    color: "#fff",
                                                    borderRadius: 5,
                                                }}
                                                multiple
                                                value={policy}
                                                onChange={handlePolicyChange}
                                                input={
                                                    <OutlinedInput
                                                        id="select-multiple-chip"
                                                        label="Chip"
                                                    />
                                                }
                                                renderValue={(selected) => (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 0.5,
                                                            alignItems:
                                                                "center",
                                                            p: 0.5,
                                                            bgcolor: "#242435",
                                                            borderRadius: 5,
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
                                                                        color: "#fff",
                                                                        backgroundColor:
                                                                            "#363545",
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
                                                        disabled={disabledPolicies.includes(
                                                            name
                                                        )}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select> */}

                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                style={{
                                                    width: "100%",
                                                    // backgroundColor: "#242435",
                                                    // color: "#fff",
                                                    borderRadius: 5,
                                                }}
                                                multiple
                                                value={policy}
                                                onChange={handlePolicyChange}
                                                input={
                                                    <OutlinedInput
                                                        id="select-multiple-chip"
                                                        label="Chip"
                                                    />
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
                                                                        color: "#fff",
                                                                        backgroundColor:
                                                                            "#363545",
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

                                    <div className="col-md-12">
                                        {/* <div className="input-box pb--20">
                                            <label
                                                htmlFor="tokenList"
                                                className="form-label"
                                            >
                                                Token List
                                            </label>
                                            <textarea
                                                id="tokenList"
                                                rows="3"
                                                placeholder={`e. g. "token1","token2","token3"`}
                                                {...register("tokenList", {
                                                    pattern: {
                                                        // i want validate to accept any value inside "" and "","" like this
                                                        value: /^("[^"]*"(,"[^"]*")*)?$/,

                                                        message:
                                                            "Please enter a valid token list",
                                                    },

                                                    required:
                                                        "Token List is required",
                                                })}
                                            />
                                            {errors.tokenList && (
                                                <ErrorText>
                                                    {errors.tokenList?.message}
                                                </ErrorText>
                                            )}
                                        </div> */}

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

                                    <div className="col-md-4">
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
                                                min="0"
                                                max="100"
                                                step="0.01"
                                                {...register(
                                                    "royaltyPercentage",
                                                    {
                                                        required:
                                                            "Royalty Percentage is required",
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Royalty Percentage must be non-negative",
                                                        },
                                                        max: {
                                                            value: 100,
                                                            message:
                                                                "Royalty Percentage cannot exceed 100%",
                                                        },
                                                        validate: (value) =>
                                                            (value >= 0 &&
                                                                value <= 100) ||
                                                            "Royalty Percentage must be between 0 and 100",
                                                    }
                                                )}
                                            />

                                            {errors.royaltyPercentage && (
                                                <ErrorText>
                                                    {
                                                        errors.royaltyPercentage
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    {/* //royal address k address */}
                                    <div className="col-md-8">
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
                                                        // wallet address start with k
                                                        value: /^k:/,
                                                        message:
                                                            "Please enter a valid wallet address",
                                                    },

                                                    required:
                                                        "Wallet Address is required",
                                                })}
                                            />
                                            {errors.royaltyAddress && (
                                                <ErrorText>
                                                    {
                                                        errors.royaltyAddress
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="allowFreeMints"
                                                name="allowFreeMints"
                                                {...register("allowFreeMints")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="allowFreeMints"
                                            >
                                                Allow Free Mints
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableWhitelist"
                                                name="enableWhitelist"
                                                {...register("enableWhitelist")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enableWhitelist"
                                            >
                                                Enable Whitelist
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enablePresale"
                                                name="enablePresale"
                                                {...register("enablePresale")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enablePresale"
                                            >
                                                Enable Presale
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableAirdrop"
                                                name="enableAirdrop"
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

                                    {/* <div className="col-md-12 mt--20">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="paymentsOptions"
                                                className="form-label mb--20"
                                            >
                                                Payment Options
                                            </label>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "start",
                                                    gap: "20px",
                                                }}
                                            >
                                                <motion.div
                                                    className="rn-check-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    style={{
                                                        border: "1px solid #363545",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#31311B",
                                                        },
                                                    }}
                                                >
                                                    <Image
                                                        src="/wallet/Stripe.svg"
                                                        alt="Stripe"
                                                        width={200}
                                                        height={200}
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    className="rn-check-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    style={{
                                                        border: "1px solid #363545",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#31311B",
                                                        },
                                                    }}
                                                >
                                                    <Image
                                                        src="/wallet/eckowallet.png"
                                                        alt="KDA"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="col-md-12 col-xl-4 mt--20 mb--20">
                                        <label
                                            className="rn-check-box-label"
                                            htmlFor="enablePresale"
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
                                        {/* Stripe - Always shown */}
                                        <motion.div
                                            className="rn-check-box"
                                            whileHover={{
                                                scale: 1.03,
                                                transition: {
                                                    duration: 0.3,
                                                },
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

                                        {/* Connected wallet or all wallets */}
                                        {wallets
                                            ?.filter(
                                                (wallet) =>
                                                    wallet?.name !== "Stripe"
                                            )
                                            ?.filter((wallet) => {
                                                console.log(
                                                    connectedWallet
                                                        ?.split(" ")
                                                        ?.join("")
                                                );
                                                return (
                                                    !connectedWallet ||
                                                    wallet?.name ===
                                                        connectedWallet
                                                            ?.split(" ")
                                                            ?.join("") ||
                                                    connectedWallet ===
                                                        "WalletConnect"
                                                );
                                            })
                                            ?.map((wallet) => (
                                                <motion.div
                                                    key={wallet?.name}
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
                                                        src={wallet?.src}
                                                        alt={wallet?.name}
                                                        width={wallet?.width}
                                                        height={wallet?.height}
                                                    />
                                                </motion.div>
                                            ))}
                                    </div>

                                    <div className="col-md-12 col-xl-4">
                                        <div className="input-box">
                                            <Button
                                                color="primary-alta"
                                                fullwidth
                                                type="submit"
                                                data-btn="preview"
                                                onClick={handleSubmit(onSubmit)}
                                            >
                                                Submit and Pay Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <>
            <div className={styles.inner} style={{ marginBottom: "50px" }}>
                {step === 1
                    ? renderStage1Form()
                    : step === 2
                    ? renderStage2Form()
                    : null}
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <div className="App">
                        <SumsubWebSdk
                            accessToken={accessToken}
                            updateAccessToken={() =>
                                console.log("updateAccessToken")
                            }
                            expirationHandler={() =>
                                Promise.resolve(accessToken)
                            }
                            config={{
                                lang: "en",
                                email: account?.user?.email,
                                i18n: {
                                    document: {
                                        subTitles: {
                                            IDENTITY:
                                                "Upload a document that proves your identity",
                                        },
                                    },
                                },
                                onMessage: (type, payload) => {
                                    console.log(
                                        "WebSDK onMessage",
                                        type,
                                        payload
                                    );
                                },

                                onError: (error) => {
                                    console.error("WebSDK onError", error);
                                },
                            }}
                            options={{
                                addViewportTag: false,
                                adaptIframeHeight: true,
                            }}
                            onMessage={(type, payload) => {
                                console.log("onMessage", type, payload);
                                if (payload.reviewStatus === "completed") {
                                    console.log("payload", payload);
                                    setOpen(false);
                                    verificationComplete(payload);
                                }
                            }}
                            onError={(data) => console.log("onError", data)}
                        />

                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                backgroundColor: "#1a202c",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                marginTop: "20px",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </Box>
            </Modal>

            {isLoading && <Loader />}
            <ConnectModal
                show={showConnectModal}
                handleModal={handleConnectModal}
            />
        </>
    );
};

export default ApplyLaunchpadWrapper;
