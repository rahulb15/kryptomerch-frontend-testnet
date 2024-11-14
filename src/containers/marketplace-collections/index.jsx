import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@containers/collection-new";
import Pagination from "@components/pagination-02";
import { CollectionType } from "@utils/types";
import MarketCollection from "@components/collection-home";
import { useAccountContext } from "src/contexts";
import collectionService from "src/services/collection.service";
import NoDataFound from "@components/not-found";
const POSTS_PER_PAGE = 8;

const CollectionArea = ({ className, space, id, data }) => {
    const [collections, setCollections] = useState([]);
    console.log("collections", collections);
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


    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    console.log(itemsPerPage, "itemsPerPage");
    const [totalItems, setTotalItems] = useState(0);
    const [timeRange, setTimeRange] = useState("1 day");

    const getCollections = useCallback(async () => {
        setLoading(true);
        try {
            const response = await collectionService.getAllCollectionMarketplace(
                currentPage,
                itemsPerPage,
                search
            );
            console.log(response, "response");
            setCollections(response.data.data.collections);
            setTotalItems(response?.data?.pagination?.totalItems);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching collections:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, search]);

    useEffect(() => {
        getCollections();
    }, []);

    return (
      
            <div className="container">
                <div className="row g-5">
                    {collections.length === 0 && (
                        <div className="col-12">
                            <NoDataFound />
                        </div>
                    )}
                    
                    {collections.map((collection) => (
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
