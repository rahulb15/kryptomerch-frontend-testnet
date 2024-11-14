import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";
import NftDetailModal from "./NftDetailModal";
import { useReserveSingleNftMutation } from "src/services/marketplace.service";
import { useAccountContext } from "src/contexts";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
    useCreateNFTMutation,
    useCreateOneNFTMutation,
} from "src/services/nft.service";
import singleNftService from "src/services/singleNft.service";
import MerchModal from "@components/merchandisingModal/modal-merch";
import NFTAudioControls from "@components/product/layout-01/NFTAudioControls";
import { motion } from "framer-motion";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const SingleNft = ({
    overlay,
    title,
    slug,
    latestBid,
    price,
    likeCount,
    auction_date,
    image,
    bitCount,
    authors,
    placeBid,
    data,
    disableShareDropdown,
    sellable,
    refresh,
    setRefresh,
    refetchOwnedNfts,
}) => {
    console.log("🚀 ~ file: index.jsx ~ line 13 ~ Nft ~ data", data);
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [reserveSingleNft, { isLoading }] = useReserveSingleNftMutation();
    const account = useAccountContext();
    const [createOneNFT] = useCreateOneNFTMutation();
    const [showMerchModal, setShowMerchModal] = useState(false);

    const handleOpenModal = () => {
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
    };
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    const handleReserveNft = async () => {
        try {
            const nftData = {
                reserverAcc: account?.user?.walletAddress,
                nftName: data.nftName,
                walletName: account?.user?.walletName,
            };

            const resultData = await reserveSingleNft(nftData).unwrap();

            if (resultData.result.status === "success") {
                toast.success("NFT reserved successfully");
                const bodyupdate = {
                    _id: data._id,
                    isMinted: true,
                };
                const responseupdate = await singleNftService.updateSingleNFT(
                    bodyupdate
                );
                console.log(
                    "🚀 ~ file: index.jsx ~ line 77 ~ handleReserveNft ~ responseupdate",
                    responseupdate
                );
                setRefresh(!refresh);
                if (responseupdate?.status === "success") {
                    const uniqueHash = Date.now();
                    const uniqueCollectionName = `${data.nftName}_KR${uniqueHash}`;
                    const body = {
                        collectionName: uniqueCollectionName,
                        // nftPrice: data.nftPrice,
                        // unlockable: data.unlockable,
                        creatorName: data.creatorName,
                        // duration: data.duration,
                        isPlatform: true,
                        // uri: data.uri,
                        // policies: data.policies,
                        // royaltyAccount: data.royaltyAccount,
                        // royaltyPercentage: data.royaltyPercentage,
                    };
                    const responsenft = await createOneNFT(body);

                    if (responsenft?.data?.status === "success") {
                        refetchOwnedNfts();
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Minted successfully!",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Failed to mint!",
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to mint!",
                    });
                }
            } else {
                toast.error("Failed to reserve NFT");
            }
        } catch (error) {
            console.log(
                "🚀 ~ file: index.jsx ~ line 39 ~ handleReserveNft ~ error",
                error
            );
        }
    };

    const handleMerchModal = (e) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        setShowMerchModal(true);
    };

    const handleCloseMerchModal = () => {
        setShowMerchModal(false);
    };

    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="card-thumbnail"
                    onClick={(e) => {
                        e.preventDefault();
                        if (data?.isRevealed) {
                            handleOpenModal();
                        }
                    }}
                >
                    {/* {image?.src && (
                        <Anchor path={`/product/${slug}`}>
                            <Image
                                src={image.src}
                                alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )} */}
                    {console.log(
                        "🚀 ~ file: index.jsx ~ line 41 ~ Nft ~ data?.isRevealed",
                        data?.isRevealed
                    )}
                    {data?.isRevealed === false ? (
                        <>
                            <Image
                                src="/assets-images/nft/nft2.jpeg"
                                alt="NFT_portfolio"
                                width={533}
                                height={533}
                            />
                            <motion.div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    zIndex: 10,
                                    width: "40px",
                                    height: "40px",
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleMerchModal}
                            >
                                <Image
                                    src="/assets-images/merch-image.jpeg"
                                    alt="Logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </motion.div>
                        </>
                    ) : (
                        <>
                            {data?.nftData?.audio && (
                                <NFTAudioControls nft={data} />
                            )}
                            <Image
                                src={image}
                                alt={data?.title}
                                width={533}
                                height={533}
                            />
                        </>
                    )}

                    {auction_date && <CountdownTimer date={auction_date} />}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}

                    {data?.isRevealed && isHovered && (
                        <div className="sell-button-overlay">
                            <Button
                                onClick={() => console.log("Sell clicked")}
                                size="small"
                            >
                                Sell
                            </Button>
                        </div>
                    )}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {/* {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={client.image}
                            />
                        ))} */}
                        {data?.isRevealed === false ? (
                            <>
                                <span className="latest-bid">Not Revealed</span>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    {data?.isMinted === false && (
                        <Button onClick={handleReserveNft} size="small">
                            {isLoading ? "Reserving..." : "Mint"}
                        </Button>
                    )}
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/product/${slug}`}>
                    <span className="product-name">{title}</span>
                </Anchor>
                {/* <span className="latest-bid">Highest bid {latestBid}</span> */}
                {/* <ProductBid price={price} likeCount={likeCount} /> */}
            </div>
            {/* <NftDetailModal
                open={showDetailModal}
                onClose={handleCloseModal}
                data={data}
            /> */}
            {showDetailModal && (
                <NftDetailModal
                    open={showDetailModal}
                    onClose={handleCloseModal}
                    data={data}
                />
            )}

            {showMerchModal && (
                <MerchModal
                    open={showMerchModal}
                    onClose={handleCloseMerchModal}
                    // Add any props the LogoModal might need
                />
            )}
        </>
    );
};

SingleNft.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    latestBid: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number.isRequired,
    auction_date: PropTypes.string,
    image: ImageType.isRequired,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            image: ImageType.isRequired,
        })
    ),
    bitCount: PropTypes.number,
    placeBid: PropTypes.bool,
    disableShareDropdown: PropTypes.bool,
};

SingleNft.defaultProps = {
    overlay: false,
};

export default SingleNft;
