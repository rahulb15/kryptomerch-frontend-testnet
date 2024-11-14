/* eslint-disable */

import Wallet from "@components/wallet";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { getAccounts, openZelcore } from "@utils/zelcore";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAccountContext } from "src/contexts";
import { useEckoWallletClient } from "src/contexts/EckoWalletContext";
import { useKoalaWallletClient } from "src/contexts/KoalaWalletContext";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import userService from "src/services/user.service";
import { MutatingDots } from "react-loader-spinner";

const ConnectArea = ({ className, space }) => {
    const router = useRouter();
    const { connect, accounts } = useWalletConnectClient();
    const { client: wcClient, session: wcSession } = useWalletConnectClient();
    console.log("🚀 ~ file: index.jsx ~ line 13 ~ ConnectArea ~ wcClient", wcClient)
    const { eckoWalletConnect } = useEckoWallletClient();
    const { koalaWalletConnect } = useKoalaWallletClient();
    const account = useAccountContext();
    const [isEmail, setIsEmail] = useState(false);
    const [isEmailNotRegistered, setIsEmailNotRegistered] = useState(false);
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const [isGoogleRegistered, setIsGoogleRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openZelcoreModal, setOpenZelcoreModal] = useState(false);
    const [zelcoreAccounts, setZelcoreAccounts] = useState([]);
    const [openChainModal, setOpenChainModal] = useState(false);
    const [address, setAddress] = useState("");
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
    const [qrImage, setQrImage] = useState("");
    const [secret, setSecret] = useState("");
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [walletName, setWalletName] = useState("");
    const [jwtToken, setJwtToken] = useState("");

    const enable2FA = async (token) => {
        // const token = localStorage.getItem("token");
        setJwtToken(token);

        const response = await userService.enable2FA(token || "");

        if (response?.data?.status === "success") {
            setQrImage(response.data.data.qrCodeUrl);
            setSecret(response.data.data.secret);
            setIsTwoFactorModalOpen(true);
        }
    };

    const checkUser = async (kaddress) => {
        console.log("🚀 ~ checkUser ~ kaddress:", kaddress)
        const user = await userService.getUser(
            kaddress.length > 0 ? kaddress : "null"
        );
        console.log("🚀 ~ checkUser ~ user:", user);

        if (user?.data?.status === "success") {
            setWalletAddress(kaddress);
            setOpenZelcoreModal(false);
            if (user?.data?.data === null) {
                setOpenRegisterModal(true);
                return;
            }

            if (user?.data?.data?.is2FAEnabled) {
                await enable2FA(user.data.token);
                return;
            }

            localStorage.setItem("token", user.data.token);
            await account.authWalletConnect(user.data.data.walletAddress);
            router.push("/");
        } else {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (accounts?.length > 0) {
            const kadenaAccounts = accounts.filter((account) =>
                account.includes("kadena")
            );

            if (kadenaAccounts.length > 0) {
                // const network = accounts[0].split(":")[0];
                const address = accounts[0].split(":")[2];

                const newAddress = `k:${address}`;
                checkUser(newAddress);
            } else {
                toast.error("Please connect with Kadena Wallet");
            }
        }
    }, [accounts]);

    const verify2FA = async () => {
        const data = {
            token: twoFactorCode.trim(),
            secret,
        };
        

        const response = await userService.verify2FA(data, jwtToken);

        if (response?.data?.status === "success") {
            setIsTwoFactorModalOpen(false);
            setTwoFactorCode("");
            localStorage.setItem("token", jwtToken);
            await account.authWalletConnect(walletAddress);
            router.push("/");

            toast.success("Login Successfully");
        } else {
            toast.error("Invalid Code");
        }
    };

    const chainModalOpen = () => {
        setOpenChainModal(true);
    };

    //Chainweaver Wallet Connect
    const handleConnectChainweaver = async (data) => {
        if (data.address.length > 0 && data.address.includes("k:")) {
            setWalletName("Chainweaver");
            const response = await account.setVerifiedAccount(data.address);

            if (response?.status === "success") {
                setOpenChainModal(false);
                checkUser(response.data.account);
                toast.success("Chainweaver Connected Successfully");
            }
        } else {
            setErrors({
                address: {
                    message: "Please enter wallet address",
                },
            });
        }
    };

    const handleChainModal = () => {
        setOpenChainModal(false);
    };

    //Ecko Wallet Connect
    const onEckoWalletConnect = async () => {
        setWalletName("Ecko Wallet");
        setLoading(true);
        const response = await eckoWalletConnect();
        if (response?.status === "success") {
            toast.success("Ecko Wallet Connected Successfully");
            console.log("🚀 ~ onEckoWalletConnect ~ response:", response);
            checkUser(response.account.account);
            setLoading(false);
        } else if (response?.status === "error") {
            toast.error(response.message);
            setLoading(false);
        }
    };

    //Wallet Connect Connect
    const handleConnect = () => {
        setWalletName("WalletConnect");
        connect();
    };

    //Koala Wallet Connect
    const onKoalaWalletConnect = async () => {
        setWalletName("Koala Wallet");
        setLoading(true);
        const response = await koalaWalletConnect();
        if (response?.status === "success") {
            toast.success("Koala Wallet Connected Successfully");
            setLoading(false);
        } else if (response?.status === "error") {
            toast.error(response.message);
            setLoading(false);
        }
    };

    //Zelcore Wallet Connect
    const getAccountsFromWallet = async () => {
        openZelcore();
        const getAccountsResponse = await getAccounts();
        if (getAccountsResponse.status === "success") {
            setWalletName("Zelcore Wallet");
            setZelcoreAccounts(getAccountsResponse.data);

            setOpenZelcoreModal(true);
        } else {
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            //regex email validation
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(value)) {
                setErrors({
                    email: {
                        message: "Invalid email address",
                    },
                });
            } else {
                setErrors({});
            }
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "name") {
            setName(value);
        }
    };

    const checkEmailExist = async (email) => {
        const response = await userService.checkEmailExist(email);

        if (response?.data?.status === "success") {
            setErrors({
                email: {
                    message: "Email is already registered",
                },
            });
        } else {
            setIsEmailNotRegistered(true);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.email || email.length === 0) {
            toast.error("Please enter valid email address");
        }
        // setIsEmailNotRegistered(true);
        checkEmailExist(email);

        if (isEmailNotRegistered) {
            const data = {
                email,
                password,
                name,
                walletAddress,
                walletName,
            };

            const response = await userService.register(data);
            console.log("🚀 ~ onSubmit ~ response:", response?.data?.token);
            if (response?.data?.status === "success") {
                toast.success("User registered successfully");
                localStorage.setItem("token", response?.data?.token);
                await account.authWalletConnect(walletAddress);
                router.push("/");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    const onLogin = async (e) => {
        e.preventDefault();
        if (errors.email || email.length === 0) {
            toast.error("Please enter valid email address");
            return;
        }

        const response = await userService.checkEmailExist(email);
        console.log("🚀 ~ onLogin ~ response:", response);

        if (response?.data?.status === "success") {
            if (response?.data?.data?.isSocialLogin) {
                setIsGoogleRegistered(true);
            } else {
                setIsEmailRegistered(true);
            }
        } else {
            setIsEmailNotRegistered(true);
        }

        const data = {
            email,
            password,
        };

        if (isEmailRegistered) {
            try {
                const responseLogin = await userService.login(data);

                if (responseLogin?.status === "success") {
                    toast.success("User logged in successfully");
                    const response = await account.authWalletConnect(
                        responseLogin.data.walletAddress
                    );
                    localStorage.setItem("token", responseLogin.token);
                    router.push("/");
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (isEmailNotRegistered) {
            // toast.error("Email is not registered");
            //add name in data
            data.name = name;
            console.log("data", data);
            if (data.email === "" || data.password === "" || data.name === "") {
                toast.error("Please fill all the fields");
                return;
            }
            const response = await userService.registerWithEmail(data);
            console.log("🚀 ~ onLogin ~ response:", response);
            if (response?.data?.status === "success") {
                toast.success("User registered successfully");
                console.log(
                    "🚀 ~ onLogin ~ response.data.data.walletAddress):",
                    response.data.data.walletAddress
                );
                await account.authWalletConnect(
                    response.data.data.walletAddress
                );
                localStorage.setItem("token", response.data.token);
                router.push("/");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    const googleLoginClick = () => {
        //api call https://api.example.com/auth/google

        const url = `${process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1/', '')}/auth/google`;

        // const googleLoginUrl = "http://localhost:5000/auth/google";
        const googleLoginUrl = `${url}`;

        window.location.href = googleLoginUrl;
    };

    return (
        <>
            <div
                className={clsx(
                    "rn-connect-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <div className="container">
               
                    <div className="row g-5">
                        <div
                            className="col-lg-6"
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="500"
                        >
                            <div className="connect-thumbnail">
                                <div className="left-image">
                              
                                    {isEmailNotRegistered ? (
                                        <Image
                                            src="/auth-images/business_deal.svg"
                                            alt="Nft_Profile"
                                            width={670}
                                            height={576}
                                            priority
                                        />
                                    ) : (
                                        <Image
                                            src={`${
                                                openRegisterModal
                                                    ? "/auth-images/designer.svg"
                                                    : "/assets-images/pact-img.png"
                                            }`}
                                            alt="Nft_Profile"
                                            width={670}
                                            height={576}
                                            priority
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {openRegisterModal ? (
                            <div className="col-lg-6">
                                <div className="row g-5">
                                    <div
                                        className={clsx(
                                            "form-wrapper-one",
                                            className
                                        )}
                                    >
                                        <h4>Register</h4>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="exampleInputEmail1"
                                                className="form-label"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                onChange={onChange}
                                                value={email}
                                            />
                                            {errors.email && (
                                                <ErrorText>
                                                    {errors.email?.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                        {isEmailNotRegistered && (
                                            <>
                                                <div className="mb-5">
                                                    <label
                                                        htmlFor="name"
                                                        className="form-label"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        onChange={onChange}
                                                        value={name}
                                                    />
                                                    {errors.name && (
                                                        <ErrorText>
                                                            {
                                                                errors.name
                                                                    ?.message
                                                            }
                                                        </ErrorText>
                                                    )}
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        onChange={onChange}
                                                        value={password}
                                                    />
                                                    {errors.password && (
                                                        <ErrorText>
                                                            {
                                                                errors.password
                                                                    ?.message
                                                            }
                                                        </ErrorText>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        <Button
                                            size="medium"
                                            color="primary-alta"
                                            className="mr--15"
                                            onClick={onSubmit}
                                        >
                                            Next
                                        </Button>
                                        <Button
                                            color="primary-alta"
                                            size="medium"
                                            onClick={() => {
                                                setOpenRegisterModal(false);
                                                setIsEmailNotRegistered(false);
                                                setIsEmailRegistered(false);
                                            }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-lg-6">
                                <div className="row g-5">
                                    <div
                                        className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                                      
                                    >
                                        <Wallet
                                            title="EckoWallet"
                                            description="Easiest way to connect your wallet"
                                            bgcolor="#ec7064"
                                            color="#1f2654"
                                            icon="/wallet/eckowallet.png"
                                            onClick={() =>
                                                onEckoWalletConnect()
                                            }
                                        />
                                    </div>
                                    <div
                                        className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                                      
                                    >
                                        <Wallet
                                            title="Chainweaver"
                                            description="Connect with your wallet"
                                            icon="/wallet/chainweaver.png"
                                            bgcolor="#1b8bb0"
                                            color="black"
                                            onClick={() => chainModalOpen()}
                                        />
                                    </div>
                                    <div
                                        className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                                       
                                    >
                                        <Wallet
                                            title="Koala"
                                            description="Built your bigger offers then me"
                                            icon="/wallet/koala.svg"
                                            bgcolor="rgb(190 190 190)"
                                            color="black"
                                            onClick={() =>
                                                onKoalaWalletConnect()
                                            }
                                        />
                                    </div>
                                    <div
                                        className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                                      
                                    >
                                        <Wallet
                                            title="Wallet Connect"
                                            description="Cash Transfer for easyest way you wast"
                                            icon="/wallet/Logo.svg"
                                            bgcolor="blue"
                                            color="white"
                                            onClick={() => handleConnect()}
                                        />
                                    </div>
                                    <div
                                        className="col-xxl-4 col-lg-6 col-md-4 col-12 col-sm-6 col-12"
                                      
                                    >
                                        <Wallet
                                            title="Zelcore"
                                            description="Connect with your wallet"
                                            icon="/wallet/zelcore-logo.svg"
                                            bgcolor="rgb(190 190 190)"
                                            color="black"
                                            onClick={() =>
                                                getAccountsFromWallet()
                                            }
                                        />
                                    </div>
                                    <div
                                        className="col-12"
                                     
                                    >
                                        <div
                                            className={clsx(
                                                "social-share-media form-wrapper-one",
                                                className
                                            )}
                                        >
                                            {isGoogleRegistered === false && (
                                                <>
                                                    {isEmail ? (
                                                        <div
                                                            className={clsx(
                                                                "form-wrapper-one",
                                                                className
                                                            )}
                                                        >
                                                            <h4>
                                                                {isEmailNotRegistered
                                                                    ? "Register"
                                                                    : "Login"}
                                                            </h4>
                                                            {isEmailNotRegistered && (
                                                                <p>
                                                                    You don't
                                                                    have an
                                                                    account.{" "}
                                                                    Please
                                                                    register to
                                                                    continue.
                                                                </p>
                                                            )}

                                                            <div className="mb-5">
                                                                <label
                                                                    htmlFor="exampleInputEmail1"
                                                                    className="form-label"
                                                                >
                                                                    Email
                                                                    address
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    onChange={
                                                                        onChange
                                                                    }
                                                                    value={
                                                                        email
                                                                    }
                                                                />
                                                                {errors.email && (
                                                                    <ErrorText>
                                                                        {
                                                                            errors
                                                                                .email
                                                                                ?.message
                                                                        }
                                                                    </ErrorText>
                                                                )}
                                                            </div>
                                                            {isEmailNotRegistered && (
                                                                <>
                                                                    <div className="mb-5">
                                                                        <label
                                                                            htmlFor="name"
                                                                            className="form-label"
                                                                        >
                                                                            Name
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            name="name"
                                                                            onChange={
                                                                                onChange
                                                                            }
                                                                            value={
                                                                                name
                                                                            }
                                                                        />
                                                                        {errors.name && (
                                                                            <ErrorText>
                                                                                {
                                                                                    errors
                                                                                        .name
                                                                                        ?.message
                                                                                }
                                                                            </ErrorText>
                                                                        )}
                                                                    </div>

                                                                    <div className="mb-5">
                                                                        <label
                                                                            htmlFor="password"
                                                                            className="form-label"
                                                                        >
                                                                            Password
                                                                        </label>
                                                                        <input
                                                                            type="password"
                                                                            id="password"
                                                                            name="password"
                                                                            onChange={
                                                                                onChange
                                                                            }
                                                                            value={
                                                                                password
                                                                            }
                                                                        />
                                                                        {errors.password && (
                                                                            <ErrorText>
                                                                                {
                                                                                    errors
                                                                                        .password
                                                                                        ?.message
                                                                                }
                                                                            </ErrorText>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                            {isEmailRegistered && (
                                                                <div className="mb-5">
                                                                    <label
                                                                        htmlFor="password"
                                                                        className="form-label"
                                                                    >
                                                                        Password
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        id="password"
                                                                        name="password"
                                                                        onChange={
                                                                            onChange
                                                                        }
                                                                        value={
                                                                            password
                                                                        }
                                                                    />
                                                                    {errors.password && (
                                                                        <ErrorText>
                                                                            {
                                                                                errors
                                                                                    .password
                                                                                    ?.message
                                                                            }
                                                                        </ErrorText>
                                                                    )}
                                                                </div>
                                                            )}

                                                            <Button
                                                                size="medium"
                                                                className="mr--15"
                                                                onClick={
                                                                    onLogin
                                                                }
                                                            >
                                                                Log In
                                                            </Button>
                                                            <Button
                                                                color="primary-alta"
                                                                size="medium"
                                                                onClick={() => {
                                                                    setIsEmail(
                                                                        false
                                                                    );
                                                                    setIsEmailNotRegistered(
                                                                        false
                                                                    );
                                                                    setIsEmailRegistered(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                Back
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h6>
                                                                Another way to
                                                                log in
                                                            </h6>
                                                            <p>
                                                                Lorem ipsum
                                                                dolor sit, amet
                                                                sectetur
                                                                adipisicing
                                                                elit.cumque.
                                                            </p>
                                                            <button
                                                                type="button"
                                                                className="another-login login-facebook"
                                                                onClick={() =>
                                                                    setIsEmail(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <span className="small-image">
                                                                    <Image
                                                                        src="/images/icons/email.png"
                                                                        alt="email login"
                                                                        width={
                                                                            26
                                                                        }
                                                                        height={
                                                                            27
                                                                        }
                                                                    />
                                                                </span>
                                                                <span>
                                                                    Log in with
                                                                    Email
                                                                </span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="another-login login-facebook"
                                                                onClick={() => {
                                                                    // setIsGoogleRegistered(
                                                                    //     true
                                                                    // );
                                                                    googleLoginClick();
                                                                }}
                                                            >
                                                                <span className="small-image">
                                                                    <Image
                                                                        src="/images/icons/google.png"
                                                                        alt="google login"
                                                                        width={
                                                                            26
                                                                        }
                                                                        height={
                                                                            27
                                                                        }
                                                                    />
                                                                </span>
                                                                <span>
                                                                    Log in with
                                                                    Google
                                                                </span>
                                                            </button>
                                                      
                                                        </>
                                                    )}
                                                </>
                                            )}

                                            {isGoogleRegistered && (
                                                <div
                                                    className={clsx(
                                                        "form-wrapper-one",
                                                        className
                                                    )}
                                                >
                                                    <h4>Login</h4>
                                                    <div className="mb-5">
                                                        <p>
                                                            You already have an
                                                            account.{" "}
                                                        </p>
                                                        <span>
                                                            You've already used
                                                            this email. Sign in
                                                            with Google to
                                                            continue.
                                                        </span>
                                                    </div>

                                                    <div className="mb-5">
                                                        <button
                                                            type="button"
                                                            className="another-login login-facebook"
                                                            onClick={() =>
                                                                googleLoginClick()
                                                            }
                                                        >
                                                            <span className="small-image">
                                                                <Image
                                                                    src="/images/icons/google.png"
                                                                    alt="google login"
                                                                    width={26}
                                                                    height={27}
                                                                />
                                                            </span>
                                                            <span>
                                                                Log in with
                                                                Google
                                                            </span>
                                                        </button>

                                                        <Button
                                                            color="primary-alta"
                                                            size="medium"
                                                            onClick={() => {
                                                                setIsGoogleRegistered(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            Back
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Modal
                        className="rn-popup-modal upload-modal-wrapper"
                        show={openChainModal}
                        onHide={handleChainModal}
                        centered
                    >
                        {openChainModal && (
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleChainModal}
                            >
                                <i className="feather-x" />
                            </button>
                        )}
                        <Modal.Body>
                            <div className="modal-content">
                                <h3>Connect with Chainweaver</h3>
                                <div className="modal-body">
                                   

                                    <div className="mb-5">
                                        <label
                                            htmlFor="address"
                                            className="form-label"
                                        >
                                            Wallet Address
                                        </label>
                                        <input
                                            style={{
                                                border: "1px solid #e5e5e5",
                                                borderRadius: "5px",
                                                padding: "10px",
                                            }}
                                            type="text"
                                            id="address"
                                            placeholder="Enter your wallet address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                        {errors.address && (
                                            <ErrorText>
                                                {errors.address?.message}
                                            </ErrorText>
                                        )}
                                    </div>
                                    <Button
                                        size="medium"
                                        className="mr--15"
                                        onClick={() =>
                                            handleConnectChainweaver({
                                                address,
                                            })
                                        }
                                    >
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* Two Factor Model */}
                    <Modal
                        className="rn-popup-modal upload-modal-wrapper"
                        show={isTwoFactorModalOpen}
                        onHide={() => setIsTwoFactorModalOpen(false)}
                        centered
                    >
                        {isTwoFactorModalOpen && (
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setIsTwoFactorModalOpen(false)}
                            >
                                <i className="feather-x" />
                            </button>
                        )}
                        <Modal.Body>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Enable 2FA</h3>
                                </div>
                                <div className="modal-body">
                                    {qrImage.length > 0 && (
                                        <div
                                            className="form-group"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <label htmlFor="address">
                                                Scan QR Code
                                            </label>
                                            <img src={qrImage} alt="qr code" />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="address">Key</label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Enter your key"
                                            value={twoFactorCode}
                                            onChange={(e) =>
                                                setTwoFactorCode(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div
                                        className="modal-footer"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {/* close */}
                                        <Button
                                            type="button"
                                            size="medium"
                                            onClick={() =>
                                                setIsTwoFactorModalOpen(false)
                                            }
                                        >
                                            Close
                                        </Button>

                                        <Button
                                            type="button"
                                            size="medium"
                                            onClick={() => verify2FA()}
                                        >
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* Zelcore Modal */}
                    <Modal
                        className="rn-popup-modal upload-modal-wrapper"
                        show={openZelcoreModal}
                        onHide={() => setOpenZelcoreModal(false)}
                        centered
                    >
                        {openZelcoreModal && (
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setOpenZelcoreModal(false)}
                            >
                                <i className="feather-x" />
                            </button>
                        )}
                        <Modal.Body>
                            <div className="modal-content">
                                <h3>Connect with Zelcore</h3>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="address">
                                            Wallet Address
                                        </label>
                                        <select
                                            name="address"
                                            id="address"
                                            onChange={(e) =>
                                                setWalletAddress(e.target.value)
                                            }
                                            style={{
                                                border: "1px solid #e5e5e5",
                                                borderRadius: "5px",
                                                padding: "10px",
                                            }}
                                        >
                                            <option value="">
                                                Select Wallet
                                            </option>
                                            {zelcoreAccounts.map(
                                                (account, index) => (
                                                    <option
                                                        key={index}
                                                        value={account}
                                                    >
                                                        {account}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div
                                        className="modal-footer"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            type="button"
                                            size="medium"
                                            onClick={() =>
                                                setOpenZelcoreModal(false)
                                            }
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            type="button"
                                            size="medium"
                                            onClick={() =>
                                                checkUser(walletAddress)
                                            }
                                        >
                                            Connect
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            {loading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                    }}
                >
                    <MutatingDots color="#1f2654" />
                </div>
            )}
        </>
    );
};

ConnectArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
ConnectArea.defaultProps = {
    space: 1,
};

export default ConnectArea;
