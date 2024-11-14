import React, { useState, useEffect } from "react";
import SEO from "@components/seo";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import PropTypes from "prop-types";
import nftServices from "src/services/nftServices";
import Nft from "@components/nft";

const CollectionDetails = ({ initialToken }) => {
    const [token, setToken] = useState(initialToken);
    console.log("🚀 ~ CollectionDetails ~ token", token);

    return (
        <Wrapper>
            <SEO pageTitle="Launchpad Details" />
            <Header />
            <main id="main-content" style={{ marginBottom: "100px" }}>
                <div className="container">
                    <section className="section section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Nft nft={token.data} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>               
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticPaths() {
    const paths = [
        { params: {  token: "t:abc" } },
    ];

    return {
        paths,
        fallback: "blocking", // or false if you only want to pre-render at build time
    };
}

export async function getStaticProps({ params }) {
    const { token } = params;
    console.log("🚀 ~ getStaticProps ~ token:", token);

    // Fetch initial collection data
    const tokenId = await fetchNftData(token);

    // Check if data is not found
    if (!tokenId || !tokenId.data || Object.keys(tokenId.data).length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            initialToken: tokenId,
            className: "template-color-1",
        },
        revalidate: 60, // Optional: enable ISR, revalidate every 60 seconds
    };
}

// Data fetching function
async function fetchNftData( token) {
    const response = await nftServices.getNftByTokenId(token);
    console.log("🚀 ~ fetchNftData ~ response", response?.data);

    return {
        title: `${token}`,
        token,
        data: response?.data || {},
    };
}

CollectionDetails.propTypes = {
    initialToken: PropTypes.shape({
        title: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        data: PropTypes.shape({ collections: PropTypes.array }).isRequired,
    }).isRequired,
};

export default CollectionDetails;