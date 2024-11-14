// import { useEffect, useState, useCallback } from "react";
// import clsx from "clsx";
// import { motion } from "framer-motion";
// import Product from "@components/product/layout-01";
// import FilterButtons from "@components/filter-buttons";
// import nftServices from "src/services/nftServices";

// const ExploreProductArea = () => {
//     const [pageNo, setPageNo] = useState(1);
//     const [limit, setLimit] = useState(50);
//     const [nfts, setNfts] = useState([]);
//     const [totalNfts, setTotalNfts] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [allLoaded, setAllLoaded] = useState(false);
//     const [category, setCategory] = useState("All");

//     const fetchNfts = useCallback(async () => {
//         if (loading || allLoaded) return;

//         try {
//             setLoading(true);
//             const res = await nftServices.getAllmarketPlaceNfts({ category: category === "All" ? "" : category }, pageNo, limit);
//             if (res.status === 'success') {
//                 setNfts(prevNfts => [...prevNfts, ...res.data.nfts]);
//                 setTotalNfts(res.data.total);
                
//                 if (nfts.length + res.data.nfts.length >= res.data.total) {
//                     setAllLoaded(true);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching NFTs:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, [pageNo, limit, category, loading, allLoaded, nfts.length]);

//     useEffect(() => {
//         fetchNfts();
//     }, []);

//     const loadMore = () => {
//         if (!allLoaded) {
//             setPageNo(prevPageNo => prevPageNo + 1);
//         }
//     };

//     const filterCategories = ["All", "Music", "Art"];

//     const filterHandler = (filterKey) => {
//         setNfts([]);
//         setPageNo(1);
//         setAllLoaded(false);
//         setCategory(filterKey);
//     };

//     return (
//         <div className="explore-product-area-wrapper">
//             <div className="explore-product-area">
//                 <div className="container">
//                     <div className="row align-items-center mb--60">
//                         <div className="col-lg-12 d-flex justify-content-end">
//                             <FilterButtons buttons={filterCategories} filterHandler={filterHandler} />
//                         </div>
//                     </div>
//                     <div className="col-lg-12">
//                         <motion.div layout className="isotope-list item-5">
//                             {nfts.map((nft) => (
//                                 <motion.div key={nft._id} className={clsx("grid-item")} layout>
//                                     <Product
//                                         title={nft.collectionName}
//                                         slug={nft.tokenId}
//                                         price={nft.nftPrice}
//                                         likeCount={nft.likes}
//                                         image={nft.tokenImage}
//                                         authors={[{ name: nft.creatorName }]}
//                                         bitCount={nft.bidInfo.length}
//                                         nft={nft}
//                                     />
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     </div>
//                     {!allLoaded && (
//                         <div className="row">
//                             <div className="col-lg-12 text-center">
//                                 <button
//                                     onClick={loadMore}
//                                     className="btn btn-primary mt--30"
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Loading...' : 'Load More'}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <style jsx>{`
//                 .explore-product-area-wrapper {
//                     display: flex;
//                     justify-content: center;
//                     width: 100%;
//                 }
//                 .explore-product-area {
//                     padding: 40px;
//                     border-radius: 5px;
//                     border: 1px solid #686e5e;
//                     margin-top: 30px;
//                     background-color: transparent;
//                     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                     backdrop-filter: blur(5px);
//                     width: 96%;
//                     max-width: 3200px;
//                 }
//                 @media (max-width: 768px) {
//                     .explore-product-area {
//                         width: 95%;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ExploreProductArea;


// import { useEffect, useState, useCallback, useRef } from "react";
// import clsx from "clsx";
// import { motion } from "framer-motion";
// import Product from "@components/product/layout-01";
// import FilterButtons from "@components/filter-buttons";
// import nftServices from "src/services/nftServices";
// import useDebounce from "../../../hooks/useDebounce";
// import SectionTitle from "@components/section-title/layout-02";

// const ExploreProductArea = () => {
//     const [pageNo, setPageNo] = useState(1);
//     const [limit] = useState(50);
//     const [nfts, setNfts] = useState([]);
//     const [totalNfts, setTotalNfts] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [allLoaded, setAllLoaded] = useState(false);
//     const [category, setCategory] = useState("All");

//     const loadingRef = useRef(false);
//     const allLoadedRef = useRef(false);
//     const nftsLengthRef = useRef(0);

//     const debouncedCategory = useDebounce(category, 300);

//     const fetchNfts = useCallback(async () => {
//         if (loadingRef.current || allLoadedRef.current) return;

//         try {
//             loadingRef.current = true;
//             setLoading(true);
//             const res = await nftServices.getAllmarketPlaceNfts(
//                 { category: debouncedCategory === "All" ? "" : debouncedCategory },
//                 pageNo,
//                 limit
//             );
//             console.log(res.data, "response");
//             if (res.status === 'success') {
//                 setNfts(prevNfts => [...prevNfts, ...res.data.nfts]);
//                 setTotalNfts(res.data.total);
//                 nftsLengthRef.current += res.data.nfts.length;
                
//                 if (nftsLengthRef.current >= res.data.total) {
//                     allLoadedRef.current = true;
//                     setAllLoaded(true);
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching NFTs:", error);
//         } finally {
//             loadingRef.current = false;
//             setLoading(false);
//         }
//     }, [pageNo, limit, debouncedCategory]);

//     useEffect(() => {
//         fetchNfts();
//     }, [fetchNfts]);

//     const loadMore = useCallback(() => {
//         if (!allLoadedRef.current) {
//             setPageNo(prevPageNo => prevPageNo + 1);
//         }
//     }, []);

