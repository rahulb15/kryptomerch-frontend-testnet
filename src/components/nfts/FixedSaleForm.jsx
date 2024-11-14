// // FixedSaleForm.js
// import React, { useState } from "react";
// import { Grid } from "semantic-ui-react";
// import DecimalPriceField from "./DecimalPriceField";
// import NoTimeoutDatePicker from "./NoTimeoutDatePicker";

// const FixedSaleForm = ({ onChange }) => {
//     const [price, setPrice] = useState(null);
//     const [tout, setTout] = useState(null);

//     const handleChange = (newData) => {
//         onChange({ ...newData, price, tout });
//     };

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//                 <DecimalPriceField
//                     name="Sell price"
//                     disabled={false}
//                     onChange={(newPrice) => {
//                         setPrice(newPrice);
//                         handleChange({ price: newPrice });
//                     }}
//                 />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <NoTimeoutDatePicker
//                     value={tout}
//                     onChange={(newTout) => {
//                         setTout(newTout);
//                         handleChange({ tout: newTout });
//                     }}
//                     disabled={false}
//                 />
//             </Grid>
//         </Grid>
//     );
// };

// export default FixedSaleForm;



// import React, { useState, useEffect } from "react";
// import { Grid } from "semantic-ui-react";
// import DecimalPriceField from "./DecimalPriceField";
// import NoTimeoutDatePicker from "./NoTimeoutDatePicker";

// const FixedSaleForm = ({ onChange }) => {
//     const [price, setPrice] = useState(null);
//     const [tout, setTout] = useState(null);

//     useEffect(() => {
//         if (price !== null || tout !== null) {
//             onChange({ price, tout });
//         }
//     }, [price, tout, onChange]);

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//                 <DecimalPriceField
//                     name="Sell price"
//                     disabled={false}
//                     onChange={setPrice}
//                 />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <NoTimeoutDatePicker
//                     value={tout}
//                     onChange={setTout}
//                     disabled={false}
//                 />
//             </Grid>
//         </Grid>
//     );
// };

// export default FixedSaleForm;



import React, { useState, useEffect } from "react";
import DecimalPriceField from "./DecimalPriceField";
import NoTimeoutDatePicker from "./NoTimeoutDatePicker";

const FixedSaleForm = ({ onChange }) => {
    const [price, setPrice] = useState(null);
    const [tout, setTout] = useState(null);

    useEffect(() => {
        if (price !== null || tout !== null) {
            onChange({ price, tout });
        }
    }, [price, tout, onChange]);

    return (
        <div className="fixed-sale-form">
            <div className="fixed-sale-form-grid">
                <div className="fixed-sale-form-field">
                    <label className="fixed-sale-form-label">Sell price</label>
                    <DecimalPriceField
                        name="Sell price"
                        disabled={false}
                        onChange={setPrice}
                        className="fixed-sale-form-input decimal-price-field"
                    />
                </div>
                <div className="fixed-sale-form-field">
                    <label className="fixed-sale-form-label">End date</label>
                    <NoTimeoutDatePicker
                        value={tout}
                        onChange={setTout}
                        disabled={false}
                        className="fixed-sale-form-input no-timeout-date-picker"
                    />
                </div>
            </div>
        </div>
    );
};

export default FixedSaleForm;