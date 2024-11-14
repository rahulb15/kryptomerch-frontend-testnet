import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import RoadmapArea from "@containers/roadmap";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Roadmap = () => (
    <Wrapper>
        <SEO pageTitle="Roadmap" />
        <Header />
        <main id="main-content">
            <RoadmapArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Roadmap;
