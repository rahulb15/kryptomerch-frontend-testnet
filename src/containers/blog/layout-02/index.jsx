import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import clsx from "clsx";
import BlogCard from "@components/blog/blog-card";
import Pagination from "@components/pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import blogService from "src/services/blog.service";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


// [
//     {
//       _id: '667a9c3e934d7d79e5db1679',
//       user: '667a97f21bcaf624a85664b1',
//       url: 'Hello',
//       title: 'Hello',
//       description: 'Hello',
//       thumbnail: 
//         'https://res.cloudinary.com/dh187xay8/image/upload/v1719311422/thumbnail/thumbnail-1719311417388-428468725blog-banner.png',
//       content: 'Hello',
//       createdAt: '2024-06-25T10:30:22.481Z',
//       source: 'creator',
//       updatedAt: '2024-06-25T10:30:22.481Z'
//     }
//   ]


// [
//     {
//       id: undefined,
//       url: 
//         'https://www.coindesk.com/markets/2024/06/25/ether-spot-etfs-could-see-lower-demand-compared-to-bitcoin-peers-bernstein/?utm_medium=referral&utm_source=rss&utm_campaign=headlines',
//       title: 
//         'Ether Spot ETFs Could See Lower Demand Compared to Bitcoin Peers: Bernstein',
//       description: 
//         'Ether and other digital assets need a better regulatory regime and the narrative is expected to improve around the U.S. elections later this year, the report said.',
//       thumbnail: 
//         'https://www.coindesk.com/resizer/ECzcuOAsS7asqc21gmW_u358Mbw=/800x600/cloudfront-us-east-1.images.arcpublishing.com/coindesk/CEH6Z37AC5CLVPE4FOR46QFJDQ.jpeg',
//       createdAt: 'Tue, 25 Jun 2024 10:06:16 +0000',
//       source: 'Coindesk'
//     },

