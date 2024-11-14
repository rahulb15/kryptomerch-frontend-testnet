import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IDType } from "@utils/types";

const CommingSoonArea = ({ data }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set target date to January 1, 2025
        const targetDate = new Date('2025-01-01T00:00:00');

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate - now;

            // Return early if we've passed the target date
            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }

            // Calculate time units
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            });
        };

        // Calculate initial time
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []); // Empty dependency array since we don't need to react to any changes

    const formatNumber = (number) => {
        return number < 10 ? `0${number}` : number;
    };

    const formatTitle = (title) => {
        return title.replace(
            "Marketplace",
            '<span class="marketplace-text">Marketplace</span>'
        );
    };

    return (
        <div className="coming-soon-area">
            <div className="video-background">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="globe-video"
                >
                    <source src={data?.[0]?.video?.src} type="video/webm" />
                    <source src={data?.[0]?.video?.src.replace('.webm', '.mp4')} type="video/mp4" />
                </video>
            </div>
            
            <div className="content-overlay">
                <div className="countdown-content">
                    <h1 
                        className="countdown-title"
                        dangerouslySetInnerHTML={{
                            __html: formatTitle(data?.[0]?.title || '')
                        }}
                    />
                    
                    <div className="countdown-timer">
                        <div className="time-block">
                            <span className="time-value">{formatNumber(timeLeft.days)}</span>
                            <span className="time-label">Days</span>
                        </div>
                        <span className="separator">:</span>
                        <div className="time-block">
                            <span className="time-value">{formatNumber(timeLeft.hours)}</span>
                            <span className="time-label">Hours</span>
                        </div>
                        <span className="separator">:</span>
                        <div className="time-block">
                            <span className="time-value">{formatNumber(timeLeft.minutes)}</span>
                            <span className="time-label">Minutes</span>
                        </div>
                        <span className="separator">:</span>
                        <div className="time-block">
                            <span className="time-value">{formatNumber(timeLeft.seconds)}</span>
                            <span className="time-label">Seconds</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CommingSoonArea.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            countdown: PropTypes.shape({
                days: PropTypes.number,
                hours: PropTypes.number,
                minutes: PropTypes.number,
                seconds: PropTypes.number
            }),
            video: PropTypes.shape({
                src: PropTypes.string
            })
        })
    )
};

export default CommingSoonArea;