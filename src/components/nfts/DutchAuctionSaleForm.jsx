// DutchAuctionSellForm.js
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DecimalPriceField from "./DecimalPriceField";
import NoTimeoutDatePicker from "./NoTimeoutDatePicker";

const base_date = () => new Date(Date.now() + 3600 * 1000); // 1 hour from now
const base_date_2 = () => new Date(Date.now() + 4200 * 1000); // 70 minutes from now

function DutchAuctionSellForm({ disabled, onChange }) {
    const [startingPrice, setStartingPrice] = useState(null);
    const [endPrice, setEndPrice] = useState(null);
    const [endSlopeDate, setEndOfSlopeDate] = useState(base_date());
    const [toDate, setToDate] = useState(base_date_2());

    const price_error = endPrice && startingPrice && startingPrice.lt(endPrice);
    const date_error = toDate != null && toDate < endSlopeDate;

    useEffect(() => {
        if (startingPrice && endPrice && endSlopeDate && toDate) {
            onChange({
                start_price: startingPrice,
                end_price: endPrice,
                end_date: endSlopeDate,
                tout: toDate,
            });
        }
    }, [startingPrice, endPrice, endSlopeDate, toDate, onChange]);

    return (
        <div className="dutch-auction-sell-form">
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
        </Grid>
        </div>
    );
}

export default DutchAuctionSellForm;