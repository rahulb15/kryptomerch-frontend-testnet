import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import ApplyLaunchpadWrapper from "@components/apply-launchpad-old";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const ApplyLaunchpad = () => (
    <Wrapper>
        <SEO pageTitle="Apply Launchapd" />
        <Header />
        <main id="main-content">
            <ApplyLaunchpadWrapper />
        </main>
        <Footer />
    </Wrapper>
);

export default ApplyLaunchpad;
