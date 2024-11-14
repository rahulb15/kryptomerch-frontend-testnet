import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import Breadcrumb from "@components/breadcrumb";
import CreateNewArea from "@containers/create-new";
import CreateArea from "@containers/create";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => (
    <Wrapper>
        <SEO pageTitle="Create" />
        <Header />
        <main id="main-content" style={{ marginBottom: "200px" }}>
            {/* <Breadcrumb pageTitle="Create" /> */}
            <CreateArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Home;
