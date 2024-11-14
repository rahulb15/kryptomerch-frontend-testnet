/* eslint-disable */

import SEO from "@components/seo";
import BlogDetailsArea from "@containers/blog-details";
import BlogSidebar from "@containers/blog-sidebar";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import PropTypes from "prop-types";
import blogService from "src/services/blog.service";

const BlogDetails = ({ post, categories, recentPosts, tags, relatedPosts }) => {
    console.log("🚀 ~ BlogDetails ~ post", post);
    return (
        <Wrapper>
            <SEO pageTitle="Blog Details" />
            <Header />
            <main id="main-content">
                <div className="rn-blog-area rn-blog-details-default rn-section-gapTop">
                    <div className="container">
                        <div className="row g-6">
                            <div className="col-xl-8 col-lg-8">
                                <BlogDetailsArea post={post} />
                            </div>
                            <div className="col-xl-4 col-lg-4 mt_md--40 mt_sm--40">
                                <BlogSidebar
                                    categories={categories}
                                    recentPosts={recentPosts}
                                    tags={tags}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticPaths() {
    const paths = [{ params: { slug: "Kryptomerch" } }];

    return {
        paths,
        fallback: "blocking", // Enable dynamic rendering for unmatched paths
    };
}

export function getPostBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, "");
    console.log("🚀 ~ getPostBySlug ~ realSlug", realSlug);
    const items = {};

    // // Ensure only the minimal needed data is exposed
    // fields.forEach((field) => {
    //     if (field === "slug") {
    //         items[field] = realSlug;
    //     }
    //     if (field === "content") {
    //         items[field] = marked(content);
    //     }

    //     if (field === "timeToRead") {
    //         const readTime = readingTime(content);
    //         items[field] = readTime;
    //     }

    //     if (field === "category") {
    //         items[field] = {
    //             title: data.category,
    //             slug: slugify(data.category),
    //         };
    //     }

    //     if (field === "tags") {
    //         items[field] = data.tags.map((tag) => ({
    //             title: tag,
    //             slug: slugify(tag),
    //         }));
    //     }

    //     if (
    //         field !== "category" &&
    //         field !== "tags" &&
    //         typeof data[field] !== "undefined"
    //     ) {
    //         items[field] = data[field];
    //     }
    // });

    // return items;
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    console.log("🚀 ~ getStaticProps ~ slug", slug);

    const response = await blogService.getBlogDetail(slug);
    if (response?.data?.status === "success") {
        console.log("🚀 ~ getStaticProps ~ response", response.data);

        // data: {
        //     _id: '667c78bb04c3b6e4417522eb',
        //     user: '667a7c4e74b4e88bf508f369',
        //     url: 'http://localhost:3000/blog/Kryptomerch',
        //     title: 'dsfsdfdsf',
        //     slug: 'Kryptomerch',
        //     date: '2024-06-26T20:23:17.638Z',
        //     category: { title: 'walletconnect', slug: 'Kryptomerch' },
        //     description: 'sdfdsf',
        //     thumbnail:
        //       'https://res.cloudinary.com/dh187xay8/image/upload/v1719433402/thumbnail/thumbnail-1719433397523-74737086bg-1.png',
        //     content: '<p>fafafaasf</p>',
        //     createdAt: '2024-06-26T20:23:23.208Z',
        //     source: 'kryptomerch',
        //     updatedAt: '2024-06-26T20:23:23.237Z'
        //   }

        const post = {
            title: response.data.data.title || "",
            date: response.data.data.date || "",
            slug: response.data.data.slug || "",
            image: response.data.data.thumbnail || "",
            category: {
                title: response.data.data.category.title || "",
                slug: response.data.data.category?.slug || "",
            },
            content: response.data.data.content || "",
        };

        console.log("🚀 ~ getStaticProps ~ post", post);

        return {
            props: {
                post,
                slug,
                className: "template-color-1",
            },
        };
    } else {
        return {
            notFound: true,
        };
    }

    // if (!postData) {
    //     return {
    //         notFound: true,
    //     };
    // }

    // const post = getPostBySlug(slug, [
    //     "content",
    //     "title",
    //     "date",
    //     "slug",
    //     "image",
    //     "category",
    // ]);
    // const posts = getAllPosts([
    //     "category",
    //     "slug",
    //     "title",
    //     "tags",
    //     "image",
    //     "timeToRead",
    // ]);
    // const categories = posts.map((blog) => ({ ...blog.category }));
    // const tags = posts.map((blog) => [...blog.tags]);
    // const recentPosts = posts.slice(0, 4);
    // const relatedPosts = posts
    //     .filter((blog) => blog.category.slug === post.category.slug)
    //     .slice(0, 3);

    // const post = {
    //     title: "Blog Details",
    //     date: "2021-07-02T00:00:00.000Z",
    //     slug: "blog-details",
    //     image: "/assets/images/blog/blog-details-1.jpg",
    //     category: {
    //         title: "Web Development",
    //         slug: "web-development",
    //     },
    //     content: `
    //         <p>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    //             quis accumsan nisi. Nullam sit amet nisi in nulla lacinia
    //             tincidunt. Nulla facilisi. Sed auctor, est nec lacinia
    //             tincidunt, felis sapien pharetra mauris, vel bibendum quam
    //             sapien nec justo. Sed nec purus in felis fermentum aliquam.
    //             Nullam sit amet nisi in nulla lacinia tincidunt. Nulla
    //             facilisi. Sed auctor, est nec lacinia tincidunt, felis sapien
    //             pharetra mauris, vel bibendum quam sapien nec justo. Sed nec
    //             purus in felis fermentum aliquam.
    //         </p>
    //         <p>
    //             Nullam sit amet nisi in nulla lacinia tincidunt. Nulla
    //             facilisi. Sed auctor, est nec lacinia tincidunt, felis sapien
    //             pharetra mauris, vel bibendum quam sapien nec justo. Sed nec
    //             purus in felis fermentum aliquam. Nullam sit amet nisi in
    //             nulla lacinia tincidunt. Nulla facilisi. Sed auctor, est nec
    //             lacinia tincidunt, felis sapien pharetra mauris, vel bibendum
    //             quam sapien nec justo. Sed nec purus in felis fermentum
    //             aliquam.
    //         </p>
    //         <p>
    //             Nullam sit amet nisi in nulla lacinia tincidunt. Nulla
    //             facilisi. Sed auctor, est nec lacinia tincidunt, felis sapien
    //             pharetra mauris, vel bibendum quam sapien nec justo. Sed nec
    //             purus in felis fermentum aliquam. Nullam sit amet nisi in
    //             nulla lacinia tincidunt. Nulla facilisi. Sed auctor, est nec
    //             lacinia tincidunt, felis sapien pharetra mauris, vel bibendum
    //             quam sapien nec justo. Sed nec purus in felis fermentum
    //             aliquam.
    //         </p>
    //     `,
    // };

    // return {
    //     props: {
    //         post,
    //         slug,
    //         // categories,
    //         // recentPosts,
    //         // tags,
    //         // relatedPosts,
    //         className: "template-color-1",
    //     },
    // };
}

BlogDetails.propTypes = {
    post: PropTypes.shape({}),
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    recentPosts: PropTypes.arrayOf(PropTypes.shape({})),
    tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
    relatedPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default BlogDetails;
