import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TabContent, TabContainer, TabPane, Nav } from "react-bootstrap";
import { useGetOwnedNftsQuery } from "src/services/nft.service";
import { useGetTokenDetailsMutation } from "src/services/launchpad.service";
import { useAccountContext } from "src/contexts";
import nftServices from "src/services/nftServices";
import singleNftService from "src/services/singleNft.service";
import Nft from "@components/nfts";
import SingleNft from "@components/singleNft";
import MarketCollection from "@components/marketplace-collection";
import collectionService from "src/services/collection.service";
import NoDataFound from "@components/not-found";
import { RefreshCw } from "lucide-react";

const PREFERED_GATEWAY = "ipfs.io";

const ipfsResolution = (cid) => `https://${PREFERED_GATEWAY}/ipfs/${cid}`;

const AuthorProfileArea = ({ className }) => {
    const [activeTab, setActiveTab] = useState("nav-profile");
    const [marketplaceSubTab, setMarketplaceSubTab] = useState("onSale");
    const [createdActiveTab, setCreatedActiveTab] = useState("collections");
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(40);
    const [search, setSearch] = useState("");
    const [nfts, setNfts] = useState([]);
    const [onSaleNfts, setOnSaleNfts] = useState([]);
    const [onAuctionNfts, setOnAuctionNfts] = useState([]);
    const [onDutchAuctionNfts, setOnDutchAuctionNfts] = useState([]);
    const [createdCollections, setCreatedCollections] = useState([]);
    const [createdSingleNfts, setCreatedSingleNfts] = useState([]);
    const [likedNfts, setLikedNfts] = useState([]);
    const [priorityPassNfts, setPriorityPassNfts] = useState([]); // New state for Priority Pass
    const account = useAccountContext();
    const [refresh, setRefresh] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {
        data: ownedNftsData,
        error: ownedNftsError,
        isLoading: ownedNftsLoading,
        refetch: refetchOwnedNfts,
    } = useGetOwnedNftsQuery({
        pageNo,
        limit,
        search,
    });

    const [getTokenDetailsMutation] = useGetTokenDetailsMutation();

    useEffect(() => {
        if (ownedNftsData) {
            setNfts(ownedNftsData.data.nfts);
        }
    }, [ownedNftsData]);

    useEffect(() => {
        const fetchTokenDetails = async () => {
            if (account?.user?.walletAddress) {
                try {
                    const response = await getTokenDetailsMutation({
                        account: account?.user?.walletAddress || "",
                    }).unwrap();
                    console.log("Token details:", response);
                    const body = { reveledData: response };
                    await nftServices.updateRevealedNFTs(body);
                    refetchOwnedNfts();
                } catch (error) {
                    console.error("Error fetching token details:", error);
                }
            }
        };

        fetchTokenDetails();
    }, [account?.user?.walletAddress, getTokenDetailsMutation, refetchOwnedNfts, isRefreshing]);

    // Fetch Priority Pass NFTs

    const fetchPriorityPassNfts = async () => {
        if (activeTab === "nav-priority-pass" && account?.user?.walletAddress) {
            console.log("Fetching Priority Pass NFTs...");
            try {
                const response = await nftServices.getOwnedPriorityPassNfts({
                    walletAddress: account?.user?.walletAddress || "",
                    pageNo,
                    limit,
                    search,
                });
                setPriorityPassNfts(response.data.nfts);
            } catch (error) {
                console.error("Error fetching Priority Pass NFTs:", error);
            }
        }
    };
    useEffect(() => {
        fetchPriorityPassNfts();
    }, [activeTab, pageNo, limit, search, account?.user?.walletAddress]);

    const fetchCreatedItems = async () => {
        if (activeTab === "nav-contact") {
            try {
                if (
                    createdActiveTab === "collections" ||
                    createdActiveTab === "all"
                ) {
                    const collectionsResponse =
                        await collectionService.getCreatedCollections(
                            pageNo,
                            limit,
                            search
                        );
                    setCreatedCollections(
                        collectionsResponse.data.data[0].data
                    );
                }
                if (
                    createdActiveTab === "single-nfts" ||
                    createdActiveTab === "all"
                ) {
                    const singleNftsResponse =
                        await singleNftService.getCreatedSingleNfts(
                            pageNo,
                            limit,
                            search
                        );
                    setCreatedSingleNfts(singleNftsResponse.data.singleNfts);
                }
            } catch (error) {
                console.error("Error fetching created items:", error);
            }
        }
    };

    useEffect(() => {
        fetchCreatedItems();
    }, [
        activeTab,
        createdActiveTab,
        account?.user?.walletAddress,
        pageNo,
        limit,
        search,
        refresh,
    ]);

    const fetchLikedNfts = async () => {
        if (activeTab === "nav-liked") {
            try {
                const response = await nftServices.getLikedNfts({
                    walletAddress: account?.user?.walletAddress || "",
                    pageNo,
                    limit,
                    search,
                });
                setLikedNfts(response.data.nfts);
            } catch (error) {
                console.error("Error fetching liked NFTs:", error);
            }
        }
    };

    useEffect(() => {
        fetchLikedNfts();
    }, [activeTab, pageNo, limit, search, account?.user?.walletAddress]);

    const fetchMarketplaceNfts = async () => {
        if (activeTab === "nav-home") {
            try {
                const data = {}; // Add any necessary data for the API call
                if (marketplaceSubTab === "onSale") {
                    const response = await nftServices.getOwnSaleNfts(
                        data,
                        pageNo,
                        limit,
                        search
                    );
                    console.log("On sale NFTs:", response.data.nfts);
                    setOnSaleNfts(response.data.nfts);
                } else if (marketplaceSubTab === "onAuction") {
                    // Replace with actual API call for auction NFTs
                    const response = await nftServices.getOwnAuctionNfts(
                        data,
                        pageNo,
                        limit,
                        search
                    );
                    setOnAuctionNfts(response.data.nfts);
                } else if (marketplaceSubTab === "onDutchAuction") {
                    // Replace with actual API call for Dutch auction NFTs
                    const response = await nftServices.getOwnDutchAuctionNfts(
                        data,
                        pageNo,
                        limit,
                        search
                    );
                    setOnDutchAuctionNfts(response.data.nfts);
                }
            } catch (error) {
                console.error("Error fetching marketplace NFTs:", error);
            }
        }
    };

    useEffect(() => {
        fetchMarketplaceNfts();
    }, [activeTab, marketplaceSubTab, pageNo, limit, search]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleMarketplaceSubTabChange = (subTab) => {
        setMarketplaceSubTab(subTab);
    };

    const handleCreatedTabChange = (tab) => {
        setCreatedActiveTab(tab);
    };

    const refreshCurrentTab = async () => {
        setIsRefreshing(true);
        try {
            switch (activeTab) {
                case "nav-priority-pass":
                    await fetchPriorityPassNfts();
                    break;
                case "nav-home":
                    await fetchMarketplaceNfts();
                    break;
                case "nav-profile":
                    await refetchOwnedNfts();
                    break;
                case "nav-contact":
                    await fetchCreatedItems();
                    break;
                case "nav-liked":
                    await fetchLikedNfts();
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const renderMarketplaceNfts = () => {
        let nftsToRender = [];
        if (marketplaceSubTab === "onSale") nftsToRender = onSaleNfts;
        else if (marketplaceSubTab === "onAuction")
            nftsToRender = onAuctionNfts;
        else if (marketplaceSubTab === "onDutchAuction")
            nftsToRender = onDutchAuctionNfts;

        if (nftsToRender.length === 0) return <NoDataFound />;

        console.log("NFTs to render:", nftsToRender);

        return nftsToRender.map((nft) => (
            <div
                key={nft._id}
                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
                <Nft
                    overlay
                    placeBid
                    title={nft.collectionName}
                    slug={nft.tokenId}
                    latestBid={nft.nftPrice}
                    price={nft.nftPrice}
                    likeCount={nft.likes}
                    auction_date={nft.createdAt}
                    image={nft.tokenImage}
                    authors={nft.creatorName}
                    bitCount={nft.likes}
                    data={nft}
                    nft={nft}
                />
            </div>
        ));
    };

    const renderCreatedCollections = () => {
        if (createdCollections.length === 0) return <NoDataFound />;

        return createdCollections.map((collection) => (
            <div
                key={collection._id}
                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
                <MarketCollection
                    title={collection.collectionName}
                    total_item={collection.totalSupply}
                    path={collection.collectionName}
                    image={collection.collectionCoverImage}
                    thumbnails={collection.collectionBannerImage}
                    price={collection.mintPrice}
                    reservePrice={collection.reservePrice}
                    mintStartDate={collection.mintStartDate}
                    mintEndDate={collection.mintEndDate}
                    data={collection}
                />
            </div>
        ));
    };

    const renderCreatedSingleNfts = () => {
        if (createdSingleNfts.length === 0) return <NoDataFound />;

        return createdSingleNfts.map((nft) => (
            <div
                key={nft._id}
                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
                <SingleNft
                    overlay
                    placeBid
                    title={nft.collectionName}
                    slug={nft.tokenId}
                    latestBid={nft.nftPrice}
                    price={nft.nftPrice}
                    likeCount={nft.likes}
                    auction_date={nft.createdAt}
                    image={nft.tokenImage}
                    authors={nft.creatorName}
                    bitCount={nft.likes}
                    data={nft}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    refetchOwnedNfts={refetchOwnedNfts}
                />
            </div>
        ));
    };

    // Render Priority Pass NFTs
    const renderPriorityPassNfts = () => {
        if (priorityPassNfts.length === 0) return <NoDataFound />;

        return priorityPassNfts.map((nft) => (
            <div
                key={nft._id}
                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
                <Nft
                    overlay
                    placeBid
                    title={nft.collectionName}
                    slug={nft.tokenId}
                    latestBid={nft.nftPrice}
                    price={nft.nftPrice}
                    likeCount={nft.likes}
                    auction_date={nft.createdAt}
                    image={nft.tokenImage}
                    authors={nft.creatorName}
                    bitCount={nft.likes}
                    data={nft}
                    nft={nft}
                />
            </div>
        ));
    };

    const renderLikedNfts = () => {
        if (likedNfts.length === 0) return <NoDataFound />;

        return likedNfts.map((nft) => (
            <div
                key={nft._id}
                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
            >
                <Nft
                    overlay
                    placeBid
                    title={nft.collectionName}
                    slug={nft.tokenId}
                    latestBid={nft.nftPrice}
                    price={nft.nftPrice}
                    likeCount={nft.likes}
                    auction_date={nft.createdAt}
                    image={nft.tokenImage}
                    authors={nft.creatorName}
                    bitCount={nft.likes}
                    data={nft}
                />
            </div>
        ));
    };

    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer activeKey={activeTab} onSelect={handleTabChange}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-priority-pass"
                                            className={clsx(
                                                "priority-pass-tab",
                                                {
                                                    active:
                                                        activeTab ===
                                                        "nav-priority-pass",
                                                }
                                            )}
                                        >
                                            Priority Pass
                                        </Nav.Link>

                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            On Marketplace
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-profile"
                                        >
                                            Owned
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-contact"
                                        >
                                            Created
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-liked"
                                        >
                                            Liked
                                        </Nav.Link>
                                        <Nav.Item
                                            className="refresh-tab"
                                            style={{
                                                marginLeft: "auto",
                                                marginTop: "20px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <RefreshCw
                                                className={`cursor-pointer ${
                                                    isRefreshing
                                                        ? "animate-spin"
                                                        : ""
                                                }`}
                                                size={24}
                                                onClick={refreshCurrentTab}
                                            />
                                        </Nav.Item>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <TabContent className="tab-content rn-bid-content">
                        <TabPane
                            className="row d-flex g-5"
                            eventKey="nav-priority-pass"
                        >
                            {renderPriorityPassNfts()}
                        </TabPane>
                        <TabPane className="row d-flex g-5" eventKey="nav-home">
                            <div className="col-12">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="marketplace-sub-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="onSale"
                                            onClick={() =>
                                                handleMarketplaceSubTabChange(
                                                    "onSale"
                                                )
                                            }
                                            active={
                                                marketplaceSubTab === "onSale"
                                            }
                                        >
                                            On Sale
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="onAuction"
                                            onClick={() =>
                                                handleMarketplaceSubTabChange(
                                                    "onAuction"
                                                )
                                            }
                                            active={
                                                marketplaceSubTab ===
                                                "onAuction"
                                            }
                                        >
                                            On Auction
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="onDutchAuction"
                                            onClick={() =>
                                                handleMarketplaceSubTabChange(
                                                    "onDutchAuction"
                                                )
                                            }
                                            active={
                                                marketplaceSubTab ===
                                                "onDutchAuction"
                                            }
                                        >
                                            On Dutch Auction
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                            {renderMarketplaceNfts()}
                        </TabPane>

                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {nfts.length === 0 &&  <NoDataFound /> }

                            {nfts?.map((nft) => (
                                <div
                                    key={nft._id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Nft
                                        data={nft}
                                        nft={nft}
                                        refetchOwnedNfts={refetchOwnedNfts}
                                        disableShareDropdown={true}
                                    />
                                </div>
                            ))}
                        </TabPane>

                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            <div className="col-12">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="created-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="collections"
                                            onClick={() =>
                                                handleCreatedTabChange(
                                                    "collections"
                                                )
                                            }
                                            active={
                                                createdActiveTab ===
                                                "collections"
                                            }
                                        >
                                            Collections
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="single-nfts"
                                            onClick={() =>
                                                handleCreatedTabChange(
                                                    "single-nfts"
                                                )
                                            }
                                            active={
                                                createdActiveTab ===
                                                "single-nfts"
                                            }
                                        >
                                            Single NFTs
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>

                            {(createdActiveTab === "collections" ||
                                createdActiveTab === "all") && (
                                <div className="row g-5 d-flex">
                                    {renderCreatedCollections()}
                                </div>
                            )}

                            {(createdActiveTab === "single-nfts" ||
                                createdActiveTab === "all") && (
                                <div className="row g-5 d-flex">
                                    {renderCreatedSingleNfts()}
                                </div>
                            )}
                        </TabPane>

                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-liked"
                        >
                            {renderLikedNfts()}
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

AuthorProfileArea.propTypes = {
    className: PropTypes.string,
};

export default AuthorProfileArea;
