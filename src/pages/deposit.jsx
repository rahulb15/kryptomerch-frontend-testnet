import SEO from "@components/seo";
import DepositArea from "@containers/deposit";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Deposit = () => (
    <Wrapper>
        <SEO pageTitle="Deposit" />
        <Header />
        <main id="main-content">
            <DepositArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Deposit;
