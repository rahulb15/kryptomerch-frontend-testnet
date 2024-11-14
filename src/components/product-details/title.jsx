import PropTypes from "prop-types";
import clsx from "clsx";
import ShareDropdown from "../share-dropdown";

const ProductTitle = ({ className, title, likeCount }) => (
    <div className={clsx("pd-title-area", className)}>
        <h4 className="title">{title}</h4>
        <div
            className=""
            style={{
                display: "flex",
                gap: "50px",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
            }}
        >
            <div
                className="heart-count"
                style={{
                    display: "flex",
                    gap: "7px",
                    alignItems: "center",
                    fontSize: "14px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                }}
            >
                <i className="feather-heart" />
                <span>{likeCount}</span>
            </div>
            <div className="count">
                <ShareDropdown />
            </div>
        </div>
    </div>
);

ProductTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
};

ProductTitle.defaultProps = {
    likeCount: 0,
};

export default ProductTitle;
