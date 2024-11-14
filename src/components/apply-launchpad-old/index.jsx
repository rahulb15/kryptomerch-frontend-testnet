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

// const applicantEmail = "rahul.baghel15@gmail.com";
// const applicantPhone = "9999999998";
// const accessToken =
//     "_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC1kZTgwZDEzYi1jZmU4LTRmNjQtYWZiOS03YWRjN2UxYmNiMDYtdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2";

const ApplyLaunchpadWrapper = () => {
    const account = useAccountContext();
    console.log(account);
    const [step, setStep] = useState(2);
    const [formData, setFormData] = useState({});
    const [formData2, setFormData2] = useState({});
    const [formData3, setFormData3] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formErrors2, setFormErrors2] = useState({});
    const [formErrors3, setFormErrors3] = useState({});
    const [accessToken, setAccessToken] = useState("");

    // const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("🚀 ~ handleInputChange ~ name, value", name, value);
        setFormData({ ...formData, [name]: value });

        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: "" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name === "creatorEmail") {
            if (value && !emailRegex.test(value)) {
                setFormErrors({
                    ...formErrors,
                    creatorEmail: "Invalid email format",
                });
            } else {
                setFormErrors({ ...formErrors, creatorEmail: "" });
            }
        }
    };

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        console.log("🚀 ~ handleInputChange ~ name, value", name, value);
        setFormData2({ ...formData2, [name]: value });

        if (formErrors2[name]) {
            setFormErrors2({ ...formErrors2, [name]: "" });
        }
    };

    const handleInputChange3 = (e) => {
        const { name, value } = e.target;
        console.log("🚀 ~ handleInputChange ~ name, value", name, value);
        setFormData3({ ...formData3, [name]: value });

        if (formErrors3[name]) {
            setFormErrors3({ ...formErrors3, [name]: "" });
        }
    };

    const validateForm = () => {
        let errors = {};
        const requiredFields = [
            "collectionName",
            "creatorName",
            "creatorEmail",
            "creatorWallet",
            "projectDescription",
            "projectCategory",
            "expectedLaunchDate",
        ];

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.creatorEmail && !emailRegex.test(formData.creatorEmail)) {
            errors.creatorEmail = "Invalid email format";
        }

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                errors[field] = `${field} is required`;
            } else {
                // If the field has a value, remove the error
                delete errors[field];
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateForm2 = () => {
        let errors = {};
        console.log("🚀 ~ validateForm2 ~ errors:", errors);
        const requiredFields = [
            "contractType",
            "totalSupply",
            "mintPrice",
            "royaltyPercentage",
            "collectionCoverImage",
            "collectionBannerImage",
            "mintStartDate",
            "mintStartTime",
        ];

        requiredFields.forEach((field) => {
            if (!formData2[field]) {
                errors[field] = `${field} is required`;
            } else {
                // If the field has a value, remove the error
                delete errors[field];
            }
        });

        setFormErrors2(errors);
        return Object.keys(errors).length === 0;
    };

    const validateForm3 = () => {
        let errors = {};
        console.log("formData3", formData3);
        console.log("🚀 ~ validateForm3 ~ errors:", errors);
        const requiredFields = ["walletAddress"];

        requiredFields.forEach((field) => {
            if (!formData3[field]) {
                errors[field] = `${field} is required`;
            } else {
                // If the field has a value, remove the error
                delete errors[field];
            }
        });

        setFormErrors3(errors);
        return Object.keys(errors).length === 0;
    };

    // const getUser = async () => {
    //     const response = await userService.getUserDetail();
    //     console.log("🚀 ~ getUser ~ response:", response);
    //     if (response?.data?.status === "success") {
    //         setUser(response.data.data);
    //     }
    // };

    // useEffect(() => {
    //     getUser();
    // }, []);

    // console.log("🚀 ~ ApplyLaunchpadWrapper ~ user", user);

    const verificationComplete = async (payload) => {
        const data = {
            applicantData: payload,
        };

        // createVerification
        const response = await userService.createVerification(data);
        console.log("🚀 ~ verificationComplete ~ response", response);
        console.log(
            "🚀 ~ verificationComplete ~ response",
            response?.data?.data?.status
        );

        console.log(response?.status, "vvvvvv");

        if (response?.status === 200 || response?.status === 201) {
            const body = {
                collectionName: formData.collectionName,
                creatorName: formData.creatorName,
                creatorEmail: formData.creatorEmail,
                creatorWallet: formData.creatorWallet,
                projectDescription: formData.projectDescription,
                projectCategory: formData.projectCategory,
                expectedLaunchDate: formData.expectedLaunchDate,
                twitter: formData.twitter,
                discord: formData.discord,
                instagram: formData.instagram,
                website: formData.website,
            };

            console.log("🚀 ~ handleSubmit ~ body", body);
            console.log("🚀 ~ handleSubmit ~ formData", collectionService);
            // launchCollection service
            const response = await collectionService.launchCollection(body);
            console.log("🚀 ~ handleSubmit ~ response", response);

            if (response?.data?.status === "success") {
                console.log("🚀 ~ handleSubmit ~ response.data", response.data);
                toast.success("Collection launched successfully");
                setStep(2);
            }
        } else {
            toast.error("Oops! Something went wrong. Please try again later.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform KYC check or any other necessary actions
        console.log("Form data:", formData);

        if (step === 1) {
            // Proceed to Stage 2 after KYC approval
            // setStep(2);
            if (validateForm()) {
                console.log("Form data:", formData);
                console.log(account?.user?.verified);
                if (account?.user?.verified === false) {
                    // setOpen(true);
                    //api call to get getAccessToken
                    const response = await userService.getAccessToken();
                    console.log("🚀 ~ handleSubmit ~ response", response);
                    if (response?.data?.status === "success") {
                        const accessToken = response.data.data.token;
                        console.log(
                            "🚀 ~ handleSubmit ~ accessToken",
                            accessToken
                        );
                        setAccessToken(accessToken);
                        setOpen(true);
                    } else {
                        toast.error(
                            "Oops! Something went wrong. Please try again later."
                        );
                    }
                } else {
                    const body = {
                        collectionName: formData.collectionName,
                        creatorName: formData.creatorName,
                        creatorEmail: formData.creatorEmail,
                        creatorWallet: formData.creatorWallet,
                        projectDescription: formData.projectDescription,
                        projectCategory: formData.projectCategory,
                        expectedLaunchDate: formData.expectedLaunchDate,
                        twitter: formData.twitter,
                        discord: formData.discord,
                        instagram: formData.instagram,
                        website: formData.website,
                    };

                    console.log("🚀 ~ handleSubmit ~ body", body);
                    // launchCollection service
                    const response = await collectionService.launchCollection(
                        body
                    );
                    console.log("🚀 ~ handleSubmit ~ response", response);

                    if (response?.data?.status === "success") {
                        console.log(
                            "🚀 ~ handleSubmit ~ response.data",
                            response.data
                        );
                        toast.success("Collection launched successfully");
                        setStep(2);
                    } else {
                        if (response?.data?.message === "Conflict") {
                            toast.error(
                                "Collection with this name already exists"
                            );
                        }
                    }
                }
            }
        } else if (step === 2) {
            console.log("Form data:", formData2);
            console.log(
                "🚀 ~ handleSubmit ~ validateForm2():",
                validateForm2()
            );

            if (validateForm2()) {
                console.log("Form data:", formData2);
                const body = {
                    contractType: formData2.contractType,
                    totalSupply: formData2.totalSupply,
                    mintPrice: formData2.mintPrice,
                    mintPriceCurrency: formData2.mintPriceCurrency,
                    royaltyPercentage: formData2.royaltyPercentage,
                    collectionCoverImage: formData2.collectionCoverImage,
                    collectionBannerImage: formData2.collectionBannerImage,
                    mintStartDate: formData2.mintStartDate,
                    mintStartTime: formData2.mintStartTime,
                    allowFreeMints: formData2.allowFreeMints,
                    enableWhitelist: formData2.enableWhitelist,
                    whitelistCsv: formData2.whitelistCsv,
                    enablePresale: formData2.enablePresale,
                    presaleStartDate: formData2.presaleStartDate,
                    presaleStartTime: formData2.presaleStartTime,
                    presaleEndDate: formData2.presaleEndDate,
                    presaleEndTime: formData2.presaleEndTime,
                    presaleMintPrice: formData2.presaleMintPrice,
                    presaleMintPriceCurrency:
                        formData2.presaleMintPriceCurrency,
                    maxPresaleMintsPerWallet:
                        formData2.maxPresaleMintsPerWallet,
                    enableAirdrop: formData2.enableAirdrop,
                    airdropSupply: formData2.airdropSupply,
                    airdropListCsv: formData2.airdropListCsv,
                };

                console.log("🚀 ~ handleSubmit ~ body", body);
                console.log("collectionName", formData.collecionName);
                // updateCollection service
                const response = await collectionService.updateCollection(
                    body,
                    formData.collectionName
                );
                console.log("🚀 ~ handleSubmit ~ response", response);

                if (response?.data?.status === "success") {
                    toast.success("Collection updated successfully");
                    // setStep(3);

                    const stripe = await loadStripe(
                        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                    );
                    const body = {
                        collectionName: formData.collectionName,
                        mintPrice: formData.mintPrice,
                        mintPriceCurrency: formData.mintPriceCurrency,
                        type: "apply-launchpad",
                    };
                    console.log("🚀 ~ handleSubmit ~ body:", body);

                    const response =
                        await collectionService.createCheckoutSession(body);
                    console.log("🚀 ~ handleSubmit ~ response", response);
                    const session = response.data.data;
                    console.log("🚀 ~ handleSubmit ~ session", session);
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    });
                    console.log("🚀 ~ handleSubmit ~ result", result);
                }
            }
        } else if (step === 3) {
            console.log("Form data:", formData3);
            console.log(
                "🚀 ~ handleSubmit ~ validateForm3():",
                validateForm3()
            );

            if (validateForm3()) {
                console.log("Form data:", formData3);
                // const body = {
                //     walletAddress: formData3.walletAddress,
                // };

                // console.log("🚀 ~ handleSubmit ~ body", body);
                // addWalletAddress service
                // const response = await userService.addWalletAddress(body);
                // console.log("🚀 ~ handleSubmit ~ response", response);

                // if (response?.data?.status === "success") {

                // }

                const stripe = await loadStripe(
                    "pk_test_51OeAJVHJ5f4oRHZQGywXAZpVMJsCpgmsIfYFf2XezhXn0Wtx5prHYJjDhTXYxdFv1pGY72uG8wgBcs5yV12708kL00G69kwITz"
                );
                const body = {
                    collectionName: formData.collectionName,
                    mintPrice: formData.mintPrice,
                    mintPriceCurrency: formData.mintPriceCurrency,
                    type: "apply-launchpad",
                };
                console.log("🚀 ~ handleSubmit ~ body:", body);

                const response = await collectionService.createCheckoutSession(
                    body
                );
                console.log("🚀 ~ handleSubmit ~ response", response);
                const session = response.data.data;
                console.log("🚀 ~ handleSubmit ~ session", session);
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
                console.log("🚀 ~ handleSubmit ~ result", result);
            }
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const renderStage1Form = () => (
        // <div className={styles.formWrapper}>
            <div
                className={styles.inner}
                style={{
                    margin: "0 auto",
                    boxShadow: "0 0 10px #4d3f17",
                    // padding: "20px",
                    marginTop: "20px",
                    borderRadius: "5px",
                    width: "100%",
                }}
            >
                <h2 className={styles.formTitle}>Apply for Launchpad</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="collectionName"
                            className={styles.label}
                        >
                            Collection Name *
                        </label>
                        <input
                            type="text"
                            id="collectionName"
                            name="collectionName"
                            placeholder="Collection Name"
                            // required
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors.collecionName && (
                            <span style={{ color: "red" }}>
                                {formErrors.collecionName}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="creatorName" className={styles.label}>
                            Creator's Name *
                        </label>
                        <input
                            type="text"
                            id="creatorName"
                            name="creatorName"
                            placeholder="Creator's Name"
                            // required
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors.creatorName && (
                            <span style={{ color: "red" }}>
                                {formErrors.creatorName}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="creatorEmail" className={styles.label}>
                            Creator's Email Address *
                        </label>
                        <input
                            type="email"
                            id="creatorEmail"
                            name="creatorEmail"
                            placeholder="Creator's Email Address"
                            // required
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors.creatorEmail && (
                            <span style={{ color: "red" }}>
                                {formErrors.creatorEmail}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="creatorWallet" className={styles.label}>
                            Creator's Wallet Address
                        </label>
                        <input
                            type="text"
                            id="creatorWallet"
                            name="creatorWallet"
                            placeholder="Creator's Wallet Address"
                            // required
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors.creatorWallet && (
                            <span style={{ color: "red" }}>
                                {formErrors.creatorWallet}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="projectDescription"
                            className={styles.label}
                        >
                            Project Description *
                        </label>
                        <textarea
                            id="projectDescription"
                            name="projectDescription"
                            placeholder="Project Description"
                            // required
                            className={styles.textarea}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors.projectDescription && (
                            <span style={{ color: "red" }}>
                                {formErrors.projectDescription}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="projectCategory"
                            className={styles.label}
                        >
                            Project Category *
                        </label>
                        <select
                            id="projectCategory"
                            name="projectCategory"
                            // required
                            className={styles.select}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="">Select a category</option>
                            <option value="art">Art</option>
                            <option value="photography">Photography</option>
                            <option value="gaming">Gaming</option>
                        </select>
                        {formErrors.projectCategory && (
                            <span style={{ color: "red" }}>
                                {formErrors.projectCategory}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="expectedLaunchDate"
                            className={styles.label}
                        >
                            Expected Launch Date *
                        </label>
                        <input
                            type="month"
                            id="expectedLaunchDate"
                            name="expectedLaunchDate"
                            placeholder="Expected Launch Date"
                            // required
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors.expectedLaunchDate && (
                            <span style={{ color: "red" }}>
                                {formErrors.expectedLaunchDate}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="twitter" className={styles.label}>
                            Twitter
                        </label>
                        <input
                            type="text"
                            id="twitter"
                            name="twitter"
                            placeholder="Twitter"
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="discord" className={styles.label}>
                            Discord
                        </label>
                        <input
                            type="text"
                            id="discord"
                            name="discord"
                            placeholder="Discord"
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="instagram" className={styles.label}>
                            Instagram
                        </label>
                        <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            placeholder="Instagram"
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="website" className={styles.label}>
                            Website
                        </label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            placeholder="Website"
                            className={styles.input}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    {/* <div className={styles.formGroup}>
                        <label htmlFor="kycDetails" className={styles.label}>
                            KYC Details
                        </label>
                        <textarea
                            id="kycDetails"
                            name="kycDetails"
                            placeholder="KYC Details (as per the KYC provider's requirements)"
                            required
                            className={styles.textarea}
                            onChange={handleInputChange}
                        />
                    </div> */}

                    {account?.user?.verified ? (
                        <>
                            <label
                                htmlFor="kycDetails"
                                className={styles.label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <span>KYC Details</span>
                                <div style={{ marginLeft: "10px" }}>
                                    <Image
                                        src="/auth-images/verified.png"
                                        alt="Verified"
                                        style={{
                                            marginRight: "5px",
                                        }}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </label>
                        </>
                    ) : (
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="kycDetails"
                                className={styles.label}
                            >
                                KYC Details
                            </label>
                            {/* <textarea
                                id="kycDetails"
                                name="kycDetails"
                                placeholder="KYC Details (as per the KYC provider's requirements)"
                                // required
                                className={styles.textarea}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginBottom: "10px",
                                }}
                            /> */}
                            <p>You need to complete KYC to proceed.</p>
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <Button
                            type="submit"
                            className={`${styles.submitButton} btn-primary-alta`}
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        // </div>
    );

    const renderStage2Form = () => (
        // <div className={styles.formWrapper}>
            <div
                className={styles.inner}
                style={{
                    margin: "0 auto",
                    boxShadow: "0 0 10px #4d3f17",
                    // padding: "20px",
                    marginTop: "20px",
                    borderRadius: "5px",
                    width: "100%",
                }}
            >
                <h2 className={styles.formTitle}>Step 2</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Contract Type */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Contract Type</label>
                        <div
                            style={{
                                display: "flex",
                                gap: "40px",
                                marginBottom: "10px",
                            }}
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="contractType"
                                    value="ng"
                                    checked={formData.contractType === "ng"}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "5px",
                                        cursor: "pointer",
                                    }}
                                />
                                NG
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contractType"
                                    value="v2"
                                    checked={formData.contractType === "v2"}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "5px",
                                        cursor: "pointer",
                                    }}
                                />
                                V2
                            </label>
                            {formErrors2.contractType && (
                                <span style={{ color: "red" }}>
                                    {formErrors2.contractType}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Supply Information */}
                    <div className={styles.formGroup}>
                        <label htmlFor="totalSupply" className={styles.label}>
                            Total Supply
                        </label>
                        <input
                            type="number"
                            id="totalSupply"
                            name="totalSupply"
                            placeholder="Total Supply"
                            // required
                            className={styles.input}
                            value={formData.totalSupply}
                            onChange={handleInputChange2}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors2.totalSupply && (
                            <span style={{ color: "red" }}>
                                {formErrors2.totalSupply}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="mintPrice" className={styles.label}>
                            Mint Price
                        </label>
                        <div className={styles.inputGroup}>
                            <input
                                type="number"
                                id="mintPrice"
                                name="mintPrice"
                                placeholder="Mint Price"
                                // required
                                className={styles.input}
                                value={formData.mintPrice}
                                onChange={handleInputChange2}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginBottom: "10px",
                                }}
                            />
                            {formErrors2.mintPrice && (
                                <span style={{ color: "red" }}>
                                    {formErrors2.mintPrice}
                                </span>
                            )}
                            <select
                                id="mintPriceCurrency"
                                name="mintPriceCurrency"
                                // required
                                className={styles.select}
                                value={formData.mintPriceCurrency}
                                onChange={handleInputChange2}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginBottom: "10px",
                                }}
                            >
                                <option value="">Select Currency</option>
                                <option value="eth">ETH</option>
                                <option value="matic">MATIC</option>
                                {/* Add more currency options as needed */}
                            </select>
                            {formErrors2.mintPriceCurrency && (
                                <span style={{ color: "red" }}>
                                    {formErrors2.mintPriceCurrency}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label
                            htmlFor="royaltyPercentage"
                            className={styles.label}
                        >
                            Royalty Percentage
                        </label>
                        <input
                            type="number"
                            id="royaltyPercentage"
                            name="royaltyPercentage"
                            placeholder="Royalty Percentage"
                            // required
                            className={styles.input}
                            value={formData.royaltyPercentage}
                            onChange={handleInputChange2}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors2.royaltyPercentage && (
                            <span style={{ color: "red" }}>
                                {formErrors2.royaltyPercentage}
                            </span>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className={styles.formGroup}>
                        <label
                            htmlFor="collectionCoverImage"
                            className={styles.label}
                        >
                            Upload Collection Cover Image
                        </label>
                        <input
                            type="file"
                            id="collectionCoverImage"
                            name="collectionCoverImage"
                            accept="image/*"
                            // required
                            className={styles.input}
                            onChange={handleInputChange2}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors2.collectionCoverImage && (
                            <span style={{ color: "red" }}>
                                {formErrors2.collectionCoverImage}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label
                            htmlFor="collectionBannerImage"
                            className={styles.label}
                        >
                            Upload Collection Banner Image
                        </label>
                        <input
                            type="file"
                            id="collectionBannerImage"
                            name="collectionBannerImage"
                            accept="image/*"
                            // required
                            className={styles.input}
                            onChange={handleInputChange2}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors2.collectionBannerImage && (
                            <span style={{ color: "red" }}>
                                {formErrors2.collectionBannerImage}
                            </span>
                        )}
                    </div>

                    {/* Minting Details */}
                    <div className={styles.formGroup}>
                        <label htmlFor="mintStartDate" className={styles.label}>
                            Mint Start Date
                        </label>
                        <input
                            type="date"
                            id="mintStartDate"
                            name="mintStartDate"
                            // required
                            className={styles.input}
                            value={formData.mintStartDate}
                            onChange={handleInputChange2}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors2.mintStartDate && (
                            <span style={{ color: "red" }}>
                                {formErrors2.mintStartDate}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="mintStartTime" className={styles.label}>
                            Mint Start Time
                        </label>
                        <input
                            type="time"
                            id="mintStartTime"
                            name="mintStartTime"
                            // required
                            className={styles.input}
                            value={formData.mintStartTime}
                            onChange={handleInputChange2}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors2.mintStartTime && (
                            <span style={{ color: "red" }}>
                                {formErrors2.mintStartTime}
                            </span>
                        )}
                    </div>

                    {/* ... other form fields ... */}

                    {/* Allow Free Mints */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Allow Free Mints</label>
                        <input
                            type="checkbox"
                            name="allowFreeMints"
                            checked={formData.allowFreeMints}
                            onChange={handleCheckboxChange}
                            style={{
                                marginBottom: "10px",
                                cursor: "pointer",
                            }}
                        />
                    </div>

                    {/* Whitelist */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Enable Whitelist</label>
                        <input
                            type="checkbox"
                            name="enableWhitelist"
                            checked={formData.enableWhitelist}
                            onChange={handleCheckboxChange}
                            style={{
                                marginBottom: "10px",
                                cursor: "pointer",
                            }}
                        />
                    </div>

                    {formData.enableWhitelist && (
                        <div className={styles.formGroup}>
                            <label
                                htmlFor="whitelistCsv"
                                className={styles.label}
                            >
                                Upload Whitelist CSV
                            </label>
                            <input
                                type="file"
                                id="whitelistCsv"
                                name="whitelistCsv"
                                accept=".csv"
                                required
                                className={styles.input}
                                onChange={handleInputChange2}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginBottom: "10px",
                                }}
                            />
                        </div>
                    )}

                    {/* Presale */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Enable Presale</label>
                        <input
                            type="checkbox"
                            name="enablePresale"
                            checked={formData.enablePresale}
                            onChange={handleCheckboxChange}
                        />
                    </div>

                    {formData.enablePresale && (
                        <>
                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="presaleStartDate"
                                    className={styles.label}
                                >
                                    Presale Start Date
                                </label>
                                <input
                                    type="date"
                                    id="presaleStartDate"
                                    name="presaleStartDate"
                                    required
                                    className={styles.input}
                                    value={formData.presaleStartDate}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="presaleStartTime"
                                    className={styles.label}
                                >
                                    Presale Start Time
                                </label>
                                <input
                                    type="time"
                                    id="presaleStartTime"
                                    name="presaleStartTime"
                                    required
                                    className={styles.input}
                                    value={formData.presaleStartTime}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="presaleEndDate"
                                    className={styles.label}
                                >
                                    Presale End Date
                                </label>
                                <input
                                    type="date"
                                    id="presaleEndDate"
                                    name="presaleEndDate"
                                    required
                                    className={styles.input}
                                    value={formData.presaleEndDate}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="presaleEndTime"
                                    className={styles.label}
                                >
                                    Presale End Time
                                </label>
                                <input
                                    type="time"
                                    id="presaleEndTime"
                                    name="presaleEndTime"
                                    required
                                    className={styles.input}
                                    value={formData.presaleEndTime}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="presaleMintPrice"
                                    className={styles.label}
                                >
                                    Presale Mint Price
                                </label>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="number"
                                        id="presaleMintPrice"
                                        name="presaleMintPrice"
                                        placeholder="Presale Mint Price"
                                        required
                                        className={styles.input}
                                        value={formData.presaleMintPrice}
                                        onChange={handleInputChange2}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <select
                                        id="presaleMintPriceCurrency"
                                        name="presaleMintPriceCurrency"
                                        required
                                        className={styles.select}
                                        value={
                                            formData.presaleMintPriceCurrency
                                        }
                                        onChange={handleInputChange2}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <option value="">
                                            Select Currency
                                        </option>
                                        <option value="eth">ETH</option>
                                        <option value="matic">MATIC</option>
                                        {/* Add more currency options as needed */}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="maxPresaleMintsPerWallet"
                                    className={styles.label}
                                >
                                    Maximum Presale Mints per Wallet
                                </label>
                                <input
                                    type="number"
                                    id="maxPresaleMintsPerWallet"
                                    name="maxPresaleMintsPerWallet"
                                    placeholder="Maximum Presale Mints per Wallet"
                                    required
                                    className={styles.input}
                                    value={formData.maxPresaleMintsPerWallet}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* Airdrop */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Enable Airdrop</label>
                        <input
                            type="checkbox"
                            name="enableAirdrop"
                            checked={formData.enableAirdrop}
                            onChange={handleCheckboxChange}
                        />
                    </div>

                    {formData.enableAirdrop && (
                        <>
                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="airdropSupply"
                                    className={styles.label}
                                >
                                    Airdrop Supply
                                </label>
                                <input
                                    type="number"
                                    id="airdropSupply"
                                    name="airdropSupply"
                                    placeholder="Airdrop Supply"
                                    required
                                    className={styles.input}
                                    value={formData.airdropSupply}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="airdropListCsv"
                                    className={styles.label}
                                >
                                    Upload Airdrop List CSV
                                </label>
                                <input
                                    type="file"
                                    id="airdropListCsv"
                                    name="airdropListCsv"
                                    accept=".csv"
                                    required
                                    className={styles.input}
                                    onChange={handleInputChange2}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* Backend Integration */}
                    {/* <div className={styles.formGroup}>
                        <label htmlFor="backendApiUrl" className={styles.label}>
                            Backend API URL
                        </label>
                        <input
                            type="text"
                            id="backendApiUrl"
                            name="backendApiUrl"
                            placeholder="Backend API URL"
                            required
                            className={styles.input}
                            value={formData.backendApiUrl}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="apiKey" className={styles.label}>
                            API Key
                        </label>
                        <input
                            type="text"
                            id="apiKey"
                            name="apiKey"
                            placeholder="API Key"
                            required
                            className={styles.input}
                            value={formData.apiKey}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                    </div> */}

                    <div className={styles.formGroup}>
                        <Button
                            type="submit"
                            className={`${styles.submitButton} btn-primary-alta`}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        // </div>
    );

    //3 stage to get wallet address by input field and submit for Payment
    const renderStage3Form = () => (
        // <div className={styles.formWrapper}>
            <div
                className={styles.inner}
                style={{
                    margin: "0 auto",
                    boxShadow: "0 0 10px #4d3f17",
                    // padding: "20px",
                    marginTop: "20px",
                    borderRadius: "5px",
                    width: "100%",
                }}
            >
                <h2 className={styles.formTitle}>Step 3</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="walletAddress" className={styles.label}>
                            Wallet Address
                        </label>
                        <input
                            type="text"
                            id="walletAddress"
                            name="walletAddress"
                            placeholder="Wallet Address"
                            // required
                            className={styles.input}
                            onChange={handleInputChange3}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        />
                        {formErrors3.walletAddress && (
                            <span style={{ color: "red" }}>
                                {formErrors3.walletAddress}
                            </span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <Button
                            type="submit"
                            className={`${styles.submitButton} btn-primary-alta`}
                        >
                            Pay Now
                        </Button>
                    </div>
                </form>
            </div>
        // </div>
    );

    console.log("account", account?.user);

    return (
        <>
                <div className={styles.formWrapper}>

            <motion.div
                whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.1 },
                }}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                // className=Z{styles.container}
            >
                {step === 1
                    ? renderStage1Form()
                    : step === 2
                    ? renderStage2Form()
                    : step === 3
                    ? renderStage3Form()
                    : null}
            </motion.div>
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
                                    // setStep(2);
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
        </>
    );
};

export default ApplyLaunchpadWrapper;
