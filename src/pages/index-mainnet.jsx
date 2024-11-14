import SEO from "@components/seo";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import LaunchpadChainHeader from "@components/launchpad-chain-header";
import CommingSoonArea from "@containers/comming-soon-area";


export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {

    const content = [
        {
            id: 1,
            title: "The wait is almost over,<br/>Marketplace launching soon!",
            description: "",
            countdown: {
                days: 25,
                hours: 20,
                minutes: 32,
                seconds: 54
            },
            video: {
                src: "/assets-video/globe-background.webm"
            }
        }
    ];
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            {/* <LaunchpadChainHeader /> */}
            <main id="main-content">
            <CommingSoonArea data={content} />
                
            </main>
            <div style={{ marginTop: "50px" }} />
            <Footer />
        </Wrapper>
    );
};

export default Home;
