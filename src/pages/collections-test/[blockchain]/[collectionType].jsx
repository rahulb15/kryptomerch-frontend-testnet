import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
import axios from "axios";  // Make sure to import axios

import CollectionDetailHeader from "@components/collection-detail-header";
import SEO from "@components/seo";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import NftListArea from "@components/nft-list";

import nftServices from "src/services/nftServices";
import collectionService from "src/services/collection.service";
import TVChartAdvanceContainer from "@components/TVChartAdvanceContainer";


const defaultWidgetProps = {
  symbol: "AAPL",
  interval: "1D",
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const TVChartContainer = dynamic(
    () => import("@components/TVChartContainer").then((mod) => mod.TVChartContainer),
    { ssr: false }
  );
  
  const CollectionDetails = ({ collection }) => {
    console.log(collection, "collection");
      const [isScriptReady, setIsScriptReady] = useState(false);
      const [nfts, setNfts] = useState([]);
      console.log(nfts, "nfts");
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [pageNo, setPageNo] = useState(1);
        const [limit, setLimit] = useState(10);

  
      useEffect(() => {
          const fetchNfts = async () => {
              if (collection?.title) {
                  try {
                      const response = await nftServices.getNftsMyCollectionNameMarket(
                            {
                                collectionName: collection.title,
                            },
                            pageNo,
                            limit
                        );

                        console.log(response.data, "response");
                        

                      setNfts(response.data.nfts);
                      setLoading(false);
                  } catch (err) {
                      setError(err.message);
                      setLoading(false);
                  }
              }
          };
  
          fetchNfts();
      }, [collection?.title]);
  
      return (
          <Wrapper>
              <Head>
                  <title>{collection?.title} - Launchpad Details</title>
              </Head>
              <SEO pageTitle="Launchpad Details" />
              <Header />
              <main id="main-content" style={{ marginBottom: "100px" }}>
                  <CollectionDetailHeader
                      pageTitle={collection?.title}
                      data={collection?.data?.data}
                  />
                  <Script
                      src="/static/datafeeds/udf/dist/bundle.js"
                      strategy="lazyOnload"
                      onReady={() => {
                          setIsScriptReady(true);
                      }}
                  />
                  {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
                  {loading ? (
                      <p>Loading NFTs...</p>
                  ) : error ? (
                      <p>Error: {error}</p>
                  ) : (
                      <NftListArea
                          data={{
                              section_title: {
                                  title: "Explore NFTs",
                              },
                              products: nfts,
                          }}
                          collection={collection}
                          collectionName={collection.title}
                      />
                  )}
              </main>
              <Footer />
          </Wrapper>
      );
  };

export async function getStaticPaths() {
    const paths = [
        { params: { blockchain: "kadena", collectionType: "priority-pass" } },
        { params: { blockchain: "solana", collectionType: "early-access" } },
        // Add more paths as needed
    ];

    return {
        paths,
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const { blockchain, collectionType } = params;
    const collection = await fetchCollectionData(blockchain, collectionType);

    return {
        props: {
            collection,
            className: "template-color-1",
        },
        revalidate: 60,
    };
}

async function fetchCollectionData(blockchain, collectionType) {
    const response = await collectionService.getCollectionByName(
        collectionType
    );
    console.log(response, "response");

    return {
        title: `${collectionType.replace("-", " ")}`,
        blockchain,
        collectionType,
        data: response?.data || {},
    };
}

CollectionDetails.propTypes = {
    collection: PropTypes.shape({
        title: PropTypes.string.isRequired,
        blockchain: PropTypes.string.isRequired,
        collectionType: PropTypes.string.isRequired,
        data: PropTypes.shape({ collections: PropTypes.array }).isRequired,
    }).isRequired,
};

export default CollectionDetails;