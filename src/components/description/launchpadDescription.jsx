// import React from "react";

// const RenderDescription = ({ collection }) => {
//     const containerStyle = {
//         backgroundColor: "#1a1a1a",
//         color: "#f0f0f0",
//         padding: "2rem",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     };

//     const headingStyle = {
//         color: "#a9b729",
//         marginBottom: "1.5rem",
//         fontWeight: "bold",
//         fontSize: "2.5rem",
//     };

//     const paragraphStyle = {
//         fontSize: "1.1rem",
//         lineHeight: 1.8,
//         marginBottom: "1rem",
//     };

//     const dividerStyle = {
//         height: "2px",
//         backgroundColor: "#a9b729",
//         margin: "2rem 0",
//     };

//     const subHeadingStyle = {
//         color: "#a9b729",
//         marginBottom: "1rem",
//         fontWeight: "bold",
//         fontSize: "1.8rem",
//     };

//     const detailsContainerStyle = {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "1rem",
//     };

//     const detailItemStyle = {
//         display: "flex",
//         alignItems: "center",
//         marginBottom: "1rem",
//     };

//     const iconStyle = {
//         marginRight: "1rem",
//         color: "#a9b729",
//     };

//     return (
//         <div style={containerStyle}>
//             <h1 style={headingStyle}>{collection.title}</h1>

//             <div>
//                 {collection.data.data.projectDescription
//                     .split("\n\n")
//                     .map((paragraph, index) => (
//                         <p key={index} style={paragraphStyle}>
//                             {paragraph}
//                         </p>
//                     ))}
//             </div>

//             <div style={dividerStyle}></div>

//             <h2 style={subHeadingStyle}>Collection Details</h2>

//             <div style={detailsContainerStyle}>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>🪙</span>
//                     <span>Total Supply: {collection.data.data.totalSupply}</span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>🔗</span>
//                     <span>Blockchain: {collection.blockchain}</span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>💰</span>
//                     <span>
//                         Mint Price: {collection.data.data.mintPrice}{" "}
//                         {collection.data.data.mintPriceCurrency}
//                     </span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>📅</span>
//                     <span>
//                         Launch Date:{" "}
//                         {new Date(
//                             collection.data.data.expectedLaunchDate
//                         ).toLocaleDateString()}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RenderDescription;




// import React from "react";
// import collectionService from "src/services/collection.service";
// import { useEffect, useState } from "react";

// const RenderDescription = ({ collection }) => {
//     console.log(collection);
//     const [collectionId, setCollectionId] = useState(null);
//     console.log(collectionId);

//     useEffect(() => {
//         const fetchCollection = async () => {
//             try {
//                 const response = await collectionService.getCollectionByName(
//                     collection?.collectionType
//                 );
//                 setCollectionId(response?.data?.data?.collectionId);
//                 console.log(response);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         if (collection?.collectionType) {
//             fetchCollection();
//         }
//     }, [collection.id]);

//     const containerStyle = {
//         backgroundColor: "#1a1a1a",
//         color: "#f0f0f0",
//         padding: "2rem",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     };

//     const headingStyle = {
//         color: "#a9b729",
//         marginBottom: "1.5rem",
//         fontWeight: "bold",
//         fontSize: "2.5rem",
//     };

//     const paragraphStyle = {
//         fontSize: "1.5rem",
//         lineHeight: 1.8,
//         marginBottom: "1rem",
//     };

//     const dividerStyle = {
//         height: "2px",
//         backgroundColor: "#a9b729",
//         margin: "2rem 0",
//     };

//     const subHeadingStyle = {
//         color: "#a9b729",
//         marginBottom: "1rem",
//         fontWeight: "bold",
//         fontSize: "1.8rem",
//     };

//     const detailsContainerStyle = {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "1rem",
//     };

//     const detailItemStyle = {
//         display: "flex",
//         alignItems: "center",
//         marginBottom: "1rem",
//     };

//     const iconStyle = {
//         marginRight: "1rem",
//         color: "#a9b729",
//     };

//     const contractLinkStyle = {
//         backgroundColor: "#2a2a2a",
//         color: "#a9b729",
//         padding: "1rem",
//         borderRadius: "4px",
//         textDecoration: "none",
//         display: "inline-block",
//         marginTop: "1rem",
//         marginBottom: "1rem",
//         fontWeight: "bold",
//         cursor: "pointer",
//     };

//     const disclaimerStyle = {
//         fontSize: "0.9rem",
//         color: "#888",
//         marginTop: "2rem",
//         padding: "1rem",
//         backgroundColor: "#2a2a2a",
//         borderRadius: "4px",
//     };

//     const handleContractClick = () => {
//         // https://explorer.marmalade-ng.xyz/#/collection/c_DB%20COOPER%20NFT_gtFuZSpU8qBVLbMkbrajYIt8zwQrv2iD9VqhirDclfU
//         // Replace 'https://example.com' with the actual external website URL
//         window.open(
//             "https://explorer.marmalade-ng.xyz/#/collection/" + collectionId,
//             "_blank",
//             "noopener,noreferrer"
//         );
//     };

//     return (
//         <div style={containerStyle}>
//             <h1 style={headingStyle}>{collection?.title}</h1>

//             <div>
//                 {collection?.data?.data?.projectDescription
//                     .split("\n\n")
//                     .map((paragraph, index) => (
//                         <p key={index} style={paragraphStyle}>
//                             {paragraph}
//                         </p>
//                     ))}
//             </div>

