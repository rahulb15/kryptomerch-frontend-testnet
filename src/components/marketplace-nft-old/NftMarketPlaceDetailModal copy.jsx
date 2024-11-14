import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Modal,
    Box,
    Typography,
    IconButton,
    // Button,
    FormControl,
    RadioGroup,
    Switch,
    Tooltip,
    FormControlLabel,
    Popover,
    Paper,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import FullScreenImage from "./FullScreenImage";
import {
    useTokenPolicies,
    useSalesForToken,
    useTokenBalance,
    useTokenSupply,
    usePrecision,
    useRoyalty,
    clear_sales,
} from "src/hooks/SWR_Hooks";
import {
    Grid,
    Message,
    Form,
    Table,
    Popup,
    Radio,
    Button,
} from "semantic-ui-react";
import {
    TransactionManager,
    WalletAccountManager,
} from "@components/Transactions";
import { m_client } from "@utils/api/chainweb_marmalade_ng";
import fees from "@utils/fees.json";
import Decimal from "decimal.js";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useAccountContext } from "src/contexts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    compute_marketplace_fees,
    pretty_price,
} from "@utils/marmalade_common";
import Link from "next/link";
import { Pact } from "@kadena/client";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import ReactCardFlip from "react-card-flip";
import { QRCode } from "react-qrcode-logo";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NftImageContainer from "./NftImageContainer";
const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: theme.shape.borderRadius,
        height: "40px",
        width: "100%",
        border: "1px solid #ced4da",
        "& fieldset": {
            borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
        },
    },
}));
export function make_nonce() {
    const a = new Uint8Array(8);
    crypto.getRandomValues(a);
    return "ng_expl:" + Array.from(a, (x) => x.toString(16)).join("");
}

const auction_next_price = (sale) =>
    sale
        ? sale["current-price"].eq("0.0")
            ? sale["start-price"]
            : sale["current-price"]
                  .mul(sale["increment-ratio"])
                  .toDecimalPlaces(PRICE_DIGITS, Decimal.ROUND_UP)
        : null;

const Price = ({ value, curr }) => <> {pretty_price(value, curr)} </>;

const coin_fungible = {
    refSpec: [{ namespace: null, name: "fungible-v2" }],
    refName: { namespace: null, name: "coin" },
};

const timep = (x) => (x ? { timep: x.toISOString() } : null);

const ZERO = Decimal("0");
const ONE = Decimal("1");
const HUNDRED = Decimal("100");
const to_percent = (x) => x.mul(HUNDRED).toFixed(1) + "%";

const dec = (x) => ({ decimal: x.toString() });
const make_trx = (sale, buyer, buyer_guard) =>
    Pact.builder
        .continuation({ pactId: sale["sale-id"], step: 1, rollback: false })
        .setMeta({ sender: buyer, chainId: m_client.chain, gasLimit: 10000 })
        .setNetworkId(m_client.network)
        .addData("buyer", buyer)
        .addData("buyer-guard", buyer_guard)
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability(
                "coin.TRANSFER",
                buyer,
                sale["escrow-account"],
                dec(sale.price)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const make_bid_trx = (sale, buyer, buyer_guard, price) =>
    Pact.builder
        .execution(
            `(${m_client.policy_auction_sale}.place-bid "${
                sale["sale-id"]
            }" "${buyer}" (read-msg "bg") ${price.toFixed(12)})`
        )
        .setMeta({ sender: buyer, chainId: m_client.chain, gasLimit: 10000 })
        .setNetworkId(m_client.network)
        .addData("bg", buyer_guard)
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(buyer_guard.keys[0], (withCapability) => [
            withCapability(
                "coin.TRANSFER",
                buyer,
                sale["escrow-account"],
                dec(price)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const make_trx_fixed = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { tout, price }
) =>
    Pact.builder
        .execution(
            `(${
                m_client.ledger
            }.sale "${token_id}" "${seller}" ${amount.toFixed(6)} ${
                tout ? "(read-msg 'tout)" : `${m_client.ledger}.NO-TIMEOUT`
            })`
        )
        .setMeta({ sender: seller, chainId: m_client.chain, gasLimit: 4000 })
        .setNetworkId(m_client.network)
        .addData("tout", timep(tout))
        .addData(`marmalade_marketplace_${token_id}`, fee ? fee : undefined)
        .addData(`marmalade_sale_${token_id}`, {
            sale_type: "fixed",
            currency: coin_fungible,
        })
        .addData(`marmalade_fixed_quote_${token_id}`, {
            price: dec(price),
            recipient: seller,
        })
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability(
                `${m_client.ledger}.OFFER`,
                token_id,
                seller,
                dec(amount)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const make_trx_dutch = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { start_price, end_price, end_date, tout }
) =>
    Pact.builder
        .execution(
            `(${
                m_client.ledger
            }.sale "${token_id}" "${seller}" ${amount.toFixed(6)} ${
                tout ? "(read-msg 'tout)" : `${m_client.ledger}.NO-TIMEOUT`
            })`
        )
        .setMeta({ sender: seller, chainId: m_client.chain, gasLimit: 4000 })
        .setNetworkId(m_client.network)
        .addData("tout", timep(tout))
        .addData(`marmalade_marketplace_${token_id}`, fee ? fee : undefined)
        .addData(`marmalade_sale_${token_id}`, {
            sale_type: "dutch_auction",
            currency: coin_fungible,
        })
        .addData(`marmalade_dutch_quote_${token_id}`, {
            start_price: dec(start_price),
            end_price: dec(end_price),
            end_time: timep(end_date),
            recipient: seller,
        })
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability(
                `${m_client.ledger}.OFFER`,
                token_id,
                seller,
                dec(amount)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const make_trx_auction = (
    token_id,
    amount,
    seller,
    seller_guard,
    fee,
    { start_price, increment, tout }
) =>
    Pact.builder
        .execution(
            `(${
                m_client.ledger
            }.sale "${token_id}" "${seller}" ${amount.toFixed(
                6
            )} (read-msg 'tout))`
        )
        .setMeta({ sender: seller, chainId: m_client.chain, gasLimit: 4000 })
        .setNetworkId(m_client.network)
        .addData("tout", timep(tout))
        .addData(`marmalade_marketplace_${token_id}`, fee ? fee : undefined)
        .addData(`marmalade_sale_${token_id}`, {
            sale_type: "auction",
            currency: coin_fungible,
        })
        .addData(`marmalade_auction_${token_id}`, {
            start_price: dec(start_price),
            increment_ratio: dec(increment),
            recipient: seller,
        })
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability("coin.GAS"),
        ])
        .addSigner(seller_guard.keys[0], (withCapability) => [
            withCapability(
                `${m_client.ledger}.OFFER`,
                token_id,
                seller,
                dec(amount)
            ),
        ])
        .setNonce(make_nonce)
        .createTransaction();

const MAKE_TRX = {
    "FIXED-SALE": make_trx_fixed,
    "DUTCH-AUCTION-SALE": make_trx_dutch,
    "AUCTION-SALE": make_trx_auction,
};
console.log(MAKE_TRX);

function useFee(token_id) {
    const { policies } = useTokenPolicies(token_id);
    return policies && policies.includes("MARKETPLACE")
        ? fees[m_client.network]
        : undefined;
}

const get_guard = (x) =>
    m_client?.local_pact(`(coin.details "${x}")`).then((x) => x.guard);

const has_fixed = (p) => p.includes("FIXED-SALE");
const has_auction = (p) => p.includes("AUCTION-SALE");
const has_dutch_auction = (p) => p.includes("DUTCH-AUCTION-SALE");

function default_sale(policies) {
    if (has_fixed(policies)) return "FIXED-SALE";
    if (has_auction(policies)) return "AUCTION-SALE";
    if (has_dutch_auction(policies)) return "DUTCH-AUCTION-SALE";
    return "UNDEF";
}

function useRoyaltyRate(token_id) {
    const { policies } = useTokenPolicies(token_id);
    const has_cst_royalty = policies.includes("ROYALTY");
    const has_adj_royalty = policies.includes("ADJUSTABLE-ROYALTY");
    const has_royalty = has_cst_royalty || has_adj_royalty;

    const { royalty } = useRoyalty(
        has_royalty ? token_id : null,
        has_adj_royalty
    );

    return royalty ? royalty.rate : ZERO;
}

function FixedPriceNet({ sale_data, token_id, fee }) {
    const [anchorEl, setAnchorEl] = useState(null);
    console.log("sale_data", sale_data);
    const royalty_rate = useRoyaltyRate(token_id);
    const gross = sale_data?.price ?? ZERO;
    const mplace_fee = compute_marketplace_fees(gross, fee);
    const gross_after_mplace = gross.sub(mplace_fee);

    const royalty = royalty_rate.mul(gross_after_mplace);
    const total = gross_after_mplace.sub(royalty);

    console.log("gross", gross);
    console.log("mplace_fee", mplace_fee);
    console.log("royalty", royalty);
    console.log("total", total);

    const handleInfoClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const details = (
        <FeeDetailsModal
            headers={["Fixed"]}
            gross={[pretty_price(gross, "coin")]}
            fees={[
                ["Marketplace", "- " + pretty_price(mplace_fee, "coin")],
                ["Royalty", "- " + pretty_price(royalty, "coin")],
            ]}
            total={[pretty_price(total, "coin")]}
        />
    );

    return sale_data ? (
        <Box sx={{ mt: 2, position: "relative" }}>
            <Paper
                elevation={1}
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* <InfoOutlinedIcon sx={{ mr: 1 }} /> */}
                <Typography variant="body1">
                    You will receive {pretty_price(total, "coin")}
                </Typography>
                <IconButton
                    size="small"
                    onClick={handleInfoClick}
                    sx={{ ml: 1 }}
                    style={{
                        width: "30px",
                        height: "30px",
                        padding: "0px",
                        borderRadius: "50%",
                    }}
                >
                    <InfoOutlinedIcon fontSize="small" />
                </IconButton>
            </Paper>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ p: 2 }}>{details}</Box>
            </Popover>
        </Box>
    ) : null;
}

function DecimalPriceField({ name, onChange, disabled, error }) {
    const [isError, setIsError] = useState(true);
    const setValue = (x) => {
        try {
            const v = Decimal(x);
            if (v.gt(ZERO)) {
                setIsError(false);
                onChange(v);
            } else {
                setIsError(true);
                onChange(null);
            }
        } catch (error) {
            setIsError(true);
            onChange(null);
        }
    };
    return (
        <div style={{ marginTop: "15px" }}>
            <Form.Input
                label={
                    <label
                        style={{
                            fontSize: "16px",
                        }}
                    >
                        {name + " (KDA)"}
                    </label>
                }
                disabled={disabled}
                error={isError || error}
                placeholder={name}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    border: isError ? "1px solid red" : "1px solid green",
                    width: "50%",
                    margin: "5px",
                    borderRadius: "5px",
                    height: "40px",
                    padding: "5px",
                }}
            />
        </div>
    );
}
const PRICE_DIGITS = 2

function NoTimeoutDatePicker({ value, onChange, disabled }) {
    const is_no_timeout = value == null;
    const [lastDate, setLastDate] = useState(base_date());
    console.log("value", value);

    const setNoTimeout = (x) => {
        if (x) {
            onChange(null);
            setLastDate(value);
        } else {
            onChange(lastDate);
        }
    };

    const handleNoTimeoutChange = (event) => {
        setNoTimeout(event.target.checked);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={is_no_timeout}
                            onChange={handleNoTimeoutChange}
                            disabled={disabled}
                            color="primary"
                        />
                    }
                    label="Unlimited sale"
                />
                <Tooltip
                    title="When choosing an Unlimited sale, timeout will be disabled. Seller can close the sale at any time."
                    arrow
                >
                    <HelpOutlineIcon
                        fontSize="small"
                        sx={{
                            ml: 1,
                            color: "text.secondary",
                            cursor: "pointer",
                        }}
                    />
                </Tooltip>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    End date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDateTimePicker
                        disabled={is_no_timeout || disabled}
                        value={dayjs(value)}
                        onChange={(newValue) => onChange(dayjs(newValue))}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth />
                        )}
                    />
                </LocalizationProvider>
            </Box>
        </Box>
    );
}
function FeeDetailsModal({ headers, gross, fees, total }) {
    /* eslint-disable react/jsx-key */
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing />
                    {headers.map((x) => (
                        <Table.HeaderCell> {x} </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row positive>
                    <Table.Cell> Gross&nbsp;price </Table.Cell>
                    {gross.map((x) => (
                        <Table.Cell> {x} </Table.Cell>
                    ))}
                </Table.Row>

                {fees.map((fee_line) => (
                    <Table.Row negative>
                        {fee_line.map((x) => (
                            <Table.Cell>{x}</Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell> Total </Table.HeaderCell>
                    {total.map((x) => (
                        <Table.HeaderCell> {x} </Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Footer>
        </Table>
    );
    /* eslint-enable react/jsx-key */
}

const base_date = () => new Date(Date.now() + 3600 * 1000);
const warning_date = () => new Date(Date.now() + 30 * 86400 * 1000);
const DateWarningMessage = ({ date }) =>
    date && date > warning_date() ? (
        <Message
            visible
            warning
            header="Are you sure? The choosen time is long time in the future"
            content="Your token will be locked until that date"
        />
    ) : (
        ""
    );

function FixedPriceSellForm({ disabled, onChange }) {
    const [price, _setPrice] = useState(null);
    const [toDate, _setToDate] = useState(base_date());
    const setPrice = (x) => {
        _setPrice(x);
        if (x) {
            onChange({ price: x, tout: toDate });
        }
    };
    const setToDate = (x) => {
        _setToDate(x);
        if (price) {
            onChange({ price: price, tout: x });
        }
    };

    return (
        <>
            {/* <FixedPriceHelpModal /> */}
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <DecimalPriceField
                            name="Sell price"
                            disabled={disabled}
                            onChange={setPrice}
                        />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <NoTimeoutDatePicker
                            value={toDate}
                            onChange={setToDate}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <DateWarningMessage date={toDate} />
        </>
    );
}

const NftMarketPlaceDetailModal = ({ open, onClose, data }) => {
    console.log("data", data);
    const accountuser = useAccountContext();
    const [showFullImage, setShowFullImage] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const { policies } = useTokenPolicies(data.tokenId);
    const { sales } = useSalesForToken(data.tokenId);
    console.log("sales", sales);
    const [userData, setUserData] = useState(null);
    console.log("userData", userData);
    const [selectedSale, _setSelectedSale] = useState(null);
    console.log("selectedSale", selectedSale);
    const [dataNew, setDataNew] = useState(null);
    const { precision } = usePrecision(data.tokenId);
    const { supply } = useTokenSupply(data.tokenId);
    const { balance } = useTokenBalance(data.tokenId, userData?.account);
    const _to_key = (g) => g?.keys?.[0] ?? "";
    const [wallet, setWallet] = useState("");
    const [account, _setAccount] = useState("");
    const [selected, _setSelected] = useState(null);
    const [guard, setGuard] = useState("");
    const [keyError, setKeyError] = useState(false);
    const [saleType, setSaleType] = useState(null);
    const [showSaleOptions, setShowSaleOptions] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [qrSize, setQrSize] = useState({ width: 500, height: 500 });
    const [buyTrx, setBuyTrx] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [amountError, setAmountError] = useState(false);
    const [bidTrx, setBidTrx] = useState(null);
    const [showBuyOptions, setShowBuyOptions] = useState(false);
    const [showBidOptions, setShowBidOptions] = useState(false);

    // Add this useEffect to dynamically set the QR size based on the image container
    useEffect(() => {
        const updateQRSize = () => {
            const imageContainer = document.getElementById(
                "nft-image-container"
            );
            if (imageContainer) {
                setQrSize({
                    width: imageContainer.offsetWidth,
                    height: imageContainer.offsetHeight,
                });
            }
        };

        updateQRSize();
        window.addEventListener("resize", updateQRSize);

        return () => window.removeEventListener("resize", updateQRSize);
    }, []);

    const setSelected = (x) => {
        _setSelected(x);
        setSelectedSale(x);
    };

    useEffect(() => {
        if (policies && userData?.account) {
            console.log("default_sale", default_sale(policies));
            setSelected(default_sale(policies));
        }
    }, [userData]);

    useEffect(() => {
        setWallet(
            accountuser?.user?.walletName
                ? accountuser?.user?.walletName === "Ecko Wallet"
                    ? "Ecko"
                    : accountuser?.user?.walletName === "Chainweaver"
                    ? "ChainWeaver_Desktop"
                    : "Other"
                : "Other"
        );
        setAccount(accountuser?.user?.walletAddress);
    }, [accountuser]);

    const fee = useFee(data.tokenId);

    const setSelectedSale = (x) => {
        _setSelectedSale(x);
        setDataNew(null);
    };

    const trx = useMemo(
        () =>
            userData && dataNew && selectedSale
                ? MAKE_TRX[selectedSale](
                      data.tokenId,
                      balance,
                      userData.account,
                      userData.guard,
                      fee,
                      dataNew
                  )
                : null,
        [userData, dataNew, selectedSale, data.tokenId, balance, fee]
    );
    console.log("trx", trx);

    const has_balance = balance && !balance.eq(ZERO);

    const sellable =
        policies &&
        !policies.includes("DISABLE-SALE") &&
        (policies.includes("FIXED-SALE") ||
            policies.includes("AUCTION-SALE") ||
            policies.includes("DUTCH-AUCTION-SALE"));

    const setAccount = (a) => {
        if (account != a) {
            setGuard(null);
            _setAccount(a);
            get_guard(a)
                .then((g) => {
                    setGuard(g);
                    setKeyError(false);
                })
                .catch(() => setKeyError(true));
        }
    };

    useEffect(() => {
        if (wallet && account && guard)
            setUserData({
                wallet: wallet,
                account: account,
                guard: guard,
                key: _to_key(guard),
            });
        else setUserData(null);
    }, [wallet, account, guard]);

    const handleSell = (e) => {
        console.log("Sell");
        e.preventDefault();
        setShowSaleOptions(true);
        setWallet(
            accountuser?.user?.walletName
                ? accountuser?.user?.walletName === "Ecko Wallet"
                    ? "Ecko"
                    : accountuser?.user?.walletName === "Chainweaver"
                    ? "ChainWeaver_Desktop"
                    : "Other"
                : "Other"
        );
        setAccount(accountuser?.user?.walletAddress);
    };

    const handleCancelSale = () => {
        setShowSaleOptions(false);
        setSaleType(null);
    };

    const handleSaleTypeChange = (event) => {
        console.log("event.target.value", event.target.value);
        setSaleType(event.target.value);
    };

    const handleImageClick = (e) => {
        // e.stopPropagation();
        setShowFullImage(true);
    };

    const handleCloseFullImage = () => {
        setShowFullImage(false);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleBuy = () => {
        console.log("Buy");
        console.log("sales", sales);
        console.log("userData", userData);
        setSaleType("Fixed-Sale");
        setShowBuyOptions(true);
        const transaction =
            sales[0] && userData?.account && userData?.guard && userData?.key
                ? make_trx(sales[0], userData.account, userData.guard)
                : null;

        console.log("transaction", transaction);
        setBuyTrx(transaction);
    };

    const handleBid = () => {
        console.log("Bid");
        setSaleType("Auction-Sale");
        setShowBidOptions(true);
        //   const transaction = useMemo(() => (sale && userData?.account && userData?.guard && userData?.key && !amountError)
        //   // eslint-disable-next-line react-hooks/exhaustive-deps
        //                                   ?make_bid_trx(sale, userData.account, userData.guard, Decimal(bidAmount)):null, [sale?.['sale-id'], userData, bidAmount, amountError])

        const transaction =
            sales[0] && userData?.account && userData?.guard && userData?.key
                ? make_bid_trx(
                      sales[0],
                      userData.account,
                      userData.guard,
                      Decimal(4)
                  )
                : null;
        console.log("transaction", transaction);
        setBidTrx(transaction);
    };

    function EndOfSaleMessage({ sale }) {
        if (sale.timeout > warning_date())
            return (
                <Message
                    color="red"
                    header="Warning => Auction will end in a long time"
                    list={[
                        sale.timeout.toString(),
                        "Your funds may be locked until that date",
                    ]}
                />
            );
        else
            return (
                <Message
                    color="violet"
                    header="Auction End"
                    list={[sale.timeout.toString()]}
                />
            );
    }

    if (!open) return null;

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: isFullScreen ? 0 : "50%",
                        left: isFullScreen ? 0 : "50%",
                        transform: isFullScreen
                            ? "none"
                            : "translate(-50%, -50%)",
                        width: isFullScreen ? "100%" : "95%",
                        height: isFullScreen ? "100%" : "auto",
                        maxWidth: isFullScreen ? "none" : 1200,
                        bgcolor: "#ffffff",
                        boxShadow: 24,
                        borderRadius: isFullScreen ? 0 : 2,
                        maxHeight: isFullScreen ? "100vh" : "90vh",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: "1px solid #e0e0e0",
                            backgroundColor: "#f5f5f5",
                            position: "sticky",
                            top: 0,
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <Typography variant="h4">
                                    {data.collectionName}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    Token ID: {data.tokenId}
                                </Typography>
                                {/* rarityRank */}
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    Rarity Rank: {data?.rarityRank}
                                </Typography>
                                {/* rarityScore */}
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    Rarity Score: {data?.rarityScore}
                                </Typography>
                            </div>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginRight: 8,
                                }}
                            >
                                <IconButton onClick={toggleFullScreen}>
                                    {isFullScreen ? (
                                        <FullscreenExitIcon />
                                    ) : (
                                        <FullscreenIcon />
                                    )}
                                </IconButton>
                                <IconButton onClick={onClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </div>
                    </Box>

                    {/* Content */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            flex: 1,
                            p: 2,
                            overflowY: "auto",
                        }}
                    >
                        {/* Image Section */}
                        <Box
                            sx={{
                                flexBasis: { xs: "100%", md: "40%" },
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <ReactCardFlip
                                isFlipped={isFlipped}
                                flipDirection="horizontal"
                            >
                                {/* Front side - Image */}
                                {/* <Box
                                    id="nft-image-container"
                                    sx={{
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleImageClick}
                                >
                                    <Image
                                        src={data.tokenImage}
                                        alt={data.collectionName}
                                        layout="responsive"
                                        width={500}
                                        height={500}
                                        objectFit="contain"
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            padding: 1,
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                            borderBottomLeftRadius: 8,
                                            transition: "opacity 0.3s",
                                            opacity: 1,
                                            "&:hover": {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleImageClick();
                                            }}
                                            sx={{ color: "white" }}
                                        >
                                            <FullscreenIcon />
                                        </IconButton>
                                    </Box>

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            padding: 1,
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                            borderTopLeftRadius: 8,
                                            transition: "opacity 0.3s",
                                            opacity: 1,
                                            "&:hover": {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <IconButton
                                            sx={{ color: "white" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsFlipped(!isFlipped);
                                            }}
                                        >
                                            <QrCodeIcon />
                                        </IconButton>
                                    </Box>
                                </Box> */}

                                <NftImageContainer
                                    data={data}
                                    handleImageClick={handleImageClick}
                                    setIsFlipped={setIsFlipped}
                                    isFlipped={isFlipped}
                                />

                                {/* Back side - QR Code */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        // height: `${qrSize.height}px`,
                                        // width: `${qrSize.width}px`,
                                        position: "relative",
                                        padding: "20px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: "12px",
                                            padding: "10px",
                                            border: "1px solid #bee32c",
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.05)",
                                            position: "relative",
                                        }}
                                    >
                                        <QRCode
                                        // NEXT_PUBLIC_FRONTEND_URL
                                            // value={`http://localhost:3000/nft/${data.tokenId}`}
                                            value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/nft/${data.tokenId}`}
                                            size={
                                                Math.min(
                                                    qrSize.width,
                                                    qrSize.height
                                                ) * 0.7
                                            }
                                            qrStyle="dots"
                                            eyeRadius={8}
                                            quietZone={10}
                                            bgColor="#f5f5f5"
                                            fgColor="#333333"
                                            logoImage="/assets-images/prodOwner2.png" // Replace with your logo path
                                            logoWidth={60}
                                            logoHeight={60}
                                            logoPadding={5}
                                            logoPaddingStyle="circle"
                                        />
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            marginTop: "10px",
                                            textAlign: "center",
                                            color: "#666",
                                            maxWidth: "80%",
                                        }}
                                    >
                                        Scan to view NFT details
                                    </Typography>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            padding: 1,
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                            borderTopLeftRadius: 8,
                                            transition: "opacity 0.3s",
                                            opacity: 1,
                                            "&:hover": {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <IconButton
                                            sx={{ color: "white" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsFlipped(!isFlipped);
                                            }}
                                        >
                                            <FlipCameraAndroidIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ReactCardFlip>
                        </Box>

                        {/* Details Section */}
                        <Box
                            sx={{
                                flexBasis: { xs: "100%", md: "60%" },
                                pl: { md: 4 },
                                mt: { xs: 2, md: 0 },
                            }}
                        >
                            {/* Basic Info */}
                            <Box
                                sx={{
                                    position: "relative",
                                    mb: 4,
                                }}
                            >
                                <Box sx={{ pr: 2, maxWidth: "70%" }}>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{
                                            fontSize: 16,
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        Creator:{" "}
                                        {/* k:c9078691a009cca61b9ba2f34a4ebff59b166c87a6b638eb9ed514109ecd43c8 */}
                                        <strong style={{ marginLeft: "5px" }}>
                                            {data?.creator.slice(0, 10)}...
                                            {data?.creator.slice(-10)}
                                        </strong>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginLeft: "5px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <ContentCopyIcon
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        data?.creator
                                                    )
                                                }
                                            />
                                        </div>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{ fontSize: 16 }}
                                    >
                                        Collection Type:{" "}
                                        <strong>{data.collectionType}</strong>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{ fontSize: 16 }}
                                    >
                                        Price:{" "}
                                        <strong>
                                            {data.nftPrice > 0
                                                ? `${data.nftPrice} KDA`
                                                : "Not for sale"}
                                        </strong>
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        maxWidth: "50%",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {/* {sellable && !showSaleOptions && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                fontSize: 16,
                                                padding: "8px 16px",
                                                borderRadius: 2,
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                width: "200px",
                                            }}
                                            onClick={handleSell}
                                        >
                                            Sell
                                        </Button>
                                    )} */}

                                    {data?.onMarketplace && data?.onSale ? (
                                        <Button
                                            variant="contained"
                                            style={{
                                                fontSize: 16,
                                                padding: "8px 16px",
                                                borderRadius: 2,
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                width: "150px",
                                                color: "black",
                                                backgroundColor: "#fae944",
                                                borderRadius: "5px",
                                                border: "1px solid #fae944",
                                                boxShadow:
                                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                                            }}
                                            onClick={handleBuy}
                                        >
                                            Buy Now
                                        </Button>
                                    ) : (
                                        <></>
                                    )}

                                    {data?.onMarketplace && data?.onAuction ? (
                                        <Button
                                            variant="contained"
                                            style={{
                                                fontSize: 16,
                                                padding: "8px 16px",
                                                borderRadius: 2,
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                width: "150px",
                                                color: "black",
                                                backgroundColor: "#fae944",
                                                borderRadius: "5px",
                                                border: "1px solid #fae944",
                                                boxShadow:
                                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                                            }}
                                            onClick={handleBid}
                                        >
                                            Bid
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                </Box>
                            </Box>

                            <AnimatePresence>
                                {!showSaleOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {/* Attributes Section */}
                                        {data?.attributes &&
                                            data?.attributes?.length > 0 && (
                                                <Box mt={4}>
                                                    <Typography
                                                        variant="h5"
                                                        gutterBottom
                                                    >
                                                        Attributes
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "grid",
                                                            gridTemplateColumns:
                                                                "repeat(auto-fill, minmax(150px, 1fr))",
                                                            gap: 2,
                                                            mt: 2,
                                                        }}
                                                    >
                                                        {data.attributes.map(
                                                            (attr, index) => (
                                                                <Box
                                                                    key={index}
                                                                    sx={{
                                                                        backgroundColor:
                                                                            "#f0f0f0",
                                                                        borderRadius: 2,
                                                                        padding: 2,
                                                                        textAlign:
                                                                            "center",
                                                                        transition:
                                                                            "transform 0.2s, box-shadow 0.2s",
                                                                        "&:hover":
                                                                            {
                                                                                transform:
                                                                                    "translateY(-5px)",
                                                                                boxShadow:
                                                                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                                                                            },
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        sx={{
                                                                            color: "#666",
                                                                            textTransform:
                                                                                "uppercase",
                                                                            fontSize:
                                                                                "0.75rem",
                                                                            marginBottom: 1,
                                                                        }}
                                                                    >
                                                                        {
                                                                            attr.trait_type
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontWeight:
                                                                                "bold",
                                                                            fontSize:
                                                                                "1rem",
                                                                        }}
                                                                    >
                                                                        {
                                                                            attr.value
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            )
                                                        )}
                                                    </Box>
                                                </Box>
                                            )}

                                        {/* Properties Section */}
                                        {data.properties &&
                                            data.properties.length > 0 && (
                                                <Box mt={4}>
                                                    <Typography
                                                        variant="h5"
                                                        gutterBottom
                                                    >
                                                        Properties
                                                    </Typography>
                                                    {data.properties.map(
                                                        (prop, index) => (
                                                            <Box
                                                                key={index}
                                                                mt={2}
                                                            >
                                                                <Typography variant="body1">
                                                                    Collection:{" "}
                                                                    <strong>
                                                                        {
                                                                            prop
                                                                                .collection
                                                                                .name
                                                                        }
                                                                    </strong>{" "}
                                                                    (
                                                                    {
                                                                        prop
                                                                            .collection
                                                                            .family
                                                                    }
                                                                    )
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    Authors:{" "}
                                                                    <strong>
                                                                        {prop.authors
                                                                            .map(
                                                                                (
                                                                                    author
                                                                                ) =>
                                                                                    author.name
                                                                            )
                                                                            .join(
                                                                                ", "
                                                                            )}
                                                                    </strong>
                                                                </Typography>
                                                            </Box>
                                                        )
                                                    )}
                                                </Box>
                                            )}
                                    </motion.div>
                                )}

                                {sales && sales.length > 0 && (
                                    <>
                                        {showBidOptions && (
                                            <>
                                                <label>
                                                    Bid amount: Min:{" "}
                                                    <Price
                                                        value={auction_next_price(
                                                            sales[0]
                                                        )}
                                                        curr={
                                                            sales[0]?.currency
                                                        }
                                                    />{" "}
                                                </label>

                                                <EndOfSaleMessage
                                                    sale={sales[0]}
                                                />
                                            </>
                                        )}
                                    </>
                                )}

                                {/* {showSaleOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Typography variant="h5" gutterBottom>
                                            Choose Sale Type
                                        </Typography>
                                    

                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "repeat(auto-fill, minmax(150px, 1fr))",
                                                gap: 2,
                                                mt: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: "#f0f0f0",
                                                    borderRadius: 2,
                                                    padding: 2,
                                                    textAlign: "center",
                                                    transition:
                                                        "transform 0.2s, box-shadow 0.2s",
                                                    "&:hover": {
                                                        transform:
                                                            "translateY(-5px)",
                                                        boxShadow:
                                                            "0 4px 10px rgba(0, 0, 0, 0.1)",
                                                    },
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    const event = {
                                                        target: {
                                                            value: "Fixed-Sale",
                                                        },
                                                    };
                                                    handleSaleTypeChange(event);
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "1rem",
                                                    }}
                                                >
                                                    {"Fixed Price"}
                                                </Typography>
                                            </Box>
                                        </Box>

                                 
                                        {console.log(
                                            "selectedSale",
                                            selectedSale
                                        )}
                                        {saleType === "Fixed-Sale" &&
                                            selectedSale == "FIXED-SALE" && (
                                                <>
                                                    {has_balance && (
                                                        <>
                                                            <FixedPriceSellForm
                                                                onChange={
                                                                    setDataNew
                                                                }
                                                            />
                                                            <FixedPriceNet
                                                                sale_data={
                                                                    dataNew
                                                                }
                                                                token_id={
                                                                    data?.tokenId
                                                                }
                                                                fee={fee}
                                                            />
                                                        </>
                                                    )}

                                                    <TransactionManager
                                                        trx={trx}
                                                        wallet={
                                                            userData?.wallet
                                                        }
                                                        onConfirm={clear_sales}
                                                        data={data}
                                                        onClose={onClose}
                                                    />
                                                </>
                                            )}

                                    </motion.div>
                                )} */}

                                {showBuyOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Typography variant="h5" gutterBottom>
                                            Confirm Purchase
                                        </Typography>
                                        <TransactionManager
                                            trx={buyTrx}
                                            wallet={userData?.wallet}
                                            data={data}
                                            //   type={type}
                                            onClose={onClose}
                                            onConfirm={() => {
                                                clear_sales();
                                                // Additional actions after successful cancellation
                                                console.log(
                                                    "Sale cancelled successfully"
                                                );
                                                // You might want to update the UI or fetch updated data here
                                            }}
                                        />
                                    </motion.div>
                                )}

                                {showBidOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Typography variant="h5" gutterBottom>
                                            Confirm Bid
                                        </Typography>
                                        <TransactionManager
                                            trx={bidTrx}
                                            wallet={userData?.wallet}
                                            data={data}
                                            //   type={type}
                                            onClose={onClose}
                                            onConfirm={() => {
                                                clear_sales();
                                                // Additional actions after successful cancellation
                                                console.log(
                                                    "Sale cancelled successfully"
                                                );
                                                // You might want to update the UI or fetch updated data here
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            p: 2,
                            borderTop: "1px solid #e0e0e0",
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <Typography variant="body1" paragraph>
                            Listed: <strong>{321}</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Supply: <strong>{5}</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            24H Floor: <strong>{5}</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            24H Volume: <strong>{6}</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Social Media Links:{" "}
                            <strong>
                                <a href={"https://google.com"}>Twitter</a>
                            </strong>
                        </Typography>
                    </Box>
                </Box>
            </Modal>

            {showFullImage && (
                <FullScreenImage
                    src={data.tokenImage}
                    alt={data.collectionName}
                    onClose={handleCloseFullImage}
                />
            )}
        </>
    );
};

export default NftMarketPlaceDetailModal;
