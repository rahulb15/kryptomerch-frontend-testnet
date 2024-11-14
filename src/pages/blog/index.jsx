import SEO from "@components/seo";
import BlogArea from "@containers/blog/layout-02";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import PropTypes from "prop-types";
import { getAllPosts } from "../../lib/api";

const POSTS_PER_PAGE = 8;

const Blog = ({ posts, pagiData }) => (
    <Wrapper>
        <SEO pageTitle="Blog" />
        <Header />
        <main id="main-content">
            {/* <Breadcrumb pageTitle="Our Blog" currentPage="Our Blog" /> */}
            <BlogArea data={{ posts, pagiData }} />
        </main>
        <Footer />
    </Wrapper>
);
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
            posts: posts.slice(0, POSTS_PER_PAGE),
            className: "template-color-1",
            pagiData: {
                currentPage: 1,
                numberOfPages: Math.ceil(posts.length / POSTS_PER_PAGE),
            },
        },
    };
}

Blog.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
    pagiData: PropTypes.shape({}),
};

export default Blog;