//     const filterCategories = ["All", "Music", "Art"];

//     const filterHandler = useCallback((filterKey) => {
//         setNfts([]);
//         setPageNo(1);
//         allLoadedRef.current = false;
//         setAllLoaded(false);
//         nftsLengthRef.current = 0;
//         setCategory(filterKey);
//     }, []);

//     return (
//         <div className="explore-product-area-wrapper">
//             <div className="explore-product-area">
//                 <div className="container">
//                 <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb--20 mt--80">
                        
//                         <SectionTitle
//                             title="Explore NFTs"
//                             className="mb--0"
//                             disableAnimation
//                         />
                    
//                 </div>
//                     <div className="row align-items-center mb--60">
//                         <div className="col-lg-12 d-flex justify-content-end">
//                             <FilterButtons buttons={filterCategories} filterHandler={filterHandler} />
//                         </div>
//                     </div>
//                     <div className="col-lg-12">
//                         <motion.div layout className="isotope-list item-5">
//                             {nfts.map((nft) => (
//                                 <motion.div key={nft._id} className={clsx("grid-item")} layout>
//                                     <Product
//                                         title={nft.collectionName}
//                                         slug={nft.tokenId}
//                                         price={nft.nftPrice}
//                                         likeCount={nft.likes}
//                                         image={nft.tokenImage}
//                                         authors={[{ name: nft.creatorName }]}
//                                         bitCount={nft.bidInfo.length}
//                                         nft={nft}
//                                     />
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     </div>
//                     {!allLoaded && (
//                         <div className="row">
//                             <div className="col-lg-12 text-center">
//                                 <button
//                                     onClick={loadMore}
//                                     className="btn btn-primary mt--30"
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Loading...' : 'Load More'}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             {/* <style jsx>{`
//                 .explore-product-area-wrapper {
//                     display: flex;
//                     justify-content: center;
//                     width: 100%;
//                 }
//                 .explore-product-area {
//                     padding: 40px;
//                     border-radius: 5px;
//                     border: 1px solid #686e5e;
//                     margin-top: 30px;
//                     background-color: transparent;
//                     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                     backdrop-filter: blur(5px);
//                     width: 96%;
//                     max-width: 3200px;
//                 }
//                 @media (max-width: 768px) {
//                     .explore-product-area {
//                         width: 95%;
//                     }
//                 }
//             `}</style> */}
//         </div>
//     );
// };

// export default ExploreProductArea;



import { useEffect, useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Product from "@components/product/layout-01";
import FilterButtons from "@components/filter-buttons";
import nftServices from "src/services/nftServices";
import useDebounce from "../../../hooks/useDebounce";
import SectionTitle from "@components/section-title/layout-02";

const ExploreProductArea = () => {
    const [pageNo, setPageNo] = useState(1);
    const [limit] = useState(50);
    const [nfts, setNfts] = useState([]);
    const [totalNfts, setTotalNfts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const loadingRef = useRef(false);
    const allLoadedRef = useRef(false);
    const nftsLengthRef = useRef(0);

    const debouncedFilter = useDebounce(filter, 300);

    const fetchNfts = useCallback(async () => {
        if (loadingRef.current || allLoadedRef.current) return;
    
        try {
            loadingRef.current = true;
            setLoading(true);
            
            const filters = {
                search: '', // Add search functionality if needed
                filter: debouncedFilter
            };
            
            const res = await nftServices.getAllmarketPlaceNfts(filters, pageNo, limit);
            
            console.log(res.data, "response");
            if (res.status === 'success') {
                setNfts(prevNfts => [...prevNfts, ...res.data.nfts]);
                setTotalNfts(res.data.total);
                nftsLengthRef.current += res.data.nfts.length;
                
                if (nftsLengthRef.current >= res.data.total) {
                    allLoadedRef.current = true;
                    setAllLoaded(true);
                }
            }
        } catch (error) {
            console.error("Error fetching NFTs:", error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [pageNo, limit, debouncedFilter]);
    useEffect(() => {
        fetchNfts();
    }, [fetchNfts]);

    const loadMore = useCallback(() => {
        if (!allLoadedRef.current) {
            setPageNo(prevPageNo => prevPageNo + 1);
        }
    }, []);

    const filterCategories = ["All", "Fixed Sale", "Live Auction"];

    const filterHandler = useCallback((filterKey) => {
        setNfts([]);
        setPageNo(1);
        allLoadedRef.current = false;
        setAllLoaded(false);
        nftsLengthRef.current = 0;
        setFilter(filterKey);
    }, []);

    return (
        <div className="explore-product-area-wrapper">
            <div className="explore-product-area">
                <div className="container">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb--20 mt--80">
                        <SectionTitle
                            title="Explore NFTs"
                            className="mb--0"
                            disableAnimation
                        />
                    </div>
                    <div className="row align-items-center mb--60">
                        <div className="col-lg-12 d-flex justify-content-end">
                            <FilterButtons buttons={filterCategories} filterHandler={filterHandler} />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <motion.div layout className="isotope-list item-5">
                            {nfts.map((nft) => (
                                <motion.div key={nft._id} className={clsx("grid-item")} layout>
                                    <Product
                                        title={nft.collectionName}
                                        slug={nft.tokenId}
                                        price={nft.nftPrice}
                                        likeCount={nft.likes}
                                        image={nft.tokenImage}
                                        authors={[{ name: nft.creatorName }]}
                                        bitCount={nft.bidInfo.length}
                                        nft={nft}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    {!allLoaded && (
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <button
                                    onClick={loadMore}
                                    className="btn btn-primary mt--30"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExploreProductArea;