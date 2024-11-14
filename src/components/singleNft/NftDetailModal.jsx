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
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import FullScreenImage from "./FullScreenImage";
import {
    useTokenPolicies,
    useTokenBalance,
    useTokenSupply,
    usePrecision,
    useRoyalty,
    clear_sales,
    useSalesForToken,
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
    is_no_timeout,
} from "@utils/marmalade_common";
import Link from "next/link";
import { Pact } from "@kadena/client";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

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

function DutchAuctionPriceNet({ sale_data, token_id, fee }) {
    console.log("sale_data", sale_data);
    const royalty_rate = useRoyaltyRate(token_id);
    const gross = sale_data
        ? [sale_data.start_price, sale_data.end_price]
        : [ZERO, ZERO];

    const mplace_fee = gross.map((x) => compute_marketplace_fees(x, fee));
    const gross_after_mplace = mplace_fee.map((f, i) => gross[i].sub(f));

    const royalty = gross_after_mplace.map((g) => royalty_rate.mul(g));
    const total = royalty.map((f, i) => gross_after_mplace[i].sub(f));

    const details = (
        <FeeDetailsModal
            headers={["Max", "Min"]}
            gross={gross.map((x) => pretty_price(x, "coin"))}
            fees={[
                ["Marketplace"].concat(
                    mplace_fee.map((x) => "- " + pretty_price(x, "coin"))
                ),
                ["Royalty"].concat(
                    royalty.map((x) => "- " + pretty_price(x, "coin"))
                ),
            ]}
            total={total.map((x) => pretty_price(x, "coin"))}
        />
    );

    if (!sale_data) return null;

    return (
        <Box sx={{ mt: 2, p: 2, bgcolor: "info.light", borderRadius: 1 }}>
            <Typography variant="body1">
                You will receive between {pretty_price(total[1], "coin")} and{" "}
                {pretty_price(total[0], "coin")}
            </Typography>
            {details}
        </Box>
    );
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

    console.log("toDate", toDate);

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
const base_date_2 = () => new Date(Date.now() + 4200 * 1000);

function DutchAuctionSellForm({ disabled, onChange }) {
    const [startingPrice, setStartingPrice] = useState(null);
    const [endPrice, setEndPrice] = useState(null);
    const [endSlopeDate, _setEndOfSlopeDate] = useState(base_date());
    const [toDate, _setToDate] = useState(base_date_2());

    const setEndOfSlopeDate = (x) => {
        _setEndOfSlopeDate(x);
        if (startingPrice && endPrice) {
            onChange({
                start_price: startingPrice,
                end_price: endPrice,
                end_date: x,
                tout: toDate,
            });
        }
    };

    console.log("endSlopeDate", endSlopeDate);

    const setToDate = (x) => {
        _setToDate(x);
        if (startingPrice && endPrice) {
            onChange({
                start_price: startingPrice,
                end_price: endPrice,
                end_date: endSlopeDate,
                tout: x,
            });
        }
    };
    console.log("toDate", toDate);

    const price_error = endPrice && startingPrice && startingPrice.lt(endPrice);
    const date_error = toDate != null && toDate < endSlopeDate;

    useEffect(() => {
        if (
            startingPrice &&
            endPrice &&
            endPrice.lt(startingPrice) &&
            (toDate == null || toDate >= endSlopeDate)
        )
            onChange({
                start_price: startingPrice,
                end_price: endPrice,
                end_date: endSlopeDate,
                tout: toDate,
            });
    }, [endPrice, startingPrice, endSlopeDate, toDate, onChange]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <DecimalPriceField
                    name="Starting price"
                    disabled={disabled}
                    onChange={setStartingPrice}
                    error={price_error}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <DecimalPriceField
                    name="End of slope price"
                    disabled={disabled}
                    onChange={setEndPrice}
                    error={price_error}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                    End of Slope Date
                </Typography>
                <DatePicker
                    showTimeSelect
                    selected={endSlopeDate}
                    onChange={(date) => setEndOfSlopeDate(date)}
                    dateFormat="Pp"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <NoTimeoutDatePicker
                    value={toDate}
                    onChange={setToDate}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={12}>
                <DateWarningMessage date={toDate} />
            </Grid>
        </Grid>
    );
}

const INCREMENT_OPTIONS = [
    { text: "10%", value: "1.1" },
    { text: "20%", value: "1.2" },
    { text: "50%", value: "1.5" },
    { text: "100%", value: "2.0" },
];

const DEFAULT_OPTION = INCREMENT_OPTIONS[0].value;

function AuctionSellForm({ disabled, onChange }) {
    const [startingPrice, _setStartingPrice] = useState(null);
    const [increment, setIncrement] = useState(DEFAULT_OPTION);
    const [toDate, _setToDate] = useState(base_date());
    console.log("toDate", toDate);

    const setStartingPrice = (x) => {
        _setStartingPrice(x);
        if (x) {
            onChange({
                start_price: x,
                increment: new Decimal(increment),
                tout: toDate,
            });
        }
    };

    const setToDate = (x) => {
        _setToDate(x);
        if (startingPrice) {
            onChange({
                start_price: startingPrice,
                increment: new Decimal(increment),
                tout: x,
            });
        }
    };

    useEffect(() => {
        if (startingPrice) {
            onChange({
                start_price: startingPrice,
                increment: new Decimal(increment),
                tout: toDate,
            });
        }
    }, [increment]);

    return (
        <Box>
            {/* <AuctionHelpModal /> */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <DecimalPriceField
                        name="Starting price"
                        disabled={disabled}
                        onChange={setStartingPrice}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled={disabled}>
                        <InputLabel>Minimum increment between bids</InputLabel>
                        <Select
                            value={increment}
                            onChange={(e) => setIncrement(e.target.value)}
                            label="Minimum increment between bids"
                        >
                            {INCREMENT_OPTIONS.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            showTimeSelect
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            dateFormat="Pp"
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <DateWarningMessage date={toDate} />
        </Box>
    );
}

function AuctionPriceNet({sale_data, token_id, fee})
{
  const royalty_rate = useRoyaltyRate(token_id);
  const gross = sale_data?.start_price??ZERO;
  const mplace_fee = compute_marketplace_fees(gross, fee);
  const gross_after_mplace = gross.sub(mplace_fee);
  const royalty = royalty_rate.mul(gross_after_mplace);
  const total = gross_after_mplace.sub(royalty);

  const mplace_fee_rate = fee?Decimal(fee["fee-rate"]):ZERO;
  const mplace_fee_max = fee?Decimal(fee["max-fee"]):ZERO;

  const mplace_string = fee?`- X * ${to_percent(mplace_fee_rate)} (Max : ${pretty_price(mplace_fee_max, "coin")})`:pretty_price(ZERO,"coin");

  const details = <FeeDetailsModal headers={["Start price", "End price"]}
                                   gross={[pretty_price(gross, "coin"), "X" ]}
                                   fees={[["MarketPlace", "- " + pretty_price(mplace_fee, "coin"), mplace_string],
                                          ["Royalty", "- " + pretty_price(royalty, "coin"), "- X * " + to_percent(royalty_rate.mul(ONE.sub(mplace_fee_rate)))]]}
                                   total={[pretty_price(total, "coin"), "X * " + to_percent(ONE.sub(royalty_rate).mul(ONE.sub(mplace_fee_rate)))]}/>

  return sale_data? <Message icon="info" header={`You will receive at least ${pretty_price(total, "coin")}`}
                             content={details} />:""
}


const NftDetailModal = ({ open, onClose, data }) => {
    console.log("data", data);
    const accountuser = useAccountContext();
    const [showFullImage, setShowFullImage] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const { policies } = useTokenPolicies(data.tokenId);
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
    const { sales } = useSalesForToken(data.tokenId);
    const [canEnd, setCanEnd] = useState(false);
    const [closeSaleTrx, setCloseSaleTrx] = useState(null);
    const [showCloseSaleOptions, setShowCloseSaleOptions] = useState(false);
    const [buyerGuard, setBuyerGuard] = useState(null);
    const [type, setType] = useState("");
    console.log("buyerGuard", buyerGuard);

    useEffect(() => {
        if (sales && sales.length > 0) {
            const can_end =
                sales[0].timeout &&
                (is_no_timeout(sales[0].timeout) ||
                    sales[0].timeout <= new Date());
            console.log("can_end", can_end);
            setCanEnd(can_end);
        }

        if (sales[0]?.["current-buyer"])
            m_client
                .local_pact(
                    `(${m_client.ledger}.account-guard "${sales[0]["token-id"]}" "${sales[0]["current-buyer"]}")`
                )
                .then(setBuyerGuard);
    }, [sales]);

    const setSelected = (x) => {
        _setSelected(x);
        setSelectedSale(x);
    };

    useEffect(() => {
        console.log("policies", policies);
        if (policies && userData?.account) {
            console.log("default_sale", default_sale(policies));
            setSelected(default_sale(policies));
        }
    }, [userData]);

    const fee = useFee(data.tokenId);

    const setSelectedSale = (x) => {
        console.log("x", x);
        _setSelectedSale(x);
        setDataNew(null);
    };

    console.log("dataNew", dataNew);

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

    const handleSell = (e) => {
        console.log("Sell");
        e.preventDefault();
        setShowSaleOptions(true);
        setType("sell");
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

    const make_trx_withdraw_timed_out = (sale, gas_payer, user_guard) =>
        Pact.builder
            .continuation({ pactId: sale["sale-id"], step: 0, rollback: true })
            .setMeta({
                sender: gas_payer,
                chainId: m_client.chain,
                gasLimit: 3500,
            })
            .setNetworkId(m_client.network)
            .addSigner(user_guard.keys[0], (withCapability) => [
                withCapability("coin.GAS"),
            ])
            .setNonce(make_nonce)
            .createTransaction();

    const make_trx_withdraw_forced_fixed = (sale, gas_payer, user_guard) =>
        Pact.builder
            .continuation({ pactId: sale["sale-id"], step: 0, rollback: true })
            .setMeta({
                sender: gas_payer,
                chainId: m_client.chain,
                gasLimit: 3500,
            })
            .setNetworkId(m_client.network)
            .addSigner(user_guard.keys[0], (withCapability) => [
                withCapability("coin.GAS"),
            ])
            .addSigner(user_guard.keys[0], (withCapability) => [
                withCapability(
                    `${m_client.policy_fixed_sale}.FORCE-WITHDRAW`,
                    sale["sale-id"]
                ),
            ])
            .setNonce(make_nonce)
            .createTransaction();

    const make_trx_withdraw_forced_dutch = (sale, gas_payer, user_guard) =>
        Pact.builder
            .continuation({ pactId: sale["sale-id"], step: 0, rollback: true })
            .setMeta({
                sender: gas_payer,
                chainId: m_client.chain,
                gasLimit: 3500,
            })
            .setNetworkId(m_client.network)
            .addSigner(user_guard.keys[0], (withCapability) => [
                withCapability("coin.GAS"),
            ])
            .addSigner(user_guard.keys[0], (withCapability) => [
                withCapability(
                    `${m_client.policy_dutch_auction_sale}.FORCE-WITHDRAW`,
                    sale["sale-id"]
                ),
            ])
            .setNonce(make_nonce)
            .createTransaction();

    const make_trx_end_auction = (
        sale,
        gas_payer,
        user_guard,
        buyer,
        buyer_guard
    ) =>
        Pact.builder
            .continuation({ pactId: sale["sale-id"], step: 1, rollback: false })
            .setMeta({
                sender: gas_payer,
                chainId: m_client.chain,
                gasLimit: 4000,
            })
            .setNetworkId(m_client.network)
            .addData("buyer-guard", buyer_guard)
            .addData("buyer", buyer)
            .addSigner(user_guard.keys[0], (withCapability) => [
                withCapability("coin.GAS"),
            ])
            .setNonce(make_nonce)
            .createTransaction();

    function get_transaction_builder(sale_type, sale) {
        switch (sale_type) {
            case "f":
                return is_no_timeout(sale.timeout)
                    ? make_trx_withdraw_forced_fixed
                    : make_trx_withdraw_timed_out;
            case "d":
                return is_no_timeout(sale.timeout)
                    ? make_trx_withdraw_forced_dutch
                    : make_trx_withdraw_timed_out;
            case "a":
                return sale?.["current-buyer"]
                    ? make_trx_end_auction
                    : make_trx_withdraw_timed_out;
            default:
                return null;
        }
    }

    const handleCloseSale = () => {
        console.log("user data", userData);
        if (!canEnd) {
            console.log("Cannot end the sale at this time.");
            return;
        }

        /* Choose the right transaction */
        const make_trx = get_transaction_builder(sales[0].type, sales[0]);
        console.log("make_trx", make_trx);

        /* Here we only use sale?.['sale-id'] as a dependency, to be sure the transaction is not re-generated when the sale object is updated by SWR */
        const transaction =
            sales[0] &&
            userData?.account &&
            userData?.guard &&
            userData?.key &&
            make_trx
                ? make_trx(
                      sales[0],
                      userData.account,
                      userData.guard,
                      sales[0]?.["current-buyer"],
                      buyerGuard
                  )
                : null;

        console.log(transaction, userData?.wallet, "txnnn");
        setType("close");
        setCloseSaleTrx(transaction);

        setShowCloseSaleOptions(true);
    };

    const handleSaleTypeChange = (event) => {
        console.log("event.target.value", event.target.value);
        setSaleType(event.target.value);
        setSelected(event.target.value);
    };

    const handleImageClick = () => {
        setShowFullImage(true);
    };

    const handleCloseFullImage = () => {
        setShowFullImage(false);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

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
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    borderBottomLeftRadius: 8,
                                    transition: "opacity 0.3s",
                                    opacity: 1,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <IconButton
                                    onClick={handleImageClick}
                                    sx={{ color: "white" }}
                                >
                                    <FullscreenIcon />
                                </IconButton>
                            </Box>
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
                                        sx={{ fontSize: 16 }}
                                    >
                                        Creator:{" "}
                                        <strong>{data.creatorName}</strong>
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
                                                ? `${data.nftPrice} ETH`
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

                                    {/* //cancel button also */}
                                    {sellable && showSaleOptions ? (
                                        <Button
                                            variant="outlined"
                                            color="primary"
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
                                            onClick={handleCancelSale}
                                        >
                                            Back
                                        </Button>
                                    ) : (
                                        // <Button
                                        //     variant="contained"
                                        //     style={{
                                        //         fontSize: 16,
                                        //         padding: "8px 16px",
                                        //         borderRadius: 2,
                                        //         fontWeight: "bold",
                                        //         textTransform: "none",
                                        //         width: "150px",
                                        //         color: "black",
                                        //         backgroundColor: "#fae944",
                                        //         borderRadius: "5px",
                                        //         border: "1px solid #fae944",
                                        //         boxShadow:
                                        //             "0 4px 10px rgba(0, 0, 0, 0.1)",
                                        //     }}
                                        //     onClick={handleSell}
                                        // >
                                        //     Sell
                                        // </Button>

                                        <>
                                            {data.onSale ? (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    style={{
                                                        fontSize: 16,
                                                        padding: "8px 16px",
                                                        borderRadius: 2,
                                                        fontWeight: "bold",
                                                        textTransform: "none",
                                                        width: "150px",
                                                        color: "black",
                                                        backgroundColor:
                                                            "#fae944",
                                                        borderRadius: "5px",
                                                        border: "1px solid #fae944",
                                                        boxShadow:
                                                            "0 4px 10px rgba(0, 0, 0, 0.1)",
                                                    }}
                                                    onClick={handleCloseSale}
                                                >
                                                    Close Sale
                                                </Button>
                                            ) : (
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
                                                        backgroundColor:
                                                            "#fae944",
                                                        borderRadius: "5px",
                                                        border: "1px solid #fae944",
                                                        boxShadow:
                                                            "0 4px 10px rgba(0, 0, 0, 0.1)",
                                                    }}
                                                    onClick={handleSell}
                                                >
                                                    Sell
                                                </Button>
                                            )}
                                        </>
                                    )}

                                    {/* {sales.map( x=> <SaleRows sale={x} key={x["sale-id"]} precision={precision} />)} */}
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

                                {showSaleOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Typography variant="h5" gutterBottom>
                                            Choose Sale Type
                                        </Typography>
                                        {/* <FormControl component="fieldset"> */}
                                        {/* <RadioGroup
                                                aria-label="sale-type"
                                                name="sale-type"
                                                value={saleType}
                                                onChange={handleSaleTypeChange}
                                            >
                                                <FormControlLabel
                                                    value="Fixed-Sale"
                                                    control={<Radio />}
                                                    label="Fixed Price"
                                                />
                                            </RadioGroup> */}

                                        {/* //i want chip style not radio */}

                                        {/* <Box
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
                                        </Box> */}

                                        {/* has_fixed, has_auction, has_dutch */}
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "repeat(auto-fill, minmax(150px, 1fr))",
                                                gap: 2,
                                                mt: 2,
                                            }}
                                        >
                                            {has_fixed(policies) && (
                                                <Box
                                                    sx={{
                                                        backgroundColor:
                                                            "#f0f0f0",
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
                                                                value: "FIXED-SALE",
                                                            },
                                                        };
                                                        handleSaleTypeChange(
                                                            event
                                                        );
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
                                            )}

                                            {has_auction(policies) && (
                                                <Box
                                                    sx={{
                                                        backgroundColor:
                                                            "#f0f0f0",
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
                                                                value: "AUCTION-SALE",
                                                            },
                                                        };
                                                        handleSaleTypeChange(
                                                            event
                                                        );
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "1rem",
                                                        }}
                                                    >
                                                        {"Auction"}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {has_dutch_auction(policies) && (
                                                <Box
                                                    sx={{
                                                        backgroundColor:
                                                            "#f0f0f0",
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
                                                                value: "DUTCH-AUCTION-SALE",
                                                            },
                                                        };
                                                        handleSaleTypeChange(
                                                            event
                                                        );
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "1rem",
                                                        }}
                                                    >
                                                        {"Dutch Auction"}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>

                                        {/* </FormControl> */}

                                        {/* {saleType === "fixed" && (
                                            <Form>
                                                <Form.Field>
                                                    <label>Price</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter price"
                                                    />
                                                </Form.Field>
                                            </Form>
                                        )} */}
                                        {console.log(
                                            "selectedSale",
                                            selectedSale
                                        )}
                                        {console.log("saleType", saleType)}
                                        {console.log("selected", selected)}
                                        {selectedSale == "FIXED-SALE" && (
                                            <>
                                                {has_balance && (
                                                    <>
                                                        <FixedPriceSellForm
                                                            onChange={
                                                                setDataNew
                                                            }
                                                        />
                                                        <FixedPriceNet
                                                            sale_data={dataNew}
                                                            token_id={
                                                                data?.tokenId
                                                            }
                                                            fee={fee}
                                                        />
                                                    </>
                                                )}

                                                <TransactionManager
                                                    trx={trx}
                                                    wallet={userData?.wallet}
                                                    type={type}
                                                    onConfirm={clear_sales}
                                                    data={data}
                                                    onClose={onClose}
                                                />
                                            </>
                                        )}
                                        {selectedSale == "DUTCH-AUCTION-SALE" &&
                                            has_balance && (
                                                <>
                                                    <DutchAuctionSellForm
                                                        onChange={setDataNew}
                                                    />
                                                    <DutchAuctionPriceNet
                                                        sale_data={dataNew}
                                                        token_id={data?.tokenId}
                                                        fee={fee}
                                                    />
                                                    <TransactionManager
                                                        trx={trx}
                                                        wallet={
                                                            userData?.wallet
                                                        }
                                                        type={type}
                                                        onConfirm={clear_sales}
                                                        data={data}
                                                        onClose={onClose}
                                                    />
                                                </>
                                            )}

                                        {selectedSale == "AUCTION-SALE" &&
                                            has_balance && (
                                                <>
                                                    {" "}
                                                    <AuctionSellForm
                                                        onChange={setDataNew}
                                                    />
                                                    <AuctionPriceNet
                                                        sale_data={dataNew}
                                                        token_id={data?.tokenId}
                                                        fee={fee}
                                                    />
                                                    <TransactionManager
                                                        trx={trx}
                                                        wallet={
                                                            userData?.wallet
                                                        }
                                                        type={type}
                                                        onConfirm={clear_sales}
                                                        data={data}
                                                        onClose={onClose}
                                                    />
                                                </>
                                            )}

                                        {/* <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ mr: 2 }}
                                            >
                                                Confirm Sale
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={handleCancelSale}
                                            >
                                                Cancel
                                            </Button>
                                        </Box> */}
                                    </motion.div>
                                )}

                                {showCloseSaleOptions && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Typography variant="h5" gutterBottom>
                                            Are you sure you want to close the
                                            sale?
                                        </Typography>
                                        <TransactionManager
                                            trx={closeSaleTrx}
                                            wallet={userData?.wallet}
                                            data={data}
                                            type={type}
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

                            {/* <Form>
                                <Form.Field
                                    error={!balance || balance.eq(ZERO)}
                                >
                                    <label>Account balance</label>
                                    <input
                                        placeholder="BidAmount"
                                        value={`${(
                                            balance ?? Decimal("0.0")
                                        ).toFixed(precision)} / ${
                                            supply
                                                ? supply.toFixed(precision)
                                                : ""
                                        }`}
                                        readOnly
                                        disabled
                                    />
                                </Form.Field>
                            </Form> */}
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

export default NftDetailModal;
