import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import userService from "src/services/user.service";
import { motion, useAnimationControls } from "framer-motion";

const TickerHeader = () => {
    const [tickerData, setTickerData] = useState(null);
    const [closeTicker, setCloseTicker] = useState(false);
    const controls = useAnimationControls();

    useEffect(() => {
        const fetchTickerData = async () => {
            const response = await userService.getTicker();
            setTickerData(response?.data?.value);
        };
        fetchTickerData();
    }, []);

    useEffect(() => {
        if (tickerData) {
            controls.start({
                x: "-100%",
                transition: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                },
            });
        }
    }, [tickerData, controls]);

    if (closeTicker || !tickerData) return null;

    const handleHoverStart = () => controls.stop();
    const handleHoverEnd = () => controls.start({
        x: "-100%",
        transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
        },
    });

    return (
        <motion.section
            className="ticker-wrap"
            style={{ backgroundColor: tickerData.color || "#ffffff" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
        >
            <div
                className="close-ticker"
                onClick={() => setCloseTicker(true)}
            >
                <MdClose />
            </div>
            <motion.div
                className="ticker"
                animate={controls}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
            >
                <div
                    className="ticker__content"
                    dangerouslySetInnerHTML={{
                        __html: tickerData.html,
                    }}
                />
            </motion.div>
        </motion.section>
    );
};

export default TickerHeader;