const BlogArea = ({ space, className, data }) => {
    const [value, setValue] = React.useState(0);
    console.log("value", value);
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log("newsData", newsData);

    const getBlogList = async (source) => {
        setIsLoading(true);
        setNewsData([]);
        try {
            const response = await blogService.getBlogList(source);
            console.log("response", response);
            if (response?.data?.status === "success") {
                setNewsData(response?.data?.data || []); 
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const fetchNewsData = async () => {
        const requestOptions = {
            headers: {
                "X-RapidAPI-Key":
                    "1b5ef01b29msh0baedd54f041bc7p15b12ajsnf226e0982d01",
                "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
            },
        };

        try {
            const [
                coindeskResponse,
                cointelegraphResponse,
                bitcoinistResponse,
                decryptResponse,
            ] = await Promise.all([
                axios.get(
                    "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",
                    requestOptions
                ),
                axios.get(
                    "https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph",
                    requestOptions
                ),
                axios.get(
                    "https://cryptocurrency-news2.p.rapidapi.com/v1/bitcoinist",
                    requestOptions
                ),
                axios.get(
                    "https://cryptocurrency-news2.p.rapidapi.com/v1/decrypt",
                    requestOptions
                ),
            ]);

            const coindeskData = coindeskResponse.data.data || [];
            const cointelegraphData = cointelegraphResponse.data.data || [];
            const bitcoinistData = bitcoinistResponse.data.data || [];
            const decryptData = decryptResponse.data.data || [];

            const coindeskItems = coindeskData.map((item) => ({
                id: item.id,
                url: item.url,
                title: item.title,
                description: item.description || "",
                thumbnail: item.thumbnail,
                createdAt: item.createdAt,
                source: "Coindesk",
            }));

            const cointelegraphItems = cointelegraphData.map((item) => ({
                id: item.id,
                url: item.url,
                title: item.title,
                description: item.description || "",
                thumbnail: item.thumbnail,
                createdAt: item.createdAt,
                source: "Cointelegraph",
            }));

            const bitcoinistItems = bitcoinistData.map((item) => ({
                id: item.id,
                url: item.url,
                title: item.title,
                description: item.description || "",
                thumbnail: item.thumbnail,
                createdAt: item.createdAt,
                source: "Bitcoinist",
            }));

            const decryptItems = decryptData.map((item) => ({
                id: item.id,
                url: item.url,
                title: item.title,
                description: item.description || "",
                thumbnail: item.thumbnail,
                createdAt: item.createdAt,
                source: "Decrypt",
            }));

            const allNewsItems = [
                ...coindeskItems,
                ...cointelegraphItems,
                ...bitcoinistItems,
                ...decryptItems,
            ];
            setNewsData(allNewsItems);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        switch (value) {
            case 0:
                // fetchNewsData();
                getBlogList("all");
                break;
            case 1:
                // fetchNewsData();
                getBlogList("blockchain");
                break;
            case 2:
                getBlogList("creator");
                break;
            case 3:
                getBlogList("kryptomerch");
                break;
            default:
                break;
        }
    }, [value]);

    const groupNewsByDate = (newsItems) => {
        const groupedNews = {};

        newsItems.forEach((item) => {
            const dateKey = item.createdAt?.slice(0, 10);
            if (dateKey) {
                if (!groupedNews[dateKey]) {
                    groupedNews[dateKey] = [];
                }
                groupedNews[dateKey].push(item);
            }
        });

        return groupedNews;
    };

    const groupedNewsData = groupNewsByDate(newsData);

    console.log("groupedNewsData", groupedNewsData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div
                className={clsx(
                    "rn-breadcrumb-inner",
                    className,
                    space === 1 && "ptb--30"
                )}
            >
                <div className="container">
                    <div className="row align-items-center">
                        {/* <div className="col-lg-6 col-md-6 col-12"> */}
                        <Box sx={{ width: "100%" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                sx={{
                                    "& .MuiTab-root": {
                                        color: "#888",
                                        fontSize: "small",
                                        "&.Mui-selected": {
                                            color: "#a9b729c9",
                                            fontSize: "large",
                                        },
                                    },
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: "#a9b729c9",
                                    },
                                }}
                            >
                                <Tab label="All" {...a11yProps(0)} />
                                <Tab
                                    label="Blockchain"
                                    {...a11yProps(1)}
                                />
                                <Tab label="Creator" {...a11yProps(2)} />
                                <Tab label="Kryptomerch" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <div
                className={clsx(
                    "rn-blog-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <div className="container">
                    <div className="row g-5">
                        {/* {data?.posts?.map((post) => (
                            <div
                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                                data-sal="slide-up"
                                data-sal-duration="800"
                                data-sal-delay="150"
                                key={post.slug}
                            >
                                <BlogCard
                                    title={post.title}
                                    slug={post.slug}
                                    category={post.category}
                                    timeToRead={post.timeToRead}
                                    image={post.image}
                                />
                            </div>
                        ))} */}
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {value === 0 &&
                                    Object.keys(groupedNewsData).map(
                                        (dateKey) => (
                                            <div key={dateKey}>
                                                <h3>{dateKey}</h3>
                                                <div className="row">
                                                    {groupedNewsData[
                                                        dateKey
                                                    ].map((newsItem) => (
                                                        <div
                                                            className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                            key={newsItem.id}
                                                        >
                                                            <BlogCard
                                                                title={
                                                                    newsItem.title
                                                                }
                                                                slug={
                                                                    newsItem.url
                                                                }
                                                                category={
                                                                    newsItem.source
                                                                }
                                                                timeToRead={
                                                                    newsItem.createdAt
                                                                }
                                                                image={
                                                                    newsItem.thumbnail
                                                                }
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}

                                {value === 1 &&
                                    Object.keys(groupedNewsData).map(
                                        (dateKey) => (
                                            <div key={dateKey}>
                                                <h3>{dateKey}</h3>
                                                <div className="row">
                                                    {groupedNewsData[
                                                        dateKey
                                                    ].map((newsItem) =>
                                                        newsItem.title
                                                            .toLowerCase()
                                                            .includes(
                                                                "crypto"
                                                            ) ? (
                                                            <div
                                                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                                key={
                                                                    newsItem.id
                                                                }
                                                            >
                                                                <BlogCard
                                                                    title={
                                                                        newsItem.title
                                                                    }
                                                                    slug={
                                                                        newsItem.url
                                                                    }
                                                                    category={
                                                                        newsItem.source
                                                                    }
                                                                    timeToRead={
                                                                        newsItem.createdAt
                                                                    }
                                                                    image={
                                                                        newsItem.thumbnail
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}

                                {value === 2 &&
                                    Object.keys(groupedNewsData).map(
                                        (dateKey) => (
                                            <div key={dateKey}>
                                                <h3>{dateKey}</h3>
                                                <div className="row">
                                                    {groupedNewsData[
                                                        dateKey
                                                    ].map((newsItem) =>
                                                        newsItem.title
                                                            .toLowerCase()
                                                            ? (
                                                            <div
                                                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                                key={
                                                                    newsItem.id
                                                                }
                                                            >
                                                                <BlogCard
                                                                    title={
                                                                        newsItem.title
                                                                    }
                                                                    slug={
                                                                        newsItem.url
                                                                    }
                                                                    category={
                                                                        newsItem.source
                                                                    }
                                                                    timeToRead={
                                                                        newsItem.createdAt
                                                                    }
                                                                    image={
                                                                        newsItem.thumbnail
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                {value === 3 &&
                                    Object.keys(groupedNewsData).map(
                                        (dateKey) => (
                                            <div key={dateKey}>
                                                <h3>{dateKey === new Date().toISOString().slice(0, 10) ? "Today" : dateKey}</h3>
                                                <div className="row">
                                                    {groupedNewsData[
                                                        dateKey
                                                    ].map((newsItem) =>
                                                        newsItem.title
                                                            .toLowerCase()
                                                             ? (
                                                            <div
                                                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                                key={
                                                                    newsItem.id
                                                                }
                                                            >
                                                                <BlogCard
                                                                    title={
                                                                        newsItem.title
                                                                    }
                                                                    slug={
                                                                        newsItem.url
                                                                    }
                                                                    category={
                                                                        newsItem.source
                                                                    }
                                                                    timeToRead={
                                                                        newsItem.createdAt
                                                                    }
                                                                    image={
                                                                        newsItem.thumbnail
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </>
                        )}
                    </div>
                    {data.pagiData?.numberOfPages > 1 && (
                        <Pagination
                            currentPage={data.pagiData.currentPage}
                            numberOfPages={data.pagiData.numberOfPages}
                            rootPage="/blog"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

BlogArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        posts: PropTypes.arrayOf(PropTypes.shape({})),
        pagiData: PropTypes.shape({
            currentPage: PropTypes.number.isRequired,
            numberOfPages: PropTypes.number.isRequired,
        }),
    }),
};

BlogArea.defaultProps = {
    space: 1,
};

export default BlogArea;
