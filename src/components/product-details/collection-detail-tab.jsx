import PropTypes from "prop-types";
import Image from "next/image";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import { ImageType } from "@utils/types";
import { motion } from "framer-motion";

const CollectionDetailTab = ({ image }) => (
    <div className="product-tab-wrapper">
        {console.log(image)}
        <TabContainer defaultActiveKey="nav-0">
            <div className="pd-tab-inner">
                <TabContent className="rn-pd-content">
                   
                        <TabPane key={image.src} eventKey={`nav-0`}>
                            {/* <div className="rn-pd-thumbnail"> */}
                            <motion.div
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.99 }}
                        initial={{ opacity: 0, x: 100 }}
                        className="rn-pd-thumbnail"
                        animate={{ opacity: 1, x: 0 }}
                      
                    >
                                <Image
                                    src={image}
                                    alt={"Product"}
                                    width={560}
                                    height={560}
                                    priority
                                />
                                </motion.div>
                            {/* </div> */}
                        </TabPane>
                    
                </TabContent>
            </div>
        </TabContainer>
    </div>
);

CollectionDetailTab.propTypes = {
    images: PropTypes.arrayOf(ImageType),
};
export default CollectionDetailTab;
