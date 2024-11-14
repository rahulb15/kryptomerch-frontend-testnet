import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
// import Breadcrumb from "@components/breadcrumb";
import ConnectArea from "@containers/connect";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Connect = () => (
    <Wrapper>
        <SEO pageTitle="Connect" />
        <Header />
        <main id="main-content" style={{ marginBottom: "200px" }}>
            {/* <Breadcrumb pageTitle="Connect Wallet" currentPage="Connect" /> */}
            <ConnectArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Connect;
