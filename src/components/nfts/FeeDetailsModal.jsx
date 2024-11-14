// // FeeDetailsModal.js
// import React from "react";
// import { Paper, Typography } from "@mui/material";

// const FeeDetailsModal = ({ headers, gross, fees, total }) => (
//     <Paper elevation={3} sx={{ p: 2, mt: 2, backgroundColor: "#f0f0f0" }}>
//         <Typography variant="h6" gutterBottom>
//             Fee Details
//         </Typography>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//                 <tr>
//                     <th style={{ textAlign: "left", padding: "8px" }}></th>
//                     {headers.map((header, index) => (
//                         <th
//                             key={index}
//                             style={{ padding: "8px", textAlign: "right" }}
//                         >
//                             {header}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td style={{ padding: "8px" }}>Gross price</td>
//                     {gross.map((price, index) => (
//                         <td
//                             key={index}
//                             style={{ padding: "8px", textAlign: "right" }}
//                         >
//                             {price}
//                         </td>
//                     ))}
//                 </tr>
//                 {fees.map((fee, index) => (
//                     <tr key={index}>
//                         {fee.map((item, itemIndex) => (
//                             <td
//                                 key={itemIndex}
//                                 style={{
//                                     padding: "8px",
//                                     textAlign:
//                                         itemIndex === 0 ? "left" : "right",
//                                 }}
//                             >
//                                 {item}
//                             </td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//             <tfoot>
//                 <tr style={{ borderTop: "1px solid #ddd" }}>
//                     <td style={{ padding: "8px", fontWeight: "bold" }}>
//                         Total
//                     </td>
//                     {total.map((t, index) => (
//                         <td
//                             key={index}
//                             style={{
//                                 padding: "8px",
//                                 textAlign: "right",
//                                 fontWeight: "bold",
//                             }}
//                         >
//                             {t}
//                         </td>
//                     ))}
//                 </tr>
//             </tfoot>
//         </table>
//     </Paper>
// );

// export default FeeDetailsModal;


import React from "react";

const FeeDetailsModal = ({ headers, gross, fees, total }) => (
    <div className="fee-details-modal">
        <h3 className="fee-details-title">Fee Details</h3>
        <table className="fee-details-table">
            <thead>
                <tr>
                    <th></th>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gross price</td>
                    {gross.map((price, index) => (
                        <td key={index}>{price}</td>
                    ))}
                </tr>
                {fees.map((fee, index) => (
                    <tr key={index}>
                        {fee.map((item, itemIndex) => (
                            <td key={itemIndex}>{item}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    {total.map((t, index) => (
                        <td key={index}>{t}</td>
                    ))}
                </tr>
            </tfoot>
        </table>
    </div>
);

export default FeeDetailsModal;