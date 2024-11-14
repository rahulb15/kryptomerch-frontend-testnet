import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import TopCollectionList from "@components/product/topcollectionlist";
import Slider, { SliderItem } from "@ui/slider";
import { SectionTitleType, ProductType } from "@utils/types";

import React, { useState, useEffect, useCallback } from "react";

import collectionService from "src/services/collection.service";

const SliderOptions = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    dots: true,
    responsive: [
        {
            breakpoint: 1399,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            },
        },
    ],
};

const TopCollection = ({ data, className, space }) => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    console.log(itemsPerPage, "itemsPerPage");
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [timeRange, setTimeRange] = useState("All time");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const getCollections = useCallback(async () => {
        setLoading(true);
        try {
            const response =
                await collectionService.getAllMarketplaceCollections(
                    currentPage,
                    itemsPerPage,
                    search,
                    timeRange
                );
            console.log("API response:", response);
            setCollections(response.data.data.collections);
            setTotalItems(response?.data?.pagination?.totalItems);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching collections:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, search, timeRange]);

    useEffect(() => {
        getCollections();
    }, [getCollections]);

    console.log("collections", collections);

    return (
        <div
            className={clsx(
                "en-product-area",
                space === 1 && "rn-section-gapTop",
                space === 2 && "rn-section-gap",
                space === 3 && "rn-section-gapBottom",
                className
            )}
        >
            <div className="container mt--80 mt_md--60 mt_sm--40 mt-3">
                {data?.section_title && (
                    <div className="row mb--30">
                        <div className="col-12">
                            <SectionTitle {...data.section_title} />
                        </div>
                    </div>
                )}
                {collections && (
                    <div className="row">
                        <div className="col-lg-12">
                            <Slider
                                options={SliderOptions}
                                className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
                            >
                                {collections.map((collectionData) => (
                                    <SliderItem
                                        key={collectionData._id}
                                        className="single-slide-product"
                                    >
                                        <TopCollectionList
                                            overlay
                                            slug={collectionData.collectionName}
                                            image={collectionData.collectionBannerImage}

                                        />
                                    </SliderItem>
                                ))}
                            </Slider>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

TopCollection.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2, 3, 4]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType).isRequired,
        placeBid: PropTypes.bool,
    }),
};

TopCollection.defaultProps = {
    space: 1,
};

export default TopCollection;
