import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@containers/collection-new";
import Pagination from "@components/pagination-02";
import { CollectionType } from "@utils/types";
import MarketCollection from "@components/marketplace-collection-home";
import { useAccountContext } from "src/contexts";
import collectionService from "src/services/collection.service";
import singleNftService from "src/services/singleNft.service";
import SingleNft from "@components/singleNftMarketplace";
import NoDataFound from "@components/not-found";

const POSTS_PER_PAGE = 8;

const SingleNftArea = ({ className, space, id }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [createdSingleNfts, setCreatedSingleNfts] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState("");
    const account = useAccountContext();
    const [refresh, setRefresh] = useState(false);

   
 

    useEffect(() => {
        const fetchCreatedItems = async () => {
            try {
                const singleNftsResponse = await singleNftService.getCreatedSingleNftsMarketPlace(
                    pageNo,
                    limit,
                    search
                );
                console.log("Single NFTs:", singleNftsResponse.data);
                setCreatedSingleNfts(singleNftsResponse.data.singleNfts);
            } catch (error) {
                console.error("Error fetching created items:", error);
            }
        };

        fetchCreatedItems();
    }, [account?.user?.walletAddress, pageNo, limit, search, refresh]);


    return (
      
            <div className="container">
                <div className="row g-5">
                {createdSingleNfts.length === 0 && (
                    <div className="col-12">
                        <NoDataFound />
                    </div>
                )}
                {createdSingleNfts?.map((nft) => (
                                            <div
                                                key={nft._id}
                                                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                            >
                                                {/* <SingleNft
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
                                                /> */}
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

SingleNftArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        collections: PropTypes.arrayOf(CollectionType),
    }),
};
SingleNftArea.defaultProps = {
    space: 1,
};

export default SingleNftArea;
