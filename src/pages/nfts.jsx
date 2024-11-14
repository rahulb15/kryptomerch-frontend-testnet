import SEO from "@components/seo";
import NftsArea from "@containers/nfts";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Collection = () => (
    <Wrapper>
        <SEO pageTitle="NFTs" />
        <Header />
        <main id="main-content">
            {/* <Breadcrumb pageTitle="NFTs" currentPage="NFTs" /> */}
            <NftsArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Collection;
