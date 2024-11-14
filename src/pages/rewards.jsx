/* eslint-disable */
import React, { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-main";
export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const RewardsPage = () => {
    const [userRewards, setUserRewards] = useState({
        totalPoints: 0,
        ranking: 0,
        priorityPass: false,
    });

    useEffect(() => {
        // Simulating API call to fetch user rewards data
        const fetchUserRewards = async () => {
            // Replace this with actual API call
            const data = {
                totalPoints: 1500,
                ranking: 42,
                priorityPass: true,
            };
            setUserRewards(data);
        };

        fetchUserRewards();
    }, []);

    const rewardsData = [
        {
            title: "Daily Login",
            description: "Earn 1 point every day you log in",
            icon: "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z",
            points: 1,
        },
        {
            title: "Complete Profile",
            description: "Earn 5 points for completing your profile",
            icon: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z",
            points: 5,
        },
        {
            title: "First Purchase",
            description: "Earn 10 points on your first purchase",
            icon: "M20 12v6h-4v-6h4zm-6 6v-12h-4v12h4zm-6 0v-6h-4v6h4zm-1-20h-2v2h-8v18h24v-18h-8v-2h-6zm14 18h-20v-14h20v14z",
            points: 10,
        },
        {
            title: "Refer a Friend",
            description: "Earn 20 points for each friend you refer",
            icon: "M16 11c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3c-1.66 0-3 1.34-3 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5v2.5h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v2.5h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
            points: 20,
        },
        {
            title: "VIP Status",
            description: "Reach 1000 points to unlock VIP status",
            icon: "M12 1l-12 22h24l-12-22zm0 8.118c1.059 0 1.918.861 1.918 1.922 0 1.061-.859 1.919-1.918 1.919s-1.918-.858-1.918-1.919c0-1.061.859-1.922 1.918-1.922zm-1.5 15.882v-5h3v5h-3z",
            points: 1000,
        },
    ];

    return (
        <Wrapper>
            <SEO pageTitle="Rewards" />
            <Header />
            <main id="main-content">

            <div className="rewards-page">
                {/* Hero Section */}
                <div className="hero">
                    <div className="hero-content">
                        <h1>Rewards Program</h1>
                        <p>
                            Earn points, climb the ranks, and unlock amazing
                            benefits!
                        </p>
                        <div className="user-stats">
                            <div className="stat-item">
                                <svg viewBox="0 0 24 24" className="icon">
                                    <path d={rewardsData[1].icon} />
                                </svg>
                                <span>{userRewards.totalPoints} Points</span>
                            </div>
                            <div className="stat-item">
                                <svg viewBox="0 0 24 24" className="icon">
                                    <path d={rewardsData[4].icon} />
                                </svg>
                                <span>Rank #{userRewards.ranking}</span>
                            </div>
                            {userRewards.priorityPass && (
                                <div className="stat-item">
                                    <svg viewBox="0 0 24 24" className="icon">
                                        <path d={rewardsData[2].icon} />
                                    </svg>
                                    <span>Priority Pass Active</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Rewards List */}
                <div className="rewards-list">
                    <h2>How to Earn Rewards</h2>
                    <div className="rewards-grid">
                        {rewardsData.map((reward, index) => (
                            <div key={index} className="reward-card">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="reward-icon"
                                >
                                    <path d={reward.icon} />
                                </svg>
                                <h3>{reward.title}</h3>
                                <p>{reward.description}</p>
                                <div className="points">
                                    <span>Earn up to</span>
                                    <span className="point-value">
                                        {reward.points} points
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="cta-section">
                    <h2>Start Earning Today!</h2>
                    <p>
                        Join ourrewards program and unlock exclusive
                        benefits.
                    </p>
                    <button className="cta-button">Get Started</button>
                </div>

                <style jsx>{`
                    .rewards-page {
                        font-family: "Arial", sans-serif;
                        color: #333;
                        line-height: 1.6;
                        overflow-x: hidden;
                    }

                    .hero {
                        background: linear-gradient(135deg, #ffd700, #ffa500);
                        color: #1a1a1a;
                        padding: 8rem 2rem;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }

                    .hero::before {
                        content: "";
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(
                                circle,
                                rgba(255, 255, 255, 0.2) 10%,
                                transparent 10.01%
                            )
                            50% 50% / 20px 20px;
                        transform: rotate(30deg);
                        animation: heroBackground 60s linear infinite;
                    }

                    @keyframes heroBackground {
                        0% {
                            transform: rotate(30deg);
                        }
                        100% {
                            transform: rotate(390deg);
                        }
                    }

                    .hero-content {
                        position: relative;
                        z-index: 1;
                    }

                    .hero-content h1 {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                        animation: fadeInUp 0.8s ease-out;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .hero-content p {
                        font-size: 1.6rem;
                        margin-bottom: 2rem;
                        animation: fadeInUp 0.8s ease-out 0.2s both;
                    }

                    .user-stats {
                        display: flex;
                        justify-content: center;
                        gap: 1.5rem;
                        flex-wrap: wrap;
                        animation: fadeInUp 0.8s ease-out 0.4s both;
                    }

                    .stat-item {
                        background: rgba(255, 255, 255, 0.3);
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        padding: 1rem 1.8rem;
                        display: flex;
                        align-items: center;
                        font-weight: bold;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }

                    .stat-item:hover {
                        transform: translateY(-5px) scale(1.05);
                        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                    }

                    .icon {
                        width: 32px;
                        height: 32px;
                        margin-right: 1rem;
                        fill: #1a1a1a;
                    }

                    .rewards-list {
                        padding: 8rem 2rem;
                        background-color: #fff9e6;
                    }

                    .rewards-list h2 {
                        text-align: center;
                        font-size: 3rem;
                        margin-bottom: 4rem;
                        position: relative;
                        display: inline-block;
                        left: 50%;
                        transform: translateX(-50%);
                        color: #b8860b;
                    }

                    .rewards-list h2::after {
                        content: "";
                        position: absolute;
                        bottom: -10px;
                        left: 0;
                        width: 100%;
                        height: 3px;
                        background: linear-gradient(90deg, #ffd700, #ffa500);
                        transform: scaleX(0);
                        transform-origin: left;
                        transition: transform 0.5s ease;
                    }

                    .rewards-list h2:hover::after {
                        transform: scaleX(1);
                    }

                    .rewards-grid {
                        display: grid;
                        grid-template-columns: repeat(
                            auto-fit,
                            minmax(300px, 1fr)
                        );
                        gap: 3rem;
                    }

                    .reward-card {
                        background: white;
                        border-radius: 20px;
                        padding: 2.5rem;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        border: 2px solid #ffd700;
                    }

                    .reward-card:hover {
                        transform: translateY(-15px) scale(1.03);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    }

                    .reward-icon {
                        width: 70px;
                        height: 70px;
                        fill: #daa520;
                        margin-bottom: 2rem;
                        transition: transform 0.3s ease;
                    }

                    .reward-card:hover .reward-icon {
                        transform: scale(1.1) rotate(10deg);
                    }

                    .reward-card h3 {
                        font-size: 1.6rem;
                        margin-bottom: 1rem;
                        color: #b8860b;
                    }

                    .reward-card p {
                        font-size: 1.1rem;
                        color: #666;
                        margin-bottom: 2rem;
                        flex-grow: 1;
                    }

                    .points {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 1.1rem;
                        background: #fff9e6;
                        padding: 1rem;
                        border-radius: 15px;
                    }

                    .point-value {
                        font-weight: bold;
                        color: #daa520;
                        font-size: 1.3rem;
                    }

                    .cta-section {
                        background-color: #1a1a1a;
                        color: #ffd700;
                        text-align: center;
                        padding: 8rem 2rem;
                        position: relative;
                        overflow: hidden;
                    }

                    .cta-section::before {
                        content: "";
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(
                                circle,
                                rgba(255, 215, 0, 0.1) 10%,
                                transparent 10.01%
                            )
                            50% 50% / 30px 30px;
                        animation: ctaBackground 80s linear infinite;
                    }

                    @keyframes ctaBackground {
                        0% {
                            transform: translate(0, 0);
                        }
                        100% {
                            transform: translate(50px, 50px);
                        }
                    }

                    .cta-section h2 {
                        font-size: 3rem;
                        margin-bottom: 1.5rem;
                        position: relative;
                        z-index: 1;
                    }

                    .cta-section p {
                        font-size: 1.4rem;
                        margin-bottom: 2.5rem;
                        position: relative;
                        z-index: 1;
                    }

                    .cta-button {
                        background-color: #ffd700;
                        color: #1a1a1a;
                        border: none;
                        padding: 1.2rem 2.5rem;
                        font-size: 1.2rem;
                        font-weight: bold;
                        border-radius: 30px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                        z-index: 1;
                    }

                    .cta-button::before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                        transition: all 0.5s ease;
                        z-index: -1;
                    }

                    .cta-button:hover {
                        background-color: #ffa500;
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                    }

                    .cta-button:hover::before {
                        width: 300px;
                        height: 300px;
                    }

                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @media (max-width: 768px) {
                        .hero-content h1 {
                            font-size: 3rem;
                        }

                        .hero-content p {
                            font-size: 1.3rem;
                        }

                        .rewards-list h2 {
                            font-size: 2.5rem;
                        }

                        .cta-section h2 {
                            font-size: 2.5rem;
                        }

                        .cta-section p {
                            font-size: 1.2rem;
                        }
                    }

                    @media (max-width: 480px) {
                        .hero-content h1 {
                            font-size: 2.5rem;
                        }

                        .hero-content p {
                            font-size: 1.1rem;
                        }

                        .rewards-list h2 {
                            font-size: 2rem;
                        }

                        .cta-section h2 {
                            font-size: 2rem;
                        }

                        .cta-section p {
                            font-size: 1rem;
                        }

                        .cta-button {
                            padding: 1rem 2rem;
                            font-size: 1.1rem;
                        }
                    }
                `}</style>
            </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default RewardsPage;
