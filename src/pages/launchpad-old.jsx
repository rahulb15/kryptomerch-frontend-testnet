/* eslint-disable */

import SEO from "@components/seo";
import LaunchpadHeroArea from "@containers/launchpad-hero";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";

// Demo data
import CollectionArea from "@containers/collection/layout-03";

// import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    // const content = normalizedData(homepageData?.content || []);

    const collectionsData = [
        {
            id: 1,
            title: "Priority Pass",
            slug: "/collection",
            total_item: 27,
            image: { src: "/assets-images/AI-nft/AI-1.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-7.jpeg" },
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
            ],
            profile_image: { src: "/images/client/client-15.png" },
        },
        {
            id: 2,
            title: "DB cooper",
            slug: "/collection",
            total_item: 20,
            image: { src: "/assets-images/AI-nft/AI-4.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-7.jpeg" },
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
            ],
            profile_image: { src: "/images/client/client-12.png" },
        },
        {
            id: 3,
            title: "Monkey",
            slug: "/collection",
            total_item: 20,
            image: { src: "/assets-images/AI-nft/AI-5.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-7.jpeg" },
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
            ],
            profile_image: { src: "/images/client/client-12.png" },
        },
        {
            id: 4,
            title: "Batman",
            slug: "/collection",
            total_item: 20,
            image: { src: "/assets-images/AI-nft/AI-6.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-7.jpeg" },
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
            ],
            profile_image: { src: "/images/client/client-12.png" },
        },
        {
            id: 5,
            title: "Shaktiman",
            slug: "/collection",
            total_item: 20,
            image: { src: "/assets-images/AI-nft/shaktiman/AI-1.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
                { src: "/assets-images/AI-nft/AI-4.jpeg" },
            ],
            profile_image: { src: "/images/client/client-12.png" },
        },
        {
            id: 6,
            title: "Bharat Mata",
            slug: "/collection",
            total_item: 20,
            image: { src: "/assets-images/AI-nft/shaktiman/AI-4.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
                { src: "/assets-images/AI-nft/AI-4.jpeg" },
            ],
            profile_image: { src: "/images/client/client-12.png" },
        },
        {
            id: 7,
            title: "Papu Pompom",
            slug: "/collection",
            total_item: 20,
            image: { src: "/assets-images/AI-nft/shaktiman/AI-3.jpeg" },
            thumbnails: [
                { src: "/assets-images/AI-nft/AI-2.jpeg" },
                { src: "/assets-images/AI-nft/AI-3.jpeg" },
                { src: "/assets-images/AI-nft/AI-4.jpeg" },
            ],
            profile_image: { src: "/images/client/client-12.png" },
        },
    ];
    console.log("collectionsData", collectionsData);

    const content = [
        {
            id: 1,
            title: "Priority Pass",
            description:
                "Introducing priority pass A one-of-a-kind VIP pass that grants you access to mint 12 free NFTs You will have first priority to mint one free NFT per <br/> collection for any NFTS projects you choose from our launchpad",
            buttons: [
                { id: 1, path: "/login", content: "Get Started" },
                {
                    id: 2,
                    path: "/launchpad/kadena/Priority Pass",
                    color: "primary-alta",
                    content: "Mint",
                },
            ],
            image: { src: "/assets-images/AI-cover/AI-1.jpeg" },
        },
        {
            id: 2,
            title: "DB cooper",
            description:
                "DB COOPER is a Token, NFT, and Gaming project proudly bulding on Kadena, Join our TELEGRAM the greatest global Kadena community of all time",
            buttons: [
                { id: 1, path: "/login", content: "Get Started" },
                {
                    id: 2,
                    path: "/launchpad/kadena/DB COOPER",
                    color: "primary-alta",
                    content: "Mint",
                },
            ],
            image: { src: "/assets-images/AI-cover/AI-2.jpeg" },
        },
    ];
    console.log("content", content);

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <LaunchpadHeroArea data={content} />
                <CollectionArea data={{ collections: collectionsData }} />
            </main>
            <div style={{ marginTop: "100px" }} />
            <Footer />
        </Wrapper>
    );
};

export default Home;
