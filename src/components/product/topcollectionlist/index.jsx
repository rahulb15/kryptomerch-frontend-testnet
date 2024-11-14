/* eslint-disable */
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";

const TopCollectionList = ({ overlay, slug, image }) => {
    return (
        <>
            <div
                className={clsx("product-style-one", !overlay && "no-overlay")}
            >
                <div className="card-thumbnail">
                    {image && (
                        <Anchor path={`/collections/kadena/${slug}`}>
                            <Image
                                src={image}
                                alt={image || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                </div>
            </div>
        </>
    );
};

TopCollectionList.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: ImageType.isRequired,
};

TopCollectionList.defaultProps = {
    overlay: false,
};

export default TopCollectionList;
