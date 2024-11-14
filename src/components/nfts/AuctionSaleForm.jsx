// AuctionSaleForm.js
import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import DecimalPriceField from "./DecimalPriceField";
import NoTimeoutDatePicker from "./NoTimeoutDatePicker";
import Decimal from "decimal.js";

const INCREMENT_OPTIONS = [
    { text: "10%", value: "1.1" },
    { text: "20%", value: "1.2" },
    { text: "50%", value: "1.5" },
    { text: "100%", value: "2.0" },
];

const DEFAULT_OPTION = INCREMENT_OPTIONS[0].value;

const AuctionSaleForm = ({ disabled, onChange }) => {
    const [startingPrice, setStartingPrice] = useState(null);
    const [increment, setIncrement] = useState(DEFAULT_OPTION);
    const [toDate, setToDate] = useState(new Date(Date.now() + 3600 * 1000));

    useEffect(() => {
        if (startingPrice && increment && toDate) {
            onChange({
                start_price: startingPrice,
                increment: new Decimal(increment),
                tout: toDate,
            });
        }
    }, [startingPrice, increment, toDate, onChange]);

    return (
        <div className="dutch-auction-sell-form">
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
                    <NoTimeoutDatePicker
                        value={toDate}
                        onChange={setToDate}
                        disabled={disabled}
                    />
                </Grid>
            </Grid>
        </Box>
        </div>
    );
};

export default AuctionSaleForm;