//             <div style={dividerStyle}></div>

//             {/* <div onClick={handleContractClick} style={contractLinkStyle}>
//                 View Contract Details
//             </div> */}
//             {collectionId && (
//                 <div onClick={handleContractClick} style={contractLinkStyle}>
//                     View Contract Details
//                 </div>
//             )}

//             <div style={dividerStyle}></div>

//             <h2 style={subHeadingStyle}>Collection Details</h2>

//             <div style={detailsContainerStyle}>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>🪙</span>
//                     <span>
//                         Total Supply: {collection?.data?.data?.totalSupply}
//                     </span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>🔗</span>
//                     <span>Blockchain: {collection?.blockchain}</span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>💰</span>
//                     <span>
//                         Mint Price: {collection?.data?.data?.mintPrice}{" "}
//                         {collection?.data?.data?.mintPriceCurrency}
//                     </span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>📅</span>
//                     <span>
//                         Launch Date:{" "}
//                         {new Date(
//                             collection?.data?.data?.expectedLaunchDate
//                         ).toLocaleDateString()}
//                     </span>
//                 </div>
//             </div>

//             <div style={dividerStyle}></div>

//             <h3 style={{ ...subHeadingStyle, fontSize: "1.4rem" }}>
//                 Contract Information
//             </h3>
//             {/* <p>Contract Address: 5Wk5...hTGL</p>
//             <p>Contract Standard: Metaplex</p>
//             <p>Chain: Solana</p>
//             <p>Token Standard: Non-Fungible</p> */}

//             <div style={disclaimerStyle}>
//                 <p>
//                     Disclaimer: Certain content and information available on the
//                     Launchpad has been prepared by third parties, including
//                     creators utilizing the platform. Kryptomerch is not
//                     associated with these third parties or creators and assumes
//                     no responsibility for the content they provide. The
//                     information is intended for general informational purposes
//                     only and does not constitute investment advice. Kryptomerch
//                     is not liable for any inaccuracies, modifications, or
//                     omissions in the information, nor for any actions taken
//                     based on it. We make no claims regarding the accuracy,
//                     relevance, or reliability of any details related to NFT
//                     projects using the Launchpad.
//                 </p>
//                 <p>
//                     By clicking "Mint," I acknowledge that I am choosing to mint
//                     the NFT with the understanding that its value may be
//                     substantially lower than the mint price, and could
//                     potentially be worth nothing.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default RenderDescription;




import React from "react";
import { useEffect, useState } from "react";
import collectionService from "src/services/collection.service";

const RenderDescription = ({ collection }) => {
    const [collectionId, setCollectionId] = useState(null);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await collectionService.getCollectionByName(
                    collection?.collectionType
                );
                setCollectionId(response?.data?.data?.collectionId);
            } catch (err) {
                console.error(err);
            }
        };
        if (collection?.collectionType) {
            fetchCollection();
        }
    }, [collection.id]);

    const handleContractClick = () => {
        window.open(
            "https://explorer.marmalade-ng.xyz/#/collection/" + collectionId,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className="description-container">
            <div className="description-bg">
            <h1 className="description-heading">{collection?.title}</h1>

            <div>
                {collection?.data?.data?.projectDescription
                    .split("\n\n")
                    .map((paragraph, index) => (
                        <p key={index} className="description-paragraph">
                            {paragraph}
                        </p>
                    ))}
            </div>

            <div className="description-divider"></div>

            {collectionId && (
                <div onClick={handleContractClick} className="description-contract-link">
                    View Contract Details
                </div>
            )}

            <div className="description-divider"></div>

            <h2 className="description-subheading">Collection Details</h2>

            <div className="description-details-container">
                <div className="description-detail-item">
                    <span className="description-icon">🪙</span>
                    <span>
                        Total Supply: {collection?.data?.data?.totalSupply}
                    </span>
                </div>
                <div className="description-detail-item">
                    <span className="description-icon">🔗</span>
                    <span>Blockchain: {collection?.blockchain}</span>
                </div>
                <div className="description-detail-item">
                    <span className="description-icon">💰</span>
                    <span>
                        Mint Price: {collection?.data?.data?.mintPrice}{" "}
                        {collection?.data?.data?.mintPriceCurrency}
                    </span>
                </div>
                <div className="description-detail-item">
                    <span className="description-icon">📅</span>
                    <span>
                        Launch Date:{" "}
                        {new Date(
                            collection?.data?.data?.expectedLaunchDate
                        ).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="description-divider"></div>

            <h3 className="description-subheading description-subheading-small">
                Contract Information
            </h3>

            <div className="description-disclaimer">
                <p>
                    Disclaimer: Certain content and information available on the
                    Launchpad has been prepared by third parties, including
                    creators utilizing the platform. Kryptomerch is not
                    associated with these third parties or creators and assumes
                    no responsibility for the content they provide. The
                    information is intended for general informational purposes
                    only and does not constitute investment advice. Kryptomerch
                    is not liable for any inaccuracies, modifications, or
                    omissions in the information, nor for any actions taken
                    based on it. We make no claims regarding the accuracy,
                    relevance, or reliability of any details related to NFT
                    projects using the Launchpad.
                </p>
                <p>
                    By clicking "Mint," I acknowledge that I am choosing to mint
                    the NFT with the understanding that its value may be
                    substantially lower than the mint price, and could
                    potentially be worth nothing.
                </p>
            </div>
            </div>
        </div>
    );
};

export default RenderDescription;
