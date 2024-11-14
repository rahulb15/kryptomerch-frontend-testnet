import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Decimal } from 'decimal.js';

const base_date = () => new Date(Date.now() + 3600 * 1000); // 1 hour from now
const base_date_2 = () => new Date(Date.now() + 4200 * 1000); // 70 minutes from now
const warning_date = () => new Date(Date.now() + 30 * 86400 * 1000);

const DecimalPriceField = ({ name, onChange, disabled, error }) => {
    const [isError, setIsError] = useState(true);
    const setValue = (x) => {
        try {
            const v = new Decimal(x);
            if (v.greaterThan(0)) {
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
            <label style={{ fontSize: "16px" }}>
                {name + " (KDA)"}
            </label>
            <input
                type="text"
                disabled={disabled}
                placeholder={name}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    border: isError || error ? "1px solid red" : "1px solid green",
                    width: "100%",
                    margin: "5px 0",
                    borderRadius: "5px",
                    height: "40px",
                    padding: "5px",
                }}
            />
        </div>
    );
};

const NoTimeoutDatePicker = ({ value, onChange, disabled }) => {
    const [isNoTimeout, setIsNoTimeout] = useState(value == null);
    const [lastDate, setLastDate] = useState(new Date());

    const handleNoTimeoutChange = (event) => {
        setIsNoTimeout(event.target.checked);
        if (event.target.checked) {
            setLastDate(value);
            onChange(null);
        } else {
            onChange(lastDate);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isNoTimeout}
                        onChange={handleNoTimeoutChange}
                        disabled={disabled}
                        color="primary"
                    />
                }
                label="Unlimited sale"
            />
            <Tooltip title="When choosing an Unlimited sale, timeout will be disabled. Seller can close the sale at any time." arrow>
                <HelpOutlineIcon fontSize="small" sx={{ ml: 1, color: "text.secondary", cursor: "pointer" }} />
            </Tooltip>
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    End date
                </Typography>
                <DatePicker
                    showTimeSelect
                    selected={value}
                    onChange={onChange}
                    disabled={isNoTimeout || disabled}
                    dateFormat="Pp"
                />
            </Box>
        </Box>
    );
};

const DateWarningMessage = ({ date }) =>
    date && date > warning_date() ? (
        <Typography color="warning" sx={{ mt: 2 }}>
            Warning: The chosen time is far in the future. Your token will be locked until that date.
        </Typography>
    ) : null;

function FixedPriceSellForm({ disabled, onChange }) {
    const [price, setPrice] = useState(null);
    const [toDate, setToDate] = useState(base_date());

    useEffect(() => {
        if (price) {
            onChange({ price, tout: toDate });
        }
    }, [price, toDate, onChange]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <DecimalPriceField
                    name="Sell price"
                    disabled={disabled}
                    onChange={setPrice}
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

function DutchAuctionSellForm({ disabled, onChange }) {
    const [startingPrice, setStartingPrice] = useState(null);
    const [endPrice, setEndPrice] = useState(null);
    const [endSlopeDate, setEndOfSlopeDate] = useState(base_date());
    const [toDate, setToDate] = useState(base_date_2());

    const price_error = endPrice && startingPrice && startingPrice.lessThan(endPrice);
    const date_error = toDate != null && toDate < endSlopeDate;

    useEffect(() => {
        if (
            startingPrice &&
            endPrice &&
            endPrice.lessThan(startingPrice) &&
            (toDate == null || toDate >= endSlopeDate)
        ) {
            onChange({
                start_price: startingPrice,
                end_price: endPrice,
                end_date: endSlopeDate,
                tout: toDate,
            });
        }
    }, [startingPrice, endPrice, endSlopeDate, toDate, onChange]);

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
    const [startingPrice, setStartingPrice] = useState(null);
    const [increment, setIncrement] = useState(DEFAULT_OPTION);
    const [toDate, setToDate] = useState(base_date());

    useEffect(() => {
        if (startingPrice) {
            onChange({
                start_price: startingPrice,
                increment: new Decimal(increment),
                tout: toDate,
            });
        }
    }, [startingPrice, increment, toDate, onChange]);

    return (
        <Box>
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
                    <Typography variant="subtitle2" gutterBottom>
                        End Date
                    </Typography>
                    <DatePicker
                        showTimeSelect
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        dateFormat="Pp"
                    />
                </Grid>
            </Grid>
            <DateWarningMessage date={toDate} />
        </Box>
    );
}

export { FixedPriceSellForm, DutchAuctionSellForm, AuctionSellForm };