/* eslint-disable */

import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Button from "@ui/button";

const Wallet = ({
    className,
    title,
    description,
    onClick,
    icon,
    color,
    bgcolor,
}) => (
    <div className={clsx("wallet-wrapper", className)}>
        <div className="inner">
            <div
                className="icon"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60px",
                }}
            >
                <Image src={icon} alt={title} width={60} height={60} priority />
            </div>
            <div
                className="content"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h4 className="title">
                    <Button
                        style={{ backgroundColor: bgcolor, color: color }}
                        className="connectBtn"
                        size="small"
                        onClick={onClick}
                    >
                        {title}
                    </Button>
                </h4>
                <p className="description">{description}</p>
            </div>
        </div>
    </div>
);

Wallet.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    bgcolor: PropTypes.string,
    onClick: PropTypes.func,
};
export default Wallet;
