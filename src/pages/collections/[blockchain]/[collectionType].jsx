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



import Header2 from "@layout/header/collection-detail-header";
import Footer2 from "@layout/footer/footer-main";
import TopBarArea from "@containers/top-bar-collection";
import HeroArea from "@containers/hero/layout-07";
import LiveExploreArea from "@containers/live-explore/layout-03";
import CollectionArea from "@containers/collection/layout-02";
import ExploreProductArea from "@containers/explore-product/layout-03";
import ExploreNftArea from "@containers/collection-detail-nft-list";
import ServiceArea from "@containers/services/layout-02";
import NotificationArea from "@containers/notification";
import CreatorArea from "@containers/creator/layout-02";
import { normalizedData } from "@utils/methods";

// Demo data
import homepageData from "../../../data/homepages/home-07.json";
import sellerData from "../../../data/sellers.json";
import productData from "../../../data/products-02.json";
import collectionsData from "../../../data/collections.json";
import notificationData from "../../../data/notifications.json";


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

      const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 4);
  
      return (
        <Wrapper>
        <SEO pageTitle="Home Seven" />
        <Header />
        <Header2 collection={collection} />
        <main id="main-content" className="rn-nft-mid-wrapper" style={{ marginBottom: "200px" }}>
            <div className="list-item-1">
                <TopBarArea collection={collection} />
                <HeroArea data={collection} />
            </div>
            {/* <LiveExploreArea
                id="list-item-2"
                data={{
                    ...content["live-explore-section"],
                    products: liveAuctionData,
                }}
            /> */}
            {/* <CollectionArea
                space={2}
                data={{
                    ...content["collection-section"],
                    collections: collectionsData.slice(0, 4),
                }}
            /> */}
            <ExploreNftArea
                id="list-item-3"
                space={2}
                data={{
                    ...content["explore-product-section"],
                    products: productData,
                    nfts: nfts,
                }}
            />
        </main>
        <div className="header-right-fixed">
            <NotificationArea data={{ notifications: notificationData }} collectionId={collection?.data.data?._id} />
            {/* <CreatorArea
                data={{
                    creators: sellerData,
                }}
            /> */}
        </div>
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
            className: "home-sticky-pin sidebar-header position-relative",
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