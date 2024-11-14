import { useReducer, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/layout-01";
import ExploreNftListArea from "@components/explore-nft-list/page";
import ProductFilter from "@components/product-filter/layout-02";
import { SectionTitleType, ProductType } from "@utils/types";
import Nft from "@components/marketplace-nft";

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

const ExploreNftArea = ({ className, space, data }) => {
    console.log(data.nfts, "data");
    const itemsToFilter = [...data.products];
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        products: data.products || [],
        inputs: { price: [0, 100] },
    });

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

    useEffect(() => {
        itemFilterHandler();
    }, [itemFilterHandler]);

    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                {data?.section_title && (
                    <div className="row mb--30 align-items-center">
                        <div className="col-12">
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        </div>
                    </div>
                )}

                <ProductFilter
                    slectHandler={slectHandler}
                    sortHandler={sortHandler}
                    priceHandler={priceHandler}
                    inputs={state.inputs}
                />
                <div className="row g-5">
                    {/* {state.products.length > 0 ? (
                        <>
                            {state.products.slice(0, 10).map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <ExploreNftListArea
                                        placeBid={!!data.placeBid}
                                        title={prod.title}
                                        slug={prod.slug}
                                        auction_date={prod.auction_date}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />



                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No item to show</p>
                    )} */}

{data.nfts?.map((nft) => (
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
                            ))}
                </div>
            </div>
        </div>
    );
};

ExploreNftArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

ExploreNftArea.defaultProps = {
    space: 1,
};

export default ExploreNftArea;
