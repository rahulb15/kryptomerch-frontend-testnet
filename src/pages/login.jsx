import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import Breadcrumb from "@components/breadcrumb";
import LoginArea from "@containers/login";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Login = () => (
    <Wrapper>
        <SEO pageTitle="Log In" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Kryptomerch Login"
                currentPage="Kryptomerch Login"
            />
            <LoginArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Login;
