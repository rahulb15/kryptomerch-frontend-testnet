import SEO from "@components/seo";
import EditProfileArea from "@containers/edit-profile";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const EditProfile = () => (
    <Wrapper>
        <SEO pageTitle="Edit Profile" />
        <Header />
        <main id="main-content" style={{ marginBottom: "200px" }}>
            {/* <Breadcrumb pageTitle="Edit Profile" currentPage="Edit Profile" /> */}
            <EditProfileArea />
        </main>
        <Footer />
    </Wrapper>
);

export default EditProfile;
