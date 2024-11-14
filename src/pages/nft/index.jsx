/* eslint-disable */

import LaunchpadChainHeader from "@components/launchpad-chain-header";
import LaunchpadFilter from "@components/launchpad-filter";
import SEO from "@components/seo";
import LaunchpadHeroArea from "@containers/launchpad-hero";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import { slideToggle } from "@utils/methods";
import React, { useCallback, useReducer, useRef } from "react";
import collectionService from "src/services/collection.service";

// Demo data
import CollectionArea from "@containers/collection/layout-03";
import LaunchpadCategory from "@containers/launchpad-category";

// import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}

const Home = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [search, setSearch] = React.useState("");
    const data = {
        products: [
            {
                id: 1,
                title: "Priority Pass",
                slug: "/priority-pass",
                total_item: 27,
                image: { src: "/assets-images/AI-nft/AI-1.jpeg" },
                thumbnails: [
                    { src: "/assets-images/AI-nft/AI-7.jpeg" },
                    { src: "/assets-images/AI-nft/AI-2.jpeg" },
                    { src: "/assets-images/AI-nft/AI-3.jpeg" },
                ],
                profile_image: { src: "/images/client/client-15.png" },
            },
            {
                id: 2,
                title: "DB cooper",
                slug: "/db-cooper",
                total_item: 20,
                image: { src: "/assets-images/AI-nft/AI-4.jpeg" },
                thumbnails: [
                    { src: "/assets-images/AI-nft/AI-7.jpeg" },
                    { src: "/assets-images/AI-nft/AI-2.jpeg" },
                    { src: "/assets-images/AI-nft/AI-3.jpeg" },
                ],
                profile_image: { src: "/images/client/client-12.png" },
            },
        ],
    };

    console.log("data", data);
    const [collectionsData, setCollectionsData] = React.useState([]);
    const itemsToFilter = [...data.products];
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        products: data.products || [],
        inputs: { price: [0, 100] },
    });

    React.useEffect(() => {
        console.log("page", page, limit, search);
        collectionService
            .getAllLaunched(page, limit, search)
            .then((response) => {
                console.log("response", response);
                setCollectionsData(response?.data?.data[0]?.data || []);
            });
    }, [page, limit, search]);

    const content = [
        {
            id: 1,
            title: "Priority Pass",
            description:
                "Introducing priority pass A one-of-a-kind VIP pass that grants you access to mint 12 free NFTs You will have first priority to mint one free NFT per <br/> collection for any NFTS projects you choose from our launchpad",
            buttons: [
                { id: 1, path: "/connect", content: "Get Started" },
                {
                    id: 2,
                    path: "/launchpad/kadena/Priority Pass",
                    color: "primary-alta",
                    content: "Mint",
                },
            ],
            image: { src: "/assets-images/AI-cover/AI-1.jpeg" },
        },
        {
            id: 2,
            title: "DB cooper",
            description:
                "DB COOPER is a Token, NFT, and Gaming project proudly bulding on Kadena, Join our TELEGRAM the greatest global Kadena community of all time",
            buttons: [
                { id: 1, path: "/connect", content: "Get Started" },
                {
                    id: 2,
                    path: "/launchpad/kadena/DB COOPER",
                    color: "primary-alta",
                    content: "Mint",
                },
            ],
            image: { src: "/assets-images/AI-cover/AI-2.jpeg" },
        },
    ];
    console.log("content", content);

    const filterRef = useRef(null);
    const filterHandler = () => {
        dispatch({ type: "FILTER_TOGGLE" });
        if (!filterRef.current) return;
        slideToggle(filterRef.current);
    };

    const slectHandler = ({ value }, name) => {
        dispatch({ type: "SET_INPUTS", payload: { [name]: value } });
    };

    const priceHandler = (value) => {
        dispatch({ type: "SET_INPUTS", payload: { price: value } });
    };

    const sortHandler = ({ value }) => {
        const sortedProducts = state.products.sort((a, b) => {
            if (value === "most-liked") {
                return a.likeCount < b.likeCount ? 1 : -1;
            }
            return a.likeCount > b.likeCount ? 1 : -1;
        });
        dispatch({ type: "SET_PRODUCTS", payload: sortedProducts });
    };

    const filterMethods = (item, filterKey, value) => {
        if (value === "all") return false;
        let itemKey = filterKey;
        if (filterKey === "category") {
            itemKey = "categories";
        }
        if (filterKey === "price") {
            return (
                item[itemKey].amount <= value[0] / 100 ||
                item[itemKey].amount >= value[1] / 100
            );
        }
        if (Array.isArray(item[itemKey])) {
            return !item[itemKey].includes(value);
        }
        if (filterKey === "collection") {
            return item[itemKey].name !== value;
        }
        return item[itemKey] !== value;
    };

    const itemFilterHandler = useCallback(() => {
        let filteredItems = [];

        filteredItems = itemsToFilter.filter((item) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in state.inputs) {
                if (filterMethods(item, key, state.inputs[key])) return false;
            }
            return true;
        });
        dispatch({ type: "SET_PRODUCTS", payload: filteredItems });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.inputs]);

    console.log("state", state);

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <LaunchpadChainHeader
                    state={state}
                    filterHandler={filterHandler}
                />
                {/* <FilterButton
                            open={state.filterToggle}
                            onClick={filterHandler}
                        /> */}
                <LaunchpadFilter
                    ref={filterRef}
                    slectHandler={slectHandler}
                    sortHandler={sortHandler}
                    priceHandler={priceHandler}
                    inputs={state.inputs}
                />
                <LaunchpadHeroArea data={content} />
                <CollectionArea data={{ collections: collectionsData }} />
                <LaunchpadCategory
                    data={{
                        section_title: {
                            title: "Browse By Category",
                            description:
                                "Discover the latest collections from top creators.",
                        },
                    }}
                />
            </main>
            <div style={{ marginTop: "100px" }} />
            <Footer />
        </Wrapper>
    );
};

export default Home;
