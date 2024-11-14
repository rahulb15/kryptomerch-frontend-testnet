import SEO from "@components/seo";
import AboutArea from "@containers/about/layout-02";
import CTAArea from "@containers/cta";
import FunfactArea from "@containers/funfact";
import QuoteArea from "@containers/quote-area";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import { normalizedData } from "@utils/methods";
import { getAllPosts } from "../lib/api";

// Demo data
import aboutData from "../data/innerpages/about.json";

const About = () => {
    const content = normalizedData(aboutData?.content || []);
    return (
        <Wrapper>
            <SEO pageTitle="About" />
            <Header />
            <main id="main-content">
                <AboutArea data={content["about-section"]} />
                <QuoteArea
                    data={content["quote-section"]}
                    data1={content["blog-section"]}
                />
                <FunfactArea data={content["funfact-section"]} />
                <CTAArea data={content["cta-section"]} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticProps() {
    const posts = getAllPosts([
        "title",
        "date",
        "slug",
        "image",
        "category",
        "timeToRead",
    ]);

    return {
        props: {
            posts: posts.slice(0, 4),
            className: "template-color-1",
        },
    };
}

export default About;
