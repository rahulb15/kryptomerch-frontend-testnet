// import { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import SectionTitle from "@components/section-title/layout-02";
// import NiceSelect from "@ui/nice-select";
// import TopSeller from "@components/top-seller/layout-01";
// import { SectionTitleType, SellerType } from "@utils/types";
// import { slugify } from "@utils/methods";

// const CreatorArea = ({ className, space, id, data }) => {
//     const [current, setCurrent] = useState("1 day");
//     const [sellers, setSellers] = useState([]);
//     const changeHandler = (item) => {
//         setCurrent(item.value);
//     };

//     const filterHandler = useCallback(() => {
//         const allSellers = data.creators;
//         const filterdSellers = allSellers.filter(
//             (seller) => slugify(seller.top_since) === slugify(current)
//         );
//         setSellers(filterdSellers);
//     }, [current, data.creators]);

//     useEffect(() => {
//         filterHandler();
//     }, [filterHandler]);
//     return (
//         <div
//             className={clsx(
//                 "rn-creator-title-area",
//                 space === 1 && "rn-section-gapTop",
//                 className
//             )}
//             id={id}
//         >
//             <div className="container">
//                 <div className="row align-items-center">
//                     <div className="col-lg-6 col-md-6 col-sm-6 col-12">
//                         {data?.section_title && (
//                             <SectionTitle
//                                 {...data.section_title}
//                                 className="mb--0"
//                                 disableAnimation
//                             />
//                         )}
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
//                         <div className="shortby-default text-start text-sm-end">
//                             <span className="filter-leble">SHOT BY:</span>
//                             <NiceSelect
//                                 options={[
//                                     { value: "1 day", text: "1 day" },
//                                     { value: "7 Day's", text: "7 Day's" },
//                                     { value: "15 Day's", text: "15 Day's" },
//                                     { value: "30 Day's", text: "30 Day's" },
//                                 ]}
//                                 defaultCurrent={0}
//                                 name="sellerSort"
//                                 onChange={changeHandler}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row g-5 mt--30 creator-list-wrapper">
//                     {sellers.slice(0, 8).map((seller) => (
//                         <div
//                             key={seller.id}
//                             className="creator-single col-lg-3 col-md-4 col-sm-6"
//                         >
//                             <TopSeller
//                                 className="explore"
//                                 name={seller.name}
//                                 total_sale={seller.total_sale}
//                                 slug={seller.slug}
//                                 image={{
//                                     src: seller.image.src,
//                                     width: 74,
//                                     height: 74,
//                                 }}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// CreatorArea.propTypes = {
//     className: PropTypes.string,
//     id: PropTypes.string,
//     space: PropTypes.oneOf([1, 2]),
//     data: PropTypes.shape({
//         section_title: SectionTitleType,
//         creators: PropTypes.arrayOf(SellerType),
//     }),
// };

// CreatorArea.defaultProps = {
//     space: 1,
// };

// export default CreatorArea;



// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import SectionTitle from "@components/section-title/layout-02";
// import NiceSelect from "@ui/nice-select";
// import TopSeller from "@components/top-seller/layout-01";
// import { SectionTitleType } from "@utils/types";
// import nftServices from "src/services/nftServices";

// const CreatorArea = ({ className, space, id, data }) => {
//     const [current, setCurrent] = useState("1");
//     const [creators, setCreators] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const changeHandler = (item) => {
//         setCurrent(item.value);
//     };

//     useEffect(() => {
//         const fetchCreators = async () => {
//             setLoading(true);
//             try {
//                 const response = await nftServices.getTopCreators({ timeFrame: current });
//                 if (response.status === "success") {
//                     console.log("Creators:", response.data);
//                     setCreators(response.data);
//                 } else {
//                     console.error("Failed to fetch creators:", response.message);
//                 }
//             } catch (error) {
//                 console.error("Error fetching creators:", error);
//             }
//             setLoading(false);
//         };

//         fetchCreators();
//     }, [current]);

