// import PropTypes from "prop-types";
// import clsx from "clsx";
// import dynamic from "next/dynamic";
// import Nav from "react-bootstrap/Nav";
// import Product from "@components/product/layout-03";
// import { ProductType, SectionTitleType } from "@utils/types";
// import { shuffleArray } from "@utils/methods";
// import CollectionArea from "@containers/kryptomerch-collections";
// import CollectionMarketplaceArea from "@containers/marketplace-collections";
// import SingleNftArea from "@containers/singlenft-area";

// import collectionsData from "../../../data/collections.json";

// const TabContent = dynamic(() => import("react-bootstrap/TabContent"), {
//     ssr: false,
// });
// const TabContainer = dynamic(() => import("react-bootstrap/TabContainer"), {
//     ssr: false,
// });
// const TabPane = dynamic(() => import("react-bootstrap/TabPane"), {
//     ssr: false,
// });

// const ProductArea = ({ space, className, data }) => (
//     console.log("collectionsData", collectionsData),
//     (
//         <div
//             className={clsx(
//                 "rn-product-area",
//                 space === 1 && "rn-section-gapTop",
//                 className
//             )}
//         >
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-12">
//                         {data?.section_title && (
//                             <h2 className="text-left mb--50">
//                                 {data.section_title.title}
//                             </h2>
//                         )}
//                         <TabContainer defaultActiveKey="nav-home">
//                             <Nav className="product-tab-nav">
//                                 <div className="nav">
//                                     <Nav.Link as="button" eventKey="nav-home">
//                                         Collections
//                                     </Nav.Link>
//                                     <Nav.Link
//                                         as="button"
//                                         eventKey="nav-profile"
//                                     >
//                                         Kryptomerch Collections
//                                     </Nav.Link>
//                                     <Nav.Link
//                                         as="button"
//                                         eventKey="nav-contact"
//                                     >
//                                         Single NFTs
//                                     </Nav.Link>
//                                 </div>
//                             </Nav>
//                             <TabContent>
//                                 <TabPane
//                                     eventKey="nav-home"
//                                     className="lg-product_tab-pane lg-product-col-2"
//                                 >
//                                     <CollectionMarketplaceArea
//                                         data={{ collections: collectionsData }}
//                                     />
//                                 </TabPane>
//                                 <TabPane
//                                     eventKey="nav-profile"
//                                     className="lg-product_tab-pane lg-product-col-2"
//                                 >
//                                     <CollectionArea
//                                         data={{ collections: collectionsData }}
//                                     />
//                                 </TabPane>
//                                 <TabPane
//                                     eventKey="nav-contact"
//                                     className="lg-product_tab-pane lg-product-col-2"
//                                 >
//                                     <SingleNftArea />
                                   
//                                 </TabPane>
//                             </TabContent>
//                         </TabContainer>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// );

// ProductArea.propTypes = {
//     space: PropTypes.oneOf([1, 2]),
//     className: PropTypes.string,
//     data: PropTypes.shape({
//         section_title: SectionTitleType,
//         products: PropTypes.arrayOf(ProductType),
//     }),
// };

// ProductArea.defaultProps = {
//     space: 1,
// };

// export default ProductArea;


import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Nav from "react-bootstrap/Nav";
import { SectionTitleType } from "@utils/types";
import collectionsData from "../../../data/collections.json";

const TabContent = dynamic(() => import("react-bootstrap/TabContent"), {
    ssr: false,
});
const TabContainer = dynamic(() => import("react-bootstrap/TabContainer"), {
    ssr: false,
});
const TabPane = dynamic(() => import("react-bootstrap/TabPane"), {
    ssr: false,
});

// Lazy load the tab content components
const CollectionMarketplaceArea = dynamic(() => import("@containers/marketplace-collections"), { 
    loading: () => <p>Loading...</p>
});
const CollectionArea = dynamic(() => import("@containers/kryptomerch-collections"), { 
    loading: () => <p>Loading...</p>
});
const SingleNftArea = dynamic(() => import("@containers/singlenft-area"), { 
    loading: () => <p>Loading...</p>
});



const ProductArea = ({ space, className, data }) => {
    const [activeTab, setActiveTab] = useState("nav-home");

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {data?.section_title && (
                            <h2 className="text-left mb--50">
                                {data.section_title.title}
                            </h2>
                        )}
                        <TabContainer activeKey={activeTab} onSelect={handleTabSelect}>
                            <Nav className="product-tab-nav">
                                <div className="nav">
                                    <Nav.Link as="button" eventKey="nav-home">
                                        Collections
                                    </Nav.Link>
                                    <Nav.Link as="button" eventKey="nav-profile">
                                        Kryptomerch Collections
                                    </Nav.Link>
                                    <Nav.Link as="button" eventKey="nav-contact">
                                        Single NFTs
                                    </Nav.Link>
                                </div>
                            </Nav>
                            <TabContent>
                                <TabPane
                                    eventKey="nav-home"
                                    className="lg-product_tab-pane lg-product-col-2"
                                >
                                    {activeTab === "nav-home" && <CollectionMarketplaceArea data={{ collections: collectionsData }} />}
                                </TabPane>
                                <TabPane
                                    eventKey="nav-profile"
                                    className="lg-product_tab-pane lg-product-col-2"
                                >
                                    {activeTab === "nav-profile" && <CollectionArea data={{ collections: collectionsData }} />}
                                </TabPane>
                                <TabPane
                                    eventKey="nav-contact"
                                    className="lg-product_tab-pane lg-product-col-2"
                                >
                                    {activeTab === "nav-contact" && <SingleNftArea />}
                                </TabPane>
                            </TabContent>
                        </TabContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        collections: PropTypes.array,
    }),
};

ProductArea.defaultProps = {
    space: 1,
};

export default ProductArea;
