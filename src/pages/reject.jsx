/* eslint-disable */

import React, { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import Button from "@ui/button";
import collectionService from "src/services/collection.service";
import { useSearchParams } from "next/navigation";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const RejectPage = () => {
    const searchParams = useSearchParams();
    console.log("searchParams", searchParams.get("session_id"));
    useEffect(() => {
        const fetchCollection = async () => {
            const response = await collectionService.checkTransaction(
                searchParams.get("session_id")
            );
            console.log("response", response);
        };
        fetchCollection();
    }, [searchParams.get("session_id")]);
    return (
        <Wrapper>
            <SEO pageTitle="Reject" />
            <Header />
            <div className="rn-not-found-area rn-section-gapTop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="rn-not-found-wrapper">
                                <h2 className="large-title">Rejected</h2>
                                <h3 className="title">
                                    Your transaction is rejected
                                </h3>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    style={{ width: "10%" }}
                                >
                                    <source
                                        src="/auth-images/reject.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                                <p>Please try again</p>

                                <Button path="/">Go Back To Home</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default RejectPage;
