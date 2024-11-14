import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@components/seo";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import supportService from "src/services/supportService";
import Link from "next/link";
import LoadingSpinner from "@components/loading-spinner";
import ErrorMessage from "@components/error-message";

// Add getStaticPaths
export async function getStaticPaths() {
    try {
        // Fetch all categories
        const categories = await supportService.getAllCategories();
        
        // Generate paths for all category-subcategory combinations
        const paths = [];
        
        for (const category of categories.data.data) {
            const categoryData = await supportService.getCategoryBySlug(category.slug);
            
            // For each subcategory's articles, create a path
            categoryData.data.data.subCategories?.forEach(subCategory => {
                subCategory.articles?.forEach(article => {
                    paths.push({
                        params: {
                            category: category.slug,
                            subcategory: article.slug
                        }
                    });
                });
            });
        }

        return {
            paths,
            // Use fallback: 'blocking' to generate pages that weren't pre-rendered
            fallback: 'blocking'
        };
    } catch (error) {
        console.error('Error generating static paths:', error);
        return {
            paths: [],
            fallback: 'blocking'
        };
    }
}

// Update getStaticProps to fetch data at build time
export async function getStaticProps({ params }) {
    try {
        const { category, subcategory } = params;
        const categoryRes = await supportService.getCategoryBySlug(category);

        if (!categoryRes?.data?.data) {
            return {
                notFound: true
            };
        }

        const categoryData = categoryRes.data.data;
        const foundArticle = categoryData.subCategories?.reduce((found, subCat) => {
            if (found) return found;
            return subCat.articles.find(article => article.slug === subcategory);
        }, null);

        if (!foundArticle) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                className: "template-color-1",
                categoryData,
                articleData: foundArticle
            },
            // Revalidate pages every hour
            revalidate: 3600
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return {
            notFound: true
        };
    }
}

const ArticlePage = ({ categoryData, articleData }) => {
    const router = useRouter();
    const { category } = router.query;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (router.isFallback) {
        return <LoadingSpinner />;
    }

    const handleFeedback = async (isHelpful) => {
        try {
            console.log(`Article ${isHelpful ? 'was' : 'was not'} helpful`);
        } catch (err) {
            console.error("Error submitting feedback:", err);
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle={articleData?.title || "Support Article"} />
            <Header />
            <main id="main-content" className="kryptomerch_articlePage">
                <div className="container">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : articleData && categoryData ? (
                        <>
                            <div className="kryptomerch_breadcrumb">
                                <Link href="/support" className="kryptomerch_breadcrumbLink">
                                    All Collections
                                </Link>
                                <span className="kryptomerch_breadcrumbSeparator">&gt;</span>
                                <Link 
                                    href={`/support/${category}`} 
                                    className="kryptomerch_breadcrumbLink"
                                >
                                    {categoryData.title}
                                </Link>
                                <span className="kryptomerch_breadcrumbSeparator">&gt;</span>
                                <span>{articleData.title}</span>
                            </div>
                            
                            <article className="kryptomerch_articleContent">
                                <h1 className="kryptomerch_articleTitle">
                                    {articleData.title}
                                </h1>
                                <div 
                                    className="kryptomerch_articleBody"
                                    dangerouslySetInnerHTML={{ __html: articleData.content }}
                                />
                            </article>

                            <div className="kryptomerch_feedbackSection">
                                <h4 className="kryptomerch_feedbackTitle">
                                    Was this article helpful?
                                </h4>
                                <div className="kryptomerch_feedbackButtons">
                                    <button 
                                        onClick={() => handleFeedback(true)}
                                        className="kryptomerch_button"
                                    >
                                        Yes
                                    </button>
                                    <button 
                                        onClick={() => handleFeedback(false)}
                                        className="kryptomerch_button"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {categoryData.subCategories?.length > 0 && (
                                <div className="kryptomerch_relatedSection">
                                    <h3 className="kryptomerch_relatedTitle">
                                        Related Articles
                                    </h3>
                                    <div className="kryptomerch_relatedList">
                                        {categoryData.subCategories[0].articles
                                            .filter(article => article.slug !== router.query.subcategory)
                                            .slice(0, 3)
                                            .map((article, idx) => (
                                                <Link 
                                                    key={idx}
                                                    href={`/support/${category}/${article.slug}`}
                                                    className="kryptomerch_relatedLink"
                                                >
                                                    {article.title}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default ArticlePage;