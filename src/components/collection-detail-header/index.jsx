import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import styles from "./CollectionDetailHeader.module.css";

const CollectionDetailHeader = ({
  pageTitle,
  data,
  className,
  space,
}) => (
  <motion.div
    className={clsx(
      styles.breadcrumbInner,
      className,
      space === 1 && styles.ptb10
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className={styles.container}>
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-12">
          <motion.h5
            className={clsx(styles.pageTitle, "text-center text-md-start")}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar
              src={"/assets-images/client-logo3.png"}
              alt="user photo"
              variant="rounded"
              sx={{ width: 80, height: 80, marginRight: 2 }}
            />
            {pageTitle}
          </motion.h5>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <motion.ul
            className={clsx(styles.breadcrumbList, "gap-4 text-center text-md-end")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
                            {['Buy Now', 'Sell Now', 'Listed/Supply', 'Volume[24h]', 'Volume[all]', 'Sales', 'Price'].map((label, index) => (
                                <li
                                    key={index}
                                    className={styles.item}
                                >
                                    <span>{label}</span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            marginTop: "5px",
                                        }}
                                    >
                                        20
                                    </span>
                                </li>
                            ))}
                         </motion.ul>
        </div>
      </div>
    </div>
  </motion.div>
);

CollectionDetailHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  space: PropTypes.oneOf([1]),
};

CollectionDetailHeader.defaultProps = {
  space: 1,
};

export default CollectionDetailHeader;