import React, { useState, useEffect } from "react";
import SEO from "@components/seo";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import supportService from "src/services/supportService";
import { SupportLayout, CategoryGrid } from "@components/SupportLayout";
export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}
const Support = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ file: index.jsx ~ line 5 ~ Support ~ categories", categories);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await supportService.getAllCategories();
                console.log("🚀 ~ file: index.jsx ~ line 14 ~ fetchCategories ~ response", response);
                console.log("🚀 ~ fetchCategories ~ response:", response);
                if (response?.data?.data) {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Wrapper>
            <SEO pageTitle="Support" />
            <Header />
            <main id="main-content" style={{ marginBottom: "100px" }}>
                <div className="container">
                    <SupportLayout>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <CategoryGrid categories={categories} />
                        )}
                    </SupportLayout>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Support;