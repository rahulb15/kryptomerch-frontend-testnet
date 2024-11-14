import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@components/collection";
import Pagination from "@components/pagination-02";
import { CollectionType } from "@utils/types";

const POSTS_PER_PAGE = 8;

const CollectionArea = ({ className, space, id, data, activeTab }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(data.collections.length / POSTS_PER_PAGE);

    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={clsx(
                "rn-collection-area",
                space === 1 && "rn-section-gapTop1",
                className
            )}
            id={id}
        >
            <div className="row g-5">
            <div className="collection-card-wrapper">

                {data?.collections?.map((collection) => (
                    <div
                        key={collection._id}
                        // className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                        className="nft-collections-grid"
                    >


                        <Collection
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

            </div>
            <div className="row">
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
            </div>
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
    activeTab: PropTypes.string.isRequired,
};

CollectionArea.defaultProps = {
    space: 1,
};

export default CollectionArea;