//     return (
//         <div
//             className={clsx(
//                 "rn-creator-title-area",
//                 space === 1 && "rn-section-gapTop",
//                 className
//             )}
//             id={id}
//         >
//             <div className="container">
//                 <div className="row align-items-center">
//                     <div className="col-lg-6 col-md-6 col-sm-6 col-12">
//                         {data?.section_title && (
//                             <SectionTitle
//                                 {...data.section_title}
//                                 className="mb--0"
//                                 disableAnimation
//                             />
//                         )}
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
//                         <div className="shortby-default text-start text-sm-end">
//                             <span className="filter-leble">SORT BY:</span>
//                             <NiceSelect
//                                 options={[
//                                     { value: "1", text: "1 day" },
//                                     { value: "7", text: "7 days" },
//                                     { value: "15", text: "15 days" },
//                                     { value: "30", text: "30 days" },
//                                 ]}
//                                 defaultCurrent={0}
//                                 name="sellerSort"
//                                 onChange={changeHandler}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row g-5 mt--30 creator-list-wrapper">
//                     {creators.map((creator) => (
//                         <div
//                             key={creator._id}
//                             className="creator-single col-lg-3 col-md-4 col-sm-6"
//                         >
//                             <TopSeller
//                                 className="explore"
//                                 name={creator.name}
//                                 total_sale={creator.totalVolume}
//                                 slug={`/profile/${creator._id}`}
//                                 image={{
//                                     src: creator.profileImage,
//                                     width: 74,
//                                     height: 74,
//                                 }}
//                                 isVarified={creator.verified}
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 {loading && <p>Loading...</p>}
//                 {!loading && creators.length === 0 && <p>No creators found for this time frame.</p>}
//             </div>
//         </div>
//     );
// };

// CreatorArea.propTypes = {
//     className: PropTypes.string,
//     id: PropTypes.string,
//     space: PropTypes.oneOf([1, 2]),
//     data: PropTypes.shape({
//         section_title: SectionTitleType,
//     }),
// };

// CreatorArea.defaultProps = {
//     space: 1,
// };

// export default CreatorArea;



import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import NiceSelect from "@ui/nice-select";
import TopSeller from "@components/top-seller/layout-01";
import { SectionTitleType } from "@utils/types";
import nftServices from "src/services/nftServices";
import NoCreatorsFound from "./NoCreatorsFound"; // Import the new component

const CreatorArea = ({ className, space, id, data }) => {
    const [current, setCurrent] = useState("1");
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(false);

    const changeHandler = (item) => {
        setCurrent(item.value);
    };

    const fetchCreators = async () => {
        setLoading(true);
        try {
            const response = await nftServices.getTopCreators({ timeFrame: current });
            if (response.status === "success") {
                console.log("Creators:", response.data);
                setCreators(response.data);
            } else {
                console.error("Failed to fetch creators:", response.message);
            }
        } catch (error) {
            console.error("Error fetching creators:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCreators();
    }, [current]);

    return (
        <div
            className={clsx(
                "rn-creator-title-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            id={id}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        {data?.section_title && (
                            <SectionTitle
                                {...data.section_title}
                                className="mb--0"
                                disableAnimation
                            />
                        )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                        <div className="shortby-default text-start text-sm-end">
                            <span className="filter-leble">SORT BY:</span>
                            <NiceSelect
                                options={[
                                    { value: "1", text: "1 day" },
                                    { value: "7", text: "7 days" },
                                    { value: "15", text: "15 days" },
                                    { value: "30", text: "30 days" },
                                ]}
                                defaultCurrent={0}
                                name="sellerSort"
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : creators.length > 0 ? (
                    <div className="row g-5 mt--30 creator-list-wrapper">
                        {creators.map((creator) => (
                            <div
                                key={creator._id}
                                className="creator-single col-lg-3 col-md-4 col-sm-6"
                            >
                                <TopSeller
                                    className="explore"
                                    name={creator.name}
                                    total_sale={creator.totalVolume}
                                    slug={`/profile/${creator._id}`}
                                    image={{
                                        src: creator.profileImage,
                                        width: 74,
                                        height: 74,
                                    }}
                                    isVarified={creator.verified}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoCreatorsFound onRefresh={fetchCreators} />
                )}
            </div>
        </div>
    );
};

CreatorArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
    }),
};

CreatorArea.defaultProps = {
    space: 1,
};

export default CreatorArea;