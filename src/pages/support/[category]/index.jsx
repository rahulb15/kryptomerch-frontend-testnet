// pages/support/[category]/index.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@components/seo";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import supportService from "src/services/supportService";
import { SupportLayout, SubCategoryView } from "@components/SupportLayout";
import LoadingSpinner from "@components/loading-spinner";
import ErrorMessage from "@components/error-message";

const CategoryPage = () => {
    const router = useRouter();
    const { category } = router.query;
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            if (category) {
                try {
                    setLoading(true);
                    const response = await supportService.getCategoryBySlug(category);
                    console.log("🚀 ~ file: [category].jsx ~ line 33 ~ fetchCategory ~ response", response);
                    if (response.data) {
                        setCategoryData(response.data.data);
                    }
                } catch (err) {
                    setError(err.error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCategory();
    }, [category]);

    return (
        <Wrapper>
            <SEO pageTitle={categoryData?.title || "Support"} />
            <Header />
            <main id="main-content" style={{ marginBottom: "100px" }}>
                <div className="container">
                    <SupportLayout>
                        {loading ? (
                            <LoadingSpinner />
                        ) : error ? (
                            <ErrorMessage message={error} />
                        ) : categoryData ? (
                            <SubCategoryView category={categoryData} />
                        ) : null}
                    </SupportLayout>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default CategoryPage;