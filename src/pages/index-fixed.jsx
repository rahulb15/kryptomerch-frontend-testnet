import SEO from "@components/seo";
import CreatorArea from "@containers/creator/layout-01";
import ExploreProductArea from "@containers/explore-product/layout-02";
import ServiceArea from "@containers/services/layout-01";
import TopCollection from "@containers/top-collection";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import { normalizedData } from "@utils/methods";
import HomeHeroArea from "@containers/home-hero";
import LaunchpadChainHeader from "@components/launchpad-chain-header";

// Demo data
import TrendingArea from "@containers/trending";
import homepageData from "../data/homepages/home-06.json";
import productData from "../data/products.json";
import rankingData from "../data/ranking.json";
import sellerData from "../data/sellers.json";
import ProductArea from "@containers/product/layout-02";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const content1 = normalizedData(homepageData?.content || []);
    const content = [
        {
            id: 1,
            title: "Kryptomerch Marketplace",
            description:
                "Kryptomerch is a decentralized marketplace for NFTs, digital assets, and collectibles. Buy, sell, and discover exclusive digital assets.",
            buttons: [
                { id: 1, path: "/connect", content: "Get Started" },
                // {
                //     id: 2,
                //     path: "/launchpad/kadena/Priority Pass",
                //     color: "primary-alta",
                //     content: "Mint",
                // },
            ],
            image: { src: "/assets-images/AI-cover/AI-3.jpeg" },
        },
        {
            id: 2,
            title: "Lots of NFTs",
            description: "Buy, sell, and discover exclusive digital assets.",
            buttons: [
                { id: 1, path: "/connect", content: "Get Started" },
                // {
                //     id: 2,
                //     path: "/launchpad/kadena/Priority Pass",
                //     color: "primary-alta",
                //     content: "Mint",
                // },
            ],
            image: { src: "/assets-images/AI-cover/AI-4.jpeg" },
        },
        {
            id: 3,
            title: "Unique Collections",
            description:
                "Collect unique digital assets from creators around the world.",
            buttons: [
                { id: 1, path: "/connect", content: "Get Started" },
                // {
                //     id: 2,
                //     path: "/launchpad/kadena/Priority Pass",
                //     color: "primary-alta",
                //     content: "Mint",
                // },
            ],
            image: { src: "/assets-images/AI-cover/AI-5.jpeg" },
        },
    ];
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <LaunchpadChainHeader />
            <main id="main-content">
                <HomeHeroArea data={content} />
                <CreatorArea
                    data={{
                        ...content1["top-sller-section"],
                        creators: sellerData,
                    }}
                />
                <TrendingArea />
                <ProductArea
                data={{
                    section_title: {
                        title: "Explore Marketplace",
                    },
                    products: productData,
                }}
            />

                <ExploreProductArea />
                <ServiceArea data={content1["service-section"]} />
 
                <TopCollection
                    space={4}
                    data={{
                        section_title: {
                            title: "Top Collection",
                        },
                        products: productData.slice(0, 8),
                    }}
                />
            </main>
            <div style={{ marginTop: "100px" }} />
            <Footer />
        </Wrapper>
    );
};

export default Home;
