import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import Breadcrumb from "@components/breadcrumb";
import IntellectualPropertyArea from "@containers/intellectual-property-policy";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}
const IntellectualPropertyPolicy = () => (
    <Wrapper>
        <SEO pageTitle="Intellectual Property Policy" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Intellectual Property Policy"
                currentPage="Intellectual Property Policy"
            />
            <IntellectualPropertyArea />
        </main>
        <Footer />
    </Wrapper>
);

export default IntellectualPropertyPolicy;
