import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Tabs,
    Tab,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import collectionService from "src/services/collection.service";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";
import ConnectModal from "@components/modals/connect-modal";
import Loader from "@components/loader";
import { useAccountContext } from "src/contexts";


const DarkPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1E1E1E",
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    "&:hover": {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
}));

const GreenButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#b2b500",
    height: "50px",
    borderRadius: "15px",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "#d4d700",
        transform: "translateY(-3px)",
        boxShadow: "0 7px 14px rgba(178, 181, 0, 0.3)",
    },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    backgroundColor: "#2E2E2E",
    borderRadius: "15px",
    padding: "5px",
    "& .MuiTabs-flexContainer": {
        justifyContent: "space-between",
    },
    "& .MuiTabs-indicator": {
        backgroundColor: "#b2b500",
        height: "3px",
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
    transition: "all 0.3s ease",
    "&.Mui-selected": {
        color: "#fff",
    },
    "&:hover": {
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}));

const DepositArea = () => {
    const [value, setValue] = useState(0);
    const searchParams = useSearchParams();
    const [amount, setAmount] = useState(0);
    const [fee, setFee] = useState(0);
    const [address, setAddress] = useState("");
    const [depositAmount, setDepositAmount] = useState(0);
    const [depositFee, setDepositFee] = useState(0);
    const [price, setPrice] = useState(null);
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const account = useAccountContext();

    const [depositHistory, setDepositHistory] = useState([]);
 // Add this function to show toast notifications
 const showToast = (icon, title) => {
    Swal.fire({
        icon,
        title,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};
    const balance = useSelector((state) => state.balance.value);
    console.log(balance, "balance");

    const handleConnectModal = () => {
        setShowConnectModal(!showConnectModal);
    };

    const getHistory = async () => {
        const response = await collectionService.getAllDeposits(
            page,
            limit,
            search
        );
        console.log("response", response);
        if (response?.data?.status === "success") {
            setDepositHistory(response.data.data[0].deposits);
        }
        // setDepositHistory(response.data.data);
    };

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    {
                        params: {
                            ids: "kadena",
                            vs_currencies: "usd",
                        },
                    }
                );
                if (response.status === 200) {
                    setPrice(response.data.kadena.usd);
                }
            } catch (error) {
                console.error("Error fetching the Kadena price:", error);
            }
        };

        fetchPrice();
        getHistory();
    }, []);
    console.log("price", price);

    useEffect(() => {
        if (!searchParams.get("status")) return;

        const fetchCollection = async () => {
            if (!searchParams.get("session_id")) return;
            const response = await collectionService.checkTransaction(
                searchParams.get("session_id")
            );
            console.log("response", response);
        };

        if (searchParams.get("status") === "success") {
            fetchCollection();

            showToast("success", "Transaction successful");

            setTimeout(() => {
                router.push("/deposit");
            }, 3000);
        }
        if (searchParams.get("status") === "cancel") {
            fetchCollection();

            showToast("error", "Transaction failed");

            setTimeout(() => {
                router.push("/deposit");
            }, 3000);
        }
    }, [searchParams.get("status")]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (value === "" || regex.test(value)) {
            setAmount(value);
        }
    };
    console.log("amount", amount);

    useEffect(() => {
        const walletAddress = localStorage.getItem("walletAddress");
        console.log(walletAddress, "walletAddress");
        if (walletAddress) {
            setAddress(walletAddress);
        }
    }, []);

    const copyWalletAddress = () => {
        navigator.clipboard.writeText(address);
        showToast("success", "Wallet address copied to clipboard");

    };

    const deposit = async () => {
        // console.log("Deposit");
        // const newBalance = balance + parseFloat(amount);
        // setBalance(newBalance);
        // const newDeposit = {
        //     id: depositHistory.length + 1,
        //     amount: parseFloat(amount),
        //     date: new Date().toDateString(),
        // };
        // setDepositHistory([...depositHistory, newDeposit]);
        // setAmount(0);
        // setFee(0);

        // Toast.fire({
        //     icon: "success",
        //     title: "Deposit successful",
        // });

        // const deposit: IDeposit = {
        //     user: userId,
        //     transactionId: newTransaction._id as string,
        //     amount: req.body.amount,
        //     cryptoCurrency: req.body.cryptoCurrency,
        //     status: "pending",
        //     address: req.body.address,
        //     txHash: req.body.txHash,
        //     priorityFee: req.body.priorityFee,
        //     percentage: req.body.percentage,
        //     totalAmount: newTransaction.paymentAmount,
        //   };

        if (account?.user?.walletAddress) {
            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            );
            const body = {
                amount: amount,
                priorityFee: fee,
                cryptoCurrency: "KDA",
                address: address,
                price: price,
                type: "deposit",
            };
            console.log("🚀 ~ handleSubmit ~ body", body);

            const response = await collectionService.createCheckoutSession(
                body
            );
            console.log("🚀 ~ handleSubmit ~ response", response);
            const session = response.data.data;
            console.log("🚀 ~ handleSubmit ~ session", session);
            await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } else {
            handleConnectModal();
        }
    };

    useEffect(() => {
        const fee = (amount * 3.5) / 100;
        setFee(fee);
    }, [amount]);

    console.log("depositHistory", depositHistory);
    // [ { amount: 2, createdAt: '2024-08-05T20:16:36.071Z' } ]

    return (
        <>
            <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Trading Wallet Balance
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    <Image
                        src="/wallet/Kadena.png"
                        alt="Solana"
                        width={30}
                        height={30}
                    />
                    <span style={{ marginLeft: 10 }}>
                        ≋ {parseFloat(balance).toFixed(2)}
                    </span>
                    {/* <SyncIcon /> */}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        backgroundColor: "#1E1E1E",
                        padding: "10px",
                        borderRadius: "10px",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body2" sx={{ mr: 1, fontSize: 12 }}>
                        {address}
                    </Typography>
                    <ContentCopyIcon
                        fontSize="small"
                        sx={{ cursor: "pointer" }}
                        onClick={copyWalletAddress}
                    />
                </Box>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    variant="fullWidth"
                    scrollButtons="auto"
                >
                    <StyledTab label="Deposit • KDA" />
                    <StyledTab label="History" />
                </StyledTabs>

                {value === 0 && (
                    <DarkPaper elevation={3}>
                        <Box
                            sx={{
                                border: "1px solid #2E2E2E",
                                padding: "12px",
                                borderRadius: "10px",
                                marginBottom: "20px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2,
                                }}
                            >
                                <Typography>From Your Wallet</Typography>
                                <Typography>To Trading Wallet</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 2,
                                }}
                            >
                                <Typography>
                                    <Image
                                        src="/wallet/Kadena.png"
                                        alt="Solana"
                                        width={30}
                                        height={30}
                                    />
                                    <span style={{ marginLeft: 10 }}>
                                        ≋ {parseFloat(balance).toFixed(2)}
                                    </span>
                                </Typography>
                                <Typography>
                                    {address.slice(0, 6)}...{address.slice(-4)}
                                    <ContentCopyIcon
                                        fontSize="small"
                                        sx={{
                                            cursor: "pointer",
                                            marginLeft: 1,
                                        }}
                                        onClick={copyWalletAddress}
                                    />
                                </Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ mb: 1 }}>
                            AMOUNT TO DEPOSIT
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={amount}
                            onChange={handleAmountChange}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    height: "60px",
                                    color: "white",
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.5)",
                                        borderWidth: "2px",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                                "& .MuiInputAdornment-root": {
                                    marginLeft: "10px",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Image
                                            src="/wallet/Kadena.png"
                                            alt="KDA"
                                            width={24}
                                            height={24}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Typography sx={{ mb: 1 }}>PRIORITY FEE</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={fee}
                            // onChange={(e) => setFee(e.target.value)}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    height: "60px",
                                    color: "white",
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.5)",
                                        borderWidth: "2px",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                                "& .MuiInputAdornment-root": {
                                    marginLeft: "10px",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Image
                                            src="/wallet/Kadena.png"
                                            alt="KDA"
                                            width={24}
                                            height={24}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <GreenButton
                            fullWidth
                            variant="contained"
                            onClick={deposit}
                        >
                            Deposit
                        </GreenButton>
                    </DarkPaper>
                )}

                {value === 1 && (
                    <DarkPaper
                        elevation={3}
                        sx={{ maxHeight: 300, overflow: "auto", height: 300 }}
                    >
                        {depositHistory.map((deposit, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderBottom: "1px solid #2E2E2E",
                                    padding: "10px",
                                }}
                            >
                                {/* <Typography>{deposit.createdAt}</Typography> */}
                                <Typography>
                                    {moment(deposit.createdAt).fromNow()}
                                </Typography>
                                <Typography>{deposit.amount} KDA</Typography>
                            </Box>
                        ))}

                        {depositHistory.length === 0 && (
                            <Typography sx={{ textAlign: "center", mt: 2 }}>
                                No deposit history
                            </Typography>
                        )}
                    </DarkPaper>
                )}
            </Box>

            {isLoading && <Loader />}
            <ConnectModal
                show={showConnectModal}
                handleModal={handleConnectModal}
            />
        </>
    );
};

export default DepositArea;
