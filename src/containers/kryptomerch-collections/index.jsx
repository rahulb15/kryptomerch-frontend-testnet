import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@containers/collection-new";
import Pagination from "@components/pagination-02";
import { CollectionType } from "@utils/types";
import MarketCollection from "@components/marketplace-collection-home";
import { useAccountContext } from "src/contexts";
import collectionService from "src/services/collection.service";
import NoDataFound from "@components/not-found";

const POSTS_PER_PAGE = 8;

const CollectionArea = ({ className, space, id, data }) => {
    const [collections, setCollections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [createdCollections, setCreatedCollections] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState("");
    const account = useAccountContext();

    const numberOfPages = Math.ceil(data.collections.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const creatorHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setCollections(data.collections.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, data.collections]);

    useEffect(() => {
        creatorHandler();
    }, [currentPage, creatorHandler]);

    useEffect(() => {
        const fetchCreatedItems = async () => {
            try {
                const collectionsResponse =
                    await collectionService.getCreatedCollectionsMarketPlace(
                        pageNo,
                        limit,
                        search
                    );
                setCreatedCollections(collectionsResponse.data.data[0].data);
            } catch (error) {
                console.error("Error fetching created items:", error);
            }
        };

        fetchCreatedItems();
    }, [account?.user?.walletAddress, pageNo, limit, search]);

    console.log("collections", createdCollections);

    return (
        <div className="container">
            <div className="row g-5">
                {createdCollections.length === 0 && (
                    <div className="col-12">
                        <NoDataFound />
                    </div>
                )}
                {createdCollections.map((collection) => (
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
                ))}
            </div>
            {/* <div className="row">
                    <div
                        className="col-lg-12"
                        data-sal="slide-up"
                        data-sal-delay="950"
                        data-sal-duration="800"
                    >
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={paginationHandler}
                        />
                    </div>
                </div> */}
        </div>
    );
};

CollectionArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        collections: PropTypes.arrayOf(CollectionType),
    }),
};
CollectionArea.defaultProps = {
    space: 1,
};

export default CollectionArea;
