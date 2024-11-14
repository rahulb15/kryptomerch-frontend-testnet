/* eslint-disable */

import React, { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
import Button from "@ui/button";
import userService from "src/services/user.service";
import { useSearchParams, useRouter } from "next/navigation";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const VerifyPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const[count, setCount] = useState(0);
    useEffect(() => {
        const fetchCollection = async () => {
            const response = await userService.verifyEmail(
                searchParams.get("token")
            );
            console.log("response", response);
            if (response?.data?.status === "success") {
                //turn on counter to count 5 seconds to redirect the page
                const interval = setInterval(() => {
                    setCount((prev) => prev + 1);
                }, 1000);
                //redirect to home page after 5 seconds
                setTimeout(() => {
                    clearInterval(interval);
                    router.push("/");
                }, 5000);
            }
        };
        fetchCollection();
    }, [searchParams.get("token")]);

    return (
        <Wrapper>
            <SEO pageTitle="Verify" />
            <Header />
            <div className="rn-not-found-area rn-section-gapTop">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="rn-not-found-wrapper">
                                <h2 className="large-title">Success</h2>
                                <h3 className="title">
                                    Your Email is successfully verified
                                </h3>
                                <video autoPlay loop muted>
                                    <source
                                        src="/auth-images/success.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                                <p>Welcome to the kryptomech family</p>

                                <p>
                                    Redirecting to home page in {5 - count}{" "}
                                    seconds
                                </p>

                                <p>
                                    Click the button below to go back to home
                                    page
                                </p>

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

export default VerifyPage;
